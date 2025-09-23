import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    CircularProgress,
    Skeleton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomButton from "../../../../components/CustomButton";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import DiagnostCenterTableCard from "../DiagnosticCenterChat/DiagnostCenterTableCard";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const RecievedTables = () => {
    const [cardData, setCardData] = useState([]);
    const [staff_id] = useState(localStorage.getItem('diagnostic_suid'));
    const [isopen, setIsopen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("Appointment Accepted");
    const [snackStatus, setSnackStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchData = async () => {
        setLoading(true);
        try {
            const resp = await axiosInstance(`/sec/hcf/testRequests/${staff_id}`);
            setCardData(resp?.data?.response || []);
        } catch (err) {
            console.log("Error: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isopen]);

    const AcceptData = async (testID, staffID) => {
        setIsopen(false);
        try {
            await axiosInstance.post(`/sec/hcf/testRequestsAccept`, JSON.stringify({
                test_id: String(testID),
                staff_id: String(staffID)
            }));
            setSnackMessage("Accepted Successfully");
            setSnackStatus("success");
            setIsopen(true);
            fetchData(); // Refresh data after acceptance
        } catch (err) {
            console.log("Error: ", err);
            setSnackMessage("Error");
            setSnackStatus("error");
            setIsopen(true);
        }
    };

    const RejectData = async (testID, staffID) => {
        setIsopen(false);
        try {
            await axiosInstance.post(`/sec/hcf/testRequestReject`, JSON.stringify({
                test_id: String(testID),
                staff_id: String(staffID)
            }));
            setSnackMessage("Rejected Successfully");
            setSnackStatus("success");
            setIsopen(true);
            fetchData(); // Refresh data after rejection
        } catch (err) {
            console.log("Error: ", err);
            setSnackMessage("Error");
            setSnackStatus("error");
            setIsopen(true);
        }
    };

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} style={{ background: "white" }}>
            <CustomSnackBar isOpen={isopen} message={snackMessage} type={snackStatus} />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name & Booking ID</TableCell>
                        <TableCell align="right">Date </TableCell>
                        <TableCell align="right">Schedule</TableCell>
                        <TableCell align="right">Test name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from({ length: rowsPerPage }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={6} align="center">
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : cardData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                <NoAppointmentCard text_one="No Data Found" />
                            </TableCell>
                        </TableRow>
                    ) : (
                        cardData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((data) => (
                                <TableRow
                                    key={data?.suid}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">
                                    <DiagnostCenterTableCard id={data?.test_id} name= {`${data?.first_name} ${data?.middle_name} ${data?.last_name}`} profile={data?.profile_picture}/>
                                       
                                    </TableCell>
                                    <TableCell align="right">{data?.book_date} </TableCell>
                                    <TableCell align="right">{data?.status}</TableCell>
                                    <TableCell align="right">{data?.test_name}</TableCell>
                                    <TableCell align="right">₹{data?.test_price}</TableCell>
                                    <TableCell align="center">
                                        <CustomButton 
                                            handleClick={() => AcceptData(data?.test_id, staff_id)} 
                                            buttonCss={{ borderRadius: "2em" }} 
                                            isTransaprent={true} 
                                            label="Accept" 
                                        /> 
                                        <CustomButton 
                                            handleClick={() => RejectData(data?.test_id, staff_id)}  
                                            buttonCss={{ borderRadius: "2em" }} 
                                            isTransaprent={true} 
                                            label="Reject" 
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cardData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default RecievedTables;
