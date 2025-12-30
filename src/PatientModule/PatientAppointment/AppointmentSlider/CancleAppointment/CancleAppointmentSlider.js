import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import { TextareaAutosize, TextField, CircularProgress } from "@mui/material";
import CustomRadioButton from "../../../../components/CustomRadioButton/custom-radio-button";
import CustomDropdown from "../../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../../components/CustomButton/custom-button";
import finish from "../../../../static/images/DrImages/Finish.png";
import CustomTextField from "../../../../components/CustomTextField";
import axiosInstance from "../../../../config/axiosInstance"; // Handles access token automatically
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications
import Loading from "../../../../components/Loading/Loading"; // Reusable loader component

/**
 * CancelAppointmentSlider Component
 * 
 * Multi-step stepper component for cancelling appointments
 * Features:
 * - Step 1: Confirmation dialog
 * - Step 2: Select cancellation reason
 * - Final step: Success confirmation
 * 
 * Uses Material-UI Stepper for step-by-step flow
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Appointment data (appointment_id, patient_id, doctor_id)
 * @param {string} props.path - API endpoint path for cancellation
 * @param {Function} props.changeFlagState - Callback to update parent component state
 * 
 * @component
 */
const CancelAppointmentSlider = ({ data, path, changeFlagState }) => {
    logger.debug("🔵 CancelAppointmentSlider component rendering", { 
        appointment_id: data?.appointment_id 
    });
    // Stepper state management
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    
    // Loading state
    const [isLoading, setIsLoading] = useState(false);
    
    /**
     * Available cancellation reasons
     * Note: Consider fetching these from API or constants file
     */
    const radioValues = [
        "I have a schedule clash",
        "I am not available at the schedule",
        "Reason3",
        "Reason4",
        "Reason5",
    ];
    
    // Selected cancellation reason
    const [radioVal, setRadioVal] = React.useState(radioValues[0]);
    
    // Unused state variables (can be removed if not needed)
    // const [ageDropDown, setAgeDropDown] = React.useState();
    // const [DateValue, setDataValue] = React.useState(null);

    /**
     * Check if a step is optional
     * @param {number} step - Step index
     * @returns {boolean} Whether the step is optional
     */
    const isStepOptional = (step) => {
        return step === 1;
    };

    /**
     * Check if a step was skipped
     * @param {number} step - Step index
     * @returns {boolean} Whether the step was skipped
     */
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    /**
     * Handle moving to the next step
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
     * Handle moving to the previous step
     */
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    /**
     * Handle skipping a step (if optional)
     * @throws {Error} If trying to skip a non-optional step
     */
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            logger.error("❌ Attempted to skip non-optional step", { activeStep });
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
     * Cancellation data payload
     * Updates when radioVal changes
     */
    const [cancleData, setCancleData] = useState({
        appointment_id: data?.appointment_id,
        patient_id: data?.patient_id,
        doctor_id: data?.doctor_id,
        status: "in_progress",
        reason: radioVal,
        option: "reject"
    });

    /**
     * Update cancellation data when reason changes
     */
    React.useEffect(() => {
        setCancleData((prev) => ({
            ...prev,
            reason: radioVal
        }));
    }, [radioVal]);

    /**
     * Cancel appointment API call
     * Sends cancellation request to backend
     */
    const CancleAppointment = async () => {
        logger.debug("📡 Cancelling appointment", { 
            appointment_id: cancleData.appointment_id,
            reason: cancleData.reason 
        });
        
        setIsLoading(true);
        
        try {
            // Validate required data
            if (!cancleData.appointment_id || !cancleData.patient_id || !cancleData.doctor_id) {
                logger.error("❌ Missing required appointment data", cancleData);
                toastService.error("Appointment information is incomplete");
                setIsLoading(false);
                return;
            }
            
            const response = await axiosInstance.post(path, cancleData);
            
            logger.debug("✅ Appointment cancelled successfully", {
                appointment_id: cancleData.appointment_id,
                response: response?.data
            });
            
            toastService.success("Appointment cancelled successfully");
            changeFlagState(true);
            handleNext();
        } catch (error) {
            logger.error("❌ Failed to cancel appointment:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to cancel appointment. Please try again."
            );
            changeFlagState(false);
        } finally {
            setIsLoading(false);
        }
    };


    // const handleReset = () => {
    //     setActiveStep(0);
    // };



    // Step labels for the stepper
    const steps = ["Cancellation Confirmation", "Reason"];

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {/* Loading overlay */}
            {isLoading && <Loading />}
            
            {/* Stepper component for multi-step flow */}
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption"></Typography>;
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
            {/* Success Screen - Shown after completion */}
            {activeStep === steps.length ? (
                <React.Fragment>
                    {/* Success image */}
                    <Box sx={{ width: "70%", marginTop: "20%", marginLeft: "15%" }}>
                        <img 
                            style={{ width: "100%" }} 
                            src={finish} 
                            alt="Appointment cancellation completed" 
                            loading="lazy" 
                        />
                    </Box>
                    {/* Success message */}
                    <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                        <Typography
                            sx={{
                                color: "#313033", // Common color: #313033
                                fontFamily: "Poppins",
                                fontSize: "1rem",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "1.5rem",
                            }}
                        >
                            Appointment Canceled
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Poppins",
                                fontSize: "0.875rem",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "1.3125rem",
                                letterSpacing: "0.00438rem",
                            }}
                        >
                            Your appointment has been successfully cancelled. You can view your appointments anytime.
                        </Typography>
                    </Box>
                    
                    {/* Action button */}
                    <Box sx={{ marginTop: "15%", marginLeft: "30%", marginBottom: "5%" }}>
                        <CustomButton
                            label={"View Appointment"}
                            isElevated
                            // handleClick={() => setOpenDialog(!openDialog)}
                        />
                    </Box>
                </React.Fragment>
            ) : (
                /* Step Content */
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {/* Step 0: Confirmation Dialog */}
                        {activeStep === 0 ? (
                            <>
                                <Box sx={{ width: "100%" }}>
                                    {/* Confirmation title */}
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "20px",
                                            lineHeight: "30px",
                                            textAlign: "center",
                                            color: "#313033", // Common color
                                        }}
                                    >
                                        Cancelled Appointment
                                    </Typography>
                                    
                                    {/* Confirmation message */}
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins",
                                            fontSize: "0.875rem",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            lineHeight: "1.3125rem",
                                            letterSpacing: "0.00438rem",
                                            textAlign: "center",
                                            color: "#484649", // Common color variant
                                            marginTop: "3%",
                                        }}
                                    >
                                        Are you sure you want to cancel the appointment?
                                    </Typography>
                                    {/* Action buttons */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "30%",
                                        }}
                                    >
                                        {/* Cancel button */}
                                        <CustomButton
                                            buttonCss={{
                                                display: "flex",
                                                width: "10.625rem",
                                                height: "3rem",
                                                padding: "0.5rem 1rem",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                                flexShrink: "0",
                                                borderRadius: "6.25rem",
                                                marginRight: "1%",
                                            }}
                                            label="No"
                                            isTransaprent={"true"}
                                        />
                                        
                                        {/* Confirm cancellation button */}
                                        <CustomButton
                                            buttonCss={{
                                                display: "flex",
                                                width: "10.625rem",
                                                height: "3rem",
                                                padding: "0.5rem 1rem",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                                flexShrink: "0",
                                                borderRadius: "6.25rem",
                                                marginLeft: "1%",
                                            }}
                                            handleClick={handleNext}
                                            label="Yes, Cancel"
                                        />
                                    </Box>
                                </Box>
                            </>
                        ) : /* Step 1: Select Cancellation Reason */
                        activeStep === 1 ? (
                            <>
                                {/* Step title */}
                                <Box sx={{ width: "77%", marginLeft: "26%", marginTop: "7%" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "20px",
                                            lineHeight: "30px",
                                        }}
                                    >
                                        Cancel Appointment
                                    </Typography>
                                </Box>
                                
                                {/* Reason selection */}
                                <Box
                                    sx={{
                                        marginTop: "5%",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                        }}
                                    >
                                        Reason For Cancellation
                                    </Typography>
                                    
                                    {/* Radio buttons for reason selection */}
                                    <CustomRadioButton
                                        label={""}
                                        handleChange={({ target }) => setRadioVal(target.value)}
                                        value={radioVal}
                                        items={radioValues}
                                    />
                                    
                                    {/* Continue button */}
                                    <Box sx={{ marginTop: "5%", width: "100%" }}>
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            <CustomButton
                                                buttonCss={{
                                                    display: "flex",
                                                    width: "10.625rem",
                                                    height: "3rem",
                                                    padding: "0.5rem 1rem",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                    flexShrink: "0",
                                                    borderRadius: "6.25rem",
                                                    marginTop: "2%",
                                                }}
                                                handleClick={CancleAppointment}
                                                label={isLoading ? "Cancelling..." : "Continue"}
                                                disabled={isLoading}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <h1>Completed</h1>
                        )}
                    </Typography>
                    
                    {/* Navigation buttons */}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0 || isLoading}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
};

// PropTypes for type checking
CancelAppointmentSlider.propTypes = {
    data: PropTypes.shape({
        appointment_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        patient_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        doctor_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    path: PropTypes.string.isRequired,
    changeFlagState: PropTypes.func.isRequired,
};

export default CancelAppointmentSlider;
