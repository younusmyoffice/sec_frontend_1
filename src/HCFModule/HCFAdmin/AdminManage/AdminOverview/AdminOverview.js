import {
    Box,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Skeleton,
    TextField,
    TablePagination,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBox from "../../../../components/searchbox/SearchBox";
import axios from "axios";
import { baseURL } from "../../../../constants/const";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDate, currencysign } from "../../../../constants/const";

const AdminOverview = () => {
    const [data1, setData1] = useState([]); // For overview count
    const [allearning, setAllearning] = useState([]); // For earning list
    const [loading, setLoading] = useState(true); // Loading state for fetching data
    const [error, setError] = useState(null); // Error state
    const [page, setPage] = useState(0); // Pagination state
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const hcf_id = localStorage.getItem('hcfadmin_suid'); // Example value; replace with your logic to get hcf_id
useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
    
}, [])

    // Fetching API for overview count
    const fetchData1 = async () => {
        try {
            const response = await axiosInstance.get(`/sec/hcf/HcfSaleActivityCount/${hcf_id}`);
            setData1(response?.data || {});
        } catch (error) {
            setError(error.response ? error.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Fetching API for all earning list
    const hcfAllEarningList = async () => {
        try {
            const response = await axiosInstance.get(`/sec/hcf/hcfAllEarningList/${hcf_id}`);
            setAllearning(response?.data?.response || []);
        } catch (error) {
            setError(error.response ? error.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData1(hcf_id); // Fetch overview data
        hcfAllEarningList(hcf_id); // Fetch all earning list
    }, [hcf_id]);

    // Handling pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage); // Update the current page
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10)); // Set rows per page
        setPage(0); // Reset to first page
    };

    return (
        <Box sx={{ display: "flex", width: "98%", height: "90%", flexDirection: "row" }}>
            <nav className="NavBar-Container-Appoinement">
                {/* Navigation links */}
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminsale"}>Sale Activities</NavLink>
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminoverview"}>Overview</NavLink>
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminbooking"}>Bookings</NavLink>
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminpayout"}>Payout</NavLink>
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminauditlog"}>Audit Logs</NavLink>
            </nav>

            <Box component={"div"} sx={{ 
                flex: 1,
                width: "100%", 
                display: "flex", 
                flexDirection: "column",
                minHeight: 0,
                overflow: "hidden",
                marginTop: "4em",
            }}>
                <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
                    <div className="Earning-container">
                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", flexShrink: 0, gap: "1rem" }}>
                            {/* Display Revenue Cards */}
                            {loading ? (
                                Array(3).fill().map((_, index) => (
                                    <Box 
                                        className="Earn1" 
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            border: "1px solid #E6E1E5",
                                            borderRadius: "10px",
                                            padding: "2rem",
                                            backgroundColor: "#ffffff",
                                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                                            flex: 1,
                                            minWidth: "200px",
                                        }}
                                    >
                                        <Skeleton variant="text" width={100} height={58} />
                                        <Skeleton variant="text" width={120} height={12} />
                                        <Skeleton variant="rectangular" width={80} height={24} />
                                    </Box>
                                ))
                            ) : (
                                <>
                                    <Box 
                                        className="Earn1"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            border: "1px solid #E6E1E5",
                                            borderRadius: "10px",
                                            padding: "2rem",
                                            backgroundColor: "#ffffff",
                                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                                            flex: 1,
                                            minWidth: "200px",
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "58px", fontWeight: "600", color: "#E72B4A" }}>
                                        ₹{data1.Consultation_Revenue || 0}
                                        </Typography>
                                        <Typography sx={{ fontSize: "12px", fontWeight: "500", color: "#AEAAAE" }}>
                                            Consultation Revenue
                                        </Typography>
                                        <Typography sx={{ background: "#EFEFEF", borderRadius: "15px", p: 1, fontSize: "15px" }}>
                                            {data1.consultationItems || 0} Items
                                        </Typography>
                                    </Box>
                                    <Box 
                                        className="Earn1"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            border: "1px solid #E6E1E5",
                                            borderRadius: "10px",
                                            padding: "2rem",
                                            backgroundColor: "#ffffff",
                                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                                            flex: 1,
                                            minWidth: "200px",
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "58px", fontWeight: "600", color: "#E72B4A" }}>
                                        ₹{data1.Diagnostic_Revenue || 0}
                                        </Typography>
                                        <Typography sx={{ fontSize: "12px", fontWeight: "500", color: "#AEAAAE" }}>
                                            Diagnostic Revenue
                                        </Typography>
                                        <Typography sx={{ background: "#EFEFEF", borderRadius: "15px", p: 1, fontSize: "15px" }}>
                                            {data1.diagnosticItems || 0} Items
                                        </Typography>
                                    </Box>
                                    <Box 
                                        className="Earn1"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            border: "1px solid #E6E1E5",
                                            borderRadius: "10px",
                                            padding: "2rem",
                                            backgroundColor: "#ffffff",
                                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                                            flex: 1,
                                            minWidth: "200px",
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "58px", fontWeight: "600", color: "#E72B4A" }}>
                                        ₹{data1.Total || 0}
                                        </Typography>
                                        <Typography sx={{ fontSize: "12px", fontWeight: "500", color: "#AEAAAE" }}>
                                            Total Earning
                                        </Typography>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </div>

                    <div className="Monthly-Earnings" style={{ flexShrink: 0 }}>
                        {loading ? (
                            <Skeleton variant="text" width={200} height={40} />
                        ) : (
                            <Typography component="h2" sx={{ fontSize: "25px", fontWeight: "600", color: "#313033", marginTop: "55px", marginBottom: "20px" }}>
                                Monthly Earnings
                            </Typography>
                        )}
                    </div>

                    {/* Scrollable table container - enables internal scrolling when table exceeds viewport */}
                    <TableContainer 
                        component={Paper} 
                        sx={{ 
                            backgroundColor: "#ffff",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0,
                            overflow: "auto", // Enable scrolling for table content
                            maxHeight: "calc(100vh - 450px)", // Adjusted to account for revenue cards, navbar, and spacing
                            border: "1px solid #e72b4a", borderRadius: "10px", padding: "10px"
                        }}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Account No</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Status</TableCell>
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
                                
                                ) : !allearning.activities || allearning.activities.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <NoAppointmentCard text_one={"No Data Found"} />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    allearning.activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow key={row.TransactionID}>
                                            <TableCell align="center">{formatDate(row.date)}</TableCell>
                                            <TableCell align="center">{row.accountNo}</TableCell>
                                            <TableCell align="center">₹{row.amount}</TableCell>
                                            <TableCell align="center">{row.status}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
                            component="div"
                            count={allearning.activities ? allearning.activities.length : 0}
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

export default AdminOverview;
