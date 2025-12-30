# JWT Centralization Migration Guide

This guide explains how to migrate from scattered JWT token handling to the centralized JWT service system.

## 🎯 Benefits of Centralized JWT Management

- **Single Source of Truth**: All JWT operations in one place
- **Consistent Token Storage**: Standardized storage keys and methods
- **Automatic Token Refresh**: Seamless token renewal
- **Better Error Handling**: Centralized error management
- **Role-Based Access**: Easy role checking and validation

## 📁 New JWT Service Structure

```
src/services/
├── jwtService.js              # Centralized JWT service
└── JWT_MIGRATION_GUIDE.md     # This migration guide

src/config/
├── axiosInstanceUpdated.js    # Updated axios instance using JWT service
└── axiosInstance.js          # Original (to be replaced)
```

## 🔄 Migration Steps

### Step 1: Import JWT Service

**Before:**
```javascript
// Scattered token handling
const token = localStorage.getItem('access_token');
const userInfo = decodeJWT(token);
```

**After:**
```javascript
import jwtService from '../services/jwtService';

// Centralized token handling
const token = jwtService.getAccessToken();
const userInfo = jwtService.getCurrentUser();
```

### Step 2: Replace Token Storage

**Before:**
```javascript
// Different storage keys across components
localStorage.setItem("access_token", resData.access_token);
localStorage.setItem("token", resData.token);
```

**After:**
```javascript
// Consistent storage using JWT service
jwtService.setTokens(resData.access_token, resData.refresh_token);
```

### Step 3: Replace Token Retrieval

**Before:**
```javascript
// Manual token retrieval
const token = localStorage.getItem('access_token');
const refreshToken = localStorage.getItem('refresh_token');
```

**After:**
```javascript
// Centralized token retrieval
const token = jwtService.getAccessToken();
const refreshToken = jwtService.getRefreshToken();
```

### Step 4: Replace Authentication Checks

**Before:**
```javascript
// Manual authentication checking
const token = localStorage.getItem('access_token');
const isAuthenticated = !!token && !isTokenExpired(token);
```

**After:**
```javascript
// Centralized authentication checking
const isAuthenticated = jwtService.isAuthenticated();
```

## 📋 Complete Migration Checklist

### Login Components to Update:
- [ ] `src/Role/Login/PatientModule/PatientLogin/PatientLogin.js`
- [ ] `src/Role/Login/PatientModule/HCFAdminLogin/HCFAdminLogin.js`
- [ ] `src/Role/Login/PatientModule/SuperAdminLogin/SuperAdminLogin.js`
- [ ] `src/DoctorModule/DoctorLogin/doctorlogin.js`
- [ ] `src/HCFModule/HCFLogin/ClinicLogin/ClinicLogin.js`
- [ ] `src/HCFModule/HCFLogin/DisgnostLogin/DiagnostLogin.js`

### Components Using Token Data:
- [ ] `src/components/CustomMenuDrawer/custom-menu-drawer.js`
- [ ] `src/PatientDashboard/MainDashboard/MainDashboard.js`
- [ ] All components using `getCurrentUser()`, `getCurrentUserId()`, etc.

### API Services:
- [ ] Update all services to use centralized JWT service
- [ ] Replace direct localStorage access with JWT service methods

## 🛠️ Usage Examples

### Basic JWT Operations:

```javascript
import jwtService from '../services/jwtService';

// Check if user is authenticated
if (jwtService.isAuthenticated()) {
  // User is logged in
}

// Get current user information
const user = jwtService.getCurrentUser();
console.log('User ID:', user.userId);
console.log('Role ID:', user.roleId);
console.log('Email:', user.email);

// Get specific user data
const userId = jwtService.getCurrentUserId();
const roleId = jwtService.getCurrentRoleId();
const email = jwtService.getCurrentUserEmail();
```

### Token Management:

```javascript
// Store tokens after login
jwtService.setTokens(accessToken, refreshToken);

// Check if token needs refresh
if (jwtService.needsRefresh()) {
  await jwtService.refreshAccessToken();
}

// Logout user
await jwtService.logout();
```

### Role-Based Access:

```javascript
// Check user roles
if (jwtService.isPatient()) {
  // Show patient-specific content
}

if (jwtService.isDoctor()) {
  // Show doctor-specific content
}

if (jwtService.isHCFAdmin()) {
  // Show HCF admin content
}

// Check specific role
if (jwtService.hasRole(2)) {
  // User has role ID 2
}
```

### API Request Headers:

```javascript
// Get authorization header for API requests
const authHeader = jwtService.getAuthHeader();
// Use with axios: headers: { ...authHeader }
```

## 🔧 Advanced Usage

### Custom Authentication Logic:

```javascript
import jwtService from '../services/jwtService';

const checkUserAccess = (requiredRole) => {
  if (!jwtService.isAuthenticated()) {
    return { hasAccess: false, reason: 'Not authenticated' };
  }
  
  if (requiredRole && !jwtService.hasRole(requiredRole)) {
    return { hasAccess: false, reason: 'Insufficient permissions' };
  }
  
  return { hasAccess: true };
};

// Usage
const access = checkUserAccess(2); // Check for doctor role
if (!access.hasAccess) {
  console.log(access.reason);
}
```

### Token Refresh Handling:

```javascript
import jwtService from '../services/jwtService';

const makeAuthenticatedRequest = async (apiCall) => {
  try {
    // Check if token needs refresh
    if (jwtService.needsRefresh()) {
      const refreshed = await jwtService.refreshAccessToken();
      if (!refreshed) {
        throw new Error('Token refresh failed');
      }
    }
    
    return await apiCall();
  } catch (error) {
    if (error.response?.status === 401) {
      // Token is invalid, redirect to login
      jwtService.clearTokens();
      window.location.href = '/login';
    }
    throw error;
  }
};
```

### Component Integration:

```javascript
import React, { useEffect, useState } from 'react';
import jwtService from '../services/jwtService';

const ProtectedComponent = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (jwtService.isAuthenticated()) {
        setUser(jwtService.getCurrentUser());
      } else {
        // Redirect to login
        window.location.href = '/login';
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      {jwtService.isPatient() && <div>Patient Dashboard</div>}
      {jwtService.isDoctor() && <div>Doctor Dashboard</div>}
    </div>
  );
};
```

## ✅ Testing the Migration

1. **Authentication Test**: Verify login/logout functionality
2. **Token Refresh Test**: Test automatic token refresh
3. **Role Check Test**: Verify role-based access control
4. **API Test**: Ensure API calls work with new JWT service
5. **Error Handling Test**: Test token expiration scenarios

## 🚀 Next Steps

1. **Update Login Components**: Replace token storage with JWT service
2. **Update Authentication Checks**: Use centralized authentication methods
3. **Update API Services**: Ensure all services use centralized JWT
4. **Test Thoroughly**: Verify all authentication flows work
5. **Remove Old Code**: Clean up scattered JWT handling

## 📞 Support

If you encounter issues during migration:
1. Check JWT service method signatures
2. Verify token storage keys are consistent
3. Ensure proper error handling
4. Test with different user roles

Remember: The centralized JWT service provides better security, consistency, and maintainability! 🎯
