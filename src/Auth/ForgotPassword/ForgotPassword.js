/**
 * ForgotPassword Component
 * 
 * User forgot password request page.
 * Features:
 * - Email input validation
 * - OTP generation for password recovery
 * - Error handling with snackbar notifications
 * - Loading state during API calls
 * - Navigation to OTP verification page
 * 
 * Flow:
 * 1. User enters email
 * 2. API sends OTP to email
 * 3. Navigate to OTP verification page
 */

import React, { useState } from "react";
import "./forgotpassword.scss";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomSnackBar from "../../components/CustomSnackBar";
import logger from "../../utils/logger";
import toastService from "../../services/toastService";
import { Loading } from "../../components/Loading";

const ForgotPassword = () => {
    // ============================================
    // State Management
    // ============================================
    
    // Hook for programmatic navigation
    const navigate = useNavigate();
    
    // Email input state
    const [email, setEmail] = useState(null);
    const [showSnack, setShowSnack] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [disableButton, setDisableButton] = useState(true);
    
    // Email validation regex pattern
    const EmailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // ============================================
    // Event Handlers
    // ============================================
    
    /**
     * Submit forgot password request
     * - Validates email
     * - Sends request to backend
     * - Stores email in sessionStorage for OTP verification
     * - Navigates to OTP page on success
     * - Shows error on failure
     */
    const PatientForgotPassword = async () => {
        setLoading(true);
        setShowSnack(false);
        
        if (email) {
            logger.info("Forgot password request for email:", email);
            sessionStorage.setItem("EmailForgotPassword", email);
            
            try {
                const response = await axiosInstance.post(
                    "/sec/auth/forgotPassword",
                    { email: email },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                
                logger.info("Forgot password response:", response);
                toastService.success("OTP sent to your email!");
                
                // Navigate to OTP verification page
                navigate("/ForgotPasswordOTP");
            } catch (error) {
                logger.error("Forgot password error:", error);
                logger.error("Error response:", error?.response?.data);
                
                // Parse error codes and provide user-friendly messages
                let errorMsg = "Failed to send OTP. Please try again.";
                
                if (error?.response?.data?.error) {
                    const errorCode = error.response.data.error;
                    switch (errorCode) {
                        case "USER_NOT_FOUND":
                            errorMsg = "No account found with this email.";
                            break;
                        case "INVALID_EMAIL":
                            errorMsg = "Please enter a valid email address.";
                            break;
                        case "EMAIL_NOT_VERIFIED":
                            errorMsg = "Please verify your email first.";
                            break;
                        default:
                            errorMsg = errorCode || errorMsg;
                    }
                }
                
                setErrorMessage(errorMsg);
                setShowSnack(true);
                toastService.error(errorMsg);
            } finally {
                setLoading(false);
            }
        } else {
            logger.warn("Forgot password: No email provided");
            setErrorMessage("Please enter email");
            setShowSnack(true);
            toastService.error("Please enter your email address");
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
                    message="Sending OTP"
                    subMessage="Please wait while we send the verification code to your email..."
                    fullScreen
                />
            )}
            
            <div className="register-photo">
                {/* Error snackbar */}
                <CustomSnackBar
                    isOpen={showSnack}
                    message={errorMessage}
                    type="error"
                />
                
                <Box className="form-container">
                    {/* Left side: Decorative image background */}
                    <div className="image-holder"></div>

                    {/* Right side: Form content */}
                    <Box className="component-library">
                        {/* Logo and title container */}
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
                            <div className="logo1">
                                <img src="images/logo.png" alt="Logo" />
                            </div>

                            {/* Page title */}
                            <h2 className="text-center">
                                <strong>Forgot Password</strong> <br />
                                <strong>Please Enter Email</strong>
                            </h2>
                        </Box>
                        
                        {/* Email input field - validates email format in real-time */}
                        <CustomTextField
                            id={"standard-helperText1"}
                            label={"Enter Email"}
                            defaultValue={email}
                            helperText={""}
                            isValid
                            onInput={(e) => {
                                const emailValue = e.target.value;
                                setEmail(emailValue);
                                logger.debug("Email input:", emailValue);
                                
                                // Validate email format
                                if (emailValue.match(EmailValidation)) {
                                    setDisableButton(false);
                                } else {
                                    setDisableButton(true);
                                }
                            }}
                            textcss={{
                                width: "19.5em",
                            }}
                        />
                        
                        {/* Submit button */}
                        <CustomButton
                            label="Continue"
                            isTransaprent={false}
                            isDisabled={loading || disableButton}
                            isElevated={false}
                            handleClick={PatientForgotPassword}
                        buttonCss={{
                            width: "22em",
                            padding: "8px 16px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "100px",
                            marginTop: "35px",
                        }}
                    />
                </Box>
            </Box>
        </div>
        </>
    );
};

export default ForgotPassword;
