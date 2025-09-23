import React, { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomTextField from "../../../../components/CustomTextField";
import CustomDropdown from "../../../../components/CustomDropdown";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import "./addplan.scss";

const EditPlanModal = ({
    isOpen,
    onClose,
    planData,
    onPlanUpdated,
}) => {
    const [formData, setFormData] = useState({
        plan_name: "",
        plan_fee: "",
        plan_duration: "",
        plan_description: ""
    });
    const [loading, setLoading] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState("success");

    const dropdownItems = ["15", "30", "45", "60", "90"];

    useEffect(() => {
        if (planData && isOpen) {
            // The planData comes directly from the allPlan array, not wrapped in DocListingPlan
            const plan = planData;
            
            // Extract duration number from "30 minutes" format
            const duration = plan?.plan_duration ? 
                plan.plan_duration.replace(/\s*minutes?/i, '') : "";
            
            setFormData({
                plan_name: plan?.plan_name || "",
                plan_fee: plan?.plan_fee || "",
                plan_duration: duration,
                plan_description: plan?.plan_description || ""
            });
            
            console.log("EditPlanModal - Plan data received:", planData);
            console.log("EditPlanModal - Plan data keys:", Object.keys(planData || {}));
            console.log("EditPlanModal - Raw plan_duration:", plan?.plan_duration);
            console.log("EditPlanModal - Form data set:", {
                plan_name: plan?.plan_name || "",
                plan_fee: plan?.plan_fee || "",
                plan_duration: duration,
                plan_description: plan?.plan_description || ""
            });
        }
    }, [planData, isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.plan_name || !formData.plan_fee || !formData.plan_duration) {
            setSnackMessage("Please fill in all required fields");
            setSnackType("error");
            setSnackOpen(true);
            return;
        }

        setLoading(true);
        try {
            // The planData comes directly from the allPlan array
            const plan = planData;
            
            const payload = {
                doctor_id: parseInt(plan?.doctor_id),
                doctor_list_id: parseInt(plan?.doctor_list_id),
                doctor_fee_plan_id: parseInt(plan?.doctor_fee_plan_id),
                plan_name: formData.plan_name,
                plan_fee: parseFloat(formData.plan_fee),
                plan_duration: formData.plan_duration,
                plan_description: formData.plan_description
            };

            console.log("Updating plan with payload:", payload);

            const response = await axiosInstance.post(
                "/sec/createUpdatedoctorlisting/planUpdate",
                payload
            );

            setSnackMessage(response?.data?.response?.message || "Plan updated successfully");
            setSnackType("success");
            setSnackOpen(true);
            
            // Call the callback to refresh the plans list
            if (onPlanUpdated) {
                onPlanUpdated();
            }
            
            // Close the modal after a short delay
            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            console.error("Error updating plan:", error);
            setSnackMessage(error?.response?.data?.error || "Failed to update plan");
            setSnackType("error");
            setSnackOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    return (
        <>
            <CustomSnackBar isOpen={snackOpen} message={snackMessage} type={snackType} />
            
            <CustomModal
                isOpen={isOpen}
                onClose={handleClose}
                disableBackdropClick={loading}
                title={
                    <Typography variant="h6" fontFamily="poppins" fontWeight="500">
                        Edit Plan
                    </Typography>
                }
                footer={
                    <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                        <CustomButton
                            label="Cancel"
                            isTransaprent={true}
                            handleClick={handleClose}
                            disabled={loading}
                            buttonCss={{
                                border: "1px solid #E72B4A",
                                color: "#E72B4A",
                                fontFamily: "poppins",
                                fontSize: "16px",
                                fontWeight: "500"
                            }}
                        />
                        <CustomButton
                            label={loading ? "Updating..." : "Update Plan"}
                            handleClick={handleSubmit}
                            disabled={loading}
                            buttonCss={{
                                backgroundColor: "#E72B4A",
                                color: "white",
                                fontFamily: "poppins",
                                fontSize: "16px",
                                fontWeight: "500",
                                "&:hover": {
                                    backgroundColor: "#d61e3f"
                                }
                            }}
                        />
                    </div>
                }
            >
                <div style={{ padding: "20px", minWidth: "400px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <CustomTextField
                            label="Plan Name"
                            value={formData.plan_name}
                            onChange={(e) => handleInputChange('plan_name', e.target.value)}
                            textcss={{
                                width: "100%",
                                height: "56px",
                                fontFamily: "poppins",
                                fontSize: "16px"
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <CustomTextField
                            label="Plan Fee"
                            type="number"
                            value={formData.plan_fee}
                            onChange={(e) => handleInputChange('plan_fee', e.target.value)}
                            textcss={{
                                width: "100%",
                                height: "56px",
                                fontFamily: "poppins",
                                fontSize: "16px"
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <CustomDropdown
                            label="Duration (minutes)"
                            items={dropdownItems}
                            activeItem={formData.plan_duration}
                            handleChange={(value) => handleInputChange('plan_duration', value)}
                            dropdowncss={{
                                width: "100%",
                                height: "56px",
                                fontFamily: "poppins",
                                fontSize: "16px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <CustomTextField
                            label="Plan Description"
                            value={formData.plan_description}
                            onChange={(e) => handleInputChange('plan_description', e.target.value)}
                            multiline
                            rows={3}
                            textcss={{
                                width: "100%",
                                fontFamily: "poppins",
                                fontSize: "16px"
                            }}
                        />
                    </div>

                    {loading && (
                        <div style={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            marginTop: "20px" 
                        }}>
                            <CircularProgress size={24} />
                            <Typography style={{ marginLeft: "12px", fontFamily: "poppins" }}>
                                Updating plan...
                            </Typography>
                        </div>
                    )}
                </div>
            </CustomModal>
        </>
    );
};

export default EditPlanModal;
