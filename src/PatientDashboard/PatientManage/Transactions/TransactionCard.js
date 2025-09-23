import { Box, Typography } from "@mui/material";
import React from "react";
import sentLogo from "../../../static/images/DrImages/SendLogo.png";
import receiveLogo from "../../../static/images/DrImages/RecieveLogo.png";
import SendIcon from "@mui/icons-material/Send"; // Icon for sending money
import CallReceivedIcon from "@mui/icons-material/CallReceived"; // Icon for receiving money
import DangerousIcon from '@mui/icons-material/Dangerous';

export const SendCard = ({ Payment, TRXID }) => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Box
                    component={"div"}
                    sx={{ height: "3.44331rem", width: "3.44331rem", borderRadius: "0.5rem" }}
                >
                    <img
                        src={sentLogo}
                        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                    />
                    
                </Box>
                <Box
                    sx={{
                        marginLeft: "2%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
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
                        {Payment}
                    </Typography>
                    <Typography
                        sx={{
                            color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.625rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "0.9375rem",
                            letterSpacing: "0.005rem",
                        }}
                    >
                        TRX ID : {TRXID}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export const ReceiveCard = ({ Payment, TRXID }) => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Box
                    component={"div"}
                    sx={{ height: "3.44331rem", width: "3.44331rem", borderRadius: "0.5rem" }}
                >
                    <img
                        src={receiveLogo}
                        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                    />
                </Box>
                <Box
                    sx={{
                        marginLeft: "2%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
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
                        {Payment}
                    </Typography>
                    <Typography
                        sx={{
                            color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.625rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "0.9375rem",
                            letterSpacing: "0.005rem",
                        }}
                    >
                        TRX ID : {TRXID}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export const FaildCard = ({ Payment, TRXID }) => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Box
                    component={"div"}
                    sx={{ height: "3.44331rem", width: "3.44331rem", borderRadius: "0.5rem" }}
                >
                    {/* <img
                        src={CallReceivedIcon}
                        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                    /> */}
                    <DangerousIcon sx={{ color: "#F58A9B", fontSize: "3.5rem" }} />
                </Box>
                <Box
                    sx={{
                        marginLeft: "2%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
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
                        {Payment}
                    </Typography>
                    <Typography
                        sx={{
                            color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.625rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "0.9375rem",
                            letterSpacing: "0.005rem",
                        }}
                    >
                        TRX ID : {TRXID}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};