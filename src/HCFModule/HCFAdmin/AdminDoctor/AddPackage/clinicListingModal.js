import React, { useState, useEffect, useCallback } from "react";
import { CircularProgress, Typography } from "@mui/material";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomTextField from "../../../../components/CustomTextField";
import CustomDropdown from "../../../../components/CustomDropdown";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import logger from "../../../../utils/logger"; // Centralized logging
import "./clinicListingModal.scss";

const clinicListingModal = ({
    RenderDataAfterAddingPlan,
    enableAdditionalButton,
    additionalButtonName,
    onAdditionalButtonClick,
    disableBackdropClick,
    saveButtonEnable = true,
    doctor_id = null, // Optional: doctor_id from parent (for HCF Admin flow)
    doctor_list_id = null, // Optional: doctor_list_id from parent (for HCF Admin flow)
}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [listingPayload, setListingPayload] = useState({ plan: [] });
    const [checkBoxIsDisable, setCheckBoxIsDisable] = useState({ message: false, video: false });
    const [planMessage, setPlanMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState({}); // { plan_name: { fee: msg|null, duration: msg|null } }

    const dropdownItems = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes"];
    const plansTemplate = (planType) => ({
        doctor_id: localStorage.getItem("doctor_suid"),
        doctor_list_id: localStorage.getItem("listing_id"),
        plan_name: planType,
        plan_description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} plan for ${planType}ing`,
    });

    /**
     * Template for creating clinic/HCF plan objects
     * FIXED: Now includes doctor_id and doctor_list_id if provided
     * 
     * @param {string} planType - Plan type ("message" or "video")
     * @param {number|null} fee - Plan fee
     * @param {string|null} duration - Plan duration
     * @param {number|null} docId - Optional doctor_id (from props or localStorage)
     * @param {number|null} docListId - Optional doctor_list_id (from props or localStorage)
     * @returns {Object} Plan object with all required fields
     */
    const plansTemplateForClinic = (planType, fee = null, duration = null, docId = null, docListId = null) => {
        // Get doctor_id and doctor_list_id from props, or fallback to localStorage
        const finalDoctorId = docId || doctor_id || localStorage.getItem("doctor_suid");
        const finalDoctorListId = docListId || doctor_list_id || localStorage.getItem("listing_id");
        
        const planObj = {
            plan_name: planType,
            plan_fee: fee,
            plan_duration: duration,
            plan_description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} plan for ${planType}ing`,
        };
        
        // Only add doctor_id and doctor_list_id if they exist (for plan creation endpoint)
        if (finalDoctorId) {
            planObj.doctor_id = Number(finalDoctorId);
        }
        if (finalDoctorListId) {
            planObj.doctor_list_id = Number(finalDoctorListId);
        }
        
        return planObj;
    };


    /**
     * Toggle plan checkbox state
     * Updates checkbox checked state and adds/removes plan from listingPayload
     * FIXED: Properly synchronizes checkbox state with plan payload
     * 
     * @param {string} planType - Plan type ("message" or "video")
     */
    const togglePlanCheckBox = (planType) => {
        logger.debug("📋 Toggling plan checkbox", { planType });
        
        setCheckBoxIsDisable((prev) => {
            const currentChecked = prev[planType];
            const newCheckedState = !currentChecked;
            const newState = { ...prev, [planType]: newCheckedState };
            
            logger.debug("📋 Checkbox state change", { 
                planType, 
                previousState: currentChecked, 
                newState: newCheckedState 
            });
            
            // Update listingPayload based on checkbox state using functional update
            setListingPayload((prevPayload) => {
                if (newCheckedState) {
                    // Checkbox is now checked - add plan if not already present
                    const planExists = prevPayload.plan.some(plan => plan.plan_name === planType);
                    if (!planExists) {
                        // Get doctor_id and doctor_list_id for new plan
                        const planDoctorId = doctor_id || localStorage.getItem("doctor_suid");
                        const planDoctorListId = doctor_list_id || localStorage.getItem("listing_id");
                        
                        const newPlan = {
                            ...plansTemplateForClinic(planType, null, null, planDoctorId, planDoctorListId),
                            plan_duration: null,
                            plan_fee: null,
                            is_trial: 1
                        };
                        logger.debug("✅ Adding plan to payload", { plan: newPlan });
                        return {
                            plan: [...prevPayload.plan, newPlan]
                        };
                    }
                    logger.debug("⚠️ Plan already exists in payload", { planType });
                    return prevPayload;
                } else {
                    // Checkbox is now unchecked - remove plan
                    const filteredPlans = prevPayload.plan.filter(plan => plan.plan_name !== planType);
                    logger.debug("🗑️ Removing plan from payload", { 
                        planType, 
                        remainingPlans: filteredPlans.length 
                    });
                    return {
                        plan: filteredPlans
                    };
                }
            });
            
            return newState;
        });
    };

    const updatePlanState = (planType, field, value) => {
        const updatedPlans = listingPayload.plan.map(plan =>
            plan.plan_name === planType ? { ...plan, [field]: value } : plan
        );
        setListingPayload({ plan: updatedPlans });
    };

    // Compute validation for selected plans
    useEffect(() => {
        const v = {};
        (listingPayload.plan || []).forEach(p => {
            const feeMissing = p.plan_fee === null || p.plan_fee === undefined || p.plan_fee === '' || Number(p.plan_fee) <= 0;
            const durationMissing = !p.plan_duration || String(p.plan_duration).trim() === '';
            v[p.plan_name] = {
                fee: feeMissing ? 'Price is required' : null,
                duration: durationMissing ? 'Duration is required' : null,
            };
        });
        setValidation(v);
    }, [listingPayload]);

    const isSaveDisabled = () => {
        // Save disabled if any selected plan has missing fee or duration
        return (listingPayload.plan || []).some(p => {
            const planV = validation[p.plan_name] || {};
            return !!planV.fee || !!planV.duration;
        });
    };

    const addListing = async () => {
        setLoading(true)
        try {
            const numericPayload = {
                plan: (listingPayload.plan || []).map(p => ({
                    ...p,
                    doctor_id: Number(p.doctor_id),
                    doctor_list_id: Number(p.doctor_list_id),
                    // ensure numeric fee if provided
                    plan_fee: p.plan_fee !== null && p.plan_fee !== undefined && p.plan_fee !== '' ? Number(p.plan_fee) : null,
                }))
            };
            const response = await axiosInstance.post("/sec/createUpdatedoctorlisting/planCreate", JSON.stringify(numericPayload));
            setPlanMessage(response?.data?.response?.message || "plan created successfully");
            setIsOpen(true);
            RenderDataAfterAddingPlan(true);
        } catch (error) {
            logger.error("❌ Listing not Added:", error);
            logger.error("❌ Error response:", error?.response?.data);
            setIsOpen(false);
            RenderDataAfterAddingPlan(false);
        } finally {
            setLoading(false)
            setIsOpen(false);
        }
    };

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "addplans");
    }, []);

    /**
     * Reset modal state when dialog closes
     * FIXED: Clears checkbox state and plan data when modal is closed to prevent stale data
     */
    useEffect(() => {
        if (!openDialog) {
            // Reset state when modal closes
            logger.debug("🔄 Modal closed, resetting state");
            setCheckBoxIsDisable({ message: false, video: false });
            setListingPayload({ plan: [] });
            setValidation({});
        }
    }, [openDialog]);

    return (
        <>
            <CustomSnackBar isOpen={isOpen} message={planMessage} type="success" />
            <CustomButton
                label="Add"
                isTransaprent="True"
                isElevated
                handleClick={() => setOpenDialog(!openDialog)}
                buttonCss={{ display: "flex", border: "1px solid #E72B4A", fontFamily: "poppins", fontSize: "16px", fontWeight: "500", color: "#E72B4A" }}
            />
            <CustomModal
                isOpen={openDialog}
                disableBackdropClick={disableBackdropClick}
                conditionOpen={() => setOpenDialog(false)}
                title={<Typography variant="h6" fontFamily="poppins" fontWeight="500">Add Plans</Typography>}
                footer={enableAdditionalButton && (
                    <CustomButton
                        label={additionalButtonName}
                        isDisabled={
                            listingPayload.plan.length === 0 || 
                            Object.values(validation).some(v => v.fee || v.duration) ||
                            listingPayload.plan.some(p => !checkBoxIsDisable[p.plan_name])
                        }
                        handleClick={() => {
                            logger.debug("📤 Add plan button clicked", {
                                checkBoxState: checkBoxIsDisable,
                                listingPayloadPlans: listingPayload.plan,
                                validation
                            });
                            
                            // FIXED: Get plans directly from listingPayload that are checked
                            // This ensures we get plans with fee and duration that are actually checked
                            // FIXED: Include doctor_id and doctor_list_id in plans
                            const selectedPlans = listingPayload.plan
                                .filter(plan => checkBoxIsDisable[plan.plan_name]) // Only checked plans
                                .map(plan => {
                                    // Use doctor_id and doctor_list_id from plan if present, otherwise from props/localStorage
                                    const planDoctorId = plan.doctor_id || doctor_id || localStorage.getItem("doctor_suid");
                                    const planDoctorListId = plan.doctor_list_id || doctor_list_id || localStorage.getItem("listing_id");
                                    
                                    const formattedPlan = plansTemplateForClinic(
                                        plan.plan_name,
                                        plan.plan_fee || null,
                                        plan.plan_duration || null,
                                        planDoctorId,
                                        planDoctorListId
                                    );
                                    logger.debug("✅ Plan formatted for submission", { plan: formattedPlan });
                                    return formattedPlan;
                                });
                            
                            logger.debug("📋 Selected plans to submit", { 
                                count: selectedPlans.length,
                                plans: selectedPlans 
                            });
                            
                            if (selectedPlans.length > 0 && onAdditionalButtonClick) {
                                onAdditionalButtonClick({ plan: selectedPlans });
                                // Close modal after adding plans
                                setOpenDialog(false);
                                logger.debug("✅ Plans submitted, modal closed");
                            } else {
                                logger.warn("⚠️ No valid plans to submit", {
                                    selectedPlansCount: selectedPlans.length,
                                    hasCallback: !!onAdditionalButtonClick
                                });
                            }
                        }}
                    />
                )}
            >
                {["message", "video"].map((planType) => (
                    <div key={planType}>
                        <div className={`${planType}-plan`}>
                            <CustomCheckBox 
                                checked={checkBoxIsDisable[planType] || false}
                                onChange={(event) => {
                                    // FIXED: Properly handle checkbox change event
                                    logger.debug("📋 Checkbox onChange triggered", { 
                                        planType, 
                                        eventChecked: event?.target?.checked,
                                        currentState: checkBoxIsDisable[planType]
                                    });
                                    togglePlanCheckBox(planType);
                                }}
                            />
                            <Typography style={{ fontFamily: "poppins", fontSize: "14px", fontWeight: "500" }}>
                                {plansTemplate(planType).plan_description.split(" ")[0]} Plan
                            </Typography>
                        </div>
                        <div className="first-plan-content">
                            <CustomTextField
                                label="Price"
                                helperText={validation[planType]?.fee || "Enter the price"}
                                error={!!validation[planType]?.fee}
                                value={listingPayload.plan.find(plan => plan.plan_name === planType)?.plan_fee || ""}
                                defaultValue={listingPayload.plan.find(plan => plan.plan_name === planType)?.plan_fee || ""}
                                onChange={(e) => updatePlanState(planType, "plan_fee", e.target.value)}
                                type="number"
                                isDisabled={!checkBoxIsDisable[planType]}
                                textcss={{ width: "250px", height: "56px", fontFamily: "poppins", fontSize: "16px" }}
                            />
                            <CustomDropdown
                                label="Duration"
                                items={dropdownItems}
                                activeItem={listingPayload.plan.find(plan => plan.plan_name === planType)?.plan_duration || ""}
                                isDisabled={!checkBoxIsDisable[planType]}
                                handleChange={(item) => updatePlanState(planType, "plan_duration", item)}
                            />
                            {validation[planType]?.duration && (
                                <div style={{ color: '#d32f2f', fontSize: 12, marginTop: -12, marginBottom: 8 }}>
                                    {validation[planType]?.duration}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {saveButtonEnable && (

                    <div className="save-button">
                        <CustomButton
                            label={loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
                            isDisabled={loading || isSaveDisabled()}
                            handleClick={addListing} />
                    </div>
                )}

            </CustomModal>
        </>
    );
};

export default clinicListingModal;
























// this is also finilized


// import React, { useState, useEffect, useCallback } from "react";
// import { Typography } from "@mui/material";
// import CustomButton from "../../../../components/CustomButton";
// import CustomModal from "../../../../components/CustomModal";
// import CustomTextField from "../../../../components/CustomTextField";
// import CustomDropdown from "../../../../components/CustomDropdown";
// import CustomCheckBox from "../../../../components/CustomCheckBox";
// import axiosInstance from "../../../../config/axiosInstance";
// import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
// import "./addplan.scss";

// const ListingModal = ({
//     RenderDataAfterAddingPlan,
//     enableAdditionalButton,
//     additionalButtonName,
//     onAdditionalButtonClick,
//     disableBackdropClick,
//     saveButtonEnable = true,
// }) => {
//     const [openDialog, setOpenDialog] = useState(false);
//     const [listingPayload, setListingPayload] = useState({ plan: [] });
//     const [checkBoxIsDisable, setCheckBoxIsDisable] = useState({ message: false, audio: false, video: false });
//     const [planMessage, setPlanMessage] = useState("");
//     const [isOpen, setIsOpen] = useState(false);

//     const dropdownItems = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes"];

//     const plans = useCallback((planType) => ({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_name: planType,
//         plan_description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} plan for ${planType}ing`,
//     }), []);

//     const updatePlanState = useCallback((planType, field, value) => {
//         setListingPayload(prevPayload => {
//             const updatedPlans = prevPayload.plan.map(plan =>
//                 plan.plan_name === planType ? { ...plan, [field]: value } : plan
//             );
//             return { ...prevPayload, plan: updatedPlans };
//         });
//     }, []);

//     const togglePlanCheckBox = (planType) => {
//         setCheckBoxIsDisable(prev => {
//             const newState = { ...prev, [planType]: !prev[planType] };
//             setListingPayload(prevPayload => {
//                 const updatedPlans = newState[planType]
//                     ? [...prevPayload.plan, { ...plans(planType), plan_duration: null, plan_fee: null, is_trial: 1 }]
//                     : prevPayload.plan.filter(plan => plan.plan_name !== planType);
//                 return { ...prevPayload, plan: updatedPlans };
//             });
//             return newState;
//         });
//     };

//     const addListing = async () => {
//         try {
//             const response = await axiosInstance.post("/sec/createUpdatedoctorlisting/planCreate", JSON.stringify(listingPayload));
//             setPlanMessage(response?.data?.response?.message);
//             setIsOpen(true);
//             RenderDataAfterAddingPlan(true);
//         } catch (error) {
//             console.error("Listing not Added:", error);
//             setIsOpen(false);
//             RenderDataAfterAddingPlan(false);
//         }
//     };

//     const handleModalClose = () => setOpenDialog(false);
//     const handleSave = () => addListing();

//     useEffect(() => {
//         localStorage.setItem("activeComponent", "listing");
//         localStorage.setItem("path", "addplans");
//     }, []);

//     return (
//         <>
//             <CustomSnackBar isOpen={isOpen} message={planMessage} type="success" />
//             <CustomButton
//                 label="Add"
//                 isTransaprent="True"
//                 isElevated
//                 handleClick={() => setOpenDialog(!openDialog)}
//                 buttonCss={{ display: "flex", border: "1px solid #E72B4A", fontFamily: "poppins", fontSize: "16px", fontWeight: "500", color: "#E72B4A" }}
//             />
//             <CustomModal
//                 isOpen={openDialog}
//                 disableBackdropClick={disableBackdropClick}
//                 conditionOpen={handleModalClose}
//                 title={<Typography variant="h6" fontFamily="poppins" fontWeight="500">Add Plans</Typography>}
//                 footer={enableAdditionalButton && (
//                     <CustomButton
//                         label={additionalButtonName}
//                         handleClick={() => onAdditionalButtonClick({
//                             plan: Object.keys(checkBoxIsDisable)
//                                 .filter(plan => checkBoxIsDisable[plan])
//                                 .map(plan => plans(plan)),
//                         })}
//                     />
//                 )}
//             >
//                 {["message", "video"].map((planType) => (
//                     <div key={planType}>
//                         <div className={`${planType}-plan`}>
//                             <CustomCheckBox checked={checkBoxIsDisable[planType]} onChange={() => togglePlanCheckBox(planType)} />
//                             <Typography style={{ fontFamily: "poppins", fontSize: "14px", fontWeight: "500" }}>
//                                 {plans(planType).plan_description.split(" ")[0]} Plan
//                             </Typography>
//                         </div>
//                         <div className="first-plan-content">
//                             <CustomTextField
//                                 label="Price"
//                                 value={listingPayload.plan.find(plan => plan.plan_name === planType)?.plan_fee || ""}
//                                 onChange={(e) => updatePlanState(planType, "plan_fee", e.target.value)}
//                                 type="number"
//                                 isDisabled={!checkBoxIsDisable[planType]}
//                                 textcss={{ width: "250px", height: "56px", fontFamily: "poppins", fontSize: "16px" }}
//                             />
//                             <CustomDropdown
//                                 label="Duration"
//                                 items={dropdownItems}
//                                 activeItem={listingPayload.plan.find(plan => plan.plan_name === planType)?.plan_duration || ""}
//                                 isDisabled={!checkBoxIsDisable[planType]}
//                                 handleChange={(item) => updatePlanState(planType, "plan_duration", item)}
//                             />
//                         </div>
//                     </div>
//                 ))}
//                 {saveButtonEnable && (
//                     <div className="save-button">
//                         <CustomButton label="Save" handleClick={handleSave} />
//                     </div>
//                 )}
//             </CustomModal>
//         </>
//     );
// };

// export default ListingModal;




































// this code is finilized 


// import React, { useEffect, useState, useCallback } from "react";
// import { Box, Typography } from "@mui/material";
// import CustomButton from "../../../../components/CustomButton";
// import CustomModal from "../../../../components/CustomModal";
// import CustomTextField from "../../../../components/CustomTextField";
// import CustomDropdown from "../../../../components/CustomDropdown";
// import CustomCheckBox from "../../../../components/CustomCheckBox";
// import axiosInstance from "../../../../config/axiosInstance";
// import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
// import "./addplan.scss";

// const ListingModal = ({
//     RenderDataAfterAddingPlan,
//     enableAdditionalButton,
//     additionalButtonName,
//     onAdditionalButtonClick,
//     disableBackdropClick,
//     saveButtonEnable = true,
//     conditionOpen,
// }) => {
//     const [openDialog, setOpenDialog] = useState(false);
//     const [addListingFlag, setAddListingFlag] = useState(false);
//     const [planMessage, setPlanMessage] = useState("");
//     const [isOpen, setIsOpen] = useState(false);
//     const [listingPayload, setListingPayload] = useState({ plan: [] });
//     const [checkBoxIsDisable, setCheckBoxIsDisable] = useState({
//         messaging: false,
//         audio: false,
//         video: false,
//     });

//     const dropdownItems = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes"];

//     const plans = {
//         message: {
//             doctor_id: localStorage.getItem("doctor_suid"),
//             doctor_list_id: localStorage.getItem("listing_id"),
//             plan_name: "message",
//             plan_description: "Message plan for chatting",
//         },
//         audio: {
//             doctor_id: localStorage.getItem("doctor_suid"),
//             doctor_list_id: localStorage.getItem("listing_id"),
//             plan_name: "call",
//             plan_description: "Audio plan for calling",
//         },
//         video: {
//             doctor_id: localStorage.getItem("doctor_suid"),
//             doctor_list_id: localStorage.getItem("listing_id"),
//             plan_name: "video",
//             plan_description: "Video plan for video calls",
//         },
//     };

//     useEffect(() => {
//         localStorage.setItem("activeComponent", "listing");
//         localStorage.setItem("path", "addplans");
//     }, []);

//     const updatePlanState = useCallback((planType, field, value) => {
//         setListingPayload((prevPayload) => {
//             const updatedPlans = prevPayload.plan.map((plan) =>
//                 plan.plan_name === planType ? { ...plan, [field]: value } : plan,
//             );
//             return { ...prevPayload, plan: updatedPlans };
//         });
//     }, []);

//     const togglePlanCheckBox = (planType) => {
//         setCheckBoxIsDisable((prev) => {
//             const newState = { ...prev, [planType]: !prev[planType] };
//             setListingPayload((prevPayload) => {
//                 const updatedPlans = newState[planType]
//                     ? [
//                           ...prevPayload.plan,
//                           { ...plans[planType], plan_duration: null, plan_fee: null, is_trial: 1 },
//                       ]
//                     : prevPayload.plan.filter(
//                           (plan) => plan.plan_name !== plans[planType].plan_name,
//                       );

//                 return { ...prevPayload, plan: updatedPlans };
//             });
//             return newState;
//         });
//     };

//     const addListing = async () => {
//         RenderDataAfterAddingPlan(false);
//         setAddListingFlag(false);
//         try {
//             const response = await axiosInstance.post(
//                 "/sec/createUpdatedoctorlisting/planCreate",
//                 JSON.stringify(listingPayload),
//             );
//             setPlanMessage(response?.data?.response?.message);
//             setIsOpen(true);
//             RenderDataAfterAddingPlan(true);
//         } catch (error) {
//             console.error("Listing not Added:", error);
//             setIsOpen(false);
//             RenderDataAfterAddingPlan(false);
//         }
//     };

//     useEffect(() => {
//         if (addListingFlag) addListing();
//     }, [addListingFlag]);

//     return (
//         <>
//             <CustomSnackBar isOpen={isOpen} message={planMessage} type={"success"} />
//             <CustomButton
//                 label="Add"
//                 isTransaprent="True"
//                 isElevated
//                 handleClick={() => setOpenDialog(!openDialog)}
//                 buttonCss={{
//                     display: "flex",
//                     border: "1px solid #E72B4A",
//                     fontFamily: "poppins",
//                     fontSize: "16px",
//                     fontWeight: "500",
//                     color: "#E72B4A",
//                 }}
//             />
//             <CustomModal
//                 isOpen={openDialog}
//                 disableBackdropClick={disableBackdropClick}
//                 conditionOpen={() => setOpenDialog(false)}
//                 title={
//                     <h2
//                         style={{
//                             textAlign: "left",
//                             fontFamily: "poppins",
//                             fontSize: "20px",
//                             fontWeight: "500",
//                         }}
//                     >
//                         Add Plans
//                     </h2>
//                 }
//                 footer={
//                     enableAdditionalButton && (
//                         <CustomButton
//                             label={additionalButtonName}
//                             handleClick={() =>
//                                 onAdditionalButtonClick({
//                                     plan: Object.keys(checkBoxIsDisable)
//                                         .filter((plan) => checkBoxIsDisable[plan])
//                                         .map((plan) => plans[plan]),
//                                 })
//                             }
//                         />
//                     )
//                 }
//             >
//                 {["message", "video"].map((planType) => (
//                     <div key={planType}>
//                         <div className={`${planType}-plan`}>
//                             <CustomCheckBox
//                                 checked={checkBoxIsDisable[planType]}
//                                 onChange={() => togglePlanCheckBox(planType)}
//                             />
//                             <Typography
//                                 style={{
//                                     fontFamily: "poppins",
//                                     fontSize: "14px",
//                                     fontWeight: "500",
//                                 }}
//                             >
//                                 {plans[planType].plan_description.split(" ")[0]} Plan
//                             </Typography>
//                         </div>
//                         <div className="first-plan-content">
//                             <CustomTextField
//                                 label="Price"
//                                 value={
//                                     listingPayload.plan.find((plan) => plan.plan_name === planType)
//                                         ?.plan_fee || ""
//                                 }
//                                 defaultValue={
//                                     listingPayload.plan.find((plan) => plan.plan_name === planType)
//                                         ?.plan_fee || ""
//                                 }
//                                 onChange={(e) =>
//                                     updatePlanState(planType, "plan_fee", e.target.value)
//                                 }
//                                 type="number"
//                                 isDisabled={!checkBoxIsDisable[planType]}
//                                 textcss={{
//                                     width: "250px",
//                                     height: "56px",
//                                     fontFamily: "poppins",
//                                     fontSize: "16px",
//                                 }}
//                             />
//                             <CustomDropdown
//                                 label="Duration"
//                                 items={dropdownItems}
//                                 activeItem={
//                                     listingPayload.plan.find((plan) => plan.plan_name === planType)
//                                         ?.plan_duration || ""
//                                 }
//                                 isDisabled={!checkBoxIsDisable[planType]}
//                                 handleChange={(item) =>
//                                     updatePlanState(planType, "plan_duration", item)
//                                 }
//                             />
//                         </div>
//                     </div>
//                 ))}
//                 {saveButtonEnable && (
//                     <div className="save-button">
//                         <CustomButton label="Save" handleClick={() => setAddListingFlag(true)} />
//                     </div>
//                 )}
//             </CustomModal>
//         </>
//     );
// };

// export default ListingModal;
































// import React, { Fragment, useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";
// import CustomButton from "../../../../components/CustomButton";
// import CustomModal from "../../../../components/CustomModal";
// import CustomTextField from "../../../../components/CustomTextField";
// import CustomDropdown from "../../../../components/CustomDropdown";
// import CustomCheckBox from "../../../../components/CustomCheckBox";
// import axiosInstance from "../../../../config/axiosInstance";
// import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
// import "./addplan.scss";

// const ListingModal = ({
//     RenderDataAfterAddingPlan,
//     enableAdditionalButton,
//     additionalButtonName,
//     onAdditionalButtonClick,
//     disableBackdropClick,
//     saveButtonEnable = true,
//     conditionOpen,
// }) => {
//     useEffect(() => {
//         localStorage.setItem("activeComponent", "listing");
//         localStorage.setItem("path", "addplans");
//     }, []);

//     const dropdownItems = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes"];
//     const [openDialog, setOpenDialog] = useState(false);
//     const [addListingFlag, setAddListingFlag] = useState(false);
//     const [planMessage, setPlanMessage] = useState("");
//     const [isOpen, setIsOpen] = useState(false);
//     const [listingPayload, setListingPayload] = useState({ plan: [] });
//     const [checkBoxIsDisable, setCheckBoxIsDisable] = useState({
//         messaging: false,
//         audio: false,
//         video: false,
//     });
//     const [plans, setPlans] = useState({
//         message: {
//             doctor_id: localStorage.getItem("doctor_suid"),
//             doctor_list_id: localStorage.getItem("listing_id"),
//             plan_name: "message",
//             plan_description: "Message plan for chatting",
//             plan_duration: null,
//             plan_fee: null,
//             is_trial: 1,
//         },
//         audio: {
// doctor_id: localStorage.getItem("doctor_suid"),
// doctor_list_id: localStorage.getItem("listing_id"),
//             plan_name: "call",
//             plan_description: "Audio plan for calling",
//             plan_duration: null,
//             plan_fee: null,
//             is_trial: 1,
//         },
//         video: {
//             doctor_id: localStorage.getItem("doctor_suid"),
//             doctor_list_id: localStorage.getItem("listing_id"),
//             plan_name: "video",
//             plan_description: "Video plan for video calls",
//             plan_duration: null,
//             plan_fee: null,
//             is_trial: 1,
//         },
//     });

//     const handleModalClose = () => {
//         setOpenDialog(false);
//     };

//     const updatePlanState = (planType, field, value) => {
//         // Update specific plan (messaging, audio, video) field (plan_fee or plan_duration)
//         setPlans((prev) => ({
//             ...prev,
//             [planType]: {
//                 ...prev[planType],
//                 [field]: value,
//             },
//         }));

//         // Dynamically update the listingPayload to reflect changes
//         setListingPayload((prevPayload) => {
//             const updatedPlans = prevPayload.plan.map((plan) => {
//                 if (plan.plan_name === planType) {
//                     return {
//                         ...plan,
//                         [field]: value, // Update only the modified field
//                     };
//                 }
//                 return plan;
//             });

//             return {
//                 ...prevPayload,
//                 plan: updatedPlans,
//             };
//         });
//     };

//     const togglePlanCheckBox = (planType) => {
//         setCheckBoxIsDisable((prev) => {
//             const newState = { ...prev, [planType]: !prev[planType] };

//             // When a checkbox is checked, add the corresponding plan to the listingPayload
//             if (newState[planType]) {
//                 setListingPayload((prevPayload) => ({
//                     ...prevPayload,
//                     plan: [...prevPayload.plan, plans[planType]],  // Add the plan to the list
//                 }));
//             } else {
//                 // If unchecked, remove the plan from the list
//                 setListingPayload((prevPayload) => ({
//                     ...prevPayload,
//                     plan: prevPayload.plan.filter(
//                         (plan) => plan.plan_name !== plans[planType].plan_name,
//                     ),
//                 }));
//             }

//             return newState;
//         });
//     };

//     const addListing = async () => {
//         RenderDataAfterAddingPlan(false);
//         setAddListingFlag(false);
//         try {
//             const response = await axiosInstance.post(
//                 "/sec/createUpdatedoctorlisting/planCreate",
//                 JSON.stringify(listingPayload), // Send only the checked plans with valid fee and duration
//             );
//             setPlanMessage(response?.data?.response?.message);
//             setIsOpen(true);
//             RenderDataAfterAddingPlan(true);
//         } catch (error) {
//             console.error("Listing not Added:", error);
//             setIsOpen(false);
//             RenderDataAfterAddingPlan(false);
//         }
//     };

//     useEffect(() => {
//         if (addListingFlag) {
//             addListing();
//         }
//     }, [addListingFlag]);

//     console.log("plan : ", listingPayload); // For debugging purposes

//     return (
//         <>
//             <CustomSnackBar isOpen={isOpen} message={planMessage} type={"success"} />
//             <CustomButton
//                 label="Add"
//                 isTransaprent="True"
//                 isElevated
//                 handleClick={() => setOpenDialog(!openDialog)}
//                 buttonCss={{
//                     display: "flex",
//                     border: "1px solid #E72B4A",
//                     fontFamily: "poppins",
//                     fontSize: "16px",
//                     fontWeight: "500",
//                     color: "#E72B4A",
//                 }}
//             />
//             <CustomModal
//                 isOpen={openDialog}
//                 disableBackdropClick={disableBackdropClick}
//                 conditionOpen={handleModalClose}
//                 title={
//                     <h2
//                         style={{
//                             textAlign: "left",
//                             fontFamily: "poppins",
//                             fontSize: "20px",
//                             fontWeight: "500",
//                         }}
//                     >
//                         Add Plans
//                     </h2>
//                 }
//                 footer={
//                     <Fragment>
//                         {enableAdditionalButton && (
//                             <CustomButton
//                                 label={additionalButtonName}
//                                 handleClick={() => {
//                                     const selectedPlans = Object.keys(checkBoxIsDisable)
//                                         .filter((plan) => checkBoxIsDisable[plan])
//                                         .map((plan) => plans[plan]);
//                                     onAdditionalButtonClick({ plan: selectedPlans });
//                                 }}
//                             />
//                         )}
//                     </Fragment>
//                 }
//             >
//                 {["message", "video"].map((planType) => (
//                     <div key={planType}>
//                         <div className={`${planType}-plan`}>
//                             <CustomCheckBox
//                                 checked={checkBoxIsDisable[planType]}
//                                 onChange={() => togglePlanCheckBox(planType)}
//                             />
//                             <Typography
//                                 style={{
//                                     fontFamily: "poppins",
//                                     fontSize: "14px",
//                                     fontWeight: "500",
//                                 }}
//                             >
//                                 {plans[planType].plan_description.split(" ")[0]} Plan
//                             </Typography>
//                         </div>
//                         <div className="first-plan-content">
//                             <CustomTextField
//                                 label="Price"
//                                 value={plans[planType].plan_fee || ""}
//                                 defaultValue={plans[planType].plan_fee || ""}
//                                 textcss={{
//                                     width: "250px",
//                                     height: "56px",
//                                     fontFamily: "poppins",
//                                     fontSize: "16px",
//                                 }}
//                                 onChange={(e) =>
//                                     updatePlanState(planType, "plan_fee", e.target.value) // Update fee when changed
//                                 }
//                                 type="number"
//                                 isDisabled={!checkBoxIsDisable[planType]}
//                             />
//                             <CustomDropdown
//                                 label="Duration"
//                                 items={dropdownItems}
//                                 activeItem={plans[planType].plan_duration}
//                                 isDisabled={!checkBoxIsDisable[planType]}
//                                 handleChange={(item) => {
//                                     updatePlanState(planType, "plan_duration", item); // Update duration when selected
//                                     console.log("Duration selected : ", item);
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 ))}
//                 {saveButtonEnable && (
//                     <div className="save-button">
//                         <CustomButton label="Save" handleClick={() => setAddListingFlag(true)} />
//                     </div>
//                 )}
//             </CustomModal>
//         </>
//     );
// };

// export default ListingModal;

// import React, { Fragment, useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";
// import CustomButton from "../../../../components/CustomButton";
// import CustomModal from "../../../../components/CustomModal";
// import CustomTextField from "../../../../components/CustomTextField";
// import CustomDropdown from "../../../../components/CustomDropdown";
// import CustomCheckBox from "../../../../components/CustomCheckBox";
// import axiosInstance from "../../../../config/axiosInstance";
// import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
// import "./addplan.scss";

// const ListingModal = ({
//     RenderDataAfterAddingPlan,
//     enableAdditionalButton,
//     additionalButtonName,
//     onAdditionalButtonClick,
//     disableBackdropClick,
//     saveButtonEnable = true,
//     conditionOpen,
// }) => {
//     useEffect(() => {
//         localStorage.setItem("activeComponent", "listing");
//         localStorage.setItem("path", "addplans");
//     }, []);

//     const dropdownItems = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes"];
//     const [openDialog, setOpenDialog] = useState(false);
//     const [addListingFlag, setAddListingFlag] = useState(false);
//     const [planMessage, setPlanMessage] = useState("");
//     const [isOpen, setIsOpen] = useState(false);
//     const [listingPayload, setListingPayload] = useState({ plan: [] });
//     const [checkBoxIsDisable, setCheckBoxIsDisable] = useState({
//         messaging: false,
//         audio: false,
//         video: false,
//     });
//     const [plans, setPlans] = useState({
//         messaging: {
//             doctor_id: localStorage.getItem("doctor_suid"),
//             doctor_list_id: localStorage.getItem("listing_id"),
//             plan_name: "message",
//             plan_description: "Message plan for chatting",
//             plan_duration: null,
//             plan_fee: null,
//             is_trial: 1,
//         },
//         audio: {
//             doctor_id: localStorage.getItem("doctor_suid"),
//             doctor_list_id: localStorage.getItem("listing_id"),
//             plan_name: "call",
//             plan_description: "Audio plan for calling",
//             plan_duration: null,
//             plan_fee: null,
//             is_trial: 1,
//         },
//         video: {
//             doctor_id: localStorage.getItem("doctor_suid"),
//             doctor_list_id: localStorage.getItem("listing_id"),
//             plan_name: "video",
//             plan_description: "Video plan for video calls",
//             plan_duration: null,
//             plan_fee: null,
//             is_trial: 1,
//         },
//     });

//     const handleModalClose = () => {
//         setOpenDialog(false);
//     };

//     const updatePlanState = (planType, field, value) => {
//         console.log("this is plan anme  : ", planType, field, value);

//         setPlans((prev) => ({
//             ...prev,
//             [planType]: {
//                 ...prev[planType],
//                 [field]: value,
//             },
//         }));
//     };

//     console.log("this is the plan",plans)

//     const togglePlanCheckBox = (planType) => {
//         setCheckBoxIsDisable((prev) => {
//             const newState = { ...prev, [planType]: !prev[planType] };
//             if (newState[planType]) {
//                 setListingPayload((prevPayload) => ({
//                     ...prevPayload,
//                     plan: [...prevPayload.plan, plans[planType]],
//                 }));
//             } else {
//                 setListingPayload((prevPayload) => ({
//                     ...prevPayload,
//                     plan: prevPayload.plan.filter(
//                         (plan) => plan.plan_name !== plans[planType].plan_name,
//                     ),
//                 }));
//             }
//             return newState;
//         });
//     };

//     const addListing = async () => {
//         RenderDataAfterAddingPlan(false);
//         setAddListingFlag(false);
//         try {
//             const response = await axiosInstance.post(
//                 "/sec/createUpdatedoctorlisting/planCreate",
//                 JSON.stringify(listingPayload),
//             );
//             setPlanMessage(response?.data?.response?.message);
//             setIsOpen(true);
//             RenderDataAfterAddingPlan(true);
//         } catch (error) {
//             console.error("Listing not Added:", error);
//             setIsOpen(false);
//             RenderDataAfterAddingPlan(false);
//         }
//     };

//     useEffect(() => {
//         if (addListingFlag) {
//             addListing();
//         }
//     }, [addListingFlag]);

//     console.log("plan : ", listingPayload);

//     return (
//         <>
//             <CustomSnackBar isOpen={isOpen} message={planMessage} type={"success"} />
//             <CustomButton
//                 label="Add"
//                 isTransaprent="True"
//                 isElevated
//                 handleClick={() => setOpenDialog(!openDialog)}
//                 buttonCss={{
//                     display: "flex",
//                     border: "1px solid #E72B4A",
//                     fontFamily: "poppins",
//                     fontSize: "16px",
//                     fontWeight: "500",
//                     color: "#E72B4A",
//                 }}
//             />
//             <CustomModal
//                 isOpen={openDialog}
//                 disableBackdropClick={disableBackdropClick}
//                 conditionOpen={handleModalClose}
//                 title={
//                     <h2
//                         style={{
//                             textAlign: "left",
//                             fontFamily: "poppins",
//                             fontSize: "20px",
//                             fontWeight: "500",
//                         }}
//                     >
//                         Add Plans
//                     </h2>
//                 }
//                 footer={
//                     <Fragment>
//                         {enableAdditionalButton && (
//                             <CustomButton
//                                 label={additionalButtonName}
//                                 handleClick={() => {
//                                     const selectedPlans = Object.keys(checkBoxIsDisable)
//                                         .filter((plan) => checkBoxIsDisable[plan])
//                                         .map((plan) => plans[plan]);
//                                     onAdditionalButtonClick({ plan: selectedPlans });
//                                 }}
//                             />
//                         )}
//                     </Fragment>
//                 }
//             >
//                 {["messaging", "video"].map((planType) => (
//                     <div key={planType}>
//                         <div className={`${planType}-plan`}>
//                             <CustomCheckBox
//                                 checked={checkBoxIsDisable[planType]}
//                                 onChange={() => togglePlanCheckBox(planType)}
//                             />
//                             <Typography
//                                 style={{
//                                     fontFamily: "poppins",
//                                     fontSize: "14px",
//                                     fontWeight: "500",
//                                 }}
//                             >
//                                 {plans[planType].plan_description.split(" ")[0]} Plan
//                             </Typography>
//                         </div>
//                         <div className="first-plan-content">
//                             <CustomTextField
//                                 label="Price"
//                                 defaultValue={plans[planType].plan_fee}
//                                 textcss={{
//                                     width: "250px",
//                                     height: "56px",
//                                     fontFamily: "poppins",
//                                     fontSize: "16px",
//                                 }}
//                                 onChange={(e) =>
//                                     updatePlanState(planType, "plan_fee", e.target.value)
//                                 }
//                                 type="number"
//                                 isDisabled={!checkBoxIsDisable[planType]}
//                             />
//                             <CustomDropdown
//                                 label="Duration"
//                                 items={dropdownItems}
//                                 activeItem={plans[planType].plan_duration}
//                                 isDisabled={!checkBoxIsDisable[planType]}
//                                 handleChange={(item) => {
//                                     updatePlanState(planType, "plan_duration", item);
//                                     console.log("Duration selected : ", item);
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 ))}
//                 {saveButtonEnable && (
//                     <div className="save-button">
//                         <CustomButton label="Save" handleClick={() => setAddListingFlag(true)} />
//                     </div>
//                 )}
//             </CustomModal>
//         </>
//     );
// };

// export default ListingModal;

// import React, { Fragment, useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";
// import CustomButton from "../../../../components/CustomButton";
// import CustomModal from "../../../../components/CustomModal";
// import CustomTextField from "../../../../components/CustomTextField";
// import CustomDropdown from "../../../../components/CustomDropdown";
// import "./addplan.scss";
// import CustomCheckBox from "../../../../components/CustomCheckBox";
// import axiosInstance from "../../../../config/axiosInstance";
// import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";

// const ListingModal = ({
//     RenderDataAfterAddingPlan,
//     enableAdditionalButton,
//     additionalButtonName,
//     onAdditionalButtonClick,
//     disableBackdropClick,
//     saveButtonEnable = true,
//     conditionOpen, // Callback to trigger modal close
// }) => {
//     useEffect(() => {
//         localStorage.setItem("activeComponent", "listing");
//         localStorage.setItem("path", "addplans");
//     }, []);

//     const [plandata, setPlandata] = useState([]);
//     const dropdownItems = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes"];
//     const [openDialog, setOpenDialog] = useState(false);
//     const [addListingFlag, setAddListingFlag] = useState(false);
//     const [planMessage, setPlanMessage] = useState("");
//     const [isOpen, setIsOpen] = useState(false);
//     const [listingPayload, setListingPayload] = useState({
//         plan: [],
//     });

//     const handleModalClose = () => {
//         setOpenDialog(false); // Close the modal
//     };

//     const AddListing = async () => {
//         RenderDataAfterAddingPlan(false);
//         try {
//             let response = await axiosInstance.post(
//                 "/sec/createUpdatedoctorlisting/planCreate",
//                 JSON.stringify(listingPayload)
//             );
//             console.log("Listing added successfully", response?.data?.response?.message);
//             RenderDataAfterAddingPlan(true);
//             setPlanMessage(response?.data?.response?.message);
//             setAddListingFlag(false);
//             setIsOpen(true);
//         } catch (error) {
//             console.log("Listing not Added: ", error);
//             setAddListingFlag(false);
//             RenderDataAfterAddingPlan(false);
//             setIsOpen(false);
//         }
//     };

//     useEffect(() => {
//         if (addListingFlag) {
//             AddListing();
//         }
//     }, [addListingFlag]);

//     const [messagingPlan, setMessagingPlan] = useState({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_fee: null,
//         plan_name: "message",
//         plan_duration: null,
//         is_trial: 1,
//         plan_description: "Message plan for chatting",
//     });

//     const [audioPlan, setAudioPlan] = useState({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_fee: null,
//         plan_name: "call",
//         plan_duration: null,
//         is_trial: 1,
//         plan_description: "Audio plan for calling",
//     });

//     const [videoPlan, setVideoPlan] = useState({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_fee: null,
//         plan_name: "video",
//         plan_duration: null,
//         is_trial: 1,
//         plan_description: "Video plan for video calls",
//     });

//     const [duration, setDuration] = useState({
//         messaging: null,
//         audio: null,
//         video: null,
//     });

//     const [pricing, setPricing] = useState({
//         messaging: null,
//         audio: null,
//         video: null,
//     });

//     const [checkBoxIsDisable, setCheckBoxIsDisable] = useState({
//         messaging: false,
//         audio: false,
//         video: false,
//     });

//     console.log("set video plan : ",videoPlan);
//     console.log("set messeging plan : ",messagingPlan);
//     console.log("Listing payload : ",listingPayload)

//     return (
//         <>
//             <CustomSnackBar isOpen={isOpen} message={planMessage} type={"success"} />
//             <CustomButton
//                 label="Add"
//                 isTransaprent={"True"}
//                 isElevated
//                 handleClick={() => setOpenDialog(!openDialog)}
//                 buttonCss={{
//                     display: "flex",
//                     borderBottom: "1px",
//                     borderLeft: "1px",
//                     borderRight: "1px",
//                     borderTop: "1px",
//                     fontFamily: "poppins",
//                     fontSize: "16px",
//                     fontWeight: "500",
//                     color: "#E72B4A",
//                 }}
//             />
//             <CustomModal
//                 isOpen={openDialog}
//                 disableBackdropClick={disableBackdropClick}
//                 conditionOpen={handleModalClose} // Modal close function
//                 title={

//                         <h2
//                             style={{
//                                 textAlign: "left",
//                                 fontFamily: "poppins",
//                                 fontSize: "20px",
//                                 fontWeight: "500",
//                                 lineHeight: "30px",
//                                 width: "101px",
//                                 height: "30px",
//                             }}
//                         >
//                             Add Plans
//                         </h2>
//                 }
//                 footer={
//                     <Fragment>
//                         {enableAdditionalButton && (
//                             <CustomButton
//                                 label={additionalButtonName}
//                                 handleClick={() =>{
//                                     if(checkBoxIsDisable.video && checkBoxIsDisable.messaging){
//                                         onAdditionalButtonClick({plan:[messagingPlan,videoPlan]})
//                                     }else if(checkBoxIsDisable.video){
//                                         onAdditionalButtonClick({plan:[videoPlan]})
//                                     }else if(checkBoxIsDisable.messaging ){
//                                         onAdditionalButtonClick({plan:[messagingPlan]})
//                                     }else{
//                                         onAdditionalButtonClick({plan : []})
//                                     }

//                                 }}
//                             />
//                         )}
//                     </Fragment>
//                 }
//             >
//                 {/* Plan Selection Section */}
//                 <div className="first-plan">
//                     <CustomCheckBox
//                         checked={checkBoxIsDisable?.messaging}
//                         onChange={() => {
//                             setCheckBoxIsDisable({
//                                 ...checkBoxIsDisable,
//                                 messaging: !checkBoxIsDisable.messaging,
//                             });
//                             if (!checkBoxIsDisable?.messaging) {
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, messagingPlan],
//                                 });
//                             } else {
//                                 const updatedPlan = listingPayload.plan.filter(
//                                     (planItem) => planItem?.plan_name !== "message"
//                                 );
//                                 setListingPayload({ ...listingPayload, plan: updatedPlan });
//                             }
//                         }}
//                     />
//                     <Typography
//                         style={{
//                             fontFamily: "poppins",
//                             fontSize: "14px",
//                             fontWeight: "500",
//                             lineHeight: "22px",
//                             letterSpacing: "0.07px",
//                         }}
//                     >
//                         Messaging Plan
//                     </Typography>
//                 </div>
//                 {/* Messaging Plan Details */}
//                 <div className="first-plan-content">
//                     <CustomTextField
//                         label="Price"
//                         defaultValue={pricing?.messaging}
//                         textcss={{
//                             width: "250px",
//                             height: "56px",
//                             color: "#787579",
//                             fontFamily: "poppins",
//                             fontSize: "16px",
//                         }}
//                         onChange={(event) => {
//                             setPricing({ ...pricing, messaging: event.target.value });
//                             setMessagingPlan({ ...messagingPlan, plan_fee: event.target.value });

//                         }}
//                         type={"number"}
//                         isDisabled={!checkBoxIsDisable?.messaging}
//                     />
//                     <CustomDropdown
//                         label={"Duration"}
//                         items={dropdownItems}
//                         activeItem={duration?.messaging}
//                         isDisabled={!checkBoxIsDisable?.messaging}
//                         handleChange={(item) => {
//                             setDuration({ ...duration, messaging: item });
//                             console.log("this is the duration : ",item)
//                             setMessagingPlan({ ...messagingPlan, plan_duration: item });
//                         }}
//                     />
//                 </div>
//                 {/* Video Plan Selection */}
//                 <div className="third-plan">
//                     <CustomCheckBox
//                         checked={checkBoxIsDisable?.video}
//                         onChange={() => {
//                             setCheckBoxIsDisable({
//                                 ...checkBoxIsDisable,
//                                 video: !checkBoxIsDisable.video,
//                             });
//                             if (!checkBoxIsDisable?.video) {
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, videoPlan],
//                                 });
//                             } else {
//                                 const updatedPlan = listingPayload.plan.filter(
//                                     (planItem) => planItem?.plan_name !== "video"
//                                 );
//                                 setListingPayload({ ...listingPayload, plan: updatedPlan });
//                             }
//                         }}
//                     />
//                     <Typography
//                         style={{
//                             fontFamily: "poppins",
//                             fontSize: "14px",
//                             fontWeight: "500",
//                             lineHeight: "22px",
//                             letterSpacing: "0.07px",
//                         }}
//                     >
//                         Video Plan
//                     </Typography>
//                 </div>
//                 {/* Video Plan Details */}
//                 <div className="first-plan-content">
//                     <CustomTextField
//                         label="Price"
//                         defaultValue={pricing?.video}
//                         textcss={{
//                             width: "250px",
//                             height: "56px",
//                             color: "#787579",
//                             fontFamily: "poppins",
//                             fontSize: "16px",
//                         }}
//                         onChange={(event) => {
//                             setPricing({ ...pricing, video: event.target.value });
//                             setVideoPlan({ ...videoPlan, plan_fee: event.target.value });
//                         }}
//                         type={"number"}
//                         isDisabled={!checkBoxIsDisable?.video}
//                     />
//                     <CustomDropdown
//                         label={"Duration"}
//                         items={dropdownItems}
//                         activeItem={duration?.video}
//                         isDisabled={!checkBoxIsDisable?.video}
//                         handleChange={(item) => {
//                             setDuration({ ...duration, video: item });
//                             setVideoPlan({ ...videoPlan, plan_duration: item });
//                         }}
//                     />
//                 </div>

//                 <div className="save-button" style={{display : saveButtonEnable ? 'block' : 'none' }} >

//                      <CustomButton

//                         label="Save"
//                         handleClick={() => {
//                             setAddListingFlag(true);
//                         }}

//                         />

//                 </div>

//             </CustomModal>
//         </>
//     );
// };

// export default ListingModal;

// const ListingModal = ({ RenderDataAfterAddingPlan, enableAdditionalButton, additionalButtonName, onAdditionalButtonClick, disableBackdropClick, saveButtonEnable = true, conditionOpen }) => {
//     // showSaveButton = true, // Prop to control visibility of Save button
//     // enableCustomButton = false, // Prop to control enabling custom button
//     // customButtonName = "Submit", // Prop to set name of the custom button
//     // onCustomButtonClick, // Callback prop for custom button click event
//     useEffect(() => {
//         localStorage.setItem("activeComponent", "listing");
//         localStorage.setItem("path", "addplans");
//     }, []);

//     const [plandata, setplandata] = useState([]);
//     const dropdownItems = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes"];
//     const [openDialog, setOpenDialog] = useState(false);
//     const [addListingFlag, setAddListingFlag] = useState(false);
//     const [planMessage, setPlanMessage] = useState("");
//     const [isOpen, setIsOpen] = useState(false);
//     const [listingPayload, setListingPayload] = useState({
//         plan: [],
//     });

//         console.log("conditionOpen in listing modal : ",conditionOpen)

//         const handleModalClose = () => {
//             setOpenDialog(false); // Function to close the modal
//         };

//     const AddListing = async () => {
//         RenderDataAfterAddingPlan(false);
//         try {
//             let response = await axiosInstance.post(
//                 "/sec/createUpdatedoctorlisting/planCreate",
//                 JSON.stringify(listingPayload),
//             );
//             console.log("listing added successfully", response?.data?.response?.message);
//             RenderDataAfterAddingPlan(true);
//             setPlanMessage(response?.data?.response?.message);
//             setAddListingFlag(false);
//             setIsOpen(true);
//         } catch (error) {
//             console.log("Listing not Added : ", error);
//             setAddListingFlag(false);
//             RenderDataAfterAddingPlan(false);
//             setIsOpen(false);
//         }
//     };

//     useEffect(() => {
//         if (addListingFlag) {
//             AddListing();
//         }
//     }, [addListingFlag]);

//     const [messagingPlan, setMessagingPlan] = useState({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_fee: null,
//         plan_name: "message",
//         plan_duration: null,
//         is_trial: 1,
//         plan_description: "message plan for chatting",
//     });

//     const [audioPlan, setAudioPlan] = useState({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_fee: null,
//         plan_name: "call",
//         plan_duration: null,
//         is_trial: 1,
//         plan_description: "audio plan for audio",
//     });

//     const [videoPlan, setVideoPlan] = useState({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_fee: null,
//         plan_name: "video",
//         plan_duration: null,
//         is_trial: 1,
//         plan_description: "video plan for video",
//     });

//     console.log("listingPayload : ", listingPayload);

//     const [duration, setDuration] = useState({
//         messaging: null,
//         audio: null,
//         video: null,
//     });

//     const [pricing, setPricing] = useState({
//         messaging: null,
//         audio: null,
//         video: null,
//     });
//     const [checkBoxIsDisable, setCheckBoxIsDisable] = useState({
//         messaging: false,
//         audio: false,
//         video: false,
//     });

//     return (
//         <>
//             <CustomSnackBar isOpen={isOpen} message={planMessage} type={"success"} />
//             <CustomButton
//                 label="Add"
//                 isTransaprent={"True"}
//                 isElevated
//                 handleClick={() => setOpenDialog(!openDialog)}
//                 buttonCss={{
//                     display: "flex",
//                     borderBottom: "1px",
//                     borderLeft: "1px",
//                     borderRight: "1px",
//                     borderTop: "1px",
//                     fontfamily: "poppins",
//                     fontsize: "16px",
//                     fontstyle: "normal",
//                     fontweight: "500",
//                     lineheight: "30px",
//                     color: "#E72B4A",
//                 }}
//             />
//             <CustomModal
//                 style={{
//                     display: "flex",
//                 }}
//                 isOpen={openDialog}
//                 disableBackdropClick={disableBackdropClick}
//                 conditionOpen={conditionOpen}
//                 title={
//                     <Box
//                         sx={{
//                             border: "1px solid #E6E1E5",
//                             borderTop: "1px",
//                             borderRight: "1px",
//                             borderLeft: "1px",
//                             width: "570px",
//                             height: "82px",
//                             display: "flex",
//                             justifycontent: "flexstart",
//                         }}
//                     >
//                         <h2
//                             style={{
//                                 textAlign: "left",
//                                 fontfamily: "poppins",
//                                 fontSize: "20px",
//                                 fontstyle: "normal",
//                                 fontweight: "500",
//                                 lineheight: "30px",
//                                 width: "101px",
//                                 height: "30px",
//                             }}
//                         >
//                             Add Plans
//                         </h2>
//                     </Box>
//                 }
//                 footer={
//                     <Fragment>
//                         {enableAdditionalButton && (
//                             <CustomButton
//                                 label={additionalButtonName}
//                                 handleClick={() => onAdditionalButtonClick(listingPayload)}
//                             />
//                         )}
//                     </Fragment>
//                 }
//             >
//                 <div className="first-plan">
//                     <CustomCheckBox
//                         checked={checkBoxIsDisable?.messaging}
//                         onChange={() => {
//                             setCheckBoxIsDisable({
//                                 ...checkBoxIsDisable,
//                                 messaging: !checkBoxIsDisable.messaging,
//                             });

//                             if (!checkBoxIsDisable?.messaging) {
//                                 // Adding the plan to the payload
//                                 console.log("Messaging Plan : ", checkBoxIsDisable?.messaging);
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, messagingPlan],
//                                 });
//                             } else {
//                                 // Remove messaging from listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.filter((planItem) => {
//                                     return planItem?.plan_name !== "message";
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                     />
//                     <Typography
//                         style={{
//                             fontFamily: "poppins",
//                             fontsize: "14px",
//                             fontstyle: "normal",
//                             fontWeight: "500",
//                             lineHeight: "22px",
//                             letterSpacing: "0.07px",
//                         }}
//                     >
//                         Messaging Plan
//                     </Typography>
//                 </div>
//                 <div className="first-plan-content">
//                     <CustomTextField
//                         label="Price"
//                         helperText={""}
//                         defaultValue={pricing?.messaging}
//                         textcss={{
//                             width: "250px",
//                             height: "56px",
//                             flexShrink: "0",
//                             color: "#787579",
//                             fontfamily: "poppins",
//                             fontsize: "16px",
//                             fontstyle: "normal",
//                             fontweight: "400",
//                             lineHeight: "24px",
//                         }}
//                         onChange={(event) => {
//                             setPricing({
//                                 ...pricing,
//                                 messaging: event?.target?.value,
//                             });
//                             setMessagingPlan({
//                                 ...messagingPlan,
//                                 plan_fee: event?.target?.value,
//                             });

//                             if (!checkBoxIsDisable?.messaging) {
//                                 // Adding the plan to the payload
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, messagingPlan],
//                                 });
//                             } else {
//                                 // Update plan fee in listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.map((planItem) => {
//                                     if (planItem?.plan_name === "message") {
//                                         return {
//                                             ...planItem,
//                                             plan_fee: event?.target?.value,
//                                         };
//                                     } else {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                         type={"number"}
//                         isDisabled={!checkBoxIsDisable?.messaging}
//                     />
//                     <CustomDropdown
//                         label={"Duration"}
//                         items={dropdownItems}
//                         activeItem={duration?.messaging}
//                         isDisabled={!checkBoxIsDisable?.messaging}
//                         handleChange={(item) => {
//                             setDuration({ ...duration, messaging: item });
//                             setMessagingPlan({
//                                 ...messagingPlan,
//                                 plan_duration: item,
//                             });

//                             if (!checkBoxIsDisable?.messaging) {
//                                 // Adding the plan to the payload
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, messagingPlan],
//                                 });
//                             } else {
//                                 // Update plan duration in listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.map((planItem) => {
//                                     if (planItem?.plan_name === "message") {
//                                         return {
//                                             ...planItem,
//                                             plan_duration: item,
//                                         };
//                                     } else {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                     />
//                 </div>
//                 <div className="third-plan">
//                     <CustomCheckBox
//                         checked={checkBoxIsDisable?.video}
//                         onChange={() => {
//                             setCheckBoxIsDisable({
//                                 ...checkBoxIsDisable,
//                                 video: !checkBoxIsDisable.video,
//                             });

//                             if (!checkBoxIsDisable?.video) {
//                                 // Adding the plan to the payload
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, videoPlan],
//                                 });
//                             } else {
//                                 // Remove video from listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.filter((planItem) => {
//                                     return planItem?.plan_name !== "video";
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                     />
//                     <Typography
//                         style={{
//                             fontFamily: "poppins",
//                             fontsize: "14px",
//                             fontstyle: "normal",
//                             fontWeight: "500",
//                             lineHeight: "22px",
//                             letterSpacing: "0.07px",
//                         }}
//                     >
//                         Video Plan
//                     </Typography>
//                 </div>
//                 <div className="first-plan-content">
//                     <CustomTextField
//                         label="Price"
//                         helperText={""}
//                         defaultValue={pricing?.video}
//                         textcss={{
//                             width: "250px",
//                             height: "56px",
//                             flexShrink: "0",
//                             color: "#787579",
//                             fontfamily: "poppins",
//                             fontsize: "16px",
//                             fontstyle: "normal",
//                             fontweight: "400",
//                             lineHeight: "24px",
//                         }}
//                         onChange={(event) => {
//                             setPricing({
//                                 ...pricing,
//                                 video: event?.target?.value,
//                             });
//                             setVideoPlan({
//                                 ...videoPlan,
//                                 plan_fee: event?.target?.value,
//                             });

//                             if (!checkBoxIsDisable?.video) {
//                                 // Adding the plan to the payload
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, videoPlan],
//                                 });
//                             } else {
//                                 // Update plan fee in listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.map((planItem) => {
//                                     if (planItem?.plan_name === "video") {
//                                         return {
//                                             ...planItem,
//                                             plan_fee: event?.target?.value,
//                                         };
//                                     } else {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                         type={"number"}
//                         isDisabled={!checkBoxIsDisable?.video}
//                     />
//                     <CustomDropdown
//                         label={"Duration"}
//                         items={dropdownItems}
//                         activeItem={duration?.video}
//                         isDisabled={!checkBoxIsDisable?.video}
//                         handleChange={(item) => {
//                             setDuration({ ...duration, video: item });
//                             setVideoPlan({
//                                 ...videoPlan,
//                                 plan_duration: item,
//                             });

//                             if (!checkBoxIsDisable?.video) {
//                                 // Adding the plan to the payload
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, videoPlan],
//                                 });
//                             } else {
//                                 // Update plan duration in listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.map((planItem) => {
//                                     if (planItem?.plan_name === "video") {
//                                         return {
//                                             ...planItem,
//                                             plan_duration: item,
//                                         };
//                                     } else {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                     />
//                 </div>
//                 <div className="save-button" style={{display : saveButtonEnable ? 'block' : 'none' }} >
//                     <CustomButton
//                         label="Save"
//                         handleClick={() => {
//                             setAddListingFlag(true);
//                         }}
//                     />
//                 </div>
//             </CustomModal>
//         </>
//     );
// };

// export default ListingModal;

// import React, { Fragment, useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";
// import CustomButton from "../../../../components/CustomButton";
// import CustomModal from "../../../../components/CustomModal";
// import CustomTextField from "../../../../components/CustomTextField";
// import CustomDropdown from "../../../../components/CustomDropdown";
// import "./addplan.scss";
// import CustomCheckBox from "../../../../components/CustomCheckBox";
// import axiosInstance from "../../../../config/axiosInstance";
// import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";

// const ListingModal = ({RenderDataAfterAddingPlan}) => {
//     useEffect(() => {
//         localStorage.setItem("activeComponent", "listing");
//         localStorage.setItem("path", "addplans");
//     }, []);

//     const [plandata, setplandata] = useState([]);
//     const dropdownItems = ["15 minutes" ,"30 minutes", "45 minutes" ,"60 minutes", "90minutes"];
//     const [openDialog, setOpenDialog] = useState(false);
//     const [addListingflag, setAddListingFlag] = useState(false);
//     const [planmessage , setPlanmessage] = useState("");
//     const [isopen , setIsopen] = useState(false);
//     const [listingPayload, setListingPayload] = useState({
//         plan: [],
//     });

//     const AddListing = async () => {
//         RenderDataAfterAddingPlan(false)
//         try {
//             let response = await axiosInstance.post(
//                 "/sec/createUpdatedoctorlisting/planCreate",
//                 JSON.stringify(listingPayload),
//             );
//             // Add Snack Bar here
//             console.log("listing added succesfully", response?.data?.response?.message);
//             RenderDataAfterAddingPlan(true)
//             setPlanmessage(response?.data?.response?.message);
//             setAddListingFlag(false);
//             setIsopen(true);
//         } catch (error) {
//             console.log("Listing not Added : ", error);
//             setAddListingFlag(false);
//             RenderDataAfterAddingPlan(false);
//             setIsopen(false);
//         }
//     };

//     useEffect(() => {
//         if (addListingflag) {
//             AddListing();
//         }
//     }, [addListingflag]);

//     const [messagingPlan, setMessagingPlan] = useState({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_fee: null,
//         plan_name: "message",
//         plan_duration: null,
//         is_trial: 1,
//         plan_description: "message plan for chatting",
//     });

//     const [audioPlan, setAudioPlan] = useState({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_fee: null,
//         plan_name: "call",
//         plan_duration: null,
//         is_trial: 1,
//         plan_description: "audio plan for audio",
//     });

//     const [videoPlan, setVideoPlan] = useState({
//         doctor_id: localStorage.getItem("doctor_suid"),
//         doctor_list_id: localStorage.getItem("listing_id"),
//         plan_fee: null,
//         plan_name: "video",
//         plan_duration: null,
//         is_trial: 1,
//         plan_description: "video plan for video",
//     });

//     console.log("listingPayload : ", listingPayload);

//     const [duration, setDuration] = useState({
//         messaging: null,
//         audio: null,
//         video: null,
//     });

//     const [pricing, setPricing] = useState({
//         messaging: null,
//         audio: null,
//         video: null,
//     });
//     const [checkBoxIsDisable, setCheckBoxIsDisable] = useState({
//         messaging: false,
//         audio: false,
//         video: false,
//     });

//     return (
//         <>
//             <CustomSnackBar isOpen={isopen} message={planmessage} type={"success"} />
//             <CustomButton
//                 label="Add"
//                 isTransaprent={"True"}
//                 isElevated
//                 handleClick={() => setOpenDialog(!openDialog)}
//                 buttonCss={{
//                     display: "flex",
//                     borderBottom: "1px",
//                     borderLeft: "1px",
//                     borderRight: "1px",
//                     borderTop: "1px",
//                     fontfamily: "poppins",
//                     fontsize: "16px",
//                     fontstyle: "normal",
//                     fontweight: "500",
//                     lineheight: "30px",
//                     color: "#E72B4A",
//                 }}
//             ></CustomButton>
//             <CustomModal
//                 style={{
//                     display: "flex",
//                 }}
//                 isOpen={openDialog}
//                 title={
//                     <Box
//                         sx={{
//                             border: "1px solid #E6E1E5",
//                             borderTop: "1px",
//                             borderRight: "1px",
//                             borderLeft: "1px",
//                             width: "570px",
//                             height: "82px",
//                             display: "flex",
//                             justifycontent: "flexstart",
//                         }}
//                     >
//                         <h2
//                             style={{
//                                 textAlign: "left",
//                                 fontfamily: "poppins",
//                                 fontSize: "20px",
//                                 fontstyle: "normal",
//                                 fontweight: "500",
//                                 lineheight: "30px",
//                                 width: "101px",
//                                 height: "30px",
//                             }}
//                         >
//                             Add Plans
//                         </h2>
//                     </Box>
//                 }
//                 footer={
//                     <Fragment>

//                     </Fragment>
//                 }
//             >
//                 <div className="first-plan">
//                     <CustomCheckBox
//                         checked={checkBoxIsDisable?.messaging}
//                         onChange={() => {
//                             setCheckBoxIsDisable({
//                                 ...checkBoxIsDisable,
//                                 messaging: !checkBoxIsDisable.messaging,
//                             });

//                             if (!checkBoxIsDisable?.messaging) {
//                                 // Adding the plan to the payload
//                                 console.log("Audio Plan : ", checkBoxIsDisable?.messaging);
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, messagingPlan],
//                                 });
//                             } else {
//                                 // Remove audio from listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.filter((planItem) => {
//                                     if (
//                                         planItem?.plan_name === "video" ||
//                                         planItem?.plan_name === "call"
//                                     ) {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                     ></CustomCheckBox>
//                     <Typography
//                         style={{
//                             fontFamily: "poppins",
//                             fontsize: "14px",
//                             fontstyle: "normal",
//                             fontWeight: "500",
//                             lineHeight: "22px",
//                             letterSpacing: "0.07px",
//                         }}
//                     >
//                         Messaging Plan
//                     </Typography>
//                 </div>
//                 <div className="first-plan-content">
//                     <CustomTextField
//                         label="Price"
//                         helperText={""}
//                         defaultValue={pricing?.messaging}
//                         textcss={{
//                             width: "250px",
//                             height: "56px",
//                             flexShrink: "0",
//                             color: "#787579",
//                             fontfamily: "poppins",
//                             fontsize: "16px",
//                             fontstyle: "normal",
//                             fontweight: "400",
//                             lineHeight: "24px",
//                         }}
//                         onChange={(event) => {
//                             setPricing({
//                                 ...pricing,
//                                 messaging: event?.target?.value,
//                             });
//                             setMessagingPlan({
//                                 ...messagingPlan,
//                                 plan_fee: event?.target?.value,
//                             });

//                             if (!checkBoxIsDisable?.messaging) {
//                                 // Adding the plan to the payload
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, messagingPlan],
//                                 });
//                             } else {
//                                 // Remove videoPlan from listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.map((planItem) => {
//                                     if (planItem?.plan_name === "message") {
//                                         return {
//                                             ...planItem,
//                                             plan_fee: event?.target?.value,
//                                         };
//                                     } else {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                         type={"number"}
//                         isDisabled={!checkBoxIsDisable?.messaging}
//                     ></CustomTextField>
//                     <CustomDropdown
//                         label={"Duration"}
//                         items={dropdownItems}
//                         activeItem={duration?.messaging}
//                         isDisabled={!checkBoxIsDisable?.messaging}
//                         handleChange={(item) => {
//                             setDuration({ ...duration, messaging: item });
//                             setMessagingPlan({
//                                 ...messagingPlan,
//                                 plan_duration: item,
//                             });

//                             if (!checkBoxIsDisable?.messaging) {
//                                 // Adding the plan to the payload
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, messagingPlan],
//                                 });
//                             } else {
//                                 // Remove videoPlan from listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.map((planItem) => {
//                                     if (planItem?.plan_name === "message") {
//                                         return {
//                                             ...planItem,
//                                             plan_duration: item,
//                                         };
//                                     } else {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                         dropdowncss={{
//                             width: "230px",
//                             height: "56px",
//                             color: "#E6E1E5",
//                         }}
//                         // isDisabled={!allChecked}
//                     />
//                 </div>

//                 <div className="third-plan">
//                     <CustomCheckBox
//                         checked={checkBoxIsDisable?.video}
//                         onChange={() => {
//                             setCheckBoxIsDisable({
//                                 ...checkBoxIsDisable,
//                                 video: !checkBoxIsDisable.video,
//                             });

//                             if (!checkBoxIsDisable?.video) {
//                                 // Adding the plan to the payload
//                                 console.log("Audio Plan : ", checkBoxIsDisable?.video);
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, videoPlan],
//                                 });
//                             } else {
//                                 // Remove videoPlan from listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.filter((planItem) => {
//                                     if (
//                                         planItem?.plan_name === "message" ||
//                                         planItem?.plan_name === "call"
//                                     ) {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                         // checked={}
//                         // onChange={() => handleCheckBoxChange("cancelled")}
//                     />
//                     <Typography
//                         style={{
//                             fontFamily: "poppins",
//                             fontsize: "14px", plan: [{
//     plan_fee: null,
//     plan_name: null,
//     plan_duration: null,
//     plan_description: null,
// }]
//                             fontstyle: "normal",
//                             fontWeight: "500",
//                             lineHeight: "22px",
//                             letterSpacing: "0.07px",
//                         }}
//                     >
//                         Video Plan
//                     </Typography>
//                 </div>
//                 <div className="third-plan-content">
//                     <CustomTextField
//                         label="Price"
//                         helperText={""}
//                         textcss={{
//                             width: "250px",
//                             height: "56px",
//                             flexShrink: "0",
//                             color: "#787579",
//                             fontfamily: "poppins",
//                             fontsize: "16px",
//                             fontstyle: "normal",
//                             fontweight: "400",
//                             lineHeight: "24px",
//                             overflowY: "hidden",
//                             overflowX: "hidden",
//                         }}
//                         defaultValue={pricing?.video}
//                         onChange={(event) => {
//                             setPricing({
//                                 ...pricing,
//                                 video: event?.target?.value,
//                             });
//                             setVideoPlan({
//                                 ...videoPlan,
//                                 plan_fee: event?.target?.value,
//                             });

//                             if (!checkBoxIsDisable?.video) {
//                                 // Adding the plan to the payload
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, videoPlan],
//                                 });
//                             } else {
//                                 // Remove videoPlan from listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.map((planItem) => {
//                                     if (planItem?.plan_name === "video") {
//                                         return {
//                                             ...planItem,
//                                             plan_fee: event?.target?.value,
//                                         };
//                                     } else {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                         type={"number"}
//                         isDisabled={!checkBoxIsDisable?.video}
//                     ></CustomTextField>
//                     <CustomDropdown
//                         label={"Duration"}
//                         items={dropdownItems}
//                         activeItem={duration?.video}
//                         isDisabled={!checkBoxIsDisable.video}
//                         handleChange={(item) => {
//                             setDuration({ ...duration, video: item });
//                             setVideoPlan({ ...videoPlan, plan_duration: item });

//                             if (!checkBoxIsDisable?.video) {
//                                 // Adding the plan to the payload
//                                 setListingPayload({
//                                     ...listingPayload,
//                                     plan: [...listingPayload.plan, videoPlan],
//                                 });
//                             } else {
//                                 // Remove videoPlan from listingPayload.plan
//                                 const updatedPlan = listingPayload.plan.map((planItem) => {
//                                     if (planItem?.plan_name === "video") {
//                                         return {
//                                             ...planItem,
//                                             plan_duration: item,
//                                         };
//                                     } else {
//                                         return planItem;
//                                     }
//                                 });
//                                 setListingPayload((prevState) => ({
//                                     ...prevState,
//                                     plan: updatedPlan,
//                                 }));
//                             }
//                         }}
//                         dropdowncss={{
//                             width: "230px",
//                             height: "56px",
//                             color: "#E6E1E5",
//                         }}
//                         // isDisabled={!cancelledChecked}
//                     />
//                 </div>
//                 <div className="save-button">
//                     <CustomButton
//                         label="Save"
//                         handleClick={() => {
//                             setAddListingFlag(true);
//                         }}
//                     />
//                 </div>
//             </CustomModal>
//         </>
//     );
// };
// export default ListingModal;
