import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SearchOff, Refresh } from '@mui/icons-material';
import './EmptyState.scss';

const EmptyState = ({ 
    icon: Icon = SearchOff,
    title = "No data found",
    description = "There's nothing to show here yet.",
    action,
    actionText = "Refresh",
    onAction,
    className = "",
    size = "medium"
}) => {
    const isEmoji = typeof Icon === 'string';
    const isJSXElement = React.isValidElement(Icon);
    
    const iconSize = size === "small" ? 48 : size === "large" ? 96 : 64;
    const titleVariant = size === "small" ? "subtitle1" : size === "large" ? "h4" : "h6";
    const descriptionVariant = size === "small" ? "caption" : size === "large" ? "body1" : "body2";

    return (
        <Box className={`empty-state ${className}`}>
            <Box className="empty-state-content">
                <Box className="empty-state-icon">
                    {isEmoji ? (
                        <Typography 
                            sx={{ 
                                fontSize: iconSize, 
                                color: '#ccc',
                                lineHeight: 1,
                                userSelect: 'none'
                            }}
                        >
                            {Icon}
                        </Typography>
                    ) : isJSXElement ? (
                        React.cloneElement(Icon, { 
                            sx: { fontSize: iconSize, color: '#ccc' } 
                        })
                    ) : (
                        <Icon sx={{ fontSize: iconSize, color: '#ccc' }} />
                    )}
                </Box>
                <Typography 
                    variant={titleVariant} 
                    className="empty-state-title"
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        color: "#333",
                        marginBottom: "8px"
                    }}
                >
                    {title}
                </Typography>
                <Typography 
                    variant={descriptionVariant} 
                    className="empty-state-description"
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: "#666",
                        textAlign: "center",
                        maxWidth: "400px",
                        lineHeight: 1.5
                    }}
                >
                    {description}
                </Typography>
                {(action || onAction) && (
                    <Box className="empty-state-action">
                        {action || (
                            <Button
                                variant="outlined"
                                startIcon={<Refresh />}
                                onClick={onAction}
                                className="empty-state-button"
                                sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 500,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    padding: "8px 24px",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                                    }
                                }}
                            >
                                {actionText}
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default EmptyState;