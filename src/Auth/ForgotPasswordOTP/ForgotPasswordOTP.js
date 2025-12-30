/**
 * ForgotPasswordOTP Component
 * 
 * OTP verification page for password recovery.
 * Features:
 * - 6-digit OTP input
 * - Email verification via OTP
 * - Resend OTP functionality
 * - Error handling with snackbar
 * - Loading state during API calls
 * - Navigation to password change page
 * 
 * Flow:
 * 1. User enters OTP sent to email
 * 2. Verify OTP with backend
 * 3. Navigate to password change page
 */

import React, { useState } from "react";
import "./ForgotPasswordOTP.scss";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import CustomOTPInput from "../../components/OTPInput";
import { Box } from "@mui/material";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomSnackBar from "../../components/CustomSnackBar";
import logger from "../../utils/logger";
import toastService from "../../services/toastService";
import { Loading } from "../../components/Loading";

const ForgotPasswordOTP = () => {
    // ============================================
    // State Management
    // ============================================
    
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const fetchEmail = sessionStorage.getItem("EmailForgotPassword");
    
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        type: "success",
    });

    // ============================================
    // Event Handlers
    // ============================================
    
    /**
     * Verify OTP code
     * - Sends OTP and email to backend
     * - Stores verified OTP in sessionStorage
     * - Navigates to password change page on success
     * - Shows error on invalid OTP
     */
    const verifyOTP = async () => {
        logger.info("Verifying OTP for email:", fetchEmail);
        logger.debug("OTP entered:", otp);
        setLoading(true);
        
        try {
            const response = await axiosInstance.post(
                "/sec/auth/verifyEmail",
                {
                    email: fetchEmail,
                    activation_code: otp,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            
            logger.info("OTP verification response:", response);
            toastService.success("Email verified successfully!");
            
            // Store verified OTP for password change
            sessionStorage.setItem("forgotpasswordotp", otp);
            
            // Navigate to password change page
            navigate("/ForgotPasswordChange");
        } catch (error) {
            logger.error("OTP verification error:", error);
            logger.error("Error response:", error?.response?.data);
            
            // Parse error codes and provide user-friendly messages
            let errorMsg = "Verification failed!";
            
            // Check for error message from backend response
            if (error?.response?.data?.message) {
                errorMsg = error.response.data.message;
            } else if (error?.response?.data?.error) {
                const errorCode = error.response.data.error;
                switch (errorCode) {
                    case "INVALID_OTP":
                        errorMsg = "Invalid OTP code. Please try again.";
                        break;
                    case "OTP_EXPIRED":
                        errorMsg = "OTP has expired. Please request a new one.";
                        break;
                    case "OTP_ALREADY_USED":
                        errorMsg = "This OTP has already been used.";
                        break;
                    default:
                        errorMsg = errorCode || errorMsg;
                }
            } else if (error?.response?.status === 400) {
                errorMsg = "Invalid OTP. Please check and try again.";
            } else if (error?.response?.status === 401) {
                errorMsg = "OTP expired. Please request a new OTP.";
            } else if (error?.response?.status === 403) {
                errorMsg = "Unauthorized. Please try again.";
            }
            
            // Set snackbar state to show error
            setSnackbarState({
                open: true,
                message: errorMsg,
                type: "error",
            });
            
            // Show toast notification for better UX
            toastService.error(errorMsg);
            
            logger.info("Error snackbar displayed:", errorMsg);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Resend OTP code
     * - Sends new OTP to user's email
     * - Shows success/error messages
     */
    const handleResendCode = async () => {
        logger.info("Resending OTP for email:", fetchEmail);
        
        try {
            const response = await axiosInstance.post(
                "/sec/auth/resendCode",
                { email: fetchEmail },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            
            logger.info("Resend OTP response:", response);
            toastService.success("OTP sent to your email!");
            
            setSnackbarState({
                open: true,
                message: "OTP sent successfully!",
                type: "success",
            });
        } catch (error) {
            logger.error("Resend OTP failed:", error?.response?.data || error);
            
            let errorMsg = "Failed to resend OTP. Please try again.";
            if (error?.response?.data?.error) {
                errorMsg = error.response.data.error;
            }
            
            setSnackbarState({
                open: true,
                message: errorMsg,
                type: "error",
            });
            toastService.error(errorMsg);
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
                    message="Verifying Your Email"
                    subMessage="Please wait while we verify your OTP..."
                    fullScreen
                />
            )}
            
            <div className="register-photo">
                <div className="form-container">
                    {/* Success/Error snackbar - shows on OTP verification errors */}
                    <CustomSnackBar
                        isOpen={snackbarState.open}
                        message={snackbarState.message}
                        hideDuration={5000}
                        type={snackbarState.type}
                    />
                    
                    {/* Left side: Decorative image background */}
                    <div className="image-holder"></div>
                    
                    {/* Right side: Form content */}
                    <div className="component-library">
                        {/* Logo and instructions */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                   paddingTop: "100px",
                                paddingBottom: "50px"
                            }}
                        >
                            {/* Company logo */}
                            <div>
                                <img src="images/logo.png" alt="Logo" />
                            </div>

                            {/* Page title */}
                            <h2>
                                <strong>Please enter OTP</strong>
                            </h2>

                            {/* Email display for user reference */}
                            <div>
                                <p>The OTP has been sent to - {fetchEmail} </p>
                            </div>
                        </Box>
                        
                        {/* Legacy text field (commented out - using CustomOTPInput instead) */}
                        {/* <CustomTextField
                            id={"standard-helperText1"}
                            type={'number'}
                            label={"Email"}
                            defaultValue={otp}
                            helperText={"Mobile or Email"}
                            // isValid
                            onChange={(event) => setOtp(event.target.value)}
                            textcss={{
                                width: "22.5em",
                                height: "56px",
                                WebkitAppearance : "none"
                            }}
                        /> */}

                        <CustomOTPInput
                            value={otp}
                            onChange={(value) => {
                                logger.debug("OTP input changed");
                                setOtp(value);
                            }}
                            numInputs={6}
                            placeholder="*"
                        />
                        
                        {/* Continue button */}
                        <CustomButton
                            label="Continue"
                            isTransaprent={false}
                            isDisabled={loading}
                            isElevated={false}
                            handleClick={verifyOTP}
                        buttonCss={{
                            width: "19em",
                            padding: "8px 16px",
                            marginTop: "3%",
                            borderRadius: "100px",
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPasswordOTP;
