// import React from 'react'
import React, { useState } from "react";
import "./ForgotPasswordChange.scss";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import { baseURL } from "../../../../constants/const";
import CustomSnackBar from "../../../../components/CustomSnackBar";

const ForgotPasswordChange = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isDisabledButton, setIsDisabledButton] = useState(true);
    const [showSnack, setShowSnack] = useState(false);
    const [showSnackError, setShowSnackError] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [error_responseMessage, setError_responseMessage] = useState();
    const [loading, setLoading] = useState(false);
    // from here
    const [navigateionPath] = useState(
        localStorage.getItem("signUp") === "doctor"
            ? "/doctorlogin"
            : localStorage.getItem("signUp") === "patient"
            ? "/patientlogin"
            : localStorage.getItem("signUp") === "diagnostic_center"
            ? "/diagnostcenterlogin"
            : localStorage.getItem("signUp") === "clinic"
            ? "/diagnostcliniclogin"
            : localStorage.getItem("signUp") === "hcf_admin"
            ? "/hcfadminlogin"
            : localStorage.getItem("signUp") === "super_admin"
            ? "/superadminlogin"
            : null,
    );

    const ChangePassword = async () => {
        setLoading(true);
        try {
            console.log("ChangePassword", sessionStorage.getItem("EmailForgotPassword"), sessionStorage.getItem("forgotpasswordotp"), confirmPassword);
            const response = await axios.post(
                `${baseURL}/sec/auth/changePassword`,
                JSON.stringify({
                    email: sessionStorage.getItem("EmailForgotPassword"),
                    new_password: confirmPassword,
                    activation_code: sessionStorage.getItem("forgotpasswordotp"),
                }),
            );
            console.log(response?.data?.response?.message);
            if (response?.data?.response?.message === "PASSWORD_CHANGE_SUCCESS") {
                setShowSnack(true);
                setResponseMessage(response?.data?.response?.message);
                navigate(navigateionPath);
            }
            console.log(response);
        } catch (error) {
            setShowSnackError(true);
            setError_responseMessage(error?.response?.data?.error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/patientlogin");
    };
    return (
        <div className="register-photo">
            <CustomSnackBar
                isOpen={showSnack}
                // actionLabel={"action"}
                // handleAction={() => setShowSnack(true)}
                message={responseMessage}
                type="success"
            />
            <CustomSnackBar
                isOpen={showSnackError}
                // actionLabel={"action"}
                // handleAction={() => setShowSnack(true)}
                message={error_responseMessage}
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
                            <strong>Please enter new password</strong>
                        </h2>
                    </Box>

                    <div className="items ">
                        <div className="field-center3">
                            {/* <Stack spacing={10} alignItems="center" flexDirection="column">
                               
                            </Stack> */}

                            <Stack spacing={3} alignItems="center" flexDirection="column">
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"New Password"}
                                    defaultValue={password}
                                    helperText={
                                        isDisabledButton
                                            ? "password does not match"
                                            : "password matched"
                                    }
                                    isValid={!isDisabledButton}
                                    textcss={{
                                        width: "19em",
                                    }}
                                    onInput={(event) => {
                                        setPassword(event?.target?.value);
                                        // console.log(event.target.value)
                                        if (confirmPassword === event?.target?.value) {
                                            // setConfirmPassword(event.target.value)
                                            if (confirmPassword === "") {
                                                setIsDisabledButton(true);
                                                return;
                                            }
                                            setIsDisabledButton(false);
                                        } else {
                                            setIsDisabledButton(true);
                                        }
                                    }}
                                />
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"Confirm Password"}
                                    defaultValue={confirmPassword}
                                    helperText={
                                        isDisabledButton
                                            ? "password does not match"
                                            : "password matched"
                                    }
                                    isValid={!isDisabledButton}
                                    textcss={{
                                        width: "19em",
                                    }}
                                    onInput={(event) => {
                                        setConfirmPassword(event.target.value);
                                        if (password === event?.target?.value) {
                                            // setConfirmPassword(event.target.value)
                                            if (confirmPassword === "") {
                                                setIsDisabledButton(true);
                                                return;
                                            }
                                            setIsDisabledButton(false);
                                        } else {
                                            setIsDisabledButton(true);
                                        }
                                    }}
                                />
                            </Stack>
                        </div>
                    </div>

                    <CustomButton
                        label={
                            loading ? <CircularProgress size={24} color="inherit" /> : "Continue"
                        }
                        isTransaprent={false}
                        isDisabled={loading || isDisabledButton}
                        isElevated={false}
                        handleClick={ChangePassword}
                        buttonCss={{
                            width: "22em",
                            // height: "3.5em",
                            padding: "8px 16px",
                            justifyContent: "center",
                            alignItems: "center",

                            borderRadius: "100px",
                            // marginLeft: "-70px",
                            // marginTop: "37px",
                        }}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default ForgotPasswordChange;
