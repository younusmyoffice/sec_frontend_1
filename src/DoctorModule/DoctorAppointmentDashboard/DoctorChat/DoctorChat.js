import { Box } from "@mui/material";
import React from "react";
import "./doctorChat.scss";
import DoctorAppointmentNavbar from "../../CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import ChatNotification from "./ChatNotification";
import ChatBody from "./ChatBody";

const DoctorChat = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "chats");
    }, []);
    return (
        <>
            <Box sx={{ display: "flex", width: "95%", height: "100%", height: "100%" }}>
                <DoctorAppointmentNavbar />
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
                        <Box sx={{ width: "100%", height: "100%", height: "100%" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    border: "1px solid #E6E1E5",
                                    height: "92%",
                                    borderRadius: "8px",
                                    padding: "2%",
                                    marginLeft: "2%",
                                    display: "flex",
                                }}
                            >
                                <ChatNotification />
                                <ChatBody />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DoctorChat;
