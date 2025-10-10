import React, { useEffect } from "react";
import "./MainDashboard.scss";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const MainDashboard = () => {
    const navigate = useNavigate();

    // const params = useParams();
    // console.log(params);

    // const NavigationLink = '/patientdashboard/explore';

    useEffect(() => {
        navigate("/patientDashboard/dashboard/explore");
        document.getElementById('location-search-container').style.display = "flex"

    }, []);

    return (
    
            <Box sx={{ width: "100%" }}>
                <Outlet />
            </Box>
     
    );
};

export default MainDashboard;
