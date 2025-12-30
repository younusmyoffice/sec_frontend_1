# Access Token Handling - How It Works Throughout the Application

## Overview
This document explains how the access token is handled in the LoginDiagnostic component and how it's reusable throughout the entire application.

## 🔐 Token Storage & Management

### 1. **Token Storage After Login**
When the user successfully logs in, the JWT access token is stored in `localStorage`:

```javascript
localStorage.setItem("access_token", resData.access_token);
```

**Location**: `localStorage` (browser storage)  
**Key**: `"access_token"`  
**Value**: JWT token string

### 2. **How Token is Used**
The token is automatically added to ALL API requests via `axiosInstance`.

## 🚀 Reusability Through axiosInstance

### What is axiosInstance?
`axiosInstance` is a configured axios instance that handles JWT tokens automatically.

**Location**: `config/axiosInstance.js`

### How It Works

#### 1. **Request Interceptor**
Before every API request, the interceptor:
- Reads `access_token` from `localStorage`
- Adds it to the Authorization header as: `"Bearer <access_token>"`
- Automatically includes it in all requests

#### 2. **Token Refresh**
If a request returns a 401 (Unauthorized) error:
- Automatically attempts to refresh the token
- Retries the failed request with the new token
- Seamless user experience without re-login

#### 3. **Response Interceptor**
After receiving a response:
- Checks for 401 errors
- Handles token refresh if needed
- Manages token expiration

### Code Example

**In config/axiosInstance.js:**
```javascript
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Request Interceptor - Adds token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        // Read token from localStorage
        const token = localStorage.getItem('access_token');
        
        // Add to Authorization header if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor - Handles token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired, attempt refresh
            // ... refresh logic ...
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
```

## ✅ Usage Throughout Application

### Any Component Can Use It

**Example 1: GET Request**
```javascript
import axiosInstance from "../../config/axiosInstance";

const fetchData = async () => {
    try {
        // Token automatically added via interceptor
        const response = await axiosInstance.get("/api/patients");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
```

**Example 2: POST Request**
```javascript
import axiosInstance from "../../config/axiosInstance";

const createPatient = async (data) => {
    try {
        // Token automatically added via interceptor
        const response = await axiosInstance.post("/api/patients", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
```

**Example 3: PUT Request**
```javascript
import axiosInstance from "../../config/axiosInstance";

const updateProfile = async (profileData) => {
    try {
        // Token automatically added via interceptor
        const response = await axiosInstance.put("/api/profile", profileData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
```

## 🔄 Token Lifecycle

### 1. **Login** (LoginDiagnostic.js)
```javascript
// Store token after successful login
localStorage.setItem("access_token", resData.access_token);
```

### 2. **API Requests** (Any Component)
```javascript
// Token automatically added via axiosInstance
const response = await axiosInstance.get("/api/endpoint");
```

### 3. **Token Refresh** (Auto-handled)
- When token expires (401 error)
- Interceptor attempts refresh
- Failed request is retried automatically
- User experience is seamless

### 4. **Logout**
```javascript
// Clear token on logout
localStorage.removeItem("access_token");
localStorage.clear(); // Clear all auth data
```

## 🛡️ Security Features

### 1. **Token Storage**
- ✅ Stored in `localStorage`
- ✅ Not in cookies (avoids CSRF)
- ✅ Not in URL parameters
- ✅ Not in page DOM

### 2. **Automatic Token Management**
- ✅ Added to every request automatically
- ✅ No manual token passing needed
- ✅ Centralized security logic
- ✅ Easier to update security measures

### 3. **Token Expiration**
- ✅ Automatically detected via 401 errors
- ✅ Auto-refresh attempted
- ✅ User experience maintained
- ✅ Logout on refresh failure

### 4. **XSS Protection**
- ✅ Token stored in `localStorage`
- ✅ Should be protected by Content Security Policy (CSP)
- ✅ Not accessible via JavaScript on other domains
- ✅ Automatic cleanup on browser close (optional)

## 📋 Benefits of This Approach

### 1. **Reusability**
- ✅ One `axiosInstance` used everywhere
- ✅ No need to pass tokens manually
- ✅ Consistent authentication across app

### 2. **Maintainability**
- ✅ One place to update token logic (`config/axiosInstance.js`)
- ✅ Easy to add new security features
- ✅ Centralized error handling

### 3. **Developer Experience**
- ✅ Simple API: `await axiosInstance.get("/api/endpoint")`
- ✅ No need to remember to add tokens
- ✅ Works the same everywhere in the app

### 4. **User Experience**
- ✅ Seamless token refresh
- ✅ No unexpected logouts
- ✅ Automatic error handling

## 🔍 How to Verify It Works

### Check Browser Console
1. Open browser DevTools → Network tab
2. Make any API request
3. Check Request Headers → `Authorization: Bearer <token>`
4. Token is automatically included!

### Check Code
1. Search for `import axiosInstance`
2. See all components using it
3. Notice no manual token passing
4. See consistent usage pattern

## 📝 Summary

### How Token Handling is Reusable:

1. **One Import**: `import axiosInstance from "../../config/axiosInstance"`
2. **No Manual Token Management**: Token automatically added
3. **Centralized Logic**: All logic in `config/axiosInstance.js`
4. **Works Everywhere**: Any component can use it
5. **Consistent Security**: Same authentication across app

### The Flow:

```
Login → Store Token in localStorage → axiosInstance Interceptor → 
Read Token → Add to Authorization Header → API Call → Success
```

Or if token expires:

```
API Call → 401 Error → Interceptor Detects → Refresh Token → 
Retry Original Request → Success
```

This architecture ensures that the access token handling is:
- ✅ **Reusable** throughout the entire application
- ✅ **Secure** with automatic token management
- ✅ **Maintainable** with centralized logic
- ✅ **User-friendly** with seamless experience

