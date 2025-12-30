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
    IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { AllDoctorTable } from "../AllDoctors/AllDoctorTable";
import pen from "../../../../static/images/DrImages/Pen.svg";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback

/**
 * HCFDoctorBlocked Component
 * 
 * Displays blocked doctors in the HCF Admin system with department-based filtering
 * Features:
 * - Horizontal scrolling department filter (matches Explore.js pattern)
 * - Paginated doctor table
 * - View-only status (doctors are already blocked)
 * 
 * Security:
 * - Validates HCF admin ID from localStorage
 * - Uses axiosInstance for automatic token handling
 * 
 * @component
 */
const HCFDoctorBlocked = () => {
    // ============================================
    // State Management
    // ============================================
    
    const [hcf_id] = useState(localStorage.getItem("hcfadmin_suid"));
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [nav_specialization, setNav_spelization] = useState([]);
    const [specializationDoc, setSpecializationDoc] = useState("CARDIOLOGIST");
    const [loading, setLoading] = useState(false);

    // Scroll container ref for horizontal scrolling
    const scrollContainerRef = useRef(null);

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
     * Fetch blocked doctors by department
     * Loads blocked doctors filtered by selected department
     * Status parameter: 0 = Blocked, 1 = Active
     * 
     * @param {string} departmentName - Name of the department to filter by
     */
    const fetchData = useCallback(async (departmentName) => {
        const adminId = validateHcfAdminId();
        if (!adminId) {
            setLoading(false);
            return;
        }

        logger.debug("📋 Fetching blocked doctors by department", { departmentName });
        setLoading(true); // Show loader

        try {
            // Fetch blocked doctors (status = 0)
            const response = await axiosInstance.get(
                `/sec/hcf/ActiveBlockedClinicDoctors/0/${adminId}/${departmentName}`
            );
            
            const doctors = response?.data?.response || [];
            
            logger.debug("✅ Blocked doctors received", {
                department: departmentName,
                count: doctors.length
            });
            
            setData(doctors);
        } catch (error) {
            logger.error("❌ Failed to fetch blocked doctors:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load blocked doctors";
            toastService.error(errorMessage);
            setData([]);
        } finally {
            setLoading(false); // Hide loader
        }
    }, [validateHcfAdminId]);

    /**
     * Fetch doctor departments/specializations
     * Loads all available departments for filtering
     */
    const navSpecializtion = useCallback(async () => {
        logger.debug("📋 Fetching doctor departments");
        
        try {
            const resp = await axiosInstance(`/sec/patient/doctorDepartments`);
            const departments = resp?.data?.response || [];
            
            logger.debug("✅ Doctor departments received", {
                count: departments.length
            });
            
            setNav_spelization(departments);
        } catch (err) {
            logger.error("❌ Failed to fetch doctor departments:", err);
            logger.error("❌ Error response:", err?.response?.data);
            toastService.error("Failed to load departments");
            setNav_spelization([]);
        }
    }, []);

    // ============================================
    // Scroll Handlers
    // ============================================

    /**
     * Handle horizontal scroll left
     * Scrolls the department buttons container to the left
     * Uses same pattern as HorizontalScrollCards component from Explore.js
     */
    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const targetScroll = currentScroll - scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    /**
     * Handle horizontal scroll right
     * Scrolls the department buttons container to the right
     * Uses same pattern as HorizontalScrollCards component from Explore.js
     */
    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const targetScroll = currentScroll + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    // ============================================
    // Pagination Handlers
    // ============================================

    /**
     * Handle pagination page change
     * 
     * @param {Event} event - Change event
     * @param {number} newPage - New page number (0-indexed)
     */
    const handleChangePage = (event, newPage) => {
        logger.debug("📄 Page changed:", { from: page, to: newPage });
        setPage(newPage);
    };

    /**
     * Handle rows per page change
     * 
     * @param {Event} event - Change event
     */
    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        logger.debug("📄 Rows per page changed:", { from: rowsPerPage, to: newRowsPerPage });
        setRowsPerPage(newRowsPerPage);
        setPage(0); // Reset to first page
    };

    // ============================================
    // useEffect Hooks
    // ============================================

    /**
     * Initialize component on mount
     * Hides location search container and fetches initial data
     */
    useEffect(() => {
        logger.debug("🔵 HCFDoctorBlocked component mounting");
        
        // Hide location search container
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }

        // Fetch initial data
        navSpecializtion();

        // Cleanup: restore location search container
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
                logger.debug("🔄 Location search container restored");
            }
        };
    }, [navSpecializtion]);

    /**
     * Fetch blocked doctors when department selection changes
     */
    useEffect(() => {
        if (specializationDoc) {
            fetchData(specializationDoc);
        }
    }, [specializationDoc, fetchData]);

    // ============================================
    // Render
    // ============================================

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
                {/* Navigation Bar */}
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/doctor/alldoctors"}>All Doctors</NavLink>
                    <NavLink to={"/hcfadmin/doctor/active"}>Active</NavLink>
                    <NavLink to={"/hcfadmin/doctor/blocked"}>Blocked</NavLink>
                </nav>

                {/* Main Content Area */}
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
                        {/* Department Filter Section - Horizontal scroll */}
                        <Box sx={{ flexShrink: 0, marginBottom: "1rem", width: "100%", position: "relative" }}>
                            <Box 
                                sx={{ 
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                                className="department-scroll-container"
                            >
                                {/* Left scroll button - positioned absolutely */}
                                <IconButton 
                                    onClick={handleScrollLeft}
                                    sx={{
                                        position: "absolute",
                                        left: "-20px",
                                        zIndex: 2,
                                        background: "white !important",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1) !important",
                                        border: "1px solid #e0e0e0 !important",
                                        width: "40px !important",
                                        height: "40px !important",
                                        transition: "all 0.3s ease !important",
                                        "&:hover": {
                                            background: "#f5f5f5 !important",
                                            transform: "scale(1.05)",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "#E82B4A !important",
                                            fontSize: "20px !important",
                                        },
                                    }}
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                                
                                {/* Scrollable wrapper - matches cards-wrapper pattern */}
                                <Box
                                    ref={scrollContainerRef}
                                    sx={{ 
                                        flex: 1,
                                        overflowX: "auto",
                                        overflowY: "hidden",
                                        scrollbarWidth: "none", // Firefox
                                        msOverflowStyle: "none", // IE/Edge
                                        "&::-webkit-scrollbar": {
                                            display: "none", // Chrome, Safari, Opera
                                        },
                                        WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
                                    }}
                                    className="department-scroll-wrapper"
                                >
                                    {/* Cards container - matches cards-container pattern with min-width: max-content */}
                                    <Box
                                        sx={{ 
                                            display: "flex",
                                            gap: "0.75rem",
                                            padding: "0.5rem 20px",
                                            minWidth: "max-content", // CRITICAL: Prevents wrapping, forces horizontal scroll
                                        }}
                                        className="department-buttons-container"
                                    >
                                        {nav_specialization.map((specialization, index) => (
                                            <CustomButton
                                                key={index}
                                                label={`${specialization?.department_name}`}
                                                isTransaprent={
                                                    specialization.department_name.toLowerCase() !==
                                                    specializationDoc.toLowerCase()
                                                }
                                                buttonCss={{
                                                    borderRadius: "50px",
                                                    padding: "0.5rem 1.5rem",
                                                    whiteSpace: "nowrap",
                                                    fontSize: "0.875rem",
                                                    fontFamily: "Poppins",
                                                    fontWeight: "500",
                                                    flexShrink: 0, // Prevent buttons from shrinking
                                                }}
                                                handleClick={() => {
                                                    logger.debug("🏥 Department selected:", specialization?.department_name);
                                                    setSpecializationDoc(specialization?.department_name);
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                                
                                {/* Right scroll button - positioned absolutely */}
                                <IconButton 
                                    onClick={handleScrollRight}
                                    sx={{
                                        position: "absolute",
                                        right: "-20px",
                                        zIndex: 2,
                                        background: "white !important",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1) !important",
                                        border: "1px solid #e0e0e0 !important",
                                        width: "40px !important",
                                        height: "40px !important",
                                        transition: "all 0.3s ease !important",
                                        "&:hover": {
                                            background: "#f5f5f5 !important",
                                            transform: "scale(1.05)",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "#E82B4A !important",
                                            fontSize: "20px !important",
                                        },
                                    }}
                                    aria-label="Scroll right"
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            </Box>
                        </Box>

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
                                maxHeight: "calc(100vh - 350px)", // Adjusted to account for navbar, category filters, and spacing
                            }}
                        >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name & Details</TableCell>
                                        <TableCell align="right">Department</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* LOADER: Show skeleton loaders while fetching data */}
                                    {loading ? (
                                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell colSpan={4} align="center">
                                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : data.length === 0 ? (
                                        // Empty state: No blocked doctors found
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                <NoAppointmentCard text_one={"No Data Available"} />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        // Display paginated blocked doctor data
                                        data
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => (
                                                <TableRow
                                                    key={row.doctor_id || row.suid} // Ensure uniqueness
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <AllDoctorTable 
                                                            name={row.first_name} 
                                                            user_id={row.suid} 
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">{row.department_name}</TableCell>
                                                    <TableCell align="right">
                                                        <CustomButton
                                                            isDisabled={true}
                                                            label={row.clinic_status === 1 ? "Active" : "Blocked"}
                                                            isTransaprent
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <CustomButton 
                                                            label={<img src={pen} alt="Edit" />} 
                                                            isTransaprent 
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    )}
                                </TableBody>
                            </Table>
                            
                            {/* Pagination Component */}
                            <TablePagination
                                component="div"
                                count={data.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 25]} // Adjust the options as needed
                            />
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HCFDoctorBlocked;
