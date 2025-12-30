/**
 * SelectHCFTypeLoginRole Component
 * 
 * HCF (Healthcare Facility) type selection page for login.
 * Features:
 * - Three HCF types: Diagnostic Center, Clinic, HCF Admin
 * - Radio button selection for HCF type
 * - localStorage persistence for selected role
 * - Role-based navigation to login pages
 * - Responsive design with image background
 * 
 * User Flow:
 * 1. User selects HCF type
 * 2. Role stored in localStorage
 * 3. Navigate to HCF type-specific login page
 */

import React, { useState } from "react";
import "./SelectHCFTypeLoginRole.scss";
import { useNavigate } from "react-router-dom";

// Note: Removed unused 'Stack' import from Material-UI
import CustomRadioButton from "../../../components/CustomRadioButton/custom-radio-button";
import CustomButton from "../../../components/CustomButton/custom-button";
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";

const SelectHCFTypeLoginRole = () => {
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
     * - Navigates to HCF type-specific login page
     * - Logs the navigation action
     * - Shows error toast if invalid selection
     */
    const handleSubmit = () => {
        logger.info("HCF type selected for login:", radioVal);
        
        // Route to appropriate login page based on selected HCF type
        if (radioVal === "Diagnostic Center") {
            localStorage.setItem("signUp", "diagnostic_center");
            logger.debug("Navigating to diagnostic center login");
            navigate("/diagnostCenterLogin");
        } else if (radioVal === "Clinic") {
            localStorage.setItem("signUp", "clinic");
            logger.debug("Navigating to clinic login");
            navigate("/clinicLogin");
        } else if (radioVal === "HCF Admin") {
            localStorage.setItem("signUp", "hcf_admin");
            logger.debug("Navigating to HCF admin login");
            navigate("/hcfAdminLogin");
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
            <div className="form-container">
                {/* Left side: Decorative image background */}
                <div className="image-holder"></div>

                {/* Right side: Form content */}
                <div >
                    {/* Logo and title container */}
                    <div className="logo">
                        <img src="images/logo.png" alt="Logo" />
                    </div>

                    <h2 className="text-center m-5">
                        <strong>Please</strong> <strong>select</strong>
                    </h2>

                    {/* HCF type selection area */}
                    <div className="component-library" style={{ alignItems: "flex-start" }}>
                        {/* Radio buttons for HCF type selection */}
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
