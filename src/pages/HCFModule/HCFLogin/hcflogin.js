// import React from 'react'
import React, { useState } from "react";
import "./hcflogin.scss";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";

const hcflogin = () => {
    const [showPassword, setShowPassword] = useState(true);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    // useNavigate hook for navigate
    const navigate = useNavigate();

    // from here

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/hcfdashboard");
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
                                        defaultValue={""}
                                        helperText={""}
                                        isValid
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
                                        defaultValue={""}
                                        helperText={""}
                                        isValid
                                        inputType={showPassword ? "password" : "text"}
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
                        <Link to="/loginwithotp" className="link">
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

export default hcflogin;
