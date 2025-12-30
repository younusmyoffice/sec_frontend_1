import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import "./patientcontactinformation.scss";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import axiosInstance from "../../config/axiosInstance"; // Handles access token automatically
import logger from "../../utils/logger"; // Centralized logging
import toastService from "../../services/toastService"; // Toast notifications

/**
 * PatientContactInformation Component
 * 
 * Form for collecting patient contact information during signup/profile completion
 * Features:
 * - Collects address information (house no, street lines, country, state, city, zip code)
 * - Country/State/City cascading dropdowns (state depends on country, city depends on state)
 * - Form validation
 * - Data persistence (localStorage)
 * - Navigation to next step (Payment Information)
 * 
 * @component
 */
const PatientContactInformation = () => {
    logger.debug("🔵 PatientContactInformation component rendering");
    
    const navigate = useNavigate();

    /**
     * Form data state
     * Stores all contact information fields
     */
    const [formData, setFormData] = useState({
        houseNo: "",
        streetLine1: "",
        streetLine2: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
    });

    /**
     * Country, state, and city options for dropdowns
     */
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    /**
     * Selected country, state, and city IDs (for API calls)
     */
    const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [selectedStateId, setSelectedStateId] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);

    /**
     * Loading states for API calls
     */
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    /**
     * Form validation errors state
     */
    const [validationErrors, setValidationErrors] = useState({
        houseNo: { isValid: true, message: "" },
        streetLine1: { isValid: true, message: "" },
        country: { isValid: true, message: "" },
        state: { isValid: true, message: "" },
        city: { isValid: true, message: "" },
        zipCode: { isValid: true, message: "" },
    });

    /**
     * Fetch countries from API
     * Loads all available countries for dropdown
     */
    const fetchCountries = useCallback(async () => {
        logger.debug("📡 Fetching countries");
        setLoadingCountries(true);
        
        try {
            const response = await axiosInstance.get("/sec/countries");
            const countryData = response?.data?.response || [];
            
            // Transform to array format for dropdown
            const countryList = Object.values(countryData).map((country) => ({
                id: country.country_id,
                name: country.country_name,
            }));
            
            logger.debug("✅ Countries fetched successfully", { count: countryList.length });
            setCountries(countryList);
        } catch (error) {
            logger.error("❌ Failed to fetch countries:", error);
            toastService.error("Failed to load countries. Please try again.");
            setCountries([]);
        } finally {
            setLoadingCountries(false);
        }
    }, []);

    /**
     * Fetch states for selected country
     * Loads states based on country selection
     * 
     * @param {number} countryId - Selected country ID
     */
    const fetchStates = useCallback(async (countryId) => {
        if (!countryId) {
            setStates([]);
            setCities([]);
            return;
        }
        
        logger.debug("📡 Fetching states", { countryId });
        setLoadingStates(true);
        
        try {
            const response = await axiosInstance.get(`/sec/states?country_id=${countryId}`);
            const stateData = response?.data?.response || [];
            
            // Transform to array format for dropdown
            const stateList = Object.values(stateData).map((state) => ({
                id: state.state_id,
                name: state.state_name,
            }));
            
            logger.debug("✅ States fetched successfully", { count: stateList.length });
            setStates(stateList);
            
            // Reset city when state list changes
            setCities([]);
            setSelectedStateId(null);
            setSelectedCityId(null);
            setFormData((prev) => ({
                ...prev,
                state: "",
                city: "",
            }));
        } catch (error) {
            logger.error("❌ Failed to fetch states:", error);
            toastService.error("Failed to load states. Please try again.");
            setStates([]);
        } finally {
            setLoadingStates(false);
        }
    }, []);

    /**
     * Fetch cities for selected state
     * Loads cities based on state selection
     * 
     * @param {number} stateId - Selected state ID
     */
    const fetchCities = useCallback(async (stateId) => {
        if (!stateId) {
            setCities([]);
            return;
        }
        
        logger.debug("📡 Fetching cities", { stateId });
        setLoadingCities(true);
        
        try {
            const response = await axiosInstance.get(`/sec/cities?state_id=${stateId}`);
            const cityData = response?.data?.response || [];
            
            // Transform to array format for dropdown
            const cityList = Object.values(cityData).map((city) => ({
                id: city.city_id,
                name: city.city_name,
            }));
            
            logger.debug("✅ Cities fetched successfully", { count: cityList.length });
            setCities(cityList);
        } catch (error) {
            logger.error("❌ Failed to fetch cities:", error);
            toastService.error("Failed to load cities. Please try again.");
            setCities([]);
        } finally {
            setLoadingCities(false);
        }
    }, []);

    /**
     * Initialize component - fetch countries on mount
     */
    useEffect(() => {
        logger.debug("🔵 PatientContactInformation component mounting");
        fetchCountries();
        
        // Load saved data from localStorage
        try {
            const savedData = localStorage.getItem("patientContactInformation");
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                logger.debug("📂 Loading saved contact information", parsedData);
                
                setFormData({
                    houseNo: parsedData.house_no || "",
                    streetLine1: parsedData.street_address1 || "",
                    streetLine2: parsedData.street_address2 || "",
                    country: parsedData.country_name || "",
                    state: parsedData.state_name || "",
                    city: parsedData.city_name || "",
                    zipCode: parsedData.zip_code || "",
                });
                
                // If we have country_id, fetch states
                if (parsedData.country_id) {
                    setSelectedCountryId(parsedData.country_id);
                    fetchStates(parsedData.country_id).then(() => {
                        // If we have state_id, fetch cities
                        if (parsedData.state_id) {
                            setSelectedStateId(parsedData.state_id);
                            fetchCities(parsedData.state_id);
                        }
                    });
                }
            }
        } catch (error) {
            logger.error("❌ Error loading saved data:", error);
        }
    }, [fetchCountries, fetchStates, fetchCities]);

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
     * Handle country selection
     * Fetches states for selected country
     * 
     * @param {string} countryName - Selected country name
     */
    const handleCountryChange = useCallback((countryName) => {
        logger.debug("🌍 Country selected", { countryName });
        
        const selectedCountry = countries.find((c) => c.name === countryName);
        if (selectedCountry) {
            setSelectedCountryId(selectedCountry.id);
            handleInputChange("country", countryName);
            fetchStates(selectedCountry.id);
        } else {
            setSelectedCountryId(null);
            handleInputChange("country", "");
        }
    }, [countries, handleInputChange, fetchStates]);

    /**
     * Handle state selection
     * Fetches cities for selected state
     * 
     * @param {string} stateName - Selected state name
     */
    const handleStateChange = useCallback((stateName) => {
        logger.debug("🏛️ State selected", { stateName });
        
        const selectedState = states.find((s) => s.name === stateName);
        if (selectedState) {
            setSelectedStateId(selectedState.id);
            handleInputChange("state", stateName);
            fetchCities(selectedState.id);
        } else {
            setSelectedStateId(null);
            handleInputChange("state", "");
        }
    }, [states, handleInputChange, fetchCities]);

    /**
     * Handle city selection
     * 
     * @param {string} cityName - Selected city name
     */
    const handleCityChange = useCallback((cityName) => {
        logger.debug("🏙️ City selected", { cityName });
        
        const selectedCity = cities.find((c) => c.name === cityName);
        if (selectedCity) {
            setSelectedCityId(selectedCity.id);
            handleInputChange("city", cityName);
        } else {
            setSelectedCityId(null);
            handleInputChange("city", "");
        }
    }, [cities, handleInputChange]);

    /**
     * Validate form data
     * Checks required fields and formats
     * 
     * @returns {boolean} True if form is valid, false otherwise
     */
    const validateForm = useCallback(() => {
        logger.debug("🔍 Validating form data", formData);
        
        const errors = {
            houseNo: { isValid: true, message: "" },
            streetLine1: { isValid: true, message: "" },
            country: { isValid: true, message: "" },
            state: { isValid: true, message: "" },
            city: { isValid: true, message: "" },
            zipCode: { isValid: true, message: "" },
        };

        let isFormValid = true;

        // Validate street line 1 (required)
        if (!formData.streetLine1 || formData.streetLine1.trim() === "") {
            errors.streetLine1 = {
                isValid: false,
                message: "Street address is required",
            };
            isFormValid = false;
        }

        // Validate country (required)
        if (!formData.country || formData.country.trim() === "") {
            errors.country = {
                isValid: false,
                message: "Country is required",
            };
            isFormValid = false;
        }

        // Validate state (required)
        if (!formData.state || formData.state.trim() === "") {
            errors.state = {
                isValid: false,
                message: "State is required",
            };
            isFormValid = false;
        }

        // Validate city (required)
        if (!formData.city || formData.city.trim() === "") {
            errors.city = {
                isValid: false,
                message: "City is required",
            };
            isFormValid = false;
        }

        // Validate zip code (required)
        if (!formData.zipCode || formData.zipCode.trim() === "") {
            errors.zipCode = {
                isValid: false,
                message: "Zip code is required",
            };
            isFormValid = false;
        } else {
            // Validate zip code format (alphanumeric, 4-10 characters)
            const zipRegex = /^[A-Za-z0-9]{4,10}$/;
            if (!zipRegex.test(formData.zipCode.trim())) {
                errors.zipCode = {
                    isValid: false,
                    message: "Zip code must be 4-10 alphanumeric characters",
                };
                isFormValid = false;
            }
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
            // Find country, state, and city IDs from selections
            const countryData = countries.find((c) => c.name === formData.country);
            const stateData = states.find((s) => s.name === formData.state);
            const cityData = cities.find((c) => c.name === formData.city);

            // Save form data to localStorage for persistence
            const contactInfoData = {
                house_no: formData.houseNo.trim(),
                street_address1: formData.streetLine1.trim(),
                street_address2: formData.streetLine2.trim(),
                country_name: formData.country,
                country_id: countryData?.id || selectedCountryId,
                state_name: formData.state,
                state_id: stateData?.id || selectedStateId,
                city_name: formData.city,
                city_id: cityData?.id || selectedCityId,
                zip_code: formData.zipCode.trim(),
                timestamp: new Date().toISOString(),
            };

            localStorage.setItem("patientContactInformation", JSON.stringify(contactInfoData));
            logger.debug("✅ Contact information saved to localStorage", contactInfoData);

            // Show success message
            toastService.success("Contact information saved successfully");

            // Navigate to payment information page
            navigate("/patientpaymentinformation");
        } catch (error) {
            logger.error("❌ Error saving contact information:", error);
            toastService.error("Failed to save information. Please try again.");
        }
    }, [formData, validateForm, navigate, countries, states, cities, selectedCountryId, selectedStateId, selectedCityId]);
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
                <strong>Contact Information</strong>
            </h2>

            {/* Form Container */}
            <div className="component-library">
                <div className="items">
                    <form onSubmit={handleSubmit} className="field-center6">
                        {/* House Number */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomTextField
                                id="houseNo"
                                label="House No"
                                defaultValue={formData.houseNo}
                                value={formData.houseNo}
                                helperText={""}
                                isValid={true}
                                onChange={(e) => handleInputChange("houseNo", e.target.value)}
                                textcss={{
                                    width: "22.5em",
                                    height: "56px",
                                }}
                            />
                        </Stack>

                        {/* Street Line 1 - Required */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomTextField
                                id="streetLine1"
                                label="Street Line 1"
                                defaultValue={formData.streetLine1}
                                value={formData.streetLine1}
                                helperText={validationErrors.streetLine1.message}
                                isValid={validationErrors.streetLine1.isValid}
                                onChange={(e) => handleInputChange("streetLine1", e.target.value)}
                                required
                                textcss={{
                                    width: "22.5em",
                                    height: "56px",
                                }}
                            />
                        </Stack>

                        {/* Street Line 2 - Optional */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomTextField
                                id="streetLine2"
                                label="Street Line 2"
                                defaultValue={formData.streetLine2}
                                value={formData.streetLine2}
                                helperText={""}
                                isValid={true}
                                onChange={(e) => handleInputChange("streetLine2", e.target.value)}
                                textcss={{
                                    width: "22.5em",
                                    height: "56px",
                                }}
                            />
                        </Stack>

                        {/* Country Dropdown - Required */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomDropdown
                                label="Country"
                                items={countries.map((c) => c.name)}
                                activeItem={formData.country}
                                handleChange={handleCountryChange}
                                dropdowncss={{ width: "22.5em" }}
                            />
                            {!validationErrors.country.isValid && (
                                <span style={{ 
                                    color: "#E72B4A", 
                                    fontSize: "0.75rem", 
                                    marginTop: "-8px"
                                }}>
                                    {validationErrors.country.message}
                                </span>
                            )}
                            {loadingCountries && (
                                <span style={{ 
                                    color: "#939094", 
                                    fontSize: "0.75rem",
                                    marginTop: "-8px"
                                }}>
                                    Loading countries...
                                </span>
                            )}
                        </Stack>

                        {/* State Dropdown - Required, depends on country */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomDropdown
                                label="State"
                                items={states.map((s) => s.name)}
                                activeItem={formData.state}
                                handleChange={handleStateChange}
                                dropdowncss={{ width: "22.5em" }}
                                disabled={!selectedCountryId || loadingStates}
                            />
                            {!validationErrors.state.isValid && (
                                <span style={{ 
                                    color: "#E72B4A", 
                                    fontSize: "0.75rem", 
                                    marginTop: "-8px"
                                }}>
                                    {validationErrors.state.message}
                                </span>
                            )}
                            {loadingStates && (
                                <span style={{ 
                                    color: "#939094", 
                                    fontSize: "0.75rem",
                                    marginTop: "-8px"
                                }}>
                                    Loading states...
                                </span>
                            )}
                            {!selectedCountryId && states.length === 0 && !loadingStates && (
                                <span style={{ 
                                    color: "#939094", 
                                    fontSize: "0.75rem",
                                    marginTop: "-8px"
                                }}>
                                    Please select a country first
                                </span>
                            )}
                        </Stack>

                        {/* City Dropdown - Required, depends on state */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomDropdown
                                label="City"
                                items={cities.map((c) => c.name)}
                                activeItem={formData.city}
                                handleChange={handleCityChange}
                                dropdowncss={{ width: "22.5em" }}
                                disabled={!selectedStateId || loadingCities}
                            />
                            {!validationErrors.city.isValid && (
                                <span style={{ 
                                    color: "#E72B4A", 
                                    fontSize: "0.75rem", 
                                    marginTop: "-8px"
                                }}>
                                    {validationErrors.city.message}
                                </span>
                            )}
                            {loadingCities && (
                                <span style={{ 
                                    color: "#939094", 
                                    fontSize: "0.75rem",
                                    marginTop: "-8px"
                                }}>
                                    Loading cities...
                                </span>
                            )}
                            {!selectedStateId && cities.length === 0 && !loadingCities && (
                                <span style={{ 
                                    color: "#939094", 
                                    fontSize: "0.75rem",
                                    marginTop: "-8px"
                                }}>
                                    Please select a state first
                                </span>
                            )}
                        </Stack>

                        {/* Zip Code - Required */}
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomTextField
                                id="zipCode"
                                label="Zip Code"
                                defaultValue={formData.zipCode}
                                value={formData.zipCode}
                                helperText={validationErrors.zipCode.message || "4-10 alphanumeric characters"}
                                isValid={validationErrors.zipCode.isValid}
                                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                required
                                textcss={{
                                    width: "22.5em",
                                    height: "56px",
                                }}
                            />
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
PatientContactInformation.propTypes = {
    // This component doesn't accept props currently, but structure is ready
};

export default PatientContactInformation;
