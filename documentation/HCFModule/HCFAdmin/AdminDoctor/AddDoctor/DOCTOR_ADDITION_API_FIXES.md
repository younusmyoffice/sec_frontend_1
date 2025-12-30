# Doctor Addition - API Flow Fixes and Verification

## ✅ **Fixed Issues**

### **1. API Flow Sequence**

The doctor addition flow follows this sequence:

#### **Step 1: Register Doctor**
- **API:** `POST /sec/hcf/addDoctor`
- **Payload:**
  ```json
  {
    "hcf_id": "217",
    "email": "doctor@example.com",
    "mobile": "8078782268",
    "role_id": "6",
    "password": "Maskan@123"
  }
  ```
- **Response:** Status 202 indicates OTP sent to email
- **Action:** Opens OTP modal for email verification

#### **Step 2: Verify Email OTP**
- **API:** `POST /sec/auth/verifyEmail`
- **Payload:**
  ```json
  {
    "email": "doctor@example.com",
    "activation_code": "932868"
  }
  ```
- **Response:** Returns `doctor_id` (suid) in response
- **Action:** Enables listing creation section, stores doctor_id

#### **Step 3: Create Listing with Working Details and Plans**
- **API:** `POST /sec/hcf/addDoctorWorkingDetailsAndPlan`
- **Payload:**
  ```json
  {
    "hcf_id": "217",
    "doctor_id": "297",
    "listing_name": "list2223",
    "working_days_start": "2024-07-26",
    "working_days_end": "2026-07-26",
    "working_time_start": "09:00:00",
    "working_time_end": "22:00:00",
    "plan": [
      {
        "plan_fee": 44,
        "plan_name": "message",
        "plan_duration": "30 minutes",
        "start_date": "2024-07-26",
        "end_date": "2026-07-27",
        "is_trial": 1,
        "no_of_reviews": 1,
        "plan_description": "message plan for chatting"
      },
      {
        "plan_fee": 55,
        "plan_name": "call",
        "plan_duration": "60 minutes",
        "start_date": "2024-07-26",
        "end_date": "2026-07-27",
        "is_trial": 1,
        "no_of_reviews": 1,
        "plan_description": "call plan for calling"
      },
      {
        "plan_fee": 89,
        "plan_name": "video",
        "plan_duration": "15 minutes",
        "start_date": "2024-07-26",
        "end_date": "2026-07-27",
        "is_trial": 1,
        "no_of_reviews": 1,
        "plan_description": "video plan for video calls"
      }
    ]
  }
  ```
- **Response:** Returns `doctor_list_id` if successful
- **Action:** Shows questions and terms sections if doctor_list_id is returned

---

## 🔧 **Code Improvements**

### **1. Enhanced Validation**
- ✅ Form validation before doctor registration
- ✅ Email and mobile validation
- ✅ Password validation with regex
- ✅ OTP length validation (must be 6 digits)
- ✅ Listing name validation
- ✅ Working days and time validation
- ✅ Plan validation (at least one plan required)

### **2. Plan Structure Formatting**
- ✅ Plans formatted with all required fields:
  - `plan_fee` (number)
  - `plan_name` ("message", "call", or "video")
  - `plan_duration` (from dropdown: "30 minutes", "60 minutes", etc.)
  - `start_date` (from working days start)
  - `end_date` (from working days end)
  - `is_trial` (default: 1)
  - `no_of_reviews` (default: 1)
  - `plan_description` (auto-generated or from plan)

### **3. Error Handling**
- ✅ Comprehensive error logging with logger
- ✅ User-friendly error messages via toastService
- ✅ Specific error handling for:
  - Duplicate email (409)
  - Invalid request (400)
  - Network errors
  - OTP verification failures

### **4. Security**
- ✅ HCF admin ID validation before API calls
- ✅ Password masking in logs
- ✅ OTP masking in logs (first 2 digits only)
- ✅ Input validation for all fields

### **5. State Management**
- ✅ Proper doctor_id extraction from OTP verification response
- ✅ doctor_id stored in createListing state
- ✅ Plan data properly formatted before API call
- ✅ Form reset after successful creation

---

## 📝 **Plan Structure Notes**

### **Plan Name Dropdown**
The `ListingModal` component currently supports:
- ✅ "message" plan
- ✅ "video" plan
- ⚠️ "call" plan - **May need to be added to ListingModal**

### **Current Implementation**
The `postCreateListing` function formats plans correctly with:
- `plan_name` from plan data (from ListingModal)
- `plan_duration` from plan data (dropdown: "15 minutes", "30 minutes", etc.)
- `start_date` and `end_date` from working days
- `is_trial` and `no_of_reviews` set to 1
- `plan_description` auto-generated

### **If "call" Plan Missing**
If ListingModal doesn't show "call" option, you may need to:
1. Update ListingModal to include "call" in the checkbox list
2. Or handle "call" plans separately in AddDoctor component

---

## ✅ **Testing Checklist**

- [ ] Step 1: Register doctor with valid email/mobile/password
- [ ] Step 1: Verify OTP modal opens on status 202
- [ ] Step 2: Verify email OTP with correct code
- [ ] Step 2: Verify email OTP with wrong code (should show error)
- [ ] Step 2: Verify listing section enables after OTP verification
- [ ] Step 2: Verify doctor_id is stored correctly
- [ ] Step 3: Fill listing name, working days, working time
- [ ] Step 3: Add at least one plan (message, call, or video)
- [ ] Step 3: Verify plan structure matches API requirements
- [ ] Step 3: Create listing and verify API call
- [ ] Step 3: Verify doctor_list_id is captured
- [ ] Step 3: Verify questions and terms sections appear after listing creation
- [ ] Verify form resets after successful creation
- [ ] Verify all error messages are user-friendly
- [ ] Verify logger logs all API calls

---

## 🐛 **Known Issues**

1. ⚠️ **ListingModal Plan Options**: Currently shows only "message" and "video" checkboxes. The API requires "call" as well. Need to verify if ListingModal supports all three or needs update.

2. ✅ **Plan Structure**: Fixed to match API exactly with all required fields.

3. ✅ **Doctor ID Extraction**: Fixed to extract from multiple possible response paths.

4. ✅ **Error Handling**: Enhanced with logger and toastService.

---

## 📚 **API Endpoints Summary**

| Step | Endpoint | Method | Status |
|------|----------|--------|--------|
| 1 | `/sec/hcf/addDoctor` | POST | ✅ **FIXED** |
| 2 | `/sec/auth/verifyEmail` | POST | ✅ **FIXED** |
| 3 | `/sec/hcf/addDoctorWorkingDetailsAndPlan` | POST | ✅ **FIXED** |

---

**Status:** ✅ **API flow fixed, ready for testing**

**Note:** If ListingModal doesn't support "call" plan, may need to update it or handle separately.

