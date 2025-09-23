import React, { useEffect, useState } from "react";
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
    TablePagination,
    Skeleton,
} from "@mui/material";
import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
import { PaginationCard } from "../../../PatientDashboard/PatientAppointment/PatientCards";
import { DoctorBookingCard } from "./DoctorBookingCard";
import CustomButton from "../../../components/CustomButton";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { currencysign, formatOnlyDate } from "../../../constants/const";

const DoctorBookingHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        localStorage.setItem("activeComponent", "statistics");
        localStorage.setItem("path", "doctorBookingHistory");
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/sec/doctor/DocAppointmentHistoryId",
                JSON.stringify({
                    doctor_id: localStorage.getItem("doctor_suid"),
                }),
            );
            setData(response?.data?.response || []);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                    <div>
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
                                    {loading ? (
                                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton
                                                        variant="rectangular"
                                                        width="100%"
                                                        height={30}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Skeleton variant="text" width={80} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Skeleton variant="text" width={100} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Skeleton variant="text" width={120} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Skeleton variant="text" width={60} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
                                                <NoAppointmentCard text_one={"No Data Found"} />{" "}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        displayedData.map((row) => (
                                            <TableRow key={row.appointment_id}>
                                                <TableCell component="th" scope="row">
                                                    <DoctorBookingCard
                                                        name={row.name}
                                                        patientId={row.patient_id}
                                                        Id={row.appointment_id}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">{row.status}</TableCell>
                                                <TableCell align="right">
                                                    {`${row.appointment_date
                                                        ? formatOnlyDate(row.appointment_date)
                                                        : "N/A"} | ${row.appointment_time}`}
                                                </TableCell>

                                                <TableCell align="right">{`${row.plan_name} | ${row.plan_duration}`}</TableCell>
                                                <TableCell align="right" sx={{ color: "#E72B4A" }}>
                                                    {`${currencysign}${row?.amount || "NA"}`}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={data.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default DoctorBookingHistory;
