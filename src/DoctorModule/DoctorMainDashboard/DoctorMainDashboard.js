/**
 * DoctorMainDashboard Component
 * 
 * Main dashboard container for doctor module with routing to:
 * - Request appointments view
 * - Notification view
 * 
 * Features:
 * - Automatic navigation to request page on mount
 * - Path persistence in localStorage
 * - Outlet for nested route rendering
 * 
 * @component
 */

import { Box } from "@mui/material";
import "./DoctorMainDashboard.scss";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logger from "../../utils/logger"; // Centralized logging

/**
 * DoctorMainDashboard - Main dashboard wrapper component
 * 
 * Manages routing between request and notification views
 * Automatically redirects to request page on mount
 */
const DoctorMainDashboard = () => {
    logger.debug("🔵 DoctorMainDashboard component rendering");
    
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Initialize component - Navigate to appropriate route on mount
     * Only navigates if user is on parent route or invalid route
     * Allows navigation to child routes (request, notification) to work
     */
    useEffect(() => {
        // Check if we're already on a valid child route
        // Routes are nested under /doctorDashboard, so paths are /doctorDashboard/request and /doctorDashboard/notification
        const isOnRequestRoute = location.pathname === "/doctorDashboard/request" || 
                                 location.pathname.endsWith("/request");
        const isOnNotificationRoute = location.pathname === "/doctorDashboard/notification" || 
                                      location.pathname.endsWith("/notification");
        
        // Only navigate if we're NOT already on a valid child route
        if (!isOnRequestRoute && !isOnNotificationRoute) {
            // Determine route based on stored preference or default to request
            const storedPath = localStorage.getItem("path");
            logger.debug("🔄 Initializing DoctorMainDashboard, current path:", location.pathname);
            
            let targetRoute = "/doctorDashboard/request"; // Default - matches AppRouter route definition
            
            if (storedPath === "request" || storedPath?.includes("request")) {
                targetRoute = "/doctorDashboard/request";
            } else if (storedPath === "notification" || storedPath?.includes("notification")) {
                targetRoute = "/doctorDashboard/notification";
            }
            
            logger.debug("📍 Navigating to:", targetRoute);
            navigate(targetRoute, { replace: true });
        } else {
            logger.debug("✅ Already on valid route, skipping navigation:", location.pathname);
        }
    }, []); // Empty dependency array - only run on mount, prevents navigation loop

    /**
     * Update stored path preference when location changes
     * Stores current pathname in localStorage for persistence across sessions
     */
    useEffect(() => {
        if (location.pathname) {
            logger.debug("📍 Updating stored path:", location.pathname);
            localStorage.setItem("path", location.pathname);
        }
    }, [location.pathname]);

    return (
        <Box sx={{ width: "100%", height: "95vh" }}>
            {/* Outlet renders nested routes (Request or Notification components) */}
            <Outlet />
        </Box>
    );
};

export default DoctorMainDashboard;
