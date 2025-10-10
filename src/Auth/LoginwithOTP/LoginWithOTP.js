import React, { useState } from "react";
import "./LoginWithOTP.scss";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomCountryCodeSelector from "../../components/CustomCountryCodeSelector";
import { baseURL } from "../../constants/const";
import CustomSnackBar from "../../components/CustomSnackBar";
import { useMobileValidation } from "../../hooks/useMobileValidation";

const LoginWithOtp = () => {
    const navigate = useNavigate();
    const typeOfUser = localStorage.getItem("signUp");
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        isOpen: false,
        message: "",
        type: "success",
    });
    
    // Use the centralized mobile validation hook
    const {
        mobile,
        countryCode,
        countryName,
        countryFlag,
        validationErrors,
        handleCountryCodeChange,
        handleMobileInput,
        validateMobile,
        getHelperText,
        isFormValid,
        getCleanMobileNumber
    } = useMobileValidation("+1", 500);

    const roleID =
        typeOfUser === "super_admin"
            ? 1
            : typeOfUser === "hcf_admin"
            ? 2
            : typeOfUser === "doctor"
            ? 3
            : typeOfUser === "diagnostic_center"
            ? 4
            : typeOfUser === "patient"
            ? 5
            : typeOfUser === "clinic"
            ? 6
            : null;

    // Debug logging
    console.log("=== MOBILE LOGIN ROLE DEBUG ===");
    console.log("typeOfUser from localStorage:", typeOfUser);
    console.log("Calculated roleID:", roleID);
    console.log("All localStorage keys:", Object.keys(localStorage));

    const roleRoutes = {
        1: { path: "/admindashboard" },
        2: { path: "/hcfadminsignup" },
        3: { path: "/doctorsignup" },
        4: { path: "/diagnostCenterDashboard" },
        5: { path: "/patientcompleteprofile" },
        6: { path: "/clinicdoctorcompleteprofile" },
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if role is determined correctly
        if (!roleID) {
            setSnackbar({
                isOpen: true,
                message: "Role not determined. Please go back and select your role first.",
                type: "error",
            });
            return;
        }

        // Validate mobile number with current country code
        const mobileValidation = validateMobile();

        // Check if validation passes
        if (!mobileValidation.isValid) {
            setSnackbar({
                isOpen: true,
                message: mobileValidation.message,
                type: "error",
            });
            return;
        }
console.log("mobile", mobile, "countryCode", countryCode, "countryName", countryName, "roleID", roleID);
        try {
            setLoading(true);
            const response = await axios.post(`${baseURL}/sec/auth/login`, {
                mobile,
                dialing_code: countryCode,
                country_name: countryName,
                login_with_email: false,
                role_id: roleID,
            });

            const resData = response?.data?.response;

            if (resData?.message === "ACTIVATION_CODE_SENT") {
                sessionStorage.setItem("login_mobile", mobile);
                sessionStorage.setItem("login_country_code", countryCode);
                sessionStorage.setItem("login_country_name", countryName);
                navigate("/loginwithotpverify");
            } else if (resData?.body === "INCOMPLETE_PROFILE") {
                localStorage.setItem("login_Email", resData.email);
                localStorage.setItem("login_mobile", resData.mobile);
                localStorage.setItem("login_country_code", resData.countryCode);
                localStorage.setItem("login_country_name", resData.countryName);
                const roleInfo = roleRoutes[roleID];
                if (roleInfo?.path) {

                    navigate(roleInfo.path);
                } else {
                    setSnackbar({
                        isOpen: true,
                        message: "Unknown role. Cannot continue.",
                        type: "error",
                    });
                }
            } else if (resData?.message === "INVALID_USER") {
                setSnackbar({
                    isOpen: true,
                    message: "This mobile number is not registered. Please sign up first.",
                    type: "error",
                });
            } else {
                setSnackbar({
                    isOpen: true,
                    message: "Login failed. Please try again.",
                    type: "error",
                });
            }
        } catch (error) {
            console.error(error);
            setSnackbar({
                isOpen: true,
                message: error?.response?.data?.error || "Something went wrong.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-photo">
            <Box className="form-container">
                <div className="image-holder" />
                <CustomSnackBar
                    isOpen={snackbar.isOpen}
                    message={snackbar.message}
                    type={snackbar.type}
                    // handleClose={() => setSnackbar({ ...snackbar, open: false })}
                />
                <Box className="component-library">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div className="logo1">
                            <img src="images/logo.png" alt="Logo" />
                        </div>
                        <h2 className="text-center">
                            <strong>Please enter Mobile Number</strong>
                        </h2>
                        {roleID && (
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: "#666", 
                                    marginBottom: "20px",
                                    textAlign: "center"
                                }}
                            >
                                Logging in as: {typeOfUser?.replace('_', ' ').toUpperCase()}
                            </Typography>
                        )}
                        {!roleID && (
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: "#e72b49", 
                                    marginBottom: "20px",
                                    textAlign: "center"
                                }}
                            >
                                ⚠️ Role not determined. Please go back and select your role first.
                            </Typography>
                        )}

                        <CustomCountryCodeSelector
                            id="mobile-input"
                            label="Mobile Number"
                            value={mobile || ""}
                            onChange={handleCountryCodeChange}
                            onInput={handleMobileInput}
                            helperText={getHelperText()}
                            error={!validationErrors.mobile.isValid && validationErrors.mobile.message !== ""}
                            placeholder="Mobile number"
                            textcss={{ width: "19em" }}
                            defaultCountryCode="+1"
                            defaultCountryName="United States"
                            defaultCountryFlag="🇺🇸"
                        />

                        <CustomButton
                            label={loading ? "Sending OTP..." : "Continue"}
                            isTransaprent={false}
                            isDisabled={
                                loading || 
                                !roleID ||
                                !validationErrors.mobile.isValid || 
                                !mobile || 
                                mobile.length < 7
                            }
                            isElevated={false}
                            handleClick={handleSubmit}
                            buttonCss={{
                                width: "22em",
                                padding: "8px 16px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "100px",
                                marginTop: "35px",
                                opacity: (!roleID || !validationErrors.mobile.isValid || !mobile || mobile.length < 7) ? 0.6 : 1,
                                transition: "opacity 0.3s ease",
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default LoginWithOtp;
