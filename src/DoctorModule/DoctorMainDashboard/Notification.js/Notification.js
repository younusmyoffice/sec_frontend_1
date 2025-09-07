import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DoctorAppointmentCard from "../../CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import { Typography } from "@mui/material";
import CustomNotificationCard from "../../CustomDoctorComponent/Cards/CardNotification/CardNotification";
import { baseURL } from "../../../constants/const";
import axios from "axios";
// import CustomNotificationCard from '../CustomDoctorComponent/CardNotification/CardNotification';

const Notification = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "dashboard");
        localStorage.setItem("path", "notification");
    }, []);

    const [requestData, setRequestData] = useState([]);
    const [upcomingData, setupcomingData] = useState([]);
    const [completedData, setCompletedData] = useState([]);

    useEffect(() => {
        console.log("Dahsboard Doctor");
        document.getElementById("location-search-container").style.display = "flex";
        // fetchDataNew();
        fetchrequest();
        fetchUpcoming();
        fetchCompleted();
        return () => {
            console.log("Remove the event listner ");
        };
    }, []);

    const fetchrequest = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/Doctor/DocDashoardApp/in_progress/9`);
            console.log("request data from backend : ", response?.data?.response);
            setRequestData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUpcoming = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/Doctor/DocDashoardApp/booked/9`);
            console.log("upcoming data from backend : ", response?.data?.response);
            setupcomingData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCompleted = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/Doctor/DocDashoardApp/completed/9`);
            console.log("completed data from backend : ", response?.data?.response);
            setCompletedData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <div className="Appointment-card">
                <DoctorAppointmentCard
                    NumberOfAppointments={requestData?.length}
                    AppointmentType={"Appointment Request"}
                />
                <DoctorAppointmentCard
                    NumberOfAppointments={upcomingData?.length}
                    AppointmentType={"Upcoming Appointments"}
                />
                <DoctorAppointmentCard
                    NumberOfAppointments={completedData?.length}
                    AppointmentType={"Completed"}
                />
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
                <CustomNotificationCard Schedule={"Appointment Reminder"} />
                <CustomNotificationCard Schedule={"Schedule Reminder"} />
                <CustomNotificationCard Schedule={"Call Request"} />
            </Box>
        </Box>
    );
};

export default Notification;
