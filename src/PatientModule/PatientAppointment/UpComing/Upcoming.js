import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppointmentNavbar, UpcomingCard } from "../PatientCards";
import DrImage from "../../../static/images/DrImages/image3.png";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../NoAppointmentCard/NoAppointmentCard";
import { isAppointmentTimeReached } from "../../../utils/timeUtils";

const Upcoming = () => {
    const [upcomingData, setUpcomingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state
    const patientId = localStorage.getItem("patient_suid");
    const [flag, setFlag] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    // Real-time update state
    const [timeUpdate, setTimeUpdate] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(
                "/sec/patient/UpcomingAppointments",
                JSON.stringify({
                    patient_id: patientId,
                    status_in_progress: "in_progress",
                    status_booked: "booked",
                }),
            );
            setUpcomingData(response?.data?.response || []);
        } catch (err) {
            console.error("Error fetching upcoming appointments:", err);
            setError("Failed to fetch upcoming appointments. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "upcoming");
        fetchData();
        setFlag(false);
    }, [flag]);

    // Real-time update for join button status
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUpdate(prev => prev + 1);
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    function ChangeTheFlag(Changeflag) {
        setFlag(Changeflag);
    }

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = upcomingData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(upcomingData.length / itemsPerPage);

    const handlePageChange = (_, page) => {
        setCurrentPage(page);
    };

    return (
        <Box sx={{ display: "flex", width: "95%" }} className="upcoming">
            <AppointmentNavbar />
            <Box
                component="div"
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
                                borderRadius: "8px",
                                padding: "2%",
                                marginLeft: "2%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0rem", // Controls the space between items
                            }}
                        >
                            {loading ? (
                                Array.from({ length: itemsPerPage }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        width="100%"
                                        height={120}
                                        sx={{ mb: 2, borderRadius: "8px" }}
                                    />
                                ))
                            ) : upcomingData.length === 0 ? (
                                <NoAppointmentCard
                                    ButtonLabel="Find Doctor"
                                    ButtonPath="/patientDashboard/dashboard/explore"
                                    text_one="You don’t have any appointments"
                                    text_two="Book an appointment"
                                />
                            ) : (
                                currentData.map((data) => {
                                    // Debug appointment data
                                    console.log("🔍 Appointment data for chat URL:", {
                                        appointment_id: data?.appointment_id,
                                        first_name: data?.first_name,
                                        roomid: data?.roomid,
                                        room_id: data?.room_id,
                                        plan_name: data?.plan_name,
                                        join_status: data?.join_status
                                    });
                                    
                                    // Use backend join_status as primary source, with frontend fallback
                                    const canJoin = isAppointmentTimeReached(
                                        data?.appointment_date, 
                                        data?.appointment_time, 
                                        data?.join_status
                                    );
                                    const isDisabled = !canJoin;
                                    
                                    console.log(`Patient Appointment ${data?.appointment_id}:`, {
                                        appointment_date: data?.appointment_date,
                                        appointment_time: data?.appointment_time,
                                        backend_join_status: data?.join_status,
                                        canJoin: canJoin,
                                        isDisabled: isDisabled
                                    });
                                    
                                    return (
                                        <UpcomingCard
                                            key={data.id}
                                            data={data}
                                            path={{
                                                reject: "/sec/patient/RejectAppointment",
                                                rescheduled: "sec/patient/resheduleAppointment",
                                                join: canJoin ? (data?.plan_name === 'video' ? `/videocallingsdk/${data?.appointment_id}` : 
                                                data?.plan_name === 'message' ?   `/patientDashboard/appointment/chats/${data.first_name}/${data.roomid || data.room_id || 'default'}/${data?.appointment_id}` : null) : null,
                                            }}
                                            DrImage={data.profile_picture || DrImage}
                                            label={canJoin ? "" : "Not Available"}
                                            isDisabled={isDisabled}
                                            changeFlagState={ChangeTheFlag}
                                        />
                                    );
                                })
                            )}

                            {!loading && upcomingData.length > itemsPerPage && (
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    sx={{ mt: 2, alignSelf: "center" }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Upcoming;
