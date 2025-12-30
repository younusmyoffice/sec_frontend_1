/**
 * Request Component
 * 
 * Displays doctor appointment requests and statistics:
 * - Appointment request count card
 * - Upcoming appointments count card
 * - Completed appointments count card
 * - List of appointment requests with accept/reject functionality
 * 
 * Features:
 * - Loading states with skeleton loaders ✅
 * - Error handling with toast notifications ✅
 * - Empty state handling ✅
 * - Accept/reject appointment requests ✅
 * 
 * API Endpoints:
 * - POST /sec/Doctor/AppointmentsRequests (fetch appointment requests)
 * - POST /sec/Doctor/DocDashoardCount (fetch appointment counts)
 * - GET /sec/Doctor/DocDashoardApp/in_progress/{doctor_id} (verify requests)
 * 
 * Security:
 * - Uses axiosInstance (automatic JWT token injection) ✅
 * - Validates doctor_id before API calls ✅
 * 
 * Error Handling:
 * - Toast notifications for errors ✅
 * - Graceful fallback to empty arrays/counts ✅
 * 
 * @component
 */

import React, { useEffect, useState, useCallback } from "react";
import DoctorAppointmentCard from "../../CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import "./Request.scss";
import { Box, Skeleton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomRequestCard from "../../CustomDoctorComponent/Cards/CustomRequestCard/CardRequest";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * Request Component - Doctor Appointment Requests View
 * 
 * Displays appointment statistics and request cards with accept/reject actions
 */
const Request = () => {
    logger.debug("🔵 Request component rendering");
    
    // State management
    const [requestCount, setRequestCount] = useState(0);
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [accAndRejClicked, setAccAndRejClicked] = useState(false);
    const [doctorRequest, setDoctorRequest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Prepare appointment request data payload
    const [requestData, setRequestData] = useState({
        doctor_id: null,
        status_in_progress: "in_progress",
    });

    const navigate = useNavigate();

    /**
     * Validate doctor ID from localStorage
     * Ensures doctor ID is present before making API calls
     * 
     * @returns {string|null} Doctor ID or null if invalid
     */
    const validateDoctorId = useCallback(() => {
        const doctorId = localStorage.getItem("doctor_suid");
        
        if (!doctorId) {
            logger.warn("⚠️ Doctor ID not found in localStorage");
            toastService.warning("Doctor ID is missing. Please log in again.");
            setIsError(true);
            return null;
        }
        
        logger.debug("✅ Doctor ID validated:", doctorId);
        return doctorId;
    }, []);

    /**
     * Initialize component - Set localStorage values and fetch data
     * Hides location search container and fetches all dashboard data
     */
    useEffect(() => {
        logger.debug("🔄 Initializing Request component");
        
        // Set active component and path for navigation state
        localStorage.setItem("activeComponent", "dashboard");
        localStorage.setItem("path", "request");
        
        // Hide location search container
        // Note: Consider using a context or state management for this in the future
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
        }

        // Validate and set doctor ID
        const doctorId = validateDoctorId();
        if (doctorId) {
            setRequestData({
                doctor_id: doctorId,
                status_in_progress: "in_progress",
            });

            // Fetch all data
            fetchrequest(doctorId);
            fetchAppointmentCount("in_progress", setRequestCount, doctorId);
            fetchAppointmentCount("booked", setUpcomingCount, doctorId);
            fetchAppointmentCount("completed", setCompletedCount, doctorId);
            fetchDataNew(doctorId).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
        
        // Cleanup: restore container display on unmount
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
            }
        };
    }, [validateDoctorId]);

    /**
     * Refetch request data when accept/reject action is triggered
     * Ensures UI stays in sync after appointment status changes
     */
    useEffect(() => {
        const doctorId = validateDoctorId();
        if (doctorId && accAndRejClicked) {
            logger.debug("🔄 Refetching request data after accept/reject action");
            fetchDataNew(doctorId);
            // Note: We don't immediately reset the flag here to allow for proper refetch
            // The flag will be reset after successful fetch in fetchDataNew
        }
    }, [accAndRejClicked, validateDoctorId]); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Fetch appointment requests for current doctor
     * Loads all in-progress appointment requests
     * 
     * @param {string} doctorId - Doctor ID from localStorage
     */
    const fetchDataNew = async (doctorId) => {
        if (!doctorId) {
            logger.warn("⚠️ Cannot fetch request data: doctor ID missing");
            return;
        }
        
        logger.debug("📋 Fetching appointment requests");
        
        try {
            const payload = {
                doctor_id: doctorId,
                status_in_progress: "in_progress",
            };
            
            const response = await axiosInstance.post(
                "/sec/Doctor/AppointmentsRequests",
                JSON.stringify(payload),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Appointment requests received", {
                count: response?.data?.response?.length || 0
            });
            
            setDoctorRequest(response?.data?.response || []);
            setIsError(false);
            setAccAndRejClicked(false); // Reset flag after successful fetch
        } catch (error) {
            logger.error("❌ Failed to fetch appointment requests:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load appointment requests"
            );
            setDoctorRequest([]);
            setIsError(true);
        }
    };

    /**
     * Fetch appointment count for a specific status
     * 
     * @param {string} status - Appointment status (in_progress, booked, completed)
     * @param {Function} setCount - State setter for count
     * @param {string} doctorId - Doctor ID from localStorage
     */
    const fetchAppointmentCount = async (status, setCount, doctorId) => {
        if (!doctorId) {
            logger.warn(`⚠️ Cannot fetch ${status} count: doctor ID missing`);
            return;
        }
        
        if (!status) {
            logger.warn("⚠️ Cannot fetch count: status is missing");
            return;
        }
        
        logger.debug(`📊 Fetching ${status} appointment count`);
        
        try {
            const response = await axiosInstance.post(
                "/sec/Doctor/DocDashoardCount",
                {
                    doctor_id: doctorId,
                    status: status,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            const count = response?.data?.response?.[0]?.keyword_count || 0;
            
            logger.debug(`✅ ${status} count received:`, count);
            setCount(count);
        } catch (error) {
            logger.error(`❌ Failed to fetch ${status} count:`, error);
            toastService.error(
                error?.response?.data?.message || 
                `Failed to load ${status} appointment count`
            );
            setCount(0);
        }
    };

    /**
     * Verify/fetch in-progress appointment requests
     * Optional verification call to ensure data consistency
     * 
     * @param {string} doctorId - Doctor ID from localStorage
     */
    const fetchrequest = async (doctorId) => {
        if (!doctorId) {
            logger.warn("⚠️ Cannot verify requests: doctor ID missing");
            return;
        }
        
        logger.debug("🔍 Verifying in-progress appointment requests");
        
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/DocDashoardApp/in_progress/${doctorId}`
            );
            
            logger.debug("✅ Request verification successful", {
                count: response?.data?.response?.length || 0
            });
        } catch (error) {
            logger.error("❌ Failed to verify requests:", error);
            // Don't show toast for this as it's a verification call
            // Main fetchDataNew will handle error display
        }
    };

    /**
     * Handle accept/reject button click
     * Triggers refetch of appointment requests
     * 
     * @param {boolean} value - Flag indicating accept/reject action was performed
     */
    const AcceptOrRejectButtonClicked = (value) => {
        logger.debug("🔄 Accept/reject button clicked, triggering refetch", { value });
        setAccAndRejClicked(value);
    };

    return (
        <Box sx={{ 
            width: "100%", 
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // Prevent outer container from scrolling
        }}>
            <div className="Appointment-card">
                {loading ? (
                    <Skeleton variant="text" width={200} height={200} />
                ) : (
                    <DoctorAppointmentCard
                        NumberOfAppointments={requestCount}
                        AppointmentType={"Appointment Request"}
                    />
                )}
                {loading ? (
                    <Skeleton variant="text" width={200} height={200} />
                ) : (
                    <DoctorAppointmentCard
                        NumberOfAppointments={upcomingCount}
                        AppointmentType={"Upcoming Appointments"}
                    />
                )}
                {loading ? (
                    <Skeleton variant="text" width={200} height={200} />
                ) : (
                    <DoctorAppointmentCard
                        NumberOfAppointments={completedCount}
                        AppointmentType={"Completed"}
                    />
                )}
            </div>

            <Box className="DocNavBar-Container">
                <NavLink to={"/doctorDashboard/request"}>Requests</NavLink>
                <NavLink to={"/doctorDashboard/notification"}>Notifications</NavLink>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #E6E1E5",
                    borderRadius: "0.5rem",
                    padding: "2%",
                    minHeight: "55vh",
                    maxHeight: "calc(100vh - 250px)", // Ensure card doesn't exceed viewport
                    overflowY: "auto", // Enable vertical scrolling when content overflows
                    overflowX: "hidden", // Prevent horizontal scrolling
                }}
            >
                <Box sx={{ 
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0, // Gap handled by card margin-bottom
                }}>
                    {loading ? (
                        // Skeleton loaders for request cards
                        Array.from(new Array(3)).map((_, index) => (
                            <Skeleton 
                                key={index} 
                                variant="rectangular" 
                                width="100%" 
                                height={100} 
                                sx={{ 
                                    marginBottom: "1rem",
                                    borderRadius: "0.5rem",
                                }} 
                            />
                        ))
                    ) : doctorRequest.length === 0 ? (
                        <NoAppointmentCard text_one={"No Appointment"} />
                    ) : (
                        doctorRequest.map((data) => (
                            <CustomRequestCard
                                key={data.id}
                                AcceptOrRejectButtonClicked={AcceptOrRejectButtonClicked}
                                accAndRejClicked={accAndRejClicked}
                                label={"Accept"}
                                data={data}
                            />
                        ))
                    )}
                </Box>
                {/* View All button - positioned at bottom with proper spacing */}
                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    paddingTop: "1.5rem",
                    paddingBottom: "1rem",
                    marginTop: "auto", // Push to bottom
                }}>
                    <CustomButton
                        handleClick={() => navigate("/doctorDashboard/doctorAppointment/request")}
                        isTransaprent={true}
                        label="View all"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Request;
