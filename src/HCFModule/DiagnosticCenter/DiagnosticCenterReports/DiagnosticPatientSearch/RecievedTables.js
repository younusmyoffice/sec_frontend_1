import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import pen from "../../../../constants/DrImages/Pen.svg"
import { PatientSearchTable } from "./PatientSearchTable";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}
const rows = [
    createData(<PatientSearchTable name={"Patient Name"} Id={"TST00012"}/>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>Rad-1</Typography>,
    <Typography>$100</Typography>,
    <div><CustomButton label="Accept" isTransaprent/> <MoreHorizIcon
    style={{
        color: "grey",
    }}
/></div>,
       ),
       createData(<PatientSearchTable name={"Patient Name"} Id={"TST00012"}/>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>Rad-1</Typography>,
    <Typography>$100</Typography>,
    <div><CustomButton label="Accept" isTransaprent/> <MoreHorizIcon
    style={{
        color: "grey",
    }}
/></div>
       ),
       createData(<PatientSearchTable name={"Patient Name"} Id={"TST00012"}/>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>Rad-1</Typography>,
    <Typography>$100</Typography>,
    <div><CustomButton label="Accept" isTransaprent/> <MoreHorizIcon
    style={{
        color: "grey",
    }}
/></div>
       )
];
const RecievedTables = () => {
    const navigate = useNavigate();
    return(
        <>
          <TableContainer component={Paper} style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name & Booking ID</TableCell>
                                    <TableCell align="right">Date & Time</TableCell>
                                    <TableCell align="right">Schedule</TableCell>
                                    <TableCell align="right">Test name</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Action</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right" >{row.carbs}</TableCell>
                                        <TableCell align="right" >{row.protein}</TableCell>
                                        <TableCell align="right" >{row.action}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
        </>
    )
 }
        export default RecievedTables