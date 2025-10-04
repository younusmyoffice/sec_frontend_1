import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Fade } from "@mui/material";
import "./CustomProgress.scss";

export const CustomCircularProgress = ({
    size = 120,
    progress = 0,
    trackWidth = 8,
    indicatorWidth = 8,
    trackColor = "#e0e0e0",
    indicatorColor = "#ff6b9d",
    indicatorCap = "round",
    spinnerMode = false,
    spinnerSpeed = 1,
    label = "",
    showPercentage = true,
    animated = true,
    className = ""
}) => {
    const center = size / 2;
    const radius = center - Math.max(trackWidth, indicatorWidth) - 2;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray * ((100 - progress) / 100);

    const getSizeStyles = () => {
        if (size <= 60) return { fontSize: "10px", fontWeight: 600 };
        if (size <= 100) return { fontSize: "14px", fontWeight: 600 };
        return { fontSize: "18px", fontWeight: 700 };
    };

    return (
        <Box className={`custom-circular-progress ${className}`}>
            <Box className="circular-progress-container" style={{ width: size, height: size }}>
                <svg 
                    className="circular-progress-svg" 
                    style={{ width: size, height: size }}
                    viewBox={`0 0 ${size} ${size}`}
                >
                    {/* Background track */}
                    <circle
                        className="circular-track"
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={trackColor}
                        strokeWidth={trackWidth}
                        opacity={0.3}
                    />
                    
                    {/* Progress indicator */}
                    <circle
                        className={`circular-indicator ${spinnerMode ? "spinner-mode" : ""} ${animated ? "animated" : ""}`}
                        style={{ 
                            animationDuration: spinnerMode ? `${spinnerSpeed}s` : "0.4s",
                            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={indicatorColor}
                        strokeWidth={indicatorWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        strokeLinecap={indicatorCap}
                        transform={`rotate(-90 ${center} ${center})`}
                        filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
                    />
                    
                    {/* Gradient definition for animated effect */}
                    <defs>
                        <linearGradient id={`gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={indicatorColor} stopOpacity="0.8" />
                            <stop offset="50%" stopColor={indicatorColor} stopOpacity="1" />
                            <stop offset="100%" stopColor={indicatorColor} stopOpacity="0.8" />
                        </linearGradient>
                        <filter id={`glow-${size}`}>
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
                
                {/* Center content */}
                <Box className="circular-progress-content">
                    {showPercentage && !spinnerMode && (
                        <Fade in={true} timeout={500}>
                            <Typography 
                                variant="h6" 
                                className="circular-percentage"
                                sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: getSizeStyles().fontWeight,
                                    fontSize: getSizeStyles().fontSize,
                                    color: indicatorColor,
                                    textAlign: "center",
                                    lineHeight: 1,
                                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                {Math.round(progress)}%
                            </Typography>
                        </Fade>
                    )}
                    
                    {label && (
                        <Typography 
                            variant="caption" 
                            className="circular-label"
                            sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 500,
                                fontSize: size <= 60 ? "8px" : size <= 100 ? "10px" : "12px",
                                color: "#6c757d",
                                textAlign: "center",
                                lineHeight: 1.2,
                                marginTop: "4px"
                            }}
                        >
                            {label}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

CustomCircularProgress.defaultProps = {
    size: 120,
    progress: 0,
    trackWidth: 8,
    indicatorWidth: 8,
    trackColor: "#e0e0e0",
    indicatorColor: "#ff6b9d",
    indicatorCap: "round",
    spinnerMode: false,
    spinnerSpeed: 1,
    label: "",
    showPercentage: true,
    animated: true,
    className: ""
};

CustomCircularProgress.propTypes = {
    size: PropTypes.number,
    progress: PropTypes.number,
    trackWidth: PropTypes.number,
    indicatorWidth: PropTypes.number,
    trackColor: PropTypes.string,
    indicatorColor: PropTypes.string,
    indicatorCap: PropTypes.oneOf(["round", "square", "butt"]),
    spinnerMode: PropTypes.bool,
    spinnerSpeed: PropTypes.number,
    label: PropTypes.string,
    showPercentage: PropTypes.bool,
    animated: PropTypes.bool,
    className: PropTypes.string,
};
