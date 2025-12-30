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
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { currencysign } from "../../../constants/const";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications
import "./transaction.scss";

/**
 * Transactions Component
 * 
 * Displays patient's transaction history
 * Features:
 * - Fetches and displays transaction data
 * - Shows payment status (Success, Failed)
 * - Pagination support
 * - Loading skeletons
 * - Empty state handling
 * 
 * @component
 */
const Transactions = () => {
    logger.debug("🔵 Transactions component rendering");
    
    // Transaction data state
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    /**
     * Get patient ID from localStorage with error handling
     */
    const getPatientId = () => {
        try {
            const patientId = localStorage.getItem("patient_suid");
            if (!patientId) {
                logger.warn("⚠️ Patient ID not found in localStorage");
                toastService.error("Patient information not available");
            }
            return patientId;
        } catch (error) {
            logger.error("❌ Error accessing localStorage:", error);
            toastService.error("Failed to load patient information");
            return null;
        }
    };
    
    const [patient_id, setPatient_id] = useState(getPatientId());

    /**
     * Fetch transaction data from API
     * Retrieves all transactions for the patient
     */
    const fetchData = async (patient_id) => {
        logger.debug("📡 Fetching transaction data", { patient_id });
        setLoading(true);
        
        try {
            // Validate patient ID
            if (!patient_id) {
                logger.error("❌ Patient ID is missing");
                toastService.error("Patient information not available");
                setData([]);
                setLoading(false);
                return;
            }
            
            const response = await axiosInstance.get(`/sec/patient/transaction/${patient_id}`);
            
            const transactionData = response?.data?.response || [];
            logger.debug("✅ Transaction data fetched successfully", { 
                count: transactionData.length 
            });
            
            setData(transactionData);
            
            if (transactionData.length > 0) {
                toastService.success(`${transactionData.length} transaction(s) loaded`);
            }
        } catch (error) {
            logger.error("❌ Failed to fetch transaction data:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load transactions. Please try again later."
            );
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Initialize component and fetch data
     * Sets localStorage flags and fetches transaction data
     */
    useEffect(() => {
        logger.debug("🔵 Transactions component mounting");
        
        try {
            localStorage.setItem("activeComponent", "manage");
            localStorage.setItem("path", "transactions");
            logger.debug("✅ Set localStorage flags");
        } catch (error) {
            logger.error("❌ Error setting localStorage:", error);
        }
        
        // Update patient_id from localStorage if not already set
        const currentPatientId = getPatientId();
        if (currentPatientId && currentPatientId !== patient_id) {
            setPatient_id(currentPatientId);
        }
        
        fetchData(patient_id);
    }, [patient_id]);

    /**
     * Handle page change in pagination
     * @param {Event} event - Change event
     * @param {number} newPage - New page number (0-based)
     */
    const handleChangePage = (event, newPage) => {
        logger.debug("📄 Page changed", { newPage });
        setPage(newPage);
    };

    /**
     * Handle rows per page change
     * Resets to first page when rows per page changes
     * @param {Event} event - Change event
     */
    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        logger.debug("📄 Rows per page changed", { newRowsPerPage });
        setRowsPerPage(newRowsPerPage);
        setPage(0); // Reset to first page
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
                            flex: 1,
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0,
                            overflow: "hidden",
                            marginTop: "4em",
                        }}
                    >
                        {loading ? (
                            /* Loading skeletons */
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
                            /* Empty state */
                            <NoAppointmentCard
                                text_one={"You don't have any transactions"}
                                ButtonLabel="Explore Appointments"
                                ButtonPath="/patientDashboard/dashboard/explore"
                            />
                        ) : (
                            /* Scrollable table container - enables internal scrolling when table exceeds viewport */
                            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
                                <TableContainer 
                                    component={Paper} 
                                    sx={{ 
                                        backgroundColor: "#ffffff",
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        minHeight: 0,
                                        overflow: "auto", // Enable scrolling for table content
                                        maxHeight: "calc(100vh - 250px)", // Adjusted to account for navbar and spacing
                                    }}
                                >
                                <Table sx={{ minWidth: 650 }} aria-label="transaction table">
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
                                                    key={row.transaction_id || row.id}
                                                    sx={{
                                                        "&:last-child td, &:last-child th": {
                                                            border: 0,
                                                        },
                                                    }}
                                                >
                                                    {/* Transaction status card */}
                                                    <TableCell component="th" scope="row">
                                                        {row?.status === "canceled" ? (
                                                            <ReceiveCard
                                                                Payment={"Payment Failed"} // Fixed typo: Paymemt → Payment
                                                                TRXID={row?.transaction_id || "N/A"}
                                                            />
                                                        ) : (
                                                            <SendCard
                                                                Payment={"Payment Successful"} // Fixed typo: Sucessfull → Successful
                                                                TRXID={row?.transaction_id || "N/A"}
                                                            />
                                                        )}
                                                    </TableCell>
                                                    
                                                    {/* Date & Time */}
                                                    <TableCell align="center">
                                                        {row?.appointment_date
                                                            ? `${row.appointment_date.split("T")[0]} | ${row?.appointment_time || ""}`
                                                            : "N/A"}
                                                    </TableCell>
                                                    
                                                    {/* Amount */}
                                                    <TableCell
                                                        align="center"
                                                        sx={{ color: "#E72B4A" }} // Primary brand color
                                                    >
                                                        {`${currencysign}${row?.amount || "0"}`}
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
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Transactions;
