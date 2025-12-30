import { 
    Box, 
    CircularProgress, 
    Grid, 
    Typography, 
    Card, 
    CardContent,
    Chip,
    Stack,
    Paper,
    IconButton,
    Tooltip,
    Avatar,
    Button,
    Divider
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../components/CustomButton/custom-button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./profile.scss";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance"; // Handles access token automatically
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonIcon from "@mui/icons-material/Person";
import CustomSnackBar from "../../components/CustomSnackBar";
import logger from "../../utils/logger"; // Centralized logging
import toastService from "../../services/toastService"; // Toast notifications
import Loading from "../../components/Loading/Loading"; // Reusable loader component

/**
 * Profile Component
 * 
 * Displays and allows editing of patient profile information
 * Features:
 * - View and edit personal information (name, DOB, gender)
 * - Profile picture upload and management
 * - Data persistence with localStorage
 * - Integration with patient profile API
 * 
 * API Endpoints:
 * - POST /sec/patientprofile (fetch profile data)
 * - POST /sec/updatePateintProfile (update profile data)
 * 
 * @component
 */
const Profile = () => {
    logger.debug("🔵 Profile component rendering");
    
    const navigate = useNavigate();
    const location = useLocation();

    // Remove unused state variable - activeDropdown was not used anywhere

    /**
     * Determine navigation paths based on current location
     * Sets profile and contact links dynamically
     */
    const getNavigationPaths = useCallback(() => {
        try {
            const activeComponent = localStorage.getItem("activeComponent");
            let profilePath = null;
            let contactPath = null;
            
            switch (activeComponent) {
                case "dashboard":
                    profilePath = "/patientDashboard/dashboard/profile";
                    contactPath = "/patientDashboard/dashboard/contact";
                    break;
                case "appointment":
                    profilePath = "/patientDashboard/appointment/profile";
                    contactPath = "/patientDashboard/appointment/contact";
                    break;
                case "manage":
                    profilePath = "/patientDashboard/manage/profile";
                    contactPath = "/patientDashboard/manage/contact";
                    break;
                default:
                    // Fallback based on current URL
                    if (location.pathname.includes("/dashboard")) {
                        profilePath = "/patientDashboard/dashboard/profile";
                        contactPath = "/patientDashboard/dashboard/contact";
                    } else if (location.pathname.includes("/appointment")) {
                        profilePath = "/patientDashboard/appointment/profile";
                        contactPath = "/patientDashboard/appointment/contact";
                    } else if (location.pathname.includes("/manage")) {
                        profilePath = "/patientDashboard/manage/profile";
                        contactPath = "/patientDashboard/manage/contact";
                    }
            }
            
            return { profilePath, contactPath };
        } catch (error) {
            logger.error("❌ Error determining navigation paths:", error);
            return { profilePath: null, contactPath: null };
        }
    }, [location.pathname]);

    // Navigation link states
    const [profileLink, setProfileLink] = useState("");
    const [contactLink, setContactLink] = useState("");

    // UI state
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    // Snackbar state (keeping for backward compatibility, but also using toastService)
    const [isopen, setIsopen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackStatus, setSnackStatus] = useState("");

    /**
     * Profile data state
     * Contains all profile information
     */
    const [profileUpdate, setProfileUpdate] = useState({
        email: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        added_by: "self",
        gender: "",
        DOB: null,
        profile_picture: null,
    });

    /**
     * Get patient email from localStorage with error handling
     */
    const getPatientEmail = useCallback(() => {
        try {
            return localStorage.getItem("patient_Email") || "";
        } catch (error) {
            logger.error("❌ Error accessing localStorage for email:", error);
            return "";
        }
    }, []);

    /**
     * Get patient SUID from localStorage with error handling
     */
    const getPatientSuid = useCallback(() => {
        try {
            return localStorage.getItem("patient_suid");
        } catch (error) {
            logger.error("❌ Error accessing localStorage for SUID:", error);
            return null;
        }
    }, []);

    /**
     * Fetch patient profile data from API
     * Loads existing profile information to populate the form
     */
    const fetchDataProfile = useCallback(async () => {
        logger.debug("📡 Fetching patient profile data");
        setIsFetching(true);
        
        try {
            const patientSuid = getPatientSuid();
            if (!patientSuid) {
                logger.error("❌ Patient SUID not found");
                toastService.error("Patient information not available");
                setIsFetching(false);
                return;
            }

            const response = await axiosInstance.post(
                "/sec/patientprofile",
                JSON.stringify({
                    suid: patientSuid,
                }),
            );
            
            const profileData = response?.data?.response?.[0];
            
            if (!profileData) {
                logger.warn("⚠️ No profile data received");
                toastService.warning("Profile data not found");
                setIsFetching(false);
                return;
            }
            
            logger.debug("✅ Patient profile fetched successfully", {
                hasEmail: !!profileData?.email,
                hasFirstName: !!profileData?.first_name,
                hasProfilePicture: !!profileData?.profile_picture,
            });

            // Update profile state with fetched data
            setProfileUpdate({
                email: profileData?.email || getPatientEmail(),
                first_name: profileData?.first_name || "",
                last_name: profileData?.last_name || "",
                middle_name: profileData?.middle_name || "",
                added_by: "self",
                gender: profileData?.gender || "",
                DOB: profileData?.DOB || null,
                profile_picture: profileData?.profile_picture || null,
            });

            // Update profile image in localStorage and notify other components
            if (profileData?.profile_picture) {
                try {
                    localStorage.setItem("profile", profileData.profile_picture);
                    window.dispatchEvent(new CustomEvent('profileUpdated', {
                        detail: { profile: profileData.profile_picture }
                    }));
                    logger.debug("✅ Profile image saved to localStorage");
                } catch (error) {
                    logger.error("❌ Error saving profile image to localStorage:", error);
                }
            }
        } catch (error) {
            logger.error("❌ Failed to fetch patient profile:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load profile information. Please try again later."
            );
        } finally {
            setIsFetching(false);
        }
    }, [getPatientSuid, getPatientEmail]);

    /**
     * Update patient profile data via API
     * Saves changes made in edit mode
     */
    const fetchData = useCallback(async () => {
        logger.debug("📤 Updating patient profile", {
            hasFirstName: !!profileUpdate.first_name,
            hasLastName: !!profileUpdate.last_name,
            hasProfilePicture: !!profileUpdate.profile_picture,
        });
        
        setLoading(true);
        
        try {
            // Validate required fields before submission
            if (!profileUpdate.first_name || !profileUpdate.last_name) {
                logger.warn("⚠️ Missing required fields");
                toastService.error("First name and last name are required");
                setLoading(false);
                return;
            }

            const response = await axiosInstance.post(
                "/sec/updatePateintProfile",
                JSON.stringify(profileUpdate),
            );
            
            logger.debug("✅ Profile updated successfully", {
                hasResponse: !!response?.data?.response,
            });

            // Show success notifications
            setSnackMessage("Updated Successfully");
            setSnackStatus("success");
            setIsopen(true);
            toastService.success("Profile updated successfully");

            // Update profile picture if returned from API
            const updatedProfilePic = response?.data?.response?.profile_picture;
            if (updatedProfilePic) {
                try {
                    localStorage.setItem("profile", updatedProfilePic);
                    // Dispatch custom event to notify other components
                    window.dispatchEvent(new CustomEvent('profileUpdated', {
                        detail: { profile: updatedProfilePic }
                    }));
                    logger.debug("✅ Updated profile image saved");
                } catch (error) {
                    logger.error("❌ Error saving updated profile image:", error);
                }
            }

            // Refresh profile data to get latest from server
            await fetchDataProfile();
        } catch (error) {
            logger.error("❌ Failed to update patient profile:", error);
            
            // Show error notifications
            setSnackMessage(
                error?.response?.data?.message || "Error updating profile"
            );
            setSnackStatus("error");
            setIsopen(true);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to update profile. Please try again."
            );
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    }, [profileUpdate, fetchDataProfile]);

    /**
     * Initialize component
     * Sets navigation links and fetches profile data
     */
    useEffect(() => {
        logger.debug("🔵 Profile component mounting");
        
        // Set navigation paths
        const { profilePath, contactPath } = getNavigationPaths();
        setProfileLink(profilePath || "/patientDashboard/dashboard/profile");
        setContactLink(contactPath || "/patientDashboard/dashboard/contact");
        
        // Check if profile image exists in localStorage as fallback
        try {
            const storedProfile = localStorage.getItem("profile");
            if (storedProfile && !profileUpdate.profile_picture) {
                logger.debug("📂 Using profile image from localStorage", {
                    hasImage: !!storedProfile,
                    imageLength: storedProfile.length,
                });
                setProfileUpdate(prev => ({
                    ...prev,
                    profile_picture: storedProfile
                }));
            }
        } catch (error) {
            logger.error("❌ Error accessing localStorage for profile image:", error);
        }
        
        // Fetch profile data
        fetchDataProfile();
    }, [getNavigationPaths, fetchDataProfile]);

    /**
     * Handle profile picture file selection
     * Converts image file to base64 for API submission
     * 
     * @param {Event} event - File input change event
     */
    const handleProfilePictureChange = useCallback((event) => {
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
                // Extract base64 data without metadata prefix
                const base64Data = reader.result.split(",")[1];
                logger.debug("✅ Profile picture processed successfully", {
                    dataLength: base64Data.length,
                });
                
                setProfileUpdate(prev => ({
                    ...prev,
                    profile_picture: base64Data,
                }));
                
                toastService.success("Profile picture updated successfully");
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
    }, []);

    /**
     * Toggle edit mode on/off
     * When canceling, reset to original profile data
     */
    const toggleEditMode = useCallback(() => {
        if (isEditing) {
            logger.debug("❌ Edit mode cancelled - resetting data");
            // Reload original data when canceling
            fetchDataProfile();
            toastService.info("Changes cancelled");
        } else {
            logger.debug("✏️ Edit mode enabled");
        }
        setIsEditing(prev => !prev);
    }, [isEditing, fetchDataProfile]);

    /**
     * Handle form submission
     * Validates and saves profile data
     * 
     * @param {Event} e - Form submission event
     */
    const handleSubmit = useCallback((e) => {
        if (e) {
            e.preventDefault();
        }
        logger.debug("📤 Form submission triggered");
        fetchData();
    }, [fetchData]);

    // Debug logging - only in development mode
    if (process.env.NODE_ENV === 'development') {
        logger.debug("🔍 Profile component state:", {
            isEditing,
            loading,
            isFetching,
            hasFirstName: !!profileUpdate.first_name,
            hasLastName: !!profileUpdate.last_name,
            hasProfilePicture: !!profileUpdate.profile_picture,
        });
    }

    return (
        <Box sx={{ width: "100%", padding: "24px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
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
            
            {/* Snackbar for notifications (keeping for backward compatibility) */}
            <CustomSnackBar isOpen={isopen} message={snackMessage} type={snackStatus} />
            
            {/* Header Section */}
            <Paper 
                elevation={0} 
                sx={{ 
                    padding: "24px", 
                    marginBottom: "24px",
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    backgroundColor: "white"
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <Typography variant="h4" sx={{ 
                        fontWeight: 600, 
                        color: "#313033",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        <PersonIcon sx={{ color: "#E72B4A" }} />
                        Profile Information
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Chip 
                            label={`Profile ID: SRC0001`}
                            sx={{ 
                                backgroundColor: "#E72B4A",
                                color: "white",
                                fontWeight: 500
                            }}
                        />
                        <Tooltip title="Close">
                            <IconButton 
                                onClick={() => navigate("/patientDashboard/dashboard/explore")}
                                sx={{ 
                                    backgroundColor: "#f5f5f5",
                                    "&:hover": { backgroundColor: "#e0e0e0" }
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Navigation Tabs */}
                <Box className="NavBar-Box-profile" sx={{ display: "flex", gap: 1 }}>
                    <NavLink 
                        to={profileLink}
                        style={({ isActive }) => ({
                            textDecoration: "none",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            color: isActive ? "white" : "#313033",
                            backgroundColor: isActive ? "#E72B4A" : "transparent",
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                            border: isActive ? "none" : "1px solid #e0e0e0"
                        })}
                    >
                        Profile Information
                    </NavLink>
                    <NavLink 
                        to={contactLink}
                        style={({ isActive }) => ({
                            textDecoration: "none",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            color: isActive ? "white" : "#313033",
                            backgroundColor: isActive ? "#E72B4A" : "transparent",
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                            border: isActive ? "none" : "1px solid #e0e0e0"
                        })}
                    >
                        Contact Details
                    </NavLink>
                </Box>
            </Paper>

            {/* Edit Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
                <CustomButton
                    label={isEditing ? "Cancel Edit" : "Edit Profile"}
                    isTransaprent={!isEditing}
                    leftIcon={<EditIcon />}
                    buttonCss={{
                        borderRadius: "8px",
                        padding: "12px 24px",
                        fontWeight: 500,
                        border: isEditing ? "1px solid #d32f2f" : "1px solid #E72B4A",
                        color: isEditing ? "#d32f2f" : "#E72B4A"
                    }}
                    handleClick={toggleEditMode}
                />
            </Box>

            {/* Main Content Card */}
            <Card 
                elevation={0} 
                sx={{ 
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    overflow: "hidden",
                    backgroundColor: "white"
                }}
            >
                <CardContent sx={{ padding: "32px" }}>
                    <Grid container spacing={4}>
                        {/* Profile Picture Section */}
                        <Grid item xs={12} md={3}>
                            <Box sx={{ 
                                display: "flex", 
                                flexDirection: "column", 
                                alignItems: "center",
                                textAlign: "center"
                            }}>
                                <Box sx={{ position: "relative", marginBottom: "16px" }}>
                                    {/* Profile Picture Avatar */}
                                    <Avatar
                                        alt={`${profileUpdate?.first_name || ""} ${profileUpdate?.last_name || ""} Profile Picture`}
                                        src={
                                            profileUpdate?.profile_picture
                                                ? profileUpdate.profile_picture.startsWith('data:')
                                                    ? profileUpdate.profile_picture
                                                    : `data:image/jpeg;base64,${profileUpdate.profile_picture}`
                                                : "/images/avatar.png"
                                        }
                                        sx={{ 
                                            width: 180, 
                                            height: 180,
                                            border: "4px solid #E72B4A", // Primary brand color
                                            boxShadow: "0 8px 24px rgba(231, 43, 74, 0.2)",
                                            objectFit: "cover"
                                        }}
                                        onError={(e) => {
                                            logger.warn("⚠️ Avatar image failed to load, using fallback");
                                            e.target.src = "/images/avatar.png";
                                        }}
                                    />
                                    
                                    {/* Debug logging in development mode only */}
                                    {process.env.NODE_ENV === 'development' && profileUpdate?.profile_picture && (
                                        logger.debug("🖼️ Avatar Debug:", {
                                            hasProfilePicture: !!profileUpdate?.profile_picture,
                                            profilePictureLength: profileUpdate?.profile_picture?.length,
                                            profilePictureType: typeof profileUpdate?.profile_picture,
                                            startsWithData: profileUpdate.profile_picture.startsWith('data:'),
                                        })
                                    )}
                                    {isEditing && (
                                        <Tooltip title="Change Profile Picture">
                                            <IconButton
                                                component="label"
                                                sx={{
                                                    position: "absolute",
                                                    bottom: 8,
                                                    right: 8,
                                                    backgroundColor: "#E72B4A",
                                                    color: "white",
                                                    "&:hover": {
                                                        backgroundColor: "#c62828"
                                                    },
                                                    width: 40,
                                                    height: 40
                                                }}
                                            >
                                                <CameraAltIcon fontSize="small" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={handleProfilePictureChange}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                                
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 600, 
                                    color: "#313033",
                                    marginBottom: "8px"
                                }}>
                                    {profileUpdate?.first_name} {profileUpdate?.last_name}
                                </Typography>
                                
                                <Typography variant="body2" sx={{ 
                                    color: "#666",
                                    marginBottom: "16px"
                                }}>
                                    {profileUpdate?.email}
                                </Typography>

                                {isEditing && (
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        startIcon={<CameraAltIcon />}
                                        sx={{
                                            borderColor: "#E72B4A",
                                            color: "#E72B4A",
                                            "&:hover": {
                                                borderColor: "#c62828",
                                                backgroundColor: "rgba(231, 43, 74, 0.04)"
                                            }
                                        }}
                                    >
                                        Change Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={handleProfilePictureChange}
                                        />
                                    </Button>
                                )}
                            </Box>
                        </Grid>

                        {/* Form Section */}
                        <Grid item xs={12} md={9}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                color: "#313033",
                                marginBottom: "24px"
                            }}>
                                Personal Information
                            </Typography>

                            <Stack spacing={3}>
                                {/* First Row - Name Fields */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <CustomTextField
                                            id="first-name"
                                            label="First Name"
                                            isDisabled={!isEditing}
                                            defaultValue={profileUpdate?.first_name}
                                            CustomValue={profileUpdate?.first_name}
                                            helperText=""
                                            isValid
                                            onChange={(event) => {
                                                setProfileUpdate({
                                                    ...profileUpdate,
                                                    first_name: event?.target?.value,
                                                });
                                            }}
                                            textcss={{
                                                width: "100%",
                                                height: "56px",
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { border: "none" },
                                                    "&:hover fieldset": { border: "none" },
                                                    "&.Mui-focused fieldset": { border: "none" },
                                                    borderBottom: "1px solid #e0e0e0",
                                                    borderRadius: 0,
                                                    "&:hover": {
                                                        borderBottom: "2px solid #E72B4A",
                                                    },
                                                    "&.Mui-focused": {
                                                        borderBottom: "2px solid #E72B4A",
                                                    },
                                                },
                                                "& .MuiInputLabel-root": {
                                                    "&.Mui-focused": {
                                                        color: "#E72B4A",
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CustomTextField
                                            id="middle-name"
                                            label="Middle Name"
                                            isDisabled={!isEditing}
                                            defaultValue={profileUpdate?.middle_name}
                                            CustomValue={profileUpdate?.middle_name}
                                            helperText=""
                                            isValid
                                            onChange={(event) => {
                                                setProfileUpdate({
                                                    ...profileUpdate,
                                                    middle_name: event?.target?.value,
                                                });
                                            }}
                                            textcss={{
                                                width: "100%",
                                                height: "56px",
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { border: "none" },
                                                    "&:hover fieldset": { border: "none" },
                                                    "&.Mui-focused fieldset": { border: "none" },
                                                    borderBottom: "1px solid #e0e0e0",
                                                    borderRadius: 0,
                                                    "&:hover": {
                                                        borderBottom: "2px solid #E72B4A",
                                                    },
                                                    "&.Mui-focused": {
                                                        borderBottom: "2px solid #E72B4A",
                                                    },
                                                },
                                                "& .MuiInputLabel-root": {
                                                    "&.Mui-focused": {
                                                        color: "#E72B4A",
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Second Row - Last Name and DOB */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <CustomTextField
                                            id="last-name"
                                            label="Last Name"
                                            isDisabled={!isEditing}
                                            defaultValue={profileUpdate?.last_name}
                                            CustomValue={profileUpdate?.last_name}
                                            helperText=""
                                            isValid
                                            onChange={(event) => {
                                                setProfileUpdate({
                                                    ...profileUpdate,
                                                    last_name: event?.target?.value,
                                                });
                                            }}
                                            textcss={{
                                                width: "100%",
                                                height: "56px",
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { border: "none" },
                                                    "&:hover fieldset": { border: "none" },
                                                    "&.Mui-focused fieldset": { border: "none" },
                                                    borderBottom: "1px solid #e0e0e0",
                                                    borderRadius: 0,
                                                    "&:hover": {
                                                        borderBottom: "2px solid #E72B4A",
                                                    },
                                                    "&.Mui-focused": {
                                                        borderBottom: "2px solid #E72B4A",
                                                    },
                                                },
                                                "& .MuiInputLabel-root": {
                                                    "&.Mui-focused": {
                                                        color: "#E72B4A",
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={profileUpdate?.DOB ? dayjs(profileUpdate.DOB) : null}
                                                disabled={!isEditing}
                                                label="Date of Birth"
                                                sx={{ 
                                                    width: "100%",
                                                    "& .MuiOutlinedInput-root": {
                                                        "& fieldset": { border: "none" },
                                                        "&:hover fieldset": { border: "none" },
                                                        "&.Mui-focused fieldset": { border: "none" },
                                                        borderBottom: "1px solid #e0e0e0",
                                                        borderRadius: 0,
                                                        "&:hover": {
                                                            borderBottom: "2px solid #E72B4A",
                                                        },
                                                        "&.Mui-focused": {
                                                            borderBottom: "2px solid #E72B4A",
                                                        },
                                                    },
                                                    "& .MuiInputLabel-root": {
                                                        "&.Mui-focused": {
                                                            color: "#E72B4A",
                                                        },
                                                    },
                                                }}
                                                onChange={(item) => {
                                                    const formattedDate = item
                                                        ? item.format("YYYY-MM-DD")
                                                        : null;
                                                    setProfileUpdate({
                                                        ...profileUpdate,
                                                        DOB: formattedDate,
                                                    });
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>

                                {/* Third Row - Gender */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <CustomDropdown
                                            label="Gender"
                                            isDisabled={!isEditing}
                                            items={["Male", "Female", "Rather Not Say"]}
                                            activeItem={profileUpdate?.gender || "Select Gender"}
                                            handleChange={(selectedValue) => {
                                                setProfileUpdate({ ...profileUpdate, gender: selectedValue });
                                            }}
                                            dropdowncss={{
                                                width: "100%",
                                                color: isEditing ? "#000" : "#787579",
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { border: "none" },
                                                    "&:hover fieldset": { border: "none" },
                                                    "&.Mui-focused fieldset": { border: "none" },
                                                    borderBottom: "1px solid #e0e0e0",
                                                    borderRadius: 0,
                                                    height: "56px",
                                                    "&:hover": {
                                                        borderBottom: "2px solid #E72B4A",
                                                    },
                                                    "&.Mui-focused": {
                                                        borderBottom: "2px solid #E72B4A",
                                                    },
                                                },
                                                "& .MuiInputLabel-root": {
                                                    "&.Mui-focused": {
                                                        color: "#E72B4A",
                                                    },
                                                },
                                                "& .MuiSelect-select": {
                                                    padding: "16px 14px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                },
                                                "& .MuiSelect-icon": {
                                                    color: "#666",
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Action Buttons - Save when editing */}
                    {isEditing && (
                        <Box sx={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            marginTop: "32px",
                            paddingTop: "24px",
                            borderTop: "1px solid #e0e0e0"
                        }}>
                            <CustomButton
                                label={
                                    loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Save Changes"
                                    )
                                }
                                isTransaprent={false}
                                isDisabled={loading || isFetching}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "180px",
                                    height: "48px",
                                    borderRadius: "8px",
                                    fontWeight: 600,
                                    backgroundColor: "#E72B4A", // Primary brand color
                                    color: "#ffffff",
                                    "&:hover": {
                                        backgroundColor: "#c62828",
                                    },
                                    "&:disabled": {
                                        backgroundColor: "#939094", // Common color variant
                                    },
                                }}
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

// PropTypes for component documentation
Profile.propTypes = {
    // This component doesn't accept props currently, but structure is ready
};

export default Profile;
