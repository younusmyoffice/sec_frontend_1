import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../../../components/CustomButton/custom-button"
import { PatientDetail } from "../../SuperAdminHistory/SuperAdminHistoryPatient/PatientDetail";
import pat1 from "../../../constants/DrImages/pat1.png"
import pat2 from "../../../constants/DrImages/pat2.png"
import pat3 from "../../../constants/DrImages/pat3.png"

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <PatientDetail image={pat3} name={"Antony"} gender={"Male"} age={"65y"}/>,
        <Typography sx={{   color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "0.9375rem",
                            letterSpacing: "0.005rem",}} >01234</Typography>,
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >Opthalmologist</Typography>,
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >Dr. Emily William</Typography>,    
                            <CustomButton label="View" isTransaprent/>
    ),
    createData(
        <PatientDetail image={pat2} name={"Aisha"} gender={"Female"} age={"30y"} />,
        <Typography sx={{   color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "0.9375rem",
                            letterSpacing: "0.005rem",}} >01234</Typography>,
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >Dermatologist</Typography>,
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >Dr. Maria Garcia</Typography>,    
                                                <CustomButton label="View" isTransaprent/>,
    ),
    createData(
        <PatientDetail image={pat1} name={"Peter"} gender={"Male"} age={"35y"} />,
        <Typography sx={{   color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "0.9375rem",
                            letterSpacing: "0.005rem",}} >01234</Typography>,
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >Nutrition</Typography>,
                            <Typography sx={{   color: "#939094",
                                                fontFamily: "Poppins",
                                                fontSize: "0.875rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "0.9375rem",
                                                letterSpacing: "0.005rem",}} >Dr. Charles Grace</Typography>,    
                                                <CustomButton label="View" isTransaprent/>
    ),
];

const PatientDetailss =()=>{
    return(
        <>
         <Box
                component={"div"}
                sx={{ position: "relative", top: "4em", width: "100%", display: "block", height: "100%" }}
            >

                <div className="">
                <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 1 }} aria-label="simple table">
                            <TableHead>
                                    <TableRow style={{ fontWeight: "bold" }}>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">ID No</TableCell>
                                        <TableCell align="right">Department</TableCell>
                                        <TableCell align="right">Consulted</TableCell>
                                        <TableCell align="right">Report</TableCell>
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                </div>
            </Box>
        </>
    )
}
export default PatientDetailss