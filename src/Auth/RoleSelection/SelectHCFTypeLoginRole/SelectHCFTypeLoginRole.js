import React, { useState } from "react";
import "./SelectHCFTypeLoginRole.scss";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import CustomRadioButton from "../../../components/CustomRadioButton/custom-radio-button";
import CustomButton from "../../../components/CustomButton/custom-button";

const SelectHCFTypeLoginRole = () => {
    // useNavigate hook for navigate
    const navigate = useNavigate();

    // from here

    const handleSubmit = () => {
        if (radioVal === "Diagnostic Center") {
            localStorage.setItem("signUp", "diagnostic_center");
            navigate("/diagnostcenterlogin");
        } else if (radioVal === "Clinic") {
            localStorage.setItem("signUp", "clinic");
            navigate("/diagnostcliniclogin");
        } else if (radioVal === "HCF Admin") {
            localStorage.setItem("signUp", "hcf_admin");
            navigate("/hcfadminlogin");
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
            <div className="form-container">
                <div className="image-holder"></div>

                <div>
                    <div className="logo">
                        <img src="images/logo.png" alt="Logo"/>
                    </div>

                    <h2 className="text-center m-5">
                        <strong>Please</strong> <strong>select</strong>
                    </h2>

                    <div className="component-library">
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
                                width: "22em",
                                padding: "8px 16px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "100px",
                                marginTop: "37px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectHCFTypeLoginRole;
