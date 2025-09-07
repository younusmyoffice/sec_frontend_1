/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "@mui/material";
import { data, CallCardData } from "../../constants/const";
import Drcard from "../../constants/drcard/drcard";
import CustomButton from "../../components/CustomButton/custom-button";
import SingleLineGridList from "./Crousal";
import "./Explore.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
import { baseURL } from "../../constants/const";

const Explore = () => {
    const [cardData, setCardData] = useState([]);
    const [hcfData, setHCFData] = useState([]);
    const [cardData2, setCardData2] = useState([]);

    // const fetchData = async () => {
    //     try {
    //         // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
    //         const response = await axios.get(
    //             "http://localhost:3000/sec/getDoctordetailscompleteall",
    //         );
    //         // console.log(response?.data?.response);
    //         setCardData(response?.data?.response);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // };

    const fetchDataNew = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/patient/DashboardDoctordetail`);
            console.log("Fetch the response : ", response?.data?.response);
            setCardData(response?.data?.response);
        } catch (error) {
            console.log(error.response);
        }
    };

    
    useEffect(() => {
        // fetchData();
        fetchDataNew();
        fetchDataHCFCards();
    }, []);

    if (!cardData) return null;

    return cardData?.length === 0 ? (
        <h1>Wait......</h1>
    ) : (
        <Box sx={{ width: "100%" }}>
            <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                <NavLink to={"/patientdashboard/dashboard/explore"}>Explore</NavLink>
                <NavLink to={"/patientdashboard/dashboard/myactivity"}>My Activity</NavLink>
            </Box>
            <Box sx={{ width: "100%" }}>
                {/* Horozontal slider starts */}
                <Box sx={{ width: "100%", height: "fit-content", overflow: "hidden" }}>
                    <SingleLineGridList />
                </Box>
                {/* Popular Field starts */}
                <CallCardData
                    linkPath={`/patientdashboard/drdetailscard/`}
                    sendCardData={cardData}
                    CardData={data}
                    textField={"Popular"}
                />
                {/* Featured Fields starts */}
                <CallCardData
                    linkPath={`/patientdashboard/drdetailscard/`}
                    sendCardData={cardData}
                    CardData={data}
                    textField={"Featured"}
                />
                {/* Category component starts */}
                <Box>
                    <Box
                        sx={{ display: "flex" }}
                        className={"horizontal-scroll-container NavBar-Container-one"}
                    >
                        {/* <CustomButton label="All"></CustomButton> */}
                        <div>
                            <NavLink to={"/patientdashboard/explore"}>All</NavLink>
                            <NavLink to={"/dentist"}>Dentist</NavLink>
                            <NavLink to={"/neurologist"}>Neurologist</NavLink>
                            <NavLink to={"/orthopaedics"}>Orthopaedics</NavLink>
                            <NavLink to={"/nutritionist"}>Nutritionist</NavLink>
                            <NavLink to={"/pediatric"}>Pediatric</NavLink>
                            <NavLink to={"/more"}>More...</NavLink>
                        </div>
                    </Box>
                    <CallCardData
                        linkPath={`/patientdashboard/drdetailscard/`}
                        sendCardData={cardData}
                        CardData={data}
                        textField={""}
                    />
                </Box>
                {/* Near you component starts */}
                <CallCardData
                    linkPath={`/patientdashboard/drdetailscard/`}
                    sendCardData={cardData}
                    CardData={data}
                    textField={"Near You"}
                />
                {/* Near you component ends */}

                {/* Hcf Cards component starts */}
                <CallCardData
                    linkPath={`/patientdashboard/drdetailscard/`}
                    sendCardData={cardData}
                    CardData={data}
                    textField={"HCF Card Component"}
                />
                {/* hcf card component ends */}
            </Box>
        </Box>
    );
};

export default Explore;
