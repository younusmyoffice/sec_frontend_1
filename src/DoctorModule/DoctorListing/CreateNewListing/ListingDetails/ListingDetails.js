/**
 * ListingDetails Component
 * 
 * Step 1 of the listing creation flow: Allows doctors to input basic listing information
 * including listing name, working days, working hours, and description.
 * 
 * Features:
 * - Form validation (all fields required)
 * - Date range picker for working days (max 4 weeks from start)
 * - Time range picker for working hours
 * - Auto-save to localStorage
 * - Navigation to next step (Add Plans) on success
 * 
 * @component
 */

import React, { useState } from "react";
import "./listingdetails.scss";
import { NavLink } from "react-router-dom";
import { Box, Typography, TextField, TextareaAutosize } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import logger from "../../../../utils/logger";
import toastService from "../../../../services/toastService";

/**
 * Helper function to calculate date after specified weeks
 * Used to set max date limit for date range picker (4 weeks from start date)
 * 
 * @param {Date} date - Start date
 * @param {number} amount - Number of weeks to add
 * @returns {Date|undefined} Date after specified weeks or undefined if no date provided
 */
function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

const ListingDetails = () => {
    const navigate = useNavigate();

    // Initialize component state - set active component in localStorage for navigation tracking
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "listingdetails");
        logger.debug("🔵 ListingDetails component initialized");
    }, []);

    // Textarea input state - tracks the "About" field input value
    const [inputValue, setInputValue] = useState("");
    
    // Typing indicator state - shows visual feedback when user is typing in textarea
    const [isTyping, setIsTyping] = useState(false);
    
    // Date range picker state - stores selected date range [startDate, endDate]
    const [value, setValue] = useState([null, null]);
    
    // Snackbar message state - stores success/error message for user feedback
    const [message, setMessage] = useState("");
    
    // Snackbar visibility state - controls whether snackbar is displayed
    const [isopen, setIsopen] = useState(false);
    
    // Form validation state - tracks if all required fields are filled
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    
    // Form data state - stores all listing details to be sent to API
    // Note: is_active: 0 means draft mode (not yet published)
    const [data, setData] = useState({
        doctor_id: localStorage.getItem('doctor_suid'), // Current doctor's ID from localStorage
        listing_name: null,                              // Name/title of the listing
        working_days_start: null,                        // Start date of working days (YYYY-MM-DD)
        working_days_end: null,                          // End date of working days (YYYY-MM-DD)
        working_time_start: null,                        // Start time of working hours (HH:mm)
        working_time_end: null,                          // End time of working hours (HH:mm)
        about: null,                                      // Description/about section content
        is_active: 0                                      // 0 = draft, 1 = active/published
    });

    /**
     * Handle textarea change event
     * Updates input value, sets typing indicator, and syncs with form data state
     * 
     * @param {Event} event - Change event from textarea
     */
    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setIsTyping(true); // Visual indicator: green border while typing
        setData({...data, about: newValue}); // Sync with form data
    };

    /**
     * Handle textarea blur event
     * Removes typing indicator when user leaves the textarea field
     */
    const handleBlur = () => {
        setIsTyping(false); // Remove visual indicator when not typing
    };

    /**
     * Submit form data to API
     * Creates a new listing and navigates to next step (Add Plans) on success
     * 
     * API Endpoint: POST /sec/createUpdatedoctorlisting/listing
     * 
     * Flow:
     * 1. Validate form data
     * 2. Send POST request with listing details
     * 3. Store listing_id in localStorage for subsequent steps
     * 4. Show success message
     * 5. Navigate to Add Plans step after 2.5 seconds
     */
    const fetchData = async () => {
        setIsopen(false); // Close any existing snackbar
        logger.debug("🔵 Submitting listing details:", data);
        
        try {
            // Send listing data to backend API
            const response = await axiosInstance.post(
                "/sec/createUpdatedoctorlisting/listing",
                JSON.stringify(data)
            );
            
            // Store listing ID in localStorage for next steps (Add Plans, Questions, Terms)
            const listingId = response?.data?.response?.docListingCreate?.doctor_list_id;
            if (listingId) {
                localStorage.setItem("listing_id", listingId);
                logger.debug("✅ Listing ID stored:", listingId);
            }
            
            const responseMessage = response?.data?.response?.message || 
                                  response?.data?.response ||
                                  "Listing created successfully";
            
            // Handle case where listing already exists
            if (responseMessage === "Listing Already Exists") {
                logger.warn("⚠️ Listing already exists");
                toastService.warn("A listing with this name already exists");
                setMessage(responseMessage);
                setIsopen(true);
            } else {
                // Success case: show message and navigate to next step
                logger.info("✅ Listing created successfully:", responseMessage);
                toastService.success(responseMessage);
                setMessage(responseMessage);
                setIsopen(true);
                
                // Navigate to Add Plans step after 2.5 seconds
                setTimeout(() => {
                    navigate("/doctorDashboard/doctorListing/addplans", { replace: true });
                }, 2500);
            }
        } catch (error) {
            logger.error("❌ Error creating listing:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            // Extract user-friendly error message
            const errorMessage = error?.response?.data?.message || 
                               error?.response?.data?.error ||
                               error?.message ||
                               "Failed to create listing. Please fill all details properly and try again.";
            
            toastService.error(errorMessage);
            setMessage(errorMessage);
            setIsopen(true);
        }
    };

    /**
     * Handle listing name input change
     * Updates form data and validates fields when listing name changes
     * 
     * @param {Event} event - Input change event
     */
    const handleInputChange = (event) => {
        const updatedData = { ...data, listing_name: event.target.value };
        setData(updatedData);
        checkFields(updatedData); // Validate all fields after update
    };

    /**
     * Handle date range picker change
     * Converts dayjs date objects to YYYY-MM-DD format for API
     * 
     * @param {Array} newValue - Array with [startDate, endDate] from dayjs DateRangePicker
     */
    const handleDateRangeChange = (newValue) => {
        logger.debug("🔵 Date range changed:", newValue);
        
        // Format dates: Convert dayjs format ($y, $M, $D) to YYYY-MM-DD
        // Note: $M is 0-indexed (0-11), so add 1 for month (1-12)
        const updatedData = {
            ...data,
            working_days_start: `${newValue[0]?.$y}-${String(newValue[0]?.$M + 1).padStart(2, '0')}-${String(newValue[0]?.$D).padStart(2, '0')}`,
            working_days_end: `${newValue[1]?.$y}-${String(newValue[1]?.$M + 1).padStart(2, '0')}-${String(newValue[1]?.$D).padStart(2, '0')}`
        };
        setData(updatedData);
        checkFields(updatedData); // Re-validate after date change
    };

    /**
     * Handle time range picker change
     * Converts time objects to HH:mm format for API
     * 
     * @param {Array} newValue - Array with [startTime, endTime] from time picker
     */
    const handleTimeRangeChange = (newValue) => {
        logger.debug("🔵 Time range changed:", newValue);
        
        // Format times: Convert to HH:mm format (24-hour format)
        // $H = hours (0-23), $m = minutes (0-59)
        const updatedData = {
            ...data,
            working_time_start: `${String(newValue[0]?.$H).padStart(2, '0')}:${String(newValue[0]?.$m).padStart(2, '0')}`,
            working_time_end: `${String(newValue[1]?.$H).padStart(2, '0')}:${String(newValue[1]?.$m).padStart(2, '0')}`,
        };
        setData(updatedData);
        checkFields(updatedData); // Re-validate after time change
    };

    /**
     * Validate if all required form fields are filled
     * Required fields:
     * - listing_name (listing name)
     * - working_days_start (start date)
     * - working_days_end (end date)
     * - working_time_start (start time)
     * - working_time_end (end time)
     * 
     * Note: "about" field is optional, not required for validation
     * 
     * @param {Object} formData - Current form data object
     */
    const checkFields = (formData) => {
        // Check if all required fields have values (truthy check)
        const isFilled = 
            formData.listing_name &&           // Listing name must be provided
            formData.working_days_start &&    // Start date must be selected
            formData.working_days_end &&      // End date must be selected
            formData.working_time_start &&    // Start time must be selected
            formData.working_time_end;        // End time must be selected

        // Update validation state (enables/disables Submit/Next buttons)
        setIsFieldsFilled(isFilled);
        
        logger.debug(isFilled ? "✅ All required fields filled" : "⚠️ Missing required fields");
    };

    return (
        <>
            {/* Success/Error notification snackbar */}
            <CustomSnackBar type={"success"} isOpen={isopen} message={message} />
            
            {/* Step navigation tabs - Shows current progress in listing creation flow */}
            <nav className="NavBar-Box-one">
                <NavLink to={"/doctorDashboard/doctorListing/listingdetails"}>
                    Listing Details
                </NavLink>
                <NavLink to={"/doctorDashboard/doctorListing/addplans"}>
                    Add Plans
                </NavLink>
                <NavLink to={"/doctorDashboard/doctorListing/addquestioner"}>
                    Add Questioner
                </NavLink>
                <NavLink to={"/doctorDashboard/doctorListing/termandcondition"}>
                    Term & Conditions
                </NavLink>
            </nav>

            <div className="main-container">
                {/* <div className="Doctor-detail">
                    <div className="doc-profile">
                        <div className="image-container">
                            <Box
                                sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                                component={"img"}
                                src={DrImage}
                            ></Box>
                        </div>
                        <div
                            className="Detail-container"
                            sx={{
                                // border:'1px solid',
                                // height:'60%',
                                marginTop: "1%",
                            }}
                        >
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "14px",
                                    fontstyle: "normal",
                                    fontweight: "500",
                                    lineheight: "22px",
                                    letterSpacing: "0.07px",
                                }}
                            >
                                Dr.Maria Garcia
                            </Typography>
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "10px",
                                    fontstyle: "normal",
                                    fontweight: "400",
                                    lineheight: "15px",
                                    letterSpacing: "0.08px",
                                    color: "grey",
                                }}
                            >
                                Neurologist
                            </Typography>
                        </div>
                    </div>
                    <div className="Edit-btn">
                        <CustomButton
                            label="Edit Profile"
                            isTransaprent={"false"}
                            buttonCss={{
                                display: "flex",
                                borderBottom: "1px",
                                borderTop: "1px",
                                borderRight: "1px",
                                borderLeft: "1px",
                                width: "122px",
                                height: "48px",
                                padding: "8px 16px",
                                justifycontent: "flex-end",
                                alignItems: "center",
                                gap: "8px",
                                flexShrink: "0",
                                color: "red",
                            }}
                        ></CustomButton>
                    </div>
                </div> */}
                <Box
                    sx={{
                        position: "relative",
                        marginTop: "2rem",
                        width: "100%",
                        display: "flex",
                        alignItems: "start",
                        flexWrap: "wrap",
                        gap: "2.5rem",
                        border: "1px solid #E72B4A",
                    }}
                >
                    {/* Form Section 1: Listing Name Input */}
                    <div
                        className="form-container"
                        style={{
                            width: "35%",
                            minWidth: "300px",
                         
                        }}
                    >
                        <Typography
                            style={{
                                fontfamily: "Poppins",
                                fontsize: "10px",
                                fontstˀyle: "normal",
                                fontweight: "500",
                                lineheight: "30px",
                                width: "max-content",
                            }}
                        >
                            Add Details
                        </Typography>
                        {/* Listing Name Input Field - Required field */}
                        <div>
                            <CustomTextField
                                helperText={""}
                                label="Listing Name"
                                defaultValue={data?.listing_name}
                                onInput={(event) => {
                                    handleInputChange(event);
                                    // Update form data with new listing name
                                    const updatedData = { ...data, listing_name: event.target.value };
                                    setData(updatedData);
                                }}
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                    flexShrink: "0",
                                }}
                            >
                                Listing name
                            </CustomTextField>
                        </div>
                    </div>

                    {/* Form Section 2: Working Days Date Range Picker */}
                    <div
                        className="form-container"
                        style={{
                            width: "50%",
                            minWidth: "300px",
                        }}
                    >
                        <Typography
                            style={{
                                fontfamily: "Poppins",
                                fontsize: "10px",
                                fontstyle: "normal",
                                fontweight: "500",
                                width: "max-content",
                                lineheight: "30px",
                            }}
                        >
                            Working Days
                        </Typography>
                        {/* Date Range Picker: Select start and end dates for working period */}
                        {/* Constraints: 
                            - disablePast: Cannot select past dates
                            - maxDate: Maximum 4 weeks from start date
                        */}
                        <div className="Date-range-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateRangePicker
                                    disablePast                              // Prevent selecting past dates
                                    value={value}                            // Current selected date range
                                    maxDate={getWeeksAfter(value[0], 4)}     // Limit: 4 weeks from start date
                                    onChange={(newValue) => {
                                        handleDateRangeChange(newValue);
                                        // Note: Date formatting is handled in handleDateRangeChange function
                                    }}
                                    renderInput={(FromProps, ToProps) => (
                                        <React.Fragment>
                                            <TextField {...FromProps} variant="standard" />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...ToProps} variant="standard" />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    {/* Form Section 3: Working Hours Time Range Picker */}
                    <div
                        className="form-container"
                        style={{
                            width: "50%",
                            minWidth: "300px",
                        }}
                    >
                        <Typography
                            style={{
                                fontfamily: "Poppins",
                                fontsize: "10px",
                                fontstyle: "normal",
                                fontweight: "500",
                                width: "max-content",
                                lineheight: "30px",
                            }}
                        >
                            Working Time
                        </Typography>
                        {/* Time Range Picker: Select start and end times for daily working hours */}
                        <div className="Time-range-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                        "MultiInputTimeRangeField",
                                        "SingleInputTimeRangeField",
                                    ]}
                                >
                                    <MultiInputTimeRangeField
                                        onChange={(newValue) => {
                                            // Format time values and update form data
                                            // newValue[0] = start time, newValue[1] = end time
                                            handleTimeRangeChange(newValue);
                                            
                                            // Update data with formatted time (HH:mm format)
                                            const updatedData = {
                                                ...data,
                                                working_time_start: `${String(newValue[0]?.$H).padStart(2, '0')}:${String(newValue[0]?.$m).padStart(2, '0')}`,
                                                working_time_end: `${String(newValue[1]?.$H).padStart(2, '0')}:${String(newValue[1]?.$m).padStart(2, '0')}`,
                                            };
                                            setData(updatedData);
                                            checkFields(updatedData); // Validate after time change
                                        }}
                                        slotProps={{
                                            textField: ({ position }) => ({
                                                label: position === "start" ? "From" : "To", // Dynamic labels
                                            }),
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </Box>
                
                {/* Form Section 4: About/Description Textarea - Optional field */}
                <div className="About">
                    <Typography
                        style={{
                            fontfamily: "Poppins",
                            fontsize: "10px",
                            fontstyle: "normal",
                            fontweight: "500",
                            lineheight: "30px",
                            width: "max-content",
                        }}
                    >
                        About
                    </Typography>
                </div>
                {/* Textarea with visual feedback: Green border appears while typing */}
                <div className="data-field">
                    <TextareaAutosize
                        minRows={5}                                                    // Minimum 5 rows visible
                        style={{ 
                            width: "100%", 
                            border: isTyping ? '2px solid green' : 'none',          // Visual feedback: green border while typing
                            padding: "1%" 
                        }}
                        value={inputValue}                                            // Controlled input value
                        onChange={handleChange}                                       // Handle text changes
                        onBlur={handleBlur}                                           // Remove typing indicator on blur
                    ></TextareaAutosize>
                </div>
                
                {/* Action Buttons Section */}
                <Box sx={{ marginTop: "1%" }}>
                    {/* Save As Draft Button: Saves listing without publishing (is_active: 0) */}
                    <CustomButton
                        buttonCss={{ 
                            width: "10.625rem", 
                            borderRadius: "6.25rem",  // Fully rounded button
                            margin: "0.5%" 
                        }}
                        label="Save As Draft"
                        isTransaprent={true}                                          // Outlined button style
                        isDisabled={!isFieldsFilled}                                  // Disabled until all required fields filled
                        handleClick={() => fetchData()}                               // Submit form data
                    />
                    
                    {/* Next Button: Creates listing and navigates to Add Plans step */}
                    <CustomButton
                        buttonCss={{ 
                            width: "10.625rem", 
                            borderRadius: "6.25rem",  // Fully rounded button
                            margin: "0.5%" 
                        }}
                        label="Next"
                        isDisabled={!isFieldsFilled}                                  // Disabled until all required fields filled
                        handleClick={() => fetchData()}                               // Submit form data and proceed
                    />
                </Box>
            </div>
        </>
    );
};

export default ListingDetails;
