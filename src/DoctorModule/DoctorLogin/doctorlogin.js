import Cookies from "js-cookie";
import React, { useState } from "react";
import "./doctorlogin.scss";
import { Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthentication } from "../../loginComponent/UserProvider";
import CustomSnackBar from "../../components/CustomSnackBar";
import CustomTextField from "../../components/CustomTextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomButton from "../../components/CustomButton";
import { baseURL, emailRegex, passwordRegex } from "../../constants/const";

const DoctorLogin = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSnack, setShowSnack] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);
    const [invalidUserMessage, setInvalidUserMessage] = useState("");
    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageOpen, setErrorMessageOpen] = useState(false);
    const [helperTextMessage, setHelperTextMessage] = useState(false);
    const [passwordHelperTextMessage, setPasswordHelperTextMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { DoctorLogin } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Please enter email and password");
            setErrorMessageOpen(true);
            return;
        }

        setShowSnack(true);
        setLoading(true);

        const payload = {
            email,
            password,
            login_with_email: true,
            role_id: 3,
        };

        try {
            const response = await axios.post(`${baseURL}/sec/auth/login`, JSON.stringify(payload), {
                headers: { "Content-Type": "application/json" },
            });

            const res = response?.data?.response;

            if (res?.body === "INCOMPLETE_PROFILE") {
                localStorage.setItem("doctor_suid", res?.suid);
                localStorage.setItem("email", email);
                navigate("/doctorsignup");
            } else if (response?.data?.error === "invalid user") {
                setInvalidUser(true);
                setInvalidUserMessage(response?.data?.error);
            } else if (res?.access_token) {
                localStorage.setItem("email", res?.email);
                localStorage.setItem("access_token", res?.access_token);
                localStorage.setItem("doctor_suid", res?.suid);
                localStorage.setItem("path", "request");
                localStorage.setItem("logged_as", "doctor");
                localStorage.setItem("profile", res?.profile_picture);

                Cookies.set("doctor_uid", res?.suid);
                Cookies.set("token", res?.access_token);
                Cookies.set("doctorEmail", res?.email);

                DoctorLogin(res?.email);
                setInvalidUser(false);
                navigate("/doctordashboard", { replace: true });
            } else {
                setErrorState(true);
                setErrorMessage("Unexpected response. Please try again.");
            }
        } catch (error) {
            setErrorState(true);
            setErrorMessage(error?.response?.data?.error || "Login failed. Try again.");
        } finally {
            setShowSnack(false);
            setLoading(false);
        }
    };

    return (
        <div className="register-photo">
            <CustomSnackBar isOpen={showSnack} message="Please wait while we are logging you in" type="success" />
            <CustomSnackBar isOpen={invalidUser} message={invalidUserMessage} type="error" />
            <CustomSnackBar isOpen={errorState} message={errorMessage} type="error" />
            <CustomSnackBar isOpen={errorMessageOpen} message={errorMessage} type="error" />

            <Box className="form-container">
                <div className="image-holder" />
                <Box className="component-library">
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <div className="logo1">
                            <img src="images/logo.png" alt="Logo" />
                        </div>
                        <h2 className="text-center"><strong>Doctor Login</strong></h2>
                    </Box>

                    <CustomTextField
                        id="email-input"
                        label="Email"
                        value={email}
                        defaultValue={email}
                        helperText={email ? (helperTextMessage ? "Valid Email" : "Invalid Email") : ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEmail(value);
                            setHelperTextMessage(emailRegex.test(value));
                        }}
                        textcss={{ width: "19.5em" }}
                    />

                    <CustomTextField
                        id="password"
                        label="Password"
                        value={password}
                        defaultValue={password}
                        helperText={
                            password
                                ? (passwordHelperTextMessage
                                    ? "Valid Password"
                                    : "Password must be 8+ characters with a number and special character")
                                : ""
                        }
                        type={showPassword ? "password" : "text"}
                        onChange={(e) => {
                            const value = e.target.value;
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

                    <CustomButton
                        label={loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
                        isDisabled={loading}
                        handleClick={handleSubmit}
                        buttonCss={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "100px",
                            marginTop: "20px",
                        }}
                    />

                    <div className="forgotpassword" style={{ fontSize: "small" }}>
                        <Link to="/forgotpassword" className="link">Forgot Password</Link>
                    </div>
                    <div className="mobile" style={{ fontSize: "small" }}>
                        <Link 
                            to="/loginwithotp" 
                            className="link"
                            onClick={() => localStorage.setItem("signUp", "doctor")}
                        >
                            Log In with OTP
                        </Link>
                    </div>
                    <div className="already" style={{
                            display: "inline",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "small",
                        }}>
                        I don&apos;t have an account &nbsp;
                        <Link to="/signupPage" className="link">Create Account</Link>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default DoctorLogin;
