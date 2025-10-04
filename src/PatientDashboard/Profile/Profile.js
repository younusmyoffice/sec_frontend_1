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
import React, { useEffect, useState } from "react";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../components/CustomButton/custom-button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./profile.scss";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonIcon from "@mui/icons-material/Person";
import CustomSnackBar from "../../components/CustomSnackBar";

const Profile = () => {
    const [activeDropdown, setActiveDropdown] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [profileLink, setProfileLink] = useState("");
    const [isopen, setIsopen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackStatus, setSnackStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [contactLink, setContactLink] = useState("");
    const [profileUpdate, setProfileUpdate] = useState({
        email: localStorage.getItem("patient_Email"),
        first_name: null,
        last_name: null,
        middle_name: null,
        added_by: "self",
        gender: null,
        DOB: null,
        profile_picture: null,
    });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        fetchData();
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/sec/updatePateintProfile",
                JSON.stringify(profileUpdate),
            );
            setSnackMessage("Updated Successfully");
            setSnackStatus("success");
            setIsopen(true);
            const updatedProfilePic = response?.data?.response?.profile_picture;

            if (updatedProfilePic) {
                localStorage.setItem("profile", updatedProfilePic);
                // Dispatch custom event to notify other components
                window.dispatchEvent(new CustomEvent('profileUpdated', {
                    detail: { profile: updatedProfilePic }
                }));
            }
            console.log("Success  : ", response);
        } catch (error) {
            console.log(error);
            setSnackMessage("Error");
            setSnackStatus("error");
            setIsopen(true);
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    console.log("Profile Update : ", profileUpdate);

    const fetchDataProfile = async () => {
        try {
            const response = await axiosInstance.post(
                "/sec/patientprofile",
                JSON.stringify({
                    suid: localStorage.getItem("patient_suid"),
                }),
            );
            console.log("Patient Profile Details : ", response?.data?.response[0]);
            const profileData = response?.data?.response[0];
            setProfileUpdate({
                email: profileData?.email,
                first_name: profileData?.first_name,
                last_name: profileData?.last_name,
                middle_name: profileData?.middle_name,
                added_by: "self",
                gender: profileData?.gender,
                DOB: profileData?.DOB,
                profile_picture: profileData?.profile_picture,
            });

            // Update profile image in localStorage and notify other components
            if (profileData?.profile_picture) {
                localStorage.setItem("profile", profileData.profile_picture);
                window.dispatchEvent(new CustomEvent('profileUpdated', {
                    detail: { profile: profileData.profile_picture }
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setProfileLink(
            localStorage.getItem("activeComponent") === "dashboard"
                ? "/patientdashboard/dashboard/profile"
                : localStorage.getItem("activeComponent") === "appointment"
                ? "/patientdashboard/appointment/profile"
                : localStorage.getItem("activeComponent") === "manage"
                ? "/patientdashboard/manage/profile"
                : null,
        );

        setContactLink(
            localStorage.getItem("activeComponent") === "dashboard"
                ? "/patientdashboard/dashboard/contact"
                : localStorage.getItem("activeComponent") === "appointment"
                ? "/patientdashboard/appointment/contact"
                : localStorage.getItem("activeComponent") === "manage"
                ? "/patientdashboard/manage/contact"
                : null,
        );
        fetchDataProfile();
    }, []);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Data = reader.result.split(",")[1]; // Extract base64 without metadata
                setProfileUpdate({
                    ...profileUpdate,
                    profile_picture: base64Data, // Store the base64 representation
                });
            };

            reader.readAsDataURL(file); // Read the file as Data URL
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Box sx={{ width: "100%", padding: "24px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
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
                                onClick={() => navigate("/patientdashboard/dashboard/explore")}
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
                                    <Avatar
                                        alt="Profile Picture"
                                        src={
                                            profileUpdate?.profile_picture
                                                ? `data:image/jpeg;base64,${profileUpdate.profile_picture}`
                                                : "/images/avatar.png"
                                        }
                                        sx={{ 
                                            width: 180, 
                                            height: 180,
                                            border: "4px solid #E72B4A",
                                            boxShadow: "0 8px 24px rgba(231, 43, 74, 0.2)",
                                            objectFit: "cover"
                                        }}
                                        onError={(e) => {
                                            console.log("Avatar image failed to load, using fallback");
                                            e.target.src = "/images/avatar.png";
                                        }}
                                    />
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

                    {/* Action Buttons */}
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
                                isDisabled={loading}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "180px",
                                    height: "48px",
                                    borderRadius: "8px",
                                    fontWeight: 600
                                }}
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;
