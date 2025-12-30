import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import img from "../../../../static/images/DrImages/image10.png";
import { getProfileImageSrc } from "../../../../utils/imageUtils"; // Utility for handling image sources

/**
 * ReceiveTable Component
 * 
 * Displays lab/profile information in reports table
 * Shows profile image and name
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Lab/profile name
 * @param {string|number} [props.Id] - Booking ID (currently not displayed)
 * @param {string} [props.profile] - Profile image URL
 * 
 * @component
 */
const RecieveTable = ({ name, Id, profile }) => {
    return (
        <Box sx={{ display: "flex" }}>
            {/* Profile image */}
            <Box 
                component={'div'} 
                sx={{
                    height: "3.44331rem", 
                    width: "3.44331rem", 
                    borderRadius: "0.5rem" 
                }}
            >
                <img 
                    src={getProfileImageSrc(profile, img)} 
                    alt={name || "Profile"} 
                    style={{
                        height: "100%", 
                        width: "100%", 
                        borderRadius: "8px" 
                    }} 
                />
            </Box>
            
            {/* Name */}
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
                
                {/* Booking ID - commented out but available for future use */}
                {/* <Typography
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
                    Booking ID : {Id || "N/A"}
                </Typography> */}
            </Box>
        </Box>
    );
};

// PropTypes for type checking
RecieveTable.propTypes = {
    name: PropTypes.string,
    Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    profile: PropTypes.string,
};

RecieveTable.defaultProps = {
    name: "N/A",
    Id: "N/A",
    profile: null,
};

export default RecieveTable;
