import { Box, Typography, Button, Divider, Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import CustomButton from "../../../components/CustomButton";
import CustomTextField from "../../../components/CustomTextField";
import CustomDropdown from "../../../components/CustomDropdown";
import axiosInstance from "../../../config/axiosInstance";
import dayjs from "dayjs";
import CustomSnackBar from "../../../components/CustomSnackBar";
import DocProf from "../../../static/images/DrImages/doc3.png";
import "./AdminProfile.scss";
function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

const AdminProfile = () => {
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const hcf_id = localStorage.getItem("hcfadmin_suid");
    
    // Debug localStorage values
    React.useEffect(() => {
        console.log("LocalStorage values:");
        console.log("hcfadmin_suid:", localStorage.getItem("hcfadmin_suid"));
        console.log("hcfadmin_Email:", localStorage.getItem("hcfadmin_Email"));
        console.log("access_token:", localStorage.getItem("access_token"));
    }, []);
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

    useEffect(() => {
        // Define the function to fetch the profile data
        const fetchProfileData = async () => {
            try {
                console.log("Fetching profile data for hcf_id:", hcf_id);
                const response = await axiosInstance.get(`sec/hcf/getHcfprofile/${hcf_id}`);
                console.log("API Response:", response.data);
                
                // Check if response has the expected structure
                if (response.data && response.data.response && response.data.response.length > 0) {
                    const profiledata = response.data.response[0];
                    console.log("Profile data from API:", profiledata);

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
                        window.dispatchEvent(new CustomEvent('profileUpdated', { 
                            detail: { profile: profiledata.profile_picture } 
                        }));
                        localStorage.setItem("profile", profiledata.profile_picture);
                    }
                } else {
                    console.log("No profile data found in response");
                    // Set default values if no data is found
                    setProfileData((prevState) => ({
                        ...prevState,
                        hcf_name: "Apollo",
                        mobile_no: "+91 0000 000 000",
                        password: "**********",
                        email: localStorage.getItem("hcfadmin_Email") || "Apollo@hcf.com",
                    }));
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                // Set default values on error
                setProfileData((prevState) => ({
                    ...prevState,
                    hcf_name: "Apollo",
                    mobile_no: "+91 0000 000 000",
                    password: "**********",
                    email: localStorage.getItem("hcfadmin_Email") || "Apollo@hcf.com",
                }));
            }
        };

        // Call the function
        if (hcf_id) {
            fetchProfileData();
        } else {
            console.log("No hcf_id found, using default values");
            // Set default values if no hcf_id
            setProfileData((prevState) => ({
                ...prevState,
                hcf_name: "Apollo",
                mobile_no: "+91 0000 000 000",
                password: "**********",
                email: localStorage.getItem("hcfadmin_Email") || "Apollo@hcf.com",
            }));
        }
    }, [hcf_id]);

    const fetchData = async () => {
        console.log("Entered the fetch data");
        try {
            // Prepare the data for API call
            const updateData = {
                hcf_id: parseInt(hcf_id),
                role_id: profiledata.role_id,
                first_name: profiledata.first_name || profiledata.hcf_name,
                last_name: profiledata.last_name || "",
                middle_name: profiledata.middle_name || "",
                country_id: profiledata.country_id || "",
                state_id: profiledata.state_id || "",
                city_id: profiledata.city_id || "",
                category_id: profiledata.category_id || 1,
                hcf_name: profiledata.hcf_name,
                reg_no: profiledata.reg_no || "",
                service_time_from: profiledata.service_time_from || "",
                service_time_to: profiledata.service_time_to || "",
                service_day_from: profiledata.service_day_from || "",
                service_day_to: profiledata.service_day_to || "",
                service_offer: profiledata.service_offer || "",
                state_reg_no: profiledata.state_reg_no,
                indian_reg_no: profiledata.indian_reg_no,
                state_reg_date: profiledata.state_reg_date,
                indian_reg_date: profiledata.indian_reg_date,
                diag_state_reg_no: profiledata.diag_state_reg_no,
                diag_indian_reg_no: profiledata.diag_indian_reg_no,
                diag_state_reg_date: profiledata.diag_state_reg_date,
                diag_indian_reg_date: profiledata.diag_indian_reg_date,
                profile_picture: profiledata.profile_picture
            };

            console.log("Sending data to API:", updateData);

            const response = await axiosInstance.post(
                `sec/hcf/updateHcfprofile?hcf_id=${hcf_id}`,
                JSON.stringify(updateData),
                { 
                    Accept: "Application/json",
                    "Content-Type": "application/json"
                },
            );
            console.log("API Response:", response);
            setSnackMessage("Profile Updated Successfully");
            setSnackType("success");
            setSnackOpen(true);
            setIsEditing(false); // Exit edit mode after successful update
            
            // Dispatch profile update event for navbar if profile picture was updated
            if (profiledata.profile_picture) {
                window.dispatchEvent(new CustomEvent('profileUpdated', { 
                    detail: { profile: profiledata.profile_picture } 
                }));
                localStorage.setItem("profile", profiledata.profile_picture);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setSnackMessage("Error during updating profile");
            setSnackType("error");
            setSnackOpen(true);
            console.log(error.response);
        }
    };
    console.log("Current profiledata state:", profiledata);

    React.useEffect(() => {
        localStorage.setItem("activeComponent", "profile");
        localStorage.setItem("path", "adminprofile");
    }, []);
    console.log("i am here ", profiledata?.first_name);
    const [profileImage, setProfileImage] = useState(DocProf);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(",")[1]; // Extract base64 without metadata
                const previewUrl = URL.createObjectURL(file); // For preview
                setProfileImage(previewUrl);
                
                // Store the full data URL (including metadata) for API
                const fullDataUrl = reader.result;
                
                setProfileData((prevData) => ({
                    ...prevData,
                    profile_picture: fullDataUrl, // Store full data URL for API
                }));
                
                // Dispatch custom event to notify navbar of profile update
                window.dispatchEvent(new CustomEvent('profileUpdated', { 
                    detail: { profile: fullDataUrl } 
                }));
                
                // Also update localStorage for immediate reflection
                localStorage.setItem("profile", fullDataUrl);
            };
            reader.readAsDataURL(file); // Trigger the file reading process
        }
    };
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
    return (
        <Box sx={{ 
            minHeight: "100vh", 
            backgroundColor: "#ffffff", 
            padding: "24px",
            fontFamily: "Poppins, sans-serif"
        }}>
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

            {/* Edit Profile Button */}
            <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1,
                marginBottom: "32px"
            }}>
                <EditIcon sx={{ color: "#E72B4A", fontSize: "20px" }} />
                <Typography sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#E72B4A",
                    cursor: "pointer"
                }} onClick={toggleEditMode}>
                    Edit Profile
                </Typography>
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
                        <BusinessIcon sx={{ fontSize: "48px", color: "#1976d2" }} />
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
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
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
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
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
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
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
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
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
                <Typography sx={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#313033",
                    marginBottom: "24px",
                    fontFamily: "Poppins, sans-serif"
                }}>
                    Registration Details
                </Typography>
                
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
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
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
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                        }}
                    />
                </Box>
                
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "24px"
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Registration Date"
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
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                        "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Registration Date"
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
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                        "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>

            {/* Diagnostic Center Details Section */}
            <Box sx={{ marginBottom: "48px" }}>
                <Typography sx={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#313033",
                    marginBottom: "24px",
                    fontFamily: "Poppins, sans-serif"
                }}>
                    Diagnostic Center Details
                </Typography>
                
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
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
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
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                        }}
                    />
                </Box>
                
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "24px"
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Registration Date"
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
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                        "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Registration Date"
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
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                        "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>

            {/* Save Changes Button */}
            {isEditing && (
                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "center",
                    marginTop: "48px"
                }}>
                    <CustomButton
                        label="Save Changes"
                        handleClick={() => fetchData()}
                        buttonCss={{
                            backgroundColor: "#E72B4A",
                            color: "white",
                            padding: "12px 48px",
                            fontSize: "16px",
                            fontWeight: "500",
                            borderRadius: "8px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#d32f2f"
                            }
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AdminProfile;
