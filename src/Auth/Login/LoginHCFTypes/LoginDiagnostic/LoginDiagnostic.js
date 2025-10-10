import React, { useState } from "react";
import "./LoginDiagnostic.scss";
import { Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../../../config/axiosInstance";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import { useAuthentication } from "../../../../loginComponent/UserProvider";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import { baseURL, emailRegex, passwordRegex } from "../../../../constants/const";
import Cookies from "js-cookie";

const DiagnosticLogin = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageOpen, setErrorMessageOpen] = useState(false);
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();
    const { DiagnostLogin } = useAuthentication();

    const fetchData = async () => {
        if (!email || !password) {
            setErrorMessage("Please enter email and password");
            setErrorMessageOpen(true);
            return;
        }

        const loginData = {
            email,
            password,
            login_with_email: true,
            mobile: null,
            role_id: 4,
        };

        setShowSnack(true);
        setErrorMessageOpen(false);
        setLoading(true);
        setShowError(false);

        try {
            const response = await axios.post(
                `${baseURL}/sec/auth/login`,
                JSON.stringify(loginData),
                { Accept: "Application/json" }
            );

            const resData = response?.data?.response;
console.log("resData", resData);
            if (resData?.body === "INCOMPLETE_PROFILE") {
                // Store diagnostic center data for incomplete profile
                localStorage.setItem("login_Email", resData.email);
                localStorage.setItem("email", resData.email);
                localStorage.setItem("diagnostic_suid", resData.suid);
                console.log("Incomplete profile - stored diagnostic data:", resData.email, resData.suid);
                navigate("/diagnostCenterSignup", { replace: true });
            } else if (resData?.access_token) {
                localStorage.setItem("access_token", resData.access_token);
                localStorage.setItem("diagnostic_suid", resData.suid);
                localStorage.setItem("diagnostic_Email", resData.email);
                localStorage.setItem("profile", resData.profile_picture);
                Cookies.set("diagnostic_Email", resData.email, { expires: 7 });

                DiagnostLogin(resData.email);
                navigate("/diagnostCenterDashboard/notification", { replace: true });
            } else {
                setShowError(true);
            }
        } catch (error) {
            setErrorMessage(error?.response?.data?.error || "Login failed");
            setErrorMessageOpen(true);
            setEmail("");
            setPassword("");
        } finally {
            setShowSnack(false);
            setLoading(false);
        }
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailValid(emailRegex.test(value));
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setPasswordValid(passwordRegex.test(value));
    };

    return (
        <div className="register-photo">
            <CustomSnackBar
                isOpen={showError}
                message="Some error occurred, please try later"
                type="error"
            />
            <CustomSnackBar
                isOpen={showSnack}
                message="Please wait while we log you in"
                type="success"
            />
            <CustomSnackBar
                isOpen={errorMessageOpen}
                message={errorMessage}
                type="error"
            />

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
                        <h2 className="text-center">
                            <strong>Diagnostic Login</strong>
                        </h2>
                    </Box>

                    <CustomTextField
                        id="email-input"
                        label="Email"
                        value={email}
                        defaultValue={email}
                        helperText={email ? (emailValid ? "Valid Email" : "Invalid Email") : ""}
                        onChange={handleEmailChange}
                        textcss={{ width: "19.5em" }}
                    />

                    <CustomTextField
                        id="password-input"
                        label="Password"
                        value={password}
                        helperText={
                            password
                                ? passwordValid
                                    ? "Valid Password"
                                    : "Password must be 8+ characters with a number and special character"
                                : ""
                        }
                        type={showPassword ? "password" : "text"}
                        onChange={handlePasswordChange}
                        defaultValue={password}
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
                            marginTop: "16px",
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
                            onClick={() => localStorage.setItem("signUp", "diagnostic_center")}
                        >
                            Log In with OTP
                        </Link>
                    </div>
                    {/* <div
                        className="already"
                        style={{
                            display: "inline",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "small",
                        }}
                    >
                        I don&apos;t have an account &nbsp;
                        <Link to="/patientsignup" className="link">
                            Create Account
                        </Link>
                    </div> */}
                </Box>
            </Box>
        </div>
    );
};

export default DiagnosticLogin;
