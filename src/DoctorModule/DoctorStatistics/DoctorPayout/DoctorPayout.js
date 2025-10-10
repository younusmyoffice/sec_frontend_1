import React, { Fragment, useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    Typography,
    Box,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomModal from "../../../components/CustomModal";
import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
import "./doctorPayout.scss";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance";
import CustomSnackBar from "../../../components/CustomSnackBar";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const Payout = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "statistics");
        localStorage.setItem("path", "doctorPayout");
    }, []);

    const dropdownItems = ["item1", "item2", "item3"];
    const [activeDropdown, setActiveDropdown] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
    const [listItems, setListItems] = useState([{ name: "item1", checked: false }]);

    const handleCheckList = useCallback((updatedItem) => {
        const updatedItems = listItems.map((item) =>
            item.name === updatedItem.name ? updatedItem : item,
        );
        setListItems(updatedItems);
    });

    const [value, setValue] = useState([null, null]);
    const [loading, setLoading] = useState(true);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [snackType, setSnackType] = useState("success");
    const [balance, setBalance] = useState({ settled: 0, paid: 0, balance: 0 });
    const [rows, setRows] = useState([]);
    // Simulating pagination data
    const [page, setPage] = useState(0); // starting at page 0 for TablePagination
    const [rowsPerPage, setRowsPerPage] = useState(5); // Set how many rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };

    useEffect(() => {
        const doctorId = Number(localStorage.getItem("doctor_suid"));
        const load = async () => {
            try {
                setLoading(true);
                const balRes = await axiosInstance.get(`/sec/payment/doctor/balance`, { params: { doctor_id: doctorId } });
                if (balRes?.data) setBalance(balRes.data);
                const listRes = await axiosInstance.get(`/sec/payment/payouts`, { params: { doctor_id: doctorId, limit: 50, offset: 0 } });
                if (Array.isArray(listRes?.data?.response)) setRows(listRes.data.response);
            } catch (e) {
                setSnackType("error");
                setSnackMsg(e?.response?.data?.error || e?.message || "Failed to load payouts");
                setSnackOpen(true);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const [toEmail, setToEmail] = useState("");
    const [amount, setAmount] = useState("");
    const onRequestPayout = async () => {
        try {
            const doctorId = Number(localStorage.getItem("doctor_suid"));
            const amt = Number(amount);
            if (!toEmail || !amt || isNaN(amt) || amt <= 0) {
                setSnackType("error");
                setSnackMsg("Enter a valid email and amount");
                setSnackOpen(true);
                return;
            }
            const res = await axiosInstance.post(`/sec/payment/payout`, { toEmail, amount: amt, doctor_id: doctorId, memo: "Doctor cashout" });
            setSnackType("success");
            setSnackMsg(`Payout requested. Batch: ${res?.data?.response?.batch_id || "created"}`);
            setSnackOpen(true);
            setOpenDialog(false);
        } catch (e) {
            setSnackType("error");
            setSnackMsg(e?.response?.data?.error || e?.message || "Payout failed");
            setSnackOpen(true);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
                <DoctorStatisticsNavbar />
                <Box className="payout-main-container">
                    <div className="Cash-out">
                        <Typography
                            style={{
                                fontFamily: "poppins",
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "30px",
                                color: "#313033",
                            }}
                        >
                            Cash Out
                        </Typography>
                    </div>

                    <div className="Text-Amount">
                        <Typography
                            style={{
                                color: "white",
                            }}
                        >
                            Earning Balance Sales Overview ${balance?.settled?.toFixed ? balance.settled.toFixed(2) : balance.settled}
                            <br></br>
                            Amount you earned from Sales, Custom order and Affiliation Balance. You
                            can cashout this balance.
                        </Typography>
                        <Typography
                            style={{
                                color: "white",
                            }}
                        >
                            ${balance?.balance?.toFixed ? balance.balance.toFixed(2) : balance.balance}
                        </Typography>
                    </div>
                    <div className="Request-cashout">
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                            }}
                        >
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "20px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "30px",
                                    color: "#313033",
                                }}
                            >
                                Request Cashout
                            </Typography>
                        </Box>
                        <div className="Text">
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    color: "#AEAAAE",
                                }}
                            >
                                Your earning balance is below $100. You need to make another More
                                $99.33 in Sales or Affiliation Balance to request cashout.
                                <br></br>
                                Upload more assets or Invite your friends to earn more.
                            </Typography>
                        </div>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <CustomButton
                                label="Request"
                                isElevated
                                handleClick={() => setOpenDialog(!openDialog)}
                            ></CustomButton>
                            <CustomModal isOpen={openDialog} conditionOpen={() => setOpenDialog(false)} title={<Typography variant="h6">Request Payout</Typography>}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}>
                                    <input type="email" placeholder="PayPal Email" value={toEmail} onChange={(e)=>setToEmail(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #E6E1E5' }} />
                                    <input type="number" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #E6E1E5' }} />
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                        <CustomButton label="Cancel" isTransaprent handleClick={()=>setOpenDialog(false)} />
                                        <CustomButton label="Send" handleClick={onRequestPayout} />
                                    </Box>
                                </Box>
                            </CustomModal>
                        </Box>
                    </div>

                    <div className="Table-t">
                        <TableContainer component={Paper} style={{ background: "white" }}>
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
                                        <TableCell>Date</TableCell>
                                        <TableCell align="left">Batch ID</TableCell>
                                        <TableCell align="left">Amount</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        Array(5)
                                            .fill(0)
                                            .map((_, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Skeleton width="100px" />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Skeleton width="150px" />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Skeleton width="80px" />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Skeleton width="120px" />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    ) : rows.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                <NoAppointmentCard text_one={"No Data Found"} />{" "}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => (
                                                <TableRow key={row.payout_id}>
                                                    <TableCell component="th" scope="row">
                                                        {new Date(row.created_at).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell align="left">{row.payout_batch_id || '-'}</TableCell>
                                                    <TableCell align="left">{row.currency || 'INR'} {row.amount}</TableCell>
                                                    <TableCell align="left">{row.status}</TableCell>
                                                </TableRow>
                                            ))
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </div>
                </Box>
            </Box>
            <CustomSnackBar isOpen={snackOpen} message={snackMsg} type={snackType} />
        </>
    );
};

export default Payout;
