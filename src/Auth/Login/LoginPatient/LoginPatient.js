/**
 * PatientLogin Component
 * 
 * Handles patient authentication and login functionality.
 * Features:
 * - Email and password authentication
 * - JWT token management
 * - Automatic token refresh
 * - User profile completion detection
 * - Role-based navigation
 * - Secure token storage
 */

import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "./LoginPatient.scss";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axiosInstance from "../../../config/axiosInstance";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";
import { useAuthentication } from "../../../loginComponent/UserProvider";
import CustomSnackBar from "../../../components/CustomSnackBar/custom-sack-bar";
import { Loading } from "../../../components/Loading";
import { baseURL, emailRegex, passwordRegex } from "../../../constants/const";
import { decodeJWT, getCurrentUser } from "../../../utils/jwtUtils";
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";
import Cookies from "js-cookie";

const PatientLogin = () => {
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
    const [showError, setShowError] = useState(false); // Error snackbar
    const [errorMessage, setErrorMessage] = useState(""); // Specific error message
    const [errorMessageOpen, setErrorMessageOpen] = useState(false); // Error message snackbar
    const [invalidUserMessage, setInvalidUserMessage] = useState(""); // Invalid user message
    
    // Input validation feedback states
    const [helperTextMessage, setHelperTextMessage] = useState(false); // Email validation
    const [passwordHelperTextMessage, setPasswordHelperTextMessage] = useState(false); // Password validation
    
    // Loading state for API operations
    const [loading, setLoading] = useState(false);
    
    // Authentication context hook
    const { PatientLogin: authLogin } = useAuthentication();
    
    // Navigation hook
    const navigate = useNavigate();

    // ============================================
    // Login Handler
    // ============================================
    
    /**
     * Handle patient login process
     * - Validates email and password inputs
     * - Sends login request to backend
     * - Handles JWT token storage and decoding
     * - Navigates based on profile completion status
     */
    const handleLogin = async () => {
        // ============================================
        // Input Validation
        // ============================================
        
        // Validate that both email and password are provided
        if (!email && !password) {
            setErrorMessage("Please enter email and password");
            setErrorMessageOpen(true);
            return;
        } else if (!email) {
            setErrorMessage("Please enter your email");
            setErrorMessageOpen(true);
            return;
        } else if (!password) {
            setErrorMessage("Please enter your password");
            setErrorMessageOpen(true);
            return;
        }

        // Prepare login payload
        const loginData = {
            email,
            password,
            login_with_email: true, // Flag indicating email-based login
            mobile: null, // Not used for email login
            role_id: 5, // Patient role ID
        };

        try {
            // Set loading and notification states
            setShowSnack(true);
            setShowError(false);
            setLoading(true);
            setErrorMessageOpen(false);

            // Use axiosInstance for authenticated requests (adds JWT automatically)
            const response = await axiosInstance.post(
                `${baseURL}/sec/auth/login`,
                JSON.stringify(loginData),
                {
                    headers: { Accept: "Application/json" },
                },
            );

            const resData = response?.data?.response;
            logger.info("Login response received:", resData);

            // ============================================
            // Handle Profile Completion Status
            // ============================================
            
            // Case 1: User profile is incomplete - redirect to profile completion
            if (resData?.body === "INCOMPLETE_PROFILE") {
                localStorage.setItem("patient_Email", email);
                logger.info("User profile incomplete, redirecting to profile completion");
                navigate("/patientcompleteprofile");
            } 
            // Case 2: Login successful with access token
            else if (resData?.access_token) {
                // Decode JWT to get user information
                const userInfo = decodeJWT(resData.access_token);
                logger.debug("Decoded user info from JWT:", userInfo);
                
                // Store user authentication data in localStorage
                localStorage.setItem("patient_Email", email);
                localStorage.setItem("access_token", resData.access_token); // JWT token
                localStorage.setItem("patient_suid", resData.suid); // User ID from backend
                localStorage.setItem("profile", resData.profile_picture); // Profile picture URL
                
                // Set cookie for auth guard persistence (7-day expiry)
                Cookies.set("patientEmail", email, { expires: 7 });
                
                // Store additional user info extracted from JWT payload
                localStorage.setItem("user_id", userInfo.userId);
                localStorage.setItem("role_id", userInfo.roleId || "");
                localStorage.setItem("jwt_email", userInfo.email || email);

                logger.info("Patient login successful, navigating to dashboard");
                
                // Show success notification to user
                toastService.success("Login successful! Redirecting to dashboard...");
                
                // Update authentication context
                authLogin(resData.email);
                
                // Navigate to patient dashboard (replace history to prevent back navigation to login)
                navigate("/patientDashboard/dashboard", { replace: true });
            } 
            // Case 3: No valid response from backend
            else {
                logger.warn("Login response missing access_token");
                setShowError(true);
            }
        } catch (error) {
            logger.error("Login failed:", error);
            logger.error("Error response:", error?.response?.data);
            
            // Parse specific error codes from backend
            let errorMsg = "Login failed. Please try again.";
            
            if (error?.response?.data?.error) {
                switch (error.response.data.error) {
                    case "INVALID_EMAIL":
                        errorMsg = "Invalid email address. Please check and try again.";
                        break;
                    case "INVALID_PASSWORD":
                        errorMsg = "Invalid password. Please check and try again.";
                        break;
                    case "USER_NOT_FOUND":
                        errorMsg = "User not found. Please check your email or sign up.";
                        break;
                    case "ACCOUNT_LOCKED":
                        errorMsg = "Account is locked. Please contact support.";
                        break;
                    case "VERIFICATION_REQUIRED":
                        errorMsg = "Email verification required. Please verify your email.";
                        break;
                    default:
                        errorMsg = error.response.data.error;
                }
            } else if (error?.response?.data?.message) {
                errorMsg = error.response.data.message;
            }
            
            setErrorMessage(errorMsg);
            setErrorMessageOpen(true);
            setShowSnack(false);
            setShowError(true);
            
            // Also show toast notification
            toastService.error(errorMsg);
        } finally {
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
            
            {/* Error snackbar for general errors */}
            <CustomSnackBar
                isOpen={showError}
                message={"Some error occurred, please try again later"}
                type="error"
            />
            
            {/* Success snackbar for loading state */}
            <CustomSnackBar
                isOpen={showSnack}
                message={"Please wait while we are logging you in"}
                type="success"
            />
            
            {/* Specific error message snackbar */}
            <CustomSnackBar isOpen={errorMessageOpen} message={errorMessage} type="error" />

            {/* Form container - split screen layout */}
            <div className="form-container">
                {/* Background decorative image on left side */}
                <div className="image-holder"></div>

                {/* Form content on right side */}
                <div className="component-library">
                    {/* Logo and Title Section */}
                    <Box 
                        sx={{
                            paddingTop: "130px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/* Application Logo */}
                        <div className="logo1">
                            <img src="images/logo.png" alt="Logo" />
                        </div>
                        
                        {/* Page Title */}
                        <h2 className="text-center" style={{ alignItems: "center" }}>
                            <strong>Patient Login</strong>
                        </h2>
                    </Box>

                    {/* Email Input Field with Validation */}
                    <CustomTextField
                        id="email"
                        label="Email"
                        defaultValue={email}
                        value={email}
                        helperText={email && (helperTextMessage ? "Valid Email" : "Invalid Email")}
                        onChange={(event) => {
                            const value = event.target.value;
                            setEmail(value);
                            // Validate email format using regex
                            setHelperTextMessage(emailRegex.test(value));
                        }}
                        textcss={{ width: "19.5em" }}
                    />

                    {/* Password Input Field with Validation and Visibility Toggle */}
                    <CustomTextField
                        id="password"
                        label="Password"
                        defaultValue={password}
                        value={password}
                        helperText={
                            password &&
                            (passwordHelperTextMessage ? "Valid Password" : "Password must be 8+ characters with a number and special character")
                        }
                        type={showPassword ? "password" : "text"}
                        onChange={(event) => {
                            const value = event.target.value;
                            setPassword(value);
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
                        label={loading ? <CircularProgress size={4} color="inherit" /> : "Log In"}
                        isDisabled={loading} // Disable during login process
                        handleClick={handleLogin}
                        buttonCss={{
                            width: "60%",
                            padding: "10px",
                            borderRadius: "100px",
                            mt: 2,
                        }}
                        aria-label="Submit login form"
                    />

                    {/* Forgot Password Link */}
                    <div className="forgotpassword" style={{ fontSize: "small" }}>
                        <Link to="/forgotpassword" className="link">
                            Forgot Password
                        </Link>
                    </div>
                    
                    {/* Login with OTP Link */}
                    <div className="mobile" style={{ fontSize: "small" }}>
                        <Link 
                            to="/loginwithotp" 
                            className="link"
                            onClick={() => localStorage.setItem("signUp", "patient")} // Set user role for OTP login
                        >
                            Log In with OTP
                        </Link>
                    </div>
                    
                    {/* Sign Up Link */}
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
                        <Link to="/SignupPage" className="link">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientLogin;
