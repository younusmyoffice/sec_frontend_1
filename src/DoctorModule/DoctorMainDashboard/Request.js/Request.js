import React, { useEffect, useState } from "react";
import DoctorAppointmentCard from "../../CustomDoctorComponent/CustomDoctorAppointment/DoctorAppointment";
import "./Request.scss";
import { Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
// import CustomRequestCard from "../../CustomDoctorComponent/CustomRequestCard/CardRequest";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomRequestCard from "../../CustomDoctorComponent/Cards/CustomRequestCard/CardRequest";
import axios from "axios";
import { baseURL } from "../../../constants/const";
const Request = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "dashboard");
        localStorage.setItem("path", "request");
    }, []);
    const [requestData, setRequestData] = useState([]);
    const [upcomingData, setupcomingData] = useState([]);
    const [completedData, setCompletedData] = useState([]);
    useEffect(() => {
        console.log("Dahsboard Doctor");
        document.getElementById("location-search-container").style.display = "flex";
        // fetchDataNew();
        fetchrequest();
        fetchUpcoming();
        fetchCompleted();
        return () => {
            console.log("Remove the event listner ");
        };
    }, []);

    const fetchrequest = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/Doctor/DocDashoardApp/in_progress/9`);
            console.log("request data from backend : ", response?.data?.response);
            setRequestData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUpcoming = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/Doctor/DocDashoardApp/booked/9`);
            console.log("upcoming data from backend : ", response?.data?.response);
            setupcomingData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCompleted = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/Doctor/DocDashoardApp/completed/9`);
            console.log("completed data from backend : ", response?.data?.response);
            setCompletedData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();
    // useEffect(() => {
    //     // fetchData();
    //     fetchrequest();
    //     fetchUpcoming();
    //     fetchCompleted();
    // }, []);

    return (
        <>
            <Box sx={{ width: "100%", height: "100%" }}>
                <div className="Appointment-card">
                    <DoctorAppointmentCard
                        NumberOfAppointments={requestData?.length}
                        AppointmentType={"Appointment Request"}
                    />
                    <DoctorAppointmentCard
                        NumberOfAppointments={upcomingData?.length}
                        AppointmentType={"Upcoming Appointments"}
                    />
                    <DoctorAppointmentCard
                        NumberOfAppointments={completedData?.length}
                        AppointmentType={"Completed"}
                    />
                </div>

                <Box className="DocNavBar-Container">
                    <NavLink to={"/doctordashboard/request"}>Requests</NavLink>
                    <NavLink to={"/doctordashboard/notification"}>Notifications</NavLink>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #E6E1E5",
                        borderRadius: "0.5rem",
                        padding: "2%",
                        height: "55vh",
                    }}
                >
                    <Box sx={{ width: "100%" }}>
                        {/* <h1>Request</h1> */}
                        {requestData.length === 0 ? (
                            <h2>Loading......</h2>
                        ) : (
                            requestData.map((data, index) => {
                                {
                                    console.log("This is the index value : ", index);
                                }
                                if (index === 4) {
                                    return;
                                } else {
                                    return <CustomRequestCard label={"Accept"} data={data} />;
                                }
                            })
                        )}
                    </Box>
                    <Box
                        sx={{
                            position: "sticky",
                            top: "100%",
                        }}
                    >
                        <CustomButton
                            handleClick={() =>
                                navigate("/doctordashboard/doctorAppointment/request")
                            }
                            isTransaprent={true}
                            label="View all"
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Request;
