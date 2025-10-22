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

  const normalizeMessage = (rawMessage) => {
    if (!rawMessage) return null;

    if (typeof rawMessage === "string") {
      try {
        const parsed = JSON.parse(rawMessage);
        return normalizeMessage(parsed);
      } catch (err) {
        console.warn("Unable to parse message string", rawMessage);
        return null;
      }
    }

    if (rawMessage.text && rawMessage.name) return rawMessage;

    if (rawMessage.data && rawMessage.data.text && rawMessage.data.name) {
      return rawMessage.data;
    }

    if (rawMessage.message && rawMessage.message.text && rawMessage.message.name) {
      return rawMessage.message;
    }

    if (rawMessage.chats_messages) {
      return normalizeMessage(rawMessage.chats_messages);
    }

    return null;
  };

  useEffect(() => {
    // Get userName from localStorage, URL params, or use a default
    const urlUserName = user; // Get user from URL params
    const storedUserName = localStorage.getItem("userName");
    const derivedName = storedUserName || urlUserName || `User_${Date.now()}`;
    
    setUserName(derivedName);
    // Persist to localStorage so other components (comparisons, disconnect) see it
    localStorage.setItem("userName", derivedName);
    
    console.log("🔍 ChatPage Debug:", {
      urlUserName,
      storedUserName,
      derivedName,
      roomID,
      appointment_id,
      user
    });
    
    // Listen for message and typing events
    socket.on("messageResponse", data => {
      console.log("📨 Received messageResponse:", data);
      const normalized = normalizeMessage(data);
      if (normalized) {
        setMessages(prevMessages => [...prevMessages, normalized]);
      } else {
        console.warn("Received message without recognizable shape", data);
      }
    });
    socket.on("typingResponse", data => {
      console.log("⌨️ Received typingResponse:", data);
      setTypingStatus(data);
    });

    // Listen for previous messages when the user rejoins the room
    socket.on("previousMessages", data => {
      const normalizedMessages = Array.isArray(data)
        ? data
            .map((item) => {
              if (item && typeof item === "object" && item.chats_messages) {
                return normalizeMessage(item.chats_messages);
              }
              return normalizeMessage(item);
            })
            .filter(Boolean)
        : [];
      setMessages(normalizedMessages);
    });

    // Join room with userName and roomID
    if (derivedName && roomID && socket) {
      console.log("🔌 Socket connected:", socket.connected);
      console.log("🔌 Socket ID:", socket.id);
      console.log("🚪 Joining room:", { userID: derivedName, roomID, appointment_id });
      socket.emit("joinRoom", { userID: derivedName, roomID, appointment_id });
    } else {
      console.log("❌ Cannot join room - missing data:", {
        derivedName: !!derivedName,
        roomID: !!roomID,
        socket: !!socket,
        socketConnected: socket?.connected
      });
    }

    return () => {
      // Clean up listeners on component unmount
      socket.off("messageResponse");
      socket.off("typingResponse");
      socket.off("previousMessages");
    };
  }, [socket, roomID, appointment_id, user]);

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
