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
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { Document, Page, pdfjs } from 'react-pdf';
import CustomModal from "../../../components/CustomModal";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Received = () => {
    const [value, setValue] = useState([null, null]);
    const [tableData, setTableData] = useState([]);
    const [patientID, setPatientID] = useState(localStorage.getItem("patient_suid"));
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0); // for pagination
    const [rowsPerPage, setRowsPerPage] = useState(10); // rows per page
    const [openModal, setOpenModal] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfError, setPdfError] = useState(null);
    const [pdfFileType, setPdfFileType] = useState(null);

    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }

    const patient_id = localStorage.getItem("patient_suid");
    const status = "completed";
    const fetchData = async (patient_id, status) => {
        setLoading(true);
        try {
            console.log("Fetching reports for patient:", patient_id, "status:", status);
            // Corrected URL string interpolation
            const response = await axiosInstance.get(
                `/sec/patient/reportsReceived/${patient_id}/${status}`,
            );

            console.log("Reports received response:", response?.data);
            console.log("Reports received data:", response?.data?.response);

            // Handle the response
            setTableData(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setTableData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(patient_id, status); // Pass both patient_id and status to the function
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to page 0 when rows per page is changed
    };

    const currentData = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    // const handleView = (reportPath) => {
    //     if (reportPath) {
    //         // Open the file in a new tab
    //         window.open(reportPath, "_blank");
    //     } else {
    //         console.error("Report path is not available.");
    //     }
    // };
    // Enhanced download handler for different file types
    const handleDownload = (reportPath, fileName = "report") => {
        console.log("Download triggered - reportPath:", reportPath, "fileName:", fileName);
        if (!reportPath) {
            console.error("Report path is not available.");
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
                const link = document.createElement("a");
                link.href = reportPath;
                link.target = "_blank";
                link.download = fileName || "report";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }

            // Handle local file paths (development mode)
            if (reportPath.includes('/uploads/') || reportPath.includes('backend/')) {
                // Extract filename from the path
                const filename = reportPath.split('/').pop();
                const staticUrl = `http://localhost:3000/static/${filename}`;
                
                console.log("Converting local path to static URL:", staticUrl);
                
                const link = document.createElement("a");
                link.href = staticUrl;
                link.target = "_blank";
                link.download = fileName || "report";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }

            // Handle base64 strings without data URL prefix
            if (typeof reportPath === 'string' && reportPath.length > 100) {
                // Assume it's base64 encoded PDF
                const dataUrl = `data:application/pdf;base64,${reportPath}`;
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = fileName || "report";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }

            console.warn("Unknown file format:", reportPath);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    // Enhanced view handler with better error handling
    const handleView = (reportPath) => {
        console.log("View triggered - reportPath:", reportPath);
        if (!reportPath) {
            console.error("Report path is not available.");
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
                console.log("Converting local path to static URL for viewing:", urlToSet);
            } else if (typeof reportPath === 'string' && reportPath.length > 100) {
                // Handle base64 strings without data URL prefix
                urlToSet = `data:application/pdf;base64,${reportPath}`;
                setPdfFileType('base64');
            } else {
                throw new Error("Unknown file format");
            }

            setPdfUrl(urlToSet);
            setOpenModal(true);
        } catch (error) {
            console.error("Error opening file:", error);
            setPdfError(error.message);
            setPdfLoading(false);
        }
    };

    // Enhanced PDF loading handlers
    const onDocumentLoadSuccess = ({ numPages }) => {
        setPdfLoading(false);
        setPdfError(null);
        console.log(`PDF loaded successfully: ${numPages} pages`);
    };

    const onDocumentLoadError = (error) => {
        console.error("PDF loading error:", error);
        setPdfLoading(false);
        setPdfError("Failed to load PDF document");
    };


    return (
        <>
            <Box className="allfile-main-container">
                <Box>
                    <TableContainer component={Paper} style={{ background: "white" }}>
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
                                    // Render "No Data Found" if tableData is empty
                                    <NoAppointmentCard text_one={"No Data Found"} />
                                ) : (
                                    // Render actual data
                                    currentData.map((row) => {
                                        console.log("Row data:", row);
                                        console.log("Report path:", row.report_path);
                                        console.log("Report name:", row.report_name);
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
                                                {`${row?.date?.split("T")[0] || "NA"} | ${row?.tbook_timeime?.split("T")[1]?.split(".")[0] || "NA"
                                                    }`}
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
