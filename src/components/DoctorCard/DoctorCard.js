import { Box, Divider, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Imagestar from "../../static/images/DrImages/ShiningStar.png";
import DrImage from "../../static/images/DrImages/doctor_alter.jpeg";
import { getProfileImageSrc, validateS3Url } from "../../utils/imageUtils";

const DoctorCard = ({ DrData }) => {
    const {
        first_name: name = "",
        middle_name = "",
        last_name = "",
        suid: id,
        qualification = "",
        department_name: specialist = "",
        average_review: rating = "",
        hospital_org: hospital = "",
    } = DrData || {};

    // Debug logging for doctor name
    console.log("🔍 DoctorCard DrData:", DrData);
    console.log("🔍 DoctorCard name parts:", { name, middle_name, last_name });
    console.log("🔍 DoctorCard full name:", `Dr. ${name || ""} ${middle_name || ""} ${last_name || ""}`.trim());

    const [imageSrc, setImageSrc] = useState(DrImage);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        const handleImageSrc = async () => {
            const doctorName = `Dr. ${DrData?.first_name || ''} ${DrData?.last_name || ''}`.trim();
            console.log(`🔍 DoctorCard processing image for: ${doctorName}`);
            
            if (!DrData?.profile_picture) {
                console.log(`❌ No profile picture for ${doctorName}, using static image`);
                setImageSrc(DrImage);
                setIsImageLoading(false);
                return;
            }

            console.log(`🖼️ Processing image for ${doctorName}:`, {
                hasImage: !!DrData.profile_picture,
                isBase64: DrData.profile_picture.startsWith('data:image/'),
                isS3Url: DrData.profile_picture.startsWith('http'),
                isRawBase64: DrData.profile_picture.length > 100 && !DrData.profile_picture.includes('http'),
                imageLength: DrData.profile_picture.length,
                imagePreview: DrData.profile_picture.substring(0, 50) + '...'
            });

            // Priority 1: If it's a base64 image, use it directly
            if (DrData.profile_picture.startsWith('data:image/')) {
                console.log(`✅ Using base64 data URL for ${doctorName}`);
                setImageSrc(DrData.profile_picture);
                setIsImageLoading(false);
                return;
            }

            // Priority 2: If it's a base64 string without prefix, add it
            if (DrData.profile_picture.length > 100 && !DrData.profile_picture.includes('http')) {
                console.log(`✅ Converting raw base64 to data URL for ${doctorName}`);
                setImageSrc(`data:image/jpeg;base64,${DrData.profile_picture}`);
                setIsImageLoading(false);
                return;
            }

            // Priority 3: If it's an S3 URL, validate it
            if (DrData.profile_picture.startsWith('http')) {
                console.log(`🔍 Validating S3 URL for ${doctorName}: ${DrData.profile_picture}`);
                try {
                    const isValid = await validateS3Url(DrData.profile_picture);
                    if (isValid) {
                        console.log(`✅ S3 URL is valid for ${doctorName}`);
                        setImageSrc(DrData.profile_picture);
                    } else {
                        console.log(`❌ S3 URL access denied for ${doctorName}, using fallback image`);
                        setImageSrc(DrImage);
                    }
                } catch (error) {
                    console.log(`❌ Error validating S3 URL for ${doctorName}:`, error);
                    setImageSrc(DrImage);
                }
                setIsImageLoading(false);
                return;
            }

            // Priority 4: Fallback to static image
            console.log(`🔄 Using static fallback image for ${doctorName}`);
            setImageSrc(DrImage);
            setIsImageLoading(false);
        };

        handleImageSrc();
    }, [DrData?.profile_picture]);

    return (
        <Box key={id} sx={{ width: "100%", height: "100%" }}>
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
                        alt="Doctor Profile"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: isImageLoading ? 0.7 : 1,
                            transition: "opacity 0.3s ease",
                        }}
                        onError={(e) => {
                            const doctorName = `Dr. ${DrData?.first_name || ''} ${DrData?.last_name || ''}`.trim();
                            console.log(`❌ Image failed to load for ${doctorName}:`, {
                                currentSrc: imageSrc,
                                error: e,
                                fallbackTo: DrImage
                            });
                            setImageSrc(DrImage);
                            setIsImageLoading(false);
                        }}
                        onLoad={() => {
                            const doctorName = `Dr. ${DrData?.first_name || ''} ${DrData?.last_name || ''}`.trim();
                            console.log(`✅ Image loaded successfully for ${doctorName}:`, imageSrc);
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
                                fontSize: "13px",
                                mb: 1,
                                color: "#2c3e50",
                                lineHeight: 1.2,
                            }}
                        >
                            {`Dr. ${name || ""} ${middle_name || ""} ${last_name || ""}`.trim()}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: "#7f8c8d",
                                fontSize: "10px",
                                lineHeight: 1.4,
                                mb: 0.5,
                                fontWeight: 500,
                            }}
                        >
                            {qualification}
                        </Typography>
                        
                        {hospital && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#95a5a6",
                                    fontSize: "10px",
                                    lineHeight: 1.3,
                                    mb: 1,
                                }}
                            >
                                {hospital}
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
                            {specialist}
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
                                fontSize: "10px", 
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

DoctorCard.propTypes = {
    DrData: PropTypes.shape({
        first_name: PropTypes.string,
        middle_name: PropTypes.string,
        last_name: PropTypes.string,
        suid: PropTypes.string,
        qualification: PropTypes.string,
        department_name: PropTypes.string,
        review_type: PropTypes.string,
        hospital_org: PropTypes.string,
    }),
};

export default DoctorCard;
