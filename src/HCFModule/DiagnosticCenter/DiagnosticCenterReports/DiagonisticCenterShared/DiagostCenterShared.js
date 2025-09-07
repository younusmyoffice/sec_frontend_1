import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PatientSearchTable } from "../DiagnosticPatientSearch/PatientSearchTable";
import CustomButton from "../../../../components/CustomButton";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import Filter from "./Filter";
import Pdf from "./Pdf";
import { PaginationCard } from "../../../../Dashboard/PatientAppointment/PatientCards";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const List = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
});
function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <PatientSearchTable name={"Patient Name"} Id={"TST00012"} />,
        <p>19:00, 23-10-23</p>,
        <p style={{ fontWeight: "lighter" }}>19:00, 23-10-23</p>,
        <p style={{ fontWeight: "lighter" }}>Rad-1</p>,
        <div>
            <CustomButton label="Done" isTransaprent />{" "}
            <MoreHorizIcon
                style={{
                    color: "grey",
                    marginLeft: "10px",
                }}
            />
        </div>,
    ),
    createData(
        <PatientSearchTable name={"Patient Name"} Id={"TST00012"} />,
        <p>19:00, 23-10-23</p>,
        <p style={{ fontWeight: "lighter" }}>19:00, 23-10-23</p>,
        <p style={{ fontWeight: "lighter" }}>Rad-1</p>,
        <div>
            <CustomButton label="Done" isTransaprent />{" "}
            <MoreHorizIcon
                style={{
                    color: "grey",
                    marginLeft: "10px",
                }}
            />
        </div>,
    ),
];

const DiagnosticPatientShared = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "reports");
        localStorage.setItem("path", "examination");
    }, []);

    const { items } = usePagination({
        count: 4,
    });
    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
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
                    {/* <div style={{marginTop:"-10px",marginLeft:"450px"}}>
                        <Filter/>
                    </div> */}
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
                    </div>
                    <Box sx={{ textAlign: "left" }}>Examination List</Box>
                    <Box
                        component={"div"}
                        sx={{
                            position: "relative",
                            top: "1em",
                            width: "100%",
                            display: "flex",
                            height: "100%",
                        }}
                    >
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <div className="">
                                <TableContainer component={Paper} style={{ background: "white" }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name / Booking ID</TableCell>
                                                <TableCell align="right">Date & Time</TableCell>
                                                <TableCell align="right">Schedule</TableCell>
                                                <TableCell align="right">Test Name</TableCell>
                                                <TableCell align="right">Details</TableCell>
                                                {/* <TableCell align="right">Action</TableCell> */}
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
                                                    <TableCell align="right">
                                                        {row.calories}
                                                    </TableCell>
                                                    <TableCell align="right">{row.fat}</TableCell>
                                                    <TableCell align="right">{row.carbs}</TableCell>
                                                    <TableCell align="right">
                                                        {row.protein}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.action}
                                                    </TableCell>
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
            </Box>
        </>
    );
};

export default DiagnosticPatientShared;
