import React from 'react';
import { Box, Typography, Divider, Chip } from '@mui/material';
import './SectionHeader.scss';

const SectionHeader = ({ 
    title, 
    subtitle, 
    action, 
    className = "",
    variant = "default",
    size = "medium",
    showDivider = true,
    badge,
    icon
}) => {
    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    titleVariant: 'h6',
                    subtitleVariant: 'body2',
                    padding: '1rem 0',
                    gap: '0.5rem'
                };
            case 'large':
                return {
                    titleVariant: 'h3',
                    subtitleVariant: 'h6',
                    padding: '2rem 0',
                    gap: '1rem'
                };
            default:
                return {
                    titleVariant: 'h4',
                    subtitleVariant: 'body1',
                    padding: '1.5rem 0',
                    gap: '0.75rem'
                };
        }
    };

    const sizeStyles = getSizeStyles();

    return (
        <Box className={`section-header section-header--${variant} section-header--${size} ${className}`}>
            <Box className="section-header-content">
                <Box className="section-header-text">
                    <Box className="section-title-container">
                        {icon && (
                            <Box className="section-header-icon">
                                {icon}
                            </Box>
                        )}
                        <Typography 
                            variant={sizeStyles.titleVariant} 
                            className="section-title"
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700,
                                color: '#333',
                                lineHeight: 1.2,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            {title}
                        </Typography>
                        {badge && (
                            <Chip 
                                label={badge} 
                                size="small"
                                sx={{
                                    marginLeft: '12px',
                                    backgroundColor: '#e3f2fd',
                                    color: '#e72b4a',
                                    fontWeight: 600,
                                    fontSize: '11px',
                                    height: '24px'
                                }}
                            />
                        )}
                    </Box>
                    {subtitle && (
                        <Typography 
                            variant={sizeStyles.subtitleVariant} 
                            className="section-subtitle"
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 400,
                                color: '#666',
                                lineHeight: 1.5,
                                marginTop: '4px'
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>
                {action && (
                    <Box className="section-header-action">
                        {action}
                    </Box>
                )}
            </Box>
            {showDivider && variant !== 'minimal' && (
                <Divider 
                    sx={{ 
                        marginTop: '1rem',
                        borderColor: '#e0e0e0',
                        opacity: 0.6
                    }} 
                />
            )}
        </Box>
    );
};

export default SectionHeader;