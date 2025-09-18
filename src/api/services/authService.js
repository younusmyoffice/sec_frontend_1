/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls including login, logout, and token management
 */

import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../endpoints';
import { getCurrentUser, getCurrentUserId, getCurrentUserEmail, clearAuthData } from '../../utils/jwtUtils';

/**
 * Logout user from the system
 * @param {Object} options - Logout options
 * @param {boolean} options.clearLocalData - Whether to clear local storage data (default: true)
 * @param {boolean} options.callServer - Whether to call server logout endpoint (default: true)
 * @returns {Promise<Object>} - Logout response
 */
export const logoutUser = async (options = {}) => {
    const { clearLocalData = true, callServer = true } = options;
    
    try {
        let serverResponse = null;
        
        // Call server logout endpoint if requested
        if (callServer) {
            try {
                const userInfo = getCurrentUser();
                const logoutData = {
                    email: getCurrentUserEmail(),
                    suid: getCurrentUserId(),
                    access_token: localStorage.getItem('access_token')
                };
                
                console.log('Calling server logout with data:', logoutData);
                
                serverResponse = await axiosInstance.post(
                    API_ENDPOINTS.AUTH.LOGOUT,
                    JSON.stringify(logoutData),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    }
                );
                
                console.log('Server logout response:', serverResponse.data);
            } catch (serverError) {
                console.warn('Server logout failed, but continuing with local logout:', serverError);
                // Continue with local logout even if server call fails
            }
        }
        
        // Clear local authentication data if requested
        if (clearLocalData) {
            clearAuthData();
            console.log('Local authentication data cleared');
        }
        
        return {
            success: true,
            message: 'Logout successful',
            serverResponse: serverResponse?.data || null,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Logout error:', error);
        
        // Even if logout fails, clear local data for security
        if (clearLocalData) {
            clearAuthData();
        }
        
        return {
            success: false,
            message: error?.response?.data?.error || 'Logout failed',
            error: error,
            timestamp: new Date().toISOString()
        };
    }
};

/**
 * Force logout - clears all data without server call
 * @returns {Object} - Logout response
 */
export const forceLogout = async () => {
    try {
        clearAuthData();
        console.log('Force logout completed - all local data cleared');
        
        return {
            success: true,
            message: 'Force logout successful',
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Force logout error:', error);
        return {
            success: false,
            message: 'Force logout failed',
            error: error,
            timestamp: new Date().toISOString()
        };
    }
};

/**
 * Check if user is currently logged in
 * @returns {boolean} - True if user is logged in, false otherwise
 */
export const isUserLoggedIn = () => {
    try {
        const userInfo = getCurrentUser();
        return userInfo !== null && !userInfo.isExpired;
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
};

/**
 * Check if user was force logged out from server
 * @returns {Promise<Object>} - Force logout status
 */
export const checkForceLogout = async () => {
    try {
        const userInfo = getCurrentUser();
        const checkData = {
            email: getCurrentUserEmail(),
            suid: getCurrentUserId(),
            access_token: localStorage.getItem('access_token')
        };
        
        console.log('Checking force logout with data:', checkData);
        
        const response = await axiosInstance.post(
            API_ENDPOINTS.AUTH.CHECK_FORCE_LOGOUT,
            JSON.stringify(checkData),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );
        
        console.log('Force logout check response:', response.data);
        return {
            success: true,
            data: response.data.response,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Error checking force logout:', error);
        return {
            success: false,
            message: error?.response?.data?.error || 'Force logout check failed',
            error: error,
            timestamp: new Date().toISOString()
        };
    }
};

/**
 * Get current user information
 * @returns {Object|null} - User information or null if not logged in
 */
export const getCurrentUserInfo = () => {
    try {
        return getCurrentUser();
    } catch (error) {
        console.error('Error getting current user info:', error);
        return null;
    }
};

// Default export
export default {
    logoutUser,
    forceLogout,
    isUserLoggedIn,
    getCurrentUserInfo,
    checkForceLogout
};
