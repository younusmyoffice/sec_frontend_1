import React, { useState, useEffect } from "react";
// import "./superadminhistorydoctor.scss";
import { NavLink } from "react-router-dom";
import {
    Box,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import hcf1 from "../../../static/images/DrImages/hcf1.png";
import { HCFDetail } from "./HCFDetail";
import axiosInstance from "../../../config/axiosInstance";


const SuperAdminHistoryPatient = () => {
    const [cardData, setCardData] = useState();
    const fetchData = async () => {
        try{
            const resp = await axiosInstance.get('/sec/superadmin/DashboardDiagStaff');
            console.log("Dashboard Response from API: ",resp?.data);
            setCardData(resp?.data?.response);
        }catch(err){
            console.log("Error : ", err)
        }
      }
      
      useEffect( () => {
        fetchData();
      },[] )
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "history");
        localStorage.setItem("path", "hcf");
    }, []);
    const [value, setValue] = useState([null, null]);
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "100%",
                    height: "90%",
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
                    <div className="search-date">
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
                    </div>
                    <div className="">
                        <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 1 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{ fontWeight: "bold" }}>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">ID No</TableCell>
                                        <TableCell align="right">Department</TableCell>
                                        <TableCell align="right">Contact Details</TableCell>
                                        <TableCell align="right">Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cardData?.map((data) => (
                                        <TableRow
                                            key={data?.suid}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row" align="right">
                                                {data?.first_name}
                                            </TableCell>
                                            <TableCell align="right">{data?.suid}</TableCell>
                                            <TableCell align="right">{data?.hcf_diag_name}</TableCell>
                                            <TableCell align="right">{data?.contact_no_primary}</TableCell>
                                            <TableCell align="right">{data?.updated_at}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Box>
            </Box>
        </>
    );
};
export default SuperAdminHistoryPatient;
