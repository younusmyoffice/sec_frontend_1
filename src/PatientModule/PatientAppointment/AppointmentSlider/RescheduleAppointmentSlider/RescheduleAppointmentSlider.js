import React, { useState, useEffect } from "react";
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
import dayjs from "dayjs";
import CustomRadioButton from "../../../../components/CustomRadioButton/custom-radio-button";
import CustomDropdown from "../../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../../components/CustomButton/custom-button";
import finish from "../../../../static/images/DrImages/Finish.png";
import axiosInstance from "../../../../config/axiosInstance"; // Handles access token automatically
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications
import Loading from "../../../../components/Loading/Loading"; // Reusable loader component

/**
 * RescheduleAppointmentSlider Component
 * 
 * Multi-step stepper component for rescheduling appointments
 * Features:
 * - Step 1: Select reschedule reason
 * - Step 2: Select new date & time
 * - Final step: Success confirmation
 * 
 * Uses Material-UI Stepper and Date/Time pickers
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Appointment data (appointment_id, patient_id, doctor_id, status)
 * @param {string} props.path - API endpoint path for rescheduling
 * @param {Function} props.changeFlagState - Callback to update parent component state
 * 
 * @component
 */
const RescheduleAppointmentSlider = ({ data, path, changeFlagState }) => {
    logger.debug("🔵 RescheduleAppointmentSlider component rendering", { 
        appointment_id: data?.appointment_id 
    });
    // Stepper state management
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    
    // Loading state
    const [isLoading, setIsLoading] = useState(false);
    
    /**
     * Available reschedule reasons
     * Note: Consider fetching these from API or constants file
     */
    const radioValues = [
        "I have a schedule clash",
        "I am not available at the schedule",
        "Reason3",
        "Reason4",
        "Reason5",
    ];
    
    // Selected reschedule reason
    const [radioVal, setRadioVal] = React.useState(radioValues[0]);
    
    // Selected date value
    const [DateValue, setDataValue] = React.useState(null);
    
    // Unused state variable (can be removed if not needed)
    // const [ageDropDown, setAgeDropDown] = React.useState();

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
     * Reschedule data payload
     * Updates when radioVal or date/time changes
     */
    const [rescheduleData, setRescheduleData] = useState({
        appointment_date: DateValue,
        appointment_time: null,
        patient_id: data?.patient_id,
        doctor_id: data?.doctor_id,
        appointment_id: data?.appointment_id,
        status: data?.status,
        reason: radioVal,
        option: "reschedule",
    });

    /**
     * Update reschedule data when reason changes
     */
    useEffect(() => {
        setRescheduleData((prev) => ({
            ...prev,
            reason: radioVal,
        }));
    }, [radioVal]);

    /**
     * Reset stepper to initial state
     */
    const handleReset = () => {
        setActiveStep(0);
    };

    /**
     * Reschedule appointment API call
     * Sends reschedule request to backend with new date/time
     */
    const RescheduleAppointment = async () => {
        logger.debug("📡 Rescheduling appointment", { 
            appointment_id: rescheduleData.appointment_id,
            new_date: rescheduleData.appointment_date,
            new_time: rescheduleData.appointment_time,
            reason: rescheduleData.reason
        });
        
        setIsLoading(true);
        
        try {
            // Validate required data
            if (!rescheduleData.appointment_id || !rescheduleData.patient_id || !rescheduleData.doctor_id) {
                logger.error("❌ Missing required appointment data", rescheduleData);
                toastService.error("Appointment information is incomplete");
                setIsLoading(false);
                return;
            }
            
            // Validate date and time
            if (!rescheduleData.appointment_date || !rescheduleData.appointment_time) {
                logger.error("❌ Missing date or time", rescheduleData);
                toastService.error("Please select both date and time");
                setIsLoading(false);
                return;
            }
            
            const response = await axiosInstance.post(path, rescheduleData);
            
            logger.debug("✅ Appointment rescheduled successfully", {
                appointment_id: rescheduleData.appointment_id,
                response: response?.data
            });
            
            toastService.success("Appointment successfully rescheduled");
            changeFlagState(true);
            handleNext();
        } catch (error) {
            logger.error("❌ Failed to reschedule appointment:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to reschedule appointment. Please try again."
            );
            changeFlagState(false);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle time picker change
     * Formats time as HH:mm for API
     * 
     * @param {dayjs.Dayjs} newValue - Selected time from time picker
     */
    const handleTimeChange = (newValue) => {
        setRescheduleData((prev) => ({
            ...prev,
            appointment_time: newValue ? dayjs(newValue).format("HH:mm") : null,
        }));
    };

    // Step labels for the stepper
    const steps = ["Reason", "Date & Time"];

    return (
        <Box sx={{ width: "100%" }}>
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
                    <Box sx={{ width: "70%", marginTop: "5%", marginLeft: "15%" }}>
                        <img 
                            style={{ width: "100%" }} 
                            src={finish} 
                            alt="Appointment rescheduled successfully" 
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
                            Appointment Request Sent
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
                            Your reschedule request has been sent. The doctor will review and confirm shortly.
                        </Typography>
                    </Box>
                    
                    {/* Action button */}
                    <Box sx={{ marginTop: "5%", display: "flex", justifyContent: "center" }}>
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
                        {/* Step 0: Select Reschedule Reason */}
                        {activeStep === 0 ? (
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
                                        Reschedule Appointment
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
                                        Reason For Schedule
                                    </Typography>
                                    
                                    {/* Radio buttons for reason selection */}
                                    <CustomRadioButton
                                        label={""}
                                        handleChange={({ target }) => setRadioVal(target.value)}
                                        value={radioVal}
                                        items={radioValues}
                                    />
                                    
                                    {/* Note section */}
                                    <Box sx={{ marginTop: "8%", width: "75%" }}>
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "14px",
                                                lineHeight: "21px",
                                                letterSpacing: "0.5%",
                                                color: "#939094", // Common color variant
                                            }}
                                        >
                                            Note: Please ensure you select a new date and time that works for you.
                                            The doctor will confirm the reschedule request.
                                        </Typography>
                                    </Box>
                                    
                                    {/* Continue button */}
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
                                            handleClick={handleNext}
                                            label="Continue"
                                        />
                                    </Box>
                                </Box>
                            </>
                        ) : /* Step 1: Select New Date & Time */
                        activeStep === 1 ? (
                            <>
                                {/* Date picker section */}
                                <Box sx={{ width: "100%" }}>
                                    <Typography sx={{ marginTop: "4%", fontWeight: "600", fontSize: "16px" }}>
                                        Select Date
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar
                                            onChange={(newValue) => {
                                                setDataValue(newValue); // Keep separate date value
                                                setRescheduleData((prev) => ({
                                                    ...prev,
                                                    appointment_date: newValue
                                                        ? dayjs(newValue).format("YYYY-MM-DD")
                                                        : null,
                                                }));
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                
                                {/* Time picker section */}
                                <Box>
                                    <Typography sx={{ fontWeight: "600", fontSize: "16px", marginBottom: "1rem" }}>
                                        Select Time
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                label="Select Time"
                                                value={
                                                    rescheduleData.appointment_time
                                                        ? dayjs(
                                                              rescheduleData.appointment_time,
                                                              "HH:mm",
                                                          )
                                                        : null
                                                }
                                                onChange={handleTimeChange}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                
                                {/* Submit button */}
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
                                        handleClick={RescheduleAppointment}
                                        label={isLoading ? "Rescheduling..." : "Next"}
                                        disabled={isLoading || !rescheduleData.appointment_date || !rescheduleData.appointment_time}
                                    />
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
RescheduleAppointmentSlider.propTypes = {
    data: PropTypes.shape({
        appointment_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        patient_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        doctor_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        status: PropTypes.string,
    }).isRequired,
    path: PropTypes.string.isRequired,
    changeFlagState: PropTypes.func.isRequired,
};

export default RescheduleAppointmentSlider;
