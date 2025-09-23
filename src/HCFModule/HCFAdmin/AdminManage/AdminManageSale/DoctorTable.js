import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Skeleton,
    TableRow,
    Typography,
    TablePagination,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../../constants/const";
import { SaleActivityCard } from "./SaleActivityCard";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDate, currencysign } from "../../../../constants/const";

const DoctorTable = () => {
    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const hcf_id = localStorage.getItem("hcfadmin_suid"); // Example value; replace with your logic to get hcf_id

    const fetchData1 = async (hcf_id) => {
        try {
            const response = await axiosInstance(`/sec/hcf/manageSaleActivity/${hcf_id}`);
            setData1(response?.data?.response || []);
            console.log("Sales activities data:", response.data.response);
        } catch (error) {
            setError(error.response ? error.response.data : "An error occurred");
            console.log("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData1(hcf_id);
    }, [hcf_id]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    return (
        <div>
            <TableContainer component={Paper} style={{ background: "white" }}>
                <Table sx={{ minWidth: 1 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ fontWeight: "bold" }}>
                            <TableCell>Doctor Name/ID</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Date & Time</TableCell>
                            <TableCell align="right">Package</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={5} align="center">
                                        <Skeleton variant="rectangular" width="100%" height={40} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : data1.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <NoAppointmentCard text_one={"No Data Found"} />
                                </TableCell>
                            </TableRow>
                        ) : (
                            data1
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(
                                    ({
                                        suid,
                                        profile_picture,
                                        first_name,
                                        middle_name,
                                        last_name,
                                        status,
                                        updated_at,
                                        plan_name,
                                        amount,
                                    }) => (
                                        <TableRow key={suid}>
                                            <TableCell component="th" scope="row" align="right">
                                                <SaleActivityCard
                                                    profile_picture={profile_picture}
                                                    name={`${first_name} ${middle_name} ${last_name}`}
                                                    user_id={suid}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    sx={{
                                                        color: "#939094",
                                                        fontFamily: "Poppins",
                                                        fontSize: "0.875rem",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    sx={{
                                                        color: "#939094",
                                                        fontFamily: "Poppins",
                                                        fontSize: "0.875rem",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {formatDate(updated_at)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    sx={{
                                                        color: "#939094",
                                                        fontFamily: "Poppins",
                                                        fontSize: "0.875rem",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {plan_name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    sx={{
                                                        color: "#939094",
                                                        fontFamily: "Poppins",
                                                        fontSize: "0.875rem",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {`${currencysign}${amount}`}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data1.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per page:"
            />
            </TableContainer>
           
        </div>
    );
};

export default DoctorTable;
