import React, { useEffect, useState } from "react";
// import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
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
    CircularProgress,
    TablePagination,
    Avatar,
    Skeleton,
} from "@mui/material";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { PaginationCard } from "../../../Dashboard/PatientAppointment/PatientCards";
import { DoctorBookingCard } from "../../../DoctorModule/DoctorStatistics/DoctorBookingHistory/DoctorBookingCard";
import CustomButton from "../../../components/CustomButton";
import { baseURL } from "../../../constants/const";
import DateModal from "../../../components/DateModal/DateModal";
import FilterModal from "../../../components/FilterModal/FilterModal";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData(
        <DoctorBookingCard name={"Jolie"} patientId={"0001"} Id={"001"} />,
        <CustomButton label="Complete" isTransaprent />,
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
            30min | Messaging pack
        </Typography>,
        <h5 style={{ color: "red" }}>₹12</h5>,
    ),
    createData(
        <DoctorBookingCard name={"Jolie"} patientId={"0001"} Id={"002"} />,
        <CustomButton label="Cancelled" isTransaprent />,
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
            30min | Video call pack
        </Typography>,
        <h5 style={{ color: "red" }}>$20</h5>,
    ),
];

const SuperAdminLogs = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);

    
    const fetchData = async (pageNum = 0, pageSize = rowsPerPage) => {
        setLoading(true);
        try{
            const resp = await axiosInstance.get('/sec/superadmin/auditLogs',{
                params: {
                    page: pageNum + 1,
                    limit: pageSize,
                },  
            });
            console.log("Dashboard Response from API: ",resp?.data);
            setCardData(resp?.data?.response || []);
            setTotalRows(resp?.data?.response?.totalCount || 0);
        }catch(err){
            console.log("Error : ", err);
            setCardData([]);
            setTotalRows(0);
        }finally {
            setLoading(false);
        }
      };
      
      useEffect( () => {
        fetchData(page, rowsPerPage);
      },[page, rowsPerPage] )
    
      React.useEffect(() => {
        localStorage.setItem("activeComponent", "logs");
        localStorage.setItem("path", "auditlogs");
    }, []);


    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    // const paginatedData = cardData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const renderSkeletonRow = () => (
        <TableRow>
            <TableCell><Skeleton variant="rounded" width={200} height={50} /></TableCell>
            <TableCell align="center"><Skeleton variant="text" width={100} /></TableCell>
            <TableCell align="center"><Skeleton variant="text" width={100} /></TableCell>
            <TableCell align="center"><Skeleton variant="text" width={100} /></TableCell>
            <TableCell align="center"><Skeleton variant="text" width={100} /></TableCell>
        </TableRow>
    );
    


    
    return (
        <>
            <div className="nav-d-f-container">
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/superadmin/logs/auditlogs"}>Audit Logs</NavLink>
                </nav>
                <div className="date-filter1">
                    <DateModal />
                    <FilterModal />
                </div>
            </div>
            <Box sx={{ width: "100%", height: "100%" }}>
                    <TableContainer component={Paper} style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="Right"><strong>Name & ID</strong></TableCell>
                                    <TableCell align="center"><strong>Status</strong></TableCell>
                                    <TableCell align="center"><strong>Action ID</strong></TableCell>
                                    <TableCell align="center"><strong>Action</strong></TableCell>
                                    <TableCell align="center"><strong>Timestamp</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {loading ? (
                                Array.from({ length: rowsPerPage }).map((_, index) => (
                                    renderSkeletonRow()
                                ))
                            ) : cardData?.length ? (
                                cardData.map((data) => (
                                //     <TableRow>
                                //         <TableCell colSpan={5} align="center">
                                //         <Box display="flex" justifyContent="center" alignItems="center" padding="20px">
                                //             <CircularProgress />
                                //             </Box>
                                //         </TableCell>
                                //     </TableRow>
                                // ) : paginatedData?.length ? (
                                //     paginatedData.map((data) => (
                                        <TableRow
                                            key={data?.event_id}
                                            // sx={{
                                            //     "&:last-child td, &:last-child th": { border: 0 },
                                            // }}
                                        >
                                            <TableCell component="th" scope="row" align="Right">
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <Avatar
                                                src={data?.imageUrl || 'defaultImagePath.png'} 
                                                alt={data?.event_name || "Profile Image"}
                                                variant="rounded"
                                                style={{ width: "52px", height: "55px", marginRight: "10px" }}
                                                />
                                                <div>
                                                    <Typography variant="body1" style={{ fontWeight: "light" }}>
                                                        {data?.event_name || "Name not available"}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            ID: {data?.event_id || "N/A"}
                                                        </Typography>
                                                        </div>
                                                        </div>
                                            </TableCell>
                                            <TableCell align="center">{data?.access_role || "null"}</TableCell>
                                            <TableCell align="center">{data?.event_id || "null"}</TableCell>
                                            <TableCell align="center">{data?.event_source || "null"}</TableCell>
                                            <TableCell align="center">{data?.time_spent? (
                                                  
                                                <>
                                                <Typography variant="body2" color="textSecondary">
                                                    {new Date(data.time_spent).toLocaleDateString()} {/* Time */}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {new Date(data.time_spent).toLocaleTimeString()} {/* Date */}
                                                        </Typography>
                                                        </>
                                                        ) : "null" }
                                                                </TableCell>
                                                            </TableRow>
                                                            ))
                                                        ) : (
                                                        <TableRow>
                                        <TableCell colSpan={5} align="center">
                                        <NoAppointmentCard message="No Audit Logs Found" />
                                            {/* <Typography>No Data Found</Typography> */}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalRows}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />

                    </TableContainer>
                    <div style={{ marginTop: "2rem" }}>
                        {/* <PaginationCard /> */}
                    </div>
            </Box>
        </>
    );
};

export default SuperAdminLogs; 