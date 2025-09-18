import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import axiosInstance from "../../../../config/axiosInstance";
import { SaleActivityCard } from "../../../HCFAdmin/AdminManage/AdminManageSale/SaleActivityCard";
import NoAppointmentCard from "../../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import pic from "../../../../static/images/DrImages/patient_alter.png";
import { currencysign, formatDate } from "../../../../constants/const";

const DiagnosticSalesActivities = () => {
    const [data1, setData1] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allChecked, setAllChecked] = useState(true);
    const [completedChecked, setCompletedChecked] = useState(false);
    const [cancelledChecked, setCancelledChecked] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const staff_id = localStorage.getItem("diagnostic_suid");

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `sec/hcf/${staff_id}/diagnosticManageSaleActivity`,
            );
            const responseData = response?.data?.response || [];
            setData1(responseData);
            setFilteredData(responseData); // Set initial filtered data to all data
        } catch (error) {
            setError(error.response ? error.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCheckBoxChange = (checkboxType) => {
        let newFilteredData;
        setAllChecked(false);
        setCompletedChecked(false);
        setCancelledChecked(false);

        switch (checkboxType) {
            case "all":
                newFilteredData = data1;
                setAllChecked(true);
                break;
            case "completed":
                newFilteredData = data1.filter((item) => item.status === "completed");
                setCompletedChecked(true);
                break;
            case "cancelled":
                newFilteredData = data1.filter((item) => item.status === "cancelled");
                setCancelledChecked(true);
                break;
            default:
                newFilteredData = data1;
        }
        setFilteredData(newFilteredData);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <div className="sales-container">
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to="/diagnostCenterDashboard/dignosticCentermanage/diagnostsalesactivities">
                        Sales Activities
                    </NavLink>
                    <NavLink to="/diagnostCenterDashboard/dignosticCentermanage/diagnostcenterauditlog">
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
                        <Typography
                            style={{ fontFamily: "poppins", fontSize: "14px", fontWeight: "500" }}
                        >
                            All
                        </Typography>
                    </div>
                    <div className="check-all">
                        <CustomCheckBox
                            checked={completedChecked}
                            onChange={() => handleCheckBoxChange("completed")}
                        />
                        <Typography
                            style={{ fontFamily: "poppins", fontSize: "14px", fontWeight: "500" }}
                        >
                            Completed
                        </Typography>
                    </div>
                    <div className="check-all">
                        <CustomCheckBox
                            checked={cancelledChecked}
                            onChange={() => handleCheckBoxChange("cancelled")}
                        />
                        <Typography
                            style={{ fontFamily: "poppins", fontSize: "14px", fontWeight: "500" }}
                        >
                            Cancelled
                        </Typography>
                    </div>
                </div>
            </div>

            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid #E6E1E5",
                    marginTop: "1rem",
                }}
            >
                <TableContainer component={Paper} style={{ background: "white" }}>
                    <Table sx={{ minWidth: 1 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Doctor Name/ID</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Test Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Date & Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                Array.from(new Array(rowsPerPage)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Skeleton variant="text" width="80%" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="text" width="50%" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="text" width="60%" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="text" width="40%" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="text" width="70%" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <NoAppointmentCard text_one={"No Data Found"} />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(
                                        ({
                                            suid,
                                            profile_picture,
                                            first_name,
                                            middle_name,
                                            last_name,
                                            status,
                                            updated_at,
                                            test_name,
                                            test_price,
                                        }) => (
                                            <TableRow key={suid}>
                                                <TableCell component="th" scope="row">
                                                    <SaleActivityCard
                                                        profile_picture={profile_picture || pic}
                                                        name={`${first_name} ${middle_name} ${last_name}`}
                                                        user_id={suid}
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
                                                        {status}
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
                                                        {test_name}
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
                                                        {`${currencysign}${test_price}`}
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
                                                        {formatDate(updated_at)}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={filteredData.length}
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

export default DiagnosticSalesActivities;
