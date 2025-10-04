/**
 * Centralized JWT Token Management Service
 * 
 * This service provides a single source of truth for all JWT token operations
 * including storage, retrieval, validation, and refresh.
 */

import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../config/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import { STORAGE_KEYS } from '../constants/routes';

class JWTService {
  constructor() {
    this.ACCESS_TOKEN_KEY = STORAGE_KEYS.AUTH_TOKEN;
    this.REFRESH_TOKEN_KEY = STORAGE_KEYS.REFRESH_TOKEN;
  }

  /**
   * Store authentication tokens
   * @param {string} accessToken - The access token
   * @param {string} refreshToken - The refresh token (optional)
   */
  setTokens(accessToken, refreshToken = null) {
    try {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      }
      console.log('Tokens stored successfully');
    } catch (error) {
      console.error('Error storing tokens:', error);
      throw error;
    }
  }

  /**
   * Get the current access token
   * @returns {string|null} - The access token or null if not found
   */
  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Get the current refresh token
   * @returns {string|null} - The refresh token or null if not found
   */
  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if user has valid token
   */
  isAuthenticated() {
    const token = this.getAccessToken();
    if (!token) return false;
    
    try {
      const decoded = this.decodeToken(token);
      return !decoded.isExpired;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Decode JWT token and extract information
   * @param {string} token - The JWT token to decode
   * @returns {Object} - Decoded token information
   */
  decodeToken(token) {
    try {
      if (!token) {
        throw new Error('No token provided');
      }
      
      const decoded = jwtDecode(token);
      
      return {
        userId: decoded.user_id,
        roleId: decoded.role_id || null,
        email: decoded.email || null,
        iat: decoded.iat,
        exp: decoded.exp,
        isExpired: decoded.exp ? Date.now() >= decoded.exp * 1000 : false,
        raw: decoded
      };
    } catch (error) {
      console.error('Error decoding JWT:', error);
      throw new Error('Invalid token format');
    }
  }

  /**
   * Get current user information from token
   * @returns {Object|null} - User information or null if not authenticated
   */
  getCurrentUser() {
    try {
      const token = this.getAccessToken();
      if (!token) {
        return null;
      }
      
      const userInfo = this.decodeToken(token);
      
      if (userInfo.isExpired) {
        console.warn('Token has expired');
        this.clearTokens();
        return null;
      }
      
      return userInfo;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get current user ID
   * @returns {number|null} - User ID or null if not authenticated
   */
  getCurrentUserId() {
    const userInfo = this.getCurrentUser();
    return userInfo ? userInfo.userId : null;
  }

  /**
   * Get current user role ID
   * @returns {number|null} - Role ID or null if not authenticated
   */
  getCurrentRoleId() {
    const userInfo = this.getCurrentUser();
    return userInfo ? userInfo.roleId : null;
  }

  /**
   * Get current user email
   * @returns {string|null} - Email or null if not authenticated
   */
  getCurrentUserEmail() {
    const userInfo = this.getCurrentUser();
    return userInfo ? userInfo.email : null;
  }

  /**
   * Check if token needs refresh (within 5 minutes of expiry)
   * @returns {boolean} - True if token needs refresh
   */
  needsRefresh() {
    try {
      const token = this.getAccessToken();
      if (!token) {
        return false;
      }
      
      const userInfo = this.decodeToken(token);
      if (userInfo.isExpired) {
        return true;
      }
      
      // Check if token expires within 5 minutes
      const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000);
      const tokenExpiry = userInfo.exp * 1000;
      
      return tokenExpiry <= fiveMinutesFromNow;
    } catch (error) {
      console.error('Error checking token refresh need:', error);
      return false;
    }
  }

  /**
   * Refresh the access token
   * @returns {Promise<boolean>} - True if refresh successful
   */
  async refreshAccessToken() {
    try {
      const refreshToken = this.getRefreshToken();
      const accessToken = this.getAccessToken();
      
      // Use refresh token if available, otherwise use access token
      const tokenToUse = refreshToken || accessToken;
      
      if (!tokenToUse) {
        console.warn('No token available for refresh');
        return false;
      }

      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        null,
        {
          headers: {
            'Authorization': `Bearer ${tokenToUse}`
          }
        }
      );

      const data = response?.data;
      if (data?.access_token) {
        this.setTokens(data.access_token, data.refresh_token);
        console.log('Token refreshed successfully');
        return true;
      }

      console.error('Token refresh failed: no access_token in response');
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  }

  /**
   * Clear all authentication data
   */
  clearTokens() {
    try {
      // Clear tokens
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      
      // Clear other auth-related data
      localStorage.removeItem('patient_Email');
      localStorage.removeItem('patient_suid');
      localStorage.removeItem('profile');
      localStorage.removeItem('user_id');
      localStorage.removeItem('role_id');
      localStorage.removeItem('jwt_email');
      localStorage.removeItem('doctor_suid');
      localStorage.removeItem('hcfadmin_suid');
      
      console.log('All authentication data cleared');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  /**
   * Logout user and clear all data
   */
  async logout() {
    try {
      // Call logout API if authenticated
      if (this.isAuthenticated()) {
        await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
      }
    } catch (error) {
      console.error('Error calling logout API:', error);
      // Continue with local logout even if API call fails
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Get authorization header for API requests
   * @returns {Object} - Authorization header object
   */
  getAuthHeader() {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Check if user has specific role
   * @param {number} roleId - Role ID to check
   * @returns {boolean} - True if user has the role
   */
  hasRole(roleId) {
    const currentRoleId = this.getCurrentRoleId();
    return currentRoleId === roleId;
  }

  /**
   * Check if user is patient
   * @returns {boolean} - True if user is patient
   */
  isPatient() {
    // Assuming role ID 1 is for patients - adjust based on your system
    return this.hasRole(1);
  }

  /**
   * Check if user is doctor
   * @returns {boolean} - True if user is doctor
   */
  isDoctor() {
    // Assuming role ID 2 is for doctors - adjust based on your system
    return this.hasRole(2);
  }

  /**
   * Check if user is HCF admin
   * @returns {boolean} - True if user is HCF admin
   */
  isHCFAdmin() {
    // Assuming role ID 3 is for HCF admins - adjust based on your system
    return this.hasRole(3);
  }
}

// Create and export singleton instance
const jwtService = new JWTService();
export default jwtService;

// Export individual functions for backward compatibility
export const {
  setTokens,
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  decodeToken,
  getCurrentUser,
  getCurrentUserId,
  getCurrentRoleId,
  getCurrentUserEmail,
  needsRefresh,
  refreshAccessToken,
  clearTokens,
  logout,
  getAuthHeader,
  hasRole,
  isPatient,
  isDoctor,
  isHCFAdmin
} = jwtService;
