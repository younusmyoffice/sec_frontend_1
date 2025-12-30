import React from "react";
import { NavLink } from "react-router-dom";

const DoctorAppointmentNavbar = () => {
    return (
        <nav className="NavBar-Container-Appoinement">
            <NavLink to={"/doctorDashboard/doctorAppointment/request"}>Request</NavLink>
            <NavLink to={"/doctorDashboard/doctorAppointment/upcoming"}>Upcoming</NavLink>
            <NavLink to={"/doctorDashboard/doctorAppointment/completed"}>Completed</NavLink>
            <NavLink to={"/doctorDashboard/doctorAppointment/cancelled"}>Cancelled</NavLink>
            <NavLink to={"/doctorDashboard/doctorAppointment/chats"}>Chats</NavLink>
        </nav>
    );
};
export default DoctorAppointmentNavbar;
