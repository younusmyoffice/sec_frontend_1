import { jwtDecode } from 'jwt-decode';

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
        const userInfo = getCurrentUser();
        return userInfo !== null && !userInfo.isExpired;
    } catch (error) {
        console.error('Error checking token validity:', error);
        return false;
    }
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

/**
 * Clears all authentication data from localStorage and cookies
 */
export const clearAuthData = () => {
    // Clear all possible auth-related localStorage items
    const authKeys = [
        'access_token',
        'patient_Email',
        'patient_suid',
        'profile',
        'hcfadmin_Email',
        'hcfadmin_suid',
        'diagnostic_Email',
        'diagnostic_suid',
        'doctor_Email',
        'doctor_suid',
        'superadmin_Email',
        'superadmin_suid',
        'user_id',
        'role_id',
        'jwt_email',
        'token',
        'patient_uid',
        'diagnostic_suid',
        'diagnostic_Email',
        'clinic_Email',
        'clinic_suid'
    ];
    
    authKeys.forEach(key => {
        localStorage.removeItem(key);
    });
    
    // Clear cookies
    try {
        // Clear all cookies by setting them to expire in the past
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            if (name) {
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
            }
        });
    } catch (error) {
        console.warn('Error clearing cookies:', error);
    }
    
    console.log('All authentication data cleared from localStorage and cookies');
};
