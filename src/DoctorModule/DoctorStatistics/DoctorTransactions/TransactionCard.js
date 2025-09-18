import { Box, Typography, colors } from "@mui/material";
import React from "react";

export const TransactionCard = ({ button, name, Id }) => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Box
                    component={"div"}
                    sx={{ height: "3.44331rem", width: "3.44331rem", borderRadius: "0.5rem" }}
                >
                    <span>{button}</span>
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
                        {name}
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
                        TRX ID : {Id}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};
