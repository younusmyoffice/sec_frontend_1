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
        <>
            <Box sx={{ display: "flex", width: "95%", height: "100%" }}>
                <DoctorAppointmentNavbar />
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
                                    height: "70%",
                                    borderRadius: "8px",
                                    padding: "2%",
                                    marginLeft: "2%",
                                }}
                            >
                                {loading ? (
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            variant="rectangular"
                                            width="100%"
                                            height={80}
                                            sx={{ mb: 2 }}
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
                            {/* Pagination Component */}
                            {!loading && completedData.length > 0 && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 2,
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
                </Box>
            </Box>
        </>
    );
};

export default DoctorCompleted;
