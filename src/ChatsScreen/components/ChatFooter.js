import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton/custom-button';
import SendIcon from '@mui/icons-material/Send';

const ChatFooter = ({ socket, roomID }) => {
  const [message, setMessage] = useState("");
  const userName = localStorage.getItem("userName") || `Patient_${Date.now()}`;
  
  const handleTyping = () =>
    socket.emit("typing", {
      roomID,
      roomId: roomID, // some socket servers expect lower camelCase
      data: `${userName} is typing`,
    });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && userName) {
      console.log("🔌 Socket status:", {
        socketExists: !!socket,
        socketConnected: socket?.connected,
        socketId: socket?.id,
        roomID: roomID
      });
      
      const messagePayload = {
        text: message,
        name: userName,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      };

      const messageData = {
        roomID,
        roomId: roomID, // fallback for older socket servers using roomId
        data: messagePayload,
        message: messagePayload, // fallback for servers that emit `message`
      };
      console.log("📤 Sending message:", messageData);
      socket.emit("message", messageData);
    }
    setMessage("");
  };

  return (
    <div className='chat__footer'>
      <form className='form' onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder='Write message'
          className='message'
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <CustomButton
          handleClick={handleSendMessage}
          // className="sendBtn" 
          label='' 
          leftIcon={<SendIcon/>}
          />
        {/* <button className="sendBtn">SEND</button> */}
      </form>
    </div>
  );
};

export default ChatFooter;





















// import React, {useState} from 'react'

// const ChatFooter = ({socket}) => {
//     const [message, setMessage] = useState("")
//     const handleTyping = () => socket.emit("typing",`${localStorage.getItem("userName")} is typing`)

//     const handleSendMessage = (e) => {
//         e.preventDefault()
//         if(message.trim() && localStorage.getItem("userName")) {
//         socket.emit("message",
//             {
//             text: message,
//             name: localStorage.getItem("userName"),
//             id: `${socket.id}${Math.random()}`,
//             socketID: socket.id
//             }
//         )
//         }
//         setMessage("")
//     }
//   return (
//     <div className='chat__footer'>
//         <form className='form' onSubmit={handleSendMessage}>
//           <input
//             type="text"
//             placeholder='Write message'
//             className='message'
//             value={message}
//             onChange={e => setMessage(e.target.value)}
//             onKeyDown={handleTyping}
//             />
//             <button className="sendBtn">SEND</button>
//         </form>
//      </div>
//   )
// }

// export default ChatFooter
