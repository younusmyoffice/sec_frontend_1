import { Box, Typography, Stack, Card, CardContent, CardMedia } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PntImage from "../../../../constants/DrImages/image 8.png";
import DateModal from "../../../../components/DateModal/DateModal";
import FilterModal from "../../../../components/FilterModal/FilterModal";
import "./clinicauditlog.scss";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import FromModal from "../../../../FromModal/FromModal";
import ToModal from "../../../../ToModal/ToModal";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(
        <div className="staff-profile">
            <Box
                sx={{ borderRadius: "8px", width: "50px", height: "50px" }}
                component={"img"}
                src={PntImage}
            ></Box>
            <div className="name-id">
                <Typography>Jolie</Typography>
                <Typography
                    style={{
                        color: "#939094",
                        fontFamily: "poppins",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "15px",
                        letterSpacing: "0.08px",
                    }}
                >
                    User ID:001
                </Typography>
            </div>
        </div>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Active
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#E9405C",
                // background:'#FDEAED',
            }}
        >
            Xaqwkc12246
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Profile Edit
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            24 Jan 23,
            <br></br>
            20:01:09 AM
        </Typography>,
    ),
    createData(
        <div className="staff-profile">
            <Box
                sx={{ borderRadius: "8px", width: "50px", height: "50px" }}
                component={"img"}
                src={PntImage}
            ></Box>
            <div className="name-id">
                <Typography>Jolie</Typography>
                <Typography
                    style={{
                        color: "#939094",
                        fontFamily: "poppins",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "15px",
                        letterSpacing: "0.08px",
                    }}
                >
                    User ID:001
                </Typography>
            </div>
        </div>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Active
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#E9405C",
                // background:'#FDEAED',
            }}
        >
            Xaqwkc12246
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Profile Edit
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            24 Jan 23,
            <br></br>
            20:01:09 AM
        </Typography>,
    ),
    createData(
        <div className="staff-profile">
            <Box
                sx={{ borderRadius: "8px", width: "50px", height: "50px" }}
                component={"img"}
                src={PntImage}
            ></Box>
            <div className="name-id">
                <Typography>Jolie</Typography>
                <Typography
                    style={{
                        color: "#939094",
                        fontFamily: "poppins",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "15px",
                        letterSpacing: "0.08px",
                    }}
                >
                    User ID:001
                </Typography>
            </div>
        </div>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Active
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#E9405C",
                // background:'#FDEAED',
            }}
        >
            Xaqwkc12246
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Profile Edit
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            24 Jan 23,
            <br></br>
            20:01:09 AM
        </Typography>,
    ),
    createData(
        <div className="staff-profile">
            <Box
                sx={{ borderRadius: "8px", width: "50px", height: "50px" }}
                component={"img"}
                src={PntImage}
            ></Box>
            <div className="name-id1">
                <Typography>Jolie</Typography>
                <Typography
                    style={{
                        color: "#939094",
                        fontFamily: "poppins",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "15px",
                        letterSpacing: "0.08px",
                    }}
                >
                    User ID:001
                </Typography>
            </div>
        </div>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Active
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#E9405C",
                // background:'#FDEAED',
            }}
        >
            Xaqwkc12246
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Profile Edit
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            24 Jan 23,
            <br></br>
            20:01:09 AM
        </Typography>,
    ),
    createData(),
];

const ClinicAuditLog = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "clinicauditlog");
    }, []);
    return (
        <>
            <div className="sales-container">
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/clinicDashboard/clinicmanage/clinicsalesactivities"}>
                        Sales Activities
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmanage/clinicauditlog"}>
                        Audit Logs
                    </NavLink>
                </nav>
            </div>
            <div className="checkboxes-from-to1">
                <div className="from-to">
                    <FromModal />
                    <ToModal />
                </div>
            </div>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid #E6E1E5",
                    marginTop: "1rem",
                }}
            >
                <TableContainer style={{ overflowX: "auto" }}>
                    <Table sx={{ minWidth: 650 }} size="large">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name & ID</TableCell>
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
                                    <TableCell
                                        align="right"
                                        style={{
                                            padding: "1rem",
                                        }}
                                    >
                                        {row.calories}
                                    </TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default ClinicAuditLog;
