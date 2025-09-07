import React from "react";
import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
import { Box } from "@mui/material";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { PaginationCard } from "../../../Dashboard/PatientAppointment/PatientCards";
import { TransactionCard } from "./TransactionCard";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData(
        <TransactionCard
            button={
                <button
                    style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50px",
                        border: "none",
                        background: " #90ee90",
                    }}
                >
                    <ArrowOutwardIcon style={{ color: "green" }} />
                </button>
            }
            name={"Appointment Payment"}
            Id={"0001000560982"}
        />,
        <Typography
            sx={{
                color: "#939094",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.625rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            01-02-2023 10:30 AM
        </Typography>,
        <h5 style={{ color: "red" }}>$20</h5>,
    ),
    createData(
        <TransactionCard
            button={
                <button
                    style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50px",
                        border: "none",
                        background: " #FFCCCB",
                    }}
                >
                    <CallReceivedIcon style={{ color: "red" }} />
                </button>
            }
            name={"Refund for Appointment"}
            Id={"000100056098"}
        />,
        <Typography
            sx={{
                color: "#939094",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.625rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            01-02-2023 10:30 AM
        </Typography>,
        <h5 style={{ color: "red" }}>$20</h5>,
    ),
];

const DoctorTransaction = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "statistics");
        localStorage.setItem("path", "doctorTransaction");
    }, []);
    return (
        <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
            <DoctorStatisticsNavbar />
            <Box
                component={"div"}
                sx={{
                    position: "relative",
                    top: "4em",
                    width: "100%",
                    display: "flex",
                    height: "100%",
                }}
            >
                <Box sx={{ width: "100%", height: "100%" }}>
                    <div className="">
                        <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Transaction & ID</TableCell>
                                        <TableCell align="right">Date & Time</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ marginTop: "300px" }}>
                            <PaginationCard />
                        </div>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default DoctorTransaction;
