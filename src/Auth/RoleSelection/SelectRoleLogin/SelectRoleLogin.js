import React, { useState } from "react";
import "./SelectRoleLogin.scss";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import CustomRadioButton from "../../../components/CustomRadioButton/custom-radio-button";
import CustomButton from "../../../components/CustomButton/custom-button";

const SelectRoleLogin = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();

    // from here

    const handleSubmit = () => {
        if (radioVal === "I am a Patient") {
            localStorage.setItem("signUp", "patient");
            navigate("/patientLogin");
        } else if (radioVal === "I am a Doctor") {
            localStorage.setItem("signUp", "doctor");
            navigate("/doctorLogin");
        } else if (radioVal === "I am a Healthcare Facility") {
            // navigate("/selecthcfprofiletype");
            navigate("/SelectHCFTypeLoginRole");
        } else if (radioVal === "I Am The Super Admin") {
            localStorage.setItem("signUp", "super_admin");
            navigate("/superadminlogin");
        } else {
            alert("Invalid option");
        }

        // const navigateToRoute =
        //     radioVal === "I am a Patient"
        //         ? "/patientlogin"
        //         : radioVal === "I am a Doctor"
        //         ? "/doctorlogin"
        //         : radioVal === "I am a Healthcare Facility"
        //         ? "/selecthcfprofiletype"
        //         : radioVal === "I Am The Super Admin"
        //         ? "/superadmin"
        //         : null;

        // navigate(navigateToRoute);
    };
    const radioValues = [
        "I am a Patient",
        "I am a Doctor",
        "I am a Healthcare Facility",
        // "I Am The Super Admin",
    ];
    const [radioVal, setRadioVal] = useState(radioValues[0]);

    // till here
    return (
        <div className="register-photo">
            <Box className="form-container">
                <div className="image-holder"></div>

                <Box className="component-library">
                <Box sx={{display:"flex" , flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                    <div className="logo">
                        <img src="images/logo.png" alt="Logo"/>
                    </div>

                    <h2 className="">
                        <strong>Please</strong> <strong>select to login</strong>
                    </h2>
                    </Box>

                    <CustomRadioButton
                                    label={""}
                                    radiocss={{
                                        border: " 1px solid #E6E1E5",
                                        // padding: "0px 10px",
                                        borderRadius: "16px",
                                        width: "300px",
                                        height: "6em",
                                        margin: "10px",
                                    }}
                                    handleChange={({ target }) => setRadioVal(target.value)}
                                    value={radioVal}
                                    items={radioValues}
                                    />
                                    <CustomButton
                            label={"Continue"}
                            isTransaprent={false}
                            isDisabled={false}
                            isElevated={false}
                            handleClick={handleSubmit}
                            buttonCss={{
                                width:"22em",
                                padding: "8px 100px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "100px",
                                margin:"25px"
                            }}
                        />
                </Box>
            </Box>
        </div>
    );
};

export default SelectRoleLogin;
