import { Box } from "@mui/material";
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/custom-button";
import CustomModal from "../CustomModal/custom-modal";
import AppointmentSlider from "./appointmentSlider";
import logger from "../../utils/logger"; // Centralized logging
import toastService from "../../services/toastService"; // Toast notifications

/**
 * Book Appointment Modal Component
 * 
 * Provides a modal wrapper for booking appointments
 * - Opens appointment booking flow in a modal
 * - Manages modal open/close state
 * - Wraps AppointmentSlider component
 * 
 * Features:
 * - Modal dialog for appointment booking
 * - Clean UI with centered content
 * - Accessible modal implementation
 * 
 * @component
 */
const BookAppointmentModal = () => {
    logger.debug("🔵 BookAppointmentModal component rendering");
    
    const navigate = useNavigate();
    
    /**
     * Modal open/close state
     * Controls visibility of the appointment booking modal
     */
    const [openDialog, setOpenDialog] = useState(false);
    
    /**
     * Handle modal open
     * Opens the appointment booking modal
     */
    const handleOpenModal = () => {
        logger.debug("📅 Opening appointment booking modal");
        setOpenDialog(true);
        toastService.info("Opening appointment booking...");
    };
    
    /**
     * Handle modal close
     * Closes the appointment booking modal and resets state
     */
    const handleCloseModal = () => {
        logger.debug("❌ Closing appointment booking modal");
        setOpenDialog(false);
    };

    // Removed unused makeStyles - using sx prop instead for MUI v5 compatibility
    // Removed unused styles object - not being used anywhere in the component

    return (
        <Box sx={{ width: "100%" }}>
            {/* Book Appointment Button - Triggers modal */}
            <CustomButton
                label="Book Appointment"
                isElevated
                handleClick={handleOpenModal}
                buttonCss={{
                    backgroundColor: "#E72B4A", // Primary brand color
                    color: "#ffffff",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontWeight: 500,
                    "&:hover": {
                        backgroundColor: "#c62828",
                    },
                }}
            />
            
            {/* Appointment Booking Modal */}
            <CustomModal
                isOpen={openDialog}
                conditionOpen={setOpenDialog}
                title="Book Appointment"
                maxWidth="md"
                footer={
                    <Fragment>
                        {/* Footer content - currently empty but structured for future use */}
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* Footer buttons can be added here in the future */}
                        </Box>
                    </Fragment>
                }
            >
                {/* Appointment Slider Component - Handles the multi-step appointment booking flow */}
                <Box>
                    <AppointmentSlider />
                </Box>
            </CustomModal>
        </Box>
    );
};

// PropTypes for component documentation
BookAppointmentModal.propTypes = {
    // This component doesn't accept props currently, but structure is ready
};

export default BookAppointmentModal;
