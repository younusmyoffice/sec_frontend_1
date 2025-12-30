import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Skeleton,
    Typography,
    TablePagination,
    colors,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchBox from "../../../../components/searchbox/SearchBox";
import { baseURL } from "../../../../constants/const";
import { AuditCards } from "../../../DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDate } from "../../../../constants/const";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback } from "react";


const getStatusLabel = (status) => {
    return status === 1 ? "Active" : "Inactive";
};

/**
 * AdminManageAuditLog Component
 * 
 * Displays audit logs for HCF Admin
 * Features:
 * - Paginated audit log table
 * - Loading skeletons during data fetch
 * - Empty state handling
 * - Sorted by timestamp (newest first)
 * 
 * @component
 */
const AdminManageAuditLog = () => {
    const [data, setData] = useState([]);
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
     * Initialize component - set localStorage and hide location search container
     */
    useEffect(() => {
        logger.debug("🔵 AdminManageAuditLog component rendering");
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "hcfadminauditlog");
        
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }
        
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
                logger.debug("🔄 Location search container restored");
            }
        };
    }, []);

    /**
     * Fetch audit logs
     * Loads all audit logs for the HCF admin, sorted by timestamp (newest first)
     * 
     * @param {string} hcf_id - HCF admin ID
     */
    const fetchData = async (hcf_id) => {
        logger.debug("📋 Fetching audit logs");
        setLoading(true);
        
        const adminId = validateHcfAdminId();
        if (!adminId) {
            setLoading(false);
            return;
        }

        try {
            // Fixed: Added leading slash to endpoint
            const response = await axiosInstance.get(`/sec/hcf/HcfAuditlogs/${adminId}`);
            const fetchedData = response?.data?.response || [];

            // Sort the data by timestamp in descending order (newest first)
            const sortedData = fetchedData.sort((a, b) => new Date(b.time) - new Date(a.time));
    
            logger.debug("✅ Audit logs received", { count: sortedData.length });
            setData(sortedData);
            setError(null);
        } catch (error) {
            logger.error("❌ Error fetching audit logs:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load audit logs. Please try again.";
            setError(errorMessage);
            toastService.error(errorMessage);
            setData([]); // Ensure state is an array even on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(hcf_id);
    }, [hcf_id]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when rows per page changes
    };

    const cellStyle = {
        color: "#939094",
        textAlign: "right",
        fontFamily: "Poppins",
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "0.9375rem",
        letterSpacing: "0.005rem",
    };
    const actionidStyle = {
        color: "#E72B4A",
        textAlign: "right",
        fontFamily: "Poppins",
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "0.9375rem",
        letterSpacing: "0.005rem",
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "90%",
                    flexDirection: "row",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminsale"}>Sale Activities</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminoverview"}>Overview</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminbooking"}>Bookings</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminpayout"}>Payout</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminauditlog"}>Audit Logs</NavLink>
                </nav>

                <Box
                    component={"div"}
                    sx={{ 
                        flex: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        overflow: "hidden",
                        marginTop: "4em",
                    }}
                >
                    {/* <Box sx={{ display: "flex", marginBottom: "1em" }}>
                        <SearchBox />
                    </Box> */}

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
                            maxHeight: "calc(100vh - 250px)", // Adjusted to account for navbar and spacing
                            border: "1px solid #e72b4a", borderRadius: "10px", padding: "10px"
                        }}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name & Details</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action ID</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                    <TableCell align="right">Timestamp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {loading ? (
                                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell colSpan={5} align="center">
                                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <NoAppointmentCard text_one={"No Data Found"} />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <AuditCards name={row.name} specialist={row.specialist} Id={row.user_id} />
                                            </TableCell>
                                            <TableCell align="right" sx={cellStyle}>
                                                {getStatusLabel(row.status)}
                                            </TableCell>
                                            <TableCell align="right" sx={actionidStyle}>
                                                {row.action_id}
                                            </TableCell>
                                            <TableCell align="right" sx={cellStyle}>
                                                {row.action}
                                            </TableCell>
                                            <TableCell align="right" sx={cellStyle}>
                                                {formatDate(row.time)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
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

export default AdminManageAuditLog;
