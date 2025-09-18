import { useState, useEffect } from 'react';
import { getCurrentUser, isTokenValid, clearAuthData } from '../utils/jwtUtils';
import { logoutUser, forceLogout, isUserLoggedIn, checkForceLogout } from '../api/services/authService';

/**
 * Custom hook for authentication state management
 * @returns {Object} - Authentication state and methods
 */
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const userInfo = getCurrentUser();
                const isValid = isTokenValid();
                
                if (userInfo && isValid) {
                    setUser(userInfo);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                    // Clear invalid auth data
                    if (!isValid) {
                        clearAuthData();
                    }
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setUser(null);
                setIsAuthenticated(false);
                clearAuthData();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async (options = {}) => {
        try {
            const result = await logoutUser(options);
            
            if (result.success) {
                setUser(null);
                setIsAuthenticated(false);
                console.log('Logout successful:', result.message);
            } else {
                console.error('Logout failed:', result.message);
                // Even if server logout fails, clear local data
                setUser(null);
                setIsAuthenticated(false);
            }
            
            return result;
        } catch (error) {
            console.error('Logout error:', error);
            // Fallback to local logout
            clearAuthData();
            setUser(null);
            setIsAuthenticated(false);
            return {
                success: false,
                message: 'Logout failed',
                error: error
            };
        }
    };

    const refreshUser = () => {
        const userInfo = getCurrentUser();
        const isValid = isTokenValid();
        
        if (userInfo && isValid) {
            setUser(userInfo);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const forceLogoutUser = async () => {
        try {
            const result = await forceLogout();
            setUser(null);
            setIsAuthenticated(false);
            return result;
        } catch (error) {
            console.error('Force logout error:', error);
            setUser(null);
            setIsAuthenticated(false);
            return {
                success: false,
                message: 'Force logout failed',
                error: error
            };
        }
    };

    const checkLoginStatus = () => {
        return isUserLoggedIn();
    };

    const checkForceLogoutStatus = async () => {
        try {
            const result = await checkForceLogout();
            
            if (result.success && result.data.is_logged_out) {
                console.log('User was force logged out from server');
                // Clear local data and update state
                clearAuthData();
                setUser(null);
                setIsAuthenticated(false);
                
                return {
                    success: true,
                    forceLoggedOut: true,
                    message: 'User was force logged out from server',
                    data: result.data
                };
            } else if (result.success) {
                return {
                    success: true,
                    forceLoggedOut: false,
                    message: 'User is still logged in',
                    data: result.data
                };
            } else {
                return {
                    success: false,
                    forceLoggedOut: false,
                    message: result.message || 'Failed to check force logout status',
                    error: result.error
                };
            }
        } catch (error) {
            console.error('Error checking force logout status:', error);
            return {
                success: false,
                forceLoggedOut: false,
                message: 'Error checking force logout status',
                error: error
            };
        }
    };

    return {
        user,
        isAuthenticated,
        loading,
        logout,
        forceLogoutUser,
        refreshUser,
        checkLoginStatus,
        checkForceLogoutStatus,
        // Convenience getters
        userId: user?.userId || null,
        roleId: user?.roleId || null,
        email: user?.email || null,
        isTokenExpired: user?.isExpired || false,
    };
};
