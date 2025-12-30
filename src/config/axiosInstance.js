import axios from "axios";
import { needsTokenRefresh, refreshToken, clearAuthData } from "../utils/jwtUtils";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // Replace with your API base URL
});

// Request interceptor
// FIXED: Added refresh guard to prevent infinite refresh loops
let isRefreshing = false;
let refreshPromise = null;

axiosInstance.interceptors.request.use(
    async (config) => {
        // Skip refresh check for refresh endpoint to avoid infinite loop
        if (config.url && config.url.includes('/sec/auth/refresh')) {
            const accessToken = localStorage.getItem("access_token");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        }

        // Check if token needs refresh before making the request
        if (needsTokenRefresh() && !isRefreshing) {
            isRefreshing = true;
            console.log("Token needs refresh, attempting to refresh...");
            
            // Create a single refresh promise to avoid multiple simultaneous refreshes
            if (!refreshPromise) {
                refreshPromise = refreshToken().then((success) => {
                    isRefreshing = false;
                    refreshPromise = null;
                    return success;
                }).catch((error) => {
                    isRefreshing = false;
                    refreshPromise = null;
                    return false;
                });
            }
            
            const refreshSuccess = await refreshPromise;
            if (!refreshSuccess) {
                console.error("Token refresh failed, clearing auth data");
                clearAuthData();
                // Redirect to login if not already there
                if (window.location.pathname !== "/login" && window.location.pathname !== "/patientLogin") {
                    window.location.href = "/login";
                }
                return Promise.reject(new Error("Token refresh failed"));
            }
        }

        // Get token from localStorage (consistent with jwtUtils.js)
        const accessToken = localStorage.getItem("access_token");
        
        // Add token to Authorization header if present
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            console.log("JWT token added to request headers");
        } else {
            console.warn("No access token found in localStorage");
        }
        
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        isRefreshing = false;
        refreshPromise = null;
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
            const refreshSuccess = await refreshToken();
            if (refreshSuccess) {
                console.log("Token refreshed, retrying original request");
                // Retry the original request with new token
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
                return axiosInstance(originalRequest);
            } else {
                // If refresh fails, clear auth data and redirect
                clearAuthData();
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            }
        }
        
        return Promise.reject(error);
    },
);

export default axiosInstance;
