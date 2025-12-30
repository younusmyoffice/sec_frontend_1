# Access Token Handling - ProfileDiagnosticComplete

## Overview
This document explains how JWT access tokens are handled in the `ProfileDiagnosticComplete` component and how they're **automatically reusable throughout the entire application**.

---

## ✅ YES - Access Token is Reusable Throughout the Application!

The access token handling is **completely reusable**. Once stored after login, it works automatically in ALL components without any additional setup.

---

## 🔐 How Access Token Flow Works

### **Step 1: Token Storage (Initial Login)**
When a diagnostic center user logs in (via `LoginDiagnostic.js`):
```javascript
// After successful login
localStorage.setItem("access_token", resData.access_token);
```

**Location**: `src/Auth/Login/LoginHCFTypes/LoginDiagnostic/LoginDiagnostic.js`

**Storage Method**: localStorage  
**Key**: `"access_token"`  
**Value**: JWT token string

---

### **Step 2: Automatic Token Injection (axiosInstance)**

**File**: `src/config/axiosInstance.js`

```javascript
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

// Request interceptor - automatically adds token to ALL requests
axiosInstance.interceptors.request.use(
    async (config) => {
        // Read token from localStorage
        const accessToken = localStorage.getItem("access_token");
        
        // Add to Authorization header
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return config;
    }
);
```

**What this means**:  
✅ Every component using `axiosInstance` automatically gets the token  
✅ No need to manually add `Authorization` headers  
✅ No need to pass tokens between components  
✅ Centralized token management  

---

### **Step 3: Usage in ProfileDiagnosticComplete**

**File**: `src/Auth/Login/ProfileHCFComplete/ProfileDiagnosticComplete/ProfileDiagnosticComplete.js`

```javascript
import axiosInstance from "../../../../config/axiosInstance"; // Import the configured instance

const handleSubmitProfile = async () => {
    try {
        setLoading(true);
        
        // Get user info from token utilities
        const userId = getCurrentUserId(); // From JWT
        const userEmail = getCurrentUserEmail(); // From JWT
        const diagnosticSuid = localStorage.getItem("diagnostic_suid");
        
        // Prepare data
        const finalData = {
            suid: diagnosticSuid,
            email: userEmail || localStorage.getItem("diagnostic_Email"),
            user_id: userId,
            role_id: 4,
            ...formData
        };
        
        // API call - TOKEN IS AUTOMATICALLY ADDED!
        const response = await axiosInstance.post(
            "/sec/auth/updateProfile",
            JSON.stringify(finalData),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            }
        );
        
        // Success handling...
    } catch (error) {
        // Error handling...
    } finally {
        setLoading(false);
    }
};
```

**Key Point**: Notice there's NO manual token handling in this component. The `axiosInstance` automatically:
1. Reads `access_token` from localStorage
2. Adds it to the Authorization header
3. Sends the request with the token

---

## 🚀 Reusability Across the Application

### **How to Use Token in ANY Component**

**Step 1**: Import `axiosInstance`:
```javascript
import axiosInstance from "../../config/axiosInstance";
```

**Step 2**: Make API calls normally:
```javascript
const response = await axiosInstance.get("/api/endpoint");
// OR
const response = await axiosInstance.post("/api/endpoint", data);
```

**Step 3**: That's it! Token is automatically included.

---

## 🛡️ Security Features

### **1. Automatic Token Refresh**
If the token is expired or about to expire:

```javascript
// In axiosInstance.js request interceptor
if (needsTokenRefresh()) {
    const refreshSuccess = await refreshToken();
    if (!refreshSuccess) {
        clearAuthData();
        window.location.href = "/login";
    }
}
```

**How it works**:
- Before each request, checks if token needs refresh
- Attempts to refresh automatically
- Retries the request with new token
- Redirects to login if refresh fails

### **2. 401 Error Handling**
If a request returns 401 (Unauthorized):

```javascript
// In axiosInstance.js response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Try to refresh token
            const refreshSuccess = await refreshToken();
            if (refreshSuccess) {
                // Retry original request with new token
                return axiosInstance(error.config);
            } else {
                // Clear auth and redirect
                clearAuthData();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
```

---

## 📋 Token Storage Locations

### **localStorage Keys Used**
- `access_token` - JWT access token (primary)
- `diagnostic_suid` - Diagnostic center unique ID
- `diagnostic_Email` - User email
- `user_id` - Extracted from JWT
- `role_id` - Extracted from JWT  
- `jwt_email` - Email from JWT payload

### **Token Extraction Utilities**

**File**: `src/utils/jwtUtils.js`

```javascript
// Decode JWT to get user information
export const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

// Get current user ID from JWT
export const getCurrentUserId = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        const decoded = decodeJWT(token);
        return decoded?.userId || null;
    }
    return null;
};

// Get current user email from JWT
export const getCurrentUserEmail = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        const decoded = decodeJWT(token);
        return decoded?.email || null;
    }
    return null;
};
```

---

## 🎯 Usage Examples

### **Example 1: Simple GET Request**
```javascript
import axiosInstance from "../../config/axiosInstance";

// Get diagnostic center profile
const response = await axiosInstance.get("/sec/profile/diagnostic");
// Token is automatically added!
```

### **Example 2: POST Request**
```javascript
import axiosInstance from "../../config/axiosInstance";

// Update profile
const response = await axiosInstance.post(
    "/sec/profile/update",
    {
        name: "New Name",
        address: "New Address"
    }
);
// Token is automatically added!
```

### **Example 3: With Error Handling**
```javascript
import axiosInstance from "../../config/axiosInstance";
import logger from "../../utils/logger";

try {
    const response = await axiosInstance.get("/sec/data");
    logger.info("Success:", response.data);
} catch (error) {
    logger.error("Failed:", error);
    // Token refresh and retry handled automatically
}
```

---

## ✅ Benefits of This Approach

### **1. Single Source of Truth**
- Token stored once in localStorage
- Managed centrally in `axiosInstance`
- No duplication across components

### **2. Automatic Management**
- No manual token passing
- No prop drilling
- No context management needed

### **3. Secure**
- Automatic token refresh
- 401 error handling
- Automatic logout on failure

### **4. Reusable**
- Work in ANY component
- Just import `axiosInstance`
- Works immediately after login

### **5. Developer Friendly**
- Simple API calls
- No boilerplate
- Clear error messages

---

## 🔄 Token Lifecycle

```
User Login
    ↓
Token Stored in localStorage
    ↓
axiosInstance Created (Once)
    ↓
Request Made (Any Component)
    ↓
Token Checked (Automatic)
    ↓
Token Added to Header (Automatic)
    ↓
Request Sent to Backend
    ↓
Backend Validates Token
    ↓
Response Received
    ↓
OR 401 Error → Token Refresh → Retry
```

---

## 🚨 Important Notes

### **1. Always Use `axiosInstance` for Authenticated Requests**
```javascript
// ✅ CORRECT
import axiosInstance from "../../config/axiosInstance";
const response = await axiosInstance.get("/api/data");

// ❌ WRONG
import axios from "axios";
const response = await axios.get("/api/data"); // No token!
```

### **2. Token is Set Once After Login**
- Stored in `localStorage.setItem("access_token", ...)`
- Works across page reloads
- Survives browser restarts
- Clear with: `localStorage.removeItem("access_token")`

### **3. No Manual Token Management Needed**
- Don't manually add Authorization headers
- Don't manually refresh tokens  
- Don't manually handle 401 errors
- Everything is handled by `axiosInstance`

---

## 📝 Summary

**Access Token Handling in ProfileDiagnosticComplete**:

1. ✅ **Reusable**: Token works throughout entire application
2. ✅ **Automatic**: `axiosInstance` handles token injection
3. ✅ **Secure**: Automatic refresh and error handling
4. ✅ **Simple**: Just import and use `axiosInstance`
5. ✅ **Centralized**: Single source of truth in localStorage

**Usage in ANY component**:
```javascript
import axiosInstance from "../../config/axiosInstance";
const response = await axiosInstance.post("/api/endpoint", data);
// Token is automatically included!
```

No additional setup required. Just use `axiosInstance` and the token is automatically included in all requests!
