/**
 * DiagnosticCompleteProfile Component
 * 
 * Handles Diagnostic Center profile completion for users with incomplete profiles after login.
 * Features:
 * - Multi-step form (4 steps)
 * - Diagnostic center information collection (company, registration, service details)
 * - Contact information (address, phone, fax)
 * - JWT token-based authentication
 * - Automatic token handling via axiosInstance
 * - Dynamic service details handling
 */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "./ProfileDiagnosticComplete.scss";
import Typography from "@mui/material/Typography";
import CustomDatePicker from "../../../../components/CustomDatePicker";
import CustomTimePicker from "../../../../components/CustomTimePicker";
import ImageFrame from "../../../../static/images/logos/diagnosit_logo.png";
import ClassicFrame from "../../../../static/images/DrImages/Undraw.png";
import TextField from "@mui/material/TextField";
import CustomTextField from "../../../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../../components/CustomButton";
import ServiceDetails from "./Step3/ServiceDetails";
import { useNavigate } from "react-router-dom"; // Added useNavigate
import axiosInstance from "../../../../config/axiosInstance"; // Added axiosInstance
import logger from "../../../../utils/logger"; // Added logger
import toastService from "../../../../services/toastService"; // Added toastService
import { Loading } from "../../../../components/Loading"; // Added Loading component
import CustomSnackBar from "../../../../components/CustomSnackBar"; // Added CustomSnackBar
import { decodeJWT, getCurrentUserId, getCurrentUserEmail } from "../../../../utils/jwtUtils"; // Added JWT utilities
// import ServiceDetails from "./ServiceDetails";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
const steps = ["", "", "", "", ""];

const DiagnosticCompleteProfile = () => {
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    
    // Dropdown items for services offered
    const dropdownItems = ["item1", "item2", "item3"];
    const [activeDropdown, setActiveDropdown] = useState("");
    
    // Multi-step form state
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    
    // Form data state - diagnostic center information
    const [formData, setFormData] = useState({
        companyName: "",
        businessName: "",
        registrationNo: "",
        registrationDate: null,
        streetLine1: "",
        streetLine2: "",
        state: "",
        city: "",
        zipCode: "",
        faxNo: "",
        serviceDetails: null,
        servicesOffered: ""
    });
    
    // Loading and notification states
    const [loading, setLoading] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorOpen, setErrorOpen] = useState(false);
    
    // Date range state
    const [value, setValue] = useState([null, null]);
    
    // Radio values (not currently used)
    const radioValues = ["My self"];
    
    // Navigation
    const navigate = useNavigate();
    // const [radioVal, setRadioVal] = React.useState(radioValues[0]);
    //   const [activeFabDropdown, setActiveFabDropdown] = React.useState(dropdownItems[0]);
    //   const [activeDropdown, setActiveDropdown] = useState("");
    // const [ageDropDown, setAgeDropDown] = React.useState();
    // const [DateValue, setDataValue] = React.useState(null);

    // ============================================
    // STEPPER NAVIGATION FUNCTIONS
    // ============================================
    
    // Check if a step is optional (can be skipped)
    const isStepOptional = (step) => {
        return step === 1;
    };

    // Check if a step has been skipped
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    // Move to next step in the stepper
    // Removes current step from skipped set if it was skipped
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            // Create new set to avoid mutating original
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep); // Remove from skipped set
        }

        // Advance to next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    // Move to previous step in the stepper
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // Skip the current step (only works for optional steps)
    // Adds current step to skipped set
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // Guard against skipping non-optional steps
            // This should never occur unless someone's actively trying to break something
            throw new Error("You can't skip a step that isn't optional.");
        }

        // Advance to next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        
        // Add current step to skipped set
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    // Reset the stepper to first step
    const handleReset = () => {
        setActiveStep(0);
    };
    
    // ============================================
    // API CALL FUNCTION - SUBMIT PROFILE DATA
    // ============================================
    /**
     * Handle profile data submission to backend
     * - Gets user information from JWT token
     * - Prepares final data with authentication info
     * - Submits to API using axiosInstance (automatic JWT handling)
     * - Shows success/error feedback
     * - Navigates to dashboard on success
     */
    const handleSubmitProfile = async () => {
        try {
            setLoading(true); // Show loading overlay
            logger.info("Submitting diagnostic center profile:", formData);
            
            // ============================================
            // JWT TOKEN MANAGEMENT
            // ============================================
            // Get user information from JWT token stored in localStorage
            // These utilities extract information from the decoded JWT token
            const userId = getCurrentUserId(); // Get user ID from JWT payload
            const userEmail = getCurrentUserEmail(); // Get email from JWT payload
            
            // ============================================
            // PROFILE DATA EXTRACTION FROM LOCALSTORAGE
            // ============================================
            // For incomplete profiles, data is stored by LoginDiagnostic.js (lines 161-163):
            // - localStorage.setItem("login_Email", resData.email)
            // - localStorage.setItem("email", resData.email)
            // - localStorage.setItem("diagnostic_suid", resData.suid)
            //
            // For complete profiles, data is stored during login (lines 196-198):
            // - localStorage.setItem("diagnostic_suid", resData.suid)
            // - localStorage.setItem("diagnostic_Email", resData.email)
            
            // Extract diagnostic center unique ID (stored during login)
            const diagnosticSuid = localStorage.getItem("diagnostic_suid");
            
            // Extract email (try multiple sources for incomplete profile support)
            // 1. From JWT token (if available)
            // 2. From diagnostic_Email (complete profile)
            // 3. From login_Email (incomplete profile)
            // 4. From email (fallback)
            const diagnosticEmail = userEmail || 
                                   localStorage.getItem("diagnostic_Email") || 
                                   localStorage.getItem("login_Email") || 
                                   localStorage.getItem("email");
            
            // Log extracted data for debugging
            logger.info("=== PROFILE DATA EXTRACTION ===");
            logger.info("diagnosticSuid:", diagnosticSuid);
            logger.info("diagnosticEmail:", diagnosticEmail);
            logger.info("userId:", userId);
            logger.info("All localStorage keys:", Object.keys(localStorage));
            logger.info("access_token present:", !!localStorage.getItem("access_token"));
            logger.info("diagnostic_suid present:", !!diagnosticSuid);
            logger.info("email sources:");
            logger.info("  - userEmail (JWT):", userEmail);
            logger.info("  - diagnostic_Email:", localStorage.getItem("diagnostic_Email"));
            logger.info("  - login_Email:", localStorage.getItem("login_Email"));
            logger.info("  - email:", localStorage.getItem("email"));
            
            // ============================================
            // VALIDATION - Check if required data exists
            // ============================================
            // Validate that we have required authentication data
            if (!diagnosticSuid) {
                logger.error("Missing diagnostic_suid in localStorage");
                toastService.error("Authentication error. Please login again.");
                setTimeout(() => navigate("/diagnostCenterLogin", { replace: true }), 2000);
                return;
            }
            
            if (!diagnosticEmail) {
                logger.error("Missing email in localStorage and JWT");
                toastService.error("Authentication error. Please login again.");
                setTimeout(() => navigate("/diagnostCenterLogin", { replace: true }), 2000);
                return;
            }
        
            // ============================================
            // PREPARE DATA FOR API
            // ============================================
            // Combine form data with authentication information
            const finalData = {
                suid: diagnosticSuid, // Diagnostic center unique ID
                email: diagnosticEmail, // User email
                user_id: userId, // User ID from JWT (may be null for new users)
                role_id: 4, // Diagnostic Center role (4 = Diagnostic Center)
                ...formData // Spread all form data fields
            };
            
            logger.info("Final data being sent:", finalData);
            logger.info("Data validation passed - suid and email present");
            
            // ============================================
            // API CALL WITH AXIOSINSTANCE
            // ============================================
            // axiosInstance automatically:
            // 1. Reads access_token from localStorage
            // 2. Adds Bearer token to Authorization header
            // 3. Handles token refresh on 401 errors
            // 4. Works across entire application
            const response = await axiosInstance.post(
                "/sec/auth/updateProfile", // Backend endpoint
                JSON.stringify(finalData), // Convert to JSON string
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            
            // ============================================
            // SUCCESS HANDLING
            // ============================================
            logger.info("Profile update successful:", response);
            toastService.success("Profile Completed Successfully! 🎉");
            setSuccessMessage("Profile completed successfully!");
            setShowSnackBar(true);
            
            // Navigate to dashboard after successful submission (2 second delay for UX)
            setTimeout(() => {
                navigate("/diagnostCenterDashboard", { replace: true });
            }, 2000);
            
        } catch (error) {
            // ============================================
            // ERROR HANDLING
            // ============================================
            logger.error("Profile submission failed:", error);
            logger.error("Error response:", error?.response?.data);
            
            // Parse error codes and provide user-friendly messages
            let errorMsg = "Failed to complete profile. Please try again.";
            
            if (error?.response?.data?.error) {
                const errorCode = error.response.data.error;
                switch (errorCode) {
                    case "VALIDATION_ERROR":
                        errorMsg = "Please fill in all required fields correctly.";
                        break;
                    case "UNAUTHORIZED":
                        errorMsg = "Session expired. Please login again.";
                        break;
                    case "INCOMPLETE_DATA":
                        errorMsg = "Please provide all required information.";
                        break;
                    case "USER_NOT_EXISTS":
                        errorMsg = "User not found. Please login again.";
                        logger.error("USER_NOT_EXISTS - Redirecting to login");
                        setTimeout(() => {
                            navigate("/diagnostCenterLogin", { replace: true });
                        }, 3000);
                        break;
                    default:
                        errorMsg = errorCode || errorMsg;
                }
            }
            
            // Show error feedback to user
            toastService.error(errorMsg);
            setErrorMessage(errorMsg);
            setErrorOpen(true);
        } finally {
            // Always hide loading overlay, even if there's an error
            setLoading(false);
        }
    };

    // ============================================
    // RENDER
    // ============================================
    
    return (
        <>
            {/* ============================================
                LOADING & NOTIFICATION OVERLAYS
                ============================================ */}
            
            {/* Loading overlay for API operations - shows while profile is being saved */}
            {loading && (
                <Loading
                    variant="overlay"
                    size="large"
                    message="Saving Your Profile"
                    subMessage="Please wait while we save your diagnostic center information..."
                    fullScreen
                />
            )}
            
            {/* Success snackbar - shows feedback messages when profile is saved successfully */}
            <CustomSnackBar
                isOpen={showSnackBar}
                actionLabel={""}
                message={successMessage}
                type="success"
            />
            
            {/* Error snackbar - shows error messages when profile submission fails */}
            <CustomSnackBar
                isOpen={errorOpen}
                message={errorMessage}
                type="error"
            />
            
            {/* ============================================
                MAIN CONTAINER
                ============================================ */}
            
            <div className="Stepper-Container" sx={{ width: "100%" }}>
                {/* Logo/Image Frame - Diagnostic Center Logo */}
                <div className="FrameBox">
                    <Box
                        component={"img"}
                        src={ImageFrame}
                    ></Box>
                </div>

                {/* ============================================
                    STEPPER NAVIGATION
                    ============================================ */}
                
                <div className="step-back">
                    {/* Back button - navigate to previous step (disabled on first step) */}
                    <div className="back-btn">
                        <Button
                            color="inherit"
                            disabled={activeStep === 0} // Disable when on first step
                            onClick={handleBack} // Go back one step
                            sx={{ mr: 1, color: "red" }}
                        >
                            Back
                        </Button>
                    </div>
                    
                    {/* Multi-step stepper - shows progress through form steps */}
                    <div className="Stepper">
                        <Stepper
                            activeStep={activeStep} // Current active step (0-4)
                            style={{
                                width: "700px",
                            }}
                        >
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                
                                // Mark step as optional if it can be skipped
                                if (isStepOptional(index)) {
                                }
                                
                                // Mark step as completed if it was skipped
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
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {/* Put component here */}
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset}>Reset</Button>
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
                                            <div className="hcftitle1">
                                                <Typography
                                                    style={{
                                                        color: "#313033",
                                                        fontFamily: "poppins",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        lineHeight: "30px",
                                                        fontSize: "20px",
                                                        paddingTop: "40px",
                                                        paddingBottom: "40px",
                                                    }}
                                                >
                                                    HCF DIAGNOSTIC INFORMATION
                                                </Typography>
                                            </div>
                                            <div className="info-fields1">
                                                {/* Company Name Field */}
                                                <TextField
                                                        label="Company name"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setFormData({
                                                                ...formData,
                                                                companyName: event.target.value,
                                                            });
                                                        }}
                                                        value={formData?.companyName}
                                                        required={true}
                                                    />

                                                {/* Business Name Field */}
                                                <TextField
                                                    label="Business name"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            businessName: event.target.value,
                                                        });
                                                    }}
                                                    value={formData?.businessName}
                                                    required={true}
                                                />

                                                {/* Registration Number Field */}
                                                <TextField
                                                    label="Registration No"
                                                    variant="standard"
                                                    style={{
                                                        width: "100%",
                                                        color: "#787579",
                                                    }}
                                                    onInput={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            registrationNo: event.target.value,
                                                        });
                                                    }}
                                                    value={formData?.registrationNo}
                                                    required={true}
                                                />


                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                    label="Reg.Date"
                                                    variant="standard"
                                                    value={formData?.registrationDate ? dayjs(formData.registrationDate) : null}
                                                    onChange={(value) => {
                                                        if (value) {
                                                            setFormData({
                                                                ...formData,
                                                                registrationDate: value.format('YYYY-MM-DD'),
                                                            });
                                                        } else {
                                                            setFormData({
                                                                ...formData,
                                                                registrationDate: null,
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
                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={handleNext}
                                                    label="Next"
                                                    buttonCss={{
                                                        width: "360px",
                                                    }}
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
                                            <div className="servicetitle1">
                                                <Typography
                                                    style={{
                                                        color: "#313033",
                                                        fontFamily: "poppins",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        lineHeight: "30px",
                                                        fontSize: "20px",
                                                    }}
                                                >
                                                    Service Details
                                                </Typography>
                                            </div>
                                            <div className="date-time-picker">
                                                <ServiceDetails />
                                            </div>
                                            <div className="services">
                                                <CustomDropdown
                                                    label={"Services Offered"}
                                                    items={dropdownItems}
                                                    variant="standard"
                                                    activeItem={activeDropdown}
                                                    handleChange={(item) => setActiveDropdown(item)}
                                                    dropdowncss={{
                                                        width: "360px",
                                                        height: "56px",
                                                        color: "#E6E1E5",
                                                    }}
                                                />
                                            </div>
                                            <div className="nxt-btn1">
                                                <CustomButton
                                                    handleClick={handleNext}
                                                    label="Next"
                                                    buttonCss={{
                                                        width: "360px",
                                                    }}
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
                                    <div className="back-btn">
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                    <div className="mainBox1">
                                        <div className="title3">
                                            <Typography
                                                style={{
                                                    color: "#313033",
                                                    fontFamily: "poppins",
                                                    fontStyle: "normal",
                                                    fontWeight: "500",
                                                    lineHeight: "30px",
                                                    fontSize: "20px",
                                                }}
                                            >
                                                Contact Information
                                            </Typography>
                                        </div>
                                        <div className="info-fields1">
                                            <TextField
                                                variant="standard"
                                                label="Street Line1"
                                                style={{
                                                    width: "100%",
                                                    color: "#787579",
                                                }}
                                                onInput={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        streetLine1: event.target.value,
                                                    });
                                                }}
                                            ></TextField>

                                            <TextField
                                                variant="standard"
                                                label="Street Line2"
                                                style={{
                                                    width: "100%",
                                                    color: "#787579",
                                                }}
                                                onInput={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        streetLine2: event.target.value,
                                                    });
                                                }}
                                            ></TextField>

                                                <TextField
                                                variant="standard"
                                                label="State"
                                                style={{
                                                    width: "100%",
                                                    color: "#787579",
                                                }}
                                                onInput={(event) => {
                                                    setFormData({
                                                    ...formData,
                                                    state: event.target.value,
                                                });
                                                }}
                                            ></TextField>

                                            <TextField
                                                variant="standard"
                                                label="City"
                                                style={{
                                                    width: "100%",
                                                    color: "#787579",
                                                }}
                                                onInput={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        city: event.target.value,
                                                    });
                                                }}
                                            ></TextField>

                                            <TextField
                                                variant="standard"
                                                        label="Zip Code"
                                                style={{
                                                    width: "100%",
                                                    color: "#787579",
                                                }}
                                                onInput={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        zipCode: event.target.value,
                                                    });
                                                }}
                                            ></TextField>

                                            <TextField
                                                    variant="standard"
                                                label="Fax No"
                                                style={{
                                                    width: "100%",
                                                    color: "#787579",
                                                }}
                                                onInput={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        faxNo: event.target.value,
                                                    });
                                                }}
                                            ></TextField>
                                        </div>
                                        <div className="nxt-btn1">
                                            <CustomButton
                                                handleClick={handleNext}
                                                label="Next"
                                                buttonCss={{
                                                    width: "360px",
                                                }}
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
                                    <div className="imge-cont">
                                        <div className="card-cont1">
                                            <div className="card1">
                                                <div className="undraw-img1">
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
                                                        Thank you for Choosing to rigister with us!
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
                                                        our team will get in touch with you shortly
                                                    </Typography>
                                                </div>
                                                <div className="done-btn1">
                                                    <CustomButton
                                                        label="Done"
                                                        handleClick={handleSubmitProfile}
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
                                </>
                            ) : activeStep === 4 ? (
                                <Box sx={{ width: "100%" }}></Box>
                            ) : (
                                <h1>Completed</h1>
                            )}
                            ;
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </>
    );
};

export default DiagnosticCompleteProfile;
