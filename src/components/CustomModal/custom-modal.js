import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        borderRadius: "16px",
        boxShadow: "0 24px 48px rgba(0, 0, 0, 0.15)",
        maxWidth: "50vw",
        maxHeight: "90vh",
        margin: "24px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backgroundColor: "#ffffff",
        "&.patient-details-modal": {
            maxWidth: "800px",
            width: "90vw",
        },
    },
    "& .MuiDialogContent-root": {
        padding: 0,
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#ffffff",
        "&.patient-details-content": {
            padding: theme.spacing(0),
        },
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(2, 3),
        gap: theme.spacing(1),
    },
    "& .MuiBackdrop-root": {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
    }
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
    const isReactNode = React.isValidElement(children) || (children && typeof children === 'object');

    return (
        <DialogTitle 
            sx={{ 
                m: 0, 
                p: 0,
                fontFamily: "Poppins, sans-serif",
                position: "relative",
                borderBottom: isReactNode ? "none" : "1px solid #f0f0f0",
            }} 
            {...other}
        >
            {isReactNode ? (
                children
            ) : (
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        fontWeight: 600,
                        fontSize: "20px",
                        color: "#333",
                        padding: "24px",
                        paddingBottom: "16px",
                    }}
                >
                    {children}
                </Typography>
            )}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 16,
                        top: 16,
                        color: "#666",
                        backgroundColor: "#f5f5f5",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            backgroundColor: "#e0e0e0",
                            color: "#333",
                            transform: "scale(1.1)",
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
};

const CustomModal = ({ 
    conditionOpen, 
    isOpen, 
    title, 
    footer, 
    children, 
    class_name, 
    disableBackdropClick, 
    maxWidth = "md",
    fullWidth = true
}) => {
    const handleClose = () => {
        if (conditionOpen) {
            conditionOpen(false);
        }
    };

    const handleBackdropClick = (event) => {
        if (disableBackdropClick) {
            event.stopPropagation();
        }
    };

    return (
        <div className={class_name}>
            <BootstrapDialog
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' || !disableBackdropClick) {
                        handleClose();
                    }
                }}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                onBackdropClick={handleBackdropClick}
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                PaperProps={{
                    className: class_name?.includes('patient-details') ? 'patient-details-modal' : '',
                }}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {title}
                </BootstrapDialogTitle>
                <DialogContent 
                    className={class_name?.includes('patient-details') ? 'patient-details-content' : ''}
                    sx={{
                        padding: class_name?.includes('patient-details') ? 0 : undefined,
                        backgroundColor: "#ffffff",
                    }}
                >
                    {children}
                </DialogContent>
                {footer && <DialogActions>{footer}</DialogActions>}
            </BootstrapDialog>
        </div>
    );
};

CustomModal.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    footer: PropTypes.node,
    conditionOpen: PropTypes.func,
    class_name: PropTypes.string,
    disableBackdropClick: PropTypes.bool,
    maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    fullWidth: PropTypes.bool,
};

export default CustomModal;