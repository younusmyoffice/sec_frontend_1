import React from "react";
import "./received.scss";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { useState } from "react";
import RecieveTable from "../../PatientManage/Reports/Received/ReceiveTable";
import { PaginationCard } from "../../PatientAppointment/PatientCards";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CustomButton from "../../../components/CustomButton";



function createData(name, calories, fat, carbs, protein, action,plan,type) {
    return { name, calories, fat, carbs, protein, action,plan ,type};
}
const rows = [
    createData(<Typography>Radiology.pdf</Typography>,
    <RecieveTable  name={"Apollo Diag"} Id={"TST00012"}/>,
    <Typography style={{color:"gray"}}>19:00, 23-10-23</Typography>,
    <Typography style={{color:"gray"}}>Radiology</Typography>,
    
    <Typography style={{color:"#E72B4A"}}>View</Typography>,
    <FileDownloadIcon style={{color:"#E72B4A"}}></FileDownloadIcon>,
    
   
<div>
<CustomButton label="share" isTransaprent/>
</div>
       ),
       createData(<Typography>Radiology.pdf</Typography>,
       <RecieveTable  name={"Apollo diag"} Id={"TST00012"}/>,
    <Typography style={{color:"gray"}}>19:00, 23-10-23</Typography>,
    <Typography style={{color:"gray"}}>Radiology</Typography>,
    
    <Typography style={{color:"#E72B4A"}}>View</Typography>,
    <FileDownloadIcon style={{color:"#E72B4A"}}></FileDownloadIcon>,
   
    <div>
         <CustomButton label="share" isTransaprent/>
         </div>
    
       ),

       createData(<Typography>Radiology.pdf</Typography>,
       <RecieveTable  name={"Apollo Diag"} Id={"TST00012"}/>,
       <Typography style={{color:"gray"}}>19:00, 23-10-23</Typography>,
       <Typography style={{color:"gray"}}>Radiology</Typography>,
      
       <Typography style={{color:"#E72B4A"}}>View</Typography>,
       <FileDownloadIcon style={{color:"#E72B4A"}}></FileDownloadIcon>,
     
   <div>
   <CustomButton label="share" isTransaprent/>
   </div>
          ),

          createData(<Typography>Radiology.pdf</Typography>,
          <RecieveTable  name={"Apollo Diag"} Id={"TST00012"}/>,
          <Typography style={{color:"gray"}}>19:00, 23-10-23</Typography>,
          <Typography style={{color:'gray'}}>Radiology</Typography>,
        
          <Typography style={{color:"#E72B4A"}}>View</Typography>,
          <FileDownloadIcon style={{color:"#E72B4A"}}></FileDownloadIcon>,
       
      <div>
     <CustomButton label="share" isTransaprent/>
      </div>
             ),
  
];

const Received = () => {
    const [value, setValue] = useState([null, null]);
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    return (
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
                                             <TableCell>File Name/Lab</TableCell>
                                             <TableCell >Lab/Booking ID</TableCell>
                                             <TableCell align="right">Date&Time</TableCell>
                                             <TableCell align="right">Category</TableCell>
                                             <TableCell align="right"></TableCell>
                                             <TableCell align="right"></TableCell>
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
                                                 <TableCell align="right" >{row.type}</TableCell>
                                                 
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
       
    );
};

export default Received;