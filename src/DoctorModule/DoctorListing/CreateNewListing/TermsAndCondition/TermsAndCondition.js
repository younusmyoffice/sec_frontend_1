import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextareaAutosize, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../../../components/CustomButton";
import "./termsandcondition.scss";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import { useListingMode } from "../../shared/useListingMode";
import SectionCard from "../../shared/SectionCard";
import StepHeader from "../../shared/StepHeader";
import DoctorProfileCard from "../../../../components/DoctorProfileCard/DoctorProfileCard";
import logger from "../../../../utils/logger";
import toastService from "../../../../services/toastService";

const TermsAndCondition = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        doctor_id: localStorage.getItem("doctor_suid"),
        doctor_list_id: localStorage.getItem("listing_id"),
        description: null,
    });
    const [submitApiFlag , setSubmitApiFlag] = useState(false);
    const [type , setType] = useState("success");
    const [isopen , setIsopen] = useState(false);
    const [message , setMessage] = useState("")
    const [showError, setShowError] = useState(false);
    const [doctorProfile, setDoctorProfile] = useState({
        name: "",
        specialty: "",
        profileImage: null
    });

    // Fetch doctor profile information
    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const doctorIdLocal = localStorage.getItem("doctor_suid");
                if (doctorIdLocal) {
                    const response = await axiosInstance.get(
                        `sec/Doctor/doctorProfileDetailsbyId?doctor_id=${doctorIdLocal}`
                    );
                    const profileData = response?.data?.response?.[0];
                    if (profileData) {
                        const fullName = `Dr. ${profileData.first_name || ""} ${profileData.middle_name || ""} ${profileData.last_name || ""}`.trim();
                        setDoctorProfile({
                            name: fullName || "Dr. Unknown",
                            specialty: profileData.department_name || profileData.speciality_name || "General Practitioner",
                            profileImage: profileData.profile_picture || null
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching doctor profile:", error);
                const doctorName = localStorage.getItem("doctor_name") || localStorage.getItem("userName");
                setDoctorProfile({
                    name: doctorName ? `Dr. ${doctorName}` : "Dr. Unknown",
                    specialty: "General Practitioner",
                    profileImage: null
                });
            }
        };
        fetchDoctorProfile();
    }, []);
    useEffect( () => {
        if(submitApiFlag){
            fetchData();
        }
    } , [submitApiFlag] )

    const { mode, listingId, doctorId, setUnifiedListingId } = useListingMode();

    // Fetch existing terms if in edit mode
    useEffect(() => {
        const fetchExistingTerms = async () => {
            if (mode === 'edit' && listingId) {
                try {
                    // Try to fetch existing terms from the listing data
                    const response = await axiosInstance.get(`/sec/doctor/DocListingPlanByDoctorListingId/${listingId}`);
                    if (response?.data?.response?.DocListingPlan && response.data.response.DocListingPlan.length > 0) {
                        const listingData = response.data.response.DocListingPlan[0];
                        if (listingData?.terms_description) {
                            setData(prev => ({
                                ...prev,
                                description: listingData.terms_description
                            }));
                        }
                    }
                } catch (error) {
                    console.error("Error fetching existing terms:", error);
                    // Continue with empty description if fetch fails
                }
            } else {
                // In create mode, ensure description is empty
                setData(prev => ({
                    ...prev,
                    description: null
                }));
            }
        };
        fetchExistingTerms();
    }, [mode, listingId]);

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "termandcondition");
        
        // Ensure unified listing id in edit mode
        setUnifiedListingId();
        
        // Step guard: require listing_id to proceed
        if (!listingId) {
            console.warn("No listing_id found. Redirecting to listing details.");
            navigate("/doctorDashboard/doctorListing/listingdetails", { replace: true });
        }
    }, []);


    const fetchData = async () => {
        logger.debug("🔵 Submitting terms and conditions");
        setIsopen(false);
        try {
            if (!data?.description || String(data?.description).trim() === '') {
                setShowError(true);
                setSubmitApiFlag(false);
                toastService.error("Please fill in the terms and conditions");
                return;
            }
            let response = await axiosInstance.post('/sec/createUpdatedoctorlisting/terms' , JSON.stringify({
                ...data,
                doctor_id: doctorId,
                doctor_list_id: listingId,
            }));
            
            const successMessage = response?.data?.response?.message || "Terms and conditions saved successfully";
            logger.info("✅ Terms and conditions saved:", successMessage);
            setMessage(successMessage);
            setSubmitApiFlag(false);
            setType("success");
            setIsopen(true);
            toastService.success(successMessage);
            
            // Clean up editing state when completing the entire flow
            localStorage.removeItem("editing_listing_id");
            logger.debug("✅ Completed listing flow, cleaned up editing state");
            
            setTimeout( () => {
                navigate("/doctorDashboard/doctorListing/doctoractiveListing", { replace: true });
            } , 2000 )

        } catch (error) {
            logger.error("❌ Error saving terms and conditions:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message || 
                               error?.response?.data?.error ||
                               error?.message ||
                               "Failed to save terms and conditions. Please try again.";
            
            toastService.error(errorMessage);
            setSubmitApiFlag(false);
            setType("error");
            setIsopen(true);
            setMessage(errorMessage);
        }
    };


    return (
        <>
            <CustomSnackBar isOpen={isopen} message={message} type={type}  />
            <div className="listing-details-container">
                {/* Header Section */}
                <Box className="listing-header">
                    <Typography variant="h4" className="listing-title">
                        Create New Listing
                    </Typography>
                    <IconButton
                        onClick={() => navigate("/doctorDashboard/doctorListing/doctoractiveListing")}
                        sx={{
                            width: "40px",
                            height: "40px",
                            border: "1px solid #E6E1E5",
                            color: "#313033",
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                            }
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                </Box>

                {/* Step Navigation Tabs */}
                <StepHeader />

                {/* Doctor Profile Card */}
                <Box sx={{ mb: 3 }}>
                    <DoctorProfileCard
                        name={doctorProfile.name}
                        specialty={doctorProfile.specialty}
                        profileImage={doctorProfile.profileImage}
                        variant="compact"
                        onEditClick={() => navigate("/doctorDashboard/doctorPersonalInfo")}
                        showEditButton={true}
                    />
                </Box>

                {/* Main Content */}
                <SectionCard title="Terms & Conditions" subtitle="These will be shown to patients before booking">
                    <Box sx={{ width: '100%' }}>
                        <TextareaAutosize
                            minRows={8}
                            maxRows={8}
                            className="about-textarea"
                            value={data?.description || ""}
                            style={{ 
                                width: "100%", 
                                padding: "16px", 
                                borderRadius: "8px",
                                overflow: "auto",
                                maxHeight: "70%",
                                border: showError && (!data?.description || String(data?.description).trim() === '') ? '2px solid #d32f2f' : '1px solid #E6E1E5',
                                fontFamily: "Poppins",
                                fontSize: "14px",
                            }}
                            onInput={event => setData({...data , description : event?.target?.value})}
                        />
                        {showError && (!data?.description || String(data?.description).trim() === '') && (
                            <Typography sx={{ color: '#d32f2f', fontSize: 12, mt: 0.5, fontFamily: "Poppins" }}>Description is required</Typography>
                        )}
                    </Box>
                </SectionCard>

                {/* Action Buttons - Aligned to right */}
                <Box className="action-buttons">
                    <CustomButton
                        buttonCss={{ 
                            width: "10.625rem", 
                            borderRadius: "6.25rem", 
                            marginLeft: "0.5rem",
                            fontFamily: "poppins",
                            border: "1px solid #E72B4A",
                            color: "#E72B4A",
                        }}
                        label="Save As Draft"
                        isTransaprent={true}
                    />
                    <CustomButton
                        buttonCss={{ 
                            width: "10.625rem", 
                            borderRadius: "6.25rem", 
                            marginLeft: "0.5rem",
                            fontFamily: "poppins",
                            backgroundColor: "#E72B4A",
                            color: "#ffffff",
                        }}
                        label="Submit"
                        isDisabled={!data?.description || String(data?.description).trim() === ''}
                        handleClick={() => setSubmitApiFlag(true)}
                    />
                </Box>
            </div>
        </>
    );
};

export default TermsAndCondition;
