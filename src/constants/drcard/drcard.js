import { Box, Divider, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Imagestar from "../../static/images/DrImages/ShiningStar.png";
import DrImage from "../../static/images/DrImages/doctor_alter.jpeg";
import { getProfileImageSrc } from "../../utils/imageUtils";

const Drcard = ({ DrData }) => {
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

    return (
        <Box key={id} sx={{ width: "100%", height: "100%" }}>
            <Card
                sx={{
                    display: "flex",
                    height: "200px",
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
                        src={getProfileImageSrc(DrData?.profile_picture, DrImage)}
                        alt="Doctor Profile"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
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
                                fontSize: "16px",
                                mb: 1,
                                color: "#2c3e50",
                                lineHeight: 1.2,
                            }}
                        >
                            {`${name || ""} ${middle_name || ""} ${last_name || ""}`.trim()}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: "#7f8c8d",
                                fontSize: "13px",
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
                                    fontSize: "12px",
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
                                fontSize: "12px",
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

Drcard.propTypes = {
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

export default Drcard;
