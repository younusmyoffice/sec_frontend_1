# Backend Error Response Handling in Frontend

## Overview

The frontend has a **multi-level error handling system** that catches and displays backend errors to users in a user-friendly way.

---

## 🎯 Error Handling Flow

```
Backend API Error
    ↓
Axios Interceptor (Global)
    ↓
Component Try-Catch (Local)
    ↓
Error Parsing & Logging
    ↓
User Notification (Snackbar/Toast)
```

---

## 📝 How Errors Are Handled

### **1. Global Level: Axios Interceptor**

**Location:** `src/config/axiosInstance.js`

**Purpose:** Handles authentication errors globally

```javascript
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // Success - pass through
    },
    async (error) => {
        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401) {
            // Try to refresh token
            const refreshSuccess = await refreshToken();
            if (refreshSuccess) {
                // Retry the original request
                return axiosInstance(error.config);
            } else {
                // Redirect to login
                clearAuthData();
                window.location.href = "/login";
            }
        }
        
        // Reject other errors
        return Promise.reject(error);
    },
);
```

**What it does:**
- ✅ Catches 401 (unauthorized) errors
- ✅ Attempts token refresh
- ✅ Redirects to login if refresh fails
- ✅ Rejects all other errors (passes to component)

---

### **2. Component Level: Try-Catch Block**

**Location:** `src/auth/Signup/SignupPage/SignupPage.js` (Lines 265-303)

**Purpose:** Handles API errors in the component

```javascript
const fetchData = async () => {
    try {
        // Show loading message
        setSnackbarState({
            open: true,
            message: "Please wait while we are Registering your Details!",
            type: "Info",
        });
        
        // Make API call
        const response = await axiosInstance.post(`${baseURL}/sec/auth/register`, JSON.stringify(data));
        
        // Success - show success message and navigate
        toastService.success("Registered successfully!");
        Cookies.set("email", data?.email);
        navigate("/emailVerification");
        
    } catch (error) {
        // Error handling
        logger.error("Registration error:", error);
        logger.error("Error status:", error?.response?.request?.status);
        
        // Extract error message
        const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
        
        // Show error in Snackbar
        setSnackbarState({
            open: true,
            message: errorMessage,
            type: "error",
        });
        
        // Also show Toast notification
        toastService.error(errorMessage);
    }
};
```

**What it does:**
- ✅ Catches API errors
- ✅ Extracts error message from response
- ✅ Logs error for debugging
- ✅ Shows error in Snackbar
- ✅ Shows error in Toast

---

## 🔍 Error Response Structure

### **Standard Backend Error Response:**

```json
{
  "message": "Error message from backend",
  "status": 400,
  "errors": {
    "email": "Email already exists",
    "mobile": "Mobile number is invalid"
  }
}
```

### **How Frontend Extracts It:**

```javascript
// Extract error message
const errorMessage = error.response?.data?.message || "Default error message";

// Status code
const statusCode = error?.response?.status; // 400, 401, 404, 500, etc.

// Full error data
const errorData = error.response?.data;

// Error details (if available)
const errors = error.response?.data?.errors;
```

---

## 🎨 User-Facing Components

### **1. CustomSnackBar (Material-UI)**

**Location:** `src/components/CustomSnackBar/custom-sack-bar.js`

**Usage:**
```javascript
<CustomSnackBar
    isOpen={snackbarState.open}
    message={snackbarState.message}
    hideDuration={4000}
    type={snackbarState.type} // "success", "error", "warning", "info"
/>
```

**Features:**
- ✅ Slide-in animation
- ✅ Auto-dismiss
- ✅ Close button
- ✅ Icons for each type
- ✅ Color-coded by severity

**Types:**
- `success` - Green checkmark
- `error` - Red X icon
- `warning` - Yellow warning icon
- `info` - Blue info icon

---

### **2. Toast Service (React-Toastify)**

**Location:** `src/services/toastService.js`

**Usage:**
```javascript
import toastService from '../../../services/toastService';

// Success
toastService.success("Operation successful!");

// Error
toastService.error("Something went wrong!");

// Warning
toastService.warn("Please check your input.");

// Info
toastService.info("Processing...");
```

**Features:**
- ✅ Toast notifications (top-right)
- ✅ Auto-dismiss
- ✅ Draggable
- ✅ Progress bar
- ✅ Click to dismiss

---

## 📊 Error Types & Handling

### **Status Code Handling:**

| Status Code | Error Type | Frontend Handling |
|------------|------------|-------------------|
| **200** | Success | Show success message |
| **400** | Bad Request | Show error message from API |
| **401** | Unauthorized | Try token refresh, redirect to login |
| **404** | Not Found | Show "Resource not found" |
| **500** | Server Error | Show "Server error, please try again" |
| **Network Error** | No Connection | Show "Network error, check internet" |

---

### **Example Error Handling in Code:**

```javascript
catch (error) {
    // 1. Log error for debugging
    logger.error("Registration error:", error);
    logger.error("Error status:", error?.response?.status);
    
    // 2. Extract error message
    const errorMessage = error.response?.data?.message || 
                        "Registration failed. Please try again.";
    
    // 3. Show error to user (Multiple ways)
    
    // A. Snackbar (Material-UI)
    setSnackbarState({
        open: true,
        message: errorMessage,
        type: "error",
    });
    
    // B. Toast notification (react-toastify)
    toastService.error(errorMessage);
    
    // C. Field-level errors (optional)
    if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
    }
}
```

---

## 🔧 Error Message Extraction

### **Priority Order:**

1. **`error.response.data.message`** - Backend error message
2. **`error.message`** - Axios error message
3. **Generic fallback** - "Operation failed. Please try again."

### **Code:**
```javascript
const errorMessage = error.response?.data?.message ||      // Backend message
                     error.message ||                      // Axios message
                     "Operation failed. Please try again."; // Fallback
```

---

## 🎯 Example Error Scenarios

### **Scenario 1: Email Already Exists**

**Backend Response:**
```json
{
  "message": "Email already registered",
  "status": 400
}
```

**Frontend Handling:**
```javascript
catch (error) {
    const errorMessage = error.response?.data?.message; // "Email already registered"
    setSnackbarState({
        open: true,
        message: errorMessage,
        type: "error",
    });
}
```

**User Sees:** Snackbar with "Email already registered" in red

---

### **Scenario 2: Invalid Mobile Number**

**Backend Response:**
```json
{
  "message": "Invalid mobile number format",
  "status": 400
}
```

**Frontend Handling:**
```javascript
catch (error) {
    toastService.error(error.response?.data?.message); // Toast notification
}
```

**User Sees:** Toast notification in top-right

---

### **Scenario 3: Server Error (500)**

**Backend Response:**
```json
{
  "message": "Internal server error",
  "status": 500
}
```

**Frontend Handling:**
```javascript
catch (error) {
    const errorMessage = error.response?.status === 500
        ? "Server error. Please try again later."
        : error.response?.data?.message;
    
    setSnackbarState({
        open: true,
        message: errorMessage,
        type: "error",
    });
}
```

**User Sees:** User-friendly error message instead of technical error

---

### **Scenario 4: Network Error**

**Frontend Handling:**
```javascript
catch (error) {
    if (!error.response) {
        // Network error or no response
        setSnackbarState({
            open: true,
            message: "Network error. Please check your internet connection.",
            type: "error",
        });
    }
}
```

**User Sees:** "Network error" message instead of technical error

---

## ✅ Best Practices

### **1. Always Extract Backend Message**
```javascript
const errorMessage = error.response?.data?.message || "Default message";
```

### **2. Log Errors for Debugging**
```javascript
logger.error("Error details:", error);
logger.error("Error status:", error?.response?.status);
```

### **3. Show User-Friendly Messages**
```javascript
const friendlyMessage = error.response?.status === 500
    ? "Server error. Please try again."
    : error.response?.data?.message;
```

### **4. Use Multiple Notification Methods**
```javascript
// Snackbar (persistent, visible)
setSnackbarState({...});

// Toast (quick notification)
toastService.error(errorMessage);
```

### **5. Handle Specific Error Types**
```javascript
if (error.response?.status === 401) {
    // Handle unauthorized
} else if (error.response?.status === 404) {
    // Handle not found
} else if (error.response?.status >= 500) {
    // Handle server errors
}
```

---

## 📋 Summary

✅ **Multi-level error handling**: Interceptor + Component + User notification  
✅ **Automatic token refresh**: 401 errors trigger refresh  
✅ **Multiple notification methods**: Snackbar + Toast  
✅ **User-friendly messages**: Extracted from backend  
✅ **Error logging**: For debugging purposes  
✅ **Graceful error handling**: Never crashes the UI

The frontend is **well-equipped** to handle backend error responses!

