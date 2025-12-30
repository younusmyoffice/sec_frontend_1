import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import DrImage from "../../../static/images/DrImages/image3.png";
import { AppointmentNavbar, CancelledCard } from "../PatientCards";
import NoAppointmentCard from "../NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * Cancelled Component
 * 
 * Displays cancelled appointments for the patient
 * Features:
 * - Fetches and displays cancelled appointments
 * - Pagination support
 * - Loading skeletons
 * - Empty state handling
 * 
 * @component
 */
const Cancelled = () => {
    logger.debug("🔵 Cancelled component rendering");
    
    // Appointment data state
    const [cancelledData, setCancelledData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    /**
     * Get patient ID from localStorage with error handling
     */
    const getPatientId = () => {
        try {
            const patientId = localStorage.getItem("patient_suid");
            if (!patientId) {
                logger.warn("⚠️ Patient ID not found in localStorage");
                toastService.error("Patient information not available");
            }
            return patientId;
        } catch (error) {
            logger.error("❌ Error accessing localStorage:", error);
            toastService.error("Failed to load patient information");
            return null;
        }
    };
    
    const [patient_id, setPatient_id] = useState(getPatientId());

    /**
     * Fetch cancelled appointments from API
     * Retrieves appointments with status "canceled"
     */
    const fetchDataNew = async () => {
        logger.debug("📡 Fetching cancelled appointments", { patient_id });
        setLoading(true);
        
        try {
            // Validate patient ID
            if (!patient_id) {
                logger.error("❌ Patient ID is missing");
                toastService.error("Patient information not available");
                setCancelledData([]);
                setLoading(false);
                return;
            }
            
            const response = await axiosInstance.post(
                "/sec/patient/CancelledAppointments",
                JSON.stringify({
                    patient_id: patient_id,
                    status_cancel: "canceled",
                }),
            );
            
            const appointments = response?.data?.response || [];
            logger.debug("✅ Cancelled appointments fetched successfully", { 
                count: appointments.length 
            });
            
            setCancelledData(appointments);
            
            if (appointments.length > 0) {
                toastService.success(`${appointments.length} cancelled appointment(s) loaded`);
            }
        } catch (error) {
            logger.error("❌ Failed to fetch cancelled appointments:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load cancelled appointments. Please try again later."
            );
            setCancelledData([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Initialize component and fetch data
     * Sets localStorage flags and fetches cancelled appointments
     */
    useEffect(() => {
        logger.debug("🔵 Cancelled component mounting");
        
        try {
            localStorage.setItem("activeComponent", "appointment");
            localStorage.setItem("path", "cancelled");
            logger.debug("✅ Set localStorage flags");
        } catch (error) {
            logger.error("❌ Error setting localStorage:", error);
        }
        
        // Update patient_id from localStorage if not already set
        const currentPatientId = getPatientId();
        if (currentPatientId && currentPatientId !== patient_id) {
            setPatient_id(currentPatientId);
        }
        
        fetchDataNew();
    }, []);

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = cancelledData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(cancelledData.length / itemsPerPage);

    return (
        <Box sx={{ display: "flex", width: "100%", }}>
            <AppointmentNavbar />
            <Box
                sx={{
                    position: "relative",
                    top: "4em",
                    width: "100%",
                    display: "flex",
                    height: "100%",
                }}
            >
                <Box sx={{ width: "100%", height: "100%" }}>
                    <Box
                        sx={{
                            width: "100%",
                            border: "1px solid #E6E1E5",
                            borderRadius: "8px",
                            marginLeft: "3%",
                            height: "100%",
                            padding: "2%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        {loading ? (
                            // Skeleton loader while loading is true
                            Array.from({ length: itemsPerPage }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    width="100%"
                                    height={120}
                                    sx={{ mb: 2, borderRadius: "8px" }}
                                />
                            ))
                        ) : cancelledData.length === 0 ? (
                            <NoAppointmentCard
                                text_one={"You don't have any cancelled appointments"}
                            />
                        ) : (
                            currentData.map((data) => (
                                <CancelledCard 
                                    key={data.id || data.appointment_id} 
                                    data={data} 
                                    DrImage={data.profile_picture || DrImage} 
                                />
                            ))
                        )}

                        {!loading && cancelledData.length > itemsPerPage && (
                            // Pagination control when data exceeds itemsPerPage
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(_, page) => setCurrentPage(page)}
                                color="primary"
                                sx={{ mt: 2, alignSelf: "center" }}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Cancelled;
