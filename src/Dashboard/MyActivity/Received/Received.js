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
const Received = () => {
    const [value, setValue] = useState([null, null]);
    const [tableData, setTableData] = useState([]);
    const [patientID, setPatientID] = useState(localStorage.getItem("patient_suid"));
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0); // for pagination
    const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page
    const [openModal, setOpenModal] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }

    const patient_id = localStorage.getItem("patient_suid");
    const status = "completed";
    const fetchData = async (patient_id, status) => {
        setLoading(true);
        try {
            // Corrected URL string interpolation
            const response = await axiosInstance.get(
                `/sec/patient/reportsReceived/${patient_id}/${status}`,
            );

            // Handle the response
            setTableData(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching data:", error);
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
    const handleDownload = (reportPath) => {
        if (reportPath) {
            // Trigger a download
            const link = document.createElement("a");
            link.href = reportPath;
            link.download = "report"; // Optional: Specify a filename
            link.click();
        } else {
            console.error("Report path is not available.");
        }
    };
    const handleView = (reportPath) => {
        if (reportPath) {
            setPdfUrl(reportPath);
            setOpenModal(true);
        } else {
            console.error("Report path is not available.");
        }
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
                                    currentData.map((row) => (
                                        <TableRow
                                            key={row?.BookingID}
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
                                                    onClick={() => handleView(row.report_path)} // Pass the report_path to the handler
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>

                                                {/* Download Icon */}
                                                <IconButton
                                                    sx={{ color: "#E72B4A" }}
                                                    aria-label="download"
                                                    onClick={() => handleDownload(row.report_path)} // Pass the report_path to the handler
                                                >
                                                    <FileDownloadIcon />
                                                </IconButton>
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
                        />
                    </TableContainer>
                    <CustomModal isOpen={openModal} conditionOpen={setOpenModal}>
                        <Box
                            sx={{
                                width: "870px",
                                height: "80vh",
                                backgroundColor: "white",
                                padding: 2,
                                overflow: "auto",
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Report Viewer
                            </Typography>
                            {pdfUrl ? (
                                <Document file={pdfUrl} onLoadError={console.error}>
                                    <Page pageNumber={1} width={800} />
                                </Document>
                            ) : (
                                <Typography>No PDF available</Typography>
                            )}
                        </Box>
                    </CustomModal>
                </Box>
            </Box>
        </>
    );
};

export default Received;
