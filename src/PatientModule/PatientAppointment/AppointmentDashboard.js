import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logger from "../../utils/logger"; // Centralized logging

/**
 * AppointmentDashboard Component
 * 
 * Main dashboard container for appointment management
 * Features:
 * - Routes to appropriate appointment tab based on localStorage (only on initial load)
 * - Hides location search container
 * - Renders child routes (Upcoming, Completed, Cancelled, Chats)
 * 
 * Uses React Router's Outlet for nested routing
 * 
 * @component
 */
const AppointmentDashboard = () => {
    logger.debug("🔵 AppointmentDashboard component rendering");
    
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    
    /**
     * Determine initial route based on localStorage path
     * Falls back to 'upcoming' if no path is set
     */
    const getInitialRoute = () => {
        try {
            const path = localStorage.getItem("path");
            logger.debug("📍 Appointment path from localStorage", { path });
            
            switch (path) {
                case "upcoming":
                    return "/patientDashboard/appointment/upcoming";
                case "completed":
                    return "/patientDashboard/appointment/completed";
                case "cancelled":
                    return "/patientDashboard/appointment/cancelled";
                default:
                    logger.debug("⚠️ No valid path found, defaulting to upcoming");
                    return "/patientDashboard/appointment/upcoming";
            }
        } catch (error) {
            logger.error("❌ Error accessing localStorage:", error);
            return "/patientDashboard/appointment/upcoming"; // Safe fallback
        }
    };

    /**
     * Initialize dashboard
     * - Only navigate if we're at the base appointment route (no specific tab)
     * - Otherwise, let NavLinks handle navigation
     * - Hide location search container if present
     */
    useEffect(() => {
        logger.debug("🔵 AppointmentDashboard useEffect", { 
            currentPath: location.pathname 
        });
        
        // Only navigate if we're at the base appointment route without a specific tab
        // This allows NavLinks to work properly when clicking tabs
        const baseAppointmentPath = "/patientDashboard/appointment";
        const isBaseRoute = location.pathname === baseAppointmentPath || 
                           location.pathname === `${baseAppointmentPath}/`;
        
        if (isBaseRoute) {
            const initialRoute = getInitialRoute();
            logger.debug("📍 At base route, navigating to:", initialRoute);
            navigate(initialRoute, { replace: true });
        } else {
            logger.debug("📍 Already on a route, not forcing navigation");
        }
        
        // Hide location search container if it exists
        try {
            const locationContainer = document.getElementById('location-search-container');
            if (locationContainer) {
                locationContainer.style.display = "none";
                logger.debug("✅ Location search container hidden");
            } else {
                logger.debug("⚠️ Location search container not found");
            }
        } catch (error) {
            logger.error("❌ Error hiding location search container:", error);
        }
    }, []); // Only run once on mount

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* Appointment content area - renders nested routes */}
            <Box sx={{ width: "100%" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppointmentDashboard;
