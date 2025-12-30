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
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { AllDoctorTable } from "./AllDoctorTable";
import pen from "../../../../static/images/DrImages/Pen.svg";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import profile from "../../../../static/images/DrImages/doc1.png";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import Loading from "../../../../components/Loading/Loading"; // Reusable loader component

/**
 * HCFAllDoctors Component
 * 
 * Displays all doctors in the HCF Admin system with department-based filtering
 * Features:
 * - Horizontal scrolling department filter (matches Explore.js pattern)
 * - Paginated doctor table
 * - Toggle doctor active/inactive status
 * - Real-time data updates
 * 
 * Security:
 * - Validates HCF admin ID from localStorage
 * - Uses axiosInstance for automatic token handling
 * - Input validation for status toggle
 * 
 * @component
 */
const HCFAllDoctors = () => {
    const navigate = useNavigate();

    // ============================================
    // State Management
    // ============================================
    
    const [data, setData] = useState([]);
    const [nav_specialization, setNav_spelization] = useState([]);
    const [specializationDoc, setSpecializationDoc] = useState("CARDIOLOGIST");
    const [specializationData, setSpecializationData] = useState([]);
    const [hcf_id] = useState(localStorage.getItem("hcfadmin_suid"));
    const [loading, setLoading] = useState(false);
    const [isTogglingStatus, setIsTogglingStatus] = useState(false); // Loading state for status toggle

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    /**
     * Validate user_id before status toggle
     * SECURITY: Ensures valid user ID before making API call
     * 
     * @param {string|number} user_id - User ID to validate
     * @returns {boolean} True if valid, false otherwise
     */
    const validateUserId = (user_id) => {
        if (!user_id || user_id === "undefined" || user_id === "null") {
            logger.error("❌ Invalid user_id provided:", user_id);
            toastService.error("Invalid user ID. Please try again.");
            return false;
        }
        return true;
    };

    // ============================================
    // API Fetch Functions
    // ============================================

    /**
     * Fetch dashboard doctor details
     * Loads all doctor data for the dashboard overview
     */
    const fetchData = useCallback(async () => {
        logger.debug("📋 Fetching dashboard doctor details");
        
        try {
            const response = await axiosInstance(`/sec/hcf/DashboardDoctordetails`);
            const doctorData = response?.data?.response || [];
            
            logger.debug("✅ Dashboard doctor details received", {
                count: doctorData.length
            });
            
            setData(doctorData);
        } catch (error) {
            logger.error("❌ Failed to fetch dashboard doctor details:", error);
            logger.error("❌ Error response:", error?.response?.data);
            toastService.error(
                error?.response?.data?.message ||
                "Failed to load doctor dashboard data"
            );
            setData([]);
        }
    }, []);

    /**
     * Fetch doctor departments/specializations
     * Loads all available departments for filtering
     */
    const navSpecialization = useCallback(async () => {
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

    /**
     * Fetch doctors by specialization/department
     * Loads doctors filtered by selected department
     * 
     * @param {string} departmentName - Name of the department to filter by
     */
    const fetchSpecializationDetail = useCallback(async (departmentName) => {
        const adminId = validateHcfAdminId();
        if (!adminId) {
            setLoading(false);
            return;
        }

        logger.debug("📋 Fetching doctors by department", { departmentName });
        setLoading(true); // Show loader

        try {
            const resp = await axiosInstance(
                `/sec/hcf/clinicDoctorsByDept/${adminId}/${departmentName}`,
            );
            
            const doctors = resp?.data?.response[`${departmentName}`] || [];
            
            logger.debug("✅ Doctors by department received", {
                department: departmentName,
                count: doctors.length
            });
            
            setSpecializationData(doctors);
        } catch (err) {
            logger.error("❌ Failed to fetch doctors by department:", err);
            logger.error("❌ Error response:", err?.response?.data);
            
            const errorMessage = err?.response?.data?.message ||
                                "Failed to load doctors for this department";
            toastService.error(errorMessage);
            setSpecializationData([]); // Ensure state is an array even on error
        } finally {
            setLoading(false); // Hide loader
        }
    }, [validateHcfAdminId]);

    /**
     * Toggle doctor active/inactive status
     * SECURITY: Validates inputs before making API call
     * 
     * @param {string|number} user_id - Doctor user ID to toggle status for
     */
    const toggleStatus = useCallback(async (user_id) => {
        // SECURITY: Validate inputs
        if (!validateUserId(user_id)) {
            return;
        }

        const adminId = validateHcfAdminId();
        if (!adminId) {
            return;
        }

        logger.debug("🔄 Toggling doctor status:", { user_id });
        setIsTogglingStatus(true); // Show loading state

        try {
            // Determine current status from data
            const currentDoctor = specializationData.find(d => d.user_id === user_id);
            const currentStatus = currentDoctor?.status || "inactive";
            const newStatus = currentStatus === "active" ? "inactive" : "active";

            // Prepare API payload
            const payload = {
                hcf_id: adminId,
                clinic_doctor_id: String(user_id), // Ensure user_id is passed as a string
                status: newStatus === "active" ? "1" : "0", // Convert to API-compatible format
            };

            logger.debug("📤 Sending status toggle request:", payload);

            const response = await axiosInstance.post(
                `/sec/hcf/ActiveDeactiveClinicDoctor`,
                payload
            );

            logger.debug("✅ API Response:", response?.data);

            if (response.status === 200) {
                // Update local state optimistically
                setSpecializationData((prevData) =>
                    prevData.map((doctor) =>
                        doctor.user_id === user_id 
                            ? { ...doctor, status: newStatus } 
                            : doctor
                    ),
                );

                const successMessage = `Doctor has been ${
                    newStatus === "active" ? "activated" : "deactivated"
                } successfully.`;

                logger.info("✅ Status toggled successfully");
                toastService.success(successMessage);
                
                // Refresh data to ensure consistency
                await fetchSpecializationDetail(specializationDoc);
            } else {
                logger.warn("⚠️ Unexpected response status:", response.status);
                toastService.warning("Failed to update status. Please try again.");
            }
        } catch (error) {
            logger.error("❌ Error toggling status:", error);
            logger.error("❌ Error response:", error?.response?.data);
            logger.error("❌ Error status:", error?.response?.status);

            const errorMessage = error?.response?.data?.message ||
                               error?.response?.data?.error ||
                               "An error occurred while updating status. Please check your connection and try again.";

            toastService.error(errorMessage);
        } finally {
            setIsTogglingStatus(false); // Hide loading state
        }
    }, [specializationData, validateHcfAdminId, validateUserId, fetchSpecializationDetail, specializationDoc]);

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
        logger.debug("🔵 HCFAllDoctors component mounting");
        
        // Hide location search container
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
            logger.debug("✅ Location search container hidden");
        }

        // Fetch initial data
        fetchData();
        navSpecialization();

        // Cleanup: restore location search container
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
                logger.debug("🔄 Location search container restored");
            }
        };
    }, [fetchData, navSpecialization]);

    /**
     * Fetch doctors when department selection changes
     */
    useEffect(() => {
        if (specializationDoc) {
            fetchSpecializationDetail(specializationDoc);
        }
    }, [specializationDoc, fetchSpecializationDetail]);

    // ============================================
    // Render
    // ============================================

    return (
        <>
            {/* LOADER: Show loading overlay when toggling status */}
            {isTogglingStatus && (
                <Loading
                    variant="overlay"
                    size="medium"
                    message="Updating Status"
                    subMessage="Please wait while we update the doctor's status..."
                />
            )}

            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "90%",
                    flexDirection: "row",
                }}
            >
                {/* Navigation Bar */}
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/doctor/alldoctors"}>All Doctors</NavLink>
                    <NavLink to={"/hcfadmin/doctor/active"}>Active</NavLink>
                    <NavLink to={"/hcfadmin/doctor/blocked"}>Blocked</NavLink>
                    <CustomButton
                        buttonCss={{ position: "absolute", right: "0", borderRadius: "6.25rem" }}
                        isTransaprent={true}
                        label="Add Doctors"
                        handleClick={() => {
                            logger.debug("➕ Navigating to Add Doctor page");
                            navigate("/hcfadmin/doctor/adddoctor");
                        }}
                    />
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
                                border: "1px solid #E6E1E5",
                                borderRadius: "10px",
                                padding: "10px"
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
                                                    <Skeleton
                                                        variant="rectangular"
                                                        width="100%"
                                                        height={40}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : specializationData.length === 0 ? (
                                        // Empty state: No doctors found
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                <NoAppointmentCard text_one={"No Data Available"} />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        // Display paginated doctor data
                                        specializationData
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage,
                                            )
                                            .map((data) => (
                                                <TableRow
                                                    key={data.suid || data.user_id}
                                                    sx={{
                                                        "&:last-child td, &:last-child th": {
                                                            border: 0,
                                                        },
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <AllDoctorTable
                                                            name={data?.name}
                                                            user_id={data?.user_id}
                                                            profile_picture={
                                                                data?.profile_picture || profile
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data?.department}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        sx={{
                                                            color:
                                                                data?.status === "Active"
                                                                    ? "#E72B4A"
                                                                    : "gray",
                                                        }}
                                                    >
                                                        {data?.status}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <CustomButton
                                                            label={<img src={pen} alt="Toggle Status" />}
                                                            isTransaprent
                                                            handleClick={() =>
                                                                toggleStatus(data?.user_id)
                                                            }
                                                            disabled={isTogglingStatus} // Disable during status toggle
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    )}
                                </TableBody>
                            </Table>
                            
                            {/* Pagination Component */}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={specializationData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HCFAllDoctors;
