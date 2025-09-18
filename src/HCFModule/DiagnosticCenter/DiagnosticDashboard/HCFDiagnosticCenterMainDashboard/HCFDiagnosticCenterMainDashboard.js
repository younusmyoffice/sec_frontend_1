import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const HCFDiagnosticCenterMainDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/diagnostCenterDashboard/notification");
    }, []);
    useEffect( () => {
        document.getElementById("location-search-container").style.display = "none";
    } ,[])

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

export default HCFDiagnosticCenterMainDashboard;
