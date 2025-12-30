/**
 * EmailVerification Component
 * 
 * This component handles email OTP verification after user registration.
 * Features:
 * - 6-digit OTP input validation
 * - Real-time OTP verification
 * - Resend OTP functionality
 * - Role-based navigation after verification
 * - Comprehensive error handling
 */

import React, { useState } from "react";
import "./EmailVerification.scss";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";
import axiosInstance from "../../config/axiosInstance";
import logger from "../../utils/logger";
import { useAuthentication } from "../../loginComponent/UserProvider";
import Cookies from "js-cookie";
import CustomOTPInput from "../../components/OTPInput";
import { baseURL } from "../../constants/const";
import CustomSnackBar from "../../components/CustomSnackBar";
import { Loading } from "../../components/Loading";

const EmailVerification = () => {
    // ============================================
    // Navigation and State Management
    // ============================================
    
    const navigate = useNavigate();
    const Authentication = useAuthentication();

    // Get user type from localStorage to determine which login page to navigate to after verification
    const typeOfUser = localStorage.getItem("signUp");
    
    // Map user type to corresponding login page
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

    // OTP input value (6-digit code)
    const [otp, setOtp] = useState("");
    
    // Loading state for API operations (submit and resend)
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Snackbar notification state for user feedback
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        type: "success", // success, error, warning, info
    });

    // Show OTP sent message on load or when email changes
    // useEffect(() => {
    //     const email = Cookies.get("email");
    //     if (email) {
    //         setSnackbarState({
    //             open: true,
    //             message: `OTP has been sent to ${email}`,
    //             type: "Info",
    //         });
    //     }
    // }, []); // empty dependency runs once on mount

    // ============================================
    // Submit Handler - OTP Verification
    // ============================================
    
    /**
     * Handle OTP submission and verification
     * - Validates OTP length (6 digits)
     * - Sends verification request to backend
     * - Shows success/error messages
     * - Navigates to appropriate login page on success
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Get email from cookie (set during signup)
        const emailFromCookie = Cookies.get("email");

        // Validate OTP length - must be exactly 6 digits
        if (!otp || otp.length !== 6) {
            setSnackbarState({
                open: true,
                message: `Please enter the 6-digit OTP`,
                type: "error",
            });
            return;
        }

        // Prepare payload for API request
        const payload = {
            email: emailFromCookie,
            activation_code: otp,
        };

        try {
            setIsSubmitting(true);
            logger.debug("Verifying OTP for email:", emailFromCookie);
            
            // Send OTP verification request to backend
            const response = await axiosInstance.post(
                `${baseURL}/sec/auth/verifyEmail`,
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                },
            );
            
            logger.info("Email verification successful:", response);
            
            // Show success message
            setSnackbarState({
                open: true,
                message: "Email Verified successfully!",
                type: "success",
            });
            
            // Delay navigation to let user see success message
            setTimeout(() => {
                navigate(navigateToLogin, { replace: true });
            }, 1000);
            
        } catch (error) {
            logger.error("Verification failed:", error);
            logger.error("Error data:", error?.response?.data);
            
            // Default error message
            let errorMessage = "Verification failed. Please enter the correct OTP.";
            
            // Parse specific error codes from backend response
            if (error.response?.data?.error) {
                switch (error.response.data.error) {
                    case "INVALID_OTP":
                        errorMessage = "Invalid OTP. Please enter the correct 6-digit code.";
                        break;
                    case "OTP_EXPIRED":
                        errorMessage = "OTP has expired. Please resend a new code.";
                        break;
                    case "OTP_ALREADY_USED":
                        errorMessage = "This OTP has already been used. Please resend a new code.";
                        break;
                    default:
                        errorMessage = error.response.data.error || "Verification failed. Please try again.";
                }
            } 
            // Fallback to message field if error field not present
            else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            // Show error message to user
            setSnackbarState({
                open: true,
                message: errorMessage,
                type: "error",
            });
        } finally {
            // Always stop loading state
            setIsSubmitting(false);
        }
    };
    // ============================================
    // Resend OTP Handler
    // ============================================
    
    /**
     * Handle OTP resend request
     * - Gets email from cookie
     * - Sends resend request to backend
     * - Shows success/error feedback
     */
    const handleResendCode = async () => {
        // Get email from cookie
        const emailFromCookie = Cookies.get("email");

        // Validate email exists
        if (!emailFromCookie) {
            setSnackbarState({
                open: true,
                message: "No email found to resend OTP.",
                type: "error",
            });
            return;
        }

        try {
            setIsSubmitting(true);
            logger.debug("Resending OTP to:", emailFromCookie);
            
            // Send resend request to backend
            await axiosInstance.post(`${baseURL}/sec/auth/resendCode`, { email: emailFromCookie });

            logger.info("OTP resent successfully");
            
            // Show success message
            setSnackbarState({
                open: true,
                message: `OTP has been resent to ${emailFromCookie}`,
                type: "success",
            });
            
        } catch (error) {
            logger.error("Resend OTP failed:", error);
            logger.error("Error data:", error?.response?.data);
            
            // Extract error message from backend response
            const errorMessage = error.response?.data?.message || 
                                error.response?.data?.error || 
                                "Failed to resend OTP. Please try again.";
            
            // Show error message to user
            setSnackbarState({
                open: true,
                message: errorMessage,
                type: "error",
            });
        } finally {
            // Always stop loading state
            setIsSubmitting(false);
        }
    };

    // ============================================
    // Render - JSX Structure
    // ============================================
    
    return (
        <div className="register-photo">
            <Box className="form-container">
                {/* Background decorative image */}
                <div className="image-holder" />
                
                {/* Loading overlay - shown during API calls (submit or resend) */}
                {isSubmitting && (
                    <Loading
                        variant="overlay"
                        size="large"
                        message="Verifying Your Email"
                        subMessage="Please wait while we verify your email..."
                        fullScreen
                    />
                )}
                
                {/* Snackbar for user feedback (success, error messages) */}
                <CustomSnackBar
                    isOpen={snackbarState.open}
                    message={snackbarState.message}
                    hideDuration={4000}
                    type={snackbarState.type}
                />
                
                {/* Main form container */}
                <Box className="form-inner-container-two">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/* Logo */}
                        <img src="images/logo.png" alt="Logo" />

                        {/* Page title */}
                        <strong style={{ fontSize: "1rem", marginTop: "20px" }}>
                            Verify your Email
                        </strong>

                        {/* OTP input and action buttons container */}
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignContent: "center",
                                width: "100%",
                                alignItems: "center",
                                marginTop: "6%",
                            }}
                        >
                            {/* 6-digit OTP input component */}
                            <CustomOTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                placeholder="*"
                            />

                            {/* Continue button - disabled during API calls */}
                            <CustomButton
                                label={"Continue"}
                                isTransaprent={false}
                                isDisabled={isSubmitting}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "18em",
                                    padding: "8px 16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "100px",
                                    marginTop: "20%",
                                }}
                            />

                            {/* Resend OTP link */}
                            <div
                                className="resend"
                                onClick={handleResendCode}
                                style={{
                                    marginTop: "1rem",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                }}
                            >
                                Resend Code
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

// Note: This component doesn't receive props from parent
// All state is managed internally using localStorage and cookies
export default EmailVerification;
