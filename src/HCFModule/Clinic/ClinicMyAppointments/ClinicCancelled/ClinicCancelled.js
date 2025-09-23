import { Box, Skeleton, Typography, Pagination } from "@mui/material"; // Import Pagination for navigation
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CancelledCard from "./CancelledCard";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../../config/axiosInstance";

const ClinicCancelled = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "myappointment");
        localStorage.setItem("path", "cliniccancelled");
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const [clinicAppointmentCancelled, setClinicAppointmentCancelled] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 5; // Items per page
    const doctor_id = localStorage.getItem("clinic_suid");
    const status_cancel = "canceled";

    const fetchCancelledAppointments = async (doctor_id, status_cancel) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(
                `sec/hcf/${doctor_id}/${status_cancel}/clinicAppointmentCancelled`
            );
            const appointments = response?.data?.response || [];
            setClinicAppointmentCancelled(appointments);
        } catch (error) {
            console.error("Error fetching cancelled appointment data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    useEffect(() => {
        if (doctor_id) {
            fetchCancelledAppointments(doctor_id, status_cancel);
        }
    }, [doctor_id]);

    // Calculate paginated data
    const totalPages = Math.ceil(clinicAppointmentCancelled.length / itemsPerPage);
    const paginatedData = clinicAppointmentCancelled.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "90%" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to="/clinicDashboard/clinicmyappointment/clinicrequest">
                        Requests
                    </NavLink>
                    <NavLink to="/clinicDashboard/clinicmyappointment/clinicupcoming">
                        Upcoming
                    </NavLink>
                    <NavLink to="/clinicDashboard/clinicmyappointment/cliniccompleted">
                        Completed
                    </NavLink>
                    <NavLink to="/clinicDashboard/clinicmyappointment/cliniccancelled">
                        Cancelled
                    </NavLink>
                    <NavLink to="/clinicDashboard/clinicmyappointment/clinicchats">
                        Chats
                    </NavLink>
                </nav>
                <Box
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            border: "1px solid #E6E1E5",
                            padding: "1rem",
                        }}
                    >
                        {loading ? (
                            // Display Skeleton loaders while data is loading
                            Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    width="100%"
                                    height={100}
                                    sx={{ marginBottom: "1rem", borderRadius: "8px" }}
                                />
                            ))
                        ) : clinicAppointmentCancelled.length === 0 ? (
                            <NoAppointmentCard text_one="No Data found" />
                        ) : (
                            <>
                                {paginatedData.map((appointment, index) => (
                                    <CancelledCard
                                        key={`${appointment.suid}_${index}`}
                                        profile_picture={appointment.profile_picture}
                                        name={`${appointment.first_name} ${appointment.last_name}`}
                                        appointment_date={appointment.appointment_date}
                                        patient_id={appointment.patient_id}
                                        appointment_id={appointment.appointment_id}
                                    />
                                ))}
                                
                            </>
                        )}
                    </Box>
                    <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    sx={{
                                        marginTop: "1rem",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                />
                </Box>
            </Box>
        </>
    );
};

export default ClinicCancelled;
