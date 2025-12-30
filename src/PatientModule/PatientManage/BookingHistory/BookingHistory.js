import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { BookingHistoryDrCard } from "./BookingHistoryDrCard";
import CustomButton from "../../../components/CustomButton/custom-button";
import { currencysign } from "../../../constants/const";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * BookingHistory Component
 * 
 * Displays patient's booking history in a table
 * Features:
 * - Fetches and displays appointment history
 * - Pagination support
 * - Loading skeletons
 * - Empty state handling
 * 
 * @component
 */
const BookingHistory = () => {
    logger.debug("🔵 BookingHistory component rendering");
    
    // Booking history data state
    const [bookingHistoryData, setBookingHistoryData] = useState([]);
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
    
    const [patientId, setPatientID] = useState(getPatientId());

    /**
     * Fetch booking history from API
     * Retrieves all past appointments for the patient
     */
    const fetchData = async () => {
        logger.debug("📡 Fetching booking history", { patientId });
        setLoading(true);
        
        try {
            // Validate patient ID
            if (!patientId) {
                logger.error("❌ Patient ID is missing");
                toastService.error("Patient information not available");
                setBookingHistoryData([]);
                setLoading(false);
                return;
            }
            
            const response = await axiosInstance.get(`/sec/patient/appointmentHistory/${patientId}`);
            
            const historyData = response?.data?.response || [];
            logger.debug("✅ Booking history fetched successfully", { 
                count: historyData.length 
            });
            
            setBookingHistoryData(historyData);
            
            if (historyData.length > 0) {
                toastService.success(`${historyData.length} booking(s) found`);
            }
        } catch (error) {
            logger.error("❌ Failed to fetch booking history:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load booking history. Please try again later."
            );
            setBookingHistoryData([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Initialize component and fetch data
     * Sets localStorage flags and fetches booking history
     */
    useEffect(() => {
        logger.debug("🔵 BookingHistory component mounting");
        
        try {
            localStorage.setItem("activeComponent", "manage");
            localStorage.setItem("path", "bookinghistory");
            logger.debug("✅ Set localStorage flags");
        } catch (error) {
            logger.error("❌ Error setting localStorage:", error);
        }
        
        // Update patient_id from localStorage if not already set
        const currentPatientId = getPatientId();
        if (currentPatientId && currentPatientId !== patientId) {
            setPatientID(currentPatientId);
        }
        
        fetchData();
    }, []);

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

    /**
     * Paginate data based on current page and rows per page
     */
    const paginatedData = bookingHistoryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* Navigation tabs */}
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={"/patientDashboard/manage/bookinghistory"}>Booking History</NavLink>
                <NavLink to={"/patientDashboard/manage/transactions"}>Transaction</NavLink>
                <NavLink to={"/patientDashboard/manage/reports"}>Report</NavLink>
            </nav>

            {/* Main content container */}
            <Box className="allfile-main-container">
                <Box component={"div"} sx={{ 
                    flex: 1,
                    width: "100%", 
                    display: "flex", 
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                    marginTop: "4.5em",
                }}>
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
                        }}
                    >
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
                                            /* Empty state */
                                            <TableRow>
                                                <TableCell colSpan={5}>
                                                    <NoAppointmentCard text_one={"There is no Booking history"} />
                                                </TableCell>
                                            </TableRow>
                                          ) : (
                                            /* Booking history rows */
                                            paginatedData.map((row) => (
                                                <TableRow key={row?.appointment_id || row?.id}>
                                                    {/* Doctor info cell */}
                                                    <TableCell component="th" scope="row">
                                                        <BookingHistoryDrCard
                                                            name={`${row?.first_name || ""} ${row?.middle_name || ""} ${row?.last_name || ""}`}
                                                            specialist={row?.department_name || "N/A"}
                                                            BookingId={row?.appointment_id || row?.booking_id || "N/A"}
                                                            profileImage={row?.profile_picture}
                                                        />
                                                    </TableCell>
                                                    
                                                    {/* Status cell */}
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
                                                            isTransaprent={true}
                                                            label={row?.status || "N/A"}
                                                        />
                                                    </TableCell>
                                                    
                                                    {/* Date & Time cell */}
                                                    <TableCell align="center">
                                                        <Typography
                                                            sx={{
                                                                color: "#939094", // Common color variant
                                                                fontFamily: "Poppins",
                                                                fontSize: "0.875rem",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {row?.appointment_date 
                                                                ? `${row.appointment_date.split("T")[0]} | ${row?.appointment_time || ""}`
                                                                : "N/A"}
                                                        </Typography>
                                                    </TableCell>
                                                    
                                                    {/* Package cell */}
                                                    <TableCell align="center">
                                                        <Typography
                                                            sx={{
                                                                color: "#939094", // Common color variant
                                                                fontFamily: "Poppins",
                                                                fontSize: "0.875rem",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {row?.plan_duration || "N/A"} | {row?.plan_name || "N/A"}
                                                        </Typography>
                                                    </TableCell>
                                                    
                                                    {/* Amount cell */}
                                                    <TableCell align="center">
                                                        <Typography
                                                            sx={{
                                                                color: "#E72B4A", // Primary brand color
                                                                fontFamily: "Poppins",
                                                                fontSize: "0.875rem",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {currencysign} {row?.plan_fee || "0"}
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
    );
};

export default BookingHistory;
