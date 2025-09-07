import { Box } from "@mui/material";
import React from "react";
import "./doctorChat.scss";
import img from "../../../constants/DrImages/image10.png"

const ChatNotification = () => {
    return (
        <>
                            <Box
                                sx={{
                                    width: "30%",
                                    border: "1px solid #E6E1E5",
                                    height : "92%" , 
                                    borderRadius: "8px",
                                    padding: "2%",
                                    textAlign:"start"
                                }}
                            >
                               <h1 style={{borderBottom:"1px solid #E6E1E5"}}>Chat</h1> 
                               <div style={{display:"flex",borderBottom:"1px solid #E6E1E5"}}>
                                <img src={img} style={{borderRadius:"10px",height:'50px'}}/>
                                <h4 style={{marginLeft:"10px"}}>John Doe</h4>
                                <p style={{background:"#e72b4a",borderRadius:"10px",color:"white",width:"20px",height:"20px",textAlign:"center",marginLeft:'100px'}}>1</p>
                               </div>
                            </Box>
        </>
    );
};

export default ChatNotification;
