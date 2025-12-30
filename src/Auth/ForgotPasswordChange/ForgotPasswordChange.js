/**
 * ForgotPasswordChange Component
 * 
 * Password reset confirmation page.
 * Features:
 * - New password input with confirmation
 * - Password match validation
 * - Submits password change to backend
 * - Role-based navigation after successful password change
 * - Error handling with snackbar notifications
 * - Loading state during API calls
 * 
 * Flow:
 * 1. User enters new password and confirmation
 * 2. Validates passwords match
 * 3. Submits to backend with OTP
 * 4. Navigates to role-specific login page
 */

import React, { useState } from "react";
import "./ForgotPasswordChange.scss";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomSnackBar from "../../components/CustomSnackBar";
import logger from "../../utils/logger";
import toastService from "../../services/toastService";
import { Loading } from "../../components/Loading";

const ForgotPasswordChange = () => {
    // ============================================
    // State Management
    // ============================================
    
    const navigate = useNavigate();
    
    // Password input states
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isDisabledButton, setIsDisabledButton] = useState(true);
    
    // Snackbar states
    const [showSnack, setShowSnack] = useState(false);
    const [showSnackError, setShowSnackError] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [error_responseMessage, setError_responseMessage] = useState();
    const [loading, setLoading] = useState(false);
    
    // Determine navigation path based on user role from localStorage
    const [navigateionPath] = useState(
        localStorage.getItem("signUp") === "doctor"
            ? "/doctorlogin"
            : localStorage.getItem("signUp") === "patient"
            ? "/patientlogin"
            : localStorage.getItem("signUp") === "diagnostic_center"
            ? "/diagnostcenterlogin"
            : localStorage.getItem("signUp") === "clinic"
            ? "/clinicLogin"
            : localStorage.getItem("signUp") === "hcf_admin"
            ? "/hcfadminlogin"
            :             localStorage.getItem("signUp") === "super_admin"
            ? "/superAdminLogin"
            : "/patientLogin",
    );

    // ============================================
    // Event Handlers
    // ============================================
    
    /**
     * Change password
     * - Validates passwords match
     * - Sends password change request to backend
     * - Navigates to role-specific login page on success
     * - Shows error on failure
     */
    const ChangePassword = async () => {
        setLoading(true);
        logger.info("Changing password for email:", sessionStorage.getItem("EmailForgotPassword"));
        
        try {
            const response = await axiosInstance.post(
                "/sec/auth/changePassword",
                {
                    email: sessionStorage.getItem("EmailForgotPassword"),
                    new_password: confirmPassword,
                    activation_code: sessionStorage.getItem("forgotpasswordotp"),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            
            logger.info("Password change response:", response);
            
            if (response?.data?.response?.message === "PASSWORD_CHANGE_SUCCESS") {
                toastService.success("Password changed successfully!");
                
                setShowSnack(true);
                setResponseMessage("Password changed successfully!");
                
                // Navigate to role-specific login page
                logger.info("Navigating to:", navigateionPath);
                navigate(navigateionPath);
            } else {
                logger.warn("Unexpected response message:", response?.data?.response?.message);
            }
        } catch (error) {
            logger.error("Password change error:", error);
            logger.error("Error response:", error?.response?.data);
            
            // Parse error codes and provide user-friendly messages
            let errorMsg = "Failed to change password. Please try again.";
            
            if (error?.response?.data?.error) {
                const errorCode = error.response.data.error;
                switch (errorCode) {
                    case "INVALID_OTP":
                        errorMsg = "Invalid OTP code. Please try again.";
                        break;
                    case "OTP_EXPIRED":
                        errorMsg = "OTP has expired. Please request a new one.";
                        break;
                    case "WEAK_PASSWORD":
                        errorMsg = "Password is too weak. Please use a stronger password.";
                        break;
                    default:
                        errorMsg = errorCode || errorMsg;
                }
            }
            
            setShowSnackError(true);
            setError_responseMessage(errorMsg);
            toastService.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    
    // ============================================
    // Render
    // ============================================
    
    return (
        <>
            {/* Loading overlay for API operations */}
            {loading && (
                <Loading
                    variant="overlay"
                    size="large"
                    message="Changing Your Password"
                    subMessage="Please wait while we update your password..."
                    fullScreen
                />
            )}
            
            <div className="register-photo">
                {/* Success snackbar */}
                <CustomSnackBar
                    isOpen={showSnack}
                    message={responseMessage}
                    type="success"
                />
                
                {/* Error snackbar */}
                <CustomSnackBar
                    isOpen={showSnackError}
                    message={error_responseMessage}
                    type="error"
                />
                
                <div className="form-container">
                    {/* Left side: Decorative image background */}
                    <div className="image-holder"></div>

                    {/* Right side: Form content */}
                    <div className="component-library">
                        {/* Logo and title container */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                   paddingTop: "100px", 
                            }}
                        >
                            {/* Company logo */}
                            <div className="logo1">
                                <img src="images/logo.png" alt="Logo" />
                            </div>

                            {/* Page title */}
                            <h2 className="text-center">
                                <strong>Please enter new password</strong>
                            </h2>
                        </Box>

                        {/* Password input fields container */}
                        <div className="items">
                            <div className="field-center3">
                                {/* Stack of password input fields */}
                                <Stack spacing={3} alignItems="center" flexDirection="column">
                                    {/* New password input field */}
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"New Password"}
                                    defaultValue={password}
                                    helperText={
                                        isDisabledButton
                                            ? "password does not match"
                                            : "password matched"
                                    }
                                    isValid={!isDisabledButton}
                                    textcss={{
                                        width: "19em",
                                    }}
                                    onInput={(event) => {
                                        const passwordValue = event?.target?.value;
                                        setPassword(passwordValue);
                                        logger.debug("Password input changed");
                                        
                                        // Real-time validation: Check if passwords match
                                        if (confirmPassword === passwordValue) {
                                            if (confirmPassword === "") {
                                                // Empty password - keep button disabled
                                                setIsDisabledButton(true);
                                                return;
                                            }
                                            // Passwords match - enable button
                                            setIsDisabledButton(false);
                                        } else {
                                            // Passwords don't match - disable button
                                            setIsDisabledButton(true);
                                        }
                                    }}
                                />
                                
                                {/* Confirm password input field */}
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"Confirm Password"}
                                    defaultValue={confirmPassword}
                                    helperText={
                                        isDisabledButton
                                            ? "password does not match"
                                            : "password matched"
                                    }
                                    isValid={!isDisabledButton}
                                    textcss={{
                                        width: "19em",
                                    }}
                                    onInput={(event) => {
                                        const confirmValue = event.target.value;
                                        setConfirmPassword(confirmValue);
                                        logger.debug("Confirm password input changed");
                                        
                                        // Real-time validation: Check if passwords match
                                        if (password === confirmValue) {
                                            if (confirmValue === "") {
                                                // Empty password - keep button disabled
                                                setIsDisabledButton(true);
                                                return;
                                            }
                                            // Passwords match - enable button
                                            setIsDisabledButton(false);
                                        } else {
                                            // Passwords don't match - disable button
                                            setIsDisabledButton(true);
                                        }
                                    }}
                                />
                            </Stack>
                        </div>
                    </div>

                    {/* Submit button - disabled until passwords match */}
                    <CustomButton
                        label="Continue"
                        isTransaprent={false}
                        isDisabled={loading || isDisabledButton}
                        isElevated={false}
                        handleClick={ChangePassword}
                        buttonCss={{
                            width: "22em",
                            padding: "8px 16px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "100px",
                        }}
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default ForgotPasswordChange;
