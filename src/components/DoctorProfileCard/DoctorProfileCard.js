import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Avatar, Chip, Rating, Divider } from "@mui/material";
import { Edit as EditIcon, LocationOn, Phone, Email } from "@mui/icons-material";
import CustomButton from "../CustomButton";
import "./DoctorProfileCard.scss";

const DoctorProfileCard = ({
    name = "Dr. John Doe",
    specialty = "General Practitioner",
    profileImage = null,
    onEditClick = () => {},
    className = "",
    showEditButton = true,
    rating = 4.5,
    reviewCount = 128,
    location = "New York, NY",
    phone = "+1 (555) 123-4567",
    email = "doctor@example.com",
    experience = "10+ years",
    variant = "default",
    ...props
}) => {
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Box className={`doctor-profile-card doctor-profile-card--${variant} ${className}`} {...props}>
            <div className="profile-content">
                <div className="profile-header">
                    <div className="profile-info">
                        <Avatar
                            src={profileImage}
                            alt={name}
                            className="profile-avatar"
                            sx={{
                                width: 100,
                                height: 100,
                                fontSize: '1.8rem',
                                fontWeight: 700,
                                backgroundColor: '#e72b4a',
                                color: 'white',
                                border: '4px solid #ffffff',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            }}
                        >
                            {!profileImage && getInitials(name)}
                        </Avatar>
                        
                        <div className="profile-details">
                            <Typography variant="h5" className="doctor-name">
                                {name}
                            </Typography>
                            <Typography variant="body1" className="doctor-specialty">
                                {specialty}
                            </Typography>
                            
                            {experience && (
                                <Chip 
                                    label={`${experience} experience`}
                                    size="small"
                                    sx={{
                                        marginTop: '8px',
                                        backgroundColor: '#e3f2fd',
                                        color: '#1976d2',
                                        fontWeight: 600,
                                        fontSize: '11px'
                                    }}
                                />
                            )}
                            
                            <div className="rating-section">
                                <Rating 
                                    value={rating} 
                                    readOnly 
                                    precision={0.1}
                                    size="small"
                                    sx={{ marginTop: '8px' }}
                                />
                                <Typography variant="caption" className="rating-text">
                                    {rating} ({reviewCount} reviews)
                                </Typography>
                            </div>
                        </div>
                    </div>
                    
                    {showEditButton && (
                        <CustomButton
                            label="Edit Profile"
                            startIcon={<EditIcon />}
                            isTransparent={true}
                            buttonCss={{
                                minWidth: "140px",
                                height: "44px",
                                borderRadius: "12px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textTransform: "none",
                                border: "2px solid #e72b4a",
                                color: "#e72b4a",
                                backgroundColor: "transparent",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#e72b4a",
                                    color: "white",
                                    borderColor: "#e72b4a",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 12px rgba(231, 43, 74, 0.3)"
                                }
                            }}
                            handleClick={onEditClick}
                        />
                    )}
                </div>
                
                {(location || phone || email) && (
                    <>
                        <Divider sx={{ margin: '1.5rem 0', opacity: 0.6 }} />
                        <div className="contact-info">
                            {location && (
                                <div className="contact-item">
                                    <LocationOn sx={{ fontSize: 18, color: '#666' }} />
                                    <Typography variant="body2" className="contact-text">
                                        {location}
                                    </Typography>
                                </div>
                            )}
                            {phone && (
                                <div className="contact-item">
                                    <Phone sx={{ fontSize: 18, color: '#666' }} />
                                    <Typography variant="body2" className="contact-text">
                                        {phone}
                                    </Typography>
                                </div>
                            )}
                            {email && (
                                <div className="contact-item">
                                    <Email sx={{ fontSize: 18, color: '#666' }} />
                                    <Typography variant="body2" className="contact-text">
                                        {email}
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </>
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
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    location: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    experience: PropTypes.string,
    variant: PropTypes.oneOf(["default", "compact", "detailed"]),
};

export default DoctorProfileCard;