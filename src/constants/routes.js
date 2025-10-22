// Centralized route constants - Best Practice: Single source of truth for all routes
export const ROUTES = {
  // Landing pages
  HOME: "/",
  HOW_IT_WORKS: "/howItWorks",
  ABOUT_LANDING: "/aboutLanding",
  USAGE: "/usage",

  // Authentication & Role Selection
  SELECT_ROLE_LOGIN: "/SelectRoleLogin",
  SELECT_ROLE_SIGNUP: "/selectRoleSignup",
  SELECT_HCF_PROFILE_TYPE: "/SelectHCFTypeLoginRole",
  SELECT_HCF_SIGNUP: "/selectHcfSignup",

  // Login Routes
  PATIENT_LOGIN: "/patientLogin",
  HCF_ADMIN_LOGIN: "/hcfAdminLogin",
  SUPER_ADMIN_LOGIN: "/superAdminLogin",
  DOCTOR_LOGIN: "/doctorLogin",
  CLINIC_LOGIN: "/clinicLogin",
  DIAGNOST_CENTER_LOGIN: "/diagnostCenterLogin",

  // Signup Routes
  PATIENT_SIGNUP: "/signupPage",
  DOCTOR_SIGNUP: "/signupPage",
  HCF_ADMIN_SIGNUP: "/signupPage",
  DIAGNOST_CENTER_SIGNUP: "/diagnostCenterSignup",
  DIAGNOST_CLINIC_SIGNUP: "/diagnostClinicSignup",

  

  // Password Management
  FORGOT_PASSWORD: "/ForgotPassword",
  FORGOT_PASSWORD_OTP: "/ForgotPasswordOTP",
  FORGOT_PASSWORD_CHANGE: "/ForgotPasswordChange",

  // OTP & Verification
  LOGIN_WITH_OTP: "/LoginWithOtp",
  LOGIN_WITH_OTP_VERIFY: "/LoginWithOtpVerify",
  EMAIL_VERIFICATION: "/emailVerification",

  // Patient Profile Completion
  PATIENT_COMPLETE_PROFILE: "/patientCompleteProfile",
  PATIENT_PERSONAL_INFORMATION: "/patientPersonalInformation",
  PATIENT_CONTACT_INFORMATION: "/patientContactInformation",
  PATIENT_PAYMENT_INFORMATION: "/patientPaymentInformation",

  // Doctor Profile Completion
  DOCTOR_COMPLETE_PROFILE: "/doctorCompleteProfile",
  CLINIC_DOCTOR_COMPLETE_PROFILE: "/clinicDoctorCompleteProfile",

  // Dashboard Routes
  PATIENT_DASHBOARD: "/patientDashboard",
  DOCTOR_DASHBOARD: "/doctorDashboard",
  HCF_ADMIN: "/hcfAdmin",
  SUPER_ADMIN: "/superAdmin",
  CLINIC_DASHBOARD: "/clinicDashboard",
  DIAGNOST_CENTER_DASHBOARD: "/diagnostCenterDashboard",

  // Patient Dashboard Sub-routes
  PATIENT_DASHBOARD_MAIN: "/patientDashboard/dashboard",
  PATIENT_DASHBOARD_EXPLORE: "/patientDashboard/dashboard/explore",
  PATIENT_DASHBOARD_MY_ACTIVITY: "/patientDashboard/dashboard/myactivity",
  PATIENT_DASHBOARD_PROFILE: "/patientDashboard/dashboard/profile",
  PATIENT_DASHBOARD_PAYMENT: "/patientDashboard/dashboard/payment",
  PATIENT_DASHBOARD_CONTACT: "/patientDashboard/dashboard/contact",
  PATIENT_DASHBOARD_PATIENT_HCF: "/patientDashboard/dashboard/patienthcf",

  // Patient Appointment Routes
  PATIENT_APPOINTMENT: "/patientDashboard/appointment",
  PATIENT_APPOINTMENT_UPCOMING: "/patientDashboard/appointment/upcoming",
  PATIENT_APPOINTMENT_COMPLETED: "/patientDashboard/appointment/completed",
  PATIENT_APPOINTMENT_CANCELLED: "/patientDashboard/appointment/cancelled",
  PATIENT_APPOINTMENT_CHAT: "/patientDashboard/appointment/chats",
  PATIENT_APPOINTMENT_CHAT_PAGE: "/patientDashboard/appointment/chats/:roomID/:appointment_id",

  // Patient Manage Routes
  PATIENT_MANAGE: "/patientDashboard/manage",
  PATIENT_MANAGE_BOOKING_HISTORY: "/patientDashboard/manage/bookinghistory",
  PATIENT_MANAGE_TRANSACTIONS: "/patientDashboard/manage/transactions",
  PATIENT_MANAGE_REPORTS: "/patientDashboard/manage/reports",
  PATIENT_MANAGE_REPORTS_REQUEST: "/patientDashboard/manage/reports/request",
  PATIENT_MANAGE_REPORTS_EXAMINED: "/patientDashboard/manage/reports/examined",
  PATIENT_MANAGE_REPORTS_RECEIVED: "/patientDashboard/manage/reports/received",
  PATIENT_MANAGE_REPORTS_SHARED: "/patientDashboard/manage/reports/shared",
  PATIENT_MANAGE_SUBSCRIPTIONS: "/patientDashboard/manage/subscriptions",

  // Patient Activity Routes
  PATIENT_ACTIVITY_RECEIVED: "/patientDashboard/dashboard/myactivity/received",
  PATIENT_ACTIVITY_SHARED: "/patientDashboard/dashboard/myactivity/shared",

  // Doctor Details Routes
  PATIENT_DOCTOR_DETAILS: "/patientDashboard/drDetailsCard/:resID",
  PATIENT_HCF_DOCTOR_DETAILS: "/patientDashboard/hcfDetailCard/hcfDoctor/:hcddocid/:reshcfID",
  PATIENT_HCF_DETAILS: "/patientDashboard/hcfDetailCard/:hcfID",
  PATIENT_HCF_DETAILS_ABOUT: "/patientDashboard/hcfDetailCard/:hcfID/about",
  PATIENT_HCF_DETAILS_DEPARTMENT: "/patientDashboard/hcfDetailCard/:hcfID/department",
  PATIENT_HCF_DETAILS_LABS: "/patientDashboard/hcfDetailCard/:hcfID/labs",

  // Doctor Dashboard Sub-routes
  DOCTOR_DASHBOARD_MAIN: "/doctorDashboard/doctorMainDashboard",
  DOCTOR_DASHBOARD_REQUEST: "/doctorDashboard/doctorMainDashboard/request",
  DOCTOR_DASHBOARD_NOTIFICATION: "/doctorDashboard/doctorMainDashboard/notification",

  // Doctor Appointment Routes
  DOCTOR_APPOINTMENT: "/doctorDashboard/doctorAppointment",
  DOCTOR_APPOINTMENT_REQUEST: "/doctorDashboard/doctorAppointment/request",
  DOCTOR_APPOINTMENT_UPCOMING: "/doctorDashboard/doctorAppointment/upcoming",
  DOCTOR_APPOINTMENT_COMPLETED: "/doctorDashboard/doctorAppointment/completed",
  DOCTOR_APPOINTMENT_CANCELLED: "/doctorDashboard/doctorAppointment/cancelled",
  DOCTOR_APPOINTMENT_CHATS: "/doctorDashboard/doctorAppointment/chats",
  DOCTOR_APPOINTMENT_VIDEO_CALL: "/doctorDashboard/doctorAppointment/chats/videoCall",
  DOCTOR_APPOINTMENT_VOICE_CALL: "/doctorDashboard/doctorAppointment/chats/voiceCall",

  // Doctor Listing Routes
  DOCTOR_LISTING: "/doctorDashboard/doctorListing",
  DOCTOR_LISTING_DETAILS: "/doctorDashboard/doctorListing/doctorListingDetails",
  DOCTOR_LISTING_CREATE: "/doctorDashboard/doctorListing/createNewListing",
  DOCTOR_LISTING_ACTIVE: "/doctorDashboard/doctorListing/doctorActiveListing",
  DOCTOR_LISTING_SAVED_DRAFT: "/doctorDashboard/doctorListing/doctorSavedDraft",

  // Doctor Manage Routes
  DOCTOR_MANAGE: "/doctorDashboard/doctorManage",
  DOCTOR_MANAGE_PROFILE: "/doctorDashboard/doctorManage/profile",
  DOCTOR_MANAGE_STAFF: "/doctorDashboard/doctorManage/doctorStaff",
  DOCTOR_MANAGE_AUDIT_LOG: "/doctorDashboard/doctorManage/doctorAuditLog",

  // Doctor Statistics Routes
  DOCTOR_STATISTICS: "/doctorDashboard/doctorStatistics",
  DOCTOR_STATISTICS_OVERVIEW: "/doctorDashboard/doctorStatistics/doctorOverview",
  DOCTOR_STATISTICS_BOOKING_HISTORY: "/doctorDashboard/doctorStatistics/doctorBookingHistory",
  DOCTOR_STATISTICS_TRANSACTIONS: "/doctorDashboard/doctorStatistics/doctorTransactions",
  DOCTOR_STATISTICS_PAYOUT: "/doctorDashboard/doctorStatistics/doctorPayout",

  // HCF Admin Routes
  HCF_ADMIN_MAIN: "/hcfAdmin/hcfMainDashboard",
  HCF_ADMIN_DOCTOR: "/hcfAdmin/hcfDoctor",
  HCF_ADMIN_DOCTOR_ADD: "/hcfAdmin/hcfDoctor/addDoctor",
  HCF_ADMIN_DOCTOR_LISTING: "/hcfAdmin/hcfDoctor/doctorListing",
  HCF_ADMIN_DOCTOR_STAFF: "/hcfAdmin/hcfDoctor/doctorStaff",
  HCF_ADMIN_DOCTOR_AUDIT_LOG: "/hcfAdmin/hcfDoctor/doctorAuditLog",

  // HCF Admin Diagnostic Center Routes
  HCF_ADMIN_DIAGNOSTIC_CENTER: "/hcfAdmin/diagnosticCenter",
  HCF_ADMIN_DIAGNOSTIC_CENTER_LABS: "/hcfAdmin/diagnosticCenter/labs",
  HCF_ADMIN_DIAGNOSTIC_CENTER_LAB_DETAILS: "/hcfAdmin/diagnosticCenter/labs/:labId",
  HCF_ADMIN_DIAGNOSTIC_CENTER_REPORTS: "/hcfAdmin/diagnosticCenter/reports",
  HCF_ADMIN_DIAGNOSTIC_CENTER_CHARTS: "/hcfAdmin/diagnosticCenter/charts",
  HCF_ADMIN_DIAGNOSTIC_CENTER_CHATS: "/hcfAdmin/diagnosticCenter/chats",

  // Super Admin Routes
  SUPER_ADMIN_MAIN: "/superAdmin/superAdminMainDashboard",
  SUPER_ADMIN_USERS: "/superAdmin/superAdminUsers",
  SUPER_ADMIN_TRANSACTIONS: "/superAdmin/superAdminTransaction",
  SUPER_ADMIN_TRANSACTIONS_DOCTOR: "/superAdmin/superAdminTransaction/transactionDoctor",
  SUPER_ADMIN_TRANSACTIONS_HCF: "/superAdmin/superAdminTransaction/transactionHCF",

  // Clinic Dashboard Routes
  CLINIC_DASHBOARD_MAIN: "/clinicDashboard/clinicMainDashboard",
  CLINIC_DASHBOARD_APPOINTMENT: "/clinicDashboard/clinicAppointment",
  CLINIC_DASHBOARD_DOCTOR: "/clinicDashboard/clinicDoctor",
  CLINIC_DASHBOARD_STAFF: "/clinicDashboard/clinicStaff",
  CLINIC_DASHBOARD_REPORTS: "/clinicDashboard/clinicReports",

  // Diagnostic Center Dashboard Routes
  DIAGNOST_CENTER_DASHBOARD_MAIN: "/diagnostCenterDashboard/diagnostCenterMainDashboard",
  DIAGNOST_CENTER_DASHBOARD_APPOINTMENT: "/diagnostCenterDashboard/diagnostCenterAppointment",
  DIAGNOST_CENTER_DASHBOARD_DOCTOR: "/diagnostCenterDashboard/diagnostCenterDoctor",
  DIAGNOST_CENTER_DASHBOARD_STAFF: "/diagnostCenterDashboard/diagnostCenterStaff",
  DIAGNOST_CENTER_DASHBOARD_REPORTS: "/diagnostCenterDashboard/diagnostCenterReports",

  // Video Calling & Communication
  VIDEO_CALLING_SDK: "/videocallingsdk",
  CHAT_ROOM: "/chatRoom",
};

// User type constants
export const USER_TYPES = {
  PATIENT: "I am a Patient",
  DOCTOR: "I am a Doctor", 
  HEALTHCARE_FACILITY: "I am a Healthcare Facility",
};

// Storage keys
export const STORAGE_KEYS = {
  SIGNUP_TYPE: "signUp",
  ACTIVE_COMPONENT: "activeComponent",
  PATH: "path",
  USER_TYPE: "userType",
  AUTH_TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
  USER_ID: "userId",
  DOCTOR_ID: "doctor_suid",
  HCF_ID: "hcfadmin_suid",
};

// Navigation mapping for user types
export const USER_TYPE_ROUTES = {
  [USER_TYPES.PATIENT]: ROUTES.PATIENT_SIGNUP,
  [USER_TYPES.DOCTOR]: ROUTES.DOCTOR_SIGNUP,
  [USER_TYPES.HEALTHCARE_FACILITY]: ROUTES.HCF_ADMIN_SIGNUP,
};

// Storage value mapping for user types
export const USER_TYPE_STORAGE_VALUES = {
  [USER_TYPES.PATIENT]: "patient",
  [USER_TYPES.DOCTOR]: "doctor", 
  [USER_TYPES.HEALTHCARE_FACILITY]: "hcf_admin",
};

// Route groups for easier management
export const ROUTE_GROUPS = {
  AUTHENTICATION: [
    ROUTES.PATIENT_LOGIN,
    ROUTES.DOCTOR_LOGIN,
    ROUTES.HCF_ADMIN_LOGIN,
    ROUTES.SUPER_ADMIN_LOGIN,
    ROUTES.CLINIC_LOGIN,
    ROUTES.DIAGNOST_CENTER_LOGIN,
  ],
  SIGNUP: [
    ROUTES.PATIENT_SIGNUP,
    ROUTES.DOCTOR_SIGNUP,
    ROUTES.HCF_ADMIN_SIGNUP,
    ROUTES.DIAGNOST_CENTER_SIGNUP,
    ROUTES.DIAGNOST_CLINIC_SIGNUP,
  ],
  DASHBOARDS: [
    ROUTES.PATIENT_DASHBOARD,
    ROUTES.DOCTOR_DASHBOARD,
    ROUTES.HCF_ADMIN,
    ROUTES.SUPER_ADMIN,
    ROUTES.CLINIC_DASHBOARD,
    ROUTES.DIAGNOST_CENTER_DASHBOARD,
  ],
  PROTECTED_ROUTES: [
    ROUTES.PATIENT_DASHBOARD,
    ROUTES.DOCTOR_DASHBOARD,
    ROUTES.HCF_ADMIN,
    ROUTES.SUPER_ADMIN,
    ROUTES.CLINIC_DASHBOARD,
    ROUTES.DIAGNOST_CENTER_DASHBOARD,
  ],
};

// Helper functions for route management
export const getRouteWithParams = (route, params = {}) => {
  let routeWithParams = route;
  Object.keys(params).forEach(param => {
    routeWithParams = routeWithParams.replace(`:${param}`, params[param]);
  });
  return routeWithParams;
};

export const isProtectedRoute = (pathname) => {
  return ROUTE_GROUPS.PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );
};

export const getUserDashboardRoute = (userType) => {
  const dashboardMap = {
    [USER_TYPES.PATIENT]: ROUTES.PATIENT_DASHBOARD,
    [USER_TYPES.DOCTOR]: ROUTES.DOCTOR_DASHBOARD,
    [USER_TYPES.HEALTHCARE_FACILITY]: ROUTES.HCF_ADMIN,
  };
  return dashboardMap[userType] || ROUTES.HOME;
};

export const getSignupRoute = (userType) => {
  return USER_TYPE_ROUTES[userType] || ROUTES.PATIENT_SIGNUP;
};

// Default export for easy importing
export default ROUTES;
