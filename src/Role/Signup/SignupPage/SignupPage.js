// import React from 'react'
import React, { useEffect, useState } from "react";
import "./SignupPage.scss";
import { Box, colors, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomCountryCodeSelector from "../../../components/CustomCountryCodeSelector";
import { useMobileValidation } from "../../../hooks/useMobileValidation";
import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { numberRegex, baseURL, emailRegex, passwordRegex } from "../../../constants/const";
import CustomSnackBar from "../../../components/CustomSnackBar";

const patientsignup = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    // State for who is registering
    const [module, setModule] = useState();
    const [moduleName, setModuleName] = useState();
    const [submitButtonEnable, setSubmitButtonEnable] = useState(true);
    const typeOfUser = localStorage.getItem("signUp");
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        type: "success", // success, error, warning, etc.
    });
    
    // Use the centralized mobile validation hook
    const {
        mobile,
        countryCode,
        countryName,
        countryFlag,
        validationErrors: mobileValidationErrors,
        handleCountryCodeChange,
        handleMobileInput,
        validateMobile,
        getHelperText,
        isFormValid: isMobileFormValid,
        getCleanMobileNumber
    } = useMobileValidation("+1", 500);
    
    // Validation states for other fields
    const [validationErrors, setValidationErrors] = useState({
        email: { isValid: true, message: "" },
        password: { isValid: true, message: "" },
        confirmPassword: { isValid: true, message: "" }
    });

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

    const roleID =
        typeOfUser === "super_admin"
            ? 1
            : typeOfUser === "hcf_admin"
            ? 2
            : typeOfUser === "doctor"
            ? 3
            : typeOfUser === "diagnostic_center"
            ? 4
            : typeOfUser === "patient"
            ? 5
            : typeOfUser === "clinic"
            ? 6
            : null;
    // console.log(`Role ID : ${roleID}`);
    // Need to change the role id based on the user type to register the user
    const [data, setData] = useState({
        email: null,
        mobile: null,
        password: null,
        role_id: roleID,
        dialing_code: "+1",
        country_name: "United States",
    });

    // const [isloading , setIsloading] = useState(false);
    // console.log("Send Data",JSON.stringify(data));
    // useNavigate hook for navigate

    const navigate = useNavigate();
    console.log("data : ", data);

    // Validation functions
    const validateEmail = (email) => {
        if (!email) {
            return { isValid: true, message: "" };
        }
        if (!emailRegex.test(email)) {
            return { isValid: false, message: "Enter Valid Email Address" };
        }
        return { isValid: true, message: "" };
    };

    // Mobile validation is now handled by the useMobileValidation hook

    const validatePassword = (password) => {
        if (!password) {
            return { isValid: true, message: "" };
        }
        if (!passwordRegex.test(password)) {
            return { isValid: false, message: "Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character" };
        }
        return { isValid: true, message: "" };
    };

    const validateConfirmPassword = (confirmPassword, originalPassword) => {
        if (!confirmPassword) {
            return { isValid: true, message: "" };
        }
        if (confirmPassword !== originalPassword) {
            return { isValid: false, message: "Passwords do not match" };
        }
        return { isValid: true, message: "" };
    };

    // Country code change is now handled by the useMobileValidation hook
    // We just need to update the data state when mobile changes
    const handleMobileDataUpdate = (mobileValue, countryCodeValue, countryNameValue) => {
        setData(prevData => ({
            ...prevData,
            mobile: mobileValue,
            dialing_code: countryCodeValue,
            country_name: countryNameValue,
        }));
    };

    const fetchData = async () => {
        setSnackbarState({
            open: true,
            message: "Please wait while we are Registering your Details!",
            type: "Info",
        });
        try {
            console.log("Data-", data);
            const response = await axios.post(`${baseURL}/sec/auth/register`, JSON.stringify(data));
            console.log("Response Received", response);
            setSnackbarState({
                open: true,
                message: "Registered successfully!",
                type: "success",
            });
            Cookies.set("email", data?.email);
            navigate("/emailVerification");
        } catch (error) {
            console.log(error);
            console.log(error?.response?.request?.status);
            setSnackbarState({
                open: true,
                message: error.response?.data?.message || "Something went wrong.",
                type: "error",
            });
            // if (error?.response?.request?.status === 403) {
            //     alert(error?.response?.data?.error);
            // }

            // navigate("/patientverification");
        }
    };

    useEffect(() => {
        const moduleType = localStorage.getItem("signUp");
        setModule(moduleType);
        const NameOfModule =
            moduleType === "patient"
                ? "Patient"
                : moduleType === "doctor"
                ? "Doctor"
                : moduleType === "super_admin"
                ? "Super Admin"
                : moduleType === "diagnostic_center"
                ? "Diagnostic Center"
                : moduleType === "clinic"
                ? "Clinic"
                : moduleType === "hcf_admin"
                ? "HCF Admin"
                : null;

        setModuleName(NameOfModule);
    }, []);

    // Sync mobile data with the validation hook
    useEffect(() => {
        handleMobileDataUpdate(mobile, countryCode, countryName);
    }, [mobile, countryCode, countryName]);

    // useEffect(() => {
    //     if(isloading === true){
    //         fetchData();
    //     }
    // } ,[isloading]);

    // from here

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate mobile number
        const mobileValidation = validateMobile();
        
        // Check if all validations pass
        const allValid = Object.values(validationErrors).every(error => error.isValid) && mobileValidation.isValid;
        
        if (!allValid) {
            setSnackbarState({
                open: true,
                message: "Please fix all validation errors before submitting",
                type: "error",
            });
            return;
        }
        
        // Check if all required fields are filled
        if (!data.email || !data.mobile || !data.password) {
            setSnackbarState({
                open: true,
                message: "Please fill in all required fields",
                type: "error",
            });
            return;
        }
        
        fetchData();
    };

    return (
        <div className="register-photo">
            <Box className="form-container">
                <div className="image-holder"></div>
                <CustomSnackBar
                    isOpen={snackbarState.open}
                    message={snackbarState.message}
                    hideDuration={4000}
                    type={snackbarState.type}
                />
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
                            <strong>{`${moduleName} `} Sign Up</strong>
                        </h2>
                    </Box>
                    <CustomCountryCodeSelector
                        id={"mobile-number-with-country-code"}
                        label={""}
                        value={mobile || ""}
                        helperText={getHelperText()}
                        error={!mobileValidationErrors.mobile.isValid && mobileValidationErrors.mobile.message !== ""}
                        onChange={handleCountryCodeChange}
                        onInput={handleMobileInput}
                        textcss={{
                            width: "19.5em",
                        }}
                        defaultCountryCode="+1"
                        defaultCountryName="United States"
                        defaultCountryFlag="🇺🇸"
                    />

                    <CustomTextField
                        id={"standard-helperText1"}
                        label={"Email Address"}
                        defaultValue={data.email}
                        helperText={validationErrors.email.isValid ? "" : validationErrors.email.message}
                        error={!validationErrors.email.isValid && validationErrors.email.message !== ""}
                        // Debug logging
                        // console.log("Email error state:", !validationErrors.email.isValid && validationErrors.email.message !== "")
                        // isValid
                        onChange={(event) => {
                            const email = event?.target?.value;
                            const emailValidation = validateEmail(email);
                            console.log("Email validation:", emailValidation); // Debug log
                            setValidationErrors(prev => ({
                                ...prev,
                                email: emailValidation
                            }));
                            
                            const copy = { ...data, email: email };
                            setData(copy);
                        }}
                        textcss={{
                            width: "19.5em",
                            // height: "56px",
                        }}
                    />

                    <CustomTextField
                        id={"standard-helperText1"}
                        label={"Enter Password"}
                        defaultValue={password}
                        helperText={validationErrors.password.isValid ? "" : validationErrors.password.message}
                        error={!validationErrors.password.isValid && validationErrors.password.message !== ""}
                        type={showPassword ? "password" : "text"}
                        // isValid
                        onInput={(event) => {
                            const passwordValue = event.target.value;
                            setPassword(passwordValue);
                            
                            // Validate password
                            const passwordValidation = validatePassword(passwordValue);
                            setValidationErrors(prev => ({
                                ...prev,
                                password: passwordValidation
                            }));

                            // Check if passwords match
                            if (passwordValue === confirmPassword) {
                                console.log("password matched");
                                setSubmitButtonEnable(false);
                                setData({ ...data, password: passwordValue });
                            } else {
                                console.log("password does not match");
                                setSubmitButtonEnable(true);
                            }
                        }}
                        inputType={showPassword ? "password" : "text"}
                        textcss={{
                            width: "19.5em",
                            // height: "56px",
                        }}
                        rightIcon={
                            showPassword ? (
                                <VisibilityIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <VisibilityOffIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setShowPassword(true)}
                                />
                            )
                        }
                    />

                    <CustomTextField
                        id={"standard-helperText1"}
                        label={"Confirm Password"}
                        defaultValue={data.password}
                        helperText={validationErrors.confirmPassword.isValid ? "" : validationErrors.confirmPassword.message}
                        error={!validationErrors.confirmPassword.isValid && validationErrors.confirmPassword.message !== ""}
                        type={showPasswordConfirm ? "password" : "text"}
                        // isValid
                        onInput={(event) => {
                            const confirmPasswordValue = event.target.value;
                            setConfirmPassword(confirmPasswordValue);
                            
                            // Validate confirm password
                            const confirmPasswordValidation = validateConfirmPassword(confirmPasswordValue, password);
                            setValidationErrors(prev => ({
                                ...prev,
                                confirmPassword: confirmPasswordValidation
                            }));

                            if (password === confirmPasswordValue) {
                                console.log("password matched");
                                setSubmitButtonEnable(false);
                                setData({ ...data, password: confirmPasswordValue });
                            } else {
                                console.log("password does not match");
                                setSubmitButtonEnable(true);
                            }
                        }}
                        inputType={confirmPassword ? "password" : "text"}
                        textcss={{
                            width: "19.5em",
                            // height: "56px",
                        }}
                        rightIcon={
                            showPasswordConfirm ? (
                                <VisibilityIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setShowPasswordConfirm(false)}
                                />
                            ) : (
                                <VisibilityOffIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setShowPasswordConfirm(true)}
                                />
                            )
                        }
                    />

                    <CustomButton
                        label={"Continue"}
                        isTransaprent={false}
                        isDisabled={submitButtonEnable || !isMobileFormValid()}
                        isElevated={false}
                        handleClick={handleSubmit}
                        buttonCss={{
                            width: "22em",
                            // height: "3.5em",
                            padding: "8px 16px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "100px",
                            marginTop: "35px",
                        }}
                    />
                    <div className="login">
                        I have an account &nbsp;
                        <Link to={navigateToLogin} className="link">
                            Log In
                        </Link>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default patientsignup;
