import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "./chat.scss";

const ChatPage = ({ socket }) => {
  const { roomID , appointment_id, savedUserName} = useParams();
  // const { roomID, userName } = state;
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Listen for message and typing events
    socket.on("messageResponse", data => setMessages(prevMessages => [...prevMessages, data]));
    socket.on("typingResponse", data => setTypingStatus(data));

    // Listen for previous messages when the user rejoins the room
    socket.on("previousMessages", data => {
      setMessages(data);
    });

    // Attempt to rejoin room if the user refreshes the page
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName && roomID) {
      socket.emit("joinRoom", { userID: savedUserName, roomID, appointment_id });
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
      <ChatBar socket={socket} roomID={roomID} savedUserName={savedUserName} />
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