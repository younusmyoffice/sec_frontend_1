import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./MyActivity.scss";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";
import DrImage from "../../static/images/DrImages/drProfileImage.png";
import axiosInstance from "../../config/axiosInstance";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoAppointmentCard from "../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { getProfileImageSrc } from "../../utils/imageUtils";

// Import statements remain unchanged

const MyActivity = () => {
    console.log("My Activity");
    const navigate = useNavigate();
    const [myactivity, setMyactivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [showAllActivities, setShowAllActivities] = useState(false); // State to toggle view

    const fetchDataNew = async () => {
        console.log("Entered the fetch data");
        try {
            const response = await axiosInstance(
                `/sec/patient/patientActivity/${localStorage.getItem("patient_suid")}`,
            );
            console.log("Fetch the My Activity:", response.data.response);
            setAppointmentDate(response?.data?.response?.appointment_date);
            setMyactivity(response?.data?.response);
        } catch (error) {
            console.log("Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataNew();
        navigate("/patientdashboard/dashboard/myactivity/received");
    }, []);

    // Determine which activities to show based on state
    const displayedActivities = showAllActivities ? myactivity : myactivity.slice(0, 2);

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
                            alignItems: "center",
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
                            label={showAllActivities ? "Show Less" : "View All"}
                            handleClick={() => {
                                setShowAllActivities(!showAllActivities); // Toggle state
                            }}
                        />
                    </Box>

                    {isLoading ? (
                        <Skeleton count={1} height={200} style={{ marginTop: "10px" }} />
                    ) : displayedActivities.length === 0 ? (
                        <NoAppointmentCard text_one={"No activity recorded"} />
                    ) : (
                        displayedActivities.map((cardactivity) => (
                            <Box
                                key={cardactivity?.appointment_id}
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
                                        src={getProfileImageSrc(cardactivity?.profile_picture, DrImage)}
                                    />
                                </Box>

                                {/* Card content */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        padding: "2%",
                                    }}
                                >
                                    <Typography>{`${cardactivity?.first_name} ${cardactivity?.middle_name} ${cardactivity?.last_name}`}</Typography>
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
                                            {cardactivity?.plan_name}
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
                                        />
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
                                        {cardactivity?.appointment_date
                                            ? `${cardactivity?.appointment_date.split("T")[0]} | ${
                                                  cardactivity?.appointment_date
                                                      .split("T")[1]
                                                      ?.split(".")[0]
                                              }`
                                            : "No date found"}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    )}
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
                            alignItems: "center",
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
                            handleClick={() => {
                                console.log("Appointment Navigate");
                                navigate(`/patientdashboard/manage/reports/received`);
                            }}
                        />
                    </Box>

                    <Box className={"NavBar-Box"} sx={{ width: "50%", margin: 0 }}>
                        <NavLink to={"received"}>Received</NavLink>
                        <NavLink to={"shared"}>Shared</NavLink>
                    </Box>

                    <Box sx={{ width: "100%", padding: "1%", margin: "1%" }}>
                        {isLoading ? (
                            <Skeleton count={3} height={150} style={{ marginTop: "10px" }} />
                        ) : (
                            <Outlet />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MyActivity;
