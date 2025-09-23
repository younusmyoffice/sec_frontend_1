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
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { PatientSearchTable } from "../../../../HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticPatientSearch/PatientSearchTable";
import { currencysign } from "../../../../constants/const";
import "./allfiles.scss";

const AllFiles = () => {
    const [value, setValue] = useState([null, null]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }

    const patient_id = localStorage.getItem("patient_suid");
    const status = "requested";
    const fetchData = async (patient_id, status) => {
        setLoading(true);
        try {
            // Corrected URL string interpolation
            const response = await axiosInstance.get(
                `/sec/patient/reportsRequested/${patient_id}/${status}`,
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
        setPage(0);
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
                <Box>
                    <TableContainer component={Paper} style={{ background: "white" }}>
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
                                    Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell colSpan={5}>
                                                <Skeleton variant="rectangular" height={40} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : tableData.length === 0 ? (
                                    <TableRow>
                                        <NoAppointmentCard text_one={"No Data Found"} />
                                    </TableRow>
                                ) : (
                                    tableData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow
                                                key={row?.labID || index}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell>
                                                    <PatientSearchTable
                                                        profile={row?.profile_picture}
                                                        name={row?.lab_name}
                                                        Id={row?.booking_id}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row?.book_date}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row?.scheduled}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row?.test_name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {`${currencysign}${row?.test_price || "NA"}`}
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
