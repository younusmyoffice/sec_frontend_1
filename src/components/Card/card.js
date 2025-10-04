import { Box, Card, CardContent, CardMedia, Typography, Chip, Rating } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CustomCard = ({ 
    id, 
    image, 
    name, 
    hospital, 
    specialist, 
    rating, 
    reviews,
    onClick,
    elevation = 2
}) => {
    return (
        <Box sx={{ width: "280px", margin: "8px" }}>
            <Card
                key={id}
                onClick={onClick}
                sx={{
                    display: "flex",
                    width: "100%",
                    minHeight: "120px",
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    boxShadow: `0 ${elevation * 2}px ${elevation * 4}px rgba(0, 0, 0, 0.1)`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: onClick ? "pointer" : "default",
                    "&:hover": onClick ? {
                        transform: "translateY(-4px)",
                        boxShadow: `0 ${elevation * 3}px ${elevation * 6}px rgba(0, 0, 0, 0.15)`,
                    } : {},
                    overflow: "hidden",
                }}
            >
                <Box sx={{ width: "100px", height: "100px", margin: "10px" }}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "12px",
                            objectFit: "cover",
                        }}
                        image={image}
                        alt={`${name} profile`}
                    />
                </Box>

                <CardContent sx={{ 
                    flex: 1, 
                    padding: "12px 16px 12px 8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    <Box>
                        <Typography
                            sx={{ 
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#333",
                                lineHeight: 1.3,
                                marginBottom: "4px"
                            }}
                            component="h2"
                            variant="h6"
                        >
                            {name}
                        </Typography>
                        
                        <Chip 
                            label={specialist}
                            size="small"
                            sx={{
                                fontSize: "10px",
                                height: "20px",
                                marginBottom: "6px",
                                backgroundColor: "#e3f2fd",
                                color: "#1976d2",
                                fontWeight: 500
                            }}
                        />
                        
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: "#666",
                                fontSize: "12px",
                                fontWeight: 500,
                                marginBottom: "4px"
                            }}
                        >
                            {hospital}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Rating 
                            value={parseFloat(rating) || 0} 
                            readOnly 
                            size="small"
                            precision={0.1}
                            sx={{ fontSize: "14px" }}
                        />
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: "#999",
                                fontSize: "11px",
                                fontWeight: 500
                            }}
                        >
                            ({reviews})
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

CustomCard.defaultProps = {
    elevation: 2,
    onClick: null,
};

CustomCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hospital: PropTypes.string.isRequired,
    specialist: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    reviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClick: PropTypes.func,
    elevation: PropTypes.number,
};

export default CustomCard;