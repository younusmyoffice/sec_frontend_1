/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./doctorUpcoming.scss";
import DoctorAppointmentNavbar from "../../CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import CustomUpcomingCard from "../../CustomDoctorComponent/Cards/CustomUpcomingCard/CustomUpcomingCard";
import axios from "axios";
import axiosInstance from "../../../config/axiosInstance";

// import CustomUpcomingCard from "../../CustomDoctorComponent/CustomUpcomingCard/CustomUpcomingCard";

const DoctorUpcoming = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "upcoming");
    }, []);

    const [upcomingData, setUpcomingData] = useState([]);

    const fetchData = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                "http://localhost:3000/sec/doctor/AppointmentbystatusId/booked/9",
            );
            setUpcomingData(response?.data?.response);
            console.log("Doctor upcoming  : ", response?.data?.response);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
        fetchData();
    }, []);

    //  upcomingData?.length === 0 ?( <h1>wait........</h1>) :

    return (
        <>
            <Box sx={{ display: "flex", width: "95%", height: "100%", height: "100%" }}>
                <DoctorAppointmentNavbar />
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
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    border: "1px solid #E6E1E5",
                                    height: "92%",
                                    borderRadius: "8px",
                                    padding: "2%",
                                    marginLeft: "2%",
                                }}
                            >
                                {upcomingData.length === 0 ? (
                                    <h2>You Have no upcoming appointment......</h2>
                                ) : (
                                    upcomingData.map((data) => (
                                        <CustomUpcomingCard
                                            data={data}
                                            Joinlabel={"Join"}
                                            StatusLabel={"Messagin"}
                                        />
                                    ))
                                )}
                                {/* <CustomUpcomingCard Joinlabel={"Join"} StatusLabel={"Messagin"} />
                                <CustomUpcomingCard Joinlabel={"Join"} StatusLabel={"Voice Call"} /> */}
                                {/* <UpcomingCard DrImage={DrImage} label={"UpComing"}/> */}
                                {/* <UpcomingCard DrImage={DrImage} label={"UpComing"} isDisabled={true} /> */}
                                {/* <UpcomingCard DrImage={DrImage} label={"Request Pending"} isDisabled={true} /> */}
                                {/* <PaginationCard/> */}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DoctorUpcoming;
