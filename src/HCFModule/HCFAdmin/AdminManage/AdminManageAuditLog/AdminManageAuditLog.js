import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Skeleton,
    Typography,
    TablePagination,
    colors,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchBox from "../../../../components/searchbox/SearchBox";
import { baseURL } from "../../../../constants/const";
import { AuditCards } from "../../../DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDate } from "../../../../constants/const";
import axiosInstance from "../../../../config/axiosInstance";
import { doc } from "prettier";


const getStatusLabel = (status) => {
    return status === 1 ? "Active" : "Inactive";
};

const AdminManageAuditLog = () => {
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
    const hcf_id = localStorage.getItem('hcfadmin_suid'); // Example value; replace with your logic to get hcf_id

    const fetchData = async (hcf_id) => {
        try {
            const response = await axiosInstance(`sec/hcf/HcfAuditlogs/${hcf_id}`);
            const fetchedData = response?.data?.response || [];

            // Sort the data by timestamp in descending order
            const sortedData = fetchedData.sort((a, b) => new Date(b.time) - new Date(a.time));
    
            setData(sortedData);        } catch (error) {
            setError(error.response ? error.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(hcf_id);
    }, [hcf_id]);

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
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "90%",
                    flexDirection: "row",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminsale"}>Sale Activities</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminoverview"}>Overview</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminbooking"}>Bookings</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminpayout"}>Payout</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminauditlog"}>Audit Logs</NavLink>
                </nav>

                <Box
                    component={"div"}
                    sx={{ position: "relative", top: "4em", width: "100%", height: "100%" }}
                >
                    {/* <Box sx={{ display: "flex", marginBottom: "1em" }}>
                        <SearchBox />
                    </Box> */}

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
                                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell colSpan={5} align="center">
                                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <NoAppointmentCard text_one={"No Data Found"} />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <AuditCards name={row.name} specialist={row.specialist} Id={row.user_id} />
                                            </TableCell>
                                            <TableCell align="right" sx={cellStyle}>
                                                {getStatusLabel(row.status)}
                                            </TableCell>
                                            <TableCell align="right" sx={actionidStyle}>
                                                {row.action_id}
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

export default AdminManageAuditLog;
