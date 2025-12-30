import {
    Box,
    Stack,
    Typography,
    Skeleton,
    TablePagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import DiagnostCenterTableCard from "../DiagnosticCenterChat/DiagnostCenterTableCard";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback } from "react";

const DiagnosticPatientShared = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [staff_id] = useState(localStorage.getItem("diagnostic_suid"));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    /**
     * Validate Diagnostic staff ID from localStorage
     * SECURITY: Ensures staff ID is present before making API calls
     * 
     * @returns {string|null} Staff ID or null if invalid
     */
    const validateStaffId = useCallback(() => {
        const staffId = localStorage.getItem("diagnostic_suid");

        if (!staffId) {
            logger.warn("⚠️ Diagnostic staff ID not found in localStorage");
            toastService.warning("Staff ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ Diagnostic staff ID validated:", staffId);
        return staffId;
    }, []);

    /**
     * Fetch examined tests
     * Loads all examined tests for the diagnostic center
     */
    const fetchData = async () => {
        logger.debug("📋 Fetching examined tests");
        setLoading(true);
        
        const staffId = validateStaffId();
        if (!staffId) {
            setLoading(false);
            return;
        }

        try {
            const resp = await axiosInstance.get(`/sec/hcf/testExamined/${staffId}`);
            const data = resp?.data?.response;

            // Check if response is an array, otherwise set to empty array
            if (Array.isArray(data)) {
                logger.debug("✅ Examined tests received", { count: data.length });
                setCardData(data);
            } else {
                logger.debug("⚠️ No examined tests found or invalid response format");
                setCardData([]);
            }
        } catch (err) {
            logger.error("❌ Error fetching examined tests:", err);
            logger.error("❌ Error response:", err?.response?.data);
            toastService.error("Failed to load examined tests");
            setCardData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const memoizedCardData = useMemo(() => {
        return cardData.map((data) => ({
            id: data?.test_id,
            name: `${data?.first_name} ${data?.middle_name }${data?.last_name}`,
            bookDate: data?.book_date || "N/A",
            testName: `${data?.test_name || "N/A"} | ₹${data?.test_price}`,
            profile_picture: data?.profile_picture || " ",

        }));
    }, [cardData]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to="/diagnostCenterDashboard/diagnosticCenterReports/request">
                        Request
                    </NavLink>
                    <NavLink to="/diagnostCenterDashboard/diagnosticCenterReports/examination">
                        Examination
                    </NavLink>
                    <NavLink to="/diagnostCenterDashboard/diagnosticCenterReports/report">
                        Report
                    </NavLink>
                    {/* <NavLink to="/diagnostCenterDashboard/diagnosticCenterReports/Chart">
                        Chart
                    </NavLink> */}
                </nav>
                <Box sx={{ position: "relative", top: "4em", width: "100%" }}>
                    <div className="search-date">
                        {/* <Box
                            display={"flex"}
                            margin={"10px"}
                            flexWrap={"wrap"}
                            border={1}
                            borderColor="#AEAAAE"
                            borderRadius={"25px"}
                            width={"50em"}
                            height="38px"
                            backgroundColor="#E6E1E5"
                        >
                            <Stack direction="row" alignItems="center" gap={1} padding={"10px"}>
                                <SearchIcon sx={{ color: "#AEAAAE" }} />
                                <Typography variant="body1" sx={{ color: "#AEAAAE" }}>
                                    Search Patient Name / ID
                                </Typography>
                            </Stack>
                        </Box> */}
                    </div>
                    <Typography variant="h6" sx={{ textAlign: "left", mt: 2 }}>
                        Examination List
                    </Typography>
                    <TableContainer component={Paper} style={{ background: "white", marginTop: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="examination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name / Booking ID</TableCell>
                                    <TableCell align="right">Date & Time</TableCell>
                                    <TableCell align="right">Schedule</TableCell>
                                    <TableCell align="right">Test Name/Price</TableCell>
                                    <TableCell align="right">Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                   Array.from(new Array(rowsPerPage)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell colSpan={6} align="center">
                                            <Skeleton variant="rectangular" width="100%" height={40} />
                                        </TableCell>
                                    </TableRow>
                                   ))
                                ) : memoizedCardData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <NoAppointmentCard text_one="No Data Found" />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    memoizedCardData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((data) => (
                                            <TableRow key={data.id}>
                                                <TableCell>
                                                <DiagnostCenterTableCard id={data?.id} name={data?.name} profile={data?.profile_picture}/>
                                                </TableCell>
                                                <TableCell align="right">{data.bookDate}</TableCell>
                                                <TableCell align="right">{data.bookDate}</TableCell>
                                                <TableCell align="right">{data.testName}</TableCell>
                                                <TableCell align="right">{data.status}</TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={memoizedCardData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default DiagnosticPatientShared;
