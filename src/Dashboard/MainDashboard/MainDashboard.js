/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable spaced-comment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
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
        navigate("/patientdashboard/dashboard/explore");
    }, []);

    return (
    
            <Box sx={{ width: "100%" }}>
                <Outlet />
            </Box>
     
    );
};

export default MainDashboard;
