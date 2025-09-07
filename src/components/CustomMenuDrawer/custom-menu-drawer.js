import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
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
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

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

const CustomMenuDrawer = ({ headerLabel, list1, list2, children, handleOnMenuSelect }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [selectedItem, setSeletedItem] = useState(list1[0].name);

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

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
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
                        <img src="images/icon.png" alt="Logo" width="40" />
                    </Box>
                    {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <Menu />
                    </IconButton> */}

                    <Typography variant="h6" noWrap component="div">
                        {headerLabel}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    {open && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                                src="images/logo.png"
                                alt="Logo"
                                width="180"
                                sx={{ marginRight: 2 }}
                            />
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
                <List>
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
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
};

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
