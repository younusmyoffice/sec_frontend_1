/**
 * DoctorAppointmentDashboard Component
 * 
 * Main dashboard container for doctor appointment management:
 * - Routes to different appointment views (request, upcoming, completed, cancelled, chats)
 * - Handles navigation based on localStorage path state
 * - Validates doctor authentication before allowing access
 * 
 * Features:
 * - Automatic navigation to appropriate route based on saved path
 * - Doctor ID validation for security
 * - Location search container hidden for cleaner UI
 * - Proper error handling with user feedback
 * 
 * Security:
 * - Validates doctor ID before allowing access
 * - Redirects to login if doctor ID is missing
 * 
 * Error Handling:
 * - Toast notifications for validation errors
 * - Graceful fallback navigation
 * 
 * @component
 */

import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import "./doctorAppointmentDashboard.scss";
import logger from "../../utils/logger"; // Centralized logging
import toastService from "../../services/toastService"; // Toast notifications for user feedback

/**
 * Route mapping configuration
 * Maps localStorage path values to actual route paths
 */
const ROUTE_MAP = {
    request: "/doctorDashboard/doctorAppointment/request",
    upcoming: "/doctorDashboard/doctorAppointment/upcoming",
    completed: "/doctorDashboard/doctorAppointment/completed",
    cancelled: "/doctorDashboard/doctorAppointment/cancelled",
    chats: "/doctorDashboard/doctorAppointment/chats",
};

/**
 * Default route when no path is specified or path is invalid
 */
const DEFAULT_ROUTE = "/doctorDashboard/doctorAppointment/request";

/**
 * DoctorAppointmentDashboard - Main appointment dashboard wrapper
 * 
 * Manages routing between different appointment views based on localStorage state
 * Validates doctor authentication before allowing access
 */
const DoctorAppointmentDashboard = () => {
    logger.debug("🔵 DoctorAppointmentDashboard component rendering");
    
    const navigate = useNavigate();
    const location = useLocation(); // Get current location to check if already on a route

    /**
     * Validate doctor ID from localStorage
     * SECURITY: Ensures doctor ID is present before allowing access to appointment dashboard
     * 
     * @returns {string|null} Doctor ID or null if invalid
     */
    const validateDoctorId = useCallback(() => {
        const doctorId = localStorage.getItem("doctor_suid");
        
        if (!doctorId) {
            logger.warn("⚠️ Doctor ID not found in localStorage - unauthorized access attempt");
            toastService.warning("Doctor ID is missing. Please log in again.");
            return null;
        }
        
        logger.debug("✅ Doctor ID validated:", doctorId);
        return doctorId;
    }, []);

    /**
     * Determine navigation route based on localStorage path
     * Maps path value to actual route, with fallback to default route
     * 
     * @returns {string} Route path to navigate to
     */
    const getNavigationRoute = useCallback(() => {
        const savedPath = localStorage.getItem("path");
        logger.debug("📍 Saved path from localStorage:", savedPath);
        
        // Check if path exists in route map
        if (savedPath && ROUTE_MAP[savedPath]) {
            logger.debug("✅ Route found in map:", ROUTE_MAP[savedPath]);
            return ROUTE_MAP[savedPath];
        }
        
        // Fallback to default route
        logger.debug("⚠️ Invalid or missing path, using default route:", DEFAULT_ROUTE);
        return DEFAULT_ROUTE;
    }, []);

    /**
     * Initialize component - Validate authentication and navigate to appropriate route
     * SECURITY: Validates doctor ID before allowing navigation
     * UI: Hides location search container for cleaner interface
     * 
     * IMPORTANT: Only navigates if we're at the base appointment route (no specific tab)
     * This allows NavLinks to work properly when clicking tabs
     */
    useEffect(() => {
        logger.debug("🔵 DoctorAppointmentDashboard useEffect", { 
            currentPath: location.pathname 
        });
        
        // SECURITY: Validate doctor ID before allowing access
        const doctorId = validateDoctorId();
        if (!doctorId) {
            logger.error("❌ Unauthorized access - redirecting to login");
            toastService.error("Please log in to access appointment dashboard");
            // Redirect to doctor login if doctor ID is missing
            navigate("/doctorLogin");
            return;
        }

        // Set active component for navigation state
        localStorage.setItem("activeComponent", "appointment");

        // Only navigate if we're at the base appointment route without a specific tab
        // This allows NavLinks to work properly when clicking tabs
        const baseAppointmentPath = "/doctorDashboard/doctorAppointment";
        const isBaseRoute = location.pathname === baseAppointmentPath || 
                           location.pathname === `${baseAppointmentPath}/`;
        
        if (isBaseRoute) {
            const initialRoute = getNavigationRoute();
            logger.debug("📍 At base route, navigating to:", initialRoute);
            navigate(initialRoute, { replace: true });
        } else {
            logger.debug("📍 Already on a route, not forcing navigation:", location.pathname);
        }

        // UI: Hide location search container (consistent with other doctor components)
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }
        
        // Cleanup: Restore location search container on unmount
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
                logger.debug("🔄 Location search container restored");
            }
        };
    }, [location.pathname, navigate, validateDoctorId, getNavigationRoute]); // Include location.pathname and getNavigationRoute

    /**
     * Render the dashboard with Outlet for nested routes
     * Outlet renders the child route components (Request, Upcoming, Completed, etc.)
     */
    return (
        <Box 
            sx={{ 
                width: "100%", 
                height: "96vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden", // Prevent outer container scrolling
            }}
            className="doctor-appointment-dashboard"
        >
            {/* Outlet renders child routes based on current URL path */}
            <Outlet />
        </Box>
    );
};

export default DoctorAppointmentDashboard;
