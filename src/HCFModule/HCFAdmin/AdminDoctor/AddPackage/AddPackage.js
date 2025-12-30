import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import "./addpackage.scss"
import { AddPackageTable } from "./AddPackageTable";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CustomModal from "../../../../components/CustomModal";
import { Add } from "@mui/icons-material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CustomTextField from "../../../../components/CustomTextField";
import CustomDropdown from "../../../../components/CustomDropdown";


function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(<AddPackageTable heading={"Messaging Plan"} cost={"$12 | 30min & 60"}/>,
        <CustomButton label="Delete" leftIcon={<DeleteIcon />} isTransaprent />,
        <CustomButton label="Edit" leftIcon={<EditIcon />} isTransaprent />,
    ),
    createData(<AddPackageTable heading={"Voice Plan"} cost={"$20 | 30min & 60"}/>,
        <CustomButton label="Delete" leftIcon={<DeleteIcon />} isTransaprent />,
        <CustomButton label="Edit" leftIcon={<EditIcon />} isTransaprent />,
    ), 
    createData(<AddPackageTable heading={"Video Plan"} cost={"$25 | 30min & 60"}/>,
        <CustomButton label="Delete" leftIcon={<DeleteIcon />} isTransaprent />,
        <CustomButton label="Edit" leftIcon={<EditIcon />} isTransaprent />,
    ), 

];


const HCFAddPackage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [textField1, setTextField1] = useState("");
    const [textField2, setTextField2] = useState("");
    const [textField3, setTextField3] = useState("");
    const [activeDropdown, setActiveDropdown] = useState("");
    const dropdownItems = ["item1", "item2", "item3"];
    return(
        <>
            <Box sx={{ display: "flex", width: "98%" , height : "100%" , height : "90%" , flexDirection : "row" }} >

                   
                <nav className="NavBar-Container-Appoinement" >
                    <NavLink to={"/hcfadmin/doctor/adddoctor"}>Add Doctors</NavLink>
                    <NavLink to={"/hcfadmin/doctor/addpackage"}>Add Package</NavLink>
                </nav>
                        
                <Box
                    component={"div"}
                    sx={{ position: "relative", top: "4em", width: "100%", display: "flex" , height : "100%" }}
                >
                    <Box sx={{ width: "100%" ,  height : "100%"  ,}} >
                        <div className="" >
                            <h5 style={{textAlign:"start",margin:"20px"}}>Add Plan</h5>
                        </div>
                        <div style={{display:"flex",justifyContent:"flex-end",marginRight:"20px",marginTop:"-30px"}}>
                        
                        <CustomButton
                           label={<div><AddIcon style={{marginBottom:"-7px"}}/>Add</div>}
                            isElevated isTransaprent
                            handleClick={() => setOpenDialog(true)}
                        />
                        <CustomModal
                            isOpen={openDialog}
                            title={"Add Plan"}
                            footer={
                                <Fragment >
                                    <CustomButton
                                        label={"Save"}
                                        buttonCss={{margin:"auto",marginTop:"30px"}}
                                        handleClick={() => setOpenDialog(false)}
                                        isText
                                    />
                                </Fragment>
                            }
                        >
                            <div>
                            <h5 style={{ textAlign: "start", marginLeft: "20px" }}><div><CheckBoxIcon style={{marginBottom:"-7px",color:"red"}}/>Messaging Plan</div></h5>
                                <div style={{ display: "flex", justifyContent: 'flex-start' }}>
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Price"}
                                        defaultValue={textField1}
                                        style={{ width: 400, marginLeft: "10px" }}
                                        helperText={""}
                                        onChange={(value) => setTextField1(value)}
                                    />
                             <CustomDropdown
                            label={"Duration"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            dropdowncss={{marginTop:"0px",width:"400px",marginLeft:"10px"}}
                            handleChange={(item) => setActiveDropdown(item)}
                        />
                            </div>
                            </div>
                            <div>
                            <h5 style={{ textAlign: "start", marginLeft: "20px" }}><div><CheckBoxIcon style={{marginBottom:"-7px",color:"red"}}/>Voice Plan</div></h5>
                                <div style={{ display: "flex", justifyContent: 'flex-start' }}>
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Price"}
                                        defaultValue={textField2}
                                        style={{ width: 400, marginLeft: "10px" }}
                                        helperText={""}
                                        onChange={(value) => setTextField2(value)}
                                    />
                             <CustomDropdown
                            label={"Duration"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            dropdowncss={{marginTop:"0px",width:"400px",marginLeft:"10px"}}
                            handleChange={(item) => setActiveDropdown(item)}
                        />
                            </div>
                          
                            <div>
                            <h5 style={{ textAlign: "start", marginLeft: "20px" }}><div><CheckBoxIcon style={{marginBottom:"-7px",color:"red"}}/>Video Call Plan</div></h5>
                                <div style={{ display: "flex", justifyContent: 'flex-start' }}>
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Price"}
                                        defaultValue={textField3}
                                        style={{ width: 400, marginLeft: "10px" }}
                                        helperText={""}
                                        onChange={(value) => setTextField3(value)}
                                    />
                             <CustomDropdown
                            label={"Duration"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            dropdowncss={{marginTop:"0px",width:"400px",marginLeft:"10px"}}
                            handleChange={(item) => setActiveDropdown(item)}
                        />
                            </div>
                            </div>
                            </div>
                        </CustomModal>
                    
                    </div>
                    
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
                        </div>
                       <div style={{marginTop:"30px"}}> <CustomButton label="Save"/></div>

                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HCFAddPackage;