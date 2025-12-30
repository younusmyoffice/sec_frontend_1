# API Error Code Handling in SignupPage

## Issue

The frontend was not properly handling backend error responses in the format:
- `{"error":"MOBILE_EXISTS"}`
- `{"error":"EMAIL_EXISTS"}`

## Solution Implemented

Updated the error handling in `SignupPage.js` to handle both error formats:
1. `{"error":"CODE"}` - Error codes from backend
2. `{"message":"Description"}` - Error messages from backend

---

## Updated Error Handling Code

```javascript
catch (error) {
    logger.error("Registration error:", error);
    logger.error("Error status:", error?.response?.request?.status);
    logger.error("Error data:", error?.response?.data);
    
    // Handle different error response formats
    let errorMessage = "Registration failed. Please try again.";
    
    // Check for error field (e.g., {"error":"MOBILE_EXISTS"})
    if (error.response?.data?.error) {
        const errorCode = error.response.data.error;
        
        // Map error codes to user-friendly messages
        switch (errorCode) {
            case "MOBILE_EXISTS":
                errorMessage = "This mobile number is already registered...";
                break;
            case "EMAIL_EXISTS":
                errorMessage = "This email is already registered...";
                break;
            case "INVALID_MOBILE":
                errorMessage = "Invalid mobile number format...";
                break;
            case "INVALID_EMAIL":
                errorMessage = "Invalid email address...";
                break;
            case "WEAK_PASSWORD":
                errorMessage = "Password is too weak...";
                break;
            case "VALIDATION_ERROR":
                errorMessage = "Please check your input...";
                break;
            default:
                errorMessage = `Registration failed: ${errorCode}`;
        }
    }
    // Fallback to message field
    else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
    }
    
    // Show error to user
    setSnackbarState({
        open: true,
        message: errorMessage,
        type: "error",
    });
    
    toastService.error(errorMessage);
}
```

---

## Supported Error Codes

| Error Code | Backend Response | Frontend Message |
|------------|------------------|------------------|
| `MOBILE_EXISTS` | `{"error":"MOBILE_EXISTS"}` | "This mobile number is already registered. Please use a different number or sign in." |
| `EMAIL_EXISTS` | `{"error":"EMAIL_EXISTS"}` | "This email is already registered. Please use a different email or sign in." |
| `INVALID_MOBILE` | `{"error":"INVALID_MOBILE"}` | "Invalid mobile number format. Please enter a valid mobile number." |
| `INVALID_EMAIL` | `{"error":"INVALID_EMAIL"}` | "Invalid email address. Please enter a valid email." |
| `WEAK_PASSWORD` | `{"error":"WEAK_PASSWORD"}` | "Password is too weak. Please use a stronger password." |
| `VALIDATION_ERROR` | `{"error":"VALIDATION_ERROR"}` | "Please check your input and try again." |
| `UNKNOWN` | `{"error":"ANY_OTHER"}` | "Registration failed: ANY_OTHER" |

---

## Error Response Formats Supported

### Format 1: Error Code (Priority)
```json
{
  "error": "MOBILE_EXISTS"
}
```

### Format 2: Error Message (Fallback)
```json
{
  "message": "Email already exists"
}
```

### Format 3: Both (Priority: Error Code)
```json
{
  "error": "MOBILE_EXISTS",
  "message": "This mobile number is already registered"
}
```
**Frontend uses:** Error code → Mapped to user-friendly message

---

## How It Works

### **1. Backend Sends Error**

Backend API returns:
```json
{
  "error": "MOBILE_EXISTS"
}
```

### **2. Frontend Catches Error**

```javascript
catch (error) {
    if (error.response?.data?.error) {
        const errorCode = error.response.data.error; // "MOBILE_EXISTS"
    }
}
```

### **3. Maps to User-Friendly Message**

```javascript
switch (errorCode) {
    case "MOBILE_EXISTS":
        errorMessage = "This mobile number is already registered...";
        break;
}
```

### **4. Shows to User**

```javascript
setSnackbarState({
    open: true,
    message: errorMessage,
    type: "error",
});

toastService.error(errorMessage);
```

### **5. User Sees**

Red error message:
- "This mobile number is already registered. Please use a different number or sign in."

---

## Example Scenarios

### Scenario 1: Mobile Number Exists

**Backend:**
```json
{
  "error": "MOBILE_EXISTS"
}
```

**Frontend:**
```javascript
errorMessage = "This mobile number is already registered. Please use a different number or sign in.";
```

**User Sees:** Snackbar + Toast with friendly message

---

### Scenario 2: Email Exists

**Backend:**
```json
{
  "error": "EMAIL_EXISTS"
}
```

**Frontend:**
```javascript
errorMessage = "This email is already registered. Please use a different email or sign in.";
```

**User Sees:** Snackbar + Toast with friendly message

---

### Scenario 3: Generic Error Message

**Backend:**
```json
{
  "message": "Something went wrong"
}
```

**Frontend:**
```javascript
errorMessage = "Something went wrong"; // Uses message field
```

**User Sees:** Generic error message

---

### Scenario 4: Network Error

**Backend:** No response

**Frontend:**
```javascript
errorMessage = "Registration failed. Please try again."; // Default fallback
```

**User Sees:** Generic error message

---

## Priority Order

1. **`error.response.data.error`** - Error code (e.g., "MOBILE_EXISTS")
2. **`error.response.data.message`** - Error message (fallback)
3. **"Registration failed. Please try again."** - Default fallback

---

## Benefits

### ✅ **User-Friendly Messages**
- Instead of: "MOBILE_EXISTS"
- Shows: "This mobile number is already registered. Please use a different number or sign in."

### ✅ **Multiple Error Formats**
- Handles both `{"error":"CODE"}` and `{"message":"..."}` formats

### ✅ **Specific Guidance**
- Tells user exactly what's wrong
- Suggests what to do about it

### ✅ **Better UX**
- Users understand the problem
- Users know how to fix it

---

## Testing

### Test Cases:

1. ✅ **MOBILE_EXISTS** → Shows "Mobile number already registered"
2. ✅ **EMAIL_EXISTS** → Shows "Email already registered"
3. ✅ **INVALID_MOBILE** → Shows "Invalid mobile format"
4. ✅ **message field** → Shows the message
5. ✅ **No error data** → Shows generic error

---

## Summary

✅ **Handles both error formats** (`{"error":"CODE"}` and `{"message":"..."}`)  
✅ **Maps error codes to user-friendly messages**  
✅ **Provides clear guidance to users**  
✅ **Logs errors for debugging**  
✅ **Shows errors in Snackbar + Toast**

The frontend now properly handles backend error responses with error codes!

