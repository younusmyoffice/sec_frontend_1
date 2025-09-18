import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, List, ListItem, ListItemText, Badge, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CustomModal from "../CustomModal";
import axiosInstance from "../../config/axiosInstance";
import NoAppointmentCard from "../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDateDay } from "../../constants/const";

const NotificationMenu = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const getNotification = async () => {
        try {
            const signUpType = localStorage.getItem("signUp");
            const patientId = localStorage.getItem("patient_suid");
            const staffId = localStorage.getItem("diagnostic_suid");
            const docId = localStorage.getItem("doctor_suid");
            const clinicId = localStorage.getItem("clinic_suid");

            let endpoint = "";
            if (signUpType === "patient") {
                endpoint = `sec/patient/patientNotification/${patientId}`;
            } else if (signUpType === "diagnostic_center") {
                endpoint = `sec/hcf/${staffId}/StaffNotification/`;
            } else if (signUpType === "clinic") {
                endpoint = `sec/hcf/${clinicId}/clinicNotification`;
            } else if (signUpType === "doctor") {
                endpoint = `sec/Doctor/DoctorNotification/${docId}`;
            } else {
                console.error("Unknown signUp type:", signUpType);
                return;
            }

            const response = await axiosInstance.get(endpoint);
            const Notify = response?.data?.response || [];
            setNotifications(Notify);
        } catch (error) {
            console.error("Error fetching notifications:", error.response);
        }
    };

    const markAsRead = async (notification_id) => {
        try {
            // Assume there's an API endpoint to mark a notification as read
            await axiosInstance.put(`sec/notification/status/${notification_id}/0`);

            // Update local state after marking as read
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.notification_id === notification_id
                        ? { ...notification, is_read: true }
                        : notification
                )
            );
        } catch (error) {
            console.error("Error marking notification as read:", error.response);
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
                footer={
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "8px",
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            You have {notifications.length} notifications
                        </Typography>
                    </Box>
                }
            >
                <Box
                    sx={{
                        width: "500px",
                        height: "500px",
                        overflowY: "auto",
                        padding: "16px",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Notifications
                    </Typography>
                    {notifications.length > 0 ? (
                        <List>
                            {notifications.map((notification) => (
                                <ListItem
                                    key={notification.notification_id}
                                    divider
                                    sx={{
                                        backgroundColor: notification.is_read ? "transparent" : "#F4F4F4",
                                    }}
                                >
                                    <ListItemText
                                        primary={notification.type}
                                        secondary={
                                            <>
                                                <Typography variant="body2">You have Appointment on {formatDateDay(notification.parameters?.appointment_date) || "appointment date"}</Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                    with {localStorage.getItem("signUp") === "patient" ? `Dr ${notification?.recipient || "Doctor Name"}` : notification?.recipient || "patient Name"}
                                                    </Typography>
                                                {notification.parameters?.fourth && (
                                                    <Typography variant="caption" color="textSecondary">
                                                        {notification.parameters?.fourth}
                                                    </Typography>
                                                )}
                                            </>
                                        }
                                    />
                                    {!notification.is_read && (
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => markAsRead(notification.notification_id)}
                                        >
                                            Mark as Read
                                        </Button>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Box>
                            <NoAppointmentCard text_one={"No Notifications"} />
                        </Box>
                    )}
                </Box>
            </CustomModal>
        </Box>
    );
};

export default NotificationMenu;
