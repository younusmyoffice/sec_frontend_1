import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "../NavBar-Appointment.scss";
import { AppointmentNavbar } from "../PatientCards";
import ChatRoom from "../../../ChatsScreen/ChatRoom";

const Chats = () => {
    return (
        <>
            <ChatRoom />
        </>
    );
};

export default Chats;
