import React, { useState } from "react";
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
import "./PackageDoctor.scss";
import { DoctorDetail } from "../../SuperAdminHistory/SuperAdminHistoryDoctor/DoctorDetail";
import NoAppointmentCard from "../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import doc1 from "../../../static/images/DrImages/doc1.png";
import doc2 from "../../../static/images/DrImages/doc2.png";
import doc3 from "../../../static/images/DrImages/doc3.png";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <DoctorDetail image={doc3} name={"Dr. James k"} />,
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            01234
        </Typography>,
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            30 min, messaging plan
        </Typography>,
    ),
    createData(
        <DoctorDetail image={doc2} name={"Dr. Jennifer"} />,
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            01234
        </Typography>,
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            60min, voice plan
        </Typography>,
    ),
    createData(
        <DoctorDetail image={doc1} name={"Dr. Maria Gracia"} />,
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            01234
        </Typography>,
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            90min, video plan
        </Typography>,
    ),
];
const PackageDoctor = () => {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState([null, null]);
    
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "package");
        localStorage.setItem("path", "packagedoctor");
    // const [value, setValue] = useState([null, null]);
    // function getWeeksAfter(date, amount) {
    //     return date ? date.add(amount, "week") : undefined;
    // }

    setTimeout(() => {
        setLoading(false);
    }, 1000); 

}, []);
    
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
                                            <strong>Doctor ID</strong>
                                        </TableCell>
                                        <TableCell align="center"><strong>Package</strong></TableCell>
                                        {/* <TableCell align="right">Contact Details</TableCell>
                                        <TableCell align="right">Time</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        // Skeleton loader
                                        Array.from({ length: 3 }).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton variant="rectangular" width={150} height={30} />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Skeleton variant="rectangular" width={80} height={30} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Skeleton variant="rectangular" width={150} height={30} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : rows.length > 0 ? (
                                     rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row" align="right">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.calories}</TableCell>
                                            <TableCell align="center">{row.fat}</TableCell>
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

export default PackageDoctor;
