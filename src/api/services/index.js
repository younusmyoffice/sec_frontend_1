/**
 * API Services Index
 * 
 * Centralized export for all API services
 * This provides a clean interface for importing services throughout the application
 */

// Export all services
export { default as countryService } from './countryService';
export { CountryService } from './countryService';
export { default as authService } from './authService';
export { logoutUser, forceLogout, isUserLoggedIn, getCurrentUserInfo, checkForceLogout } from './authService';

// Export endpoints for direct use if needed
export { API_ENDPOINTS, getEndpoint, getCountryEndpoints, getAuthEndpoints, getUserEndpoints } from '../endpoints';

// Re-export commonly used endpoints for convenience
export { 
  API_ENDPOINTS as ENDPOINTS,
  getEndpoint,
  getCountryEndpoints,
  getAuthEndpoints,
  getUserEndpoints
} from '../endpoints';
