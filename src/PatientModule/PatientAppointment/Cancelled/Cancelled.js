import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import DrImage from "../../../static/images/DrImages/image3.png";
import { AppointmentNavbar, CancelledCard } from "../PatientCards";
import NoAppointmentCard from "../NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance";

const Cancelled = () => {
    const [cancelledData, setCancelledData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const itemsPerPage = 5; // Number of items per page
    const [patient_id, setPatient_id] = useState(localStorage.getItem("patient_suid"));

    const fetchDataNew = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axiosInstance.post(
                "/sec/patient/CancelledAppointments",
                JSON.stringify({
                    patient_id: patient_id,
                    status_cancel: "canceled",
                }),
            );
            setCancelledData(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching cancelled appointments:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        setPatient_id(localStorage.getItem("patient_suid"));
        localStorage.setItem("path", "cancelled");
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
                                <CancelledCard key={data.id} data={data} DrImage={data.profile_picture || DrImage} />
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
