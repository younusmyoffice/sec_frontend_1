# Access Token Handling - Complete Guide

## Overview
This document explains how JWT access tokens are handled throughout the application, specifically in the `LoginDoctor.js` component and how it's reusable across the entire application.

---

## **TOKEN FLOW DIAGRAM**

```
1. User Login (LoginDoctor.js)
   ↓
2. Backend Returns access_token (JWT)
   ↓
3. Store in localStorage
   ↓
4. axiosInstance Interceptor (automatic)
   ↓
5. All Future API Requests Include Token
   ↓
6. Backend Validates Token
   ↓
7. Request Succeeds or Requires Refresh
```

---

## **HOW ACCESS TOKENS ARE HANDLED**

### **1. Token Storage (LoginDoctor.js)**

```javascript
// After successful login
localStorage.setItem("access_token", res?.access_token);
```

**Location:** `src/Auth/Login/LoginDoctor/LoginDoctor.js` (Line ~137)

**Storage Method:** localStorage
- ✅ Persistent across page reloads
- ✅ Accessible to all components
- ⚠️ XSS vulnerability (stored in plain text)

### **2. Token Retrieval (axiosInstance.js)**

```javascript
// Request interceptor automatically adds token to all requests
axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("access_token");
        
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return config;
    }
);
```

**Location:** `src/config/axiosInstance.js` (Lines 9-43)

**How It Works:**
- Every API request using `axiosInstance` automatically includes the JWT token
- Token is retrieved from `localStorage`
- Added to `Authorization` header as `Bearer {token}`

### **3. Token Refresh (Automatic)**

```javascript
// Check if token needs refresh before making request
if (needsTokenRefresh()) {
    const refreshSuccess = await refreshToken();
    if (!refreshSuccess) {
        clearAuthData();
        window.location.href = "/login";
    }
}
```

**Location:** `src/config/axiosInstance.js` (Lines 11-24)

**How It Works:**
- Before each request, checks if token is about to expire
- If yes, automatically refreshes token
- If refresh fails, clears auth data and redirects to login

---

## **REUSABLE THROUGHOUT APPLICATION**

### ✅ **One Configuration File**

**File:** `src/config/axiosInstance.js`

```javascript
import axiosInstance from "../../../config/axiosInstance";

// All API calls automatically use this instance
const response = await axiosInstance.post("/api/endpoint", data);
const response2 = await axiosInstance.get("/api/another-endpoint");
```

**Benefits:**
- ✅ One place to configure token handling
- ✅ All requests automatically get JWT token
- ✅ Automatic token refresh handling
- ✅ Consistent across all components

### **Components Using axiosInstance:**

1. ✅ `LoginPatient.js`
2. ✅ `LoginDoctor.js`
3. ✅ `ProfilePatientComplete.js`
4. ✅ `ForgotPassword.js`
5. ✅ `ForgotPasswordOTP.js`
6. ✅ `ForgotPasswordChange.js`
7. ✅ `EmailVerification.js`
8. ✅ `SignupPage.js`
9. ✅ And many more...

---

## **TOKEN MANAGEMENT FLOW**

### **1. Login Process (LoginDoctor.js)**

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ... validation ...
    
    try {
        const response = await axiosInstance.post("/sec/auth/login", payload);
        const res = response?.data?.response;
        
        if (res?.access_token) {
            // STORE JWT TOKEN IN LOCALSTORAGE
            localStorage.setItem("access_token", res?.access_token);
            localStorage.setItem("email", res?.email);
            localStorage.setItem("doctor_suid", res?.suid);
            
            // Navigate to dashboard
            navigate("/doctordashboard");
        }
    } catch (error) {
        // Handle error
    }
};
```

### **2. Automatic Token Attachment (axiosInstance.js)**

```javascript
// Request interceptor runs before EVERY API request
axiosInstance.interceptors.request.use((config) => {
    // Get token from localStorage
    const accessToken = localStorage.getItem("access_token");
    
    // Add to Authorization header
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
});
```

**Result:**
Every API request automatically includes:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **3. Token Refresh (Automatic)**

```javascript
// Response interceptor handles 401 errors
axiosInstance.interceptors.response.use(
    (response) => response, // Success
    async (error) => {
        if (error.response?.status === 401) {
            // Try to refresh token
            const refreshSuccess = await refreshToken();
            if (refreshSuccess) {
                // Retry original request with new token
                return axiosInstance(error.config);
            } else {
                // Redirect to login
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
```

**How It Works:**
1. API request returns 401 (Unauthorized)
2. Interceptor catches the error
3. Automatically calls `refreshToken()`
4. Retries original request with new token
5. If refresh fails, redirects to login

---

## **SECURITY CONSIDERATIONS**

### **Current Implementation:**
- ✅ Tokens stored in `localStorage`
- ✅ Automatically added to all API requests
- ✅ Automatic token refresh
- ✅ Automatic logout on token failure
- ⚠️ XSS vulnerability (localStorage accessible to scripts)

### **Recommendations:**
1. **Use httpOnly Cookies** (server-side only access)
2. **Implement CSP** (Content Security Policy)
3. **Token Rotation** (short-lived access tokens)
4. **Rate Limiting** (prevent brute force)

---

## **USAGE THROUGHOUT APPLICATION**

### **Example: Making an Authenticated API Call**

```javascript
import axiosInstance from "../../../config/axiosInstance";

// No need to manually add headers - automatic!
const fetchData = async () => {
    try {
        const response = await axiosInstance.get("/api/doctors/profile");
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
```

**What Happens Behind the Scenes:**
1. `axiosInstance` reads `access_token` from localStorage
2. Adds it to `Authorization` header automatically
3. Makes the API request
4. If token expired, automatically refreshes it
5. Retries with new token

---

## **TOKEN UTILITIES (jwtUtils.js)**

Reusable functions for token management:

```javascript
// Get user data from JWT token
import { getCurrentUser, getCurrentUserId, getCurrentRoleId } from "../../../utils/jwtUtils";

const user = getCurrentUser(); // Full user object
const userId = getCurrentUserId(); // User ID
const roleId = getCurrentRoleId(); // Role ID
```

**Location:** `src/utils/jwtUtils.js`

**Functions:**
- `getCurrentUser()` - Decode and return full user object
- `getCurrentUserId()` - Extract user ID from token
- `getCurrentRoleId()` - Extract role ID from token
- `decodeJWT(token)` - Decode JWT token
- `isTokenExpired(token)` - Check if token is expired
- `needsTokenRefresh()` - Check if token needs refresh
- `refreshToken()` - Refresh the access token
- `clearAuthData()` - Clear all auth data

---

## **SUMMARY**

### **Access Token Handling:**

1. **Storage:** localStorage (login components)
2. **Attachment:** axiosInstance (automatic via interceptor)
3. **Refresh:** axiosInstance (automatic on 401)
4. **Utilities:** jwtUtils (reusable functions)

### **Reusability:**
- ✅ One configuration file (`axiosInstance.js`)
- ✅ Used by all components (no manual token handling needed)
- ✅ Automatic token management
- ✅ Consistent across entire application

### **Component Usage:**
```javascript
// Import once
import axiosInstance from "../../../config/axiosInstance";

// Use anywhere - token automatically included!
const data = await axiosInstance.get("/api/data");
```

**Result:** Access tokens are handled automatically throughout the entire application via `axiosInstance`! 🎉

