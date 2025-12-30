import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import CustomButton from "../../../../components/CustomButton";
import { DoctorInfo } from "./DoctorInfo";
import CustomTextField from "../../../../components/CustomTextField";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";
import CustomModal from "../../../../components/CustomModal";
import CustomOTPInput from "../../../../components/OTPInput";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import CustomSnackBar from "../../../../components/CustomSnackBar";
import AddPlanCard from "../../../../DoctorModule/DoctorListing/CreateNewListing/AddPlan/AddPlanCard";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import ListingModal from "../../../../HCFModule/HCFAdmin/AdminDoctor/AddPackage/clinicListingModal";
import HCFAddQuestioner from "./HCFAddQuestioner";
import HCFAddTerms from "./HCFAddTerms";
import AddIcon from "@mui/icons-material/Add";
import { NavLink, useNavigate } from "react-router-dom";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback

function createData(name, action) {
    return { name, action };
}

const rows = [
    createData(
        <DoctorInfo name={"Dr. Maria Garcia"} specialist={"Neurologist"} />,
        <CustomButton label="Remove" isTransaprent />,
    ),
];

const HCFAddDoctors = () => {
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [snacksuccess, setSnacksuccess] = useState(false);
    const [snacksuccessMessage, setSnacksuccessMessage] = useState("");
    const [listing_name, setLiting_name] = useState("");

    const [snackerror, setSnackerror] = useState(false);
    const [snackerrorMessage, setSnackerrorMessage] = useState("");

    const [isFormValid, setIsFormValid] = useState(false); // Form validity tracker
    const [otp, setOtp] = useState([]);
    // listing variables
    const [listingName, setListingName] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [timeRange, setTimeRange] = useState([null, null]);
    const [enableLising, setEnableListing] = useState(false);
    const [doctorsuid, setDoctorsuid] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [doctorListId, setDoctorListId] = useState(null);
    // Modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [addPlanVisible , setAddPlanVisible] = useState(false);
    const [plandata, setplandata] = useState([]);
    const [renderthedataAfterDelete, setRenderTheApiAfterDelete] = useState(false);
    const [renderDataAfterAddPlan ,setRenderDataAfterAddPlan] = useState(false);
    const [snackmessage , setSnackmessage] = useState("")
    const navigate = useNavigate();
    const [createListing,setCreateListing] = useState({
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        doctor_id: null,
        listing_name: null,
        working_days_start: null,
        working_days_end: null,
        working_time_start: null,
        working_time_end: null,
        // plan: [{
        //     plan_fee: null,
        //     plan_name: null,
        //     plan_duration: null,
        //     plan_description: null,
        // }]
    })
    const [postcreatelisting, setPostcreatelisting] = useState(false);

    // Function to open the modal
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // ============================================
    // Security & Validation Functions
    // ============================================

    /**
     * Validate HCF admin ID from localStorage
     * SECURITY: Ensures admin ID is present before making API calls
     * 
     * @returns {string|null} HCF admin ID or null if invalid
     */
    const validateHcfAdminId = useCallback(() => {
        const adminId = localStorage.getItem("hcfadmin_suid");

        if (!adminId) {
            logger.warn("⚠️ HCF Admin ID not found in localStorage");
            toastService.warning("HCF Admin ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ HCF Admin ID validated:", adminId);
        return adminId;
    }, []);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // Regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const handleEmailChange = (value) => {
        setEmail(value);
        if (!emailRegex.test(value)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };

    const handleMobileChange = (value) => {
        setMobile(value);
        if (!mobileRegex.test(value)) {
            setMobileError("Mobile number must be 10 digits");
        } else {
            setMobileError("");
        }
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        if (!passwordRegex.test(value)) {
            setPasswordError(
                "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character",
            );
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (value) => {
        if (value !== password) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
            setConfirmPassword(value);
        }
    };

    // Check if all fields are valid
    useEffect(() => {
        if (
            emailRegex.test(email) &&
            mobileRegex.test(mobile) &&
            passwordRegex.test(password) &&
            confirmPassword === password &&
            !emailError &&
            !mobileError &&
            !passwordError &&
            !confirmPasswordError
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [
        email,
        mobile,
        password,
        confirmPassword,
        emailError,
        mobileError,
        passwordError,
        confirmPasswordError,
    ]);

    function formatDate(inputDateStr) {
        // Create a Date object from the input string
        const date = new Date(inputDateStr);

        // Extract year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, "0");

        // Format as "YYYY-MM-DD"
        return `${year}-${month}-${day}`;
    }
    // ============================================
    // API Functions
    // ============================================

    /**
     * Create doctor listing with working details and plans
     * Step 3: After email verification, creates listing with plans
     * API: POST /sec/hcf/addDoctorWorkingDetailsAndPlan
     * 
     * Plan structure required:
     * {
     *   plan_fee: number,
     *   plan_name: string (dropdown: "message", "call", "video"),
     *   plan_duration: string ("30 minutes", "60 minutes", etc.),
     *   start_date: string (YYYY-MM-DD),
     *   end_date: string (YYYY-MM-DD),
     *   is_trial: number (1 or 0),
     *   no_of_reviews: number,
     *   plan_description: string
     * }
     */
    const postCreateListing = async () => {
        logger.debug("📤 Creating doctor listing with working details and plans");
        setSnacksuccess(false);
        setSnackerror(false);

        // Validate required fields
        if (!createListing.doctor_id) {
            logger.error("❌ Doctor ID is missing");
            toastService.error("Doctor ID is missing. Please verify email first.");
            setSnackerrorMessage("Doctor ID is missing. Please verify email first.");
            setSnackerror(true);
            setPostcreatelisting(false);
            return;
        }

        if (!createListing.listing_name) {
            logger.warn("⚠️ Listing name is required");
            toastService.error("Please enter a listing name");
            setSnackerrorMessage("Please enter a listing name");
            setSnackerror(true);
            setPostcreatelisting(false);
            return;
        }

        if (!createListing.working_days_start || !createListing.working_days_end) {
            logger.warn("⚠️ Working days are required");
            toastService.error("Please select working days");
            setSnackerrorMessage("Please select working days");
            setSnackerror(true);
            setPostcreatelisting(false);
            return;
        }

        if (!createListing.working_time_start || !createListing.working_time_end) {
            logger.warn("⚠️ Working time is required");
            toastService.error("Please select working time");
            setSnackerrorMessage("Please select working time");
            setSnackerror(true);
            setPostcreatelisting(false);
            return;
        }

        if (!plandata || plandata.length === 0) {
            logger.warn("⚠️ At least one plan is required");
            toastService.error("Please add at least one plan");
            setSnackerrorMessage("Please add at least one plan");
            setSnackerror(true);
            setPostcreatelisting(false);
            return;
        }

        // Prepare plans with required structure
        // FIXED: Ensure all plan fields are properly formatted and validated
        const formattedPlans = plandata.map(plan => {
            const planFee = Number(plan.plan_fee);
            
            // Validate plan fee is a positive number
            if (isNaN(planFee) || planFee <= 0) {
                logger.error("❌ Invalid plan fee", { plan });
                throw new Error(`Invalid plan fee for ${plan.plan_name}: ${plan.plan_fee}`);
            }
            
            // Validate plan duration exists
            if (!plan.plan_duration || plan.plan_duration.trim() === '') {
                logger.error("❌ Missing plan duration", { plan });
                throw new Error(`Missing plan duration for ${plan.plan_name}`);
            }
            
            // FIXED: Include doctor_id and doctor_list_id in each plan
            // Backend requires these IDs in each plan object when inserting into sec_doctor_fee_plans
            const formattedPlan = {
                doctor_id: Number(createListing.doctor_id), // Required: doctor_id from createListing state
                plan_fee: planFee,
                plan_name: plan.plan_name, // "message", "call", or "video" (from dropdown)
                plan_duration: plan.plan_duration,
                start_date: createListing.working_days_start, // Use working days start date
                end_date: createListing.working_days_end, // Use working days end date
                is_trial: 1, // Default to 1 as per API example
                no_of_reviews: 1, // Default to 1 as per API example
                plan_description: plan.plan_description || `${plan.plan_name.charAt(0).toUpperCase() + plan.plan_name.slice(1)} plan`
            };
            
            // Add doctor_list_id if available (might be null on first creation, backend will set it)
            if (doctorListId) {
                formattedPlan.doctor_list_id = Number(doctorListId);
            }
            
            return formattedPlan;
        });
        
        logger.debug("📋 Formatted plans for API", { 
            count: formattedPlans.length,
            plans: formattedPlans.map(p => ({ 
                plan_name: p.plan_name, 
                plan_fee: p.plan_fee, 
                plan_duration: p.plan_duration 
            }))
        });

        // Prepare final payload
        // FIXED: Ensure all IDs are numbers as required by the API
        const hcfId = createListing.hcf_id || localStorage.getItem("hcfadmin_suid");
        const doctorId = createListing.doctor_id;
        
        if (!hcfId) {
            logger.error("❌ HCF ID is missing");
            toastService.error("HCF ID is missing. Please log in again.");
            setSnackerrorMessage("HCF ID is missing. Please log in again.");
            setSnackerror(true);
            setPostcreatelisting(false);
            return;
        }
        
        if (!doctorId) {
            logger.error("❌ Doctor ID is missing");
            toastService.error("Doctor ID is missing. Please verify email first.");
            setSnackerrorMessage("Doctor ID is missing. Please verify email first.");
            setSnackerror(true);
            setPostcreatelisting(false);
            return;
        }
        
        const payload = {
            hcf_id: Number(hcfId), // Convert to number
            doctor_id: Number(doctorId), // Convert to number
            listing_name: createListing.listing_name,
            working_days_start: createListing.working_days_start,
            working_days_end: createListing.working_days_end,
            working_time_start: createListing.working_time_start,
            working_time_end: createListing.working_time_end,
            plan: formattedPlans
        };

        logger.debug("📤 Listing creation payload:", {
            hcf_id: payload.hcf_id,
            doctor_id: payload.doctor_id,
            listing_name: payload.listing_name,
            working_days_start: payload.working_days_start,
            working_days_end: payload.working_days_end,
            working_time_start: payload.working_time_start,
            working_time_end: payload.working_time_end,
            plan_count: formattedPlans.length,
            plans: formattedPlans.map(p => ({ 
                doctor_id: p.doctor_id,
                plan_name: p.plan_name, 
                plan_fee: p.plan_fee, 
                plan_duration: p.plan_duration,
                start_date: p.start_date,
                end_date: p.end_date
            }))
        });

        try {
            const response = await axiosInstance.post(
                "/sec/hcf/addDoctorWorkingDetailsAndPlan",
                JSON.stringify(payload),
                {
                    headers: {
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            
            logger.debug("✅ Listing created successfully", { response: response?.data });
            
            // FIXED: Capture doctor_list_id from multiple possible response structures
            const listId = response?.data?.response?.docListingCreate?.doctor_list_id || 
                          response?.data?.response?.docListingUpdated?.[0]?.doctor_list_id ||
                          response?.data?.doctor_list_id ||
                          response?.data?.response?.doctor_list_id ||
                          response?.data?.response?.data?.doctor_list_id;
            
            logger.debug("📋 Extracted doctor_list_id from response", { 
                listId,
                fullResponse: response?.data 
            });
            
            if (listId) {
                setDoctorListId(listId);
                logger.debug("✅ Doctor list ID captured and stored:", listId);
            } else {
                logger.warn("⚠️ No doctor_list_id found in response", { 
                    response: response?.data 
                });
            }

            const successMessage = response?.data?.message || 
                                 response?.data?.response?.message ||
                                 "Listing created successfully";
            setSnacksuccessMessage(successMessage);
            setSnacksuccess(true);
            toastService.success(successMessage);

            // FIXED: Don't reset form immediately - keep doctor_id and enableListing for questions/terms
            // Only reset the listing form fields, but keep doctor_id and enableListing
            setListingName("");
            setDateRange([null, null]);
            setTimeRange([null, null]);
            setPlandata([]);
            
            // Keep doctor_id and enableListing so questions/terms sections can render
            // Don't reset createListing completely - keep doctor_id
            // Don't set enableListing to false - keep it true so questions/terms are visible
            
            setPostcreatelisting(false); // Reset the flag so useEffect doesn't trigger again
            
            logger.debug("✅ Form updated after successful listing creation", {
                doctor_id: createListing.doctor_id,
                doctor_list_id: listId,
                enableListing: true // Keep it enabled
            });
        } catch (error) {
            logger.error("❌ Error creating listing:", error);
            logger.error("❌ Error response:", error?.response?.data);
            logger.error("❌ Error status:", error?.response?.status);
            
            const errorMessage = error?.response?.data?.message ||
                                error?.response?.data?.error ||
                                error?.response?.data?.response?.message ||
                                error?.message ||
                                "Failed to create listing. Please check all fields and try again.";
            
            setSnackerrorMessage(errorMessage);
            setSnackerror(true);
            toastService.error(errorMessage);
            setPostcreatelisting(false);
            
            // Keep enableListing and doctor_id on error so user can retry
            // Don't reset the form completely
        }
    };

    useEffect( () => {
        if(postcreatelisting){
            postCreateListing();
        }
        
    },[postcreatelisting] )

    /**
     * Register HCF Clinic Doctor
     * Step 1: Creates doctor account and sends email OTP
     * API: POST /sec/hcf/addDoctor
     * On success (status 202): Opens OTP modal for email verification
     * 
     * @returns {Promise<void>}
     */
    const registerHcfClinicDoctor = async () => {
        logger.debug("📤 Registering HCF clinic doctor");
        setSnackerror(false);
        setSnacksuccess(false);

        // Validate form before submission
        if (!isFormValid) {
            logger.warn("⚠️ Form validation failed");
            toastService.error("Please fill all fields correctly");
            return;
        }

        const hcfId = validateHcfAdminId();
        if (!hcfId) {
            return;
        }

        // Prepare payload
        const payload = {
            hcf_id: hcfId,
            email: email,
            mobile: mobile,
            role_id: "6", // Role ID for doctor
            password: confirmPassword,
        };

        logger.debug("📤 Doctor registration payload:", {
            ...payload,
            password: "***" // Mask password in logs
        });

        try {
            const response = await axiosInstance.post(
                "/sec/hcf/addDoctor",
                JSON.stringify(payload),
                {
                    headers: {
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            
            logger.debug("✅ Doctor registration response:", {
                status: response.status,
                data: response?.data
            });

            // Status 202 indicates OTP sent to email - open OTP modal
            if (response.status === 202) {
                logger.debug("✅ OTP sent to email, opening OTP modal");
                const message = response?.data?.message || 
                               response?.data?.error || 
                               "OTP has been sent to your email. Please verify.";
                setSnacksuccessMessage(message);
                setSnacksuccess(true);
                toastService.success("OTP sent to your email");
                openModal(); // Open OTP modal
            } else {
                // Other success status
                logger.debug("✅ Doctor registered successfully");
                const successMessage = response?.data?.message || "Doctor registered successfully";
                setSnacksuccessMessage(successMessage);
                setSnacksuccess(true);
                toastService.success(successMessage);
            }
        } catch (error) {
            logger.error("❌ Error registering doctor:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            setSnacksuccess(false);
            
            // Handle specific error cases
            if (error.response?.status === 409) {
                const errorMsg = "Email already exists";
                setEmailError(errorMsg);
                setSnackerrorMessage(errorMsg);
                toastService.error(errorMsg);
            } else if (error.response?.status === 400) {
                const errorMsg = error?.response?.data?.message || 
                               error?.response?.data?.error || 
                               "Invalid request. Please check your input.";
                setSnackerrorMessage(errorMsg);
                toastService.error(errorMsg);
                
                // Set specific field errors if provided
                if (error?.response?.data?.errors?.email) {
                    setEmailError(error.response.data.errors.email);
                }
                if (error?.response?.data?.errors?.mobile) {
                    setMobileError(error.response.data.errors.mobile);
                }
            } else {
                const errorMsg = error?.response?.data?.message ||
                               error?.response?.data?.error ||
                               "Failed to register doctor. Please try again.";
                setSnackerrorMessage(errorMsg);
                toastService.error(errorMsg);
            }
            
            setSnackerror(true);
        }
    };

    const resetForm = () => {
        setEmail("");
        setMobile("");
        setPassword("");
        setConfirmPassword("");
        setOtp([]);
        // Clear any other state if necessary
    };

    /**
     * Verify Doctor Email OTP
     * Step 2: Verifies email OTP code
     * API: POST /sec/auth/verifyEmail
     * On success: Enables listing creation section and stores doctor_id
     * 
     * @returns {Promise<void>}
     */
    const verifyDocOTP = async () => {
        logger.debug("🔐 Verifying doctor email OTP");
        setSnackerror(false);
        setSnacksuccess(false);
        setEnableListing(false);

        // Validate OTP length
        if (!otp || otp.length !== 6) {
            logger.warn("⚠️ Invalid OTP code length");
            toastService.error("Please enter the complete 6-digit OTP code");
            return;
        }

        // Validate email
        if (!email || !email.includes("@")) {
            logger.warn("⚠️ Invalid email address");
            toastService.error("Please enter a valid email address");
            return;
        }

        const payload = {
            email: email,
            activation_code: otp,
        };

        logger.debug("🔐 OTP verification payload:", {
            email: payload.email,
            activation_code: payload.activation_code?.substring(0, 2) + "****" // Mask OTP in logs
        });

        try {
            const response = await axiosInstance.post(
                "/sec/auth/verifyEmail",
                JSON.stringify(payload),
                {
                    headers: {
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            
            logger.debug("✅ OTP verification response:", {
                status: response.status,
                data: response?.data
            });

            if (response.status === 200) {
                logger.debug("✅ Email OTP verified successfully");
                
                // Extract doctor_id from response
                const doctorId = response?.data?.response?.suid || 
                               response?.data?.suid || 
                               response?.data?.response?.doctor_id;
                
                if (doctorId) {
                    logger.debug("✅ Doctor ID extracted:", doctorId);
                    setDoctorsuid(doctorId);
                    
                    // Update createListing with doctor_id
                    setCreateListing(prev => ({
                        ...prev,
                        doctor_id: doctorId,
                        hcf_id: localStorage.getItem("hcfadmin_suid")
                    }));
                } else {
                    logger.warn("⚠️ Doctor ID not found in response");
                }

                setSnacksuccessMessage("OTP verified successfully!");
                setSnacksuccess(true);
                toastService.success("Email verified successfully");
                closeModal();
                setEnableListing(true); // Enable listing creation section
            } else {
                logger.warn("⚠️ OTP verification returned non-200 status:", response.status);
                setSnackerrorMessage("Failed to verify OTP. Please try again.");
                setSnackerror(true);
                toastService.error("Failed to verify OTP");
            }
        } catch (error) {
            logger.error("❌ OTP verification failed:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                               error?.response?.data?.error ||
                               "Invalid OTP. Please check and try again.";
            
            setSnackerrorMessage(errorMessage);
            setSnackerror(true);
            toastService.error(errorMessage);
        }
    };

    // listing handloers
    const handleListingNameChange = (e) => {
        setListingName(e.target.value);
        setCreateListing({...createListing , listing_name : e.target.value});
    };

    const handleDateRangeChange = (newRange) => {
        setDateRange(newRange);
        const formatDateResp1 = formatDate(newRange[0]);
        const formatDateResp2 = formatDate(newRange[1]);
        setCreateListing({...createListing , working_days_start : dayjs(newRange[0]).format("YYYY-MM-DD") , working_days_end : dayjs(newRange[1]).format("YYYY-MM-DD") })
        logger.debug("📅 Date range selected:", { from: formatDateResp1, to: formatDateResp2 });
    };

    const handleTimeRangeChange = (newRange) => {
        setTimeRange(newRange);
    
        // Use newRange directly to avoid referencing the stale timeRange state
        setCreateListing({
            ...createListing,
            working_time_start: newRange[0]?.isValid() ? newRange[0]?.format("HH:mm:ss") : null,
            working_time_end: newRange[1]?.isValid() ? newRange[1]?.format("HH:mm:ss") : null,
        });
    
        logger.debug("⏰ Time range selected:", {
            start: newRange[0]?.isValid() ? newRange[0]?.format("HH:mm:ss") : null,
            end: newRange[1]?.isValid() ? newRange[1]?.format("HH:mm:ss") : null
        });
    };
    
    // for plans 
   

    const RendenDataAfterDelete = (value) => {
        setRenderTheApiAfterDelete(value);
    };

    /**
     * Handle plan data after adding from ListingModal
     * Updates plandata state with the plan information
     * 
     * @param {Array} planData - Array of plan objects from ListingModal
     */
    const RenderDataAfterAddingPlan = (value) => {
        logger.debug("📋 Plan data received from modal:", value);
        setRenderDataAfterAddPlan(value);
        
        // Update plandata with the received plan array
        if (value && Array.isArray(value.plan)) {
            setplandata(value.plan);
            logger.debug("✅ Plans updated:", { count: value.plan.length });
        } else if (value && Array.isArray(value)) {
            // Handle case where value is directly an array
            setplandata(value);
            logger.debug("✅ Plans updated (direct array):", { count: value.length });
        }
    };

    //  const handleModalClose = () => {
    //         setOpenDialog(false); // Function to close the modal
    // };  
    // setCreateListing

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", flexDirection: "row" }}>
                <CustomSnackBar
                    type={"success"}
                    isOpen={snacksuccess}
                    message={snacksuccessMessage}
                />
                <CustomSnackBar type={"error"} isOpen={snackerror} message={snackerrorMessage} />
                <CustomSnackBar type={"success"} />
                <nav className="NavBar-Container-Appoinement" style={{display : 'flex' , justifyContent : 'space-between' , alignItems : 'center'}} > 
                    <NavLink to={"/hcfadmin/doctor/adddoctor"}>Add Doctors</NavLink>
                    <CustomButton 
                        label="< back"
                        isTransaprent={true}
                        buttonCss={{padding : "0% 0%",borderRadius : "12px" , width : "fit-content" , height : "fit-content",padding : '0.4% 1%'}}
                        handleClick={() => navigate(-1)}
                    />
                    {/* <NavLink to={"/hcfadmin/doctor/addpackage"}>Add Package</NavLink> */}

                    {/* <Box sx={{ borderRadius: "50px", position: "absolute", left: "70%" }}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">
                                <MoreHorizIcon />
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Mark Inactive</MenuItem>
                                <MenuItem value={20}>Block Profile</MenuItem>
                                <MenuItem value={30}>View Stats</MenuItem>
                            </Select>
                        </FormControl>
                    </Box> */}
                </nav>

                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Box sx={{ width: "100%", height: "100%" }}>
                        {/* <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.name}</TableCell>
                                            <TableCell align="right">{row.action}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> */}

                        <h5 style={{ textAlign: "start", marginLeft: "20px" }}>Login Info</h5>

                        <div style={{ width: "75%" }}>
                            <div style={{ display: "flex", width: "100%" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Email"}
                                        type={"email"}
                                        textcss={{ width: "45%" }}
                                        placeholder={"example@xyz.com"}
                                        defaultValue={""}
                                        helperText={emailError}
                                        error={!!emailError}
                                        onChange={(e) => handleEmailChange(e.target.value)}
                                        // rightIcon={"verify"}
                                        // onRightIconClick={() => {
                                        //     openModal();
                                        //                     }}
                                    />
{/*----------------- modal for otp ------------------ */}
                                    <CustomModal
                                        isOpen={isOpen}
                                        conditionOpen={closeModal} // Pass setIsOpen as conditionOpen

                                        disableBackdropClick={true}
                                        title={<h2>Enter OTP send to E-mail</h2>}
                                    >
                                        <>
                                            <div id="otp-box-container">
                                                <CustomOTPInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    numInputs={6}
                                                    placeholder="*"
                                                />
                                                <br />
                                                <br />
                                                <CustomButton
                                                    isDisabled={otp.length === 6 ? false : true}
                                                    handleClick={() => verifyDocOTP()}
                                                    label="Verify"
                                                />
                                            </div>
                                        </>
                                    </CustomModal>

                                    <CustomTextField
                                        label={"Enter Mobile Number"}
                                        type={"number"}
                                        placeholder={"9876543210"}
                                        defaultValue={mobile}
                                        helperText={mobileError}
                                        textcss={{ width: "45%" }}
                                        onChange={(e) => handleMobileChange(e.target.value)}
                                        // rightIcon={"verify"}
                                        // onRightIconClick={() => {
                                        //     openModal();
                                        //                     }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex", marginTop: "3%" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Create Password"}
                                        textcss={{ width: "45%" }}
                                        placeholder={"*****"}
                                        defaultValue={password}
                                        helperText={passwordError}
                                        error={!!passwordError}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                    />
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Confirm Password"}
                                        textcss={{ width: "45%" }}
                                        placeholder={"*****"}
                                        defaultValue={confirmPassword}
                                        helperText={confirmPasswordError}
                                        error={!!confirmPasswordError}
                                        onChange={(e) =>
                                            handleConfirmPasswordChange(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <CustomButton
                                buttonCss={{ marginTop: "2rem" }}
                                isDisabled={!isFormValid} // Disable button if form is not valid
                                handleClick={() => registerHcfClinicDoctor()}
                                label="Register Doctor"
                            />
{/* -------------------create doctor listing -------------------------------------------------------- */}
                        <div
                            style={{ width: "100%", display: enableLising ? "block" : "none" }}
                        >
                            <h3>Create Doctor Listing</h3>
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <CustomTextField
                                    label={"Enter listing name"}
                                    textcss={{ width: "45%" }}
                                    defaultValue={listingName}
                                    helperText={""}
                                    onChange={handleListingNameChange}
                                />
                            </div>

                            <h5
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                    fontSize: "1em",
                                }}
                            >
                                Working days
                            </h5>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={["DateRangePicker"]}
                                            sx={{ width: "100%" }}
                                        >
                                            <DateRangePicker
                                                localeText={{
                                                    start: (
                                                        <div>
                                                            From{" "}
                                                            <CalendarTodayIcon
                                                                style={{
                                                                    marginLeft: "30px",
                                                                    color: "grey",
                                                                }}
                                                            />
                                                        </div>
                                                    ),
                                                    end: (
                                                        <div>
                                                            To{" "}
                                                            <CalendarTodayIcon
                                                                style={{
                                                                    marginLeft: "30px",
                                                                    color: "grey",
                                                                }}
                                                            />
                                                        </div>
                                                    ),
                                                }}
                                                minDate={dayjs()} // Disable past dates
                                                value={dateRange}
                                                onChange={handleDateRangeChange}
                                                // renderInput={(startProps, endProps) => (
                                                //     <React.Fragment>
                                                //         <CustomTextField {...startProps} label="From" />
                                                //         <CustomTextField {...endProps} label="To" />
                                                //     </React.Fragment>
                                                // )}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <h5
                                    style={{
                                        textAlign: "start",
                                        marginLeft: "20px",
                                        fontSize: "1em",
                                    }}
                                >
                                    Working Time
                                </h5>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={[
                                                "MultiInputTimeRangeField",
                                                "SingleInputTimeRangeField",
                                            ]}
                                            sx={{ width: "100%" }}
                                        >
                                            <MultiInputTimeRangeField
                                                value={timeRange}
                                                onChange={handleTimeRangeChange}
                                                slotProps={{
                                                    textField: ({ position }) => ({
                                                        label:
                                                            position === "start"
                                                                ? "From"
                                                                : "To",
                                                    }),
                                                }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>

                                {/* <CustomButton
                                    label="Continue"
                                    buttonCss={{ marginTop: "40px" }}
                                    // isDisabled={!isFormValid} // Disable button based on form validity
                                    handleClick={() => {
                                        postCreateListing();
                                    }}
                                /> */}
                            </div>
                        </div>
                        </div>
{/*-----------------------Add plans--------------------- */}
                        <div style={{ width: "75%", display : enableLising  ?  'block' : 'none' }}>
                            <div className="main-container">
                                <div className="Add-container">
                                    <Typography>Add Plans</Typography>
                                    <div className="Add-addicon">
                                        <Box
                                            sx={{
                                                // border:'1px solid',
                                                marginTop: "0.5rem",
                                            }}

                                            onClick={() => setOpenDialog(!openDialog)}
                                        >
                                            <AddIcon />
                                        </Box>
                                        {/* Adding the plans --------------- */}
                                        <div className="Add-btn">
                                            {/* Modal for listing the plans of the doctor */}
                                            {/* <CustomModal/> */}
                                            <ListingModal
                                                RenderDataAfterAddingPlan={
                                                    RenderDataAfterAddingPlan
                                                }
                                                showSaveButton={false}
                                                enableAdditionalButton={true}
                                                additionalButtonName={"Add plan"}
                                                doctor_id={createListing?.doctor_id} // Pass doctor_id from createListing state
                                                doctor_list_id={doctorListId} // Pass doctor_list_id if available
                                                onAdditionalButtonClick={(e) => {
                                                    logger.debug("📋 Plan data from modal:", e?.plan);
                                                    if (e?.plan && Array.isArray(e.plan) && e.plan.length > 0) {
                                                        // Validate plans have required fields before setting
                                                        const validPlans = e.plan.filter(plan => {
                                                            const isValid = plan.plan_name && 
                                                                           plan.plan_fee !== null && 
                                                                           plan.plan_fee !== undefined && 
                                                                           plan.plan_fee !== '' &&
                                                                           plan.plan_duration;
                                                            
                                                            if (!isValid) {
                                                                logger.warn("⚠️ Invalid plan filtered out", { plan });
                                                            }
                                                            return isValid;
                                                        });
                                                        
                                                        if (validPlans.length > 0) {
                                                            setplandata(validPlans);
                                                            toastService.success(`${validPlans.length} plan(s) added successfully`);
                                                            logger.debug("✅ Valid plans added:", { 
                                                                count: validPlans.length,
                                                                plans: validPlans 
                                                            });
                                                        } else {
                                                            logger.error("❌ No valid plans to add");
                                                            toastService.error("Please ensure all plans have price and duration filled");
                                                        }
                                                    } else {
                                                        logger.warn("⚠️ No plans received from modal");
                                                        toastService.warning("No plans selected. Please select at least one plan.");
                                                    }
                                                }}
                                                disableBackdropClick={false}
                                                saveButtonEnable={false}
                                                conditionOpen={(isOpen) => {
                                                    logger.debug("🔄 ListingModal conditionOpen callback", { isOpen });
                                                    setOpenDialog(isOpen);
                                                }}
                                                openDialog={openDialog}
                                                // handleClose={() => true}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Mapping all the plans  */}

                                {plandata.length === 0 ? (
                                    <NoAppointmentCard text_one={"No listing found"} />
                                ) : (
                                    (plandata ||[]).map((plan, index) => (
                                        <AddPlanCard
                                            planCardData={plan}
                                            index={index}
                                            RendenDataAfterDelete={RendenDataAfterDelete}
                                            isDeleteVisible={false}
                                            isEditVisible={false}
                                        />
                                    ))
                                )}
                            </div>
                            <CustomButton
                                    label="Continue"
                                    buttonCss={{ marginTop: "40px" }}
                                    // isDisabled={!isFormValid} // Disable button based on form validity
                                    handleClick={() => {
                                        logger.debug("📤 Creating listing with plans");
                                        setPostcreatelisting(true);
                                        // postCreateListing() will be called via useEffect
                                    }}
                                />
                            {/* Render Questions and Terms when we have a listing id */}
                            {/* FIXED: Show questions/terms when doctorListId exists (after successful listing creation) */}
                            {doctorListId && createListing?.doctor_id && (
                                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <HCFAddQuestioner 
                                        doctor_id={createListing.doctor_id} 
                                        doctor_list_id={doctorListId} 
                                    />
                                    <HCFAddTerms 
                                        doctor_id={createListing.doctor_id} 
                                        doctor_list_id={doctorListId} 
                                    />
                                </Box>
                            )}
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HCFAddDoctors;
