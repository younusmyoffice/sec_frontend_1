import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { styled, useTheme, alpha } from "@mui/material/styles";
import {
    Box,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Grid,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// import CardContent from "@mui/material/CardContent";
// import Card from "@mui/material/Card";
// import Stack from "@mui/material/Stack";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

// import {CustomButton} from "../CustomModal";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { makeStyles, createStyles } from "@mui/styles"; // Using sx prop instead for MUI v5
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CustomButton from "../CustomButton"; // this
import CustomModal from "../CustomModal"; // this
import SearchBarModal from "../Navbar/searchBarModal";
import LocationModal from "../Navbar/locationModal";
import Content1 from "../subcriptionContent/content1";
import Content2 from "../subcriptionContent/content2";
import Content3 from "../subcriptionContent/content3";
import { useAuthentication } from "../../loginComponent/UserProvider";
import Notificationmenu from "../Navbar/notificationmenu";
import Profilemenu from "../Navbar/profilemenu";
import { useAuth } from "../../hooks/useAuth";
import "./custom-menu-drawer.scss";
import CustomTextField from "../CustomTextField";
import dig_logo from "../../static/images/logos/diagnosit_logo.png";
import hcf_logo from "../../static/images/logos/hcf_admin_logo.png";
import doc_logo from "../../static/images/logos/Doctor_logo.png";
import clinic_logo from "../../static/images/logos/clinic_logo.png";
import icon from "../../static/images/logos/bergerIcon.png"

/// /from here

/// /till here

const drawerWidth = 270;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(11)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(12)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        }),
    }),
);

// Removed makeStyles - using sx prop instead for MUI v5 compatibility

const CustomMenuDrawer = ({ list1, list2, children, handleOnMenuSelect, profilepath }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [selectedItem, setSeletedItem] = useState(list1[0].name);
    const navigate = useNavigate();
console.log("this is the profile path : ",profilepath)
    /// from here
    // const useStyles = makeStyles({
    //     gridContainer: {
    //         paddingLeft: "-20px",
    //         paddingRight: "-20px",
    //     },
    // });
    const [openDialog, setOpenDialog] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const role_id = localStorage.getItem("signUp");
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
const profile = localStorage.getItem("profile")

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    // const handleMobileMenuOpen = (event) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };
    const Authentication = useAuthentication();
    const { logout, isAuthenticated } = useAuth();

    const HandleLogout = async () => {
        try {
            console.log("Starting logout process...");
            
            // Show confirmation dialog
            const confirmed = window.confirm('Are you sure you want to logout?');
            if (!confirmed) {
                console.log("Logout cancelled by user");
                return;
            }
            
            // Call our logout function
            const result = await logout({
                clearLocalData: true,
                callServer: true
            });
            
            if (result.success) {
                console.log("Logout successful:", result.message);
                
                // Call the existing authentication logout methods
                if (Authentication.LogoutPatient) {
                    Authentication.LogoutPatient();
                }
                if (Authentication.LogoutDoctor) {
                    Authentication.LogoutDoctor();
                }
                if (Authentication.LoginHcf) {
                    Authentication.LoginHcf();
                }
                
                // Navigate to login page
                navigate("/");
                
                // Show success message
                alert("Logged out successfully!");
            } else {
                console.error("Logout failed:", result.message);
                alert("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred during logout. Please try again.");
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
        >
            <MenuItem onClick={handleMenuClose}>
                <AccountCircle />
                <NavLink>Profile</NavLink>
            </MenuItem>
            {/* <MenuItem onClick={handleMenuClose}>
                <LocalAtmIcon />
                <NavLink to={"/patientdashboard/dashboard/payment"}>Payment</NavLink>
            </MenuItem> */}
            <MenuItem onClick={handleMenuClose}>
                <Box component={"span"} onClick={HandleLogout}>
                    <LogoutIcon />
                    Log Out
                </Box>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    /// /till  here

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSelectItem = (item) => {
        setSeletedItem(item);
        handleOnMenuSelect(item);
    };

    // FROM HERE

    // Removed useStyles - using sx prop instead

    const handleOpen = (condition) => {
        setOpenDialog(condition);
    };
    const logos = {
        hcf_admin: hcf_logo, // Directly use the imported image path
        doctor: doc_logo,
        diagnostic_center: dig_logo,
        clinic: clinic_logo,
        patient: "images/logo.png", // Use a string for paths not imported
        default: "images/logo.png",
    };

    // Determine the logo based on the user's role
    const logoSrc = logos[role_id] || logos.default;
    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ backgroundColor: "#ffff" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: 5,
                            ...(open && { display: "none" }),
                            cursor: "pointer",
                        }}
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <Box>
                            <img src={icon} alt="Logo" width="40" padding=" 2px 1px" />
                        </Box>
                        {/* <img src="images/icon.png" alt="Logo" width="40" /> */}
                    </Box>
                    {/* //fromhere */}

                    {/* {localStorage.getItem("signUp") === "patient" && ( */}
    <div
        id="location-search-container"
        style={{ display: "flex", alignItems: "center" }}
    >
        <div style={{ marginRight: "16px" }}>
            <LocationModal />
        </div>
        <SearchBarModal />
    </div>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Notificationmenu />
                        <Profilemenu profilepath={profilepath} />
                        {/* <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="#AEAAAE"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                        >
                            <Badge badgeContent={3} color="error">
                                <NotificationsIcon sx={{color:"#AEAAAE"}} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle  sx={{backgroundColor:"#AEAAAE"}}/>
                        </IconButton> */}
                    </Box>

                    {/* till here */}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    {open && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img src={logoSrc} alt="Logo" width="180" sx={{ marginRight: 2 }} />
                        </Box>
                    )}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List>
                    {list1.map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => handleSelectItem(item.name)}
                            className={selectedItem === item.name ? "active" : ""}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                    className={selectedItem === item.name ? "active" : ""}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {/* <List>
                    {list2.map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => handleSelectItem(item.name)}
                            className={selectedItem === item.name ? "active" : ""}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                    className={selectedItem === item.name ? "active" : ""}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))} */}
                {/* Upgrade now  */}
                {/* <div className="component-library">
                        <div className="items">
                            <CustomButton
                                label={"Upgrage Now"}
                                isElevated
                                handleClick={() => handleOpen(true)}
                            />
                            <CustomModal
                                conditionOpen={handleOpen}
                                isOpen={openDialog}
                                title={"Upgrade your plan"}
                                subtitle={"14"}
                                footer={
                                    <Fragment>
                                        <CustomButton
                                            label={"action 1"}
                                            handleClick={() => setOpenDialog(true)}
                                            isTransaprent
                                            isText
                                        />
                                        <CustomButton
                                            label={"action 2"}
                                            isTransaprent
                                            handleClick={() => setOpenDialog(false)}
                                            isText
                                        />
                                    </Fragment>
                                }
                            >
                                <Typography
                                    gutterBottom
                                    variant="h9"
                                    component="div"
                                    color="#787579"
                                    align="center"
                                >
                                    14 Days Free Trail
                                </Typography>
                                <Grid 
                                    container 
                                    spacing={5} 
                                    sx={{
                                        paddingLeft: "-20px",
                                        paddingRight: "-20px",
                                    }}
                                >
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Content1 />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Content2 />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Content3 />
                                    </Grid>
                                </Grid>
                            </CustomModal>
                        </div>
                    </div> */}
                {/* </List> */}
            </Drawer>
            {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
            <Box component="main" sx={{ flexGrow: 1, width: "80%" }}>
                <DrawerHeader />
                {children}
            </Box>

            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};
// sm={4.5} md={4}

CustomMenuDrawer.defaultProps = {
    headerLabel: "items",
    list1: ["item 1", "item 2", "item 3"],
    list2: ["item 1", "item 2", "item 3"],
    handleOnMenuSelect: () => {},
};

CustomMenuDrawer.propTypes = {
    headerLabel: PropTypes.string,
    list1: PropTypes.array,
    list2: PropTypes.array,
    children: PropTypes.node,
    handleOnMenuSelect: PropTypes.func,
};

export default CustomMenuDrawer;
