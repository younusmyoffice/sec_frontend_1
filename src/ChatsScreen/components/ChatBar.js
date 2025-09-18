import React, { useState, useEffect } from 'react';

const ChatBar = ({ socket, roomID, savedUserName }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      setUsers(data.filter(user => user.roomID === roomID));
    });

    return () => {
      socket.off("newUserResponse");
    };
  }, [socket, roomID]);

  return (
    <div className='chat__sidebar'>
      <p>Active Users</p>
      <p>{savedUserName}</p>
      <div>
        {/* <h4 className='chat__header'>ACTIVE USERS</h4> */}
        <br/>
        <div className='chat__users'>
          {users.map(user => <p key={user.socketID}>{user.userID}</p>)}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;


























// import React, {useState, useEffect} from 'react'

// const ChatBar = ({socket}) => {
//     const [users, setUsers] = useState([])

//     useEffect(()=> {
//         socket.on("newUserResponse", data => setUsers(data))
//     }, [socket, users])

//   return (
//     <div className='chat__sidebar'>
//         <h2>Open Chat</h2>
//         <div>
//             <h4  className='chat__header'>ACTIVE USERS</h4>
//             <div className='chat__users'>
//                 {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
//             </div>
//         </div>
//   </div>
//   )
// }

// export default ChatBar