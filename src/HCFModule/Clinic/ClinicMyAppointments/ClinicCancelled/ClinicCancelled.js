import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CompletedCard from "../../../../components/Card/CustomCompletedcard/CompletedCard";
import { baseURL } from "../../../../constants/const";
import axios from "axios";

const ClinicCancelled = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "myappointment");
        localStorage.setItem("path", "cliniccancelled");
    }, []);
    const [data1, setData1] = useState([]);

    const fetchData1 = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                `${baseURL}/sec/hcf/ClinicAppointmentbystatusId/cancelled/24/26 `,
            );
            setData1(response?.data?.response);
            console.log("sales activities data :", response.data.response);
        } catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        // document.getElementById("location-search-container").style.display = "none";
        fetchData1();
    }, []);
    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/clinicDashboard/clinicmyappointment/clinicrequest"}>
                        Requests
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmyappointment/clinicupcoming"}>
                        Upcoming
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmyappointment/cliniccompleted"}>
                        Completed
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmyappointment/cliniccancelled"}>
                        Cancelled
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmyappointment/clinicchats"}>Chats</NavLink>
                </nav>
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
                    <Box sx={{ width: "100%", height: "100%", border: "1px solid #E6E1E5" }}>
                        {data1.map((el, index) => (
                            <CompletedCard
                                key={el.suid + "" + index}
                                profile_picture={el.profile_picture}
                                name={`${el.name}`}
                                appointment_date={`${el.appointment_date}`}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ClinicCancelled;
