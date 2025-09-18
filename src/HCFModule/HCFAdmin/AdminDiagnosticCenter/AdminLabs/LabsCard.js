import { Box, Typography } from "@mui/material";
import React from "react";
import lab from "../../../../static/images/DrImages/lab.png";
import BiotechIcon from "@mui/icons-material/Biotech";

export const LabsCard = ({ exam_name, exam_id }) => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Box
                    component={"div"}
                    sx={{ height: "3.44331rem", width: "3.44331rem", borderRadius: "0.5rem" }}
                >
                    {/* <img src={lab} style={{ height: "100%", width: "100%", borderRadius: "8px" }} /> */}
                    <BiotechIcon fontSize="large" style={{ color: "#E72B4A", borderRadius: "8px" }} />

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
                        {exam_name}
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
                        Lab id : {exam_id}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};
