import { Box } from "@mui/material";
import React from "react";
import DoctorAppointmentCard from "../../../../DoctorModule/CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import { NavLink } from "react-router-dom";
import CardNotification from "../../../../components/Card/CustomNotificationCard/CardNotification";
import CustomButton from "../../../../components/CustomButton/custom-button";

const ClinicNotification = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "dashboard");
        localStorage.setItem("path", "clinicnotification");
    }, []);
    return (
        <>
             <Box sx={{width:'100%', height:'70vh'}}>
         <div className='Appointment-card'>
                    <DoctorAppointmentCard/>
                    {/* <DoctorAppointmentCard/> */}
                    {/* <DoctorAppointmentCard/> */}
                </div>
                <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
                    <nav className="NavBar-Container-Appoinement">
                        <NavLink to={"/clinicDashboard/clinicbodydashboard/clinirequests"}>
                            Requests
                        </NavLink>
                        <NavLink to={"/clinicDashboard/clinicbodydashboard/clinicnotification"}>
                            Notifications
                        </NavLink>
                    </nav>
                    <Box
                        component={"div"}
                        sx={{ position: "relative", top: "4em", width: "100%", display: "flex" }}
                    >
                        <Box sx={{ width: "100%", height: "100%", border: "1px solid #E6E1E5" }}>
                            <CardNotification Schedule={"Appointment Remainder"} />
                            <CardNotification Schedule={"Schedule Remainder"} />
                            <CardNotification Schedule={"Call Request"} />

                            <Box
                                sx={{
                                    width: "100%",
                                    //    border:'1px solid',
                                    marginTop: "2rem",
                                }}
                            >
                                <CustomButton isTransaprent={true} label="View all" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ClinicNotification;
