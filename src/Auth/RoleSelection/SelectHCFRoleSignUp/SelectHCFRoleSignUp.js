import React, { useState } from "react";
import "./SelectHCFRoleSignUp.scss";
import { useNavigate } from "react-router-dom";
import { Stack ,Box } from "@mui/material";
import CustomRadioButton from "../../../components/CustomRadioButton";
import CustomButton from "../../../components/CustomButton";
import { left } from "@popperjs/core";

const SignUpHcf = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();

    // from here

    const handleSubmit = () => {
        if (radioVal === "Diagnostic Center") {
            localStorage.setItem("signUp", "diagnostic_center");
            navigate("/patientsignup");
        } else if (radioVal === "Clinic") {
            localStorage.setItem("signUp", "clinic");
            navigate("/patientsignup");
        } else if (radioVal === "HCF Admin") {
            localStorage.setItem("signUp", "hcf_admin");
            navigate("/patientsignup");
        } else {
            alert("Invalid option");
        }
        // const navigateToRoute =
        //     radioVal === "Diagnostic Center"
        //         ? "/diagnostcenterlogin"
        //         : radioVal === "Clinic"
        //         ? "/diagnostcliniclogin"
        //         : radioVal === "HCF Admin"
        //         ? "/hcfadmin"
        //         : null;

        // navigate(navigateToRoute);
    };

    const radioValues = ["Diagnostic Center", "Clinic", "HCF Admin"];
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
                        <strong>Please</strong> <strong>select</strong>
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
                                margin: "25px"
                            }}
                        /> 
                 </Box>
             </Box>
        </div>   
    );
};

export default SignUpHcf;
