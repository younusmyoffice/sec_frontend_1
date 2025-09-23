import React from 'react';
import { Box, Skeleton } from '@mui/material';
import './LoadingSkeleton.scss';

const LoadingSkeleton = ({ 
    variant = 'card', 
    count = 1, 
    className = "",
    height = 200 
}) => {
    const renderSkeleton = () => {
        switch (variant) {
            case 'card':
                return (
                    <Box className={`skeleton-card ${className}`}>
                        <Skeleton variant="rectangular" height={height} sx={{ borderRadius: '12px' }} />
                        <Box className="skeleton-content">
                            <Skeleton variant="text" width="80%" height={24} />
                            <Skeleton variant="text" width="60%" height={20} />
                            <Skeleton variant="text" width="40%" height={16} />
                        </Box>
                    </Box>
                );
            case 'list':
                return (
                    <Box className={`skeleton-list ${className}`}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box className="skeleton-list-content">
                            <Skeleton variant="text" width="70%" height={20} />
                            <Skeleton variant="text" width="50%" height={16} />
                        </Box>
                    </Box>
                );
            case 'text':
                return (
                    <Box className={`skeleton-text ${className}`}>
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="80%" height={20} />
                        <Skeleton variant="text" width="90%" height={20} />
                    </Box>
                );
            default:
                return <Skeleton variant="rectangular" height={height} />;
        }
    };

    return (
        <Box className="loading-skeleton-container">
            {Array.from({ length: count }).map((_, index) => (
                <React.Fragment key={index}>
                    {renderSkeleton()}
                </React.Fragment>
            ))}
        </Box>
    );
};

export default LoadingSkeleton;
