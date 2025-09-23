import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Skeleton,
    TablePagination
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { AllDoctorTable } from "../AllDoctors/AllDoctorTable";
import pen from "../../../../static/images/DrImages/Pen.svg";
import axiosInstance from "../../../../config/axiosInstance";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import profile from "../../../../static/images/DrImages/Out Patient Department.png";

const HCFDoctorActive = () => {
    const [hcf_id] = useState(localStorage.getItem("hcfadmin_suid"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [specializationDoc, setSpecializationDoc] = useState("CARDIOLOGIST");
    const [nav_specialization, setNav_spelization] = useState([]);

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const scrollContainerRef = useRef(null);

    const fetchData = async (departmentName) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/sec/hcf/ActiveBlockedClinicDoctors/1/${hcf_id}/${departmentName}`);
            setData(response?.data?.response || []);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(specializationDoc);
    }, [specializationDoc]);

    const navSpecializtion = async () => {
        try {
            const resp = await axiosInstance(`/sec/patient/doctorDepartments`);
            setNav_spelization(resp?.data?.response || []);
        } catch (err) {
            console.log("Nav specialization error : ", err);
        }
    };

    useEffect(() => {
        navSpecializtion();
    }, []);

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 100; // Adjust scroll distance as needed
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 100; // Adjust scroll distance as needed
        }
    };

    // Handle pagination change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "100%",
                    flexDirection: "row",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/doctor/alldoctors"}>All Doctors</NavLink>
                    <NavLink to={"/hcfadmin/doctor/active"}>Active</NavLink>
                    <NavLink to={"/hcfadmin/doctor/blocked"}>Blocked</NavLink>
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
                        {/*--------------------- Category component starts ---------------------------------*/}
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <div onClick={handleScrollLeft}>
                                    <ChevronLeftIcon />
                                </div>
                                <Box
                                    sx={{ display: "flex", position: "relative" }}
                                    className={"horizontal-scroll-container NavBar-Container-one"}
                                >
                                    <div
                                        ref={scrollContainerRef}
                                        style={{ overflowX: "auto", display: "flex" }}
                                    >
                                        {nav_specialization.map((specialization, index) => (
                                            <CustomButton
                                                key={index}
                                                label={`${specialization?.department_name}`}
                                                isTransaprent={
                                                    specialization.department_name.toLowerCase() ===
                                                    specializationDoc.toLowerCase()
                                                        ? false
                                                        : true
                                                }
                                                buttonCss={{
                                                    borderRadius: "50px",
                                                    padding: "0.3% 6.5%",
                                                    marginRight: "1%",
                                                    whiteSpace: "normal",
                                                }}
                                                handleClick={() => {
                                                    setSpecializationDoc(specialization?.department_name);
                                                    console.log("specialization : ", specialization?.department_name)
                                                }}
                                            />
                                        ))}
                                    </div>
                                </Box>
                                <div onClick={handleScrollRight}>
                                    <ChevronRightIcon />
                                </div>
                            </Box>
                        </Box>

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
                                    {loading ? (
                                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell colSpan={4} align="center">
                                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                <NoAppointmentCard text_one={"No Data Available"} />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        data
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => (
                                                <TableRow
                                                    key={row.doctor_id} // Ensure uniqueness
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <AllDoctorTable name={row.first_name} user_id={row.suid} profile_picture={
                                                                row?.profile_picture || profile
                                                            }/>
                                                    </TableCell>
                                                    <TableCell align="right">{row.department_name}</TableCell>
                                                    <TableCell align="right">
                                                        <CustomButton
                                                            label={row.clinic_status === 1 ? "Active" : "Inactive"}
                                                            isTransaprent
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <CustomButton label={<img src={pen} alt="Edit" />} isTransaprent />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    )}
                                </TableBody>
                            </Table>

                            {/* Add the TablePagination component */}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HCFDoctorActive;
