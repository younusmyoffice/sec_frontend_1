import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Skeleton,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/custom-button";
import { ReceiveCard, FaildCard, SendCard } from "./TransactionCard";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { currencysign } from "../../../constants/const";
import "./transaction.scss";

const Transactions = () => {
    const [data, setData] = useState([]); // Transaction data
    const [loading, setLoading] = useState(true); // Loading state
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const patient_id = localStorage.getItem("patient_suid"); // Fetch patient ID from localStorage

    useEffect(() => {
        // Set active component for navigation
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "transactions");
        fetchData(patient_id);
    }, [patient_id]);

    const fetchData = async (patient_id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/sec/patient/transaction/${patient_id}`);
            setData(response?.data?.response || []); // Update transaction data
        } catch (error) {
            console.error("Error fetching transaction data:", error);
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

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/patientDashboard/manage/bookinghistory"}>
                        Booking History
                    </NavLink>
                    <NavLink to={"/patientDashboard/manage/transactions"}>Transaction</NavLink>
                    <NavLink to={"/patientDashboard/manage/reports"}>Report</NavLink>
                </nav>

                <Box className="allfile-main-container">
                    <Box
                        component="div"
                        sx={{
                            position: "relative",
                            top: "4em",
                            width: "100%",
                            display: "flex",
                            height: "90%",
                            flexDirection: "column",
                        }}
                    >
                        {loading ? (
                            // Display Skeleton Loader while loading
                            <Box sx={{ padding: "1rem" }}>
                                {[...Array(rowsPerPage)].map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        height={50}
                                        sx={{ marginBottom: "0.5rem" }}
                                    />
                                ))}
                            </Box>
                        ) : data.length === 0 ? (
                            // Display a message when no transactions exist
                            <NoAppointmentCard
                                text_one={"You don't have any transactions"}
                                ButtonLabel="Explore Appointments"
                                ButtonPath="/patientDashboard/dashboard/explore"
                            />
                        ) : (
                            // Display transaction data in a table
                            <TableContainer component={Paper} sx={{ backgroundColor: "#ffffff" }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Transaction & ID</TableCell>
                                            <TableCell align="center">Date & Time</TableCell>
                                            <TableCell align="center">Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage,
                                            )
                                            .map((row) => (
                                                <TableRow
                                                    key={row.transaction_id}
                                                    sx={{
                                                        "&:last-child td, &:last-child th": {
                                                            border: 0,
                                                        },
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row?.status === "canceled" ? (
                                                            <ReceiveCard
                                                                Payment={"Paymemt Faild"}
                                                                TRXID={row?.transaction_id || "N/A"}
                                                            />
                                                        ) : (
                                                            <SendCard
                                                                Payment={"Payment Sucessfull"}
                                                                TRXID={row?.transaction_id || "N/A"}
                                                            />
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row?.appointment_date
                                                            ? row.appointment_date.split("T")[0]
                                                            : "N/A"}
                                                        |{row?.appointment_time || "N/A"}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{ color: "#E72B4A" }}
                                                    >
                                                        {`${currencysign}${row?.amount || "NA"}`}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    count={data.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25]}
                                />
                            </TableContainer>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Transactions;
