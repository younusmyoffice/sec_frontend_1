import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import DoctorAppointmentCard from "../../CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import CustomNotificationCard from "../../CustomDoctorComponent/Cards/CardNotification/CardNotification";
import { baseURL } from "../../../constants/const";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance";
import CustomButton from "../../../components/CustomButton";

const Notification = () => {
    const [requestData, setRequestData] = useState([]);
    const [upcomingData, setUpcomingData] = useState([]);
    const [completedData, setCompletedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notificationData, setNotificationData] = useState([]);
    const [viewAll, setViewAll] = useState(false);

    useEffect(() => {
        localStorage.setItem("activeComponent", "dashboard");
        localStorage.setItem("path", "notification");
        document.getElementById("location-search-container").style.display = "none";

        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            await Promise.all([fetchRequest(), fetchUpcoming(), fetchData(), fetchCompleted()]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRequest = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/sec/Doctor/DocDashoardApp/in_progress/${localStorage.getItem(
                    "doctor_suid",
                )}`,
            );
            setRequestData(response?.data?.response || []);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUpcoming = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/sec/Doctor/DocDashoardApp/booked/${localStorage.getItem(
                    "doctor_suid",
                )}`,
            );
            setUpcomingData(response?.data?.response || []);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCompleted = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/sec/Doctor/DocDashoardApp/completed/${localStorage.getItem(
                    "doctor_suid",
                )}`,
            );
            setCompletedData(response?.data?.response || []);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/DoctorNotification/${localStorage.getItem("doctor_suid")}`,
            );
            setNotificationData(response?.data?.response || []);
        } catch (error) {
            console.error(error);
        }
    };

    const renderSkeletons = (count) =>
        Array.from({ length: count }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="100%" height={100} sx={{ mb: 2 }} />
        ));

    const isDataEmpty =
        !loading && !requestData.length && !upcomingData.length && !completedData.length;

    const toggleViewAll = () => {
        setViewAll((prev) => !prev);
    };

    const displayedData = viewAll ? notificationData : notificationData.slice(0, 3);

    return (
        <Box sx={{ width: "100%", p: 3 }}>
            <Box className="Appointment-card" sx={{ display: "flex", gap: 2, mb: 3 }}>
                {loading
                    ? Array(3)
                          .fill(null)
                          .map((_, index) => (
                              <Skeleton key={index} variant="text" width={200} height={200} />
                          ))
                    : [
                          <DoctorAppointmentCard
                              key="request"
                              NumberOfAppointments={requestData.length}
                              AppointmentType={"Appointment Request"}
                          />,
                          <DoctorAppointmentCard
                              key="upcoming"
                              NumberOfAppointments={upcomingData.length}
                              AppointmentType={"Upcoming Appointments"}
                          />,
                          <DoctorAppointmentCard
                              key="completed"
                              NumberOfAppointments={completedData.length}
                              AppointmentType={"Completed"}
                          />,
                      ]}
            </Box>

            <Box className="DocNavBar-Container" sx={{ mb: 3, display: "flex", gap: 2 }}>
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
                    minHeight: "55vh",
                    alignItems: "center",
                    justifyContent: loading || isDataEmpty ? "center" : "flex-start",
                }}
            >
                {loading ? (
                    renderSkeletons(3)
                ) : notificationData.length === 0 ? (
                    <NoAppointmentCard text_one={"No Notifications Found"} />
                ) : (
                    displayedData.map((data, index) => (
                        <CustomNotificationCard key={index} Data={data} />
                    ))
                )}

                {!loading && notificationData.length > 3 && (
                    <CustomButton
                        label={viewAll ? "Show Less" : "View All"}
                        handleClick={toggleViewAll}
                        isTransaprent={true}
                        sx={{ marginTop: "1rem" }}
                    ></CustomButton>
                )}
            </Box>
        </Box>
    );
};

export default Notification;
