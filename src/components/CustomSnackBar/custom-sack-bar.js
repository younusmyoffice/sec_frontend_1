import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Snackbar, IconButton, Box, Alert, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

const CustomSnackBar = ({ 
    isOpen, 
    actionLabel, 
    handleAction, 
    message, 
    hideDuration = 5000, 
    type = "success",
    position = { vertical: "top", horizontal: "right" }
}) => {
    const [state, setState] = useState({
        open: isOpen,
        vertical: position.vertical,
        horizontal: position.horizontal,
    });
    const { vertical, horizontal, open } = state;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setState({ ...state, open: false });
    };

    useEffect(() => {
        setState({ ...state, open: isOpen });
    }, [isOpen]);

    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircleIcon sx={{ fontSize: 20 }} />;
            case "error":
                return <ErrorIcon sx={{ fontSize: 20 }} />;
            case "warning":
                return <WarningIcon sx={{ fontSize: 20 }} />;
            case "info":
                return <InfoIcon sx={{ fontSize: 20 }} />;
            default:
                return <CheckCircleIcon sx={{ fontSize: 20 }} />;
        }
    };

    const getSeverity = () => {
        switch (type) {
            case "success":
                return "success";
            case "error":
                return "error";
            case "warning":
                return "warning";
            case "info":
                return "info";
            default:
                return "success";
        }
    };

    const action = (
        <Fragment>
            {actionLabel && (
                <Button 
                    color="inherit" 
                    size="small" 
                    onClick={handleAction}
                    sx={{ 
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "12px"
                    }}
                >
                    {actionLabel}
                </Button>
            )}
            <IconButton 
                size="small" 
                aria-label="close" 
                color="inherit" 
                onClick={handleClose}
                sx={{ ml: 1 }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            autoHideDuration={hideDuration}
            TransitionComponent={SlideTransition}
            sx={{
                "& .MuiSnackbarContent-root": {
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                }
            }}
        >
            <Alert 
                severity={getSeverity()} 
                action={action}
                icon={getIcon()}
                sx={{
                    borderRadius: "12px",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    width: "100%",
                    "& .MuiAlert-message": {
                        flex: 1,
                    },
                    "& .MuiAlert-action": {
                        alignItems: "center",
                    }
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

CustomSnackBar.defaultProps = {
    isOpen: false,
    actionLabel: "",
    handleAction: () => {},
    message: "",
    hideDuration: 5000,
    type: "success",
    position: { vertical: "top", horizontal: "right" },
};

CustomSnackBar.propTypes = {
    isOpen: PropTypes.bool,
    actionLabel: PropTypes.string,
    handleAction: PropTypes.func,
    message: PropTypes.string,
    hideDuration: PropTypes.number,
    type: PropTypes.oneOf(["success", "error", "warning", "info"]),
    position: PropTypes.shape({
        vertical: PropTypes.oneOf(["top", "bottom"]),
        horizontal: PropTypes.oneOf(["left", "center", "right"]),
    }),
};

export default CustomSnackBar;
