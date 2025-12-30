import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import subsLogo from "../../../static/images/DrImages/Subs.png";
import logger from "../../../utils/logger"; // Centralized logging

/**
 * Subscriptions Component
 * 
 * Displays subscription information for the patient
 * Features:
 * - Navigation to other manage sections
 * - Displays subscription image/placeholder
 * 
 * Note: This component appears to be a placeholder
 * Consider implementing actual subscription management features
 * 
 * @component
 */
const Subscriptions = () => {
    logger.debug("🔵 Subscriptions component rendering");
    
    /**
     * Initialize component
     * Sets localStorage flags for navigation state
     */
    React.useEffect(() => {
        logger.debug("🔵 Subscriptions component mounting");
        
        try {
            localStorage.setItem("activeComponent", "manage");
            localStorage.setItem("path", "subscriptions");
            logger.debug("✅ Set localStorage flags");
        } catch (error) {
            logger.error("❌ Error setting localStorage:", error);
        }
    }, []); // Only run once on mount
    
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Navigation tabs */}
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={"/patientDashboard/manage/bookinghistory"}>
                    Booking History
                </NavLink>
                <NavLink to={"/patientDashboard/manage/transactions"}>Transaction</NavLink>
                <NavLink to={"/patientDashboard/manage/reports"}>Report</NavLink>
                <NavLink to={"/patientDashboard/manage/subscriptions"}>Subscription</NavLink>
            </nav>
            
            {/* Subscription image/placeholder */}
            <Box
                component={"div"}
                sx={{
                    position: "relative",
                    top: "4em",
                    width: "100%",
                    display: "flex",
                    height: "16.875rem",
                }}
            >
                <img 
                    style={{ width: "100%", height: "100%" }} 
                    src={subsLogo} 
                    alt="Subscriptions information" 
                />
            </Box>
        </Box>
    );
};

export default Subscriptions;
