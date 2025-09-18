import React, { useEffect, useState } from "react";
// import "./SuperAdminhistory.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const SuperAdminHistory = () => {
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "doctor"
            ? "/superadmin/history/doctor"
            : localStorage.getItem("path") == "patient"
            ? "/superadmin/history/patient"
            : localStorage.getItem("path") == "hcf"
            ? "/superadmin/history/hcf"
            : "/superadmin/history/doctor",
    );
    useEffect(() => {
        navigate(String(navigateToRoute));

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

export default SuperAdminHistory;
