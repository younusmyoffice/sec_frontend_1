import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const ClinicManage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/clinicDashboard/clinicmanage/clinicstaff')
    },[])

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    // console.log("params : " ,params);
    console.log("location : ",location.pathname);
    localStorage.setItem("path" , location.pathname);
    return(
        <>
            <Box sx={{ width : "100%" , height : "95vh"}}>
                <Outlet/>
            </Box>
        </>
    )
}

export default ClinicManage;