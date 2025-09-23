import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import './StepContent.scss';

const StepContent = ({ 
    title, 
    subtitle, 
    children, 
    className = "",
    variant = "default" 
}) => {
    return (
        <Paper className={`step-content step-content--${variant} ${className}`} elevation={2}>
            <Box className="step-content-header">
                <Typography variant="h5" className="step-title">
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body1" className="step-subtitle">
                        {subtitle}
                    </Typography>
                )}
            </Box>
            <Box className="step-content-body">
                {children}
            </Box>
        </Paper>
    );
};

export default StepContent;
