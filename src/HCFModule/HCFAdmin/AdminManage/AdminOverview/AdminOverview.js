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
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import SearchIcon from "@mui/icons-material/Search";
import { AuditCards } from "../../../DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import pen from "../../../../constants/DrImages/Pen.svg";
import { PaginationCard } from "../../../../Dashboard/PatientAppointment/PatientCards";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
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
            Jan,2022
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
            Account No : 001100444466
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
            $120
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
            Progressing
        </Typography>,
    ),
];

const AdminOverview = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "hcfadminoverview");
    }, []);
    const [value, setValue] = useState([null, null]);
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }

    const navigate = useNavigate();
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
                    <nav className="NavBar-Container-Appoinement">
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminsale"}>
                            Sale Activities
                        </NavLink>
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminoverview"}>Overview</NavLink>
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminbooking"}>Bookings</NavLink>
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminpayout"}>Payout</NavLink>
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminauditlog"}>
                            Audit Logs
                        </NavLink>
                    </nav>
                    {/* <CustomButton 
                            buttonCss={{ position : "absolute" , right : "0" , borderRadius : "6.25rem" }} 
                            isTransaprent={true} 
                            label="Add Staff"
                            // handleClick={() => {navigate("/hcfadmin/doctor/adddoctor")}}
                                /> */}
                </nav>
                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <div className="Earning-container">
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    // border: "1px solid red",
                                    width: "100%",
                                }}
                            >
                                <div className="Earn1">
                                    <Typography
                                        style={{
                                            fontFamily: "poppins",
                                            fontSize: "58px",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            lineHeight: "74px",
                                            color: "#E72B4A",
                                            // letterSpacing: "0.08px",
                                        }}
                                    >
                                        $200
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontFamily: "poppins",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: "500",
                                            lineHeight: "20px",
                                            letterSpacing: "0.096px",
                                            color: "#AEAAAE",
                                        }}
                                    >
                                        Consultation Revenue
                                    </Typography>
                                    <Typography
                                        style={{
                                            background: "#EFEFEF",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        10 Item
                                    </Typography>
                                </div>
                                <div className="Earn1">
                                    <Typography
                                        style={{
                                            fontFamily: "poppins",
                                            fontSize: "58px",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            lineHeight: "74px",
                                            color: "#E72B4A",
                                            // letterSpacing: "0.08px",
                                        }}
                                    >
                                        $120
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontFamily: "poppins",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: "500",
                                            lineHeight: "20px",
                                            letterSpacing: "0.096px",
                                            color: "#AEAAAE",
                                        }}
                                    >
                                        Diagnostic Revenue
                                    </Typography>
                                    <Typography
                                        style={{
                                            background: "#EFEFEF",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        10 Item
                                    </Typography>
                                </div>
                                <div className="Earn1">
                                    <Typography
                                        style={{
                                            fontFamily: "poppins",
                                            fontSize: "58px",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            lineHeight: "74px",
                                            color: "#E72B4A",
                                            // letterSpacing: "0.08px",
                                        }}
                                    >
                                        $120
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontFamily: "poppins",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: "500",
                                            lineHeight: "20px",
                                            letterSpacing: "0.096px",
                                            color: "#AEAAAE",
                                        }}
                                    >
                                        Total Earning
                                    </Typography>
                                </div>
                            </Box>
                        </div>
                        <div className="Monthly-Earnings">
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "20px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "30px",
                                    // letterSpacing: "0.096px",
                                    color: "#313033",
                                }}
                            >
                                Monthly Earnings
                            </Typography>
                        </div>
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
                            <div
                                style={{
                                    display: "flex",
                                    margin: "10px",
                                    flexWrap: "wrap",
                                    border: 1,
                                    borderColor: "#AEAAAE",
                                    borderRadius: "25px",
                                    width: "13em",
                                    height: "38px",
                                    backgroundColor: "#E6E1E5",
                                }}
                            >
                                <button
                                    style={{
                                        border: "none",
                                        borderRadius: "25px",
                                        height: "38px",
                                        backgroundColor: "#E6E1E5",
                                    }}
                                >
                                    Doctor
                                </button>
                                <button
                                    style={{
                                        border: "none",
                                        borderRadius: "25px",
                                        height: "38px",
                                        backgroundColor: "#E6E1E5",
                                    }}
                                >
                                    Diagnostic
                                </button>
                            </div>
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
                        <TableContainer component={Paper} sx={{ backgroundColor: "#ffff" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Account No</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.TransactionID}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.calories}</TableCell>
                                            <TableCell align="center">{row.fat}</TableCell>
                                            <TableCell align="center">{row.carbs}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdminOverview;
