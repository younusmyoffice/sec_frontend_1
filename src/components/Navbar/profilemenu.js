import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Button, IconButton, Link } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../loginComponent/UserProvider";
import { useAuth } from "../../hooks/useAuth";
import "./profilemenu.scss";
// import DocImg from "../../static/images/DrImages/doctor_alter.jpeg";
import DocImg from "../../static/images/DrImages/doctor_alter.jpeg";

const profilemenu = ({ profilepath }) => {
    const navigate = useNavigate();
    console.log("Profile path inner : ", profilepath);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
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
                vertical: "top",
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
            PaperProps={{
                style: {
                    borderRadius: 8,             // Rounded corners for the menu
                    padding: 8,                  // Add padding inside the menu
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    minWidth: 150,               // Set a minimum width for better readability
                    backgroundColor: "#fff", 
                    marginTop:35,   // White background color
                }
            }}
        >
            <MenuItem
                onClick={handleMenuClose}

                sx={profilepath === "hcfadmin" ? { display: "block" } : profilepath === 'superadmin' ? {display : "none"} :  { display: "block" }}
            >
                {" "}
                <AccountCircle />
                {/* <Link to={'/patientdashboard/dashboard/profile'} >Profile logo!!!</Link> */}
                <Button
                    className={
                        profilepath === "hcfadmin"
                            ? "profile-button-dont-display"
                            : "profile-button-display"
                    }
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
                    sx={{color: "black",}}
                >
                    Profile
                </Button>
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
                <MenuItem onClick={handleMenuClose}>
                    <Box sx={{ fontSize: '12px', color: '#666', padding: '4px 0' }}>
                        Auth: {isAuthenticated ? '✅' : '❌'} | 
                        Loading: {isLoggingOut ? '⏳' : '✅'}
                    </Box>
                </MenuItem>
            )}
            
            <MenuItem onClick={handleMenuClose}>
                <Box 
                    component={"span"} 
                    onClick={HandleLogout}
                    sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        cursor: isLoggingOut ? "not-allowed" : "pointer",
                        opacity: isLoggingOut ? 0.6 : 1
                    }}
                >
                    <LogoutIcon />
                    {isLoggingOut ? "Logging out..." : "Log Out"}
                </Box>
            </MenuItem>
        </Menu>
    );

    return (
        <Box>
   <IconButton
    size="large"
    edge="end"
    aria-label="account of current user"
    aria-controls={menuId}
    aria-haspopup="true"
    onClick={handleProfileMenuOpen}
    color="inherit"
>
    {profile ? (
        <img
            src={profile} // Use the profile if available
            alt="Profile"
            style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%", // Circular shape
                objectFit: "cover", // Ensure the image fits well
            }}
            onError={(e) => {
                e.target.src = DocImg; // Fallback to default image on error
            }}
        />
    ) : (
        <AccountCircle sx={{ backgroundColor: "#AEAAAE" }} />
    )}
</IconButton>


    {renderMenu}
</Box>

    );
};

export default profilemenu;
