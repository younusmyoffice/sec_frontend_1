import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Dept from "../../../constants/DrImages/Out Patient Department.png";
import Name from "../../../constants/DrImages/Name.png";
import Examine from "../../../constants/DrImages/Examination.png"
import { Box, Paper } from "@mui/material";
import DashboardTable from "./DashboardTable";




const AdminDashboard = () => {
    return(
        <>
        <div style={{display:"flex"}}>
          <div className='DoctorDashboardCard'>
                     
                     <div className="Number-Container" >
                         <Typography sx={{
                             color: "#E72B4A",
                             fontFamily: "Poppins",
                             fontSize: "3rem",
                             fontStyle: "normal",
                             fontWeight: "600",
                             lineHeight: "4.625rem",
                             marginTop: "30px",
                             marginLeft:"20px"
                         }} >18</Typography>
                     </div>
                     <div className="Number-Container">
                         <Typography sx={{
                             color: "#313033",
                             fontFamily: "Poppins",
                             fontSize: "1.5rem",
                             fontStyle: "normal",
                             fontWeight: "400",
                             lineHeight: "1.5rem",
                             marginLeft:"10px",
                             marginTop:"10px",
                             
                         }} >Doctor</Typography>
                         <Box  component={'img'} sx={{width : "100px" , height : "100px",marginLeft:"150px",marginTop:"-90px"}} src={Dept} alt="Our Patient Department"></Box>
                     </div>
             </div>
           
             <div className='DoctorDashboardCard' style={{marginLeft:"20px"}}>
                     <div className="Number-Container" >
                         <Typography sx={{
                             color: "#E72B4A",
                             fontFamily: "Poppins",
                             fontSize: "3rem",
                             fontStyle: "normal",
                             fontWeight: "600",
                             lineHeight: "4.625rem",
                             marginTop: "30px",
                             marginLeft:"20px"
                         }} >98</Typography>
                     </div>
                     <div className="Number-Container">
                         <Typography sx={{
                             color: "#313033",
                             fontFamily: "Poppins",
                             fontSize: "1.5rem",
                             fontStyle: "normal",
                             fontWeight: "400",
                             lineHeight: "1.5rem",
                             marginLeft:"10px",
                             marginTop:"10px",
                             
                         }} >Patient</Typography>
                         <Box  component={'img'} sx={{width : "100px" , height : "100px",marginLeft:"150px",marginTop:"-90px"}} src={Name} alt="Name"></Box>
                     </div>
             </div>

             <div className='DoctorDashboardCard' style={{marginLeft:"20px"}}>
                     <div className="Number-Container" >
                         <Typography sx={{
                             color: "#E72B4A",
                             fontFamily: "Poppins",
                             fontSize: "3rem",
                             fontStyle: "normal",
                             fontWeight: "600",
                             lineHeight: "4.625rem",
                             marginTop: "30px",
                             marginLeft:"20px"
                         }} >58</Typography>
                     </div>
                     <div className="Number-Container">
                         <Typography sx={{
                             color: "#313033",
                             fontFamily: "Poppins",
                             fontSize: "1.5rem",
                             fontStyle: "normal",
                             fontWeight: "400",
                             lineHeight: "1.5rem",
                             marginLeft:"10px",
                             marginTop:"10px",
                             
                         }} >HCF</Typography>
                         <Box  component={'img'} sx={{width : "100px" , height : "100px",marginLeft:"150px",marginTop:"-90px"}} src={Examine} alt="Examination"></Box>
                     </div>
                     
             </div>
             </div>
             
        </>
    )
}

export default AdminDashboard;