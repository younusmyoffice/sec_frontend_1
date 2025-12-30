import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Badge, Divider, Chip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CustomModal from "../CustomModal";
import CardNotification from "../Card/CustomNotificationCard/CardNotification";
import axiosInstance from "../../config/axiosInstance";
import logger from "../../utils/logger";
import toastService from "../../services/toastService";
import Loading from "../Loading/Loading";
import NoAppointmentCard from "../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDateDay } from "../../constants/const";

/**
 * Notification Menu Component
 * 
 * Displays user notifications in a modal with:
 * - Badge showing unread notification count
 * - Fetches notifications based on user type (patient, doctor, clinic, diagnostic)
 * - Mark individual notifications as read
 * - Mark all notifications as read
 * - Notification cards with appointment details
 * 
 * @returns {JSX.Element} Notification menu component
 */
const NotificationMenu = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch notifications from API based on user type
    const getNotification = async () => {
        try {
            setIsLoading(true);
            
            // Get user details from localStorage
            const signUpType = localStorage.getItem("signUp");
            const patientId = localStorage.getItem("patient_suid");
            const staffId = localStorage.getItem("diagnostic_suid");
            const docId = localStorage.getItem("doctor_suid");
            const clinicId = localStorage.getItem("clinic_suid");

            let endpoint = "";
            // Determine API endpoint based on user type
            if (signUpType === "patient") {
                endpoint = `sec/patient/patientNotification/${patientId}`;
                logger.debug("Fetching patient notifications for:", patientId);
            } else if (signUpType === "diagnostic_center") {
                endpoint = `sec/hcf/${staffId}/StaffNotification/`;
                logger.debug("Fetching diagnostic center notifications for:", staffId);
            } else if (signUpType === "clinic") {
                endpoint = `sec/hcf/${clinicId}/clinicNotification`;
                logger.debug("Fetching clinic notifications for:", clinicId);
            } else if (signUpType === "doctor") {
                endpoint = `sec/Doctor/DoctorNotification/${docId}`;
                logger.debug("Fetching doctor notifications for:", docId);
            } else {
                logger.error("Unknown signUp type:", signUpType);
                toastService.error("Unknown user type");
                return;
            }

            // Fetch notifications using axiosInstance (automatic token handling)
            const response = await axiosInstance.get(endpoint);
            const Notify = response?.data?.response || [];
            setNotifications(Notify);
            logger.debug("Notifications fetched:", Notify.length);
        } catch (error) {
            logger.error("Error fetching notifications:", error);
            logger.error("Error response:", error.response);
            toastService.error("Failed to load notifications");
            setNotifications([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Mark individual notification as read
    const markAsRead = async (notification_id) => {
        try {
            logger.debug("Marking notification as read:", notification_id);
            // Call API to mark notification as read (status = 0)
            await axiosInstance.put(`sec/notification/status/${notification_id}/0`);

            // Update local state after marking as read
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.notification_id === notification_id
                        ? { ...notification, is_read: true }
                        : notification
                )
            );
            logger.debug("Notification marked as read");
        } catch (error) {
            logger.error("Error marking notification as read:", error);
            logger.error("Error response:", error.response);
            toastService.error("Failed to mark notification as read");
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            const unreadNotifications = notifications.filter(n => !n.is_read);
            logger.debug("Marking all notifications as read:", unreadNotifications.length);
            
            // Create promises for marking all unread notifications as read
            const promises = unreadNotifications.map(notification => 
                axiosInstance.put(`sec/notification/status/${notification.notification_id}/0`)
            );
            
            await Promise.all(promises);
            
            // Update local state - mark all as read
            setNotifications(prev => 
                prev.map(notification => ({ ...notification, is_read: true }))
            );
            
            logger.debug("All notifications marked as read");
            toastService.success("All notifications marked as read");
        } catch (error) {
            logger.error("Error marking all notifications as read:", error);
            logger.error("Error response:", error.response);
            toastService.error("Failed to mark all as read");
        }
    };

    useEffect(() => {
        getNotification();
    }, []);

    const handleProfileMenuOpen = () => {
        getNotification();
        setOpenDialog(true);
    };

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show new notifications"
                color="#AEAAAE"
                onClick={handleProfileMenuOpen}
            >
                <Badge
                    badgeContent={notifications.filter((n) => !n.is_read).length}
                    color="error"
                >
                    <NotificationsIcon sx={{ color: "#AEAAAE" }} />
                </Badge>
            </IconButton>

            <CustomModal
                isOpen={openDialog}
                conditionOpen={setOpenDialog}
                title="Notifications"
                maxWidth="md"
                footer={
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 0",
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            {notifications.length} total notifications
                        </Typography>
                        {notifications.filter(n => !n.is_read).length > 0 && (
                            <Chip
                                label={`${notifications.filter(n => !n.is_read).length} unread`}
                                color="primary"
                                size="small"
                                onClick={markAllAsRead}
                                sx={{ cursor: "pointer" }}
                            />
                        )}
                    </Box>
                }
            >
                <Box
                    sx={{
                        width: "100%",
                        maxHeight: "60vh",
                        overflowY: "auto",
                        padding: "8px 0",
                    }}
                >
                    {isLoading ? (
                        // Show loading state
                        <Loading variant="standalone" size="medium" message="Loading notifications..." />
                    ) : notifications.length > 0 ? (
                        <Box>
                            {notifications.map((notification, index) => (
                                <Box key={notification.notification_id}>
                                    <CardNotification
                                        Schedule={notification.type}
                                        data={{
                                            ...notification,
                                            recipient: localStorage.getItem("signUp") === "patient" 
                                                ? `Dr ${notification?.recipient || "Doctor Name"}` 
                                                : notification?.recipient || "Patient Name",
                                            appointment_date: formatDateDay(notification.parameters?.appointment_date) || "appointment date",
                                            created_at: notification.created_at,
                                            is_read: notification.is_read,
                                            onMarkAsRead: () => markAsRead(notification.notification_id)
                                        }}
                                    />
                                    {index < notifications.length - 1 && (
                                        <Divider sx={{ margin: "8px 0" }} />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: "center", padding: "2rem" }}>
                            <NoAppointmentCard text_one="No Notifications" />
                        </Box>
                    )}
                </Box>
            </CustomModal>
        </Box>
    );
};

export default NotificationMenu;
