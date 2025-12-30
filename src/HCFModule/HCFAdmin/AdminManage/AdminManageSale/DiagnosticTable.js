import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Skeleton,
    Typography,
    TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SaleActivityCard } from "./SaleActivityCard";
import CustomButton from "../../../../components/CustomButton";
import axios from "axios";
import { baseURL } from "../../../../constants/const";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDate, currencysign } from "../../../../constants/const";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback } from "react";

/**
 * DiagnosticTable Component
 * 
 * Displays diagnostic center sale activities in a table format
 * Features:
 * - Paginated diagnostic sales table
 * - Loading skeletons during data fetch
 * - Empty state handling
 * 
 * @component
 */
const DiagnosticTable = () => {
    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const hcf_id = localStorage.getItem('hcfadmin_suid');

    /**
     * Validate HCF admin ID from localStorage
     * SECURITY: Ensures admin ID is present before making API calls
     * 
     * @returns {string|null} HCF admin ID or null if invalid
     */
    const validateHcfAdminId = useCallback(() => {
        const adminId = localStorage.getItem("hcfadmin_suid");

        if (!adminId) {
            logger.warn("⚠️ HCF Admin ID not found in localStorage");
            toastService.warning("HCF Admin ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ HCF Admin ID validated:", adminId);
        return adminId;
    }, []);

    /**
     * Fetch diagnostic sale activities
     * Loads all diagnostic sale activities for the HCF admin
     */
    const fetchData1 = async () => {
        logger.debug("📋 Fetching diagnostic sale activities");
        setLoading(true);
        
        const adminId = validateHcfAdminId();
        if (!adminId) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/sec/hcf/manageSaleDaigActivity/${adminId}`);
            const activities = response?.data?.response || [];
            
            logger.debug("✅ Diagnostic sale activities received", { count: activities.length });
            setData1(activities);
            setError(null);
        } catch (error) {
            logger.error("❌ Error fetching diagnostic sale activities:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load diagnostic sale activities. Please try again.";
            setError(errorMessage);
            toastService.error(errorMessage);
            setData1([]); // Ensure state is an array even on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hcf_id) {
            fetchData1();
        }
    }, [hcf_id]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    return (
        <div style={{ 
            display: "flex",
            flexDirection: "column",
            height: "100%",
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
                    border: "1px solid #e72b4a", borderRadius: "10px", padding: "10px"
                }}
            >
                <Table sx={{ minWidth: 1 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ fontWeight: "bold" }}>
                            <TableCell>Name/ Booking ID</TableCell>
                            <TableCell align="right">Date & Time</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Department</TableCell>
                            <TableCell align="right">Test Name</TableCell>
                            <TableCell align="right">Price</TableCell>
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
                        
                        ) : data1.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                <NoAppointmentCard text_one={"No Data Found"} />
                                </TableCell>
                            </TableRow>
                        ) : (
                            data1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                                <TableRow key={data.suid || index}>
                                    <TableCell component="th" scope="row" align="right">
                                        <SaleActivityCard
                                            profile_picture={data?.profile_picture}
                                            name={`${data?.first_name} ${data?.last_name}`}
                                            user_id={data?.suid}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {formatDate(data?.updated_at)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {data?.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <CustomButton
                                            label={data?.department_name}
                                            isTransaprent
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {data?.test_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {`${currencysign}${data?.test_price}`}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data1.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per page:"
            />
            </TableContainer>
           
        </div>
    );
};

export default DiagnosticTable;
