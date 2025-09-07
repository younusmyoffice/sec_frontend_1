import React, { useEffect, useState } from "react";
import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { PaginationCard } from "../../../Dashboard/PatientAppointment/PatientCards";
import { DoctorBookingCard } from "./DoctorBookingCard";
import CustomButton from "../../../components/CustomButton";
import axios from "axios";
import { baseURL } from "../../../constants/const";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData(
        <DoctorBookingCard name={"Jolie"} patientId={"0001"} Id={"001"} />,
        <CustomButton label="Complete" isTransaprent />,
        <Typography
            sx={{
                color: "#939094",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.625rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            01-02-2023 10:30 AM
        </Typography>,
        <Typography
            sx={{
                color: "#939094",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.625rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            30min | Messaging pack
        </Typography>,
        <h5 style={{ color: "red" }}>₹12</h5>,
    ),
    createData(
        <DoctorBookingCard name={"Jolie"} patientId={"0001"} Id={"002"} />,
        <CustomButton label="Cancelled" isTransaprent />,
        <Typography
            sx={{
                color: "#939094",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.625rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            01-02-2023 10:30 AM
        </Typography>,
        <Typography
            sx={{
                color: "#939094",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.625rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            30min | Video call pack
        </Typography>,
        <h5 style={{ color: "red" }}>$20</h5>,
    ),
];
const DoctorBookingHistory = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "statistics");
        localStorage.setItem("path", "doctorBookingHistory");
    }, []);

    const [data, setData] = useState([]);

    useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
        fetchData();
    }, []);

    // const [bookinghisotryData , setBookingHistoryData] = useState();

    const fetchData = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/doctor/DocAppointmentHistoryId/9`);
            setData(response?.data?.response);
            console.log("Booking history data :", response.data.response);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
            <DoctorStatisticsNavbar />
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
                    <div className="">
                        <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name & Details</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Date & Time</TableCell>
                                        <TableCell align="right">Package</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((data) => (
                                        <TableRow
                                            key={"1"}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <DoctorBookingCard
                                                    name={data?.first_name}
                                                    patientId={data?.patient_id}
                                                    Id={data?.appointment_id}
                                                />
                                            </TableCell>
                                            <TableCell align="right">{data?.status}</TableCell>
                                            <TableCell align="right">{data?.start_date}</TableCell>
                                            <TableCell align="right">{data?.plan_name}</TableCell>
                                            <TableCell align="right">{data?.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ marginTop: "300px" }}>
                            <PaginationCard />
                        </div>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default DoctorBookingHistory;
