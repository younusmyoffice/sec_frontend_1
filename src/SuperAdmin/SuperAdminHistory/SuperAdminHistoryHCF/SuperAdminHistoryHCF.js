import React, { useState } from "react";
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
import hcf1 from "../../../constants/DrImages/hcf1.png";
import { HCFDetail } from "./HCFDetail";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <HCFDetail image={hcf1} name={"Andrew"} />,
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
            CT-Scan
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
            Diagnostic
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
            +91 0000 000 000
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
            12:00 PM
        </Typography>,
    ),
];

const SuperAdminHistoryPatient = () => {
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
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row" align="right">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
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
