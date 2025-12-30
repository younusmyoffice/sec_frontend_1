import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import CustomNotificationCard from "../../../../DoctorModule/CustomDoctorComponent/Cards/CardNotification/CardNotification";
import DoctorAppointmentCard from "../../../../DoctorModule/CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import CustomButton from "../../../../components/CustomButton";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback

/**
 * HCFAdminNotifications Component
 * 
 * Displays HCF Admin dashboard with diagnostic count, doctor count, and notifications
 * Features:
 * - Dashboard cards showing diagnostic staff and active doctor counts
 * - Notifications list with scrollable container
 * - View All/Show Less functionality
 * 
 * Security:
 * - Validates HCF admin ID from localStorage
 * - Uses axiosInstance for automatic token handling
 * 
 * @component
 */
const HCFAdminNotifications = () => {
    // ============================================
    // State Management
    // ============================================
    
    const [digCount, setDigCount] = useState(0);
    const [docCount, setDocCount] = useState(0);
    const [hcfId] = useState(localStorage.getItem("hcfadmin_suid"));
    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState([]);
    const [viewAll, setViewAll] = useState(false);

    // ============================================
    // Security & Validation Functions
    // ============================================

    /**
     * Validate HCF admin ID from localStorage
     * SECURITY: Ensures admin ID is present before making API calls
     * 
     * @returns {string|null} HCF admin ID or null if invalid
     */
    const validateHcfAdminId = useCallback(() => {
        const adminId = localStorage.getItem("hcfadmin_suid");

        if (!adminId) {
            logger.warn("⚠️ HCF Admin ID not found in localStorage");
            toastService.warning("HCF Admin ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ HCF Admin ID validated:", adminId);
        return adminId;
    }, []);

    // ============================================
    // API Fetch Functions
    // ============================================

    /**
     * Fetch diagnostic staff count
     * Loads count of diagnostic staff for the dashboard card
     */
    const fetchDashboardCountDiag = useCallback(async () => {
        const adminId = validateHcfAdminId();
        if (!adminId) {
            return;
        }

        logger.debug("📋 Fetching diagnostic staff count");
        
        try {
            const resp = await axiosInstance.get(`/sec/hcf/dashboardDiagnosticCount/${adminId}`);
            const count = resp?.data[0]?.diagnostic_staff_count || 0;
            
            logger.debug("✅ Diagnostic staff count received", { count });
            setDigCount(count);
        } catch (error) {
            logger.error("❌ Error fetching diagnostic count:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load diagnostic staff count";
            toastService.error(errorMessage);
            setDigCount(0); // Fallback to 0
        }
    }, [validateHcfAdminId]);

    /**
     * Fetch active doctor count
     * Loads count of active doctors for the dashboard card
     */
    const fetchDashboardCountDoc = useCallback(async () => {
        const adminId = validateHcfAdminId();
        if (!adminId) {
            return;
        }

        logger.debug("📋 Fetching active doctor count");
        
        try {
            const resp = await axiosInstance.get(`/sec/hcf/dashboardClinicDoctorCount/${adminId}`);
            const count = resp?.data[0]?.doctor_count || 0;
            
            logger.debug("✅ Active doctor count received", { count });
            setDocCount(count);
        } catch (error) {
            logger.error("❌ Error fetching doctor count:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load doctor count";
            toastService.error(errorMessage);
            setDocCount(0); // Fallback to 0
        }
    }, [validateHcfAdminId]);

    /**
     * Fetch notifications
     * Loads notifications list for the admin
     * NOTE: API endpoint needs to be confirmed/added by backend team
     */
    const fetchNotification = useCallback(async () => {
        const adminId = validateHcfAdminId();
        if (!adminId) {
            return;
        }

        logger.debug("📋 Fetching notifications");
        
        try {
            // TODO: Add correct API endpoint when available from backend
            // Currently using empty endpoint - needs to be updated
            const resp = await axiosInstance.get(`/sec/hcf/getNotifications/${adminId}`);
            const notifications = resp?.data?.response || [];
            
            logger.debug("✅ Notifications received", { count: notifications.length });
            setNotify(notifications);
        } catch (error) {
            logger.error("❌ Error fetching notifications:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            // Don't show error toast for missing endpoint - this is expected until API is ready
            if (error?.response?.status !== 404) {
                const errorMessage = error?.response?.data?.message ||
                                    "Failed to load notifications";
                toastService.error(errorMessage);
            }
            setNotify([]); // Ensure state is an array even on error
        }
    }, [validateHcfAdminId]);

    // ============================================
    // Effects
    // ============================================

    /**
     * Initialize component and fetch all dashboard data
     * Fetches diagnostic count, doctor count, and notifications in parallel
     */
    useEffect(() => {
        logger.debug("🔵 HCFAdminNotifications component initializing");
        
        // Hide location search container on load
        const locationContainer = document.getElementById("location-search-container");
        if (locationContainer) {
            locationContainer.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }

        // Fetch all data in parallel
        const fetchData = async () => {
            setLoading(true);
            logger.debug("📊 Fetching all dashboard data");
            
            try {
                await Promise.all([
                    fetchDashboardCountDiag(), 
                    fetchDashboardCountDoc(), 
                    fetchNotification()
                ]);
                logger.debug("✅ All dashboard data fetched successfully");
            } catch (error) {
                logger.error("❌ Error fetching dashboard data:", error);
                toastService.error("Failed to load some dashboard information");
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();

        // Cleanup: restore location search container when component unmounts
        return () => {
            if (locationContainer) {
                locationContainer.style.display = "";
                logger.debug("🔄 Location search container restored");
            }
        };
    }, [fetchDashboardCountDiag, fetchDashboardCountDoc, fetchNotification]);

    // ============================================
    // Event Handlers
    // ============================================

    /**
     * Toggle between showing all notifications and showing only first 3
     * Updates viewAll state to control which notifications are displayed
     */
    const toggleViewAll = () => {
        setViewAll((prev) => {
            const newValue = !prev;
            logger.debug("🔄 Toggle view all notifications:", newValue);
            return newValue;
        });
    };

    const displayedData = viewAll ? notify : notify.slice(0, 3);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "98%", height: "90%", overflow: "hidden" }}>
            <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", marginTop: "2em" }}>
                <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
                    {/* Dashboard Cards */}
                    <Box sx={{ 
                        display: "flex", 
                        justifyContent: "flex-start", 
                        gap: "1rem",
                        marginBottom: "1rem", 
                        flexShrink: 0,
                        width: "100%",
                        flexWrap: "wrap",
                    }}>
                        {loading ? (
                            <>
                                <Skeleton variant="rectangular" width={210} height={118} sx={{ borderRadius: "1rem" }} />
                                <Skeleton variant="rectangular" width={210} height={118} sx={{ borderRadius: "1rem" }} />
                            </>
                        ) : (
                            <>
                                <Box sx={{ flex: "1 1 300px", minWidth: "250px", maxWidth: "350px" }}>
                                    <DoctorAppointmentCard
                                        AppointmentType="Diagnostic"
                                        NumberOfAppointments={digCount}
                                    />
                                </Box>
                                <Box sx={{ flex: "1 1 300px", minWidth: "250px", maxWidth: "350px" }}>
                                    <DoctorAppointmentCard
                                        AppointmentType="Active Doctors"
                                        NumberOfAppointments={docCount}
                                    />
                                </Box>
                            </>
                        )}
                    </Box>

                    {/* Navigation Bar */}
                    <Box sx={{ flexShrink: 0, zIndex: 10, width: "100%", height: "70px", position: "relative", marginBottom: "1rem" }}>
                        <nav className="NavBar-Container-Appoinement">
                            <NavLink to="/hcfadmin/notification">Notifications</NavLink>
                        </nav>
                    </Box>

                    {/* Scrollable Notifications Section */}
                    <Box 
                        sx={{ 
                            flex: 1,
                            width: "100%", 
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0,
                            overflow: "hidden",
                            border: "1px solid #E6E1E5",
                            borderRadius: "0.5rem",
                            padding: "2%",
                        }}
                    >
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                            alignItems: "center",
                            justifyContent: loading || notify.length === 0 ? "center" : "flex-start",
                            overflowY: "auto",
                            overflowX: "hidden",
                            flex: 1,
                            minHeight: 0,
                            maxHeight: "calc(100vh - 350px)", // Adjusted to account for dashboard cards, navbar, and spacing
                        }}>
                            {loading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        width="100%"
                                        height={100}
                                        sx={{ marginBottom: "10px", borderRadius: "0.5rem" }}
                                    />
                                ))
                            ) : notify.length === 0 ? (
                                <NoAppointmentCard text_one="No notifications available" />
                            ) : (
                                displayedData.map((data, index) => (
                                    <CustomNotificationCard key={index} Data={data} />
                                ))
                            )}
                        </Box>

                        {/* View All/Show Less Button - Fixed at bottom of scrollable container */}
                        {!loading && notify.length > 3 && (
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: "1.5rem",
                                paddingBottom: "1rem",
                                marginTop: "auto",
                                flexShrink: 0,
                            }}>
                                <CustomButton
                                    label={viewAll ? "Show Less" : "View All"}
                                    handleClick={toggleViewAll}
                                    isTransaprent
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HCFAdminNotifications;
