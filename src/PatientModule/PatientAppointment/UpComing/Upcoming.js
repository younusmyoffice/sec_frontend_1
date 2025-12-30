import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppointmentNavbar, UpcomingCard } from "../PatientCards";
import DrImage from "../../../static/images/DrImages/image3.png";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import NoAppointmentCard from "../NoAppointmentCard/NoAppointmentCard";
import { isAppointmentTimeReached } from "../../../utils/timeUtils";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * Upcoming Component
 * 
 * Displays upcoming appointments for the patient
 * Features:
 * - Fetches and displays upcoming appointments
 * - Real-time join button status updates
 * - Pagination support
 * - Loading skeletons
 * - Empty state handling
 * 
 * @component
 */
const Upcoming = () => {
    logger.debug("🔵 Upcoming component rendering");
    
    // Appointment data state
    const [upcomingData, setUpcomingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(false);
    console.log("flag", flag);
console.log("upcomingData", upcomingData);
console.log("loading", loading);
    /**
     * Get patient ID from localStorage with error handling
     */
    const getPatientId = () => {
        try {
            const patientId = localStorage.getItem("patient_suid");
            if (!patientId) {
                logger.warn("⚠️ Patient ID not found in localStorage");
                toastService.error("Patient information not available");
            }
            return patientId;
        } catch (error) {
            logger.error("❌ Error accessing localStorage:", error);
            toastService.error("Failed to load patient information");
            return null;
        }
    };
    
    const patientId = getPatientId();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    // Real-time update state for join button status
    const [timeUpdate, setTimeUpdate] = useState(0);

    /**
     * Fetch upcoming appointments from API
     * Retrieves appointments with status "in_progress" or "booked"
     */
    const fetchData = async () => {
        logger.debug("📡 Fetching upcoming appointments", { patientId });
        setLoading(true);
        
        try {
            // Validate patient ID
            if (!patientId) {
                logger.error("❌ Patient ID is missing");
                toastService.error("Patient information not available");
                setUpcomingData([]);
                setLoading(false);
                return;
            }
            
            const response = await axiosInstance.post(
                "/sec/patient/UpcomingAppointments",
                JSON.stringify({
                    patient_id: patientId,
                    status_in_progress: "in_progress",
                    status_booked: "booked",
                }),
            );
            console.log("response", response);
            const appointments = response?.data?.response || [];
            console.log("appointments", appointments);
            logger.debug("✅ Upcoming appointments fetched successfully", { 
                count: appointments.length 
            });

            setUpcomingData(appointments);
            
            if (appointments.length > 0) {
                toastService.success(`${appointments.length} upcoming appointment(s) loaded`);
            }
        } catch (err) {
            logger.error("❌ Failed to fetch upcoming appointments:", err);
            toastService.error(
                err?.response?.data?.message || 
                "Failed to load upcoming appointments. Please try again later."
            );
            setUpcomingData([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Initialize component and fetch data
     * Sets localStorage flags and fetches upcoming appointments
     */
    useEffect(() => {
        logger.debug("🔵 Upcoming component mounting/updating", { flag });
        
        try {
            localStorage.setItem("activeComponent", "appointment");
            localStorage.setItem("path", "upcoming");
            logger.debug("✅ Set localStorage flags");
        } catch (error) {
            logger.error("❌ Error setting localStorage:", error);
        }
        
        fetchData();
        setFlag(false);
    }, [flag]);

    /**
     * Real-time update for join button status
     * Checks every minute if appointment time has been reached
     */
    useEffect(() => {
        logger.debug("⏰ Starting real-time update interval");
        const interval = setInterval(() => {
            setTimeUpdate(prev => prev + 1);
            logger.debug("🔄 Real-time update triggered", { timestamp: Date.now() });
        }, 60000); // Update every minute

        return () => {
            logger.debug("⏰ Clearing real-time update interval");
            clearInterval(interval);
        };
    }, []);

    /**
     * Update flag to trigger data refresh
     * Called when appointment is cancelled or rescheduled
     * 
     * @param {boolean} Changeflag - New flag value
     */
    const ChangeTheFlag = (Changeflag) => {
        logger.debug("🔄 Changing flag to refresh data", { Changeflag });
        setFlag(Changeflag);
    };

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = upcomingData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(upcomingData.length / itemsPerPage);
console.log("currentData", currentData);
    const handlePageChange = (_, page) => {
        setCurrentPage(page);
    };

    return (
        <Box sx={{ display: "flex", width: "95%" }} className="upcoming">
            <AppointmentNavbar />
            <Box
                component="div"
                sx={{
                    position: "relative",
                    top: "4em",
                    width: "100%",
                    display: "flex",
                    height: "100%",
                }}
            >
                <Box sx={{ width: "100%", height: "100%" }}>
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <Box
                            sx={{
                                width: "100%",
                                border: "1px solid #E6E1E5",
                                borderRadius: "8px",
                                padding: "2%",
                                marginLeft: "2%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0rem", // Controls the space between items
                            }}
                        >
                            {loading ? (
                                Array.from({ length: itemsPerPage }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        width="100%"
                                        height={120}
                                        sx={{ mb: 2, borderRadius: "8px" }}
                                    />
                                ))
                            ) : upcomingData.length === 0 ? (
                                <NoAppointmentCard
                                    ButtonLabel="Find Doctor"
                                    ButtonPath="/patientDashboard/dashboard/explore"
                                    text_one="You don’t have any appointments"
                                    text_two="Book an appointment"
                                />
                            ) : (
                                currentData.map((data) => {
                                    // Log appointment data for debugging (only in development)
                                    if (process.env.NODE_ENV === 'development') {
                                        logger.debug("🔍 Appointment data", {
                                            appointment_id: data?.appointment_id,
                                            first_name: data?.first_name,
                                            roomid: data?.roomid,
                                            room_id: data?.room_id,
                                            plan_name: data?.plan_name,
                                            join_status: data?.join_status,
                                        });
                                    }
                                    console.log("data_all_in_upcoming", data);
                                    /**
                                     * Determine if patient can join appointment
                                     * Uses backend join_status as primary source, with frontend time check as fallback
                                     */
                                    const canJoin = isAppointmentTimeReached(
                                        data?.appointment_date, 
                                        data?.appointment_time, 
                                        data?.join_status
                                    );
                                    const isDisabled = !canJoin;
                                    console.log("canJoin", canJoin);
                                    console.log("isDisabled", isDisabled);
                                    /**
                                     * Determine join path based on appointment type
                                     * - video: Video calling SDK route
                                     * - message: Chat route with room ID
                                     */
                                    const getJoinPath = () => {
                                        if (!canJoin) return null;
                                        
                                        if (data?.plan_name === 'video') {
                                            return `/videocallingsdk/${data?.appointment_id}`;
                                        } else if (data?.plan_name === 'message') {
                                            console.log("data_in_messagee", data);
                                            const roomId = data.roomid || data.room_id || 'default';

                                            return `/patientDashboard/appointment/chats/${data.first_name}/${roomId}/${data?.appointment_id}`;
                                        }
                                        
                                        return null;
                                    };
                                    
                                    return (
                                        <UpcomingCard
                                            key={data.id || data.appointment_id}
                                            data={data}
                                            path={{
                                                reject: "/sec/patient/RejectAppointment",
                                                rescheduled: "/sec/patient/resheduleAppointment", // Fixed typo: reshedule → reschedule
                                                join: getJoinPath(),
                                            }}
                                            DrImage={data.profile_picture || DrImage}
                                            label={canJoin ? "" : "Not Available"}
                                            isDisabled={isDisabled}
                                            changeFlagState={ChangeTheFlag}
                                        />
                                    );
                                })
                            )}

                            {!loading && upcomingData.length > itemsPerPage && (
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    sx={{ mt: 2, alignSelf: "center" }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Upcoming;
