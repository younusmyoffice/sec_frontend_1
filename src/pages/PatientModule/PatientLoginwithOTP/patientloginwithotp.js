// import React from 'react'
import React from "react";
import "./patientloginwithotp.scss";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton/custom-button";

const patientloginwithotp = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();

    // from here

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/patientloginwithotp2");
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
                        <strong>Please enter mobile no</strong>
                    </h2>

                    <div className="component-library ">
                        <div className="items ">
                            <div className="field-center1">
                                <Stack spacing={10} alignItems="center" flexDirection="column">
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Mobile No"}
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

                    <div className="form-group1">
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
                </div>
            </div>
        </div>
    );
};

export default patientloginwithotp;
