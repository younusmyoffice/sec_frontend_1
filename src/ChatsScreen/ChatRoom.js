/**
 * ChatRoom Component
 * 
 * Real-time chat interface for appointments
 * Features:
 * - Receives roomId and appointment_id from URL parameters
 * - Auto-joins room if parameters are present
 * - Manual room join as fallback
 * - File sharing support
 * - Socket.IO integration for real-time messaging
 * 
 * @component
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import "./chatroom.scss";
import { AppointmentNavbar } from "../PatientModule/PatientAppointment/PatientCards";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import logger from "../utils/logger"; // Centralized logging
import toastService from "../services/toastService"; // Toast notifications

const ChatRoom = () => {
    const navigate = useNavigate();
    
    // Extract URL parameters (roomID, appointment_id, user/name)
    const params = useParams();
    const { roomID, appointment_id, user } = params;
    
    // Debug logging to verify parameters are received
    console.log("🔍 ChatRoom useParams:", params);
    console.log("🔍 Extracted values:", { roomID, appointment_id, user });
    const [socket, setSocket] = useState(null);
    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null); // State to store the selected file
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [isAutoJoined, setIsAutoJoined] = useState(false); // Track if auto-joined from URL
    
    logger.debug("🔵 ChatRoom component rendering", {
        urlRoomID: roomID,
        urlAppointmentId: appointment_id,
        urlUser: user
    });
    /**
     * Initialize roomId and name from URL parameters or localStorage
     * Auto-join room if parameters are present
     */
    useEffect(() => {
        logger.debug("🔄 Initializing ChatRoom with URL parameters", {
            roomID,
            appointment_id,
            user
        });
        
        // Set roomId from URL parameter or keep existing
        // Convert to string to ensure consistency (API may return number)
        if (roomID && !roomId) {
            const roomIdString = String(roomID); // Ensure roomID is a string
            logger.debug("✅ Setting roomId from URL parameter", { roomID, roomIdString });
            setRoomId(roomIdString);
        } else if (!roomId) {
            // Fallback to localStorage
            const storedRoomId = localStorage.getItem("roomID");
            if (storedRoomId) {
                logger.debug("✅ Setting roomId from localStorage", { storedRoomId });
                setRoomId(storedRoomId);
            }
        }
        
        // Set name from URL parameter or localStorage
        if (user && !name) {
            logger.debug("✅ Setting name from URL parameter", { user });
            setName(user);
        } else if (!name) {
            // Fallback to localStorage
            const storedName = localStorage.getItem("userName");
            if (storedName) {
                logger.debug("✅ Setting name from localStorage", { storedName });
                setName(storedName);
            } else {
                // Get patient name from localStorage if available
                const patientName = localStorage.getItem("patient_name") || 
                                   localStorage.getItem("patient_suid") || 
                                   "Patient";
                setName(patientName);
            }
        }
    }, [roomID, user, roomId, name]);

    /**
     * Auto-join room if URL parameters are present
     * Waits for socket connection before joining
     */
    useEffect(() => {
        // Wait for socket to be connected and all required parameters
        if (socket && socket.connected && roomID && name && !isAutoJoined) {
            logger.debug("🚪 Auto-joining room from URL parameters", {
                roomID,
                name,
                appointment_id,
                socketId: socket.id
            });
            
            // Join room with appointment context
            // Convert roomID to string (API may return number)
            const roomIdString = String(roomID);
            if (appointment_id) {
                socket.emit("joinRoom", {
                    userID: name,
                    roomID: roomIdString,
                    appointment_id: String(appointment_id) // Ensure appointment_id is also a string
                });
                logger.debug("✅ Emitted joinRoom with appointment context", {
                    userID: name,
                    roomID: roomIdString,
                    appointment_id: String(appointment_id)
                });
            } else {
                // Fallback to simple join event
                socket.emit("join", { roomId: roomIdString, name });
                logger.debug("✅ Emitted join event", { roomId: roomIdString, name });
            }
            
            setIsAutoJoined(true);
            toastService.success(`Joined room ${roomID}`);
            logger.debug("✅ Auto-joined room successfully");
            
            // Navigate to ChatPage after auto-joining
            // Small delay to ensure socket event is processed
            setTimeout(() => {
                const userType = localStorage.getItem("signUp") || "patient";
                if (appointment_id) {
                    if (userType === "patient") {
                        navigate(`/patientDashboard/appointment/chats/${roomIdString}/${appointment_id}`);
                    } else if (userType === "doctor") {
                        navigate(`/doctordashboard/doctorAppointment/chats/${roomIdString}/${appointment_id}`);
                    } else {
                        navigate(`/patientDashboard/appointment/chats/${roomIdString}/${appointment_id}`);
                    }
                } else {
                    navigate(`/patientDashboard/appointment/chats/${roomIdString}`);
                }
                logger.debug("✅ Navigated to ChatPage after auto-join");
            }, 500); // Small delay to ensure socket join is processed
        } else if (socket && !socket.connected && roomID && name && !isAutoJoined) {
            logger.debug("⏳ Waiting for socket connection before joining room");
        }
    }, [socket, roomID, name, appointment_id, isAutoJoined, navigate]);

    /**
     * Manual room join handler
     * Used when user manually enters room ID and name
     * After joining, navigates to the chat page
     */
    const handleJoinRoom = useCallback(
        (e) => {
            e.preventDefault();
            if (socketRef.current && roomId.trim() !== "" && name.trim() !== "") {
                logger.debug("🚪 Manually joining room", { roomId, name, appointment_id });
                
                // Join the room via socket
                if (appointment_id) {
                    socketRef.current.emit("joinRoom", {
                        userID: name,
                        roomID: roomId,
                        appointment_id: appointment_id
                    });
                } else {
                    socketRef.current.emit("join", { roomId, name });
                }
                
                // Save to localStorage
                localStorage.setItem("roomID", roomId);
                localStorage.setItem("userName", name);
                
                // Navigate to chat page after joining
                // Use the same route pattern as Home.js component
                const userType = localStorage.getItem("signUp") || "patient";
                
                if (appointment_id) {
                    // Navigate to ChatPage with roomID and appointment_id
                    if (userType === "patient") {
                        navigate(`/patientDashboard/appointment/chats/${roomId}/${appointment_id}`);
                    } else if (userType === "doctor") {
                        navigate(`/doctordashboard/doctorAppointment/chats/${roomId}/${appointment_id}`);
                    } else {
                        // Fallback: navigate to patient route
                        navigate(`/patientDashboard/appointment/chats/${roomId}/${appointment_id}`);
                    }
                } else {
                    // If no appointment_id, navigate to basic chat route
                    navigate(`/patientDashboard/appointment/chats/${roomId}`);
                }
                
                toastService.success(`Joined room ${roomId}`);
                logger.debug("✅ Manually joined room successfully and navigated to chat");
            } else {
                logger.warn("⚠️ Cannot join room - missing roomId or name");
                toastService.error("Please enter both name and room ID");
            }
        },
        [roomId, name, appointment_id, navigate],
    );

    // const handleMessageAndFileSend = e => {
    //     if(fileName ===  "" || fileName === undefined){
    //         (e) => {
    //             e.preventDefault();
    //             if (socketRef.current && message.trim() !== "") {
    //                 socketRef.current.emit("message", { roomId, message });
    //                 setMessage("");
    //             }
    //         },
    //         [roomId, message],
    //     }else{
            
    //     }
    // }

    const handleSend = useCallback(
        (e) => {
            e.preventDefault();
            
            if (socketRef.current) {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        socketRef.current.emit("file", {
                            roomId,
                            file: { name: file.name, data: event.target.result },
                        });
                    };
                    reader.readAsDataURL(file);
                    setFile(null);
                } else if (message.trim() !== "") {
                    socketRef.current.emit("message", { roomId, message });
                    setMessage("");
                    document.getElementById("text-box").value = ""
                }
            }
        },
        [roomId, message, file],
    );

    // const handleMessageSend = useCallback(
    //     (e) => {
    //         e.preventDefault();
    //         if (socketRef.current && message.trim() !== "") {
    //             socketRef.current.emit("message", { roomId, message });
    //             setMessage("");
    //         }
    //     },
    //     [roomId, message],
    // );

    // const handleFileSend = useCallback(
    //     (e) => {
    //         e.preventDefault();
    //         if (socketRef.current && file) {
    //             // If file is selected, emit "file" event to server with file data
    //             const reader = new FileReader();
    //             reader.onload = (event) => {
    //                 socketRef.current.emit("file", {
    //                     roomId,
    //                     file: { name: file.name, data: event.target.result },
    //                 });
    //             };
    //             reader.readAsDataURL(file);
    //             setFile(null);
    //         }
    //     },
    //     [roomId, file],
    // );

    /**
     * Initialize socket connection and set up event listeners
     */
    useEffect(() => {
        logger.debug("🔌 Initializing socket connection");
        socketRef.current = io("http://localhost:4001");

        socketRef.current.on("connect", () => {
            logger.debug("✅ Socket connected", { socketId: socketRef.current?.id });
            setError(null);
            setSocket(socketRef.current);
        });

        socketRef.current.on("connect_error", (err) => {
            logger.error("❌ Socket connection error:", err);
            setError(`Socket connection error: ${err.message}`);
            toastService.error("Failed to connect to chat server");
        });

        // Listen for incoming messages
        socketRef.current.on("message", (data) => {
            logger.debug("📨 Received message", data);
            setMessages((prevMessages) => [...prevMessages, { ...data, time: getTime() }]);
        });

        // Listen for messageResponse (alternative event name)
        socketRef.current.on("messageResponse", (data) => {
            logger.debug("📨 Received messageResponse", data);
            setMessages((prevMessages) => [...prevMessages, { ...data, time: getTime() }]);
        });

        // Listen for userList messages
        socketRef.current.on("userList", (userListMessage) => {
            logger.debug("👥 Received userList", userListMessage);
            toastService.info(userListMessage);
        });

        // Listen for file messages
        socketRef.current.on("file", ({ sender, fileName }) => {
            logger.debug("📎 Received file", { sender, fileName });
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender, message: `File shared by ${sender}: `, fileName, time: getTime() },
            ]);
            toastService.info(`File received from ${sender}`);
        });

        // Listen for previous messages when joining room
        socketRef.current.on("previousMessages", (data) => {
            logger.debug("📜 Received previous messages", { count: Array.isArray(data) ? data.length : 0 });
            if (Array.isArray(data)) {
                const normalizedMessages = data.map((item) => ({
                    ...item,
                    time: item.time || getTime()
                }));
                setMessages(normalizedMessages);
            }
        });

        // Clean up on component unmount
        return () => {
            logger.debug("🧹 Cleaning up socket connection");
            if (socketRef.current) {
                socketRef.current.off("connect");
                socketRef.current.off("connect_error");
                socketRef.current.off("message");
                socketRef.current.off("messageResponse");
                socketRef.current.off("userList");
                socketRef.current.off("file");
                socketRef.current.off("previousMessages");
                socketRef.current.disconnect();
            }
        };
    }, []);

    const handleFileChange = (event) => {
        setFileName(event.target.files[0]?.name)
        setFile(event.target.files[0]);
    };

    const handleDisconnect = () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            setError(null);
            window.alert(`You disconnected from the room`);
        }
    };

    // Function to get current time in 12-hour format
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        const timeString = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
        return timeString;
    };

    return (
        <Box sx={{ display: "flex", width: "100%", height: "95vh" , msOverflowY : "hidden" }}>
            <AppointmentNavbar />
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
                <Box className={"chat-container-one"} >

                </Box>
                <div className={"chat-container-two"}>
                    {error && <p>{error}</p>}
                    <CustomTextField
                        placeholder={"Enter your name "}
                        type={"text"}
                        value={name} // Use controlled component
                        onChange={(e) => setName(e.target.value)}
                        label="Name"
                        helperText={roomID ? "Name from URL" : ""}
                        disabled={!!roomID} // Disable if received from URL
                    />

                    <CustomTextField
                        placeholder={"Enter room ID"}
                        type={"text"}
                        value={roomId} // Use controlled component
                        onChange={(e) => setRoomId(e.target.value)}
                        label="Enter Room ID"
                        helperText={roomID ? "Room ID from URL" : ""}
                        disabled={!!roomID} // Disable if received from URL
                    />
                    
                    {/* Show appointment ID if available */}
                    {appointment_id && (
                        <Typography sx={{ fontSize: "0.875rem", color: "#666", mb: 1 }}>
                            Appointment ID: {appointment_id}
                        </Typography>
                    )}

                    <CustomButton label="Join Room" handleClick={handleJoinRoom} />

                    {/* for displaying messages */}
                    <div style={{border : "1px solid black"}} className="text-message-container" >
                        {/* to display doctor name date and time */}
                        <div>

                        </div>
                        {/* to display messages */}
                        {messages.map((msg, index) => {
                            console.log("MSGGGG : ",msg)
                            return  (
                            <div key={index}>
                                <strong>{msg.name}: </strong>
                                <span>{msg.message}</span>
                                <span> [{msg.time}]</span>
                                {msg.fileName && (
                                    <a
                                        href={`http://localhost:8080/uploads/${msg.fileName}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View File
                                    </a>
                                )}
                            </div>
                        )
                        }
                        )
                        }
                    </div>


                    <Box typeof={"div"} className={"message-btn-container"} >
                        {/* for sending messages */}
                    <span>
                        <CustomTextField
                            type="text"
                            placeholder="Enter message"
                            id="text-box"
                            defaultValue={message}
                            onChange={(e) => setMessage(e.target.value)}
                            helperText={""}
                            label={""}
                        />
                        {/* <SendOutlinedIcon onClick={handleMessageSend} /> */}
                        <CustomButton className={"icon-button"} label="" leftIcon={<SendOutlinedIcon/>} handleClick={handleSend} />
                        {/* <CustomButton className={"icon-button"} label="" leftIcon={<SendOutlinedIcon/>} handleClick={handleMessageSend} /> */}

                        
                    </span>
                    {/*  for sending files */}
                    <span>
                            <CustomTextField
                                id={"fileInput"}
                                type={"file"}
                                onChange={handleFileChange}
                                helperText={""}
                            />
                        <label for={"fileInput"} id={"icon"} >
                        {fileName}
                            <FileUploadOutlinedIcon/>
                        </label>
                        
                        {/* <CustomButton label={"Send File"}  className={"icon-button"} handleClick={handleSend} /> */}
                        {/* <CustomButton label={"Send File"}  className={"icon-button"} handleClick={handleFileSend} /> */}

                    </span>
                    {/* disconnect call */}
                    {/* <span>
                        <CustomButton label="Disconnect" handleClick={handleDisconnect} />
                    </span> */}
                    
                    </Box>
                </div>
            </Box>
        </Box>
    );
};

export default ChatRoom;
