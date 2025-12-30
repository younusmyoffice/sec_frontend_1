# Access Token Handling & Reusability in LoginClinic

## 🔑 **How Access Token is Handled**

### **1. Token Storage (LoginClinic.js)**

```javascript
// Token is stored in localStorage after successful login
localStorage.setItem("access_token", resData.access_token);
```

**Location in code:** Line 292

### **2. Automatic Token Addition (axiosInstance.js)**

**Location:** `src/config/axiosInstance.js`

The `axiosInstance` has a **request interceptor** that automatically:

1. **Reads token from localStorage BEFORE every API call**
   ```javascript
   const accessToken = localStorage.getItem("access_token");
   ```

2. **Adds token to Authorization header automatically**
   ```javascript
   config.headers.Authorization = `Bearer ${accessToken}`;
   ```

3. **Works for ALL HTTP methods**
   - GET requests
   - POST requests
   - PUT requests
   - DELETE requests
   - PATCH requests

### **3. Automatic Token Refresh**

The `axiosInstance` automatically handles token refresh:

- **Before request:** Checks if token needs refresh (< 5 minutes to expiry)
- **On 401 error:** Automatically attempts token refresh
- **If refresh succeeds:** Retries original request with new token
- **If refresh fails:** Clears auth data and redirects to login

---

## ✅ **Token is REUSABLE Throughout the Entire Application**

### **Why it's Reusable:**

1. **Centralized Authentication:**
   - Token is stored in ONE place: `localStorage.getItem("access_token")`
   - ONE interceptor handles ALL API requests
   - ONE file controls token logic: `src/config/axiosInstance.js`

2. **Automatic Token Management:**
   - NO manual token passing needed
   - NO manual token retrieval needed
   - Token is automatically added to EVERY request

3. **Works Across All Modules:**
   - Patient module
   - Doctor module
   - Clinic module
   - Diagnostic module
   - HCF Admin module
   - Super Admin module

---

## 📁 **Usage Examples in Any Component**

### **Example 1: Profile Update Component**

```javascript
// src/Auth/Login/ProfileClinicComplete/ProfileClinicComplete.js

import axiosInstance from '../../../config/axiosInstance';

const updateProfile = async () => {
    // ✅ Token automatically added from localStorage!
    // ✅ No manual token retrieval or passing needed!
    const response = await axiosInstance.post('/sec/auth/updateProfile', {
        email: email,
        firstName: firstName,
        // ... other data
    });
    return response;
};
```

### **Example 2: Dashboard Data Fetching**

```javascript
// src/ClinicModule/ClinicDashboard/ClinicDashboard.js

import axiosInstance from '../../config/axiosInstance';

const fetchDashboardData = async () => {
    // ✅ Token automatically added from localStorage!
    const response = await axiosInstance.get('/sec/clinic/dashboard');
    return response;
};
```

### **Example 3: Patient Appointment Booking**

```javascript
// src/PatientModule/Appointments/BookAppointment.js

import axiosInstance from '../../../config/axiosInstance';

const bookAppointment = async (appointmentData) => {
    // ✅ Token automatically added from localStorage!
    const response = await axiosInstance.post('/sec/patient/bookAppointment', appointmentData);
    return response;
};
```

### **Example 4: Doctor Prescription Writing**

```javascript
// src/DoctorModule/Prescriptions/WritePrescription.js

import axiosInstance from '../../../config/axiosInstance';

const writePrescription = async (prescriptionData) => {
    // ✅ Token automatically added from localStorage!
    const response = await axiosInstance.post('/sec/doctor/writePrescription', prescriptionData);
    return response;
};
```

---

## 🔒 **Security Benefits**

### **1. No Tokens in URL Parameters**
```javascript
// ❌ BAD: Token exposed in URL
GET /api/users?token=eyJhbGci...

// ✅ GOOD: Token in Authorization header
GET /api/users
Authorization: Bearer eyJhbGci...
```

### **2. No Tokens in Cookies**
- Reduces CSRF attack surface
- Cookies can be accessed by malicious scripts
- localStorage is same-origin only

### **3. Automatic Refresh**
- Prevents user from being logged out unexpectedly
- Seamless authentication experience
- No manual token management needed

### **4. Centralized Management**
- ONE file to update: `src/config/axiosInstance.js`
- Consistent security across entire application
- Easy to add new security features (e.g., rate limiting, token rotation)

---

## 🚀 **How to Use in Any Component**

### **Step 1: Import axiosInstance**
```javascript
import axiosInstance from '../../config/axiosInstance';
// Adjust path relative to your component location
```

### **Step 2: Make API Call**
```javascript
const fetchData = async () => {
    // Token automatically added - just make the request!
    const response = await axiosInstance.get('/api/endpoint');
    
    // OR for POST requests:
    const response = await axiosInstance.post('/api/endpoint', data);
    
    // OR for any HTTP method:
    const response = await axiosInstance.put('/api/endpoint', data);
    const response = await axiosInstance.delete('/api/endpoint');
    const response = await axiosInstance.patch('/api/endpoint', data);
    
    return response;
};
```

### **Step 3: Handle Response**
```javascript
const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/api/endpoint');
        return response.data;
    } catch (error) {
        // Error handling (401 automatically handled by interceptor)
        console.error('API call failed:', error);
    }
};
```

---

## 📋 **Token Flow Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│                     LoginClinic Component                   │
│                                                             │
│  User logs in → API call → Response with access_token      │
│                        ↓                                    │
│  localStorage.setItem("access_token", token)                │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                 axiosInstance (Interceptor)                  │
│                                                             │
│  ANY component makes API call                              │
│                        ↓                                    │
│  1. Read token from localStorage                            │
│  2. Add to Authorization header: "Bearer <token>"          │
│  3. Make request with authentication                       │
│                        ↓                                    │
│  Request sent with automatic authentication                  │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend Server                           │
│                                                             │
│  Receives request with Authorization header                │
│  Validates token → Returns data                            │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ **Summary**

### **Token Handling:**
1. ✅ Stored in localStorage after login
2. ✅ Automatically read by axiosInstance before every API call
3. ✅ Automatically added to Authorization header
4. ✅ Automatically refreshed on expiration

### **Reusability:**
1. ✅ Works across ALL components
2. ✅ Works across ALL modules (Patient, Doctor, Clinic, Diagnostic, Admin)
3. ✅ Works for ALL HTTP methods (GET, POST, PUT, DELETE, PATCH)
4. ✅ NO manual token passing needed

### **Security:**
1. ✅ No tokens in URL parameters
2. ✅ No tokens in cookies
3. ✅ Automatic refresh prevents unexpected logouts
4. ✅ Centralized management reduces vulnerabilities

### **Usage:**
```javascript
// In ANY component:
import axiosInstance from '../../config/axiosInstance';

const response = await axiosInstance.get('/api/endpoint');
// ✅ Token automatically added!
```

---

## 🎯 **Result**

The access token stored in LoginClinic is **REUSABLE** across the **ENTIRE application**:
- One token stored
- One interceptor manages it
- Automatically added to ALL API requests
- Works in ALL components
- Secure and centralized
