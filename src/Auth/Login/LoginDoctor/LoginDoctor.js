/**
 * DoctorLogin Component
 * 
 * Handles doctor authentication and login functionality.
 * Features:
 * - Email and password authentication
 * - JWT token management
 * - Profile completion detection
 * - Role-based navigation
 * - Secure token storage
 */

import React, { useState } from "react";
import "./loginDoctor.scss";
import { Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// axiosInstance - automatically handles JWT tokens in all requests
// Located in: config/axiosInstance.js
// Features: Auto-attach token, auto-refresh on 401, token management
import axiosInstance from "../../../config/axiosInstance"; // Replaced axios
import { useAuthentication } from "../../../loginComponent/UserProvider";
import CustomSnackBar from "../../../components/CustomSnackBar";
import CustomTextField from "../../../components/CustomTextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomButton from "../../../components/CustomButton";
import { baseURL, emailRegex, passwordRegex } from "../../../constants/const";
import Cookies from "js-cookie";
import logger from "../../../utils/logger"; // Added logger
import toastService from "../../../services/toastService"; // Added toastService
import { Loading } from "../../../components/Loading"; // Added Loading component

const LoginDoctor = () => {
    // ============================================
    // State Management
    // ============================================
    
    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(true);
    
    // Form input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Snackbar notification states
    const [showSnack, setShowSnack] = useState(false); // General info snackbar
    const [invalidUser, setInvalidUser] = useState(false); // Invalid user snackbar
    const [invalidUserMessage, setInvalidUserMessage] = useState(""); // Invalid user message
    const [errorState, setErrorState] = useState(false); // Error state snackbar
    const [errorMessage, setErrorMessage] = useState(""); // Specific error message
    const [errorMessageOpen, setErrorMessageOpen] = useState(false); // Error message snackbar
    
    // Input validation feedback states
    const [helperTextMessage, setHelperTextMessage] = useState(false); // Email validation
    const [passwordHelperTextMessage, setPasswordHelperTextMessage] = useState(false); // Password validation
    
    // Loading state for API operations
    const [loading, setLoading] = useState(false);
    
    // Navigation and authentication context hooks
    const navigate = useNavigate();
    const { DoctorLogin } = useAuthentication();

    // ============================================
    // Login Handler
    // ============================================
    
    /**
     * Handle doctor login process
     * - Validates email and password inputs
     * - Sends login request to backend
     * - Handles JWT token storage
     * - Navigates based on profile completion status
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that both email and password are provided
        if (!email || !password) {
            logger.warn("Login attempt with missing credentials");
            setErrorMessage("Please enter email and password");
            setErrorMessageOpen(true);
            toastService.error("Please enter both email and password");
            return;
        }

        setShowSnack(true);
        setLoading(true);

        const payload = {
            email,
            password,
            login_with_email: true,
            role_id: 3, // Doctor role ID
        };

        try {
            // ============================================
            // API REQUEST WITH TOKEN MANAGEMENT
            // ============================================
            // Use axiosInstance for authenticated requests (adds JWT automatically)
            // NOTE: axiosInstance is configured in config/axiosInstance.js
            // - Automatically reads access_token from localStorage
            // - Adds Bearer token to Authorization header
            // - Handles token refresh automatically
            // - Reusable throughout entire application
            const response = await axiosInstance.post(
                "/sec/auth/login",
                JSON.stringify(payload),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            
            logger.info("Doctor login response:", response);
            const res = response?.data?.response;

            if (res?.body === "INCOMPLETE_PROFILE") {
                // ============================================
                // INCOMPLETE PROFILE HANDLING
                // ============================================
                // If doctor profile is incomplete, redirect to completion page
                logger.info("Incomplete profile detected, navigating to profile completion");
                
                // Store doctor ID for profile completion
                localStorage.setItem("doctor_suid", res?.suid);
                localStorage.setItem("email", email);
                
                toastService.success("Redirecting to complete your profile");
                navigate("/doctorCompleteProfile");
            } else if (response?.data?.error === "invalid user") {
                // ============================================
                // INVALID USER HANDLING
                // ============================================
                logger.error("Invalid user error:", response?.data?.error);
                setInvalidUser(true);
                setInvalidUserMessage("Invalid credentials. Please try again.");
                toastService.error("Invalid credentials. Please check your email and password.");
            } else if (res?.access_token) {
                // ============================================
                // SUCCESSFUL LOGIN - TOKEN MANAGEMENT
                // ============================================
                logger.info("Doctor login successful, storing tokens and navigating to dashboard");
                
                // Store JWT access token in localStorage
                // NOTE: This token is automatically added to all future API requests via axiosInstance
                // Located in: config/axiosInstance.js (axios interceptor)
                localStorage.setItem("access_token", res?.access_token);
                
                // Store user identification data
                localStorage.setItem("email", res?.email);
                localStorage.setItem("doctor_suid", res?.suid);
                localStorage.setItem("path", "request");
                localStorage.setItem("logged_as", "doctor");
                localStorage.setItem("profile", res?.profile_picture);
                
                // Persist cookie for auth guard (checks if user is authenticated)
                // Cookie is used by backend middleware to verify authentication
                Cookies.set("doctorEmail", res?.email, { expires: 7 });
                
                // Update authentication context (global state management)
                // This updates the UserProvider context so other components know user is logged in
                DoctorLogin(res?.email);
                setInvalidUser(false);
                
                // Show success message and navigate to doctor dashboard
                toastService.success("Login successful! Redirecting to dashboard...");
                navigate("/doctorDashboard", { replace: true });
            } else {
                // ============================================
                // UNEXPECTED RESPONSE HANDLING
                // ============================================
                logger.warn("Unexpected login response:", res);
                setErrorState(true);
                setErrorMessage("Unexpected response. Please try again.");
                toastService.error("Login failed. Please try again.");
            }
        } catch (error) {
            logger.error("Doctor login failed:", error);
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
                        errorMsg = "Doctor not found. Please check your email.";
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
            }
            
            setErrorState(true);
            setErrorMessage(errorMsg);
            toastService.error(errorMsg);
        } finally {
            setShowSnack(false);
            setLoading(false);
        }
    };

    // ============================================
    // Render
    // ============================================
    
    return (
        <div className="register-photo">
            {/* Loading overlay - shown during login process */}
            {loading && (
                <Loading 
                    variant="overlay"
                    size="large"
                    message="Logging you in..."
                    subMessage="Please wait while we authenticate your credentials"
                    fullScreen
                />
            )}
            
            {/* Success snackbar for loading state */}
            <CustomSnackBar isOpen={showSnack} message="Please wait while we are logging you in" type="success" />
            
            {/* Invalid user snackbar */}
            <CustomSnackBar isOpen={invalidUser} message={invalidUserMessage} type="error" />
            
            {/* Error state snackbar */}
            <CustomSnackBar isOpen={errorState} message={errorMessage} type="error" />
            
            {/* Specific error message snackbar */}
            <CustomSnackBar isOpen={errorMessageOpen} message={errorMessage} type="error" />

            {/* Form container - split screen layout */}
            <div className="form-container">
                {/* Background decorative image on left side */}
                <div className="image-holder" />
                
                {/* Form content on right side */}
                <div className="component-library">
                    {/* Logo and Title Section */}
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ paddingTop: "130px" }}>
                        {/* Application Logo */}
                        <div className="logo1">
                            <img src="images/logo.png" alt="Logo" />
                        </div>
                        
                        {/* Page Title */}
                        <h2 className="text-center"><strong>Doctor Login</strong></h2>
                    </Box>

                    {/* Email Input Field with Validation */}
                    <CustomTextField
                        id="email-input"
                        label="Email"
                        value={email}
                        defaultValue={email}
                        helperText={email ? (helperTextMessage ? "Valid Email" : "Invalid Email") : ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEmail(value);
                            logger.debug("Email input changed");
                            // Validate email format using regex
                            setHelperTextMessage(emailRegex.test(value));
                        }}
                        textcss={{ width: "19.5em" }}
                    />

                    {/* Password Input Field with Validation and Visibility Toggle */}
                    <CustomTextField
                        id="password"
                        label="Password"
                        value={password}
                        defaultValue={password}
                        helperText={
                            password
                                ? (passwordHelperTextMessage
                                    ? "Valid Password"
                                    : "Password must be 8+ characters with a number and special character")
                                : ""
                        }
                        type={showPassword ? "password" : "text"}
                        onChange={(e) => {
                            const value = e.target.value;
                            setPassword(value);
                            logger.debug("Password input changed");
                            // Validate password strength using regex
                            setPasswordHelperTextMessage(passwordRegex.test(value));
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

                    {/* Login Button with Loading State */}
                    <CustomButton
                        label={loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
                        isDisabled={loading}
                        handleClick={handleSubmit}
                        buttonCss={{
                            width: "60%",
                            padding: "10px",
                            borderRadius: "100px",
                            marginTop: "20px",
                        }}
                    />

                    {/* Forgot Password Link */}
                    <div className="forgotpassword" style={{ fontSize: "small" }}>
                        <Link to="/forgotpassword" className="link">Forgot Password</Link>
                    </div>
                    
                    {/* Login with OTP Link */}
                    <div className="mobile" style={{ fontSize: "small" }}>
                        <Link 
                            to="/loginwithotp" 
                            className="link"
                            onClick={() => {
                                localStorage.setItem("signUp", "doctor");
                                logger.debug("Navigating to OTP login for doctor");
                            }}
                        >
                            Log In with OTP
                        </Link>
                    </div>
                    
                    {/* Sign Up Link */}
                    <div className="already" style={{
                        display: "inline",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "small",
                    }}>
                        I don&apos;t have an account &nbsp;
                        <Link to="/signupPage" className="link">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginDoctor;
