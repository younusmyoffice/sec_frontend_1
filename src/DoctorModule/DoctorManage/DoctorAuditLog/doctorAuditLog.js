import {
    Box,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorManageNavbar from "../../CustomDoctorComponent/DoctorManageNavbar/DoctorManageNavbar";
import { AuditCards } from "../../../HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import axiosInstance from "../../../config/axiosInstance";
import dayjs from "dayjs";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDate } from "../../../PatientModule/DrDetailsCard/bookappointmentapihelperfunction";

const formatTimestamp = (isoString) => {
    return dayjs(isoString).format("MM/DD/YYYY, hh:mm:ss A");
};

const DoctorAuditLog = () => {
    const [rows, setRows] = useState([]); // Ensure rows is always an array
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const doctor_id = localStorage.getItem("doctor_suid")
    const fetchAuditLogs = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/sec/doctor/DoctorAuditlogs",{
                params:{
                    doctor_id
                }
            });
            console.log("Audit log response:", response.data.response);
            setRows(response.data.response); // Ensure rows is an array
        } catch (error) {
            console.error("Error fetching audit logs:", error);
            setRows([]); // Fallback to empty array
        } finally {
            setLoading(false);
        }
    };
console.log("this is audit log data",
    rows
)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        fetchAuditLogs();
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "98%", height: "100%", overflow: "hidden" }}>
            <DoctorManageNavbar />
            <Box
                sx={{
                    flex: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                    marginTop: "4em",
                    paddingTop: "40px",
                }}
            >
                <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", border: "2px solid #E72B4A", borderRadius: "10px" }}>
                    {/* Scrollable table container - enables internal scrolling when table exceeds viewport */}
                    <TableContainer 
                        component={Paper} 
                        style={{ 
                            background: "white",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0,
                            overflow: "auto", // Enable scrolling for table content
                            maxHeight: "calc(100vh - 250px)", // Adjusted to account for navbar and spacing
                        }}
                    >
                        <Table sx={{ minWidth: 1 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name & Details</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action ID</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                    <TableCell align="right">Time stamp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell colSpan={5}>
                                                <Skeleton variant="text" width="100%" height={40} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : rows.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <NoAppointmentCard text_one="No Data Found" />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow key={row.actionid}>
                                                <TableCell>
                                                    <AuditCards
                                                        name={row.name || "NA"}
                                                        specialist="Doctor"
                                                        Id={row.id || "NA"}
                                                    />
                                                </TableCell>
                                                <TableCell align="right"
                                                sx={{
                                                    color: row.status === 1 ? "#E72B4A" : "gray",
                                                    fontWeight: row.status === 1 ? "bold" : "normal", // Optional for styling emphasis
                                                }}>
                                                    {row.status === 1 ? "Active" : "Inactive"}
                                                </TableCell>
                                                <TableCell align="right">{row.actionid || "NA"}</TableCell>
                                                <TableCell align="right">{row.action || "NA"}</TableCell>
                                                <TableCell align="right">
                                                    {formatTimestamp(row.timestamp || "NA")}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default DoctorAuditLog;
