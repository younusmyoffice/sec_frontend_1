import { Box, Skeleton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import UpcomingCard from "../../../../components/Card/CustomUpcomingcard/UpcomingCard";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { isAppointmentTimeReached } from "../../../../utils/timeUtils"; // ✅ Add time utils

const ClinicUpcoming = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "myappointment");
        localStorage.setItem("path", "clinicupcoming");
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const navigate = useNavigate(); // ✅ Add navigate hook
    const [accAndRejClicked, setAccAndRejClicked] = useState(false); // ✅ Add state management
    const [clinicAppointmentUpcoming, setClinicAppointmentUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 5; // Number of items per page
    const doctor_id = localStorage.getItem("clinic_suid");
    const status_booked = "booked";
    
    // Real-time update state ✅ Add time update state
    const [timeUpdate, setTimeUpdate] = useState(0);

    // Fetch upcoming appointments
    const fetchUpcomingAppointments = async () => {
        setLoading(true);
        try {
            // Try using the same pattern as individual doctor
            const response = await axiosInstance.post(
                "/sec/hcf/UpcomingAppointmentsClinic",
                JSON.stringify({
                    doctor_id: Number(doctor_id),
                    status_booked: status_booked,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            console.log("🔍 Clinic API Response (POST):", response?.data);
            console.log("🔍 Clinic Appointments Data:", response?.data?.response);
            setClinicAppointmentUpcoming(response?.data?.response || []);
        } catch (error) {
            console.log("❌ POST API failed, trying GET:", error.response);
            // Fallback to original GET request
            try {
                const response = await axiosInstance.get(
                    `sec/hcf/${doctor_id}/${status_booked}/clinicAppointmentUpcoming`
                );
                console.log("🔍 Clinic API Response (GET):", response?.data);
                console.log("🔍 Clinic Appointments Data:", response?.data?.response);
                setClinicAppointmentUpcoming(response?.data?.response || []);
            } catch (getError) {
                console.error("Error fetching upcoming appointment data:", getError.response);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (doctor_id) fetchUpcomingAppointments();
    }, [doctor_id, accAndRejClicked]); // ✅ Add accAndRejClicked dependency

    // Real-time update for join button status ✅ Add time update effect
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUpdate(prev => prev + 1);
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    // Paginated data
    const totalPages = Math.ceil(clinicAppointmentUpcoming.length / itemsPerPage);
    const paginatedData = clinicAppointmentUpcoming.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (_, value) => setCurrentPage(value);

    // ✅ Add state management function
    function AcceptOrRejectButtonClicked(value) {
        setAccAndRejClicked(value);
    }

    return (
        <div
            className="requestcontainer"
            style={{
                display: "flex",
                flexWrap: "wrap",
                width: "98%",
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
                component={"div"}
                sx={{
                    position: "relative",
                    top: "4em",
                    width: "100%",
                    display: "flex",
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
                        // Skeleton loaders during data fetch
                        Array.from({ length: itemsPerPage }).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                width="100%"
                                height={100}
                                sx={{ marginBottom: "1rem", borderRadius: "8px" }}
                            />
                        ))
                    ) : clinicAppointmentUpcoming.length === 0 ? (
                        // No data state
                        <NoAppointmentCard text_one={"No Appointment"} />
                    ) : (
                        // Render paginated data ✅ Updated to match doctor implementation
                        paginatedData.map((data) => {
                            // Debug all available fields in clinic appointment data
                            console.log("🔍 Full Clinic Appointment Data:", data);
                            console.log("🔍 Available Fields:", Object.keys(data || {}));
                            
                            // Use backend join_status as primary source, with frontend fallback
                            const canJoin = isAppointmentTimeReached(
                                data?.appointment_date, 
                                data?.appointment_time, 
                                data?.join_status
                            );
                            const isDisabled = !canJoin;
                            
                            console.log(`Clinic Appointment ${data?.appointment_id}:`, {
                                appointment_date: data?.appointment_date,
                                appointment_time: data?.appointment_time,
                                backend_join_status: data?.join_status,
                                plan_name: data?.plan_name,
                                roomid: data?.roomid,
                                room_id: data?.room_id,
                                first_name: data?.first_name,
                                middle_name: data?.middle_name,
                                last_name: data?.last_name,
                                canJoin: canJoin,
                                isDisabled: isDisabled
                            });
                            
                            return (
                                <UpcomingCard
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
                                                      `/clinicDashboard/clinicmyappointment/clinicchats/${
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
                    {/* Pagination Component */}
                    {!loading && clinicAppointmentUpcoming.length > 0 && (
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            sx={{ marginTop: "1rem" }}
                        />
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default ClinicUpcoming;
