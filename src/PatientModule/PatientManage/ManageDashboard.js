import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logger from "../../utils/logger"; // Centralized logging

/**
 * ManageDashboard Component
 * 
 * Main dashboard container for patient management
 * Features:
 * - Routes to appropriate manage tab based on localStorage (only on initial load)
 * - Renders child routes (BookingHistory, Transactions, Reports, Subscriptions)
 * 
 * Uses React Router's Outlet for nested routing
 * 
 * @component
 */
const ManageDashboard = () => {
    logger.debug("🔵 ManageDashboard component rendering");
    
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    
    /**
     * Determine initial route based on localStorage path
     * Falls back to 'bookinghistory' if no path is set
     */
    const getInitialRoute = () => {
        try {
            const path = localStorage.getItem("path");
            logger.debug("📍 Manage path from localStorage", { path });
            
            switch (path) {
                case "bookinghistory":
                    return "/patientDashboard/manage/bookinghistory";
                case "transactions":
                    return "/patientDashboard/manage/transactions";
                case "reports":
                    return "/patientDashboard/manage/reports";
                case "subscriptions":
                    return "/patientDashboard/manage/subscriptions";
                default:
                    logger.debug("⚠️ No valid path found, defaulting to bookinghistory");
                    return "/patientDashboard/manage/bookinghistory";
            }
        } catch (error) {
            logger.error("❌ Error accessing localStorage:", error);
            return "/patientDashboard/manage/bookinghistory"; // Safe fallback
        }
    };

    /**
     * Initialize dashboard
     * - Only navigate if we're at the base manage route (no specific tab)
     * - Otherwise, let NavLinks handle navigation
     */
    useEffect(() => {
        logger.debug("🔵 ManageDashboard useEffect", { 
            currentPath: location.pathname 
        });
        
        // Only navigate if we're at the base manage route without a specific tab
        // This allows NavLinks to work properly when clicking tabs
        const baseManagePath = "/patientDashboard/manage";
        const isBaseRoute = location.pathname === baseManagePath || 
                           location.pathname === `${baseManagePath}/`;
        
        if (isBaseRoute) {
            const initialRoute = getInitialRoute();
            logger.debug("📍 At base route, navigating to:", initialRoute);
            navigate(initialRoute, { replace: true });
        } else {
            logger.debug("📍 Already on a route, not forcing navigation");
        }
    }, []); // Only run once on mount

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* Manage content area - renders nested routes */}
            <Box sx={{ width: "100%" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default ManageDashboard;
