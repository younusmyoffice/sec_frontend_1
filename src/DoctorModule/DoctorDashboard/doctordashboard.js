import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Drafts } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomMenuDrawer from "../../components/CustomMenuDrawer/custom-menu-drawer";
import DoctorMainDashboard from "../DoctorMainDashboard/DoctorMainDashboard";
import "./doctordashboard.scss";

/**
 * Route mapping for sidebar menu items
 * Maps menu item names to their corresponding routes
 */
const ROUTE_MAP = {
    dashboard: "/doctorDashboard",
    appointment: "/doctorDashboard/doctorAppointment",
    listing: "/doctorDashboard/doctorListing",
    statistics: "/doctorDashboard/doctorStatistics",
    manage: "/doctorDashboard/doctorManage",
};

function DoctorDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const drawerList1 = [
        { name: "Dashboard", icon: <Drafts /> },
        { name: "Appointment", icon: <PersonIcon /> },
        { name: "Listing", icon: <ListAltIcon /> },
        { name: "Statistics", icon: <AnalyticsIcon /> },
        { name: "Manage", icon: <SettingsIcon /> },
    ];

    /**
     * Handle menu item selection from sidebar
     * Navigates to the corresponding route and updates localStorage
     * 
     * @param {string} item - Menu item name (e.g., "Dashboard", "Appointment")
     */
    const handleMenuSelect = (item) => {
        const menuKey = item.toLowerCase();
        const route = ROUTE_MAP[menuKey];
        
        if (route) {
            // Set active component in localStorage for persistence
            localStorage.setItem("activeComponent", menuKey);
            
            // Navigate to the route
            navigate(route);
        }
    };

    /**
     * Initialize component based on localStorage and current route
     * Handles initial navigation if needed
     */
    useEffect(() => {
        document.getElementById('location-search-container').style.display = "none";

        // Determine active component based on current route for localStorage sync
        const path = location.pathname;
        
        if (path.includes("/doctorAppointment")) {
            localStorage.setItem("activeComponent", "appointment");
        } else if (path.includes("/doctorListing")) {
            localStorage.setItem("activeComponent", "listing");
        } else if (path.includes("/doctorStatistics")) {
            localStorage.setItem("activeComponent", "statistics");
        } else if (path.includes("/doctorManage")) {
            localStorage.setItem("activeComponent", "manage");
        } else if (path === "/doctorDashboard" || path === "/doctorDashboard/") {
            // If at base route, check localStorage for preference or show dashboard
            const savedComponent = localStorage.getItem("activeComponent");
            if (savedComponent && savedComponent !== "dashboard" && ROUTE_MAP[savedComponent]) {
                // Navigate to saved component route
                navigate(ROUTE_MAP[savedComponent]);
            } else {
                localStorage.setItem("activeComponent", "dashboard");
            }
        }
    }, [location.pathname, navigate]);

    return (
        <>
            <div className="usage">
                <div className="component-library">
                    <div className="items">
                        <CustomMenuDrawer
                            headerLabel={"custom drawer"}
                            list1={drawerList1}
                            profilepath="doctor"
                            handleOnMenuSelect={handleMenuSelect}
                        >
                            {/* Render Outlet for nested routes, or DoctorMainDashboard if at base route */}
                            {location.pathname === "/doctorDashboard" || location.pathname === "/doctorDashboard/" ? (
                                <DoctorMainDashboard />
                            ) : (
                                <Outlet />
                            )}
                        </CustomMenuDrawer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorDashboard;
