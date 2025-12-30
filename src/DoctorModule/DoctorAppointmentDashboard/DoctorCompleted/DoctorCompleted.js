import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./doctorcompleted.scss";
import DoctorAppointmentNavbar from "../../CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import CustomRequestCard from "../../CustomDoctorComponent/Cards/CustomRequestCard/CardRequest";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance";

const DoctorCompleted = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "completed");
    }, []);

    const [completedData, setCompletedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(5); // Items per page
    const [completedDataSend] = useState({
        doctor_id: Number(localStorage.getItem("doctor_suid")),
        status_complete: "completed",
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/sec/Doctor/CompletedAppointmentsDoctor/",
                JSON.stringify(completedDataSend),
            );
            setCompletedData(response?.data?.response || []);
            console.log("Doctor completed data: ", response);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePageChange = (_, newPage) => {
        setCurrentPage(newPage);
    };

    // Calculate the data to be displayed on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = completedData.slice(startIndex, endIndex);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "95%", height: "100%", overflow: "hidden" }}>
            {/* Fixed navbar container - accounts for absolute positioning */}
            <Box sx={{ 
                flexShrink: 0, 
                zIndex: 10,
                width: "100%",
                height: "70px", // Fixed height to account for navbar
                position: "relative",
                marginBottom: "1rem",
            }}>
                <DoctorAppointmentNavbar />
            </Box>
            
            {/* Scrollable content area below navbar */}
            <Box
                component={"div"}
                sx={{
                    flex: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                }}
            >
                {/* Scrollable content container - enables internal scrolling when content exceeds viewport */}
                <Box 
                    sx={{ 
                        width: "100%", 
                        border: "1px solid #E72B4A",
                        borderRadius: "0.5rem",
                        padding: "2%",
                        marginLeft: "2%",
                        minHeight: "55vh",
                        maxHeight: "calc(100vh - 320px)", // Adjusted to account for navbar and pagination
                        overflowY: "auto", // CRITICAL: Enable vertical scrolling when content overflows
                        overflowX: "hidden", // Prevent horizontal scrolling
                        display: "flex",
                        flexDirection: "column",
                        flex: 1, // Take available space
                        minHeight: 0, // Allow shrinking below minHeight when needed for scrolling
                    }}
                >
                    <Box sx={{ 
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        border: "2px solidrgb(122, 122, 122)",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                        gap: 0, // Gap handled by card margin-bottom
                    }}>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    width="100%"
                                    height={80}
                                    sx={{ mb: 2, borderRadius: "0.5rem" }}
                                />
                            ))
                        ) : completedData.length === 0 ? (
                            <NoAppointmentCard text_one={"No Appointment"} />
                        ) : (
                            paginatedData.map((completeData) => (
                                <CustomRequestCard key={completeData.id} data={completeData} />
                            ))
                        )}
                    </Box>
                </Box>
                
                {/* Pagination Component - fixed at bottom, doesn't scroll */}
                {!loading && completedData.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: "1.5rem",
                            paddingBottom: "1rem",
                            marginLeft: "2%",
                            flexShrink: 0, // Prevent pagination from shrinking
                        }}
                    >
                        <Pagination
                            count={Math.ceil(completedData.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default DoctorCompleted;
