import React, { useState } from "react";
import "./signuphcf.scss";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomButton from "../../components/CustomButton";

const SignUpHcf = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();

    // from here

    const handleSubmit = () => {

        if(radioVal === "Diagnostic Center"){
            localStorage.setItem("signUp" , "diagnostic_center")
            navigate('/patientsignup');
        }else if(radioVal === "Clinic" ){
            localStorage.setItem("signUp" , "clinic")
            navigate('/patientsignup');
        }else if(radioVal === "HCF Admin"){
            localStorage.setItem("signUp" , "hcf_admin")
            navigate('/patientsignup');
        }else{
            alert("Invalid option")
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

    const radioValues = ["Diagnostic Center", "Clinic" , "HCF Admin" ];
    const [radioVal, setRadioVal] = useState(radioValues[0]);

    // till here
    return (
        <div className="register-photo">
            <div className="form-container">
                <div className="image-holder"></div>

                <div>
                    <div className="logo">
                        <img src="images/logo.png" alt="Logo" width="200" />
                    </div>

                    <h2 className="text-center">
                        <strong>Please</strong> select
                    </h2>

                    <div className="component-library">
                        <div className="items">
                            <Stack spacing={10} alignItems="center" flexDirection="column">
                                <CustomRadioButton
                                    label={""}
                                    radiocss={{
                                        border: " 1px solid #E6E1E5",
                                        padding: "0px 10px",
                                        borderRadius: "16px",
                                        width: "22.5em",
                                        height: "6em",
                                        margin: "10px",
                                    }}
                                    handleChange={({ target }) => setRadioVal(target.value)}
                                    value={radioVal}
                                    items={radioValues}
                                />
                            </Stack>
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
                </div>
            </div>
        </div>
    );
};

export default SignUpHcf;
