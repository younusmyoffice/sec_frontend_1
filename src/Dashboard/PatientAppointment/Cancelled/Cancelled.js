import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../NavBar-Appointment.scss";
// import CustomButton from "../../components/CustomButton/custom-button";
// import "./Cancelled.scss";
import Pagination from "@mui/material/Pagination";
import CustomButton from "../../../components/CustomButton/custom-button";
import DrImage from "../../../constants/DrImages/image3.png";
import { AppointmentNavbar, CancelledCard, PaginationCard } from "../PatientCards";
import axios from "axios";
import { baseURL } from "../../../constants/const";

const Cancelled = () => {


    const [cancelledData , setCancelledData] = useState([]);

    const fetchDataNew = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                `${baseURL}/sec/patient/Appointmentbystatusid/canceled/7`,
            );
            console.log("Fetch COmpleted : " ,response?.data?.response);
            setCancelledData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    
    useEffect(() => {
        // fetchData();
        localStorage.setItem('activeComponent' , 'appointment');

        localStorage.setItem('path' , 'cancelled');
        fetchDataNew();
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", width: "100%", height: "95vh" }}>
                <AppointmentNavbar />
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
                    <Box sx={{ width: "100%", height: "100%", }}>
                        <Box
                            sx={{
                                width: "100%",
                                border: "1px solid #E6E1E5",
                                // border: "2px solid red",
                                borderRadius: "8px",
                                // padding: "2%",
                                marginLeft: "3%",
                                height: "100%",
                                padding: "2%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* -------------------Card Starts--------------------- */}

                            {cancelledData.length === 0 ? (<h2>Loading......</h2>) : 
                                cancelledData.map(data => (
                                        <CancelledCard data={data}  DrImage={DrImage} />                                    ))
                                 }
                            {/* <Box>
                                <CancelledCard DrImage={DrImage} />
                            </Box> */}

                            {/* ----------pagination ----------- */}
                            {/* <Box> */}
                                <PaginationCard />
                            {/* </Box> */}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Cancelled;
