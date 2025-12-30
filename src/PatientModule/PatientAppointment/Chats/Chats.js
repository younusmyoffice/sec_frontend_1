/**
 * Chats Component
 * 
 * Wrapper component for ChatRoom that extracts URL parameters
 * and passes them to ChatRoom component
 * 
 * @component
 */

import { Box } from "@mui/material";
import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "../NavBar-Appointment.scss";
import { AppointmentNavbar } from "../PatientCards";
import ChatRoom from "../../../ChatsScreen/ChatRoom";

const Chats = () => {
    // Extract URL parameters if they exist
    // This allows ChatRoom to receive roomID and appointment_id from URL
    const params = useParams();
    
    return (
        <>
            <ChatRoom />
        </>
    );
};

export default Chats;
