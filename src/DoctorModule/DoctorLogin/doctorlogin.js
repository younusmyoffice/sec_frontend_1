// import React from 'react'
import React, { useState } from "react";
import "./doctorlogin.scss";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import CustomTextField from "../../../components/CustomTextField";
// import CustomButton from "../../../components/CustomButton/custom-button";
// import { useAuthentication } from "../../../loginComponent/UserProvider";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomButton from "../../components/CustomButton/custom-button";
import { useAuthentication } from "../../loginComponent/UserProvider";

const DoctorLogin = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    // useNavigate hook for navigate
    const navigate = useNavigate();
    const Authentication = useAuthentication();

    // from here

    const handleSubmit = (e) => {
        // e.preventDefault();
        // Authentication.DoctorLogin(email);
        // Cookies.set("doctorEmail", email);
        navigate("/doctordashboard");
    };
    return (
        <div className="register-photo">
            <div className="form-container">
                <div className="image-holder"></div>

                <div>
                    <div className="logo1">
                        <img src="images/logo.png" alt="Logo" width="200" />
                    </div>

                    <h2 className="text-center">
                        <strong>Login</strong>
                    </h2>

                    <div className="component-library ">
                        <div className="items ">
                            <div className="field-center">
                                <Stack spacing={10} alignItems="center" flexDirection="column">
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Mobile or Email"}
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

                                <Stack spacing={10} alignItems="center" flexDirection="column">
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Password"}
                                        defaultValue={password}
                                        helperText={"password"}
                                        // isValid
                                        inputType={showPassword ? "password" : "text"}
                                        onChange={(event) => setPassword(event.target.value)}
                                        textcss={{
                                            width: "22.5em",
                                            height: "56px",
                                            marginTop: "2%",
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

export default DoctorLogin;
