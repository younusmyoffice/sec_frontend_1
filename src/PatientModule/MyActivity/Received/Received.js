import React, { useEffect, useState } from "react";
import "./received.scss";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    IconButton,
    TableHead,
    TableRow,
    Typography,
    Skeleton,
    TablePagination,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RecieveTable from "../../PatientManage/Reports/Received/ReceiveTable";
import { PaginationCard } from "../../PatientAppointment/PatientCards";
import CustomButton from "../../../components/CustomButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { Document, Page, pdfjs } from 'react-pdf';
import CustomModal from "../../../components/CustomModal";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * Configure PDF.js worker for rendering PDF files
 * Uses CDN-hosted worker for compatibility
 */
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * Received Component
 * 
 * Displays patient's received medical reports
 * Features:
 * - Fetches completed reports from API
 * - Table view with pagination
 * - View PDF in modal
 * - Download reports
 * - Handles multiple file formats (base64, S3 URLs, local files)
 * 
 * @component
 */
const Received = () => {
    logger.debug("🔵 Received component rendering");
    const [value, setValue] = useState([null, null]);
    const [tableData, setTableData] = useState([]);
    const [patientID, setPatientID] = useState(localStorage.getItem("patient_suid"));
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0); // Current page for pagination
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
    const [openModal, setOpenModal] = useState(false); // PDF modal open state
    const [pdfUrl, setPdfUrl] = useState(null); // PDF URL to display
    const [pdfLoading, setPdfLoading] = useState(false); // PDF loading state
    const [pdfError, setPdfError] = useState(null); // PDF error message
    const [pdfFileType, setPdfFileType] = useState(null); // PDF file type (data-url, http-url, base64, local-file)

    /**
     * Fetch patient's received reports from API
     * Retrieves completed reports for the logged-in patient
     * 
     * @param {string} patient_id - Patient's SUID
     * @param {string} status - Report status (e.g., "completed")
     */
    const fetchData = async (patient_id, status) => {
        logger.debug("📡 Fetching received reports", { patient_id, status });
        setLoading(true);
        
        try {
            // Validate patient ID
            if (!patient_id) {
                logger.error("❌ Patient ID not found");
                toastService.error("Patient information not available");
                setTableData([]);
                return;
            }
            
            const response = await axiosInstance.get(
                `/sec/patient/reportsReceived/${patient_id}/${status}`
            );

            const reports = response?.data?.response || [];
            
            logger.debug("✅ Received reports fetched successfully", { 
                count: reports.length 
            });
            
            setTableData(reports);
            
            if (reports.length > 0) {
                toastService.success(`${reports.length} reports loaded`);
            } else {
                logger.warn("⚠️ No reports found");
            }
        } catch (error) {
            logger.error("❌ Failed to fetch received reports:", error);
            toastService.error("Failed to load reports");
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
        logger.debug("🔵 Received component mounted");
        
        const patient_id = localStorage.getItem("patient_suid");
        const status = "completed";
        
        if (patient_id) {
            setPatientID(patient_id);
            fetchData(patient_id, status);
        } else {
            logger.error("❌ Patient ID not found in localStorage");
            toastService.error("Please login to view your reports");
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
        setPage(0); // Reset to page 0 when rows per page is changed
    };

    /**
     * Get current page data for pagination
     * Slices tableData based on current page and rows per page
     */
    const currentData = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    /**
     * Handle report download
     * Supports multiple file formats: base64, S3 URLs, local files
     * 
     * @param {string} reportPath - Path/URL to the report file
     * @param {string} fileName - Name for the downloaded file
     */
    const handleDownload = (reportPath, fileName = "report") => {
        logger.debug("📥 Download triggered", { reportPath, fileName });
        
        if (!reportPath) {
            logger.error("❌ Report path is not available");
            toastService.error("Report not available for download");
            return;
        }

        try {
            // Check if it's a development base64 file
            if (reportPath.startsWith('data:')) {
                // Handle base64 data URLs
                const link = document.createElement("a");
                link.href = reportPath;
                link.download = fileName || "report";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }

            // Handle S3 URLs or other HTTP URLs
            if (reportPath.startsWith('http')) {
                logger.debug("🌐 Downloading from URL");
                const link = document.createElement("a");
                link.href = reportPath;
                link.target = "_blank";
                link.download = fileName || "report";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toastService.success("Report downloaded successfully");
                return;
            }

            // Handle local file paths (development mode)
            if (reportPath.includes('/uploads/') || reportPath.includes('backend/')) {
                // Extract filename from the path
                const filename = reportPath.split('/').pop();
                const staticUrl = `http://localhost:3000/static/${filename}`;
                
                logger.debug("📁 Converting local path to static URL", { staticUrl });
                
                const link = document.createElement("a");
                link.href = staticUrl;
                link.target = "_blank";
                link.download = fileName || "report";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toastService.success("Report downloaded successfully");
                return;
            }

            // Handle base64 strings without data URL prefix
            if (typeof reportPath === 'string' && reportPath.length > 100) {
                logger.debug("📄 Downloading base64 PDF");
                // Assume it's base64 encoded PDF
                const dataUrl = `data:application/pdf;base64,${reportPath}`;
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = fileName || "report";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toastService.success("Report downloaded successfully");
                return;
            }

            logger.warn("⚠️ Unknown file format", { reportPath });
            toastService.error("Unable to download this file format");
        } catch (error) {
            logger.error("❌ Error downloading file:", error);
            toastService.error("Failed to download report");
        }
    };

    /**
     * Handle report view in modal
     * Opens PDF viewer modal with the report
     * Supports multiple file formats
     * 
     * @param {string} reportPath - Path/URL to the report file
     */
    const handleView = (reportPath) => {
        logger.debug("👁️ View triggered", { reportPath });
        
        if (!reportPath) {
            logger.error("❌ Report path is not available");
            toastService.error("Report not available for viewing");
            return;
        }

        try {
            setPdfLoading(true);
            setPdfError(null);

            let urlToSet = reportPath;

            // Handle different file formats
            if (reportPath.startsWith('data:')) {
                // Handle base64 data URLs
                urlToSet = reportPath;
                setPdfFileType('data-url');
            } else if (reportPath.startsWith('http')) {
                // Handle S3 URLs or other HTTP URLs
                urlToSet = reportPath;
                setPdfFileType('http-url');
            } else if (reportPath.includes('/uploads/') || reportPath.includes('backend/')) {
                // Handle local file paths (development mode)
                const filename = reportPath.split('/').pop();
                urlToSet = `http://localhost:3000/static/${filename}`;
                setPdfFileType('local-file');
                logger.debug("📁 Converting local path for viewing", { urlToSet });
            } else if (typeof reportPath === 'string' && reportPath.length > 100) {
                // Handle base64 strings without data URL prefix
                logger.debug("📄 Converting base64 for viewing");
                urlToSet = `data:application/pdf;base64,${reportPath}`;
                setPdfFileType('base64');
            } else {
                throw new Error("Unknown file format");
            }

            setPdfUrl(urlToSet);
            setOpenModal(true);
            toastService.success("Report opened");
        } catch (error) {
            logger.error("❌ Error opening file:", error);
            toastService.error("Failed to open report");
            setPdfError(error.message);
            setPdfLoading(false);
        }
    };

    /**
     * Handle successful PDF document load
     * Called when PDF is successfully rendered
     * 
     * @param {Object} param0 - Object containing numPages
     * @param {number} param0.numPages - Number of pages in the PDF
     */
    const onDocumentLoadSuccess = ({ numPages }) => {
        setPdfLoading(false);
        setPdfError(null);
        logger.debug("✅ PDF loaded successfully", { numPages });
    };

    /**
     * Handle PDF loading errors
     * Called when PDF fails to load or render
     * 
     * @param {Error} error - The error that occurred
     */
    const onDocumentLoadError = (error) => {
        logger.error("❌ PDF loading error:", error);
        setPdfLoading(false);
        setPdfError("Failed to load PDF document");
        toastService.error("Failed to load PDF");
    };


    return (
        <>
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
                                    <TableCell>Lab/Booking ID</TableCell>
                                    <TableCell>File/Test Name</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    // Render skeleton rows while loading
                                    Array.from(new Array(4)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Skeleton variant="text" />
                                            </TableCell>
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
                                            <TableCell align="right">
                                                <Skeleton variant="text" />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : currentData.length === 0 ? (
                                    // Empty state - No reports found
                                    <NoAppointmentCard text_one={"No Data Found"} />
                                ) : (
                                    // Render reports data with action buttons
                                    currentData.map((row) => {
                                        // Log row data for debugging (development only)
                                        if (process.env.NODE_ENV === 'development') {
                                            logger.debug("📋 Rendering row", {
                                                reportPath: row.report_path,
                                                reportName: row.report_name,
                                                hasDate: !!row?.date,
                                                hasTime: !!row?.time
                                            });
                                        }
                                        
                                        return (
                                        <TableRow
                                            key={row?.test_id || row?.BookingID || Math.random()}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell align="right">
                                                <RecieveTable
                                                    profile={row?.profile_picture}
                                                    name={row?.lab_department_name}
                                                    Id={row?.BookingID || "not found"}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {` ${row?.report_name} | ${row?.test_name}`}
                                            </TableCell>

                                            <TableCell align="right">
                                                {`${row?.date?.split("T")[0] || "NA"} | ${row?.book_time?.split("T")[1]?.split(".")[0] || row?.time?.split("T")[1]?.split(".")[0] || "NA"}`}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row?.status || "NA"}
                                            </TableCell>
                                            <TableCell align="right">
                                                {/* View Icon */}
                                                <IconButton
                                                    sx={{ marginRight: 1, color: "#E72B4A" }}
                                                    aria-label="view"
                                                    onClick={() => handleView(row.report_path)}
                                                    title="View Report"
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>

                                                {/* Download Icon */}
                                                <IconButton
                                                    sx={{ color: "#E72B4A" }}
                                                    aria-label="download"
                                                    onClick={() => handleDownload(row.report_path, row.report_name || "report")}
                                                    title="Download Report"
                                                >
                                                    <FileDownloadIcon />
                                                </IconButton>
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
                            rowsPerPageOptions={[10, 25, 50, 100]}
                        />
                    </TableContainer>
                    <CustomModal isOpen={openModal} conditionOpen={setOpenModal}>
                        <Box
                            sx={{
                                width: "90vw",
                                maxWidth: "1000px",
                                height: "85vh",
                                backgroundColor: "white",
                                padding: 2,
                                overflow: "auto",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                <Typography variant="h6">
                                    Report Viewer {pdfFileType && `(${pdfFileType})`}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    {pdfUrl && (
                                        <CustomButton 
                                            label="Download" 
                                            isText 
                                            handleClick={() => handleDownload(pdfUrl, "downloaded_report")}
                                        />
                                    )}
                                    <CustomButton 
                                        label="Close" 
                                        isText 
                                        handleClick={() => setOpenModal(false)}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {pdfLoading ? (
                                    <Box sx={{ textAlign: "center" }}>
                                        <Skeleton variant="rectangular" width={800} height={600} />
                                        <Typography variant="body2" sx={{ mt: 2 }}>
                                            Loading PDF...
                                        </Typography>
                                    </Box>
                                ) : pdfError ? (
                                    <Box sx={{ textAlign: "center", color: "error.main" }}>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Error Loading PDF
                                        </Typography>
                                        <Typography variant="body2">
                                            {pdfError}
                                        </Typography>
                                        <Typography variant="caption" sx={{ mt: 2, display: "block", color: "text.secondary" }}>
                                            You can still try to download the file using the download button above.
                                        </Typography>
                                    </Box>
                                ) : pdfUrl ? (
                                    <Document 
                                        file={pdfUrl} 
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        onLoadError={onDocumentLoadError}
                                        loading={<Skeleton variant="rectangular" width={800} height={600} />}
                                    >
                                        <Page pageNumber={1} width={Math.min(800, window.innerWidth * 0.8)} />
                                    </Document>
                                ) : (
                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography variant="body1">
                                            No PDF available
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </CustomModal>
                </Box>
            </Box>
        </>
    );
};

export default Received;
