import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import CustomButton from "../../../../components/CustomButton/custom-button";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import CircularProgress from "@mui/material/CircularProgress"; // 👈 Import spinner

const steps = ["Review"];

export const LeaveAReview = (pid, aid, did) => {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [giveReview, setGiveReview] = useState({
        patient_id: pid.pid,
        doctor_id: pid.did,
        appointment_id: pid.aid,
        description: "",
        review_type: 2.5,
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        type: "",
        message: "",
    });

    const handleSubmit = async () => {
        if (!giveReview.description) {
            setSnackbar({
                open: true,
                type: "error",
                message: "Comment is required.",
            });
            return;
        }

        const payload = {
            ...giveReview,
            review_type: giveReview.review_type.toString(),
        };

        try {
            setLoading(true); // 👈 start loading
            const response = await axiosInstance.post("/sec/patient/LeaveReview", payload);

            if (response.status === 200) {
                setSnackbar({
                    open: true,
                    type: "success",
                    message: response.data.body || "Review submitted successfully.",
                });
                setActiveStep((prev) => prev + 1);
            } else {
                setSnackbar({
                    open: true,
                    type: "error",
                    message: "Failed to submit review.",
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                type: "error",
                message: "Network error. Please try again later.",
            });
        } finally {
            setLoading(false); // 👈 stop loading
        }
    };


    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length ? (
                <Typography sx={{ mt: 2 }}>Thank you for your review!</Typography>
            ) : (
                <Box sx={{ mt: 2, width: "29vw", display: "flex", flexDirection: "column" }}>
                    <Typography
                        sx={{
                            color: "#313033",
                            textAlign: "center",
                            fontFamily: "Poppins",
                            fontSize: "1.25rem",
                            fontWeight: "500",
                        }}
                    >
                        Review The Doctor
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            color: "#484649",
                            textAlign: "center",
                        }}
                    >
                        Please provide review
                    </Typography>

                    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                        <Rating
                            name="rating"
                            value={Number(giveReview.review_type)}
                            precision={0.5}
                            onChange={(e, newValue) =>
                                setGiveReview({ ...giveReview, review_type: newValue })
                            }
                            sx={{ color: "#E72B4A" }}
                        />
                    </Box>

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
                            onChange={(e) =>
                                setGiveReview({ ...giveReview, description: e.target.value })
                            }
                            sx={{
                                mt: 1,
                                border: "1px solid #E6E1E5",
                                fontFamily: "Poppins",
                            }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <CustomButton
                            label={loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
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

            <CustomSnackBar
                isOpen={snackbar.open}
                message={snackbar.message}
                hideDuration={6000}
                type={snackbar.type}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Box>
    );
};
