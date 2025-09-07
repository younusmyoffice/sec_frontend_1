import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import CardRequest from "../../../../components/Card/CustomRequestAppointment/CardRequest";
import { baseURL } from "../../../../constants/const";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    requestcontainer: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
        },
    },
}));

const ClinicAppointmentRequest = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "myappointment");
        localStorage.setItem("path", "clinicrequest");
    }, []);
    const [data1, setData1] = useState([]);

    const fetchData1 = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                `${baseURL}/sec/hcf/ClinicAppointmentbystatusId/in_progress/24/26 `,
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
            <div
                className="requestcontainer"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "98%",
                    height: "100%",
                    height: "90%",
                }}
            >
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
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            border: "1px solid #E6E1E5",
                            padding: "1rem",
                        }}
                    >
                        {data1.map((el, index) => (
                            <CardRequest
                                label={"Accept"}
                                key={el.suid + "" + index}
                                profile_picture={el.profile_picture}
                                name={`${el.name}`}
                                appointment_date={`${el.appointment_date}`}
                                options={`${el.options}`}
                            />
                        ))}
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default ClinicAppointmentRequest;
