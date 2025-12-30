import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Skeleton,
    Typography,
} from "@mui/material";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import pen from "../../../../static/images/DrImages/Pen.svg";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { Testlist } from "../AdminLabs/AdminLabDetails/Testlist";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback

/**
 * AdminBlocked Component
 * 
 * Displays list of blocked staff members in the diagnostic center
 * Features:
 * - Scrollable table with pagination
 * - Staff details (name, title, department, status)
 * - Edit action buttons
 * 
 * Security:
 * - Validates HCF admin ID from localStorage
 * - Uses axiosInstance for automatic token handling
 * 
 * @component
 */
const AdminBlocked = () => {
    // ============================================
    // State Management
    // ============================================
    
    const [data1, setData1] = useState([]); // Data for the table
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [loading, setLoading] = useState(true); // Loading state
    const hcf_id = localStorage.getItem("hcfadmin_suid");

    // ============================================
    // Security & Validation Functions
    // ============================================

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

    // ============================================
    // API Fetch Functions
    // ============================================

    /**
     * Fetch blocked staff list from API
     * Loads all blocked staff members for the diagnostic center
     * 
     * @param {string} hcf_id - HCF admin ID
     */
    const fetchData1 = useCallback(async (hcf_id) => {
        const adminId = validateHcfAdminId();
        if (!adminId) {
            setLoading(false);
            return;
        }

        logger.debug("📋 Fetching blocked staff list");
        setLoading(true); // Set loading to true
        
        try {
            const response = await axiosInstance.get(`/sec/hcf/getHcfStaff/${adminId}/blocked`);
            const blockedStaff = response?.data?.response || [];
            
            logger.debug("✅ Blocked staff list received", { count: blockedStaff.length });
            setData1(blockedStaff);
        } catch (error) {
            logger.error("❌ Error fetching blocked staff data:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load blocked staff list";
            toastService.error(errorMessage);
            setData1([]); // Ensure state is an array even on error
        } finally {
            setLoading(false); // Set loading to false
        }
    }, [validateHcfAdminId]);

    // ============================================
    // Effects
    // ============================================

    /**
     * Fetch blocked staff data on component mount
     * Triggers API call when component loads or hcf_id changes
     */
    useEffect(() => {
        logger.debug("🔵 AdminBlocked component initializing");
        
        // Hide location search container on load
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }

        // Fetch blocked staff data
        if (hcf_id) {
            fetchData1(hcf_id);
        }

        // Cleanup: restore location search container when component unmounts
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
                logger.debug("🔄 Location search container restored");
            }
        };
    }, [hcf_id, fetchData1]);

    const navigate = useNavigate();

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "100%",
                    flexDirection: "row",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/diagnosticcenter/labs"}>Labs</NavLink>
                    <NavLink to={"/hcfadmin/diagnosticcenter/staff"}>Staff</NavLink>
                    <NavLink to={"/hcfadmin/diagnosticcenter/blocked"}>Blocked</NavLink>
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
                    <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
                        <div className="" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
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
                                <Table sx={{ minWidth: 1 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow style={{ fontWeight: "bold" }}>
                                            <TableCell>Name & Details</TableCell>
                                            <TableCell align="right">Title</TableCell>
                                            <TableCell align="right">Department</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell align="right">Action</TableCell>
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
                                        ) : data1.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">
                                                    <NoAppointmentCard text_one={"No Data Found"} />
                                                    {/* If NoAppointmentCard doesn't exist, replace with this */}
                                                    {/* <Typography>No Data Found</Typography> */}
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            data1
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage + rowsPerPage,
                                                )
                                                .map((row) => (
                                                    <TableRow
                                                        key={row.first_name}
                                                        sx={{
                                                            "&:last-child td, &:last-child th": {
                                                                border: 0,
                                                            },
                                                        }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <Testlist
                                                                name={`${row.first_name}`}
                                                                staff_id={`${row.staff_id}`}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography
                                                                style={{
                                                                    color: "#939094",
                                                                    fontFamily: "Poppins",
                                                                }}
                                                            >
                                                                {row.hcf_diag_name}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography
                                                                style={{
                                                                    color: "#939094",
                                                                    fontFamily: "Poppins",
                                                                }}
                                                            >
                                                                {row.lab_department_name}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <CustomButton
                                                                buttonCss={{
                                                                    borderRadius: "6.25rem",
                                                                }}
                                                                isDisabled={row.diag_status !== 1} // Disable the button if lab_status is not 1 (Inactive)
                                                                label={
                                                                    row.diag_status === 1
                                                                        ? "Active"
                                                                        : "Blocked"
                                                                }
                                                                isTransaprent
                                                            />{" "}
                                                        </TableCell>{" "}
                                                        <TableCell align="right">
                                                            <CustomButton
                                                                buttonCss={{
                                                                    borderRadius: "6.25rem",
                                                                }}
                                                                label={<img src={pen} alt="Edit" />}
                                                                isTransaprent
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                        )}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    count={data1.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelRowsPerPage="Rows per page"
                                />
                            </TableContainer>
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdminBlocked;
