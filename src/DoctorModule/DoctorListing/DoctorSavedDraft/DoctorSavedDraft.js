import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import DoctorListingNavbar from "../../CustomDoctorComponent/DoctorListingNavbar/DoctorListingBavbar";
import "./doctorSavedDraft.scss";
import CustomButton from "../../../components/CustomButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomDrActiveListingCard from "../../CustomDoctorComponent/Cards/CustomDrActiveListingCard/CustomDrActiveListingCard";
import CustomSnackBar from "../../../components/CustomSnackBar";
import NoAppointmentCard from "../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance";

const DoctorSavedDraft = () => {
    const [activeListing, setActiveListing] = useState([]);
    const [deleteDoctorListFlag, setDeleteDoctorListFlag] = useState(false);
    const [deleteListing, setDeleteListing] = useState(false);
    const [snackmessage, setSnackmessage] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state

    React.useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "doctorsavedInDraft");
    }, []);

    const fetchActiveListing = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `/sec/doctor/DocListingPlanDeactive/${localStorage.getItem("doctor_suid")}`,
            );
            setActiveListing(response?.data?.DocListingPlanDeactive);
            setDeleteDoctorListFlag(false);
        } catch (err) {
            console.log("Active listing error : ", err);
            setDeleteDoctorListFlag(false);
        } finally {
            setLoading(false);
        }
    };

    const DeleteDoctorListing = async (listID) => {
        setDeleteListing(false);
        setDeleteDoctorListFlag(false);
        try {
            const response = await axiosInstance.post("/sec/doctor/deleteDocListingPlan", {
                doctor_id: localStorage.getItem("doctor_suid"),
                doctor_list_id: listID,
            });
            if (response.status === 200 || response.status === 202) {
                setDeleteDoctorListFlag(true);
                setDeleteListing(true);
                setSnackmessage("Doctor Listing Deleted Successfully");

            }
            console.log("Delete: ", response);
        } catch (err) {
            console.log("Error", err);
            setDeleteDoctorListFlag(false);
            setDeleteListing(false);
        }
    };

    const ChangeActiveState = async (doctor_id, doctor_list_id) => {
        setDeleteDoctorListFlag(false);
        try {
            const response = await axiosInstance.post(`/sec/doctor/docListingActiveDeactive`, {
                doctor_id: doctor_id,
                doctor_list_id: doctor_list_id,
                is_active: 1, // activate
            });
            setSnackmessage(response?.data?.response?.message);
            setDeleteDoctorListFlag(true);

        } catch (err) {
            console.log("DeActivate Error : ", err);
            setDeleteDoctorListFlag(false);
        }
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
                    height: "90%",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <DoctorListingNavbar />
                    </Box>
                    
                </Box>
                <Box
                    component="div"
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "80%",
                        }}
                    >
                        {loading ? (
                            // Skeleton loaders for loading state
                            Array.from(new Array(3)).map((_, index) => (
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
                                    onhandleClickButtonOne={() =>
                                        DeleteDoctorListing(card?.doctor_list_id)
                                    }
                                    buttonTwoLabel={"Activate"}
                                    onhandleClickButtonTwo={() =>
                                        ChangeActiveState(card?.doctor_id, card?.doctor_list_id)
                                    }
                                />
                            ))
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DoctorSavedDraft;
