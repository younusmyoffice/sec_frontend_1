import { Box, Typography } from "@mui/material";
import "../../../Clinic/ClinicManage/ClinicAuditLog/clinicauditlog.scss";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PntImage from "../../../../constants/DrImages/image 8.png";
// import SearchBarModal from "../../../../components/Navbar/SearchBarModal";
import FilterModal from "../../../../components/FilterModal/FilterModal";
import DateModal from "../../../../components/DateModal/DateModal";

function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

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
    createData(),
];

const diagnosticCenterAuditLog = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "diagnostcenterauditlog");
    }, []);
    const [value, setValue] = useState([null, null]);
    const [radioVal1, setRadioVal1] = useState(true);
    const radioValues1 = ["Active", "Inactive"];
    const dropdownItems3 = ["imad"];
    const [activeDropdown1, setActiveDropdown1] = useState("");
    const [activeDropdown2, setActiveDropdown2] = useState("");
    const [activeDropdown3, setActiveDropdown3] = useState("");

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink
                        to={
                            "/diagnostCenterDashboard/dignosticCentermanage/diagnostsalesactivities"
                        }
                    >
                        Sales Activities
                    </NavLink>
                    <NavLink
                        to={"/diagnostCenterDashboard/dignosticCentermanage/diagnostcenterauditlog"}
                    >
                        Audit Logs
                    </NavLink>
                </nav>
                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <div className="search-date-filter">
                        <div className="date-filter">
                            <DateModal />
                            <FilterModal />
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
                                        <TableCell align="right">TimeStamp</TableCell>
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
                </Box>
            </Box>
        </>
    );
};

export default diagnosticCenterAuditLog;
