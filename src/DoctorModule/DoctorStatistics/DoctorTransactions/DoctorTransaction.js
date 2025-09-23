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

import { PaginationCard } from "../../../PatientDashboard/PatientAppointment/PatientCards";
import { TransactionCard } from "./TransactionCard";
import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
import axiosInstance from "../../../config/axiosInstance";
import { ReceiveCard, SendCard, FaildCard } from "../../../PatientDashboard/PatientManage/Transactions/TransactionCard";
import NoAppointmentCard from "../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { currencysign, formatDate } from "../../../constants/const";

const DoctorTransaction = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        localStorage.setItem("activeComponent", "statistics");
        localStorage.setItem("path", "doctorTransaction");
    }, []);

    useEffect(() => {
        GetTransactionsData();
    }, []);

    const GetTransactionsData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/sec/doctor/DocTransaction/",
                JSON.stringify({
                    doctor_id: localStorage.getItem("doctor_suid"),
                }),
            );
            setData(response?.data?.response || []);
        } catch (error) {
            console.log("Error : ", error);
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
                                        <TableCell>Transaction & ID</TableCell>
                                        <TableCell align="right">Date & Time</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        // Skeleton loader rows
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
                                                    <Skeleton variant="text" width={60} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : data.length === 0 ? (
                                        // No data found message
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                <NoAppointmentCard text_one={"No Data Found"} />{" "}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        // Render data rows
                                        displayedData.map((row) => (
                                            <TableRow key={row?.transaction_id}>
                                                <TableCell component="th" scope="row">
                                                    {row?.status === "canceled" ? (
                                                        <FaildCard
                                                            Payment={"Paymemt Faild"}
                                                            TRXID={row?.transaction_id || "N/A"}
                                                        />
                                                    ) : (
                                                        <ReceiveCard
                                                            Payment={"Payment Sucessfull"}
                                                            TRXID={row?.transaction_id || "N/A"}
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.appointment_date
                                                        ? formatDate(row.appointment_date)
                                                        : "N/A"}
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: "#E72B4A" }}>
                                                    {`${currencysign}${row?.amount || "NA"}`}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Table Pagination */}
                        <TablePagination
                            component="div"
                            count={data.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default DoctorTransaction;
