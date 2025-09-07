import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { AllDoctorTable } from "../AllDoctors/AllDoctorTable";
import { PaginationCard } from "../../../../Dashboard/PatientAppointment/PatientCards";
import pen from "../../../../constants/DrImages/Pen.svg";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <AllDoctorTable name={"Dr. Maria Garcia"} Id={"001"} />,
        <Typography>Cardiology</Typography>,
        <CustomButton label="Blocked" isTransaprent />,
        <CustomButton label={<img src={pen} />} isTransaprent />,
    ),
    createData(
        <AllDoctorTable name={"Dr. Maria Garcia"} Id={"001"} />,
        <Typography>Cardiology</Typography>,
        <CustomButton label="Blocked" isTransaprent />,
        <CustomButton label={<img src={pen} />} isTransaprent />,
    ),
];

const HCFDoctorBlocked = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "doctors");
        localStorage.setItem("path", "blocked");
    }, []);

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
                        <NavLink to={"/hcfadmin/doctor/alldoctors"}>All Doctors</NavLink>
                        <NavLink to={"/hcfadmin/doctor/active"}>Active</NavLink>
                        <NavLink to={"/hcfadmin/doctor/blocked"}>Blocked</NavLink>
                    </nav>
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
                        <div className="">
                            <div style={{ display: "flex", margin: "10px" }}>
                                <CustomButton label="All" buttonCss={{ margin: "10px" }} />
                                <CustomButton
                                    label="Dentist"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="Neurologist"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="Orthopedic"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="Nutritionist"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="Pediatric"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="More..."
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                            </div>
                            <TableContainer component={Paper} style={{ background: "white" }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name & Details</TableCell>
                                            <TableCell align="right">Department</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div style={{ marginTop: "220px", marginLeft: "10px" }}>
                            <PaginationCard />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HCFDoctorBlocked;
