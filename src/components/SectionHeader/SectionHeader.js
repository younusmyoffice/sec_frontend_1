import React from 'react';
import { Box, Typography } from '@mui/material';
import './SectionHeader.scss';

const SectionHeader = ({ title, subtitle, action, className = "" }) => {
    return (
        <Box className={`section-header ${className}`}>
            <Box className="section-header-content">
                <Box className="section-header-text">
                    <Typography variant="h4" className="section-title">
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body1" className="section-subtitle">
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
        </Box>
    );
};

export default SectionHeader;
