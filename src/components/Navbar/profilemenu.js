import React, { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { 
    Box, 
    Button, 
    IconButton, 
    Link, 
    Typography, 
    Divider,
    Avatar,
    Chip,
    Tooltip,
    Fade,
    Backdrop
} from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../loginComponent/UserProvider";
import { useAuth } from "../../hooks/useAuth";
import axiosInstance from "../../config/axiosInstance";
import { processProfileImage } from "../../utils/imageUtils";
import "./profilemenu.scss";
// import DocImg from "../../static/images/DrImages/doctor_alter.jpeg";
import DocImg from "../../static/images/DrImages/doctor_alter.jpeg";

const profilemenu = ({ profilepath }) => {
    const navigate = useNavigate();
    console.log("Profile path inner : ", profilepath);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    
    // Get profile from localStorage as fallback
    const profile = localStorage.getItem("profile");

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const Authentication = useAuthentication();
    const { logout, isAuthenticated } = useAuth();

    // Function to fetch user profile image from API
    const fetchUserProfileImage = async () => {
        setIsLoadingProfile(true);
        try {
            let response;
            
            // Use different API endpoints based on user type
            if (profilepath === "doctor") {
                const doctor_id = localStorage.getItem("doctor_suid");
                if (!doctor_id) {
                    console.log("No doctor SUID found, skipping profile fetch");
                    return;
                }
                response = await axiosInstance.get(`/sec/Doctor/doctorProfileDetailsbyId?doctor_id=${doctor_id}`);
                console.log("Doctor profile image fetch response:", response?.data);
            } else if (profilepath === "hcfadmin") {
                const hcf_id = localStorage.getItem("hcfadmin_suid");
                if (!hcf_id) {
                    console.log("No HCF admin SUID found, skipping profile fetch");
                    return;
                }
                response = await axiosInstance.get(`/sec/hcf/getHcfprofile/${hcf_id}`);
                console.log("HCF admin profile image fetch response:", response?.data);
            } else {
                // Default to patient/user API
                response = await axiosInstance.get("/sec/auth/getUserDetails/");
                console.log("User profile image fetch response:", response?.data);
            }
            
            // Extract profile picture based on response structure
            let profilePicture = null;
            if (profilepath === "doctor" && response?.data?.profile_picture) {
                profilePicture = response.data.profile_picture;
            } else if (profilepath === "hcfadmin" && response?.data?.response && response.data.response.length > 0) {
                // HCF admin response structure: { response: [{ profile_picture: "..." }] }
                profilePicture = response.data.response[0].profile_picture;
            } else if (response?.data?.profile_picture) {
                profilePicture = response.data.profile_picture;
            }
            
            if (profilePicture) {
                console.log("Raw profile picture data:", profilePicture);
                
                // Use utility function to process and convert to base64
                const processedImage = await processProfileImage(profilePicture, DocImg);
                
                if (processedImage && processedImage !== DocImg) {
                    setProfileImage(processedImage);
                    localStorage.setItem("profile", processedImage);
                    console.log("✅ Profile image processed and set successfully");
                } else {
                    console.log("⚠️ Using fallback image");
                }
            } else {
                console.log("❌ No profile picture found in response");
            }
        } catch (error) {
            console.error("Error fetching profile image:", error);
        } finally {
            setIsLoadingProfile(false);
        }
    };

    // Fetch profile image on component mount
    useEffect(() => {
        fetchUserProfileImage();
    }, []);

    // Listen for profile updates from other components
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'profile') {
                setProfileImage(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Also listen for custom events (for same-tab updates)
        const handleProfileUpdate = (e) => {
            if (e.detail?.profile) {
                setProfileImage(e.detail.profile);
            }
        };

        window.addEventListener('profileUpdated', handleProfileUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('profileUpdated', handleProfileUpdate);
        };
    }, []);

    const HandleLogout = async () => {
        try {
            console.log("Starting logout process from profile menu...");
            setIsLoggingOut(true);
            
            // Show confirmation dialog
            const confirmed = window.confirm('Are you sure you want to logout?');
            if (!confirmed) {
                console.log("Logout cancelled by user");
                setIsLoggingOut(false);
                return;
            }
            
            // Call our comprehensive logout function
            const result = await logout({
                clearLocalData: true,
                callServer: true
            });
            
            if (result.success) {
                console.log("Logout successful from profile menu:", result.message);
                
                // Call the existing authentication logout methods for compatibility
                if (Authentication.LogoutPatient) {
                    Authentication.LogoutPatient();
                }
                if (Authentication.LogoutDoctor) {
                    Authentication.LogoutDoctor();
                }
                if (Authentication.LoginHcf) {
                    Authentication.LoginHcf();
                }
                
                // Clear additional storage (for backward compatibility)
                sessionStorage.clear();
                Cookies.remove("token");
                Cookies.remove("patientEmail");
                
                // Navigate to login page
                navigate("/");
                
                // Show success message
                console.log("Logout completed successfully!");
            } else {
                console.error("Logout failed from profile menu:", result.message);
                
                // Even if server logout fails, clear local data for security
                localStorage.clear();
                sessionStorage.clear();
                Cookies.remove("token");
                Cookies.remove("patientEmail");
                
                // Call authentication logout methods
                if (Authentication.LogoutPatient) {
        Authentication.LogoutPatient();
                }
                if (Authentication.LogoutDoctor) {
        Authentication.LogoutDoctor();
                }
                if (Authentication.LoginHcf) {
        Authentication.LoginHcf();
                }
                
                navigate("/");
                console.log("Local logout completed due to server error");
            }
        } catch (error) {
            console.error("Logout error from profile menu:", error);
            
            // Fallback to local logout
            localStorage.clear();
            sessionStorage.clear();
        Cookies.remove("token");
        Cookies.remove("patientEmail");
            
            if (Authentication.LogoutPatient) {
                Authentication.LogoutPatient();
            }
            if (Authentication.LogoutDoctor) {
                Authentication.LogoutDoctor();
            }
            if (Authentication.LoginHcf) {
                Authentication.LoginHcf();
            }
            
            navigate("/");
            console.log("Fallback logout completed");
        } finally {
            setIsLoggingOut(false);
        }
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
            PaperProps={{
                style: {
                    borderRadius: 12,                    // More rounded corners
                    padding: "8px 0",                    // Better padding
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", // Enhanced shadow
                    minWidth: 200,                       // Wider for better content
                    backgroundColor: "#fff", 
                    marginTop: 8,                        // Better spacing
                    border: "1px solid rgba(0, 0, 0, 0.05)", // Subtle border
                    backdropFilter: "blur(10px)",       // Modern glass effect
                }
            }}
        >
            {/* User Info Header */}
            <Box sx={{ 
                padding: "12px 16px 8px", 
                borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                marginBottom: "4px"
            }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                        src={profileImage || profile || DocImg}
                        alt="Profile"
                        sx={{
                            width: 40,
                            height: 40,
                            border: "2px solid #E72B4A",
                            boxShadow: "0 2px 8px rgba(231, 43, 74, 0.2)"
                        }}
                        onError={(e) => {
                            e.target.src = DocImg;
                        }}
                    />
                    <Box>
                        <Typography variant="subtitle2" sx={{ 
                            fontWeight: 600, 
                            color: "#313033",
                            fontSize: "14px"
                        }}>
                            {profilepath === "patient" ? "Patient" : 
                             profilepath === "doctor" ? "Doctor" :
                             profilepath === "clinic" ? "Clinic" :
                             profilepath === "diagnostic" ? "Diagnostic" :
                             profilepath === "hcfadmin" ? "HCF Admin" : "User"}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                            color: "#666",
                            fontSize: "11px"
                        }}>
                            {localStorage.getItem("patient_Email") || "user@example.com"}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Profile Menu Item */}
            <MenuItem
                onClick={handleMenuClose}
                sx={{
                    display: profilepath === "hcfadmin" ? "block" : 
                             profilepath === 'superadmin' ? "none" : "block",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    margin: "4px 8px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        backgroundColor: "#f8f9fa",
                        transform: "translateX(4px)"
                    }
                }}
            >
                <Box
                    onClick={() => {
                        profilepath === "patient"
                            ? localStorage.getItem("activeComponent") === "dashboard"
                                ? navigate("/patientdashboard/dashboard/profile")
                                : localStorage.getItem("activeComponent") === "appointment"
                                ? navigate("/patientdashboard/appointment/profile")
                                : localStorage.getItem("activeComponent") === "manage"
                                ? navigate("/patientdashboard/manage/profile")
                                : null
                            : profilepath === "doctor"
                            ? localStorage.getItem("activeComponent") === "dashboard"
                                ? navigate("/doctordashboard/doctorpersonalinfo")
                                : localStorage.getItem("activeComponent") === "appointment"
                                ? navigate("/doctordashboard/doctorAppointment/doctorpersonalinfo")
                                : localStorage.getItem("activeComponent") === "manage"
                                ? navigate("/doctordashboard/doctorManage/doctorpersonalinfo")
                                : localStorage.getItem("activeComponent") === "listing"
                                ? navigate("/doctordashboard/doctorListing/doctorpersonalinfo")
                                : localStorage.getItem("activeComponent") === "statistics"
                                ? navigate("/doctordashboard/doctorStatistics/doctorpersonalinfo")
                                : null
                            : profilepath === "clinic"
                            ? navigate("/clinicDashboard/clinicprofile/profileinformation")
                            : profilepath === "diagnostic"
                            ? navigate("/diagnostCenterDashboard/diagnostcenterprofile/diagnostcenterprofileinfo")
                            : profilepath === "hcfadmin"
                            ? navigate("adminprofile")
                            : console.log("this is null");
                    }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                        cursor: "pointer"
                    }}
                >
                    <PersonIcon sx={{ 
                        color: "#E72B4A", 
                        fontSize: "20px" 
                    }} />
                    <Typography sx={{ 
                        color: "#313033",
                        fontWeight: 500,
                        fontSize: "14px"
                    }}>
                    Profile
                    </Typography>
                </Box>
            </MenuItem>

{/* 
        ternary operator
        condition ?  true : false;
        num === 1 ?  "yes" : "No"
*/}

            {/* <MenuItem onClick={handleMenuClose}>
                <LocalAtmIcon />
                Payment
            </MenuItem> */}
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
                <>
                    <Divider sx={{ margin: "8px 0" }} />
                    <MenuItem 
                        onClick={handleMenuClose}
                        sx={{ 
                            padding: "8px 16px",
                            "&:hover": { backgroundColor: "transparent" }
                        }}
                    >
                        <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 1,
                            width: "100%"
                        }}>
                            <Chip 
                                label={`Auth: ${isAuthenticated ? '✅' : '❌'}`}
                                size="small"
                                sx={{ 
                                    fontSize: "10px",
                                    height: "20px",
                                    backgroundColor: isAuthenticated ? "#e8f5e8" : "#ffeaea",
                                    color: isAuthenticated ? "#2e7d32" : "#d32f2f"
                                }}
                            />
                            <Chip 
                                label={`Loading: ${isLoggingOut ? '⏳' : '✅'}`}
                                size="small"
                                sx={{ 
                                    fontSize: "10px",
                                    height: "20px",
                                    backgroundColor: isLoggingOut ? "#fff3e0" : "#e8f5e8",
                                    color: isLoggingOut ? "#f57c00" : "#2e7d32"
                                }}
                            />
                            <Chip 
                                label={`Profile: ${profileImage ? '✅' : '❌'}`}
                                size="small"
                                sx={{ 
                                    fontSize: "10px",
                                    height: "20px",
                                    backgroundColor: profileImage ? "#e8f5e8" : "#ffeaea",
                                    color: profileImage ? "#2e7d32" : "#d32f2f"
                                }}
                            />
                            <Chip 
                                label={isLoadingProfile ? '⏳' : '🔄'}
                                size="small"
                                onClick={fetchUserProfileImage}
                                sx={{ 
                                    fontSize: "10px",
                                    height: "20px",
                                    backgroundColor: "#e3f2fd",
                                    color: "#1976d2",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "#bbdefb"
                                    }
                                }}
                            />
                        </Box>
                    </MenuItem>
                </>
            )}
            
            {/* Logout Menu Item */}
            <MenuItem 
                onClick={handleMenuClose}
                sx={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    margin: "4px 8px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        backgroundColor: "#ffebee",
                        transform: "translateX(4px)"
                    }
                }}
            >
                <Box 
                    onClick={HandleLogout}
                    sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 2,
                        width: "100%",
                        cursor: isLoggingOut ? "not-allowed" : "pointer",
                        opacity: isLoggingOut ? 0.6 : 1
                    }}
                >
                    <LogoutIcon sx={{ 
                        color: isLoggingOut ? "#f57c00" : "#d32f2f",
                        fontSize: "20px"
                    }} />
                    <Typography sx={{ 
                        color: isLoggingOut ? "#f57c00" : "#d32f2f",
                        fontWeight: 500,
                        fontSize: "14px"
                    }}>
                        {isLoggingOut ? "Logging out..." : "Log Out"}
                    </Typography>
                </Box>
            </MenuItem>
        </Menu>
    );

    return (
        <Box>
            <Tooltip title="Profile Menu" arrow>
   <IconButton
    size="large"
    edge="end"
    aria-label="account of current user"
    aria-controls={menuId}
    aria-haspopup="true"
    onClick={handleProfileMenuOpen}
                    sx={{
                        padding: "8px",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            backgroundColor: "rgba(231, 43, 74, 0.1)",
                            transform: "scale(1.05)"
                        }
                    }}
                >
                    {(profileImage || profile) ? (
                        <Avatar
                            src={profileImage || profile}
            alt="Profile"
                            sx={{
                                width: 40,
                                height: 40,
                                border: "2px solid #E72B4A",
                                boxShadow: "0 2px 8px rgba(231, 43, 74, 0.2)",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    boxShadow: "0 4px 12px rgba(231, 43, 74, 0.3)",
                                    transform: "scale(1.05)"
                                }
            }}
            onError={(e) => {
                                e.target.src = DocImg;
            }}
        />
    ) : (
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#E72B4A",
                                border: "2px solid #E72B4A",
                                boxShadow: "0 2px 8px rgba(231, 43, 74, 0.2)",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    boxShadow: "0 4px 12px rgba(231, 43, 74, 0.3)",
                                    transform: "scale(1.05)"
                                }
                            }}
                        >
                            <AccountCircle sx={{ color: "white", fontSize: "24px" }} />
                        </Avatar>
    )}
</IconButton>
            </Tooltip>

    {renderMenu}
</Box>
    );
};

export default profilemenu;
