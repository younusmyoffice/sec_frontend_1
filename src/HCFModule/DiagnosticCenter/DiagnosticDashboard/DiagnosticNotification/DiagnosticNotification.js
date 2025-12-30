// import * as React from 'react';

import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import DashboardCard from "./DashboardCard";
import CustomNotificationCard from "../../../../DoctorModule/CustomDoctorComponent/Cards/CardNotification/CardNotification";
import CustomButton from "../../../../components/CustomButton/custom-button";
import "./diagnosticNotification.scss";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback } from "react";

const DiagnosticNotification = () => {
    const [testCount, setTestCount] = useState(0);
    const [reportCount, setReportCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [notify, setNotify] = useState([]);
    const [loading, setLoading] = useState(true);
    const staff_id = localStorage.getItem("diagnostic_suid");
    const [viewAll, setViewAll] = useState(false);

    /**
     * Validate Diagnostic staff ID from localStorage
     * SECURITY: Ensures staff ID is present before making API calls
     * 
     * @returns {string|null} Staff ID or null if invalid
     */
    const validateStaffId = useCallback(() => {
        const staffId = localStorage.getItem("diagnostic_suid");

        if (!staffId) {
            logger.warn("⚠️ Diagnostic staff ID not found in localStorage");
            toastService.warning("Staff ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ Diagnostic staff ID validated:", staffId);
        return staffId;
    }, []);

    /**
     * Fetch dashboard test count
     * Loads the count of tests for the diagnostic center
     */
    const fetchdashboardTestCount = async (staff_id) => {
        logger.debug("📊 Fetching test count");
        setLoading(true);
        
        const staffId = validateStaffId();
        if (!staffId) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/sec/hcf/${staffId}/dashboardTestCount`);
            const Count = response?.data?.response[0]?.keyword_count || 0;
            
            logger.debug("✅ Test count received:", Count);
            setTestCount(Count);
        } catch (error) {
            logger.error("❌ Error fetching test count:", error);
            logger.error("❌ Error response:", error?.response?.data);
            toastService.error("Failed to load test count");
            setTestCount(0);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch dashboard report count
     * Loads the count of reports for the diagnostic center
     */
    const fetchdashboardReportCount = async (staff_id) => {
        logger.debug("📊 Fetching report count");
        setLoading(true);
        
        const staffId = validateStaffId();
        if (!staffId) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/sec/hcf/${staffId}/dashboardReportCount`);
            const Count = response?.data?.response[0]?.keyword_count || 0;
            
            logger.debug("✅ Report count received:", Count);
            setReportCount(Count);
        } catch (error) {
            logger.error("❌ Error fetching report count:", error);
            logger.error("❌ Error response:", error?.response?.data);
            toastService.error("Failed to load report count");
            setReportCount(0);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch dashboard patient count
     * Loads the count of patients for the diagnostic center
     */
    const fetchdashboardPatientCount = async (staff_id) => {
        logger.debug("📊 Fetching patient count");
        setLoading(true);
        
        const staffId = validateStaffId();
        if (!staffId) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/sec/hcf/${staffId}/dashboardPatientCount`);
            const Count = response?.data?.response[0]?.keyword_count || 0;
            
            logger.debug("✅ Patient count received:", Count);
            setPatientCount(Count);
        } catch (error) {
            logger.error("❌ Error fetching patient count:", error);
            logger.error("❌ Error response:", error?.response?.data);
            toastService.error("Failed to load patient count");
            setPatientCount(0);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch notifications
     * Loads notifications list for the diagnostic center staff
     */
    const Notification = async (staff_id) => {
        logger.debug("📋 Fetching notifications");
        setLoading(true);
        
        const staffId = validateStaffId();
        if (!staffId) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/sec/hcf/${staffId}/StaffNotification/`);
            const notifications = response?.data?.response || [];
            
            logger.debug("✅ Notifications received", { count: notifications.length });
            setNotify(notifications);
        } catch (error) {
            logger.error("❌ Error fetching notifications:", error);
            logger.error("❌ Error response:", error?.response?.data);
            toastService.error("Failed to load notifications");
            setNotify([]);
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
