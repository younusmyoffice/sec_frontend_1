// import React from 'react'
import React, { useEffect, useState } from "react";
import "./clicniLogin.scss";
import { Box, CircularProgress, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../../config/axiosInstance";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";
import { useAuthentication } from "../../../loginComponent/UserProvider";
import CustomSnackBar from "../../../components/CustomSnackBar/custom-sack-bar";
import { baseURL, emailRegex, passwordRegex } from "../../../constants/const";
import Cookies from "js-cookie";

const ClinicLogin = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [islogin, setIslogin] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showSnack, setShowSnack] = useState(false);
    const [helperTextMessage, setHelperTextMessage] = useState(false);
    const [passwordHelperTextMessage, setPasswordHelperTextMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorMessageOpen, setErrorMessageOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: null,
        password: null,
        login_with_email: true,
        mobile: null,
        role_id: 6,
    });

    const navigate = useNavigate();
    const { ClinicLogin } = useAuthentication();

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

        const loginData = {
            email,
            password,
            login_with_email: true,
            mobile: null,
            role_id: 6,
        };

        setShowSnack(true);
        setErrorMessageOpen(false);
        setLoading(true);
        setShowError(false);

        try {
            const response = await axios.post(
                `${baseURL}/sec/auth/login`,
                JSON.stringify(loginData),
                {
                    Accept: "Application/json",
                },
            );

            const resData = response?.data?.response;

            if (resData?.body === "INCOMPLETE_PROFILE") {
                navigate("/clinicdoctorcompleteprofile");
            } else if (resData?.access_token) {
                localStorage.setItem("access_token", resData.access_token);
                localStorage.setItem("clinic_suid", resData.suid);
                localStorage.setItem("clinic_Email", resData.email);
                localStorage.setItem("profile", resData.profile_picture);
                Cookies.set("clinicEmail", resData.email, { expires: 7 });

                ClinicLogin(resData.email);

                navigate("/clinicDashboard/clinicbodydashboard/clinirequests", { replace: true });
            } else {
                setShowError(true);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error?.response?.data?.error || "Something went wrong");
            setErrorMessageOpen(true);
            setEmail(null);
            setPassword(null);
            setShowSnack(false);
        } finally {
            setLoading(false);
            setShowSnack(false);
        }
    };

    // useEffect(() => {
    //     if (islogin === true) {
    //         fetchData();
    //     }
    // }, [islogin]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // if (email === null && password === null) {
    //     //     alert("Email and Password");
    //     //     setIslogin(false);
    //     //     return false;
    //     // }
    //     // else if(regularExpression.test(password)){
    //     //     alert("password should contain atleast one number and one special character");
    //     //     return false;
    //     // }
    //     setData({
    //         email: email,
    //         password: password,
    //         // mobile: "9994483286",
    //         login_with_email: true,
    //         role_id: 6,
    //     });
    //     // setIslogin(!islogin);
    //     fetchData();
    //     return null;
    // };

    console.log("Patient Data : ", data);

    return (
        <div className="register-photo">
            <CustomSnackBar
                isOpen={showError}
                // actionLabel={"action"}
                // handleAction={() => setShowSnack(true)}
                message={"some error occur please try later"}
                type="error"
            />

            <CustomSnackBar
                isOpen={showSnack}
                // actionLabel={"action"}
                // handleAction={() => setShowSnack(true)}
                message={"Please Wait while we are logging you in"}
                type="success"
            />

            <CustomSnackBar
                isOpen={errorMessageOpen}
                // actionLabel={"action"}
                // handleAction={() => setShowSnack(true)}
                message={errorMessage}
                type="error"
            />
            <Box className="form-container">
                <div className="image-holder"></div>

                <Box className="component-library ">
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
                            <strong>Clinic Login</strong>
                        </h2>
                    </Box>
                    <CustomTextField
                        id={"standard-helperText1"}
                        label={"Email"}
                        value={email || ""}
                        helperText={
                            email ? (emailRegex.test(email) ? "Valid Email" : "Invalid Email") : ""
                        }
                        onChange={(event) => {
                            const value = event.target.value;
                            setEmail(value);
                            setHelperTextMessage(emailRegex.test(value));
                        }}
                        textcss={{ width: "19.5em" }}
                    />
                    {/* // spacing={10}
                                    // alignItems="center"
                                    // flexDirection="column"
                                    // sx={{ marginTop: "2%" }} */}

                    <CustomTextField
                        id={"standard-helperText1"}
                        label={"Password"}
                        value={password || ""}
                        defaultValue={password}
                        helperText={
                            password
                                ? passwordRegex.test(password)
                                    ? "Valid Password"
                                    : "Password must be 8+ characters with a number and special character"
                                : ""
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
                            label={"Log In"}
                            isTransaprent={false}
                            isDisabled={false}
                            isElevated={false}
                            handleClick={fetchData}
                            buttonCss={{
                                width: "22em",
                                // height: "3.5em",
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
                        handleClick={fetchData}
                        buttonCss={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "100px",
                            mt: 2,
                        }}
                        aria-label="Submit login form"
                    />
                    <div className="forgotpassword" style={{ fontSize: "small" }}>
                        <Link to="/patientforgotpassword" className="link">
                            Forgot Password
                        </Link>
                    </div>
                    <div className="mobile" style={{ fontSize: "small" }}>
                        <Link 
                            to="/loginwithotp" 
                            className="link"
                            onClick={() => localStorage.setItem("signUp", "clinic")}
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
                        I Don&apos;t have an account &nbsp;
                        <Link to="/patientsignup" className="link">
                            Create Account
                        </Link>
                    </div> */}
                </Box>
            </Box>
        </div>
    );
};

export default ClinicLogin;
