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
} from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    ReceiveCard,
    SendCard,
} from "../../../../PatientModule/PatientManage/Transactions/TransactionCard";
import { baseURL } from "../../../../constants/const";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDate, currencysign } from "../../../../constants/const";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback } from "react";

/**
 * AdminBooking Component
 * 
 * Displays booking transactions for HCF Admin
 * Features:
 * - Paginated booking transactions table
 * - Loading skeletons during data fetch
 * - Empty state handling
 * 
 * @component
 */
const AdminBooking = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const hcf_id = localStorage.getItem('hcfadmin_suid');

    /**
     * Validate HCF admin ID from localStorage
     * SECURITY: Ensures admin ID is present before making API calls
     * 
     * @returns {string|null} HCF admin ID or null if invalid
     */
    const validateHcfAdminId = useCallback(() => {
        const adminId = localStorage.getItem("hcfadmin_suid");

        if (!adminId) {
            logger.warn("⚠️ HCF Admin ID not found in localStorage");
            toastService.warning("HCF Admin ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ HCF Admin ID validated:", adminId);
        return adminId;
    }, []);

    /**
     * Initialize component - hide location search container
     */
    useEffect(() => {
        logger.debug("🔵 AdminBooking component rendering");
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }
        
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
                logger.debug("🔄 Location search container restored");
            }
        };
    }, []);

    /**
     * Fetch booking transactions
     * Loads all booking transactions for the HCF admin
     * 
     * @param {string} hcf_id - HCF admin ID
     */
    const fetchData = async (hcf_id) => {
        logger.debug("📋 Fetching booking transactions");
        setLoading(true);
        
        const adminId = validateHcfAdminId();
        if (!adminId) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/sec/hcf/getHcfAdminTransaction/${adminId}`);
            const transactions = response?.data?.response || [];
            
            logger.debug("✅ Booking transactions received", { count: transactions.length });
            setData(transactions);
            setError(null);
        } catch (error) {
            logger.error("❌ Error fetching booking transactions:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load booking transactions. Please try again.";
            setError(errorMessage);
            toastService.error(errorMessage);
            setData([]); // Ensure state is an array even on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(hcf_id);
    }, [hcf_id]);

    useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "hcfadminbooking");
    }, []);

    const formatDateTime = (date, time) => {
        const dateTime = new Date(`${date}T${time}`); // Assuming `time` is in 24-hour format
        return dateTime.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).replace(',', ''); // Removes the comma between date and time
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when rows per page changes
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminsale"}>Sale Activities</NavLink>
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminoverview"}>Overview</NavLink>
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminbooking"}>Bookings</NavLink>
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminpayout"}>Payout</NavLink>
                <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminauditlog"}>Audit Logs</NavLink>
            </nav>

            <Box
                component={"div"}
                sx={{
                    flex: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                    marginTop: "4em",
                }}
            >
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
                        maxHeight: "calc(100vh - 250px)", // Adjusted to account for navbar and spacing
                        border: "1px solid #e72b4a", borderRadius: "10px", padding: "10px"
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Transaction & ID</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">Date & Time</TableCell>
                                <TableCell align="center">Amount</TableCell>
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
                                        key={row.transaction_id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.status === "canceled" ? (
                                                <SendCard
                                                    Payment={row.status}
                                                    TRXID={row.transaction_id}
                                                />
                                            ) : (
                                                <ReceiveCard
                                                    Payment={row.status}
                                                    TRXID={row.transaction_id}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {/* Add other details if necessary */}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.appointment_date}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "#E72B4A",
                                                textAlign: "center",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "1.375rem",
                                                letterSpacing: "0.00438rem",
                                            }}
                                        >
                                            {`₹${row.amount}`}
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
    );
};

export default AdminBooking;
