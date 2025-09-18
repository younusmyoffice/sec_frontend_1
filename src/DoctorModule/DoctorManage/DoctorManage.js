import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DoctorManage = () => {
    const navigate = useNavigate();
    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "doctorStaff"
            ? "/doctordashboard/doctorManage/doctorStaff"
            : localStorage.getItem("path") == "doctorAuditLog"
            ? "/doctordashboard/doctorManage/doctorAuditLog"
            : "/doctordashboard/doctorManage/doctorStaff",
    );
    useEffect(() => {
        navigate(String(navigateToRoute));
    }, []);

    useEffect(() => {
        navigate("/doctordashboard/doctorManage/doctorAuditLog");
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

export default DoctorManage;
