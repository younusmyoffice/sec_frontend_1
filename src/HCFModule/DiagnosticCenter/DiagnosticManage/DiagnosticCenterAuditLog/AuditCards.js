import { Box, Typography } from "@mui/material";
import React from "react";
import img from "../../../../static/images/DrImages/image10.png";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

export const AuditCards = ({ name, specialist, Id }) => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Box
                    component={"div"}
                    sx={{ height: "3.44331rem", width: "3.44331rem", borderRadius: "0.5rem" }}
                >
                    {/* <img src={img} style={{ height: "100%", width: "100%", borderRadius: "8px" }} /> */}
                    <MedicalServicesIcon style={{ fontSize: 40, color: "#E72B4A" }}/>
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
                        {specialist}  ID : {Id}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};
