import React, { useState, Fragment, useEffect } from "react";
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
    useMediaQuery,
    SwipeableDrawer,
    Tooltip,
    Card,
    CardContent,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { ChevronLeft, ChevronRight, Menu as MenuIcon } from "@mui/icons-material";

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
const closedDrawerWidth = 80; // Closed/minimized drawer width
const mobileDrawerWidth = 280;

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
    width: `calc(${theme.spacing(10)} + 1px)`, // 80px = 10 * 8 - 0 + 1
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(10)} + 1px)`, // Consistent: 80px
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    minHeight: "64px", // Minimized to reduce spacing below navbar
    // necessary for content to be below app bar
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    // FIXED: AppBar should adjust based on drawer state
    ...(open && {
        marginLeft: drawerWidth, // 270px when open
        width: `calc(100% - ${drawerWidth}px)`,
    }),
    ...(!open && {
        marginLeft: closedDrawerWidth, // 80px when closed
        width: `calc(100% - ${closedDrawerWidth}px)`,
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

/**
 * CustomMenuDrawer Component
 * 
 * Provides a responsive drawer navigation layout with:
 * - Sidebar navigation drawer
 * - Top AppBar with search and profile controls
 * - Responsive mobile/desktop layouts
 * - Persistent drawer state
 * 
 * @param {Array} list1 - Primary menu items
 * @param {Array} list2 - Secondary menu items (optional)
 * @param {ReactNode} children - Content to render in main area
 * @param {Function} handleOnMenuSelect - Handler for menu item selection
 * @param {string} profilepath - Profile navigation path
 */
const CustomMenuDrawer = ({ 
    list1 = ["item 1", "item 2", "item 3"], 
    list2 = ["item 1", "item 2", "item 3"], 
    children, 
    handleOnMenuSelect = () => {}, 
    profilepath 
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    
    // Responsive breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    
    // State management
    // FIXED: Initialize drawer as closed on desktop to match the content margin logic
    const [open, setOpen] = useState(false); // Start closed so content margin is properly applied
    const [selectedItem, setSeletedItem] = useState(list1[0].name);
    const [mobileOpen, setMobileOpen] = useState(false);
    
    // Update drawer state based on screen size
    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        } else {
            // Desktop: Drawer starts closed to avoid content overlap
            // User can toggle it open if needed
            setOpen(false);
        }
    }, [isMobile]);
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
        if (isMobile) {
            setMobileOpen(true);
        } else {
            setOpen(true);
        }
    };

    const handleDrawerClose = () => {
        if (isMobile) {
            setMobileOpen(false);
        } else {
            setOpen(false);
        }
    };

    const handleMobileDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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
    console.log("🔵 CustomMenuDrawer - Current state:", { open, isMobile, mobileOpen });
    
    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ 
                    backgroundColor: "#ffff",
                    minHeight: { xs: "48px", sm: "56px" },
                    padding: { xs: "0 8px", sm: "0 16px" }
                }}>
                    {/* Mobile Menu Button */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleMobileDrawerToggle}
                        edge="start"
                        sx={{
                            marginRight: 2,
                            display: { xs: "flex", md: "none" },
                            color: "#333"
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Desktop Menu Toggle Button */}
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        onClick={() => setOpen(!open)}
                        edge="start"
                        sx={{
                            marginRight: 2,
                            display: { xs: "none", md: "flex" },
                            color: "#333",
                            ...(open && { display: "none" })
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Desktop Logo Button - Only show when drawer is closed */}
                    <Box
                        sx={{
                            display: { xs: "none", md: !open ? "flex" : "none" },
                            alignItems: "center",
                            marginRight: 5,
                            cursor: "pointer",
                        }}
                        onClick={() => setOpen(true)}
                        edge="start"
                    >
                        <Box>
                            <img src={icon} alt="Logo" width="40" padding=" 2px 1px" />
                        </Box>
                    </Box>

                    {/* Mobile Logo */}
                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                            alignItems: "center",
                            marginRight: 2,
                        }}
                    >
                        <img src={icon} alt="Logo" width="32" />
                    </Box>
                    {/* //fromhere */}

                    {/* Search and Location Container */}
                    <Box
                        id="location-search-container"
                        sx={{
                            display: { xs: "none", sm: "flex" },
                            alignItems: "center",
                            flexGrow: { xs: 0, sm: 1 },
                            justifyContent: { xs: "flex-end", sm: "flex-start" },
                            marginLeft: { xs: 0, sm: 2 }
                        }}
                    >
                        <Box sx={{ marginRight: { xs: 1, sm: 2 } }}>
                            <LocationModal />
                        </Box>
                        <SearchBarModal />
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />
                    
                    {/* Desktop Header Actions */}
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Notificationmenu />
                        <Profilemenu profilepath={profilepath} />
                    </Box>

                    {/* Mobile Header Actions */}
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <Notificationmenu />
                        <Profilemenu profilepath={profilepath} />
                    </Box>
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

                    {/* till here */}
                </Toolbar>
            </AppBar>
            
            {/* Desktop Drawer */}
            <Drawer 
                variant={isMobile ? "temporary" : "permanent"} 
                open={isMobile ? mobileOpen : open}
                onClose={isMobile ? handleDrawerClose : undefined}
                ModalProps={isMobile ? { keepMounted: true } : undefined}
                sx={{
                    display: { xs: "none", md: "block" },
                    // CRITICAL: Don't override position or width
                    // Let the styled Drawer component handle width transitions
                    // based on the 'open' prop via openedMixin/closedMixin
                }}
            >
                <DrawerHeader>
                    {open && (
                        <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            flexGrow: 1,
                            transition: "opacity 0.3s ease"
                        }}>
                            <img src={logoSrc} alt="Logo" width="180" sx={{ marginRight: 2 }} />
                        </Box>
                    )}
                    <IconButton 
                        onClick={() => setOpen(!open)}  // Fixed: Toggle open state
                        sx={{
                            transition: "transform 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.1)",
                                backgroundColor: "rgba(0, 0, 0, 0.04)"
                            }
                        }}
                        title={open ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {/* FIXED: Show correct chevron based on drawer state */}
                        {open ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List>
                    {list1.map((item, index) => (
                        <Tooltip 
                            title={!open ? item.name : ""} 
                            placement="right"
                            arrow
                            key={index}
                        >
                            <ListItem
                                disablePadding
                                sx={{ display: "block" }}
                                onClick={() => handleSelectItem(item.name)}
                                className={selectedItem === item.name ? "active" : ""}
                            >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: open ? 2.5 : 1.5,
                                    mx: 1,
                                    borderRadius: 2,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        transform: "translateX(4px)"
                                    },
                                    "&.Mui-selected": {
                                        backgroundColor: "rgba(25, 118, 210, 0.08)",
                                        "&:hover": {
                                            backgroundColor: "rgba(25, 118, 210, 0.12)"
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 0,
                                        justifyContent: "center",
                                        transition: "margin 0.3s ease"
                                    }}
                                    className={selectedItem === item.name ? "active" : ""}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.name} 
                                    sx={{ 
                                        opacity: open ? 1 : 0,
                                        transition: "opacity 0.3s ease",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden"
                                    }} 
                                />
                            </ListItemButton>
                            </ListItem>
                        </Tooltip>
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

            {/* Mobile Drawer */}
            <SwipeableDrawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: mobileDrawerWidth,
                        backgroundColor: "#fafafa",
                    },
                }}
            >
                <DrawerHeader>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <img src={logoSrc} alt="Logo" width="180" sx={{ marginRight: 2 }} />
                    </Box>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeft />
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List>
                    {list1.map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => {
                                handleSelectItem(item.name);
                                if (isMobile) {
                                    handleDrawerClose();
                                }
                            }}
                            className={selectedItem === item.name ? "active" : ""}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: "initial",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 3,
                                        justifyContent: "center",
                                    }}
                                    className={selectedItem === item.name ? "active" : ""}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} sx={{ opacity: 1 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </SwipeableDrawer>
            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    width: "100%",
                    // CRITICAL: Force margin-left with !important to override global styles
                    // This ensures content shifts when drawer opens/closes
                    marginLeft: `${open ? drawerWidth : closedDrawerWidth}px !important`,
                    transition: theme.transitions.create(["margin", "width"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    minHeight: "100vh",
                    backgroundColor: "#f5f5f5", // Light gray background
                    position: "relative",
                    zIndex: 1,
                    padding: { 
                        xs: "16px",     // Increased padding for card spacing
                        sm: "20px",     // Increased padding for card spacing
                        md: "24px",     // Increased padding for card spacing
                        lg: "28px"      // Increased padding for card spacing
                    },
                    marginTop: { xs: "48px", sm: "56px" }
                }}
            >
                <DrawerHeader />
                {/* Card wrapper for all content */}
                <Card 
                    sx={{ 
                        minHeight: "calc(100vh - 120px)",
                        maxHeight: "calc(100vh - 120px)", // Prevent exceeding viewport
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        backgroundColor: "#ffffff",
                        width: "100%", // Ensure card takes full width
                        boxSizing: "border-box", // Include padding in width calculation
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden" // Prevent card itself from scrolling
                    }}
                >
                    <CardContent 
                        sx={{ 
                            padding: { xs: 2, sm: 3, md: 4 },
                            width: "100%", // Full width of card
                            boxSizing: "border-box", // Include padding in width
                            flex: 1,
                            overflowY: "auto", // Enable vertical scrolling for content
                            overflowX: "hidden", // Prevent horizontal scrolling
                            "&::-webkit-scrollbar": {
                                width: "8px",
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "#f1f1f1",
                                borderRadius: "4px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#c1c1c1",
                                borderRadius: "4px",
                                "&:hover": {
                                    backgroundColor: "#a8a8a8",
                                },
                            },
                        }}
                    >
                        {children}
                    </CardContent>
                </Card>
            </Box>

            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};
// sm={4.5} md={4}

// PropTypes validation
CustomMenuDrawer.propTypes = {
    headerLabel: PropTypes.string,
    list1: PropTypes.array,
    list2: PropTypes.array,
    children: PropTypes.node,
    handleOnMenuSelect: PropTypes.func,
    profilepath: PropTypes.string,
};

export default CustomMenuDrawer;
