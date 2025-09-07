import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { DoctorInfo } from "./DoctorInfo";
import CustomTextField from "../../../../components/CustomTextField";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(<DoctorInfo name={"Dr. Maria Garcia"} specialist={"Neurologist"} />,
        <CustomButton label="Remove" isTransaprent />
    ),

];


const HCFAddDoctors = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [textField1, setTextField1] = useState("");
    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%", flexDirection: "row" }} >


                <nav className="NavBar-Container-Appoinement" >
                    <NavLink to={"/hcfadmin/doctor/adddoctor"}>Add Doctors</NavLink>
                    <NavLink to={"/hcfadmin/doctor/addpackage"}>Add Package</NavLink>
                    {/* <button style={{background:"transparent",borderRadius:"100px",width:"40px",height:"40px",border:"grey solid 1px",textAlign:"center",marginLeft:"900px"}}>
                     </button> */}

                    <Box sx={{ borderRadius: "100px", width: "50px", height: "50px", marginLeft: "800px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"><MoreHorizIcon /></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Mark Inactive</MenuItem>
                                <MenuItem value={20}>Block Profile</MenuItem>
                                <MenuItem value={30}>View Stats</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </nav>

                <Box
                    component={"div"}
                    sx={{ position: "relative", top: "4em", width: "100%", display: "flex", height: "100%" }}
                >
                    <Box sx={{ width: "100%", height: "100%" }} >
                        <div className="" >
                            <TableContainer component={Paper} style={{ background: "white" }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">

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
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <h5 style={{ textAlign: "start", marginLeft: "20px" }}>Login Info</h5>
                            <div style={{ display: "flex", justifyContent: 'flex-start' }}>
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"Mobile No."}
                                    placeholder={"00 0000 0000"}

                                    defaultValue={textField1}
                                    style={{ width: 400, margin: "10px" }}
                                    helperText={""}
                                    onChange={(value) => setTextField1(value)}
                                />

                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={<Box sx={{ display: "flex" }}>
                                        <Typography>Mobile No.</Typography>
                                        <button style={{ marginLeft: "240px", border: "none", backgroundColor: "transparent", color: "red", fontWeight: "bold" }}>Verify</button>
                                    </Box>}
                                    placeholder={"00 0000 0000"}
                                    defaultValue={textField1}
                                    style={{ width: 400, margin: "10px" }}
                                    helperText={""}
                                    onChange={(value) => setTextField1(value)}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: 'flex-start' }}>
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"Create Password"}
                                    placeholder={"*****"}
                                    defaultValue={textField1}
                                    style={{ width: 400, margin: "10px" }}
                                    helperText={""}
                                    onChange={(value) => setTextField1(value)}
                                />
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"Confirm Password"}
                                    placeholder={"*****"}
                                    defaultValue={textField1}
                                    style={{ width: 400, margin: "10px" }}
                                    helperText={""}
                                    onChange={(value) => setTextField1(value)}
                                />
                            </div>

                            <h5 style={{ textAlign: "start", marginLeft: "20px" }}>Working days</h5>
                            <div>
                                <div style={{ display: "flex", margin: "10px" }} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateRangePicker']}>
                                            <DateRangePicker localeText={{ start:<div>From <CalendarTodayIcon style={{marginLeft:"130px",color:"grey"}}/></div>, end: <div>To <CalendarTodayIcon style={{marginLeft:"130px",color:"grey"}}/></div> }} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <h5 style={{ textAlign: "start", marginLeft: "20px" }}>Working Time</h5>
                                <div style={{ display: "flex", margin: "10px" }} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={['MultiInputTimeRangeField', 'SingleInputTimeRangeField']}
                                        >
                                            <MultiInputTimeRangeField
                                                slotProps={{
                                                    textField: ({ position }) => ({
                                                        label: position === 'start' ? 'From' : 'To',
                                                    }),
                                                }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <CustomButton label="Continue" buttonCss={{ marginTop: "40px" }} />
                            </div>
                        </div>

                    </Box>
                </Box>
            </Box >
        </>
    );
};

export default HCFAddDoctors;