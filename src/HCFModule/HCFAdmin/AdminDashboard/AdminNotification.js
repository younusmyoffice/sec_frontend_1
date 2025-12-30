import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logger from '../../../utils/logger'; // Centralized logging

/**
 * HCFAdminDashboard Component
 * 
 * Main container component for HCF Admin Dashboard section
 * Features:
 * - Default navigation to "Notifications" page
 * - Route management for nested dashboard routes
 * - Path tracking in localStorage for navigation persistence
 * 
 * Routes:
 * - /hcfadmin/notification - Notifications page
 * 
 * @component
 */
const HCFAdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Initialize component and handle default routing
     * Redirects to "Notifications" page if at base route
     * Stores current path in localStorage for navigation persistence
     */
    useEffect(() => {
        logger.debug("🔵 HCFAdminDashboard component rendering", {
            pathname: location.pathname
        });

        // Hide location search container for dashboard pages
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }

        // Default navigation: redirect to "Notifications" if at base route
        const baseRoute = "/hcfadmin";
        if (location.pathname === baseRoute || location.pathname === `${baseRoute}/`) {
            logger.debug("📍 At base route, navigating to Notifications");
            navigate('/hcfadmin/notification', { replace: true });
        }

        // Store current path in localStorage for navigation persistence
        try {
            localStorage.setItem("path", location.pathname);
            logger.debug("✅ Path stored in localStorage:", location.pathname);
        } catch (error) {
            logger.error("❌ Failed to store path in localStorage:", error);
        }

        // Cleanup: restore location search container when component unmounts
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
                logger.debug("🔄 Location search container restored");
            }
        };
    }, [location.pathname, navigate]);

    return (
        <Box 
            sx={{ 
                width: "100%", 
                height: "95vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Outlet />
        </Box>
    );
};

export default HCFAdminDashboard;