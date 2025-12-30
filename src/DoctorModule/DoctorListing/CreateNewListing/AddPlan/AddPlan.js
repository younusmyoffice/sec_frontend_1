import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Skeleton, Tooltip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../../../components/CustomButton";
import "./addplan.scss";
import axiosInstance from "../../../../config/axiosInstance";
import ListingModal from "./ListingModal";
import AddPlanCard from "./AddPlanCard";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import { useListingMode } from "../../shared/useListingMode";
import SectionCard from "../../shared/SectionCard";
import StepHeader from "../../shared/StepHeader";
import DoctorProfileCard from "../../../../components/DoctorProfileCard/DoctorProfileCard";

const AddPlans = () => {
    const { mode, listingId, doctorId, setUnifiedListingId } = useListingMode();
    const navigate = useNavigate();
    const [plandata, setPlandata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [renderthedataAfterDelete, setRenderTheApiAfterDelete] = useState(false);
    const [renderDataAfterAddPlan, setRenderDataAfterAddPlan] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [snackmessage, setSnackmessage] = useState("");
    const [snackType, setSnackType] = useState("success");
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

    /**
     * Initialize component on mount
     * Sets localStorage paths and ensures listing_id is synced
     * Validates that listing_id exists before allowing user to proceed
     */
    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "addplans");
        
        // Ensure listing_id is set consistently in edit mode
        // Syncs editing_listing_id into listing_id for components that check listing_id
        setUnifiedListingId();

        // Step guard: require listing_id to proceed
        // Prevents users from accessing this step without completing Listing Details first
        if (!listingId) {
            console.warn("No listing_id found. Redirecting to listing details.");
            navigate("/doctorDashboard/doctorListing/listingdetails", { replace: true });
        }
    }, []);

    /**
     * Fetch existing plans for the current listing
     * Only called in edit mode to load previously saved plans
     * Sets loading state and handles API errors gracefully
     */
    const fetchAddPlans = async () => {
        setIsOpen(false);
        setLoading(true); // Show loader while fetching
        try {
            const response = await axiosInstance.post("/sec/createUpdatedoctorlisting/planAll", {
                doctor_id: doctorId,
                doctor_list_id: listingId,
            });
            setSnackmessage(response?.data?.response?.body || "Plans fetched successfully.");
            setSnackType("success");
            setIsOpen(true);

            if (response?.data?.response?.allPlan === undefined) {
                // No plans found - set empty array
                setPlandata([]);
            } else {
                // Debug logging (remove in production or use logger)
                console.log("AddPlan - Full API response:", response?.data);
                console.log("AddPlan - API response structure:", response?.data?.response);
                console.log("AddPlan - API response allPlan:", response?.data?.response?.allPlan);
                if (response?.data?.response?.allPlan && response?.data?.response?.allPlan.length > 0) {
                    console.log("AddPlan - First plan item:", response?.data?.response?.allPlan[0]);
                    console.log("AddPlan - First plan item keys:", Object.keys(response?.data?.response?.allPlan[0] || {}));
                }
                setPlandata(response?.data?.response?.allPlan);
            }
        } catch (err) {
            console.log("error", err);
            setSnackmessage("Something went wrong while fetching plans.");
            setSnackType("error");
            setIsOpen(true);
        } finally {
            setLoading(false); // Hide loader after fetch completes
        }
    };

    /**
     * Re-fetch plans after delete or add operations
     * Triggers when renderthedataAfterDelete or renderDataAfterAddPlan changes
     */
    useEffect(() => {
        if (renderthedataAfterDelete || renderDataAfterAddPlan) {
            fetchAddPlans();
        }
    }, [renderthedataAfterDelete, renderDataAfterAddPlan]);

    /**
     * Fetch plans on mount IF in edit mode
     * IMPORTANT: Only fetches in edit mode to avoid unnecessary API calls
     * In create mode, initializes with empty array and stops loading immediately
     */
    useEffect(() => {
        // Only fetch plans if we're in edit mode
        if (mode === 'edit' && listingId) {
            fetchAddPlans();
        } else {
            // In create mode, set empty array and stop loading
            // No need to fetch plans for a new listing
            setPlandata([]);
            setLoading(false);
        }
    }, [mode, listingId]);

    const RendenDataAfterDelete = (value) => {
        setRenderTheApiAfterDelete(value);
    };

    const RenderDataAfterAddingPlan = (value) => {
        setRenderDataAfterAddPlan(value);
    };

    const handlePlanUpdated = () => {
        fetchAddPlans();
    };

    return (
        <>
            <CustomSnackBar type={snackType} isOpen={isOpen} message={snackmessage} />

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
                <SectionCard
                  title="Add Plans"
                  subtitle="Create consultation plans (message or video) with price and duration"
                  actions={
                    <ListingModal RenderDataAfterAddingPlan={RenderDataAfterAddingPlan} />
                  }
                >
                  {/* LOADER: Show skeleton loaders while fetching plans in edit mode */}
                  {loading ? (
                      // Display 3 skeleton cards while loading
                      Array.from({ length: 3 }).map((_, index) => (
                          <Box key={index} sx={{ marginBottom: 2 }}>
                              <Skeleton variant="rectangular" width="100%" height={80} />
                          </Box>
                      ))
                  ) : plandata.length === 0 ? (
                      // Empty state: No plans found (create mode or no saved plans)
                      <NoAppointmentCard text_one="No Plans found" />
                  ) : (
                      plandata.map((plan, index) => (
                          <AddPlanCard
                              key={index}
                              planCardData={plan}
                              index={index}
                              RendenDataAfterDelete={RendenDataAfterDelete}
                              onPlanUpdated={handlePlanUpdated}
                          />
                      ))
                  )}
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
                    <Tooltip title={plandata.length === 0 ? "Add at least one plan to continue" : ""} disableHoverListener={plandata.length !== 0}>
                        <div style={{ display: 'inline-block' }}>
                            <CustomButton
                                buttonCss={{ 
                                    width: "10.625rem", 
                                    borderRadius: "6.25rem", 
                                    marginLeft: "0.5rem",
                                    fontFamily: "poppins",
                                    backgroundColor: "#E72B4A",
                                    color: "#ffffff",
                                }}
                                label="Next"
                                isDisabled={plandata.length === 0}
                                handleClick={() =>
                                    navigate("/doctorDashboard/doctorListing/addquestioner")
                                }
                            />
                        </div>
                    </Tooltip>
                </Box>
            </div>
        </>
    );
};

export default AddPlans;
