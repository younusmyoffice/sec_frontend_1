import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    Box,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    TextField,
    Avatar,
    TablePagination,
    Skeleton,   
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import axiosInstance from "../../../config/axiosInstance";

const SuperAdminHistoryDoctor = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState([null, null]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchData = async () => {
        setLoading(true);
        try {
            const resp = await axiosInstance('/sec/superadmin/DashboardDoctors');
            console.log("Dashboard Doctor list API: ", resp?.data?.response);
            setCardData(resp?.data?.response || []);
        } catch (err) {
            console.log("Error: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("activeComponent", "history");
        localStorage.setItem("path", "doctor");
    }, []);

    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const paginatedData = cardData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
        {loading ? (
                <Box sx={{ width: "100%", padding: "20px" }}>
                    <Skeleton variant="rectangular" width="100%" height={40} />
                    <Stack direction="row" gap={2} sx={{ mt: 2, mb: 2 }}>
                        <Skeleton variant="rectangular" width="20%" height={30} />
                        <Skeleton variant="rectangular" width="20%" height={30} />
                        <Skeleton variant="rectangular" width="20%" height={30} />
                    </Stack>
                    <Skeleton variant="rectangular" width="100%" height={500} />
                </Box>
            ) : (
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "100%",
                    flexDirection: "row",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/superadmin/history/doctor"}>Doctor</NavLink>
                    <NavLink to={"/superadmin/history/patient"}>Patient</NavLink>
                    <NavLink to={"/superadmin/history/hcf"}>HCF</NavLink>
                </nav>
                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "block",
                        height: "100%",
                    }}
                >
                    {/* <div className="search-date">
                        <Box
                            display={"flex"}
                            margin={"10px"}
                            flexWrap={"wrap"}
                            border={1}
                            borderColor="#AEAAAE"
                            borderRadius={"25px"}
                            width={"56em"}
                            height="38px"
                            backgroundColor="#E6E1E5"
                        >
                            <Stack direction="row" alignItems="center" gap={1} padding={"10px"}>
                                <SearchIcon sx={{ margin: "0 0 0 0%", color: "#AEAAAE" }} />
                                <Typography
                                    variant="body1"
                                    sx={{ textAlign: "left", color: "#AEAAAE" }}
                                >
                                    Search Patient Name / ID
                                </Typography>
                            </Stack>
                        </Box>
                        <div style={{ display: "flex", marginLeft: "100px" }}>
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
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                    </div> */}
                    <div className="">
                        <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 1 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{ fontWeight: "bold" }}>
                                        <TableCell align="Right"><strong>Name & Details</strong></TableCell>
                                        <TableCell align="center"><strong>ID No</strong></TableCell>
                                        <TableCell align="center"><strong>Department</strong></TableCell>
                                        <TableCell align="center"><strong>Contact Details</strong></TableCell>
                                        <TableCell align="center"><strong>Time</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    
                                        {/* // <TableRow>
                                        //     <TableCell colSpan={5} align="center">
                                        //         <Box display="flex" justifyContent="center" alignItems="center" padding="20px">
                                        //             <CircularProgress />
                                        //         </Box>
                                        //     </TableCell>
                                        // </TableRow> */}
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((data) => (
                                            <TableRow
                                                key={data?.suid}
                                                sx={{
                                                    "&:last-child td, &:last-child th": { border: 0 },
                                                }}
                                            >
                                                <TableCell component="th" scope="row" align="center" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <Avatar 
                                                alt={data?.first_name} 
                                                src={data?.image_url || "/default-avatar.png"} 
                                                sx={{ width: "52px", height: "55px", borderRadius: "4px" }}
                                                />
                                                <Typography variant="body1">
                                                    {data?.first_name || "null"}
                                                    </Typography> 
                                                </TableCell>
                                                <TableCell align="center">{data?.suid || "null"}</TableCell>
                                                <TableCell align="center">{data?.description || "null"}</TableCell>
                                                <TableCell align="center">{data?.contact_no_primary || "null"}</TableCell>
                                                <TableCell align="center">{data?.start_date ? new Date(data.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :"null"}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
                                                No data found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={cardData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </div>
                </Box>
            </Box>
            )}
        </>
    );
};

export default SuperAdminHistoryDoctor;






