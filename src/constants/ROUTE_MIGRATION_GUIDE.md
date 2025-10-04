# Route Centralization Migration Guide

This guide explains how to migrate from hardcoded route strings to the centralized route constants system.

## 🎯 Benefits of Centralized Routes

- **Single Source of Truth**: All routes in one place
- **Easy Maintenance**: Update routes in one location
- **Type Safety**: Consistent route naming
- **Autocomplete**: IDE support for route constants
- **Refactoring**: Easy to rename routes across the app

## 📁 New Route Structure

```javascript
import { ROUTES } from '../constants/routes';

// Use route constants instead of hardcoded strings
<Route path={ROUTES.PATIENT_LOGIN} element={<PatientLogin />} />
<NavLink to={ROUTES.PATIENT_DASHBOARD_EXPLORE}>Explore</NavLink>
```

## 🔄 Migration Steps

### Step 1: Import Route Constants

**Before:**
```javascript
// No imports needed for hardcoded strings
<Route path="/patientLogin" element={<PatientLogin />} />
```

**After:**
```javascript
import { ROUTES } from '../constants/routes';
<Route path={ROUTES.PATIENT_LOGIN} element={<PatientLogin />} />
```

### Step 2: Replace Hardcoded Routes

**Before:**
```javascript
<NavLink to="/patientdashboard/dashboard/explore">Explore</NavLink>
<Route path="/patientDashboard/drDetailsCard/:resID" element={<DrDetailsCard />} />
```

**After:**
```javascript
<NavLink to={ROUTES.PATIENT_DASHBOARD_EXPLORE}>Explore</NavLink>
<Route path={ROUTES.PATIENT_DOCTOR_DETAILS} element={<DrDetailsCard />} />
```

### Step 3: Use Route Parameters

**Before:**
```javascript
navigate(`/patientDashboard/drDetailsCard/${doctorId}`);
```

**After:**
```javascript
import { getRouteWithParams } from '../constants/routes';
navigate(getRouteWithParams(ROUTES.PATIENT_DOCTOR_DETAILS, { resID: doctorId }));
```

## 📋 Complete Migration Checklist

### AppRouter.js - Route Definitions
- [ ] Replace all `<Route path="..."` with `ROUTES` constants
- [ ] Update nested route paths
- [ ] Replace parameterized routes

### Navigation Components
- [ ] `src/components/CustomMenuDrawer/custom-menu-drawer.js`
- [ ] `src/PatientDashboard/Explore/Explore.js`
- [ ] `src/PatientDashboard/MainDashboard/MainDashboard.js`
- [ ] All `NavLink` components

### Navigation Functions
- [ ] `navigate()` calls in components
- [ ] `useNavigate()` hook usage
- [ ] Programmatic navigation

### Route Groups to Update

#### Authentication Routes:
```javascript
// Before
"/patientLogin" → ROUTES.PATIENT_LOGIN
"/doctorLogin" → ROUTES.DOCTOR_LOGIN
"/hcfAdminLogin" → ROUTES.HCF_ADMIN_LOGIN
"/superAdminLogin" → ROUTES.SUPER_ADMIN_LOGIN
```

#### Dashboard Routes:
```javascript
// Before
"/patientDashboard" → ROUTES.PATIENT_DASHBOARD
"/doctorDashboard" → ROUTES.DOCTOR_DASHBOARD
"/hcfAdmin" → ROUTES.HCF_ADMIN
"/superAdmin" → ROUTES.SUPER_ADMIN
```

#### Patient Dashboard Sub-routes:
```javascript
// Before
"/patientDashboard/dashboard/explore" → ROUTES.PATIENT_DASHBOARD_EXPLORE
"/patientDashboard/dashboard/myactivity" → ROUTES.PATIENT_DASHBOARD_MY_ACTIVITY
"/patientDashboard/dashboard/profile" → ROUTES.PATIENT_DASHBOARD_PROFILE
```

## 🛠️ Usage Examples

### Basic Route Usage:
```javascript
import { ROUTES } from '../constants/routes';

// In AppRouter.js
<Route path={ROUTES.PATIENT_LOGIN} element={<PatientLogin />} />

// In Navigation components
<NavLink to={ROUTES.PATIENT_DASHBOARD_EXPLORE}>Explore</NavLink>

// In programmatic navigation
const navigate = useNavigate();
navigate(ROUTES.PATIENT_DASHBOARD);
```

### Route with Parameters:
```javascript
import { ROUTES, getRouteWithParams } from '../constants/routes';

// Navigate to doctor details
const doctorId = "123";
navigate(getRouteWithParams(ROUTES.PATIENT_DOCTOR_DETAILS, { resID: doctorId }));

// Navigate to HCF doctor details
const hcfDoctorId = "456";
const hcfId = "789";
navigate(getRouteWithParams(ROUTES.PATIENT_HCF_DOCTOR_DETAILS, { 
  hcddocid: hcfDoctorId, 
  reshcfID: hcfId 
}));
```

### Route Groups:
```javascript
import { ROUTE_GROUPS, isProtectedRoute } from '../constants/routes';

// Check if route is protected
if (isProtectedRoute(currentPath)) {
  // Require authentication
}

// Get all authentication routes
const authRoutes = ROUTE_GROUPS.AUTHENTICATION;
```

### User Type Routing:
```javascript
import { getUserDashboardRoute, getSignupRoute, USER_TYPES } from '../constants/routes';

// Get dashboard route for user type
const dashboardRoute = getUserDashboardRoute(USER_TYPES.PATIENT);

// Get signup route for user type
const signupRoute = getSignupRoute(USER_TYPES.DOCTOR);
```

## 🔧 Advanced Usage

### Dynamic Route Building:
```javascript
import { ROUTES, getRouteWithParams } from '../constants/routes';

const buildDoctorRoute = (doctorId) => {
  return getRouteWithParams(ROUTES.PATIENT_DOCTOR_DETAILS, { resID: doctorId });
};

// Usage
const doctorRoute = buildDoctorRoute("123");
navigate(doctorRoute);
```

### Route Validation:
```javascript
import { ROUTES, isProtectedRoute } from '../constants/routes';

const validateRoute = (pathname) => {
  if (isProtectedRoute(pathname)) {
    // Check authentication
    return checkAuth();
  }
  return true;
};
```

### Conditional Navigation:
```javascript
import { ROUTES, USER_TYPES, getUserDashboardRoute } from '../constants/routes';

const navigateToDashboard = (userType) => {
  const dashboardRoute = getUserDashboardRoute(userType);
  navigate(dashboardRoute);
};
```

## ✅ Testing the Migration

1. **Route Test**: Ensure all routes work correctly
2. **Navigation Test**: Verify navigation between pages
3. **Parameter Test**: Test routes with parameters
4. **Authentication Test**: Verify protected routes
5. **User Type Test**: Test different user dashboard routes

## 🚀 Next Steps

1. Start with `AppRouter.js` - update all route definitions
2. Update navigation components (`CustomMenuDrawer`, etc.)
3. Update programmatic navigation calls
4. Test all routes thoroughly
5. Remove old hardcoded route strings

## 📞 Support

If you encounter issues during migration:
1. Check the route constant name matches the original path
2. Verify parameter names match the route definition
3. Ensure proper imports are added
4. Test navigation functionality

Remember: The centralized system provides better maintainability and consistency across your application! 🎯
