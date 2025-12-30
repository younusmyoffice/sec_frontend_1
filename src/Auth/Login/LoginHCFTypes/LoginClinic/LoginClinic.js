/**
 * ClinicLogin Component
 * 
 * Handles Clinic authentication and login functionality.
 * Features:
 * - Email and password authentication
 * - JWT token management
 * - Profile completion detection
 * - Role-based navigation
 * - Secure token storage
 * - Universal loading component
 * - Enhanced error handling
 */

import React, { useState } from "react";
import "./LoginClinic.scss";
import { Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// Removed import axios from "axios"; - using axiosInstance instead
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../../../config/axiosInstance";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import { useAuthentication } from "../../../../loginComponent/UserProvider";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import { emailRegex, passwordRegex } from "../../../../constants/const";
import Cookies from "js-cookie";
import logger from "../../../../utils/logger"; // Added logger
import toastService from "../../../../services/toastService"; // Added toastService
import { Loading } from "../../../../components/Loading"; // Added Loading component
import { decodeJWT } from "../../../../utils/jwtUtils"; // Added for JWT decoding

const ClinicLogin = () => {
    // ============================================
    // STATE MANAGEMENT
    // ============================================

    // Password visibility toggle state
    const [showPassword, setShowPassword] = useState(true);

    // Form input states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Validation states
    const [helperTextMessage, setHelperTextMessage] = useState(false);
    const [passwordHelperTextMessage, setPasswordHelperTextMessage] = useState(false);

    // Loading state for API operations
    const [loading, setLoading] = useState(false);

    // Snackbar notification states
    const [showSnack, setShowSnack] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageOpen, setErrorMessageOpen] = useState(false);
    const [showError, setShowError] = useState(false);

    // ============================================
    // NAVIGATION & AUTHENTICATION
    // ============================================

    // Navigation hook for routing
    const navigate = useNavigate();

    // Authentication context hook
    // NOTE: ClinicLogin updates global auth state in UserProvider
    // This is used throughout the app to check if user is logged in
    const { ClinicLogin: ClinicLoginAuth } = useAuthentication();

    // ============================================
    // LOGIN HANDLER
    // ============================================

    /**
     * Handle login submission
     * - Validates email and password
     * - Calls authentication API
     * - Handles incomplete profile redirect
     * - Stores JWT tokens and navigates to dashboard
     * - Shows error messages on failure
     */
    const fetchData = async () => {
        // Validate email and password are provided
        if (!email || !password) {
            logger.warn("Login attempt with missing credentials");
            setErrorMessage("Please enter email and password");
            setErrorMessageOpen(true);
            toastService.error("Please enter both email and password");
            return;
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            logger.warn("Invalid email format:", email);
            setErrorMessage("Please enter a valid email");
            setErrorMessageOpen(true);
            toastService.error("Please enter a valid email address");
            return;
        }

        // Validate password strength
        if (!passwordRegex.test(password)) {
            logger.warn("Weak password provided");
            setErrorMessage("Password must meet the required criteria");
            setErrorMessageOpen(true);
            toastService.error("Password must be 8+ characters with a number and special character");
            return;
        }

        const loginData = {
            email,
            password,
            login_with_email: true,
            mobile: null,
            role_id: 6, // Clinic role
        };

        try {
            logger.info("Clinic login attempt for:", email);
            setShowSnack(true);
            setErrorMessageOpen(false);
            setLoading(true);
            setShowError(false);

            // ============================================
            // ⚡ ACCESS TOKEN HANDLING - REUSABLE THROUGHOUT APP ⚡
            // ============================================
            //
            // HOW AXIOSINSTANCE WORKS:
            // 1. Automatic Token Reading:
            //    - Before EVERY API request, axiosInstance reads "access_token" from localStorage
            //    - No need to manually retrieve token in each component
            //    - Located in: src/config/axiosInstance.js (request interceptor)
            //
            // 2. Automatic Token Attachment:
            //    - Adds token to Authorization header as: "Bearer <access_token>"
            //    - Example header: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            //    - Works for ALL HTTP methods: GET, POST, PUT, DELETE, PATCH
            //
            // 3. Automatic Token Refresh:
            //    - If token is about to expire (< 5 minutes), auto-refreshes before request
            //    - On 401 error (unauthorized), automatically attempts token refresh
            //    - If refresh succeeds, retries original request with new token
            //    - If refresh fails, clears auth data and redirects to login
            //
            // ✅ REUSABLE THROUGHOUT ENTIRE APPLICATION:
            //    - ANY component can import axiosInstance and get automatic token handling
            //    - No need to manually pass token in each component
            //    - Centralized authentication logic (one file to update: config/axiosInstance.js)
            //    - Consistent security across all API calls
            //
            // 📁 USAGE EXAMPLE (In ANY component):
            //    import axiosInstance from '../../config/axiosInstance';
            //
            //    const fetchData = async () => {
            //        // Token automatically added - no manual management needed!
            //        const response = await axiosInstance.get('/api/users');
            //        // OR
            //        const response = await axiosInstance.post('/api/users', data);
            //        // OR any HTTP method - token always added automatically
            //    };
            //
            // 🔒 SECURITY BENEFITS:
            //    - Token stored in localStorage (accessible only to JavaScript on same origin)
            //    - No tokens in URL parameters (prevents token leakage in browser history)
            //    - No tokens in cookies (reduces CSRF attack surface)
            //    - Automatic refresh prevents users from being logged out unexpectedly
            //    - Centralized token management reduces security vulnerabilities
            //
            const response = await axiosInstance.post(
                "/sec/auth/login",
                JSON.stringify(loginData),
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            const resData = response?.data?.response;
            logger.info("Clinic login response:", resData);

            if (resData?.body === "INCOMPLETE_PROFILE") {
                // ============================================
                // INCOMPLETE PROFILE HANDLING
                // ============================================
                // Backend response structure for incomplete profile:
                // {
                //   body: "INCOMPLETE_PROFILE",
                //   data: {
                //     suid: 123,
                //     email: "clinic@example.com",
                //     access_token: "eyJ...",
                //     role_id: 6,
                //     profile_picture: "...",
                //     contact_no_primary: "..."
                //   }
                // }

                // Extract data from nested data object
                const profileData = resData.data || resData; // Try both structures
                logger.info("Incomplete profile detected, stored clinic data:", profileData.email, profileData.suid);

                // Store JWT access token (CRITICAL - required for profile completion API)
                localStorage.setItem("access_token", profileData.access_token);

                // Store clinic center data for incomplete profile
                localStorage.setItem("login_Email", profileData.email);
                localStorage.setItem("email", profileData.email);
                localStorage.setItem("clinic_Email", profileData.email); // Also store as clinic_Email for consistency
                localStorage.setItem("clinic_suid", profileData.suid);

                // Store JWT decoded information if available
                if (profileData.access_token) {
                    const userInfo = decodeJWT(profileData.access_token);
                    if (userInfo) {
                        localStorage.setItem("user_id", userInfo.userId);
                        localStorage.setItem("role_id", userInfo.roleId || profileData.role_id || "6");
                        localStorage.setItem("jwt_email", userInfo.email || profileData.email);
                    }
                }

                // Store additional response data for profile completion
                localStorage.setItem("profile", profileData.profile_picture);
                localStorage.setItem("contact_no_primary", profileData.contact_no_primary);

                logger.info("=== INCOMPLETE PROFILE DATA STORAGE ===");
                logger.info("Full response data:", profileData);
                logger.info("access_token stored:", !!profileData.access_token);
                logger.info("email stored:", profileData.email);
                logger.info("suid stored:", profileData.suid);
                logger.info("role_id stored:", profileData.role_id);
                logger.info("All localStorage after storage:", Object.keys(localStorage));
                logger.info("clinic_suid value:", localStorage.getItem("clinic_suid"));
                logger.info("email value:", localStorage.getItem("email"));
                logger.info("access_token value:", localStorage.getItem("access_token"));

                toastService.info("Redirecting to complete your profile");
                navigate("/clinicdoctorcompleteprofile", { replace: true });
            } else if (resData?.access_token) {
                // ============================================
                // SUCCESSFUL LOGIN - TOKEN MANAGEMENT
                // ============================================
                logger.info("Clinic login successful, storing tokens and navigating to dashboard");

                // ============================================
                // TOKEN STORAGE & MANAGEMENT
                // ============================================

                // Decode JWT token to extract user information
                // decodeJWT is a utility function from jwtUtils
                // It extracts payload from JWT token without verifying signature
                // Payload typically contains: userId, roleId, email, exp, iat
                const userInfo = decodeJWT(resData.access_token);
                logger.debug("Decoded user info from JWT:", userInfo);

                // ============================================
                // 🔑 ACCESS TOKEN STORAGE & REUSABILITY 🔑
                // ============================================

                // Store JWT access token in localStorage
                // 
                // ⚡ CRITICAL: This token is REUSABLE across the ENTIRE application
                // 
                // HOW IT BECOMES REUSABLE:
                // 1. Token is stored in localStorage.setItem("access_token", ...)
                // 2. Location: src/config/axiosInstance.js (axios request interceptor)
                // 3. BEFORE every API call, axiosInstance automatically:
                //    - Reads this token from localStorage
                //    - Adds it to the Authorization header: "Bearer <access_token>"
                //    - Makes the request with authentication
                // 4. NO manual token passing needed in any component
                // 5. Works for ALL HTTP methods (GET, POST, PUT, DELETE, PATCH)
                //
                // 📁 EXAMPLE - Token used automatically in any component:
                //    // In ProfileUpdate component:
                //    import axiosInstance from '../../config/axiosInstance';
                //    
                //    const updateProfile = async () => {
                //        // ✅ Token automatically added from localStorage!
                //        // ✅ No manual token retrieval or passing needed!
                //        const response = await axiosInstance.post('/api/updateProfile', data);
                //        return response;
                //    };
                //
                // 6. All future requests get this token automatically via interceptor
                // 7. Works across patient, doctor, clinic, diagnostic, admin modules
                // 8. One token, universal authentication across entire app
                //
                localStorage.setItem("access_token", resData.access_token);

                // Store clinic specific data
                localStorage.setItem("clinic_suid", resData.suid);
                localStorage.setItem("clinic_Email", resData.email);
                localStorage.setItem("profile", resData.profile_picture);

                // Store JWT decoded information for easy access
                // These values are extracted from the JWT payload
                localStorage.setItem("user_id", userInfo.userId);
                localStorage.setItem("role_id", userInfo.roleId || "");
                localStorage.setItem("jwt_email", userInfo.email || resData.email);

                // Persist cookie for auth guard (checks if user is authenticated)
                // Cookie is used by backend middleware to verify authentication
                // Expires in 7 days
                // Cookie is set domain-wide and can be checked by backend routes
                Cookies.set("clinicEmail", resData.email, { expires: 7 });

                // ============================================
                // UPDATE GLOBAL AUTHENTICATION STATE
                // ============================================
                // Update authentication context (global state management via UserProvider)
                // This updates the UserProvider context so other components know user is logged in
                // UserProvider is a context provider wrapping the entire app
                // Components can access auth state via: const { ClinicLogin } = useAuthentication();
                // This ensures components across the app know if user is authenticated
                ClinicLoginAuth(resData.email);

                // Show success message and navigate to clinic dashboard
                toastService.success("Login successful! Redirecting to dashboard...");
                navigate("/clinicDashboard/clinicbodydashboard/clinirequests", { replace: true });
                setErrorMessageOpen(false);
            } else {
                // ============================================
                // UNEXPECTED RESPONSE HANDLING
                // ============================================
                logger.warn("Unexpected login response:", resData);
                setShowError(true);
                toastService.error("Unexpected response. Please try again.");
            }
        } catch (error) {
            logger.error("Clinic login failed:", error);
            logger.error("Error response:", error?.response?.data);

            // Parse error codes and provide user-friendly messages
            let errorMsg = "Login failed. Please try again.";

            if (error?.response?.data?.error) {
                const errorCode = error.response.data.error;
                switch (errorCode) {
                    case "INVALID_EMAIL":
                        errorMsg = "Invalid email format. Please check and try again.";
                        break;
                    case "INVALID_PASSWORD":
                        errorMsg = "Incorrect password. Please try again.";
                        break;
                    case "USER_NOT_FOUND":
                        errorMsg = "User not found. Please check your email.";
                        break;
                    case "ACCOUNT_LOCKED":
                        errorMsg = "Account is locked. Please contact support.";
                        break;
                    case "VERIFICATION_REQUIRED":
                        errorMsg = "Please verify your email before logging in.";
                        break;
                    default:
                        errorMsg = errorCode || errorMsg;
                }
            } else if (error?.response?.data?.error) {
                errorMsg = error.response.data.error;
            }

            setErrorMessage(errorMsg);
            setErrorMessageOpen(true);
            setShowSnack(false);
            setShowError(false);
            toastService.error(errorMsg);
        } finally {
            setLoading(false);
            setShowSnack(false);
        }
    };

    // ============================================
    // INPUT HANDLERS
    // ============================================

    // Email input change handler with real-time validation
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        // Validate email format using regex pattern from constants
        // Shows helper text: "Valid Email" or "Invalid Email"
        setHelperTextMessage(emailRegex.test(value));
    };

    // Password input change handler with real-time validation
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        // Validate password strength using regex pattern from constants
        // Password must: 8+ characters, include number, include special character
        // Shows helper text based on validation result
        setPasswordHelperTextMessage(passwordRegex.test(value));
    };

    // ============================================
    // RENDER
    // ============================================

    return (
        <>
            {/* Loading overlay for API operations - shows while login is in progress */}
            {loading && (
                <Loading
                    variant="overlay"
                    size="large"
                    message="Logging you in..."
                    subMessage="Please wait while we authenticate your credentials"
                    fullScreen
                />
            )}

            <div className="register-photo">
                {/* Generic error snackbar - shows for unexpected errors */}
                <CustomSnackBar
                    isOpen={showError}
                    message="Some error occurred, please try later"
                    type="error"
                />

                {/* Loading snackbar - shows during API call */}
                <CustomSnackBar
                    isOpen={showSnack}
                    message="Please wait while we log you in"
                    type="success"
                />

                {/* Specific error message snackbar - shows validation/API errors */}
                <CustomSnackBar
                    isOpen={errorMessageOpen}
                    message={errorMessage}
                    type="error"
                />

                {/* Main form container - two-column layout */}
                <Box className="form-container">
                    <div className="image-holder"></div>

                    <Box className="component-library">
                        {/* Logo and Title Container - centered vertically and horizontally */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "130px",
                            }}
                        >
                            {/* Company logo */}
                            <div className="logo1">
                                <img src="images/logo.png" alt="Logo" />
                            </div>

                            {/* Page heading - "Clinic Login" */}
                            <h2 className="text-center">
                                <strong>Clinic Login</strong>
                            </h2>
                        </Box>

                        {/* Email Input Field - with real-time validation */}
                        <CustomTextField
                            id="email-input"
                            label="Email"
                            value={email}
                            helperText={email ? (helperTextMessage ? "Valid Email" : "Invalid Email") : ""}
                            onChange={handleEmailChange}
                            textcss={{ width: "19.5em" }}
                        />

                        {/* Password Input Field - with strength validation and visibility toggle */}
                        <CustomTextField
                            id="password-input"
                            label="Password"
                            value={password}
                            helperText={
                                password
                                    ? passwordHelperTextMessage
                                        ? "Valid Password"
                                        : "Password must be 8+ characters with a number and special character"
                                    : ""
                            }
                            type={showPassword ? "password" : "text"}
                            onChange={handlePasswordChange}
                            textcss={{ width: "19.5em" }}
                            // Toggle password visibility icon
                            rightIcon={
                                showPassword ? (
                                    <VisibilityIcon onClick={() => setShowPassword(false)} />
                                ) : (
                                    <VisibilityOffIcon onClick={() => setShowPassword(true)} />
                                )
                            }
                        />

                        {/* Login Button - shows loading spinner when submitting */}
                        <CustomButton
                            label={loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
                            isDisabled={loading} // Disable button during API call to prevent double submissions
                            handleClick={fetchData} // Triggers login API call
                            buttonCss={{
                                width: "60%", // Take up 60% of container width
                                padding: "10px",
                                borderRadius: "100px", // Fully rounded button
                                marginTop: "20px",
                            }}
                            aria-label="Submit login form" // Accessibility label
                        />

                        {/* Forgot Password Link - navigates to password recovery */}
                        <div className="forgotpassword" style={{ fontSize: "small" }}>
                            <Link to="/patientforgotpassword" className="link">
                                Forgot Password
                            </Link>
                        </div>

                        {/* Login with OTP Link - alternative login method */}
                        <div className="mobile" style={{ fontSize: "small" }}>
                            <Link
                                to="/loginwithotp"
                                className="link"
                                onClick={() => localStorage.setItem("signUp", "clinic")} // Store role for OTP login flow
                            >
                                Log In with OTP
                            </Link>
                        </div>
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default ClinicLogin;
