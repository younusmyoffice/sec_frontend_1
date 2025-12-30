# Access Token Handling in LoginPatient

## Overview

This document explains how JWT access tokens are handled in the authentication flow, specifically in the `LoginPatient` component and throughout the application.

---

## Token Flow Diagram

```
┌─────────────────┐
│  User Login     │
│  (Email + PWD)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Backend API    │
│  Authenticates  │
└────────┬────────┘
         │
         ▼
┌────────────────────────┐
│  Returns Access Token   │
│  (JWT with user info)   │
└────────┬────────────────┘
         │
         ▼
┌────────────────────────────┐
│  Token Decoded & Stored     │
│  • Decode JWT               │
│  • Store in localStorage    │
│  • Set auth cookies         │
└────────┬───────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Use Token for Requests │
│  via axiosInstance      │
└────────┬────────────────┘
         │
         ▼
┌────────────────────────────┐
│  Automatic Token Refresh   │
│  (Before expiry)              │
└────────────────────────────┘
```

---

## 1. Token Acquisition (Login Flow)

### In LoginPatient.js

**Step 1: Login Request**
```jsx
const response = await axiosInstance.post(
    `${baseURL}/sec/auth/login`,
    JSON.stringify(loginData),
    {
        headers: { Accept: "Application/json" },
    },
);
```

**Step 2: Extract Token from Response**
```jsx
const resData = response?.data?.response;
```

**Step 3: Decode and Store Token**
```jsx
// Decode JWT to get user information
const userInfo = decodeJWT(resData.access_token);
logger.debug("Decoded user info from JWT:", userInfo);

// Store user information
localStorage.setItem("patient_Email", email);
localStorage.setItem("access_token", resData.access_token);
localStorage.setItem("patient_suid", resData.suid);
localStorage.setItem("profile", resData.profile_picture);

// Set cookie for auth guard persistence
Cookies.set("patientEmail", email, { expires: 7 });

// Store additional user info from JWT
localStorage.setItem("user_id", userInfo.userId);
localStorage.setItem("role_id", userInfo.roleId || "");
localStorage.setItem("jwt_email", userInfo.email || email);
```

---

## 2. Token Storage

### Storage Methods

#### A. **localStorage** (Primary Storage)
```jsx
localStorage.setItem("access_token", resData.access_token);
```
- ✅ Persistent across sessions
- ✅ Survives page reloads
- ⚠️ Vulnerable to XSS attacks
- ✅ Accessible to JavaScript

**Keys Used**:
- `access_token` - JWT access token
- `refresh_token` - Optional refresh token
- `patient_Email` - User email
- `patient_suid` - User ID
- `profile` - Profile picture URL
- `user_id` - Extracted from JWT
- `role_id` - Extracted from JWT
- `jwt_email` - Email from JWT

#### B. **Cookies** (For Persistence)
```jsx
Cookies.set("patientEmail", email, { expires: 7 });
```
- ✅ Optional setting: httpOnly (not currently set)
- ✅ Expires after 7 days
- ✅ Survives browser restarts

---

## 3. Token Usage (Automatic Injection)

### Via axiosInstance

**File**: `src/config/axiosInstance.js`

```jsx
// Request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        // Check if token needs refresh before making the request
        if (needsTokenRefresh()) {
            console.log("Token needs refresh, attempting to refresh...");
            const refreshSuccess = await refreshToken();
            if (!refreshSuccess) {
                console.error("Token refresh failed, clearing auth data");
                clearAuthData();
                // Redirect to login if not already there
                if (window.location.pathname !== "/login") {
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
    }
);
```

**How It Works**:
1. Every API request through `axiosInstance` is intercepted
2. Token is retrieved from `localStorage.getItem("access_token")`
3. Token is added to `Authorization` header as `Bearer {token}`
4. Request is sent to backend

**Example**:
```jsx
// This request automatically includes the token:
const response = await axiosInstance.get('/api/user/profile');
// Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 4. Token Refresh (Automatic)

### Refresh Mechanism

**File**: `src/config/axiosInstance.js` (Response Interceptor)

```jsx
axiosInstance.interceptors.response.use(
    (response) => {
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
```

**When Refresh Happens**:
1. **Proactive Refresh**: Before expiry (5 minutes before)
2. **Reactive Refresh**: On 401 Unauthorized response
3. **Automatic Retry**: After successful refresh

### Refresh Token Function

**File**: `src/utils/jwtUtils.js`

```jsx
export const refreshToken = async () => {
    try {
        // Fallback: if no refresh_token, use access_token for minimal refresh flow
        const bearer = localStorage.getItem('refresh_token') || localStorage.getItem('access_token');
        if (!bearer) {
            console.warn('No token available for refresh');
            return false;
        }

        const response = await axiosInstance.post(
            '/sec/auth/refresh',
            null,
            {
                headers: {
                    'Authorization': `Bearer ${bearer}`
                }
            }
        );

        const data = response?.data;
        if (data?.access_token) {
            localStorage.setItem('access_token', data.access_token);
            // If backend ever returns a refresh_token, store it
            if (data.refresh_token) {
                localStorage.setItem('refresh_token', data.refresh_token);
            }
            console.log('Token refreshed successfully');
            return true;
        }

        console.error('Token refresh failed: no access_token in response');
        return false;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
    }
};
```

---

## 5. Token Validation

### Utilities in `jwtUtils.js`

#### A. Check if Token is Valid
```jsx
export const isTokenValid = () => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return false;
        }
        
        const userInfo = decodeJWT(token);
        return !userInfo.isExpired;
    } catch (error) {
        console.error('Error checking token validity:', error);
        return false;
    }
};
```

#### B. Check if Token Needs Refresh
```jsx
export const needsTokenRefresh = () => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return false;
        }
        
        const userInfo = decodeJWT(token);
        if (userInfo.isExpired) {
            return true;
        }
        
        // Check if token expires within 5 minutes (300 seconds)
        const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000);
        const tokenExpiry = userInfo.exp * 1000;
        
        return tokenExpiry <= fiveMinutesFromNow;
    } catch (error) {
        console.error('Error checking token refresh need:', error);
        return false;
    }
};
```

---

## 6. Token Decoding

### Decode JWT Function

**File**: `src/utils/jwtUtils.js`

```jsx
import { jwtDecode } from 'jwt-decode';

export const decodeJWT = (token) => {
    try {
        if (!token) {
            throw new Error('No token provided');
        }
        
        const decoded = jwtDecode(token);
        console.log('Decoded JWT payload:', decoded);
        
        return {
            userId: decoded.user_id,
            roleId: decoded.role_id || null,
            email: decoded.email || null,
            iat: decoded.iat, // Issued at
            exp: decoded.exp, // Expiration time
            isExpired: decoded.exp ? Date.now() >= decoded.exp * 1000 : false,
            raw: decoded // Raw payload for debugging
        };
    } catch (error) {
        console.error('Error decoding JWT:', error);
        throw new Error('Invalid token format');
    }
};
```

**JWT Payload Structure**:
```json
{
    "user_id": 366,
    "role_id": 5,
    "email": "patient@example.com",
    "iat": 1761471808,  // Issued at
    "exp": 1761500608   // Expiration time
}
```

---

## 7. Token Cleanup

### Clearing Authentication Data

**File**: `src/utils/jwtUtils.js`

```jsx
export const clearAuthData = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('patient_Email');
    localStorage.removeItem('patient_suid');
    localStorage.removeItem('profile');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role_id');
    localStorage.removeItem('jwt_email');
    console.log('Authentication data cleared');
};
```

**When Clear Happens**:
1. On logout
2. On token refresh failure
3. On expired token
4. On unauthorized access (401)

---

## Security Considerations

### Current Implementation

✅ **Good Practices**:
1. Using `axiosInstance` for automatic token injection
2. Automatic token refresh before expiry
3. Automatic retry after token refresh
4. Token validation before use
5. Clearing sensitive data on logout

⚠️ **Security Concerns**:
1. **localStorage vs httpOnly Cookies**:
   - Current: Tokens stored in localStorage (vulnerable to XSS)
   - Recommended: Use httpOnly cookies (not accessible to JavaScript)

2. **XSS Vulnerability**:
   - Any malicious script can access `localStorage`
   - Solution: Use Content Security Policy (CSP) headers

3. **No Encryption**:
   - Tokens stored in plain text
   - Solution: Already handled by JWT's signature

### Recommendations

#### High Priority:
1. ✅ **Add CSP Headers** - Prevent XSS attacks
2. ✅ **Implement Rate Limiting** - Prevent brute force
3. ⚠️ **Consider httpOnly Cookies** - More secure token storage

#### Medium Priority:
1. Add CSRF tokens for state-changing operations
2. Implement session timeout
3. Add account lockout after failed attempts

#### Low Priority:
1. Add biometric authentication option
2. Add 2FA support
3. Add device fingerprinting

---

## Summary

### Token Lifecycle

1. **Login** → Receive token from backend
2. **Decode** → Extract user info from JWT
3. **Store** → Save in localStorage + cookies
4. **Use** → Automatically injected in API requests
5. **Refresh** → Auto-refresh before expiry
6. **Validate** → Check validity before use
7. **Cleanup** → Clear on logout/expiry

### Key Files

- **Login Flow**: `src/Auth/Login/LoginPatient/LoginPatient.js`
- **Token Storage**: `src/utils/jwtUtils.js`
- **API Config**: `src/config/axiosInstance.js`
- **Token Decoding**: `src/utils/jwtUtils.js` (decodeJWT function)

### Current Status

✅ **Token handling is working correctly**  
✅ **Automatic refresh implemented**  
✅ **Proper error handling in place**  
⚠️ **Security improvements recommended for production**

---

**Created**: 2024  
**Last Updated**: 2024  
**Status**: ✅ Implemented and Functional

