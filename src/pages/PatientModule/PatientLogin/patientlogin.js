/* eslint-disable semi */
/* eslint-disable space-before-blocks */
/* eslint-disable prettier/prettier */
// import React from 'react'
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "./patientlogin.scss";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../config/axiosInstance";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";
import { useAuthentication } from "../../../loginComponent/UserProvider";
import CustomSnackBar from "../../../components/CustomSnackBar/custom-sack-bar";

const patientlogin = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [islogin, setIslogin] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showSnack, setShowSnack] = useState(false);
    const regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const [data, setData] = useState({
        email: null,
        password: null,
        login_with_email: null,
        mobile: null,
    });

    const navigate = useNavigate();
    const Authentication = useAuthentication();

    const fetchData = async () => {
        console.log("Entered the fetch data");
        setShowSnack(true);
        // navigate("/skelatonLoader" , {replace : true});
        try {
            // const response = await axiosInstance.post("/sec/auth/login",JSON.stringify(data),{"Accept" : "Application/json"});
            const response = await axios.post(
                "http://localhost:3000/sec/auth/login",
                JSON.stringify(data),
                { Accept: "Application/json" },
            );
            console.log("REsponase : ", response);

            if (response?.data?.error === "INCOMPLETE_PROFILE") {
                alert("sign up");
                navigate("/doctorsignup");
            } else {
                console.log("email : ", response?.data?.response?.email);
                console.log("access_token : ", response?.data?.response?.access_token);
                console.log("doctor suid : ", response?.data?.response?.suid);

                Cookies.set("patient_uid", response?.data?.response?.suid);
                Cookies.set("token", response?.data?.response?.access_token);
                Cookies.set("patientEmail", response?.data?.response?.email);
                Authentication.PatientLogin(email);
                // alert("succesfully loggedIn");
                // navigate('/patientverification' , {replace : true});
                console.log("navigate to patient");
                setIslogin(false);
                navigate("/patientdashboard", { replace: true });
            }
        } catch (error) {
            console.log(error);
            alert("Enter Correct username and password", error);
            setEmail(null);
            setPassword(null);
            setIslogin(false);
        }
    };

    useEffect(() => {
        if (islogin === true) {
            fetchData();
        }
    }, [islogin]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === null && password === null) {
            alert("Email and Password");
            setIslogin(false);
            return false;
        }
        // else if(regularExpression.test(password)){
        //     alert("password should contain atleast one number and one special character");
        //     return false;
        // }
        setData({
            email: email,
            password: password,
            // mobile: "9994483286",
            login_with_email: true,
        });
        setIslogin(!islogin);
        // fetchData();
        return null;
    };

    return (
        <div className="register-photo">
            <CustomSnackBar
                isOpen={showSnack}
                // actionLabel={"action"}
                // handleAction={() => setShowSnack(true)}
                message={"Please Wait while we are logging you in"}
                type="success"
            />
            <div className="form-container">
                <div className="image-holder"></div>

                <div>
                    <div className="logo1">
                        <img src="images/logo.png" alt="Logo" width="200" />
                    </div>

                    <h2 className="text-center">
                        <strong>Patient Login</strong>
                    </h2>

                    <div className="component-library ">
                        <div className="items ">
                            <div className="field-center">
                                <Stack spacing={10} alignItems="center" flexDirection="column">
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Email"}
                                        defaultValue={email}
                                        helperText={"Mobile or Email"}
                                        // isValid
                                        onChange={(event) => setEmail(event.target.value)}
                                        textcss={{
                                            width: "22.5em",
                                            height: "56px",
                                        }}
                                    />
                                </Stack>

                                <Stack
                                    spacing={10}
                                    alignItems="center"
                                    flexDirection="column"
                                    sx={{ marginTop: "2%" }}
                                >
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Password"}
                                        defaultValue={password}
                                        helperText={"Password"}

                                        // isValid
                                        onChange={(event) => setPassword(event.target.value)}
                                        inputType={"password"}
                                        textcss={{
                                            width: "22.5em",
                                            height: "56px",
                                        }}
                                        // rightIcon={
                                        //     showPassword ? (
                                        //         <VisibilityIcon onClick = {() => setShowPassword(false)} />
                                        //     ) : (
                                        //         <VisibilityOffIcon onClick = {() => setShowPassword(true)}/>
                                        //     )
                                        // }
                                    />
                                </Stack>
                           
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <CustomButton
                            label={"Log In"}
                            isTransaprent={false}
                            isDisabled={false}
                            isElevated={false}
                            handleClick={handleSubmit}
                            buttonCss={{
                                width: "25.8em",
                                height: "3.5em",
                                padding: "8px 16px",
                                justifyContent: "center",
                                alignItems: "center",

                                borderRadius: "100px",
                                marginLeft: "-70px",
                                marginTop: "37px",
                            }}
                        />
                    </div>
                    <div className="forgotpassword">
                        <Link to="/patientforgotpassword" className="link">
                            Forgot Password
                        </Link>
                    </div>
                    <div className="mobile">
                        <Link to="/patientloginwithotp" className="link">
                            Log In with OTP
                        </Link>
                    </div>
                    <div className="already">
                        I Don&apos;t have an account &nbsp;
                        <Link to="/patientsignup" className="link">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default patientlogin;
