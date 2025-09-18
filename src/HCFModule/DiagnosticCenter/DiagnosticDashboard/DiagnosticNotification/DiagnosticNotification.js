// import * as React from 'react';

import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import DashboardCard from "./DashboardCard";
import CustomNotificationCard from "../../../../DoctorModule/CustomDoctorComponent/Cards/CardNotification/CardNotification";
import CustomButton from "../../../../components/CustomButton/custom-button";
import "./diagnosticNotification.scss";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const DiagnosticNotification = () => {
    const [testCount, setTestCount] = useState(0);
    const [reportCount, setReportCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [notify, setNotify] = useState([]);
    const [loading, setLoading] = useState(true);
    const staff_id = localStorage.getItem("diagnostic_suid");
    const [viewAll, setViewAll] = useState(false);

    const fetchdashboardTestCount = async (staff_id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/sec/hcf/${staff_id}/dashboardTestCount`);
            const Count = response?.data?.response[0]?.keyword_count || 0;
            setTestCount(Count);
        } catch (error) {
            console.error("Error fetching staff data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const fetchdashboardReportCount = async (staff_id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/sec/hcf/${staff_id}/dashboardReportCount`);
            const Count = response?.data?.response[0]?.keyword_count || 0;
            setReportCount(Count);
        } catch (error) {
            console.error("Error fetching staff data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const fetchdashboardPatientCount = async (staff_id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/sec/hcf/${staff_id}/dashboardPatientCount`);
            const Count = response?.data?.response[0]?.keyword_count || 0;
            setPatientCount(Count);
        } catch (error) {
            console.error("Error fetching staff data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const Notification = async (staff_id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/sec/hcf/${staff_id}/StaffNotification/`);
            const Count = response?.data?.response || [];
            console.log(Count);
            setNotify(Count);
        } catch (error) {
            console.error("Error fetching staff data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchdashboardTestCount(staff_id);
        fetchdashboardReportCount(staff_id);
        fetchdashboardPatientCount(staff_id);
        Notification(staff_id);
    }, [staff_id]);

    const toggleViewAll = () => {
        setViewAll((prev) => !prev);
    };

    const displayedData = viewAll ? notify : notify.slice(0, 3);

    return (
        <>
            <Box className="horizontal-scroll-container" sx={{ display: "flex", padding: "10px" }}>
                <div>
                    {loading ? (
                        <>
                            <Skeleton
                                variant="rectangular"
                                width={200}
                                height={100}
                                sx={{ marginBottom: "10px" }}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={200}
                                height={100}
                                sx={{ marginBottom: "10px" }}
                            />
                            <Skeleton variant="rectangular" width={200} height={100} />
                        </>
                    ) : (
                        <>
                            <DashboardCard countData={testCount} fieldName={"Test Count"} />
                            <DashboardCard countData={reportCount} fieldName={"Report Count"} />
                            <DashboardCard countData={patientCount} fieldName={"Patient Count"} />
                        </>
                    )}
                </div>
            </Box>

            <Box sx={{ display: "flex", width: "98%", height: "90%" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/diagnostCenterDashboard/notification"}>Notification</NavLink>
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
                    <Box sx={{ width: "100%", height: "70%" }}>
                        {loading ? (
                            <>
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={100}
                                    sx={{ marginBottom: "10px" }}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={100}
                                    sx={{ marginBottom: "10px" }}
                                />
                            </>
                        ) : notify.length === 0 ? (
                            <NoAppointmentCard text_one={"No notifications available"} />
                        ) : (
                            displayedData.map((data, index) => (
                                <CustomNotificationCard key={index} Data={data} />
                            ))
                        )}

                        {!loading && notify.length > 3 && (
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
        </>
    );
};

export default DiagnosticNotification;
