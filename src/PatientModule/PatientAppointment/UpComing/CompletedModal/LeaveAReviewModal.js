import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import CustomButton from "../../../../components/CustomButton/custom-button";
import axiosInstance from "../../../../config/axiosInstance"; // Handles access token automatically
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications
import Loading from "../../../../components/Loading/Loading"; // Reusable loader component

const steps = ["Review"];

/**
 * LeaveAReview Component
 * 
 * Modal component for leaving a review after appointment completion
 * Features:
 * - Star rating (0.5 precision)
 * - Comment text field
 * - Submit review to backend
 * - Success confirmation
 * 
 * @param {Object} props - Component props
 * @param {string|number} props.pid - Patient ID
 * @param {string|number} props.aid - Appointment ID
 * @param {string|number} props.did - Doctor ID
 * 
 * @component
 */
export const LeaveAReview = ({ pid, aid, did }) => {
    logger.debug("🔵 LeaveAReview component rendering", { 
        patient_id: pid,
        appointment_id: aid,
        doctor_id: did 
    });
    
    // Stepper state
    const [activeStep, setActiveStep] = useState(0);
    
    // Loading state
    const [loading, setLoading] = useState(false);
    
    // Review form data
    const [giveReview, setGiveReview] = useState({
        patient_id: pid,
        doctor_id: did,
        appointment_id: aid,
        description: "",
        review_type: 2.5, // Default rating: 2.5 stars
    });

    /**
     * Handle review submission
     * Validates form data and submits review to backend
     */
    const handleSubmit = async () => {
        logger.debug("📝 Submitting review", { 
            appointment_id: aid,
            rating: giveReview.review_type 
        });
        
        // Validate comment is provided
        if (!giveReview.description || giveReview.description.trim() === "") {
            logger.warn("⚠️ Review comment is missing");
            toastService.error("Comment is required");
            return;
        }

        // Validate IDs are present
        if (!giveReview.patient_id || !giveReview.doctor_id || !giveReview.appointment_id) {
            logger.error("❌ Missing required IDs for review", giveReview);
            toastService.error("Missing required information");
            return;
        }

        const payload = {
            ...giveReview,
            review_type: giveReview.review_type.toString(), // Convert to string for API
        };

        setLoading(true);

        try {
            const response = await axiosInstance.post("/sec/patient/LeaveReview", payload);

            if (response.status === 200) {
                logger.debug("✅ Review submitted successfully", { 
                    appointment_id: aid 
                });
                
                toastService.success(
                    response.data.body || "Review submitted successfully"
                );
                setActiveStep((prev) => prev + 1);
            } else {
                logger.error("❌ Unexpected response status", { 
                    status: response.status 
                });
                toastService.error("Failed to submit review");
            }
        } catch (error) {
            logger.error("❌ Failed to submit review:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Network error. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {/* Loading overlay */}
            {loading && <Loading />}
            
            {/* Stepper component */}
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Success screen - shown after submission */}
            {activeStep === steps.length ? (
                <Typography 
                    sx={{ 
                        mt: 2,
                        textAlign: "center",
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        fontWeight: "500",
                        color: "#313033", // Common color: #313033
                    }}
                >
                    Thank you for your review!
                </Typography>
            ) : (
                /* Review form */
                <Box sx={{ mt: 2, width: "29vw", display: "flex", flexDirection: "column" }}>
                    {/* Title */}
                    <Typography
                        sx={{
                            color: "#313033", // Common color: #313033
                            textAlign: "center",
                            fontFamily: "Poppins",
                            fontSize: "1.25rem",
                            fontWeight: "500",
                        }}
                    >
                        Review The Doctor
                    </Typography>
                    
                    {/* Subtitle */}
                    <Typography
                        sx={{
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            color: "#484649", // Common color variant
                            textAlign: "center",
                        }}
                    >
                        Please provide review
                    </Typography>

                    {/* Star rating */}
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                        <Rating
                            name="rating"
                            value={Number(giveReview.review_type)}
                            precision={0.5}
                            onChange={(e, newValue) => {
                                logger.debug("⭐ Rating changed", { newValue });
                                setGiveReview({ ...giveReview, review_type: newValue || 0 });
                            }}
                            sx={{ color: "#E72B4A" }} // Primary brand color
                        />
                    </Box>

                    {/* Comment text field */}
                    <Box sx={{ mt: 4 }}>
                        <Typography sx={{ fontFamily: "Poppins", fontWeight: "500" }}>
                            Comment
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Write your Comment here"
                            multiline
                            rows={3}
                            value={giveReview.description}
                            onChange={(e) => {
                                setGiveReview({ ...giveReview, description: e.target.value });
                            }}
                            sx={{
                                mt: 1,
                                border: "1px solid #E6E1E5", // Common border color
                                fontFamily: "Poppins",
                            }}
                        />
                    </Box>

                    {/* Submit button */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <CustomButton
                            label={loading ? "Submitting..." : "Submit"}
                            handleClick={handleSubmit}
                            disabled={loading}
                            buttonCss={{
                                width: "10.625rem",
                                height: "3rem",
                                borderRadius: "6.25rem",
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

// PropTypes for type checking
LeaveAReview.propTypes = {
    pid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    aid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    did: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
