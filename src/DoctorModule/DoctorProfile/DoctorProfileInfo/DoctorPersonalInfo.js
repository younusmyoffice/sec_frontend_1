import { 
    Box, 
    Typography, 
    Button, 
    Divider, 
    Card, 
    CardContent, 
    Grid, 
    Stack, 
    Chip, 
    Paper, 
    IconButton, 
    Tooltip, 
    Avatar 
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import "./doctorprofileinfo.scss";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WorkIcon from "@mui/icons-material/Work";
import axios from "axios";
import CustomList from "../../../components/CustomList";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomDatePicker from "../../../components/CustomDatePicker";
import DocProf from "../../../static/images/DrImages/Image02.png";
import { baseURL } from "../../../constants/const";
import axiosInstance from "../../../config/axiosInstance";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import CustomSnackBar from "../../../components/CustomSnackBar";
import { Description } from "@mui/icons-material";
import { processProfileImage } from "../../../utils/imageUtils";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DoctorPersonalInfo = () => {
    const [selectedCountryFromDropDown, setSelectedCountryFromDropDown] = useState([]);
    const [countryValues, setCountryValue] = useState([]);
    const [countryNames, setCountryNames] = useState(["Please Wait"]);
    const [stateNames, setStateNames] = useState(["Please Wait"]);
    const [stateName, setStateName] = useState("");
    const [stateValue, setStateValue] = useState([]);
    const [selectCityFromDropDown, setSelectCityFromDropDown] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [citySelected, setCitySelected] = useState("");
    const [cityValues, setCityValues] = useState([]);
    const [snackBar, setSnackBar] = useState({ open: false, message: "", severity: "success" });
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(DocProf);
    const [activeDropdown, setActiveDropdown] = useState("");
    const dropdownItems = ["Male", "Female", "Others"];
    const [data, setData] = useState({
        suid: localStorage.getItem("doctor_suid"),
        email: localStorage.getItem("email"),
        first_name: "",
        last_name: "",
        middle_name: "",
        gender: "",
        DOB: "",
        street_address1: "",
        street_address2: "",
        zip_code: "",
        country_id: "",
        city_id: "",
        state_id: "",
        profile_picture: "",
        hospital_org: "",
        council_name: "",
        description: "",
    });

    const doctor_id = localStorage.getItem("doctor_suid");

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleDropdownChange = (item, dropdownName) => {
        console.log("Selected item:", item);

        switch (dropdownName) {
            case "dropdown1": // Gender dropdown
                setActiveDropdown(item);
                break;

            default:
                break;
        }

        // Update the data object
        const updatedData = {
            ...data,
            gender: dropdownName === "dropdown1" ? item : data.gender,
            country_id: dropdownName === "dropdown2" ? item : data.country_id,
        };
        setData(updatedData);
    };

    const fetchDataProfile = async () => {
        try {
            const response = await axiosInstance.get(
                `sec/Doctor/doctorProfileDetailsbyId?doctor_id=${doctor_id}`,
            );
            console.log("Doctor Profile Details : ", response?.data);
            const profileData = response?.data?.response[0];

            console.log("Profile Data: ", profileData.first_name);
            setData((prevData) => ({
                ...prevData,
                first_name: profileData.first_name || "",
                last_name: profileData.last_name || "",
                middle_name: profileData.middle_name || "",
                gender: profileData.gender || "",
                DOB: profileData.DOB || "",
                street_address1: profileData.street_address1 || "",
                street_address2: profileData.street_address2 || "",
                zip_code: profileData.zip_code || "",
                country_id: profileData.country_id || "",
                city_id: profileData.city_id || "",
                state_id: profileData.state_id || "",
                profile_picture: profileData.profile_picture || "",
                hospital_org: profileData.hospital_org || "",
                council_name: profileData.council_name || "",
                description: profileData.description || "",
            }));

            // Process profile image
            if (profileData?.profile_picture) {
                const processedImage = await processProfileImage(profileData.profile_picture, DocProf);
                if (processedImage && processedImage !== DocProf) {
                    setProfileImage(processedImage);
                    // Dispatch event for navbar update
                    window.dispatchEvent(new CustomEvent('profileUpdated', {
                        detail: { profile: processedImage }
                    }));
                }
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        fetchDataProfile();
        FetchCountryNames();
    }, []);

    // Update profile image when data.profile_picture changes
    useEffect(() => {
        if (data?.profile_picture) {
            if (data.profile_picture.startsWith('data:image/')) {
                setProfileImage(data.profile_picture);
            } else if (data.profile_picture.startsWith('http')) {
                setProfileImage(data.profile_picture);
            } else if (!data.profile_picture.startsWith('dev-uploads/')) {
                setProfileImage(`data:image/jpeg;base64,${data.profile_picture}`);
            }
        }
    }, [data?.profile_picture]);

    console.log(data);
    const fetchData = async () => {
        console.log("Entered the fetch data");
        console.log("Data being sent:", data);
        try {
            const response = await axiosInstance.post(
                `/sec/Doctor/updatedoctorprofile`,
                JSON.stringify(data),
            );
            setSnackBar({
                open: true,
                message: "Profile updated successfully!",
                severity: "success",
            });
            
            // Refresh profile data after successful update
            await fetchDataProfile();
            
            // Dispatch event for navbar update if profile picture was updated
            if (data.profile_picture) {
                const updatedProfilePic = await processProfileImage(data.profile_picture, DocProf);
                if (updatedProfilePic && updatedProfilePic !== DocProf) {
                    localStorage.setItem("profile", updatedProfilePic);
                    window.dispatchEvent(new CustomEvent('profileUpdated', {
                        detail: { profile: updatedProfilePic }
                    }));
                }
            }
        } catch (error) {
            console.error(error.response);
            setSnackBar({
                open: true,
                message: "Failed to update profile. Please try again.",
                severity: "error",
            });
        }
    };

    const FetchCountryNames = async () => {
        let CountryValues = [];
        let CountryName = [];
        try {
            const response = await axiosInstance("/sec/countries");
            for (let key in response?.data?.response) {
                CountryValues.push(response?.data?.response[key]);
                CountryName.push(response?.data?.response[key].country_name);
            }
            setCountryNames(CountryName);
            setCountryValue(CountryValues);
        } catch (error) {
            console.log(error);
        }
    };

    const FetchStateNames = async (country_id) => {
        let StateValues = [];
        let StateName = [];
        try {
            const response = await axiosInstance(`/sec/states?country_id=${country_id}`);
            for (let key in response?.data?.response) {
                StateValues.push(response?.data?.response[key]);
                StateName.push(response?.data?.response[key].state_name);
            }
            setStateValue(StateValues);
            setStateNames(StateName);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        FetchStateNames(selectedCountryFromDropDown[0]?.country_id);
    }, [selectedCountryFromDropDown]);

    const FetchCityNames = async (state_id) => {
        let CityValues = [];
        let cityName = [];
        try {
            const response = await axiosInstance(`/sec/cities?state_id=${state_id}`);
            for (let key in response?.data?.response) {
                CityValues.push(response?.data?.response[key]);
                cityName.push(response?.data?.response[key].city_name);
            }
            setCityValues(CityValues);
            setCityNames(cityName);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        FetchCityNames(selectCityFromDropDown[0]?.state_id);
    }, [selectCityFromDropDown]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setSnackBar({ open: true, message: "Please select a valid image file", severity: "error" });
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setSnackBar({ open: true, message: "Image size should be less than 5MB", severity: "error" });
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;
                const base64Data = dataUrl.split(',')[1]; // Remove data:image/jpeg;base64, prefix
                
                setProfileImage(dataUrl); // Immediate preview
                setData(prevData => ({
                    ...prevData,
                    profile_picture: base64Data, // Store for API call
                }));
                
                // Dispatch event for navbar update
                window.dispatchEvent(new CustomEvent('profileUpdated', {
                    detail: { profile: dataUrl }
                }));
            };
            reader.onerror = () => {
                setSnackBar({ open: true, message: "Error reading image file", severity: "error" });
            };
            reader.readAsDataURL(file);
        }
    };

    const getImageSrc = () => {
        console.log("getImageSrc - data.profile_picture:", data?.profile_picture);
        console.log("getImageSrc - profileImage:", profileImage);

        // If we have profile_picture in data, use it
        if (data?.profile_picture) {
            if (data.profile_picture.startsWith('data:image/')) {
                console.log("Using data URL from profile_picture");
                return data.profile_picture;
            } else if (data.profile_picture.startsWith('http')) {
                console.log("Using S3 URL from profile_picture");
                return data.profile_picture;
            } else if (data.profile_picture.startsWith('dev-uploads/')) {
                // It's a development mock path, use profileImage state
                console.log("Using profileImage for dev-uploads path");
                return profileImage;
            } else {
                // It's a base64 string without data URL prefix
                console.log("Adding data URL prefix to base64 string");
                return `data:image/jpeg;base64,${data.profile_picture}`;
            }
        }

        // Fallback to profileImage state
        console.log("Using fallback profileImage");
        return profileImage;
    };

    return (
        <Box sx={{ width: "100%", padding: "24px", backgroundColor: "#fafafa", minHeight: "100vh" }}>
                <CustomSnackBar
                    isOpen={snackBar.open}
                    message={snackBar.message}
                    type={snackBar.severity}
                />
            
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
                        Doctor Profile Information
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Chip 
                            label={`Doctor ID: ${localStorage.getItem("doctor_suid") || "DOC001"}`}
                            sx={{ 
                                backgroundColor: "#E72B4A",
                                color: "white",
                                fontWeight: 500
                            }}
                        />
                        <Tooltip title="Close">
                            <IconButton 
                                onClick={() => window.history.back()}
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
                <Box sx={{ display: "flex", gap: 1 }}>
                    <NavLink 
                        to="/doctordashboard/doctorpersonalinfo"
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
                        to="/doctordashboard/doctorprofessionalinfo"
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
                            Professional Details
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
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                <Avatar
                                    src={getImageSrc()}
                                    alt="Doctor Profile"
                            sx={{
                                        width: 180,
                                        height: 180,
                                        border: "4px solid #E72B4A",
                                        boxShadow: "0 4px 20px rgba(231, 43, 74, 0.2)"
                                    }}
                                />
                                
                                {isEditing && (
                                    <Box sx={{ position: "relative" }}>
                                        <IconButton
                                            component="label"
                                            sx={{
                                                position: "absolute",
                                                bottom: 8,
                                                right: 8,
                                                backgroundColor: "#E72B4A",
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor: "#d32f2f"
                                                }
                                            }}
                                        >
                                            <CameraAltIcon />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={handleImageChange}
                                            />
                                        </IconButton>
                                    </Box>
                                )}
                                
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#313033" }}>
                                    {data?.first_name} {data?.last_name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666" }}>
                                    {data?.email}
                                </Typography>
                                
                                {isEditing && (
                        <Button
                                        variant="outlined"
                            component="label"
                                        startIcon={<CameraAltIcon />}
                            sx={{
                                            borderColor: "#E72B4A",
                                            color: "#E72B4A",
                                            "&:hover": {
                                                borderColor: "#d32f2f",
                                                backgroundColor: "rgba(231, 43, 74, 0.04)"
                                            }
                                        }}
                                    >
                                        Change Photo
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
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
                                {/* First Row - First Name, Middle Name, Last Name */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                            <CustomTextField
                                defaultValue={data?.first_name}
                                CustomValue={data?.first_name}
                                label="First Name"
                                            helperText=""
                                isDisabled={!isEditing}
                                            textcss={{ width: "100%" }}
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
                                onInput={(event) => {
                                    console.log("📝 First Name changed:", event.target.value);
                                    const Copy = {
                                        ...data,
                                        first_name: event.target.value,
                                    };
                                    setData(Copy);
                                }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                            <CustomTextField
                                defaultValue={data?.middle_name}
                                CustomValue={data?.middle_name}
                                label="Middle Name"
                                            helperText=""
                                isDisabled={!isEditing}
                                            textcss={{ width: "100%" }}
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
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        middle_name: event.target.value,
                                    };
                                    setData(Copy);
                                }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                            <CustomTextField
                                defaultValue={data?.last_name}
                                CustomValue={data?.last_name}
                                label="Last Name"
                                            helperText=""
                                isDisabled={!isEditing}
                                            textcss={{ width: "100%" }}
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
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        last_name: event.target.value,
                                    };
                                    setData(Copy);
                                }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Second Row - Date of Birth, Gender */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                     

<LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={data?.DOB ? dayjs(data.DOB) : null}
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
                                                        setData({
                                                        ...data,
                                                        DOB: formattedDate,
                                                    });
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CustomDropdown
                                            label="Gender"
                                            dropdowncss={{ 
                                                width: "100%",
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
                                            items={dropdownItems}
                                            isDisabled={!isEditing}
                                            activeItem={data?.gender || "Select Gender"}
                                            handleChange={(selectedValue) => handleDropdownChange(selectedValue, "dropdown1")}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Bio Section */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                            <CustomTextField
                                multiline={true}
                                defaultValue={data?.description}
                                CustomValue={data?.description}
                                label="Bio"
                                isDisabled={!isEditing}
                                            helperText=""
                                            textcss={{ width: "100%" }}
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
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        description: event.target.value,
                                    };
                                    setData(Copy);
                                }}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Contact Details Section */}
            <Card 
                elevation={0} 
                        sx={{
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    marginBottom: "24px",
                    backgroundColor: "white"
                }}
            >
                <CardContent sx={{ padding: "32px" }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                                color: "#313033",
                        marginBottom: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        <LocationOnIcon sx={{ color: "#E72B4A" }} />
                            Contact Details
                        </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                        <CustomTextField
                            defaultValue={data?.street_address1}
                            CustomValue={data?.street_address1}
                                label="Street Line 1"
                            isDisabled={!isEditing}
                                helperText=""
                                textcss={{ width: "100%" }}
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
                            onInput={(event) => {
                                const Copy = {
                                    ...data,
                                    street_address1: event.target.value,
                                };
                                setData(Copy);
                            }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <CustomTextField
                            defaultValue={data?.street_address2}
                            CustomValue={data?.street_address2}
                                label="Street Line 2"
                            isDisabled={!isEditing}
                                helperText=""
                                textcss={{ width: "100%" }}
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
                            onInput={(event) => {
                                const Copy = {
                                    ...data,
                                    street_address2: event.target.value,
                                };
                                setData(Copy);
                            }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <CustomDropdown
                                label="Country"
                            isDisabled={!isEditing}
                            dropdowncss={{
                                    width: "100%",
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
                            items={countryNames}
                            minwidthDropDown="300px"
                            activeItem={activeDropdown}
                            handleChange={(listItems) => {
                                setActiveDropdown(listItems);
                                let response = countryValues.filter((country) =>
                                    country?.country_name?.includes(listItems),
                                );
                                setData({
                                    ...data,
                                    country_id: response[0]?.country_id,
                                });
                                setSelectedCountryFromDropDown(response);
                            }}
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <CustomDropdown
                                label="State"
                            isDisabled={!isEditing}
                                dropdowncss={{
                                    width: "100%",
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
                            items={stateNames}
                            minwidthDropDown="300px"
                            activeItem={stateName}
                            handleChange={(listItems) => {
                                let response = stateValue.filter((state) =>
                                    state?.state_name?.includes(listItems),
                                );
                                setData({
                                    ...data,
                                    state_id: response[0]?.state_id,
                                });
                                setSelectCityFromDropDown(response);
                                setStateName(listItems);
                            }}
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <CustomDropdown
                                label="City"
                            isDisabled={!isEditing}
                                dropdowncss={{
                                    width: "100%",
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
                            items={cityNames}
                            minwidthDropDown="300px"
                            activeItem={citySelected}
                            handleChange={(listItems) => {
                                setCitySelected(listItems);
                                let response = cityValues.filter((city) =>
                                    city?.city_name?.includes(listItems),
                                );
                                setData({
                                    ...data,
                                    city_id: response[0]?.city_id,
                                });
                            }}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                defaultValue={data?.zip_code}
                                CustomValue={data?.zip_code}
                                label="Zip Code"
                                isDisabled={!isEditing}
                                helperText=""
                                textcss={{ width: "100%" }}
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
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        zip_code: event.target.value,
                                    };
                                    setData(Copy);
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Clinic Details Section */}
            <Card 
                elevation={0} 
                sx={{ 
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    marginBottom: "24px",
                    backgroundColor: "white"
                }}
            >
                <CardContent sx={{ padding: "32px" }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        color: "#313033",
                        marginBottom: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        <WorkIcon sx={{ color: "#E72B4A" }} />
                        Clinic Details
                    </Typography>

                    {/* <Box sx={{ marginBottom: "24px" }}>
                        <Checkbox
                            checked={false}
                            sx={{
                                color: "#E72B4A",
                                "&.Mui-checked": {
                                    color: "#E72B4A",
                                },
                            }}
                        />
                        <Typography variant="body2" sx={{ display: "inline", marginLeft: 1 }}>
                            Same as Contact details
                        </Typography> 
                    </Box> */}

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                        <CustomTextField
                            defaultValue={data?.hospital_org}
                            CustomValue={data?.hospital_org}
                            label="Clinic Name"
                            isDisabled={!isEditing}
                            helperText=""
                            textcss={{ width: "100%" }}
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
                            onInput={(event) => {
                                const Copy = { ...data, hospital_org: event.target.value };
                                setData(Copy);
                            }}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <CustomTextField
                            defaultValue={data?.council_name}
                            CustomValue={data?.council_name}
                            label="State Medical Council Name"
                            isDisabled={!isEditing}
                                helperText=""
                                textcss={{ width: "100%" }}
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
                            onInput={(event) => {
                                const Copy = {
                                    ...data,
                                    council_name: event.target.value,
                                };
                                setData(Copy);
                            }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Action Buttons */}
                    {isEditing && (
                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "flex-end", 
                    gap: 2,
                    marginTop: "24px"
                }}>
                    <CustomButton
                        label="Discard Changes"
                        isTransaprent={true}
                        buttonCss={{
                            width: "160px",
                            height: "48px",
                            borderRadius: "8px",
                            fontWeight: 600,
                            border: "1px solid #E72B4A",
                            color: "#E72B4A"
                        }}
                        handleClick={() => setIsEditing(false)}
                    />
                        <CustomButton
                            label="Save Changes"
                        isTransaprent={false}
                        isDisabled={false}
                        isElevated={false}
                            buttonCss={{
                                width: "160px",
                            height: "48px",
                            borderRadius: "8px",
                            fontWeight: 600
                            }}
                            handleClick={() => {
                                fetchData();
                                setIsEditing(false);
                            }}
                        />
                </Box>
            )}
        </Box>
    );
};

export default DoctorPersonalInfo;