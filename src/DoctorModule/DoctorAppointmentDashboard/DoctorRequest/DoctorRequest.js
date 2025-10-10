import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./DoctorRequest.scss";
import DoctorAppointmentNavbar from "../../CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import CustomRequestCard from "../../CustomDoctorComponent/Cards/CustomRequestCard/CardRequest";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const DoctorRequest = () => {
    const [data, setData] = useState({
        doctor_id: localStorage.getItem("doctor_suid"),
        status_in_progress: "in_progress",
    });
    const [accAndRejClicked, setAccAndRejClicked] = useState(false);
    const [doctorRequest, setDoctorRequest] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page

    useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "request");
    }, []);

    useEffect(() => {
        fetchDataNew();
    }, [accAndRejClicked]);

    const fetchDataNew = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/sec/Doctor/AppointmentsRequests",
                JSON.stringify(data),
            );
            setDoctorRequest(response?.data?.response || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (_, newPage) => {
        setCurrentPage(newPage);
    };

    function AcceptOrRejectButtonClicked(value) {
        setAccAndRejClicked(value);
    }

    // Calculate the indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = doctorRequest.slice(startIndex, endIndex);

    return (
        <>
            <Box sx={{ display: "flex", width: "95%" }}>
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
                                ) : doctorRequest.length === 0 ? (
                                    <NoAppointmentCard text_one={"No Appointment"} />
                                ) : (
                                    paginatedData.map((data) => (
                                        <CustomRequestCard
                                            key={data.id} // Ensure each item has a unique key
                                            AcceptOrRejectButtonClicked={
                                                AcceptOrRejectButtonClicked
                                            }
                                            accAndRejClicked={accAndRejClicked}
                                            label={"Accept"}
                                            data={data}
                                        />
                                    ))
                                )}
                            </Box>
                            {/* Pagination Component */}
                            {!loading && doctorRequest.length > 0 && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 2,
                                    }}
                                >
                                    <Pagination
                                        count={Math.ceil(doctorRequest.length / itemsPerPage)}
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

export default DoctorRequest;
