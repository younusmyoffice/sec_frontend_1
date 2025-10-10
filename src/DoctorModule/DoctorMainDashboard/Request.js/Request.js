import React, { useEffect, useState } from "react";
import DoctorAppointmentCard from "../../CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import "./Request.scss";
import { Box, Skeleton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomRequestCard from "../../CustomDoctorComponent/Cards/CustomRequestCard/CardRequest";
import axios from "axios";
import { baseURL } from "../../../constants/const";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const Request = () => {
    const [requestCount, setRequestCount] = useState(0);
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [accAndRejClicked, setAccAndRejClicked] = useState(false);
    const [doctorRequest, setDoctorRequest] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const data = {
        doctor_id: localStorage.getItem("doctor_suid"),
        status_in_progress: "in_progress",
    };

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("activeComponent", "dashboard");
        localStorage.setItem("path", "request");
        document.getElementById("location-search-container").style.display = "none !important";

        fetchrequest();
        Count("/sec/Doctor/DocDashoardCount", "in_progress", setRequestCount);
        Count("/sec/Doctor/DocDashoardCount", "booked", setUpcomingCount);
        Count("/sec/Doctor/DocDashoardCount", "completed", setCompletedCount);
        fetchDataNew().finally(() => setLoading(false)); // Set loading to false after fetching data
    }, []);

    useEffect(() => {
        fetchDataNew();
    }, [accAndRejClicked]);

    const fetchDataNew = async () => {
        try {
            const response = await axiosInstance.post(
                "/sec/Doctor/AppointmentsRequests",
                JSON.stringify(data),
            );
            setDoctorRequest(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    const Count = async (url, status, setCount) => {
        try {
            const response = await axiosInstance.post(url, {
                doctor_id: localStorage.getItem("doctor_suid"),
                status: status,
            });
            setCount(response?.data?.response[0]?.keyword_count);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchrequest = async () => {
        try {
            await axios.get(
                `${baseURL}/sec/Doctor/DocDashoardApp/in_progress/${localStorage.getItem(
                    "doctor_suid",
                )}`,
            );
        } catch (error) {
            console.log(error);
        }
    };

    function AcceptOrRejectButtonClicked(value) {
        setAccAndRejClicked(value);
    }

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <div className="Appointment-card">
                {loading ? (
                    <Skeleton variant="text" width={200} height={200} />
                ) : (
                    <DoctorAppointmentCard
                        NumberOfAppointments={requestCount}
                        AppointmentType={"Appointment Request"}
                    />
                )}
                {loading ? (
                    <Skeleton variant="text" width={200} height={200} />
                ) : (
                    <DoctorAppointmentCard
                        NumberOfAppointments={upcomingCount}
                        AppointmentType={"Upcoming Appointments"}
                    />
                )}
                {loading ? (
                    <Skeleton variant="text" width={200} height={200} />
                ) : (
                    <DoctorAppointmentCard
                        NumberOfAppointments={completedCount}
                        AppointmentType={"Completed"}
                    />
                )}
            </div>

            <Box className="DocNavBar-Container">
                <NavLink to={"/doctordashboard/request"}>Requests</NavLink>
                <NavLink to={"/doctordashboard/notification"}>Notifications</NavLink>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #E6E1E5",
                    borderRadius: "0.5rem",
                    padding: "2%",
                    height: "55vh",
                }}
            >
                <Box sx={{ width: "100%" }}>
                    {loading ? (
                        // Skeleton loaders for request cards
                        Array.from(new Array(3)).map((_, index) => (
                            <Skeleton key={index} variant="rectangular" width="100%" height={100} />
                        ))
                    ) : doctorRequest.length === 0 ? (
                        <NoAppointmentCard text_one={"No Appointment"} />
                    ) : (
                        doctorRequest.map((data) => (
                            <CustomRequestCard
                                key={data.id}
                                AcceptOrRejectButtonClicked={AcceptOrRejectButtonClicked}
                                accAndRejClicked={accAndRejClicked}
                                label={"Accept"}
                                data={data}
                            />
                        ))
                    )}
                </Box>
                <Box sx={{ position: "sticky", top: "100%" }}>
                    <CustomButton
                        handleClick={() => navigate("/doctordashboard/doctorAppointment/request")}
                        isTransaprent={true}
                        label="View all"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Request;
