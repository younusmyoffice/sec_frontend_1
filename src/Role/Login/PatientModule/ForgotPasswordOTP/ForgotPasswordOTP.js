import React, { useState } from "react";
import "./ForgotPasswordOTP.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomOTPInput from "../../../../components/OTPInput";
import { Box, CircularProgress } from "@mui/material";
import CustomButton from "../../../../components/CustomButton/custom-button";
import { baseURL } from "../../../../constants/const";
import CustomTextField from "../../../../components/CustomTextField";
import CustomSnackBar from "../../../../components/CustomSnackBar";

const ForgotPasswordOTP = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchEmail] = useState(sessionStorage.getItem("EmailForgotPassword"));
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        type: "success", // success, error, warning, etc.
    });

    const verifyOTP = async () => {
        console.log("fetchEmail : ", fetchEmail);
        setLoading(true);
        try {
            const reponse = await axios.post(
                `${baseURL}/sec/auth/verifyEmail`,
                JSON.stringify({
                    email: fetchEmail,
                    activation_code: otp,
                }),
            );
            console.log(reponse);
            sessionStorage.setItem("forgotpasswordotp", otp);
            navigate("/ForgotPasswordChange");
        } catch (error) {
            console.log(error);
            setSnackbarState({
                open: true,
                message: "Verification failed!",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    // from here
    const handleResendCode = async () => {
        try {
            await axios.post(`${baseURL}/sec/auth/resendCode`, { email: fetchEmail });
            setSnackbarState({
                open: true,
                message: "Resend OTP successfully!",
                type: "success",
            });
        } catch (error) {
            console.error("Resend OTP failed:", error?.response?.data || error);
            setSnackbarState({
                open: true,
                message: "Resend OTP failed!",
                type: "error",
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/forgotpasswordotpverify");
    };
    console.log("otp", otp);
    return (
        <Box className="register-photo">
            <Box
                className="form-container"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", // Ensures it centers vertically
                }}
            >
                <CustomSnackBar
                    isOpen={snackbarState.open}
                    message={snackbarState.message}
                    hideDuration={4000}
                    type={snackbarState.type}
                />
                <div className="image-holder"></div>
                <div className="forgotPassword">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <img src="images/logo.png" alt="Logo" />
                        </div>

                        <h2>
                            <strong>Please enter OTP</strong>
                        </h2>

                        <div>
                            <p>The OTP has been sent to - {fetchEmail} </p>
                        </div>
                    </Box>
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
                        onChange={setOtp}
                        numInputs={6}
                        placeholder="*"
                    />
                    <CustomButton
                        label={
                            loading ? <CircularProgress size={24} color="inherit" /> : "Continue"
                        }
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
            </Box>
        </Box>
    );
};

export default ForgotPasswordOTP;
