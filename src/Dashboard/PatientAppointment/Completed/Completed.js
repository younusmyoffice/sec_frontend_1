import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DrImage from "../../../constants/DrImages/image3.png";
import { AppointmentNavbar, CompletedCard, PaginationCard } from "../PatientCards";
import axios from "axios";
import { baseURL } from "../../../constants/const";

const Completed = () => {
    const [completedData, setCompletedData] = useState([]);

    const fetchDataNew = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                `${baseURL}/sec/patient/Appointmentbystatusid/completed/7`,
            );
            console.log("Fetch COmpleted : ", response?.data?.response);
            setCompletedData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // fetchData();
        localStorage.setItem("activeComponent", "appointment");
        localStorage.setItem("path", "completed");
        fetchDataNew();
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", width: "95%", height: "95vh" }}>
                <AppointmentNavbar />
                <Box
                    component={"div"}
                    // sx={{ position: "relative", top: "2em", width: "100%", display: "flex" }}
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
                                    borderRadius: "8px",
                                    padding: "2%",
                                    marginLeft: "2%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                {completedData.length === 0 ? (
                                    <h2>Loading......</h2>
                                ) : (
                                    completedData.map((data) => (
                                        <CompletedCard data={data} DrImage={DrImage} />
                                    ))
                                )}
                                {/* <CompletedCard DrImage={DrImage} />
                             <CompletedCard DrImage={DrImage}/>
                             <CompletedCard DrImage={DrImage} /> */}
                                <PaginationCard />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Completed;
