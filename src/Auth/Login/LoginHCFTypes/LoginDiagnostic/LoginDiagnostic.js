/**
 * DiagnosticLogin Component
 * 
 * Handles Diagnostic Center authentication and login functionality.
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
import "./LoginDiagnostic.scss";
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

const DiagnosticLogin = () => {
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    
    // Password visibility toggle state
    const [showPassword, setShowPassword] = useState(true);
    
    // Form input states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Validation states
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    
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
    // NOTE: DiagnostLogin updates global auth state in UserProvider
    // This is used throughout the app to check if user is logged in
    const { DiagnostLogin } = useAuthentication();

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
            role_id: 4, // Diagnostic Center role
        };

        try {
            logger.info("Diagnostic Center login attempt for:", email);
            setShowSnack(true);
            setErrorMessageOpen(false);
            setLoading(true);
            setShowError(false);

            // ============================================
            // API CALL USING AXIOSINSTANCE (REUSABLE TOKEN HANDLING)
            // ============================================
            // axiosInstance is a configured axios instance that automatically handles JWT tokens
            // Location: config/axiosInstance.js
            //
            // HOW IT WORKS:
            // 1. Automatically reads 'access_token' from localStorage before each request
            // 2. Adds token to Authorization header as: "Bearer <access_token>"
            // 3. Handles 401 errors (expired tokens) by attempting token refresh
            // 4. Automatically retries failed requests after token refresh
            //
            // REUSABLE THROUGHOUT APP:
            // - Any component can import and use axiosInstance
            // - No need to manually add tokens to each request
            // - Centralized token management means one place to update logic
            // - Example usage in other components:
            //   import axiosInstance from "../../config/axiosInstance";
            //   const response = await axiosInstance.get("/api/endpoint");
            //
            // SECURITY BENEFITS:
            // - Token stored in localStorage (XSS protected if configured properly)
            // - Automatically refreshed on expiration
            // - No tokens in URL parameters
            // - Consistent authentication across all API calls
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
            logger.info("Diagnostic Center login response:", resData);

            if (resData?.body === "INCOMPLETE_PROFILE") {
                // ============================================
                // INCOMPLETE PROFILE HANDLING
                // ============================================
                // Backend response structure for incomplete profile:
                // {
                //   body: "INCOMPLETE_PROFILE",
                //   data: {
                //     suid: 429,
                //     email: "younus@t57.a67",
                //     access_token: "eyJ...",
                //     role_id: 4,
                //     profile_picture: "...",
                //     contact_no_primary: "..."
                //   }
                // }
                
                // Extract data from nested data object
                const profileData = resData.data || resData; // Try both structures
                logger.info("Incomplete profile detected, stored diagnostic data:", profileData.email, profileData.suid);
                
                // Store JWT access token (CRITICAL - required for profile completion API)
                localStorage.setItem("access_token", profileData.access_token);
                
                // Store diagnostic center data for incomplete profile
                localStorage.setItem("login_Email", profileData.email);
                localStorage.setItem("email", profileData.email);
                localStorage.setItem("diagnostic_Email", profileData.email); // Also store as diagnostic_Email for consistency
                localStorage.setItem("diagnostic_suid", profileData.suid);
                
                // Store JWT decoded information if available
                if (profileData.access_token) {
                    const userInfo = decodeJWT(profileData.access_token);
                    if (userInfo) {
                        localStorage.setItem("user_id", userInfo.userId);
                        localStorage.setItem("role_id", userInfo.roleId || profileData.role_id || "4");
                        localStorage.setItem("jwt_email", userInfo.email || profileData.email);
                    }
                }
                
                // Store additional response data for profile completion
                localStorage.setItem("profile_picture", profileData.profile_picture);
                localStorage.setItem("contact_no_primary", profileData.contact_no_primary);
                
                logger.info("=== INCOMPLETE PROFILE DATA STORAGE ===");
                logger.info("Full response data:", profileData);
                logger.info("access_token stored:", !!profileData.access_token);
                logger.info("email stored:", profileData.email);
                logger.info("suid stored:", profileData.suid);
                logger.info("role_id stored:", profileData.role_id);
                logger.info("All localStorage after storage:", Object.keys(localStorage));
                logger.info("diagnostic_suid value:", localStorage.getItem("diagnostic_suid"));
                logger.info("email value:", localStorage.getItem("email"));
                logger.info("access_token value:", localStorage.getItem("access_token"));
                
                toastService.info("Redirecting to complete your profile");
                navigate("/diagnosticCompleteProfile", { replace: true });
            } else if (resData?.access_token) {
                // ============================================
                // SUCCESSFUL LOGIN - TOKEN MANAGEMENT
                // ============================================
                logger.info("Diagnostic Center login successful, storing tokens and navigating to dashboard");

                // ============================================
                // TOKEN STORAGE & MANAGEMENT
                // ============================================
                
                // Decode JWT token to extract user information
                // decodeJWT is a utility function from jwtUtils
                // It extracts payload from JWT token without verifying signature
                // Payload typically contains: userId, roleId, email, exp, iat
                const userInfo = decodeJWT(resData.access_token);
                logger.debug("Decoded user info from JWT:", userInfo);

                // Store JWT access token in localStorage
                // IMPORTANT: This token is automatically added to ALL future API requests via axiosInstance
                // Location: config/axiosInstance.js (axios request interceptor)
                // HOW IT WORKS:
                // 1. Token stored here in localStorage.setItem("access_token", ...)
                // 2. axiosInstance interceptor reads this token before every API call
                // 3. Token is added as: Authorization: "Bearer <access_token>"
                // 4. No need to manually pass token in any component
                // 5. Works across entire application - automatically reused
                localStorage.setItem("access_token", resData.access_token);
                
                // Store diagnostic center specific data
                localStorage.setItem("diagnostic_suid", resData.suid);
                localStorage.setItem("diagnostic_Email", resData.email);
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
                Cookies.set("diagnostic_Email", resData.email, { expires: 7 });

                // ============================================
                // UPDATE GLOBAL AUTHENTICATION STATE
                // ============================================
                // Update authentication context (global state management via UserProvider)
                // This updates the UserProvider context so other components know user is logged in
                // UserProvider is a context provider wrapping the entire app
                // Components can access auth state via: const { DiagnostLogin } = useAuthentication();
                // This ensures components across the app know if user is authenticated
                DiagnostLogin(resData.email);

                // Show success message and navigate to diagnostic center dashboard
                toastService.success("Login successful! Redirecting to dashboard...");
                navigate("/diagnostCenterDashboard/notification", { replace: true });
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
            logger.error("Diagnostic Center login failed:", error);
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
            setEmail("");
            setPassword("");
            toastService.error(errorMsg);
        } finally {
            setShowSnack(false);
            setLoading(false);
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
        setEmailValid(emailRegex.test(value));
    };

    // Password input change handler with real-time validation
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        // Validate password strength using regex pattern from constants
        // Password must: 8+ characters, include number, include special character
        // Shows helper text based on validation result
        setPasswordValid(passwordRegex.test(value));
    };

    return (
        <div className="register-photo">
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
                <Box className="component-library" >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "100px"
                        }}
                    >
                        <div className="logo1">
                            <img src="images/logo.png" alt="Logo" />
                        </div>
                        <h2 className="text-center">
                            <strong>Diagnostic Login</strong>
                        </h2>
                    </Box>

                    <CustomTextField
                        id="email-input"
                        label="Email"
                        value={email}
                        defaultValue={email}
                        helperText={email ? (emailValid ? "Valid Email" : "Invalid Email") : ""}
                        onChange={handleEmailChange}
                        textcss={{ width: "19.5em" }}
                    />

                    <CustomTextField
                        id="password-input"
                        label="Password"
                        value={password}
                        helperText={
                            password
                                ? passwordValid
                                    ? "Valid Password"
                                    : "Password must be 8+ characters with a number and special character"
                                : ""
                        }
                        type={showPassword ? "password" : "text"}
                        onChange={handlePasswordChange}
                        defaultValue={password}
                        textcss={{ width: "19.5em" }}
                        rightIcon={
                            showPassword ? (
                                <VisibilityIcon onClick={() => setShowPassword(false)} />
                            ) : (
                                <VisibilityOffIcon onClick={() => setShowPassword(true)} />
                            )
                        }
                    />

                    <CustomButton
                        label={loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
                        isDisabled={loading}
                        handleClick={fetchData}
                        buttonCss={{
                            width: "60%",
                            padding: "10px",
                            borderRadius: "100px",
                            marginTop: "16px",
                        }}
                        aria-label="Submit login form"
                    />

                    <div className="forgotpassword" style={{ fontSize: "small" }}>
                        <Link to="/forgotpassword" className="link">
                            Forgot Password
                        </Link>
                    </div>
                    <div className="mobile" style={{ fontSize: "small" }}>
                        <Link 
                            to="/loginwithotp" 
                            className="link"
                            onClick={() => localStorage.setItem("signUp", "diagnostic_center")}
                        >
                            Log In with OTP
                        </Link>
                    </div>
                    {/* <div
                        className="already"
                        style={{
                            display: "inline",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "small",
                        }}
                    >
                        I don&apos;t have an account &nbsp;
                        <Link to="/patientsignup" className="link">
                            Create Account
                        </Link>
                    </div> */}
                </Box>
            </Box>
        </div>
    );
};

export default DiagnosticLogin;
