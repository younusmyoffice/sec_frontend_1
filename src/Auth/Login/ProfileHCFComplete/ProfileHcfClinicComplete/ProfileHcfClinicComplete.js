/**
 * HcfClinicCompleteProfile Component
 * 
 * Handles clinic profile completion for users with incomplete profiles after login.
 * Features:
 * - Multi-step form (6 steps)
 * - Personal information collection (name, gender, DOB)
 * - Address information (country, state, city, street)
 * - Professional credentials (qualification, speciality, department)
 * - License and certification details
 * - JWT token-based authentication
 * - Automatic token handling via axiosInstance
 * - Dynamic country/state/city/department dropdowns
 * - Universal loading component
 * - Enhanced error handling
 */

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "./ProfileHcfClinicComplete.scss";
import Typography from "@mui/material/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { TextField } from "@mui/material";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CustomTextField from "../../../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../../components/CustomButton";
import ClassicFrame from "../../../../static/images/DrImages/Undraw.png";
import ImageFrame from "../../../../static/images/logos/clinic_logo.png";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logger from "../../../../utils/logger"; // Added logger
import toastService from "../../../../services/toastService"; // Added toastService
import Loading from "../../../../components/Loading"; // Added Loading component
import { getCurrentUser, getCurrentUserId, getCurrentRoleId, getCurrentUserEmail } from "../../../../utils/jwtUtils"; // Added for JWT utilities

const steps = ["", "", "", "", "", ""];

const HcfClinicCompleteProfile = () => {
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    
    // Gender dropdown options
    const [dropdownItems] = useState(["Male", "Female", "Others"]);
    const [activeDropdown, setActiveDropdown] = useState("");
    
    // Generate year options for Year of Passing dropdown (1950 to current year + 5)
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1950 + 6 }, (_, i) => (1950 + i).toString()).reverse();
    const [selectedCountryFromDropDown, setSelectedCountryFromDropDown] = useState([]);
    const [countryValues, setCountryValue] = useState([]);
    const [countryNames, setCountryNames] = useState(["Please Wait"]);
    const [stateNames, setStateNames] = useState(["Please Wait"]);
    const [stateName, setStateName] = useState("");
    const [stateValue, setStateValue] = useState([]);
    const [selectCityFromDropDown, setSelectCityFromDropDown] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [citySelected, setCitySelected] = useState("");
    const [cityValues, setCityValues] = useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [departmentName, setDepartmentName] = useState([]);
    const [departmentValue, setDepartmentValue] = useState([]);
    const [departmentDropDown, setDepartmentDropdown] = useState("Specialization");
    const [skipped, setSkipped] = React.useState(new Set());
    const [flagToSendDoctorData, setFlagToSendDoctorData] = useState(false);
    const [updateUserData, setUpdateUserData] = useState({
        // suid: localStorage.getItem("doctor_suid"),
        email: localStorage.getItem("clinic_Email") || Cookies.get("clinicEmail") || "",
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
        role_id: 6,
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
        council_name: null,
        business_name: null,
    });
    const [updatedUserSuccesfully, setUpdatedUserSuccesfully] = useState("");
    const [showSnackBar, setShowSnackBar] = useState(false);
    
    // Loading state for API operations
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

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

    useEffect(() => {
        FetchCountryNames();
        fetchDepartmentName();
    }, []);

    // run the api call when there is change in country drop down
    useEffect(() => {
        FetchStateNames(selectedCountryFromDropDown[0]?.country_id);
    }, [selectedCountryFromDropDown]);

    // run the api to fetch the city details
    useEffect(() => {
        FetchCityNames(selectCityFromDropDown[0]?.state_id);
    }, [selectCityFromDropDown]);

    //API call to fetch the country names
    const FetchCountryNames = async () => {
        let CountryValues = [];
        let CountryName = [];
        try {
            logger.info("Fetching country names...");
            const response = await axiosInstance("/sec/countries");
            logger.info("Countries fetched successfully:", response?.data?.response?.length || 0, "countries");
            for (let key in response?.data?.response) {
                CountryValues.push(response?.data?.response[key]);
                CountryName.push(response?.data?.response[key].country_name);
            }
            setCountryNames(CountryName);
            setCountryValue(CountryValues);
        } catch (error) {
            logger.error("Error fetching countries:", error);
            logger.error("Error response:", error?.response?.data);
            toastService.error("Failed to fetch countries. Please try again.");
        }
    };

    // to fetch the state names
    const FetchStateNames = async (country_id) => {
        let StateValues = [];
        let StateName = [];
        try {
            logger.info("Fetching state names for country_id:", country_id);
            const response = await axiosInstance(`/sec/states?country_id=${country_id}`);
            logger.info("States fetched successfully:", response?.data?.response?.length || 0, "states");
            for (let key in response?.data?.response) {
                StateValues.push(response?.data?.response[key]);
                StateName.push(response?.data?.response[key].state_name);
            }
            setStateValue(StateValues);
            setStateNames(StateName);
        } catch (error) {
            logger.error("Error fetching states:", error);
            logger.error("Error response:", error?.response?.data);
            toastService.error("Failed to fetch states. Please try again.");
        }
    };

    const FetchCityNames = async (state_id) => {
        let CityValues = [];
        let cityName = [];
        try {
            logger.info("Fetching city names for state_id:", state_id);
            const response = await axiosInstance(`/sec/cities?state_id=${state_id}`);
            logger.info("Cities fetched successfully:", response?.data?.response?.length || 0, "cities");
            for (let key in response?.data?.response) {
                CityValues.push(response?.data?.response[key]);
                cityName.push(response?.data?.response[key].city_name);
            }
            setCityValues(CityValues);
            setCityNames(cityName);
        } catch (error) {
            logger.error("Error fetching cities:", error);
            logger.error("Error response:", error?.response?.data);
            toastService.error("Failed to fetch cities. Please try again.");
        }
    };

    const fetchDepartmentName = async () => {
        let DepartmentValues = [];
        let DepartmentName = [];
        try {
            logger.info("Fetching department names...");
            const response = await axiosInstance("/sec/departments");
            logger.info("Departments fetched successfully:", response?.data?.response?.length || 0, "departments");

            for (let key in response?.data?.response) {
                DepartmentValues.push(response?.data?.response[key]);
                DepartmentName.push(response?.data?.response[key].department_name);
            }
            setDepartmentName(DepartmentName);
            setDepartmentValue(DepartmentValues);
        } catch (err) {
            logger.error("Error fetching departments:", err);
            logger.error("Error response:", err?.response?.data);
            toastService.error("Failed to fetch departments. Please try again.");
        }
    };

    // Debug logs for profile data (development only)
    logger.debug("user data : ", updateUserData);
    logger.debug("Email from localStorage:", localStorage.getItem("clinic_Email"));
    logger.debug("Email from cookies:", Cookies.get("clinicEmail"));
    logger.debug("Final email value:", updateUserData.email);

    useEffect(() => {
        if (flagToSendDoctorData) {
            PostUserData();
        }
    }, [flagToSendDoctorData]);

    /**
     * PostUserData - Submits clinic profile data to backend
     * 
     * This function:
     * 1. Uses axiosInstance which automatically adds JWT token from localStorage
     * 2. Sends profile completion data
     * 3. Handles success with navigation to next step
     * 4. Handles errors with user-friendly messages
     * 
     * Token Handling:
     * - axiosInstance automatically reads "access_token" from localStorage
     * - Adds token to Authorization header: "Bearer <access_token>"
     * - REUSABLE across entire application - no manual token management
     * - Location: config/axiosInstance.js (request interceptor)
     */
    const PostUserData = async () => {
        setFlagToSendDoctorData(false);
        setIsLoading(true); // Show loading overlay
        try {
            logger.info("Submitting clinic profile data:", updateUserData);
            
            // axiosInstance automatically adds JWT token from localStorage
            // No manual token management needed - see config/axiosInstance.js
            const response = await axiosInstance.post(
                "/sec/auth/updateProfile",
                JSON.stringify(updateUserData),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            
            logger.info("Profile update successful:", response);
            setUpdatedUserSuccesfully("Profile Completed 🙂");
            setShowSnackBar(true);
            toastService.success("Profile completed successfully! 🎉");
            setFlagToSendDoctorData(false);
            handleNext();
        } catch (err) {
            logger.error("Error sending profile data:", err);
            logger.error("Error response:", err?.response?.data);
            
            // Parse error codes and provide user-friendly messages
            let errorMsg = "Failed to complete profile. Please try again.";
            
            if (err?.response?.data?.error) {
                const errorCode = err.response.data.error;
                switch (errorCode) {
                    case "VALIDATION_ERROR":
                        errorMsg = "Please fill in all required fields correctly.";
                        break;
                    case "UNAUTHORIZED":
                        errorMsg = "Session expired. Please login again.";
                        break;
                    case "PROFILE_NOT_FOUND":
                        errorMsg = "Profile not found. Please contact support.";
                        break;
                    case "INCOMPLETE_DATA":
                        errorMsg = "Please provide all required information.";
                        break;
                    default:
                        errorMsg = errorCode || errorMsg;
                }
            }
            
            setShowSnackBar(false);
            setFlagToSendDoctorData(false);
            toastService.error(errorMsg);
        } finally {
            setIsLoading(false); // Hide loading overlay
        }
    };

    // Debug logs for validation (development only)
    logger.debug(
        "True or false ",
        updateUserData.first_name != null &&
        updateUserData.middle_name != null &&
        updateUserData.last_name != null &&
        updateUserData.DOB != null &&
        updateUserData.gender != null,
    );
    logger.debug("True or false ", updateUserData.first_name != null);
    logger.debug("True or false ", updateUserData.first_name === null);

    return (
        <>
            {/* Loading overlay for API operations - shows while profile is being saved */}
            {isLoading && (
                <Loading
                    variant="overlay"
                    size="large"
                    message="Saving Your Profile"
                    subMessage="Please wait while we save your clinic information..."
                    fullScreen
                />
            )}
            
            {/* Success/Error snackbar - shows feedback messages */}
            <CustomSnackBar
                isOpen={showSnackBar}
                actionLabel={""}
                // handleAction={() => setShowSnack(false)}
                message={updatedUserSuccesfully}
                type="success"
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
                                    <Step key={index} {...stepProps}>
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
                                                handleClick={() => navigate("/clinicLogin")}
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
                                                    <Box sx={{ flex: 1 }}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                label="Date of Birth"
                                                                value={updateUserData?.DOB ? dayjs(updateUserData.DOB) : null}
                                                                onChange={(value) => {
                                                                    console.log(value);
                                                                    setUpdateUserData({
                                                                        ...updateUserData,
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
                                                                                borderBottomColor: "#e72b4a"
                                                                            },
                                                                            "& .MuiInput-underline:after": {
                                                                                borderBottomColor: "#e72b4a"
                                                                            }
                                                                        }
                                                                    },
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                    </Box>

                                                </div>
                                                <div className="gender1">
                                                    <CustomDropdown
                                                        label={"Gender"}
                                                        items={dropdownItems}
                                                        variant="standard"
                                                        activeItem={updateUserData?.gender || ""}
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
                                                        value={
                                                            updateUserData?.qualification === null
                                                                ? ""
                                                                : updateUserData?.qualification
                                                        }
                                                        required={true}
                                                    ></TextField>
                                                </div>
                                                <div className="Text-fields1">
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
                                                            updateUserData?.university_name === null
                                                                ? ""
                                                                : updateUserData?.university_name
                                                        }
                                                        required={true}
                                                    ></TextField>
                                                </div>
                                                <div className="Date-of-birth1">
                                                    <Box sx={{ flex: 1 }}>
                                                        <CustomDropdown
                                                            label="Year of Passing"
                                                            items={yearOptions}
                                                            variant="standard"
                                                            activeItem={updateUserData?.qualified_year || ""}
                                                            handleChange={(year) => {
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    qualified_year: year,
                                                                });
                                                            }}
                                                            dropdowncss={{
                                                                width: "100%",
                                                                color: "#787579",
                                                            }}
                                                        />
                                                    </Box>
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
                                                            variant="standard"
                                                            items={departmentName}
                                                            minwidthDropDown="300px"
                                                            activeItem={activeDropdown}
                                                            handleChange={(listItems) => {
                                                                setActiveDropdown(listItems);
                                                                let response =
                                                                    departmentValue.filter(
                                                                        (country) =>
                                                                            country?.department_name?.includes(
                                                                                listItems,
                                                                            ),
                                                                    );
                                                                console.log(
                                                                    "speacilist ID : ",
                                                                    response[0]?.department_id,
                                                                );
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
                                                            value={updateUserData?.state_reg_date ? dayjs(updateUserData.state_reg_date) : null}
                                                            onChange={(newValue) =>
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    state_reg_date: `${newValue?.$y
                                                                        }-${Number(newValue?.$M) + 1}-${newValue?.$D
                                                                        }`,
                                                                })
                                                            }
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
                                                                            borderBottomColor: "#e72b4a"
                                                                        },
                                                                        "& .MuiInput-underline:after": {
                                                                            borderBottomColor: "#e72b4a"
                                                                        }
                                                                    }
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
                                                            value={updateUserData?.country_reg_date ? dayjs(updateUserData.country_reg_date) : null}
                                                            onChange={(newValue) =>
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    country_reg_date: `${newValue?.$y
                                                                        }-${Number(newValue?.$M) + 1}-${newValue?.$D
                                                                        }`,
                                                                })
                                                            }
                                                            slotProps={{
                                                                textField: {
                                                                    required: true,
                                                                    variant: "standard",
                                                                    fullWidth: true,
                                                                },
                                                                sx: {
                                                                    "& .MuiInputLabel-root": {
                                                                        color: "#787579",
                                                                        fontFamily: "Poppins, sans-serif"
                                                                    },
                                                                },
                                                                "& .MuiInput-underline:before": {
                                                                    borderBottomColor: "#e0e0e0"
                                                                },
                                                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                                    borderBottomColor: "#e72b4a"
                                                                },
                                                                "& .MuiInput-underline:after": {
                                                                    borderBottomColor: "#e72b4a"
                                                                }
                                                            }
                                                            }
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
                                                    label="Council Name"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            council_name: event.council_name,
                                                        });
                                                    }}
                                                    value={updateUserData?.council_name}
                                                    required={true}
                                                ></TextField>
                                            </div><div className="Text-fieldscss">
                                                <TextField
                                                    label="Business Name"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setUpdateUserData({
                                                            ...updateUserData,
                                                            business_name: event.target.value,
                                                        });
                                                    }}
                                                    value={updateUserData?.business_name}
                                                ></TextField>
                                            </div><div className="Text-fieldscss">
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
                                                        variant="standard"
                                                        items={countryNames}
                                                        minwidthDropDown="300px"
                                                        activeItem={activeDropdown}
                                                        handleChange={(listItems) => {
                                                            setActiveDropdown(listItems);
                                                            let response = countryValues.filter(
                                                                (country) =>
                                                                    country?.country_name?.includes(
                                                                        listItems,
                                                                    ),
                                                            );
                                                            console.log(
                                                                "Country response : ",
                                                                response[0]?.country_id,
                                                            );
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

                                            <div className="indian-reg-no">
                                                <Box sx={{ width: "100%" }}>
                                                    <CustomDropdown
                                                        label={"State"}
                                                        dropdowncss={{ width: "100%" }}
                                                        variant="standard"
                                                        items={stateNames}
                                                        minwidthDropDown="300px"
                                                        activeItem={stateName}
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

                                            <div className="Registration-date">
                                                <Box sx={{ width: "100%" }}>
                                                    <CustomDropdown
                                                        label={"City"}
                                                        variant="standard"
                                                        dropdowncss={{ width: "100%" }}
                                                        items={cityNames}
                                                        minwidthDropDown="300px"
                                                        activeItem={citySelected}
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
                                            <div className="reg-date1">
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
                                                            value={updateUserData?.lic_date ? dayjs(updateUserData.lic_date) : null}
                                                            onChange={(newValue) => {
                                                                console.log(
                                                                    `${newValue?.$y}-${Number(newValue?.$M) + 1
                                                                    }-${newValue?.$D}`,
                                                                );

                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    lic_date: `${newValue?.$y}-${Number(newValue?.$M) + 1
                                                                        }-${newValue?.$D}`,
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
                                                                            borderBottomColor: "#e72b4a"
                                                                        },
                                                                        "& .MuiInput-underline:after": {
                                                                            borderBottomColor: "#e72b4a"
                                                                        }
                                                                    }
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
                                                        handleClick={() => navigate("/clinicLogin")}
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

export default HcfClinicCompleteProfile;
