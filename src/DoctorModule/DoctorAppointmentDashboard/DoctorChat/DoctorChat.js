/**
 * DoctorChat Component
 * 
 * Chat interface for doctor-patient communication:
 * - Uses ChatPage component (same as patient section) for real-time chat when roomID is in URL
 * - Shows list of available chat appointments when no roomID
 * - Handles socket.io connection for messaging
 * 
 * Features:
 * - Real-time messaging via socket.io
 * - Appointment details display
 * - Time remaining counter
 * - File sharing support
 * - List of available chat appointments
 * 
 * URL Parameters:
 * - /chats/:user/:roomID/:appointment_id - Full chat with appointment
 * - /chats/:roomID - Chat with just roomID
 * - /chats - List of available chats (no parameters)
 * 
 * @component
 */

import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./doctorChat.scss";
import DoctorAppointmentNavbar from "../../CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import ChatPage from "../../../ChatsScreen/components/ChatPage";
import socketIO from "socket.io-client";
import logger from "../../../utils/logger";
import axiosInstance from "../../../config/axiosInstance";
import toastService from "../../../services/toastService";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

/**
 * Initialize socket connection for real-time chat
 * Same socket instance as used in AppRouter
 */
const socket = socketIO.connect("http://localhost:4001", {
    transports: ["websocket", "polling"],
});

// Set up socket event listeners
socket.on("connect", () => {
    logger.debug("✅ Socket connected for DoctorChat");
});

socket.on("connect_error", (error) => {
    logger.error("❌ Socket connection error in DoctorChat:", error);
});

const DoctorChat = () => {
    const { roomID, appointment_id, user } = useParams();
    const navigate = useNavigate();
    
    // State for chat list when no roomID
    const [chatAppointments, setChatAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Validate doctor ID from localStorage
     * SECURITY: Ensures doctor ID is present before making API calls
     * 
     * @returns {string|null} Doctor ID or null if invalid
     */
    const validateDoctorId = () => {
        const doctorId = localStorage.getItem("doctor_suid");
        
        if (!doctorId) {
            logger.warn("⚠️ Doctor ID not found in localStorage");
            toastService.warning("Doctor ID is missing. Please log in again.");
            return null;
        }
        
        logger.debug("✅ Doctor ID validated:", doctorId);
        return doctorId;
    };

    /**
     * Fetch appointments with chat capability (message plan type)
     * Shows list of available chats when user navigates to /chats without parameters
     * 
     * @returns {Promise<void>}
     */
    const fetchChatAppointments = useCallback(async () => {
        const doctorId = validateDoctorId();
        if (!doctorId) {
            setLoading(false);
            return;
        }

        logger.debug("💬 Fetching chat appointments");
        setLoading(true);
        
        try {
            // Fetch upcoming appointments - these typically have chat rooms
            const response = await axiosInstance.post(
                "/sec/Doctor/UpcomingAppointmentsDoctor",
                {
                    doctor_id: Number(doctorId),
                    status_booked: "booked",
                }
            );
            
            // Filter appointments that have message plan and roomid
            const appointmentsWithChat = (response?.data?.response || []).filter(
                (appointment) => appointment?.plan_name === "message" && appointment?.roomid
            );
            
            logger.debug("✅ Chat appointments received", {
                total: response?.data?.response?.length || 0,
                withChat: appointmentsWithChat.length
            });
            
            setChatAppointments(appointmentsWithChat);
        } catch (error) {
            logger.error("❌ Failed to fetch chat appointments:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load chat appointments"
            );
            setChatAppointments([]);
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array - validateDoctorId reads from localStorage which doesn't need to be in deps

    useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "chats");
        
        // Hide location search container
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
        }
        
        // Set doctor's name for chat if not already set
        const doctorName = localStorage.getItem("doctor_name") || 
                          localStorage.getItem("userName") || 
                          user || 
                          "Doctor";
        if (!localStorage.getItem("userName")) {
            localStorage.setItem("userName", doctorName);
        }
        localStorage.setItem("signUp", "doctor"); // Mark as doctor user
        
        // If no roomID, fetch available chat appointments
        if (!roomID) {
            fetchChatAppointments();
        }
        
        logger.debug("🔵 DoctorChat component rendering", { 
            roomID, 
            appointment_id, 
            user,
            doctorName 
        });
        
        // Cleanup
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
            }
        };
    }, [roomID, appointment_id, user, fetchChatAppointments]);

    // If we have roomID parameters, show the ChatPage (same as patient section)
    if (roomID) {
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
                        marginLeft: "2%",
                    }}
                >
                    {/* Use ChatPage component - same as patient section */}
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            border: "1px solid #E6E1E5",
                            borderRadius: "8px",
                            padding: "2%",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ChatPage socket={socket} />
                    </Box>
                </Box>
            </Box>
        );
    }

    // If no roomID, show list of available chat appointments
    // This handles the case when user clicks "Chats" tab without parameters
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
                {/* Scrollable chat list container - same pattern as Request/Notification */}
                <Box 
                    sx={{ 
                        width: "100%", 
                        border: "1px solid #E6E1E5",
                        borderRadius: "0.5rem",
                        padding: "2%",
                        marginLeft: "2%",
                        minHeight: "55vh",
                        maxHeight: "calc(100vh - 320px)", // Adjusted to account for navbar
                        overflowY: "auto", // Enable vertical scrolling when content overflows
                        overflowX: "hidden", // Prevent horizontal scrolling
                        display: "flex",
                        flexDirection: "column",
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
                        ) : chatAppointments.length === 0 ? (
                            <NoAppointmentCard text_one={"No Active Chats"} />
                        ) : (
                            chatAppointments.map((appointment) => {
                                const patientName = `${appointment.first_name || ""} ${appointment.middle_name || ""} ${appointment.last_name || ""}`.trim();
                                return (
                                    <Box
                                        key={appointment.appointment_id || appointment.id}
                                        onClick={() => {
                                            navigate(
                                                `/doctorDashboard/doctorAppointment/chats/${patientName}/${appointment.roomid}/${appointment.appointment_id}`
                                            );
                                        }}
                                        sx={{
                                            padding: "1rem",
                                            border: "1px solid #E72B4A",
                                            borderRadius: "0.5rem",
                                            marginBottom: "1rem",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                backgroundColor: "#f5f5f5",
                                                borderColor: "#e72b4a",
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <Box>
                                                <h4 style={{ margin: 0, color: "#313033", fontSize: "1rem" }}>
                                                    {patientName || "Patient"}
                                                </h4>
                                                <p style={{ margin: "0.5rem 0 0 0", color: "#AEAAAE", fontSize: "0.875rem" }}>
                                                    {appointment.appointment_date && appointment.appointment_time
                                                        ? `${appointment.appointment_date} at ${appointment.appointment_time}`
                                                        : "Appointment scheduled"}
                                                </p>
                                            </Box>
                                            <Box
                                                sx={{
                                                    backgroundColor: "#e72b4a",
                                                    color: "white",
                                                    padding: "0.5rem 1rem",
                                                    borderRadius: "0.5rem",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Chat
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DoctorChat;
