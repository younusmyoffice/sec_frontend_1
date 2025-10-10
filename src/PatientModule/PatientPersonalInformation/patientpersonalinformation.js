// import React from 'react'
import React, { useState } from "react";
import "./patientpersonalinformation.scss";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";

const patientpersonalinformation = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();

    // from here

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/patientcontactinformation");
    };
    const [activeDropdown, setActiveDropdown] = useState("");
    return (
        <div className="container">
            <div className="logo2">
                <img src="images/logo.png" alt="Logo" width="164" height="30" />
            </div>

            <h2 className="text-center">
                <strong>Personal Information</strong>
            </h2>

            <div className="component-library ">
                <div className="items ">
                    <div className="field-center6">
                        <Stack spacing={0} marginLeft="38%" flexDirection="row">
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"First Name"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                textcss={{
                                    width: "168px",
                                    height: "56px",
                                }}
                            />

                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Middle Name"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                textcss={{
                                    width: "11.9em",
                                    height: "56px",
                                }}
                            />
                        </Stack>

                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Last Name"}
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
                                label={"Date of Birth"}
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
                            <CustomDropdown
                                label={"Gender"}
                                items={["Male", "Female", "Rather Not Say"]}
                                activeItem={activeDropdown}
                                handleChange={(listItems) => setActiveDropdown(listItems)}
                                dropdowncss={{ marginLeft: "-14%" }}
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

export default patientpersonalinformation;
