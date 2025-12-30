import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import logger from "../../../utils/logger"; // Centralized logging
import './patientreports.scss';

/**
 * Reports Component
 * 
 * Main container for patient reports management
 * Features:
 * - Navigation tabs (Request, Examined, Received, Shared)
 * - Renders child routes via Outlet
 * - Auto-navigates to request route on mount
 * 
 * @component
 */
const Reports = () => {
    logger.debug("🔵 Reports component rendering");
    
    const navigate = useNavigate();
    const location = useLocation();
    
    /**
     * Initialize component
     * Sets localStorage flags and navigates to request route if at base reports route
     */
    React.useEffect(() => {
        logger.debug("🔵 Reports component mounting", { 
            currentPath: location.pathname 
        });
        
        try {
            localStorage.setItem("activeComponent", "manage");
            localStorage.setItem("path", "reports");
            logger.debug("✅ Set localStorage flags");
        } catch (error) {
            logger.error("❌ Error setting localStorage:", error);
        }
        
        // Only navigate if we're at the base reports route without a specific tab
        const baseReportsPath = "/patientDashboard/manage/reports";
        const isBaseRoute = location.pathname === baseReportsPath || 
                           location.pathname === `${baseReportsPath}/`;
        
        if (isBaseRoute) {
            logger.debug("📍 At base route, navigating to request");
            navigate("/patientDashboard/manage/reports/request", { replace: true });
        } else {
            logger.debug("📍 Already on a route, not forcing navigation");
        }
    }, []); // Only run once on mount


    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
            {/* Main navigation tabs */}
            <Box>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/patientDashboard/manage/bookinghistory"}>
                        Booking History
                    </NavLink>
                    <NavLink to={"/patientDashboard/manage/transactions"}>Transaction</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports"}>Report</NavLink>
                    {/* Subscription tab commented out - not implemented yet */}
                    {/* <NavLink to={"/patientDashboard/manage/subscriptions"}>Subscription</NavLink> */}
                </nav>
            </Box>
            
            {/* Reports sub-navigation tabs */}
            <Box
                component={"div"}
                sx={{
                    position: "relative",
                    top: "4em",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <nav className="NavBar-Container-patient-reports">
                    <NavLink to={"/patientDashboard/manage/reports/request"}>Request</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports/examined"}>Examined</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports/received"}>Received</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports/shared"}>Shared</NavLink>
                </nav>
                
                {/* Reserved for action buttons (currently empty) */}
                <Box sx={{ position: "relative"}}>
                    {/* Action buttons can be added here in the future */}
                </Box>
            </Box>
            
            {/* Child routes outlet */}
            <Box sx={{ position: "relative", top: "7em", width: "100%", height: "100%" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Reports;
