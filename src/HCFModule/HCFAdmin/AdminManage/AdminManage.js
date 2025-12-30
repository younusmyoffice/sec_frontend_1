import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logger from "../../../utils/logger"; // Centralized logging

/**
 * AdminManage Component
 * 
 * Main container component for HCF Admin Manage section
 * Features:
 * - Default navigation to "Sale Activities" page
 * - Route management for nested manage routes
 * - Path tracking in localStorage for navigation persistence
 * 
 * Routes:
 * - /hcfadmin/hcfadminmanage/hcfadminsale - Sale Activities
 * - /hcfadmin/hcfadminmanage/hcfadminoverview - Overview
 * - /hcfadmin/hcfadminmanage/hcfadminbooking - Bookings
 * - /hcfadmin/hcfadminmanage/hcfadminpayout - Payout
 * - /hcfadmin/hcfadminmanage/hcfadminauditlog - Audit Logs
 * 
 * @component
 */
const AdminManage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Initialize component and handle default routing
     * Redirects to appropriate route based on localStorage path or defaults to "Sale Activities"
     * Stores current path in localStorage for navigation persistence
     */
    useEffect(() => {
        logger.debug("🔵 AdminManage component rendering", {
            pathname: location.pathname
        });

        // Hide location search container for manage pages
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }

        // Default navigation: redirect based on saved path or default to "Sale Activities"
        const baseRoute = "/hcfadmin/hcfadminmanage";
        if (location.pathname === baseRoute || location.pathname === `${baseRoute}/`) {
            const savedPath = localStorage.getItem("path");
            const routeMap = {
                "hcfadminsale": "/hcfadmin/hcfadminmanage/hcfadminsale",
                "hcfadminoverview": "/hcfadmin/hcfadminmanage/hcfadminoverview",
                "hcfadminbooking": "/hcfadmin/hcfadminmanage/hcfadminbooking",
                "hcfadminpayout": "/hcfadmin/hcfadminmanage/hcfadminpayout",
                "hcfadminauditlog": "/hcfadmin/hcfadminmanage/hcfadminauditlog",
            };
            
            const targetRoute = routeMap[savedPath] || "/hcfadmin/hcfadminmanage/hcfadminsale";
            logger.debug("📍 At base route, navigating to:", targetRoute);
            navigate(targetRoute, { replace: true });
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

export default AdminManage;
