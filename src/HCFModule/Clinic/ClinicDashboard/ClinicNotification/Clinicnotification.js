import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorAppointmentCard from "../../../../DoctorModule/CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import { NavLink, useNavigate } from "react-router-dom";
import CardNotification from "../../../../components/Card/CustomNotificationCard/CardNotification";
import CustomNotificationCard from "../../../../DoctorModule/CustomDoctorComponent/Cards/CardNotification/CardNotification";
import CustomButton from "../../../../components/CustomButton/custom-button";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import Skeleton from "react-loading-skeleton";

const ClinicNotification = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [completeCount, setCompleteCount] = useState(0);
    const [requestCount, setRequestCount] = useState(0);
    const [notification, setNotification] = useState([]);
    const [viewAll, setViewAll] = useState(false);

    const doctor_id = localStorage.getItem("clinic_suid");

    const navigate = useNavigate();

    const status_booked = "booked";
    const status_complete = "completed";
    const status_in_progress = "in_progress";

    const clinicDashboardAppointmentUpcomngCount = async (doctor_id, status_booked) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(
                `sec/hcf/${doctor_id}/${status_booked}/clinicDashboardAppointmentUpcomngCount`,
            );
            const Count = response?.data?.response[0]?.keyword_count || 0;
            setUpcomingCount(Count);
        } catch (error) {
            console.error("Error fetching staff data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };
    const clinicDashboardAppointmentCompleteCount = async (doctor_id, status_complete) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(
                `sec/hcf/${doctor_id}/${status_complete}/clinicDashboardAppointmentCompleteCount`,
            );
            const Count = response?.data?.response[0]?.keyword_count || 0;
            setCompleteCount(Count);
        } catch (error) {
            console.error("Error fetching staff data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };
    const clinicDashboardAppointmentRequestCount = async (doctor_id, status_in_progress) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(
                `sec/hcf/${doctor_id}/${status_in_progress}/clinicDashboardAppointmentRequestCount`,
            );
            const Count = response?.data?.response[0]?.keyword_count || 0;
            setRequestCount(Count);
        } catch (error) {
            console.error("Error fetching staff data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };
    const getNotifcation = async (doctor_id) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(`sec/hcf/${doctor_id}/clinicNotification`);
            const Count = response?.data?.response || [];
            setNotification(Array.isArray(Count) ? Count : [Count]); // Convert to array if not already
        } catch (error) {
            console.error("Error fetching staff data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    useEffect(() => {
        clinicDashboardAppointmentUpcomngCount(doctor_id, status_booked);
        clinicDashboardAppointmentCompleteCount(doctor_id, status_complete);
        clinicDashboardAppointmentRequestCount(doctor_id, status_in_progress);
        getNotifcation(doctor_id);
    }, [doctor_id]);

    React.useEffect(() => {
        localStorage.setItem("activeComponent", "dashboard");
        localStorage.setItem("path", "clinirequests");
    }, []);

    const handleCardClick = (path) => {
        navigate(path);
    };
    const toggleViewAll = () => {
        setViewAll((prev) => !prev);
    };

const displayedData = viewAll ? notification : notification.slice(0, 3);

    return (
        <>
            <Box sx={{ width: "100%", height: "70vh" }}>
                <div className="Appointment-card1">
                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" width={300} height={150} />
                            <Skeleton variant="rectangular" width={300} height={150} />
                            <Skeleton variant="rectangular" width={300} height={150} />
                        </>
                    ) : (
                        <>
                            <DoctorAppointmentCard
                                NumberOfAppointments={upcomingCount}
                                AppointmentType="Upcoming Appointment"
                                onClick={() =>
                                    handleCardClick(
                                        "/clinicDashboard/clinicmyappointment/clinicupcoming",
                                    )
                                }
                            />
                            <DoctorAppointmentCard
                                NumberOfAppointments={completeCount}
                                AppointmentType="Completed"
                                onClick={() =>
                                    handleCardClick(
                                        "/clinicDashboard/clinicmyappointment/cliniccompleted",
                                    )
                                }
                            />
                            <DoctorAppointmentCard
                                NumberOfAppointments={requestCount}
                                AppointmentType="Appointment Request"
                                onClick={() =>
                                    handleCardClick(
                                        "/clinicDashboard/clinicmyappointment/clinicrequest",
                                    )
                                }
                            />
                        </>
                    )}
                </div>
                <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
                    <nav className="NavBar-Container-Appoinement">
                        <NavLink to={"/clinicDashboard/clinicbodydashboard/clinirequests"}>
                            Requests
                        </NavLink>
                        <NavLink to={"/clinicDashboard/clinicbodydashboard/clinicnotification"}>
                            Notifications
                        </NavLink>
                    </nav>
                    <Box
                        component={"div"}
                        sx={{ position: "relative", top: "4em", width: "100%", display: "flex" }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                border: "1px solid #E6E1E5",
                                borderRadius: "8px",
                                padding: "1rem",
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                {loading ? (
                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                ) : notification.length === 0 ? (
                                    <NoAppointmentCard text_one="No Notification" />
                                ) :(
                                    displayedData.map((data, index) => (
                                        <CustomNotificationCard key={index} Data={data} />
                                    ))
                                )}
                            </Box>
                            <Box sx={{ width: "100%", marginTop: "8rem" }}>
                                {!loading && notification.length > 3 && (
                                    <CustomButton
                                        label={viewAll ? "Show Less" : "View All"}
                                        handleClick={toggleViewAll}
                                        isTransaprent={true}
                                        sx={{ marginTop: "1rem" }}
                                    ></CustomButton>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ClinicNotification;
