import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";
import axiosInstance from "../../config/axiosInstance";

const ChatBody = ({ messages, typingStatus, lastMessageRef, roomID, socket }) => {
    const navigate = useNavigate();
    const { appointment_id } = useParams();
    const [countDown, setCountDown] = useState(null);
    const [countDownWarning , setCountDownWarning] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);
    const [call_message , setCall_message] = useState("You cannot join the chat at this time.");
    const [localCountdown, setLocalCountdown] = useState(null);
    const [appointmentEndTime, setAppointmentEndTime] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [isLoadingAppointment, setIsLoadingAppointment] = useState(true);
    
    const DoctorCard = ({ name }) => {
        return (
          <div style={{
            padding: "1rem",
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            maxWidth: "250px"
          }}>
            <p style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#333"
            }}>
              👨‍⚕️ Dr. {name}
            </p>
          </div>
        );
      };

    // Function to fetch appointment details from API
    const fetchAppointmentDetails = async () => {
        if (!appointment_id) {
            console.log("No appointment_id found in URL params");
            setIsLoadingAppointment(false);
            return;
        }

        try {
            console.log("Fetching appointment details for ID:", appointment_id);
            
            // Determine if user is doctor or patient based on current route
            const isDoctor = window.location.pathname.includes('/doctordashboard/');
            const patientEndpoint = `/sec/patient/getAppointmentDateTime/${appointment_id}`;
            // const patientEndpoint = `/sec/patient/appointmentsById/${appointment_id}`;
            const doctorEndpoint = `/sec/doctor/AppointmentdetailsId/${appointment_id}`;
            const apiEndpoint = isDoctor ? doctorEndpoint : patientEndpoint;
            
            console.log("Using API endpoint:", apiEndpoint);
            let response = await axiosInstance.get(apiEndpoint);
            
            const extractAppointment = (resp) => {
                if (!resp || !resp.data) return null;
                const payload = resp.data.response;
                if (!payload) return null;
                // If backend returns string like "Appointment does not exist"
                if (typeof payload === 'string') return null;
                if (Array.isArray(payload) && payload.length > 0) return payload[0];
                if (Array.isArray(payload) && payload.length === 0) return null;
                // Object case
                return payload;
            };

            let extracted = extractAppointment(response);

            // Fallback: if patient endpoint returned empty or invalid, try doctor endpoint
            if (!isDoctor && !extracted) {
                console.log("Primary endpoint returned no data. Trying doctor endpoint as fallback...");
                try {
                    response = await axiosInstance.get(doctorEndpoint);
                    extracted = extractAppointment(response);
                } catch (e) {
                    console.warn("Fallback doctor endpoint also failed", e);
                }
            }

            if (extracted) {
                const appointment = extracted;
                console.log("Fetched appointment data:", appointment);
                
                setAppointmentData(appointment);
                
                // Calculate appointment end time
                if (appointment.appointment_date && appointment.appointment_time && appointment.plan_duration) {
                    const appointmentDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`);
                    const durationMinutes = parseInt(String(appointment.plan_duration).split(' ')[0]);
                    const endTime = new Date(appointmentDateTime.getTime() + (durationMinutes * 60000));
                    setAppointmentEndTime(endTime);
                    
                    // Start local countdown
                    const now = new Date();
                    const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));
                    setLocalCountdown(timeLeft);
                    
                    console.log("Appointment end time calculated:", endTime);
                    console.log("Time left in seconds:", timeLeft);
                } else {
                    console.log("Missing appointment data fields:", {
                        appointment_date: appointment?.appointment_date,
                        appointment_time: appointment?.appointment_time,
                        plan_duration: appointment?.plan_duration
                    });
                }
            } else {
                console.log("No appointment data found in response");
            }
        } catch (error) {
            console.error("Error fetching appointment details:", error);
            // Fallback to localStorage if API fails
            const appointmentData = localStorage.getItem(`appointment_${appointment_id}`);
            if (appointmentData) {
                try {
                    const data = JSON.parse(appointmentData);
                    setAppointmentData(data);
                    console.log("Using localStorage appointment data as fallback");
                } catch (parseError) {
                    console.error("Error parsing localStorage appointment data:", parseError);
                }
            }
        } finally {
            setIsLoadingAppointment(false);
        }
    };
      
    useEffect(() => {
        // Listen for the countdown event from the server
        socket.on("countdown", (timeLeft) => {
            console.log("Received countdown:", timeLeft);
            setCountDown(timeLeft);
            if(timeLeft < 250) {
                setCountDownWarning(true);
            }
        });

        // Listen for the end of the call
        socket.on("endCall", (data) => {
            console.log("Call ended:", data);
            alert(data.message); // Show the message when the call ends
            setIsCallEnded(true); // Mark the call as ended
            setCountDown(null); // Clear the countdown
        });

        socket.on("error", (data) => {
            console.log("Socket error:", data);
            setCall_message(data?.message || "An error occurred");
        });

        // Request countdown from server when joining
        socket.emit("requestCountdown", { roomID });

        // Clean up the socket listener when the component unmounts
        return () => {
            socket.off("countdown");
            socket.off("endCall");
            socket.off("error");
        };
    }, [roomID, socket]);

    const handleDisconnect = () => {
        // Optionally, you can handle manual disconnection here if needed.
        socket.disconnect();
        localStorage.removeItem("userName");
        localStorage.removeItem("roomID");
        // navigate(-1);
        window.location.reload();
    };

    // Local countdown timer as fallback
    useEffect(() => {
        if (localCountdown !== null && localCountdown > 0) {
            const timer = setTimeout(() => {
                setLocalCountdown(prev => {
                    if (prev <= 1) {
                        setIsCallEnded(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            return () => clearTimeout(timer);
        }
    }, [localCountdown]);

    // Warning state when under threshold (5 minutes)
    useEffect(() => {
        const remaining = (countDown !== null ? countDown : localCountdown);
        if (remaining !== null && remaining <= 300 && remaining > 0) {
            setCountDownWarning(true);
        } else {
            setCountDownWarning(false);
        }
    }, [countDown, localCountdown]);

    // Automatically disconnect and end call when the countdown reaches 0
    useEffect(() => {
        if (countDown === 0 || localCountdown === 0) {
            handleDisconnect(); // Disconnect the user
            setIsCallEnded(true); // Mark the call as ended
        }
    }, [countDown, localCountdown]);

    // Fetch appointment details when component mounts
    useEffect(() => {
        fetchAppointmentDetails();
    }, [appointment_id]);

    // Refresh appointment data every 30 seconds to get updated status
    useEffect(() => {
        const interval = setInterval(() => {
            if (appointment_id && !isCallEnded) {
                console.log("Refreshing appointment data...");
                fetchAppointmentDetails();
            }
        }, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, [appointment_id, isCallEnded]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    const handleLeaveChat = () => {
        socket.disconnect();

        localStorage.removeItem("userName");
        localStorage.removeItem("roomID");
        navigate(-1);
        window.location.reload();
    };

    return (
        <>
            <header className="chat__mainHeader">
                {/* Patient/Doctor Card */}
                {appointmentData && (
                    <DoctorCard 
                        name={window.location.pathname.includes('/doctordashboard/') 
                            ? appointmentData.patient_name || `${appointmentData.first_name} ${appointmentData.last_name}`
                            : appointmentData.doctor_name
                        } 
                    />
                )}
                
                {/* Appointment Info */}
                {isLoadingAppointment ? (
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <p>Loading appointment details...</p>
                    </div>
                ) : appointmentData ? (
                    <div style={{ marginBottom: '1rem' }}>
                        <h4>Appointment Details</h4>
                        <p><strong>Date:</strong> {appointmentData.appointment_date}</p>
                        <p><strong>Time:</strong> {appointmentData.appointment_time}</p>
                        <p><strong>Duration:</strong> {appointmentData.plan_duration}</p>
                        {/* <p><strong>Type:</strong> {appointmentData.plan_name}</p> */}
                        {window.location.pathname.includes('/doctordashboard/') && (
                            <p><strong>Patient:</strong> {appointmentData.patient_name || `${appointmentData.first_name} ${appointmentData.last_name}`}</p>
                        )}
                        {!window.location.pathname.includes('/doctordashboard/') && (
                            <p><strong>Doctor:</strong> {appointmentData.doctor_name}</p>
                        )}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <p style={{ color: 'orange' }}>No appointment data available</p>
                    </div>
                )}

                {/* Timer Section */}
                <div>
                    {(countDown !== null || localCountdown !== null) && !isCallEnded ? (
                        <div>
                            <h5>Time Remaining:</h5>
                            <p style={{
                                color : countDownWarning ? 'red' : 'black',
                                fontWeight : 'bold',
                                fontSize: '1.2rem'
                            }} >
                                {formatTime(countDown !== null ? countDown : localCountdown).split('.')[0]}
                            </p>
                            {countDown !== null && (
                                <small style={{ color: 'green' }}>Server Timer</small>
                            )}
                            {countDown === null && localCountdown !== null && (
                                <small style={{ color: 'orange' }}>Local Timer</small>
                            )}
                        </div>
                    ) : isCallEnded ? (
                        <div>
                            <h3 style={{ color: 'red' }}>The call has ended.</h3>
                        </div>
                    ) : (
                        <p style={{ color: 'gray' }}>{call_message}</p>
                    )}
                </div>

                {/* Action Buttons */}
                {!isCallEnded && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <CustomButton isTransaprent={true} handleClick={handleLeaveChat} label="End Chat" />
                        {/* <CustomButton 
                            isTransaprent={false} 
                            handleClick={() => {
                                setLocalCountdown(300); // 5 minutes for testing
                                setCountDownWarning(false);
                            }} 
                            label="Start Test Timer (5min)" 
                        /> */}
                    </div>
                )}
            </header>

            <div className="message__container">
                {messages
                    .filter(message => message && message.name && message.text) // Filter out null/undefined messages
                    .map((message) =>
                        message.name === localStorage.getItem("userName") ? (
                            <div className="message__chats" key={message.id || Math.random()}>
                                {/* <p className='sender__name'>You</p> */}
                                <div className="message__sender">
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="message__chats" key={message.id || Math.random()}>
                                {/* <p>{message.name}</p> */}
                                <div className="message__recipient">
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ),
                    )}

                <div className="message__status">
                    <p>{typingStatus}</p>
                </div>
                <div ref={lastMessageRef} />
            </div>
        </>
    );
};

export default ChatBody;

// import React from 'react'
// import {useNavigate} from "react-router-dom"

// const ChatBody = ({messages, typingStatus, lastMessageRef}) => {
//   const navigate = useNavigate()

//   const handleLeaveChat = () => {
//     localStorage.removeItem("userName")
//     navigate("/")
//     window.location.reload()
//   }

//   return (
//     <>
//       <header className='chat__mainHeader'>
//           <p>Hangout with Colleagues</p>
//           <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
//         </header>

//         <div className='message__container'>
//           {messages.map(message => (
//             message.name === localStorage.getItem("userName") ? (
//               <div className="message__chats" key={message.id}>
//             <p className='sender__name'>You</p>
//             <div className='message__sender'>
//                 <p>{message.text}</p>
//             </div>
//           </div>
//             ): (
//               <div className="message__chats" key={message.id}>
//             <p>{message.name}</p>
//             <div className='message__recipient'>
//                 <p>{message.text}</p>
//             </div>
//           </div>
//             )
//             ))}

//           <div className='message__status'>
//             <p>{typingStatus}</p>
//           </div>
//           <div ref={lastMessageRef} />
//         </div>
//     </>
//   )
// }

// export default ChatBody
