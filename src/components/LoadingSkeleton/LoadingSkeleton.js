import React from 'react';
import { Box, Skeleton } from '@mui/material';
import './LoadingSkeleton.scss';

const LoadingSkeleton = ({ 
    variant = 'card', 
    count = 1, 
    className = "",
    height = 200,
    animation = 'wave',
    speed = 1.5
}) => {
    const skeletonProps = {
        animation: animation,
        sx: {
            animationDuration: `${speed}s`,
            '&::after': {
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            }
        }
    };

    const renderSkeleton = () => {
        switch (variant) {
            case 'card':
                return (
                    <Box className={`skeleton-card ${className}`}>
                        <Skeleton 
                            variant="rectangular" 
                            height={height} 
                            sx={{ 
                                borderRadius: '16px',
                                marginBottom: '16px',
                                ...skeletonProps.sx
                            }}
                            animation={animation}
                        />
                        <Box className="skeleton-content">
                            <Skeleton 
                                variant="text" 
                                width="80%" 
                                height={28} 
                                sx={{ marginBottom: '8px', ...skeletonProps.sx }}
                                animation={animation}
                            />
                            <Skeleton 
                                variant="text" 
                                width="60%" 
                                height={20} 
                                sx={{ marginBottom: '6px', ...skeletonProps.sx }}
                                animation={animation}
                            />
                            <Skeleton 
                                variant="text" 
                                width="40%" 
                                height={16} 
                                sx={{ ...skeletonProps.sx }}
                                animation={animation}
                            />
                        </Box>
                    </Box>
                );
            case 'list':
                return (
                    <Box className={`skeleton-list ${className}`}>
                        <Skeleton 
                            variant="circular" 
                            width={48} 
                            height={48} 
                            sx={{ marginRight: '16px', ...skeletonProps.sx }}
                            animation={animation}
                        />
                        <Box className="skeleton-list-content">
                            <Skeleton 
                                variant="text" 
                                width="70%" 
                                height={22} 
                                sx={{ marginBottom: '6px', ...skeletonProps.sx }}
                                animation={animation}
                            />
                            <Skeleton 
                                variant="text" 
                                width="50%" 
                                height={18} 
                                sx={{ ...skeletonProps.sx }}
                                animation={animation}
                            />
                        </Box>
                    </Box>
                );
            case 'text':
                return (
                    <Box className={`skeleton-text ${className}`}>
                        <Skeleton 
                            variant="text" 
                            width="100%" 
                            height={24} 
                            sx={{ marginBottom: '8px', ...skeletonProps.sx }}
                            animation={animation}
                        />
                        <Skeleton 
                            variant="text" 
                            width="80%" 
                            height={24} 
                            sx={{ marginBottom: '8px', ...skeletonProps.sx }}
                            animation={animation}
                        />
                        <Skeleton 
                            variant="text" 
                            width="90%" 
                            height={24} 
                            sx={{ ...skeletonProps.sx }}
                            animation={animation}
                        />
                    </Box>
                );
            case 'table':
                return (
                    <Box className={`skeleton-table ${className}`}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Box key={index} className="skeleton-table-row">
                                <Skeleton 
                                    variant="rectangular" 
                                    width="100%" 
                                    height={56} 
                                    sx={{ 
                                        borderRadius: '8px',
                                        marginBottom: '8px',
                                        ...skeletonProps.sx
                                    }}
                                    animation={animation}
                                />
                            </Box>
                        ))}
                    </Box>
                );
            case 'profile':
                return (
                    <Box className={`skeleton-profile ${className}`}>
                        <Skeleton 
                            variant="circular" 
                            width={80} 
                            height={80} 
                            sx={{ marginBottom: '16px', ...skeletonProps.sx }}
                            animation={animation}
                        />
                        <Skeleton 
                            variant="text" 
                            width="60%" 
                            height={28} 
                            sx={{ marginBottom: '8px', ...skeletonProps.sx }}
                            animation={animation}
                        />
                        <Skeleton 
                            variant="text" 
                            width="40%" 
                            height={20} 
                            sx={{ marginBottom: '12px', ...skeletonProps.sx }}
                            animation={animation}
                        />
                        <Skeleton 
                            variant="rectangular" 
                            width="100%" 
                            height={120} 
                            sx={{ borderRadius: '12px', ...skeletonProps.sx }}
                            animation={animation}
                        />
                    </Box>
                );
            default:
                return (
                    <Skeleton 
                        variant="rectangular" 
                        height={height} 
                        sx={{ borderRadius: '12px', ...skeletonProps.sx }}
                        animation={animation}
                    />
                );
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