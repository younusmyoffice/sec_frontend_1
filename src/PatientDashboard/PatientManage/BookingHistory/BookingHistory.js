import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { BookingHistoryDrCard } from "./BookingHistoryDrCard";
import CustomButton from "../../../components/CustomButton/custom-button";
import { currencysign } from "../../../constants/const";

const BookingHistory = () => {
    const [bookingHistoryData, setBookingHistoryData] = useState([]);
    const [loading, setLoading] = useState(true); // For skeleton loading
    const [page, setPage] = useState(0); // For pagination
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [patientId, setPatientID] = useState(localStorage.getItem("patient_suid"));

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance(`/sec/patient/appointmentHistory/${patientId}`);
            setBookingHistoryData(response?.data?.response || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "bookinghistory");
        setPatientID(localStorage.getItem("patient_suid"));
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Paginate data
    const paginatedData = bookingHistoryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/patientdashboard/manage/bookinghistory"}>Booking History</NavLink>
                    <NavLink to={"/patientdashboard/manage/transactions"}>Transaction</NavLink>
                    <NavLink to={"/patientdashboard/manage/reports"}>Report</NavLink>
                </nav>

                <Box className="allfile-main-container">
                    <Box component={"div"} sx={{ position: "relative", top: "4.5em", width: "100%", display: "flex", height: "90%" }}>
                        <TableContainer component={Paper} sx={{ backgroundColor: "#ffff" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="booking history table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name & Details</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Date & Time</TableCell>
                                        <TableCell align="center">Package</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading
                                        ? Array.from(new Array(rowsPerPage)).map((_, index) => (
                                              <TableRow key={index}>
                                                  {Array.from(new Array(5)).map((_, colIndex) => (
                                                      <TableCell key={colIndex}>
                                                          <Skeleton variant="text" />
                                                      </TableCell>
                                                  ))}
                                              </TableRow>
                                          ))
                                        : paginatedData.length === 0 ? (
                                            <TableRow>
                                                    <NoAppointmentCard text_one={"There is no Booking history"} />
                                            </TableRow>
                                          ) : (
                                            paginatedData.map((row) => (
                                                <TableRow key={row?.appointment_id}>
                                                    <TableCell component="th" scope="row">
                                                        <BookingHistoryDrCard
                                                            name={`${row?.first_name} ${row?.middle_name} ${row?.last_name}`}
                                                            specialist={"Neurologist"}
                                                            BookingId={"001"}
                                                            profileImage={`${row?.profile_picture}`}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <CustomButton
                                                            buttonCss={{
                                                                display: "inline-flex",
                                                                height: "2rem",
                                                                padding: "0.5rem 1rem",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                gap: "0.5rem",
                                                                flexShrink: "0",
                                                                borderRadius: "6.25rem",
                                                            }}
                                                            isTransaprent={"true"}
                                                            label={`${row?.status}`}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography
                                                            sx={{
                                                                color: "#939094",
                                                                fontFamily: "Poppins",
                                                                fontSize: "0.875rem",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {row?.appointment_date.split("T")[0]} |{" "}
                                                            {row?.appointment_time}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography
                                                            sx={{
                                                                color: "#939094",
                                                                fontFamily: "Poppins",
                                                                fontSize: "0.875rem",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {row?.plan_duration} | {row?.plan_name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography
                                                            sx={{
                                                                color: "#E72B4A",
                                                                fontFamily: "Poppins",
                                                                fontSize: "0.875rem",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {currencysign} {row?.plan_fee}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                          )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={bookingHistoryData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default BookingHistory;
