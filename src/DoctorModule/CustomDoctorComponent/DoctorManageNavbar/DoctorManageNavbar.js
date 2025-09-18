import React from "react";
import { NavLink } from "react-router-dom";

const DoctorManageNavbar = () => {
    return (
        <nav className="NavBar-Container-Appoinement">
            {/* <NavLink to={"/doctordashboard/doctorManage/doctorStaff"}>Staff</NavLink> */}
            <NavLink to={"/doctordashboard/doctorManage/doctorAuditLog"}>Audit Log</NavLink>
        </nav>
    );
};
export default DoctorManageNavbar;
