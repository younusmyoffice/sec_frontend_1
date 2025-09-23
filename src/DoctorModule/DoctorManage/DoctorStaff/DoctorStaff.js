import React, { useEffect } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
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
import DoctorManageNavbar from "../../CustomDoctorComponent/DoctorManageNavbar/DoctorManageNavbar";
import { AuditCards } from "../../../HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import CustomButton from "../../../components/CustomButton";
import { PaginationCard } from "../../../PatientDashboard/PatientAppointment/PatientCards";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <AuditCards name={"Jolie"} specialist={"User"} Id={"001"} />,
        <Typography>Active</Typography>,
        <CustomButton
            buttonCss={{
                display: "inline-flex",
                height: "2rem",
                padding: "0.5rem 1rem",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                flexShrink: "0",
                borderRadius: "6.25rem",
            }}
            isTransaprent={"true"}
            label={"Xaqwkc12246"}
        />,
        <CustomButton
            buttonCss={{
                display: "inline-flex",
                height: "2rem",
                padding: "0.5rem 1rem",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                flexShrink: "0",
                borderRadius: "6.25rem",
            }}
            isTransaprent={"true"}
            isDisabled
            label={"Profile Edit"}
        />,
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
            24 JAN 2023
        </Typography>,
    ),
];

const DoctorStaff = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "doctorStaff");
    }, []);
    const [age, setAge] = React.useState("");

    useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
            <DoctorManageNavbar />
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
                    <div style={{ display: "flex" }}>
                        {/* <Box
                                display={"flex"} margin={"10px"}
                                flexWrap={"wrap"}
                                border={1}
                                borderColor="#AEAAAE"
                                borderRadius={"25px"}
                                width={"27em"}
                                height="38px"
                                backgroundColor="#E6E1E5"
                            >
                                <Stack direction="row" alignItems="center" gap={1} padding={"10px"}>
                                    <SearchIcon sx={{ margin: "0 0 0 0%", color: "#AEAAAE" }} />
                                    <Typography variant="body1" sx={{ textAlign: "left", color: "#AEAAAE" }}>
                                        Search Patient Name / ID
                                    </Typography>
                                </Stack>

                            </Box> */}

                        <Box sx={{ minWidth: 120, marginLeft: "470px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Date</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Date"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120, marginLeft: "10px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Filter"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="">
                        <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{ fontWeight: "bold" }}>
                                        <TableCell>Name & Details</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Action ID</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                        <TableCell align="right">Timestamp</TableCell>
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
                                            <TableCell component="th" scope="row">
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
                    <div style={{ marginTop: "400px" }}>
                        <PaginationCard />
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default DoctorStaff;
