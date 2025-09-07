/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./DoctorRequest.scss";
import DoctorAppointmentNavbar from "../../CustomDoctorComponent/DoctorAppointmentNavbar/DoctorAppointmentNavbar";
import CustomRequestCard from "../../CustomDoctorComponent/Cards/CustomRequestCard/CardRequest";
import axios from "axios";
import { baseURL } from "../../../constants/const";
// import CustomRequestCard from "../../CustomDoctorComponent/CustomRequestCard/CardRequest";

const DoctorRequest = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "request");
    }, []);
    const [doctorRequest, setDoctorRequest] = useState([]);

    const fetchDataNew = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                `${baseURL}/sec/doctor/AppointmentbystatusId/in_progress/9`,
            );
            console.log("request data from backend : ", response?.data?.response);
            setDoctorRequest(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // fetchData();
        fetchDataNew();
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
                                {doctorRequest.length === 0 ? (
                                    <h2>Loading......</h2>
                                ) : (
                                    doctorRequest.map((data) => (
                                        <CustomRequestCard label={"Accept"} data={data} />
                                    ))
                                )}

                                {/* <CustomRequestCard label={"Accept"}/>
                                <CustomRequestCard label={"Accept"}/> */}
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

export default DoctorRequest;
