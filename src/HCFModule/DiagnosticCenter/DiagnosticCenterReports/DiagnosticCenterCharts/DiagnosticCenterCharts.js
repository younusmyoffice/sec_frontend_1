import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const DiagnosticCenterCharts = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "reports");
        localStorage.setItem("path", "Chart");
    }, []);
    useEffect( () => {
        document.getElementById("location-search-container").style.display = "none";
    } ,[])
    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/diagnostCenterDashboard/dignosticCenterReports/request"}>
                        Request
                    </NavLink>
                    <NavLink to={"/diagnostCenterDashboard/dignosticCenterReports/examination"}>
                        Examination
                    </NavLink>
                    <NavLink to={"/diagnostCenterDashboard/dignosticCenterReports/report"}>
                        Report
                    </NavLink>
                    {/* <NavLink to={"/diagnostCenterDashboard/dignosticCenterReports/Chart"}>
                        Chart
                    </NavLink> */}
                </nav>
                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <div className="">Enter your code here Chats</div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DiagnosticCenterCharts;
