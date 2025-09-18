import { Box, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../../../../components/CustomButton/custom-button";
import "./cardNotification.scss";
import { formatDate, formatDateDay } from "../../../../constants/const";

const CustomNotificationCard = ({ Data, index }) => {
    return (
        <>
            <Box
                key={index}
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #C9C5CA",
                    height: "8rem",
                    padding: "1%",
                    marginBottom: "1rem", // Add some space between cards
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "1.25rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "1.875rem",
                        }}
                    >
                        {Data?.type || "Notification"}
                    </Typography>
                    <Typography
                        sx={{
                            color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.75rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "1.125rem",
                            letterSpacing: "0.006rem",
                        }}
                    >
                        {Data?.type === "Appointment canceled" ? (
                            <span>
                                Your appointment with {Data?.recipient || "patient Name"} is
                                canceled
                            </span>
                        ) : (
                            <span>
                                You have an appointment with {Data?.recipient || "patient Name"}
                            </span>
                        )}{" "}
                    </Typography>
                    <Typography
                        sx={{
                            color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.75rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "1.125rem",
                            letterSpacing: "0.006rem",
                        }}
                    >
                        {Data?.type === "Appointment canceled" ? (
                            <span>  </span>
                        ) : (
                            <span>
                            {Data?.parameters?.appointment_date && Data?.parameters?.appointment_time ? (
                              <>
                                {formatDateDay(Data?.parameters?.appointment_date)} Time {Data?.parameters?.appointment_time}
                              </>
                            ) : (
                              "appointment time and date"
                            )}
                          </span>
                          
                        )}{" "}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#939094",
                            textAlign: "right",
                            fontFamily: "Poppins",
                            fontSize: "0.75rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "1.125rem",
                            letterSpacing: "0.006rem",
                        }}
                    >
                        {formatDate(Data?.notification_generated_time || Data?.created_at) ||
                            "Notification Generated Time"}
                    </Typography>
                    {/* <CustomButton
                        buttonCss={{
                            display: "flex",
                            width: "10.625rem",
                            height: "3rem",
                            padding: "0.5rem 1rem",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                            flexShrink: "0",
                            borderRadius: "6.25rem",
                        }}
                        label="View"
                    /> */}
                </Box>
            </Box>
        </>
    );
};

export default CustomNotificationCard;
