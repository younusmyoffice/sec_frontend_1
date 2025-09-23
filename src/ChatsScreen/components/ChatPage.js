import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "./chat.scss";

const ChatPage = ({ socket }) => {
  const { roomID, appointment_id, user, savedUserName } = useParams();
  // const { roomID, userName } = state;
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [userName, setUserName] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Get userName from localStorage or use a default
    const derivedName = localStorage.getItem("userName") || `Patient_${Date.now()}`;
    setUserName(derivedName);
    // Persist to localStorage so other components (comparisons, disconnect) see it
    localStorage.setItem("userName", derivedName);
    
    // Listen for message and typing events
    socket.on("messageResponse", data => setMessages(prevMessages => [...prevMessages, data]));
    socket.on("typingResponse", data => setTypingStatus(data));

    // Listen for previous messages when the user rejoins the room
    socket.on("previousMessages", data => {
      setMessages(data);
    });

    // Join room with userName and roomID
    if (derivedName && roomID && socket) {
      console.log("Joining room:", { userID: derivedName, roomID, appointment_id });
      socket.emit("joinRoom", { userID: derivedName, roomID, appointment_id });
    }

    return () => {
      // Clean up listeners on component unmount
      socket.off("messageResponse");
      socket.off("typingResponse");
      socket.off("previousMessages");
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} roomID={roomID} savedUserName={userName} />
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} roomID={roomID} socket={socket} />
        <ChatFooter socket={socket} roomID={roomID} />
      </div>
    </div>
  );
};

export default ChatPage;



















// import React, { useEffect, useState, useRef} from 'react'
// import ChatBar from './ChatBar'
// import ChatBody from './ChatBody'
// import ChatFooter from './ChatFooter'

// const ChatPage = ({socket}) => {
//   const [messages, setMessages] = useState([])
//   const [typingStatus, setTypingStatus] = useState("")
//   const lastMessageRef = useRef(null);

//   useEffect(()=> {
//     socket.on("messageResponse", data => setMessages([...messages, data]))
//   }, [socket, messages])

//   useEffect(()=> {
//     socket.on("typingResponse", data => setTypingStatus(data))
//   }, [socket])

//   useEffect(() => {
//     // 👇️ scroll to bottom every time messages change
//     lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
//   }, [messages]);

//   return (
//     <div className="chat">
//       <ChatBar socket={socket}/>
//       <div className='chat__main'>
//         <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
//         <ChatFooter socket={socket}/>
//       </div>
//     </div>
//   )
// }

// export default ChatPage
