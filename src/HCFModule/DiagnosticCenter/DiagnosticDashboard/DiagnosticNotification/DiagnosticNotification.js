// import * as React from 'react';

import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import { Dashboard } from "@mui/icons-material";
import CustomNotificationCard from "../../../../DoctorModule/CustomDoctorComponent/Cards/CardNotification/CardNotification";
import CustomButton from "../../../../components/CustomButton/custom-button";
import "./diagnosticNotification.scss";

const DiagnosticNotification = () => {
    return (
        <>
            {/* <div> */}
            <Box className="horizontal-scroll-container" sx={{ display: "flex", padding: "10px" }}>
                <div>
                    <DashboardCard />
                    <DashboardCard />
                </div>
            </Box>
            {/* </div> */}

            <Box sx={{ display: "flex", width: "98%", height: "90%" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/diagnostCenterDashboard/notification"}>Notification</NavLink>
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
                    <Box sx={{ width: "100%", height: "70%" }}>
                        <div className="">
                            <CustomNotificationCard Schedule={"Reminder"} />
                            <CustomNotificationCard Schedule={"Message"} />
                        </div>
                        <CustomButton
                            label="View All"
                            isTransaprent
                            buttonCss={{ marginTop: "100px" }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DiagnosticNotification;
