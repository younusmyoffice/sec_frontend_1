/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

// import SingleLineGridList from "./Crousal";
import "./MyActivity.scss";
import { NavLink, Outlet } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";
import DrImage from "../../constants/DrImages/drProfileImage.png";
import axios from "axios";

const MyActivity = () => {
    console.log("My Activity")
    const [myactivity , setMyactivity] = useState([]);

    const fetchDataNew = async () => {
        console.log("Entered the fetch data ")
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                `http://localhost:3000/sec/patient/patientActivity/7`,
            );
            console.log("Fetch the My Activity : " ,response.data.response);
            setMyactivity(response?.data?.response);
        } catch (error) {
            console.log("Error",error);
        }
    };

    
    useEffect(() => {
        // fetchData();
        fetchDataNew();
    }, []);

    return (
        <Box sx={{ width: "98%", display: "flex", flexDirection: "column" }}>
            <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                <NavLink to={"/patientdashboard/dashboard/explore"}>Explore</NavLink>
                <NavLink to={"/patientdashboard/dashboard/myactivity"}>My Activity</NavLink>
            </Box>
            {/* 1st container */}
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        width: "100%",
                        border: "1px solid #E6E1E5",
                        borderRadius: "8px",
                        padding: "2%",
                        margin: "1%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItem: "center",
                            width: "100%",
                        }}
                    >
                        <Typography>Appointment</Typography>
                        <CustomButton
                            buttonCss={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "22px",
                                borderRadius: "50px",
                            }}
                            label="View all"
                        ></CustomButton>
                    </Box>
                {
                    myactivity.map( (cardactivity) => (
                        <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            borderBottom: "1px solid #E6E1E5",
                            marginTop: "3%",
                        }}
                    >
                        {/* Image tag */}
                        <Box
                            sx={{
                                width: "143px",
                                height: "143px",
                                padding: "1%",
                                borderRadius: "8px",
                            }}
                        >
                            <Box
                                sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                                component={"img"}
                                src={DrImage}
                            ></Box>
                        </Box>

                        {/* card content */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                padding: "2%",
                            }}
                        >
                            <Typography>{cardactivity?.minor_name}</Typography>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "5%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#313033",
                                        fontFamily: "Poppins",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0.096px",
                                    }}
                                >
                                    Messaging
                                </Typography>
                                <CustomButton
                                    buttonCss={{
                                        marginLeft: "10%",
                                        borderRadius: "50px",
                                        fontFamily: "Poppins",
                                        fontSize: "14px",
                                        height: "32px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "22px",
                                    }}
                                    isTransaprent={true}
                                    label={`${cardactivity?.status}`}
                                ></CustomButton>
                            </Box>
                            <Typography
                                sx={{
                                    color: "#313033",
                                    fontFamily: "Poppins",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "18px",
                                    letterSpacing: "0.096px",
                                    marginTop: "15%",
                                }}
                            >
                                Today | 10:00 AM | Attached Reports:01
                            </Typography>
                        </Box>
                    </Box>
                     ) )
                }
                    

                </Box>
            </Box>

            {/* 2nd container */}

            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        width: "100%",
                        border: "1px solid #E6E1E5",
                        borderRadius: "8px",
                        padding: "2%",
                        margin: "1%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItem: "center",
                            width: "100%",
                            paddingLeft: "1%",
                        }}
                    >
                        <Typography>Reports</Typography>
                        <CustomButton
                            buttonCss={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "22px",
                                borderRadius: "50px",
                            }}
                            label="View all"
                        ></CustomButton>
                    </Box>
                    {/* Navbar box */}
                    <Box className={"NavBar-Box"} sx={{ width: "50%", margin: 0 }}>
                        <NavLink to={"received"}>Received</NavLink>
                        <NavLink to={"shared"}>Shared</NavLink>
                    </Box>

                    <Box sx={{ width: "100%", padding: "1%", margin: "1%" }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MyActivity;
