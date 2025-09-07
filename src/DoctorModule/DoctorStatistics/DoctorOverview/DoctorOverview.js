import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Typography, Box } from "@mui/material";
import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
import "./doctorOverview.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

const OverView = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "statistics");
        localStorage.setItem("path", "doctorOverview");
    }, []);
    const [value, setValue] = useState([null, null]);
    const rows = [
        createData("Jan, 2022", `$ ${0.0}`, `$ ${120}`, `$ ${120}`),
        createData("Feb, 2022", `$ ${0.0}`, `$ ${120}`, `$ ${120}`),
        createData("Mar, 2022", `$ ${0.0}`, `$ ${120}`, `$ ${120}`),
    ];
    return (
        <>
            <div className="navbar-daterange">
                <div>
                    <nav className="NavBar-Container-Appoinement">
                        <DoctorStatisticsNavbar />
                    </nav>
                </div>
                <div
                    className="Date-range-picker"
                    style={{ width: "40%", position: "relative", left: "58%" }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            disablePast
                            value={value}
                            maxDate={getWeeksAfter(value[0], 4)}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} variant="standard" />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} variant="standard" />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div className="main-container3">
                <div className="Earning-container">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            // border: "1px solid red",
                            width: "100%",
                        }}
                    >
                        <div className="Earn1">
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "58px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "74px",
                                    color: "#E72B4A",
                                    // letterSpacing: "0.08px",
                                }}
                            >
                                $0.0
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "20px",
                                    letterSpacing: "0.096px",
                                    color: "#AEAAAE",
                                }}
                            >
                                Affiliate Earning
                            </Typography>
                            <Typography
                                style={{
                                    background: "#EFEFEF",
                                    borderRadius: "15px",
                                }}
                            >
                                0 Item
                            </Typography>
                        </div>
                        <div className="Earn1">
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "58px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "74px",
                                    color: "#E72B4A",
                                    // letterSpacing: "0.08px",
                                }}
                            >
                                $120
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "20px",
                                    letterSpacing: "0.096px",
                                    color: "#AEAAAE",
                                }}
                            >
                                Affiliate Earning
                            </Typography>
                            <Typography
                                style={{
                                    background: "#EFEFEF",
                                    borderRadius: "15px",
                                }}
                            >
                                10 Item
                            </Typography>
                        </div>
                        <div className="Earn1">
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "58px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "74px",
                                    color: "#E72B4A",
                                    // letterSpacing: "0.08px",
                                }}
                            >
                                $120
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "20px",
                                    letterSpacing: "0.096px",
                                    color: "#AEAAAE",
                                }}
                            >
                                Affiliate Earning
                            </Typography>
                        </div>
                    </Box>
                </div>
                <div className="Monthly-Earnings">
                    <Typography
                        style={{
                            fontFamily: "poppins",
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "30px",
                            // letterSpacing: "0.096px",
                            color: "#313033",
                        }}
                    >
                        Monthly Earnings
                    </Typography>
                </div>
                <div className="Earning-Table">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="large">
                            <TableHead
                                sx={{
                                    fontFamily: "poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "22px",
                                    letterSpacing: "0.07px",
                                    color: "#313033",
                                }}
                            >
                                <TableRow>
                                    <TableCell>Date & Time</TableCell>
                                    <TableCell align="right">Affilate Earnings</TableCell>
                                    <TableCell align="right">Direct Earnings</TableCell>
                                    <TableCell align="right">Total Earnings</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="page-box">
                    <Typography>Pages 1to1</Typography>
                    <Stack spacing={2}>
                        {/* <Pagination count={10} shape="rounded" /> */}
                        <Pagination
                            count={10}
                            variant=""
                            shape="rounded"
                            style={{
                                color: "red",
                            }}
                        />
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default OverView;
