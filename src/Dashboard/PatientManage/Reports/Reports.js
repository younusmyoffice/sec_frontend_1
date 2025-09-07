import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Reports = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "reports");
    }, []);
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
            <Box>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/patientdashboard/manage/bookinghistory"}>
                        Booking History
                    </NavLink>
                    <NavLink to={"/patientdashboard/manage/transactions"}>Transaction</NavLink>
                    <NavLink to={"/patientdashboard/manage/reports"}>Report</NavLink>
                    <NavLink to={"/patientdashboard/manage/subscriptions"}>Subscription</NavLink>
                </nav>
            </Box>
            <Box
                component={"div"}
                sx={{
                    position: "relative",
                    top: "4em",
                    width: "100%",
                    display: "flex",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/patientdashboard/manage/reports/request"}>Request</NavLink>
                    <NavLink to={"/patientdashboard/manage/reports/examined"}>Examined</NavLink>
                    <NavLink to={"/patientdashboard/manage/reports/received"}>Received</NavLink>
                    <NavLink to={"/patientdashboard/manage/reports/shared"}>Shared</NavLink>
                </nav>
                <Box sx={{ position: "relative", left: "91%" }}>
                    <Typography
                        sx={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "1.375rem",
                            letterSpacing: "0.00438rem",
                        }}
                    >
                        Action
                    </Typography>
                    {/* <Typography>Action</Typography> */}
                </Box>
            </Box>
            <Box sx={{ position: "relative", top: "7em", width: "100%" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Reports;
