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
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DoctorTable from "./DoctorTable";
import DiagnosticTable from "./DiagnosticTable";
import DownloadIcon from "@mui/icons-material/Download";

const AdminManageSale = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "hcfadminsale");
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
                                Doctor
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="All"
                            style={{ display: "flex" }}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Completed"
                            style={{ display: "flex" }}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Cancelled"
                            style={{ display: "flex" }}
                        />
                    </div>
                    {doctor ? <DoctorTable /> : <DiagnosticTable />}
                </Box>
            </Box>
        </>
    );
};

export default AdminManageSale;
