import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
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
    onClose: PropTypes.func.isRequired,
};

const CustomModal = ({ conditionOpen, isOpen, title, footer, children }) => {
    const [open, setOpen] = useState(isOpen);

    const handleClose = () => {
        setOpen(!open);
        // conditionOpen(false);
    };

    useEffect(() => setOpen(isOpen), [isOpen]);

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={() => handleClose(false)}
                >
                    {title}
                </BootstrapDialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>{footer}</DialogActions>
            </BootstrapDialog>
        </div>
    );
};

CustomModal.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    footer: PropTypes.node,
    conditionOpen: PropTypes.node,
};

export default CustomModal;
