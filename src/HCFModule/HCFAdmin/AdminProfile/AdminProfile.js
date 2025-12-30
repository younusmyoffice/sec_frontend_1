import { Box, Typography, Button, Divider, Avatar, IconButton, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import CustomButton from "../../../components/CustomButton";
import CustomTextField from "../../../components/CustomTextField";
import CustomDropdown from "../../../components/CustomDropdown";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import dayjs from "dayjs";
import CustomSnackBar from "../../../components/CustomSnackBar";
import DocProf from "../../../static/images/DrImages/doc3.png";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications
import Loading from "../../../components/Loading/Loading"; // Reusable loader component
import "./AdminProfile.scss";

/**
 * Helper function for date calculations (currently unused)
 * @param {Date} date - Date object
 * @param {number} amount - Number of weeks to add
 * @returns {Date|undefined} Date with weeks added
 */
function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

/**
 * AdminProfile Component
 * 
 * HCF Admin profile management page
 * Features:
 * - View and edit HCF admin profile information
 * - Profile picture upload
 * - Registration details management
 * - Diagnostic center details
 * - Edit/Save functionality
 * 
 * API Endpoints:
 * - GET /sec/hcf/getHcfprofile/{hcf_id} (fetch profile)
 * - POST /sec/hcf/updateHcfprofile?hcf_id={hcf_id} (update profile)
 * 
 * @component
 */
const AdminProfile = () => {
    logger.debug("🔵 AdminProfile component rendering");
    
    const navigate = useNavigate();

    /**
     * Get HCF admin ID from localStorage with error handling
     */
    const getHcfId = () => {
        try {
            const hcfId = localStorage.getItem("hcfadmin_suid");
            if (!hcfId) {
                logger.warn("⚠️ HCF admin SUID not found in localStorage");
                toastService.error("HCF admin information not available");
            }
            return hcfId;
        } catch (error) {
            logger.error("❌ Error accessing localStorage for HCF ID:", error);
            toastService.error("Failed to load HCF admin information");
            return null;
        }
    };

    const hcf_id = getHcfId();

    // Notification/snackbar state
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    
    // Loading and editing states
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [profiledata, setProfileData] = useState({
        email: localStorage.getItem("hcfadmin_Email"),
        suid: hcf_id,
        role_id: 2,
        hcf_name: "",
        mobile_no: "",
        password: "",
        profile_picture: "",
        state_reg_no: "",
        indian_reg_no: "",
        state_reg_date: "",
        indian_reg_date: "",
        diag_state_reg_no: "",
        diag_indian_reg_no: "",
        diag_state_reg_date: "",
        diag_indian_reg_date: "",
        // Additional fields for API compatibility
        first_name: "",
        last_name: "",
        middle_name: "",
        country_id: "",
        state_id: "",
        city_id: "",
        category_id: 1,
        reg_no: "",
        service_time_from: "",
        service_time_to: "",
        service_day_from: "",
        service_day_to: "",
        service_offer: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    /**
     * Fetch HCF admin profile data from API
     * Loads existing profile information to populate the form
     */
    useEffect(() => {
        const fetchProfileData = async () => {
            if (!hcf_id) {
                logger.warn("⚠️ No HCF ID available, skipping profile fetch");
                return;
            }
            
            logger.debug("📡 Fetching HCF admin profile data", { hcf_id });
            setIsFetching(true);
            
            try {
                const response = await axiosInstance.get(`/sec/hcf/getHcfprofile/${hcf_id}`);
                logger.debug("✅ Profile API response received", {
                    hasResponse: !!response?.data?.response,
                    dataLength: response?.data?.response?.length || 0,
                });
                
                // Check if response has the expected structure
                if (response?.data?.response && response.data.response.length > 0) {
                    const profiledata = response.data.response[0];
                    logger.debug("✅ Profile data extracted successfully", {
                        hasHcfName: !!profiledata.hcf_name,
                        hasProfilePicture: !!profiledata.profile_picture,
                    });

                    // Update the state with fetched data
                    setProfileData((prevState) => ({
                        ...prevState,
                        hcf_name: profiledata.hcf_name || profiledata.first_name || "",
                        mobile_no: profiledata.mobile_no || "",
                        password: "**********", // Masked password
                        profile_picture: profiledata.profile_picture || "",
                        state_reg_no: profiledata.state_reg_no || "",
                        indian_reg_no: profiledata.indian_reg_no || "",
                        state_reg_date: profiledata.state_reg_date || "",
                        indian_reg_date: profiledata.indian_reg_date || "",
                        diag_state_reg_no: profiledata.diag_state_reg_no || "",
                        diag_indian_reg_no: profiledata.diag_indian_reg_no || "",
                        diag_state_reg_date: profiledata.diag_state_reg_date || "",
                        diag_indian_reg_date: profiledata.diag_indian_reg_date || "",
                        // Additional fields
                        first_name: profiledata.first_name || "",
                        last_name: profiledata.last_name || "",
                        middle_name: profiledata.middle_name || "",
                        country_id: profiledata.country_id || "",
                        state_id: profiledata.state_id || "",
                        city_id: profiledata.city_id || "",
                        category_id: profiledata.category_id || 1,
                        reg_no: profiledata.reg_no || "",
                        service_time_from: profiledata.service_time_from || "",
                        service_time_to: profiledata.service_time_to || "",
                        service_day_from: profiledata.service_day_from || "",
                        service_day_to: profiledata.service_day_to || "",
                        service_offer: profiledata.service_offer || "",
                    }));
                    
                    // Dispatch profile update event for navbar if profile picture exists
                    if (profiledata.profile_picture) {
                        try {
                            localStorage.setItem("profile", profiledata.profile_picture);
                            window.dispatchEvent(new CustomEvent('profileUpdated', { 
                                detail: { profile: profiledata.profile_picture } 
                            }));
                            logger.debug("✅ Profile image saved to localStorage");
                        } catch (error) {
                            logger.error("❌ Error saving profile image to localStorage:", error);
                        }
                    }
                } else {
                    logger.warn("⚠️ No profile data found in API response");
                    toastService.warning("Profile data not found");
                    // Set default values if no data is found
                    try {
                        const defaultEmail = localStorage.getItem("hcfadmin_Email") || "";
                        setProfileData((prevState) => ({
                            ...prevState,
                            email: defaultEmail,
                        }));
                    } catch (error) {
                        logger.error("❌ Error setting default values:", error);
                    }
                }
            } catch (error) {
                logger.error("❌ Failed to fetch HCF admin profile:", error);
                toastService.error(
                    error?.response?.data?.message || 
                    "Failed to load profile information. Please try again later."
                );
                // Set default values on error
                try {
                    const defaultEmail = localStorage.getItem("hcfadmin_Email") || "";
                    setProfileData((prevState) => ({
                        ...prevState,
                        email: defaultEmail,
                    }));
                } catch (error) {
                    logger.error("❌ Error setting default email:", error);
                }
            } finally {
                setIsFetching(false);
            }
        };

        // Fetch profile data on component mount
        fetchProfileData();
    }, [hcf_id]);

    /**
     * Update HCF admin profile data via API
     * Saves changes made in edit mode
     */
    const fetchData = async () => {
        logger.debug("📤 Updating HCF admin profile", {
            hcf_id,
            hasHcfName: !!profiledata.hcf_name,
            hasProfilePicture: !!profiledata.profile_picture,
        });
        
        setIsLoading(true);
        
        try {
            // Validate required fields before submission
            if (!profiledata.hcf_name || profiledata.hcf_name.trim() === "") {
                logger.warn("⚠️ HCF name is required");
                toastService.error("HCF name is required");
                setIsLoading(false);
                return;
            }

            if (!hcf_id) {
                logger.error("❌ HCF ID is missing");
                toastService.error("HCF admin information not available");
                setIsLoading(false);
                return;
            }

            // Prepare the data for API call
            const updateData = {
                hcf_id: parseInt(hcf_id),
                role_id: profiledata.role_id || 2,
                first_name: profiledata.first_name || profiledata.hcf_name || "",
                last_name: profiledata.last_name || "",
                middle_name: profiledata.middle_name || "",
                country_id: profiledata.country_id || "",
                state_id: profiledata.state_id || "",
                city_id: profiledata.city_id || "",
                category_id: profiledata.category_id || 1,
                hcf_name: profiledata.hcf_name.trim(),
                reg_no: profiledata.reg_no || "",
                service_time_from: profiledata.service_time_from || "",
                service_time_to: profiledata.service_time_to || "",
                service_day_from: profiledata.service_day_from || "",
                service_day_to: profiledata.service_day_to || "",
                service_offer: profiledata.service_offer || "",
                state_reg_no: profiledata.state_reg_no || "",
                indian_reg_no: profiledata.indian_reg_no || "",
                state_reg_date: profiledata.state_reg_date || "",
                indian_reg_date: profiledata.indian_reg_date || "",
                diag_state_reg_no: profiledata.diag_state_reg_no || "",
                diag_indian_reg_no: profiledata.diag_indian_reg_no || "",
                diag_state_reg_date: profiledata.diag_state_reg_date || "",
                diag_indian_reg_date: profiledata.diag_indian_reg_date || "",
                profile_picture: profiledata.profile_picture || "",
            };

            logger.debug("📤 Sending update data to API", {
                hcf_id: updateData.hcf_id,
                hcf_name: updateData.hcf_name,
                hasProfilePicture: !!updateData.profile_picture,
            });

            const response = await axiosInstance.post(
                `/sec/hcf/updateHcfprofile?hcf_id=${hcf_id}`,
                JSON.stringify(updateData),
                { 
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                },
            );
            
            logger.debug("✅ Profile updated successfully", {
                hasResponse: !!response?.data,
            });

            // Show success notifications
            setSnackMessage("Profile Updated Successfully");
            setSnackType("success");
            setSnackOpen(true);
            toastService.success("Profile updated successfully");
            
            setIsEditing(false); // Exit edit mode after successful update
            
            // Dispatch profile update event for navbar if profile picture was updated
            if (profiledata.profile_picture) {
                try {
                    localStorage.setItem("profile", profiledata.profile_picture);
                    window.dispatchEvent(new CustomEvent('profileUpdated', { 
                        detail: { profile: profiledata.profile_picture } 
                    }));
                    logger.debug("✅ Updated profile image saved");
                } catch (error) {
                    logger.error("❌ Error saving updated profile image:", error);
                }
            }

            // Refresh profile data to get latest from server
            // Note: You might want to refetch here if needed
        } catch (error) {
            logger.error("❌ Failed to update HCF admin profile:", error);
            
            // Show error notifications
            setSnackMessage(
                error?.response?.data?.message || "Error during updating profile"
            );
            setSnackType("error");
            setSnackOpen(true);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to update profile. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Initialize component
     * Sets localStorage flags for navigation state
     */
    React.useEffect(() => {
        logger.debug("🔵 AdminProfile component mounting");
        
        try {
            localStorage.setItem("activeComponent", "profile");
            localStorage.setItem("path", "adminprofile");
            logger.debug("✅ Set localStorage flags");
        } catch (error) {
            logger.error("❌ Error setting localStorage:", error);
        }
    }, []);
    const [profileImage, setProfileImage] = useState(DocProf);

    /**
     * Handle profile picture file selection
     * Converts image file to base64 for API submission
     * 
     * @param {Event} event - File input change event
     */
    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        
        if (!file) {
            logger.warn("⚠️ No file selected");
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            logger.error("❌ Invalid file type selected");
            toastService.error("Please select an image file");
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            logger.error("❌ File size too large", { size: file.size });
            toastService.error("Image size should be less than 5MB");
            return;
        }

        logger.debug("📸 Processing profile picture", {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
        });

        const reader = new FileReader();

        reader.onloadend = () => {
            try {
                // Store the full data URL (including metadata) for API
                const fullDataUrl = reader.result;
                const previewUrl = URL.createObjectURL(file); // For preview
                
                logger.debug("✅ Profile picture processed successfully", {
                    dataLength: fullDataUrl.length,
                });
                
                setProfileImage(previewUrl);
                
                setProfileData((prevData) => ({
                    ...prevData,
                    profile_picture: fullDataUrl, // Store full data URL for API
                }));
                
                // Dispatch custom event to notify navbar of profile update
                try {
                    localStorage.setItem("profile", fullDataUrl);
                    window.dispatchEvent(new CustomEvent('profileUpdated', { 
                        detail: { profile: fullDataUrl } 
                    }));
                    toastService.success("Profile picture updated successfully");
                } catch (error) {
                    logger.error("❌ Error saving profile image:", error);
                    toastService.error("Failed to save profile image");
                }
            } catch (error) {
                logger.error("❌ Error processing profile picture:", error);
                toastService.error("Failed to process image");
            }
        };

        reader.onerror = () => {
            logger.error("❌ File reading error");
            toastService.error("Error reading image file");
        };

        reader.readAsDataURL(file);
    };

    /**
     * Toggle edit mode on/off
     * When canceling, you might want to reload original data
     */
    const toggleEditMode = () => {
        if (isEditing) {
            logger.debug("❌ Edit mode cancelled");
            toastService.info("Changes cancelled");
        } else {
            logger.debug("✏️ Edit mode enabled");
        }
        setIsEditing(!isEditing);
    };
    return (
        <Box sx={{ 
            width: "100%",
            height: "100%",
            minHeight: "100%", 
            backgroundColor: "#ffffff", 
            padding: "24px",
            paddingBottom: "48px", // Extra bottom padding for scroll
            fontFamily: "Poppins, sans-serif",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* Loading overlay when fetching initial data */}
            {isFetching && (
                <Loading
                    variant="overlay"
                    size="large"
                    message="Loading Profile Information"
                    subMessage="Please wait while we fetch your profile data..."
                    fullScreen={false}
                />
            )}
            
            {/* Snackbar for notifications */}
            <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />
            
            {/* Header Section */}
            <Box sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                marginBottom: "32px"
            }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#E72B4A",
                            color: "white",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#d32f2f"
                            }
                        }}
                    >
                        Profile Information
                    </Button>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#313033"
                    }}>
                        Profile ID: SRCH0001
                    </Typography>
                    <IconButton sx={{ color: "#E72B4A" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Edit Profile Button Section */}
            <Box sx={{ 
                display: "flex", 
                justifyContent: "flex-end",
                alignItems: "center", 
                gap: 2,
                marginBottom: "32px"
            }}>
                {!isEditing ? (
                    /* Edit Profile Button - Shows when not editing */
                    <CustomButton
                        label="Edit Profile"
                        handleClick={toggleEditMode}
                        leftIcon={<EditIcon />}
                        buttonCss={{
                            backgroundColor: "#E72B4A",
                            color: "white",
                            borderRadius: "8px",
                            padding: "12px 24px",
                            fontSize: "16px",
                            fontWeight: "500",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#d32f2f"
                            }
                        }}
                    />
                ) : (
                    /* Cancel Edit Button - Shows when editing */
                    <CustomButton
                        label="Cancel"
                        handleClick={toggleEditMode}
                        isTransaprent={true}
                        buttonCss={{
                            border: "1px solid #E72B4A",
                            color: "#E72B4A",
                            borderRadius: "8px",
                            padding: "12px 24px",
                            fontSize: "16px",
                            fontWeight: "500",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "rgba(231, 43, 74, 0.04)"
                            }
                        }}
                    />
                )}
            </Box>

            {/* Profile Picture and Basic Info */}
            <Box sx={{ 
                display: "flex", 
                alignItems: "flex-start", 
                gap: "32px",
                marginBottom: "48px"
            }}>
                {/* Profile Picture */}
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    gap: 2
                }}>
                    <Avatar
                        src={profiledata?.profile_picture || profileImage}
                        sx={{
                            width: "120px",
                            height: "120px",
                            backgroundColor: "#f5f5f5",
                            border: "2px solid #e0e0e0"
                        }}
                    >
                        <BusinessIcon sx={{ fontSize: "48px", color: "#e72b4a" }} />
                    </Avatar>
                    <Button
                        variant="outlined"
                        disabled={!isEditing}
                        component="label"
                        sx={{
                            fontSize: "12px",
                            padding: "6px 12px",
                            borderColor: "#E72B4A",
                            color: "#E72B4A",
                            "&:hover": {
                                borderColor: "#d32f2f",
                                backgroundColor: "rgba(231, 43, 74, 0.04)"
                            }
                        }}
                    >
                        Choose Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                </Box>

                {/* Basic Information Fields */}
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "24px",
                    flex: 1
                }}>
                    <CustomTextField
                        label="HCF Name"
                        variant="standard"
                        CustomValue={profiledata?.hcf_name || ""}
                        defaultValue={profiledata?.hcf_name || ""}
                        isDisabled={!isEditing}
                        onChange={(event) => {
                            setProfileData(prev => ({
                                ...prev,
                                hcf_name: event.target.value
                            }));
                        }}
                        textcss={{
                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                        }}
                    />
                    
                    <CustomTextField
                        label="Mobile No"
                        variant="standard"
                        CustomValue={profiledata?.mobile_no || ""}
                        defaultValue={profiledata?.mobile_no || ""}
                        isDisabled={!isEditing}
                        onChange={(event) => {
                            setProfileData(prev => ({
                                ...prev,
                                mobile_no: event.target.value
                            }));
                        }}
                        textcss={{
                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                        }}
                    />
                    
                    <CustomTextField
                        label="Email"
                        variant="standard"
                        CustomValue={profiledata?.email || ""}
                        defaultValue={profiledata?.email || ""}
                        isDisabled={true}
                        textcss={{
                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                        }}
                    />
                    
                    <Box>
                        <CustomTextField
                            label="Password"
                            variant="standard"
                            CustomValue={profiledata?.password || ""}
                            defaultValue={profiledata?.password || ""}
                            isDisabled={true}
                            textcss={{
                                "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                                "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                            }}
                        />
                        {/* <Typography sx={{
                            fontSize: "12px",
                            color: "#E72B4A",
                            cursor: "pointer",
                            marginTop: "4px",
                            "&:hover": { textDecoration: "underline" }
                        }}>
                            Forgotten Password
                        </Typography> */}
                    </Box>
                </Box>
            </Box>

            {/* Registration Details Section */}
            <Box sx={{ marginBottom: "48px" }}>
                {/* Section Header with Title and Action Icons */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px"
                }}>
                    <Typography sx={{
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "#313033",
                        fontFamily: "Poppins, sans-serif"
                    }}>
                        Registration Details
                    </Typography>
                    
                    {/* Action Icons - Add and Edit */}
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        {/* Add Icon - For adding new registration details */}
                        <IconButton
                            onClick={() => {
                                logger.debug("➕ Add registration details clicked");
                                toastService.info("Add functionality coming soon");
                            }}
                            sx={{
                                color: "#E72B4A",
                                "&:hover": {
                                    backgroundColor: "rgba(231, 43, 74, 0.1)"
                                }
                            }}
                            disabled={!isEditing}
                            title="Add Registration Details"
                        >
                            <AddIcon />
                        </IconButton>
                        
                        {/* Edit Icon - Toggle edit mode for this section */}
                        <IconButton
                            onClick={() => {
                                logger.debug("✏️ Edit registration details clicked");
                                toggleEditMode();
                            }}
                            sx={{
                                color: "#E72B4A",
                                "&:hover": {
                                    backgroundColor: "rgba(231, 43, 74, 0.1)"
                                }
                            }}
                            title={isEditing ? "Cancel Edit" : "Edit Registration Details"}
                        >
                            <EditIcon />
                        </IconButton>
                        <Typography sx={{
                            fontSize: "14px",
                            color: "#E72B4A",
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            cursor: "pointer",
                            "&:hover": {
                                textDecoration: "underline"
                            }
                        }}>
                            Edit
                        </Typography>
                    </Box>
                </Box>
                
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "24px",
                    marginBottom: "24px"
                }}>
                    <CustomTextField
                        label="State Registration No"
                        variant="standard"
                        CustomValue={profiledata?.state_reg_no || ""}
                        defaultValue={profiledata?.state_reg_no || ""}
                        isDisabled={!isEditing}
                        onChange={(event) => {
                            setProfileData(prev => ({
                                ...prev,
                                state_reg_no: event.target.value
                            }));
                        }}
                        textcss={{
                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                        }}
                    />
                    
                    <CustomTextField
                        label="Indian Registration No"
                        variant="standard"
                        CustomValue={profiledata?.indian_reg_no || ""}
                        defaultValue={profiledata?.indian_reg_no || ""}
                        isDisabled={!isEditing}
                        onChange={(event) => {
                            setProfileData(prev => ({
                                ...prev,
                                indian_reg_no: event.target.value
                            }));
                        }}
                        textcss={{
                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                        }}
                    />
                </Box>
                
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "24px"
                }}>
                    {/* State Registration Date */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="State Registration Date"
                            variant="standard"
                            value={profiledata.state_reg_date ? dayjs(profiledata.state_reg_date) : null}
                            disabled={!isEditing}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setProfileData(prev => ({
                                        ...prev,
                                        state_reg_date: newValue.format("YYYY-MM-DD")
                                    }));
                                }
                            }}
                            slotProps={{
                                textField: {
                                    sx: {
                                        "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                        "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                                        "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                    
                    {/* Indian Registration Date */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Indian Registration Date"
                            variant="standard"
                            value={profiledata.indian_reg_date ? dayjs(profiledata.indian_reg_date) : null}
                            disabled={!isEditing}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setProfileData(prev => ({
                                        ...prev,
                                        indian_reg_date: newValue.format("YYYY-MM-DD")
                                    }));
                                }
                            }}
                            slotProps={{
                                textField: {
                                    sx: {
                                        "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                        "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                                        "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>

            {/* Diagnostic Center Details Section */}
            <Box sx={{ marginBottom: "48px" }}>
                {/* Section Header with Title and Action Icons */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px"
                }}>
                    <Typography sx={{
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "#313033",
                        fontFamily: "Poppins, sans-serif"
                    }}>
                        Diagnostic Center Details
                    </Typography>
                    
                    {/* Action Icons - Add and Edit */}
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        {/* Add Icon - For adding new diagnostic center details */}
                        <IconButton
                            onClick={() => {
                                logger.debug("➕ Add diagnostic center details clicked");
                                toastService.info("Add functionality coming soon");
                            }}
                            sx={{
                                color: "#E72B4A",
                                "&:hover": {
                                    backgroundColor: "rgba(231, 43, 74, 0.1)"
                                }
                            }}
                            disabled={!isEditing}
                            title="Add Diagnostic Center Details"
                        >
                            <AddIcon />
                        </IconButton>
                        
                        {/* Edit Icon - Toggle edit mode for this section */}
                        <IconButton
                            onClick={() => {
                                logger.debug("✏️ Edit diagnostic center details clicked");
                                toggleEditMode();
                            }}
                            sx={{
                                color: "#E72B4A",
                                "&:hover": {
                                    backgroundColor: "rgba(231, 43, 74, 0.1)"
                                }
                            }}
                            title={isEditing ? "Cancel Edit" : "Edit Diagnostic Center Details"}
                        >
                            <EditIcon />
                        </IconButton>
                        <Typography sx={{
                            fontSize: "14px",
                            color: "#E72B4A",
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            cursor: "pointer",
                            "&:hover": {
                                textDecoration: "underline"
                            }
                        }}>
                            Edit
                        </Typography>
                    </Box>
                </Box>
                
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "24px",
                    marginBottom: "24px"
                }}>
                    <CustomTextField
                        label="State Registration No"
                        variant="standard"
                        CustomValue={profiledata?.diag_state_reg_no || ""}
                        defaultValue={profiledata?.diag_state_reg_no || ""}
                        isDisabled={!isEditing}
                        onChange={(event) => {
                            setProfileData(prev => ({
                                ...prev,
                                diag_state_reg_no: event.target.value
                            }));
                        }}
                        textcss={{
                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                        }}
                    />
                    
                    <CustomTextField
                        label="Indian Registration No"
                        variant="standard"
                        CustomValue={profiledata?.diag_indian_reg_no || ""}
                        defaultValue={profiledata?.diag_indian_reg_no || ""}
                        isDisabled={!isEditing}
                        onChange={(event) => {
                            setProfileData(prev => ({
                                ...prev,
                                diag_indian_reg_no: event.target.value
                            }));
                        }}
                        textcss={{
                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                        }}
                    />
                </Box>
                
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "24px"
                }}>
                    {/* Diagnostic State Registration Date */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="State Registration Date"
                            variant="standard"
                            value={profiledata.diag_state_reg_date ? dayjs(profiledata.diag_state_reg_date) : null}
                            disabled={!isEditing}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setProfileData(prev => ({
                                        ...prev,
                                        diag_state_reg_date: newValue.format("YYYY-MM-DD")
                                    }));
                                }
                            }}
                            slotProps={{
                                textField: {
                                    sx: {
                                        "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                        "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                                        "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                    
                    {/* Diagnostic Indian Registration Date */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Indian Registration Date"
                            variant="standard"
                            value={profiledata.diag_indian_reg_date ? dayjs(profiledata.diag_indian_reg_date) : null}
                            disabled={!isEditing}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setProfileData(prev => ({
                                        ...prev,
                                        diag_indian_reg_date: newValue.format("YYYY-MM-DD")
                                    }));
                                }
                            }}
                            slotProps={{
                                textField: {
                                    sx: {
                                        "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                        "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#e72b4a" },
                                        "& .MuiInput-underline:after": { borderBottomColor: "#e72b4a" }
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>

            {/* Profile Update Button - Always visible, enabled when editing */}
            <Box sx={{ 
                display: "flex", 
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                marginTop: "48px",
                paddingTop: "32px",
                paddingBottom: "24px", // Extra bottom padding
                borderTop: "1px solid #e0e0e0",
                flexShrink: 0 // Prevent button from being cut off
            }}>
                <CustomButton
                    label={
                        isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Profile Update"
                        )
                    }
                    handleClick={fetchData}
                    isDisabled={!isEditing || isLoading || isFetching}
                    buttonCss={{
                        backgroundColor: isEditing ? "#E72B4A" : "#939094", // Primary brand color when enabled, gray when disabled
                        color: "white",
                        padding: "12px 48px",
                        fontSize: "16px",
                        fontWeight: "500",
                        borderRadius: "8px",
                        textTransform: "none",
                        minWidth: "200px",
                        height: "48px",
                        "&:hover": {
                            backgroundColor: isEditing ? "#d32f2f" : "#939094"
                        },
                        "&:disabled": {
                            backgroundColor: "#939094", // Common color variant
                            color: "white",
                            cursor: "not-allowed"
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

// PropTypes for component documentation
AdminProfile.propTypes = {
    // This component doesn't accept props currently, but structure is ready
};

export default AdminProfile;
