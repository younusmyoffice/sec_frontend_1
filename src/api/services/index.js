/**
 * API Services Index - Centralized exports for all API services
 */

// Export all services
export { default as AuthService } from './authService';
export { default as PatientService } from './patientService';
export { default as DoctorService } from './doctorService';
export { default as HCFService } from './hcfService';
export { default as PaymentService } from './paymentService';
export { default as MasterDataService } from './masterDataService';
export { default as ReportsService } from './reportsService';
export { default as CountryService } from './countryService';

// Export individual auth functions for backward compatibility
export { 
  loginUser, 
  registerUser, 
  logoutUser, 
  forceLogout, 
  isUserLoggedIn, 
  checkForceLogout 
} from './authService';

// Export endpoints
export { default as API_ENDPOINTS } from '../endpoints';
export { 
  getEndpoint, 
  getEndpointWithParams,
  getAuthEndpoints,
  getPatientEndpoints,
  getDoctorEndpoints,
  getHCFEndpoints,
  getPaymentEndpoints,
  getMasterDataEndpoints,
  getExternalEndpoints
} from '../endpoints';