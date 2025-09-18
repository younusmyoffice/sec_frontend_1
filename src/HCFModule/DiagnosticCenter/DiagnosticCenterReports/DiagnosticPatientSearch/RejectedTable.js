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
    Skeleton,
} from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import DiagnostCenterTableCard from "../DiagnosticCenterChat/DiagnostCenterTableCard";

const RejectedTable = () => {
    const [cardData, setCardData] = useState([]);
    const [staff_id] = useState(localStorage.getItem("diagnostic_suid"));
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchData = async () => {
        setLoading(true);
        try {
            const resp = await axiosInstance(`/sec/hcf/testRejected/${staff_id}`);
            setCardData(resp?.data?.response || []);
        } catch (err) {
            console.error("Error: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [staff_id]);

    // Memoize cardData to avoid unnecessary re-renders
    const memoizedCardData = useMemo(() => {
        return cardData.map((data) => ({
            id: data?.test_id,
            propic: data?.profile_picture,
            name: `${data?.first_name} ${data?.last_name}` || "N/A",
            bookDate: data?.book_date || "N/A",
            testName: data?.test_name || "N/A",
            status: data?.status || "N/A",
            profile_picture: data?.profile_picture || " ",
            
        }));
    }, [cardData]);

    // Handle pagination change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} style={{ background: "white" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name/Booking ID</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Test Name</TableCell>
                        <TableCell align="right">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={6} align="center">
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : memoizedCardData.length > 0 ? (
                        memoizedCardData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((data) => (
                                <TableRow
                                    key={data.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                    }}
                                >
                                    <DiagnostCenterTableCard id={data?.id} name={data?.name} profile={data?.profile_picture}/>
                                    <TableCell align="right">{data.bookDate}</TableCell>
                                    <TableCell align="right">{data.testName}</TableCell>
                                    <TableCell align="right">{data.status}</TableCell>
                                </TableRow>
                            ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <NoAppointmentCard text_one={"No Data Found"} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={memoizedCardData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default RejectedTable;
