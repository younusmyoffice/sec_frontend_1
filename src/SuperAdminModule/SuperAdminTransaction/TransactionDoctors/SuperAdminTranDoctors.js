import {
    Box,
    Stack,
    Typography,
    // Box,
    Paper,
    // Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    Skeleton,
    // Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DatePickerModal from "../../../components/DatePickerModal/DatePickerModal";
import "./SuperAdminTranDoctor.scss";
import doc1 from "../../../static/images/DrImages/doc1.png";
import doc2 from "../../../static/images/DrImages/doc2.png";
import doc3 from "../../../static/images/DrImages/doc3.png";
import { DoctorDetail } from "../../SuperAdminHistory/SuperAdminHistoryDoctor/DoctorDetail";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const SuperAdminTranDoctors = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        try{
            const resp = await axiosInstance.get('/sec/superadmin/transction/doctor');
            console.log("Dashboard Response from API: ",resp?.data);
            setCardData(resp?.data?.response);
        }catch(err){
            console.log("Error : ", err)
        }finally {
            setLoading(false);
        }
      };
      
      useEffect( () => {
        fetchData();
      },[] )
    
      React.useEffect(() => {
        localStorage.setItem("activeComponent", "transaction");
        localStorage.setItem("path", "hcf");
    }, []);
    
    return (
        <>
            <div className="search-date-filter">
                <Box
                    display={"flex"}
                    margin={"10px"}
                    flexWrap={"wrap"}
                    border={1}
                    borderColor="#AEAAAE"
                    borderRadius={"25px"}
                    width={"26em"}
                    height="38px"
                    backgroundColor="#E6E1E5"
                >
                    <Stack direction="row" alignItems="center" gap={1} padding={"10px"}>
                        <SearchIcon sx={{ margin: "0 0 0 0%", color: "#AEAAAE" }} />
                        <Typography variant="body1" sx={{ textAlign: "left", color: "#AEAAAE" }}>
                            Search Patient Name / ID
                        </Typography>
                    </Stack>
                </Box>
                <DatePickerModal />
            </div>
            <div className="superadmin-trandoctor-navbar" style={{ marginTop: "2rem" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/superadmin/transaction/doctor"}>Doctor</NavLink>
                    <NavLink to={"/superadmin/transaction/hcf"}>HCF</NavLink>
                </nav>
            </div>
            <div className="tran-doc-table">
                <TableContainer component={Paper} style={{ background: "white" }}>
                    <Table sx={{ minWidth: 1 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ fontWeight: "bold" }}>
                                <TableCell><strong>Dr.Name & Details</strong></TableCell>
                                <TableCell align="right"><strong>Doctor ID</strong></TableCell>
                                <TableCell align="right"><strong>Doctor%</strong></TableCell>
                                <TableCell align="center"><strong>SuperAdmin%</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {loading ? (
                                Array.from(new Array(5)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton variant="text" width={150} /></TableCell>
                                        <TableCell align="right"><Skeleton variant="text" width={80} /></TableCell>
                                        <TableCell align="right"><Skeleton variant="text" width={60} /></TableCell>
                                        <TableCell align="right"><Skeleton variant="text" width={60} /></TableCell>
                                    </TableRow>
                                ))
                            ) : cardData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <NoAppointmentCard message="No Doctor Data Found" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                            cardData?.map((data) => (
                                <TableRow
                                    key={data?.user_id}
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                    }}
                                >
                                    <TableCell component="th" scope="row" align="right">
                                        {data?.name}
                                    </TableCell>
                                    <TableCell align="right">{data?.user_id}</TableCell>
                                    <TableCell align="center">{data?.user_percentage}</TableCell>
                                    {/* <TableCell align="right">{data?.fat}</TableCell> */}
                                    <TableCell align="right">{data?.superadmin_percentage}</TableCell>
                                    {/* <TableCell align="center">{data?.}</TableCell> */}
                                </TableRow>
                            ))
                        )}
                                     
                            </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default SuperAdminTranDoctors;
