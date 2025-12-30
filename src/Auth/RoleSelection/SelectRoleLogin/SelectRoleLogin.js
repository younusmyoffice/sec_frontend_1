/**
 * SelectRoleLogin Component
 * 
 * Landing page for role selection before login.
 * Features:
 * - Multiple role options (Patient, Doctor, Healthcare Facility, Super Admin)
 * - Radio button selection for roles
 * - localStorage persistence for selected role
 * - Role-based navigation to appropriate login pages
 * - Responsive design with image background
 * 
 * User Flow:
 * 1. User selects their role
 * 2. Role stored in localStorage
 * 3. Navigate to role-specific login page
 */

import React, { useState } from "react";
import "./SelectRoleLogin.scss";
import { useNavigate } from "react-router-dom";
// Removed Material-UI Box import - using plain div for consistency

// Note: Removed unused 'Stack' import
import CustomRadioButton from "../../../components/CustomRadioButton/custom-radio-button";
import CustomButton from "../../../components/CustomButton/custom-button";
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";

const SelectRoleLogin = () => {
    // ============================================
    // State & Navigation
    // ============================================
    
    // Hook for programmatic navigation
    const navigate = useNavigate();
    
    // Available role options for selection
    const radioValues = [
        "I am a Patient",
        "I am a Doctor",
        "I am a Healthcare Facility",
        // "I Am The Super Admin", // Commented out - not shown in UI
    ];
    
    // State: Currently selected role (default to first option - Patient)
    const [radioVal, setRadioVal] = useState(radioValues[0]);

    // ============================================
    // Event Handlers
    // ============================================
    
    /**
     * Handle form submission after role selection
     * - Stores selected role in localStorage
     * - Navigates to role-specific login page
     * - Logs the navigation action
     * - Shows error toast if invalid selection
     */
    const handleSubmit = () => {
        logger.info("Role selected:", radioVal);
        
        // Route to appropriate login page based on selected role
        if (radioVal === "I am a Patient") {
            localStorage.setItem("signUp", "patient");
            logger.debug("Navigating to patient login");
            navigate("/patientLogin");
        } else if (radioVal === "I am a Doctor") {
            localStorage.setItem("signUp", "doctor");
            logger.debug("Navigating to doctor login");
            navigate("/doctorLogin");
        } else if (radioVal === "I am a Healthcare Facility") {
            localStorage.setItem("signUp", "hcf");
            logger.debug("Navigating to HCF type selection");
            navigate("/SelectHCFTypeLoginRole");
        } else if (radioVal === "I Am The Super Admin") {
            localStorage.setItem("signUp", "super_admin");
            logger.debug("Navigating to super admin login");
            navigate("/superadminlogin");
        } else {
            logger.error("Invalid role selection:", radioVal);
            toastService.error("Please select a valid option");
        }
    };
    
    // ============================================
    // Render
    // ============================================
    
    return (
        <div className="register-photo">
            {/* Main container with form */}
            <div className="form-container">
                {/* Left side: Decorative image background */}
                <div className="image-holder"></div>

                {/* Right side: Form content */}
                <div>
                    {/* Logo and title container */}
                    <div className="logo">
                        <img src="images/logo.png" alt="Logo" />
                    </div>

                    <h2 className="text-center">
                        <strong>Please</strong> <strong>select to login</strong>
                    </h2>

                    {/* Role selection area - container for radio buttons and button */}
                    <div className="component-library" style={{ alignItems: "flex-start" }}>
                        {/* Role selection radio buttons */}
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
                                logger.debug("Role changed to:", target.value);
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

export default SelectRoleLogin;
