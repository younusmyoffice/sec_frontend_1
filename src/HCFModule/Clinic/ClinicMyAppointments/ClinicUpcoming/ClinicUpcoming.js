import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UpcomingCard from "../../../../components/Card/CustomUpcomingcard/UpcomingCard";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const ClinicUpcoming = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "myappointment");
        localStorage.setItem("path", "clinicupcoming");
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const [clinicAppointmentUpcoming, setClinicAppointmentUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 5; // Number of items per page
    const doctor_id = localStorage.getItem("clinic_suid");
    const status_booked = "booked";

    // Fetch upcoming appointments
    const fetchUpcomingAppointments = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `sec/hcf/${doctor_id}/${status_booked}/clinicAppointmentUpcoming`
            );
            setClinicAppointmentUpcoming(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching upcoming appointment data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (doctor_id) fetchUpcomingAppointments();
    }, [doctor_id]);

    // Paginated data
    const totalPages = Math.ceil(clinicAppointmentUpcoming.length / itemsPerPage);
    const paginatedData = clinicAppointmentUpcoming.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (_, value) => setCurrentPage(value);

    return (
        <div
            className="requestcontainer"
            style={{
                display: "flex",
                flexWrap: "wrap",
                width: "98%",
            }}
        >
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
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        border: "1px solid #E6E1E5",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {loading ? (
                        // Skeleton loaders during data fetch
                        Array.from({ length: itemsPerPage }).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                width="100%"
                                height={100}
                                sx={{ marginBottom: "1rem", borderRadius: "8px" }}
                            />
                        ))
                    ) : clinicAppointmentUpcoming.length === 0 ? (
                        // No data state
                        <NoAppointmentCard text_one={"No Appointment"} />
                    ) : (
                        // Render paginated data
                        paginatedData.map((data, index) => (
                            <UpcomingCard
                                key={index}
                                data={data}
                                Joinlabel={"Join"}
                                StatusLabel={data.plan_name}
                            />
                        ))
                    )}
                    {/* Pagination Component */}
                    {!loading && clinicAppointmentUpcoming.length > 0 && (
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            sx={{ marginTop: "1rem" }}
                        />
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default ClinicUpcoming;
