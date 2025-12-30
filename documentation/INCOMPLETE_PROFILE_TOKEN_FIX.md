# Incomplete Profile Token Fix - LoginDiagnostic.js

## ✅ Problem Fixed

The login response for incomplete profile returns an `access_token`, but it was **not being stored** in localStorage. This caused `USER_NOT_EXISTS` error in ProfileDiagnosticComplete because the API requires authentication.

## 🔧 Solution Implemented

### **Lines 160-190 in LoginDiagnostic.js**

Now stores ALL required data when profile is incomplete:

```javascript
if (resData?.body === "INCOMPLETE_PROFILE") {
    // Store JWT access token (CRITICAL - required for profile completion API)
    localStorage.setItem("access_token", resData.access_token);  // ✅ NOW STORED!
    
    // Store diagnostic center data for incomplete profile
    localStorage.setItem("login_Email", resData.email);
    localStorage.setItem("email", resData.email);
    localStorage.setItem("diagnostic_Email", resData.email);
    localStorage.setItem("diagnostic_suid", resData.suid);
    
    // Store JWT decoded information if available
    if (resData.access_token) {
        const userInfo = decodeJWT(resData.access_token);
        if (userInfo) {
            localStorage.setItem("user_id", userInfo.userId);
            localStorage.setItem("role_id", userInfo.roleId || "4");
            localStorage.setItem("jwt_email", userInfo.email || resData.email);
        }
    }
    
    // Store additional response data for profile completion
    localStorage.setItem("profile_picture", resData.profile_picture);
    localStorage.setItem("contact_no_primary", resData.contact_no_primary);
    
    // Debug logging
    logger.info("Stored data for incomplete profile:");
    logger.info("  - access_token:", resData.access_token ? "present" : "missing");
    logger.info("  - email:", resData.email);
    logger.info("  - suid:", resData.suid);
    logger.info("  - role_id:", resData.role_id);
    
    navigate("/diagnosticCompleteProfile", { replace: true });
}
```

## 📊 Backend Response Structure

When login detects incomplete profile, backend returns:

```json
{
    "response": {
        "statusCode": 202,
        "body": "INCOMPLETE_PROFILE",
        "data": {
            "suid": 429,
            "role_id": 4,
            "email": "younus@t57.a67",
            "access_token": "eyJhbGci...",
            "profile_picture": "...",
            "contact_no_primary": "8978798226",
            ...
        }
    }
}
```

## ✅ What's Now Stored in localStorage

After the fix, when incomplete profile is detected:

```javascript
localStorage.setItem("access_token", resData.access_token);           // ✅ Token
localStorage.setItem("login_Email", resData.email);                   // ✅ Email
localStorage.setItem("email", resData.email);                         // ✅ Email (duplicate)
localStorage.setItem("diagnostic_Email", resData.email);              // ✅ Email (for consistency)
localStorage.setItem("diagnostic_suid", resData.suid);                // ✅ SUID (429)
localStorage.setItem("user_id", userInfo.userId);                     // ✅ From JWT
localStorage.setItem("role_id", userInfo.roleId || "4");              // ✅ Role ID
localStorage.setItem("jwt_email", userInfo.email);                    // ✅ From JWT
localStorage.setItem("profile_picture", resData.profile_picture);     // ✅ Profile picture
localStorage.setItem("contact_no_primary", resData.contact_no_primary); // ✅ Phone
```

## 🎯 How It Works Now

### **Step 1: LoginDetects Incomplete Profile**

```javascript
// Backend returns: { body: "INCOMPLETE_PROFILE", data: { suid, email, access_token, ... } }
localStorage.setItem("access_token", "...");  // ✅ NOW STORED
localStorage.setItem("diagnostic_suid", "429");
localStorage.setItem("email", "younus@t57.a67");
navigate("/diagnosticCompleteProfile");
```

### **Step 2: ProfileDiagnosticComplete Reads Data**

```javascript
const diagnosticSuid = localStorage.getItem("diagnostic_suid");  // "429"
const diagnosticEmail = localStorage.getItem("email");           // "younus@t57.a67"
const finalData = {
    suid: diagnosticSuid,     // "429"
    email: diagnosticEmail,   // "younus@t57.a67"
    role_id: 4,
    ...formData
};

// axiosInstance automatically adds token to Authorization header
axiosInstance.post("/sec/auth/updateProfile", finalData);  // ✅ Token included!
```

### **Step 3: API Call Includes Token**

```javascript
// axiosInstance automatically adds:
headers: {
    Authorization: "Bearer eyJhbGci..."
}
```

## ✅ Result

- ✅ Token is stored when profile is incomplete
- ✅ Token is automatically included in API requests via axiosInstance
- ✅ Email and suid are stored and used
- ✅ Profile completion API receives authenticated request
- ✅ No more `USER_NOT_EXISTS` error

## 🐛 Before vs After

### **Before (Bug)**
```javascript
// Token was NOT stored
localStorage.setItem("diagnostic_suid", resData.suid);
localStorage.setItem("email", resData.email);
// access_token was ignored ❌

// Result: API call failed with USER_NOT_EXISTS
```

### **After (Fixed)**
```javascript
// Token IS stored
localStorage.setItem("access_token", resData.access_token);  // ✅
localStorage.setItem("diagnostic_suid", resData.suid);
localStorage.setItem("email", resData.email);

// Result: API call succeeds with authentication ✅
```

This fix ensures the profile completion flow works correctly for users with incomplete profiles!
