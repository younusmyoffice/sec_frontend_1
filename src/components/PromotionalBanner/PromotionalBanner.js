import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import './PromotionalBanner.scss';

const PromotionalBanner = ({
    title = "Find Your Perfect Doctor",
    description = "Book appointments with top-rated healthcare professionals",
    buttonText = "Explore Now",
    image,
    onButtonClick,
    className = ""
}) => {
    return (
        <Box className={`promotional-banner ${className}`}>
            <Box className="banner-content">
                <Box className="text-content">
                    <Typography className="banner-title">
                        {title}
                    </Typography>
                    <Typography className="banner-description">
                        {description}
                    </Typography>
                    <Button
                        className="banner-button"
                        variant="contained"
                        endIcon={<ArrowForward />}
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </Button>
                </Box>
                {image && (
                    <Box className="image-content">
                        <img src={image} alt="Promotional" className="banner-image" />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PromotionalBanner;
