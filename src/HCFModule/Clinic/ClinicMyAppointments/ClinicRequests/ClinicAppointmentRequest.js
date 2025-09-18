import { Box, Skeleton, Typography, Pagination } from "@mui/material"; // Import Skeleton for loading placeholders
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import ClinicCardRequest from "../../ClinicDashboard/ClinicRequests/ClinicCardRequest";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const useStyles = makeStyles((theme) => ({
    requestcontainer: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
        },
    },
}));

const ClinicAppointmentRequest = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "myappointment");
        localStorage.setItem("path", "clinicrequest");
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const [loading, setLoading] = useState(true); // Loading state
    const [clinicAppointmentRequests, setClinicAppointmentRequests] = useState([]);
    const doctor_id = localStorage.getItem("clinic_suid");
    const status_in_progress = "in_progress";
    const [accAndRejClicked, setaccAndRejClicked] = useState([]);

    const clinicAppointmentRequestsList = async (doctor_id, status_in_progress) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(
                `sec/hcf/${doctor_id}/${status_in_progress}/clinicAppointmentRequests`,
            );
            const Count = response?.data?.response || [];
            setClinicAppointmentRequests(Count);
        } catch (error) {
            console.error("Error fetching request data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    useEffect(() => {
        clinicAppointmentRequestsList(doctor_id, status_in_progress);
    }, []);

    function AcceptOrRejectButtonClicked(value) {
        setaccAndRejClicked(value);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate paginated data
    const totalPages = Math.ceil(clinicAppointmentRequests.length / itemsPerPage);
    const paginatedData = clinicAppointmentRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <div
                className="requestcontainer"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "98%",
                    height: "100%",
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
                    component="div"
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="rectangular"
                        width="100%"
                        height={100}
                        sx={{ marginBottom: "1rem", borderRadius: "8px" }}
                    />
                ))
            ) : clinicAppointmentRequests.length === 0 ? (
                <NoAppointmentCard text_one={"No Appointment"} />
            ) : (
                <>
                    {paginatedData.map((data, index) => (
                        <ClinicCardRequest
                            key={index}
                            AcceptOrRejectButtonClicked={AcceptOrRejectButtonClicked}
                            accAndRejClicked={accAndRejClicked}
                            label={"Accept"}
                            data={data}
                        />
                    ))}
                    {/* Pagination Controls */}
                    
                </>
            )}
        </Box>
        <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ marginTop: "1rem" }}
                    />
                </Box>
            </div>
        </>
    );
};

export default ClinicAppointmentRequest;
