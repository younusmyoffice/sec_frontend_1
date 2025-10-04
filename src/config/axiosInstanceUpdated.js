import axios from "axios";
import jwtService from "../services/jwtService";
import { ROUTES } from "../constants/routes";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        // Check if token needs refresh before making the request
        if (jwtService.needsRefresh()) {
            console.log("Token needs refresh, attempting to refresh...");
            const refreshSuccess = await jwtService.refreshAccessToken();
            if (!refreshSuccess) {
                console.error("Token refresh failed, clearing auth data");
                jwtService.clearTokens();
                // Redirect to login if not already there
                if (window.location.pathname !== ROUTES.PATIENT_LOGIN) {
                    window.location.href = ROUTES.PATIENT_LOGIN;
                }
                return Promise.reject(new Error("Token refresh failed"));
            }
        }

        // Add token to Authorization header if present
        const authHeader = jwtService.getAuthHeader();
        if (authHeader.Authorization) {
            config.headers.Authorization = authHeader.Authorization;
            console.log("JWT token added to request headers");
        } else {
            console.warn("No access token found");
        }
        
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    },
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify the response data here (e.g., parse, transform)
        return response;
    },
    async (error) => {
        // Handle response errors here
        if (error.response?.status === 401) {
            console.error("Unauthorized access - token may be expired");
            
            // Try to refresh token first
            const refreshSuccess = await jwtService.refreshAccessToken();
            if (refreshSuccess) {
                console.log("Token refreshed, retrying original request");
                // Retry the original request with new token
                const originalRequest = error.config;
                const authHeader = jwtService.getAuthHeader();
                if (authHeader.Authorization) {
                    originalRequest.headers.Authorization = authHeader.Authorization;
                }
                return axiosInstance(originalRequest);
            } else {
                // If refresh fails, clear auth data and redirect
                jwtService.clearTokens();
                if (window.location.pathname !== ROUTES.PATIENT_LOGIN) {
                    window.location.href = ROUTES.PATIENT_LOGIN;
                }
            }
        }
        
        return Promise.reject(error);
    },
);

export default axiosInstance;
