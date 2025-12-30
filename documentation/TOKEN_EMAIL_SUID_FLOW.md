# Token, Email, and SUID Flow - LoginDiagnostic to ProfileDiagnosticComplete

## ✅ How It Works Now

### **Flow Overview**

```
LoginDiagnostic.js (Incomplete Profile) 
    ↓
Stores in localStorage:
- login_Email
- email
- diagnostic_suid
    ↓
Navigates to /diagnosticCompleteProfile
    ↓
ProfileDiagnosticComplete.js
    ↓
Reads from localStorage:
- diagnostic_suid
- login_Email OR diagnostic_Email OR email
    ↓
Sends to API with suid and email
```

---

## 📋 **Detailed Flow**

### **Step 1: LoginDiagnostic.js - Incomplete Profile (Lines 154-166)**

**What happens when user has incomplete profile:**

```javascript
if (resData?.body === "INCOMPLETE_PROFILE") {
    logger.info("Incomplete profile detected, stored diagnostic data:", resData.email, resData.suid);
    
    // Store diagnostic center data for incomplete profile
    localStorage.setItem("login_Email", resData.email);        // ✅ Email stored
    localStorage.setItem("email", resData.email);                // ✅ Email stored (duplicate)
    localStorage.setItem("diagnostic_suid", resData.suid);      // ✅ SUID stored
    
    toastService.info("Redirecting to complete your profile");
    navigate("/diagnosticCompleteProfile", { replace: true });  // ✅ Navigate to profile
}
```

**localStorage keys set:**
- `login_Email` = user's email
- `email` = user's email (duplicate)
- `diagnostic_suid` = diagnostic center unique ID

---

### **Step 2: ProfileDiagnosticComplete.js - Extract Data (Lines 178-220)**

**What happens in profile completion:**

```javascript
const handleSubmitProfile = async () => {
    // Extract diagnostic center unique ID (stored during login)
    const diagnosticSuid = localStorage.getItem("diagnostic_suid");
    
    // Extract email (try multiple sources for incomplete profile support)
    // 1. From JWT token (if available)
    // 2. From diagnostic_Email (complete profile)
    // 3. From login_Email (incomplete profile) ✅
    // 4. From email (fallback)
    const diagnosticEmail = userEmail || 
                           localStorage.getItem("diagnostic_Email") || 
                           localStorage.getItem("login_Email") ||      // ✅ Reads this for incomplete profiles!
                           localStorage.getItem("email");
    
    // Log extracted data for debugging
    logger.debug("=== PROFILE DATA EXTRACTION ===");
    logger.debug("diagnosticSuid:", diagnosticSuid);
    logger.debug("diagnosticEmail:", diagnosticEmail);
    logger.debug("userId:", userId);
    logger.debug("All localStorage keys:", Object.keys(localStorage));
    
    const finalData = {
        suid: diagnosticSuid,    // ✅ From login
        email: diagnosticEmail,   // ✅ From login (login_Email)
        user_id: userId,          // ✅ From JWT token
        role_id: 4,
        ...formData
    };
    
    // Send to API
    const response = await axiosInstance.post("/sec/auth/updateProfile", ...);
}
```

---

## 🎯 **Data Sources**

### **For Incomplete Profiles:**

**Stored by LoginDiagnostic.js:**
```javascript
localStorage.setItem("login_Email", resData.email);     // ✅ Primary source
localStorage.setItem("email", resData.email);           // ✅ Fallback
localStorage.setItem("diagnostic_suid", resData.suid);  // ✅ Primary source
```

**Read by ProfileDiagnosticComplete.js:**
```javascript
const diagnosticSuid = localStorage.getItem("diagnostic_suid");  // ✅ OK
const diagnosticEmail = localStorage.getItem("login_Email");     // ✅ OK
```

---

### **For Complete Profiles (Alternative Flow):**

**Stored during login (lines 196-198):**
```javascript
localStorage.setItem("diagnostic_suid", resData.suid);      // ✅ Primary source
localStorage.setItem("diagnostic_Email", resData.email);    // ✅ Primary source
```

**Read by ProfileDiagnosticComplete.js:**
```javascript
const diagnosticSuid = localStorage.getItem("diagnostic_suid");      // ✅ OK
const diagnosticEmail = localStorage.getItem("diagnostic_Email");    // ✅ OK
```

---

## 🔑 **Key Points**

### **1. Token Handling**
- Token is stored in `localStorage.setItem("access_token", ...)` during login
- Automatically added to all API requests via `axiosInstance`
- No need to manually pass token in `ProfileDiagnosticComplete`
- Works across entire application

### **2. Email Extraction Priority**
```javascript
// Priority order:
1. userEmail (from JWT token)              // Highest priority
2. diagnostic_Email (complete profile)      // Second priority
3. login_Email (incomplete profile)         // ✅ For incomplete profiles!
4. email (fallback)                         // Last resort
```

### **3. SUID Extraction**
```javascript
const diagnosticSuid = localStorage.getItem("diagnostic_suid");
// ✅ Always available (stored during login)
```

---

## 📊 **Data Flow Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│ LoginDiagnostic.js - Incomplete Profile                     │
│ ──────────────────────────────────────────────────────────── │
│ Backend Response:                                            │
│ {                                                           │
│   email: "user@example.com",                               │
│   suid: "abc123",                                          │
│   body: "INCOMPLETE_PROFILE"                              │
│ }                                                           │
│                                                             │
│ localStorage.setItem("login_Email", resData.email) ✅       │
│ localStorage.setItem("email", resData.email) ✅             │
│ localStorage.setItem("diagnostic_suid", resData.suid) ✅    │
│                                                             │
│ navigate("/diagnosticCompleteProfile") ✅                  │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ ProfileDiagnosticComplete.js                                │
│ ──────────────────────────────────────────────────────────── │
│ Extract Data:                                               │
│                                                             │
│ const diagnosticSuid =                                      │
│   localStorage.getItem("diagnostic_suid") ✅               │
│                                                             │
│ const diagnosticEmail =                                    │
│   localStorage.getItem("login_Email") ||                   │
│   localStorage.getItem("diagnostic_Email") ||              │
│   localStorage.getItem("email") ✅                          │
│                                                             │
│ Prepare Final Data:                                         │
│ const finalData = {                                        │
│   suid: diagnosticSuid,    // ✅ From login                 │
│   email: diagnosticEmail,   // ✅ From login                 │
│   user_id: userId,          // ✅ From JWT                  │
│   role_id: 4,                                               │
│   ...formData                                                │
│ }                                                           │
│                                                             │
│ Send to API:                                               │
│ axiosInstance.post("/sec/auth/updateProfile", finalData)   │
│                                                             │
│ // Token automatically added by axiosInstance ✅            │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ **Summary**

### **Question**: How are token, email, and suid passed from LoginDiagnostic to ProfileDiagnosticComplete?

### **Answer**:

1. **Token**: Automatically handled by `axiosInstance` - no manual passing needed
   - Stored in localStorage during login
   - Automatically added to all API requests

2. **Email**: Stored in localStorage by LoginDiagnostic, read by ProfileDiagnosticComplete
   - Key: `login_Email` (for incomplete profiles)
   - Multiple fallback sources available

3. **SUID**: Stored in localStorage by LoginDiagnostic, read by ProfileDiagnosticComplete
   - Key: `diagnostic_suid`
   - Always available after login

### **The Flow**:
1. LoginDiagnostic stores email and suid in localStorage
2. ProfileDiagnosticComplete reads from localStorage
3. No props needed - localStorage acts as bridge
4. Token is automatically included via axiosInstance

This is the **correct** and **secure** way to handle data between components!
