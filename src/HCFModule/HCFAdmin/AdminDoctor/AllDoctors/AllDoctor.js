import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { AllDoctorTable } from "./AllDoctorTable";
import pen from "../../../../constants/DrImages/Pen.svg";
import { PaginationCard } from "../../../../Dashboard/PatientAppointment/PatientCards";
import { baseURL } from "../../../../constants/const";
import axios from "axios";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <AllDoctorTable name={"Dr. Maria Garcia"} Id={"001"} />,
        <Typography>Cardiology</Typography>,
        <CustomButton label="Active" isTransaprent />,
        <CustomButton label={<img src={pen} />} isTransaprent />,
    ),
    createData(
        <AllDoctorTable name={"Dr. Maria Garcia"} Id={"001"} />,
        <Typography>Cardiology</Typography>,
        <CustomButton label="Inactive" isTransaprent isDisabled />,
        <CustomButton label={<img src={pen} />} isTransaprent />,
    ),
    createData(
        <AllDoctorTable name={"Dr. Maria Garcia"} Id={"001"} />,
        <Typography>Cardiology</Typography>,
        <CustomButton label="Active" isTransaprent />,
        <CustomButton label={<img src={pen} />} isTransaprent />,
    ),
];

const HCFAllDoctors = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "doctors");
        localStorage.setItem("path", "alldoctors");
    }, []);
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/hcf/DashboardDoctordetails`);
            setData(response?.data?.response);
            console.log("All doctor data :", response.data.response);
        } catch (error) {
            console.log(error.response);
        }
    };

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
                        <NavLink to={"/hcfadmin/doctor/alldoctors"}>All Doctors</NavLink>
                        <NavLink to={"/hcfadmin/doctor/active"}>Active</NavLink>
                        <NavLink to={"/hcfadmin/doctor/blocked"}>Blocked</NavLink>
                    </nav>
                    <CustomButton
                        buttonCss={{ position: "absolute", right: "0", borderRadius: "6.25rem" }}
                        isTransaprent={true}
                        label="Add Doctors"
                        handleClick={() => {
                            navigate("/hcfadmin/doctor/adddoctor");
                        }}
                    />
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
                            <div style={{ display: "flex", margin: "10px" }}>
                                <CustomButton label="All" buttonCss={{ margin: "10px" }} />
                                <CustomButton
                                    label="Dentist"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="Neurologist"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="Orthopedic"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="Nutritionist"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="Pediatric"
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                                <CustomButton
                                    label="More..."
                                    buttonCss={{ margin: "10px" }}
                                    isTransaprent
                                />
                            </div>
                            <TableContainer component={Paper} style={{ background: "white" }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name & Details</TableCell>
                                            <TableCell align="right">Department</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.map((data) => (
                                            <TableRow
                                                key={data.suid}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <AllDoctorTable
                                                        name={data?.first_name}
                                                        Id={"001"}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">Cardiology</TableCell>
                                                <TableCell align="right">
                                                    {" "}
                                                    <CustomButton label="Active" isTransaprent />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <CustomButton
                                                        label={<img src={pen} />}
                                                        isTransaprent
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div style={{ marginTop: "140px", marginLeft: "10px" }}>
                            <PaginationCard />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HCFAllDoctors;
