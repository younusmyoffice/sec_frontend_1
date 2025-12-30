import React, { useState } from "react";
import "./LoginWithOTPVerify.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomOTPInput from "../../components/OTPInput";
import { Box } from "@mui/material";
import CustomSnackBar from "../../components/CustomSnackBar";
import { baseURL } from "../../constants/const";
import axios from "axios";

const LoginWithOtpVerify = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [snackbar, setSnackbar] = useState({ isOpen: false, message: "", type: "error" });
    const [loading, setLoading] = useState(false);

    const mobile = sessionStorage.getItem("login_mobile");

    const showSnackbar = (message, type = "error") => {
        setSnackbar({ isOpen: true, message, type });
    };

    const handleLoginRedirect = (role_id, data) => {
        const { access_token, suid, email, profile_picture } = data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("profile", profile_picture);

        const roleRoutes = {
            1: { path: "/admindashboard", emailKey: "admin_Email", uidKey: "admin_uid" },
            2: { path: "/hcfadmin/notification", emailKey: "hcfadmin_Email", uidKey: "hcfadmin_suid" },
            3: { path: "/doctordashboard", emailKey: "doctorEmail", uidKey: "doctor_suid" },
            4: { path: "/diagnostCenterDashboard/notification", emailKey: "diagnostic_Email", uidKey: "diagnostic_suid" },
            5: { path: "/patientdashboard", emailKey: "patientEmail", uidKey: "patient_suid" },
            6: { path: "/clinicDashboard/clinicbodydashboard/clinirequests", emailKey: "clinicEmail", cookieEmailkey: "clinicEmail", uidKey: "clinic_suid" },
        };

        const roleInfo = roleRoutes[role_id];
        if (!roleInfo) {
            showSnackbar("Unknown role. Please contact support.");
            return;
        }

        localStorage.setItem(roleInfo.emailKey, email);
        localStorage.setItem(roleInfo.uidKey, suid);
        Cookies.set(roleInfo.emailKey, email);
        Cookies.set(roleInfo.uidKey, suid);

        navigate(roleInfo.path, { replace: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otp.length !== 6 || !/^[A-Za-z0-9]{6}$/.test(otp)) {
            showSnackbar("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${baseURL}/sec/auth/verifyOtp`, {
                mobile,
                otp_code: otp,
            });

            if (response.status === 200) {
                const resData = response.data?.response;
                const message = resData?.message;
                const role_id = resData?.role_id;
console.log("resData verify otp", resData);
                if (message === "ACTIVATION_CODE_EXPIRED") {
                    showSnackbar("Your OTP has expired. Please request a new one.");
                } else if (message === "INVALID_OTP") {
                    showSnackbar("Invalid OTP. Please try again.");
                } else if (message === "INCOMPLETE_PROFILE") {
                    // Store email and suid based on role
                    localStorage.setItem("login_Email", resData.email);
                    localStorage.setItem("email", resData.email);
                    localStorage.setItem("mobile", resData.mobile);
                    
                    // Store dialing code from sessionStorage (set during mobile login)
                    const dialingCode = sessionStorage.getItem("login_country_code");
                    if (dialingCode) {
                        localStorage.setItem("login_country_code", dialingCode);
                    }
                    
                    console.log("resData.mobile", resData.mobile, resData.email, resData.suid);
                    console.log("Stored dialing code:", dialingCode);
                    
                    if(resData.mobile){
                        if (role_id === 3) { // Doctor
                            localStorage.setItem("doctor_suid", resData.suid);
                            navigate("/doctorsignup");
                        } else if (role_id === 2) { // HCF Admin
                            localStorage.setItem("hcfadmin_suid", resData.suid);
                            navigate("/hcfAdminCompleteProfile");
                        } else if (role_id === 4) { // Diagnostic Center
                            localStorage.setItem("diagnostic_suid", resData.suid);
                            navigate("/diagnosticCompleteProfile");
                        } else if (role_id === 5) { // Patient
                            localStorage.setItem("patient_suid", resData.suid);
                            navigate("/completeprofile");
                        } else if (role_id === 6) { // Clinic
                            localStorage.setItem("clinic_suid", resData.suid);
                            navigate("/diagnostClinicSignup");
                        } else {
                            navigate("/completeprofile");
                        }
                    }
if(resData.email)
{
    if (role_id === 3) { // Doctor
        localStorage.setItem("doctor_suid", resData.suid);
        navigate("/doctorsignup");
    } else if (role_id === 2) { // HCF Admin
        localStorage.setItem("hcfadmin_suid", resData.suid);
        navigate("/hcfAdminCompleteProfile");
    } else if (role_id === 4) { // Diagnostic Center
        localStorage.setItem("diagnostic_suid", resData.suid);
        navigate("/diagnosticCompleteProfile");
    } else if (role_id === 5) { // Patient
        localStorage.setItem("patient_suid", resData.suid);
        navigate("/completeprofile");
    } else if (role_id === 6) { // Clinic
        localStorage.setItem("clinic_suid", resData.suid);
        navigate("/diagnostClinicSignup");
    } else {
        navigate("/completeprofile");
    }
}                    // Store role-specific data
                 
                } else if (resData.access_token) {
                    handleLoginRedirect(role_id, resData);
                } else {
                    showSnackbar(resData?.message || "Something went wrong.");
                }
            }
        } catch (error) {
            console.error("OTP verification error:", error);
            const errorMsg = error?.response?.data?.error || "Something went wrong.";
            showSnackbar(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    const handleResendCode = async () => {
        try {
            await axios.post(`${baseURL}/sec/auth/resendCode`, { mobile: mobile });
            showSnackbar("OTP has been Resent to your mobile number.", "success");

        } catch (error) {
            console.error("Resend OTP failed:", error?.response?.data || error);
            showSnackbar("Resend OTP failed!", "error");

        }
    };
    return (
        <div className="register-photo">
            <Box className="form-container">
                <div className="image-holder"></div>

                <Box id="container-2" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box id="container-2-inner">
                        <div className="logo1">
                            <img src="images/logo.png" alt="Logo" />
                            <h2 className="text-center"><strong>Please enter OTP</strong></h2>
                        </div>

                        <Box id="otp-box-container" display="flex" flexDirection="column" alignItems="center">
                            <CustomOTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                placeholder="*"
                            />

                            <p>The OTP has been sent to - {mobile || "Unknown"}</p>

                            <CustomButton
                                label={loading ? "Please wait..." : "Continue"}
                                isTransaprent={false}
                                isDisabled={loading}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "18em",
                                    padding: "8px 16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "100px",
                                    marginTop: "20px",
                                }}
                            />

                            <div
                                className="resend-otp"
                                onClick={handleResendCode}
                                style={{
                                    marginTop: "1rem",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                }}
                            >
                                Resend Code
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <CustomSnackBar
                isOpen={snackbar.isOpen}
                message={snackbar.message}
                type={snackbar.type}
                handleClose={() => setSnackbar((prev) => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
};

export default LoginWithOtpVerify;
