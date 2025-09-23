import React from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    CircularProgress,
    Fade
} from '@mui/material';
import './VerificationLoader.scss';

const VerificationLoader = ({
    open = false,
    title = "Verification",
    message = "Please wait while we process your request...",
    subMessage = "This may take a few moments...",
    showProgress = true,
    progressSize = 60,
    progressThickness = 4,
    progressColor = "#e72b49",
    disableBackdropClick = true,
    disableEscapeKeyDown = true,
    maxWidth = "sm",
    fullWidth = true,
    onClose = null,
    ...props
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            disableEscapeKeyDown={disableEscapeKeyDown}
            disableBackdropClick={disableBackdropClick}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            PaperProps={{
                sx: {
                    borderRadius: "12px",
                    padding: "24px",
                    textAlign: "center",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "1px solid rgba(0,0,0,0.08)",
                }
            }}
            TransitionComponent={Fade}
            transitionDuration={300}
            {...props}
        >
            <DialogContent sx={{ padding: "0 !important" }}>
                <Box 
                    className="verification-loader"
                    sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        gap: 3,
                        padding: "8px 0"
                    }}
                >
                    {showProgress && (
                        <Box className="progress-container">
                            <CircularProgress 
                                size={progressSize} 
                                thickness={progressThickness}
                                sx={{ 
                                    color: progressColor,
                                    "& .MuiCircularProgress-circle": {
                                        strokeLinecap: "round",
                                    }
                                }} 
                            />
                        </Box>
                    )}
                    
                    <Box className="text-content">
                        <Typography 
                            variant="h6" 
                            className="verification-title"
                            sx={{ 
                                fontWeight: 600, 
                                color: "#333",
                                marginBottom: 1,
                                fontSize: "1.25rem"
                            }}
                        >
                            {title}
                        </Typography>
                        
                        <Typography 
                            variant="body1" 
                            className="verification-message"
                            sx={{ 
                                color: "#666",
                                textAlign: "center",
                                lineHeight: 1.6,
                                fontSize: "1rem",
                                marginBottom: 1
                            }}
                        >
                            {message}
                        </Typography>
                        
                        {subMessage && (
                            <Typography 
                                variant="body2" 
                                className="verification-sub-message"
                                sx={{ 
                                    color: "#999",
                                    fontSize: "0.875rem",
                                    marginTop: 1
                                }}
                            >
                                {subMessage}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default VerificationLoader;
