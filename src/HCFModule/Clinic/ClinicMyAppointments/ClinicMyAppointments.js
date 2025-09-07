import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ClinicMyAppointments = () => {
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "clinicrequest"
            ? "/clinicDashboard/clinicmyappointment/clinicrequest"
            : localStorage.getItem("path") == "clinicupcoming"
            ? "/clinicDashboard/clinicmyappointment/clinicupcoming"
            : localStorage.getItem("path") == "cliniccompleted"
            ? "/clinicDashboard/clinicmyappointment/cliniccompleted"
            : localStorage.getItem("path") == "cliniccancelled"
            ? "/clinicDashboard/clinicmyappointment/cliniccancelled"
            : localStorage.getItem("path") == "clinicchats"
            ? "/clinicDashboard/clinicmyappointment/clinicchats"
            : "/clinicDashboard/clinicmyappointment/clinicrequest",
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

export default ClinicMyAppointments;
