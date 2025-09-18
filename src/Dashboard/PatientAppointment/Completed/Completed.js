import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import DrImage from "../../../static/images/DrImages/image3.png";
import { AppointmentNavbar, CompletedCard } from "../PatientCards";
import NoAppointmentCard from "../NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance";

const Completed = () => {
    const [completedData, setCompletedData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [patient_id, setPatient_id] = useState(localStorage.getItem("patient_suid"));

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Dynamic items per page

    const fetchDataNew = async () => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.post("/sec/patient/CompletedAppointments", JSON.stringify({
                patient_id,
                status_complete: "completed",
            }));
            setCompletedData(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching completed appointments:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "completed");
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
