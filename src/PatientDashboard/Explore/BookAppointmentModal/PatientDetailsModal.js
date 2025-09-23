import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/custom-button";
import BookAppointmentModal from "../../DrDetailsCard/BookingAppointmentModal";

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }
// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }
const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        position: "absolute",
        width: 450,
        borderRadius: "8px",
        background: "#fff",
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
        // backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    ButtonContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    modalMainContainer: {
        width: "100%",
    },
}));

const PatientDetailsModal = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    // const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [DateValue, setDataValue] = useState(null);
    console.log(DateValue);

    return (
        <>
            <Box
                sx={{ diplay: "flex", width: "100%", justifyContent: "flex-end" }}
                onClick={handleOpen}
            >
                <CustomButton
                    component={"h3"}
                    // buttonCss={{ color : "green"}}
                    buttonCss={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        // lineHeight : "24px",
                        width: "70%",
                    }}
                    label="Next"
                ></CustomButton>
            </Box>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate( -50% , -50% )",
                    }}
                    className={classes.paper}
                >
                    {/* back button and X button */}
                    <Box className={classes.modalMainContainer}>
                        <Box className={classes.ButtonContainer}>
                            <Button
                                onClick={() => {
                                    navigate(<BookAppointmentModal />);
                                    handleClose();
                                }}
                                sx={{ color: "black" }}
                                startIcon={<KeyboardBackspaceIcon />}
                            ></Button>
                            <Button
                                onClick={() => handleClose()}
                                sx={{ color: "black" }}
                                startIcon={<CloseIcon />}
                            ></Button>
                        </Box>
                        <Box>Patient Details</Box>
                    </Box>

                    <Box>
                        <Button>Continue</Button>
                    </Box>
                </div>
            </Modal>
        </>
    );
};

export default PatientDetailsModal;
