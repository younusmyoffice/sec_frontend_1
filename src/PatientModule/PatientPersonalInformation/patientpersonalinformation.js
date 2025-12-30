import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./patientpersonalinformation.scss";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import logger from "../../utils/logger"; // Centralized logging
import toastService from "../../services/toastService"; // Toast notifications

/**
 * PatientPersonalInformation Component
 * 
 * Form for collecting patient personal information during signup/profile completion
 * Features:
 * - Collects first name, middle name, last name, date of birth, gender
 * - Form validation
 * - Data persistence (localStorage)
 * - Navigation to next step (Contact Information)
 * 
 * @component
 */
const PatientPersonalInformation = () => {
    logger.debug("🔵 PatientPersonalInformation component rendering");
    
    const navigate = useNavigate();

    /**
     * Form data state
     * Stores all personal information fields
     */
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
    });

    /**
     * Form validation errors state
     */
    const [validationErrors, setValidationErrors] = useState({
        firstName: { isValid: true, message: "" },
        lastName: { isValid: true, message: "" },
        dateOfBirth: { isValid: true, message: "" },
        gender: { isValid: true, message: "" },
    });

    /**
     * Handle text field input changes
     * Updates form data and clears validation errors for that field
     * 
     * @param {string} fieldName - Name of the field being updated
     * @param {string} value - New value for the field
     */
    const handleInputChange = useCallback((fieldName, value) => {
        logger.debug(`📝 Field changed: ${fieldName}`, { value });
        
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));

        // Clear validation error for this field when user starts typing
        if (validationErrors[fieldName] && !validationErrors[fieldName].isValid) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: { isValid: true, message: "" },
            }));
        }
    }, [validationErrors]);

    /**
     * Validate form data
     * Checks required fields and date format
     * 
     * @returns {boolean} True if form is valid, false otherwise
     */
    const validateForm = useCallback(() => {
        logger.debug("🔍 Validating form data", formData);
        
        const errors = {
            firstName: { isValid: true, message: "" },
            lastName: { isValid: true, message: "" },
            dateOfBirth: { isValid: true, message: "" },
            gender: { isValid: true, message: "" },
        };

        let isFormValid = true;

        // Validate first name (required)
        if (!formData.firstName || formData.firstName.trim() === "") {
            errors.firstName = {
                isValid: false,
                message: "First name is required",
            };
            isFormValid = false;
        } else if (formData.firstName.trim().length < 2) {
            errors.firstName = {
                isValid: false,
                message: "First name must be at least 2 characters",
            };
            isFormValid = false;
        }

        // Validate last name (required)
        if (!formData.lastName || formData.lastName.trim() === "") {
            errors.lastName = {
                isValid: false,
                message: "Last name is required",
            };
            isFormValid = false;
        } else if (formData.lastName.trim().length < 2) {
            errors.lastName = {
                isValid: false,
                message: "Last name must be at least 2 characters",
            };
            isFormValid = false;
        }

        // Validate date of birth (required)
        if (!formData.dateOfBirth || formData.dateOfBirth.trim() === "") {
            errors.dateOfBirth = {
                isValid: false,
                message: "Date of birth is required",
            };
            isFormValid = false;
        } else {
            // Validate date format (basic check)
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
            if (!dateRegex.test(formData.dateOfBirth)) {
                errors.dateOfBirth = {
                    isValid: false,
                    message: "Please enter a valid date (YYYY-MM-DD)",
                };
                isFormValid = false;
            } else {
                // Check if date is not in the future
                const dob = new Date(formData.dateOfBirth);
                const today = new Date();
                if (dob > today) {
                    errors.dateOfBirth = {
                        isValid: false,
                        message: "Date of birth cannot be in the future",
                    };
                    isFormValid = false;
                }
            }
        }

        // Validate gender (required)
        if (!formData.gender || formData.gender.trim() === "") {
            errors.gender = {
                isValid: false,
                message: "Gender is required",
            };
            isFormValid = false;
        }

        setValidationErrors(errors);
        
        if (!isFormValid) {
            logger.warn("⚠️ Form validation failed", errors);
            toastService.error("Please fill in all required fields correctly");
        }

        return isFormValid;
    }, [formData]);

    /**
     * Handle form submission
     * Validates form, saves data to localStorage, and navigates to next step
     * 
     * @param {Event} e - Form submission event
     */
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        logger.debug("📤 Form submitted", formData);

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        try {
            // Save form data to localStorage for persistence
            const personalInfoData = {
                first_name: formData.firstName.trim(),
                middle_name: formData.middleName.trim(),
                last_name: formData.lastName.trim(),
                DOB: formData.dateOfBirth,
                gender: formData.gender,
                timestamp: new Date().toISOString(),
            };

            localStorage.setItem("patientPersonalInformation", JSON.stringify(personalInfoData));
            logger.debug("✅ Personal information saved to localStorage", personalInfoData);

            // Show success message
            toastService.success("Personal information saved successfully");

            // Navigate to contact information page
            navigate("/patientcontactinformation");
        } catch (error) {
            logger.error("❌ Error saving personal information:", error);
            toastService.error("Failed to save information. Please try again.");
        }
    }, [formData, validateForm, navigate]);

    /**
     * Load saved data from localStorage on component mount
     */
    React.useEffect(() => {
        logger.debug("🔵 PatientPersonalInformation component mounting");
        
        try {
            const savedData = localStorage.getItem("patientPersonalInformation");
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                logger.debug("📂 Loading saved personal information", parsedData);
                
                setFormData({
                    firstName: parsedData.first_name || "",
                    middleName: parsedData.middle_name || "",
                    lastName: parsedData.last_name || "",
                    dateOfBirth: parsedData.DOB || "",
                    gender: parsedData.gender || "",
                });
            }
        } catch (error) {
            logger.error("❌ Error loading saved data:", error);
        }
    }, []);
    return (
        <div className="container">
            {/* Logo */}
            <div className="logo2">
                <img 
                    src="images/logo.png" 
                    alt="Sharecare Logo" 
                    width="164" 
                    height="30" 
                />
            </div>

            {/* Page Title */}
            <h2 className="text-center">
                <strong>Personal Information</strong>
            </h2>

            {/* Form Container */}
            <div className="component-library">
                <div className="items">
                    <form onSubmit={handleSubmit} className="field-center6">
                        {/* First Name and Middle Name Row */}
                        <Stack spacing={0} marginLeft="38%" flexDirection="row">
                            <CustomTextField
                                id="firstName"
                                label="First Name"
                                defaultValue={formData.firstName}
                                value={formData.firstName}
                                helperText={validationErrors.firstName.message}
                                isValid={validationErrors.firstName.isValid}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                required
                                textcss={{
                                    width: "168px",
                                    height: "56px",
                                }}
                            />

                            <CustomTextField
                                id="middleName"
                                label="Middle Name"
                                defaultValue={formData.middleName}
                                value={formData.middleName}
                                helperText={""}
                                isValid={true}
                                onChange={(e) => handleInputChange("middleName", e.target.value)}
                                textcss={{
                                    width: "11.9em",
                                    height: "56px",
                                }}
                            />
                        </Stack>

                        {/* Last Name */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomTextField
                                id="lastName"
                                label="Last Name"
                                defaultValue={formData.lastName}
                                value={formData.lastName}
                                helperText={validationErrors.lastName.message}
                                isValid={validationErrors.lastName.isValid}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                required
                                textcss={{
                                    width: "22.5em",
                                    height: "56px",
                                }}
                            />
                        </Stack>

                        {/* Date of Birth */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomTextField
                                id="dateOfBirth"
                                label="Date of Birth"
                                type="date"
                                defaultValue={formData.dateOfBirth}
                                value={formData.dateOfBirth}
                                helperText={validationErrors.dateOfBirth.message || "Format: YYYY-MM-DD"}
                                isValid={validationErrors.dateOfBirth.isValid}
                                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                                required
                                textcss={{
                                    width: "22.5em",
                                    height: "56px",
                                }}
                            />
                        </Stack>

                        {/* Gender Dropdown */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomDropdown
                                label="Gender"
                                items={["Male", "Female", "Rather Not Say"]}
                                activeItem={formData.gender}
                                handleChange={(selectedItem) => {
                                    handleInputChange("gender", selectedItem);
                                    logger.debug("👤 Gender selected", { gender: selectedItem });
                                }}
                                dropdowncss={{ marginLeft: "-14%" }}
                            />
                            {!validationErrors.gender.isValid && (
                                <span style={{ 
                                    color: "#E72B4A", 
                                    fontSize: "0.75rem", 
                                    marginTop: "-8px",
                                    marginLeft: "-14%" 
                                }}>
                                    {validationErrors.gender.message}
                                </span>
                            )}
                        </Stack>

                        {/* Submit Button */}
                        <div className="form-group6">
                            <CustomButton
                                label="Next"
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
                                    backgroundColor: "#E72B4A", // Primary brand color
                                    color: "#ffffff",
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// PropTypes for component documentation
PatientPersonalInformation.propTypes = {
    // This component doesn't accept props currently, but structure is ready
};

export default PatientPersonalInformation;
