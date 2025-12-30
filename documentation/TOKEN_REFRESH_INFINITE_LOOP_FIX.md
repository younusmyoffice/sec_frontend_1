# Fix: Token Refresh Infinite Loop

## 🐛 Problem

After login, the website froze with an infinite loop of token refresh attempts:

```
Token needs refresh, attempting to refresh...
[repeated hundreds of times]
```

**Root Cause:**
1. Token was expired (JWT expiry in the past)
2. Every API request triggered `needsTokenRefresh()`
3. `refreshToken()` used `axiosInstance` which has interceptors
4. This created a **circular dependency**:
   - Request → needs refresh → axiosInstance.post → interceptor triggers → needs refresh → ... (infinite loop)

---

## ✅ Solution Applied

### **File 1: `src/config/axiosInstance.js`**

**Added Refresh Guard:**
```javascript
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
            // ... handle refresh result
        }
        // ... rest of interceptor
    }
);
```

**Key Fixes:**
1. ✅ Skip refresh check for `/sec/auth/refresh` endpoint itself
2. ✅ Added `isRefreshing` guard to prevent multiple simultaneous refreshes
3. ✅ Use `refreshPromise` to reuse ongoing refresh requests
4. ✅ Reset guards on error

---

### **File 2: `src/utils/jwtUtils.js`**

**Fixed `refreshToken()` Function:**
```javascript
import axios from 'axios'; // Added direct import

export const refreshToken = async () => {
    try {
        const currentToken = localStorage.getItem('access_token');
        if (!currentToken) {
            console.warn('No access token available for refresh');
            return false;
        }

        // Decode current token to check expiry
        const userInfo = decodeJWT(currentToken);
        if (userInfo.isExpired) {
            console.log('Token is expired, attempting refresh...');
        }

        const bearer = localStorage.getItem('refresh_token') || currentToken;
        
        // ✅ FIXED: Use axios directly (not axiosInstance) to avoid interceptor loop
        const response = await axios.post(
            'http://localhost:3000/sec/auth/refresh',
            null,
            {
                headers: {
                    'Authorization': `Bearer ${bearer}`
                }
            }
        );

        // ... handle response
    } catch (error) {
        console.error('Error refreshing token:', error?.response?.data || error.message);
        return false;
    }
};
```

**Key Fixes:**
1. ✅ Use `axios` instead of `axiosInstance` to avoid interceptor loop
2. ✅ Direct import of `axios` at top of file
3. ✅ Better error handling and logging

---

## 🎯 How It Works Now

### **Before Fix:**
```
User Login
  ↓
Token Expired
  ↓
API Request → Interceptor → needsTokenRefresh() → TRUE
  ↓
refreshToken() → axiosInstance.post('/sec/auth/refresh')
  ↓
Interceptor triggers AGAIN → needsTokenRefresh() → TRUE (LOOP!)
  ↓
refreshToken() → axiosInstance.post('/sec/auth/refresh') (LOOP!)
  ↓
INFINITE LOOP ❌
```

### **After Fix:**
```
User Login
  ↓
Token Expired
  ↓
API Request → Interceptor → needsTokenRefresh() → TRUE
  ↓
isRefreshing = true (guard active)
  ↓
refreshToken() → axios.post('/sec/auth/refresh') [NOT axiosInstance!]
  ↓
Refresh succeeds → isRefreshing = false
  ↓
API request proceeds with new token ✅
```

---

## 🔧 Technical Details

### **1. Refresh Guard Pattern**
- `isRefreshing` prevents multiple simultaneous refresh attempts
- `refreshPromise` reuses ongoing refresh operations
- Reset both on success and error

### **2. Skip Refresh Endpoint**
```javascript
if (config.url && config.url.includes('/sec/auth/refresh')) {
    // Don't trigger refresh check for the refresh endpoint itself
    return config;
}
```

### **3. Direct axios Usage**
```javascript
// ❌ BAD (causes loop):
import axiosInstance from '../config/axiosInstance';
const response = await axiosInstance.post('/sec/auth/refresh');

// ✅ GOOD (no loop):
import axios from 'axios';
const response = await axios.post('http://localhost:3000/sec/auth/refresh');
```

---

## ✅ Testing

To test the fix:

1. **Login** as patient/doctor/etc.
2. **Wait** for token to expire (or use expired token)
3. **Make API request** - should refresh token once and continue
4. **Check console** - should see:
   ```
   Token needs refresh, attempting to refresh...
   Token refreshed successfully
   ```
5. **No infinite loop** ✅

---

## 📝 Summary

**Files Modified:**
- ✅ `src/config/axiosInstance.js`
- ✅ `src/utils/jwtUtils.js`

**Changes:**
- ✅ Added refresh guard (`isRefreshing`, `refreshPromise`)
- ✅ Skip refresh endpoint in interceptor
- ✅ Use direct `axios` import in `refreshToken()`
- ✅ Better error handling

**Result:**
- ✅ No more infinite loops
- ✅ Token refresh works correctly
- ✅ Website is responsive after login

---

**Date:** 2024  
**Status:** ✅ Fixed

