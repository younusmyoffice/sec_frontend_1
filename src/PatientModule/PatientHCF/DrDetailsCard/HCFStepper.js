/**
 * HCFStepper Component
 * 
 * Multi-step stepper for booking lab tests/appointments at HCF
 * Features:
 * - Date selection for lab tests
 * - Payment processing via Braintree
 * - Appointment/test booking
 * 
 * API Endpoints:
 * - GET /sec/patient/availableLabTestDates/{hcfID}/{exam_id} (fetch available dates)
 * - POST /sec/patient/createTest (create lab test appointment)
 * 
 * Security:
 * - Uses axiosInstance (automatic JWT token injection) ✅
 * - Validates HCF ID and exam ID before API calls
 * 
 * Error Handling:
 * - Toast notifications via CustomSnackBar ✅
 * - Error states for date availability ✅
 * 
 * @component
 */

import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../components/CustomButton";
import DropIn from "braintree-web-drop-in-react";
import { get_client_token, get_nonce } from "../../../const_payment/Const_Payment";
import CustomSnackBar from "../../../components/CustomSnackBar"; // Reusable toast notification
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { formatDate } from "../../DrDetailsCard/bookappointmentapihelperfunction";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import isAfter from "date-fns/isAfter";
import startOfToday from "date-fns/startOfToday";
import { styled } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useParams } from "react-router-dom";
import { 
    generateClientToken, 
    isDevelopmentMode
} from "../../../services/paymentService";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications
import PropTypes from "prop-types";

const today = startOfToday();

/**
 * Styled date picker day component
 * Highlights available dates with primary brand color
 */
const StyledPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "isAvailable",
})(({ theme, isAvailable }) => ({
    ...(isAvailable && {
        backgroundColor: "#E72B4A", // Primary brand color - should use theme or common color variable
        color: "white",
        "&:hover": {
            backgroundColor: "#c41e3a", // Darker shade on hover
        },
    }),
}));

dayjs.extend(utc);
dayjs.extend(timezone);


// Stepper steps configuration
const steps = ["Date", "Payment Method"];

/**
 * HCFStepper Component - Lab Test Booking Stepper
 * 
 * @param {Object} data - Lab test data
 * @param {string|number} data.sub_exam_id - Sub exam ID
 * @param {string|number} data.exam_id - Exam ID
 * @param {string|number} data.hcf_id - HCF ID (used as doctor_id in some contexts)
 */
export default function HCFStepper({ data }) {
    logger.debug("🔵 HCFStepper component rendering", { hasData: !!data });
    
    // Get hcfID from URL params since data.hcf_id might be wrong
    const { hcfID } = useParams();
    
    logger.debug("🔍 HCFStepper params and data", {
        hcfID,
        examID: data?.exam_id,
        subExamID: data?.sub_exam_id,
        hcfIdFromData: data?.hcf_id
    });
    
    /**
     * Validate required IDs and data before proceeding
     * Ensures all necessary IDs are present for API calls
     */
    const validateRequiredData = () => {
        if (!hcfID) {
            logger.warn("⚠️ HCF ID not found in URL parameters");
            toastService.warning("HCF ID is missing");
            return false;
        }
        
        if (!data?.exam_id) {
            logger.warn("⚠️ Exam ID not found in data");
            toastService.warning("Exam ID is missing");
            return false;
        }
        
        return true;
    };
    
    // State management
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [showSnack, setShowSnack] = useState(false);
    const [showSnackError, setShowSnackError] = useState(false);
    const [availableDatesSnackError, setAvailableDatesSnackError] = useState(false);
    const [availableDatesSnackMessage, setAvailableDatesSnackMessage] = useState("");
    
    // Payment states
    const [values, setValues] = useState({
        clientToken: null,
        success: "",
        error: "",
        instance: null, // Changed from empty string to null for proper type checking
    });
    const dropinInstanceRef = useRef(null);
    const [braintreeKey, setBraintreeKey] = useState(0); // Key to force re-render of Braintree
    const [isRefreshing, setIsRefreshing] = useState(false); // Loading state for refresh
    const [customAvailableDates, setCustomAvailableDates] = useState([]);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false); // Prevent duplicate payments
    
    // Appointment data state
    const [appointmentData, setAppointmentData] = React.useState({
        book_date: null,
        patient_id: localStorage.getItem("patient_suid"),
        test_subexam_id: data?.sub_exam_id ? String(data.sub_exam_id) : "",
        hcf_id: hcfID ? String(hcfID) : "", // Use hcfID from URL params
        doctor_id: data?.hcf_id ? String(data.hcf_id) : "", // Use hcf_id field as doctor_id
        exam_id: data?.exam_id ? String(data.exam_id) : "",
        status: "requested",
        payment_method_nonce: null,
    });

    // Date range for availability checking (currently set to empty range)
    const rangeStartDate = new Date(0, 0, 0);
    const rangeEndDate = new Date(0, 0, 0);

    /**
     * Fetch available dates for lab test booking
     * Retrieves dates when the lab test can be scheduled
     */
    const FetchDoctorAvailableDates = async () => {
        // Validate required data before fetching
        if (!validateRequiredData()) {
            setAvailableDatesSnackError(true);
            setCustomAvailableDates([]);
            return;
        }
        
        logger.debug("📅 Fetching available lab test dates", { hcfID, examID: data?.exam_id });
        setAvailableDatesSnackError(false);
        
        try {
            const resp = await axiosInstance.get(
                `/sec/patient/availableLabTestDates/${hcfID}/${data?.exam_id}`
            );
            
            logger.debug("✅ Available dates API response received", {
                hasDates: !!resp?.data?.availableDates,
                datesLength: resp?.data?.availableDates?.length || 0,
            });
            
            // Validate response structure
            if (!resp?.data?.availableDates || !Array.isArray(resp?.data?.availableDates)) {
                logger.warn("⚠️ Invalid available dates response structure");
                toastService.warning("No available dates found");
                setCustomAvailableDates([]);
                return;
            }
            
            // Convert date strings to Date objects
            const availableDates = resp.data.availableDates.map((dateString) => {
                try {
                    const [year, month, day] = dateString.split("-").map(Number);
                    if (!year || !month || !day) {
                        logger.warn("⚠️ Invalid date format:", dateString);
                        return null;
                    }
                    // month - 1 because Date constructor expects 0-based months
                    return new Date(year, month - 1, day);
                } catch (error) {
                    logger.error("❌ Error parsing date:", dateString, error);
                    return null;
                }
            }).filter(date => date !== null); // Filter out invalid dates
            
            logger.debug("✅ Available dates processed successfully", {
                datesCount: availableDates.length
            });
            
            setCustomAvailableDates(availableDates);
            toastService.success("Available dates loaded successfully");
        } catch (err) {
            logger.error("❌ Failed to fetch available dates:", err);
            
            // Extract error message from response
            const errorMessage = err?.response?.data?.error || 
                                err?.response?.data?.message || 
                                "Failed to load available dates. Please try again.";
            
            setAvailableDatesSnackError(true);
            setCustomAvailableDates([]);
            setAvailableDatesSnackMessage(errorMessage);
            toastService.error(errorMessage);
        }
    };

    //   const [activeFabDropdown, setActiveFabDropdown] = React.useState(dropdownItems[0]);
    //   const [activeDropdown, setActiveDropdown] = useState("");
    // const [ageDropDown, setAgeDropDown] = React.useState();
    const [DateValue, setDataValue] = React.useState(null);

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

    /**
     * Book lab test appointment with payment nonce
     * Creates the test appointment after payment verification
     * 
     * @param {string} nonce_value - Braintree payment nonce
     */
    const bookappointment = async (nonce_value) => {
        // Validate nonce before proceeding
        if (!nonce_value || typeof nonce_value !== 'string') {
            logger.error("❌ Invalid payment nonce provided");
            toastService.error("Invalid payment information");
            setShowSnackError(true);
            return;
        }
        
        // Validate appointment data before booking
        if (!appointmentData.book_date) {
            logger.warn("⚠️ Booking date is required");
            toastService.error("Please select a date");
            setShowSnackError(true);
            return;
        }
        
        logger.debug("📝 Creating lab test appointment", {
            hasHcfId: !!appointmentData.hcf_id,
            hasExamId: !!appointmentData.exam_id,
            hasDate: !!appointmentData.book_date,
            hasNonce: !!nonce_value
        });
        
        setShowSnack(false);
        setShowSnackError(false);
        
        try {
            const appointmentPayload = { 
                ...appointmentData, 
                payment_method_nonce: nonce_value 
            };
            
            const response = await axiosInstance.post(
                `/sec/patient/createTest`,
                JSON.stringify(appointmentPayload),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Lab test appointment created successfully", {
                hasResponse: !!response?.data
            });
            
            setShowSnack(true);
            setShowSnackError(false);
            toastService.success("Lab test appointment booked successfully!");
            
            // Reset appointment data after successful booking
            setAppointmentData(prev => ({
                ...prev,
                payment_method_nonce: null,
                book_date: null
            }));
        } catch (error) {
            logger.error("❌ Failed to create lab test appointment:", error);
            
            // Extract error message from response
            const errorMessage = error?.response?.data?.message || 
                                error?.response?.data?.error || 
                                "Failed to book appointment. Please try again.";
            
            setShowSnack(false);
            setShowSnackError(true);
            toastService.error(errorMessage);
        }
    };

    /**
     * Force refresh of Braintree Drop-In instance
     * Regenerates client token and resets the payment form
     */
    const refreshBraintreeInstance = async () => {
        logger.debug("🔄 Refreshing Braintree Drop-In instance");
        setIsRefreshing(true);
        
        try {
            // Get fresh client token using payment service
            const freshTokenResponse = await get_client_token("/sec/payment/generateToken");
            
            logger.debug("✅ Fresh client token response received", {
                responseType: typeof freshTokenResponse
            });
            
            // Handle different response structures
            let freshToken;
            if (typeof freshTokenResponse === 'string') {
                freshToken = freshTokenResponse;
            } else if (freshTokenResponse?.clientToken) {
                freshToken = freshTokenResponse.clientToken;
            } else if (freshTokenResponse?.data?.clientToken) {
                freshToken = freshTokenResponse.data.clientToken;
            } else {
                logger.error("❌ Invalid token response structure:", freshTokenResponse);
                throw new Error("Invalid token response structure");
            }
            
            if (!freshToken || typeof freshToken !== 'string') {
                logger.error("❌ Invalid client token received");
                throw new Error("Failed to get valid client token");
            }
            
            // Update values with fresh token; clear stale instance reference
            setValues(prev => ({ ...prev, clientToken: freshToken, instance: null }));
            dropinInstanceRef.current = null;
            
            // Force re-render of Braintree component by incrementing key
            setBraintreeKey(prev => prev + 1);
            
            logger.debug("✅ Braintree instance refreshed successfully");
            toastService.success("Payment form refreshed successfully");
        } catch (error) {
            logger.error("❌ Error refreshing Braintree instance:", error);
            toastService.error(
                error?.message || 
                "Failed to refresh payment form. Please try again."
            );
        } finally {
            setIsRefreshing(false);
        }
    };

    /**
     * Process payment and book appointment
     * Generates payment nonce from Braintree and creates appointment
     */
    const Purchase_plan = async () => {
        // Prevent duplicate payment processing
        if (isProcessingPayment) {
            logger.warn("⚠️ Payment already in progress, ignoring duplicate request");
            return;
        }
        
        logger.debug("💳 Processing payment and booking appointment");
        setIsProcessingPayment(true);
        
        try {
            // Validate appointment data before payment
            if (!appointmentData.book_date) {
                logger.warn("⚠️ Booking date is required");
                toastService.error("Please select a date before proceeding to payment");
                setIsProcessingPayment(false);
                return;
            }
            
            // Check if Braintree instance is available and not torn down
            if (!dropinInstanceRef.current && !values?.instance) {
                logger.warn("⚠️ No Braintree instance available, refreshing...");
                await refreshBraintreeInstance();
                // Wait a bit for the instance to initialize
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Check again after refresh
                if (!dropinInstanceRef.current && !values?.instance) {
                    throw new Error("Braintree payment form not ready. Please wait and try again.");
                }
            }
            
            // Use the most current instance (prefer dropinInstanceRef, fallback to values.instance)
            const currentInstance = dropinInstanceRef.current || values?.instance;
            
            // Check if instance is still valid (not torn down)
            try {
                // Test if instance is still valid by checking if it has the requestPaymentMethod function
                if (!currentInstance || typeof currentInstance.requestPaymentMethod !== 'function') {
                    logger.warn("⚠️ Braintree instance is invalid, refreshing...");
                    await refreshBraintreeInstance();
                    // Wait a bit for the instance to initialize
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Get the refreshed instance
                    const refreshedInstance = dropinInstanceRef.current || values?.instance;
                    if (!refreshedInstance || typeof refreshedInstance.requestPaymentMethod !== 'function') {
                        throw new Error("Braintree payment form is no longer valid. Please refresh the payment form.");
                    }
                }
            } catch (error) {
                logger.error("❌ Braintree instance validation failed:", error);
                if (error.message && error.message.includes("refresh")) {
                    throw error; // Re-throw refresh errors
                }
                throw new Error("Braintree payment form is no longer valid. Please refresh the payment form.");
            }
            
            // Generate fresh nonce for each payment attempt with retry logic
            logger.debug("📤 Requesting payment method from Braintree...");
            let nonce_value;
            let retryCount = 0;
            const maxRetries = 2;
            
            while (retryCount < maxRetries) {
                try {
                    const instanceToUse = dropinInstanceRef.current || values?.instance;
                    nonce_value = await get_nonce({ instance: instanceToUse });
                    
                    logger.debug("✅ Payment nonce generated", {
                        attempt: retryCount + 1,
                        hasNonce: !!nonce_value,
                        nonceType: typeof nonce_value
                    });
                    
                    if (nonce_value && typeof nonce_value === 'string') {
                        break; // Success, exit retry loop
                    }
                } catch (error) {
                    logger.error(`❌ Nonce generation attempt ${retryCount + 1} failed:`, error);
                    
                    if (error.message && error.message.includes('teardown')) {
                        logger.warn("⚠️ Teardown error detected, refreshing Braintree instance...");
                        await refreshBraintreeInstance();
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for new instance
                        retryCount++;
                        continue;
                    } else {
                        throw error; // Re-throw non-teardown errors
                    }
                }
                
                retryCount++;
            }
            
            if (!nonce_value || typeof nonce_value !== 'string') {
                throw new Error("Failed to generate payment nonce after retries. Please refresh the payment form and try again.");
            }

            // Update appointment data with nonce
            setAppointmentData({ ...appointmentData, payment_method_nonce: nonce_value });

            // Book appointment with payment nonce
            await bookappointment(nonce_value);
            
        } catch (error) {
            logger.error("❌ Error in payment processing:", error);
            
            // Extract error message
            const errorMessage = error?.message || 
                                error?.response?.data?.message || 
                                "Payment processing failed. Please try again.";
            
            setShowSnackError(true);
            
            // Handle specific teardown error
            if (error.message && error.message.includes('teardown')) {
                // Automatically refresh the Braintree instance for this specific error
                logger.warn("⚠️ Automatically refreshing Braintree instance due to teardown error...");
                try {
                    await refreshBraintreeInstance();
                    setShowSnackError(false);
                    setShowSnack(true);
                    toastService.info("Payment form has been refreshed. Please try again.");
                } catch (refreshError) {
                    logger.error("❌ Failed to auto-refresh Braintree instance:", refreshError);
                    setShowSnackError(true);
                    toastService.error("Payment form refresh failed. Please refresh the page and try again.");
                }
            } else if (error.message && error.message.includes('no longer valid')) {
                // Automatically refresh the Braintree instance for this specific error
                logger.warn("⚠️ Automatically refreshing Braintree instance due to invalid instance error...");
                try {
                    await refreshBraintreeInstance();
                    setShowSnackError(false);
                    setShowSnack(true);
                    toastService.info("Payment form has been refreshed. Please try again.");
                } catch (refreshError) {
                    logger.error("❌ Failed to auto-refresh Braintree instance:", refreshError);
                    setShowSnackError(true);
                    toastService.error("Payment form refresh failed. Please refresh the page and try again.");
                }
            } else {
                setShowSnackError(true);
                toastService.error(errorMessage);
            }
        } finally {
            setIsProcessingPayment(false);
        }
    };

    /**
     * Handle date selection from calendar
     * Formats the selected date and updates appointment data
     * 
     * @param {Date} date - Selected date from calendar
     */
    const selectDate = (date) => {
        if (!date) {
            logger.warn("⚠️ No date selected");
            return;
        }
        
        logger.debug("📅 Date selected for booking", { date });
        
        const formatDateResp = formatDate(date);
        
        if (!formatDateResp) {
            logger.error("❌ Failed to format selected date");
            toastService.error("Invalid date selected");
            return;
        }
        
        setAppointmentData({ ...appointmentData, book_date: formatDateResp });
        logger.debug("✅ Appointment date updated", { formattedDate: formatDateResp });
    };

    /**
     * Check if date is within the allowed range
     * Currently range is set to empty, so this always returns false
     * 
     * @param {Date} date - Date to check
     * @returns {boolean} True if date is in range
     */
    const isInRange = (date) =>
        isWithinInterval(date, { start: rangeStartDate, end: rangeEndDate });

    /**
     * Check if date is available for booking
     * Date is available if it's in the allowed range or in custom available dates
     * 
     * @param {Date} date - Date to check
     * @returns {boolean} True if date is available
     */
    const isAvailable = (date) =>
        isInRange(date) ||
        customAvailableDates.some((availableDate) => isSameDay(availableDate, date));



    const shouldDisableDate = (date) => {
        // Disable all past dates
        if (date < today) {
            return true;
        }

        // Enable today's date if it's in range or custom available dates
        if (isSameDay(date, today)) {
            return !(
                isInRange(date) ||
                customAvailableDates.some((availableDate) => isSameDay(availableDate, date))
            );
        }

        // Disable future dates that are not in range or custom available dates
        return !(
            isInRange(date) ||
            customAvailableDates.some((availableDate) => isSameDay(availableDate, date))
        );
    };


    /**
     * Initialize component - Fetch payment token and available dates
     * Runs once on component mount
     */
    useEffect(() => {
        /**
         * Initialize payment client token
         * Generates Braintree client token for payment form
         */
        const initializePaymentToken = async () => {
            try {
                logger.debug("🔑 Initializing payment client token");
                
                const tokenResponse = await get_client_token("/sec/payment/generateToken");
                
                logger.debug("✅ Client token response received", {
                    responseType: typeof tokenResponse
                });
                
                // Handle different response structures
                let clientToken;
                if (typeof tokenResponse === 'string') {
                    clientToken = tokenResponse;
                } else if (tokenResponse?.clientToken) {
                    clientToken = tokenResponse.clientToken;
                } else if (tokenResponse?.data?.clientToken) {
                    clientToken = tokenResponse.data.clientToken;
                }
                
                if (clientToken && typeof clientToken === 'string') {
                    setValues(prev => ({ ...prev, clientToken: clientToken }));
                    logger.debug("✅ Client token set successfully");
                } else {
                    logger.error("❌ Failed to get valid client token");
                    toastService.error("Failed to initialize payment form. Please refresh the page.");
                }
            } catch (error) {
                logger.error("❌ Error initializing payment token:", error);
                toastService.error("Failed to initialize payment form. Please try again.");
            }
        };
        
        // Initialize payment token and fetch available dates
        initializePaymentToken();
        FetchDoctorAvailableDates();
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <CustomSnackBar
                isOpen={availableDatesSnackError}
                message={availableDatesSnackMessage}
                type="error"
            />
            <CustomSnackBar
                isOpen={showSnack}
                message={"Appointment Booked Successfully"}
                type="success"
            />
            <CustomSnackBar
                isOpen={showSnackError}
                message={"Can not book appointment try some other time "}
                type="error"
            />
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
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {/* Put component here */}
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Done</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {/* Step {activeStep + 1} */}
                        {activeStep === 0 ? (
                            <>
                                {customAvailableDates.length === 0 ? (
                                    <NoAppointmentCard text_one={availableDatesSnackMessage} />
                                ) : (
                                    <Box>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateCalendar
                                                // value={selectedDate}
                                                onChange={selectDate}
                                                shouldDisableDate={shouldDisableDate}
                                                slots={{
                                                    day: (props) => (
                                                        <StyledPickersDay
                                                            {...props}
                                                            isAvailable={isAvailable(props.day)}
                                                        />
                                                    ),
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                )}
                                {/* <Box>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar
                                            onChange={(newValue) => setDataValue(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Box>Select Time</Box>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["TimePicker"]}>
                                            <TimePicker label="Select Time" />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box> */}
                            </>
                        ) : activeStep === 1 ? (
                            <>
                                <Box>
                                    {/* Payment container starts */}
                                    <div className="payment">
                                        {values?.clientToken && !isRefreshing && (
                                            <div>
                                                <DropIn
                                                    key={braintreeKey}
                                                    options={{
                                                        authorization: values?.clientToken,
                                                    }}
                                                    onInstance={(instance) => {
                                                        logger.debug("✅ Braintree Drop-In instance created", {
                                                            hasInstance: !!instance
                                                        });
                                                        
                                                        setValues(prev => ({
                                                            ...prev,
                                                            instance: instance,
                                                        }));
                                                        dropinInstanceRef.current = instance;
                                                    }}
                                                />
                                                <center>
                                                    <CustomButton
                                                        label="Payment"
                                                        handleClick={() => Purchase_plan()}
                                                    />
                                                </center>
                                            </div>
                                        )}
                                        {(!values?.clientToken || isRefreshing) && (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                                                <Typography>Loading payment form...</Typography>
                                            </Box>
                                        )}
                                    </div>
                                    {/* Payment container ends */}
                                </Box>
                            </>
                        ) : (
                            <h1>Completed</h1>
                        )}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

// <CustomModal
// isOpen={openPatientDetails}
// title={"Patient Details"}
// footer={
//     <Fragment>
//         <Box sx={{ width : "100%" , display : "flex" ,justifyContent : "center" , alignItems : "center" }}>
//             <CustomButton
//                 label="Continue"
//                 handleClick={() => setPatientDetails(false)}
//             />
//         </Box>

//         <CustomButton
//             label={"action 2"}
//             isTransaprent
//             handleClick={() => setOpenDialog(false)}
//             isText
//         />
//     </Fragment>
// }
// >
// {
//     /* <Box sx={{ display: "flex", flexDirection: "column" }}>
//     <CustomRadioButton
//         label={"Patient Details"}
//         handleChange={({ target }) => setRadioVal(target.value)}
//         value={radioVal}
//         items={["My Self"]}
//     />
//     <CustomTextField placeholder={"Full Name"} label="" helperText={""} />
//     <CustomDropdown
//         label={"Gender"}
//         items={["Male", "Female", "Transgender"]}
//         // activeItem={activeDropdown}
//         // handleChange={(item) => setActiveDropdown(item)}
//         menuItemValue=""
//     />
//     <CustomDropdown
//         label={"Age"}
//         items={[...Array(101).keys()]}
//         // activeItem={ageDropDown}
//         // handleChange={(item) => setAgeDropDown(item)}
//         menuItemValue=""
//     />
//     <CustomTextField placeholder={"Attach Reports"} isDisabled={true} label="" helperText={""} />
//     <p>Write your problem here</p>
//     <TextField placeholder="Write your problem here" multiline rows={3} maxRows={4} />
// </Box>; */
// }
// </CustomModal>

// PropTypes for component documentation and type checking
HCFStepper.propTypes = {
    data: PropTypes.shape({
        sub_exam_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        exam_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        hcf_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
};

HCFStepper.defaultProps = {
    data: {},
};
