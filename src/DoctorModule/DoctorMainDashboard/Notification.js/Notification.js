/**
 * Notification Component
 * 
 * Displays doctor notifications and appointment statistics:
 * - Appointment request count
 * - Upcoming appointments count
 * - Completed appointments count
 * - Notification cards with view all/less functionality
 * 
 * Features:
 * - Loading states with skeleton loaders ✅
 * - Error handling with toast notifications ✅
 * - Empty state handling ✅
 * - View all/less toggle for notifications ✅
 * 
 * API Endpoints:
 * - GET /sec/Doctor/DocDashoardApp/in_progress/{doctor_id} (request appointments)
 * - GET /sec/Doctor/DocDashoardApp/booked/{doctor_id} (upcoming appointments)
 * - GET /sec/Doctor/DocDashoardApp/completed/{doctor_id} (completed appointments)
 * - GET /sec/Doctor/DoctorNotification/{doctor_id} (notifications)
 * 
 * Security:
 * - Uses axiosInstance (automatic JWT token injection) ✅
 * - Validates doctor_id before API calls ✅
 * 
 * Error Handling:
 * - Toast notifications for errors ✅
 * - Graceful fallback to empty arrays ✅
 * 
 * @component
 */

import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import DoctorAppointmentCard from "../../CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import CustomNotificationCard from "../../CustomDoctorComponent/Cards/CardNotification/CardNotification";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import CustomButton from "../../../components/CustomButton";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * Notification Component - Doctor Notifications View
 * 
 * Displays appointment statistics and notification cards
 */
const Notification = () => {
    logger.debug("🔵 Notification component rendering");
    
    // State management
    const [requestData, setRequestData] = useState([]);
    const [upcomingData, setUpcomingData] = useState([]);
    const [completedData, setCompletedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notificationData, setNotificationData] = useState([]);
    const [viewAll, setViewAll] = useState(false);
    
    // Ref for location-search-container element to avoid direct DOM manipulation
    const locationSearchContainerRef = useRef(null);

    /**
     * Validate doctor ID from localStorage
     * Ensures doctor ID is present before making API calls
     * 
     * @returns {string|null} Doctor ID or null if invalid
     */
    const validateDoctorId = () => {
        const doctorId = localStorage.getItem("doctor_suid");
        
        if (!doctorId) {
            logger.warn("⚠️ Doctor ID not found in localStorage");
            toastService.warning("Doctor ID is missing. Please log in again.");
            return null;
        }
        
        logger.debug("✅ Doctor ID validated:", doctorId);
        return doctorId;
    };

    /**
     * Initialize component - Set localStorage values and fetch data
     * Hides location search container and fetches all dashboard data
     */
    useEffect(() => {
        logger.debug("🔄 Initializing Notification component");
        
        // Set active component and path for navigation state
        localStorage.setItem("activeComponent", "dashboard");
        localStorage.setItem("path", "notification");
        
        // Hide location search container using ref (safer than direct DOM manipulation)
        // Note: Consider using a context or state management for this in the future
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
        }

        fetchAllData();
        
        // Cleanup: restore container display on unmount
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
            }
        };
    }, []);

    /**
     * Fetch all dashboard data in parallel
     * Loads appointment counts and notifications simultaneously
     */
    const fetchAllData = async () => {
        const doctorId = validateDoctorId();
        if (!doctorId) {
            setLoading(false);
            return;
        }
        
        logger.debug("📡 Fetching all dashboard data");
        setLoading(true);
        
        try {
            // Fetch all data in parallel for better performance
            await Promise.all([
                fetchRequest(doctorId), 
                fetchUpcoming(doctorId), 
                fetchNotifications(doctorId), 
                fetchCompleted(doctorId)
            ]);
            
            logger.debug("✅ All dashboard data fetched successfully");
        } catch (error) {
            logger.error("❌ Error fetching dashboard data:", error);
            toastService.error("Failed to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch in-progress appointment requests
     * 
     * @param {string} doctorId - Doctor ID from localStorage
     */
    const fetchRequest = async (doctorId) => {
        if (!doctorId) {
            logger.warn("⚠️ Cannot fetch request data: doctor ID missing");
            return;
        }
        
        logger.debug("📋 Fetching in-progress appointment requests");
        
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/DocDashoardApp/in_progress/${doctorId}`
            );
            
            logger.debug("✅ Request data received", {
                count: response?.data?.response?.length || 0
            });
            
            setRequestData(response?.data?.response || []);
        } catch (error) {
            logger.error("❌ Failed to fetch request data:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load appointment requests"
            );
            setRequestData([]);
        }
    };

    /**
     * Fetch upcoming appointments
     * 
     * @param {string} doctorId - Doctor ID from localStorage
     */
    const fetchUpcoming = async (doctorId) => {
        if (!doctorId) {
            logger.warn("⚠️ Cannot fetch upcoming data: doctor ID missing");
            return;
        }
        
        logger.debug("📅 Fetching upcoming appointments");
        
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/DocDashoardApp/booked/${doctorId}`
            );
            
            logger.debug("✅ Upcoming data received", {
                count: response?.data?.response?.length || 0
            });
            
            setUpcomingData(response?.data?.response || []);
        } catch (error) {
            logger.error("❌ Failed to fetch upcoming data:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load upcoming appointments"
            );
            setUpcomingData([]);
        }
    };

    /**
     * Fetch completed appointments
     * 
     * @param {string} doctorId - Doctor ID from localStorage
     */
    const fetchCompleted = async (doctorId) => {
        if (!doctorId) {
            logger.warn("⚠️ Cannot fetch completed data: doctor ID missing");
            return;
        }
        
        logger.debug("✅ Fetching completed appointments");
        
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/DocDashoardApp/completed/${doctorId}`
            );
            
            logger.debug("✅ Completed data received", {
                count: response?.data?.response?.length || 0
            });
            
            setCompletedData(response?.data?.response || []);
        } catch (error) {
            logger.error("❌ Failed to fetch completed data:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load completed appointments"
            );
            setCompletedData([]);
        }
    };

    /**
     * Fetch doctor notifications
     * 
     * @param {string} doctorId - Doctor ID from localStorage
     */
    const fetchNotifications = async (doctorId) => {
        if (!doctorId) {
            logger.warn("⚠️ Cannot fetch notifications: doctor ID missing");
            return;
        }
        
        logger.debug("🔔 Fetching doctor notifications");
        
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/DoctorNotification/${doctorId}`
            );
            
            logger.debug("✅ Notifications received", {
                count: response?.data?.response?.length || 0
            });
            
            setNotificationData(response?.data?.response || []);
        } catch (error) {
            logger.error("❌ Failed to fetch notifications:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load notifications"
            );
            setNotificationData([]);
        }
    };

    /**
     * Render skeleton loaders for notification cards
     * Shows loading placeholders while data is being fetched
     * 
     * @param {number} count - Number of skeleton loaders to render
     * @returns {JSX.Element[]} Array of skeleton components
     */
    const renderSkeletons = (count) =>
        Array.from({ length: count }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="100%" height={100} sx={{ mb: 2 }} />
        ));

    /**
     * Check if all appointment data is empty
     * Used to determine if empty state should be shown
     */
    const isDataEmpty =
        !loading && !requestData.length && !upcomingData.length && !completedData.length;

    /**
     * Toggle view all/less for notifications
     * Switches between showing 3 notifications and all notifications
     */
    const toggleViewAll = () => {
        logger.debug("🔄 Toggling view all notifications", { 
            currentState: viewAll,
            totalNotifications: notificationData.length 
        });
        setViewAll((prev) => !prev);
    };

    /**
     * Get displayed notification data based on viewAll state
     * Shows first 3 notifications by default, all when viewAll is true
     */
    const displayedData = viewAll ? notificationData : notificationData.slice(0, 3);

    return (
        <Box sx={{ 
            width: "100%", 
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // Prevent outer container from scrolling
        }}>
            <Box className="Appointment-card">
                {loading ? (
                    <Skeleton variant="text" width={200} height={200} />
                ) : (
                    <DoctorAppointmentCard
                        NumberOfAppointments={requestData.length}
                        AppointmentType={"Appointment Request"}
                    />
                )}
                {loading ? (
                    <Skeleton variant="text" width={200} height={200} />
                ) : (
                    <DoctorAppointmentCard
                        NumberOfAppointments={upcomingData.length}
                        AppointmentType={"Upcoming Appointments"}
                    />
                )}
                {loading ? (
                    <Skeleton variant="text" width={200} height={200} />
                ) : (
                    <DoctorAppointmentCard
                        NumberOfAppointments={completedData.length}
                        AppointmentType={"Completed"}
                    />
                )}
            </Box>

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
                    alignItems: "center",
                    justifyContent: loading || isDataEmpty ? "center" : "flex-start",
                }}>
                    {loading ? (
                        renderSkeletons(3)
                    ) : notificationData.length === 0 ? (
                        <NoAppointmentCard text_one={"No Notifications Found"} />
                    ) : (
                        displayedData.map((data, index) => (
                            <CustomNotificationCard key={index} Data={data} />
                        ))
                    )}
                </Box>

                {/* View All/Show Less button - positioned at bottom with proper spacing */}
                {!loading && notificationData.length > 3 && (
                    <Box sx={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        paddingTop: "1.5rem",
                        paddingBottom: "1rem",
                        marginTop: "auto", // Push to bottom
                    }}>
                        <CustomButton
                            label={viewAll ? "Show Less" : "View All"}
                            handleClick={toggleViewAll}
                            isTransaprent={true}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Notification;
