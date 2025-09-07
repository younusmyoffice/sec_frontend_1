import React, { useEffect } from "react";
import "./shared.scss";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { PatientSearchTable } from "../../../HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticPatientSearch/PatientSearchTable";
import { useNavigate } from "react-router-dom";
import { PaginationCard } from "../../PatientAppointment/PatientCards";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareTable from "./ShareTable";
import CustomButton from "../../../components/CustomButton";
import { ShareModals } from "./ShareModals";


function createData(name, calories, fat, carbs, protein, action,plan,type) {
    return { name, calories, fat, carbs, protein, action,plan,type };
}

const rows = [
    createData(<ShareTable name={"Dr Maria Gracia"} />,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography style={{color:"#E72B4A"}}>Radiology.pdf</Typography>,
    <Typography style={{color:"gray"}}>Radiology</Typography>,
    
    <ShareModals/>,
    <FileDownloadIcon style={{color:"#E72B4A"}}></FileDownloadIcon>,
    
   
<div>
<CustomButton label="share" isTransaprent/>
</div>
       ),

       createData(<ShareTable name={"Dr Maria Gracia"} />,
    <Typography>19:00, 23-10-23</Typography>,
    <Typography style={{color:"#E72B4A"}}>Radiology.pdf</Typography>,
    <Typography style={{color:"gray"}}>Radiology</Typography>,
    <ShareModals/>,
          <FileDownloadIcon style={{color:"#E72B4A"}}></FileDownloadIcon>,
          
         
      <div>
      <CustomButton label="share" isTransaprent/>
      </div>
             ),
  

       createData(<ShareTable name={"Dr Maria Gracia"} />,
       <Typography>19:00, 23-10-23</Typography>,
       <Typography style={{color:"#E72B4A"}}>Radiology.pdf</Typography>,
       <Typography style={{color:"gray"}}>Radiology</Typography>,
       <ShareModals/>,
       <FileDownloadIcon style={{color:"#E72B4A"}}></FileDownloadIcon>,
       
      
   <div>
   <CustomButton label="share" isTransaprent/>
   </div>
          ),


          createData(<ShareTable name={"Dr Maria Gracia"} />,
          <Typography>19:00, 23-10-23</Typography>,
          <Typography style={{color:"#E72B4A"}}>Radiology.pdf</Typography>,
          <Typography style={{color:"gray"}}>Radiology</Typography>,
          <ShareModals/>,
          <FileDownloadIcon style={{color:"#E72B4A"}}></FileDownloadIcon>,
          
         
      <div>
      <CustomButton label="share" isTransaprent/>
      </div>
             ),
  
];

const Shared = () => {
    const [value, setValue] = useState([null, null]);
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    const navigate = useNavigate();
    useEffect( () => {
        // for active component path 
        localStorage.setItem('activeComponent' , 'dashboard');
    },[] )

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
                                    <TableCell>Doctor Name/Date & Time</TableCell>
                                    <TableCell align="right">Date & time</TableCell>
                                    <TableCell align="right">File Name</TableCell>
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
                                        <TableCell align="right" >{row.Type}</TableCell>
                                        
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

export default Shared;
