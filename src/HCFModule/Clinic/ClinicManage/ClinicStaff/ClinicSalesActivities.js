import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import "./clinicstaff.scss";
import Docpic from "../../../../static/images/DrImages/image4.jpg";
import { formatDate, currencysign } from "../../../../constants/const";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback } from "react";

const ClinicSalesActivities = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "clinicsalesactivities");
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const doctor_id = localStorage.getItem("clinic_suid");

    /**
     * Validate Clinic ID from localStorage
     * SECURITY: Ensures clinic ID is present before making API calls
     * 
     * @returns {string|null} Clinic ID or null if invalid
     */
    const validateClinicId = useCallback(() => {
        const clinicId = localStorage.getItem("clinic_suid");

        if (!clinicId) {
            logger.warn("⚠️ Clinic ID not found in localStorage");
            toastService.warning("Clinic ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ Clinic ID validated:", clinicId);
        return clinicId;
    }, []);

    /**
     * Fetch clinic sales activities
     * Loads all sales activities for the clinic
     * 
     * @param {string} doctor_id - Clinic ID
     */
    const fetchData1 = async (doctor_id) => {
        logger.debug("📋 Fetching clinic sales activities");
        setLoading(true);
        
        const clinicId = validateClinicId();
        if (!clinicId) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/sec/hcf/${clinicId}/clinicSaleActivity`);
            const activities = response?.data?.response || [];
            
            logger.debug("✅ Clinic sales activities received", { count: activities.length });
            setData1(activities);
            setError(null);
        } catch (error) {
            logger.error("❌ Error fetching sales activities:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load sales activities. Please try again.";
            
            setError(errorMessage);
            toastService.error(errorMessage);
            setData1([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData1(doctor_id);
    }, [doctor_id]);

    const [allChecked, setAllChecked] = useState(true);
    const [completedChecked, setCompletedChecked] = useState(false);
    const [cancelledChecked, setCancelledChecked] = useState(false);
    const [bookedChecked, setBookedChecked] = useState(false);

    const handleCheckBoxChange = (checkboxType) => {
        if (checkboxType === "all") {
            setAllChecked(true);
            setCompletedChecked(false);
            setCancelledChecked(false);
            setBookedChecked(false);
        } else if (checkboxType === "completed") {
            setAllChecked(false);
            setCompletedChecked(true);
            setCancelledChecked(false);
            setBookedChecked(false);
        } else if (checkboxType === "booked") {
            setAllChecked(false);
            setCompletedChecked(false);
            setCancelledChecked(false);
            setBookedChecked(true);
        } else if (checkboxType === "cancelled") {
            setAllChecked(false);
            setCompletedChecked(false);
            setCancelledChecked(true);
            setBookedChecked(false);
        }
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filter data based on selected checkboxes
    const filteredData = () => {
        if (allChecked) {
            return data1;
        }
        if (completedChecked) {
            return data1.filter((item) => item?.status === "completed");
        }
        if (bookedChecked) {
            return data1.filter((item) => item?.status === "booked");
        }
        if (cancelledChecked) {
            return data1.filter((item) => item?.status === "Cancelled");
        }
        return data1;
    };

    const paginatedData = filteredData().slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    return (
        <>
            <div className="sales-container">
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/clinicDashboard/clinicmanage/clinicsalesactivities"}>
                        Sales Activities
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmanage/clinicauditlog"}>
                        Audit Logs
                    </NavLink>
                </nav>
            </div>

            <div className="checkboxes-from-to">
                <div className="check-box">
                    <div className="check-all">
                        <CustomCheckBox
                            checked={allChecked}
                            onChange={() => handleCheckBoxChange("all")}
                        />
                        <Typography className="checkbox-label">All</Typography>
                    </div>
                    <div className="check-all">
                        <CustomCheckBox
                            checked={completedChecked}
                            onChange={() => handleCheckBoxChange("completed")}
                        />
                        <Typography className="checkbox-label">Completed</Typography>
                    </div>
                    <div className="check-all">
                        <CustomCheckBox
                            checked={bookedChecked}
                            onChange={() => handleCheckBoxChange("booked")}
                        />
                        <Typography className="checkbox-label">Booked</Typography>
                    </div>
                    <div className="check-all">
                        <CustomCheckBox
                            checked={cancelledChecked}
                            onChange={() => handleCheckBoxChange("cancelled")}
                        />
                        <Typography className="checkbox-label">Cancelled</Typography>
                    </div>
                </div>
            </div>

            <Box
                sx={{
                    width: "100%",
                    border: "1px solid #E6E1E5",
                    marginTop: "1rem",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                }}
            >
                {/* Scrollable table container - enables internal scrolling when table exceeds viewport */}
                <TableContainer 
                    style={{ 
                        overflowX: "auto",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        overflowY: "auto", // Enable vertical scrolling
                        maxHeight: "calc(100vh - 350px)", // Adjusted to account for navbar, checkboxes, and spacing
                    }}
                >
                    <Table sx={{ minWidth: 650 }} size="large">
                        <TableHead>
                            <TableRow>
                                <TableCell>Doctor Name/ID</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Date & Time</TableCell>
                                <TableCell align="right">Package</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <>
                                    {[...Array(rowsPerPage)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Skeleton
                                                    variant="circular"
                                                    width={50}
                                                    height={50}
                                                />
                                                <Skeleton variant="text" width={100} />
                                                <Skeleton variant="text" width={130} />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Skeleton variant="text" width={80} />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Skeleton variant="text" width={150} />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Skeleton variant="text" width={120} />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Skeleton variant="text" width={100} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : filteredData().length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <NoAppointmentCard text_one={"No Data Found"} />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((data, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Box
                                                component="img"
                                                src={data?.profile_picture || Docpic}
                                                alt="Doctor Profile"
                                                sx={{
                                                    borderRadius: "8px",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                            <Typography>{data?.first_name}</Typography>
                                            <Typography className="doctor-id">
                                                User ID: {data?.suid || "NA"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            <Typography className="status-text">
                                                {data?.status || "NA"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            <Typography className="date-text">
                                                {formatDate(data?.updated_at) || "NA"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            <Typography className="package-text">
                                                {data?.plan_name || "NA"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            <Typography
                                                className="price-text"
                                                sx={{ color: "#E72B4A" }}
                                            >
                                                {`${currencysign}${data?.amount || "NA"}`}
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
                        count={filteredData().length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </>
    );
};

export default ClinicSalesActivities;
