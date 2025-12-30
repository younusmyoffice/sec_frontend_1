/**
 * DoctorListingDetails Component
 * 
 * Create/Edit listing details with consistent design pattern:
 * - Uses StepHeader for navigation tabs
 * - Uses SectionCard for content sections
 * - Consistent button styling
 * - Same layout pattern as other listing tabs
 * 
 * @component
 */

import React, { useState, useEffect } from "react";
import { Box, Typography, TextareaAutosize, Skeleton, TextField, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./DoctorListingDetails.scss";

// Reusable Components
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomTimePicker from "../../../components/CustomTimePicker";
import CustomSnackBar from "../../../components/CustomSnackBar";
import StepHeader from "../shared/StepHeader";
import DoctorProfileCard from "../../../components/DoctorProfileCard/DoctorProfileCard";

// API
import axiosInstance from "../../../config/axiosInstance";
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";
const DoctorListingDetails = () => {
    const navigate = useNavigate();

    // State management
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoadingListing, setIsLoadingListing] = useState(false);
    const [doctorProfile, setDoctorProfile] = useState({
        name: "",
        specialty: "",
        profileImage: null
    });

    // Form data
    const [data, setData] = useState({
        doctor_id: localStorage.getItem('doctor_suid'),
        listing_name: "",
        working_days_start: null,
        working_days_end: null,
        working_time_start: null,
        working_time_end: null,
        about: "",
        is_active: 0
    });


    // Fetch doctor profile information
    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const doctorId = localStorage.getItem("doctor_suid");
                if (doctorId) {
                    const response = await axiosInstance.get(
                        `sec/Doctor/doctorProfileDetailsbyId?doctor_id=${doctorId}`
                    );
                    const profileData = response?.data?.response?.[0];
                    if (profileData) {
                        const fullName = `Dr. ${profileData.first_name || ""} ${profileData.middle_name || ""} ${profileData.last_name || ""}`.trim();
                        setDoctorProfile({
                            name: fullName || "Dr. Unknown",
                            specialty: profileData.department_name || profileData.speciality_name || "General Practitioner",
                            profileImage: profileData.profile_picture || null
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching doctor profile:", error);
                // Set default values
                const doctorName = localStorage.getItem("doctor_name") || localStorage.getItem("userName");
                setDoctorProfile({
                    name: doctorName ? `Dr. ${doctorName}` : "Dr. Unknown",
                    specialty: "General Practitioner",
                    profileImage: null
                });
            }
        };
        fetchDoctorProfile();
    }, []);

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "listingdetails");

        // Check if we're editing an existing listing
        const editingListingId = localStorage.getItem("editing_listing_id");
        if (editingListingId) {
            setIsEditing(true);
            // Load existing listing data for editing
            loadExistingListing(editingListingId);
        } else {
            // Clear any stale editing state when creating new
            setIsEditing(false);
            setIsLoadingListing(false);
        }
    }, []);

    /**
     * Debug effect to monitor data changes
     * NOTE: Remove this in production or replace with logger.debug
     */
    useEffect(() => {
        console.log("Data state changed:", data);
        console.log("Listing name in state:", data.listing_name);
    }, [data]);

    /**
     * Handle textarea input changes for "About" section
     * Updates both inputValue (for display) and data.about (for form state)
     * Sets isTyping flag to true for visual feedback
     * 
     * @param {Event} event - Input change event
     */
    const handleTextAreaChange = (event) => {
        setInputValue(event.target.value);
        setIsTyping(true); // Visual indicator that user is typing
        setData({ ...data, about: event.target.value });
    };

    /**
     * Handle textarea blur event
     * Resets typing indicator when user leaves the field
     */
    const handleTextAreaBlur = () => {
        setIsTyping(false);
    };

    /**
     * Handle listing name input changes
     * Updates form data and validates field completion
     * 
     * @param {Event} event - Input change event
     */
    const handleInputChange = (event) => {
        const updatedData = { ...data, listing_name: event.target.value };
        setData(updatedData);
        checkFields(updatedData); // Validate immediately on change
    };

    /**
     * Handle date picker changes for working days
     * Converts Date object to ISO date string (YYYY-MM-DD format) for API compatibility
     * 
     * @param {string} field - Field name ('working_days_start' or 'working_days_end')
     * @param {Date|null} newValue - Selected date or null if cleared
     */
    const handleDateChange = (field, newValue) => {
        const updatedData = {
            ...data,
            [field]: newValue ? newValue.toISOString().split('T')[0] : null // Convert to YYYY-MM-DD format
        };
        setData(updatedData);
        checkFields(updatedData);
    };

    /**
     * Handle time picker changes for working hours
     * Converts Date object to HH:MM:SS time string for API compatibility
     * 
     * @param {string} field - Field name ('working_time_start' or 'working_time_end')
     * @param {Date|null} newValue - Selected time or null if cleared
     */
    const handleTimeChange = (field, newValue) => {
        // Convert Date object to HH:MM:SS format
        const timeString = newValue ?
            `${newValue.getHours().toString().padStart(2, '0')}:${newValue.getMinutes().toString().padStart(2, '0')}:00` :
            null;

        const updatedData = {
            ...data,
            [field]: timeString
        };
        setData(updatedData);
        checkFields(updatedData);
    };

    /**
     * Validate if all required fields are filled
     * Required fields: listing_name, working_days_start, working_days_end, 
     *                  working_time_start, working_time_end
     * Updates isFieldsFilled state to enable/disable submit button
     * 
     * @param {Object} formData - Form data object to validate
     */
    const checkFields = (formData) => {
        const isFilled =
            formData.listing_name &&
            formData.working_days_start &&
            formData.working_days_end &&
            formData.working_time_start &&
            formData.working_time_end;

        setIsFieldsFilled(isFilled);
    };

    // Load existing listing data for editing
    const loadExistingListing = async (listingId) => {
        setIsLoadingListing(true);
        try {
            logger.debug("🔵 Loading listing for editing:", listingId);
            const response = await axiosInstance.get(`/sec/doctor/DocListingPlanByDoctorListingId/${listingId}`);

            logger.debug("✅ API Response received");

            if (response.data?.response?.DocListingPlan && response.data.response.DocListingPlan.length > 0) {
                const listingData = response.data.response.DocListingPlan[0]; // Get first item from array
                logger.debug("✅ Loaded listing data:", listingData);

                // Convert date strings to proper format for date pickers
                const formatDate = (dateString) => {
                    if (!dateString) return null;
                    const date = new Date(dateString);
                    return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
                };

                // Keep time as strings for database compatibility
                const formatTimeForDisplay = (timeString) => {
                    if (!timeString) return null;
                    const [hours, minutes] = timeString.split(':');
                    const date = new Date();
                    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                    return date;
                };

                // Update form data with existing listing data
                const updatedData = {
                    ...data,
                    listing_name: listingData.listing_name || "",
                    working_days_start: formatDate(listingData.working_days_start),
                    working_days_end: formatDate(listingData.working_days_end),
                    working_time_start: listingData.working_time_start || null, // Keep as string
                    working_time_end: listingData.working_time_end || null, // Keep as string
                    about: listingData.about || ""
                };

                setData(updatedData);

                // Update textarea value
                setInputValue(listingData.about || "");

                // Check if all fields are filled for validation
                checkFields(updatedData);

                logger.debug("✅ Form data updated successfully");
            } else {
                logger.warn("⚠️ No listing data found in response");
                const errorMessage = "No listing data found. Please try again.";
                toastService.error(errorMessage);
                setMessage(errorMessage);
                setIsOpen(true);
            }
        } catch (error) {
            logger.error("❌ Error loading existing listing:", error);
            logger.error("❌ Error response:", error?.response?.data);
            const errorMessage = error?.response?.data?.message ||
                "Error loading listing data. Please try again.";
            toastService.error(errorMessage);
            setMessage(errorMessage);
            setIsOpen(true);
        } finally {
            setIsLoadingListing(false);
        }
    };

    // API calls
    const fetchData = async () => {
        setIsOpen(false);
        try {
            const editingListingId = localStorage.getItem("editing_listing_id");

            // Prepare payload with doctor_list_id for updates
            const payload = {
                ...data,
                doctor_id: parseInt(data.doctor_id),
                ...(editingListingId && { doctor_list_id: parseInt(editingListingId) })
            };

            logger.debug("📤 Sending payload to API:", payload);
            logger.debug("📤 API endpoint: /sec/createUpdatedoctorlisting/listing");

            // Use the same endpoint for both create and update
            const response = await axiosInstance.post(
                "/sec/createUpdatedoctorlisting/listing",
                payload
            );

            if (editingListingId) {
                const successMessage = "Listing updated successfully!";
                logger.info("✅ Listing updated:", successMessage);
                toastService.success(successMessage);
                setMessage(successMessage);
                // Keep the editing_listing_id for continuing to next tabs
                // localStorage.removeItem("editing_listing_id"); // Don't remove yet
                // For editing, also go to next tab (Add Plans) to continue the flow
                setIsOpen(true);
                setTimeout(() => {
                    navigate("/doctorDashboard/doctorListing/addplans", { replace: true });
                }, 1500);
            } else {
                localStorage.setItem("listing_id", response?.data?.response?.docListingCreate?.doctor_list_id);
                const successMessage = response?.data?.response?.message || "Listing created successfully!";
                logger.info("✅ Listing created:", successMessage);
                toastService.success(successMessage);
                setMessage(successMessage);
                // For creating new, go to next tab (Add Plans)
                setIsOpen(true);
                setTimeout(() => {
                    navigate("/doctorDashboard/doctorListing/addplans", { replace: true });
                }, 1500);
            }
        } catch (error) {
            logger.error("❌ Error saving listing:", error);
            logger.error("❌ Error response:", error?.response?.data);

            const errorMessage = error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Error saving listing. Please try again.";

            toastService.error(errorMessage);
            setMessage(errorMessage);
            setIsOpen(true);
        }
    };

    // Save as draft handler
    const handleSaveAsDraft = async () => {
        setIsOpen(false);
        try {
            const editingListingId = localStorage.getItem("editing_listing_id");

            // Prepare payload with doctor_list_id for updates
            const payload = {
                ...data,
                doctor_id: parseInt(data.doctor_id),
                is_active: 0, // Set as draft
                ...(editingListingId && { doctor_list_id: parseInt(editingListingId) })
            };

            // Use the same endpoint for both create and update
            const response = await axiosInstance.post(
                "/sec/createUpdatedoctorlisting/listing",
                payload
            );

            if (editingListingId) {
                const successMessage = "Draft updated successfully!";
                logger.info("✅ Draft updated:", successMessage);
                toastService.success(successMessage);
                setMessage(successMessage);
                // For editing, go back to active listing when saving as draft
                localStorage.removeItem("editing_listing_id");
                setIsOpen(true);
                setTimeout(() => {
                    navigate("/doctorDashboard/doctorListing/doctoractiveListing", { replace: true });
                }, 2500);
            } else {
                localStorage.setItem("listing_id", response?.data?.response?.docListingCreate?.doctor_list_id);
                const successMessage = "Draft saved successfully!";
                logger.info("✅ Draft saved:", successMessage);
                toastService.success(successMessage);
                setMessage(successMessage);
                // For creating new, also go back to active listing when saving as draft
                setIsOpen(true);
                setTimeout(() => {
                    navigate("/doctorDashboard/doctorListing/doctoractiveListing", { replace: true });
                }, 2500);
            }
        } catch (error) {
            logger.error("❌ Error saving draft:", error);
            logger.error("❌ Error response:", error?.response?.data);
            const errorMessage = error?.response?.data?.message ||
                "Error saving draft. Please try again.";
            toastService.error(errorMessage);
            setMessage(errorMessage);
            setIsOpen(true);
        }
    };


    return (
        <>
            <CustomSnackBar
                type="success"
                isOpen={isOpen}
                message={message}
            />

            <div className="listing-details-container">
                {/* Header Section */}
                <Box className="listing-header">
                    <Typography variant="h4" className="listing-title">
                        Create New Listing
                    </Typography>
                    <IconButton
                        onClick={() => navigate("/doctorDashboard/doctorListing/doctoractiveListing")}
                        sx={{
                            width: "40px",
                            height: "40px",
                            border: "1px solid #E6E1E5",
                            color: "#313033",
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                            }
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                </Box>

                {/* Step Navigation Tabs */}
                <StepHeader />

                {/* Doctor Profile Card */}
                <Box sx={{ mb: 3 }}>
                    <DoctorProfileCard
                        name={doctorProfile.name}
                        specialty={doctorProfile.specialty}
                        profileImage={doctorProfile.profileImage}
                        variant="compact"
                        onEditClick={() => navigate("/doctorDashboard/doctorPersonalInfo")}
                        showEditButton={true}
                    />
                </Box>

                {/* Main Form Section */}
                {/* LOADER: Show skeleton loaders while fetching existing listing data for editing */}
                {isLoadingListing ? (
                    <Box sx={{ textAlign: "center", padding: "40px" }}>
                        <Typography variant="h6" sx={{ marginBottom: "16px", fontFamily: "poppins" }}>
                            Loading listing data...
                        </Typography>
                        {/* Skeleton loaders for form fields */}
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                            <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: "8px" }} />
                            <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: "8px" }} />
                        </Box>
                    </Box>
                ) : (
                    <Box className="listing-form">
                        {/* Add Details Section */}
                        <Box className="form-section">
                            <Typography variant="h6" className="section-heading">
                                Add Details
                                <div className="form-group">

<Typography variant="body2" className="field-label">
    Listing Name
</Typography>
<TextField
    value={data.listing_name || ""}
    onChange={handleInputChange}
    variant="standard"
    fullWidth
    placeholder="Enter listing name"
    sx={{
        fontFamily: "poppins",
        "& .MuiInput-underline:before": {
            borderBottomColor: "#e0e0e0",
        },
        "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#E72B4A",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#E72B4A",
        },
    }}
/>
</div>
                            </Typography>
                           
                        </Box>

                        {/* Working Days Section */}
                        <Box className="form-section">
                            <Typography variant="h6" className="section-heading">
                                Working Days
                            </Typography>
                            <div className="date-time-row">
                                <div className="form-group half-width">
                                    <Typography variant="body2" className="field-label">
                                        From
                                    </Typography>
                                    {/* CustomDatePicker already includes LocalizationProvider internally */}
                                    <CustomDatePicker
                                        value={data.working_days_start ? new Date(data.working_days_start) : null}
                                        onChange={(value) => handleDateChange('working_days_start', value)}
                                        textcss={{ width: "100%" }}
                                    />
                                </div>
                                <div className="form-group half-width">
                                    <Typography variant="body2" className="field-label">
                                        To
                                    </Typography>
                                    {/* CustomDatePicker already includes LocalizationProvider internally */}
                                    <CustomDatePicker
                                        value={data.working_days_end ? new Date(data.working_days_end) : null}
                                        onChange={(value) => handleDateChange('working_days_end', value)}
                                        textcss={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                        </Box>

                        {/* Working Time Section */}
                        <Box className="form-section">
                            <Typography variant="h6" className="section-heading">
                                Working Time
                            </Typography>
                            <div className="date-time-row">
                                <div className="form-group half-width">
                                    <Typography variant="body2" className="field-label">
                                        From
                                    </Typography>
                                    {/* Use CustomTimePicker instead of DatePicker for time selection */}
                                    <CustomTimePicker
                                        value={data.working_time_start ?
                                            (() => {
                                                const [hours, minutes] = data.working_time_start.split(':');
                                                const date = new Date();
                                                date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                                                return date;
                                            })() : null}
                                        onChange={(value) => handleTimeChange('working_time_start', value)}
                                        textcss={{ width: "100%" }}
                                    />
                                </div>
                                <div className="form-group half-width">
                                    <Typography variant="body2" className="field-label">
                                        To
                                    </Typography>
                                    <CustomTimePicker
                                        value={data.working_time_end ?
                                            (() => {
                                                const [hours, minutes] = data.working_time_end.split(':');
                                                const date = new Date();
                                                date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                                                return date;
                                            })() : null}
                                        onChange={(value) => handleTimeChange('working_time_end', value)}
                                        textcss={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                        </Box>

                        {/* About Section */}
                        <Box className="form-section">
                            <Typography variant="h6" className="section-heading">
                                About
                            
                            <TextareaAutosize
                                minRows={8}
                                maxRows={8}
                                className={`about-textarea ${isTyping ? 'typing' : ''}`}
                                value={inputValue}
                                onChange={handleTextAreaChange}
                                onBlur={handleTextAreaBlur}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus quis sapien interdum commodo. Nunc tincidunt justo non dolor bibendum, vitae elementum elit tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi maximus, nisl vel varius bibendum, libero metus ultricies est,"
                            /></Typography>
                        </Box>
                    </Box>
                )}

                {/* Action Buttons - Aligned to right */}
                <Box className="action-buttons">
                    <CustomButton
                        label="Save As Draft"
                        isTransaprent={true}
                        isDisabled={!isFieldsFilled}
                        buttonCss={{
                            width: "10.625rem",
                            borderRadius: "6.25rem",
                            marginLeft: "0.5rem",
                            fontFamily: "poppins",
                            border: "1px solid #E72B4A",
                            color: "#E72B4A",
                        }}
                        handleClick={handleSaveAsDraft}
                    />
                    <CustomButton
                        label={isEditing ? "Update" : "Next"}
                        isDisabled={!isFieldsFilled}
                        buttonCss={{
                            width: "10.625rem",
                            borderRadius: "6.25rem",
                            marginLeft: "0.5rem",
                            fontFamily: "poppins",
                            backgroundColor: "#E72B4A",
                            color: "#ffffff",
                        }}
                        handleClick={fetchData}
                    />
                </Box>
            </div>
        </>
    );
};

export default DoctorListingDetails;
