import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import './patientreports.scss';

const Reports = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "reports");
        navigate("/patientDashboard/manage/reports/request")
    }, []);


    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
            <Box>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/patientDashboard/manage/bookinghistory"}>
                        Booking History
                    </NavLink>
                    <NavLink to={"/patientDashboard/manage/transactions"}>Transaction</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports"}>Report</NavLink>
                    {/* <NavLink to={"/patientDashboard/manage/subscriptions"}>Subscription</NavLink> */}
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
                <nav className="NavBar-Container-patient-reports">
                    <NavLink to={"/patientDashboard/manage/reports/request"}>Request</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports/examined"}>Examined</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports/received"}>Received</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports/shared"}>Shared</NavLink>
                </nav>
                <Box sx={{ position: "relative"}}>
                    {/* <Typography
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
                    </Typography> */}
                    {/* <Typography>Action</Typography> */}
                </Box>
            </Box>
            <Box sx={{ position: "relative", top: "7em", width: "100%" , height : "100%" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Reports;
