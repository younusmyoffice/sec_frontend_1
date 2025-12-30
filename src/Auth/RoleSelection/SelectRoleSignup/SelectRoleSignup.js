import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import "./SelectRoleSignup.scss";
import { Box, Alert, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import CustomRadioButton from "../../../components/CustomRadioButton/custom-radio-button";
import CustomButton from "../../../components/CustomButton/custom-button";
import { useNavigation } from "../../../hooks/useNavigation";
import { 
    USER_TYPES, 
    USER_TYPE_ROUTES, 
    USER_TYPE_STORAGE_VALUES, 
    STORAGE_KEYS 
} from "../../../constants/routes";
import CustomTextField from "../../../components/CustomTextField";

// Custom hook for signup logic - Best Practice: Extract business logic
const useSignupSelection = () => {
    const { navigateTo, navigateAndStore } = useNavigation();
    const [selectedType, setSelectedType] = useState(USER_TYPES.PATIENT);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    // Memoized radio values to prevent unnecessary re-renders
    const radioValues = useMemo(() => Object.values(USER_TYPES), []);

    // Memoized validation function
    const validateSelection = useCallback((value) => {
        return Object.values(USER_TYPES).includes(value);
    }, []);

    // Memoized submit handler with improved navigation
    const handleSubmit = useCallback(() => {
        try {
            if (!validateSelection(selectedType)) {
                setError("Please select a valid option");
                setShowError(true);
                return;
            }

            const route = USER_TYPE_ROUTES[selectedType];
            const storageValue = USER_TYPE_STORAGE_VALUES[selectedType];

            if (!route || !storageValue) {
                setError("Invalid configuration for selected option");
                setShowError(true);
                return;
            }

            // Store user type in localStorage
            localStorage.setItem(STORAGE_KEYS.SIGNUP_TYPE, storageValue);
            
            // Navigate to appropriate route with error handling
            const navigationSuccess = navigateTo(route);
            
            if (!navigationSuccess) {
                setError("Failed to navigate. Please try again.");
                setShowError(true);
            }
        } catch (error) {
            console.error("Error during signup selection:", error);
            setError("An unexpected error occurred. Please try again.");
            setShowError(true);
        }
    }, [selectedType, validateSelection, navigateTo]);

    // Memoized radio change handler
    const handleRadioChange = useCallback(({ target }) => {
        setSelectedType(target.value);
        // Clear any existing errors when user makes a new selection
        if (showError) {
            setShowError(false);
            setError("");
        }
    }, [showError]);

    // Memoized error close handler
    const handleErrorClose = useCallback(() => {
        setShowError(false);
        setError("");
    }, []);

    return {
        selectedType,
        radioValues,
        error,
        showError,
        handleSubmit,
        handleRadioChange,
        handleErrorClose,
    };
};

// Main component - Best Practice: Keep component focused on rendering
const SelectRoleSignup = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

    // Enable scrolling on this page - override body height constraint
    useEffect(() => {
        const originalBodyHeight = document.body.style.height;
        const originalBodyMinHeight = document.body.style.minHeight;
        const originalBodyOverflow = document.body.style.overflowY;
        const originalHtmlOverflow = document.documentElement.style.overflowY;
        
        // Enable scrolling
        document.body.style.height = 'auto';
        document.body.style.minHeight = '100vh';
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflowY = 'auto';
        
        return () => {
            // Restore original styles on unmount
            document.body.style.height = originalBodyHeight;
            document.body.style.minHeight = originalBodyMinHeight;
            document.body.style.overflowY = originalBodyOverflow;
            document.documentElement.style.overflowY = originalHtmlOverflow;
        };
    }, []);
    
    const {
        selectedType,
        radioValues,
        error,
        showError,
        handleSubmit,
        handleRadioChange,
        handleErrorClose,
    } = useSignupSelection();

    // Responsive styles
    const responsiveStyles = useMemo(() => ({
        radioButton: {
            border: "1px solid #E6E1E5",
            padding: "0px 10px",  
            borderRadius: "16px",
            width: isMobile ? "100%" : isTablet ? "350px" : "400px",
            maxWidth: "100%",
            height: isMobile ? "5em" : "6em",
            margin: "10px",
            boxSizing: "border-box",
        },
        continueButton: {
            width: isMobile ? "100%" : isTablet ? "20em" : "22em",
            maxWidth: "100%",
            padding: isMobile ? "12px 20px" : "8px 100px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100px",
            margin: isMobile ? "15px 0" : "25px",
            fontSize: isMobile ? "0.9rem" : "1rem",
        },
        logo: {
            maxWidth: "100%",
            height: "auto",
            maxHeight: isMobile ? "60px" : isTablet ? "80px" : "100px",
        },
        title: {
            fontSize: isMobile ? "1.5rem" : isTablet ? "2rem" : "2.5rem",
            fontWeight: 600,
            color: "#333",
            textAlign: "center",
            marginBottom: isMobile ? "1.5rem" : "2rem",
            lineHeight: 1.3,
        }
    }), [isMobile, isTablet]);

    return (
        <div className="register-photo" role="main" aria-label="Sign up selection">
            <Box className="form-container">
                <div className="image-holder" aria-hidden="true"></div>
                
                <Box className="component-library">
                    <Box 
                        sx={{
                            display: "flex", 
                            flexDirection: "column",
                            justifyContent: "flex-start", 
                            alignItems: "center",
                            width: "auto",
                            maxWidth: "600px",
                            margin: "0 auto"
                        }}
                    >
                        <div className="logo">
                            <img 
                                src="images/logo.png" 
                                alt="Company Logo"
                                loading="lazy"
                                style={responsiveStyles.logo}
                            />
                        </div>

                        <h2 className="signup-title" style={responsiveStyles.title}>
                            <strong>Sign Up</strong>
                        </h2>
                    </Box>
                    
                    <Box sx={{ 
                        display: "flex", 
                        width: "100%", 
                        maxWidth: "600px", 
                        margin: "0 auto",
                        flexDirection: "column",
                        justifyContent: "flex-start", 
                        alignItems: "center",
                        marginTop: "0.2rem",
                        marginBottom: "2rem"
                    }}>
                        <p style={responsiveStyles.label}>
                        Select your account type
                        </p>
                        <CustomRadioButton
                            label=""
                            radiocss={responsiveStyles.radioButton}
                            handleChange={handleRadioChange}
                            value={selectedType}
                            items={radioValues}
                            aria-label="User type selection"
                        />
                    </Box>
                    
                    <Box sx={{ 
                        display: "flex", 
                        width: "100%", 
                        maxWidth: "600px", 
                        margin: "0 auto",
                        flexDirection: "column",
                        justifyContent: "flex-start", 
                        alignItems: "center",
                        marginBottom: "2rem"
                    }}>
                        <CustomButton
                            label="Continue"
                            isTransapent={false}
                            isDisabled={false}
                            isElevated={false}
                            handleClick={handleSubmit}
                            buttonCss={responsiveStyles.continueButton}
                            aria-label="Continue to next step"
                        />
                    </Box>
                </Box>
            </Box>

            {/* Best Practice: Proper error handling with user-friendly messages */}
            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={handleErrorClose}
                anchorOrigin={{ 
                    vertical: isMobile ? 'bottom' : 'top', 
                    horizontal: 'center' 
                }}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        width: isMobile ? '90%' : 'auto',
                        maxWidth: isMobile ? 'none' : '400px',
                    }
                }}
            >
                <Alert 
                    onClose={handleErrorClose} 
                    severity="error" 
                    sx={{ 
                        width: '100%',
                        fontSize: isMobile ? '0.875rem' : '1rem'
                    }}
                    role="alert"
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

// Best Practice: PropTypes for type safety (if not using TypeScript)
SelectRoleSignup.propTypes = {
    // Add any props if this component receives them
};

export default SelectRoleSignup;
