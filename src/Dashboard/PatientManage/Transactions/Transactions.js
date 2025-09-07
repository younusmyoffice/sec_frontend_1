import { Box, Button, Container, Typography } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import DoctorImage from "../../../constants/DrImages/image1.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { BookingHistoryDrCard } from "./BookingHistoryDrCard";
import CustomButton from "../../../components/CustomButton/custom-button";
import { ReceiveCard, SendCard } from "./TransactionCard";

function createData(TransactionID, xyz, abc, DateTime, Amount) {
    return { TransactionID, xyz, abc, DateTime, Amount };
}

const rows = [
    createData(
        <SendCard Payment={"Appointment Payment"} TRXID={"00000 1002000"} />,
        null,
        null,
        <Typography
            sx={{
                color: "#939094",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.800rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            01-02-2023 10:30 AM
        </Typography>,
        <Typography
            sx={{
                color: "#E72B4A",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "1.375rem",
                letterSpacing: "0.00438rem",
            }}
        >
            $12
        </Typography>,
    ),
    createData(
        <ReceiveCard Payment={"Cancellation Refund"} TRXID={"00000 1002000"} />,
        null,
        null,
        <Typography
            sx={{
                color: "#939094",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.800rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            01-02-2023 10:30 AM
        </Typography>,
        <Typography
            sx={{
                color: "#E72B4A",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "1.375rem",
                letterSpacing: "0.00438rem",
            }}
        >
            $12
        </Typography>,
    ),
];

const Transactions = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "transactions");
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/patientdashboard/manage/bookinghistory"}>
                        Booking History
                    </NavLink>
                    <NavLink to={"/patientdashboard/manage/transactions"}>Transaction</NavLink>
                    <NavLink to={"/patientdashboard/manage/reports"}>Report</NavLink>
                    <NavLink to={"/patientdashboard/manage/subscriptions"}>Subscription</NavLink>
                </nav>

                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        height: "90%",
                    }}
                >
                    <TableContainer component={Paper} sx={{ backgroundColor: "#ffff" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Transaction & ID</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">Date & Time</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.TransactionID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.TransactionID}
                                        </TableCell>
                                        <TableCell align="right">{row.xyz}</TableCell>
                                        <TableCell align="right">{row.abc}</TableCell>
                                        <TableCell align="right">{row.DateTime}</TableCell>
                                        <TableCell align="right">{row.Amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default Transactions;
