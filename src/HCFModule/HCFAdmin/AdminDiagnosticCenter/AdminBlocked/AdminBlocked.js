import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { LabsCard } from "../AdminLabs/LabsCard";
import pen from "../../../../constants/DrImages/Pen.svg";
import { PaginationCard } from "../../../../Dashboard/PatientAppointment/PatientCards";
import { StaffCards } from "../AdminStaff/StaffCards";
import Edittaff from "../AdminStaff/Edittaff";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <StaffCards name={"Rakesh Williams"} Id={"001"} />,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Technician</Typography>,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Cardiology</Typography>,
        <CustomButton label="Blocked" isTransaprent isDisabled />,
    ),
    createData(
        <StaffCards name={"Rakesh Williams"} Id={"001"} />,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Technician</Typography>,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Cardiology</Typography>,
        <CustomButton label="Blocked" isTransaprent isDisabled />,
    ),
];

const AdminBlocked = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "diagnosticcenter");
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
                        <NavLink to={"/hcfadmin/diagnosticcenter/labs"}>Labs</NavLink>
                        <NavLink to={"/hcfadmin/diagnosticcenter/staff"}>Staff</NavLink>
                        <NavLink to={"/hcfadmin/diagnosticcenter/blocked"}>Blocked</NavLink>
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
                            <TableContainer component={Paper} style={{ background: "white" }}>
                                <Table sx={{ minWidth: 1 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow style={{ fontWeight: "bold" }}>
                                            <TableCell>Name & Details</TableCell>
                                            <TableCell align="right">Department</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell align="right">Action </TableCell>
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
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div style={{ marginTop: "200px" }}>
                                <PaginationCard />
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdminBlocked;
