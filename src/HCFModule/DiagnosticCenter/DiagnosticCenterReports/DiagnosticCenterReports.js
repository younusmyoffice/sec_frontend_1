import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DiagnosticCenterReports = () => {
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(
        (() => {
            const pathFromStorage = localStorage.getItem("path");
            console.log("Path from localStorage:", pathFromStorage);
            
            // Clear any cached misspelled paths and ensure we use the correct route
            if (pathFromStorage === "request") {
                return "/diagnostCenterDashboard/diagnosticCenterReports/request";
            } else if (pathFromStorage === "examination") {
                return "/diagnostCenterDashboard/diagnosticCenterReports/examination";
            } else if (pathFromStorage === "report") {
                return "/diagnostCenterDashboard/diagnosticCenterReports/report";
            } else if (pathFromStorage === "Chart") {
                return "/diagnostCenterDashboard/diagnosticCenterReports/Chart";
            }
            // Default to request page
            return "/diagnostCenterDashboard/diagnosticCenterReports/request";
        })()
    );
    useEffect(() => {
        // Clear any cached misspelled paths from localStorage
        const cachedPath = localStorage.getItem("path");
        if (cachedPath && cachedPath.includes("dignostic")) {
            console.log("Clearing cached misspelled path:", cachedPath);
            localStorage.removeItem("path");
        }
        
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

export default DiagnosticCenterReports;
