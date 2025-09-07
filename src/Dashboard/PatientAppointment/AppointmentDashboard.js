import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const AppointmentDashboard = () => {
    const navigate = useNavigate();
    const [navigateToRoute , setNavigateToRoute] = useState(
        localStorage.getItem('path') =='upcoming' ? '/patientdashboard/appointment/upcoming' 
    : localStorage.getItem('path') == 'completed' ? '/patientdashboard/appointment/completed'
    : localStorage.getItem('path') == 'cancelled' ? '/patientdashboard/appointment/cancelled'
    : '/patientdashboard/appointment/upcoming' 
    );



        // localStorage.getItem('path') =='upcoming' ? '/patientdashboard/appointment/upcoming' 
        // : localStorage.getItem('path') == 'completed' ? '/patientdashboard/appointment/completed'
        // : localStorage.getItem('path') == 'cancelled' ? '/patientdashboard/appointment/cancelled'
        // : '/patientdashboard/appointment/upcoming'; 

    useEffect(() => {
        navigate(String (navigateToRoute));
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
