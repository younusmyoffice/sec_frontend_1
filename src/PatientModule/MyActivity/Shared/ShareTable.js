import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import img from "../../../static/images/DrImages/Image02.png";

/**
 * ShareTable Component
 * 
 * Displays doctor profile in a table row for shared reports
 * Shows doctor's profile picture and name
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Doctor's full name
 * @param {string} [props.profile] - Profile picture URL (falls back to default image)
 * 
 * @component
 */
const ShareTable = ({ name, profile }) => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                {/* Profile Picture */}
                <Box
                    component={"div"}
                    sx={{ 
                        height: "3.44331rem", 
                        width: "3.44331rem", 
                        borderRadius: "0.5rem" 
                    }}
                >
                    <img 
                        src={profile || img} 
                        alt={name || "Doctor Profile"}
                        style={{ 
                            height: "100%", 
                            width: "100%", 
                            borderRadius: "8px" 
                        }} 
                    />
                </Box>
                
                {/* Doctor Name */}
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
                        {name || "Unknown Doctor"}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

// PropTypes for type checking
ShareTable.propTypes = {
    name: PropTypes.string,
    profile: PropTypes.string,
};

export default ShareTable;
