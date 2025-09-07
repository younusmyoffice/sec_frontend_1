/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./doctorCancelled.scss";
import DoctorAppointmentNavbar from "../../CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import CustomRequestCard from "../../CustomDoctorComponent/Cards/CustomRequestCard/CardRequest";
import axios from "axios";
// import CustomRequestCard from "../../CustomDoctorComponent/CustomRequestCard/CardRequest";

const DoctorCancelled = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "cancelled");
    }, []);

    const [completedData, setCompletedData] = useState([]);

    const fetchData = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                "http://localhost:3000/sec/doctor/AppointmentbystatusId/canceled/9",
            );
            setCompletedData(response?.data?.response);
            console.log("Doctor completed  : ", response?.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                        <Box sx={{ width: "100%", height: "100%", height: "100%" }}>
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
                                {completedData.map((completeData) => {
                                    return <CustomRequestCard data={completeData} />;
                                })}

                                {/* <CustomRequestCard/>
                                <CustomRequestCard/>
                                <CustomRequestCard/> */}
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

export default DoctorCancelled;
