/**
 * SelectHCFRoleSignUp Component
 * 
 * HCF (Healthcare Facility) role selection page for signup.
 * Features:
 * - Three HCF types: Diagnostic Center, Clinic, HCF Admin
 * - Radio button selection for HCF type
 * - localStorage persistence for selected role
 * - Role-based navigation to signup pages
 * - Responsive design with image background
 * 
 * User Flow:
 * 1. User selects HCF type
 * 2. Role stored in localStorage
 * 3. Navigate to signup page
 */

import React, { useState } from "react";
import "./SelectHCFRoleSignUp.scss";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import CustomRadioButton from "../../../components/CustomRadioButton";
import CustomButton from "../../../components/CustomButton";
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";

const SignUpHcf = () => {
    // ============================================
    // State & Navigation
    // ============================================
    
    // Hook for programmatic navigation
    const navigate = useNavigate();
    
    // Available HCF type options for selection
    const radioValues = ["Diagnostic Center", "Clinic", "HCF Admin"];
    
    // State: Currently selected HCF type (default to first option - Diagnostic Center)
    const [radioVal, setRadioVal] = useState(radioValues[0]);

    // ============================================
    // Event Handlers
    // ============================================
    
    /**
     * Handle form submission after HCF type selection
     * - Stores selected role in localStorage
     * - Navigates to signup page
     * - Logs the navigation action
     * - Shows error toast if invalid selection
     * 
     * Note: All HCF types navigate to /patientsignup (may need update)
     */
    const handleSubmit = () => {
        logger.info("HCF type selected:", radioVal);
        
        // Route to appropriate signup page based on selected HCF type
        if (radioVal === "Diagnostic Center") {
            localStorage.setItem("signUp", "diagnostic_center");
            logger.debug("Navigating to diagnostic center signup");
            navigate("/diagnosticCompleteProfile");
        } else if (radioVal === "Clinic") {
            localStorage.setItem("signUp", "clinic");
            logger.debug("Navigating to clinic signup");
            navigate("/diagnostClinicSignup");
        } else if (radioVal === "HCF Admin") {
            localStorage.setItem("signUp", "hcf_admin");
            logger.debug("Navigating to HCF admin signup");
            navigate("/hcfAdminCompleteProfile");
        } else {
            logger.error("Invalid HCF type selection:", radioVal);
            toastService.error("Please select a valid option");
        }
    };
    
    // ============================================
    // Render
    // ============================================
    
    return (
        <div className="register-photo">
            {/* Main container with form */}
            <Box className="form-container">
                {/* Left side: Decorative image background */}
                <div className="image-holder"></div>

                {/* Right side: Form content */}
                <Box className="component-library">
                    {/* Logo and title container */}
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div className="logo">
                            <img src="images/logo.png" alt="Logo" />
                        </div>

                        <h2 className="">
                            <strong>Please</strong> <strong>select</strong>
                        </h2>
                    </Box>
                    
                    {/* HCF type selection radio buttons */}
                    <CustomRadioButton
                        label={""}
                        radiocss={{
                            border: "1px solid #E6E1E5",
                            borderRadius: "16px",
                            width: "300px",
                            height: "6em",
                            margin: "10px",
                        }}
                        handleChange={({ target }) => {
                            logger.debug("HCF type changed to:", target.value);
                            setRadioVal(target.value);
                        }}
                        value={radioVal}
                        items={radioValues}
                    />
                    
                    {/* Continue button */}
                    <CustomButton
                        label={"Continue"}
                        isTransaprent={false}
                        isDisabled={false}
                        isElevated={false}
                        handleClick={handleSubmit}
                        buttonCss={{
                            width: "22em",
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
