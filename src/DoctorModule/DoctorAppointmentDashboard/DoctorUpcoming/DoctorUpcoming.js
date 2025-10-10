import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./doctorUpcoming.scss";
import DoctorAppointmentNavbar from "../../CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import CustomUpcomingCard from "../../CustomDoctorComponent/Cards/CustomUpcomingCard/CustomUpcomingCard";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { isAppointmentTimeReached } from "../../../utils/timeUtils";

const DoctorUpcoming = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "upcoming");
    }, []);

    const navigate = useNavigate();

    const [accAndRejClicked, setAccAndRejClicked] = useState(false);
    const [upcomingData, setUpcomingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        doctor_id: Number(localStorage.getItem("doctor_suid")),
        status_booked: "booked",
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Items per page
    
    // Real-time update state
    const [timeUpdate, setTimeUpdate] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/sec/Doctor/UpcomingAppointmentsDoctor",
                data,
            );
            setUpcomingData(response?.data?.response || []);
            console.log("Doctor upcoming data: ", response?.data?.response);
        } catch (error) {
            console.log("upcoming Error: ", error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
        fetchData();
    }, [accAndRejClicked]);

    // Real-time update for join button status
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUpdate(prev => prev + 1);
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const handlePageChange = (_, newPage) => {
        setCurrentPage(newPage);
    };

    function AcceptOrRejectButtonClicked(value) {
        setAccAndRejClicked(value);
    }

    // Calculate the data to be displayed on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = upcomingData.slice(startIndex, endIndex);

    return (
        <>
            <Box sx={{ display: "flex", width: "95%", height: "100%" }}>
                <DoctorAppointmentNavbar />
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
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    border: "1px solid #E6E1E5",
                                    height: "80%",
                                    borderRadius: "8px",
                                    padding: "2%",
                                    marginLeft: "2%",
                                }}
                            >
                                {loading ? (
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            variant="rectangular"
                                            width="100%"
                                            height={80}
                                            sx={{ mb: 2 }}
                                        />
                                    ))
                                ) : upcomingData.length === 0 ? (
                                    <NoAppointmentCard text_one={"No Appointment"} />
                                ) : (
                                    paginatedData.map((data) => {
                                        // Use backend join_status as primary source, with frontend fallback
                                        const canJoin = isAppointmentTimeReached(
                                            data?.appointment_date, 
                                            data?.appointment_time, 
                                            data?.join_status
                                        );
                                        const isDisabled = !canJoin;
                                        
                                        console.log(`Appointment ${data?.appointment_id}:`, {
                                            appointment_date: data?.appointment_date,
                                            appointment_time: data?.appointment_time,
                                            backend_join_status: data?.join_status,
                                            canJoin: canJoin,
                                            isDisabled: isDisabled
                                        });
                                        
                                        return (
                                            <CustomUpcomingCard
                                                key={data.id} // Ensure each item has a unique key
                                                data={data}
                                                Joinlabel={canJoin ? "Join" : "Not Available"}
                                                StatusLabel={data?.plan_name}
                                                AcceptOrRejectButtonClicked={
                                                    AcceptOrRejectButtonClicked
                                                }
                                                onClickJoinHandler={() => {
                                                    if (canJoin) {
                                                        data?.plan_name === "video"
                                                            ? navigate(
                                                                  `/videocallingsdk/${data?.appointment_id}`,
                                                              )
                                                            : data?.plan_name === "message"
                                                            ? navigate(
                                                                  `/doctordashboard/doctorAppointment/chats/${
                                                                      data.first_name +
                                                                      data.middle_name +
                                                                      data.last_name
                                                                  }/${data.roomid}/${data?.appointment_id}`,
                                                              )
                                                            : null;
                                                    }
                                                }}
                                                accAndRejClicked={accAndRejClicked}
                                                isDisabled={isDisabled}
                                            />
                                        );
                                    })
                                )}
                            </Box>
                            {/* Pagination Component */}
                            {!loading && upcomingData.length > 0 && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 2,
                                    }}
                                >
                                    <Pagination
                                        count={Math.ceil(upcomingData.length / itemsPerPage)}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DoctorUpcoming;
