import { useState, useCallback, useEffect } from 'react';
import { validateMobileNumber, getMobileHelperText, cleanMobileNumber } from '../utils/validationUtils';

/**
 * Custom hook for mobile number validation with country code support
 * @param {string} initialCountryCode - Initial country code (default: "+1")
 * @param {number} debounceDelay - Debounce delay in milliseconds (default: 500)
 */
export const useMobileValidation = (initialCountryCode = "+1", debounceDelay = 500) => {
    const [mobile, setMobile] = useState("");
    const [countryCode, setCountryCode] = useState(initialCountryCode);
    const [countryName, setCountryName] = useState("United States");
    const [countryFlag, setCountryFlag] = useState("🇺🇸");
    const [validationErrors, setValidationErrors] = useState({
        mobile: { isValid: true, message: "" }
    });
    const [validationTimer, setValidationTimer] = useState(null);

    // Debounced validation function
    const debouncedValidateMobile = useCallback((mobileValue, countryCodeValue) => {
        if (validationTimer) {
            clearTimeout(validationTimer);
        }
        
        const timer = setTimeout(() => {
            const mobileValidation = validateMobileNumber(mobileValue, countryCodeValue);
            setValidationErrors(prev => ({
                ...prev,
                mobile: mobileValidation
            }));
        }, debounceDelay);
        
        setValidationTimer(timer);
    }, [validationTimer, debounceDelay]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (validationTimer) {
                clearTimeout(validationTimer);
            }
        };
    }, [validationTimer]);

    // Handle country code change
    const handleCountryCodeChange = useCallback((event) => {
        const { countryCode: newCountryCode, countryName: newCountryName, countryFlag: newCountryFlag, value } = event.target;
        
        // Update country info
        setCountryCode(newCountryCode);
        setCountryName(newCountryName);
        setCountryFlag(newCountryFlag);
        
        // Extract mobile number without country code
        const mobileNumber = value.replace(newCountryCode, '');
        setMobile(mobileNumber);
        
        // Validate mobile number with new country code
        const mobileValidation = validateMobileNumber(mobileNumber, newCountryCode);
        setValidationErrors(prev => ({
            ...prev,
            mobile: mobileValidation
        }));
    }, []);

    // Handle mobile number input
    const handleMobileInput = useCallback((event) => {
        const mobileNumber = event.target.value;
        setMobile(mobileNumber);
        
        // Use debounced validation for better UX
        debouncedValidateMobile(mobileNumber, countryCode);
    }, [debouncedValidateMobile, countryCode]);

    // Validate mobile number immediately (for form submission)
    const validateMobile = useCallback((mobileValue = mobile, countryCodeValue = countryCode) => {
        const mobileValidation = validateMobileNumber(mobileValue, countryCodeValue);
        setValidationErrors(prev => ({
            ...prev,
            mobile: mobileValidation
        }));
        return mobileValidation;
    }, [mobile, countryCode]);

    // Reset validation
    const resetValidation = useCallback(() => {
        setValidationErrors({
            mobile: { isValid: true, message: "" }
        });
    }, []);

    // Reset all state
    const resetAll = useCallback(() => {
        setMobile("");
        setCountryCode(initialCountryCode);
        setCountryName("United States");
        setCountryFlag("🇺🇸");
        setValidationErrors({
            mobile: { isValid: true, message: "" }
        });
    }, [initialCountryCode]);

    // Get helper text for the mobile field
    const getHelperText = useCallback(() => {
        return getMobileHelperText(
            countryCode, 
            validationErrors.mobile.isValid, 
            validationErrors.mobile.message
        );
    }, [countryCode, validationErrors.mobile.isValid, validationErrors.mobile.message]);

    // Check if form is valid for submission
    const isFormValid = useCallback(() => {
        return validationErrors.mobile.isValid && mobile && mobile.length >= 7;
    }, [validationErrors.mobile.isValid, mobile]);

    // Get cleaned mobile number
    const getCleanMobileNumber = useCallback(() => {
        return cleanMobileNumber(mobile);
    }, [mobile]);

    return {
        // State
        mobile,
        countryCode,
        countryName,
        countryFlag,
        validationErrors,
        
        // Setters
        setMobile,
        setCountryCode,
        setCountryName,
        setCountryFlag,
        
        // Handlers
        handleCountryCodeChange,
        handleMobileInput,
        
        // Validation functions
        validateMobile,
        resetValidation,
        resetAll,
        
        // Utility functions
        getHelperText,
        isFormValid,
        getCleanMobileNumber,
        
        // Computed values
        isMobileValid: validationErrors.mobile.isValid,
        mobileErrorMessage: validationErrors.mobile.message,
        canSubmit: isFormValid()
    };
};

export default useMobileValidation;
