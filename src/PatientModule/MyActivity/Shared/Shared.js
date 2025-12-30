import React, { useEffect, useState } from "react";
import "./shared.scss";
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
    Typography,
    Skeleton,
    TablePagination,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { PaginationCard } from "../../PatientAppointment/PatientCards";
import ShareTable from "./ShareTable";
import CustomButton from "../../../components/CustomButton";
import { ShareModals } from "./ShareModals";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * Shared Component
 * 
 * Displays patient's shared medical reports
 * Features:
 * - Fetches shared reports from API
 * - Table view with pagination
 * - Download shared reports
 * - Date and category filtering
 * 
 * @component
 */
const Shared = () => {
    logger.debug("🔵 Shared component rendering");
    const [value, setValue] = useState([null, null]);
    const [tableData, setTableData] = useState([]);
    const [patientID, setPatientID] = useState(localStorage.getItem("patient_suid"));
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0); // Current page for pagination
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

    /**
     * Set active component in localStorage for navigation tracking
     */
    useEffect(() => {
        try {
            localStorage.setItem("activeComponent", "dashboard");
        } catch (error) {
            logger.error("Failed to set activeComponent in localStorage:", error);
        }
    }, []);

    /**
     * Fetch shared reports from API
     * Retrieves reports that were shared with the patient
     * 
     * @param {string} patient_id - Patient's SUID
     */
    const fetchData = async (patient_id) => {
        logger.debug("📡 Fetching shared reports", { patient_id });
        setLoading(true);
        
        try {
            // Validate patient ID
            if (!patient_id) {
                logger.error("❌ Patient ID not found");
                toastService.error("Patient information not available");
                setTableData([]);
                return;
            }
            
            const response = await axiosInstance.get(`/sec/patient/reportsShared/${patient_id}`);
            const reports = response?.data?.response || [];
            
            logger.debug("✅ Shared reports fetched successfully", { 
                count: reports.length 
            });
            
            setTableData(reports);
            
            if (reports.length > 0) {
                toastService.success(`${reports.length} shared reports loaded`);
            } else {
                logger.warn("⚠️ No shared reports found");
            }
        } catch (error) {
            logger.error("❌ Failed to fetch shared reports:", error);
            toastService.error("Failed to load shared reports");
            setTableData([]); // Fallback to empty array
        } finally {
            setLoading(false);
        }
    };

    /**
     * Initialize component and fetch data on mount
     * Gets patient_id from localStorage
     */
    useEffect(() => {
        logger.debug("🔵 Shared component mounted");
        
        const patient_id = localStorage.getItem("patient_suid");
        
        if (patient_id) {
            setPatientID(patient_id);
            fetchData(patient_id);
        } else {
            logger.error("❌ Patient ID not found in localStorage");
            toastService.error("Please login to view your shared reports");
            setLoading(false);
        }
    }, []);

    /**
     * Handle page change for pagination
     * 
     * @param {Event} event - Change event
     * @param {number} newPage - New page number
     */
    const handleChangePage = (event, newPage) => {
        logger.debug("📄 Page changed", { newPage });
        setPage(newPage);
    };

    /**
     * Handle rows per page change for pagination
     * Resets to page 0 when rows per page changes
     * 
     * @param {Event} event - Change event
     */
    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        logger.debug("📊 Rows per page changed", { newRowsPerPage });
        setRowsPerPage(newRowsPerPage);
        setPage(0); // Reset to page 0
    };

    /**
     * Get current page data for pagination
     * Slices tableData based on current page and rows per page
     */
    const displayedData = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            {/* Date range picker */}
            {/* <Box sx={{ width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker
                        disablePast
                        value={value}
                        maxDate={getWeeksAfter(value[0], 4)}
                        onChange={(newValue) => setValue(newValue)}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </Box> */}

            <Box className="allfile-main-container">
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
                                <TableCell>Doctor Name</TableCell>
                                <TableCell align="right">Date & Time</TableCell>
                                <TableCell align="right">File Name</TableCell>
                                <TableCell align="right">Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                // Render skeleton rows while loading
                                Array.from(new Array(5)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Skeleton variant="text" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="text" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="text" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="text" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : tableData.length === 0 ? (
                                // Render "No Data Found" if tableData is empty
                                <NoAppointmentCard text_one={"No Data Found"} />
                            ) : (
                                // Render shared reports data
                                displayedData.map((row) => {
                                    // Log row data for debugging (development only)
                                    if (process.env.NODE_ENV === 'development') {
                                        logger.debug("📋 Rendering shared row", {
                                            hasReportPath: !!row?.report_path,
                                            reportName: row?.report_name,
                                            hasDate: !!row?.date,
                                            hasTime: !!row?.time
                                        });
                                    }
                                    
                                    /**
                                     * Handle report download
                                     * Creates a temporary anchor element to trigger download
                                     */
                                    const handleDownload = () => {
                                        if (row?.report_path) {
                                            logger.debug("📥 Downloading shared report", { 
                                                fileName: row.report_name 
                                            });
                                            
                                            const link = document.createElement("a");
                                            link.href = row.report_path;
                                            link.download = row.report_name || "report";
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                            
                                            toastService.success("Report downloaded successfully");
                                        } else {
                                            logger.error("❌ Report path not available");
                                            toastService.error("Report not available for download");
                                        }
                                    };
                                    
                                    return (
                                    <TableRow
                                        key={row.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <ShareTable
                                                name={`${row?.doctor_name || "Unknown"} ${
                                                    row?.middle_name || ""
                                                } ${row?.last_name || ""}`} profile={row?.profile_picture}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.date
                                                ? `${row.date.split("T")[0]} | ${
                                                      row?.time?.split("T")[1]?.split(".")[0] ||
                                                      row?.created_at?.split("T")[1]?.split(".")[0] ||
                                                      row?.updated_at?.split("T")[1]?.split(".")[0] ||
                                                      "No Time"
                                                  }`
                                                : "No Date"}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            onClick={handleDownload}
                                            sx={{
                                                cursor: row?.report_path ? "pointer" : "not-allowed",
                                                color: row?.report_path ? "#313033" : "#999",
                                                "&:hover": row?.report_path ? {
                                                    textDecoration: "underline",
                                                    color: "#E72B4A"
                                                } : {}
                                            }}
                                        >
                                            {row?.report_name || "No Report"}
                                        </TableCell>

                                        <TableCell align="right">
                                            {row?.category || "No Category"}
                                        </TableCell>
                                    </TableRow>
                                    );
                                })
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
                />
                </TableContainer>
                
            </Box>
        </>
    );
};

export default Shared;
