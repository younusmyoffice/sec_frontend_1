import { Box, Typography, Chip } from "@mui/material";
import React from "react";
import CustomButton from "../../CustomButton/custom-button";

const CardNotification = ({ Schedule, data }) => {
    const handleMarkAsRead = () => {
        if (data?.onMarkAsRead) {
            data.onMarkAsRead();
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderBottom: "1px solid #C9C5CA",
                    padding: "1rem",
                    flexWrap: "wrap",
                    gap: "1rem",
                    backgroundColor: data?.is_read ? "transparent" : "#F8F9FA",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        backgroundColor: data?.is_read ? "#F8F9FA" : "#E9ECEF",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: 1,
                        minWidth: "200px",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
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
                            {Schedule}
                        </Typography>
                        {!data?.is_read && (
                            <Chip
                                label="New"
                                size="small"
                                color="primary"
                                sx={{ fontSize: "0.7rem", height: "20px" }}
                            />
                        )}
                    </Box>
                    <Typography
                        sx={{
                            color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "1.25rem",
                            letterSpacing: "0.006rem",
                            marginBottom: "4px",
                        }}
                    >
                        You have an appointment with {data?.recipient} on {data?.appointment_date}
                    </Typography>
                    {data?.parameters?.fourth && (
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
                            {data.parameters.fourth}
                        </Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        gap: "8px",
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
                        {data?.created_at}
                    </Typography>
                    <Box sx={{ display: "flex", gap: "8px" }}>
                        {!data?.is_read && (
                            <CustomButton
                                buttonCss={{
                                    display: "flex",
                                    width: "auto",
                                    height: "2rem",
                                    padding: "0.25rem 0.75rem",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "0.25rem",
                                    flexShrink: "0",
                                    borderRadius: "4px",
                                    fontSize: "0.75rem",
                                    backgroundColor: "#E72B4A",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "#C41E3A",
                                    }
                                }}
                                label="Mark as Read"
                                handleClick={handleMarkAsRead}
                            />
                        )}
                        <CustomButton
                            buttonCss={{
                                display: "flex",
                                width: "auto",
                                height: "2rem",
                                padding: "0.25rem 0.75rem",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.25rem",
                                flexShrink: "0",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                border: "1px solid #E72B4A",
                                color: "#E72B4A",
                                backgroundColor: "transparent",
                                "&:hover": {
                                    backgroundColor: "#E72B4A",
                                    color: "white",
                                }
                            }}
                            label="View"
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default CardNotification;
