/**
 * Centralized validation utilities for the application
 */
import { useState, useCallback } from 'react';

// Validation functions for mobile numbers with country codes
export const validateMobileNumber = (mobile, countryCode) => {
    if (!mobile) {
        return { isValid: false, message: "Mobile number is required" };
    }
    
    // Remove any non-numeric characters (spaces, dashes, parentheses, etc.)
    const cleanMobile = mobile.replace(/[\s\-\(\)\+]/g, '');
    
    // Check if it contains only digits
    if (!/^\d+$/.test(cleanMobile)) {
        return { isValid: false, message: "Mobile number should contain only digits" };
    }
    
    // Check for minimum length
    if (cleanMobile.length < 7) {
        return { isValid: false, message: "Mobile number is too short" };
    }
    
    // Country-specific validation
    if (countryCode === "+1") {
        // US/Canada - 10 digits
        if (cleanMobile.length !== 10) {
            return { isValid: false, message: "US/Canada mobile number must be exactly 10 digits" };
        }
    } else if (countryCode === "+91") {
        // India - 10 digits
        if (cleanMobile.length !== 10) {
            return { isValid: false, message: "Indian mobile number must be exactly 10 digits" };
        }
    } else if (countryCode === "+44") {
        // UK - 10-11 digits
        if (cleanMobile.length < 10 || cleanMobile.length > 11) {
            return { isValid: false, message: "UK mobile number must be 10-11 digits" };
        }
    } else if (countryCode === "+86") {
        // China - 11 digits
        if (cleanMobile.length !== 11) {
            return { isValid: false, message: "Chinese mobile number must be exactly 11 digits" };
        }
    } else if (countryCode === "+81") {
        // Japan - 10-11 digits
        if (cleanMobile.length < 10 || cleanMobile.length > 11) {
            return { isValid: false, message: "Japanese mobile number must be 10-11 digits" };
        }
    } else if (countryCode === "+49") {
        // Germany - 10-12 digits
        if (cleanMobile.length < 10 || cleanMobile.length > 12) {
            return { isValid: false, message: "German mobile number must be 10-12 digits" };
        }
    } else if (countryCode === "+33") {
        // France - 10 digits
        if (cleanMobile.length !== 10) {
            return { isValid: false, message: "French mobile number must be exactly 10 digits" };
        }
    } else if (countryCode === "+61") {
        // Australia - 9 digits
        if (cleanMobile.length !== 9) {
            return { isValid: false, message: "Australian mobile number must be exactly 9 digits" };
        }
    } else {
        // Generic validation - 7-15 digits
        if (cleanMobile.length < 7 || cleanMobile.length > 15) {
            return { isValid: false, message: "Mobile number must be 7-15 digits" };
        }
    }
    
    return { isValid: true, message: "" };
};

// Get country-specific helper text
export const getMobileHelperText = (countryCode, isValid, errorMessage) => {
    if (!isValid && errorMessage) {
        return errorMessage;
    }
    
    const countryNames = {
        "+1": "US/Canada",
        "+91": "India", 
        "+44": "UK",
        "+86": "China",
        "+81": "Japan",
        "+49": "Germany",
        "+33": "France",
        "+61": "Australia"
    };
    
    const countryName = countryNames[countryCode] || "International";
    return `Enter your mobile number (${countryCode} - ${countryName})`;
};

// Get country-specific placeholder text
export const getMobilePlaceholder = (countryCode) => {
    const placeholders = {
        "+1": "1234567890",
        "+91": "9876543210",
        "+44": "7123456789",
        "+86": "13812345678",
        "+81": "9012345678",
        "+49": "15123456789",
        "+33": "612345678",
        "+61": "412345678"
    };
    
    return placeholders[countryCode] || "Mobile number";
};

// Clean mobile number (remove non-numeric characters)
export const cleanMobileNumber = (mobile) => {
    return mobile.replace(/[\s\-\(\)\+]/g, '');
};

// Check if mobile number is valid for any country (basic check)
export const isBasicValidMobile = (mobile) => {
    const cleanMobile = cleanMobileNumber(mobile);
    return /^\d+$/.test(cleanMobile) && cleanMobile.length >= 7 && cleanMobile.length <= 15;
};

// Get mobile number length requirements for a country
export const getMobileLengthRequirements = (countryCode) => {
    const requirements = {
        "+1": { min: 10, max: 10, description: "10 digits" },
        "+91": { min: 10, max: 10, description: "10 digits" },
        "+44": { min: 10, max: 11, description: "10-11 digits" },
        "+86": { min: 11, max: 11, description: "11 digits" },
        "+81": { min: 10, max: 11, description: "10-11 digits" },
        "+49": { min: 10, max: 12, description: "10-12 digits" },
        "+33": { min: 10, max: 10, description: "10 digits" },
        "+61": { min: 9, max: 9, description: "9 digits" }
    };
    
    return requirements[countryCode] || { min: 7, max: 15, description: "7-15 digits" };
};

// Validation hook for mobile numbers
export const useMobileValidation = (initialCountryCode = "+1") => {
    const [validationState, setValidationState] = useState({
        isValid: true,
        message: "",
        countryCode: initialCountryCode
    });
    
    const validateMobile = useCallback((mobile, countryCode) => {
        const validation = validateMobileNumber(mobile, countryCode);
        setValidationState({
            isValid: validation.isValid,
            message: validation.message,
            countryCode: countryCode
        });
        return validation;
    }, []);
    
    const resetValidation = useCallback(() => {
        setValidationState({
            isValid: true,
            message: "",
            countryCode: initialCountryCode
        });
    }, [initialCountryCode]);
    
    return {
        validationState,
        validateMobile,
        resetValidation
    };
};

// Default export for easy importing
export default {
    validateMobileNumber,
    getMobileHelperText,
    getMobilePlaceholder,
    cleanMobileNumber,
    isBasicValidMobile,
    getMobileLengthRequirements,
    useMobileValidation
};
