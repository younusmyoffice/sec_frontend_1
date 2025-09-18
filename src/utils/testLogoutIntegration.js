/**
 * Logout Integration Test
 * 
 * This script tests the logout functionality integration
 * Run this in the browser console on the explore page
 */

import { logoutUser, forceLogout, isUserLoggedIn } from '../api/services/authService';
import { getCurrentUser, clearAuthData } from './jwtUtils';

/**
 * Test logout integration on explore page
 */
export const testLogoutIntegration = async () => {
    console.log('🧪 Testing Logout Integration on Explore Page');
    console.log('================================================');
    
    // Test 1: Check initial state
    console.log('1. Checking initial authentication state...');
    const initialAuthStatus = isUserLoggedIn();
    const initialUser = getCurrentUser();
    console.log('Initial auth status:', initialAuthStatus);
    console.log('Initial user:', initialUser);
    
    if (!initialAuthStatus) {
        console.log('❌ User is not logged in. Please login first to test logout.');
        console.log('💡 Go to http://localhost:8000/patientlogin and login first');
        return;
    }
    
    // Test 2: Test server logout
    console.log('\n2. Testing server logout...');
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
    
    // Test 3: Verify logout
    console.log('\n3. Verifying logout...');
    const finalAuthStatus = isUserLoggedIn();
    const finalUser = getCurrentUser();
    const hasToken = !!localStorage.getItem('access_token');
    const hasEmail = !!localStorage.getItem('patient_Email');
    
    console.log('Final auth status:', finalAuthStatus);
    console.log('Final user:', finalUser);
    console.log('Has token:', hasToken);
    console.log('Has email:', hasEmail);
    
    // Test 4: Check localStorage
    console.log('\n4. Checking localStorage...');
    const authKeys = [
        'access_token',
        'patient_Email',
        'patient_suid',
        'profile',
        'user_id',
        'role_id',
        'jwt_email'
    ];
    
    const remainingKeys = authKeys.filter(key => localStorage.getItem(key));
    console.log('Remaining auth keys in localStorage:', remainingKeys);
    
    if (remainingKeys.length === 0) {
        console.log('✅ All auth data cleared from localStorage');
    } else {
        console.log('❌ Some auth data still remains:', remainingKeys);
    }
    
    // Test 5: Check cookies
    console.log('\n5. Checking cookies...');
    const cookies = document.cookie.split(';').filter(cookie => cookie.trim());
    console.log('Remaining cookies:', cookies);
    
    if (cookies.length === 0) {
        console.log('✅ All cookies cleared');
    } else {
        console.log('⚠️ Some cookies remain:', cookies);
    }
    
    // Final result
    const testPassed = !finalAuthStatus && !hasToken && !hasEmail && remainingKeys.length === 0;
    
    console.log('\n📊 Test Results:');
    console.log('================');
    console.log(`Authentication Status: ${finalAuthStatus ? '❌ Still logged in' : '✅ Logged out'}`);
    console.log(`Token Cleared: ${!hasToken ? '✅ Yes' : '❌ No'}`);
    console.log(`Email Cleared: ${!hasEmail ? '✅ Yes' : '❌ No'}`);
    console.log(`localStorage Cleared: ${remainingKeys.length === 0 ? '✅ Yes' : '❌ No'}`);
    console.log(`Overall Test: ${testPassed ? '✅ PASSED' : '❌ FAILED'}`);
    
    return {
        success: testPassed,
        details: {
            authStatus: finalAuthStatus,
            hasToken,
            hasEmail,
            remainingKeys,
            cookies: cookies.length
        }
    };
};

/**
 * Test the LogoutButton component
 */
export const testLogoutButton = () => {
    console.log('🧪 Testing LogoutButton Component');
    console.log('==================================');
    
    // Check if LogoutButton is rendered
    const logoutButton = document.querySelector('[data-testid="logout-button"]') || 
                        document.querySelector('button[class*="logout"]') ||
                        document.querySelector('button:contains("Logout")') ||
                        document.querySelector('button:contains("Test Logout")');
    
    if (logoutButton) {
        console.log('✅ LogoutButton found in DOM');
        console.log('Button text:', logoutButton.textContent);
        console.log('Button disabled:', logoutButton.disabled);
        
        // Try to click the button
        try {
            logoutButton.click();
            console.log('✅ LogoutButton click triggered');
        } catch (error) {
            console.log('❌ Error clicking LogoutButton:', error);
        }
    } else {
        console.log('❌ LogoutButton not found in DOM');
        console.log('💡 Make sure you are on the explore page: http://localhost:8000/patientdashboard/dashboard/explore');
    }
    
    return !!logoutButton;
};

/**
 * Test the CustomMenuDrawer logout
 */
export const testMenuDrawerLogout = () => {
    console.log('🧪 Testing CustomMenuDrawer Logout');
    console.log('===================================');
    
    // Check if profile menu is available
    const profileMenu = document.querySelector('[aria-label*="account"]') ||
                       document.querySelector('[aria-controls*="primary-search-account-menu"]');
    
    if (profileMenu) {
        console.log('✅ Profile menu button found');
        
        // Try to open the menu
        try {
            profileMenu.click();
            console.log('✅ Profile menu opened');
            
            // Look for logout option
            setTimeout(() => {
                const logoutOption = document.querySelector('[role="menuitem"]:contains("Log Out")') ||
                                   document.querySelector('[role="menuitem"]:contains("Logout")');
                
                if (logoutOption) {
                    console.log('✅ Logout option found in menu');
                    console.log('Option text:', logoutOption.textContent);
                } else {
                    console.log('❌ Logout option not found in menu');
                }
            }, 100);
            
        } catch (error) {
            console.log('❌ Error opening profile menu:', error);
        }
    } else {
        console.log('❌ Profile menu button not found');
    }
    
    return !!profileMenu;
};

// Export all test functions
export default {
    testLogoutIntegration,
    testLogoutButton,
    testMenuDrawerLogout
};
