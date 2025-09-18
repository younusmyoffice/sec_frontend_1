// import React from 'react'
import React, { useState } from "react";
import "./forgotpassword.scss";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import { baseURL } from "../../../../constants/const";
import CustomSnackBar from "../../../../components/CustomSnackBar";

const forgotpassword = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [showSnack, setShowSnack] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [EmailValidation] = useState(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const [disableButton, setDisableButton] = useState(true);
    // from here
    const PatientForgotPassword = async () => {
        setLoading(true);
        setShowSnack(false);
        if (email) {
            console.log("Email submit data : ", email);
            sessionStorage.setItem("EmailForgotPassword", email);
            try {
                const response = await axios.post(
                    `${baseURL}/sec/auth/forgotPassword`,
                    JSON.stringify({ email: email }),
                );
                navigate("/ForgotPasswordOTP");
            } catch (error) {
                setErrorMessage(error?.response?.data?.error);
                setShowSnack(true);
                // console.log(error?.response?.data?.error);
            } finally {
                setLoading(false);
            }
        } else {
            setErrorMessage("Please enter email");
            setShowSnack(true);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     navigate("/patientforgotpassword2");
    // };

    return (
        <div className="register-photo">
            <CustomSnackBar
                isOpen={showSnack}
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
                            <strong>Forgot Password</strong> <br />
                            <strong>Please Enter Email</strong>
                        </h2>
                    </Box>
                    <CustomTextField
                        id={"standard-helperText1"}
                        label={"Enter Email"}
                        defaultValue={email}
                        helperText={""}
                        isValid
                        onInput={(e) => {
                            setEmail(e.target.value);
                            console.log(e.target.value);
                            if (e.target.value.match(EmailValidation)) {
                                setDisableButton(false);
                            } else {
                                setDisableButton(true);
                            }
                        }}
                        textcss={{
                            width: "19.5em",
                            // height: "56px",
                        }}
                    />
                    <CustomButton
                        label={
                            loading ? <CircularProgress size={24} color="inherit" /> : "Continue"
                        }
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
    );
};

export default forgotpassword;
