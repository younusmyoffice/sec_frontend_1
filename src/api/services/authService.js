/**
 * Authentication Service - API calls for authentication-related operations
 */

import axios from 'axios';
import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../endpoints';
import { baseURL } from '../../constants/const';

export class AuthService {
  // Login
  static async login(loginData) {
    const response = await axios.post(
      API_ENDPOINTS.AUTH.LOGIN,
      JSON.stringify(loginData),
      { Accept: "Application/json" }
    );
    return response.data;
  }

  // Register
  static async register(data) {
    const response = await axios.post(
      API_ENDPOINTS.AUTH.REGISTER,
      JSON.stringify(data)
    );
    return response.data;
  }

  // OTP Verification
  static async verifyOtp(mobile, otp) {
    const response = await axios.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
      mobile,
      otp_code: otp,
    });
    return response.data;
  }

  // Resend Code
  static async resendCode(data) {
    const response = await axios.post(API_ENDPOINTS.AUTH.RESEND_CODE, data);
    return response.data;
  }

  // Email Verification
  static async verifyEmail(payload) {
    const response = await axios.post(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      JSON.stringify(payload),
      { Accept: "Application/json" }
    );
    return response.data;
  }

  // Forgot Password
  static async forgotPassword(email) {
    const response = await axios.post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      JSON.stringify({ email })
    );
    return response.data;
  }

  // Change Password
  static async changePassword(data) {
    const response = await axios.post(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      JSON.stringify(data)
    );
    return response.data;
  }

  // Update Profile
  static async updateProfile(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.UPDATE_PROFILE,
      JSON.stringify(data)
    );
    return response.data;
  }

  // Logout
  static async logout() {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  }

  // Check Force Logout
  static async checkForceLogout() {
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.CHECK_FORCE_LOGOUT);
    return response.data;
  }

  // Refresh Token
  static async refreshToken() {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
    return response.data;
  }

  // Reset Password
  static async resetPassword(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      JSON.stringify(data)
    );
    return response.data;
  }
}

// Individual function exports for backward compatibility
export const loginUser = AuthService.login;
export const registerUser = AuthService.register;
export const logoutUser = AuthService.logout;
export const forceLogout = AuthService.logout;
export const isUserLoggedIn = () => {
  // Check if user is logged in based on localStorage/sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return !!token;
};
export const checkForceLogout = AuthService.checkForceLogout;

export default AuthService;