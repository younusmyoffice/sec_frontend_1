import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import CustomNotificationCard from "../../../../DoctorModule/CustomDoctorComponent/Cards/CardNotification/CardNotification";
import DoctorAppointmentCard from "../../../../DoctorModule/CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";

const HCFAdminNotifications = () => {
    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }} >
              
                <Box
                    component={"div"}
                    sx={{ position: "relative", top: "2em", width: "100%", display: "flex", height: "100%" }}
                >
                    <Box sx={{ width: "100%", height: "100%" }} >
                        <div className="" >
                            <div style={{display:"flex",marginLeft:"10px"}}>
                            <DoctorAppointmentCard/>
                            <DoctorAppointmentCard/>
                            </div>
                        </div>
                        <div>
                        <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/notification"}>Notifications</NavLink>
                       </nav>
                        </div>
                        <div>
                            <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid #E6E1E5", borderRadius: "0.5rem", padding: "2%", height: "60vh",marginTop:"70px"}} >
                                <CustomNotificationCard Schedule={"Reminder"} />
                                <CustomNotificationCard Schedule={"Message"} />
                          
                                </Box>
                            </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HCFAdminNotifications;