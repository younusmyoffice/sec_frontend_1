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
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const Shared = () => {
    const [value, setValue] = useState([null, null]);
    const [tableData, setTableData] = useState([]);
    const [patientID, setPatientID] = React.useState(localStorage.getItem("patient_suid"));
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }

    useEffect(() => {
        // for active component path
        localStorage.setItem("activeComponent", "dashboard");
    }, []);

    const patient_id = localStorage.getItem("patient_suid");
    const fetchData = async (patient_id) => {
        setLoading(true);
        try {
            // Corrected URL string interpolation
            const response = await axiosInstance.get(`/sec/patient/reportsShared/${patient_id}`);

            // Handle the response
            setTableData(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(patient_id); // Pass both patient_id and status to the function
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                <TableContainer component={Paper} style={{ background: "white" }}>
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
                                // Render actual data
                                displayedData.map((row) => (
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
                                                      "No Time"
                                                  }`
                                                : "No Date"}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            onClick={() => {
                                                if (row?.report_path) {
                                                    const link = document.createElement("a");
                                                    link.href = row.report_path;
                                                    link.download = row.report_name || "report"; // Default filename if `report_name` is not available
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                } else {
                                                    alert("Report not available for download.");
                                                }
                                            }}
                                            sx={{
                                                cursor: row?.report_path
                                                    ? "pointer"
                                                    : "not-allowed", // Change cursor to pointer if a report is available
                                                color: row?.report_path ? "black" : "gray", // Optional: Indicate if the report is available visually
                                                textDecoration: row?.report_path
                                                    ? "none"
                                                    : "none",
                                            }}
                                        >
                                            {row?.report_name || "No Report"}
                                        </TableCell>

                                        <TableCell align="right">
                                            {row?.category || "No Category"}
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
                
            </Box>
        </>
    );
};

export default Shared;
