# API Centralization Migration Guide

This guide explains how to migrate from direct API calls to the centralized API service system.

## 🎯 Benefits of Centralized API System

- **Single Source of Truth**: All API endpoints in one place
- **Easy Maintenance**: Update endpoints in one location
- **Type Safety**: Consistent parameter handling
- **Error Handling**: Centralized error management
- **Testing**: Easier to mock and test API calls

## 📁 New File Structure

```
src/api/
├── endpoints.js              # All API endpoints
├── services/
│   ├── index.js             # Service exports
│   ├── authService.js       # Authentication services
│   ├── patientService.js    # Patient-related services
│   ├── doctorService.js     # Doctor-related services
│   ├── hcfService.js        # Healthcare facility services
│   ├── paymentService.js    # Payment services
│   ├── masterDataService.js # Master data services
│   ├── reportsService.js    # Reports and file services
│   └── countryService.js    # Country data services
└── MIGRATION_GUIDE.md       # This file
```

## 🔄 Migration Steps

### Step 1: Import the Service

**Before:**
```javascript
import axiosInstance from "../../config/axiosInstance";
```

**After:**
```javascript
import { PatientService } from "../../api/services";
```

### Step 2: Replace Direct API Calls

**Before:**
```javascript
const fetchDataNew = async () => {
    try {
        const response = await axiosInstance.get("/sec/patient/DashboardDoctordetail");
        setCardData(response?.data?.response);
    } catch (error) {
        console.log(error.response);
    }
};
```

**After:**
```javascript
const fetchDataNew = async () => {
    try {
        const response = await PatientService.getDashboardDoctorDetails();
        setCardData(response?.response);
    } catch (error) {
        console.log(error.response);
    }
};
```

### Step 3: Update POST Requests

**Before:**
```javascript
const response = await axiosInstance.post(
    "/sec/patient/doctornearme",
    JSON.stringify({
        zipcodes,
        type: "Good",
        page: 1,
        limit: 5,
    })
);
```

**After:**
```javascript
const response = await PatientService.getDoctorsNearMe({
    zipcodes,
    type: "Good",
    page: 1,
    limit: 5,
});
```

## 📋 Complete Migration Checklist

### Patient Module Files to Update:
- [ ] `src/PatientDashboard/Explore/Explore.js`
- [ ] `src/PatientDashboard/DrDetailsCard/DrDetailsCard.js`
- [ ] `src/PatientDashboard/DrDetailsCard/BookingAppointmentModal.js`
- [ ] `src/PatientDashboard/Profile/Profile.js`
- [ ] `src/PatientDashboard/Profile/ContactDetails.js`
- [ ] `src/PatientDashboard/PatientAppointment/UpComing/Upcoming.js`
- [ ] `src/PatientDashboard/PatientAppointment/Completed/Completed.js`
- [ ] `src/PatientDashboard/PatientAppointment/Cancelled/Cancelled.js`

### Doctor Module Files to Update:
- [ ] `src/DoctorModule/DoctorListing/CreateNewListing/AddPlan/AddPlan.js`
- [ ] `src/DoctorModule/DoctorListing/CreateNewListing/AddQuestioner/AddQuestioner.js`
- [ ] `src/DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft.js`
- [ ] `src/DoctorModule/DoctorListing/DoctorActiveListing/DoctorActiveLising.js`
- [ ] `src/DoctorModule/DoctorAppointmentDashboard/DoctorUpcoming/DoctorUpcoming.js`
- [ ] `src/DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout.js`

### Authentication Files to Update:
- [ ] `src/Role/Login/PatientModule/PatientLogin/PatientLogin.js`
- [ ] `src/Role/Login/PatientModule/HCFAdminLogin/HCFAdminLogin.js`
- [ ] `src/Role/Login/PatientModule/SuperAdminLogin/SuperAdminLogin.js`
- [ ] `src/DoctorModule/DoctorLogin/doctorlogin.js`
- [ ] `src/Role/Signup/SignupPage/SignupPage.js`

### HCF Module Files to Update:
- [ ] `src/HCFModule/HCFAdmin/AdminDoctor/AddDoctor/AddDoctor.js`
- [ ] `src/HCFModule/HCFLogin/ClinicLogin/ClinicLogin.js`
- [ ] `src/HCFModule/HCFLogin/DisgnostLogin/DiagnostLogin.js`

## 🛠️ Service Usage Examples

### Patient Service Examples:

```javascript
import { PatientService } from "../../api/services";

// Get dashboard doctor details
const doctors = await PatientService.getDashboardDoctorDetails();

// Get doctors near location
const nearbyDoctors = await PatientService.getDoctorsNearMe({
    zipcodes: ["12345"],
    type: "Good",
    page: 1,
    limit: 5
});

// Get doctor details by ID
const doctorDetails = await PatientService.getDoctorDetailsById("doctor123");

// Create appointment
const appointment = await PatientService.createAppointment({
    doctor_id: "doctor123",
    date: "2024-01-15",
    time: "10:00"
});
```

### Doctor Service Examples:

```javascript
import { DoctorService } from "../../api/services";

// Get dashboard counts
const counts = await DoctorService.getDashboardCount("doctor123", "in_progress");

// Get appointment requests
const requests = await DoctorService.getAppointmentRequests("doctor123");

// Accept appointment request
await DoctorService.acceptAppointmentRequest({
    appointment_id: "app123",
    doctor_id: "doctor123"
});

// Create doctor listing
const listing = await DoctorService.createUpdateListing({
    doctor_id: "doctor123",
    title: "Cardiologist Consultation",
    description: "Expert heart care"
});
```

### Authentication Service Examples:

```javascript
import { AuthService } from "../../api/services";

// Login
const loginResult = await AuthService.login({
    email: "user@example.com",
    password: "password123"
});

// Register
const registerResult = await AuthService.register({
    email: "user@example.com",
    password: "password123",
    first_name: "John",
    last_name: "Doe"
});

// Verify OTP
const otpResult = await AuthService.verifyOtp("+1234567890", "123456");
```

## 🔧 Advanced Usage

### Using Endpoints Directly:

```javascript
import { API_ENDPOINTS, getEndpointWithParams } from "../../api/endpoints";

// Get specific endpoint
const loginEndpoint = API_ENDPOINTS.AUTH.LOGIN;

// Get endpoint with parameters
const doctorEndpoint = getEndpointWithParams('DOCTOR', 'DASHBOARD_APP_IN_PROGRESS', { 
    doctorId: 'doctor123' 
});
```

### Error Handling:

```javascript
import { PatientService } from "../../api/services";

const fetchData = async () => {
    try {
        const response = await PatientService.getDashboardDoctorDetails();
        setData(response.response);
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        // Handle error appropriately
    }
};
```

## ✅ Testing the Migration

1. **Import Test**: Ensure all imports work correctly
2. **Functionality Test**: Verify all API calls work as expected
3. **Error Handling Test**: Test error scenarios
4. **Performance Test**: Ensure no performance degradation

## 🚀 Next Steps

1. Start with high-traffic components (Explore, DrDetailsCard)
2. Migrate authentication flows
3. Update remaining components
4. Remove old direct API calls
5. Add comprehensive error handling
6. Implement loading states consistently

## 📞 Support

If you encounter issues during migration:
1. Check the service method signatures
2. Verify endpoint parameters
3. Ensure proper error handling
4. Test with sample data

Remember: The centralized system provides better maintainability and consistency across your application! 🎯
