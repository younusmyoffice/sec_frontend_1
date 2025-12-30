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
        <Box sx={{ display: "flex", flexDirection: "column", width: "95%", height: "100%", overflow: "hidden" }}>
            {/* Fixed navbar container - accounts for absolute positioning */}
            <Box sx={{ 
                flexShrink: 0, 
                zIndex: 10,
                width: "100%",
                height: "70px", // Fixed height to account for navbar
                position: "relative",
                marginBottom: "1rem",
            }}>
                <DoctorAppointmentNavbar />
            </Box>
            
            {/* Scrollable content area below navbar */}
            <Box
                component={"div"}
                sx={{
                    flex: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                }}
            >
                {/* Scrollable content container - enables internal scrolling when content exceeds viewport */}
                <Box 
                    sx={{ 
                        width: "100%", 
                        border: "1px solid #E72B4A",
                        borderRadius: "0.5rem",
                        padding: "2%",
                        marginLeft: "2%",
                        minHeight: "55vh",
                        maxHeight: "calc(100vh - 320px)", // Adjusted to account for navbar and pagination
                        overflowY: "auto", // CRITICAL: Enable vertical scrolling when content overflows
                        overflowX: "hidden", // Prevent horizontal scrolling
                        display: "flex",
                        flexDirection: "column",
                        flex: 1, // Take available space
                        minHeight: 0, // Allow shrinking below minHeight when needed for scrolling
                    }}
                >
                    <Box sx={{ 
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                   
                        gap: 0, // Gap handled by card margin-bottom
                    }}>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    width="100%"
                                    height={80}
                                    sx={{ mb: 2, borderRadius: "0.5rem" }}
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
                                    <> <Box sx={{  padding: "10px" }}>
                                        <CustomUpcomingCard
                                    key={data.id}
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
                                        </Box>  </>
                                   
                                );
                            })
                        )}
                    </Box>
                </Box>
                
                {/* Pagination Component - fixed at bottom, doesn't scroll */}
                {!loading && upcomingData.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: "1.5rem",
                            paddingBottom: "1rem",
                            marginLeft: "2%",
                            flexShrink: 0, // Prevent pagination from shrinking
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
    );
};

export default DoctorUpcoming;
