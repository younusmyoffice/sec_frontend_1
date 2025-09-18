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
import React, { useEffect, useMemo, useState } from "react";
import DiagnostCenterTableCard from "./DiagnostCenterTableCard";
import NoAppointmentCard from "../../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../../config/axiosInstance";

const Shared = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const staff_id = localStorage.getItem('diagnostic_suid');

    const fetchData = async () => {
        setLoading(true);
        try {
            const resp = await axiosInstance(`/sec/hcf/reportShared/${staff_id}`);
            // setCardData(resp?.data?.response || []);
            setCardData(Array.isArray(resp?.data?.response) ? resp.data.response : []);
        } catch (err) {
            console.log("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const memoizedCardData = useMemo(() => {
        return cardData.map(data => ({
            id: data?.test_id,
            name: `${data?.first_name} ${data?.middle_name} ${data?.last_name}`,
            bookDate: `${data?.book_date} ${data?.book_time}` || "N/A",
            testName: data?.test_name || "N/A",
            status: data?.status || "N/A",
            testFile: data?.report_name || "N/A",
            profile_picture: data?.profile_picture || " "
        }));
    }, [cardData]);

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
                        <TableCell align="right">Date & Time</TableCell>
                        <TableCell align="right">Test Name</TableCell>
                        <TableCell align="right">File Name</TableCell>
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
                            .map(data => (
                                <TableRow key={data.id}>
                                    <TableCell>
                                        <DiagnostCenterTableCard id={data.id} name={data.name} profile={data.profile_picture}/>
                                    </TableCell>
                                    <TableCell align="right">{data.bookDate}</TableCell>
                                    <TableCell align="right">{data.testName}</TableCell>
                                    <TableCell align="right" sx={{color: "#E72B4A"}}>{data.testFile}</TableCell>
                                    <TableCell align="right">{data.status}</TableCell>
                                </TableRow>
                            ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                <NoAppointmentCard text_one="No Data Found" />
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

export default Shared;
