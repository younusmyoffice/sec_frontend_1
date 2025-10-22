import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { AppointmentNavbar } from "../../PatientModule/PatientAppointment/PatientCards";
import DoctorAppointmentNavbar from "../../DoctorModule/CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import CustomButton from "../../components/CustomButton";

const Home = ({ socket }) => {
    const navigate = useNavigate();
    const { user: paramUser, roomID: paramRoomID, appointment_id: appId } = useParams();
    const [userName, setUserName] = useState(localStorage.getItem("userName") || paramUser || "");
    const [roomID, setRoomID] = useState(localStorage.getItem("roomID") || paramRoomID || "");
    const [appointment_id, setAppointment_id] = useState( appId || "");
    const user = localStorage.getItem("signUp") || "";
    let doctorId = 101010
    useEffect(() => {
        // socket.emit("endCall", { userName, roomID }); // Notify server to clean up
    }, [userName, roomID]);

    const handleSubmit = () => {
        if (userName && roomID) {
            localStorage.setItem("userName", userName);
            localStorage.setItem("roomID", roomID);
            socket.emit("joinRoom", { userID: userName, roomID , doctorId : '', appointment_id });
            // navigate(`/PatientModule/appointment/chats/${roomID}`);
        }

        userName && roomID
            ? user === "patient"
           // chats/:user/:roomID/:appointment_id
                ? navigate(`/patientDashboard/appointment/chats/${roomID}/${appointment_id}`)
                : user === "doctor"
                ? navigate(`/doctordashboard/doctorAppointment/chats/${roomID}/${appointment_id}`)
                : alert("Both Username and Room ID are required.")
            : alert("Both Username and Room ID are required.");
    };

    return (
        <Box sx={{ display: "flex", width: "95%", height: "95vh" }} className="upcoming">
            {user === "doctor" ? (
                <DoctorAppointmentNavbar />
            ) : (
                user === "patient" && <AppointmentNavbar />
            )}
            <Box
                sx={{
                    flex: 1,
                    position: "relative",
                    top: "4em",
                    border: "1px solid #E6E1E5",
                    borderRadius: "8px",
                    p: 2,
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <p>
                    User Name : {userName} Room Id : {roomID}
                </p>
                <CustomButton label="Join" handleClick={handleSubmit} />
            </Box>
        </Box>
    );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppointmentNavbar } from "../../Dashboard/PatientAppointment/PatientCards";
// import DoctorAppointmentNavbar from "../../DoctorModule/CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
// import CustomButton from "../../components/CustomButton";

// const Home = ({ socket }) => {
//     const navigate = useNavigate();
//     const { user: paramUser, roomID: paramRoomID } = useParams();

//     const [userName, setUserName] = useState(localStorage.getItem("userName") || paramUser || "");
//     const [roomID, setRoomID] = useState(localStorage.getItem("roomID") || paramRoomID || "");
//     const [user, setUser] = useState(localStorage.getItem("signUp") || "");

//     useEffect(() => {
//         if (userName && roomID) joinRoom(roomID, userName);
//     }, [userName, roomID]);

//     const joinRoom = (roomID, userName) => {
//         localStorage.setItem("userName", userName);
//         localStorage.setItem("roomID", roomID);
//         socket.emit("joinRoom", { userID: userName, roomID });
//         navigate(`/PatientModule/appointment/chats/${roomID}`);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         userName && roomID ? joinRoom(roomID, userName) : alert("Both Username and Room ID are required.");
//     };

//     return (
//         <Box sx={{ display: "flex", width: "95%", height: "95vh" }} className="upcoming">
//             {user === "doctor" ? <DoctorAppointmentNavbar /> : user === "patient" ? <AppointmentNavbar /> : null}
//             <Box sx={{ position: "relative", top: "4em", width: "100%", display: "flex", height: "100%" }}>
//                 <Box sx={{ width: "100%", height: "100%" }}>
//                     <Box sx={{ width: "100%", height: "100%", border: "1px solid #E6E1E5", borderRadius: "8px", padding: "2%", marginLeft: "2%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                             <CustomButton label="SIGN IN" handleClick={handleSubmit} />
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppointmentNavbar } from "../../Dashboard/PatientAppointment/PatientCards";
// import DoctorAppointmentNavbar from "../../DoctorModule/CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
// import CustomButton from "../../components/CustomButton";

// const Home = ({ socket }) => {
//     const navigate = useNavigate();
//     const { user: paramUser, roomID: paramRoomID } = useParams();

//     const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
//     const [roomID, setRoomID] = useState(localStorage.getItem("roomID") || "");
//     const [user, setUser] = useState(localStorage.getItem("signUp") || "");

//     useEffect(() => {
//         if (!userName || !roomID) {
//             const resolvedUserName = paramUser || "";
//             const resolvedRoomID = paramRoomID || "";
//             setUserName(resolvedUserName);
//             setRoomID(resolvedRoomID);

//             if (resolvedUserName && resolvedRoomID) {
//                 joinRoom(resolvedRoomID, resolvedUserName);
//             }
//         } else {
//             joinRoom(roomID, userName);
//         }
//     }, [userName, roomID, paramUser, paramRoomID]);

//     const joinRoom = (roomID, userName) => {
//         if (roomID && userName) {
//             localStorage.setItem("userName", userName);
//             localStorage.setItem("roomID", roomID);
//             socket.emit("joinRoom", { userID: userName, roomID });
//             navigate(`/PatientModule/appointment/chats/${roomID}`);
//         }
//     };

//     const handleInputChange = (setter) => (e) => {
//         setter(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!userName || !roomID) {
//             alert("Both Username and Room ID are required.");
//             return;
//         }
//         joinRoom(roomID, userName);
//     };

//     const renderNavbar = () => {
//         if (user === "doctor") return <DoctorAppointmentNavbar />;
//         if (user === "patient") return <AppointmentNavbar />;
//         return null;
//     };

//     return (
//         <Box sx={{ display: "flex", width: "95%", height: "95vh" }} className="upcoming">
//             {renderNavbar()}
//             <Box
//                 sx={{
//                     position: "relative",
//                     top: "4em",
//                     width: "100%",
//                     display: "flex",
//                     height: "100%",
//                 }}
//             >
//                 <Box sx={{ width: "100%", height: "100%" }}>
//                     <Box sx={{ width: "100%", height: "100%" }}>
//                         <Box
//                             sx={{
//                                 width: "100%",
//                                 border: "1px solid #E6E1E5",
//                                 borderRadius: "8px",
//                                 padding: "2%",
//                                 marginLeft: "2%",
//                                 height: "100%",
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 justifyContent: "space-between",
//                             }}
//                         >
//                             <form className="home__container" onSubmit={handleSubmit}>
//                                 <h2 className="home__header">Sign in to Open Chat</h2>
//                                 <label htmlFor="username">Username</label>
//                                 <input
//                                     type="text"
//                                     minLength={6}
//                                     id="username"
//                                     className="username__input"
//                                     value={userName}
//                                     onChange={handleInputChange(setUserName)}
//                                 />
//                                 <label htmlFor="roomID">Room ID</label>
//                                 <input
//                                     type="text"
//                                     id="roomID"
//                                     className="room__input"
//                                     value={roomID}
//                                     onChange={handleInputChange(setRoomID)}
//                                 />
//                                 <CustomButton label="SIGN IN" handleClick={handleSubmit} />
//                             </form>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default Home;

// import { Box } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppointmentNavbar } from "../../Dashboard/PatientAppointment/PatientCards";
// import "./chat.scss";
// import axiosInstance from "../../config/axiosInstance";
// import DoctorAppointmentNavbar from "../../DoctorModule/CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
// import CustomButton from "../../components/CustomButton";

// const Home = ({ socket }) => {
//     const navigate = useNavigate();
//     const [userName, setUserName] = useState("");
//     const [roomID, setRoomID] = useState("");
//     const [user, setUser] = useState("");
//     const params = useParams();

//     useEffect(() => {
//         // Try to load user data from localStorage
//         console.log(params.user , params.roomID);
//         setUser(localStorage.getItem("signUp"));
//         const savedUserName = localStorage.getItem("userName");
//         const savedRoomID = localStorage.getItem("roomID");
//         // chatSocket();
//         // console.log("saved user local storage : ",savedUserName);
//         // console.log("saved user room id : ",savedUserName);

//         if (savedUserName !== null || undefined && savedRoomID !== null || undefined ) {
//             console.log("from local",savedUserName,savedRoomID)
//             setUserName(savedUserName);
//             setRoomID(savedRoomID);
//             handleSubmit(savedRoomID,savedUserName);
//         }else{
//             console.log('from params',params.roomID,params.user)

//             setRoomID(params.roomID)
//             setUserName(params.user)
//             handleSubmit(params.roomID,params.user);
//         }
//     }, []);

//     const handleSubmit = (roomID,userName) => {
//         // e.preventDefault();
//         if (!userName || !roomID) {
//             alert("Both Username and Room ID are required.");
//             return;
//         }
//         localStorage.setItem("userName", userName);
//         localStorage.setItem("roomID", roomID);
//         console.log("in handle submit : ",roomID,userName)
//         socket.emit("joinRoom", { userID: userName, roomID });
//         navigate(`/PatientModule/appointment/chats/${roomID}`);
//     };

//     return (
//         <Box sx={{ display: "flex", width: "95%", height: "95vh" }} className={"upcoming"}>
//             {user === "doctor" ? (
//                 <DoctorAppointmentNavbar />
//             ) : user === "patient" ? (
//                 <AppointmentNavbar />
//             ) : null}

//             {/* <AppointmentNavbar />
//         <DoctorAppointmentNavbar /> */}

//             <Box
//                 component={"div"}
//                 sx={{
//                     position: "relative",
//                     top: "4em",
//                     width: "100%",
//                     display: "flex",
//                     height: "100%",
//                 }}
//             >
//                 <Box sx={{ width: "100%", height: "100%" }}>
//                     <Box sx={{ width: "100%", height: "100%" }}>
//                         <Box
//                             sx={{
//                                 width: "100%",
//                                 border: "1px solid #E6E1E5",
//                                 borderRadius: "8px",
//                                 padding: "2%",
//                                 marginLeft: "2%",
//                                 height: "100%",
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 justifyContent: "space-between",
//                             }}
//                         >
//                             <form className="home__container" onSubmit={handleSubmit}>
//                                 <h2 className="home__header">Sign in to Open Chat</h2>
//                                 <label htmlFor="username">Username</label>
//                                 <input
//                                     type="text"
//                                     minLength={6}
//                                     name="username"
//                                     id="username"
//                                     className="username__input"
//                                     value={userName}
//                                     onChange={(e) => setUserName(e.target.value)}
//                                 />
//                                 <label htmlFor="roomID">Room ID</label>
//                                 <input
//                                     type="text"
//                                     name="roomID"
//                                     id="roomID"
//                                     className="room__input"
//                                     value={roomID}
//                                     onChange={(e) => setRoomID(e.target.value)}
//                                 />
//                                 <CustomButton label="SIGN IN" handleClick={handleSubmit} />
//                                 {/* <button className="home__cta">SIGN IN</button> */}
//                             </form>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default Home;

// import React, {useState} from 'react'
// import {useNavigate} from "react-router-dom"

// const Home = ({socket}) => {
//     const navigate = useNavigate()
//     const [userName, setUserName] = useState("")

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         localStorage.setItem("userName", userName)
//         socket.emit("newUser", {userName, socketID: socket.id})
//         navigate("/chat")
//     }
//   return (
//     <form className='home__container' onSubmit={handleSubmit}>
//         <h2 className='home__header'>Sign in to Open Chat</h2>
//         <label htmlFor="username">Username</label>
//         <input type="text"
//         minLength={6}
//         name="username"
//         id='username'
//         className='username__input'
//         value={userName}
//         onChange={e => setUserName(e.target.value)}
//         />
//         <button className='home__cta'>SIGN IN</button>
//     </form>
//   )
// }

// export default Home
