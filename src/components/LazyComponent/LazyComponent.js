import React, { Suspense } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

// Loading component for Suspense fallback
const LoadingFallback = ({ message = "Loading..." }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            gap: 2
        }}
    >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
            {message}
        </Typography>
    </Box>
);

// Higher-order component for lazy loading
const LazyComponent = ({ 
    children, 
    fallback = <LoadingFallback />,
    errorBoundary = true 
}) => {
    if (errorBoundary) {
        return (
            <Suspense fallback={fallback}>
                {children}
            </Suspense>
        );
    }
    
    return (
        <Suspense fallback={fallback}>
            {children}
        </Suspense>
    );
};

export default LazyComponent;
