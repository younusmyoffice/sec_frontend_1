import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import DrImage from "../../../static/images/DrImages/image2.png";
import { getProfileImageSrc } from "../../../utils/imageUtils"; // Utility for handling image sources

/**
 * BookingHistoryDrCard Component
 * 
 * Displays doctor profile information in booking history table
 * Shows doctor image, name, specialist, and booking ID
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Doctor's full name
 * @param {string} props.specialist - Doctor's specialization/department
 * @param {string|number} props.BookingId - Booking/appointment ID
 * @param {string} [props.profileImage] - Doctor's profile image URL
 * 
 * @component
 */
export const BookingHistoryDrCard = ({ name, specialist, BookingId, profileImage }) => {
    return (
        <Box sx={{ display: "flex" }}>
            {/* Doctor profile image */}
            <Box
                component={"div"}
                sx={{ 
                    height: "3.44331rem", 
                    width: "3.44331rem", 
                    borderRadius: "0.5rem" 
                }}
            >
                <img
                    src={getProfileImageSrc(profileImage, DrImage)}
                    alt={name || "Doctor profile"}
                    style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                />
            </Box>
            
            {/* Doctor details */}
            <Box
                sx={{
                    marginLeft: "2%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {/* Doctor name */}
                <Typography
                    sx={{
                        color: "#313033", // Common color: #313033
                        fontFamily: "Poppins",
                        fontSize: "0.875rem",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "1.375rem",
                        letterSpacing: "0.00438rem",
                    }}
                >
                    {name || "N/A"}
                </Typography>
                
                {/* Specialist and booking ID */}
                <Typography
                    sx={{
                        color: "#939094", // Common color variant
                        fontFamily: "Poppins",
                        fontSize: "0.625rem",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "0.9375rem",
                        letterSpacing: "0.005rem",
                    }}
                >
                    {specialist || "N/A"} | Booking ID : {BookingId || "N/A"}
                </Typography>
            </Box>
        </Box>
    );
};

// PropTypes for type checking
BookingHistoryDrCard.propTypes = {
    name: PropTypes.string,
    specialist: PropTypes.string,
    BookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    profileImage: PropTypes.string,
};

BookingHistoryDrCard.defaultProps = {
    name: "N/A",
    specialist: "N/A",
    BookingId: "N/A",
    profileImage: null,
};
