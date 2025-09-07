import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { PatientSearchTable } from "../DiagnosticPatientSearch/PatientSearchTable";
import { ShareListModal } from "./ShareListModal";


function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}
const rows = [
    createData(<PatientSearchTable name={"Patient Name"} Id={"001"}/>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>Rad-1</Typography>,
    <ShareListModal/>,
<div>
<MoreHorizIcon
    style={{
        color: "grey",
    }}
/>
</div>
       ),
       createData(<PatientSearchTable name={"Patient Name"} Id={"001"}/>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>Rad-1</Typography>,
    <ShareListModal/>,
    <div><MoreHorizIcon
    style={{
        color: "grey",
    }}
/></div>
    
       ),
  
];
const Shared = () => {
    const navigate = useNavigate();
    return(
        <>
          <TableContainer component={Paper} style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name/Booking ID</TableCell>
                                    <TableCell align="right">Date & time</TableCell>
                                    <TableCell align="right">Test Name</TableCell>
                                    <TableCell align="right">File Name</TableCell>
                                    <TableCell align="right">Details</TableCell>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
        </>
    )
 }
        export default Shared