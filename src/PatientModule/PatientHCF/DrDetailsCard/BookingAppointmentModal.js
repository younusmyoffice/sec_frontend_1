import * as React from "react";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField, Alert, CircularProgress, Chip } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CustomRadioButton from "../../../components/CustomRadioButton/custom-radio-button";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import StepContent from "../../../components/StepContent";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import EmptyState from "../../../components/EmptyState";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { validateStep, getStepTitle, getStepSubtitle } from "../../../utils/validationUtils";
import messageLogo from "../../../static/images/patientAppointmentLogo/messageLogo.png";
import CustomButton from "../../../components/CustomButton";
import { baseURL } from "../../../constants/const";
import CustomSnackBar from "../../../components/CustomSnackBar";
import { get_client_token, get_nonce } from "../../../const_payment/Const_Payment";
import DropIn from "braintree-web-drop-in-react";
import { 
    generateClientToken, 
    getPaymentMethodNonce, 
    isDevelopmentMode
} from "../../../services/paymentService";
import "./patientBookappointment.scss";
import "./BookingAppointmentModal.scss";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import "./bookappointment.scss";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import isAfter from "date-fns/isAfter";
import startOfToday from "date-fns/startOfToday";
import { fetchDocDuration, fetchQuestions, formatDate } from "./bookappointmentapihelperfunction";
import { useParams } from "react-router-dom";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

const today = startOfToday();

const StyledPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "isAvailable",
})(({ theme, isAvailable }) => ({
    ...(isAvailable && {
        backgroundColor: "green",
        color: "white",
        "&:hover": {
            backgroundColor: "darkgreen",
        },
    }),
}));

dayjs.extend(utc);
dayjs.extend(timezone);

const steps = ["Details", "Date & Time", "Duration", "Questions", "Payment"];

/**
 * HorizontalLinearStepper Component - Appointment Booking Modal
 * 
 * Multi-step stepper for booking appointments:
 * 1. Patient details (name, gender, age, problem description, file upload)
 * 2. Date & Time selection (calendar, duration, time slots)
 * 3. Package selection (messaging, video, call plans)
 * 4. Health assessment questions
 * 5. Payment processing (Braintree)
 * 
 * Features:
 * - Form validation at each step ✅
 * - Payment integration with Braintree ✅
 * - File upload for medical reports ✅
 * - Toast notifications for errors/success ✅
 * 
 * API Endpoints:
 * - POST /sec/patient/getAvailableAppointmentDates (fetch available dates)
 * - POST /sec/patient/getAppointmentSlots (fetch time slots)
 * - POST /sec/patient/createAppointmentPackageSelect (fetch packages)
 * - POST /sec/patient/createAppointmentPackageQuestion (fetch questions)
 * - POST /sec/patient/createAppointment/ or /sec/patient/createAppointmentHcfDoctor (create appointment)
 * 
 * Security:
 * - Uses axiosInstance (automatic JWT token injection) ✅
 * - Validates all form inputs ✅
 * - Secure payment processing via Braintree ✅
 * 
 * @component
 */
export default function HorizontalLinearStepper({ drID, hcfDoc }) {
    logger.debug("🔵 BookingAppointmentModal component rendering", {
        hasDrID: !!drID,
        hcfDoc: !!hcfDoc
    });
    
    const params = useParams();
    
    // Extract IDs from props or URL params
    const doctorID = drID || params?.hcddocid; // Use drID prop first, fallback to URL params
    const hcfID = params?.reshcfID;
    
    logger.debug("🔍 BookingAppointmentModal IDs", {
        doctorID,
        hcfID,
        drIDFromProp: drID,
        hcfDoc
    });
    const { validateStepData, getStepErrors, clearStepErrors, hasStepErrors } = useFormValidation();
    
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [isLoading, setIsLoading] = React.useState(false);
    const [stepLoading, setStepLoading] = React.useState({});
    const [isUploadingFile, setIsUploadingFile] = React.useState(false);
    
    // Snackbar states
    const [showSnack, setShowSnack] = React.useState(false);
    const [showSnackError, setShowSnackError] = React.useState(false);
    const [availableDatesSnackError, setAvailableDatesSnackError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [availableDatesSnackMessage, setAvailableDatesSnackMessage] = useState("");
    const [showSnackMessage, setShowSnackMessage] = useState("");
    const [showSnackErrorMessage, setShowSnackErrorMessage] = useState("");
    
    // Data states
    const [time_slot, setTime_slot] = React.useState([]);
    const [question, setQuestion] = React.useState(null);
    const [customAvailableDates, setCustomAvailableDates] = useState([]);
    const [planfee, setPlanFee] = useState("");
    const [selectPackage, setSelectPackage] = React.useState([]);
    const [packageflag, setPackageFlag] = React.useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [duration, setDuration] = React.useState([]);
    const [doctorListId, setDoctorListId] = useState(null);
    
    // Payment states
    const [values, setValues] = React.useState({
        clientToken: null,
        success: "",
        error: "",
        instance: null,
    });
    const dropinInstanceRef = useRef(null);
    const [nonce, setNonce] = React.useState(null);
    const [braintreeKey, setBraintreeKey] = React.useState(0); // Key to force re-render
    const [isRefreshing, setIsRefreshing] = React.useState(false); // Loading state for refresh
    const [usedNonces, setUsedNonces] = React.useState(new Set()); // Track used nonces
    const [isProcessingPayment, setIsProcessingPayment] = React.useState(false); // Prevent duplicate payments
    const [isAppointmentBooked, setIsAppointmentBooked] = React.useState(false); // Track if appointment is already booked
    const [timeslotData, setTimeslotData] = React.useState({
        appointment_date: null,
        doctor_id: doctorID,
        duration: null,
    });

    const [appointmentData, setAppointmentData] = React.useState({
        appointment_date: null,
        appointment_time: null,
        patient_id: Number(localStorage.getItem("patient_suid")),
        doctor_id: doctorID,
        hcf_id: hcfID, // Add HCF ID for HCF doctor appointments
        fileName: null,
        file: null,
        action_done_by: 5,
        patient_type: null,
        name: null,
        gender: null,
        age: null,
        patient_report: null,
        answer_1: null,
        answer_2: null,
        answer_3: null,
        answer_4: null,
        answer_5: null,
        duration: null,
        doctor_fee_plan_id: null, //important plan and listing should be active
        payment_method_nonce: null,
        problem: null,
    });
    // Debug parameter mapping (removed console.log - using logger instead)
    logger.debug("🔧 BookingAppointmentModal parameter mapping", {
        hcfID,
        doctorID,
        hcfDoc,
        isHcfDoctorAppointment: !!hcfDoc
    });
    const [messagingPlan, setMessaginplanActive] = React.useState(false);
    const [voiceMessagingPlan, setVoiceMessaginplanActive] = React.useState(false);
    const [videoMessagingPlan, setVideoMessaginplanActive] = React.useState(false);

    // List of available dates range
    const rangeStartDate = new Date(0, 0, 0);
    const rangeEndDate = new Date(0, 0, 0);

    // Define custom available dates
    // const customAvailableDates = [new Date(2024, 6, 21), new Date(2024, 7, 2)];

    const isInRange = (date) =>
        isWithinInterval(date, { start: rangeStartDate, end: rangeEndDate });

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
     * Fetch available time slots for selected date and duration
     * Retrieves available appointment time slots from API
     */
    const fetch_Time_Slots = async () => {
        // Validate timeslot data before fetching
        if (!timeslotData.appointment_date || !timeslotData.duration) {
            logger.warn("⚠️ Missing date or duration for time slot fetch");
            return;
        }
        
        logger.debug("⏰ Fetching time slots", timeslotData);
        
        try {
            const response = await axiosInstance.post(
                "/sec/patient/getAppointmentSlots",
                timeslotData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Time slots API response received", {
                hasSlots: !!response?.data?.response?.availableSlots,
                slotsLength: response?.data?.response?.availableSlots?.length || 0,
            });
            
            // Validate response structure
            if (!response?.data?.response?.availableSlots || !Array.isArray(response.data.response.availableSlots)) {
                logger.warn("⚠️ Invalid time slots response structure");
                setTime_slot([]);
                return;
            }
            
            setTime_slot(response.data.response.availableSlots);
        } catch (err) {
            logger.error("❌ Failed to fetch time slots:", err);
            toastService.error(
                err?.response?.data?.message || 
                "Failed to load available time slots. Please try again."
            );
            setTime_slot([]);
        }
    };

    /**
     * Book appointment with payment nonce
     * Creates the appointment after payment verification
     * 
     * @param {string} nonce_value - Braintree payment nonce
     */
    const bookappointment = async (nonce_value) => {
        // Prevent duplicate appointment booking
        if (isAppointmentBooked) {
            logger.warn("⚠️ Appointment already booked, skipping duplicate booking");
            return;
        }
        
        // Validate nonce before proceeding
        if (!nonce_value || typeof nonce_value !== 'string') {
            logger.error("❌ Invalid payment nonce provided");
            toastService.error("Invalid payment information");
            setShowSnackError(true);
            return;
        }
        
        logger.debug("📝 Creating appointment", {
            isHcfDoctor: !!hcfDoc,
            hasHcfId: !!hcfID,
            hasDoctorId: !!doctorID,
            hasDate: !!appointmentData.appointment_date,
            hasTime: !!appointmentData.appointment_time
        });
        
        setShowSnack(false);
        setShowSnackError(false);
        
        try {
            // Select API endpoint based on appointment type
            const BookAppoinetmentApiPath = hcfDoc
                ? "/sec/patient/createAppointmentHcfDoctor"
                : "/sec/patient/createAppointment/";
            
            // Prepare appointment payload with payment nonce
            const appointmentPayload = {
                ...appointmentData,
                payment_method_nonce: nonce_value,
                hcf_id: hcfDoc ? hcfID : undefined, // Use hcfID for HCF appointments
                doctor_id: doctorID ? doctorID : undefined // Use doctorID for doctor appointments
            };
            
            const response = await axiosInstance.post(
                BookAppoinetmentApiPath,
                JSON.stringify(appointmentPayload),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Appointment created successfully", {
                hasResponse: !!response?.data
            });
            
            setShowSnack(true);
            setShowSnackError(false);
            setShowSnackMessage("Appointment booked successfully!");
            toastService.success("Appointment booked successfully!");
            setIsAppointmentBooked(true); // Mark appointment as booked
            
        } catch (error) {
            logger.error("❌ Failed to create appointment:", error);
            
            // Extract error message from response
            const errorMessage = error?.response?.data?.error || 
                                error?.response?.data?.message || 
                                "Failed to create appointment. Please try again.";
            
            setShowSnack(false);
            setShowSnackError(true);
            setShowSnackErrorMessage(errorMessage);
            toastService.error(errorMessage);
        }
    };
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        // Validate current step before proceeding
        // For questions step, pass the questions array
        const validation = activeStep === 3 
            ? validateStepData(activeStep, appointmentData, question)
            : validateStepData(activeStep, appointmentData);
        
        // Debug logging for questions step
        if (activeStep === 3) {
            logger.debug("❓ Questions validation debug", {
                questionsLength: question?.length || 0,
                answerKeys: Object.keys(appointmentData).filter(key => key.startsWith('answer_')),
                validation: validation
            });
        }
        
        if (!validation.isValid) {
            logger.warn("⚠️ Validation errors detected", { errors: validation.errors });
            toastService.error("Please fill in all required fields before proceeding");
            return; // Don't proceed if validation fails
        }
        
        // Clear any previous errors for this step
        clearStepErrors(activeStep);
        
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

    // Clear payment form and reset nonce
    const clearPaymentForm = () => {
        setNonce(null);
        setAppointmentData({ ...appointmentData, payment_method_nonce: null });
        setUsedNonces(new Set()); // Clear used nonces
        setIsAppointmentBooked(false); // Reset appointment booked state
        // Clear the Braintree form
        if (values?.instance) {
            values.instance.clearSelectedPaymentMethod();
        }
    };

    /**
     * Force refresh of Braintree Drop-In instance
     * Regenerates client token and resets the payment form
     */
    const refreshBraintreeInstance = async () => {
        logger.debug("🔄 Refreshing Braintree Drop-In instance...");
        setIsRefreshing(true);
        
        try {
            // Get fresh client token
            const freshToken = await generateClientToken();
            logger.debug("✅ Generated fresh client token", { hasToken: !!freshToken });
            
            // Update values with fresh token; clear stale instance reference
            setValues(prev => ({ ...prev, clientToken: freshToken, instance: null }));
            dropinInstanceRef.current = null;
            
            // Clear any existing nonce and used nonces
            setNonce(null);
            setAppointmentData({ ...appointmentData, payment_method_nonce: null });
            setUsedNonces(new Set()); // Clear used nonces
            setIsAppointmentBooked(false); // Reset appointment booked state
            
            // Force re-render of Braintree component by incrementing key
            setBraintreeKey(prev => prev + 1);
            
            logger.debug("✅ Braintree instance refreshed successfully");
            toastService.success("Payment form refreshed successfully");
        } catch (error) {
            logger.error("❌ Error refreshing Braintree instance:", error);
            toastService.error("Failed to refresh payment form. Please try again.");
        } finally {
            setIsRefreshing(false);
        }
    };

    // api function to fetch purchase plan
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
        
        try {
            setIsLoading(true);
            setIsProcessingPayment(true);
            
            // Both development and production use real Braintree nonce
            // Development uses sandbox, production uses live environment
            const environment = isDevelopmentMode() ? "sandbox" : "production";
            logger.debug(`💳 Getting fresh Braintree ${environment} nonce`);
            
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
                console.error("Braintree instance validation failed:", error);
                if (error.message.includes("refresh")) {
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
                    
                    logger.debug(`✅ Generated fresh Braintree ${environment} nonce`, {
                        attempt: retryCount + 1,
                        hasNonce: !!nonce_value
                    });
                    
                    if (nonce_value && typeof nonce_value === 'string') {
                        break; // Success, exit retry loop
                    }
                } catch (error) {
                    logger.error(`❌ Nonce generation attempt ${retryCount + 1} failed:`, error);
                    
                    if (error.message && error.message.includes('teardown')) {
                        logger.warn("⚠️ Teardown error detected, refreshing Braintree instance...");
                await refreshBraintreeInstance();
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for new instance
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
            
            // Check if this nonce has already been used
            if (usedNonces.has(nonce_value)) {
                logger.warn("⚠️ Nonce already used, refreshing Braintree instance...");
                await refreshBraintreeInstance();
                throw new Error("Payment form has been refreshed. Please try again.");
            }
            
            // Add nonce to used set
            setUsedNonces(prev => new Set([...prev, nonce_value]));
            
            // Update nonce and appointment data with fresh nonce
            setNonce(nonce_value);
        setAppointmentData({ ...appointmentData, payment_method_nonce: nonce_value });

            // Do not call sandbox payment endpoint here. Just book appointment with nonce.
            await bookappointment(nonce_value);
            setIsAppointmentBooked(true);
            clearPaymentForm();

        } catch (error) {
            logger.error("❌ Error in payment processing:", error);
            setShowSnackError(true);
            
            // Extract error message
            const errorMessage = error?.message || 
                                error?.response?.data?.message || 
                                "Payment processing failed. Please try again.";
            
            // Handle specific teardown error
            if (error.message && error.message.includes('teardown')) {
                setShowSnackErrorMessage("Payment form has been reset. Please refresh the payment form and try again.");
                toastService.error("Payment form has been reset. Please refresh and try again.");
            } else if (error.message && error.message.includes('no longer valid')) {
                // Automatically refresh the Braintree instance for this specific error
                logger.warn("⚠️ Automatically refreshing Braintree instance due to invalid instance error...");
                try {
                    await refreshBraintreeInstance();
                    setShowSnackErrorMessage("Payment form has been automatically refreshed. Please try again.");
                    toastService.info("Payment form has been refreshed. Please try again.");
                } catch (refreshError) {
                    logger.error("❌ Failed to auto-refresh Braintree instance:", refreshError);
                    setShowSnackErrorMessage("Payment form is no longer valid. Please refresh the page and try again.");
                    toastService.error("Payment form refresh failed. Please refresh the page.");
                }
            } else {
                setShowSnackErrorMessage(errorMessage);
                toastService.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
            setIsProcessingPayment(false);
        }
    };

    // Note: Payment is processed server-side during appointment creation.

    // api function to fetch questions
    // const fetchQuestions = async () => {
    //     try {
    //         const response = await axiosInstance.post(
    //             "/sec/patient/createAppointmentPackageQuestion/",
    //             JSON.stringify({
    //                 doctor_id: drID,
    //                 is_active: 1,
    //             }),
    //         );
    //         setQuestion(response?.data?.response?.questions);
    //     } catch (err) {
    //         console.log("Questions Error : ", err);
    //     }
    // };

    //  api function to fetch the doctor duration slots
    // const fetchDocDuration = async () => {
    //     try {
    //         const response = await axiosInstance(`/sec/patient/getAppointmentPlanDuration/${drID}`);
    //         // console.log("Suration : ", response.data?.response?.durations);
    //         let duration = [];
    //         for (let key in response.data?.response?.durations) {
    //             // console.log("durations :   ==   ",response.data?.response?.durations[key]?.plan_duration);
    //             duration.push(response.data?.response?.durations[key]?.plan_duration);
    //         }
    //         console.log(duration);
    //         setDuration(duration);
    //     } catch (err) {
    //         console.log("Duration Error : ", err);
    //     }
    // };

    // api function to fetch the select package


    /**
     * Fetch selectable appointment packages
     * Retrieves available consultation packages based on doctor and duration
     */
    const fetchSelectPackage = async () => {
        // Validate doctor ID and duration before fetching
        if (!doctorID) {
            logger.warn("⚠️ Doctor ID is missing, cannot fetch packages");
            return;
        }
        
        if (!appointmentData?.duration) {
            logger.warn("⚠️ Duration is not selected, cannot fetch packages");
            return;
        }
        
        logger.debug("📦 Fetching selectable packages", {
            doctorID,
            duration: appointmentData.duration
        });
        
        try {
            const response = await axiosInstance.post(
                "/sec/patient/createAppointmentPackageSelect/",
                JSON.stringify({
                    doctor_id: doctorID,
                    is_active: 1,
                    duration: appointmentData?.duration,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Package API response received", {
                hasPlan: !!response?.data?.response?.plan,
                planLength: response?.data?.response?.plan?.length || 0,
            });
            
            // Validate response structure
            if (!response?.data?.response?.plan || !Array.isArray(response.data.response.plan)) {
                logger.warn("⚠️ Invalid packages response structure");
                setSelectPackage([]);
                return;
            }
            
            setDoctorListId(response.data?.response?.plan[0]?.doctor_list_id);
            setSelectPackage(response.data.response.plan);
        } catch (err) {
            logger.error("❌ Failed to fetch packages:", err);
            toastService.error(
                err?.response?.data?.message || 
                "Failed to load packages. Please try again."
            );
            setSelectPackage([]);
        }
    };

    /**
     * Fetch appointment questions for selected package
     * Retrieves health assessment questions based on doctor and package
     */
    const fetchQuestions = async () => {
        // Validate doctor ID and list ID before fetching
        if (!doctorID) {
            logger.warn("⚠️ Doctor ID is missing, cannot fetch questions");
            return;
        }
        
        if (!doctorListId) {
            logger.warn("⚠️ Doctor list ID is missing, cannot fetch questions");
            return;
        }
        
        logger.debug("❓ Fetching appointment questions", { doctorID, doctorListId });
        
        try {
            const response = await axiosInstance.post(
                "/sec/patient/createAppointmentPackageQuestion/",
                JSON.stringify({
                    doctor_id: doctorID,
                    is_active: 1,
                    doctor_list_id: doctorListId,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Questions API response received", {
                hasQuestions: !!response?.data?.response?.questions,
                questionsLength: response?.data?.response?.questions?.length || 0,
            });
            
            // Validate response structure
            if (!response?.data?.response?.questions) {
                logger.warn("⚠️ No questions found in response");
                setQuestion([]);
                return;
            }
            
            setQuestion(response.data.response.questions);
        } catch (err) {
            logger.error("❌ Failed to fetch questions:", err);
            toastService.error(
                err?.response?.data?.message || 
                "Failed to load questions. Please try again."
            );
            setQuestion([]);
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
        
        logger.debug("📅 Date selected for appointment", { date });
        setSelectedDate(date);
        
        const formatDateResp = formatDate(date);
        
        if (!formatDateResp) {
            logger.error("❌ Failed to format selected date");
            toastService.error("Invalid date selected");
            return;
        }
        
        logger.debug("✅ Date formatted successfully", { formattedDate: formatDateResp });
        
        // Clear previous selections when date changes
        setAppointmentData({ 
            ...appointmentData, 
            appointment_date: formatDateResp,
            duration: null, // Clear previous duration selection
            appointment_time: null, // Clear previous time selection
        });
        
        // Clear previous selections
        setDuration([]);
        setTime_slot([]);
        
        // Fetch available durations for the selected date
        fetchDocDuration(doctorID, formatDateResp)
            .then((duration) => {
                logger.debug("✅ Duration fetched successfully", { 
                    durationsCount: duration?.length || 0 
                });
                setDuration(duration || []);
            })
            .catch((err) => {
                logger.error("❌ Error fetching durations:", err);
                toastService.error("Failed to load available durations. Please try again.");
                setDuration([]);
            });
    };

    // to select the package
    React.useEffect(() => {
        fetchSelectPackage();
    }, [packageflag]);

    /**
     * useEffect: Fetch time slots when date and duration are selected
     * Automatically fetches available time slots when both appointment_date and duration are set
     */
    React.useEffect(() => {
        if (timeslotData.appointment_date && timeslotData.duration) {
            logger.debug("⏰ Fetching time slots", timeslotData);
            fetch_Time_Slots();
        }
    }, [timeslotData]);

    // calling payment api --------

    const FetchDoctorAvailableDates = async () => {
        setAvailableDatesSnackError(false);
        try {
            const resp = await axiosInstance.post(
                "/sec/patient/getAvailableAppointmentDates",
                JSON.stringify({
                    doctor_id: Number(doctorID),
                }),
            );
            let date = resp?.data?.availableDates;
            let availableDates = date.map((dateString) => {
                const [year, month, day] = dateString.split("-").map(Number);
                return new Date(year, month - 1, day); // month -1 to get the correct month
            });
            setCustomAvailableDates(availableDates);
        } catch (err) {
            setAvailableDatesSnackError(true);
            setCustomAvailableDates([]);
            setAvailableDatesSnackMessage(err?.response?.data?.error);
        }
    };

    React.useEffect(() => {
        // Initialize payment token based on environment
        initializePaymentToken();

        setAvailableDatesSnackError(false);
        FetchDoctorAvailableDates();
    }, []);

    // Initialize payment token with environment-based handling
    const initializePaymentToken = async () => {
        try {
            // Both development and production use real Braintree tokens
            // Development uses sandbox, production uses live environment
            const environment = isDevelopmentMode() ? "sandbox" : "production";
            logger.debug(`🔑 Generating Braintree ${environment} token`);
            
            const token = await generateClientToken();
            logger.debug(`✅ Generated Braintree ${environment} token`, {
                hasToken: !!token
            });
            setValues(prev => ({ ...prev, clientToken: token }));
        } catch (error) {
            logger.error("❌ Error initializing payment token:", error);
            toastService.error("Failed to initialize payment form. Please refresh the page.");
            // Fallback to mock token in case of error
            const fallbackToken = `fallback_token_${Date.now()}`;
            setValues(prev => ({ ...prev, clientToken: fallbackToken }));
        }
    };

    /**
     * Refresh payment token for new payment attempts
     * Regenerates Braintree client token
     */
    const refreshPaymentToken = async () => {
        try {
            logger.debug("🔄 Refreshing payment token for new payment attempt...");
            await initializePaymentToken();
            toastService.success("Payment form refreshed successfully");
        } catch (error) {
            logger.error("❌ Error refreshing payment token:", error);
            toastService.error("Failed to refresh payment form. Please try again.");
        }
    };

    /**
     * useEffect: Fetch questions when doctor list ID changes
     * Loads health assessment questions when a package is selected
     */
    React.useEffect(() => {
        if (doctorListId) {
            fetchQuestions();
        }
    }, [doctorListId]);
    
    // Debug logging for development (removed console.log - using logger for important info)
    if (process.env.NODE_ENV === 'development') {
        logger.debug("📋 Appointment data state", {
            hasDate: !!appointmentData.appointment_date,
            hasTime: !!appointmentData.appointment_time,
            hasPackage: !!appointmentData.doctor_fee_plan_id,
            planFee: planfee
        });
    }

    const handleFileInput = async (event) => {
        const file = event.target.files[0]; // Get the file object
        if (file) {
            const fileName = file.name;
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Data = reader.result.split(",")[1]; // Extract base64 without metadata
                
                setIsUploadingFile(true);
                
                try {
                    // Upload file using the new service
                    logger.debug("📤 Uploading file to S3", { fileName, fileSize: base64Data.length });
                    
                    const uploadResponse = await axiosInstance.post(
                        "/sec/reports/uploadAppointmentFileToS3",
                        JSON.stringify({
                            fileName: fileName,
                            file: base64Data
                        }),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    
                    logger.debug("✅ File upload response received", {
                        hasResponse: !!uploadResponse?.data,
                        fileName: uploadResponse?.data?.fileName
                    });
                    
                    // Update appointment data with file information
                setAppointmentData({
                    ...appointmentData,
                        fileName: uploadResponse.data.fileName,
                        file: uploadResponse.data.file, // This will be base64 in dev, S3 URL in prod
                        filePath: uploadResponse.data.filePath, // Store the file path
                    });
                    
                    // Show success message
                    setShowSnack(true);
                    setShowSnackMessage("File uploaded successfully!");
                    
                } catch (error) {
                    logger.error("❌ File upload error:", error);
                    
                    const errorMessage = error?.response?.data?.message || 
                                        error?.response?.data?.error || 
                                        "Failed to upload file. Please try again.";
                    
                    setShowSnackError(true);
                    setShowSnackErrorMessage(errorMessage);
                    toastService.error(errorMessage);
                } finally {
                    setIsUploadingFile(false);
                }
            };

            reader.readAsDataURL(file); // Read the file as Data URL
        }
    };

    return (
        <Box className="booking-modal-container">
            {/* Snackbars */}
            <CustomSnackBar
                isOpen={availableDatesSnackError}
                message={availableDatesSnackMessage}
                type="error"
            />
            <CustomSnackBar
                isOpen={showSnack}
                message={showSnackMessage || "Appointment Booked Successfully"}
                type="success"
            />
            <CustomSnackBar
                isOpen={showSnackError}
                message={showSnackErrorMessage || "Can not book appointment try some other time "}
                type="error"
            />

            {/* Progress Stepper */}
            <Box className="stepper-container">
                <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                        
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                        
                    return (
                        <Step key={label} {...stepProps}>
                                <StepLabel 
                                    {...labelProps}
                                    StepIconComponent={({ active, completed, icon }) => (
                                        <Box className={`step-icon ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}>
                                            {completed ? '✓' : icon}
                                        </Box>
                                    )}
                                >
                                    {label}
                                </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            </Box>
            {activeStep === steps.length ? (
                <StepContent 
                    title="Appointment Booked Successfully!" 
                    subtitle="Your appointment has been confirmed. You will receive a confirmation email shortly."
                >
                    <Box className="success-content">
                        <Typography variant="h6" color="success.main" gutterBottom>
                            🎉 Congratulations!
                    </Typography>
                        <Typography variant="body1" paragraph>
                            Your appointment has been successfully booked. Here are the details:
                        </Typography>
                        <Box className="appointment-details">
                            <Typography variant="body2">
                                <strong>Date:</strong> {appointmentData.appointment_date}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Time:</strong> {appointmentData.appointment_time}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Duration:</strong> {appointmentData.duration}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Amount Paid:</strong> ₹{planfee}
                            </Typography>
                        </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset} variant="outlined">
                                Book Another Appointment
                            </Button>
                    </Box>
                    </Box>
                </StepContent>
            ) : (
                <React.Fragment>
                    {/* Step Error Display */}
                    {hasStepErrors(activeStep) && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Please fix the following errors:
                            </Typography>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                {getStepErrors(activeStep).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    {/* Step Content */}
                        {activeStep === 0 ? (
                        <StepContent 
                            title={getStepTitle(0)} 
                            subtitle={getStepSubtitle(0)}
                        >
                            <Box className="form-grid">
                                <Box className="form-section">
                                    <Typography variant="h6" gutterBottom>
                                        Patient Information
                                    </Typography>
                                    <CustomRadioButton
                                        label={"Patient Type"}
                                        handleChange={({ target }) =>
                                            setAppointmentData({
                                                ...appointmentData,
                                                patient_type:
                                                    target?.value === "My Self"
                                                        ? "patient"
                                                        : target?.value === "Minor"
                                                            ? "minor"
                                                            : null,
                                            })
                                        }
                                        value={
                                            appointmentData.patient_type === "patient"
                                                ? "My Self"
                                                : appointmentData.patient_type === "minor"
                                                    ? "Minor"
                                                    : null
                                        }
                                        radioGroupCss={{ flexDirection: "row", gap: 2 }}
                                        radiocss={{ display: "flex" }}
                                        items={["My Self", "Minor"]}
                                    />
                                </Box>

                                <Box className="form-section">
                                    <CustomTextField
                                        onInput={(event) =>
                                            setAppointmentData({
                                                ...appointmentData,
                                                name: event?.target?.value,
                                            })
                                        }
                                        defaultValue={appointmentData?.name}
                                        CustomValue={appointmentData?.name}
                                        label={"Full Name"}
                                        helperText="Enter your full name as it appears on your ID"
                                        required
                                    />
                                </Box>

                                <Box className="form-row">
                                    <CustomDropdown
                                        label={"Gender"}
                                        items={["Male", "Female", "I prefer not to say"]}
                                        dropdowncss={{ m: 0, minWidth: "100%" }}
                                        activeItem={appointmentData?.gender}
                                        handleChange={(item) =>
                                            setAppointmentData({
                                                ...appointmentData,
                                                gender: item,
                                            })
                                        }
                                        menuItemValue=""
                                        required
                                    />
                                    <CustomDropdown
                                        label={"Age"}
                                        items={[...Array(101).keys()]}
                                        dropdowncss={{ m: 0, minWidth: "100%" }}
                                        activeItem={appointmentData?.age}
                                        handleChange={(item) =>
                                            setAppointmentData({
                                                ...appointmentData,
                                                age: Number(item),
                                            })
                                        }
                                        menuItemValue=""
                                        required
                                    />
                                </Box>

                                <Box className="form-section">
                                    <Typography variant="h6" gutterBottom>
                                        Medical Information
                                    </Typography>
                                    
                                    <Box className="file-upload-container">
                                        <Typography variant="body2" gutterBottom>
                                            Upload Medical Reports (Optional)
                                        </Typography>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            onChange={handleFileInput}
                                            className="file-input"
                                            accept=".pdf,.docx,.jpg,.jpeg,.png"
                                            disabled={isUploadingFile}
                                        />
                                        <label htmlFor="fileInput" className="file-upload-label">
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                startIcon={isUploadingFile ? <CircularProgress size={16} /> : <span>📁</span>}
                                                className="file-upload-button"
                                                disabled={isUploadingFile}
                                            >
                                                {isUploadingFile ? "Uploading..." : "Choose File"}
                                            </Button>
                                            <Typography variant="body2" className="file-name">
                                                {appointmentData.fileName || "No file selected"}
                                            </Typography>
                                        </label>
                                    </Box>

                                    <TextField
                                        label="Describe your problem"
                                        placeholder="Please describe your symptoms, concerns, or the reason for this appointment..."
                                        value={appointmentData.problem || ""}
                                        onChange={(event) =>
                                            setAppointmentData({
                                                ...appointmentData,
                                                problem: event?.target?.value,
                                            })
                                        }
                                        multiline
                                        rows={4}
                                        maxRows={6}
                                        fullWidth
                                        required
                                        helperText="Please provide as much detail as possible to help the doctor understand your condition"
                                    />
                                </Box>
                            </Box>
                        </StepContent>
                        ) : activeStep === 1 ? (
                        <StepContent 
                            title={getStepTitle(1)} 
                            subtitle={getStepSubtitle(1)}
                        >
                                {customAvailableDates.length === 0 ? (
                                <EmptyState 
                                    title="No Available Dates"
                                    description={availableDatesSnackMessage || "No appointment slots are available for this doctor."}
                                    onAction={() => window.location.reload()}
                                />
                            ) : (
                                <Box className="date-time-section">
                                    <Box className="calendar-container">
                                        <Typography variant="h6" gutterBottom>
                                            Select Appointment Date
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateCalendar
                                                value={selectedDate}
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
                                    
                                    <Box className="duration-container">
                                        <Typography variant="h6" gutterBottom>
                                            Select Duration
                                        </Typography>
                                        {!appointmentData?.appointment_date ? (
                                            <Typography variant="body2" color="text.secondary">
                                                Please select a date first to see available durations.
                                            </Typography>
                                        ) : duration?.length === 0 ? (
                                            <Box className="loading-container">
                                                <CircularProgress size={24} />
                                                <Typography variant="body2" sx={{ ml: 1 }}>
                                                    Loading available durations...
                                                </Typography>
                                            </Box>
                                        ) : (
                                    <CustomDropdown
                                                label={"Appointment Duration"}
                                                items={duration}
                                        activeItem={appointmentData?.duration}
                                                handleChange={(item) => {
                                                    logger.debug("⏱️ Duration selected", { duration: item });
                                            setAppointmentData({
                                                ...appointmentData,
                                                duration: item,
                                                        appointment_time: null, // Clear previous time selection
                                            });
                                                    
                                                    const newTimeslotData = {
                                                ...timeslotData,
                                                        appointment_date: appointmentData?.appointment_date,
                                                duration: item,
                                                    };
                                                    
                                                    logger.debug("✅ Updated timeslot data", newTimeslotData);
                                                    setTimeslotData(newTimeslotData);
                                                    
                                                    // Clear previous time slots
                                                    setTime_slot([]);
                                                }}
                                                CustomSx={{ width: "100%" }}
                                        menuItemValue=""
                                                required
                                    />
                                        )}
                                </Box>
                                </Box>
                            )}
                        </StepContent>
                        ) : activeStep === 2 ? (
                        <StepContent 
                            title={getStepTitle(2)} 
                            subtitle={getStepSubtitle(2)}
                        >
                            <Box className="package-selection">
                                {/* Time Slot Selection - Only show if date and duration are selected */}
                                {appointmentData?.appointment_date && appointmentData?.duration ? (
                                    <Box className="time-slot-section">
                                        <Typography variant="h6" gutterBottom>
                                            Select Time Slot
                                        </Typography>
                                        {time_slot?.length === 0 ? (
                                            <Box className="loading-container">
                                                <CircularProgress size={24} />
                                                <Typography variant="body2" sx={{ ml: 1 }}>
                                                    Loading available time slots...
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <CustomDropdown
                                                label={"Available Time Slots"}
                                                items={time_slot}
                                                dropdowncss={{ width: "100%" }}
                                                activeItem={appointmentData?.appointment_time}
                                                handleChange={(item) => {
                                                    logger.debug("⏰ Time slot selected", { timeSlot: item });
                                                    
                                                    // Format time to ensure it's in the correct format (09:00 - 10:00)
                                                    const formatTimeSlot = (timeSlot) => {
                                                        if (!timeSlot) return timeSlot;
                                                        
                                                        // If already in correct format, return as is
                                                        if (timeSlot.includes(' - ')) {
                                                            return timeSlot;
                                                        }
                                                        
                                                        // If it's a single time, assume it's start time and add 30 minutes
                                                        if (timeSlot.match(/^\d{1,2}:\d{2}$/)) {
                                                            const [hours, minutes] = timeSlot.split(':');
                                                            const startTime = new Date();
                                                            startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                                                            
                                                            const endTime = new Date(startTime);
                                                            endTime.setMinutes(endTime.getMinutes() + 30);
                                                            
                                                            const formatTime = (date) => {
                                                                const h = date.getHours().toString().padStart(2, '0');
                                                                const m = date.getMinutes().toString().padStart(2, '0');
                                                                return `${h}:${m}`;
                                                            };
                                                            
                                                            return `${formatTime(startTime)} - ${formatTime(endTime)}`;
                                                        }
                                                        
                                                        return timeSlot;
                                                    };
                                                    
                                                    const formattedTime = formatTimeSlot(item);
                                                    logger.debug("✅ Formatted time slot", { 
                                                        original: item, 
                                                        formatted: formattedTime 
                                                    });
                                                    
                                                    setAppointmentData({
                                                        ...appointmentData,
                                                        appointment_time: formattedTime,
                                                    });
                                                    setPackageFlag(!packageflag);
                                                }}
                                                CustomSx={{ width: "100%" }}
                                                menuItemValue=""
                                                required
                                            />
                                        )}
                                        </Box>
                                ) : (
                                    <Box className="time-slot-section">
                                        <Typography variant="h6" gutterBottom>
                                            Select Time Slot
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Please select a date and duration first to see available time slots.
                                        </Typography>
                                    </Box>
                                )}

                                <Box className="package-section">
                                    <Typography variant="h6" gutterBottom>
                                        Choose Your Package
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        Select the consultation package that best fits your needs
                                    </Typography>

                                    <Box className="package-grid">
                                        {!appointmentData?.appointment_time ? (
                                            <Typography variant="body2" color="text.secondary">
                                                Please select a time slot first to see available packages.
                                            </Typography>
                                        ) : selectPackage?.length === 0 ? (
                                            <EmptyState 
                                                title="No Packages Available"
                                                description="No consultation packages are available for the selected time slot."
                                                onAction={() => window.location.reload()}
                                                />
                                            ) : (
                                            selectPackage?.map((data, index) => {
                                                    const plan =
                                                        data?.plan_name === "message"
                                                            ? messagingPlan
                                                            : data?.plan_name === "video"
                                                                ? videoMessagingPlan
                                                                : data?.plan_name === "call"
                                                                    ? voiceMessagingPlan
                                                                : false;
                                                
                                                const isSelected = appointmentData.doctor_fee_plan_id === data?.doctor_fee_plan_id;
                                                
                                                    return (
                                                        <Box
                                                        key={index}
                                                        className={`package-card ${isSelected ? 'selected' : ''}`}
                                                            onClick={() => {
                                                                setAppointmentData({
                                                                    ...appointmentData,
                                                                doctor_fee_plan_id: data?.doctor_fee_plan_id,
                                                                });

                                                                setPlanFee(data?.plan_fee);

                                                            // Reset all plan states
                                                            setMessaginplanActive(false);
                                                            setVoiceMessaginplanActive(false);
                                                            setVideoMessaginplanActive(false);

                                                            // Set the selected plan
                                                                if (data?.plan_name === "message") {
                                                                    setMessaginplanActive(true);
                                                            } else if (data?.plan_name === "video") {
                                                                setVideoMessaginplanActive(true);
                                                            } else if (data?.plan_name === "call") {
                                                                setVoiceMessaginplanActive(true);
                                                            }
                                                        }}
                                                    >
                                                        <Box className="package-card-content">
                                                            <Box className="package-info">
                                                                <Box className="package-icon">
                                                                    <Box
                                                                        component="img"
                                                                        src={messageLogo}
                                                                        alt="plan icon"
                                                                        className="plan-icon"
                                                                    />
                                                                </Box>
                                                                <Box className="package-details">
                                                                    <Typography className="package-name">
                                                                            {data?.plan_name === "call"
                                                                                ? "Call Plan"
                                                                                : data?.plan_name === "message"
                                                                                    ? "Messaging Plan"
                                                                                    : data?.plan_name === "video"
                                                                                        ? "Video Plan"
                                                                                    : "Consultation Plan"}
                                                                        </Typography>
                                                                    <Typography className="package-description">
                                                                            {data?.plan_name === "call"
                                                                            ? "Voice call with doctor"
                                                                                : data?.plan_name === "message"
                                                                                    ? "Chat and message with doctor"
                                                                                    : data?.plan_name === "video"
                                                                                    ? "Video call & messaging"
                                                                                    : "General consultation"}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>

                                                            <Box className="package-pricing">
                                                                <Typography className="package-price">
                                                                    ₹{data?.plan_fee}
                                                                    </Typography>
                                                                <Typography className="package-duration">
                                                                        {data?.plan_duration}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    );
                                                })
                                            )}

                                        </Box>
                                    </Box>
                                </Box>
                        </StepContent>
                        ) : activeStep === 3 ? (
                        <StepContent 
                            title={getStepTitle(3)} 
                            subtitle={getStepSubtitle(3)}
                        >
                            <Box className="questions-section">
                                <Typography variant="h6" gutterBottom>
                                    Health Assessment Questions
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    Please answer these questions to help the doctor better understand your condition
                                </Typography>
                                
                                {/* Progress indicator */}
                                {question && question.length > 0 && (
                                    <Box className="questions-progress">
                                        <Typography variant="body2" color="text.secondary">
                                            Progress: {Object.keys(appointmentData).filter(key => key.startsWith('answer_') && appointmentData[key]).length} of {question.length} questions answered
                                        </Typography>
                                        <Box className="progress-bar">
                                            <Box 
                                                className="progress-fill"
                                                style={{
                                                    width: `${(Object.keys(appointmentData).filter(key => key.startsWith('answer_') && appointmentData[key]).length / question.length) * 100}%`
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                )}
                                
                                        {question == null ? (
                                    <Box className="loading-container">
                                        <CircularProgress size={24} />
                                        <Typography variant="body2" sx={{ ml: 1 }}>
                                            Loading questions...
                                        </Typography>
                                    </Box>
                                ) : question.length === 0 ? (
                                    <EmptyState 
                                        title="No Questions Available"
                                        description="There are no assessment questions for this appointment."
                                    />
                                ) : (
                                    <Box className="questions-list">
                                        {question.map((data, index) => {
                                            const answers = [];
                                                for (const key in data) {
                                                    if (
                                                        key !== "doctor_questions_id" &&
                                                    key !== "question" &&
                                                    data[key] // Only include non-empty answers
                                                    ) {
                                                    answers.push(data[key]);
                                                    }
                                                }

                                                return (
                                                <Box key={index} className="question-item">
                                                    <CustomDropdown
                                                        label={data?.question}
                                                        items={answers}
                                                        activeItem={appointmentData?.[`answer_${index + 1}`]}
                                                        handleChange={(item) => {
                                                            logger.debug("✅ Question answered", {
                                                                questionIndex: index + 1,
                                                                answer: item
                                                            });
                                                            setAppointmentData({
                                                                ...appointmentData,
                                                                [`answer_${index + 1}`]: item,
                                                            });
                                                        }}
                                                        menuItemValue=""
                                                        required
                                                    />
                                                </Box>
                                                );
                                        })}
                                    </Box>
                                        )}
                                    </Box>
                        </StepContent>
                        ) : activeStep === 4 ? (
                        <StepContent 
                            title={getStepTitle(4)} 
                            subtitle={getStepSubtitle(4)}
                        >
                            <Box className="payment-section">
                                <Box className="payment-summary">
                                    <Typography variant="h6" gutterBottom>
                                        Payment Summary
                                    </Typography>
                                    <Box className="amount-display">
                                        <Typography variant="h4" color="primary">
                                            ₹{planfee}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total amount to be paid
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box className="payment-method">
                                    <Typography variant="h6" gutterBottom>
                                        Payment Method
                                    </Typography>
                                    
                                    {values?.clientToken ? (
                                        <Box className="payment-container">
                                            {isDevelopmentMode() && (
                                                <Box className="development-payment-notice">
                                                    <Typography variant="body2" color="warning.main" sx={{ 
                                                        p: 2, 
                                                        backgroundColor: 'warning.light', 
                                                        borderRadius: 1,
                                                        mb: 2,
                                                        textAlign: 'center'
                                                    }}>
                                                        🧪 Development Mode: Braintree Sandbox Payment
                                                    </Typography>
                                                </Box>
                                            )}
                                            
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
                                            
                                            <Box className="payment-button-container">
                                                        <CustomButton
                                                    label={
                                                        isAppointmentBooked 
                                                            ? "Appointment Booked!" 
                                                            : (isDevelopmentMode() ? "Complete Sandbox Payment" : "Complete Payment")
                                                    }
                                                            handleClick={() => Purchase_plan()}
                                                    disabled={!values?.instance || isRefreshing || isProcessingPayment || isAppointmentBooked}
                                                    buttonCss={{
                                                        width: "100%",
                                                        padding: "12px 24px",
                                                        fontSize: "16px",
                                                        fontWeight: "600",
                                                        backgroundColor: isAppointmentBooked 
                                                            ? "#4caf50" 
                                                            : (!values?.instance || isRefreshing || isProcessingPayment) 
                                                                ? "#adb5bd" 
                                                                : (isDevelopmentMode() ? "#ff9800" : "#e72b4a"),
                                                        marginBottom: "8px",
                                                        opacity: (!values?.instance || isRefreshing || isProcessingPayment || isAppointmentBooked) ? 0.7 : 1
                                                    }}
                                                />
                                                <CustomButton
                                                    label={isRefreshing ? "Refreshing..." : "Refresh Payment Form"}
                                                    handleClick={async () => {
                                                        await refreshBraintreeInstance();
                                                    }}
                                                    disabled={isRefreshing}
                                                    buttonCss={{
                                                        width: "100%",
                                                        padding: "8px 16px",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        backgroundColor: isRefreshing ? "#adb5bd" : "#6c757d",
                                                        color: "white",
                                                        opacity: isRefreshing ? 0.7 : 1
                                                    }}
                                                />
                                                {!values?.instance && (
                                                    <Typography variant="body2" sx={{ 
                                                        color: "#d32f2f", 
                                                        textAlign: "center", 
                                                        mt: 1,
                                                        fontSize: "12px"
                                                    }}>
                                                        Payment form is not ready. Please wait or refresh.
                                                    </Typography>
                                                )}
                                    </Box>
                                            </Box>
                                    ) : (
                                        <Box className="loading-container">
                                            <CircularProgress size={24} />
                                            <Typography variant="body2" sx={{ ml: 1 }}>
                                                Loading payment gateway...
                                            </Typography>
                                            </Box>
                                    )}
                                        </Box>

                                <Box className="appointment-terms">
                                    <Typography variant="h6" gutterBottom>
                                        Important Terms
                                    </Typography>
                                    <Box component="ul" className="terms-list">
                                        <Box component="li">
                                            <Typography variant="body2">
                                                You have 48 hours of chat access after the appointment
                                            </Typography>
                                    </Box>
                                        <Box component="li">
                                            <Typography variant="body2">
                                                You can cancel the appointment up to 2 hours before the scheduled time
                                            </Typography>
                                </Box>
                                        <Box component="li">
                                            <Typography variant="body2">
                                                You can reschedule your appointment up to 2 times
                                            </Typography>
                            </Box>
                                        <Box component="li">
                                            <Typography variant="body2">
                                                All payments are processed securely through our payment gateway
                    </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            </Box>
                        </StepContent>
                    ) : null}
                    
                    {/* Navigation Buttons */}
                    <Box className="navigation-buttons">
                        <Button
                            variant="outlined"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className="back-button"
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button 
                            variant="contained"
                            onClick={handleNext}
                            className="next-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <CircularProgress size={16} sx={{ mr: 1 }} />
                                    Processing...
                                </>
                            ) : activeStep === steps.length - 1 ? (
                                "Complete Payment"
                            ) : (
                                "Next"
                            )}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
