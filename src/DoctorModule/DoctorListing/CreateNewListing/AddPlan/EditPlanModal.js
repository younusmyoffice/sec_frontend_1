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
    const [isLoadingPlanData, setIsLoadingPlanData] = useState(false);
    const [renderKey, setRenderKey] = useState(0);

    const dropdownItems = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes"];

    // Fetch plan data when modal opens
    const fetchPlanData = async (planId) => {
        setIsLoadingPlanData(true);
        try {
            console.log("EditPlanModal - Fetching plan data for ID:", planId);
            const response = await axiosInstance.get(`/sec/createUpdatedoctorlisting/planById/${planId}`);
            
            console.log("EditPlanModal - API Response:", response.data);
            const planData = response.data.response?.DocListingPlan?.[0];
            if (planData) {
                const plan = planData;
                
                console.log("EditPlanModal - Plan data received:", plan);
                console.log("EditPlanModal - plan.plan_name:", plan?.plan_name);
                console.log("EditPlanModal - plan.plan_fee:", plan?.plan_fee);
                console.log("EditPlanModal - plan.plan_duration:", plan?.plan_duration);
                console.log("EditPlanModal - plan.plan_description:", plan?.plan_description);
                
                // Keep the full duration format (e.g., "30 minutes")
                const duration = plan?.plan_duration || "";
                const newFormData = {
                    plan_name: plan?.plan_name || "",
                    plan_fee: plan?.plan_fee || "",
                    plan_duration: duration,
                    plan_description: plan?.plan_description || ""
                };
                
                console.log("EditPlanModal - Setting form data to:", newFormData);
                setFormData(newFormData);
                // Force re-render by updating render key
                setRenderKey(prev => prev + 1);
            } else {
                console.error("EditPlanModal - No plan data found in response");
                setSnackMessage("Failed to load plan data");
                setSnackType("error");
                setSnackOpen(true);
            }
        } catch (error) {
            console.error("EditPlanModal - Error fetching plan data:", error);
            setSnackMessage("Failed to load plan data");
            setSnackType("error");
            setSnackOpen(true);
        } finally {
            setIsLoadingPlanData(false);
        }
    };

    useEffect(() => {
        console.log("EditPlanModal - useEffect triggered, isOpen:", isOpen, "planData:", planData);
        
        if (planData && isOpen) {
            // Extract plan ID from planData
            const planId = planData?.doctor_fee_plan_id || planData?.plan_id;
            console.log("EditPlanModal - Plan ID extracted:", planId);
            
            if (planId) {
                fetchPlanData(planId);
            } else {
                console.error("EditPlanModal - No plan ID found in planData");
                setSnackMessage("No plan ID found");
                setSnackType("error");
                setSnackOpen(true);
            }
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

    console.log("EditPlanModal - Rendering modal, isOpen:", isOpen);
    console.log("EditPlanModal - Current formData:", formData);
    console.log("EditPlanModal - isLoadingPlanData:", isLoadingPlanData);
    
    return (
        <>
            <CustomSnackBar isOpen={snackOpen} message={snackMessage} type={snackType} />
            
            <CustomModal
                isOpen={isOpen}
                onClose={handleClose}
                disableBackdropClick={loading}
                style={{ zIndex: 9999 }}
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
                            disabled={loading || isLoadingPlanData}
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
                            disabled={loading || isLoadingPlanData}
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
                    {isLoadingPlanData ? (
                        <div style={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            height: "200px",
                            flexDirection: "column",
                            gap: "16px"
                        }}>
                            <CircularProgress size={40} />
                            <Typography variant="body1" fontFamily="poppins">
                                Loading plan data...
                            </Typography>
                        </div>
                    ) : (
                        <div key={renderKey}>
                            {console.log("EditPlanModal - Rendering form with data:", formData, "renderKey:", renderKey)}
                            <div style={{ marginBottom: "20px" }}>
                                <CustomTextField
                                    key={`plan_name_${formData.plan_name}_${renderKey}`}
                                    label="Plan Name"
                                    CustomValue={formData.plan_name || ""}
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
                                    key={`plan_fee_${formData.plan_fee}_${renderKey}`}
                                    label="Plan Fee"
                                    type="number"
                                    CustomValue={formData.plan_fee || ""}
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
                                    key={`plan_duration_${formData.plan_duration}_${renderKey}`}
                                    label="Duration (minutes)"
                                    items={dropdownItems}
                                    activeItem={formData.plan_duration || ""}
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
                                    key={`plan_description_${formData.plan_description}_${renderKey}`}
                                    label="Plan Description"
                                    CustomValue={formData.plan_description || ""}
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
                    )}
                </div>
            </CustomModal>
        </>
    );
};

export default EditPlanModal;
