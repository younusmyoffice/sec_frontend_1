import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logger from '../../../utils/logger'; // Centralized logging

/**
 * AdminDiagnosticCenter Component
 * 
 * Main container component for HCF Admin Diagnostic Center section
 * Features:
 * - Default navigation to "Labs" page
 * - Route management for nested diagnostic center routes
 * - Path tracking in localStorage for navigation persistence
 * 
 * Routes:
 * - /hcfadmin/diagnosticcenter/labs - Labs management
 * - /hcfadmin/diagnosticcenter/staff - Staff management
 * - /hcfadmin/diagnosticcenter/blocked - Blocked staff
 * 
 * @component
 */
const AdminDiagnosticCenter = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Initialize component and handle default routing
     * Redirects to "Labs" page if at base route
     * Stores current path in localStorage for navigation persistence
     */
    useEffect(() => {
        logger.debug("🔵 AdminDiagnosticCenter component rendering", {
            pathname: location.pathname
        });

        // Hide location search container for diagnostic center pages
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }

        // Default navigation: redirect to "Labs" if at base route
        const baseRoute = "/hcfadmin/diagnosticcenter";
        if (location.pathname === baseRoute || location.pathname === `${baseRoute}/`) {
            logger.debug("📍 At base route, navigating to Labs");
            navigate('/hcfadmin/diagnosticcenter/labs', { replace: true });
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

export default AdminDiagnosticCenter;