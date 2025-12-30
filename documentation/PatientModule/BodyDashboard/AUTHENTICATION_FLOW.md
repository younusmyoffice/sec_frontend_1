# Authentication Flow & Token Handling in AppRouter.js

## 🔐 **How Authentication Works When User is Logged In**

---

## 📊 **Authentication Flow Diagram**

```
Login Success
    ↓
Token Stored in localStorage
    ↓
UserProvider Context Updated
    ↓
Protected Routes Check Auth
    ↓
┌─────────────────────────────────────┐
│ 1. Check Cookie (patientEmail)     │
│ 2. Check Context (Authentication)   │
│ 3. Check Token Validity (JWT)      │
└─────────────────────────────────────┘
    ↓
If ALL pass → Render Component
If ANY fail → Redirect to Login
```

---

## 🔑 **How Token is Passed (Automatic via axiosInstance)**

### **1. Token Storage (After Login)**

**Location:** Login components (e.g., `LoginPatient.js`)

```javascript
// After successful login
localStorage.setItem("access_token", resData.access_token);
Cookies.set("patientEmail", resData.email, { expires: 7 });
```

### **2. Automatic Token Injection**

**Location:** `src/config/axiosInstance.js`

The `axiosInstance` has a **request interceptor** that automatically adds the token to EVERY API request:

```javascript
axiosInstance.interceptors.request.use(
    async (config) => {
        // Get token from localStorage
        const accessToken = localStorage.getItem("access_token");
        
        // Add token to Authorization header if present
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            console.log("JWT token added to request headers");
        }
        
        return config;
    }
);
```

### **3. Automatic Token Refresh**

**Before Expiry (Proactive):**

```javascript
// Checks if token expires in < 5 minutes
if (needsTokenRefresh()) {
    const refreshSuccess = await refreshToken();
    if (!refreshSuccess) {
        clearAuthData(); // Clear localStorage
        window.location.href = "/login"; // Redirect to login
    }
}
```

**On 401 Error (Reactive):**

```javascript
axiosInstance.interceptors.response.use(
    async (error) => {
        if (error.response?.status === 401) {
            // Try to refresh token
            const refreshSuccess = await refreshToken();
            if (refreshSuccess) {
                // Retry original request
                return axiosInstance(originalRequest);
            } else {
                // Clear auth data and redirect
                clearAuthData();
                window.location.href = "/login";
            }
        }
    }
);
```

---

## 🛡️ **How Protected Routes Work**

### **Authentication Guards**

**Location:** `src/loginComponent/RequireAuthentication.js`

```javascript
export const PatientAuthentication = ({ children }) => {
    const Authentication = useAuthentication(); // From UserProvider
    const location = useLocation();
    const hasValidToken = isTokenValid(); // From jwtUtils
    
    // Three-factor authentication check:
    // 1. Check for cookie (patientEmail)
    // 2. Check for context state (Authentication.patient)
    // 3. Check for valid JWT token (hasValidToken)
    if (!Cookies.get("patientEmail") && !Authentication.patient && !hasValidToken) {
        // If ALL fail → Redirect to login
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    
    // If ANY pass → Render component
    return children;
};
```

### **Three-Factor Authentication Check:**

1. ✅ **Cookie** (`Cookies.get("patientEmail")`)
2. ✅ **Context** (`Authentication.patient`)
3. ✅ **JWT Token** (`hasValidToken`)

**Logic:** If any of these exist AND are valid, allow access. If ALL are missing/invalid, redirect to login.

---

## 🚪 **Automatic Logout Scenarios**

### **1. Token Expires in Browser Storage**

**Location:** `src/utils/jwtUtils.js`

```javascript
export const getCurrentUser = () => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    
    const userInfo = decodeJWT(token);
    
    if (userInfo.isExpired) {
        console.warn('Token has expired');
        // Clear expired token
        localStorage.removeItem('access_token');
        localStorage.removeItem('patient_Email');
        localStorage.removeItem('patient_suid');
        localStorage.removeItem('profile');
        return null;
    }
    
    return userInfo;
};
```

**Result:** `isTokenValid()` returns `false` → Authentication guard redirects to login

### **2. Token Manually Removed from Browser Storage**

**Scenario:** User clears localStorage (`localStorage.clear()`)

**Result:** 
- `localStorage.getItem('access_token')` returns `null`
- All three auth checks fail
- User redirected to login

### **3. API Returns 401 Unauthorized**

**Location:** `src/config/axiosInstance.js` (Response Interceptor)

```javascript
if (error.response?.status === 401) {
    // Try to refresh token first
    const refreshSuccess = await refreshToken();
    
    if (!refreshSuccess) {
        // If refresh fails:
        clearAuthData(); // Clear ALL auth data
        window.location.href = "/login"; // Redirect to login
    }
}
```

**Result:** 
- Token refresh attempted
- If refresh fails → Auth cleared → Redirect to login
- If refresh succeeds → Request retried

### **4. Token Nears Expiry (< 5 minutes)**

**Location:** `src/config/axiosInstance.js` (Request Interceptor)

```javascript
if (needsTokenRefresh()) {
    const refreshSuccess = await refreshToken();
    if (!refreshSuccess) {
        clearAuthData();
        window.location.href = "/login";
    }
}
```

**Result:**
- Proactive token refresh before expiry
- If refresh fails → User logged out immediately
- If refresh succeeds → User continues with new token

---

## 🔄 **How User Stays Logged In**

### **Token Persistence**

1. **localStorage** - Stores `access_token` (persists across browser sessions)
2. **Cookies** - Stores email (e.g., `patientEmail`) with 7-day expiry
3. **Context** - `UserProvider` maintains authentication state in memory

### **Automatic Token Refresh**

Tokens are automatically refreshed:
- **Before expiry** (5 minutes before)
- **On 401 errors** (token expired on server)
- **On each request** (checks `needsTokenRefresh()`)

### **Seamless User Experience**

- User doesn't need to manually log in again
- Token refresh happens transparently
- Only redirects to login if refresh fails

---

## 📝 **Complete Flow Example**

### **Login Flow:**

```
1. User logs in via LoginPatient.js
   ↓
2. Token stored: localStorage.setItem("access_token", token)
   ↓
3. Cookie set: Cookies.set("patientEmail", email)
   ↓
4. Context updated: PatientLogin(email) → UserProvider
   ↓
5. User navigates to /patientDashboard
   ↓
6. PatientAuthentication guard checks:
   - Cookie exists? ✅
   - Context exists? ✅
   - Token valid? ✅
   ↓
7. Access granted → BodyDashboard renders
```

### **Token Refresh Flow:**

```
1. User is on /patientDashboard
   ↓
2. User clicks on appointment (triggers API call)
   ↓
3. axiosInstance checks token expiry
   ↓
4. If expires in < 5 minutes → Call /sec/auth/refresh
   ↓
5. Backend returns new access_token
   ↓
6. Update localStorage with new token
   ↓
7. Continue with original request
```

### **Automatic Logout Flow:**

```
1. Token expires in localStorage
   ↓
2. Next API call sends expired token
   ↓
3. Backend returns 401 Unauthorized
   ↓
4. axiosInstance catches 401 error
   ↓
5. Attempts token refresh
   ↓
6. Refresh fails (token too old / no refresh_token)
   ↓
7. clearAuthData() called
   ↓
8. localStorage cleared
   ↓
9. window.location.href = "/login"
```

---

## ✅ **Summary**

### **How Token is Passed:**
- ✅ Automatically via `axiosInstance` request interceptor
- ✅ Added to `Authorization: Bearer <token>` header
- ✅ Works for ALL API calls (GET, POST, PUT, DELETE, etc.)

### **How User Stays Logged In:**
- ✅ Token persists in localStorage
- ✅ Cookie persists with 7-day expiry
- ✅ Context maintains state
- ✅ Automatic token refresh (< 5 minutes before expiry)
- ✅ Automatic retry on 401 errors

### **When User Gets Logged Out:**
- ✅ Token expires AND refresh fails
- ✅ User manually clears localStorage
- ✅ Backend rejects token (invalid/revoked)
- ✅ User closes browser AND cookie expires

### **Token Reusability:**
- ✅ SAME token used for ALL API calls
- ✅ ONE interceptor handles ALL requests
- ✅ Works across ALL modules (Patient, Doctor, HCF, etc.)
- ✅ NO manual token passing needed

---

**Date:** 2024  
**Files Referenced:**
- `src/AppRouter.js`
- `src/config/axiosInstance.js`
- `src/loginComponent/RequireAuthentication.js`
- `src/utils/jwtUtils.js`
- `src/loginComponent/UserProvider.js`

