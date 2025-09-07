import { Box } from "@mui/material";
import React from "react";
import DoctorAppointmentCard from "../../../../DoctorModule/CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import { NavLink } from "react-router-dom";
import CustomRequestCard from "../../../../DoctorModule/CustomDoctorComponent/Cards/CustomRequestCard/CardRequest";
import CustomButton from "../../../../components/CustomButton/custom-button";
import "./clinicrequest.scss";

const ClinicRequests = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "dashboard");
        localStorage.setItem("path", "clinirequests");
    }, []);
    return (
        <>
            <Box sx={{ position: "relative", width: "100%" }}>
                <div className="Appointment-card1">
                    <DoctorAppointmentCard />
                    <DoctorAppointmentCard />
                    <DoctorAppointmentCard />
                </div>
                <Box
                    sx={{
                        display: "flex",
                        width: "98%",
                        height: "100%",
                        height: "90%",
                        marginTop: "1rem",
                    }}
                >
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
                        sx={{
                            position: "relative",
                            top: "4em",
                            width: "100%",
                            display: "flex",
                            height: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                border: "1px solid #E6E1E5",
                                borderRadius: "8px",
                                padding: "1rem",
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                {/* <h1>Request</h1> */}
                                <CustomRequestCard />
                                <CustomRequestCard />
                            </Box>
                            <Box
                                sx={{
                                    //    border:'1px solid',
                                    width: "100%",
                                    marginTop: "8rem",
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

export default ClinicRequests;
