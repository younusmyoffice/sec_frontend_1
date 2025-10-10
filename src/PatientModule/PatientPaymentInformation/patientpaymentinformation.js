// import React from 'react'
import React, { useState } from "react";
import "./patientpaymentinformation.scss";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";

const patientpaymentinformation = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();

    // from here

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/patientdashboard");
    };
    return (
        <div className="container">
            <div className="logo2">
                <img src="images/logo.png" alt="Logo" width="164" height="30" />
            </div>

            <h2 className="text-center">
                <strong>Payment Information</strong>
            </h2>

            <div className="component-library ">
                <div className="items ">
                    <div className="field-center6">
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Name On Card"}
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
                                label={"Card No."}
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
                                label={"Expire Date"}
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
                                label={"CVV"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                textcss={{
                                    width: "22.5em",
                                    height: "56px",
                                }}
                            />
                        </Stack>
                    </div>
                </div>
            </div>

            <div className="form-group6">
                <Stack spacing={10} alignItems="center" flexDirection="column">
                    <div className="form-group6">
                        <CustomButton
                            label={"Save"}
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
                                marginLeft: "-135%",
                                marginTop: "37px",
                            }}
                        />
                    </div>
                    <div className="form-group7">
                        <CustomButton
                            label={"Skip"}
                            isTransaprent
                            buttonCss={{
                                width: "25.8em",
                                height: "3.5em",
                                padding: "8px 16px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "100px",
                                marginLeft: "-85%",
                                marginTop: "-81px",
                            }}
                        />
                    </div>
                </Stack>
            </div>
        </div>
    );
};

export default patientpaymentinformation;
