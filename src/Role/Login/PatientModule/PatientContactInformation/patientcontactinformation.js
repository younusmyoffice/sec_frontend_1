// import React from 'react'
import React, { useState } from "react";
import "./patientcontactinformation.scss";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import CustomDropdown from "../../../../components/CustomDropdown/custom-dropdown";

const patientcontactinformation = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();

    // from here

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/patientpaymentinformation");
    };
    return (
        <div className="container">
            <div className="logo2">
                <img src="images/logo.png" alt="Logo" width="164" height="30" />
            </div>

            <h2 className="text-center">
                <strong>Contact Information</strong>
            </h2>

            <div className="component-library ">
                <div className="items ">
                    <div className="field-center6">
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"House No"}
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
                                label={"Street Line 1"}
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
                                label={"Street Line 2"}
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
                                label={"Country"}
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
                                label={"State"}
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
                                label={"City"}
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
                                label={"Zip Code"}
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
                <CustomButton
                    label={"Next"}
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
        </div>
    );
};

export default patientcontactinformation;
