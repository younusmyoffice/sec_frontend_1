/**
 * Centralized API Endpoints Configuration
 * 
 * This file contains all API endpoints used throughout the application.
 * Benefits:
 * - Single source of truth for all API endpoints
 * - Easy to maintain and update
 * - Consistent naming and organization
 * - Environment-specific configurations
 */

import { baseURL } from '../constants/const';

// API Base Configuration
const API_BASE = baseURL;

// API Endpoints Object
export const API_ENDPOINTS = {
  // Authentication & User Management
  AUTH: {
    LOGIN: `${API_BASE}/sec/auth/login`,
    REGISTER: `${API_BASE}/sec/auth/register`,
    LOGOUT: `${API_BASE}/sec/auth/logout`,
    CHECK_FORCE_LOGOUT: `${API_BASE}/sec/auth/checkForceLogout`,
    REFRESH_TOKEN: `${API_BASE}/sec/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE}/sec/auth/forgotPassword`,
    RESET_PASSWORD: `${API_BASE}/sec/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE}/sec/auth/verifyEmail`,
    UPDATE_PROFILE: `${API_BASE}/sec/auth/updateProfile`,
  },

  // User Profile & Management
  USER: {
    PROFILE: `${API_BASE}/user/profile`,
    UPDATE_PROFILE: `${API_BASE}/user/profile/update`,
    CHANGE_PASSWORD: `${API_BASE}/user/change-password`,
    UPLOAD_AVATAR: `${API_BASE}/user/upload-avatar`,
  },

  // Country & Location Data
  COUNTRIES: {
    LIST: `${API_BASE}/sec/countries/codes`,
    STATES: `${API_BASE}/sec/countries/states`,
    CITIES: `${API_BASE}/sec/countries/cities`,
    TIMEZONES: `${API_BASE}/sec/countries/timezones`,
  },

  // Healthcare Facilities
  HCF: {
    LIST: `${API_BASE}/hcf/list`,
    DETAILS: `${API_BASE}/hcf/details`,
    SEARCH: `${API_BASE}/hcf/search`,
    NEARBY: `${API_BASE}/hcf/nearby`,
  },

  // Doctors & Medical Professionals
  DOCTORS: {
    LIST: `${API_BASE}/doctors/list`,
    DETAILS: `${API_BASE}/doctors/details`,
    SEARCH: `${API_BASE}/doctors/search`,
    SPECIALIZATIONS: `${API_BASE}/doctors/specializations`,
    AVAILABILITY: `${API_BASE}/doctors/availability`,
  },

  // Appointments
  APPOINTMENTS: {
    CREATE: `${API_BASE}/appointments/create`,
    LIST: `${API_BASE}/appointments/list`,
    DETAILS: `${API_BASE}/appointments/details`,
    UPDATE: `${API_BASE}/appointments/update`,
    CANCEL: `${API_BASE}/appointments/cancel`,
    RESCHEDULE: `${API_BASE}/appointments/reschedule`,
  },

  // Medical Records
  MEDICAL_RECORDS: {
    LIST: `${API_BASE}/medical-records/list`,
    UPLOAD: `${API_BASE}/medical-records/upload`,
    DOWNLOAD: `${API_BASE}/medical-records/download`,
    DELETE: `${API_BASE}/medical-records/delete`,
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: `${API_BASE}/notifications/list`,
    MARK_READ: `${API_BASE}/notifications/mark-read`,
    DELETE: `${API_BASE}/notifications/delete`,
    PREFERENCES: `${API_BASE}/notifications/preferences`,
  },

  // Payments
  PAYMENTS: {
    CREATE: `${API_BASE}/payments/create`,
    LIST: `${API_BASE}/payments/list`,
    DETAILS: `${API_BASE}/payments/details`,
    REFUND: `${API_BASE}/payments/refund`,
  },

  // Admin & Super Admin
  ADMIN: {
    DASHBOARD: `${API_BASE}/admin/dashboard`,
    USERS: `${API_BASE}/admin/users`,
    REPORTS: `${API_BASE}/admin/reports`,
    SETTINGS: `${API_BASE}/admin/settings`,
  },

  // File Upload & Management
  FILES: {
    UPLOAD: `${API_BASE}/files/upload`,
    DELETE: `${API_BASE}/files/delete`,
    DOWNLOAD: `${API_BASE}/files/download`,
  },

  // Chat & Communication
  CHAT: {
    ROOMS: `${API_BASE}/chat/rooms`,
    MESSAGES: `${API_BASE}/chat/messages`,
    SEND: `${API_BASE}/chat/send`,
    UPLOAD_FILE: `${API_BASE}/chat/upload-file`,
  },

  // Analytics & Reports
  ANALYTICS: {
    DASHBOARD: `${API_BASE}/analytics/dashboard`,
    REPORTS: `${API_BASE}/analytics/reports`,
    EXPORT: `${API_BASE}/analytics/export`,
  },
};

// Helper function to get endpoint by category and key
export const getEndpoint = (category, key) => {
  if (!API_ENDPOINTS[category]) {
    throw new Error(`API category '${category}' not found`);
  }
  if (!API_ENDPOINTS[category][key]) {
    throw new Error(`API endpoint '${key}' not found in category '${category}'`);
  }
  return API_ENDPOINTS[category][key];
};

// Helper function to get country-related endpoints
export const getCountryEndpoints = () => API_ENDPOINTS.COUNTRIES;

// Helper function to get auth-related endpoints
export const getAuthEndpoints = () => API_ENDPOINTS.AUTH;

// Helper function to get user-related endpoints
export const getUserEndpoints = () => API_ENDPOINTS.USER;

// Default export for easy importing
export default API_ENDPOINTS;