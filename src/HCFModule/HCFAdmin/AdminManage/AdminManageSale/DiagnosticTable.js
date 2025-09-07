import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { SaleActivityCard } from "./SaleActivityCard";
import CustomButton from "../../../../components/CustomButton";
function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <SaleActivityCard name={"Jolie"} Id={"001"}/>,
        <Typography sx={{   color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "0.9375rem",
                            letterSpacing: "0.005rem",}} >Completed</Typography>,
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >19:00, 23-10-23</Typography>,
                            <CustomButton label="Radiology" isTransaprent/>, 
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >Rad-1</Typography>,   
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >$100</Typography>,
    ),
    createData(
        <SaleActivityCard name={"Jolie"} Id={"001"}/>,
        <Typography sx={{   color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "0.9375rem",
                            letterSpacing: "0.005rem",}} >Completed</Typography>,
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >19:00, 23-10-23</Typography>,
                                                <CustomButton label="Radiology" isTransaprent/>, 
                                                <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >Rad-1</Typography>,   
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >$100</Typography>,
    ),
    createData(
        <SaleActivityCard name={"Jolie"} Id={"001"}/>,
        <Typography sx={{   color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "0.9375rem",
                            letterSpacing: "0.005rem",}} >Completed</Typography>,
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >19:00, 23-10-23</Typography>,
                                                <CustomButton label="Radiology" isTransaprent/>, 
                                                <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >Rad-1</Typography>,   
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >$100</Typography>,
    ),
];
const DoctorTable = ()=>{
    return(
        <>
        <div className="">
                        <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 1 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{ fontWeight: "bold" }}>
                                        <TableCell>Name/ Booking ID</TableCell>
                                        <TableCell align="right">Date & Time</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Department</TableCell>
                                        <TableCell align="right">Test Name</TableCell>
                                        <TableCell align="right">Price</TableCell>
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
                                            <TableCell component="th" scope="row" align="right" >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell  align="right">{row.protein}</TableCell>
                                            <TableCell  align="right">{row.action}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
        </>
    )
}
export default DoctorTable