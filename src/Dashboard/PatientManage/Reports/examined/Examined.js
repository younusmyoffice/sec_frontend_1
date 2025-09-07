import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { PatientSearchTable } from "../../../../HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticPatientSearch/PatientSearchTable";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { useState } from "react";
import { PaginationCard } from "../../../PatientAppointment/PatientCards";



function createData(name, calories, fat, carbs, protein, action,plan) {
    return { name, calories, fat, carbs, protein, action,plan };
}
const rows = [
    createData(<PatientSearchTable name={"Apollo Diag"} Id={"TST00012"}/>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>Rad-1</Typography>,
    <Typography>$100</Typography>,
<div>
<MoreHorizIcon
    style={{
        color: "grey",
    }}
/>
</div>
       ),
       createData(<PatientSearchTable name={"Apollo Diag"} Id={"TST00012"}/>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography>Rad-1</Typography>,
    <Typography>$100</Typography>,
    <div><MoreHorizIcon
    style={{
        color: "grey",
    }}
/></div>
    
       ),

       createData(<PatientSearchTable name={"Apollo Diag"} Id={"TST00012"}/>,
       <Typography>19:00, 23-10-23</Typography>,
       <Typography>19:00, 23-10-23</Typography>,
       <Typography>Rad-1</Typography>,
       <Typography>$100</Typography>,
   <div>
   <MoreHorizIcon
       style={{
           color: "grey",
       }}
   />
   </div>
          ),
  
];
const Examined = () => {
    const [value, setValue] = useState([null, null]);
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    const navigate = useNavigate();
    return(
        <>
                   <Box sx={{ position  :"relative" , top : "-9em" , width : "100%" , display : "flex" , justifyContent : "flex-end"}}>
                <Box sx={{width : "40%"}} >
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
          <Box sx={{justifyContent:"flex-start",marginTop:"-50px"}}>
          <TableContainer component={Paper} style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Lab Name/Booking ID</TableCell>
                                    <TableCell align="right">Date & time</TableCell>
                                    <TableCell align="right">Schedule</TableCell>
                                    <TableCell align="right">Test Name</TableCell>
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
                                        <TableCell align="right" >{row.plan}</TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>
                    <Box sx={{justifyContent:'flex-end',marginTop:"150px"}}>
                 <PaginationCard/> 
                 </Box>
        </>
    )
 }
export default Examined

