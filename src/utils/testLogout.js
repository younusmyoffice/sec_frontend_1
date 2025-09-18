/**
 * Test Logout Functionality
 * 
 * This file contains test functions to verify the logout system works correctly
 * Run these tests in the browser console or in a test environment
 */

import { logoutUser, forceLogout, isUserLoggedIn } from '../api/services/authService';
import { getCurrentUser, clearAuthData } from './jwtUtils';

/**
 * Test the logout functionality
 */
export const testLogout = async () => {
    console.log('=== Testing Logout Functionality ===');
    
    // Test 1: Check if user is logged in
    console.log('1. Checking login status...');
    const isLoggedIn = isUserLoggedIn();
    console.log('User logged in:', isLoggedIn);
    
    if (!isLoggedIn) {
        console.log('❌ User is not logged in. Please login first to test logout.');
        return;
    }
    
    // Test 2: Get current user info
    console.log('2. Getting current user info...');
    const userInfo = getCurrentUser();
    console.log('Current user:', userInfo);
    
    // Test 3: Test server logout
    console.log('3. Testing server logout...');
    try {
        const logoutResult = await logoutUser({
            clearLocalData: true,
            callServer: true
        });
        console.log('Logout result:', logoutResult);
        
        if (logoutResult.success) {
            console.log('✅ Server logout successful');
        } else {
            console.log('❌ Server logout failed:', logoutResult.message);
        }
    } catch (error) {
        console.log('❌ Server logout error:', error);
    }
    
    // Test 4: Verify user is logged out
    console.log('4. Verifying logout...');
    const isLoggedOut = !isUserLoggedIn();
    console.log('User logged out:', isLoggedOut);
    
    if (isLoggedOut) {
        console.log('✅ Logout test completed successfully');
    } else {
        console.log('❌ Logout test failed - user still appears to be logged in');
    }
    
    return {
        success: isLoggedOut,
        message: isLoggedOut ? 'Logout test passed' : 'Logout test failed'
    };
};

/**
 * Test force logout functionality
 */
export const testForceLogout = async () => {
    console.log('=== Testing Force Logout Functionality ===');
    
    // Simulate being logged in by setting some data
    localStorage.setItem('access_token', 'test-token');
    localStorage.setItem('patient_Email', 'test@example.com');
    
    console.log('1. Simulated login data set');
    console.log('2. Testing force logout...');
    
    try {
        const result = await forceLogout();
        console.log('Force logout result:', result);
        
        if (result.success) {
            console.log('✅ Force logout successful');
        } else {
            console.log('❌ Force logout failed:', result.message);
        }
    } catch (error) {
        console.log('❌ Force logout error:', error);
    }
    
    // Verify data is cleared
    const hasToken = !!localStorage.getItem('access_token');
    const hasEmail = !!localStorage.getItem('patient_Email');
    
    console.log('3. Verifying data is cleared...');
    console.log('Token cleared:', !hasToken);
    console.log('Email cleared:', !hasEmail);
    
    if (!hasToken && !hasEmail) {
        console.log('✅ Force logout test completed successfully');
    } else {
        console.log('❌ Force logout test failed - data not cleared');
    }
    
    return {
        success: !hasToken && !hasEmail,
        message: (!hasToken && !hasEmail) ? 'Force logout test passed' : 'Force logout test failed'
    };
};

/**
 * Test clearAuthData function
 */
export const testClearAuthData = () => {
    console.log('=== Testing clearAuthData Function ===');
    
    // Set some test data
    localStorage.setItem('access_token', 'test-token');
    localStorage.setItem('patient_Email', 'test@example.com');
    localStorage.setItem('hcfadmin_Email', 'admin@example.com');
    localStorage.setItem('profile', 'test-profile');
    
    console.log('1. Test data set');
    console.log('2. Calling clearAuthData...');
    
    clearAuthData();
    
    // Check if data is cleared
    const authKeys = [
        'access_token',
        'patient_Email',
        'hcfadmin_Email',
        'profile'
    ];
    
    const allCleared = authKeys.every(key => !localStorage.getItem(key));
    
    console.log('3. Verifying data is cleared...');
    console.log('All auth data cleared:', allCleared);
    
    if (allCleared) {
        console.log('✅ clearAuthData test completed successfully');
    } else {
        console.log('❌ clearAuthData test failed - some data remains');
    }
    
    return {
        success: allCleared,
        message: allCleared ? 'clearAuthData test passed' : 'clearAuthData test failed'
    };
};

// Export all test functions
export default {
    testLogout,
    testForceLogout,
    testClearAuthData
};
