/* eslint-disable import/order */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable prettier/prettier */
// import React from 'react'
import React, { useEffect, useState } from "react";
import "./patientsignup.scss";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";
import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";

const patientsignup = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    // State for who is registering
    const [module, setModule] = useState();
    const [moduleName, setModuleName] = useState();
    const typeOfUser = localStorage.getItem("signUp");
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
    console.log(`Role ID : ${roleID}`);
    // Need to change the role id based on the user type to register the user
    const [data, setData] = useState({
        email: null,
        mobile: null,
        password: null,
        role_id: roleID,
    });

    // const [isloading , setIsloading] = useState(false);
    //console.log("Send Data",JSON.stringify(data));
    // useNavigate hook for navigate

    const navigate = useNavigate();

    const fetchData = async () => {
        console.log("Entered the fetch data function ");
        try {
            const response = await axios.post(
                "http://localhost:3000/sec/auth/register",
                JSON.stringify(data),
            );
            console.log("Response Received", response);
            alert(response);
            Cookies.set("email", data?.email);
            navigate("/patientverification");
        } catch (error) {
            console.log(error);
            console.log(error?.response?.request?.status);
            // if (error?.response?.request?.status === 403) {
            //     alert(error?.response?.data?.error);
            // }

            // navigate("/patientverification");
        }
    };

    useEffect(() => {
        let moduleType = localStorage.getItem("signUp");
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

    // useEffect(() => {
    //     if(isloading === true){
    //         fetchData();
    //     }
    // } ,[isloading]);

    // from here

    const handleSubmit = (e) => {
        // setData({
        //     email: 'dsdasd',
        //     mobile: '321321',
        //     password: 'dsada',
        //     role_id: 5,
        // });
        // setIsloading(!isloading);
        e.preventDefault();
        console.log("CLicked");
        fetchData();
        // navigate("/patientverification");
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
                        <strong>{`${moduleName} `} Sign Up</strong>
                    </h2>

                    <div className="component-library ">
                        <div className="items ">
                            <div className="field-center">
                                <Stack spacing={10} alignItems="center" flexDirection="column">
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={""}
                                        defaultValue={""}
                                        helperText={"Mobile Number"}
                                        isValid
                                        // eslint-disable-next-line no-undef
                                        onChange={(event) => {
                                            let copy = { ...data, mobile: event?.target?.value };
                                            setData(copy);
                                            // setMobile(event.target.value)
                                        }}
                                        // onChange={(event) => setMobile(event.target.value) }
                                        textcss={{
                                            width: "22.5em",
                                            height: "56px",
                                        }}
                                    />
                                </Stack>

                                <Stack spacing={10} alignItems="center" flexDirection="column">
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={""}
                                        defaultValue={""}
                                        helperText={"Email Address"}
                                        isValid
                                        onChange={(event) => {
                                            let copy = { ...data, email: event?.target?.value };
                                            setData(copy);
                                            // setEmail(event.target.value)
                                        }}
                                        textcss={{
                                            width: "22.5em",
                                            height: "56px",
                                        }}
                                    />
                                </Stack>
                                <Stack spacing={10} alignItems="center" flexDirection="column">
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={""}
                                        defaultValue={""}
                                        helperText={"Password"}
                                        isValid
                                        onInput={(event) => {
                                            // let copy = {...data , password : event?.target?.value}
                                            // setData(copy)
                                            setPassword(event.target.value);
                                        }}
                                        inputType={showPassword ? "password" : "text"}
                                        textcss={{
                                            width: "22.5em",
                                            height: "56px",
                                        }}
                                    />
                                </Stack>
                                <Stack spacing={10} alignItems="center" flexDirection="column">
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={""}
                                        defaultValue={""}
                                        helperText={"Confirm Password"}
                                        isValid
                                        onInput={(event) => {
                                            setConfirmPassword(event.target.value);

                                            if (password === confirmPassword) {
                                                console.log("password matched");
                                                setData({ ...data, password: confirmPassword });
                                            } else {
                                                console.log("password does not match");
                                            }
                                        }}
                                        // onChange={(event) => {
                                        //                         setConfirmPassword(event.target.value)
                                        //                         setData({...data , password : confirmPassword});

                                        //                         if(password === confirmPassword){
                                        //                             console.log("password matched");
                                        //                         }
                                        //                         else{
                                        //                             console.log("password does not match");
                                        //                         }
                                        //                     }
                                        //             }
                                        inputType={showPassword ? "password" : "text"}
                                        textcss={{
                                            width: "22.5em",
                                            height: "56px",
                                        }}
                                    />
                                </Stack>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <CustomButton
                            label={"Continue"}
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
                    <div className="login">
                        I have an account &nbsp;
                        <Link to="/patientlogin" className="link">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default patientsignup;
