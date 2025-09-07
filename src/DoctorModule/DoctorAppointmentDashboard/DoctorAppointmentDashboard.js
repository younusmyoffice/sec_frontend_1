import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./doctorAppointmentDashboard.scss";

const DoctorAppointmentDashboard = () => {
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "request"
            ? "/doctordashboard/doctorAppointment/request"
            : localStorage.getItem("path") == "upcoming"
            ? "/doctordashboard/doctorAppointment/upcoming"
            : localStorage.getItem("path") == "completed"
            ? "/doctordashboard/doctorAppointment/completed"
            : localStorage.getItem("path") == "cancelled"
            ? "/doctordashboard/doctorAppointment/cancelled"
            : localStorage.getItem("path") == "chats"
            ? "/doctordashboard/doctorAppointment/chats"
            : "/doctordashboard/doctorAppointment/request",
    );
    useEffect(() => {
        navigate(String(navigateToRoute));
    }, []);

    return (
        <>
            <div style={{ width: "100%", height: "96vh" }}>
                <Outlet />
            </div>
        </>
    );
};

export default DoctorAppointmentDashboard;
