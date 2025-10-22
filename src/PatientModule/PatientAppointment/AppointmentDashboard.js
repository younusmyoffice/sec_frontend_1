import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const AppointmentDashboard = () => {
    const navigate = useNavigate();
    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "upcoming"
            ? "/patientDashboard/appointment/upcoming"
            : localStorage.getItem("path") == "completed"
            ? "/patientDashboard/appointment/completed"
            : localStorage.getItem("path") == "cancelled"
            ? "/patientDashboard/appointment/cancelled"
            : "/patientDashboard/appointment/upcoming",
    );

    // localStorage.getItem('path') =='upcoming' ? '/patientDashboard/appointment/upcoming'
    // : localStorage.getItem('path') == 'completed' ? '/patientDashboard/appointment/completed'
    // : localStorage.getItem('path') == 'cancelled' ? '/patientDashboard/appointment/cancelled'
    // : '/patientDashboard/appointment/upcoming';

    useEffect(() => {
        navigate(String(navigateToRoute));
        document.getElementById('location-search-container').style.display = "none"
        // localStorage.setItem('path' , 'upcoming');
    }, []);

    console.log("Entered dashboard appointment");

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {" "}
            {/* Explore and My activity navbar start */}
            <Box sx={{ width: "100%" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppointmentDashboard;
