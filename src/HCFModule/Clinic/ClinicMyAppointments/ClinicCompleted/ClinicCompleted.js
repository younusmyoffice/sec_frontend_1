import { Box, Skeleton, Typography, Pagination } from "@mui/material"; // Import Skeleton for loading placeholders
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import CancelledCard from "../ClinicCancelled/CancelledCard";

const ClinicCompleted = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "myappointment");
        localStorage.setItem("path", "cliniccompleted");
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const [clinicAppointmentCompleted, setClinicAppointmentCompleted] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const doctor_id = localStorage.getItem("clinic_suid");
    const status_complete = "completed";

    const fetchCancelledAppointments = async (doctor_id, status_complete) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(
                `sec/hcf/${doctor_id}/${status_complete}/clinicAppointmentComplete`,
            );
            const appointments = response?.data?.response || [];
            setClinicAppointmentCompleted(appointments);
        } catch (error) {
            console.error("Error fetching cancelled appointment data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    useEffect(() => {
        if (doctor_id) {
            fetchCancelledAppointments(doctor_id, status_complete);
        }
    }, [doctor_id]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate paginated data
    const totalPages = Math.ceil(clinicAppointmentCompleted.length / itemsPerPage);
    const paginatedData = clinicAppointmentCompleted.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/clinicDashboard/clinicmyappointment/clinicrequest"}>
                        Requests
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmyappointment/clinicupcoming"}>
                        Upcoming
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmyappointment/cliniccompleted"}>
                        Completed
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmyappointment/cliniccancelled"}>
                        Cancelled
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmyappointment/clinicchats"}>Chats</NavLink>
                </nav>
                <Box
                    component={"div"}
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
                        ) : clinicAppointmentCompleted.length === 0 ? (
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
                                marginTop: "1.5rem",
                                display: "flex",
                                justifyContent: "center",
                            }} />
                </Box>
            </Box>
        </>
    );
};

export default ClinicCompleted;
