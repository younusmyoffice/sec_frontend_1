import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Skeleton,
    Typography,
    TablePagination,
} from "@mui/material";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { StaffCards } from "./StaffCards";
import CustomModal from "../../../../components/CustomModal";
import CustomTextField from "../../../../components/CustomTextField";
import Edittaff from "./Edittaff";
import axiosInstance from "../../../../config/axiosInstance";
import CustomDropdown from "../../../../components/CustomDropdown";
import pen from "../../../../static/images/DrImages/Pen.svg";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import DoneIcon from "@mui/icons-material/Done";
import CustomOTPInput from "../../../../components/OTPInput";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback

/**
 * AdminStaff Component
 * 
 * Manages diagnostic center staff members
 * Features:
 * - View staff list with pagination
 * - Add new staff members with OTP verification
 * - Edit existing staff members
 * - Email and mobile verification via OTP
 * 
 * Security:
 * - Validates HCF admin ID from localStorage
 * - Uses axiosInstance for automatic token handling
 * - OTP verification for email and mobile
 * 
 * @component
 */
const AdminStaff = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(""); // State for Designation dropdown
    const [selectedDepartment, setSelectedDepartment] = useState(""); // State for Department dropdown
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [labDepartments, setLabDepartments] = useState([]);
    const [staffDesignation, setStaffDesignation] = useState([]);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [textFields, setTextFields] = useState({
        first_name: "",
        email: "",
        mobile: "",
        role_id: "4",
        password: "",
        staff_designation: "",
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        lab_department_id: "",
    });
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [isEditFilled, setIsEditFilled] = useState(false);
    const [editdata, setEditdata] = useState({
        staff_id: null,
        first_name: null,
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        email: null,
        mobile: null,
        role_id: "4",
        password: null,
        added_by: null,
        staff_designation: null,
        dept_exam_id: null,
    });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Current page starts at 0
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [verifiedEmail, setVerifiedEmail] = useState(false);
    const [verifiedMobile, setVerifiedMobile] = useState(false);
    const [isEmailModalOtp, setIsEmailModalOtp] = useState(false);
    const [email, setEmail] = useState(""); // To store the email input
    const [mob, setMob] = useState(""); //to store the mobile input
    const [isMobModalOtp, setIsMobModalOtp] = useState(false);
    const [otp, setOtp] = useState(null);
    const [emailOtp, setEmailOtp] = useState({
        email: "",
        mobile: "",
        role_id: "4",
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        register_with_email: "true",
    });
    const [mobOtp, setMobOtp] = useState({
        email: "",
        mobile: "",
        role_id: "4",
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        register_with_email: "false",
    });
    const [verifyEmail, setVerifyEmail] = useState({
        email: emailOtp.email, // First state
        activation_code: otp, // Second state
    });
    const [verifyMob, setVerifyMob] = useState({
        mobile: mobOtp.mobile,
        otp_code: otp,
    });
    const hcf_id = localStorage.getItem("hcfadmin_suid");

    // ------------------------------------------creating staff handler------------------------------------------//
    useEffect(() => {
        checkFields(textFields); // Ensure fields are checked on each textFields update
    }, [textFields]);
    /**
     * Create new staff member (Step 5: Final staff creation)
     * Submits staff creation form with validation
     * Requires both email and mobile to be verified
     * API: POST /sec/hcf/addStaff with full staff details
     */
    const fetchTestData = async () => {
        logger.debug("📤 Creating new staff member");
        setSnackOpen(false);
        
        // Validate that both email and mobile are verified
        if (!verifiedEmail) {
            logger.warn("⚠️ Email not verified");
            toastService.warning("Please verify your email first");
            return;
        }

        if (!verifiedMobile) {
            logger.warn("⚠️ Mobile not verified");
            toastService.warning("Please verify your mobile number first");
            return;
        }

        // Validate required fields before submission
        if (!textFields.first_name || !textFields.email || !textFields.mobile || 
            !textFields.password || !textFields.staff_designation || !textFields.lab_department_id) {
            logger.warn("⚠️ Required fields not filled");
            toastService.error("Please fill all required fields");
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            logger.warn("⚠️ Passwords do not match");
            toastService.error("Passwords do not match");
            return;
        }

        // Prepare final staff creation payload
        const staffData = {
            first_name: textFields.first_name,
            mobile: textFields.mobile,
            email: textFields.email,
            role_id: "4",
            password: textFields.password,
            hcf_id: hcf_id || localStorage.getItem("hcfadmin_suid"),
            staff_designation: textFields.staff_designation,
            lab_department_id: textFields.lab_department_id
        };

        logger.debug("📤 Staff creation payload:", {
            ...staffData,
            password: "***" // Mask password in logs
        });

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/addStaff`, 
                JSON.stringify(staffData),
                {
                    headers: { 
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    },
                }
            );
            
            logger.debug("✅ Staff created successfully", { response: response?.data });
            
            const successMessage = response?.data?.message || "Staff created successfully";
            setSnackType("success");
            setSnackMessage(successMessage);
            setSnackOpen(true);
            toastService.success(successMessage);
            
            // Reset form and verification states
            setVerifiedEmail(false);
            setVerifiedMobile(false);
            setEmail("");
            setMob("");
            setPassword("");
            setConfirmPassword("");
            setTextFields({
                first_name: "",
                email: "",
                mobile: "",
                role_id: "4",
                password: "",
                staff_designation: "",
                hcf_id: localStorage.getItem("hcfadmin_suid"),
                lab_department_id: "",
            });
            
            // Close dialog after 3 seconds and refresh data
            setTimeout(() => {
                setOpenDialog(false);
                fetchData(); // Refresh staff list
            }, 3000);
        } catch (error) {
            logger.error("❌ Error creating staff:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to create staff. Please check all fields and try again.";
            
            setSnackType("error");
            setSnackMessage(errorMessage);
            setSnackOpen(true);
            toastService.error(errorMessage);
        }
    };
    const checkFields = (formData) => {
        const isFilled =
            formData.first_name &&
            formData.email &&
            formData.mobile &&
            formData.role_id &&
            formData.password &&
            formData.hcf_diag_name &&
            formData.lab_department_id &&
            formData.hcf_id; // Check if hcf_id is set

        setIsFieldsFilled(isFilled);
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

    // ============================================
    // API Fetch Functions
    // ============================================

    /**
     * Fetch staff list from API
     * Loads all staff members for the diagnostic center
     */
    const fetchData = useCallback(async () => {
        const adminId = validateHcfAdminId();
        if (!adminId) {
            setLoading(false);
            return;
        }

        logger.debug("📋 Fetching staff list");
        setLoading(true);
        
        try {
            const response = await axiosInstance.get(`/sec/hcf/getHcfStaff/${adminId}`);
            const staffList = response?.data?.response || [];
            
            logger.debug("✅ Staff list received", { count: staffList.length });
            setData(staffList);
        } catch (error) {
            logger.error("❌ Error fetching staff data:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load staff list";
            toastService.error(errorMessage);
            setData([]); // Ensure state is an array even on error
        } finally {
            setLoading(false);
        }
    }, [validateHcfAdminId]);

    // ============================================
    // Effects
    // ============================================

    /**
     * Initialize component and fetch staff data
     * Triggers API call when component loads
     */
    useEffect(() => {
        logger.debug("🔵 AdminStaff component initializing");
        
        // Hide location search container on load
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }

        // Fetch staff data
        fetchData();

        // Cleanup: restore location search container when component unmounts
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
                logger.debug("🔄 Location search container restored");
            }
        };
    }, [fetchData]);

    // Fetching lab departments

    const fetchLabs = async () => {
        try {
            const response = await axiosInstance.get(`/sec/labDepartments`);
            setLabDepartments(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        }
    };

    useEffect(() => {
        fetchLabs();
    }, []);

    // Transform the department data for the dropdown
    const departmentItems = labDepartments.map((department) => ({
        id: department.lab_department_id,
        name: department.lab_department_name,
    }));

    const handleDropdownChange = (selectedDepartment) => {
        const departmentId = departmentItems.find((item) => item.name === selectedDepartment)?.id;
        console.log(departmentId, "this lab id");
        setSelectedDepartment(selectedDepartment);

        setTextFields((prevState) => ({
            ...prevState,
            lab_department_id: String(departmentId), // Ensure lab_dept_id is stored as a string
        }));
    };

    // Fetching staff Designation
    const fetchDesignation = async () => {
        try {
            const response = await axiosInstance.get(`/sec/staffDesignations`);
            setStaffDesignation(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        }
    };

    useEffect(() => {
        fetchDesignation();
    }, []);

    // Transform the department data for the dropdown
    const designationItems = staffDesignation.map((designation) => ({
        id: designation.staff_designation_id,
        name: designation.staff_designation_name,
    }));

    const handleDropdownChange1 = (selectedDepartment) => {
        const designationId = designationItems.find((item) => item.name === selectedDepartment)?.id;
        console.log(designationId, "this staff id");
        setSelectedDesignation(selectedDepartment);

        setTextFields((prevState) => ({
            ...prevState,
            staff_designation: String(designationId), // Ensure lab_dept_id is stored as a string
        }));
    };

    // Handler for Create Password
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (confirmPassword && event.target.value !== confirmPassword) {
            setPasswordError(true); // Trigger error if they don't match
        } else {
            setPasswordError(false);
        }
    };

    // Handler for Confirm Password
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value !== password) {
            setPasswordError(true); // Trigger error if they don't match
        } else {
            setPasswordError(false);
        }
    };

    // Calculate total pages
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Slice the data based on the current page
    const displayedData = data.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage,
    );

    //edit staff handler
    const handleEdit = (data) => {
        // setSelectedTest(data); // Set the selected test data
        setEditdata({
            staff_id: String(data.staff_id), // Convert sub_exam_id to a string
            first_name: data.first_name,
            hcf_id: hcf_id,
            email: data.email,
            mobile: String(data.mobile),
            role_id: "4",
            added_by: "hcf admin",
            hcf_diag_name: data.hcf_diag_name,
            dept_exam_id: String(data.dept_exam_id),
        });
        setOpenEditDialog(true); // Open the modal
    };

    const checkEditFields = (formData) => {
        const isFilled =
            formData.staff_id &&
            formData.first_name &&
            formData.email &&
            formData.mobile &&
            formData.role_id &&
            formData.password &&
            formData.hcf_diag_name &&
            formData.dept_exam_id &&
            formData.hcf_id; // Check if hcf_id is set

        setIsEditFilled(isFilled);
    };

    useEffect(() => {
        checkEditFields(editdata); // Ensure fields are checked on each testdata update
    }, [editdata]);

    /**
     * Update existing staff member
     * Submits staff update form with validation
     */
    const UpdateStaff = async () => {
        logger.debug("📤 Updating staff member");
        setSnackOpen(false);
        
        try {
            const response = await axiosInstance.post(
                `/sec/hcf/updateStaff`, 
                JSON.stringify(editdata),
                {
                    headers: { 
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    },
                }
            );
            
            logger.debug("✅ Staff updated successfully", { response: response?.data });
            
            const successMessage = response?.data?.message || "Staff updated successfully";
            setSnackType("success");
            setSnackMessage(successMessage);
            setSnackOpen(true);
            toastService.success(successMessage);
            
            setTimeout(() => {
                setOpenEditDialog(false);
                fetchData(); // Refresh staff list
            }, 3000);
        } catch (error) {
            logger.error("❌ Error updating staff:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to update staff. Please check all fields and try again.";
            
            setSnackType("error");
            setSnackMessage(errorMessage);
            setSnackOpen(true);
            toastService.error(errorMessage);
        }
    };
    // Transform the department data for the dropdown
    const EditdepartmentItems = labDepartments.map((department) => ({
        id: department.lab_department_id,
        name: department.lab_department_name,
    }));

    const handleEditropdownChange = (selectedDepartment) => {
        const departmentId = EditdepartmentItems.find(
            (item) => item.name === selectedDepartment,
        )?.id;
        console.log(departmentId, "this lab id");
        setSelectedDepartment(selectedDepartment);

        setEditdata((prevState) => ({
            ...prevState,
            lab_department_id: String(departmentId), // Ensure lab_dept_id is stored as a string
        }));
    };
    // Transform the department data for the dropdown
    const EditdesignationItems = staffDesignation.map((designation) => ({
        id: designation.staff_designation_id,
        name: designation.staff_designation_name,
    }));

    const handleEditDropdownChange1 = (selectedDepartment) => {
        const designationId = EditdesignationItems.find(
            (item) => item.name === selectedDepartment,
        )?.name;
        console.log(designationId, "this staff id");
        setSelectedDesignation(selectedDepartment);

        setEditdata((prevState) => ({
            ...prevState,
            hcf_diag_name: String(designationId), // Ensure lab_dept_id is stored as a string
        }));
    };

    // ============================================
    // Email and Mobile OTP Verification Handlers
    // ============================================

    /**
     * Trigger email OTP
     * Step 1: Send OTP to email address
     * API: POST /sec/hcf/addStaff with register_with_email: "true"
     */
    const emailRegister = async () => {
        // Validate email before sending OTP
        if (!email || !email.includes("@")) {
            logger.warn("⚠️ Invalid email address");
            toastService.error("Please enter a valid email address");
            return;
        }

        logger.debug("📧 Sending email OTP", { email });
        setSnackOpen(false);

        // Prepare payload for email OTP request
        const emailOtpPayload = {
            email: email,
            role_id: "4",
            hcf_id: hcf_id || localStorage.getItem("hcfadmin_suid"),
            register_with_email: "true"
        };

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/addStaff`, 
                JSON.stringify(emailOtpPayload),
                {
                    headers: { 
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    },
                }
            );

            logger.debug("✅ Email OTP sent successfully", { response: response?.data });
            
            // Update emailOtp state with current email
            setEmailOtp(emailOtpPayload);
            setVerifyEmail({ ...verifyEmail, email: email });

            // Set success message
            setSnackMessage("OTP has been sent to your email.");
            setSnackType("success");
            setSnackOpen(true);
            toastService.success("OTP sent to your email");

            // Open email OTP modal
            setIsEmailModalOtp(true);
        } catch (error) {
            logger.error("❌ Error sending email OTP:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to send OTP. Please check your email and try again.";
            
            setSnackMessage(errorMessage);
            setSnackType("error");
            setSnackOpen(true);
            toastService.error(errorMessage);
        }
    };

    /**
     * Trigger mobile OTP
     * Step 3: Send OTP to mobile number (only after email is verified)
     * API: POST /sec/hcf/addStaff with register_with_email: "false"
     */
    const mobRegister = async () => {
        // Validate that email is verified first
        if (!verifiedEmail) {
            logger.warn("⚠️ Email must be verified before mobile verification");
            toastService.warning("Please verify your email first");
            return;
        }

        // Validate mobile before sending OTP
        if (!mob || mob.length < 10) {
            logger.warn("⚠️ Invalid mobile number");
            toastService.error("Please enter a valid mobile number");
            return;
        }

        logger.debug("📱 Sending mobile OTP", { mobile: mob, email });
        setSnackOpen(false);

        // Prepare payload for mobile OTP request
        const mobOtpPayload = {
            mobile: mob,
            email: email, // Include verified email
            role_id: "4",
            hcf_id: hcf_id || localStorage.getItem("hcfadmin_suid"),
            register_with_email: "false"
        };

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/addStaff`, 
                JSON.stringify(mobOtpPayload),
                {
                    headers: { 
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    },
                }
            );

            logger.debug("✅ Mobile OTP sent successfully", { response: response?.data });
            
            // Update mobOtp state with current mobile and email
            setMobOtp(mobOtpPayload);
            setVerifyMob({ ...verifyMob, mobile: mob });

            // Set success message
            setSnackMessage("OTP has been sent to your mobile number.");
            setSnackType("success");
            setSnackOpen(true);
            toastService.success("OTP sent to your mobile number");

            // Open mobile OTP modal
            setIsMobModalOtp(true);
        } catch (error) {
            logger.error("❌ Error sending mobile OTP:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to send OTP. Please check your mobile number and try again.";
            
            setSnackMessage(errorMessage);
            setSnackType("error");
            setSnackOpen(true);
            toastService.error(errorMessage);
        }
    };

    /**
     * Verify email OTP
     * Step 2: Verify email OTP code
     * API: POST /sec/hcf/verifyHCFDiagnosticStaffEmail
     */
    const veriFyEmailOTPHandler = async () => {
        // Validate OTP is entered
        if (!verifyEmail.activation_code || verifyEmail.activation_code.length !== 6) {
            logger.warn("⚠️ Invalid OTP code");
            toastService.error("Please enter the complete 6-digit OTP code");
            return;
        }

        logger.debug("🔐 Verifying email OTP", { email: verifyEmail.email });
        await emailVerify();
    };

    /**
     * Verify mobile OTP
     * Step 4: Verify mobile OTP code
     * API: POST /sec/hcf/verifyHCFDiagnosticStaffMobile
     */
    const veriFyMobOTPHandler = async () => {
        // Validate OTP is entered
        if (!verifyMob.otp_code || verifyMob.otp_code.length !== 6) {
            logger.warn("⚠️ Invalid OTP code");
            toastService.error("Please enter the complete 6-digit OTP code");
            return;
        }

        logger.debug("🔐 Verifying mobile OTP", { mobile: verifyMob.mobile });
        await mobileVerify();
    };
    /**
     * Handle email input change
     * Resets verification status if email is changed after verification
     * 
     * @param {Event} e - Input change event
     */
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        const previousEmail = email;
        
        setEmail(newEmail); // Update email state on input change
        setEmailOtp({ ...emailOtp, email: newEmail }); // Sync emailOtp state
        setMobOtp({...mobOtp, email: newEmail});
        setVerifyEmail({ ...verifyEmail, email: newEmail, activation_code: "" }); // Reset OTP when email changes
        
        // Reset email verification if email changed after verification
        if (verifiedEmail && newEmail !== previousEmail) {
            logger.debug("🔄 Email changed, resetting email verification");
            setVerifiedEmail(false);
            toastService.info("Email changed. Please verify again");
        }
        
        // Also reset mobile verification if email changes
        if (verifiedMobile && newEmail !== previousEmail) {
            logger.debug("🔄 Email changed, resetting mobile verification");
            setVerifiedMobile(false);
        }
    };

    /**
     * Handle mobile input change
     * Resets verification status if mobile is changed after verification
     * 
     * @param {Event} e - Input change event
     */
    const handleMobChange = (e) => {
        const newMobile = e.target.value;
        const previousMobile = mob;
        
        setMob(newMobile);
        setEmailOtp({ ...emailOtp, mobile: newMobile });
        setMobOtp({ ...mobOtp, mobile: newMobile }); // Sync mobOtp state
        setVerifyMob({ ...verifyMob, mobile: newMobile, otp_code: "" }); // Reset OTP when mobile changes
        
        // Reset mobile verification if mobile changed after verification
        if (verifiedMobile && newMobile !== previousMobile) {
            logger.debug("🔄 Mobile changed, resetting mobile verification");
            setVerifiedMobile(false);
            toastService.info("Mobile number changed. Please verify again");
        }
    };
    /**
     * Verify email OTP code
     * Validates the OTP sent to email
     * 
     * @returns {Promise<void>}
     */
    const emailVerify = async () => {
        logger.debug("🔐 Verifying email OTP", { 
            email: verifyEmail.email,
            activation_code: verifyEmail.activation_code?.substring(0, 2) + "****" // Mask OTP in logs
        });
        
        setSnackOpen(false);

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/verifyHCFDiagnosticStaffEmail`,
                JSON.stringify({
                    email: verifyEmail.email,
                    activation_code: verifyEmail.activation_code
                }),
                {
                    headers: { 
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    },
                }
            );

            logger.debug("✅ Email verified successfully", { response: response?.data });

            // Mark email as verified
            setVerifiedEmail(true);
            
            // Close the OTP modal
            setIsEmailModalOtp(false);

            // Show success message
            setSnackMessage("Email verified successfully.");
            setSnackType("success");
            setSnackOpen(true);
            toastService.success("Email verified successfully");
        } catch (error) {
            logger.error("❌ Email verification failed:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Invalid OTP. Please check and try again.";
            
            setSnackMessage(errorMessage);
            setSnackType("error");
            setSnackOpen(true);
            toastService.error(errorMessage);
        }
    };

    /**
     * Verify mobile OTP code
     * Validates the OTP sent to mobile number
     * 
     * @returns {Promise<void>}
     */
    const mobileVerify = async () => {
        logger.debug("🔐 Verifying mobile OTP", { 
            mobile: verifyMob.mobile,
            otp_code: verifyMob.otp_code?.substring(0, 2) + "****" // Mask OTP in logs
        });
        
        setSnackOpen(false);

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/verifyHCFDiagnosticStaffMobile`,
                JSON.stringify({
                    mobile: verifyMob.mobile,
                    otp_code: verifyMob.otp_code
                }),
                {
                    headers: { 
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    },
                }
            );

            logger.debug("✅ Mobile verified successfully", { response: response?.data });

            // Mark mobile as verified
            setVerifiedMobile(true);
            
            // Close the OTP modal
            setIsMobModalOtp(false);

            // Show success message
            setSnackMessage("Mobile verified successfully.");
            setSnackType("success");
            setSnackOpen(true);
            toastService.success("Mobile verified successfully");
        } catch (error) {
            logger.error("❌ Mobile verification failed:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Invalid OTP. Please check and try again.";
            
            setSnackMessage(errorMessage);
            setSnackType("error");
            setSnackOpen(true);
            toastService.error(errorMessage);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "90%", flexDirection: "row" }}>
                <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/diagnosticcenter/labs"}>Labs</NavLink>
                    <NavLink to={"/hcfadmin/diagnosticcenter/staff"}>Staff</NavLink>
                    <NavLink to={"/hcfadmin/diagnosticcenter/blocked"}>Blocked</NavLink>
                    <CustomButton
                        buttonCss={{ position: "absolute", right: "0", borderRadius: "6.25rem" }}
                        isTransaprent={true}
                        label="Add Staff"
                        handleClick={() => setOpenDialog(true)}
                    />
                </nav>
                {/* modal for adding staff */}
                <CustomModal
                    conditionOpen={setOpenDialog}
                    isOpen={openDialog}
                    disableBackdropClick={true}
                    title={<h5 style={{ fontWeight: "bold" }}>Create Staff</h5>}
                    footer={
                        <Fragment>
                            <CustomButton
                                buttonCss={{
                                    borderRadius: "25px",
                                    fontFamily: "PoppiveriFyEmailOTPHandlerns",
                                    marginTop: "20px",
                                }}
                                label={"Create"}
                                isDisabled={!verifiedEmail || !verifiedMobile} // Disable button if either verification is incomplete
                                handleClick={() => {
                                    fetchTestData();
                                }}
                            />
                        </Fragment>
                    }
                    style={{ width: "90%", maxWidth: "1000px", height: "auto" }} // Increased size of modal
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(2, 1fr)" // 2-column grid layout
                        gap="20px" // Increased gap between fields for better spacing
                    >
                        <CustomDropdown
                            label={"Designation"}
                            items={designationItems.map((item) => item.name)} // Extract just names for display
                            activeItem={selectedDesignation} // State to hold active selected value
                            handleChange={handleDropdownChange1} // Function to handle dropdown changes
                            style={{ width: "100%" }}
                        />
                        <CustomDropdown
                            label={"Department"}
                            items={departmentItems.map((item) => item.name)} // Extract just names for display
                            activeItem={selectedDepartment} // State to hold active selected value
                            handleChange={handleDropdownChange} // Function to handle dropdown changes
                            style={{ width: "100%" }}
                        />
                        <CustomTextField
                            placeholder={"Enter Name"}
                            label="Name"
                            variant="standard"
                            fullWidth
                            helperText={""}
                            defaultValue={textFields?.first_name}
                            onInput={(e) =>
                                setTextFields({
                                    ...textFields,
                                    first_name: e.target.value,
                                })
                            }
                        />
                        <CustomTextField
                            placeholder={"Enter Email"}
                            label="Email"
                            variant="standard"
                            defaultValue={verifyEmail?.email} // Bind email state to input value
                            onChange={handleEmailChange} // Capture email input changes
                            onInput={(e) =>
                                setTextFields({
                                    ...textFields,
                                    email: e.target.value,
                                })
                            }
                            rightIcon={
                                verifiedEmail ? (
                                    <DoneIcon sx={{ color: "green" }} />
                                ) : (
                                    <p
                                        style={{
                                            fontFamily: "Poppins",
                                            fontSize: "0.6em",
                                            color: "#E72B4A",
                                        }}
                                    >
                                        verify
                                    </p>
                                )
                            }
                            onRightIconClick={() => {
                                // Step 1: Send email OTP (will open modal on success)
                                emailRegister();
                            }}
                            fullWidth
                            helperText={""}
                            type="email"
                        />

                        <CustomTextField
                            placeholder={"Enter Mobile Number"}
                            label="Mobile No"
                            variant="standard"
                            fullWidth
                            defaultValue={mob}
                            value={mob} // Bind email state to input value
                            onChange={handleMobChange}
                            onInput={(e) =>
                                setTextFields({
                                    ...textFields,
                                    mobile: e.target.value,
                                })
                            }
                            rightIcon={
                                verifiedMobile ? (
                                    <DoneIcon sx={{ color: "green" }} />
                                ) : (
                                    <p
                                        style={{
                                            fontFamily: "Poppins",
                                            fontSize: "0.6em",
                                            color: "#E72B4A",
                                        }}
                                    >
                                        verify
                                    </p>
                                )
                            }
                            onRightIconClick={() => {
                                // Step 3: Send mobile OTP (only after email is verified)
                                if (!verifiedEmail) {
                                    toastService.warning("Please verify your email first");
                                    return;
                                }
                                mobRegister();
                            }}
                            disabled={!verifiedEmail} // Disable mobile verification until email is verified
                            helperText={""}
                        />
                        <CustomTextField
                            placeholder={"Enter Password"}
                            label="Create Password"
                            variant="standard"
                            fullWidth
                            type="password"
                            helperText={""}
                            value={password}
                            onChange={handlePasswordChange}
                            defaultValue={textFields?.password}
                            onInput={(e) =>
                                setTextFields({
                                    ...textFields,
                                    password: e.target.value,
                                })
                            }
                        />
                        <CustomTextField
                            placeholder={"Confirm Password"}
                            label="Confirm Password"
                            variant="standard"
                            type="password"
                            fullWidth
                            helperText={passwordError ? "Passwords do not match" : ""}
                            error={passwordError} // Highligh•••••••••t in red if there's an error
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </Box>
                </CustomModal>
                {/* modal for email otp verification  */}
                <CustomModal
                    isOpen={isEmailModalOtp}
                    conditionOpen={setIsEmailModalOtp}
                    title={"Enter Email OTP"}
                    disableBackdropClick={true}
                >
                    <div id="otp-box-container">
                        <CustomOTPInput
                            value={verifyEmail?.activation_code}
                            onChange={(value) => {
                                setVerifyEmail({ ...verifyEmail, activation_code: value });
                            }}
                            numInputs={6}
                            placeholder="*"
                        />
                        <div className="otpsent">
                            <p>The OTP has been sent to -{email}</p>
                        </div>
                        <CustomButton label={"Verify"} handleClick={veriFyEmailOTPHandler} />
                    </div>
                </CustomModal>
                {/* modal for mobile otp verification  */}
                <CustomModal
                    isOpen={isMobModalOtp}
                    conditionOpen={setIsMobModalOtp}
                    title={"Enter Mobile OTP"}
                    disableBackdropClick={true}
                >
                    <div id="otp-box-container">
                        <CustomOTPInput
                            value={verifyMob?.otp_code || ""}
                            onChange={(value) => {
                                setVerifyMob({ ...verifyMob, otp_code: value });
                            }}
                            numInputs={6}
                            placeholder="*"
                        />
                        <div className="otpsent">
                            <p>The OTP has been sent to - {mob} </p>
                        </div>
                        <CustomButton label={"Verify"} handleClick={veriFyMobOTPHandler} />
                    </div>
                </CustomModal>
                {/* modal for editing staff */}
                <CustomModal
                    conditionOpen={setOpenEditDialog}
                    isOpen={openEditDialog}
                    disableBackdropClick={true}
                    title={<h5 style={{ fontWeight: "bold" }}>Edit Staff</h5>}
                    footer={
                        <Fragment>
                            <CustomButton
                                buttonCss={{
                                    borderRadius: "25px",
                                    fontFamily: "PoppiveriFyEmailOTPHandlerns",
                                    marginTop: "20px",
                                }}
                                label={"Update"}
                                // isDisabled={!isFieldsFilled}
                                handleClick={() => {
                                    UpdateStaff();
                                }}
                            />
                        </Fragment>
                    }
                    style={{ width: "90%", maxWidth: "1000px", height: "auto" }} // Increased size of modal
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(2, 1fr)" // 2-column grid layout
                        gap="20px" // Increased gap between fields for better spacing
                    >
                        <CustomDropdown
                            label={"Designation"}
                            items={EditdesignationItems.map((item) => item.name)} // Extract just names for display
                            activeItem={selectedDesignation} // State to hold active selected value
                            handleChange={handleEditDropdownChange1} // Function to handle dropdown changes
                            style={{ width: "100%" }}
                        />
                        <CustomDropdown
                            label={"Department"}
                            items={EditdepartmentItems.map((item) => item.name)} // Extract just names for display
                            activeItem={selectedDepartment} // State to hold active selected value
                            handleChange={handleEditropdownChange} // Function to handle dropdown changes
                            style={{ width: "100%" }}
                        />
                        <CustomTextField
                            placeholder={"Enter Name"}
                            label="Name"
                            variant="standard"
                            fullWidth
                            helperText={""}
                            defaultValue={editdata?.first_name}
                            onInput={(e) =>
                                setEditdata({
                                    ...editdata,
                                    first_name: e.target.value,
                                })
                            }
                        />
                        <CustomTextField
                            placeholder={"Enter Email"}
                            label="Email"
                            variant="standard"
                            defaultValue={email}
                            value={email} // Bind email state to input value
                            onChange={handleEmailChange} // Capture email input changes
                            fullWidth
                            helperText={""}
                            type="email"
                        />

                        <CustomTextField
                            placeholder={"Enter Mobile Number"}
                            label="Mobile No"
                            variant="standard"
                            fullWidth
                            defaultValue={mob}
                            value={mob} // Bind email state to input value
                            onChange={handleMobChange}
                            helperText={""}
                        />
                        <CustomTextField
                            placeholder={"Enter Password"}
                            label="Create Password"
                            variant="standard"
                            fullWidth
                            type="password"
                            helperText={""}
                            value={password}
                            onChange={handlePasswordChange}
                            defaultValue={editdata?.password}
                            onInput={(e) =>
                                setEditdata({
                                    ...editdata,
                                    password: e.target.value,
                                })
                            }
                        />
                        <CustomTextField
                            placeholder={"Confirm Password"}
                            label="Confirm Password"
                            variant="standard"
                            type="password"
                            fullWidth
                            helperText={passwordError ? "Passwords do not match" : ""}
                            error={passwordError} // Highligh•••••••••t in red if there's an error
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </Box>
                </CustomModal>
                <Box
                    component={"div"}
                    sx={{ 
                        flex: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        overflow: "hidden",
                        marginTop: "4em",
                    }}
                >
                    {/* Scrollable table container - enables internal scrolling when table exceeds viewport */}
                    <TableContainer 
                        component={Paper} 
                        style={{ 
                            background: "white",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0,
                            overflow: "auto", // Enable scrolling for table content
                            maxHeight: "calc(100vh - 250px)", // Adjusted to account for navbar and spacing
                            border: "1px solid #e72b4a", borderRadius: "10px", padding: "10px"
                        }}
                    >
                        <Table sx={{ minWidth: 1 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ fontWeight: "bold" }}>
                                    <TableCell>Name & Details</TableCell>
                                    <TableCell align="right">Title</TableCell>
                                    <TableCell align="right">Department</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell colSpan={5} align="center">
                                                <Skeleton
                                                    variant="rectangular"
                                                    width="100%"
                                                    height={40}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : displayedData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <NoAppointmentCard text_one={"No Data Found"} />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    displayedData.map((item, index) => (
                                        <TableRow key={item.staff_id || index}>
                                            <TableCell component="th" scope="row">
                                                <StaffCards
                                                    name={`${item.first_name}`}
                                                    staff_id={`${item.staff_id}`}
                                                    lab_id={""}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    style={{
                                                        color: "#939094",
                                                        fontFamily: "Poppins",
                                                    }}
                                                >
                                                    {item.hcf_diag_name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    style={{
                                                        color: "#939094",
                                                        fontFamily: "Poppins",
                                                    }}
                                                >
                                                    {item.lab_department_name}`
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <CustomButton
                                                    buttonCss={{ borderRadius: "6.25rem" }}
                                                    isDisabled={item.diag_status !== 1} // Disable the button if lab_status is not 1 (Inactive)
                                                    label={
                                                        item.diag_status === 1
                                                            ? "Active"
                                                            : "Inactive"
                                                    }
                                                    isTransaprent
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <CustomButton
                                                    buttonCss={{ borderRadius: "6.25rem" }}
                                                    label={<img src={pen} alt="Edit" />}
                                                    isTransaprent
                                                    handleClick={() => handleEdit(item)} // Pass the clicked test's data to handleEdit
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onPageChange={(event, newPage) => setCurrentPage(newPage)}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setCurrentPage(0); // Reset to the first page
                            }}
                            labelRowsPerPage="Rows per page:"
                        />
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default AdminStaff;
