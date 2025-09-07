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
import { Link, NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { LabsCard } from "./LabsCard";
import pen from "../../../../constants/DrImages/Pen.svg";
import { PaginationCard } from "../../../../Dashboard/PatientAppointment/PatientCards";
import CustomModal from "../../../../components/CustomModal";
import CustomDropdown from "../../../../components/CustomDropdown";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import CustomTextField from "../../../../components/CustomTextField/custom-text-field";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <Link to={"/hcfadmin/diagnosticcenter/labs/:1234"} style={{ textDecoration: "none" }}>
            <LabsCard name={"Radiology"} Id={"001"} />
        </Link>,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Cardiology</Typography>,
        <CustomButton label="Active" isTransaprent />,
        <CustomButton label={<img src={pen} />} isTransaprent />,
    ),
    createData(
        <Link to={"/hcfadmin/diagnosticcenter/labs/:4321"} style={{ textDecoration: "none" }}>
            <LabsCard name={"Radiology"} Id={"001"} />
        </Link>,
        <Typography style={{ color: "#313033", fontFamily: "Poppins" }}>Cardiology</Typography>,
        <CustomButton label="Active" isTransaprent />,
        <CustomButton label={<img src={pen} />} isTransaprent />,
    ),
];

const AdminLabs = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "diagnosticcenter");
        localStorage.setItem("path", "labs");
    }, []);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const dropdownItems = ["item1", "item2", "item3"];
    const [activeDropdown, setActiveDropdown] = useState("");
    const [value, setValue] = useState([null, null]);
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    useState([null, null]);

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
                        label="Create Lab"
                        handleClick={() => setOpenDialog(true)}
                    />
                    <CustomModal
                        isOpen={openDialog}
                        title={
                            <div>
                                <h5 style={{ fontWeight: "bold" }}>Add Lab</h5>
                                <h6 style={{ color: "gray" }}>Create a lab here</h6>
                            </div>
                        }
                        footer={
                            <Fragment>
                                <CustomButton
                                    label={"Create"}
                                    handleClick={() => setOpenDialog(false)}
                                    isTransaprent
                                    isText
                                />
                            </Fragment>
                        }
                    >
                        <div>
                            <CustomDropdown
                                label={"Department"}
                                items={dropdownItems}
                                activeItem={activeDropdown}
                                handleChange={(item) => setActiveDropdown(item)}
                                style={{ width: "400px" }}
                            />
                        </div>
                        <div>
                            <p style={{ fontWeight: "bold" }}>Working Days</p>
                        </div>
                        <div style={{ display: "flex", marginLeft: "10px" }}>
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
                        </div>
                        <Typography style={{ fontWeight: "bolder", marginTop: "30px" }}>
                            Working Days
                        </Typography>

                        <div className="edu-textfields">
                            <div className="A-B-C1">
                                <CustomTextField
                                    label="From"
                                    helperText={""}
                                    textcss={{
                                        width: "350px",
                                    }}
                                ></CustomTextField>
                                <CustomTextField
                                    label="To"
                                    helperText={""}
                                    textcss={{
                                        width: "350px",
                                    }}
                                ></CustomTextField>
                            </div>
                        </div>
                        <div style={{ marginLeft: "30px", marginTop: "-10px" }}>
                            <p style={{ marginLeft: "-20px" }}>Description</p>
                            <textarea
                                className="textarea"
                                rows={"7"}
                                cols={"50"}
                                minLength={"18"}
                                maxLength={"25"}
                                style={{ color: "gray", marginLeft: "-20px" }}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                                tellus quis sapien interdum commodo. Nunc tincidunt justo non dolor
                                bibendum, vitae elementum elit tincidunt. Pellentesque habitant
                                morbi tristique senectus et netus et malesuada fames ac turpis
                                egestas. Morbi maximus, nisl.
                            </textarea>
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

export default AdminLabs;
