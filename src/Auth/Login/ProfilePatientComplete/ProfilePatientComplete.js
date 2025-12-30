import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "./ProfilePatientComplete.scss";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
/**
 * PatientCompleteProfile Component
 * 
 * Handles patient profile completion for users with incomplete profiles after login.
 * Features:
 * - Multi-step form (2 steps)
 * - Personal information collection (name, gender, DOB)
 * - Address information (country, state, city, street)
 * - JWT token-based authentication
 * - Automatic token handling via axiosInstance
 * - Dynamic country/state/city dropdowns
 */

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../components/CustomButton";
import { baseURL } from "../../../constants/const";
import CustomSnackBar from "../../../components/CustomSnackBar";
import ClassicFrame from "../../../static/images/DrImages/Undraw.png";
import ImageFrame from "../../../static/images/DrImages/Frame1.png";
import axiosInstance from "../../../config/axiosInstance";
import { getCurrentUser, getCurrentUserId, getCurrentRoleId, getCurrentUserEmail } from "../../../utils/jwtUtils";
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";
import { Loading } from "../../../components/Loading";

const steps = ["", ""];

const PatientCompleteProfile = () => {
    // ============================================
    // Navigation and Utilities
    // ============================================
    
    const navigate = useNavigate();
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [value, setValue] = useState([null, null]);
    const radioValues = ["My self"];
    // ============================================
    // State Management
    // ============================================
    
    // Snackbar notification state
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarType, setSnackBarType] = useState("success");
    
    // Location dropdown data
    const [countryValues, setCountryValue] = useState([]);
    const [countryNames, setCountryNames] = useState(["Please Wait"]);
    const [stateValue, setStateValue] = useState([]);
    const [stateName, setStateName] = useState("");
    const [stateNames, setStateNames] = useState(["Please Wait"]);
    const [cityValues, setCityValues] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [selectedCountryFromDropDown, setSelectedCountryFromDropDown] = useState([]);
    const [selectCityFromDropDown, setSelectCityFromDropDown] = useState([]);
    const [citySelected, setCitySelected] = useState("");
    
    // Gender dropdown state
    const dropdownItems = ["Male", "Female", "Others"];
    const [activeDropdown, setActiveDropdown] = useState("");
    
    // Loading state for API operations
    const [isLoading, setIsLoading] = useState(false);
    // Get user information from JWT token
    const currentUser = getCurrentUser();
    const userId = getCurrentUserId();
    const roleId = getCurrentRoleId();
    const userEmail = getCurrentUserEmail();
    
    // Log user information from JWT token
    logger.debug("Current user from JWT:", currentUser);
    logger.debug("User ID:", userId, "Role ID:", roleId, "Email:", userEmail);
    
    // Debug localStorage and sessionStorage for troubleshooting
    logger.debug("=== LOCALSTORAGE DEBUG ===");
    logger.debug("localStorage login_Email:", localStorage.getItem("login_Email"));
    logger.debug("localStorage patient_Email:", localStorage.getItem("patient_Email"));
    logger.debug("localStorage mobile:", localStorage.getItem("mobile"));
    logger.debug("localStorage login_country_code:", localStorage.getItem("login_country_code"));
    logger.debug("localStorage patient_suid:", localStorage.getItem("patient_suid"));
    logger.debug("sessionStorage login_mobile:", sessionStorage.getItem("login_mobile"));
    logger.debug("sessionStorage login_country_code:", sessionStorage.getItem("login_country_code"));

    const [data, setData] = useState({
        email: userEmail || localStorage.getItem("patient_Email") || localStorage.getItem("login_Email") || "",
        mobile: localStorage.getItem("mobile") || sessionStorage.getItem("login_mobile") || "",
        dialing_code: localStorage.getItem("login_country_code") || sessionStorage.getItem("login_country_code") || "",
        user_id: userId,
        role_id: roleId || 5, // Default to patient role
        login_with_email: !localStorage.getItem("mobile") && !sessionStorage.getItem("login_mobile"), // true if no mobile data
        first_name: null,
        last_name: null,
        middle_name: null,
        added_by: "self",
        gender: null,
        DOB: null,
        country_id: null,
        state_id: null,
        city_id: null,
        street_address1: null,
        street_address2: null,
        zip_code: null,
    });

    // ============================================
    // API Functions
    // ============================================
    
    /**
     * Submit profile completion data to backend
     * - Validates and formats data
     * - Sends update request via axiosInstance (includes JWT token automatically)
     * - Handles success/error states
     * - Navigates to next step on success
     */
    const fetchData = async () => {
        setIsLoading(true); // Show loading state
        
        try {
            // Ensure we have the required data for incomplete profiles
            const patientSuid = localStorage.getItem("patient_suid");
            const patientEmail = localStorage.getItem("login_Email") || localStorage.getItem("patient_Email");
            const patientMobile = localStorage.getItem("mobile") || sessionStorage.getItem("login_mobile");
            const patientDialingCode = localStorage.getItem("login_country_code") || sessionStorage.getItem("login_country_code");
            
            // Clean up undefined values and ensure we have proper data
            const cleanEmail = (data.email && data.email !== 'undefined') ? data.email : (patientEmail || "");
            const cleanMobile = (data.mobile && data.mobile !== 'null') ? data.mobile : (patientMobile || "");
            const cleanDialingCode = (data.dialing_code && data.dialing_code !== 'undefined') ? data.dialing_code : (patientDialingCode || "");
            const cleanSuid = data.user_id || patientSuid;
            
            // Format the data for API submission
            const formattedData = {
                ...data,
                suid: cleanSuid,
                email: cleanEmail,
                mobile: cleanMobile,
                dialing_code: cleanDialingCode,
                role_id: data.role_id || 5,
                login_with_email: cleanMobile ? false : true, // false if mobile data exists
                DOB: data.DOB ? new Date(data.DOB).toISOString().split('T')[0] : null, // Format date as YYYY-MM-DD
            };
            
            logger.debug("=== PATIENT PROFILE UPDATE DEBUG ===");
            logger.debug("Original data:", data);
            logger.debug("Cleaned data:");
            logger.debug("- cleanEmail:", cleanEmail);
            logger.debug("- cleanMobile:", cleanMobile);
            logger.debug("- cleanDialingCode:", cleanDialingCode);
            logger.debug("- cleanSuid:", cleanSuid);
            logger.debug("Formatted data for API:", formattedData);
            logger.debug("Mobile data sources:");
            logger.debug("- localStorage mobile:", localStorage.getItem("mobile"));
            logger.debug("- sessionStorage login_mobile:", sessionStorage.getItem("login_mobile"));
            logger.debug("- localStorage login_country_code:", localStorage.getItem("login_country_code"));
            logger.debug("- sessionStorage login_country_code:", sessionStorage.getItem("login_country_code"));
            logger.debug("API Endpoint:", `${baseURL}/sec/auth/updateProfile`);
            
            const response = await axiosInstance.post(
                "/sec/auth/updateProfile",
                formattedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            
            logger.info("Profile update response:", response);
            
            // Show success notification
            setSnackBarMessage("Profile updated successfully!");
            setSnackBarType("success");
            setOpenSnackBar(true);
            toastService.success("Profile updated successfully!");
            
            // Move to next step
            handleNext();
        } catch (error) {
            logger.error("Profile update error:", error);
            logger.error("Error response:", error?.response?.data);
            
            // Parse specific error codes
            let errorMessage = "Profile update failed. Please try again.";
            
            if (error.response?.data?.error) {
                const errorCode = error.response.data.error;
                switch (errorCode) {
                    case "VALIDATION_ERROR":
                        errorMessage = "Please check your input and try again.";
                        break;
                    case "UNAUTHORIZED":
                        errorMessage = "You are not authorized to update this profile.";
                        break;
                    case "PROFILE_NOT_FOUND":
                        errorMessage = "Profile not found. Please contact support.";
                        break;
                    default:
                        errorMessage = errorCode || errorMessage;
                }
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            setSnackBarMessage(errorMessage);
            setSnackBarType("error");
            setOpenSnackBar(true);
            toastService.error(errorMessage);
        } finally {
            setIsLoading(false); // Always stop loading
        }
    };

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    logger.debug("Current form data:", data);
    logger.debug("=== JWT DEBUG INFO ===");
    logger.debug("Current user from JWT:", currentUser);
    logger.debug("User ID from JWT:", userId);
    logger.debug("Role ID from JWT:", roleId);
    logger.debug("Email from JWT:", userEmail);
    logger.debug("Access token in localStorage:", localStorage.getItem("access_token"));

    useEffect(() => {
        FetchCountryNames();
        FetchStateNames();
        
        // Handle incomplete profile data from mobile login
        const patientSuid = localStorage.getItem("patient_suid");
        const patientEmail = localStorage.getItem("login_Email") || localStorage.getItem("patient_Email");
        const patientMobile = localStorage.getItem("mobile") || sessionStorage.getItem("login_mobile");
        const patientDialingCode = localStorage.getItem("login_country_code") || sessionStorage.getItem("login_country_code");
        
        logger.debug("=== PATIENT PROFILE DATA EXTRACTION ===");
        logger.debug("patientSuid:", patientSuid);
        logger.debug("patientEmail:", patientEmail);
        logger.debug("patientMobile:", patientMobile);
        logger.debug("patientDialingCode:", patientDialingCode);
        logger.debug("All localStorage keys:", Object.keys(localStorage));
        logger.debug("All sessionStorage keys:", Object.keys(sessionStorage));
        
        if (patientSuid || patientEmail || patientMobile) {
            logger.debug("Updating data with incomplete profile information");
            setData(prevData => ({
                ...prevData,
                email: patientEmail || prevData.email || "",
                mobile: patientMobile || prevData.mobile || "",
                dialing_code: patientDialingCode || prevData.dialing_code || "",
                role_id: 5, // Patient role
                login_with_email: !patientMobile, // false if mobile data exists
                user_id: patientSuid || prevData.user_id
            }));
        } else {
            logger.debug("No incomplete profile data found, using defaults");
        }
    }, []);

    const FetchCountryNames = async () => {
        let CountryValues = [];
        let CountryName = [];
        try {
            const response = await axiosInstance("/sec/countries");
            for (let key in response?.data?.response) {
                CountryValues.push(response?.data?.response[key]);
                CountryName.push(response?.data?.response[key].country_name);
            }
            setCountryNames(CountryName);
            setCountryValue(CountryValues);
        } catch (error) {
            logger.error("Error fetching countries:", error);
        }
    };

    const FetchStateNames = async (country_id) => {
        let StateValues = [];
        let StateName = [];
        try {
            const response = await axiosInstance(`/sec/states?country_id=${country_id}`);
            for (let key in response?.data?.response) {
                StateValues.push(response?.data?.response[key]);
                StateName.push(response?.data?.response[key].state_name);
            }
            setStateValue(StateValues);
            setStateNames(StateName);
        } catch (error) {
            logger.error("Error fetching states:", error);
        }
    };
    // run the api call when there is change in country drop down
    useEffect(() => {
        FetchStateNames(selectedCountryFromDropDown[0]?.country_id);
    }, [selectedCountryFromDropDown]);

    const FetchCityNames = async (state_id) => {
        let CityValues = [];
        let cityName = [];
        try {
            const response = await axiosInstance(`/sec/cities?state_id=${state_id}`);
            logger.debug("Cities response:", response);
            for (let key in response?.data?.response) {
                CityValues.push(response?.data?.response[key]);
                cityName.push(response?.data?.response[key].city_name);
            }
            setCityValues(CityValues);
            setCityNames(cityName);
        } catch (error) {
            logger.error("Error fetching cities:", error);
        }
    };
    // run the api to fetch the city details
    useEffect(() => {
        FetchCityNames(selectCityFromDropDown[0]?.state_id);
    }, [selectCityFromDropDown]);

    // ============================================
    // Render
    // ============================================
    
    return (
        <>
            {/* Loading overlay for API operations */}
            {isLoading && (
                <Loading
                    variant="overlay"
                    size="large"
                    message="Updating Your Profile"
                    subMessage="Please wait while we save your information..."
                    fullScreen
                />
            )}
            
            {/* Snackbar for notifications */}
            <Box sx={{ width: "100%" }}>
                <CustomSnackBar
                    isOpen={openSnackBar}
                    type={snackBarType}
                    message={snackBarMessage}
                />
                <div className="FrameBox1">
                    <Box
                        // sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                        component={"img"}
                        src={ImageFrame}
                    ></Box>
                </div>

                <div className="step-back">
                    <div className="back-btn">
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1, color: "red" }}
                        >
                            Back
                        </Button>
                    </div>
                    <div className="Stepper">
                        <Stepper
                            activeStep={activeStep}
                            style={{
                                width: "700px",
                            }}
                        >
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepOptional(index)) {
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                </div>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{ textAlign: "center", mb: 4 }}>
                                <Typography 
                                    sx={{ 
                                        mt: 2, 
                                        mb: 3,
                                        fontSize: "18px",
                                        color: "#666",
                                        lineHeight: "1.6",
                                        maxWidth: "600px",
                                        margin: "0 auto"
                                    }}
                                >
                                    We express our gratitude for your diligence in completing the
                                    patient profile. Your attention to detail contributes
                                    significantly to our records
                                </Typography>
                                <Box sx={{ mb: 3 }}>
                                    <img 
                                        src={ClassicFrame} 
                                        alt="Success Illustration" 
                                        style={{
                                            maxWidth: "300px",
                                            height: "auto",
                                            margin: "0 auto",
                                            display: "block"
                                        }}
                                    />
                                </Box>
                                <CustomButton
                                    label="Click here to login"
                                    handleClick={() => navigate("/patientlogin")}
                                    buttonCss={{ 
                                        width: "fit-content",
                                        padding: "12px 32px",
                                        fontSize: "16px",
                                        fontWeight: "500"
                                    }}
                                />
                            </Box>
                        </Box>
                        {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box> */}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {/* Step {activeStep + 1} */}
                            {activeStep === 0 ? (
                                <>
                                    <Box sx={{ 
                                        display: "flex", 
                                        justifyContent: "center", 
                                        alignItems: "center",
                                        minHeight: "60vh"
                                    }}>
                                        <Box sx={{ 
                                            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
                                            maxWidth: "600px"
                                        }}>
                                            <Box sx={{ mb: 4, textAlign: "center" }}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Poppins, sans-serif",
                                                        fontSize: { xs: "22px", sm: "25px" },
                                                        fontWeight: "500",
                                                        lineHeight: "1.2",
                                                        color: "#333",
                                                        mb: 1
                                                    }}
                                                >
                                                    Personal Information
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#666",
                                                        fontFamily: "Poppins, sans-serif"
                                                    }}
                                                >
                                                    Please provide your personal details
                                                </Typography>
                                            </Box>
                                            <Box sx={{ 
                                                display: "flex", 
                                                flexDirection: { xs: "column", sm: "row" },
                                                gap: { xs: 2, sm: 3 },
                                                mb: 3
                                            }}>
                                                <TextField
                                                    label="First Name"
                                                    variant="standard"
                                                    required
                                                    sx={{
                                                        flex: 1,
                                                        "& .MuiInputLabel-root": {
                                                            color: "#787579",
                                                            fontFamily: "Poppins, sans-serif"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderBottomColor: "#e0e0e0"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderBottomColor: "#d32f2f"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderBottomColor: "#d32f2f"
                                                        }
                                                    }}
                                                    onInput={(event) =>
                                                        setData({
                                                            ...data,
                                                            first_name: event?.target?.value,
                                                        })
                                                    }
                                                />
                                                <TextField
                                                    label="Middle Name"
                                                    variant="standard"
                                                    sx={{
                                                        flex: 1,
                                                        "& .MuiInputLabel-root": {
                                                            color: "#787579",
                                                            fontFamily: "Poppins, sans-serif"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderBottomColor: "#e0e0e0"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderBottomColor: "#d32f2f"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderBottomColor: "#d32f2f"
                                                        }
                                                    }}
                                                    onInput={(event) =>
                                                        setData({
                                                            ...data,
                                                            middle_name: event?.target?.value,
                                                        })
                                                    }
                                                />
                                            </Box>
                                            <Box sx={{ mb: 3 }}>
                                                <TextField
                                                    label="Last Name"
                                                    variant="standard"
                                                    required
                                                    fullWidth
                                                    sx={{
                                                        "& .MuiInputLabel-root": {
                                                            color: "#787579",
                                                            fontFamily: "Poppins, sans-serif"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderBottomColor: "#e0e0e0"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderBottomColor: "#d32f2f"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderBottomColor: "#d32f2f"
                                                        }
                                                    }}
                                                    onInput={(event) =>
                                                        setData({
                                                            ...data,
                                                            last_name: event?.target?.value,
                                                        })
                                                    }
                                                />
                                            </Box>
                                            <Box sx={{ 
                                                display: "flex", 
                                                flexDirection: { xs: "column", sm: "row" },
                                                gap: { xs: 2, sm: 3 },
                                                mb: 4
                                            }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Date of Birth"
                                                            value={data.DOB ? dayjs(data.DOB) : null}
                                                            onChange={(value) => {
                                                                logger.debug("Date of birth selected:", value);
                                                                setData({
                                                                    ...data,
                                                                    DOB: value ? value.toDate() : null,
                                                                });
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    required: true,
                                                                    variant: "standard",
                                                                    fullWidth: true,
                                                                    sx: {
                                                                        "& .MuiInputLabel-root": {
                                                                            color: "#787579",
                                                                            fontFamily: "Poppins, sans-serif"
                                                                        },
                                                                        "& .MuiInput-underline:before": {
                                                                            borderBottomColor: "#e0e0e0"
                                                                        },
                                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                                            borderBottomColor: "#d32f2f"
                                                                        },
                                                                        "& .MuiInput-underline:after": {
                                                                            borderBottomColor: "#d32f2f"
                                                                        }
                                                                    }
                                                                },
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <CustomDropdown
                                                        label="Gender"
                                                        items={dropdownItems}
                                                        activeItem={activeDropdown}
                                                        handleChange={(item) => {
                                                            setActiveDropdown(item);
                                                            logger.debug("Gender selected:", item);
                                                            setData({ ...data, gender: item });
                                                        }}
                                                        variant="standard"
                                                        dropdowncss={{
                                                            width: "100%",
                                                            "& .MuiInputLabel-root": {
                                                                color: "#787579",
                                                                fontFamily: "Poppins, sans-serif"
                                                            },
                                                            "& .MuiInput-underline:before": {
                                                                borderBottomColor: "#e0e0e0"
                                                            },
                                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                                borderBottomColor: "#d32f2f"
                                                            },
                                                            "& .MuiInput-underline:after": {
                                                                borderBottomColor: "#d32f2f"
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ 
                                                display: "flex", 
                                                justifyContent: "center", 
                                                mt: 4 
                                            }}>
                                                <CustomButton
                                                    handleClick={handleNext}
                                                    label="Next"
                                                    buttonCss={{
                                                        width: { xs: "100%", sm: "200px" },
                                                        padding: "12px 32px",
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                        borderRadius: "8px"
                                                    }}
                                                    isDisabled={
                                                        data?.first_name != null &&
                                                        data?.last_name != null &&
                                                        data?.gender != null &&
                                                        data?.DOB != null
                                                            ? false
                                                            : true
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </>
                            ) : activeStep === 1 ? (
                                <>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <div className="mainBox1">
                                            <Box sx={{ width: "40%" }}>
                                                <div className="heading1">
                                                    <Typography
                                                        style={{
                                                            fontFamily: "poppins",
                                                            fontSize: "25px",
                                                            fontStyle: "normal",
                                                            fontWeight: "500",
                                                            lineHeight: "30px",
                                                        }}
                                                    >
                                                        Contact Information
                                                    </Typography>
                                                </div>
                                                <div className="Text-fields1">
                                                    <TextField
                                                        label="House No"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {}}
                                                    ></TextField>
                                                </div>
                                                <div className="other-fields1">
                                                    <TextField
                                                        label="Street Line 1"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setData({
                                                                ...data,
                                                                street_address1: event.target.value,
                                                            });
                                                        }}
                                                    ></TextField>
                                                </div>
                                                <div className="other-fields1">
                                                    <TextField
                                                        label="Street Line 2"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setData({
                                                                ...data,
                                                                street_address2: event.target.value,
                                                            });
                                                        }}
                                                    ></TextField>
                                                </div>
                                                <div className="Degree">
                                                    <Box sx={{ width: "100%", padding: "1%" }}>
                                                        <CustomDropdown
                                                            label={"Country"}
                                                            dropdowncss={{ width: "100%" }}
                                                            items={countryNames}
                                                            minwidthDropDown="300px"
                                                            activeItem={activeDropdown}
                                                            variant="standard"
                                                            handleChange={(listItems) => {
                                                                setActiveDropdown(listItems);
                                                                let response = countryValues.filter(
                                                                    (country) =>
                                                                        country?.country_name?.includes(
                                                                            listItems,
                                                                        ),
                                                                );
                                                                logger.debug("Selected country response:", response[0]?.country_id);
                                                                setData({
                                                                    ...data,
                                                                    country_id:
                                                                        response[0]?.country_id,
                                                                });
                                                                setSelectedCountryFromDropDown(
                                                                    response,
                                                                );
                                                            }}
                                                            // dropdowncss={{ width:"300px" }}
                                                        />
                                                    </Box>
                                                </div>
                                                <div className="Degree">
                                                    <Box sx={{ width: "100%", padding: "1%" }}>
                                                        <CustomDropdown
                                                            label={"State"}
                                                            dropdowncss={{ width: "100%" }}
                                                            items={stateNames}
                                                            minwidthDropDown="300px"
                                                            activeItem={stateName}
                                                            variant="standard"
                                                            handleChange={(listItems) => {
                                                                let response = stateValue.filter(
                                                                    (state) =>
                                                                        state?.state_name?.includes(
                                                                            listItems,
                                                                        ),
                                                                );
                                                                logger.debug("State ID:", response[0]?.state_id);
                                                                setData({
                                                                    ...data,
                                                                    state_id: response[0]?.state_id,
                                                                });
                                                                setSelectCityFromDropDown(response);
                                                                setStateName(listItems);
                                                            }}
                                                            // dropdowncss={{ width:"300px" }}
                                                        />
                                                    </Box>
                                                </div>

                                                <div className="Degree">
                                                    <Box sx={{ width: "100%", padding: "1%" }}>
                                                        <CustomDropdown
                                                            label={"City"}
                                                            dropdowncss={{ width: "100%" }}
                                                            items={cityNames}
                                                            minwidthDropDown="300px"
                                                            variant="standard"
                                                            activeItem={citySelected}
                                                            handleChange={(listItems) => {
                                                                setCitySelected(listItems);
                                                                let response = cityValues.filter(
                                                                    (city) =>
                                                                        city?.city_name?.includes(
                                                                            listItems,
                                                                        ),
                                                                );
                                                                setData({
                                                                    ...data,
                                                                    city_id: response[0]?.city_id,
                                                                });
                                                            }}
                                                            // dropdowncss={{ width:"300px" }}
                                                        />
                                                    </Box>
                                                </div>

                                                <div className="Degree">
                                                    <TextField
                                                        label="Zip Code"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setData({
                                                                ...data,
                                                                zip_code: event.target.value,
                                                            });
                                                        }}
                                                    ></TextField>
                                                </div>
                                            </Box>
                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={fetchData}
                                                    label="Save"
                                                    buttonCss={{
                                                        width: "33%",
                                                    }}
                                                    isDisabled={
                                                        data?.street_address1 != null &&
                                                        data?.country_id != null &&
                                                        data?.city_id != null &&
                                                        data?.state_id != null &&
                                                        data?.zip_code != null
                                                            ? false
                                                            : true
                                                    }
                                                >
                                                    {/* {activeStep === steps.length - 1
                                                        ? "Finish"
                                                        : "Next"} */}
                                                </CustomButton>
                                            </div>
                                        </div>
                                    </Box>
                                </>
                            ) : (
                                <h1>Completed</h1>
                            )}
                            ;
                        </Typography>
                        {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                        </Box> */}
                    </React.Fragment>
                )}
            </Box>
        </>
    );
};

export default PatientCompleteProfile;
