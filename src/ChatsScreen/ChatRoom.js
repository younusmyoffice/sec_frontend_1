import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Typography } from "@mui/material";
import io from "socket.io-client";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import "./chatroom.scss";
import { AppointmentNavbar } from "../PatientModule/PatientAppointment/PatientCards";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const ChatRoom = () => {
    const [socket, setSocket] = useState(null);
    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null); // State to store the selected file
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);
    const [fileName , setFileName] = useState("")
    console.log("File Name : ",fileName)
    const handleJoinRoom = useCallback(
        (e) => {
            e.preventDefault();
            if (socketRef.current && roomId.trim() !== "" && name.trim() !== "") {
                socketRef.current.emit("join", { roomId, name });
                window.alert(`You joined room ${roomId}`);
            }
        },
        [roomId, name],
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

    useEffect(() => {
        socketRef.current = io("http://localhost:4001");

        socketRef.current.on("connect", () => {
            setError(null);
        });

        socketRef.current.on("connect_error", (err) => {
            setError(`Socket connection error: ${err.message}`);
        });

        // Listen for incoming messages
        socketRef.current.on("message", (data) => {
            // Update the messages state if needed
            setMessages((prevMessages) => [...prevMessages, { ...data, time: getTime() }]);
        });

        // Listen for userList messages
        socketRef.current.on("userList", (userListMessage) => {
            // Show the userListMessage as an alert
            window.alert(userListMessage);
        });

        // Listen for file messages
        socketRef.current.on("file", ({ sender, fileName }) => {
            // Display the file name as a message
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender, message: `File shared by ${sender}: `, fileName, time: getTime() },
            ]);
        });

        // Clean up on component unmount
        return () => {
            socketRef.current.off("connect");
            socketRef.current.off("connect_error");
            socketRef.current.off("message");
            socketRef.current.off("userList");
            socketRef.current.off("file");
            socketRef.current.disconnect();
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
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Name"
                        helperText={""}
                    />

                    <CustomTextField
                        placeholder={"Enter room ID"}
                        type={"text"}
                        defaultValue={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        label="Enter Room ID"
                        helperText={""}
                    />

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
