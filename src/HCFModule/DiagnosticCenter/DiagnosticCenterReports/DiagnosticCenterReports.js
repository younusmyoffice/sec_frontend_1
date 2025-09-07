import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DiagnosticCenterReports = () => {
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "request"
            ? "/diagnostCenterDashboard/dignosticCenterReports/request"
            : localStorage.getItem("path") == "examination"
            ? "/diagnostCenterDashboard/dignosticCenterReports/examination"
            : localStorage.getItem("path") == "report"
            ? "/diagnostCenterDashboard/dignosticCenterReports/report"
            : localStorage.getItem("path") == "Chart"
            ? "/diagnostCenterDashboard/dignosticCenterReports/Chart"
            : "/diagnostCenterDashboard/dignosticCenterReports/request",
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

export default DiagnosticCenterReports;
