import React from "react";
import "./patientforgotpassword2.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/custom-button";

const patientforgotpassword2 = () => {
    const navigate = useNavigate();

    // from here

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/patientforgotpassword3");
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
                        <strong>Please enter OTP</strong>
                    </h2>

                    <div className="otpsent">
                        <p>The OTP has been sent to - 0123456789 </p>
                    </div>
                    <div className="form-group2">
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

export default patientforgotpassword2;
