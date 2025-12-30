import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

/**
 * Decodes a JWT token and extracts user information
 * @param {string} token - The JWT token to decode
 * @returns {Object} - Decoded token payload with user information
 */
export const decodeJWT = (token) => {
    try {
        if (!token) {
            throw new Error('No token provided');
        }
        
        const decoded = jwtDecode(token);
        console.log('Decoded JWT payload:', decoded);
        
        return {
            userId: decoded.user_id,
            roleId: decoded.role_id || null,
            email: decoded.email || null,
            iat: decoded.iat, // Issued at
            exp: decoded.exp, // Expiration time
            isExpired: decoded.exp ? Date.now() >= decoded.exp * 1000 : false,
            raw: decoded // Raw payload for debugging
        };
    } catch (error) {
        console.error('Error decoding JWT:', error);
        throw new Error('Invalid token format');
    }
};

/**
 * Gets user information from stored token
 * @returns {Object|null} - User information or null if no valid token
 */
export const getCurrentUser = () => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.log('No access token found in localStorage');
            return null;
        }
        
        const userInfo = decodeJWT(token);
        
        if (userInfo.isExpired) {
            console.warn('Token has expired');
            // Clear expired token
            localStorage.removeItem('access_token');
            localStorage.removeItem('patient_Email');
            localStorage.removeItem('patient_suid');
            localStorage.removeItem('profile');
            return null;
        }
        
        return userInfo;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

/**
 * Checks if the current token is valid and not expired
 * @returns {boolean} - True if token is valid, false otherwise
 */
export const isTokenValid = () => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return false;
        }
        
        const userInfo = decodeJWT(token);
        return !userInfo.isExpired;
    } catch (error) {
        console.error('Error checking token validity:', error);
        return false;
    }
};

/**
 * Checks if token is close to expiration (within 5 minutes)
 * @returns {boolean} - True if token needs refresh, false otherwise
 */
export const needsTokenRefresh = () => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return false;
        }
        
        const userInfo = decodeJWT(token);
        if (userInfo.isExpired) {
            return true;
        }
        
        // Check if token expires within 5 minutes (300 seconds)
        const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000);
        const tokenExpiry = userInfo.exp * 1000;
        
        return tokenExpiry <= fiveMinutesFromNow;
    } catch (error) {
        console.error('Error checking token refresh need:', error);
        // Be lenient on decode errors here; let 401 flow handle it
        return false;
    }
};

/**
 * Refreshes the JWT token by calling the refresh endpoint
 * @returns {Promise<boolean>} - True if refresh successful, false otherwise
 */
import axiosInstance from '../config/axiosInstance';

export const refreshToken = async () => {
    try {
        // FIXED: Check if token is actually expired before attempting refresh
        const currentToken = localStorage.getItem('access_token');
        if (!currentToken) {
            console.warn('No access token available for refresh');
            return false;
        }

        // Decode current token to check expiry
        const userInfo = decodeJWT(currentToken);
        if (userInfo.isExpired) {
            console.log('Token is expired, attempting refresh...');
        }

        // Fallback: if no refresh_token, use access_token for minimal refresh flow
        const bearer = localStorage.getItem('refresh_token') || currentToken;
        
        // Use axios directly to avoid the interceptor loop
        const response = await axios.post(
            'http://localhost:3000/sec/auth/refresh',
            null,
            {
                headers: {
                    'Authorization': `Bearer ${bearer}`
                }
            }
        );

        const data = response?.data;
        if (data?.access_token) {
            localStorage.setItem('access_token', data.access_token);
            // If backend ever returns a refresh_token, store it
            if (data.refresh_token) {
                localStorage.setItem('refresh_token', data.refresh_token);
            }
            console.log('Token refreshed successfully');
            return true;
        }

        console.error('Token refresh failed: no access_token in response');
        return false;
    } catch (error) {
        console.error('Error refreshing token:', error?.response?.data || error.message);
        return false;
    }
};

/**
 * Clears all authentication data from localStorage
 */
export const clearAuthData = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('patient_Email');
    localStorage.removeItem('patient_suid');
    localStorage.removeItem('profile');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role_id');
    localStorage.removeItem('jwt_email');
    console.log('Authentication data cleared');
};

/**
 * Gets user ID from the current token
 * @returns {number|null} - User ID or null if not available
 */
export const getCurrentUserId = () => {
    const userInfo = getCurrentUser();
    return userInfo ? userInfo.userId : null;
};

/**
 * Gets role ID from the current token
 * @returns {number|null} - Role ID or null if not available
 */
export const getCurrentRoleId = () => {
    const userInfo = getCurrentUser();
    return userInfo ? userInfo.roleId : null;
};

/**
 * Gets email from the current token
 * @returns {string|null} - Email or null if not available
 */
export const getCurrentUserEmail = () => {
    const userInfo = getCurrentUser();
    return userInfo ? userInfo.email : null;
};
