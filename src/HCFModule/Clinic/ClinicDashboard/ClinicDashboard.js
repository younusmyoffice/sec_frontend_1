import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ClinicDashboard = () => {
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(

        localStorage.getItem("path") == "clinirequests"
            ? "/clinicDashboard/clinicbodydashboard/clinirequests"
            : localStorage.getItem("path") == "clinicnotification"
            ? "/clinicDashboard/clinicbodydashboard/clinicnotification"
            : "/clinicDashboard/clinicbodydashboard/clinirequests",
    );
    useEffect(() => {
        document.getElementById('location-search-container').style.display = "none"
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

export default ClinicDashboard;
