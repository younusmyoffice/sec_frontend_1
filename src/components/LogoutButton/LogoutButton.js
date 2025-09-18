import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import CustomButton from '../CustomButton';
import CustomSnackBar from '../CustomSnackBar';

/**
 * LogoutButton Component
 * 
 * A reusable logout button component that demonstrates the logout functionality
 * Can be used throughout the application for consistent logout behavior
 */
const LogoutButton = ({ 
    buttonText = "Logout", 
    buttonCss = {}, 
    showConfirmation = true,
    onLogoutSuccess = null,
    onLogoutError = null,
    ...props 
}) => {
    const { logout, forceLogoutUser, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [snackType, setSnackType] = useState('success');

    const handleLogout = async () => {
        if (showConfirmation) {
            const confirmed = window.confirm('Are you sure you want to logout?');
            if (!confirmed) return;
        }

        setLoading(true);
        
        try {
            const result = await logout({
                clearLocalData: true,
                callServer: true
            });

            if (result.success) {
                setSnackMessage('Logout successful!');
                setSnackType('success');
                setShowSnack(true);
                
                if (onLogoutSuccess) {
                    onLogoutSuccess(result);
                }
            } else {
                setSnackMessage(result.message || 'Logout failed');
                setSnackType('error');
                setShowSnack(true);
                
                if (onLogoutError) {
                    onLogoutError(result);
                }
            }
        } catch (error) {
            console.error('Logout error:', error);
            setSnackMessage('Logout failed. Please try again.');
            setSnackType('error');
            setShowSnack(true);
            
            if (onLogoutError) {
                onLogoutError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleForceLogout = async () => {
        setLoading(true);
        
        try {
            const result = await forceLogoutUser();
            
            if (result.success) {
                setSnackMessage('Force logout successful!');
                setSnackType('success');
                setShowSnack(true);
            } else {
                setSnackMessage('Force logout failed');
                setSnackType('error');
                setShowSnack(true);
            }
        } catch (error) {
            console.error('Force logout error:', error);
            setSnackMessage('Force logout failed');
            setSnackType('error');
            setShowSnack(true);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return null; // Don't show logout button if user is not authenticated
    }

    return (
        <>
            <CustomSnackBar
                isOpen={showSnack}
                message={snackMessage}
                type={snackType}
                onClose={() => setShowSnack(false)}
            />
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CustomButton
                    label={loading ? "Logging out..." : buttonText}
                    handleClick={handleLogout}
                    isDisabled={loading}
                    buttonCss={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        ...buttonCss
                    }}
                    {...props}
                />
                
                {/* Force logout button for debugging/admin purposes */}
                {process.env.NODE_ENV === 'development' && (
                    <CustomButton
                        label="Force Logout"
                        handleClick={handleForceLogout}
                        isDisabled={loading}
                        buttonCss={{
                            backgroundColor: '#ff9800',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '12px'
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default LogoutButton;
