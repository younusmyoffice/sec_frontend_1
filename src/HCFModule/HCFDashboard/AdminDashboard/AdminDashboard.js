import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Drafts } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomMenuDrawer from "../../../components/CustomMenuDrawer/custom-menu-drawer";
import logger from "../../../utils/logger"; // Centralized logging

/**
 * AdminMainDashboard Component
 * 
 * Main container for HCF Admin dashboard with sidebar navigation
 * Features:
 * - Sidebar navigation using CustomMenuDrawer
 * - React Router navigation instead of local state
 * - Routes: Dashboard, Doctors, DiagnosticCenter, Manage
 * 
 * @component
 */
function AdminMainDashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    // Sidebar menu items
    const drawerList1 = [
        { name: "Dashboard", icon: <Drafts /> },
        { name: "Doctors", icon: <PersonIcon /> },
        { name: "DiagnosticCenter", icon: <ListAltIcon /> },
        { name: "Manage", icon: <SettingsIcon /> },
    ];

    // Route mapping for navigation
    const ROUTE_MAP = {
        dashboard: "/hcfAdmin/notification",
        doctors: "/hcfAdmin/doctor/allDoctors",
        diagnosticcenter: "/hcfAdmin/diagnosticCenter/labs",
        manage: "/hcfAdmin/hcfAdminManage/hcfAdminSale",
    };

    /**
     * Handle menu item selection from sidebar
     * Navigates to the corresponding route based on selected menu item
     * 
     * @param {string} item - Menu item name (Dashboard, Doctors, etc.)
     */
    const handleOnMenuSelect = (item) => {
        const menuKey = item.toLowerCase();
        const route = ROUTE_MAP[menuKey];
        
        if (route) {
            logger.debug("📍 Sidebar menu clicked:", { item, menuKey, route });
            localStorage.setItem("activeComponent", menuKey);
            navigate(route);
        } else {
            logger.warn("⚠️ Unknown menu item:", item);
        }
    };

    /**
     * Sync activeComponent in localStorage based on current route
     * Updates localStorage to reflect the current page for sidebar highlighting
     */
    useEffect(() => {
        logger.debug("🔵 AdminMainDashboard component rendering", {
            pathname: location.pathname
        });

        const path = location.pathname;

        // Determine active component based on current route
        if (path.includes("/doctor") || path.includes("/allDoctors") || path.includes("/active") || path.includes("/blocked") || path.includes("/addDoctor") || path.includes("/addPackage")) {
            localStorage.setItem("activeComponent", "doctors");
        } else if (path.includes("/diagnosticCenter")) {
            localStorage.setItem("activeComponent", "diagnosticcenter");
        } else if (path.includes("/hcfAdminManage")) {
            localStorage.setItem("activeComponent", "manage");
        } else if (path.includes("/notification") || path === "/hcfAdmin" || path === "/hcfAdmin/") {
            localStorage.setItem("activeComponent", "dashboard");
        }

        // Default navigation: if at base /hcfAdmin route, navigate to notification
        if (path === "/hcfAdmin" || path === "/hcfAdmin/") {
            const savedComponent = localStorage.getItem("activeComponent");
            if (savedComponent && savedComponent !== "dashboard" && ROUTE_MAP[savedComponent]) {
                logger.debug("📍 At base route, navigating to saved component:", savedComponent);
                navigate(ROUTE_MAP[savedComponent]);
            } else {
                logger.debug("📍 At base route, navigating to Dashboard");
                navigate("/hcfAdmin/notification", { replace: true });
            }
        }
    }, [location.pathname, navigate]);

    return (
        <div className="usage">
            <div className="component-library">
                <div className="items">
                    <CustomMenuDrawer
                        headerLabel={"custom drawer"}
                        list1={drawerList1}
                        profilepath={'hcfadmin'}
                        handleOnMenuSelect={handleOnMenuSelect}
                    >
                        {/* Use Outlet to render nested routes */}
                        <Outlet />
                    </CustomMenuDrawer>
                </div>
            </div>
        </div>
    );
}

export default AdminMainDashboard;
