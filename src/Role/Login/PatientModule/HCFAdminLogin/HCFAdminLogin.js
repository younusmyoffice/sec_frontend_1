import React, { useState } from "react";
import Cookies from "js-cookie";
import { Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./HCFAdminLogin.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axiosInstance from "../../../../config/axiosInstance";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import { useAuthentication } from "../../../../loginComponent/UserProvider";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import { baseURL, emailRegex, passwordRegex } from "../../../../constants/const";
import { decodeJWT } from "../../../../utils/jwtUtils";

const HcfAdminLogin = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSnack, setShowSnack] = useState(false);
    const [helperTextMessage, setHelperTextMessage] = useState(false);
    const [passwordHelperTextMessage, setPasswordHelperTextMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageOpen, setErrorMessageOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { HealthCare } = useAuthentication();

    const fetchData = async () => {
        if (!email || !password) {
            setErrorMessage("Please enter email and password");
            setErrorMessageOpen(true);
            return;
        }

        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email");
            setErrorMessageOpen(true);
            return;
        }

        if (!passwordRegex.test(password)) {
            setErrorMessage("Password must meet the required criteria");
            setErrorMessageOpen(true);
            return;
        }

        const requestData = {
            email,
            password,
            login_with_email: true,
            mobile: null,
            role_id: 2,
        };

        try {
            setLoading(true);
            setShowSnack(true);
            const response = await axios.post(
                `${baseURL}/sec/auth/login`,
                JSON.stringify(requestData),
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                },
            );

            const resData = response?.data?.response;
            console.log("Login response data:", resData);

            if (resData?.body === "INCOMPLETE_PROFILE") {
                // For incomplete profile, store email and suid from response
                console.log("Incomplete profile detected, using response data:", resData);
                
                // Store the email and suid from the response
                localStorage.setItem("hcfadmin_Email", resData.email || email);
                localStorage.setItem("hcfadmin_suid", resData.suid);
                
                // Store additional info for debugging
                console.log("Stored email for incomplete profile:", resData.email || email);
                console.log("Stored suid for incomplete profile:", resData.suid);
                console.log("Navigating to signup for incomplete profile");
                
                navigate("/hcfadminsignup");
            } else if (resData?.access_token) {
                // Decode JWT token to extract user information
                const userInfo = decodeJWT(resData.access_token);
                console.log("Decoded user info from JWT:", userInfo);

                localStorage.setItem("access_token", resData.access_token);
                localStorage.setItem("hcfadmin_Email", resData.email);
                localStorage.setItem("hcfadmin_suid", resData.suid);
                localStorage.setItem("profile", resData.profile_picture);

                // Store JWT decoded information
                localStorage.setItem("user_id", userInfo.userId);
                localStorage.setItem("role_id", userInfo.roleId || "");
                localStorage.setItem("jwt_email", userInfo.email || resData.email);

                Cookies.set("token", resData.access_token);
                Cookies.set("hcfadmin_Email", resData.email);

                HealthCare(resData.email);
                navigate("/hcfadmin/notification", { replace: true });
                setErrorMessageOpen(false);
            } else {
                setShowError(true);
            }
        } catch (error) {
            console.log("Login error: ", error);
    
            const apiError = error?.response?.data?.error || "Something went wrong";
        
            setErrorMessage(apiError); // Set proper error message from response
            setErrorMessageOpen(true); // Open the snackbar with the error
            setShowSnack(false);       // Hide the loading snackbar if open
            setShowError(false);       // Hide generic error snackbar (optional)
            setLoading(false);
        
            // optionally clear inputs, but don’t clear them too early
            // setEmail(null);
            // setPassword(null);
        } finally {
            setLoading(false);
            setShowSnack(false);
        }
    };

    return (
        <div className="register-photo">
            <CustomSnackBar
                isOpen={showError}
                message={"Some error occurred, please try later"}
                type="error"
            />

            <CustomSnackBar
                isOpen={showSnack}
                message={"Please wait while we are logging you in"}
                type="success"
            />

            <CustomSnackBar isOpen={errorMessageOpen} message={errorMessage} type="error" />

            <Box className="form-container">
                <div className="image-holder" />

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
                            <img src="images/logo.png" alt="Logo" width="200" />
                        </div>
                        <h2 className="text-center">
                            <strong>HCF Admin Login</strong>
                        </h2>
                    </Box>

                    <CustomTextField
                        id="email-input"
                        label="Email"
                        defaultValue={email}
                        value={email}
                        helperText={email && (helperTextMessage ? "Valid Email" : "Invalid Email")}
                        onChange={(event) => {
                            const val = event.target.value;
                            setEmail(val);
                            setHelperTextMessage(emailRegex.test(val));
                        }}
                        textcss={{ width: "19.5em" }}
                    />

                    <CustomTextField
                        id="password-input"
                        label="Password"
                        defaultValue={password}
                        value={password}
                        type={showPassword ? "password" : "text"}
                        helperText={
                            password &&
                            (passwordHelperTextMessage ? "Valid Password" : "Password must be 8+ characters with a number and special character")
                        }
                        onChange={(event) => {
                            const val = event.target.value;
                            setPassword(val);
                            setPasswordHelperTextMessage(passwordRegex.test(val));
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

                    <CustomButton
                        label={loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
                        isDisabled={loading}
                        handleClick={fetchData}
                        buttonCss={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "100px",
                            marginTop: "20px",
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
                            onClick={() => localStorage.setItem("signUp", "hcf_admin")}
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
                        <Link to="/signupPage" className="link">
                            Create Account
                        </Link>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default HcfAdminLogin;
