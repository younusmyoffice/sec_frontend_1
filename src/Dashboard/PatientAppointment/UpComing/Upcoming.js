import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../NavBar-Appointment.scss";
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
// import { Typography } from "@mui/material";
// import React from "react";
// import CustomButton from "../../components/CustomButton/custom-button";
// import SingleLineGridList from "./Crousal";
import "./upcoming.scss";
import DrImage from "../../../constants/DrImages/image3.png";
import { AppointmentNavbar, PaginationCard, UpcomingCard } from "../PatientCards";
import axios from "axios";
import { baseURL } from "../../../constants/const";

const Upcoming = () => {

    const [upcomingdata , setUpcomingData] = useState([]);

    const fetchDataNew = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                `${baseURL}/sec/patient/Appointmentbystatusid/in_progress/7`,
            );
            console.log("Fetch upcoming : " ,response?.data?.response);
            setUpcomingData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    
    useEffect(() => {
        // fetchData();
        localStorage.setItem('activeComponent' , 'appointment');
        localStorage.setItem('path' , 'upcoming');

        localStorage.getItem('path') === 'upcoming' ? localStorage.setItem('path' , 'upcoming')
        : localStorage.getItem('path') === 'completed' ? localStorage.setItem('path' , 'completed')
        : localStorage.getItem('path') === 'cancelled' ? localStorage.setItem('path' , 'cancelled')
        : localStorage.setItem('path' , 'upcoming')


        fetchDataNew();
    }, []);

    // if (!upcomingdata) return null;



    return  (
        <>
            <Box sx={{ display: "flex", width: "95%" , height : "95vh" }}>
                <AppointmentNavbar/>
                <Box
                    component={"div"}
                    sx={{ position: "relative", top: "4em", width: "100%", display: "flex" , height : "100%" }}
                >
                    <Box sx={{ width: "100%" , height : "100%" }}>
                        <Box sx={{ width: "100%", height : "100%" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    border: "1px solid #E6E1E5",
                                    borderRadius: "8px",
                                    padding: "2%",
                                    marginLeft: "2%",
                                    height : "90%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                {upcomingdata.length === 0 ? (<h2>Loading......</h2>) : 
                                    upcomingdata.map(data => (
                                        <UpcomingCard data={data} DrImage={DrImage} label={""}/>
                                    ))
                                 }
                                {/* <UpcomingCard DrImage={DrImage} label={"UpComing"}/>
                                <UpcomingCard DrImage={DrImage} label={"UpComing"} isDisabled={true} />
                                <UpcomingCard DrImage={DrImage} label={"Request Pending"} isDisabled={true} /> */}
                                <PaginationCard/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Upcoming;
