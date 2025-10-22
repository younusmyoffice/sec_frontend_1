import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import subsLogo from "../../../static/images/DrImages/Subs.png";

const Subscriptions = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "subscriptions");
    }, []);
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/patientDashboard/manage/bookinghistory"}>
                        Booking History
                    </NavLink>
                    <NavLink to={"/patientDashboard/manage/transactions"}>Transaction</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports"}>Report</NavLink>
                    <NavLink to={"/patientDashboard/manage/subscriptions"}>Subscription</NavLink>
                </nav>
                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        height: "16.875rem",
                    }}
                >
                    <img style={{ width: "100%", height: "100%" }} src={subsLogo}></img>
                </Box>
            </Box>
        </>
    );
};

export default Subscriptions;
