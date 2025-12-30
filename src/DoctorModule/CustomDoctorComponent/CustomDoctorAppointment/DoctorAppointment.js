/**
 * DoctorAppointmentCard Component
 * 
 * Displays appointment statistics in a card format:
 * - Large number display for appointment count (centered)
 * - Appointment type label below the number (centered)
 * 
 * Features:
 * - Properly centered number and label within card
 * - Hover effect for interactivity
 * - Responsive design
 * - Clean layout without empty dropdown field
 * 
 * @component
 */

import React from "react";
import "./DoctorAppointment.scss";
import { Typography } from "@mui/material";
import logger from "../../../utils/logger"; // Centralized logging

/**
 * DoctorAppointmentCard - Appointment Statistics Card
 * 
 * @param {number} NumberOfAppointments - Number of appointments to display (default: 0)
 * @param {string} AppointmentType - Type/label of appointment (default: "Parameters")
 * @param {Function} onClick - Click handler function (optional)
 */
const DoctorAppointmentCard = ({ NumberOfAppointments = 0, AppointmentType = "Parameters", onClick }) => {
    logger.debug("🔵 DoctorAppointmentCard rendering", {
        count: NumberOfAppointments,
        type: AppointmentType
    });

    return (
        <div 
            className="DoctorDashboardCard" 
            onClick={onClick} 
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            {/* Number Display - Large red number centered in card */}
            <div className="Number-Container number-display">
                <Typography
                    component="div"
                    sx={{
                        color: "#E72B4A",
                        fontFamily: "Poppins",
                        fontSize: "3rem",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "1.2", // Better line height for large numbers
                        display: "block",
                        textAlign: "center",
                        width: "100%",
                        margin: 0,
                    }}
                >
                    {NumberOfAppointments}
                </Typography>
            </div>
            
            {/* Label Display - Appointment type text centered below number */}
            <div className="Number-Container label-display">
                <Typography
                    component="div"
                    sx={{
                        color: "#313033",
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "1.5rem",
                        textAlign: "center", // Ensure text is centered
                        display: "block",
                        width: "100%",
                        margin: 0,
                    }}
                >
                    {AppointmentType}
                </Typography>
            </div>
        </div>
    );
};

export default DoctorAppointmentCard;
