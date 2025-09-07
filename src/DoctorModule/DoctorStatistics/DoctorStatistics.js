import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DoctorStatistics = () => {
    const navigate = useNavigate();
    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "doctorBookingHistory"
            ? "/doctordashboard/doctorStatistics/doctorBookingHistory"
            : localStorage.getItem("path") == "doctorTransaction"
            ? "/doctordashboard/doctorStatistics/doctorTransaction"
            : localStorage.getItem("path") == "doctorOverview"
            ? "/doctordashboard/doctorStatistics/doctorOverview"
            : localStorage.getItem("path") == "doctorPayout"
            ? "/doctordashboard/doctorStatistics/doctorPayout"
            : "/doctordashboard/doctorStatistics/doctorBookingHistory",
    );
    useEffect(() => {
        navigate(String(navigateToRoute));
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

export default DoctorStatistics;
