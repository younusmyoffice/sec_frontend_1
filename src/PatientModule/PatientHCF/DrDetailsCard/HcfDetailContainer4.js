/**
 * HcfDetailContainer4 Component
 * 
 * Navigation container for HCF detail tabs:
 * - About tab
 * - Department tab
 * - Labs tab
 * 
 * Features:
 * - Tab navigation with NavLink
 * - Automatic redirect to about page
 * - Outlet for nested route rendering
 * 
 * @component
 */

import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import CustomButton from "../../../components/CustomButton";
import logger from "../../../utils/logger"; // Centralized logging

/**
 * Container4 Component - HCF Detail Tabs Navigation
 * 
 * @param {string|number} ID - HCF ID for routing
 * @param {string} description - About description to pass via state
 */
const Container4 = ({ ID, description }) => {
    logger.debug("🔵 HcfDetailContainer4 component rendering", {
        hasId: !!ID,
        hasDescription: !!description
    });

    const navigate = useNavigate();
    const location = useLocation(); // Get current location to check if already on a child route

    /**
     * Auto-navigate to about page on mount ONLY if we're on the parent route
     * Prevents redirecting when user clicks Department or Labs tabs
     * Only redirects if URL is exactly /patientDashboard/hcfDetailCard/:hcfID (without child path)
     */
    useEffect(() => {
        if (ID) {
            // Check if we're already on a child route (about, department, or labs)
            const isOnChildRoute = location.pathname.match(/\/patientDashboard\/hcfDetailCard\/\d+\/(about|department|labs)$/);
            
            // Only auto-navigate if we're NOT on a child route (i.e., we're on the parent route)
            if (!isOnChildRoute) {
                logger.debug("🔄 Auto-navigating to about page (parent route detected)", { hcfID: ID, currentPath: location.pathname });
                navigate(`/patientDashboard/hcfDetailCard/${ID}/about`, { 
                    state: { description },
                    replace: true // Use replace to avoid adding to history stack
                });
            } else {
                logger.debug("✅ Already on child route, skipping auto-navigation", { currentPath: location.pathname });
            }
        } else {
            logger.warn("⚠️ HCF ID is missing, cannot navigate");
        }
    }, [ID, description, navigate, location.pathname]);
    
    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginTop: "20px",
                marginLeft: "20px",
            }}
        >
            {/* Navigation tabs - Only rendered in parent container */}
            <nav className="NavBar-Container-Appoinement">
                <NavLink 
                    to={`/patientDashboard/hcfDetailCard/${ID}/about`}
                    state={{ description }}
                    end
                >
                    About
                </NavLink>
                <NavLink 
                    to={`/patientDashboard/hcfDetailCard/${ID}/department`}
                    end
                >
                    Department
                </NavLink>
                <NavLink 
                    to={`/patientDashboard/hcfDetailCard/${ID}/labs`}
                    end
                >
                    Labs
                </NavLink>
            </nav>
            
            {/* Outlet renders About, Department, or Labs component based on route */}
            <Box sx={{ width: "100%", marginTop: "2rem", overflow: "auto" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

// PropTypes for component documentation and type checking
Container4.propTypes = {
    ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // HCF ID for routing
    description: PropTypes.string, // About description to pass via state
};

// Default props
Container4.defaultProps = {
    description: "",
};

export default Container4;
