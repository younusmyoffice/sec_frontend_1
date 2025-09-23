import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { 
    getCurrentUser, 
    isTokenValid, 
    needsTokenRefresh, 
    refreshToken, 
    clearAuthData 
} from '../../utils/jwtUtils';
import axiosInstance from '../../config/axiosInstance';

const JWTTest = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [testResult, setTestResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkTokenStatus();
    }, []);

    const checkTokenStatus = () => {
        const user = getCurrentUser();
        setUserInfo(user);
    };

    const testProtectedAPI = async () => {
        setLoading(true);
        setTestResult(null);
        
        try {
            const response = await axiosInstance.get('/sec/getAppointment');
            setTestResult({
                success: true,
                message: 'Protected API call successful!',
                data: response.data
            });
        } catch (error) {
            setTestResult({
                success: false,
                message: `API call failed: ${error.message}`,
                error: error.response?.data || error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshToken = async () => {
        setLoading(true);
        try {
            const success = await refreshToken();
            setTestResult({
                success: success,
                message: success ? 'Token refreshed successfully!' : 'Token refresh failed!'
            });
            checkTokenStatus();
        } catch (error) {
            setTestResult({
                success: false,
                message: `Refresh failed: ${error.message}`
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClearAuth = () => {
        clearAuthData();
        setUserInfo(null);
        setTestResult({
            success: true,
            message: 'Authentication data cleared!'
        });
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                JWT Authentication Test
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Current Token Status
                </Typography>
                {userInfo ? (
                    <Box>
                        <Typography>✅ Token Found</Typography>
                        <Typography>User ID: {userInfo.userId}</Typography>
                        <Typography>Role ID: {userInfo.roleId}</Typography>
                        <Typography>Email: {userInfo.email}</Typography>
                        <Typography>Valid: {isTokenValid() ? '✅ Yes' : '❌ No'}</Typography>
                        <Typography>Needs Refresh: {needsTokenRefresh() ? '⚠️ Yes' : '✅ No'}</Typography>
                        <Typography>Expires: {userInfo.exp ? new Date(userInfo.exp * 1000).toLocaleString() : 'Unknown'}</Typography>
                    </Box>
                ) : (
                    <Typography color="error">❌ No token found</Typography>
                )}
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button 
                    variant="contained" 
                    onClick={testProtectedAPI}
                    disabled={loading}
                >
                    Test Protected API
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={handleRefreshToken}
                    disabled={loading}
                >
                    Refresh Token
                </Button>
                <Button 
                    variant="outlined" 
                    color="error"
                    onClick={handleClearAuth}
                >
                    Clear Auth Data
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={checkTokenStatus}
                >
                    Refresh Status
                </Button>
            </Box>

            {testResult && (
                <Alert 
                    severity={testResult.success ? 'success' : 'error'}
                    sx={{ mb: 2 }}
                >
                    <Typography variant="body1">{testResult.message}</Typography>
                    {testResult.data && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Response: {JSON.stringify(testResult.data, null, 2)}
                        </Typography>
                    )}
                    {testResult.error && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Error: {JSON.stringify(testResult.error, null, 2)}
                        </Typography>
                    )}
                </Alert>
            )}

            {loading && (
                <Typography>Loading...</Typography>
            )}
        </Box>
    );
};

export default JWTTest;
