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
    VERIFY_OTP: `${API_BASE}/sec/auth/verifyOtp`,
    RESEND_CODE: `${API_BASE}/sec/auth/resendCode`,
    VERIFY_EMAIL: `${API_BASE}/sec/auth/verifyEmail`,
    FORGOT_PASSWORD: `${API_BASE}/sec/auth/forgotPassword`,
    CHANGE_PASSWORD: `${API_BASE}/sec/auth/changePassword`,
    UPDATE_PROFILE: `${API_BASE}/sec/auth/updateProfile`,
    LOGOUT: `${API_BASE}/sec/auth/logout`,
    CHECK_FORCE_LOGOUT: `${API_BASE}/sec/auth/checkForceLogout`,
    REFRESH_TOKEN: `${API_BASE}/sec/auth/refresh`,
    RESET_PASSWORD: `${API_BASE}/sec/auth/reset-password`,
  },

  // Patient Module Endpoints
  PATIENT: {
    // Dashboard & Explore
    DASHBOARD_DOCTOR_DETAIL: `${API_BASE}/sec/patient/DashboardDoctordetail`,
    DOCTOR_NEAR_ME: `${API_BASE}/sec/patient/doctornearme`,
    POPULAR_DOCTORS: `${API_BASE}/sec/patient/doctor/populardoctors`,
    FEATURED_DOCTORS: `${API_BASE}/sec/patient/doctor/featureddoctors`,
    DASHBOARD_HCF_DETAILS: `${API_BASE}/sec/patient/DashboardHcfdetails`,
    DOCTOR_DEPARTMENTS: `${API_BASE}/sec/patient/doctorDepartments`,
    DOCTORS_BY_DEPT: `${API_BASE}/sec/patient/getdoctorsByDept`,
    
    // Doctor Details
    DOCTOR_DETAILS_BY_ID: `${API_BASE}/sec/patient/DashboardDoctordetailsbyId`,
    
    // Appointments
    GET_APPOINTMENT_SLOTS: `${API_BASE}/sec/patient/getAppointmentSlots`,
    CREATE_APPOINTMENT: `${API_BASE}/sec/patient/createAppointment/`,
    CREATE_APPOINTMENT_HCF_DOCTOR: `${API_BASE}/sec/patient/createAppointmentHcfDoctor`,
    GET_AVAILABLE_APPOINTMENT_DATES: `${API_BASE}/sec/patient/getAvailableAppointmentDates`,
    CREATE_APPOINTMENT_PACKAGE_SELECT: `${API_BASE}/sec/patient/createAppointmentPackageSelect/`,
    CREATE_APPOINTMENT_PACKAGE_QUESTION: `${API_BASE}/sec/patient/createAppointmentPackageQuestion/`,
    UPCOMING_APPOINTMENTS: `${API_BASE}/sec/patient/UpcomingAppointments`,
    REJECT_APPOINTMENT: `${API_BASE}/sec/patient/RejectAppointment`,
    CANCELLED_APPOINTMENTS: `${API_BASE}/sec/patient/CancelledAppointments`,
    COMPLETED_APPOINTMENTS: `${API_BASE}/sec/patient/CompletedAppointments`,
    LEAVE_REVIEW: `${API_BASE}/sec/patient/LeaveReview`,
    
    // Profile Management
    PATIENT_PROFILE: `${API_BASE}/sec/patientprofile`,
    UPDATE_PATIENT_PROFILE: `${API_BASE}/sec/updatePateintProfile`,
    
    // Socket Management
    PUT_SOCKET_ID: `${API_BASE}/sec/patient/putSocketId/`,
  },

  // Doctor Module Endpoints
  DOCTOR: {
    // Dashboard & Statistics
    DASHBOARD_COUNT: `${API_BASE}/sec/Doctor/DocDashoardCount`,
    DASHBOARD_APP_IN_PROGRESS: `${API_BASE}/sec/Doctor/DocDashoardApp/in_progress`,
    DASHBOARD_APP_BOOKED: `${API_BASE}/sec/Doctor/DocDashoardApp/booked`,
    DASHBOARD_APP_COMPLETED: `${API_BASE}/sec/Doctor/DocDashoardApp/completed`,
    EARNING_COUNT: `${API_BASE}/sec/doctor/DocEarningCount`,
    AFFILIATE_EARNING_COUNT: `${API_BASE}/sec/doctor/DocAffiliateEarningCount`,
    TOTAL_EARNING_COUNT: `${API_BASE}/sec/doctor/DocTotalEarningCount`,
    ALL_EARNING_LIST: `${API_BASE}/sec/doctor/DocAllEarningList`,
    
    // Appointments
    APPOINTMENT_REQUESTS: `${API_BASE}/sec/Doctor/AppointmentsRequests`,
    APPOINTMENT_REQUESTS_ACCEPT: `${API_BASE}/sec/Doctor/AppointmentsRequestsAccept`,
    APPOINTMENT_REQUESTS_REJECT: `${API_BASE}/sec/Doctor/AppointmentsRequestsReject`,
    UPCOMING_APPOINTMENTS: `${API_BASE}/sec/Doctor/UpcomingAppointmentsDoctor`,
    CANCELLED_APPOINTMENTS: `${API_BASE}/sec/Doctor/CancelledAppointmentsDoctor`,
    COMPLETED_APPOINTMENTS: `${API_BASE}/sec/Doctor/CompletedAppointmentsDoctor/`,
    
    // Doctor Listing Management
    LISTING_CREATE_UPDATE: `${API_BASE}/sec/createUpdatedoctorlisting/listing`,
    PLAN_CREATE: `${API_BASE}/sec/createUpdatedoctorlisting/planCreate`,
    PLAN_ALL: `${API_BASE}/sec/createUpdatedoctorlisting/planAll`,
    PLAN_UPDATE: `${API_BASE}/sec/createUpdatedoctorlisting/planUpdate`,
    PLAN_DELETE: `${API_BASE}/sec/createUpdatedoctorlisting/planDelete`,
    PLAN_BY_ID: `${API_BASE}/sec/createUpdatedoctorlisting/planById`,
    QUESTION_CREATE: `${API_BASE}/sec/createUpdatedoctorlisting/questionCreate`,
    QUESTION_UPDATE: `${API_BASE}/sec/createUpdatedoctorlisting/questionUpdate`,
    QUESTION_DELETE: `${API_BASE}/sec/createUpdatedoctorlisting/questionDelete`,
    QUESTION_ALL: `${API_BASE}/sec/createUpdatedoctorlisting/questionAll`,
    QUESTION_BY_ID: `${API_BASE}/sec/createUpdatedoctorlisting/questionById`,
    TERMS_CREATE_UPDATE: `${API_BASE}/sec/createUpdatedoctorlisting/terms`,
    
    // Doctor Management
    LISTING_PLAN_ACTIVE: `${API_BASE}/sec/doctor/DocListingPlanActive`,
    LISTING_PLAN_DEACTIVE: `${API_BASE}/sec/doctor/DocListingPlanDeactive`,
    DELETE_DOC_LISTING_PLAN: `${API_BASE}/sec/doctor/deleteDocListingPlan`,
    DOC_LISTING_ACTIVE_DEACTIVE: `${API_BASE}/sec/doctor/docListingActiveDeactive`,
    AUDIT_LOGS: `${API_BASE}/sec/doctor/DoctorAuditlogs`,
    APPOINTMENT_HISTORY: `${API_BASE}/sec/doctor/DocAppointmentHistoryId`,
    TRANSACTIONS: `${API_BASE}/sec/doctor/DocTransaction/`,
  },

  // HCF (Healthcare Facility) Module Endpoints
  HCF: {
    ADD_DOCTOR: `${API_BASE}/sec/hcf/addDoctor`,
    ADD_DOCTOR_WORKING_DETAILS_AND_PLAN: `${API_BASE}/sec/hcf/addDoctorWorkingDetailsAndPlan`,
    CLINIC_APPOINTMENT_ACCEPT: `${API_BASE}/sec/hcf/clinicAppointmentAccept`,
    CLINIC_APPOINTMENT_REJECT: `${API_BASE}/sec/hcf/clinicAppointmentReject`,
    JOIN_APPOINTMENT_CLINIC: `${API_BASE}/sec/hcf/joinAppointmentClinic`,
    LAB_DEPARTMENTS: `${API_BASE}/sec/labDepartments`,
  },

  // Payment Endpoints
  PAYMENT: {
    GENERATE_TOKEN: `${API_BASE}/sec/payment/generateToken`,
    DOCTOR_BALANCE: `${API_BASE}/sec/payment/doctor/balance`,
    PAYOUTS: `${API_BASE}/sec/payment/payouts`,
    PAYOUT: `${API_BASE}/sec/payment/payout`,
  },

  // Reports & Files
  REPORTS: {
    UPLOAD_APPOINTMENT_FILE_TO_S3: `${API_BASE}/sec/reports/uploadAppointmentFileToS3`,
  },

  // Master Data Endpoints
  MASTER_DATA: {
    COUNTRIES: `${API_BASE}/sec/countries`,
    DEPARTMENTS: `${API_BASE}/sec/departments`,
  },
};

// External API Endpoints
export const EXTERNAL_API_ENDPOINTS = {
  GEOLOCATION: {
    NOMINATIM_REVERSE: 'https://nominatim.openstreetmap.org/reverse',
    NOMINATIM_SEARCH: 'https://nominatim.openstreetmap.org/search',
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

// Helper function to get endpoint with parameters
export const getEndpointWithParams = (category, key, params = {}) => {
  let endpoint = getEndpoint(category, key);
  
  // Replace URL parameters
  Object.keys(params).forEach(param => {
    endpoint = endpoint.replace(`{${param}}`, params[param]);
  });
  
  return endpoint;
};

// Helper function to get auth-related endpoints
export const getAuthEndpoints = () => API_ENDPOINTS.AUTH;

// Helper function to get patient-related endpoints
export const getPatientEndpoints = () => API_ENDPOINTS.PATIENT;

// Helper function to get doctor-related endpoints
export const getDoctorEndpoints = () => API_ENDPOINTS.DOCTOR;

// Helper function to get HCF-related endpoints
export const getHCFEndpoints = () => API_ENDPOINTS.HCF;

// Helper function to get payment-related endpoints
export const getPaymentEndpoints = () => API_ENDPOINTS.PAYMENT;

// Helper function to get master data endpoints
export const getMasterDataEndpoints = () => API_ENDPOINTS.MASTER_DATA;

// Helper function to get external API endpoints
export const getExternalEndpoints = () => EXTERNAL_API_ENDPOINTS;

// Helper function to get country-related endpoints (for backward compatibility)
export const getCountryEndpoints = () => API_ENDPOINTS.MASTER_DATA;

// Default export for easy importing
export default API_ENDPOINTS;