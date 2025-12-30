import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    CircularProgress,
    Skeleton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomButton from "../../../../components/CustomButton";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import CustomSnackBar from "../../../../components/CustomSnackBar";
import DiagnostCenterTableCard from "../DiagnosticCenterChat/DiagnostCenterTableCard";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback } from "react";

const RecievedTables = () => {
    const [cardData, setCardData] = useState([]);
    const [staff_id] = useState(localStorage.getItem('diagnostic_suid'));
    const [isopen, setIsopen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("Appointment Accepted");
    const [snackStatus, setSnackStatus] = useState("");
    const [loading, setLoading] = useState(true);
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
     * Fetch test requests
     * Loads all test requests for the diagnostic center
     */
    const fetchData = async () => {
        logger.debug("📋 Fetching test requests");
        setLoading(true);
        
        const staffId = validateStaffId();
        if (!staffId) {
            setLoading(false);
            return;
        }

        try {
            const resp = await axiosInstance.get(`/sec/hcf/testRequests/${staffId}`);
            const requests = resp?.data?.response || [];
            
            logger.debug("✅ Test requests received", { count: requests.length });
            setCardData(requests);
        } catch (err) {
            logger.error("❌ Error fetching test requests:", err);
            logger.error("❌ Error response:", err?.response?.data);
            toastService.error("Failed to load test requests");
            setCardData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isopen]);

    /**
     * Accept test request
     * Accepts a test request and updates its status
     * 
     * @param {string} testID - Test ID
     * @param {string} staffID - Staff ID
     */
    const AcceptData = async (testID, staffID) => {
        logger.debug("✅ Accepting test request", { testID, staffID });
        setIsopen(false);
        
        const staffId = validateStaffId();
        if (!staffId || !testID) {
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/testRequestsAccept`,
                JSON.stringify({
                    test_id: String(testID),
                    staff_id: String(staffId)
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Test request accepted successfully", { response: response?.data });
            
            const successMessage = response?.data?.message || "Accepted Successfully";
            setSnackMessage(successMessage);
            setSnackStatus("success");
            setIsopen(true);
            toastService.success(successMessage);
            
            fetchData(); // Refresh data after acceptance
        } catch (err) {
            logger.error("❌ Error accepting test request:", err);
            logger.error("❌ Error response:", err?.response?.data);
            
            const errorMessage = err?.response?.data?.message ||
                                "Failed to accept test request. Please try again.";
            
            setSnackMessage(errorMessage);
            setSnackStatus("error");
            setIsopen(true);
            toastService.error(errorMessage);
        }
    };

    /**
     * Reject test request
     * Rejects a test request and updates its status
     * 
     * @param {string} testID - Test ID
     * @param {string} staffID - Staff ID
     */
    const RejectData = async (testID, staffID) => {
        logger.debug("❌ Rejecting test request", { testID, staffID });
        setIsopen(false);
        
        const staffId = validateStaffId();
        if (!staffId || !testID) {
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/testRequestReject`,
                JSON.stringify({
                    test_id: String(testID),
                    staff_id: String(staffId)
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Test request rejected successfully", { response: response?.data });
            
            const successMessage = response?.data?.message || "Rejected Successfully";
            setSnackMessage(successMessage);
            setSnackStatus("success");
            setIsopen(true);
            toastService.success(successMessage);
            
            fetchData(); // Refresh data after rejection
        } catch (err) {
            logger.error("❌ Error rejecting test request:", err);
            logger.error("❌ Error response:", err?.response?.data);
            
            const errorMessage = err?.response?.data?.message ||
                                "Failed to reject test request. Please try again.";
            
            setSnackMessage(errorMessage);
            setSnackStatus("error");
            setIsopen(true);
            toastService.error(errorMessage);
        }
    };

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} style={{ background: "white" }}>
            <CustomSnackBar isOpen={isopen} message={snackMessage} type={snackStatus} />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name & Booking ID</TableCell>
                        <TableCell align="right">Date </TableCell>
                        <TableCell align="right">Schedule</TableCell>
                        <TableCell align="right">Test name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from({ length: rowsPerPage }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={6} align="center">
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : cardData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                <NoAppointmentCard text_one="No Data Found" />
                            </TableCell>
                        </TableRow>
                    ) : (
                        cardData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((data) => (
                                <TableRow
                                    key={data?.suid}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">
                                    <DiagnostCenterTableCard id={data?.test_id} name= {`${data?.first_name} ${data?.middle_name} ${data?.last_name}`} profile={data?.profile_picture}/>
                                       
                                    </TableCell>
                                    <TableCell align="right">{data?.book_date} </TableCell>
                                    <TableCell align="right">{data?.status}</TableCell>
                                    <TableCell align="right">{data?.test_name}</TableCell>
                                    <TableCell align="right">₹{data?.test_price}</TableCell>
                                    <TableCell align="center">
                                        <CustomButton 
                                            handleClick={() => AcceptData(data?.test_id, staff_id)} 
                                            buttonCss={{ borderRadius: "2em" }} 
                                            isTransaprent={true} 
                                            label="Accept" 
                                        /> 
                                        <CustomButton 
                                            handleClick={() => RejectData(data?.test_id, staff_id)}  
                                            buttonCss={{ borderRadius: "2em" }} 
                                            isTransaprent={true} 
                                            label="Reject" 
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cardData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default RecievedTables;
