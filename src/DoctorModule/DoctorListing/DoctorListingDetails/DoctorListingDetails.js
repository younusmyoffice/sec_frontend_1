import React, { useState, useEffect } from "react";
import { Box, Typography, TextareaAutosize, IconButton, Skeleton, TextField } from "@mui/material";
import { Close as CloseIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./DoctorListingDetails.scss";

// Reusable Components
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomTimePicker from "../../../components/CustomTimePicker";
import CustomSnackBar from "../../../components/CustomSnackBar";
import DoctorProfileCard from "../../../components/DoctorProfileCard";
import ListingTabs from "../../../components/ListingTabs";

// API
import axiosInstance from "../../../config/axiosInstance";

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

    // Doctor profile data (mock data - replace with actual API call)
    const [doctorProfile, setDoctorProfile] = useState({
        name: "Dr. Maria Garcia",
        specialty: "Neurologist",
        profileImage: "/path/to/profile-image.jpg" // Replace with actual image path
    });

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "listingdetails");
        
        // Check if we're editing an existing listing
        const editingListingId = localStorage.getItem("editing_listing_id");
        if (editingListingId) {
            setIsEditing(true);
            // Load existing listing data for editing
            loadExistingListing(editingListingId);
        }
    }, []);

    // Debug effect to monitor data changes
    useEffect(() => {
        console.log("Data state changed:", data);
        console.log("Listing name in state:", data.listing_name);
    }, [data]);

    // Text area handlers
    const handleTextAreaChange = (event) => {
        setInputValue(event.target.value);
        setIsTyping(true);
        setData({...data, about: event.target.value});
    };

    const handleTextAreaBlur = () => {
        setIsTyping(false);
    };

    // Form field handlers
    const handleInputChange = (event) => {
        const updatedData = { ...data, listing_name: event.target.value };
        setData(updatedData);
        checkFields(updatedData);
    };

    const handleDateChange = (field, newValue) => {
        const updatedData = {
            ...data,
            [field]: newValue ? newValue.toISOString().split('T')[0] : null
        };
        setData(updatedData);
        checkFields(updatedData);
    };

    const handleTimeChange = (field, newValue) => {
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

    // Validation
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
            console.log("Loading listing for editing:", listingId);
            const response = await axiosInstance.get(`/sec/doctor/DocListingPlanByDoctorListingId/${listingId}`);
            
            console.log("API Response:", response.data);
            
            if (response.data?.response?.DocListingPlan && response.data.response.DocListingPlan.length > 0) {
                const listingData = response.data.response.DocListingPlan[0]; // Get first item from array
                console.log("Loaded listing data:", listingData);
                
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
                
                console.log("Form data updated:", updatedData);
                console.log("Listing name specifically:", updatedData.listing_name);
            } else {
                console.error("No listing data found in response");
                setMessage("No listing data found. Please try again.");
                setIsOpen(true);
            }
        } catch (error) {
            console.error("Error loading existing listing:", error);
            setMessage("Error loading listing data. Please try again.");
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

            console.log("Sending payload to API:", payload);
            console.log("API endpoint: /sec/createUpdatedoctorlisting/listing");
            console.log("Time values being sent:", {
                working_time_start: payload.working_time_start,
                working_time_end: payload.working_time_end
            });

            // Use the same endpoint for both create and update
            const response = await axiosInstance.post(
                "/sec/createUpdatedoctorlisting/listing",
                payload
            );
            
            if (editingListingId) {
                setMessage("Listing updated successfully!");
                localStorage.removeItem("editing_listing_id");
            } else {
                localStorage.setItem("listing_id", response?.data?.response?.docListingCreate?.doctor_list_id);
                setMessage(response?.data?.response?.message);
            }
            
            setIsOpen(true);
            setTimeout(() => {
                navigate("/doctordashboard/doctorListing/doctoractiveListing", { replace: true });
            }, 2500);
        } catch (error) {
            console.error("Error saving listing:", error);
            console.error("Error response:", error.response);
            
            let errorMessage = "Error saving listing. Please try again.";
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            setMessage(errorMessage);
            setIsOpen(true);
        }
    };

    // Navigation handlers
    const handleClose = () => {
        navigate("/doctordashboard/doctorListing/doctoractiveListing");
    };

    const handleEditProfile = () => {
        navigate("/doctordashboard/doctorpersonalinfo");
    };

    // Tab configuration
    const tabs = [
        { label: "Listing Details", path: "/doctordashboard/doctorListing/listingdetails", active: true },
        { label: "Add Plan", path: "/doctordashboard/doctorListing/addplans", active: false },
        { label: "Add Questioner", path: "/doctordashboard/doctorListing/addquestioner", active: false },
        { label: "Term & Conditions", path: "/doctordashboard/doctorListing/termandcondition", active: false }
    ];

    return (
        <>
            <CustomSnackBar 
                type="success" 
                isOpen={isOpen} 
                message={message} 
            />
            
            <div className="doctor-listing-details">
                {/* Header */}
                <div className="listing-header">
                    <Typography variant="h4" className="page-title">
                        {isEditing ? "Edit Listing" : "Create New Listing"}
                    </Typography>
                    <IconButton 
                        onClick={handleClose}
                        className="close-button"
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>

                {/* Navigation Tabs */}
                <ListingTabs tabs={tabs} />

                {/* Doctor Profile Card */}
                <DoctorProfileCard
                    name={doctorProfile.name}
                    specialty={doctorProfile.specialty}
                    profileImage={doctorProfile.profileImage}
                    onEditClick={handleEditProfile}
                />

                {/* Form Section */}
                <div className="form-section">
                    {isLoadingListing ? (
                        <Box sx={{ textAlign: "center", padding: "40px" }}>
                            <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                                Loading listing data...
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Skeleton variant="rectangular" width="100%" height={200} />
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <Box className="form-grid">
                        {/* Add Details */}
                        <div className="form-group">
                            <Typography variant="h6" className="form-label">
                                Add Details
                            </Typography>
                            <TextField
                                label="Listing Name"
                                value={data.listing_name || ""}
                                onChange={handleInputChange}
                                variant="standard"
                                fullWidth
                                placeholder="Enter listing name"
                                sx={{
                                    width: "100%",
                                    height: "56px",
                                    marginBottom: "1.5rem"
                                }}
                            />
                        </div>

                        {/* Working Days */}
                        <div className="form-group">
                            <Typography variant="h6" className="form-label">
                                Working Days
                            </Typography>
                            <div className="date-range-container">
                                <CustomDatePicker
                                    label="From"
                                    value={data.working_days_start ? new Date(data.working_days_start) : null}
                                    onChange={(value) => handleDateChange('working_days_start', value)}
                                    textcss={{ width: "100%" }}
                                />
                                <CustomDatePicker
                                    label="To"
                                    value={data.working_days_end ? new Date(data.working_days_end) : null}
                                    onChange={(value) => handleDateChange('working_days_end', value)}
                                    textcss={{ width: "100%" }}
                                />
                            </div>
                        </div>

                        {/* Working Time */}
                        <div className="form-group">
                            <Typography variant="h6" className="form-label">
                                Working Time
                            </Typography>
                            <div className="time-range-container">
                                <CustomTimePicker
                                    label="From"
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
                                <CustomTimePicker
                                    label="To"
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
                        <div className="about-section">
                            <Typography variant="h6" className="form-label">
                                About
                            </Typography>
                            <TextareaAutosize
                                minRows={5}
                                className={`about-textarea ${isTyping ? 'typing' : ''}`}
                                value={inputValue}
                                onChange={handleTextAreaChange}
                                onBlur={handleTextAreaBlur}
                                placeholder="Tell us about your practice, experience, and what makes you unique..."
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <CustomButton
                                label="Save As Draft"
                                isTransparent={true}
                                isDisabled={!isFieldsFilled}
                                buttonCss={{
                                    width: "170px",
                                    borderRadius: "100px",
                                    marginRight: "16px"
                                }}
                                handleClick={fetchData}
                            />
                            <CustomButton
                                label={isEditing ? "Update Listing" : "Next"}
                                isDisabled={!isFieldsFilled}
                                buttonCss={{
                                    width: "170px",
                                    borderRadius: "100px"
                                }}
                                handleClick={fetchData}
                            />
                        </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DoctorListingDetails;
