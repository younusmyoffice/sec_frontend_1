import { Box } from "@mui/material";
import React from "react";
import "./doctorChat.scss";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import CallIcon from "@mui/icons-material/Call";
import { Navigate, useNavigate } from "react-router-dom";
import CusttomButton from "../../../components/CustomButton/custom-button";
import img from "../../../static/images/DrImages/image10.png";

const ChatBody = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box
                sx={{
                    width: "70%",
                    border: "1px solid #E6E1E5",
                    height: "92%",
                    borderRadius: "8px",
                    padding: "2%",
                    marginLeft: "2%",
                    textAlign: "start",
                }}
            >
                <div
                    style={{
                        borderBottom: "1px solid #E6E1E5",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <img src={img} style={{ height: "50px", borderRadius: "10px" }} />
                        <div style={{ marginLeft: "10px" }}>
                            <h3 style={{ marginTop: "10px" }}>John Doe</h3>
                            <p style={{ color: "#e72b4a", marginTop: "-20px", fontSize: "small" }}>
                                9:30 , 21/02/23
                            </p>
                        </div>
                    </div>
                    <div style={{ display: "flex", width: "15%" }}>
                        <button
                            style={{
                                border: "1px solid #E6E1E5",
                                borderRadius: "20px",
                                height: "40px",
                                width: "40px",
                                textAlign: "center",
                                margin: "auto",
                                alignItems: "flex-end",
                                background: "transparent",
                            }}
                        >
                            <WifiCalling3Icon style={{ color: "#e72b4a", marginTop: "10px" }} />
                        </button>
                        <button
                            style={{
                                border: "1px solid #E6E1E5",
                                borderRadius: "20px",
                                height: "40px",
                                width: "40px",
                                textAlign: "center",
                                margin: "auto",
                                background: "transparent",
                            }}
                            onClick={() => navigate("videocall")}
                        >
                            <VideoCallIcon style={{ color: "#e72b4a", marginTop: "10px" }} />
                        </button>
                    </div>
                </div>

                {/* Main body */}

                <div style={{ textAlign: "center", margin: "auto", margin: "2%" }}>
                    <div
                        style={{
                            background: "#EFEFEF",
                            textAlign: "center",
                            width: "20%",
                            margin: "auto",
                            borderRadius: "10px",
                            color: "#AEAAAE",
                        }}
                    >
                        Session Start
                    </div>
                    <div style={{ background: "#EFEFEF", textAlign: "start", width: "50%" }}>
                        <div style={{ color: "#E72B4A", marginLeft: "10px" }}>
                            <p>Hi,</p>
                            <p>good afternoon Dr. Marcia</p>
                        </div>
                        <p style={{ color: "#AEAAAE", fontSize: "10PX", textAlign: "end" }}>
                            12:00 PM
                        </p>
                    </div>

                    <div style={{ background: "#E72B4A", textAlign: "start", width: "50%" }}>
                        <div style={{ color: "white", marginLeft: "10px" }}>
                            <p>Hello, Good Afternoon</p>
                        </div>
                        <p style={{ color: "white", fontSize: "10PX", textAlign: "end" }}>
                            3:00 PM
                        </p>
                    </div>
                </div>
                <div
                    style={{ borderTop: "1px solid #E6E1E5", marginTop: "210px", display: "flex" }}
                >
                    <input
                        style={{
                            border: "none",
                            background: "#E6E1E5",
                            padding: "5px",
                            marginTop: "10px",
                            width: "70%",
                        }}
                        placeholder="Type Here ..."
                    />
                    <div style={{ marginTop: "10px", marginLeft: "3%" }}>
                        <AttachmentIcon style={{ color: "#AEAAAE" }} />
                    </div>
                    <div style={{ marginTop: "10px", marginLeft: "3%" }}>
                        <CameraAltIcon style={{ color: "#AEAAAE" }} />
                    </div>
                    <CusttomButton label={<SendIcon />} buttonCss={{ marginLeft: "10px" }} />
                </div>
                <div
                    style={{
                        background: "#E72B4A",
                        textAlign: "start",
                        width: "52%",
                        color: "white",
                        borderRadius: "10px",
                        padding: "10px",
                        display: "flex",
                    }}
                >
                    Video call from John Doe
                    <CusttomButton
                        handleClick={() => navigate("voicecall")}
                        label={
                            <div style={{ display: "flex" }}>
                                <CallIcon /> Answer
                            </div>
                        }
                    />
                </div>
            </Box>
        </>
    );
};

export default ChatBody;
