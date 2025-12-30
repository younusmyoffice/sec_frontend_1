/**
 * BodyDashboard Component
 *
 * Master layout for the Patient Dashboard module.
 * Features:
 * - State-driven component switching (Dashboard, Appointment, Manage)
 * - Persistent navigation via CustomMenuDrawer
 * - localStorage integration for active component state
 * - Role-specific routing (patient profile paths)
 * - Simple, reusable layout structure
 *
 * Component Structure:
 * - Drawer-based navigation (similar to Doctor module)
 * - Uses state management instead of React Router for tab switching
 * - Fast, synchronous component switching
 *
 * @component
 */
import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Drafts } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import PropTypes from "prop-types";
import CustomMenuDrawer from "../../components/CustomMenuDrawer/custom-menu-drawer";
import "./BodyDashboard.scss";
import logger from "../../utils/logger";

/**
 * BodyDashboard Component
 * 
 * Main container for patient dashboard with drawer-based navigation.
 */
const BodyDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // ============================================
    // State Management
    // ============================================
    
    // Currently selected menu item (used for highlighting active menu)
    // Determined by current URL path
    const [activeItem, setActiveItem] = useState();
    
    // Profile navigation path based on current location
    const [profile, setProfile] = useState(
        (() => {
            try {
                if (location.pathname.includes("/dashboard")) return "/patientDashboard/dashboard/profile";
                if (location.pathname.includes("/appointment")) return "/patientDashboard/appointment/profile";
                if (location.pathname.includes("/manage")) return "/patientDashboard/manage/profile";
                return null;
            } catch (error) {
                logger.error("Error determining profile path:", error);
                return null;
            }
        })()
    );

    // ============================================
    // Configuration
    // ============================================
    
    // Menu items for the drawer navigation
    // Each item has a name and icon
    const drawerList1 = [
        { name: "Dashboard", icon: <Drafts /> },
        { name: "Appointment", icon: <PersonIcon /> },
        { name: "Manage", icon: <SettingsIcon /> },
    ];

    // ============================================
    // Effect Hooks
    // ============================================
    
    /**
     * Update active item based on current URL
     */
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/dashboard")) {
            setActiveItem("Dashboard");
        } else if (path.includes("/appointment")) {
            setActiveItem("Appointment");
        } else if (path.includes("/manage")) {
            setActiveItem("Manage");
        }
    }, [location.pathname]);
    
    /**
     * Navigate to dashboard on initial load if at root
     */
    useEffect(() => {
        if (location.pathname === "/patientDashboard" || location.pathname === "/patientDashboard/") {
            navigate("/patientDashboard/dashboard", { replace: true });
        }
    }, [location.pathname, navigate]);

    // ============================================
    // Event Handlers
    // ============================================
    
    /**
     * Handle menu item selection
     * Navigates to the appropriate URL
     * 
     * @param {string} item - Selected menu item name
     */
    const handleOnMenuSelect = useCallback((item) => {
        const componentKey = item.toLowerCase();
        logger.info("Menu item selected:", item);
        
        try {
            // Navigate to the appropriate URL
            const targetUrl = `/patientDashboard/${componentKey}`;
            navigate(targetUrl, { replace: false });
            
            logger.debug("Navigated to:", targetUrl);
        } catch (error) {
            logger.error("Error handling menu selection:", error);
        }
    }, [navigate]);

    // ============================================
    // Render
    // ============================================

    return (
        <div className="usage">
            <div 
                className="component-library"
                style={{
                    width: '100%',
                    margin: 0,
                    padding: 0,
                    textAlign: 'left'
                }}
            >
                <div 
                    className="items"
                    style={{
                        width: '100%',
                        margin: 0,
                        padding: 0
                    }}
                >
                    {/* 
                        CustomMenuDrawer provides:
                        - Persistent sidebar navigation
                        - Top bar (profile, notifications, logout)
                        - Role-specific menu items
                        - Active state highlighting
                    */}
                    <CustomMenuDrawer
                        headerLabel={"custom drawer"}
                        list1={drawerList1}
                        selectedItems={activeItem}
                        profilepath={"patient"}
                        handleOnMenuSelect={handleOnMenuSelect}
                    >
                        <Outlet />
                    </CustomMenuDrawer>
                </div>
            </div>
        </div>
    );
};

BodyDashboard.propTypes = {
    // No props - this is a container component
};

export default BodyDashboard;
