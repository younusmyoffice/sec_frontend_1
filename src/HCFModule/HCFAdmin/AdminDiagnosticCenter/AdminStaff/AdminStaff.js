import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { PaginationCard } from "../../../../Dashboard/PatientAppointment/PatientCards";
import { LabsCard } from "../AdminLabs/LabsCard";
import pen from "../../../../constants/DrImages/Pen.svg";
import { StaffCards } from "./StaffCards";
import CustomModal from "../../../../components/CustomModal";
import CustomTextField from "../../../../components/CustomTextField";
import Edittaff from "./Edittaff";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <StaffCards name={"Rakesh Williams"} Id={"001"} />,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Technician</Typography>,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Cardiology</Typography>,
        <CustomButton label="Active" isTransaprent />,
        <Edittaff />,
    ),
    createData(
        <StaffCards name={"Rakesh Williams"} Id={"001"} />,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Technician</Typography>,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Cardiology</Typography>,
        <CustomButton label="Active" isTransaprent />,
        <Edittaff />,
    ),
];

const AdminStaff = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "diagnosticcenter");
        localStorage.setItem("path", "staff");
    }, []);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [textField1, setTextField1] = useState("");
    const [textField2, setTextField2] = useState("");
    const [textField3, setTextField3] = useState("");
    const [textField4, setTextField4] = useState("");
    const [textField5, setTextField5] = useState("");
    const [textField6, setTextField6] = useState("");
    const [textField7, setTextField7] = useState("");
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "100%",
                    height: "90%",
                    flexDirection: "row",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <nav className="NavBar-Container-Appoinement">
                        <NavLink to={"/hcfadmin/diagnosticcenter/labs"}>Labs</NavLink>
                        <NavLink to={"/hcfadmin/diagnosticcenter/staff"}>Staff</NavLink>
                        <NavLink to={"/hcfadmin/diagnosticcenter/blocked"}>Blocked</NavLink>
                    </nav>
                    <CustomButton
                        buttonCss={{ position: "absolute", right: "0", borderRadius: "6.25rem" }}
                        isTransaprent={true}
                        label="Add Staff"
                        handleClick={() => setOpenDialog(true)}
                    />
                    <CustomModal
                        isOpen={openDialog}
                        title={<h5 style={{ fontWeight: "bold" }}>Create Staff</h5>}
                        footer={
                            <Fragment>
                                <CustomButton
                                    label={"Next"}
                                    handleClick={() => setOpenDialog(false)}
                                    isTransaprent
                                    isText
                                />
                            </Fragment>
                        }
                    >
                        <div style={{ display: "flex" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Name"}
                                defaultValue={textField1}
                                helperText={""}
                                textcss={{ margin: "10px", width: "400px" }}
                                onChange={(value) => setTextField1(value)}
                            />
                            <CustomTextField
                                id={"standard-helperText2"}
                                label={"Designation"}
                                defaultValue={textField2}
                                helperText={""}
                                textcss={{ margin: "10px", width: "400px" }}
                                onChange={(value) => setTextField2(value)}
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Department"}
                                defaultValue={textField3}
                                helperText={""}
                                textcss={{ margin: "10px", width: "400px" }}
                                onChange={(value) => setTextField3(value)}
                            />
                            <CustomTextField
                                id={"standard-helperText2"}
                                label={"Mobile No"}
                                defaultValue={textField4}
                                helperText={""}
                                textcss={{ margin: "10px", width: "400px" }}
                                onChange={(value) => setTextField4(value)}
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Create Password"}
                                defaultValue={textField5}
                                helperText={""}
                                textcss={{ margin: "10px", width: "400px" }}
                                onChange={(value) => setTextField5(value)}
                            />
                            <CustomTextField
                                id={"standard-helperText2"}
                                label={"Confirm Password"}
                                defaultValue={textField6}
                                helperText={""}
                                textcss={{ margin: "10px", width: "400px" }}
                                onChange={(value) => setTextField6(value)}
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"username"}
                                defaultValue={textField7}
                                helperText={""}
                                textcss={{ margin: "10px", width: "250px" }}
                                onChange={(value) => setTextField7(value)}
                            />
                        </div>
                    </CustomModal>
                </nav>
                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <div className="">
                            <TableContainer component={Paper} style={{ background: "white" }}>
                                <Table sx={{ minWidth: 1 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow style={{ fontWeight: "bold" }}>
                                            <TableCell>Name & Details</TableCell>
                                            <TableCell align="right">Title</TableCell>
                                            <TableCell align="right">Department</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell align="right">Action </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div style={{ marginTop: "200px" }}>
                                <PaginationCard />
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdminStaff;
