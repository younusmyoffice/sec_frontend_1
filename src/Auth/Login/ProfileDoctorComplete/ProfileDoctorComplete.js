import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "./ProfileDoctorComplete.scss";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../components/CustomButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ClassicFrame from "../../../static/images/DrImages/Undraw.png";
import ImageFrame from "../../../static/images/logos/Doctor_logo.png";
/**
 * DoctorCompleteProfile Component
 * 
 * Handles doctor profile completion for users with incomplete profiles after login.
 * Features:
 * - Multi-step form (6 steps)
 * - Personal information collection (name, gender, DOB)
 * - Address information (country, state, city, street)
 * - Professional credentials (qualification, speciality, department)
 * - License and certification details
 * - JWT token-based authentication
 * - Automatic token handling via axiosInstance
 * - Dynamic country/state/city/department dropdowns
 * - Doctor verification workflow with admin approval
 */

import axiosInstance from "../../../config/axiosInstance";
import CustomSnackBar from "../../../components/CustomSnackBar";
import VerificationLoader from "../../../components/VerificationLoader";
import useVerificationLoader from "../../../hooks/useVerificationLoader";
import { useNavigate } from "react-router-dom";
import logger from "../../../utils/logger"; // Added logger
import toastService from "../../../services/toastService"; // Added toastService

const steps = ["", "", "", "", "", ""];

const DoctorCompleteProfile = () => {
    // ============================================
    // State Management
    // ============================================
    
    // Gender dropdown options
    const [dropdownItems] = useState(["Male", "Female", "Others"]);
    const [activeDropdown, setActiveDropdown] = useState("");
    
    // Location data - Country dropdowns and selection
    const [selectedCountryFromDropDown, setSelectedCountryFromDropDown] = useState([]);
    const [countryValues, setCountryValue] = useState([]);
    const [countryNames, setCountryNames] = useState(["Please Wait"]);
    
    // Location data - State dropdowns and selection
    const [stateNames, setStateNames] = useState(["Please Wait"]);
    const [stateName, setStateName] = useState("");
    const [stateValue, setStateValue] = useState([]);
    
    // Location data - City dropdowns and selection
    const [selectCityFromDropDown, setSelectCityFromDropDown] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [citySelected, setCitySelected] = useState("");
    const [cityValues, setCityValues] = useState([]);
    
    // Multi-step form navigation
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    
    // Department/Specialization data
    const [departmentName, setDepartmentName] = useState([]);
    const [departmentValue, setDepartmentValue] = useState([]);
    const [departmentDropDown, setDepartmentDropdown] = useState("Specialization");
    
    // Flag to trigger profile data submission
    const [flagToSendDoctorData, setFlagToSendDoctorData] = useState(false);
    const [updateUserData, setUpdateUserData] = useState({
        suid: localStorage.getItem("doctor_suid"),
        email: localStorage.getItem("email"),
        first_name: null,
        last_name: null,
        middle_name: null,
        gender: null,
        DOB: null,
        country_id: null,
        state_id: null,
        city_id: null,
        street_address1: null,
        street_address2: null,
        zip_code: null,
        role_id: 3,
        qualification: null,
        university_name: null,
        qualified_year: null,
        speciality_id: null,
        degree: null,
        state_reg_number: null,
        country_reg_number: null,
        state_reg_date: null,
        country_reg_date: null,
        lic_title: null,
        lic_certificate_no: null,
        lic_issuedby: null,
        lic_date: null,
        lic_description: null,
    });
    const [updatedUserSuccesfully, setUpdatedUserSuccesfully] = useState("");
    const [showSnackBar, setShowSnackBar] = useState(false);
    const navigate = useNavigate();
    
    // ============================================
    // Verification Loader Hook
    // ============================================
    // Custom hook for doctor verification loader with admin approval workflow
    const {
        isLoading: isVerifying,           // Loader visibility state
        title,                            // Loader title text
        message: verificationMessage,      // Current verification message
        subMessage,                       // Sub-message/description
        showLoader,                       // Function to show loader
        hideLoader,                       // Function to hide loader
        updateMessage,                    // Function to update message dynamically
        showDoctorVerification            // Function to show doctor verification loader
    } = useVerificationLoader({
        progressColor: "#e72b49" // Brand color for progress indicator
    });

    // ============================================
    // Stepper Navigation Functions
    // ============================================
    
    /**
     * Check if a step is optional (skippable)
     * Currently, step 1 is optional
     */
    const isStepOptional = (step) => {
        return step === 1;
    };

    /**
     * Check if a step has been skipped
     * Skips are tracked in a Set to maintain unique values
     */
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    /**
     * Navigate to next step in the multi-step form
     * If current step was skipped, removes it from skipped set
     */
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    /**
     * Navigate to previous step in the multi-step form
     */
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    /**
     * Skip current step and move to next
     * Only works for optional steps (step 1)
     * Throws error if trying to skip non-optional step
     */
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

    /**
     * Reset stepper to first step
     */
    const handleReset = () => {
        setActiveStep(0);
    };

    // ============================================
    // useEffect Hooks
    // ============================================
    
    /**
     * Component mount - Fetch initial data and populate form
     * - Fetches countries list
     * - Fetches departments list
     * - Initializes form with doctor data from localStorage
     */
    useEffect(() => {
        FetchCountryNames();
        fetchDepartmentName();
        
        // Handle incomplete profile data from localStorage
        const doctorSuid = localStorage.getItem("doctor_suid");
        const doctorEmail = localStorage.getItem("email") || localStorage.getItem("login_Email");
        
        if (doctorSuid && doctorEmail) {
            setUpdateUserData(prevData => ({
                ...prevData,
                suid: doctorSuid,
                email: doctorEmail
            }));
        }
    }, []);

    /**
     * Fetch states when country selection changes
     * Triggers when user selects a country from dropdown
     */
    useEffect(() => {
        FetchStateNames(selectedCountryFromDropDown[0]?.country_id);
    }, [selectedCountryFromDropDown]);

    /**
     * Fetch cities when state selection changes
     * Triggers when user selects a state from dropdown
     */
    useEffect(() => {
        FetchCityNames(selectCityFromDropDown[0]?.state_id);
    }, [selectCityFromDropDown]);

    // ============================================
    // API Functions - Data Fetching
    // ============================================
    
    /**
     * Fetch country names from API
     * Populates country dropdown with available countries
     */
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

    /**
     * Fetch state names from API based on selected country
     * Populates state dropdown with states for the selected country
     */
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

    /**
     * Fetch city names from API based on selected state
     * Populates city dropdown with cities for the selected state
     */
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

    /**
     * Fetch department names from API
     * Populates department/specialization dropdown
     */
    const fetchDepartmentName = async () => {
        let DepartmentValues = [];
        let DepartmentName = [];
        try {
            const response = await axiosInstance("/sec/departments");
            logger.debug("Departments response:", response?.data?.response);

            for (let key in response?.data?.response) {
                DepartmentValues.push(response?.data?.response[key]);
                DepartmentName.push(response?.data?.response[key].department_name);
            }
            setDepartmentName(DepartmentName);
            setDepartmentValue(DepartmentValues);
        } catch (err) {
            logger.error("Department fetch error:", err);
        }
    };

    logger.debug("User data updated:", updateUserData);

    // Send doctor profile data when flag is set to true
    useEffect(() => {
        if (flagToSendDoctorData) {
            PostUserData();
        }
    }, [flagToSendDoctorData]);

    // ============================================
    // API Functions - Profile Submission
    // ============================================
    
    /**
     * Submit doctor profile data to backend
     * Handles both admin approval required and direct verification scenarios
     * Shows verification loader with dynamic messages
     * Displays success/error notifications via snackbar and toast
     */
    const PostUserData = async () => {
        setFlagToSendDoctorData(false);
        
        // Ensure we have the required data for incomplete profiles
        const doctorSuid = localStorage.getItem("doctor_suid");
        const doctorEmail = localStorage.getItem("email") || localStorage.getItem("login_Email");
        
        // Prepare the data with fallbacks
        const dataToSend = {
            ...updateUserData,
            suid: updateUserData.suid || doctorSuid,
            email: updateUserData.email || doctorEmail
        };
        
        logger.info("Sending doctor profile data:", dataToSend);
        
        // Show verification loading popup with custom loader
        showDoctorVerification();
        
        try {
            // Use axiosInstance - automatically includes JWT token
            // Located in: config/axiosInstance.js (axios interceptor)
            // Token is read from localStorage and attached to Authorization header
            const response = await axiosInstance.post(
                "/sec/auth/updateProfile",
                JSON.stringify(dataToSend),
            );
            
            // ============================================
            // Handle Response Based on Verification Status
            // ============================================
            
            // Check if admin approval is required (verification workflow)
            if (response.data?.response?.message === "ADMIN_APPROVAL_REQUIRED") {
                logger.info("Profile submitted - admin approval required");
                
                // Update loader message to show admin approval status
                updateMessage({
                    message: "Doctor verification pending admin approval...",
                    subMessage: "Your profile has been submitted for review"
                });
                
                // Show success toast notification
                toastService.success("Profile submitted for verification!");
                
                // Keep the popup open for a bit longer to show the message
                setTimeout(() => {
                    hideLoader();
                    setUpdatedUserSuccesfully("Profile submitted for verification 🙂");
                    setShowSnackBar(true);
                    handleNext(); // Navigate to next step
                }, 2000);
            } else {
                // ============================================
                // Direct Verification Successful
                // ============================================
                logger.info("Profile completed successfully");
                
                // Update loader message to show successful verification
                updateMessage({
                    message: "Doctor verification successful!",
                    subMessage: "Your profile has been verified and activated"
                });
                
                // Show success toast notification
                toastService.success("Profile completed successfully!");
                
                setTimeout(() => {
                    hideLoader();
                    setUpdatedUserSuccesfully("Profile Completed 🙂");
                    setShowSnackBar(true);
                    handleNext(); // Navigate to next step
                }, 2000);
            }
            
            logger.info("Profile data sent successfully:", response);
        } catch (err) {
            // ============================================
            // Error Handling with Specific Error Codes
            // ============================================
            logger.error("Error sending profile data:", err);
            logger.error("Error response:", err?.response?.data);
            
            // Parse error codes from backend and provide user-friendly messages
            let errorMessage = "Failed to update profile. Please try again.";
            
            if (err?.response?.data?.error) {
                const errorCode = err.response.data.error;
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
                    case "INCOMPLETE_DATA":
                        errorMessage = "Please complete all required fields.";
                        break;
                    default:
                        errorMessage = errorCode || errorMessage;
                }
            }
            
            // Hide loader and show error notifications
            hideLoader();
            toastService.error(errorMessage);
            setShowSnackBar(true);
            setFlagToSendDoctorData(false);
        }
    };

    // Debug logs for validation (only in development)
    logger.debug("Update user data validation:", {
        departmentName,
        departmentValue,
        hasRequiredFields: updateUserData.first_name != null &&
            updateUserData.middle_name != null &&
            updateUserData.last_name != null &&
            updateUserData.DOB != null &&
            updateUserData.gender != null,
        firstNameExists: updateUserData.first_name != null,
        firstNameMissing: updateUserData.first_name === null
    });

    return (
        <>
            <CustomSnackBar
                isOpen={showSnackBar}
                actionLabel={""}
                // handleAction={() => setShowSnack(false)}
                message={updatedUserSuccesfully}
                type="success"
            />
            
            {/* Doctor Verification Loading Dialog */}
            <VerificationLoader
                open={isVerifying}
                title={title}
                message={verificationMessage}
                subMessage={subMessage}
                progressColor="#e72b49"
                progressSize={60}
                progressThickness={4}
            />
            
            <Box sx={{ width: "100%" }}>
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
                        <Box sx={{ width: "100%" }}>
                            <div className="imge-cont">
                                <div className="card-cont1">
                                    <div className="card1">
                                        <div className="last-image">
                                            <Box
                                                sx={{ width: "222px", height: "252px" }}
                                                component={"img"}
                                                src={ClassicFrame}
                                            ></Box>
                                        </div>
                                        <div className="greetings1">
                                            <Typography
                                                style={{
                                                    color: "#313033",
                                                    fontFamily: "poppins",
                                                    fontSize: "16px",
                                                    fontStyle: "normal",
                                                    fontWeight: "600",
                                                    lineHeight: "24px",
                                                }}
                                            >
                                                Your choice to register with us fills us with
                                                immense gratitude
                                            </Typography>
                                        </div>
                                        <div className="note1">
                                            <Typography
                                                style={{
                                                    color: "#939094",
                                                    fontFamily: "poppins",
                                                    fontSize: "14px",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    lineHeight: "21px",
                                                    letterSpacing: "0.07px",
                                                }}
                                            >
                                                Proceed to the login page to embark upon thy journey
                                                henceforth
                                            </Typography>
                                        </div>
                                        <div className="done-btn1">
                                            <CustomButton
                                                label="Proceed to Login, where your adventure awaits"
                                                handleClick={() => navigate("/doctorlogin")}
                                                buttonCss={{
                                                    width: "270px",
                                                    borderRadius: "20px",
                                                }}
                                            >
                                                Done
                                            </CustomButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {/* Step {activeStep + 1} */}
                            {activeStep === 0 ? (
                                <>
                                    <Box>
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
                                                        Personal Information
                                                    </Typography>
                                                </div>
                                                <div className="Text-fields1">
                                                    <TextField
                                                        label="First Name"
                                                        variant="standard"
                                                        style={{
                                                            width: "50%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                first_name: event.target.value,
                                                            });
                                                        }}
                                                        value={updateUserData?.first_name}
                                                        required={true}
                                                    ></TextField>
                                                    <TextField
                                                        label="Middle Name"
                                                        variant="standard"
                                                        style={{
                                                            width: "50%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                middle_name: event.target.value,
                                                            });
                                                        }}
                                                        value={updateUserData?.middle_name}
                                                    ></TextField>
                                                </div>
                                                <div className="other-fields1">
                                                    <TextField
                                                        label="Last Name"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                last_name: event.target.value,
                                                            });
                                                        }}
                                                        value={updateUserData?.last_name}
                                                        required={true}
                                                    ></TextField>
                                                </div>
                                                <div className="Date-of-birth1">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Date of Birth"
                                                            value={updateUserData.DOB ? dayjs(updateUserData.DOB) : null}
                                                            onChange={(value) => {
                                                                if (value) {
                                                                    setUpdateUserData({
                                                                        ...updateUserData,
                                                                        DOB: value.format('YYYY-MM-DD'),
                                                                    });
                                                                } else {
                                                                    setUpdateUserData({
                                                                        ...updateUserData,
                                                                        DOB: null,
                                                                    });
                                                                }
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    required: true,
                                                                    variant: "standard",
                                                                    fullWidth: true,
                                                                },
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                <div className="gender1">
                                                    <CustomDropdown
                                                        label={"Gender"}
                                                        items={dropdownItems}
                                                        activeItem={updateUserData?.gender}
                                                        variant="standard"
                                                        handleChange={(item) =>
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                gender: item,
                                                            })
                                                        }
                                                        dropdowncss={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                    />
                                                </div>
                                            </Box>
                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={handleNext}
                                                    label="Next"
                                                    buttonCss={{
                                                        width: "30%",
                                                    }}
                                                    isDisabled={
                                                        updateUserData.first_name != null &&
                                                        updateUserData.last_name != null &&
                                                        updateUserData.DOB != null &&
                                                        updateUserData.gender != null
                                                            ? false
                                                            : true
                                                    }
                                                >
                                                    {activeStep === steps.length - 1
                                                        ? "Finish"
                                                        : "Next"}
                                                </CustomButton>
                                            </div>
                                        </div>
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
                                                        Qualification Information
                                                    </Typography>
                                                </div>
                                                <div className="Text-fields1">
                                                    <TextField
                                                        label="Qualification"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                qualification: event.target.value,
                                                            });
                                                        }}
                                                        value={ updateUserData?.qualification
                                                        }
                                                        required={true}
                                                    ></TextField>
                                                </div>
                                                <div className="other-fields1">
                                                    <TextField
                                                        label="University"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                university_name: event.target.value,
                                                            });
                                                        }}
                                                        value={
                                                            updateUserData?.university_name
                                                        }
                                                        required={true}
                                                    ></TextField>
                                                </div>
                                                <div className="Date-of-birth1">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Year of Passing"
                                                            value={updateUserData.qualified_year ? dayjs(updateUserData.qualified_year, 'YYYY') : null}
                                                            onChange={(value) => {
                                                                if (value) {
                                                                    setUpdateUserData({
                                                                        ...updateUserData,
                                                                        qualified_year: value.format('YYYY'),
                                                                    });
                                                                } else {
                                                                    setUpdateUserData({
                                                                        ...updateUserData,
                                                                        qualified_year: null,
                                                                    });
                                                                }
                                                            }}
                                                            views={['year']}
                                                            slotProps={{
                                                                textField: {
                                                                    required: true,
                                                                    variant: "standard",
                                                                    fullWidth: true,
                                                                },
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                <div className="Degree">
                                                    <TextField
                                                        label="Degree"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                degree: event.target.value,
                                                            });
                                                        }}
                                                        value={updateUserData?.degree}
                                                        required={true}
                                                    ></TextField>
                                                </div>
                                                <div className="gender1">
                                                    <Box sx={{ width: "100%" }}>
                                                        <CustomDropdown
                                                            label={"Specialist"}
                                                            dropdowncss={{ width: "100%" }}
                                                            items={departmentName}
                                                            minwidthDropDown="300px"
                                                            activeItem={activeDropdown}
                                                            variant="standard"
                                                            handleChange={(listItems) => {
                                                                setActiveDropdown(listItems);
                                                                let response =
                                                                    departmentValue.filter(
                                                                        (country) =>
                                                                            country?.department_name?.includes(
                                                                                listItems,
                                                                            ),
                                                                    );
                                                                logger.debug("Specialist department ID:", response[0]?.department_id);
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    speciality_id:
                                                                        response[0]?.department_id,
                                                                });
                                                            }}
                                                        />
                                                    </Box>
                                                </div>
                                            </Box>

                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={handleNext}
                                                    label="Next"
                                                    buttonCss={{
                                                        width: "30%",
                                                    }}
                                                    isDisabled={
                                                        updateUserData?.qualification != null &&
                                                        updateUserData?.university_name != null &&
                                                        updateUserData?.qualified_year != null &&
                                                        updateUserData?.degree != null &&
                                                        updateUserData?.speciality_id != null
                                                            ? false
                                                            : true
                                                    }
                                                >
                                                    {activeStep === steps.length - 1
                                                        ? "Finish"
                                                        : "Next"}
                                                </CustomButton>
                                            </div>
                                        </div>
                                    </Box>
                                </>
                            ) : activeStep === 2 ? (
                                <>
                                    <div className="mainBox1">
                                        {/* <div className="back-btn">
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div> */}
                                        <Box sx={{ width: " 40%" }}>
                                            <div className="Doc-heading">
                                                <Typography
                                                    style={{
                                                        fontFamily: "poppins",
                                                        fontSize: "25px",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        lineHeight: "30px",
                                                    }}
                                                >
                                                    Doctor's Professional Information
                                                </Typography>
                                            </div>
                                            <div className="Text-fields1">
                                                <TextField
                                                    label="State Registration No"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            state_reg_number: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.state_reg_number}
                                                    required={true}
                                                ></TextField>
                                            </div>
                                            <div className="reg-date1">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="State Registration Date"
                                                        value={updateUserData.state_reg_date ? dayjs(updateUserData.state_reg_date) : null}
                                                        onChange={(value) => {
                                                            if (value) {
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    state_reg_date: value.format('YYYY-MM-DD'),
                                                                });
                                                            } else {
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    state_reg_date: null,
                                                                });
                                                            }
                                                        }}
                                                        slotProps={{
                                                            textField: {
                                                                required: true,
                                                                variant: "standard",
                                                                fullWidth: true,
                                                            },
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </div>

                                            <div className="indian-reg-no">
                                                <TextField
                                                    label="Country Registration No"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            country_reg_number: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.country_reg_number}
                                                    required={true}
                                                ></TextField>
                                            </div>

                                            <div className="Registration-date">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Country Registration Date"
                                                        value={updateUserData.country_reg_date ? dayjs(updateUserData.country_reg_date) : null}
                                                        onChange={(value) => {
                                                            if (value) {
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    country_reg_date: value.format('YYYY-MM-DD'),
                                                                });
                                                            } else {
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    country_reg_date: null,
                                                                });
                                                            }
                                                        }}
                                                        slotProps={{
                                                            textField: {
                                                                required: true,
                                                                variant: "standard",
                                                                fullWidth: true,
                                                            },
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </Box>
                                        <div className="sve-btn">
                                            <CustomButton
                                                handleClick={handleNext}
                                                label="Next"
                                                buttonCss={{
                                                    width: "30%",
                                                }}
                                                isDisabled={
                                                    updateUserData?.state_reg_number != null &&
                                                    updateUserData?.state_reg_date != null &&
                                                    updateUserData?.country_reg_number != null &&
                                                    updateUserData?.country_reg_date != null
                                                        ? false
                                                        : true
                                                }
                                            >
                                                {activeStep === steps.length - 1
                                                    ? "Finish"
                                                    : "Next"}
                                            </CustomButton>
                                        </div>
                                    </div>
                                </>
                            ) : activeStep === 3 ? (
                                <>
                                    <div className="mainBox1">
                                        <Box sx={{ width: " 40%" }}>
                                            <div className="heading">
                                                <Typography
                                                    style={{
                                                        fontFamily: "poppins",
                                                        fontSize: "25px",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        lineHeight: "30px",
                                                    }}
                                                >
                                                    Clinic Information
                                                </Typography>
                                            </div>

                                            <div className="Text-fieldscss">
                                                <TextField
                                                    label="Street Line1"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            street_address1: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.street_address1}
                                                    required={true}
                                                ></TextField>
                                            </div>
                                            <div className="reg-date">
                                                <TextField
                                                    label="Street Line2"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            street_address2: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.street_address2}
                                                    required={true}
                                                ></TextField>
                                            </div>

                                            <div className="gender2">
                                                <Box sx={{ width: "100%" }}>
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
                                                            // console.log(
                                                            //     "Country response : ",
                                                            //     response[0]?.country_id,
                                                            // );
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                country_id: response[0]?.country_id,
                                                            });
                                                            setSelectedCountryFromDropDown(
                                                                response,
                                                            );
                                                        }}
                                                        // dropdowncss={{ width:"300px" }}
                                                    />
                                                </Box>
                                            </div>

                                            <div className="gender2">
                                                <Box sx={{ width: "100%" }}>
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
                                                            // console.log("State ID : " , response[0].state_id)
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                state_id: response[0]?.state_id,
                                                            });
                                                            setSelectCityFromDropDown(response);
                                                            setStateName(listItems);
                                                        }}
                                                        // dropdowncss={{ width:"300px" }}
                                                    />
                                                </Box>
                                            </div>

                                            <div className="gender2">
                                                <Box sx={{ width: "100%" }}>
                                                    <CustomDropdown
                                                        label={"City"}
                                                        dropdowncss={{ width: "100%" }}
                                                        items={cityNames}
                                                        minwidthDropDown="300px"
                                                        activeItem={citySelected}
                                                        variant="standard"
                                                        handleChange={(listItems) => {
                                                            setCitySelected(listItems);
                                                            let response = cityValues.filter(
                                                                (city) =>
                                                                    city?.city_name?.includes(
                                                                        listItems,
                                                                    ),
                                                            );
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                city_id: response[0]?.city_id,
                                                            });
                                                        }}
                                                        // dropdowncss={{ width:"300px" }}
                                                    />
                                                </Box>
                                            </div>

                                            <div className="Registration-date">
                                                <TextField
                                                    label="Zip Code"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            zip_code: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.zip_code}
                                                    required={true}
                                                ></TextField>
                                            </div>
                                        </Box>
                                    </div>

                                    <div className="sve-btn">
                                        <CustomButton
                                            handleClick={handleNext}
                                            label="Next"
                                            buttonCss={{
                                                width: "30%",
                                            }}
                                            isDisabled={
                                                updateUserData?.street_address1 != null &&
                                                updateUserData?.country_id != null &&
                                                updateUserData?.state_id != null &&
                                                updateUserData?.city_id != null &&
                                                updateUserData?.zip_code != null
                                                    ? false
                                                    : true
                                            }
                                        >
                                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                        </CustomButton>
                                    </div>
                                    {/* <div className="skip-btn">
                                        <CustomButton
                                            label="Skip"
                                            isTransaprent={"True"}
                                            isStepOptional
                                            handleClick={handleSkip}
                                            buttonCss={{
                                                width: "30%",
                                            }}
                                        ></CustomButton>
                                    </div> */}
                                </>
                            ) : activeStep === 4 ? (
                                <>
                                    <div className="mainBox1">
                                        {/* <div className="back-btn">
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div> */}
                                        <Box sx={{ width: "40%" }}>
                                            <div className="Doc-heading">
                                                <Typography
                                                    style={{
                                                        fontFamily: "poppins",
                                                        fontSize: "25px",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        lineHeight: "30px",
                                                    }}
                                                >
                                                    Doctor's License Information
                                                </Typography>
                                            </div>
                                            <div className="Text-fields1">
                                                <TextField
                                                    label="License Title"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            lic_title: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.lic_title}
                                                    required={true}
                                                ></TextField>
                                            </div>
                                            <div className="indian-reg-no">
                                                <TextField
                                                    label="License Certificate Number"
                                                    variant="standard"
                                                    type="number"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            lic_certificate_no: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.lic_certificate_no}
                                                    required={true}
                                                ></TextField>
                                            </div>

                                            <div className="indian-reg-no">
                                                <TextField
                                                    label="License Issued By"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            lic_issuedby: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.lic_issuedby}
                                                    required={true}
                                                ></TextField>
                                            </div>

                                            <div className="Registration-date">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="License Issue Date"
                                                        value={updateUserData.lic_date ? dayjs(updateUserData.lic_date) : null}
                                                        onChange={(value) => {
                                                            if (value) {
                                                                const formattedDate = value.format('YYYY-MM-DD');
                                                                logger.debug("License issue date:", formattedDate);
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    lic_date: formattedDate,
                                                                });
                                                            } else {
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    lic_date: null,
                                                                });
                                                            }
                                                        }}
                                                        slotProps={{
                                                            textField: {
                                                                required: true,
                                                                variant: "standard",
                                                                fullWidth: true,
                                                            },
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            <div className="Registration-date">
                                                <TextField
                                                    label="License Description"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            lic_description: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.lic_description}
                                                    required={true}
                                                ></TextField>
                                            </div>
                                        </Box>
                                        <div className="sve-btn">
                                            <CustomButton
                                                handleClick={() => {
                                                    setFlagToSendDoctorData(true);
                                                }}
                                                label="Submit"
                                                buttonCss={{
                                                    width: "30%",
                                                }}
                                                isDisabled={
                                                    updateUserData?.lic_title != null &&
                                                    updateUserData?.lic_certificate_no != null &&
                                                    updateUserData?.lic_issuedby != null &&
                                                    updateUserData?.lic_date != null &&
                                                    updateUserData?.lic_description != null
                                                        ? false
                                                        : true
                                                }
                                            >
                                                {activeStep === steps.length - 1
                                                    ? "Finish"
                                                    : "Next"}
                                            </CustomButton>
                                        </div>
                                    </div>
                                </>
                            ) : activeStep === 5 ? (
                                <Box sx={{ width: "100%" }}>
                                    <div className="imge-cont">
                                        <div className="card-cont1">
                                            <div className="card1">
                                                <div className="last-image">
                                                    <Box
                                                        sx={{ width: "222px", height: "252px" }}
                                                        component={"img"}
                                                        src={ClassicFrame}
                                                    ></Box>
                                                </div>
                                                <div className="greetings1">
                                                    <Typography
                                                        style={{
                                                            color: "#313033",
                                                            fontFamily: "poppins",
                                                            fontSize: "16px",
                                                            fontStyle: "normal",
                                                            fontWeight: "600",
                                                            lineHeight: "24px",
                                                        }}
                                                    >
                                                        Your choice to register with us fills us
                                                        with immense gratitude
                                                    </Typography>
                                                </div>
                                                <div className="note1">
                                                    <Typography
                                                        style={{
                                                            color: "#939094",
                                                            fontFamily: "poppins",
                                                            fontSize: "14px",
                                                            fontStyle: "normal",
                                                            fontWeight: "400",
                                                            lineHeight: "21px",
                                                            letterSpacing: "0.07px",
                                                        }}
                                                    >
                                                        Proceed to the login page to embark upon thy
                                                        journey henceforth
                                                    </Typography>
                                                </div>
                                                <div className="done-btn1">
                                                    <CustomButton
                                                        label="Proceed to Login, where your adventure awaits"
                                                        handleClick={() => navigate("/doctorlogin")}
                                                        buttonCss={{
                                                            width: "270px",
                                                            borderRadius: "20px",
                                                        }}
                                                    >
                                                        Done
                                                    </CustomButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            ) : (
                                
                                <CustomButton
                                handleClick={() => navigate("/doctorlogin")}
                                >
<h1>Completed</h1>
                                </CustomButton>
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

export default DoctorCompleteProfile;
