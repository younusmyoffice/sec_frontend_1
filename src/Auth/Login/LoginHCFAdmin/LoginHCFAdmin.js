/**
 * HcfAdminLogin Component
 * 
 * Handles HCF Admin authentication and login functionality.
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
import { Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// Removed import axios from "axios"; - using axiosInstance instead

import "./LoginHCFAdmin.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// axiosInstance - automatically handles JWT tokens in all requests
// Located in: config/axiosInstance.js
// Features: Auto-attach token, auto-refresh on 401, token management
import axiosInstance from "../../../config/axiosInstance";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";
import { useAuthentication } from "../../../loginComponent/UserProvider";
import CustomSnackBar from "../../../components/CustomSnackBar/custom-sack-bar";
import { baseURL, emailRegex, passwordRegex } from "../../../constants/const";
import { decodeJWT } from "../../../utils/jwtUtils";
import Cookies from "js-cookie";
import logger from "../../../utils/logger"; // Added logger
import toastService from "../../../services/toastService"; // Added toastService
import { Loading } from "../../../components/Loading"; // Added Loading component

const HcfAdminLogin = () => {
    // ============================================
    // State Management
    // ============================================
    
    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(true);
    
    // Form input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Snackbar notification states
    const [showSnack, setShowSnack] = useState(false); // Loading snackbar
    const [helperTextMessage, setHelperTextMessage] = useState(false); // Email validation feedback
    const [passwordHelperTextMessage, setPasswordHelperTextMessage] = useState(false); // Password validation feedback
    const [errorMessage, setErrorMessage] = useState(""); // Error message text
    const [errorMessageOpen, setErrorMessageOpen] = useState(false); // Error snackbar visibility
    const [showError, setShowError] = useState(false); // Generic error snackbar
    
    // Loading state for API operations
    const [loading, setLoading] = useState(false);

    // Navigation and authentication context hooks
    const navigate = useNavigate();
    const { HealthCare } = useAuthentication();

    // ============================================
    // Login Handler
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

        // Prepare request payload
        const requestData = {
            email,
            password,
            login_with_email: true,
            mobile: null,
            role_id: 2, // HCF Admin role
        };

        try {
            logger.info("HCF Admin login attempt for:", email);
            setLoading(true);
            setShowSnack(true);
            
            // Use axiosInstance for authenticated requests (adds JWT automatically)
            // NOTE: axiosInstance is configured in config/axiosInstance.js
            // - Automatically reads access_token from localStorage
            // - Adds Bearer token to Authorization header
            // - Handles token refresh automatically
            // - Reusable throughout entire application
            const response = await axiosInstance.post(
                "/sec/auth/login",
                JSON.stringify(requestData),
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                },
            );

            const resData = response?.data?.response;
            logger.info("HCF Admin login response:", resData);

            if (resData?.body === "INCOMPLETE_PROFILE") {
                // ============================================
                // INCOMPLETE PROFILE HANDLING
                // ============================================
                // If HCF Admin profile is incomplete, redirect to completion page
                logger.info("Incomplete profile detected, using response data:", resData);
                
                // Store the email and suid from the response
                localStorage.setItem("hcfadmin_Email", resData.email || email);
                localStorage.setItem("hcfadmin_suid", resData.suid);
                
                logger.debug("Stored email for incomplete profile:", resData.email || email);
                logger.debug("Stored suid for incomplete profile:", resData.suid);
                logger.info("Navigating to signup for incomplete profile");
                
                toastService.info("Redirecting to complete your profile");
                navigate("/hcfAdminCompleteProfile");
            } else if (resData?.access_token) {
                // ============================================
                // SUCCESSFUL LOGIN - TOKEN MANAGEMENT
                // ============================================
                logger.info("HCF Admin login successful, storing tokens and navigating to dashboard");
                
                // Decode JWT token to extract user information
                const userInfo = decodeJWT(resData.access_token);
                logger.debug("Decoded user info from JWT:", userInfo);

                // Store JWT access token in localStorage
                // NOTE: This token is automatically added to all future API requests via axiosInstance
                // Located in: config/axiosInstance.js (axios interceptor)
                localStorage.setItem("access_token", resData.access_token);
                localStorage.setItem("hcfadmin_Email", resData.email);
                localStorage.setItem("hcfadmin_suid", resData.suid);
                localStorage.setItem("profile", resData.profile_picture);
                
                // Persist cookie for auth guard (checks if user is authenticated)
                // Cookie is used by backend middleware to verify authentication
                Cookies.set("hcfadmin_Email", resData.email, { expires: 7 });

                // Store JWT decoded information
                localStorage.setItem("user_id", userInfo.userId);
                localStorage.setItem("role_id", userInfo.roleId || "");
                localStorage.setItem("jwt_email", userInfo.email || resData.email);

                // Update authentication context (global state management)
                // This updates the UserProvider context so other components know user is logged in
                HealthCare(resData.email);
                
                // Show success message and navigate to HCF admin dashboard
                toastService.success("Login successful! Redirecting to dashboard...");
                navigate("/hcfadmin/notification", { replace: true });
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
            logger.error("HCF Admin login failed:", error);
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
                        errorMsg = error.response.data.error || errorMsg;
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
    // Render
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
                    message={"Some error occurred, please try later"}
                    type="error"
                />

                {/* Loading snackbar - shows during API call */}
                <CustomSnackBar
                    isOpen={showSnack}
                    message={"Please wait while we are logging you in"}
                    type="success"
                />

                {/* Specific error message snackbar - shows validation/API errors */}
                <CustomSnackBar isOpen={errorMessageOpen} message={errorMessage} type="error" />

                {/* Main form container - two-column layout */}
                <div className="form-container">
                    {/* Left side: Decorative image background */}
                    <div className="image-holder" />

                    {/* Right side: Form content with inputs and buttons */}
                    <div className="component-library">
                        {/* Logo and Title Container - centered vertically and horizontally */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "130px", // Space from top
                            }}
                        >
                            {/* Company logo */}
                            <div className="logo1">
                                <img src="images/logo.png" alt="Logo" width="200" />
                            </div>
                            
                            {/* Page heading - "HCF Admin Login" */}
                            <h2 className="text-center">
                                <strong>HCF Admin Login</strong>
                            </h2>
                        </Box>

                        {/* Email Input Field - with real-time validation */}
                        <CustomTextField
                            id="email-input"
                            label="Email"
                            defaultValue={email}
                            value={email}
                            helperText={email && (helperTextMessage ? "Valid Email" : "Invalid Email")}
                            onChange={(event) => {
                                const val = event.target.value;
                                setEmail(val);
                                logger.debug("Email input changed");
                                // Validate email format using regex
                                setHelperTextMessage(emailRegex.test(val));
                            }}
                            textcss={{ width: "19.5em" }}
                        />

                        {/* Password Input Field - with strength validation and visibility toggle */}
                        <CustomTextField
                            id="password-input"
                            label="Password"
                            defaultValue={password}
                            value={password}
                            type={showPassword ? "password" : "text"} // Toggle between password and text
                            helperText={
                                password &&
                                (passwordHelperTextMessage ? "Valid Password" : "Password must be 8+ characters with a number and special character")
                            }
                            onChange={(event) => {
                                const val = event.target.value;
                                setPassword(val);
                                logger.debug("Password input changed");
                                // Validate password strength using regex
                                setPasswordHelperTextMessage(passwordRegex.test(val));
                            }}
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
                            <Link to="/forgotpassword" className="link">
                                Forgot Password
                            </Link>
                        </div>
                        
                        {/* Login with OTP Link - alternative login method */}
                        <div className="mobile" style={{ fontSize: "small" }}>
                            <Link 
                                to="/loginwithotp" 
                                className="link"
                                onClick={() => localStorage.setItem("signUp", "hcf_admin")} // Store role for OTP login flow
                            >
                                Log In with OTP
                            </Link>
                        </div>
                        
                        {/* Sign Up Link - redirects to registration page */}
                        <div
                            className="already"
                            style={{
                                display: "inline",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "small",
                            }}
                        >
                            I Don&apos;t have an account &nbsp;
                            <Link to="/signupPage" className="link">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HcfAdminLogin;
