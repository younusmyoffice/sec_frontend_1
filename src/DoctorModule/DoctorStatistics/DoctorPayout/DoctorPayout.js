import React, { Fragment, useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    Typography,
    Box,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomModal from "../../../components/CustomModal";
import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
import "./doctorPayout.scss";
import NoAppointmentCard from "../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const Payout = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "statistics");
        localStorage.setItem("path", "doctorPayout");
    }, []);

    const dropdownItems = ["item1", "item2", "item3"];
    const [activeDropdown, setActiveDropdown] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
    const [listItems, setListItems] = useState([{ name: "item1", checked: false }]);

    const handleCheckList = useCallback((updatedItem) => {
        const updatedItems = listItems.map((item) =>
            item.name === updatedItem.name ? updatedItem : item,
        );
        setListItems(updatedItems);
    });

    const [value, setValue] = useState([null, null]);

    // Simulate loading state for rows and pagination
    const [loading, setLoading] = useState(true);

    // Simulating rows data
    const rows = [
        createData("Jan, 2022", "Account No:00110044446", `$ ${120}`, "processing"),
        createData("Feb, 2022", "Account No:00110044447", `$ ${150}`, "completed"),
        createData("Mar, 2022", "Account No:00110044448", `$ ${200}`, "pending"),
        createData("Apr, 2022", "Account No:00110044449", `$ ${250}`, "processing"),
        createData("May, 2022", "Account No:00110044450", `$ ${180}`, "completed"),
        createData("Jun, 2022", "Account No:00110044451", `$ ${220}`, "pending"),
        createData("Jul, 2022", "Account No:00110044452", `$ ${300}`, "completed"),
        createData("Aug, 2022", "Account No:00110044453", `$ ${400}`, "processing"),
        createData("Sep, 2022", "Account No:00110044454", `$ ${350}`, "completed"),
        createData("Oct, 2022", "Account No:00110044455", `$ ${500}`, "pending"),
    ];
    // Simulating pagination data
    const [page, setPage] = useState(0); // starting at page 0 for TablePagination
    const [rowsPerPage, setRowsPerPage] = useState(5); // Set how many rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };

    // Simulate data loading
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Simulate loading completion
        }, 2000);
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
                <DoctorStatisticsNavbar />
                <Box className="payout-main-container">
                    <div className="Cash-out">
                        <Typography
                            style={{
                                fontFamily: "poppins",
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "30px",
                                color: "#313033",
                            }}
                        >
                            Cash Out
                        </Typography>
                    </div>

                    <div className="Text-Amount">
                        <Typography
                            style={{
                                color: "white",
                            }}
                        >
                            Earning Balance Sales Overview $120 ShareEcare Affiliation Program $0
                            <br></br>
                            Amount you earned from Sales, Custom order and Affiliation Balance. You
                            can cashout this balance.
                        </Typography>
                        <Typography
                            style={{
                                color: "white",
                            }}
                        >
                            $120
                        </Typography>
                    </div>
                    <div className="Request-cashout">
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                            }}
                        >
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "20px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "30px",
                                    color: "#313033",
                                }}
                            >
                                Request Cashout
                            </Typography>
                        </Box>
                        <div className="Text">
                            <Typography
                                style={{
                                    fontFamily: "poppins",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    color: "#AEAAAE",
                                }}
                            >
                                Your earning balance is below $100. You need to make another More
                                $99.33 in Sales or Affiliation Balance to request cashout.
                                <br></br>
                                Upload more assets or Invite your friends to earn more.
                            </Typography>
                        </div>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <CustomButton
                                label="Request"
                                isElevated
                                handleClick={() => setOpenDialog(!openDialog)}
                            ></CustomButton>
                            <CustomModal
                                style={{
                                    display: "flex",
                                }}
                                isOpen={openDialog}
                            >
                                <NavLink to={"/patientdashboard/statistics/bokinghistory"}>
                                    BokingHistory
                                </NavLink>
                                <NavLink to={"/patientdashboard/statistics/tansactions"}>
                                    Tansaction
                                </NavLink>
                            </CustomModal>
                        </Box>
                    </div>

                    <div className="Table-t">
                        <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 650 }} size="large">
                                <TableHead
                                    sx={{
                                        fontFamily: "poppins",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: "500",
                                        lineHeight: "22px",
                                        letterSpacing: "0.07px",
                                        color: "#313033",
                                    }}
                                >
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="right">Account No</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        Array(5)
                                            .fill(0)
                                            .map((_, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Skeleton width="100px" />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Skeleton width="150px" />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Skeleton width="80px" />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Skeleton width="120px" />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    ) : rows.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                <NoAppointmentCard text_one={"No Data Found"} />{" "}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        rows
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage,
                                            )
                                            .map((row) => (
                                                <TableRow key={row.name}>
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
                                                </TableRow>
                                            ))
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default Payout;
