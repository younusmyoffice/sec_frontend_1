import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    Skeleton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { baseURL } from "../../../../constants/const";
import { AuditCards } from "../../../DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import {formatDate} from "../../../../constants/const"


const getStatusLabel = (status) => {
    return status === 1 ? "Active" : "Inactive";
};

const ClinicAuditLog = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "hcfadminauditlog");
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const doctor_id = localStorage.getItem("clinic_suid");

    const fetchData = async (doctor_id) => {
        try {
            const response = await axiosInstance(`sec/hcf/clinicAuditlogs/${doctor_id}`);
            setData(response?.data?.response || []);
        } catch (error) {
            setError(error.response ? error.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(doctor_id);
    }, [doctor_id]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when rows per page changes
    };

    const cellStyle = {
        color: "#939094",
        textAlign: "right",
        fontFamily: "Poppins",
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "0.9375rem",
        letterSpacing: "0.005rem",
    };
    const actionidStyle = {
        color: "#E72B4A",
        textAlign: "right",
        fontFamily: "Poppins",
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "0.9375rem",
        letterSpacing: "0.005rem",
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    flexDirection: "row",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/clinicDashboard/clinicmanage/clinicsalesactivities"}>
                        Sales Activities
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmanage/clinicauditlog"}>
                        Audit Logs
                    </NavLink>
                </nav>

                <Box
                    component={"div"}
                    sx={{ position: "relative", top: "4em", width: "100%", height: "100%" }}
                >
                    <TableContainer component={Paper} style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name & Details</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action ID</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                    <TableCell align="right">Timestamp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <>
                                        {[...Array(rowsPerPage)].map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton
                                                        variant="circular"
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <Skeleton variant="text" width={100} />
                                                    <Skeleton variant="text" width={130} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Skeleton variant="text" width={80} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Skeleton variant="text" width={150} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Skeleton variant="text" width={120} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Skeleton variant="text" width={100} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                ) : data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <NoAppointmentCard text_one={"No Data Found"} />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <AuditCards
                                                        name={row.name || "N/A"}
                                                        specialist={row.specialist || "Unknown"}
                                                        Id={row.user_id || "N/A"}
                                                    />{" "}
                                                </TableCell>
                                                <TableCell align="right" sx={cellStyle}>
                                                    {getStatusLabel(row.status)}
                                                </TableCell>
                                                <TableCell align="right" sx={actionidStyle}>
                                                    {row.action_id || "N/A"}
                                                </TableCell>
                                                <TableCell align="right" sx={cellStyle}>
                                                    {row.action}
                                                </TableCell>
                                                <TableCell align="right" sx={cellStyle}>
                                                    {formatDate(row.time)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </TableContainer>
                   
                </Box>
            </Box>
        </>
    );
};

export default ClinicAuditLog;
