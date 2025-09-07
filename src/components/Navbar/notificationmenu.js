import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, IconButton, Link } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

const notificationmenu = () => {
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
                <Link to={"profile"}>Profile logo</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <LocalAtmIcon />
                Payment
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <LogoutIcon />
                Log Out
            </MenuItem>
        </Menu>
    );

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="#AEAAAE"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
            >
                <Badge badgeContent={3} color="error">
                    <NotificationsIcon sx={{ color: "#AEAAAE" }} />
                </Badge>
            </IconButton>

            {renderMenu}
        </Box>
    );
};

export default notificationmenu;
