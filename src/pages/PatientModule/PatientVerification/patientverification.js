/* eslint-disable import/order */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
// import React from 'react'
import React, {  useState } from "react";
import "./patientverification.scss";
import {  Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";
import axios from "axios";
import { useAuthentication } from "../../../loginComponent/UserProvider";
import Cookies from "js-cookie";

const patientverification = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();
    const Authentication = useAuthentication();
    console.log("Patient userName", Authentication);
    const [islogin, setIslogin] = useState(false);

    const emailData = Cookies.get("email");
    console.log(emailData);
    const [otp, setOtp] = useState();

    const [data, setData] = useState({
        email: null,
        activation_code: null,
    });

    // from here
    console.log(otp);
    console.log("Email : ", emailData);
    // const data = Authentication.patient;
    // console.log(Authentication.patient);

    const fetchData = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/sec/auth/verifyEmail",
                JSON.stringify(data),
                { Accept: "Application/json" },
            );
            console.log("RESPONSE : ", response);
            alert("Email Verified");
            navigate("/patientlogin", { replace: true });
        } catch (error) {
            console.log(error.response);
        }
    };

    // useEffect(() => {
    //     if(islogin === true) {
    //         fetchData();
    //     }
    // },[islogin]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIslogin(!islogin);

        let copy = {...data , email : Cookies.get('email') }
        setData(copy);

        // setData({
        //     email: emailData,
        //     activation_code: otp,
        // });

        fetchData();

        // navigate("/patientpersonalinformation");
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
                        <strong>Verify your Email</strong>
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                            <Typography
                                variant="h6"
                                color="#787579"
                                textAlign="centre"
                                marginLeft="28%"
                                width="50%"
                                padding="10px"
                                paddingTop="1%"
                                marginBottom={-9}
                            ></Typography>
                        </div>
                        <div style={{ marginTop: "10%", marginLeft: "37%" }}>
                            <CustomTextField
                                label={""}
                                onInput={(event) => {   
                                                        let copy = {...data , activation_code : event?.target?.value , email : Cookies.get('email') }
                                                        setData(copy)
                                                        // setOtp(event.target.value)
                                                    }}
                                // onChange={(event) => setOtp(event.target.value)}
                                helperText={"Enter OTP"}
                            ></CustomTextField>
                        </div>
                    </div>

                    <div className="form-group5" style={{ marginTop: "-1%" }}>
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
                    <div className="resend">Resend Code</div>
                </div>
            </div>
        </div>
    );
};

export default patientverification;
