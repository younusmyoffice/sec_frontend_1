import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Box, Typography, Backdrop } from '@mui/material';
import './Loading.scss';

/**
 * Universal Loading Component
 * 
 * Supports multiple display modes:
 * - inline: Small spinner for inline use (buttons, lists)
 * - overlay: Full-page overlay with backdrop
 * - standalone: Centered spinner without backdrop
 * - minimal: Just the spinner, no wrapper
 * 
 * @example
 * // Inline loading in button
 * <Loading variant="inline" size="small" />
 * 
 * // Full-page overlay
 * <Loading variant="overlay" message="Loading data..." />
 * 
 * // Standalone spinner
 * <Loading variant="standalone" message="Processing..." />
 */
const Loading = ({
    variant = 'inline',
    size = 'medium',
    message = '',
    subMessage = '',
    fullScreen = false,
    color = 'primary',
    thickness = 4,
    disableBackdrop = false,
    zIndex = 1000,
    className = '',
    ...props
}) => {
    // Size mapping based on variant
    const sizeMap = {
        inline: {
            small: 20,
            medium: 24,
            large: 32
        },
        overlay: {
            small: 40,
            medium: 60,
            large: 80
        },
        standalone: {
            small: 40,
            medium: 60,
            large: 80
        },
        minimal: {
            small: 20,
            medium: 24,
            large: 32
        }
    };

    const spinnerSize = sizeMap[variant]?.[size] || 24;

    // For overlay variant (full-page with backdrop)
    if (variant === 'overlay' || fullScreen) {
        return (
            <Backdrop
                open={true}
                sx={{
                    zIndex,
                    color: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    ...props.sx
                }}
            >
                <Box className={`loading-container ${className}`} sx={{ textAlign: 'center' }}>
                    <CircularProgress 
                        size={spinnerSize} 
                        thickness={thickness}
                        sx={{ color }}
                    />
                    {message && (
                        <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                            {message}
                        </Typography>
                    )}
                    {subMessage && (
                        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                            {subMessage}
                        </Typography>
                    )}
                </Box>
            </Backdrop>
        );
    }

    // For standalone variant (centered without backdrop)
    if (variant === 'standalone') {
        return (
            <Box 
                className={`loading-container loading-standalone ${className}`}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '200px',
                    ...props.sx
                }}
            >
                <CircularProgress 
                    size={spinnerSize} 
                    thickness={thickness}
                    sx={{ color }}
                />
                {message && (
                    <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                        {message}
                    </Typography>
                )}
                {subMessage && (
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        {subMessage}
                    </Typography>
                )}
            </Box>
        );
    }

    // For inline variant (small spinner, typically for buttons)
    if (variant === 'inline') {
        return (
            <Box 
                className={`loading-container loading-inline ${className}`}
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    ...props.sx
                }}
            >
                <CircularProgress 
                    size={spinnerSize} 
                    thickness={thickness}
                    sx={{ color }}
                />
                {message && (
                    <Typography variant="body2">
                        {message}
                    </Typography>
                )}
            </Box>
        );
    }

    // For minimal variant (just the spinner)
    if (variant === 'minimal') {
        return (
            <CircularProgress 
                size={spinnerSize} 
                thickness={thickness}
                className={`loading-container loading-minimal ${className}`}
                sx={{ color, ...props.sx }}
            />
        );
    }

    return null;
};

Loading.propTypes = {
    variant: PropTypes.oneOf(['inline', 'overlay', 'standalone', 'minimal']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    message: PropTypes.string,
    subMessage: PropTypes.string,
    fullScreen: PropTypes.bool,
    color: PropTypes.string,
    thickness: PropTypes.number,
    disableBackdrop: PropTypes.bool,
    zIndex: PropTypes.number,
    className: PropTypes.string,
};

export default Loading;

