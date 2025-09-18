import React from "react";
import { Typography, Box } from "@mui/material";

const DoctorAppointmentCard = ({ countData, fieldName }) => {
    return (
        <Box
            sx={{
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "left",
                minWidth: "350px", // Adjust width as needed
                margin: "0.5rem", // Adds spacing between cards
            }}
        >
            <Typography
                sx={{
                    color: "#E72B4A",
                    fontFamily: "Poppins",
                    fontSize: "2.5rem", // Reduced font size
                    fontWeight: "600",
                }}
            >
                {countData}
            </Typography>
            <Typography
                sx={{
                    color: "#313033",
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    fontWeight: "400",
                }}
            >
                {fieldName}
            </Typography>
        </Box>
    );
};

export default React.memo(DoctorAppointmentCard);
