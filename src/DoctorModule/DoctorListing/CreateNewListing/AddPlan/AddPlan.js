import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Typography, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../../../../components/CustomButton";
import "./addplan.scss";
import axiosInstance from "../../../../config/axiosInstance";
import ListingModal from "./ListingModal";
import AddPlanCard from "./AddPlanCard";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import CustomSnackBar from "../../../../components/CustomSnackBar";

const AddPlans = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "addplans");
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
                doctor_id: localStorage.getItem("doctor_suid"),
                doctor_list_id: localStorage.getItem("listing_id"),
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

            <nav className="NavBar-Box-one">
                <NavLink to="/doctordashboard/doctorListing/listingdetails">
                    Listing Details
                </NavLink>
                <NavLink to="/doctordashboard/doctorListing/addplans">Add Plans</NavLink>
                <NavLink to="/doctordashboard/doctorListing/addquestioner">
                    Add Questioner
                </NavLink>
                <NavLink to="/doctordashboard/doctorListing/termandcondition">
                    Term & Conditions
                </NavLink>
            </nav>

            <div className="main-container">
                <div className="Add-container">
                    <Typography>Add Plan</Typography>
                    <div className="Add-addicon">
                        <Box sx={{ marginTop: "0.5rem" }}>
                            <AddIcon />
                        </Box>
                        <div className="Add-btn">
                            <ListingModal RenderDataAfterAddingPlan={RenderDataAfterAddingPlan} />
                        </div>
                    </div>
                </div>

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

                {/* Save and Next buttons */}
                <Box sx={{ marginTop: "1%" }}>
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Save As Draft"
                        isTransaprent={true}
                    />
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Next"
                        handleClick={() =>
                            navigate("/doctordashboard/doctorListing/addquestioner")
                        }
                    />
                </Box>
            </div>
        </>
    );
};

export default AddPlans;
