import React, { useState } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import VideocamIcon from "@mui/icons-material/Videocam";
import mini from "../../../static/images/DrImages/minimise.svg";
import john from "../../../static/images/DrImages/image10.png";
import CustomButton from "../../../components/CustomButton";
import img from "../../../static/images/DrImages/image10.png";
import CusttomButton from "../../../components/CustomButton/custom-button";
import mic from "../../../static/images/DrImages/Mic.svg";
import videocam from "../../../static/images/DrImages/Videocam.svg";
import camera from "../../../static/images/DrImages/Flip camera ios.svg";

const VideoCall = () => {
    const [state, setState] = useState(true);
    const [video, setVideo] = useState(true);
    const [cam, setCam] = useState(true);
    const handleClick = () => {
        setState(!state);
    };
    const handleCl = () => {
        setVideo(!video);
    };
    const handleCli = () => {
        setCam(!cam);
    };
    return (
        <div style={{ background: "#484649", height: "100%", display: "flex", gap: "1rem" }}>
            <div style={{ background: "#313033", width: "60%" }}>
                <div style={{ textAlign: "end" }}>
                    <img src={mini} style={{ marginTop: "1rem" }} />
                </div>
                <div style={{ textAlign: "center", marginTop: "" }}>
                    <img
                        src={john}
                        style={{
                            borderRadius: "50%",
                            height: "10%",
                            width: "10%",
                            marginTop: "20%",
                        }}
                    />
                </div>
                <h3 style={{ color: "white", textAlign: "center" }}>John Doe</h3>
                <p style={{ color: "white", textAlign: "center" }}>Calling</p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        marginTop: "5%",
                    }}
                >
                    <button
                        onClick={handleClick}
                        style={{ background: "#484649", borderRadius: "50%", border: "none" }}
                    >
                        {state ? (
                            <img src={mic} />
                        ) : (
                            <KeyboardVoiceIcon style={{ color: "white" }} />
                        )}
                    </button>
                    <button
                        onClick={handleCl}
                        style={{ background: "#484649", borderRadius: "50%", border: "none" }}
                    >
                        {video ? (
                            <img src={videocam} />
                        ) : (
                            <VideocamIcon style={{ color: "white" }} />
                        )}
                    </button>
                    <button
                        onClick={handleCli}
                        style={{ background: "#484649", borderRadius: "50%", border: "none" }}
                    >
                        {cam ? (
                            <img src={camera} />
                        ) : (
                            <FlipCameraIosIcon style={{ color: "white" }} />
                        )}
                    </button>
                    <CustomButton label="End Call" />
                </div>
            </div>
            <div style={{ background: "#313033", width: "40%", margin: "10px" }}>
                <div style={{ borderBottom: "1px solid #E6E1E5", display: "flex", margin: "10px" }}>
                    <div style={{ display: "flex" }}>
                        <img src={img} style={{ height: "30px", borderRadius: "10px" }} />
                        <div style={{ marginLeft: "10px" }}>
                            <h3 style={{ marginTop: "10px", color: "white" }}>John Doe</h3>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: "center", margin: "auto", margin: "2%" }}>
                    <div
                        style={{
                            background: "transparent",
                            textAlign: "center",
                            width: "30%",
                            margin: "auto",
                            borderRadius: "10px",
                            color: "#AEAAAE",
                            border: "#AEAAAE 1px solid",
                        }}
                    >
                        Session Start
                    </div>
                    <div style={{ background: "#EFEFEF", textAlign: "start", width: "60%" }}>
                        <div style={{ color: "#E72B4A", marginLeft: "10px" }}>
                            <p>Hi,</p>
                            <p>good afternoon Dr. Marcia</p>
                        </div>
                        <p style={{ color: "#AEAAAE", fontSize: "10PX", textAlign: "end" }}>
                            12:00 PM
                        </p>
                    </div>

                    <div style={{ background: "#E72B4A", textAlign: "start", width: "60%" }}>
                        <div style={{ color: "white", marginLeft: "10px" }}>
                            <p>Hello, Good Afternoon</p>
                        </div>
                        <p style={{ color: "white", fontSize: "10PX", textAlign: "end" }}>
                            3:00 PM
                        </p>
                    </div>
                </div>
                <div style={{ borderTop: "1px solid #E6E1E5", marginTop: "60%", display: "flex" }}>
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
            </div>
        </div>
    );
};
export default VideoCall;
