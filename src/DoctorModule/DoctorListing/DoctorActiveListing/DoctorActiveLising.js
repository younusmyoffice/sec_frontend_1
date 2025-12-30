/**
 * DoctorActiveListing Component
 * 
 * Displays all active listings for the doctor:
 * - Shows list of active listings with cards
 * - Allows creating new listings
 * - Provides delete and deactivate actions
 * - Edit functionality for existing listings
 * 
 * Features:
 * - Scrollable listing container
 * - Loading states with skeletons
 * - Empty state handling
 * - Error handling with toast notifications
 * - Confirmation modals for destructive actions
 * 
 * @component
 */

import React, { useEffect, useState, useCallback } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import "./doctorActiveListing.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import CustomDrActiveListingCard from "../../CustomDoctorComponent/Cards/CustomDrActiveListingCard/CustomDrActiveListingCard";
import DoctorListingNavbar from "../../CustomDoctorComponent/DoctorListingNavbar/DoctorListingBavbar";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import CustomSnackBar from "../../../components/CustomSnackBar";
import logger from "../../../utils/logger";
import toastService from "../../../services/toastService";
import CustomModal from "../../../components/CustomModal";

const DoctorActiveListing = () => {
    const [activeListing, setActiveListing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDoctorListFlag, setDeleteDoctorListFlag] = useState(false);
    const [snackmessage, setSnackmessage] = useState("");
    const [deleteListing, setDeleteListing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const navigate = useNavigate();

    /**
     * Validate doctor ID from localStorage
     * SECURITY: Ensures doctor ID is present before making API calls
     * 
     * @returns {string|null} Doctor ID or null if invalid
     */
    const validateDoctorId = useCallback(() => {
        const doctorId = localStorage.getItem("doctor_suid");
        
        if (!doctorId) {
            logger.warn("⚠️ Doctor ID not found in localStorage");
            toastService.warning("Doctor ID is missing. Please log in again.");
            return null;
        }
        
        logger.debug("✅ Doctor ID validated:", doctorId);
        return doctorId;
    }, []);

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "doctoractiveListing");
        
        // Hide location search container
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
        }
        
        // Clean up any editing state when returning to active listing
        const editingListingId = localStorage.getItem("editing_listing_id");
        if (editingListingId) {
            logger.debug("🧹 Cleaned up editing state:", editingListingId);
            localStorage.removeItem("editing_listing_id");
        }
        
        logger.debug("🔵 DoctorActiveListing component initialized");
        
        // Cleanup
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
            }
        };
    }, []);

    /**
     * Fetch active listings from the server
     * Loads all active listings for the current doctor
     */
    const fetchActiveListing = useCallback(async () => {
        const doctorId = validateDoctorId();
        if (!doctorId) {
            setLoading(false);
            return;
        }

        logger.debug("📋 Fetching active listings");
        setLoading(true);
        
        try {
            const response = await axiosInstance.get(
                `/sec/doctor/DocListingPlanActive/${doctorId}`,
            );
            
            const listings = response?.data?.DocListingPlanActive || [];
            logger.debug("✅ Active listings received", {
                count: listings.length,
                message: response?.data?.message
            });
            
            setActiveListing(listings);
            setSnackmessage(response?.data?.message || "Listings loaded successfully");
            setDeleteDoctorListFlag(false);
        } catch (err) {
            logger.error("❌ Failed to fetch active listings:", err);
            toastService.error(
                err?.response?.data?.message || 
                "Failed to load active listings"
            );
            setActiveListing([]);
            setDeleteDoctorListFlag(false);
        } finally {
            setLoading(false);
        }
    }, [validateDoctorId]);

    /**
     * Handle delete listing confirmation
     * Opens confirmation modal before deletion
     * 
     * @param {number} listID - Listing ID to delete
     */
    const handleDeleteClick = (listID) => {
        logger.debug("🗑️ Delete listing requested:", listID);
        setSelectedListing(listID);
        setShowDeleteModal(true);
    };

    /**
     * Delete doctor listing after confirmation
     * Permanently removes the listing from the system
     * 
     * @param {number} listID - Listing ID to delete
     */
    const DeleteDoctorListing = async (listID) => {
        const doctorId = validateDoctorId();
        if (!doctorId) {
            return;
        }

        logger.debug("🗑️ Deleting listing:", listID);
        setDeleteListing(false);
        setShowDeleteModal(false);
        
        try {
            const response = await axiosInstance.post("/sec/doctor/deleteDocListingPlan", {
                doctor_id: Number(doctorId),
                doctor_list_id: Number(listID),
            });
            
            if (response.status === 200 || response.status === 202) {
                logger.debug("✅ Listing deleted successfully");
                setSnackmessage(response?.data?.message || "Listing deleted successfully");
                setDeleteDoctorListFlag(true);
                setDeleteListing(true);
                toastService.success("Listing deleted successfully");
                // Refresh the list
                await fetchActiveListing();
            }
        } catch (err) {
            logger.error("❌ Failed to delete listing:", err);
            toastService.error(
                err?.response?.data?.message || 
                "Failed to delete listing"
            );
            setDeleteDoctorListFlag(false);
            setDeleteListing(false);
        }
    };

    /**
     * Handle deactivate listing confirmation
     * Opens confirmation modal before deactivation
     * 
     * @param {number} doctor_id - Doctor ID
     * @param {number} doctor_list_id - Listing ID to deactivate
     */
    const handleDeactivateClick = (doctor_id, doctor_list_id) => {
        logger.debug("🔴 Deactivate listing requested:", { doctor_id, doctor_list_id });
        setSelectedListing({ doctor_id, doctor_list_id });
        setShowDeactivateModal(true);
    };

    /**
     * Change active state of listing (deactivate)
     * Sets listing to inactive so patients won't see it
     * 
     * @param {number} doctor_id - Doctor ID
     * @param {number} doctor_list_id - Listing ID to deactivate
     */
    const ChangeActiveState = async (doctor_id, doctor_list_id) => {
        logger.debug("🔴 Deactivating listing:", { doctor_id, doctor_list_id });
        setDeleteDoctorListFlag(false);
        setShowDeactivateModal(false);
        
        // Validate inputs
        if (!doctor_id || !doctor_list_id) {
            logger.error("❌ Missing required parameters:", { doctor_id, doctor_list_id });
            toastService.error("Missing required information. Please try again.");
            return;
        }
        
        const payload = {
            doctor_id: Number(doctor_id),
            doctor_list_id: Number(doctor_list_id),
            is_active: 0, // deactivate
        };
        
        logger.debug("📤 Sending deactivate request:", payload);
        logger.debug("📤 API endpoint: /sec/doctor/docListingActiveDeactive");
        
        try {
            const response = await axiosInstance.post(`/sec/doctor/docListingActiveDeactive`, payload);
            
            logger.debug("✅ API Response:", response?.data);
            logger.debug("✅ Listing deactivated successfully");
            
            const message = response?.data?.response?.message || 
                           response?.data?.message || 
                           "Listing deactivated successfully";
            
            setSnackmessage(message);
            setDeleteDoctorListFlag(true);
            toastService.success(message);
            
            // Refresh the list
            await fetchActiveListing();
        } catch (err) {
            logger.error("❌ Failed to deactivate listing:", err);
            logger.error("❌ Error response:", err?.response?.data);
            logger.error("❌ Error status:", err?.response?.status);
            
            const errorMessage = err?.response?.data?.message || 
                               err?.response?.data?.response?.message ||
                               err?.message ||
                               "Failed to deactivate listing. Please check your connection and try again.";
            
            toastService.error(errorMessage);
            setSnackmessage(errorMessage);
            setDeleteDoctorListFlag(true); // Show error message
        }
    };

    /**
     * Handle edit listing navigation
     * Stores listing ID and navigates to edit page
     * 
     * @param {number} listingId - Listing ID to edit
     */
    const handleEditListing = (listingId) => {
        logger.debug("✏️ Editing listing:", listingId);
        // Store the listing ID for editing
        localStorage.setItem("editing_listing_id", listingId);
        // Navigate to the listing details page for editing
        navigate("/doctorDashboard/doctorListing/listingdetails");
    };

    useEffect(() => {
        fetchActiveListing();
    }, [fetchActiveListing]);

    return (
        <>
            <CustomSnackBar 
                message={snackmessage} 
                isOpen={deleteDoctorListFlag} 
                type={"success"} 
            />
            
            {/* Delete Confirmation Modal */}
            <CustomModal
                isOpen={showDeleteModal}
                conditionOpen={setShowDeleteModal}
                title="Delete Listing"
            >
                <Box sx={{ padding: "1.5rem", textAlign: "center" }}>
                    <Typography
                        sx={{
                            fontFamily: "Poppins",
                            fontSize: "1rem",
                            fontWeight: "400",
                            color: "#313033",
                            lineHeight: "1.5rem",
                            marginBottom: "2rem",
                        }}
                    >
                        Are you sure you want to delete this listing? This action cannot be undone.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                        }}
                    >
                        <CustomButton
                            label="Cancel"
                            isTransaprent={true}
                            buttonCss={{
                                fontFamily: "Poppins",
                                border: "1px solid #E6E1E5",
                                color: "#313033",
                                minWidth: "120px",
                            }}
                            handleClick={() => setShowDeleteModal(false)}
                        />
                        <CustomButton
                            label="Delete"
                            buttonCss={{
                                fontFamily: "Poppins",
                                backgroundColor: "#dc362e",
                                color: "#ffffff",
                                minWidth: "120px",
                                "&:hover": {
                                    backgroundColor: "#c41d37",
                                },
                            }}
                            handleClick={() => selectedListing && DeleteDoctorListing(selectedListing)}
                        />
                    </Box>
                </Box>
            </CustomModal>

            {/* Deactivate Confirmation Modal */}
            <CustomModal
                isOpen={showDeactivateModal}
                conditionOpen={setShowDeactivateModal}
                title="Deactivate Listing"
            >
                <Box sx={{ padding: "1.5rem", textAlign: "center" }}>
                    <Typography
                        sx={{
                            fontFamily: "Poppins",
                            fontSize: "1rem",
                            fontWeight: "400",
                            color: "#313033",
                            lineHeight: "1.5rem",
                            marginBottom: "2rem",
                        }}
                    >
                        Deactivate this listing? Patients will no longer see it.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                        }}
                    >
                        <CustomButton
                            label="Cancel"
                            isTransaprent={true}
                            buttonCss={{
                                fontFamily: "Poppins",
                                border: "1px solid #E6E1E5",
                                color: "#313033",
                                minWidth: "120px",
                            }}
                            handleClick={() => setShowDeactivateModal(false)}
                        />
                        <CustomButton
                            label="Deactivate"
                            buttonCss={{
                                fontFamily: "Poppins",
                                minWidth: "120px",
                            }}
                            handleClick={() => {
                                if (selectedListing?.doctor_id && selectedListing?.doctor_list_id) {
                                    ChangeActiveState(selectedListing.doctor_id, selectedListing.doctor_list_id);
                                }
                            }}
                        />
                    </Box>
                </Box>
            </CustomModal>

            <Box
                className="doctor-active-listing-container"
                sx={{
                    display: "flex",
                    width: "95%",
                    height: "100%",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* Fixed header with navbar and create button */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem",
                        flexWrap: "wrap",
                        gap: "1rem",
                        flexShrink: 0,
                        zIndex: 10,
                        position: "relative",
                        minHeight: "70px",
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <DoctorListingNavbar />
                    </Box>
                    <CustomButton
                        label="Create New"
                        isTransaprent={false}
                        buttonCss={{
                            width: "170px",
                            height: "2.5rem",
                            borderRadius: "20px",
                            fontFamily: "Poppins",
                            fontWeight: "500",
                            transition: "all 0.2s ease",
                        }}
                        handleClick={() => {
                            // Clear any existing editing state when creating new
                            localStorage.removeItem("editing_listing_id");
                            navigate("/doctorDashboard/doctorListing/listingdetails");
                        }}
                    />
                </Box>

                {/* Scrollable content area */}
                <Box
                    sx={{
                        flex: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        overflow: "hidden",
                    }}
                >
                    {/* Scrollable listing container - cards scroll internally when content exceeds maxHeight */}
                    <Box
                        sx={{
                            width: "100%",
                            border: "1px solid #E6E1E5",
                            borderRadius: "0.5rem",
                            padding: "1rem",
                            minHeight: "55vh",
                            maxHeight: "calc(100vh - 320px)", // Adjusted to account for navbar and header
                            overflowY: "auto", // Internal scrolling when cards exceed container height
                            overflowX: "hidden", // Prevent horizontal scrolling
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                           {/* LOADER: Show skeleton loaders while fetching active listings */}
                           {loading ? (
                               // Display 3 skeleton cards while loading listings
                               Array.from({ length: 3 }).map((_, index) => (
                                   <Skeleton
                                       key={index}
                                       variant="rectangular"
                                       width="100%"
                                       height={120}
                                       sx={{ borderRadius: "0.5rem" }}
                                   />
                               ))
                           ) : activeListing.length === 0 ? (
                               // Empty state: No active listings found
                            <NoAppointmentCard text_one={"No Active Listings Found"} />
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
                                        handleDeleteClick(card?.doctor_list_id)
                                    }
                                    buttonTwoLabel={"Deactivate"}
                                    onhandleClickButtonTwo={() =>
                                        handleDeactivateClick(card?.doctor_id, card?.doctor_list_id)
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
