import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import DrImage from "../../../static/images/DrImages/image3.png";
import { AppointmentNavbar, CompletedCard } from "../PatientCards";
import NoAppointmentCard from "../NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * Completed Component
 * 
 * Displays completed appointments for the patient
 * Features:
 * - Fetches and displays completed appointments
 * - Pagination support
 * - Loading skeletons
 * - Empty state handling
 * 
 * @component
 */
const Completed = () => {
    logger.debug("🔵 Completed component rendering");
    
    // Appointment data state
    const [completedData, setCompletedData] = useState([]);
    const [loading, setLoading] = useState(true);
    
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

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Dynamic items per page

    /**
     * Fetch completed appointments from API
     * Retrieves appointments with status "completed"
     */
    const fetchDataNew = async () => {
        logger.debug("📡 Fetching completed appointments", { patient_id });
        setLoading(true);
        
        try {
            // Validate patient ID
            if (!patient_id) {
                logger.error("❌ Patient ID is missing");
                toastService.error("Patient information not available");
                setCompletedData([]);
                setLoading(false);
                return;
            }
            
            const response = await axiosInstance.post(
                "/sec/patient/CompletedAppointments", 
                JSON.stringify({
                    patient_id,
                    status_complete: "completed",
                })
            );
            
            const appointments = response?.data?.response || [];
            logger.debug("✅ Completed appointments fetched successfully", { 
                count: appointments.length 
            });
            
            setCompletedData(appointments);
            
            if (appointments.length > 0) {
                toastService.success(`${appointments.length} completed appointment(s) loaded`);
            }
        } catch (error) {
            logger.error("❌ Failed to fetch completed appointments:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load completed appointments. Please try again later."
            );
            setCompletedData([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Initialize component and fetch data
     * Sets localStorage flags and fetches completed appointments
     */
    useEffect(() => {
        logger.debug("🔵 Completed component mounting");
        
        try {
            localStorage.setItem("activeComponent", "appointment");
            localStorage.setItem("path", "completed");
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
    const currentData = completedData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(completedData.length / itemsPerPage);

    const handlePageChange = (_, page) => {
        setCurrentPage(page);
    };

    return (
        <Box sx={{ display: "flex", width: "95%" }}>
            <AppointmentNavbar />
            <Box
                component={"div"}
                sx={{
                    position: "relative",
                    top: "4em",
                    width: "100%",
                    display: "flex",
                    height: "100%",
                }}
            >
                <Box sx={{ width: "100%", height: "100%" }}>
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
                            }}
                        >
                            {loading ? (
                                // Skeleton loader when loading is true
                                Array.from({ length: itemsPerPage }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        width="100%"
                                        height={120}
                                        sx={{ mb: 2, borderRadius: "8px" }}
                                    />
                                ))
                            ) : completedData.length === 0 ? (
                                <NoAppointmentCard
                                    text_one={"You don't have any completed appointments"}
                                />
                            ) : (
                                currentData.map((data) => (
                                    <CompletedCard
                                        key={data.id}
                                        patientID={patient_id}
                                        pid={data.patient_id}
                                        did={data.doctor_id}
                                        aid={data.appointment_id}
                                        data={data}
                                        DrImage={data.profile_picture || DrImage}
                                    />
                                ))
                            )}

                            {!loading && completedData.length > itemsPerPage && (
                                // Pagination control when data exceeds itemsPerPage
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    sx={{ mt: 2, alignSelf: "center" }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Completed;
