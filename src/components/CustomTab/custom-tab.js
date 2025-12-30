import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Typography, Chip, Badge } from "@mui/material";
import "./CustomTab.scss";

const CustomTab = ({ 
    items = [], 
    value = 0, 
    onChange = () => {},
    variant = "scrollable",
    orientation = "horizontal",
    size = "medium",
    color = "primary",
    centered = false,
    fullWidth = false,
    showScrollButtons = true,
    allowScrollButtonsMobile = true,
    className = "",
    tabProps = {},
    indicatorProps = {}
}) => {
    const [currentIdx, setCurrentIdx] = useState(value);

    const handleChange = (event, newValue) => {
        setCurrentIdx(newValue);
        if (onChange) {
            onChange(event, newValue);
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case "small":
                return {
                    fontSize: "12px",
                    minHeight: "40px",
                    padding: "6px 12px"
                };
            case "large":
                return {
                    fontSize: "16px",
                    minHeight: "56px",
                    padding: "12px 24px"
                };
            default:
                return {
                    fontSize: "14px",
                    minHeight: "48px",
                    padding: "8px 16px"
                };
        }
    };

    const getColorStyles = () => {
        switch (color) {
            case "secondary":
                return {
                    color: "#ff6b9d",
                    "&.Mui-selected": {
                        color: "#ff6b9d"
                    }
                };
            case "success":
                return {
                    color: "#4caf50",
                    "&.Mui-selected": {
                        color: "#4caf50"
                    }
                };
            case "warning":
                return {
                    color: "#ff9800",
                    "&.Mui-selected": {
                        color: "#ff9800"
                    }
                };
            case "error":
                return {
                    color: "#f44336",
                    "&.Mui-selected": {
                        color: "#f44336"
                    }
                };
            default:
                return {
                    color: "#e72b4a",
                    "&.Mui-selected": {
                        color: "#e72b4a"
                    }
                };
        }
    };

    return (
        <Box className={`custom-tab ${className}`}>
        <Tabs
            value={currentIdx}
            onChange={handleChange}
                variant={variant}
                orientation={orientation}
                centered={centered}
                scrollButtons={showScrollButtons ? "auto" : false}
                allowScrollButtonsMobile={allowScrollButtonsMobile}
                aria-label="custom tabs"
                sx={{
                    fontFamily: "Poppins, sans-serif",
                    minHeight: getSizeStyles().minHeight,
                    
                    "& .MuiTabs-indicator": {
                        height: 3,
                        borderRadius: "2px",
                        background: color === "primary" ? "linear-gradient(135deg, #e72b4a 0%, #42a5f5 100%)" :
                                   color === "secondary" ? "linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)" :
                                   color === "success" ? "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)" :
                                   color === "warning" ? "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)" :
                                   color === "error" ? "linear-gradient(135deg, #f44336 0%, #ef5350 100%)" :
                                   "linear-gradient(135deg, #e72b4a 0%, #42a5f5 100%)",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        ...indicatorProps
                    },
                    
                    "& .MuiTabs-scrollButtons": {
                        color: color === "primary" ? "#e72b4a" :
                               color === "secondary" ? "#ff6b9d" :
                               color === "success" ? "#4caf50" :
                               color === "warning" ? "#ff9800" :
                               color === "error" ? "#f44336" : "#e72b4a",
                        
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            borderRadius: "8px"
                        },
                        
                        "&.Mui-disabled": {
                            opacity: 0.3
                        }
                    },
                    
                    "& .MuiTabs-flexContainer": {
                        gap: orientation === "horizontal" ? "8px" : "0px"
                    }
                }}
                {...tabProps}
            >
                {items.map((item, idx) => {
                    const tabItem = typeof item === "object" ? item : { label: item };
                    const { 
                        label, 
                        icon, 
                        disabled = false, 
                        badge = null, 
                        chip = null,
                        sx = {} 
                    } = tabItem;

                    return (
                        <Tab
                            key={idx}
                            label={
                                <Box className="tab-content">
                                    {icon && (
                                        <Box className="tab-icon">
                                            {icon}
                                        </Box>
                                    )}
                                    <Typography 
                                        variant="body2" 
                                        className="tab-label"
                                        sx={{
                                            fontFamily: "Poppins, sans-serif",
                                            fontWeight: currentIdx === idx ? 600 : 500,
                                            fontSize: getSizeStyles().fontSize,
                                            textTransform: "none",
                                            transition: "all 0.3s ease"
                                        }}
                                    >
                                        {label}
                                    </Typography>
                                    {badge && (
                                        <Badge 
                                            badgeContent={badge.count} 
                                            color={badge.color || "primary"}
                                            className="tab-badge"
                                        >
                                            <Box />
                                        </Badge>
                                    )}
                                    {chip && (
                                        <Chip 
                                            label={chip.label}
                                            size="small"
                                            color={chip.color || "primary"}
                                            variant={chip.variant || "filled"}
                                            className="tab-chip"
                                            sx={{
                                                fontSize: "10px",
                                                height: "20px",
                                                marginLeft: "4px"
                                            }}
                                        />
                                    )}
                                </Box>
                            }
                            disabled={disabled}
                            sx={{
                                ...getSizeStyles(),
                                ...getColorStyles(),
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: currentIdx === idx ? 600 : 500,
                                textTransform: "none",
                                borderRadius: "12px",
                                margin: "0 4px",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                position: "relative",
                                overflow: "hidden",
                                
                                "&:hover": {
                                    backgroundColor: color === "primary" ? "rgba(25, 118, 210, 0.08)" :
                                                   color === "secondary" ? "rgba(255, 107, 157, 0.08)" :
                                                   color === "success" ? "rgba(76, 175, 80, 0.08)" :
                                                   color === "warning" ? "rgba(255, 152, 0, 0.08)" :
                                                   color === "error" ? "rgba(244, 67, 54, 0.08)" :
                                                   "rgba(25, 118, 210, 0.08)",
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                },
                                
                                "&.Mui-selected": {
                                    backgroundColor: color === "primary" ? "rgba(25, 118, 210, 0.12)" :
                                                   color === "secondary" ? "rgba(255, 107, 157, 0.12)" :
                                                   color === "success" ? "rgba(76, 175, 80, 0.12)" :
                                                   color === "warning" ? "rgba(255, 152, 0, 0.12)" :
                                                   color === "error" ? "rgba(244, 67, 54, 0.12)" :
                                                   "rgba(25, 118, 210, 0.12)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                                    
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: color === "primary" ? "linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)" :
                                                   color === "secondary" ? "linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(255, 143, 171, 0.1) 100%)" :
                                                   color === "success" ? "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 187, 106, 0.1) 100%)" :
                                                   color === "warning" ? "linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 183, 77, 0.1) 100%)" :
                                                   color === "error" ? "linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(239, 83, 80, 0.1) 100%)" :
                                                   "linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)",
                                        borderRadius: "12px",
                                        zIndex: -1
                                    }
                                },
                                
                                "&.Mui-disabled": {
                                    opacity: 0.5,
                                    cursor: "not-allowed"
                                },
                                
                                ...sx
                            }}
                        />
                    );
                })}
        </Tabs>
        </Box>
    );
};

CustomTab.defaultProps = {
    items: ["item 1", "item 2", "item 3"],
    value: 0,
    onChange: () => {},
    variant: "scrollable",
    orientation: "horizontal",
    size: "medium",
    color: "primary",
    centered: false,
    fullWidth: false,
    showScrollButtons: true,
    allowScrollButtonsMobile: true,
    className: "",
    tabProps: {},
    indicatorProps: {}
};

CustomTab.propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
            disabled: PropTypes.bool,
            badge: PropTypes.shape({
                count: PropTypes.number,
                color: PropTypes.string
            }),
            chip: PropTypes.shape({
                label: PropTypes.string,
                color: PropTypes.string,
                variant: PropTypes.string
            }),
            sx: PropTypes.object
        })
    ])),
    value: PropTypes.number,
    onChange: PropTypes.func,
    variant: PropTypes.oneOf(["standard", "scrollable", "fullWidth"]),
    orientation: PropTypes.oneOf(["horizontal", "vertical"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    color: PropTypes.oneOf(["primary", "secondary", "success", "warning", "error"]),
    centered: PropTypes.bool,
    fullWidth: PropTypes.bool,
    showScrollButtons: PropTypes.bool,
    allowScrollButtonsMobile: PropTypes.bool,
    className: PropTypes.string,
    tabProps: PropTypes.object,
    indicatorProps: PropTypes.object,
};

export default CustomTab;
