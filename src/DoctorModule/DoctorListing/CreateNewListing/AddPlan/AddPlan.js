import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Skeleton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

const AddPlans = () => {
    const { mode, listingId, doctorId, setUnifiedListingId } = useListingMode();

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "addplans");
        
        // Ensure listing_id is set consistently in edit mode
        setUnifiedListingId();

        // Step guard: require listing_id to proceed
        if (!listingId) {
            console.warn("No listing_id found. Redirecting to listing details.");
            navigate("/doctordashboard/doctorListing/listingdetails", { replace: true });
        }
    }, []);

    const [plandata, setPlandata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [renderthedataAfterDelete, setRenderTheApiAfterDelete] = useState(false);
    const [renderDataAfterAddPlan, setRenderDataAfterAddPlan] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [snackmessage, setSnackmessage] = useState("");
    const [snackType, setSnackType] = useState("success"); // NEW: snackbar type
    const navigate = useNavigate();

    const fetchAddPlans = async () => {
        setIsOpen(false);
        setLoading(true);
        try {
            const response = await axiosInstance.post("/sec/createUpdatedoctorlisting/planAll", {
                doctor_id: doctorId,
                doctor_list_id: listingId,
            });
            setSnackmessage(response?.data?.response?.body || "Plans fetched successfully.");
            setSnackType("success");
            setIsOpen(true);

            if (response?.data?.response?.allPlan === undefined) {
                setPlandata([]);
            } else {
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
            setLoading(false);
        }
    };

    useEffect(() => {
        if (renderthedataAfterDelete || renderDataAfterAddPlan) {
            fetchAddPlans();
        }
    }, [renderthedataAfterDelete, renderDataAfterAddPlan]);

    useEffect(() => {
        fetchAddPlans();
    }, []);

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

            <div className="main-container" style={{ width: '100%', maxWidth: 960, margin: '0 auto' }}>
                <StepHeader />
                <SectionCard
                  title="Add Plans"
                  subtitle="Create consultation plans (message or video) with price and duration"
                  actions={
                    <ListingModal RenderDataAfterAddingPlan={RenderDataAfterAddingPlan} />
                  }
                >
                  {/* Skeleton Loader or Plans */}
                  {loading ? (
                      Array.from({ length: 3 }).map((_, index) => (
                          <Box key={index} sx={{ marginBottom: 2 }}>
                              <Skeleton variant="rectangular" width="100%" height={80} />
                          </Box>
                      ))
                  ) : plandata.length === 0 ? (
                      <NoAppointmentCard text_one="No listing found" />
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

                {/* Save and Next buttons */}
                <Box sx={{ marginTop: "1%" }}>
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Save As Draft"
                        isTransaprent={true}
                    />
                    <Tooltip title={plandata.length === 0 ? "Add at least one plan to continue" : ""} disableHoverListener={plandata.length !== 0}>
                        <div style={{ display: 'inline-block' }}>
                            <CustomButton
                                buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                                label="Next"
                                isDisabled={plandata.length === 0}
                                handleClick={() =>
                                    navigate("/doctordashboard/doctorListing/addquestioner")
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
