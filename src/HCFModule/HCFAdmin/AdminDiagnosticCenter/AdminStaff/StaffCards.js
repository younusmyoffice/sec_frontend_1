import { Box, Typography } from "@mui/material";
import React from "react";
export const StaffCards = ({ name, staff_id, lab_id }) => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
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
                        Lab id : {`${staff_id} ${lab_id}`}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};
