import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./doctorUpcoming.scss";
import DoctorAppointmentNavbar from "../../CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import CustomUpcomingCard from "../../CustomDoctorComponent/Cards/CustomUpcomingCard/CustomUpcomingCard";
import NoAppointmentCard from "../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

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
                                    paginatedData.map((data) => (
                                        <CustomUpcomingCard
                                            key={data.id} // Ensure each item has a unique key
                                            data={data}
                                            Joinlabel={"Join"}
                                            StatusLabel={data?.plan_name}
                                            AcceptOrRejectButtonClicked={
                                                AcceptOrRejectButtonClicked
                                            }
                                            onClickJoinHandler={() => {
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
                                                          }/${data.roomid}`,
                                                      )
                                                    : null;
                                            }}
                                            accAndRejClicked={accAndRejClicked}
                                            isDisabled={data?.join_status === 0 ? true : false}
                                        />
                                    ))
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
