import React, { useEffect, useState } from "react";
import "./EmailVerification.scss";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton/custom-button";
import axios from "axios";
import { useAuthentication } from "../../loginComponent/UserProvider";
import Cookies from "js-cookie";
import CustomOTPInput from "../../components/OTPInput";
import { baseURL } from "../../constants/const";
import CustomSnackBar from "../../components/CustomSnackBar";

const EmailVerification = () => {
    const navigate = useNavigate();
    const Authentication = useAuthentication();

    const typeOfUser = localStorage.getItem("signUp");
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
            ? "/diagnostcliniclogin"
            : null;

    const [otp, setOtp] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        type: "success", // success, error, warning, etc.
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailFromCookie = Cookies.get("email");

        if (!otp || otp.length !== 6) {
            setSnackbarState({
                open: true,
                message: `Please enter the 6-digit OTP`,
                type: "error",
            });
            return;
        }

        const payload = {
            email: emailFromCookie,
            activation_code: otp,
        };

        try {
            setIsSubmitting(true);
            const response = await axios.post(
                `${baseURL}/sec/auth/verifyEmail`,
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                },
            );
            setSnackbarState({
                open: true,
                message: "Email Verified successfully!",
                type: "success",
            });
            // ✅ delay navigation
            setTimeout(() => {
                navigate(navigateToLogin, { replace: true });
            }, 1000);
        } catch (error) {
            console.error("Verification failed:", error?.response?.data || error);
            setSnackbarState({
                open: true,
                message: error.response?.data?.error || "Verification Failed, Enter Correct Otp.",
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleResendCode = async () => {
        const emailFromCookie = Cookies.get("email");

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
            await axios.post(`${baseURL}/sec/auth/resendCode`, { email: emailFromCookie });

            setSnackbarState({
                open: true,
                message: `OTP has been resent to ${emailFromCookie}`,
                type: "success",
            });
        } catch (error) {
            console.error("Resend OTP failed:", error?.response?.data || error);
            setSnackbarState({
                open: true,
                message: error.response?.data?.error || "Failed to resend OTP.",
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-photo">
            <Box className="form-container">
                <div className="image-holder" />
                <CustomSnackBar
                    isOpen={snackbarState.open}
                    message={snackbarState.message}
                    hideDuration={4000}
                    type={snackbarState.type}
                />
                <Box className="form-inner-container-two">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img src="images/logo.png" alt="Logo" />

                        <strong style={{ fontSize: "1rem", marginTop: "20px" }}>
                            Verify your Email
                        </strong>

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
                            <CustomOTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                placeholder="*"
                            />

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

export default EmailVerification;
