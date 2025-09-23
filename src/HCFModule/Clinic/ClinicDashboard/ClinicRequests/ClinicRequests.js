import { Box, Typography, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorAppointmentCard from "../../../../DoctorModule/CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import { NavLink, useNavigate } from "react-router-dom";
import ClinicCardRequest from "./ClinicCardRequest";
import CustomButton from "../../../../components/CustomButton/custom-button";
import "./clinicrequest.scss";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const ClinicRequests = () => {
    const [loading, setLoading] = useState(true); 
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [completeCount, setCompleteCount] = useState(0);
    const [requestCount, setRequestCount] = useState(0);
    const [clinicAppointmentRequests, setClinicAppointmentRequests] = useState([]);
    const [accAndRejClicked, setaccAndRejClicked] = useState([]);

    const doctor_id = localStorage.getItem("clinic_suid");
    const navigate = useNavigate();

    const status_booked = "booked";
    const status_complete = "completed";
    const status_in_progress = "in_progress";

    const fetchAppointmentCounts = async () => {
        setLoading(true); 
        try {
            const [upcoming, complete, request] = await Promise.all([
                axiosInstance.get(`sec/hcf/${doctor_id}/${status_booked}/clinicDashboardAppointmentUpcomngCount`),
                axiosInstance.get(`sec/hcf/${doctor_id}/${status_complete}/clinicDashboardAppointmentCompleteCount`),
                axiosInstance.get(`sec/hcf/${doctor_id}/${status_in_progress}/clinicDashboardAppointmentRequestCount`)
            ]);

            setUpcomingCount(upcoming?.data?.response[0]?.keyword_count || 0);
            setCompleteCount(complete?.data?.response[0]?.keyword_count || 0);
            setRequestCount(request?.data?.response[0]?.keyword_count || 0);
        } catch (error) {
            console.error("Error fetching appointment counts:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const fetchAppointmentRequests = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`sec/hcf/${doctor_id}/${status_in_progress}/clinicAppointmentRequests`);
            setClinicAppointmentRequests(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching request data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointmentCounts();
        fetchAppointmentRequests();
    }, [doctor_id]);

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <>
            <Box sx={{ position: "relative", width: "100%" }}>
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
                                onClick={() => handleCardClick("/clinicDashboard/clinicmyappointment/clinicupcoming")}
                            />
                            <DoctorAppointmentCard
                                NumberOfAppointments={completeCount}
                                AppointmentType="Completed"
                                onClick={() => handleCardClick("/clinicDashboard/clinicmyappointment/cliniccompleted")}
                            />
                            <DoctorAppointmentCard
                                NumberOfAppointments={requestCount}
                                AppointmentType="Appointment Request"
                                onClick={() => handleCardClick("/clinicDashboard/clinicmyappointment/clinicrequest")}
                            />
                        </>
                    )}
                </div>

                <Box sx={{ display: "flex", width: "98%", height: "90%", marginTop: "1rem" }}>
                    <nav className="NavBar-Container-Appoinement">
                        <NavLink to="/clinicDashboard/clinicbodydashboard/clinirequests">Requests</NavLink>
                        <NavLink to="/clinicDashboard/clinicbodydashboard/clinicnotification">Notifications</NavLink>
                    </nav>

                    <Box sx={{ position: "relative", top: "4em", width: "100%", display: "flex", height: "100%" }}>
                        <Box sx={{ position: "relative", width: "100%", border: "1px solid #E6E1E5", borderRadius: "8px", padding: "1rem" }}>
                            <Box sx={{ width: "100%" }}>
                                {loading ? (
                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                ) : clinicAppointmentRequests.length === 0 ? (
                                    <NoAppointmentCard text_one="No Appointment" />
                                ) : (
                                    clinicAppointmentRequests.slice(0, 3).map((data) => (
                                        <ClinicCardRequest
                                            key={data.id}
                                            AcceptOrRejectButtonClicked={setaccAndRejClicked}
                                            accAndRejClicked={accAndRejClicked}
                                            label="Accept"
                                            data={data}
                                        />
                                    ))
                                )}
                            </Box>
                            <Box sx={{ width: "100%", marginTop: "8rem" }}>
                                <CustomButton
                                    handleClick={() => navigate("/clinicDashboard/clinicmyappointment/clinicrequest")}
                                    isTransaprent={true}
                                    label="View all"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ClinicRequests;
