import React from 'react';
import { NavLink } from "react-router-dom";

const DoctorAppointmentNavbar = () => {
    return (
        <nav className="NavBar-Container-Appoinement">
            <NavLink to={"/doctordashboard/doctorAppointment/request"}>Request</NavLink>
            <NavLink to={"/doctordashboard/doctorAppointment/upcoming"}>Upcoming</NavLink>
            <NavLink to={"/doctordashboard/doctorAppointment/completed"}>Completed</NavLink>
            <NavLink to={"/doctordashboard/doctorAppointment/cancelled"}>Cancelled</NavLink>
            <NavLink to={"/doctordashboard/doctorAppointment/chats"}>Chats</NavLink>
        </nav>
    );
};
export default DoctorAppointmentNavbar;