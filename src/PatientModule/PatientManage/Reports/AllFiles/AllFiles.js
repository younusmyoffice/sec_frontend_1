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
    TextField,
    TablePagination,
    Skeleton,
    Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import axiosInstance from "../../../../config/axiosInstance"; // Handles access token automatically
import NoAppointmentCard from "../../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { PatientSearchTable } from "../../../../HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticPatientSearch/PatientSearchTable";
import { currencysign } from "../../../../constants/const";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications
import "./allfiles.scss";

/**
 * AllFiles Component
 * 
 * Displays requested reports in a table
 * Features:
 * - Fetches and displays requested reports
 * - Pagination support
 * - Loading skeletons
 * - Empty state handling
 * 
 * @component
 */
const AllFiles = () => {
    logger.debug("🔵 AllFiles component rendering");
    
    // Date range picker state (currently unused but available for future use)
    const [value, setValue] = useState([null, null]);
    
    // Table data state
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    /**
     * Helper function for date range picker (currently unused)
     * @param {Date} date - Start date
     * @param {number} amount - Weeks to add
     * @returns {Date|undefined} Date with weeks added
     */
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }

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

    const patient_id = getPatientId();
    const status = "requested";
    
    /**
     * Fetch requested reports from API
     * Retrieves reports with status "requested"
     */
    const fetchData = async (patient_id, status) => {
        logger.debug("📡 Fetching requested reports", { patient_id, status });
        setLoading(true);
        
        try {
            // Validate patient ID
            if (!patient_id) {
                logger.error("❌ Patient ID is missing");
                toastService.error("Patient information not available");
                setTableData([]);
                setLoading(false);
                return;
            }
            
            const response = await axiosInstance.get(
                `/sec/patient/reportsRequested/${patient_id}/${status}`,
            );

            const reports = response?.data?.response || [];
            logger.debug("✅ Requested reports fetched successfully", { 
                count: reports.length 
            });
            
            setTableData(reports);
            
            if (reports.length > 0) {
                toastService.success(`${reports.length} requested report(s) found`);
            }
        } catch (error) {
            logger.error("❌ Failed to fetch requested reports:", error);
            toastService.error(
                error?.response?.data?.message || 
                "Failed to load reports. Please try again later."
            );
            setTableData([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Initialize component and fetch data
     */
    useEffect(() => {
        logger.debug("🔵 AllFiles component mounting");
        fetchData(patient_id, status);
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

    return (
        <>
            {/* Date Range Picker */}
            {/* <Box className="date-picker-container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker
                        disablePast
                        value={value}
                        maxDate={getWeeksAfter(value[0], 4)}
                        onChange={(newValue) => setValue(newValue)}
                        renderInput={(startProps, endProps) => (
                            <>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}>to</Box>
                                <TextField {...endProps} />
                            </>
                        )}
                    />
                </LocalizationProvider>
            </Box> */}

            <Box className="allfile-main-container">
                <Box sx={{ 
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                }}>
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
                            maxHeight: "calc(100vh - 200px)", // Adjusted to account for spacing
                        }}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Lab Name/Booking ID</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Schedule</TableCell>
                                    <TableCell align="right">Test Name</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    /* Loading skeletons */
                                    Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell colSpan={5}>
                                                <Skeleton variant="rectangular" height={40} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : tableData.length === 0 ? (
                                    /* Empty state */
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <NoAppointmentCard text_one={"No Data Found"} />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    /* Report data rows */
                                    tableData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow
                                                key={row?.labID || row?.booking_id || index}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                {/* Lab name and booking ID */}
                                                <TableCell>
                                                    <PatientSearchTable
                                                        profile={row?.profile_picture}
                                                        name={row?.lab_name || "N/A"}
                                                        Id={row?.booking_id || "N/A"}
                                                    />
                                                </TableCell>
                                                
                                                {/* Booking date */}
                                                <TableCell align="right">
                                                    {row?.book_date || "N/A"}
                                                </TableCell>
                                                
                                                {/* Schedule */}
                                                <TableCell align="right">
                                                    {row?.scheduled || "N/A"}
                                                </TableCell>
                                                
                                                {/* Test name */}
                                                <TableCell align="right">
                                                    {row?.test_name || "N/A"}
                                                </TableCell>
                                                
                                                {/* Price */}
                                                <TableCell align="right">
                                                    {`${currencysign}${row?.test_price || "0"}`}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={tableData.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default AllFiles;
