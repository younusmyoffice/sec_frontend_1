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

const profilemenu = () => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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

    const HandleLogout = () => {
        console.log(Authentication);
        Authentication.LogoutPatient();
        Authentication.LogoutDoctor();
        Authentication.LoginHcf();
        Cookies.remove("token");
        Cookies.remove("patientEmail");
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
                {" "}
                <AccountCircle />
                {/* <Link to={'/patientdashboard/dashboard/profile'} >Profile logo!!!</Link> */}
                <Button onClick={() => navigate("/patientdashboard/dashboard/profile")}>
                    Profile
                </Button>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <LocalAtmIcon />
                Payment
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Box component={"span"} onClick={HandleLogout}>
                    <LogoutIcon />
                    Log Out
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
                <AccountCircle sx={{ backgroundColor: "#AEAAAE" }} />
            </IconButton>

            {renderMenu}
        </Box>
    );
};

export default profilemenu;
