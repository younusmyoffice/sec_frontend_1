import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";

const ChatBody = ({ messages, typingStatus, lastMessageRef, roomID, socket }) => {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(null);
    const [countDownWarning , setCountDownWarning] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);
    const [call_message , setCall_message] = useState("You cannot join the chat at this time.")
    
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
      
    useEffect(() => {
        // Listen for the countdown event from the server
        socket.on("countdown", (timeLeft) => {
            setCountDown(timeLeft);
            console.log(timeLeft < 300)
            if(timeLeft < 250) {

                setCountDownWarning(true);
            }
        });

        // Listen for the end of the call
        socket.on("endCall", (data) => {
            alert(data.message); // Show the message when the call ends
            setIsCallEnded(true); // Mark the call as ended
            setCountDown(null); // Clear the countdown
        });

        socket.on("error", (data) => {
            console.log("this is error : ",data)
            setCall_message(data?.message)
        });


        // Clean up the socket listener when the component unmounts
        return () => {
            socket.off("countdown");
            socket.off("endCall");
            // socket.emit("disconnect"); // Optionally disconnect when leaving the room
        };
    }, [roomID]);

    const handleDisconnect = () => {
        // Optionally, you can handle manual disconnection here if needed.
        socket.disconnect();
        localStorage.removeItem("userName");
        localStorage.removeItem("roomID");
        // navigate(-1);
        window.location.reload();
    };

    // Automatically disconnect and end call when the countdown reaches 0
    useEffect(() => {
        if (countDown === 0) {
            handleDisconnect(); // Disconnect the user
            setIsCallEnded(true); // Mark the call as ended
        }
    }, [countDown]);

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
                <p>put doctor card here </p>
                <p>
                    {countDown !== null && !isCallEnded ? (
                        <div>
                            <h5>Time Remaining:</h5>
                            <p style={{
                                color : countDownWarning ? 'red' : 'black',
                                fontWeight : 'bold'
                            }} >{formatTime(countDown).split('.')[0]}</p>
                        </div>
                    ) : isCallEnded ? (
                        <div>
                            <h3>The call has ended.</h3>
                        </div>
                    ) : (
                        <p>{call_message}</p>
                    )}

                    {/* Optionally, you can manually disconnect */}
                    {/* {!isCallEnded && (
                        <div>
                            <button onClick={handleDisconnect}>Disconnect</button>
                            <CustomButton isTransaprent={true} handleClick={handleLeaveChat} label="End Chat" />
                        </div>
                    )} */}
                </p>
                {/* Put here doctor card */}

                {!isCallEnded && (
                            <CustomButton isTransaprent={true} handleClick={handleLeaveChat} label="End Chat" />

                    )}
                {/* <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button> */}
            </header>

            <div className="message__container">
                {messages.map((message) =>
                    message.name === localStorage.getItem("userName") ? (
                        <div className="message__chats" key={message.id}>
                            {/* <p className='sender__name'>You</p> */}
                            <div className="message__sender">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
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
