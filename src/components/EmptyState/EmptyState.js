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
    className = ""
}) => {
    return (
        <Box className={`empty-state ${className}`}>
            <Box className="empty-state-content">
                <Box className="empty-state-icon">
                    <Icon sx={{ fontSize: 64, color: '#ccc' }} />
                </Box>
                <Typography variant="h6" className="empty-state-title">
                    {title}
                </Typography>
                <Typography variant="body2" className="empty-state-description">
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
