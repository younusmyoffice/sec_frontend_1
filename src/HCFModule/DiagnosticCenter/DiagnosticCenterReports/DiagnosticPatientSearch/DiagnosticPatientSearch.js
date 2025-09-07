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
    TextField,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import SearchIcon from "@mui/icons-material/Search";
import { AuditCards } from "../../../DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import pen from "../../../../constants/DrImages/Pen.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DownloadIcon from "@mui/icons-material/Download";
import RecievedTables from "./RecievedTables";
import RejectedTable from "./RejectedTable";

const DiagnosticPatientSearch = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "reports");
        localStorage.setItem("path", "request");
    }, []);

    const [value, setValue] = useState([null, null]);
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    const [doctor, setDoctor] = useState(true);
    let grey = "#E6E1E5";
    const [bgColor, setBgColor] = useState(grey);
    const changeColor = () => {
        let black = "#000000";
        setBgColor(black);
    };
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
                        <NavLink to={"/diagnostCenterDashboard/dignosticCenterReports/request"}>
                            Request
                        </NavLink>
                        <NavLink to={"/diagnostCenterDashboard/dignosticCenterReports/examination"}>
                            Examination
                        </NavLink>
                        <NavLink to={"/diagnostCenterDashboard/dignosticCenterReports/report"}>
                            Report
                        </NavLink>
                        <NavLink to={"/diagnostCenterDashboard/dignosticCenterReports/Chart"}>
                            Chart
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
                            width={"50em"}
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
                                    background: bgColor,
                                }}
                                onClick={() => {
                                    setDoctor(!doctor), changeColor;
                                }}
                            >
                                Received
                            </button>
                            <button
                                style={{
                                    border: "none",
                                    borderRadius: "25px",
                                    height: "38px",
                                    background: bgColor,
                                }}
                                onClick={() => {
                                    setDoctor(!doctor), changeColor;
                                }}
                            >
                                Rejected
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
                    {doctor ? <RecievedTables /> : <RejectedTable />}
                </Box>
            </Box>
        </>
    );
};

export default DiagnosticPatientSearch;
