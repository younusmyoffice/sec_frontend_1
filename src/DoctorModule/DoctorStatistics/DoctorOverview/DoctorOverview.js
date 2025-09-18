import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Skeleton,
} from "@mui/material";
import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
import axiosInstance from "../../../config/axiosInstance";
import "./doctorOverview.scss";
import NoAppointmentCard from "../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { formatDate, currencysign } from "../../../constants/const";

const OverView = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "statistics");
        localStorage.setItem("path", "doctorOverview");
    }, []);

    const [earning, setEarning] = useState({
        affiliateEarning: 0,
        directEarning: 0,
        totalEarning: 0,
    });
    const [doctorAllEarning, setDoctorAllEarning] = useState([]);
    const [value, setValue] = useState([null, null]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true); // State to track loading

    // Fetch earnings from APIs
    const fetchEarnings = async () => {
        setLoading(true); // Start loading
        try {
            const doctorId = localStorage.getItem("doctor_suid");

            const directResponse = await axiosInstance.post(
                "/sec/doctor/DocEarningCount",
                JSON.stringify({ doctor_id: doctorId }),
            );
            const affiliateResponse = await axiosInstance.post(
                "/sec/doctor/DocAffiliateEarningCount",
                JSON.stringify({ doctor_id: doctorId }),
            );
            const totalResponse = await axiosInstance.post(
                "/sec/doctor/DocTotalEarningCount",
                JSON.stringify({ doctor_id: doctorId }),
            );

            setEarning({
                affiliateEarning: affiliateResponse?.data?.response[0]?.hcf_doctor_earning || 0,
                directEarning: directResponse?.data?.response[0]?.doctor_earning || 0,
                totalEarning: totalResponse?.data?.totalEarnings || 0,
            });

            const allEarningsResponse = await axiosInstance.post(
                "/sec/doctor/DocAllEarningList",
                JSON.stringify({ doctor_id: doctorId }),
            );
            setDoctorAllEarning(allEarningsResponse?.data || []);
        } catch (error) {
            console.log("Error fetching earnings: ", error);
        } finally {
            setLoading(false); // Stop loading once the data is fetched
        }
    };

    useEffect(() => {
        fetchEarnings();
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
            <Box sx={{ display: "flex", width: "98%",}}>
                <DoctorStatisticsNavbar />
                <div className="main-container3">
                    <div className="Earning-container">
                        <Box
                            sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
                        >
                            <div className="Earn1">
                                <Typography
                                    sx={{ fontSize: "58px", fontWeight: "600", color: "#E72B4A" }}
                                >
                                    {loading ? (
                                        <Skeleton variant="text" width={150} height={58} />
                                    ) : (
                                        earning?.affiliateEarning
                                    )}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "12px", fontWeight: "500", color: "#AEAAAE" }}
                                >
                                    Affiliate Earning
                                </Typography>
                            </div>
                            <div className="Earn1">
                                <Typography
                                    sx={{ fontSize: "58px", fontWeight: "600", color: "#E72B4A" }}
                                >
                                    {loading ? (
                                        <Skeleton variant="text" width={150} height={58} />
                                    ) : (
                                        earning?.directEarning
                                    )}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "12px", fontWeight: "500", color: "#AEAAAE" }}
                                >
                                    Direct Earning
                                </Typography>
                            </div>
                            <div className="Earn1">
                                <Typography
                                    sx={{ fontSize: "58px", fontWeight: "600", color: "#E72B4A" }}
                                >
                                    {loading ? (
                                        <Skeleton variant="text" width={150} height={58} />
                                    ) : (
                                        earning?.totalEarning
                                    )}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "12px", fontWeight: "500", color: "#AEAAAE" }}
                                >
                                    Total Earning
                                </Typography>
                            </div>
                        </Box>
                    </div>

                    <div className="Monthly-Earnings">
                        <Typography sx={{ fontSize: "20px", fontWeight: "500", color: "#313033" }}>
                            Monthly Earnings
                        </Typography>
                    </div>

                    <div className="Earning-Table">
                        <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 650 }} size="large">
                                <TableHead
                                    sx={{ fontSize: "14px", fontWeight: "500", color: "#313033" }}
                                >
                                    <TableRow>
                                        <TableCell>Date & Time</TableCell>
                                        <TableCell align="right">Affiliate Earnings</TableCell>
                                        <TableCell align="right">Direct Earnings</TableCell>
                                        <TableCell align="right">Total Earnings</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width="100%"
                                                    height={100}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ) : doctorAllEarning.length === 0 ? (
                                        <TableRow>
                                            <NoAppointmentCard text_one={"No Data Found"} />
                                        </TableRow>
                                    ) : (
                                        doctorAllEarning
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage,
                                            )
                                            .map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {`${formatDate(row?.date) || "NA"}`}, 
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {`${currencysign}${
                                                            row?.affiliateEarning || "00"
                                                        }`}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {`${currencysign}${
                                                            row?.directEarning || "00"
                                                        }`}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {`${currencysign}${row?.total || "00"}`}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                sx={{ display: "flex", justifyContent: "right" }}
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={doctorAllEarning.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default OverView;
