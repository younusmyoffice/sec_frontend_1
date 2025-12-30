import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logger from '../../../utils/logger'; // Centralized logging

/**
 * AdminDoctor Component
 * 
 * Main container component for HCF Admin Doctor management section
 * Features:
 * - Default navigation to "All Doctors" page
 * - Route management for nested doctor routes
 * - Path tracking in localStorage for navigation persistence
 * 
 * Routes:
 * - /hcfadmin/doctor/alldoctors - All Doctors listing
 * - /hcfadmin/doctor/active - Active Doctors listing
 * - /hcfadmin/doctor/blocked - Blocked Doctors listing
 * - /hcfadmin/doctor/adddoctor - Add new doctor form
 * 
 * @component
 */
const AdminDoctor = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Initialize component and handle default routing
     * Redirects to "All Doctors" page if at base route
     * Stores current path in localStorage for navigation persistence
     */
    useEffect(() => {
        logger.debug("🔵 AdminDoctor component rendering", {
            pathname: location.pathname
        });

        // Hide location search container for doctor management pages
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }

        // Default navigation: redirect to "All Doctors" if at base route
        const baseRoute = "/hcfadmin/doctor";
        if (location.pathname === baseRoute || location.pathname === `${baseRoute}/`) {
            logger.debug("📍 At base route, navigating to All Doctors");
            navigate('/hcfadmin/doctor/alldoctors', { replace: true });
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

export default AdminDoctor;