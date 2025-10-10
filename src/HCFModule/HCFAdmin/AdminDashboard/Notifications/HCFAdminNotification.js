import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomNotificationCard from "../../../../DoctorModule/CustomDoctorComponent/Cards/CardNotification/CardNotification";
import DoctorAppointmentCard from "../../../../DoctorModule/CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import CustomButton from "../../../../components/CustomButton"; // Assuming CustomButton is correctly imported

const HCFAdminNotifications = () => {
    const [digCount, setDigCount] = useState(0);
    const [docCount, setDocCount] = useState(0);
    const [hcfId] = useState(localStorage.getItem("hcfadmin_suid"));
    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState([]);
    const [viewAll, setViewAll] = useState(false);

    useEffect(() => {
        // Hide location search container on load
        const locationContainer = document.getElementById("location-search-container");
        if (locationContainer) locationContainer.style.display = "none";
    }, []);

    // Fetch diagnostic staff count
    const fetchDashboardCountDiag = async () => {
        try {
            const resp = await axiosInstance.get(`/sec/hcf/dashboardDiagnosticCount/${hcfId}`);
            setDigCount(resp?.data[0]?.diagnostic_staff_count || 0);
        } catch (error) {
            console.error("Error fetching diagnostic count:", error);
        }
    };

    // Fetch active doctor count
    const fetchDashboardCountDoc = async () => {
        try {
            const resp = await axiosInstance.get(`/sec/hcf/dashboardClinicDoctorCount/${hcfId}`);
            setDocCount(resp?.data[0]?.doctor_count || 0);
        } catch (error) {
            console.error("Error fetching doctor count:", error);
        }
    };

    // Fetch notifications
    const fetchNotification = async () => {
        try {
            const resp = await axiosInstance.get(``);
            setNotify(resp?.data?.response || []); // Ensure `notify` is an array
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    // Fetch all data on load
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchDashboardCountDiag(), fetchDashboardCountDoc(), fetchNotification()]);
            setLoading(false);
        };
        fetchData();
    }, [hcfId]);

    const toggleViewAll = () => setViewAll((prev) => !prev);

    const displayedData = viewAll ? notify : notify.slice(0, 3);

    return (
        <Box sx={{ display: "flex", width: "98%", height: "90%" }}>
            <Box sx={{ position: "relative", top: "2em", width: "100%", display: "flex", height: "100%" }}>
                <Box sx={{ width: "100%", height: "100%" }}>
                    {/* Dashboard Cards */}
                    <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem" }}>
                        {loading ? (
                            <>
                                <Skeleton variant="rectangular" width={210} height={118} />
                                <Skeleton variant="rectangular" width={210} height={118} />
                            </>
                        ) : (
                            <>
                                <DoctorAppointmentCard
                                    AppointmentType="Diagnostic"
                                    NumberOfAppointments={digCount}
                                />
                                <DoctorAppointmentCard
                                    AppointmentType="Active Doctors"
                                    NumberOfAppointments={docCount}
                                />
                            </>
                        )}
                    </Box>

                    {/* Navigation Bar */}
                    <nav className="NavBar-Container-Appoinement">
                        <NavLink to="/hcfadmin/notification">Notifications</NavLink>
                    </nav>

                    {/* Notifications Section */}
                    <Box sx={{ width: "100%", height: "70%", marginTop: "7rem" }}>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    width="100%"
                                    height={100}
                                    sx={{ marginBottom: "10px" }}
                                />
                            ))
                        ) : notify.length === 0 ? (
                            <NoAppointmentCard text_one="No notifications available" />
                        ) : (
                            displayedData.map((data, index) => (
                                <CustomNotificationCard key={index} Data={data} />
                            ))
                        )}

                        {/* View All/Show Less Button */}
                        {!loading && notify.length > 3 && (
                            <CustomButton
                                label={viewAll ? "Show Less" : "View All"}
                                handleClick={toggleViewAll}
                                isTransaprent
                                sx={{ marginTop: "1rem" }}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HCFAdminNotifications;
