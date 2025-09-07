import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DoctorImage from "../../../constants/DrImages/image1.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "react-datepicker/dist/react-datepicker.css";
import { BookingHistoryDrCard } from "./BookingHistoryDrCard";
import CustomButton from "../../../components/CustomButton/custom-button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import axios from "axios";
import { baseURL, currencysign } from "../../../constants/const";

// console.log("Calling Bokking history")

const BookingHistory = () => {
    const [bookingHistoryData, setBookingHistoryData] = useState([]);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }

    const rows = [
        // bookingHistoryData.map( data => console.log(  createData( <BookingHistoryDrCard name={"Dr.Maria Garcia@"}  specialist = {"Neurologist"}  BookingId = {"001"} /> , <CustomButton buttonCss={{   display: "inline-flex",
        // height: "2rem",
        // padding: "0.5rem 1rem",
        // justifyContent: "center",
        // alignItems: "center",
        // gap: "0.5rem",
        // flexShrink: "0",
        // borderRadius: "6.25rem"
        // }}
        // isTransaprent={"true"}
        // label={"Completed"} />  ,
        // <Typography sx={{color: "#939094",
        //     textAlign: "center",
        //     fontFamily: "Poppins",
        //     fontSize: "0.625rem",
        //     fontStyle: "normal",
        //     fontWeight: "400",
        //     lineHeight: "0.9375rem",
        //     letterSpacing: "0.005rem",}} >01-02-2023 10:30 AM</Typography>  ,
        // <Typography sx={{color: "#939094",
        //     textAlign: "center",
        //     fontFamily: "Poppins",
        //     fontSize: "0.800rem",
        //     fontStyle: "normal",
        //     fontWeight: "400",
        //     lineHeight: "0.9375rem",
        //     letterSpacing: "0.005rem",}} >30min | Messaging pack</Typography>,
        //     <Typography
        //     sx={{   color: "#E72B4A",
        //             textAlign: "center",
        //             fontFamily: "Poppins",
        //             fontSize: "0.875rem",
        //             fontStyle: "normal",
        //             fontWeight: "500",
        //             lineHeight: "1.375rem",
        //             letterSpacing: "0.00438rem",}}
        //     >$12</Typography> ),)

        //  ),

        createData(
            <BookingHistoryDrCard
                name={"Dr.Maria Garcia"}
                specialist={"Neurologist"}
                BookingId={"001"}
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
                label={"Completed"}
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
                01-02-2023 10:30 AM
            </Typography>,
            <Typography
                sx={{
                    color: "#939094",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontSize: "0.800rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "0.9375rem",
                    letterSpacing: "0.005rem",
                }}
            >
                30min | Messaging pack
            </Typography>,
            <Typography
                sx={{
                    color: "#E72B4A",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontSize: "0.875rem",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "1.375rem",
                    letterSpacing: "0.00438rem",
                }}
            >
                $12
            </Typography>,
        ),

        createData(
            <BookingHistoryDrCard
                name={"Dr.Samuel More"}
                specialist={"Dentist"}
                BookingId={"002"}
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
                label={"Cancelled"}
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
                01-02-2023 10:30 AM
            </Typography>,
            <Typography
                sx={{
                    color: "#939094",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontSize: "0.800rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "0.9375rem",
                    letterSpacing: "0.005rem",
                }}
            >
                30min | Messaging pack
            </Typography>,
            <Typography
                sx={{
                    color: "#E72B4A",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontSize: "0.875rem",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "1.375rem",
                    letterSpacing: "0.00438rem",
                }}
            >
                $20
            </Typography>,
        ),
        createData(
            <BookingHistoryDrCard
                name={"Dr.Blackey Lively"}
                specialist={"Pediatric"}
                BookingId={"003"}
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
                label={"Completed"}
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
                01-02-2023 10:30 AM
            </Typography>,
            <Typography
                sx={{
                    color: "#939094",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontSize: "0.800rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "0.9375rem",
                    letterSpacing: "0.005rem",
                }}
            >
                30min | Messaging pack
            </Typography>,
            <Typography
                sx={{
                    color: "#E72B4A",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontSize: "0.875rem",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "1.375rem",
                    letterSpacing: "0.00438rem",
                }}
            >
                $32
            </Typography>,
        ),
        createData(
            <BookingHistoryDrCard
                name={"Dr.Elezabeth Oslen"}
                specialist={"Physician"}
                BookingId={"004"}
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
                label={"Completed"}
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
                01-02-2023 10:30 AM
            </Typography>,
            <Typography
                sx={{
                    color: "#939094",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontSize: "0.800rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "0.9375rem",
                    letterSpacing: "0.005rem",
                }}
            >
                30min | Messaging pack
            </Typography>,
            <Typography
                sx={{
                    color: "#E72B4A",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontSize: "0.875rem",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "1.375rem",
                    letterSpacing: "0.00438rem",
                }}
            >
                $42
            </Typography>,
        ),
        // createData(<BookingHistoryDrCard name={"Dr.Cris Evan"}  specialist = {"Ortho"}  BookingId = {"005"} /> , 356, 16.0, 49, 3.9),
    ];

    //     const [startDate, setStartDate] = React.useState(null);
    //   const [endDate, setEndDate] = React.useState(null);

    const fetchData = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/patient/appointmentHistory/7`);
            setBookingHistoryData(response?.data?.response);
            console.log("Booking history data :", response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "bookinghistory");
        fetchData();
    }, []);

    const [value, setValue] = React.useState([null, null]);
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/patientdashboard/manage/bookinghistory"}>
                        Booking History
                    </NavLink>
                    <NavLink to={"/patientdashboard/manage/transactions"}>Transaction</NavLink>
                    <NavLink to={"/patientdashboard/manage/reports"}>Report</NavLink>
                    <NavLink to={"/patientdashboard/manage/subscriptions"}>Subscription</NavLink>
                </nav>
                <Box
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Box sx={{ width: "40%" }}>
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
                    </Box>
                </Box>
                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4.5em",
                        width: "100%",
                        display: "flex",
                        height: "90%",
                    }}
                >
                    <TableContainer component={Paper} sx={{ backgroundColor: "#ffff" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name & Details</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Date & Time</TableCell>
                                    <TableCell align="center">Package</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookingHistoryData?.length === 0 ? (
                                    <h1>Loading......</h1>
                                ) : (
                                    bookingHistoryData.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <BookingHistoryDrCard
                                                    name={`${row?.name}`}
                                                    specialist={"Neurologist"}
                                                    BookingId={"001"}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
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
                                                    label={`${row?.status}`}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                {" "}
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
                                                    `{row?.created_at}`
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    sx={{
                                                        color: "#939094",
                                                        textAlign: "center",
                                                        fontFamily: "Poppins",
                                                        fontSize: "0.800rem",
                                                        fontStyle: "normal",
                                                        fontWeight: "400",
                                                        lineHeight: "0.9375rem",
                                                        letterSpacing: "0.005rem",
                                                    }}
                                                >
                                                    {row?.duration} | Messaging pack
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    sx={{
                                                        color: "#E72B4A",
                                                        textAlign: "center",
                                                        fontFamily: "Poppins",
                                                        fontSize: "0.875rem",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        lineHeight: "1.375rem",
                                                        letterSpacing: "0.00438rem",
                                                    }}
                                                >
                                                    {currencysign}12
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                                {/* {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default BookingHistory;
