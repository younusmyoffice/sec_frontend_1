import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import DatePickerModal from "../../../components/DatePickerModal/DatePickerModal";
import SearchIcon from "@mui/icons-material/Search";
import {
    // Box,
    Paper,
    // Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    // Typography,
} from "@mui/material";
import "./SuperAdminTranDoctor.scss";
import doc1 from "../../../constants/DrImages/doc1.png";
import doc2 from "../../../constants/DrImages/doc2.png";
import doc3 from "../../../constants/DrImages/doc3.png";
import { DoctorDetail } from "../../SuperAdminHistory/SuperAdminHistoryDoctor/DoctorDetail";

function createData(name, calories, fat, carbs, samosa, protein, action) {
    return { name, calories, fat, carbs, samosa, protein, action };
}

const rows = [
    createData(
        <DoctorDetail image={doc3} name={"Dr. James k"} />,
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
            01234
        </Typography>,
        <Typography
            sx={{
                color: "#313033",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "22px",
                letterSpacing: "0.07px",
            }}
        >
            Dr.naveera
        </Typography>,
        <Typography
            sx={{
                borderRadius: "8px",
                border: "1px solid #E6E1E5",
                background: "#EFEFEF",
                fontFamily: "poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "30px",
            }}
        >
            80%
        </Typography>,
        <Typography
            sx={{
                color: "#313033",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "22px",
                letterSpacing: "0.07px",
            }}
        >
            Super Admin
        </Typography>,
        <Typography
            sx={{
                borderRadius: "8px",
                border: "1px solid #E6E1E5",
                background: "#EFEFEF",
                fontFamily: "poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "30px",
            }}
        >
            20%
        </Typography>,
    ),
    createData(
        <DoctorDetail image={doc2} name={"Dr. Jennifer"} />,
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
            01234
        </Typography>,
        <Typography
            sx={{
                color: "#313033",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "22px",
                letterSpacing: "0.07px",
            }}
        >
            Dr.naveera
        </Typography>,
        <Typography
            sx={{
                borderRadius: "8px",
                border: "1px solid #E6E1E5",
                background: "#EFEFEF",
                fontFamily: "poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "30px",
            }}
        >
            80%
        </Typography>,
        <Typography
            sx={{
                color: "#313033",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "22px",
                letterSpacing: "0.07px",
            }}
        >
            Super Admin
        </Typography>,
        <Typography
            sx={{
                borderRadius: "8px",
                border: "1px solid #E6E1E5",
                background: "#EFEFEF",
                fontFamily: "poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "30px",
            }}
        >
            20%
        </Typography>,
    ),
    createData(
        <DoctorDetail image={doc1} name={"Dr. Maria Gracia"} />,
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
            01234
        </Typography>,
        <Typography
            sx={{
                color: "#313033",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "22px",
                letterSpacing: "0.07px",
            }}
        >
            Dr.naveera
        </Typography>,
        <Typography
            sx={{
                borderRadius: "8px",
                border: "1px solid #E6E1E5",
                background: "#EFEFEF",
                fontFamily: "poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "30px",
            }}
        >
            80%
        </Typography>,
        <Typography
            sx={{
                color: "#313033",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "22px",
                letterSpacing: "0.07px",
            }}
        >
            Super Admin
        </Typography>,
        <Typography
            sx={{
                borderRadius: "8px",
                border: "1px solid #E6E1E5",
                background: "#EFEFEF",
                fontFamily: "poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "30px",
            }}
        >
            20%
        </Typography>,
    ),
];

const SuperAdminTranDoctors = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "transaction");
        localStorage.setItem("path", "hcf");
    }, []);
    return (
        <>
            <div className="search-date-filter">
                <Box
                    display={"flex"}
                    margin={"10px"}
                    flexWrap={"wrap"}
                    border={1}
                    borderColor="#AEAAAE"
                    borderRadius={"25px"}
                    width={"26em"}
                    height="38px"
                    backgroundColor="#E6E1E5"
                >
                    <Stack direction="row" alignItems="center" gap={1} padding={"10px"}>
                        <SearchIcon sx={{ margin: "0 0 0 0%", color: "#AEAAAE" }} />
                        <Typography variant="body1" sx={{ textAlign: "left", color: "#AEAAAE" }}>
                            Search Patient Name / ID
                        </Typography>
                    </Stack>
                </Box>
                <DatePickerModal />
            </div>
            <div className="superadmin-trandoctor-navbar" style={{ marginTop: "2rem" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/superadmin/transaction/doctor"}>Doctor</NavLink>
                    <NavLink to={"/superadmin/transaction/hcf"}>HCF</NavLink>
                </nav>
            </div>
            <div className="tran-doc-table">
                <TableContainer component={Paper} style={{ background: "white" }}>
                    <Table sx={{ minWidth: 1 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ fontWeight: "bold" }}>
                                <TableCell>Dr.Name & Details</TableCell>
                                <TableCell align="right">Doctor ID</TableCell>
                                <TableCell align="right" style={{ width: "30%" }}></TableCell>
                                <TableCell align="right">Payment</TableCell>
                                <TableCell align="right"></TableCell>
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
                                    <TableCell align="center">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.samosa}</TableCell>
                                    <TableCell align="center">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default SuperAdminTranDoctors;
