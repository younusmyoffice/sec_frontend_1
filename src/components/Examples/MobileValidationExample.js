import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useMobileValidation } from '../../hooks/useMobileValidation';
import CustomCountryCodeSelector from '../CustomCountryCodeSelector';

/**
 * Example component demonstrating how to use the reusable mobile validation system
 * This can be used as a reference for implementing mobile validation in any component
 */
const MobileValidationExample = () => {
    // Initialize the mobile validation hook
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
        getCleanMobileNumber,
        resetAll
    } = useMobileValidation("+1", 500); // Default to US, 500ms debounce

    const handleSubmit = () => {
        // Validate mobile number before submission
        const mobileValidation = validateMobile();
        
        if (!mobileValidation.isValid) {
            alert(`Validation Error: ${mobileValidation.message}`);
            return;
        }

        // Get cleaned data for API call
        const apiData = {
            mobile: getCleanMobileNumber(),
            dialing_code: countryCode,
            country_name: countryName,
            country_flag: countryFlag
        };

        console.log('Submitting mobile data:', apiData);
        alert(`Mobile: ${apiData.mobile}\nCountry: ${apiData.country_name} (${apiData.dialing_code})`);
    };

    const handleReset = () => {
        resetAll();
    };

    return (
        <Box sx={{ p: 3, maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h5" gutterBottom>
                Mobile Validation Example
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This example shows how to use the reusable mobile validation system.
            </Typography>

            {/* Mobile Number Input */}
            <CustomCountryCodeSelector
                id="example-mobile-input"
                label="Mobile Number"
                value={mobile || ""}
                onChange={handleCountryCodeChange}
                onInput={handleMobileInput}
                helperText={getHelperText()}
                error={!validationErrors.mobile.isValid && validationErrors.mobile.message !== ""}
                placeholder="Enter your mobile number"
                textcss={{ width: "100%", marginBottom: "16px" }}
                defaultCountryCode="+1"
                defaultCountryName="United States"
                defaultCountryFlag="🇺🇸"
            />

            {/* Debug Information */}
            <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Debug Information:
                </Typography>
                <Typography variant="body2">
                    <strong>Mobile:</strong> {mobile || 'Empty'}
                </Typography>
                <Typography variant="body2">
                    <strong>Country:</strong> {countryName} ({countryCode})
                </Typography>
                <Typography variant="body2">
                    <strong>Flag:</strong> {countryFlag}
                </Typography>
                <Typography variant="body2">
                    <strong>Is Valid:</strong> {validationErrors.mobile.isValid ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2">
                    <strong>Error:</strong> {validationErrors.mobile.message || 'None'}
                </Typography>
                <Typography variant="body2">
                    <strong>Can Submit:</strong> {isFormValid() ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2">
                    <strong>Clean Mobile:</strong> {getCleanMobileNumber() || 'Empty'}
                </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isFormValid()}
                    sx={{ flex: 1 }}
                >
                    Submit
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleReset}
                    sx={{ flex: 1 }}
                >
                    Reset
                </Button>
            </Box>

            {/* Instructions */}
            <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Instructions:
                </Typography>
                <Typography variant="body2" component="div">
                    <ul>
                        <li>Select a country from the dropdown</li>
                        <li>Enter a mobile number</li>
                        <li>Watch real-time validation</li>
                        <li>Try different countries to see country-specific validation</li>
                        <li>Submit button is disabled until valid input</li>
                    </ul>
                </Typography>
            </Box>
        </Box>
    );
};

export default MobileValidationExample;
