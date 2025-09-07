// import * as React from 'react';
import { Box } from "@mui/material";
import "./DoctorMainDashboard.scss";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import DoctorAppointmentCard from "../CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import "./DoctorMainDashboard.scss";

const DoctorMainDashboard = () => {
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "request"
            ? "/doctordashboard/request"
            : localStorage.getItem("path") == "notification"
            ? "/doctordashboard/notification"
            : "/doctordashboard/request",
    );
    useEffect(() => {
        navigate(String("/doctordashboard/doctorpersonalinfo"));
    }, []);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    // console.log("params : " ,params);
    console.log("location : ", location.pathname);
    localStorage.setItem("path", location.pathname);
    return (
        <>
            <Box sx={{ width: "100%", height: "95vh" }}>
                <Outlet />
            </Box>
        </>
    );
};

export default DoctorMainDashboard;
