import React, { Fragment, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { Typography, Box } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import "./doctorPayout.scss";
import CustomButton from "../../../components/CustomButton/custom-button";
import Pagination from "@mui/material/Pagination";
import CustomModal from "../../../components/CustomModal";
import DoctorStatisticsNavbar from "../../CustomDoctorComponent/DoctorStatisticsNavbar/DoctorStatisticsNavbar";
import CustomList from "../../../components/CustomList";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomTextField from "../../../components/CustomTextField";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
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
        // eslint-disable-next-line no-confusing-arrow
        const updatedItems = listItems.map((item) =>
            item.name === updatedItem.name ? updatedItem : item,
        );
        setListItems(updatedItems);
    });
    const [value, setValue] = useState([null, null]);
    const rows = [createData("Jan, 2022", "Account No:00110044446", `$ ${120}`, "processing")];
    return (
        <>
            <div className="navbar-daterange">
                <div>
                    <nav className="NavBar-Container-Appoinement">
                        <DoctorStatisticsNavbar />
                    </nav>
                </div>
                <div
                    className="Date-range-picker"
                    style={{ width: "40%", position: "relative", left: "58%" }}
                >
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
                                    <TextField {...startProps} variant="standard" />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} variant="standard" />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </div>
            </div>
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
                    Amount you earned from Sales, Custom order and Affiliation Balance. You can
                    cashout this balance.
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
                        // border:'1px solid',
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
                            // lineHeight: "30px",
                            color: "#AEAAAE",
                        }}
                    >
                        Your earning balance is below $100. You need to make another More $99.33 in
                        Sales or Affiliation Balance to request cashout.
                        <br></br>
                        Upload more assets or Invite your friends to earn more.
                    </Typography>
                </div>
                <Box
                    sx={{
                        // border:'1px solid',
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <CustomButton
                        label="Request"
                        isElevated
                        handleClick={() => setOpenDialog(!openDialog)}
                        buttonCss={
                            {
                                // color:'#E72B4A'
                            }
                        }
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
                <TableContainer component={Paper}>
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
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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

                <div className="page-box">
                    <Typography>Pages 1to1</Typography>
                    <Stack spacing={2}>
                        {/* <Pagination count={10} shape="rounded" /> */}
                        <Pagination
                            count={10}
                            variant=""
                            shape="rounded"
                            style={{
                                color: "red",
                            }}
                        />
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default Payout;
