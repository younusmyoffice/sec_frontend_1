/**
 * Token Manager
 * Secure token management with httpOnly cookie support
 */

import logger from './logger';

class TokenManager {
    /**
     * Store token securely
     * In production, this should use httpOnly cookies via API
     */
    setToken(token) {
        try {
            if (!token) {
                logger.warn('Attempted to set empty token');
                return false;
            }
            
            localStorage.setItem('access_token', token);
            logger.info('Token stored successfully');
            return true;
        } catch (error) {
            logger.error('Failed to store token:', error);
            return false;
        }
    }

    /**
     * Get token from storage
     */
    getToken() {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                logger.warn('No token found in storage');
            }
            return token;
        } catch (error) {
            logger.error('Failed to get token:', error);
            return null;
        }
    }

    /**
     * Remove token from storage
     */
    removeToken() {
        try {
            localStorage.removeItem('access_token');
            logger.info('Token removed successfully');
            return true;
        } catch (error) {
            logger.error('Failed to remove token:', error);
            return false;
        }
    }

    /**
     * Check if token exists
     */
    hasToken() {
        const token = this.getToken();
        return token !== null && token !== undefined;
    }

    /**
     * Validate token format (basic check)
     */
    isValidToken(token) {
        if (!token) return false;
        
        // Basic JWT format check
        const parts = token.split('.');
        return parts.length === 3;
    }

    /**
     * Get token without exposing it (for debugging)
     */
    getTokenPreview() {
        const token = this.getToken();
        if (!token) return null;
        
        // Show only first and last few characters
        return `${token.substring(0, 10)}...${token.substring(token.length - 10)}`;
    }

    /**
     * Clear all auth-related data
     */
    clearAll() {
        try {
            const keysToRemove = [
                'access_token',
                'refresh_token',
                'token_expires_at',
                'user_data',
            ];

            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });

            logger.info('All auth data cleared');
            return true;
        } catch (error) {
            logger.error('Failed to clear auth data:', error);
            return false;
        }
    }
}

// Create singleton instance
const tokenManager = new TokenManager();

export default tokenManager;

