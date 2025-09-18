// Centralized route constants - Best Practice: Single source of truth for all routes
export const ROUTES = {
  // Landing pages
  HOME: "/",
  HOW_IT_WORKS: "/howItWorks",
  ABOUT_LANDING: "/aboutLanding",
  USAGE: "/usage",

  // Authentication
  SELECT_PROFILE_TYPE: "/selectProfileType",
  SELECT_HCF_PROFILE_TYPE: "/selectHcfProfileType",
  PATIENT_LOGIN: "/patientLogin",
  HCF_ADMIN_LOGIN: "/hcfAdminLogin",
  SUPER_ADMIN_LOGIN: "/superAdminLogin",

  // Signup flows
  SELECT_SIGNUP: "/selectSignup",
  PATIENT_SIGNUP: "/signupPage",
  DOCTOR_SIGNUP: "/signupPage",
  SELECT_HCF_SIGNUP: "/selectHcfSignup",
  DIAGNOST_CENTER_SIGNUP: "/diagnostCenterSignup",
  DIAGNOST_CLINIC_SIGNUP: "/diagnostClinicSignup",
  HCF_ADMIN_SIGNUP: "/hcfAdminSignup",

  // Patient flows
  PATIENT_FORGOT_PASSWORD: "/patientForgotPassword",
  PATIENT_FORGOT_PASSWORD_2: "/patientForgotPassword2",
  PATIENT_FORGOT_PASSWORD_3: "/patientForgotPassword3",
  LOGIN_WITH_OTP: "/LoginWithOtp",
  LOGIN_WITH_OTP_VERIFY: "/LoginWithOtpVerify",
  PATIENT_COMPLETE_PROFILE: "/patientCompleteProfile",
  EMAIL_VERIFICATION: "/emailVerification",
  PATIENT_PERSONAL_INFORMATION: "/patientPersonalInformation",
  PATIENT_CONTACT_INFORMATION: "/patientContactInformation",
  PATIENT_PAYMENT_INFORMATION: "/patientPaymentInformation",

  // Dashboard routes
  PATIENT_DASHBOARD: "/patientDashboard",
  DOCTOR_DASHBOARD: "/doctorDashboard",
  HCF_LOGIN: "/hcfLogin",
  DIAGNOST_CLINIC_LOGIN: "/diagnostClinicLogin",
  DIAGNOST_CENTER_LOGIN: "/diagnostCenterLogin",
  CLINIC_DOCTOR_COMPLETE_PROFILE: "/clinicDoctorCompleteProfile",
  CLINIC_DASHBOARD: "/clinicDashboard",
  DIAGNOST_CENTER_DASHBOARD: "/diagnostCenterDashboard",
  HCF_ADMIN: "/hcfAdmin",
  SUPER_ADMIN: "/superAdmin",

  // Video calling
  VIDEO_CALLING_SDK: "/videoCallingSdk",
  CHAT_ROOM: "/chatRoom",
};

// User type constants
export const USER_TYPES = {
  PATIENT: "I am a Patient",
  DOCTOR: "I am a Doctor", 
  HCF_ADMIN: "HCF Admin",
};

// Storage keys
export const STORAGE_KEYS = {
  SIGNUP_TYPE: "signUp",
  ACTIVE_COMPONENT: "activeComponent",
  PATH: "path",
};

// Navigation mapping for user types
export const USER_TYPE_ROUTES = {
  [USER_TYPES.PATIENT]: ROUTES.PATIENT_SIGNUP,
  [USER_TYPES.DOCTOR]: ROUTES.DOCTOR_SIGNUP,
  [USER_TYPES.HCF_ADMIN]: ROUTES.PATIENT_SIGNUP, // Note: This seems to be a bug in original code
};

// Storage value mapping for user types
export const USER_TYPE_STORAGE_VALUES = {
  [USER_TYPES.PATIENT]: "patient",
  [USER_TYPES.DOCTOR]: "doctor", 
  [USER_TYPES.HCF_ADMIN]: "hcf_admin",
};
