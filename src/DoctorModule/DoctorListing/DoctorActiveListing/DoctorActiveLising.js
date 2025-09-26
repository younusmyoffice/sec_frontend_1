import React, { useEffect, useState } from "react";
import { Box, Skeleton, Typography, IconButton } from "@mui/material";
import { Add as AddIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import "./doctorActiveListing.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import CustomDrActiveListingCard from "../../CustomDoctorComponent/Cards/CustomDrActiveListingCard/CustomDrActiveListingCard";
import DoctorListingNavbar from "../../CustomDoctorComponent/DoctorListingNavbar/DoctorListingBavbar";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import CustomSnackBar from "../../../components/CustomSnackBar";

const DoctorActiveListing = () => {
    const [activeListing, setActiveListing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDoctorListFlag, setDeleteDoctorListFlag] = useState(false);
    const [snackmessage , setSnackmessage] = useState("");
    const [deleteListing, setDeleteListing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "doctoractiveListing");
        
        // Clean up any editing state when returning to active listing
        const editingListingId = localStorage.getItem("editing_listing_id");
        if (editingListingId) {
            console.log("Returned to active listing, cleaning up editing state");
            localStorage.removeItem("editing_listing_id");
        }
    }, []);

    const fetchActiveListing = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `/sec/doctor/DocListingPlanActive/${localStorage.getItem("doctor_suid")}`,
            );
            setActiveListing(response?.data?.DocListingPlanActive);
            setSnackmessage(response?.data?.message);
            setDeleteDoctorListFlag(false);
        } catch (err) {
            console.log("Active listing error : ", err);
            setDeleteDoctorListFlag(false);
        } finally {
            setLoading(false);
        }
    };

    const DeleteDoctorListing = async (listID) => {
        console.log("Doctor list ID : ", listID);
        setDeleteListing(false);
        // Confirm delete
        const ok = window.confirm("Are you sure you want to delete this listing? This action cannot be undone.");
        if (!ok) return;
        try {
            const response = await axiosInstance.post("/sec/doctor/deleteDocListingPlan", {
                doctor_id: Number(localStorage.getItem("doctor_suid")),
                doctor_list_id: Number(listID),
            });
            if (response.status === 200 || response.status === 202) {
                setDeleteDoctorListFlag(true);
                setDeleteListing(true);
            }
            console.log("Delete : ", response);
        } catch (err) {
            console.log("Error", err);
            setDeleteDoctorListFlag(false);
            setDeleteListing(false);
        }
    };

    const ChangeActiveState = async (doctor_id, doctor_list_id) => {  // api for deactivation
        setDeleteDoctorListFlag(false);
        const ok = window.confirm("Deactivate this listing? Patients will no longer see it.");
        if (!ok) return;
        try {
            const response = await axiosInstance.post(`/sec/doctor/docListingActiveDeactive`, {
                doctor_id: Number(doctor_id),
                doctor_list_id: Number(doctor_list_id),
                is_active: 0, //deactive
            });
            setSnackmessage(response?.data?.response?.message);
            setDeleteDoctorListFlag(true);
        } catch (err) {
            console.log("DeActivate Error : ", err);
            setDeleteDoctorListFlag(false);
        }
    };

    const handleEditListing = (listingId) => {
        // Store the listing ID for editing
        localStorage.setItem("editing_listing_id", listingId);
        // Navigate to the listing details page for editing
        navigate("/doctordashboard/doctorListing/listingdetails");
    };

    useEffect(() => {
        if (deleteDoctorListFlag) {
            fetchActiveListing();
        }
    }, [deleteDoctorListFlag]);

    useEffect(() => {
        fetchActiveListing();
    }, []);

    return (
        <>
            <CustomSnackBar message={snackmessage} isOpen={deleteDoctorListFlag} type={"success"} />
            <Box
                sx={{
                    display: "flex",
                    width: "95%",
                    height: "100%",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
                        flexWrap: "wrap",
                        gap: "16px"
                    }}
                >
                    <Box>
                        <DoctorListingNavbar />
                    </Box>
                    <div className="">
                        <CustomButton
                            label="Create New"
                            isTransaprent={"True"}
                            buttonCss={{
                                width: "170px",
                                borderRadius: "20px",
                            }}
                            handleClick={() => {
                                // Clear any existing editing state when creating new
                                localStorage.removeItem("editing_listing_id");
                                navigate("/doctordashboard/doctorListing/listingdetails");
                            }}
                        />
                    </div>
                </Box>
                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "0",
                        width: "100%",
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Box
                        component={"div"}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "80%",
                        }}
                    >
                        {loading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    width="100%"
                                    height={80}
                                    sx={{ mb: 2, borderRadius: "8px" }}
                                />
                            ))
                        ) : activeListing.length === 0 ? (
                            <NoAppointmentCard text_one={"No Listing found"} />
                        ) : (
                            activeListing.map((card) => (
                                <CustomDrActiveListingCard
                                    buttonOneLabel={"Delete"}
                                    key={card?.doctor_list_id}
                                    label={card?.listing_name}
                                    Idtype={"Listing ID"}
                                    Idnumber={card?.doctor_list_id}
                                    statusLabel={"Active"}
                                    statusColor={"success"}
                                    onhandleClickButtonOne={() =>
                                        DeleteDoctorListing(card?.doctor_list_id)
                                    }
                                    buttonTwoLabel={"Deactivate"}
                                    onhandleClickButtonTwo={() =>
                                        ChangeActiveState(card?.doctor_id, card?.doctor_list_id)
                                    }
                                    onEditClick={() => handleEditListing(card?.doctor_list_id)}
                                    showEditButton={true}
                                />
                            ))
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DoctorActiveListing;
