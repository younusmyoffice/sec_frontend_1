import React, { useState, useEffect } from 'react';
import { Box, Divider, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { LocationOn, Star } from '@mui/icons-material';
import { getProfileImageSrc, validateS3Url } from '../../utils/imageUtils';
import Imagestar from '../../static/images/DrImages/ShiningStar.png';
import DrImage from '../../static/images/DrImages/doctor_alter.jpeg';
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

    const [imageSrc, setImageSrc] = useState(DrImage);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        const handleImageSrc = async () => {
            const facilityName = name;
            console.log(`🔍 HealthcareFacilityCard processing image for: ${facilityName}`);
            
            if (!logo) {
                console.log(`❌ No logo for ${facilityName}, using static image`);
                setImageSrc(DrImage);
                setIsImageLoading(false);
                return;
            }

            console.log(`🖼️ Processing image for ${facilityName}:`, {
                hasImage: !!logo,
                isBase64: logo.startsWith('data:image/'),
                isS3Url: logo.startsWith('http'),
                isRawBase64: logo.length > 100 && !logo.includes('http'),
                imageLength: logo.length,
                imagePreview: logo.substring(0, 50) + '...'
            });

            // Priority 1: If it's a base64 image, use it directly
            if (logo.startsWith('data:image/')) {
                console.log(`✅ Using base64 data URL for ${facilityName}`);
                setImageSrc(logo);
                setIsImageLoading(false);
                return;
            }

            // Priority 2: If it's a base64 string without prefix, add it
            if (logo.length > 100 && !logo.includes('http')) {
                console.log(`✅ Converting raw base64 to data URL for ${facilityName}`);
                setImageSrc(`data:image/jpeg;base64,${logo}`);
                setIsImageLoading(false);
                return;
            }

            // Priority 3: If it's an S3 URL, validate it
            if (logo.startsWith('http')) {
                console.log(`🔍 Validating S3 URL for ${facilityName}: ${logo}`);
                try {
                    const isValid = await validateS3Url(logo);
                    if (isValid) {
                        console.log(`✅ S3 URL is valid for ${facilityName}`);
                        setImageSrc(logo);
                    } else {
                        console.log(`❌ S3 URL access denied for ${facilityName}, using fallback image`);
                        setImageSrc(DrImage);
                    }
                } catch (error) {
                    console.log(`❌ Error validating S3 URL for ${facilityName}:`, error);
                    setImageSrc(DrImage);
                }
                setIsImageLoading(false);
                return;
            }

            // Priority 4: Fallback to static image
            console.log(`🔄 Using static fallback image for ${facilityName}`);
            setImageSrc(DrImage);
            setIsImageLoading(false);
        };

        handleImageSrc();
    }, [logo, name]);

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Card
                sx={{
                    display: "flex",
                    height: "130px",
                    padding: 0,
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s ease-in-out",
                    cursor: "pointer",
                    "&:hover": {
                        boxShadow: "0 8px 25px rgba(231, 43, 74, 0.15)",
                        transform: "translateY(-4px)",
                    },
                }}
                onClick={onClick}
            >
                <Box sx={{ 
                    width: "140px", 
                    height: "100%", 
                    flexShrink: 0,
                    position: "relative",
                    overflow: "hidden"
                }}>
                    <CardMedia
                        component="img"
                        src={imageSrc}
                        alt="Healthcare Facility Logo"
                        sx={{
                            
                            padding: "5px",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: isImageLoading ? 0.7 : 1,
                            transition: "opacity 0.3s ease",
                        }}
                        onError={(e) => {
                            const facilityName = name;
                            console.log(`❌ Image failed to load for ${facilityName}:`, {
                                currentSrc: imageSrc,
                                error: e,
                                fallbackTo: DrImage
                            });
                            setImageSrc(DrImage);
                            setIsImageLoading(false);
                        }}
                        onLoad={() => {
                            const facilityName = name;
                            console.log(`✅ Image loaded successfully for ${facilityName}:`, imageSrc);
                            setIsImageLoading(false);
                        }}
                    />
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(231, 43, 74, 0.1) 0%, rgba(255, 107, 107, 0.05) 100%)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                            opacity: 1,
                        }
                    }} />
                </Box>

                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flexGrow: 1,
                        padding: "16px 20px",
                        height: "100%",
                    }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                fontSize: "14px",
                                mb: 1,
                                color: "#2c3e50",
                                lineHeight: 1.2,
                            }}
                        >
                            {name}
                        </Typography>

                        {/* <Typography
                            variant="body2"
                            sx={{
                                color: "#7f8c8d",
                                fontSize: "12px",
                                lineHeight: 1.4,
                                mb: 0.5,
                                fontWeight: 500,
                            }}
                        >
                            {type}
                        </Typography> */}
                        
                        {location && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#95a5a6",
                                    fontSize: "10px",
                                    lineHeight: 1.3,
                                    mb: 1,
                                }}
                            >
                                {location}
                            </Typography>
                        )}

                        <Typography
                            variant="body2"
                            sx={{
                                color: "#e72b4a",
                                fontSize: "10px",
                                fontWeight: 600,
                                mb: 1.5,
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                            }}
                        >
                            {type}
                        </Typography>
                    </Box>

                    <Box sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: "auto"
                    }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                                component="span"
                                sx={{ display: "flex", alignItems: "center", mr: 0.5 }}
                            >
                                <img src={Imagestar} alt="Star" style={{ height: "14px" }} />
                            </Box>
                            <Typography variant="body2" sx={{ 
                                fontSize: "12px", 
                                color: "#7f8c8d",
                                fontWeight: 500
                            }}>
                                {rating || "N/A"}
                            </Typography>
                        </Box>
                        
                        <Box sx={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#e72b4a",
                            opacity: 0.7,
                        }} />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default HealthcareFacilityCard;
