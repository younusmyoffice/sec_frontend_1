import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Avatar } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import CustomButton from "../CustomButton";
import "./DoctorProfileCard.scss";

const DoctorProfileCard = ({
    name = "Dr. John Doe",
    specialty = "General Practitioner",
    profileImage = null,
    onEditClick = () => {},
    className = "",
    showEditButton = true,
    ...props
}) => {
    return (
        <Box className={`doctor-profile-card ${className}`} {...props}>
            <div className="profile-content">
                <div className="profile-info">
                    <Avatar
                        src={profileImage}
                        alt={name}
                        className="profile-avatar"
                        sx={{
                            width: 80,
                            height: 80,
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            backgroundColor: '#e72b49',
                            color: 'white'
                        }}
                    >
                        {!profileImage && name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    
                    <div className="profile-details">
                        <Typography variant="h6" className="doctor-name">
                            {name}
                        </Typography>
                        <Typography variant="body2" className="doctor-specialty">
                            {specialty}
                        </Typography>
                    </div>
                </div>
                
                {showEditButton && (
                    <CustomButton
                        label="Edit Profile"
                        startIcon={<EditIcon />}
                        isTransparent={false}
                        buttonCss={{
                            minWidth: "140px",
                            height: "48px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 500,
                            textTransform: "none",
                            border: "1px solid #e72b49",
                            color: "#e72b49",
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "#e72b49",
                                color: "white",
                                borderColor: "#e72b49"
                            }
                        }}
                        handleClick={onEditClick}
                    />
                )}
            </div>
        </Box>
    );
};

DoctorProfileCard.propTypes = {
    name: PropTypes.string,
    specialty: PropTypes.string,
    profileImage: PropTypes.string,
    onEditClick: PropTypes.func,
    className: PropTypes.string,
    showEditButton: PropTypes.bool,
};

export default DoctorProfileCard;
