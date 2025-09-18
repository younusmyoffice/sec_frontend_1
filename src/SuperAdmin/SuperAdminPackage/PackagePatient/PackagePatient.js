import React, { useEffect, useState } from "react";
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
    Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import ToModal from "../../../ToModal/ToModal";
import "./PackagePatient.scss";
import { DoctorDetail } from "../../SuperAdminHistory/SuperAdminHistoryDoctor/DoctorDetail";
import doc1 from "../../../static/images/DrImages/doc1.png";
import doc2 from "../../../static/images/DrImages/doc2.png";
import doc3 from "../../../static/images/DrImages/doc3.png";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";


const PackagePatient = () => {
    const [cardData, setCardData] = useState();
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        try{
            const resp = await axiosInstance.get('/sec/superadmin/packages/patient');
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
        localStorage.setItem("activeComponent", "package");
        localStorage.setItem("path", "packagedoctor");
    }, []);
    // const [value, setValue] = useState([null, null]);
    // function getWeeksAfter(date, amount) {
    //     return date ? date.add(amount, "week") : undefined;
    // }
    return (
        <>
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={"/superadmin/package/packagedoctor"}>Doctor</NavLink>
                <NavLink to={"/superadmin/package/packagepatient"}>Patient</NavLink>
            </nav>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "100%",
                    height: "90%",
                    flexDirection: "row",
                }}
            >
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
                    <div className="search-date">
                        <Box
                            display={"flex"}
                            margin={"10px"}
                            flexWrap={"wrap"}
                            border={1}
                            borderColor="#AEAAAE"
                            borderRadius={"25px"}
                            width={"20em"}
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
                            <ToModal label={"Date"} tagname={"Date"} />
                        </div>
                    </div>
                    <div className="">
                        <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 1 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{ fontWeight: "bold" }}>
                                        <TableCell><strong>Name & Details</strong></TableCell>
                                        <TableCell align="left" style={{ marginRight: "5rem" }}>
                                            <strong>Patient ID</strong>
                                        </TableCell>
                                        <TableCell align="center"><strong>Package</strong></TableCell>
                                        {/* <TableCell align="right">Contact Details</TableCell>
                                        <TableCell align="right">Time</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        Array.from({ length: 3 }).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton variant="rectangular" width={150} height={30} />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Skeleton variant="rectangular" width={100} height={30} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Skeleton variant="rectangular" width={150} height={30} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : cardData && cardData.length > 0 ? (
                                    cardData.map((data) => (
                                        <TableRow
                                            key={data?.suid}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row" align="right">
                                                {data?.name}
                                            </TableCell>
                                            <TableCell align="left">{data?.patient_id}</TableCell>
                                            <TableCell align="center">{data?.package}</TableCell>
                                            {/* <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell> */}
                                        </TableRow>
                                    ))
                                    ) : (
                                    <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                <NoAppointmentCard />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default PackagePatient;
