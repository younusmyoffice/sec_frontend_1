/**
 * PatientSignup Component
 * 
 * This component handles user registration for different user types:
 * - Patient
 * - Doctor
 * - HCF Admin
 * - Clinic
 * - Diagnostic Center
 * - Super Admin
 * 
 * Features:
 * - Mobile number validation with country code selection
 * - Email validation
 * - Password strength validation
 * - Password confirmation
 * - Real-time validation feedback
 * - Role-based routing
 */

import React, { useCallback, useEffect, useState } from "react";
import "./SignupPage.scss";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomCountryCodeSelector from "../../../components/CustomCountryCodeSelector";
import { useMobileValidation } from "../../../hooks/useMobileValidation";
import axiosInstance from "../../../config/axiosInstance";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { baseURL, emailRegex, passwordRegex } from "../../../constants/const";
import CustomSnackBar from "../../../components/CustomSnackBar";
import { Loading } from "../../../components/Loading";
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";

const patientsignup = () => {
    // ============================================
    // State Management
    // ============================================
    
    // Password visibility toggles
    const [showPassword, setShowPassword] = useState(true);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
    
    // Form data state
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    
    // Module/user type state
    const [module, setModule] = useState();
    const [moduleName, setModuleName] = useState();
    
    // Submit button state - disabled by default until validations pass
    const [submitButtonEnable, setSubmitButtonEnable] = useState(true);
    
    // Loading state for API calls
    const [isLoading, setIsLoading] = useState(false);
    
    // Get user type from localStorage to determine which module is signing up
    const typeOfUser = localStorage.getItem("signUp");
    
    // Snackbar notification state
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        type: "success", // success, error, warning, info
    });
    
    /**
     * Mobile validation hook
     * Centralized mobile number validation with country code support
     * - Handles country selection
     * - Validates mobile number format
     * - Provides error messages
     * - Default: +1 (United States), 500ms debounce
     */
    const {
        mobile,
        countryCode,
        countryName,
        countryFlag,
        validationErrors: mobileValidationErrors,
        handleCountryCodeChange,
        handleMobileInput,
        validateMobile,
        // getHelperText,
        isFormValid: isMobileFormValid,
        getCleanMobileNumber
    } = useMobileValidation("+1", 500);
    
    // Validation states for email, password, and confirm password
    const [validationErrors, setValidationErrors] = useState({
        email: { isValid: true, message: "" },
        password: { isValid: true, message: "" },
        confirmPassword: { isValid: true, message: "" }
    });

    // ============================================
    // Navigation Configuration
    // ============================================
    
    /**
     * Determine which login page to redirect to based on user type
     * This is shown in the "I have an account" link
     */
    const navigateToLogin =
        typeOfUser === "super_admin"
            ? "/superadminlogin"
            : typeOfUser === "hcf_admin"
            ? "/hcfadminlogin"
            : typeOfUser === "doctor"
            ? "/doctorlogin"
            : typeOfUser === "diagnostic_center"
            ? "/diagnostcenterlogin"
            : typeOfUser === "patient"
            ? "/patientlogin"
            : typeOfUser === "clinic"
            ? "/clinicLogin"
            : null;

    /**
     * Map user type to role ID for API registration
     * Role IDs:
     * 1 - Super Admin
     * 2 - HCF Admin
     * 3 - Doctor
     * 4 - Diagnostic Center
     * 5 - Patient
     * 6 - Clinic
     */
    const roleID =
        typeOfUser === "super_admin"
            ? 1
            : typeOfUser === "hcf_admin"
            ? 2
            : typeOfUser === "doctor"
            ? 3
            : typeOfUser === "diagnostic_center"
            ? 4
            : typeOfUser === "patient"
            ? 5
            : typeOfUser === "clinic"
            ? 6
            : null;
    
    // Initialize form data state with default values
    const [data, setData] = useState({
        email: null,
        mobile: null,
        password: null,
        role_id: roleID,
        dialing_code: "+1", // Default to US
        country_name: "United States", // Default to US
    });

    // Navigation hook for programmatic routing
    const navigate = useNavigate();
    logger.debug("Form data:", data);

    // ============================================
    // Validation Functions
    // ============================================
    
    /**
     * Validate email address format
     * Uses regex pattern from constants
     * Memoized with useCallback for performance
     * @param {string} email - Email to validate
     * @returns {Object} { isValid, message }
     */
    const validateEmail = useCallback((email) => {
        if (!email) {
            return { isValid: true, message: "" }; // Empty is valid (validation on submit)
        }
        if (!emailRegex.test(email)) {
            return { isValid: false, message: "Enter Valid Email Address" };
        }
        return { isValid: true, message: "" };
    }, []);

    /**
     * Validate password strength
     * Requirements:
     * - At least 8 characters
     * - 1 uppercase letter
     * - 1 lowercase letter
     * - 1 number
     * - 1 special character
     * Memoized with useCallback for performance
     * @param {string} password - Password to validate
     * @returns {Object} { isValid, message }
     */
    const validatePassword = useCallback((password) => {
        if (!password) {
            return { isValid: true, message: "" }; // Empty is valid (validation on submit)
        }
        if (!passwordRegex.test(password)) {
            return { isValid: false, message: "Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character" };
        }
        return { isValid: true, message: "" };
    }, []);

    /**
     * Validate password confirmation
     * Checks if passwords match
     * Memoized with useCallback for performance
     * @param {string} confirmPassword - Confirmation password
     * @param {string} originalPassword - Original password
     * @returns {Object} { isValid, message }
     */
    const validateConfirmPassword = useCallback((confirmPassword, originalPassword) => {
        if (!confirmPassword) {
            return { isValid: true, message: "" }; // Empty is valid (validation on submit)
        }
        if (confirmPassword !== originalPassword) {
            return { isValid: false, message: "Passwords do not match" };
        }
        return { isValid: true, message: "" };
    }, []);
    
    /**
     * Check if passwords match and enable/disable submit button
     * Extracted to reduce code duplication
     * @param {string} passwordValue - Password value
     * @param {string} confirmPasswordValue - Confirm password value
     */
    const handlePasswordMatch = useCallback((passwordValue, confirmPasswordValue) => {
        if (passwordValue === confirmPasswordValue && passwordValue && confirmPasswordValue) {
            logger.debug("Passwords match");
            setSubmitButtonEnable(false);
            setData({ ...data, password: passwordValue });
        } else {
            logger.debug("Passwords do not match");
            setSubmitButtonEnable(true);
        }
    }, [data]);

    // ============================================
    // Data Handling Functions
    // ============================================
    
    /**
     * Update mobile data when country or mobile changes
     * Syncs mobile validation hook data with form data state
     * @param {string} mobileValue - Mobile number without country code
     * @param {string} countryCodeValue - Country dialing code (e.g., "+1")
     * @param {string} countryNameValue - Country name (e.g., "United States")
     */
    const handleMobileDataUpdate = (mobileValue, countryCodeValue, countryNameValue) => {
        setData(prevData => ({
            ...prevData,
            mobile: mobileValue,
            dialing_code: countryCodeValue,
            country_name: countryNameValue,
        }));
    };

    /**
     * Submit registration data to API
     * - Shows loading snackbar
     * - Sends data to registration endpoint
     * - On success: save email to cookie and navigate to email verification
     * - On error: show error message
     */
    const fetchData = async () => {
        // Show loading state
        setIsLoading(true);
        
        try {
            logger.debug("Submitting registration data:", data);
            
            // Send registration data to API using axiosInstance for authenticated requests
            const response = await axiosInstance.post(`${baseURL}/sec/auth/register`, JSON.stringify(data));
            logger.info("Registration successful:", response);
            
            // Show success toast notification
            toastService.success("Registered successfully!");
            
            // Save email to cookie for email verification page
            Cookies.set("email", data?.email);
            
            // Navigate to email verification page
            navigate("/emailVerification");
        } catch (error) {
            logger.error("Registration error:", error);
            logger.error("Error status:", error?.response?.request?.status);
            logger.error("Error data:", error?.response?.data);
            
            // Handle different error response formats
            let errorMessage = "Registration failed. Please try again.";
            
            // Check for error field (e.g., {"error":"MOBILE_EXISTS"})
            if (error.response?.data?.error) {
                const errorCode = error.response.data.error;
                
                // Map error codes to user-friendly messages
                switch (errorCode) {
                    case "MOBILE_EXISTS":
                        errorMessage = "This mobile number is already registered. Please use a different number or sign in.";
                        // Could also set error state on mobile field
                        break;
                    case "EMAIL_EXISTS":
                        errorMessage = "This email is already registered. Please use a different email or sign in.";
                        // Could also set error state on email field
                        break;
                    case "INVALID_MOBILE":
                        errorMessage = "Invalid mobile number format. Please enter a valid mobile number.";
                        break;
                    case "INVALID_EMAIL":
                        errorMessage = "Invalid email address. Please enter a valid email.";
                        break;
                    case "WEAK_PASSWORD":
                        errorMessage = "Password is too weak. Please use a stronger password.";
                        break;
                    case "VALIDATION_ERROR":
                        errorMessage = "Please check your input and try again.";
                        break;
                    default:
                        errorMessage = `Registration failed: ${errorCode}`;
                }
            }
            // Fallback to message field (e.g., {"message":"Email already exists"})
            else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            setSnackbarState({
                open: true,
                message: errorMessage,
                type: "error",
            });
            
            // Also show toast notification for better UX
            toastService.error(errorMessage);
        } finally {
            // Always stop loading state
            setIsLoading(false);
        }
    };

    // ============================================
    // useEffect Hooks
    // ============================================
    
    /**
     * Initialize module type and module name on component mount
     * Reads from localStorage and sets display name for the form
     */
    useEffect(() => {
        const moduleType = localStorage.getItem("signUp");
        setModule(moduleType);
        
        // Map module type to display name
        const NameOfModule =
            moduleType === "patient"
                ? "Patient"
                : moduleType === "doctor"
                ? "Doctor"
                : moduleType === "super_admin"
                ? "Super Admin"
                : moduleType === "diagnostic_center"
                ? "Diagnostic Center"
                : moduleType === "clinic"
                ? "Clinic"
                : moduleType === "hcf_admin"
                ? "HCF Admin"
                : null;

        setModuleName(NameOfModule);
    }, []);

    /**
     * Sync mobile data with validation hook
     * Updates form data whenever mobile, country code, or country name changes
     */
    useEffect(() => {
        handleMobileDataUpdate(mobile, countryCode, countryName);
    }, [mobile, countryCode, countryName]);

    // ============================================
    // Submit Handler
    // ============================================
    
    /**
     * Handle form submission
     * - Prevents default form submission
     * - Validates all fields
     * - Checks if required fields are filled
     * - Submits data to API if valid
     * @param {Event} e - Form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate mobile number using the mobile validation hook
        const mobileValidation = validateMobile();
        
        // Check if all validations pass (email, password, confirm password, mobile)
        const allValid = Object.values(validationErrors).every(error => error.isValid) && mobileValidation.isValid;
        
        // If any validation fails, show error and don't submit
        if (!allValid) {
            setSnackbarState({
                open: true,
                message: "Please fix all validation errors before submitting",
                type: "error",
            });
            return;
        }
        
        // Check if all required fields are filled
        if (!data.email || !data.mobile || !data.password) {
            setSnackbarState({
                open: true,
                message: "Please fill in all required fields",
                type: "error",
            });
            return;
        }
        
        // All validations passed - submit the form
        fetchData();
    };

    // ============================================
    // Render
    // ============================================
    
    return (
        <div className="register-photo">
            <Box className="form-container">
                {/* Background image */}
                <div className="image-holder"></div>
                
                {/* Loading overlay for registration */}
                {isLoading && (
                    <Loading
                        variant="overlay"
                        size="large"
                        message="Registering Your Account"
                        subMessage="Please wait while we are registering your details..."
                        fullScreen
                    />
                )}
                
                {/* Snackbar for notifications (success, error, info) */}
                <CustomSnackBar
                    isOpen={snackbarState.open}
                    message={snackbarState.message}
                    hideDuration={4000}
                    type={snackbarState.type}
                />
                
                <Box className="component-library ">
                    {/* Logo and Title Section */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div className="logo1">
                            <img src="images/logo.png" alt="Logo" />
                        </div>

                        {/* Dynamic title based on user type */}
                        <h2 className="text-center">
                            <strong>{`${moduleName} `} Sign Up</strong>
                        </h2>
                    </Box>
                    
                    {/* Mobile Number with Country Code Selector */}
                    <CustomCountryCodeSelector
                        id={"mobile-number-with-country-code"}
                        label={""}
                        value={mobile || ""}
                        placeholder="Mobile number"
                        // helperText={getHelperText()}
                        error={!mobileValidationErrors.mobile.isValid && mobileValidationErrors.mobile.message !== ""}
                        onChange={handleCountryCodeChange}
                        onInput={handleMobileInput}
                        textcss={{
                            width: "19.5em",
                        }}
                        defaultCountryCode="+1"
                        defaultCountryName="United States"
                        defaultCountryFlag="🇺🇸"
                        noSpacing={false}
                    />

                    {/* Email Address Field */}
                    <CustomTextField
                        id={"standard-helperText1"}
                        label={"Email Address"}
                        defaultValue={data.email}
                        helperText={validationErrors.email.isValid ? "" : validationErrors.email.message}
                        error={!validationErrors.email.isValid && validationErrors.email.message !== ""}
                        onChange={(event) => {
                            const email = event?.target?.value;
                            const emailValidation = validateEmail(email);
                            logger.debug("Email validation:", emailValidation);
                            
                            // Update validation state
                            setValidationErrors(prev => ({
                                ...prev,
                                email: emailValidation
                            }));
                            
                            // Update form data
                            const copy = { ...data, email: email };
                            setData(copy);
                        }}
                        textcss={{
                            width: "19.5em",
                        }}
                    />

                    {/* Password Field with Visibility Toggle */}
                    <CustomTextField
                        id={"standard-helperText1"}
                        label={"Enter Password"}
                        defaultValue={password}
                        helperText={validationErrors.password.isValid ? "" : validationErrors.password.message}
                        error={!validationErrors.password.isValid && validationErrors.password.message !== ""}
                        type={showPassword ? "password" : "text"}
                        onInput={(event) => {
                            const passwordValue = event.target.value;
                            setPassword(passwordValue);
                            
                            // Validate password strength
                            const passwordValidation = validatePassword(passwordValue);
                            setValidationErrors(prev => ({
                                ...prev,
                                password: passwordValidation
                            }));

                            // Use the extracted function to check if passwords match
                            handlePasswordMatch(passwordValue, confirmPassword);
                        }}
                        inputType={showPassword ? "password" : "text"}
                        textcss={{
                            width: "19.5em",
                        }}
                        // Toggle password visibility icon
                        rightIcon={
                            showPassword ? (
                                <VisibilityIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <VisibilityOffIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setShowPassword(true)}
                                />
                            )
                        }
                    />

                    {/* Confirm Password Field with Visibility Toggle */}
                    <CustomTextField
                        id={"standard-helperText1"}
                        label={"Confirm Password"}
                        defaultValue={data.password}
                        helperText={validationErrors.confirmPassword.isValid ? "" : validationErrors.confirmPassword.message}
                        error={!validationErrors.confirmPassword.isValid && validationErrors.confirmPassword.message !== ""}
                        type={showPasswordConfirm ? "password" : "text"}
                        onInput={(event) => {
                            const confirmPasswordValue = event.target.value;
                            setConfirmPassword(confirmPasswordValue);
                            
                            // Validate password confirmation
                            const confirmPasswordValidation = validateConfirmPassword(confirmPasswordValue, password);
                            setValidationErrors(prev => ({
                                ...prev,
                                confirmPassword: confirmPasswordValidation
                            }));

                            // Use the extracted function to check if passwords match
                            handlePasswordMatch(password, confirmPasswordValue);
                        }}
                        inputType={confirmPassword ? "password" : "text"}
                        textcss={{
                            width: "19.5em",
                        }}
                        // Toggle password visibility icon
                        rightIcon={
                            showPasswordConfirm ? (
                                <VisibilityIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setShowPasswordConfirm(false)}
                                />
                            ) : (
                                <VisibilityOffIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setShowPasswordConfirm(true)}
                                />
                            )
                        }
                    />

                    {/* Submit Button */}
                    <CustomButton
                        label={"Continue"}
                        isTransaprent={false}
                        // Disabled if passwords don't match OR mobile validation fails
                        isDisabled={submitButtonEnable || !isMobileFormValid()}
                        isElevated={false}
                        handleClick={handleSubmit}
                        buttonCss={{
                            width: "22em",
                            padding: "8px 16px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "100px",
                            marginTop: "35px",
                        }}
                    />
                    
                    {/* Login Link */}
                    <div className="login">
                        I have an account &nbsp;
                        <Link to={navigateToLogin} className="link">
                            Log In
                        </Link>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

// PropTypes for type safety
patientsignup.propTypes = {
    // Note: This component doesn't receive props from parent
    // All data comes from localStorage and internal state
};

export default patientsignup;
