import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "../NavBar-Appointment.scss";
import { AppointmentNavbar } from "../PatientCards";

const Chats = () => {
    return (
        <>
            <Box sx={{ display: "flex", width: "95%" }}>
                <AppointmentNavbar />
                <Box
                    component={"div"}
                    sx={{ position: "relative", top: "2em", width: "100%", display: "flex" }}
                >
                    <h1>ChatsSD</h1>
                </Box>
            </Box>
        </>
    );
};

export default Chats;
