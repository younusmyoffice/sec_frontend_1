import React, { useState } from "react";
import Cookies from "js-cookie";
import { Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./PatientLogin.scss";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axiosInstance from "../../../../config/axiosInstance";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import { useAuthentication } from "../../../../loginComponent/UserProvider";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import { baseURL, emailRegex, passwordRegex } from "../../../../constants/const";
import { decodeJWT, getCurrentUser } from "../../../../utils/jwtUtils";

const PatientLogin = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSnack, setShowSnack] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageOpen, setErrorMessageOpen] = useState(false);
    const [helperTextMessage, setHelperTextMessage] = useState(false);
    const [passwordHelperTextMessage, setPasswordHelperTextMessage] = useState(false);
    const [invalidUserMessage, setInvalidUserMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { PatientLogin: authLogin } = useAuthentication();
    const navigate = useNavigate();

    const handleLogin = async () => {
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

        const loginData = {
            email,
            password,
            login_with_email: true,
            mobile: null,
            role_id: 5,
        };

        try {
            setShowSnack(true);
            setShowError(false);
            setLoading(true);
            setErrorMessageOpen(false);

            const response = await axios.post(
                `${baseURL}/sec/auth/login`,
                JSON.stringify(loginData),
                {
                    headers: { Accept: "Application/json" },
                },
            );

            const resData = response?.data?.response;
            console.log("resData", resData);

            if (resData?.body === "INCOMPLETE_PROFILE") {
                localStorage.setItem("patient_Email", email);
                navigate("/patientcompleteprofile");
            } else if (resData?.access_token) {
                // Decode JWT to get user information
                const userInfo = decodeJWT(resData.access_token);
                console.log("Decoded user info from JWT:", userInfo);
                
                // Store user information
                localStorage.setItem("patient_Email", email);
                localStorage.setItem("access_token", resData.access_token);
                localStorage.setItem("patient_suid", resData.suid);
                localStorage.setItem("profile", resData.profile_picture);
                
                // Store additional user info from JWT
                localStorage.setItem("user_id", userInfo.userId);
                localStorage.setItem("role_id", userInfo.roleId || "");
                localStorage.setItem("jwt_email", userInfo.email || email);

                Cookies.set("patient_uid", resData.suid);
                Cookies.set("token", resData.access_token);
                Cookies.set("patientEmail", resData.email);

                authLogin(resData.email);
                navigate("/patientdashboard", { replace: true });
            } else {
                setShowError(true);
            }
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Login failed. Try again.";
            setErrorMessage(errMsg);
            setErrorMessageOpen(true);
            setShowSnack(false);
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-photo">
            <CustomSnackBar
                isOpen={showError}
                message={"Some error occurred, please try again later"}
                type="error"
            />
            <CustomSnackBar
                isOpen={showSnack}
                message={"Please wait while we are logging you in"}
                type="success"
            />
            <CustomSnackBar isOpen={errorMessageOpen} message={errorMessage} type="error" />

            <Box className="form-container">
                <div className="image-holder"></div>

                <Box className="component-library">
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
                        <h2 className="text-center" style={{ alignItems: "center" }}>
                            <strong>Patient Login</strong>
                        </h2>
                    </Box>

                    <CustomTextField
                        id="email"
                        label="Email"
                        defaultValue={email}
                        value={email}
                        helperText={email && (helperTextMessage ? "Valid Email" : "Invalid Email")}
                        onChange={(event) => {
                            const value = event.target.value;
                            setEmail(value);
                            setHelperTextMessage(emailRegex.test(value));
                        }}
                        textcss={{ width: "19.5em" }}
                    />

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
                            setPasswordHelperTextMessage(passwordRegex.test(value));
                        }}
                        textcss={{ width: "19.5em" }}
                        rightIcon={
                            showPassword ? (
                                <VisibilityIcon onClick={() => setShowPassword(false)} />
                            ) : (
                                <VisibilityOffIcon onClick={() => setShowPassword(true)} />
                            )
                        }
                    />

                    {/* <CustomButton
                        label="Log In"
                        isTransaprent={false}
                        isDisabled={false}
                        isElevated={false}
                        handleClick={handleLogin}
                        buttonCss={{
                            width: "22em",
                            padding: "8px 16px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "100px",
                            marginTop: "35px",
                        }}
                    /> */}
                    <CustomButton
                        label={loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
                        isDisabled={loading}
                        handleClick={handleLogin}
                        buttonCss={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "100px",
                            mt: 2,
                        }}
                        aria-label="Submit login form"
                    />

                    <div className="forgotpassword" style={{ fontSize: "small" }}>
                        <Link to="/forgotpassword" className="link">
                            Forgot Password
                        </Link>
                    </div>
                    <div className="mobile" style={{ fontSize: "small" }}>
                        <Link 
                            to="/loginwithotp" 
                            className="link"
                            onClick={() => localStorage.setItem("signUp", "patient")}
                        >
                            Log In with OTP
                        </Link>
                    </div>
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
                </Box>
            </Box>
        </div>
    );
};

export default PatientLogin;
