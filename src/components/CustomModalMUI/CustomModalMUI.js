import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';

const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const CustomModalMUI = ({
    label = "Open Modal",
    modalCss = style,
    leftIcon,
    rightIcon,
    modalcontent,
    modaltitle,
}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpen} startIcon={leftIcon} endIcon={rightIcon}>
                {label}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={modalCss}>
                    <h2 id="parent-modal-title">{modaltitle}</h2>
                    {modalcontent}
                </Box>
            </Modal>
        </>
    );
};

export default CustomModalMUI;
