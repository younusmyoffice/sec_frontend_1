import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }

        // Log error to monitoring service in production
        if (process.env.NODE_ENV === 'production') {
            // You can integrate with error monitoring services like Sentry here
            console.error('Production error:', error, errorInfo);
        }

        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        padding: 2,
                        backgroundColor: '#f5f5f5'
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            textAlign: 'center',
                            maxWidth: 500,
                            width: '100%'
                        }}
                    >
                        <ErrorOutlineIcon
                            sx={{
                                fontSize: 64,
                                color: 'error.main',
                                marginBottom: 2
                            }}
                        />
                        <Typography variant="h4" gutterBottom color="error">
                            Oops! Something went wrong
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            We're sorry, but something unexpected happened. Please try refreshing the page.
                        </Typography>
                        
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <Box
                                sx={{
                                    backgroundColor: '#f5f5f5',
                                    padding: 2,
                                    marginTop: 2,
                                    borderRadius: 1,
                                    textAlign: 'left'
                                }}
                            >
                                <Typography variant="h6" color="error" gutterBottom>
                                    Error Details (Development Only):
                                </Typography>
                                <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem' }}>
                                    {this.state.error.toString()}
                                </Typography>
                                {this.state.errorInfo && (
                                    <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem', marginTop: 1 }}>
                                        {this.state.errorInfo.componentStack}
                                    </Typography>
                                )}
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<RefreshIcon />}
                            onClick={this.handleReload}
                            sx={{ marginTop: 2 }}
                        >
                            Refresh Page
                        </Button>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
