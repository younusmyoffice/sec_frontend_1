/**
 * DoctorManageNavbar Component
 * 
 * Navigation tabs for switching between Staff and Audit Log
 * - Staff: Manage staff members
 * - Audit Log: View audit logs and activity history
 * 
 * @component
 */
import React from "react";
import { NavLink } from "react-router-dom";

const DoctorManageNavbar = () => {
    return (
        <nav className="NavBar-Container-Appoinement">
            {/* Tab 1: Staff Management - Manage staff members */}
            {/* <NavLink to={"/doctorDashboard/doctorManage/doctorStaff"}>Staff</NavLink> */}
            
            {/* Tab 2: Audit Log - View audit logs and activity history */}
            <NavLink to={"/doctorDashboard/doctorManage/doctorAuditLog"}>Audit Log</NavLink>
        </nav>
    );
};
export default DoctorManageNavbar;
