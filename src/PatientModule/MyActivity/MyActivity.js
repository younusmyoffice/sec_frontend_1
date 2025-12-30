import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./MyActivity.scss";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";
import DrImage from "../../static/images/DrImages/drProfileImage.png";
import axiosInstance from "../../config/axiosInstance"; // Handles access token automatically
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoAppointmentCard from "../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { getProfileImageSrc } from "../../utils/imageUtils";
import logger from "../../utils/logger"; // Centralized logging
import toastService from "../../services/toastService"; // Toast notifications

/**
 * MyActivity Component
 * 
 * Displays patient activity including:
 * - Appointment history
 * - Medical reports
 * - Activity filtering (View All / Show Less)
 * - Nested routing for reports (Received/Shared)
 * 
 * Features:
 * - Fetches patient activity from API
 * - Toggle between showing all activities or just first 2
 * - Reports section with nested routes (Received/Shared)
 * - Loading states with skeletons
 * - Error handling with fallback UI
 * 
 * @component
 */
const MyActivity = () => {
    logger.debug("🔵 MyActivity component rendering");
    const navigate = useNavigate();
    const [myactivity, setMyactivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [showAllActivities, setShowAllActivities] = useState(false); // Toggle between view all and limited view
    
    /**
     * Fetch patient activity data from API
     * Retrieves appointment history and activity information
     * Uses axiosInstance for authenticated requests
     */
    const fetchDataNew = async () => {
        logger.debug("📡 Fetching patient activity data");
        setIsLoading(true);
        
        try {
            // Get patient SUID from localStorage
            const patientSuid = localStorage.getItem("patient_suid");
            
            if (!patientSuid) {
                logger.error("❌ Patient SUID not found in localStorage");
                toastService.error("Patient information not available");
                setMyactivity([]);
                return;
            }
            
            logger.debug("🔍 Fetching activity for patient:", { patientSuid });
            
            const response = await axiosInstance.get(
                `/sec/patient/patientActivity/${patientSuid}`
            );
            
            const activityData = response?.data?.response || [];
            
            logger.debug("✅ Patient activity fetched successfully", { count: activityData.length });
            
            setAppointmentDate(response?.data?.response?.appointment_date);
            setMyactivity(activityData);
            
            if (activityData.length > 0) {
                toastService.success(`${activityData.length} activities loaded`);
            } else {
                logger.warn("⚠️ No activities found for this patient");
            }
        } catch (error) {
            logger.error("❌ Failed to fetch patient activity:", error);
            toastService.error("Failed to load your activities");
            setMyactivity([]); // Fallback to empty array
            setAppointmentDate(""); // Clear appointment date
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Initialize component and fetch data on mount
     * Navigates to the default reports section (received)
     */
    useEffect(() => {
        logger.debug("🔵 MyActivity component mounted");
        
        try {
            // Fetch patient activity data
            fetchDataNew();
            
            // Navigate to received reports section by default
            navigate("/patientDashboard/dashboard/myactivity/received", { replace: false });
            
            logger.debug("✅ Navigation to received section completed");
        } catch (error) {
            logger.error("❌ Error during initialization:", error);
        }
    }, []);

    /**
     * Filter activities based on view mode
     * - showAllActivities = true: Show all activities
     * - showAllActivities = false: Show only first 2 activities
     */
    const displayedActivities = showAllActivities ? myactivity : myactivity.slice(0, 2);

    return (
        <Box sx={{ width: "98%", display: "flex", flexDirection: "column" }}>
            {/* Navigation tabs - Explore / My Activity */}
            <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                <NavLink to={"/patientDashboard/dashboard/explore"}>Explore</NavLink>
                <NavLink to={"/patientDashboard/dashboard/myactivity"}>My Activity</NavLink>
            </Box>

            {/* Appointment Activities Container */}
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        width: "100%",
                        border: "1px solid #E6E1E5",
                        borderRadius: "8px",
                        padding: "2%",
                        margin: "1%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography>Appointment</Typography>
                        <CustomButton
                            buttonCss={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "22px",
                                borderRadius: "50px",
                            }}
                            label={showAllActivities ? "Show Less" : "View All"}
                            handleClick={() => {
                                logger.debug("🖱️ Toggle view all activities", { 
                                    showingAll: !showAllActivities 
                                });
                                setShowAllActivities(!showAllActivities);
                            }}
                        />
                    </Box>

                    {/* Loading state - Show skeleton while fetching data */}
                    {isLoading ? (
                        <Skeleton count={1} height={200} style={{ marginTop: "10px" }} />
                    ) : displayedActivities.length === 0 ? (
                        // Empty state - No activities found
                        <NoAppointmentCard text_one={"No activity recorded"} />
                    ) : (
                        // Activity cards - Map through displayed activities
                        displayedActivities.map((cardactivity) => (
                            <Box
                                key={cardactivity?.appointment_id}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    borderBottom: "1px solid #E6E1E5",
                                    marginTop: "3%",
                                }}
                            >
                                {/* Doctor Profile Image */}
                                <Box
                                    sx={{
                                        width: "143px",
                                        height: "143px",
                                        padding: "1%",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <Box
                                        sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                                        component={"img"}
                                        src={getProfileImageSrc(cardactivity?.profile_picture, DrImage)}
                                        alt={`${cardactivity?.first_name} ${cardactivity?.last_name}`}
                                    />
                                </Box>

                                {/* Activity Card Content - Name, Plan, Status, Date */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        padding: "2%",
                                    }}
                                >
                                    <Typography>{`${cardactivity?.first_name} ${cardactivity?.middle_name} ${cardactivity?.last_name}`}</Typography>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "5%",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#313033",
                                                fontFamily: "Poppins",
                                                fontSize: "12px",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                lineHeight: "18px",
                                                letterSpacing: "0.096px",
                                            }}
                                        >
                                            {cardactivity?.plan_name}
                                        </Typography>
                                        <CustomButton
                                            buttonCss={{
                                                marginLeft: "10%",
                                                borderRadius: "50px",
                                                fontFamily: "Poppins",
                                                fontSize: "14px",
                                                height: "32px",
                                                fontStyle: "normal",
                                                fontWeight: "600",
                                                lineHeight: "22px",
                                            }}
                                            isTransaprent={true}
                                            label={`${cardactivity?.status}`}
                                        />
                                    </Box>
                                    <Typography
                                        sx={{
                                            color: "#313033",
                                            fontFamily: "Poppins",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            lineHeight: "18px",
                                            letterSpacing: "0.096px",
                                            marginTop: "15%",
                                        }}
                                    >
                                        {cardactivity?.appointment_date
                                            ? `${cardactivity?.appointment_date.split("T")[0]} | ${
                                                  cardactivity?.appointment_date
                                                      .split("T")[1]
                                                      ?.split(".")[0]
                                              }`
                                            : "No date found"}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>
            </Box>

            {/* Reports Container */}
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        width: "100%",
                        border: "1px solid #E6E1E5",
                        borderRadius: "8px",
                        padding: "2%",
                        margin: "1%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            paddingLeft: "1%",
                        }}
                    >
                        <Typography>Reports</Typography>
                        <CustomButton
                            buttonCss={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "22px",
                                borderRadius: "50px",
                            }}
                            label="View all"
                            handleClick={() => {
                                logger.debug("🔗 Navigating to reports section");
                                navigate(`/patientDashboard/manage/reports/received`);
                            }}
                        />
                    </Box>

                    {/* Reports Navigation Tabs - Received / Shared */}
                    <Box className={"NavBar-Box"} sx={{ width: "50%", margin: 0 }}>
                        <NavLink to={"received"}>Received</NavLink>
                        <NavLink to={"shared"}>Shared</NavLink>
                    </Box>

                    {/* Reports Content Area - Renders nested routes (Received/Shared) */}
                    <Box sx={{ width: "100%", padding: "1%", margin: "1%" }}>
                        {isLoading ? (
                            // Loading skeletons for reports
                            <Skeleton count={3} height={150} style={{ marginTop: "10px" }} />
                        ) : (
                            // Render nested routes (Received/Shared components)
                            <Outlet />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MyActivity;
