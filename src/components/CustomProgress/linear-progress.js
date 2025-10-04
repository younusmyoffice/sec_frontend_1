import React from "react";
import PropTypes from "prop-types";
import { Box, LinearProgress, Typography, Fade } from "@mui/material";
import "./CustomProgress.scss";

export const CustomLinearProgress = ({ 
    progress = 0, 
    label = "", 
    showPercentage = true, 
    size = "medium",
    variant = "determinate",
    color = "primary",
    thickness = 4,
    animated = true,
    className = ""
}) => {
    const getSizeStyles = () => {
        switch (size) {
            case "small":
                return {
                    height: 4,
                    fontSize: "12px"
                };
            case "large":
                return {
                    height: 8,
                    fontSize: "16px"
                };
            default:
                return {
                    height: 6,
                    fontSize: "14px"
                };
        }
    };

    const getColorStyles = () => {
        switch (color) {
            case "secondary":
                return {
                    backgroundColor: "rgba(255, 107, 157, 0.2)",
                    "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)"
                    }
                };
            case "success":
                return {
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)"
                    }
                };
            case "warning":
                return {
                    backgroundColor: "rgba(255, 152, 0, 0.2)",
                    "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)"
                    }
                };
            case "error":
                return {
                    backgroundColor: "rgba(244, 67, 54, 0.2)",
                    "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(135deg, #f44336 0%, #ef5350 100%)"
                    }
                };
            default:
                return {
                    backgroundColor: "rgba(25, 118, 210, 0.2)",
                    "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)"
                    }
                };
        }
    };

    return (
        <Box className={`custom-linear-progress ${className}`}>
            {(label || showPercentage) && (
                <Box className="progress-header">
                    {label && (
                        <Typography 
                            variant="body2" 
                            className="progress-label"
                            sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 600,
                                color: "#495057",
                                fontSize: getSizeStyles().fontSize
                            }}
                        >
                            {label}
                        </Typography>
                    )}
                    {showPercentage && variant === "determinate" && (
                        <Typography 
                            variant="body2" 
                            className="progress-percentage"
                            sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 700,
                                color: color === "primary" ? "#1976d2" : 
                                       color === "secondary" ? "#ff6b9d" :
                                       color === "success" ? "#4caf50" :
                                       color === "warning" ? "#ff9800" :
                                       color === "error" ? "#f44336" : "#1976d2",
                                fontSize: getSizeStyles().fontSize
                            }}
                        >
                            {Math.round(progress)}%
                        </Typography>
                    )}
                </Box>
            )}
            
            <Box className="progress-container">
                <LinearProgress
                    variant={variant}
                    value={progress}
                    sx={{
                        height: getSizeStyles().height,
                        borderRadius: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        overflow: "hidden",
                        ...getColorStyles(),
                        
                        "& .MuiLinearProgress-bar": {
                            borderRadius: "10px",
                            transition: animated ? "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                            position: "relative",
                            
                            "&::after": animated ? {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                                animation: "shimmer 2s infinite",
                                borderRadius: "10px"
                            } : {}
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

CustomLinearProgress.defaultProps = {
    progress: 0,
    label: "",
    showPercentage: true,
    size: "medium",
    variant: "determinate",
    color: "primary",
    thickness: 4,
    animated: true,
    className: ""
};

CustomLinearProgress.propTypes = {
    progress: PropTypes.number,
    label: PropTypes.string,
    showPercentage: PropTypes.bool,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    variant: PropTypes.oneOf(["determinate", "indeterminate", "buffer", "query"]),
    color: PropTypes.oneOf(["primary", "secondary", "success", "warning", "error"]),
    thickness: PropTypes.number,
    animated: PropTypes.bool,
    className: PropTypes.string,
};
