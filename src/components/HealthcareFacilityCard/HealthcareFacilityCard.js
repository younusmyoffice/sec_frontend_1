import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { LocationOn, Star } from '@mui/icons-material';
import { getProfileImageSrc } from '../../utils/imageUtils';
import './HealthcareFacilityCard.scss';

const HealthcareFacilityCard = ({
    facility,
    onClick,
    className = ""
}) => {
    const {
        name = "Healthcare Facility",
        type = "Hospital",
        rating = 4.5,
        review_count = 150,
        location = "City, State",
        logo
    } = facility || {};

    return (
        <Box
            className={`healthcare-facility-card ${className}`}
            onClick={onClick}
        >
            <Box className="facility-logo">
                <img
                    src={getProfileImageSrc(logo, '/default-facility-logo.png')}
                    alt={name}
                    className="logo-image"
                />
            </Box>

            <Box className="facility-info">
                <Typography className="facility-name">
                    {name}
                </Typography>

                <Typography className="facility-type">
                    {type}
                </Typography>

                <Box className="rating-section">
                    <Star className="star-icon" />
                    <Typography className="rating-text">
                        {rating} ({review_count}) Review
                    </Typography>
                </Box>

                <Box className="location-section">
                    <LocationOn className="location-icon" />
                    <Typography className="location-text">
                        {location}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default HealthcareFacilityCard;
