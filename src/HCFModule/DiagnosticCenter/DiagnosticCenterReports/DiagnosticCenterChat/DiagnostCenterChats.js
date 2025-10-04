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
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import pen from "../../../../static/images/DrImages/Pen.svg";
import { AuditCards } from "../../DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import CustomButton from "../../../../components/CustomButton";
import ShareList from "./ShareList";
import Shared from "./Shared";

const DiagnosticCenterChats = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "reports");
        localStorage.setItem("path", "report");
    }, []);
    useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
    }, []);
    const [value, setValue] = useState([null, null]);
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    const [doctor, setDoctor] = useState(true);
    const grey = "#E6E1E5";
    const [bgColor, setBgColor] = useState(grey);
    const changeColor = () => {
        const black = "#000000";
        setBgColor(black);
    };
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
                        <NavLink to={"/diagnostCenterDashboard/diagnosticCenterReports/request"}>
                            Request
                        </NavLink>
                        <NavLink to={"/diagnostCenterDashboard/diagnosticCenterReports/examination"}>
                            Examination
                        </NavLink>
                        <NavLink to={"/diagnostCenterDashboard/diagnosticCenterReports/report"}>
                            Report
                        </NavLink>
                        {/* <NavLink to={"/diagnostCenterDashboard/diagnosticCenterReports/Chart"}>
                            Chart
                        </NavLink> */}
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
                        {/* <Box
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
                        </Box> */}
                        <div
                            style={{
                                display: "flex",
                                margin: "10px",
                                border: "1px solid #AEAAAE",
                                borderRadius: "25px",
                                height: "38px",
                                backgroundColor: "#E6E1E5",
                                position: "relative",
                                overflow: "hidden", // Prevent border overflow on animation
                                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                width: "200px", // Adjust width for better alignment
                            }}
                        >
                            <button
                                style={{
                                    flex: 1,
                                    border: "none",
                                    borderRadius: "25px",
                                    height: "100%",
                                    color: doctor ? "#F5F5F5" : "#28282B",
                                    backgroundColor: doctor ? "#28282B" : "transparent",
                                    transition: "background-color 0.3s ease, color 0.3s ease",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setDoctor(!doctor), changeColor;
                                }}
                            >
                                Share List
                            </button>
                            <button
                                style={{
                                    flex: 1,
                                    border: "none",
                                    borderRadius: "25px",
                                    height: "100%",
                                    color: doctor ? "#28282B" : "#F5F5F5",
                                    backgroundColor: doctor ? "transparent" : "#28282B",
                                    transition: "background-color 0.3s ease, color 0.3s ease",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setDoctor(!doctor), changeColor;
                                }}
                            >
                                Shared
                            </button>
                        </div>

                        {/* <div style={{ display: "flex", marginLeft: "100px" }}>
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
                        </div> */}
                    </div>
                    {doctor ? <ShareList /> : <Shared />}
                </Box>
            </Box>
        </>
    );
};

export default DiagnosticCenterChats;
