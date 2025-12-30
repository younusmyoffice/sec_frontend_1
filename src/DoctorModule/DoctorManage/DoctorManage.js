import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

/**
 * DoctorManage Component
 * 
 * Main wrapper component for doctor management functionality:
 * - Acts as a layout container for all manage sub-routes
 * - Handles initial navigation based on saved path preference
 * - Provides Outlet for nested routes (staff, audit log)
 * 
 * @component
 */
const DoctorManage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // State to determine initial route based on saved preference
    // CRITICAL: Use /doctorDashboard (capital D) to match router configuration
    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "doctorStaff"
            ? "/doctorDashboard/doctorManage/doctorStaff"
            : localStorage.getItem("path") == "doctorAuditLog"
            ? "/doctorDashboard/doctorManage/doctorAuditLog"
            : "/doctorDashboard/doctorManage/doctorStaff", // Default to staff
    );
    
    /**
     * Navigate to saved route preference on component mount
     * Only navigates if we're at the base route to avoid interfering with user navigation
     */
    useEffect(() => {
        // Only navigate if we're at the base /doctorDashboard/doctorManage route
        // This prevents forcing navigation when user clicks on tabs
        const currentPath = window.location.pathname;
        const baseManagePath = "/doctorDashboard/doctorManage";
        
        if (currentPath === baseManagePath || currentPath === `${baseManagePath}/`) {
            navigate(String(navigateToRoute), { replace: true });
        }
    }, [navigateToRoute, navigate]);

    /**
     * Save current path to localStorage for navigation persistence
     */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        console.log("location : ", location.pathname);
        localStorage.setItem("path", location.pathname);
    }, [location.pathname]);

    return (
        <>
            {/* Main container with fixed height for consistent layout */}
            <Box sx={{ width: "100%", height: "95vh", overflow: "hidden" }}>
                {/* Outlet renders child routes: DoctorStaff, DoctorAuditLog */}
                <Outlet />
            </Box>
        </>
    );
};

export default DoctorManage;
