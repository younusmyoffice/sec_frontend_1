# DoctorModule - Error Handling & Messaging Improvements Plan

## 📋 Overview
This document tracks the implementation of proper error handling, toast messages, and reusable loaders across the DoctorModule.

## ✅ **Completed Files**

### 1. **TermsAndCondition.js** ✅
- ✅ Added `logger` import
- ✅ Added `toastService` import
- ✅ Replaced `alert()` with `toastService.error()`
- ✅ Replaced `console.log()` with `logger` methods
- ✅ Improved error message extraction

### 2. **AddQuestioner.js** ✅
- ✅ Added `logger` import
- ✅ Added `toastService` import
- ✅ Replaced `alert()` with `toastService.error()`
- ✅ Replaced `console.log()` with `logger` methods
- ✅ Improved error message extraction

### 3. **DoctorListingDetails.js** ✅
- ✅ Added `logger` import
- ✅ Added `toastService` import
- ✅ Replaced `console.error()` with `logger.error()`
- ✅ Replaced `console.log()` with `logger` methods
- ✅ Added `toastService.success()` for success messages
- ✅ Improved error message extraction

## 🔄 **Pending Files**

### 4. **DoctorProfessionalInfo.js** ⏳
**Location:** `src/DoctorModule/DoctorProfile/DoctorProfessionalInfo/DoctorProfessionalInfo.js`

**Issues Found:**
- Uses `alert()` for error messages (lines 203, 218, 348, 353, 357, 425, 430, 434, 497, 502, 506)
- Uses `console.log()` instead of `logger`
- Missing `toastService` for user feedback

**Required Changes:**
```javascript
// Add imports
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";

// Replace alerts with toastService
// Before: alert("Fill the details properly", error);
// After: toastService.error("Please fill in all required fields");
```

---

### 5. **CustomRequestCard.js** ⏳
**Location:** `src/DoctorModule/CustomDoctorComponent/Cards/CustomRequestCard/CardRequest.js`

**Issues Found:**
- Uses `alert()` for success/error messages (lines 103, 110, 127, 134)
- Missing proper error handling
- Missing `toastService`

**Required Changes:**
```javascript
// Add imports
import logger from "../../../../utils/logger";
import toastService from "../../../../services/toastService";

// Replace alerts
// Before: alert(`Appointment ${response?.data?.response?.status || 'accepted successfully'}`);
// After: toastService.success(`Appointment accepted successfully`);
```

---

### 6. **CustomUpcomingCard.js** ⏳
**Location:** `src/DoctorModule/CustomDoctorComponent/Cards/CustomUpcomingCard/CustomUpcomingCard.js`

**Issues Found:**
- Uses `alert()` for messages (lines 103, 109)
- Missing `toastService`
- Missing `logger`

**Required Changes:**
- Add `logger` and `toastService` imports
- Replace `alert()` calls with `toastService`
- Add proper error logging

---

### 7. **Certifications.js** ⏳
**Location:** `src/DoctorModule/DoctorProfile/DoctorProfessionalInfo/Certifications.js`

**Issues Found:**
- Uses `alert()` for messages (lines 72, 75, 79)
- Uses `console.error()` instead of `logger`
- Missing `toastService`

**Required Changes:**
- Add `logger` and `toastService` imports
- Replace `alert()` and `console.error()` with proper error handling

---

### 8. **ListingDetails.js** ⏳
**Location:** `src/DoctorModule/DoctorListing/CreateNewListing/ListingDetails/ListingDetails.js`

**Issues Found:**
- Uses `alert()` for messages (lines 63, 73)
- Uses `console.log()` instead of `logger`
- Missing `toastService`

**Required Changes:**
- Add `logger` and `toastService` imports
- Replace `alert()` and `console.log()` with proper methods

---

## 📊 **Statistics**

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Completed | 3 | 37.5% |
| ⏳ Pending | 5 | 62.5% |
| **Total** | **8** | **100%** |

---

## 🔍 **Files Using Proper Implementation (Reference)**

These files already use `logger` and `toastService` correctly:
- ✅ `DoctorAppointmentDashboard.js`
- ✅ `DoctorChat.js`
- ✅ `DoctorActiveListing.js`
- ✅ `DoctorSavedDraft.js`
- ✅ `DoctorListingDetails.js` (now fixed)
- ✅ `TermsAndCondition.js` (now fixed)
- ✅ `AddQuestioner.js` (now fixed)

---

## 📝 **Implementation Pattern**

### **Standard Import Pattern:**
```javascript
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";
```

### **Error Handling Pattern:**
```javascript
try {
    const response = await axiosInstance.post('/api/endpoint', data);
    const successMessage = response?.data?.response?.message || "Operation successful!";
    logger.info("✅ Success:", successMessage);
    toastService.success(successMessage);
} catch (error) {
    logger.error("❌ Error:", error);
    logger.error("❌ Error response:", error?.response?.data);
    const errorMessage = 
        error?.response?.data?.message || 
        error?.response?.data?.error ||
        error?.message ||
        "An error occurred. Please try again.";
    toastService.error(errorMessage);
}
```

### **Debug Logging Pattern:**
```javascript
// Before
console.log("Loading data:", data);

// After
logger.debug("🔵 Loading data:", data);
```

---

## ✅ **Next Steps**

1. Fix `DoctorProfessionalInfo.js` - High priority (many alert calls)
2. Fix `CustomRequestCard.js` - Medium priority
3. Fix `CustomUpcomingCard.js` - Medium priority
4. Fix `Certifications.js` - Low priority
5. Fix `ListingDetails.js` - Low priority

---

## 📚 **Related Documentation**

- [Error & Messaging Documentation](../../ERROR_AND_MESSAGING_DOCUMENTATION.md)
- [Toast Service](../../services/toastService.js)
- [Logger Utility](../../utils/logger.js)

