import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Skeleton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { AllDoctorTable } from "./AllDoctorTable";
import pen from "../../../../static/images/DrImages/Pen.svg";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import profile from "../../../../static/images/DrImages/doc1.png";

const HCFAllDoctors = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [nav_specialization, setNav_spelization] = useState([]);
    const [specializationDoc, setSpecializationDoc] = useState("CARDIOLOGIST");
    const [specializationData, setSpecializationData] = useState([]);
    const [hcf_id] = useState(localStorage.getItem("hcfadmin_suid"));
    const [loading, setLoading] = useState(false);

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance(`/sec/hcf/DashboardDoctordetails`);
            setData(response?.data?.response);
            console.log("All doctor data:", response.data.response);
        } catch (error) {
            console.log(error.response);
        }
    };

    // Logic for specialization
    const navSpecialization = async () => {
        try {
            const resp = await axiosInstance(`/sec/patient/doctorDepartments`);
            setNav_spelization(resp?.data?.response);
        } catch (err) {
            console.log("Nav specialization error:", err);
        }
    };

    useEffect(() => {
        navSpecialization();
    }, []);

    const scrollContainerRef = useRef(null);

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 100;
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 100;
        }
    };

    const fetchSpecializationDetail = async (departmentName) => {
        setLoading(true);
        try {
            const resp = await axiosInstance(
                `/sec/hcf/clinicDoctorsByDept/${hcf_id}/${departmentName}`,
            );
            console.log("Response:", departmentName);
            setSpecializationData(resp?.data?.response[`${departmentName}`] || []);
        } catch (err) {
            console.log("Error:", err);
            setSpecializationData([]); // Ensure state is an array even on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpecializationDetail(specializationDoc);
    }, [specializationDoc]);

    // Handle pagination change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const currentStatus = data?.status; // "active" or "inactive"

    const [status, setStatus] = useState(currentStatus); // "active" or "inactive"

    const toggleStatus = async (user_id) => {
        try {
            const newStatus = status === "active" ? "inactive" : "active"; // Toggle status
            const response = await axiosInstance.post(`/sec/hcf/ActiveDeactiveClinicDoctor`, {
                hcf_id: hcf_id,
                clinic_doctor_id: String(user_id), // Ensure user_id is passed as a string
                status: newStatus === "active" ? "1" : "0", // Convert to API-compatible format
            });

            if (response.status === 200) {
                setSpecializationData((prevData) =>
                    prevData.map((doctor) =>
                        doctor.user_id === user_id ? { ...doctor, status: newStatus } : doctor,
                    ),
                );
                alert(
                    `User has been ${
                        newStatus === "active" ? "activated" : "deactivated"
                    } successfully.`,
                );
            } else {
                alert("Failed to update status. Please try again.");
            }
        } catch (error) {
            console.error("Error toggling status:", error);
            alert("An error occurred while updating status.");
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "90%",
                    flexDirection: "row",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/doctor/alldoctors"}>All Doctors</NavLink>
                    <NavLink to={"/hcfadmin/doctor/active"}>Active</NavLink>
                    <NavLink to={"/hcfadmin/doctor/blocked"}>Blocked</NavLink>
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
                        {/* Category component starts */}
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
                                                    setSpecializationDoc(
                                                        specialization?.department_name,
                                                    );
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
                                                    <Skeleton
                                                        variant="rectangular"
                                                        width="100%"
                                                        height={40}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : specializationData.length === 0 ? (
                                        <NoAppointmentCard text_one={"No Data Available"} />
                                    ) : (
                                        specializationData
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage,
                                            )
                                            .map((data) => (
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
                                                            name={data?.name}
                                                            user_id={data?.user_id}
                                                            profile_picture={
                                                                data?.profile_picture || profile
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data?.department}
                                                    </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            sx={{
                                                                color:
                                                                    data?.status === "Active"
                                                                        ? "#E72B4A"
                                                                        : "gray",
                                                            }}
                                                        >
                                                            {data?.status}
                                                        </TableCell>
                                                    <TableCell align="right">
                                                        <CustomButton
                                                            label={<img src={pen} />}
                                                            isTransaprent
                                                            handleClick={() =>
                                                                toggleStatus(data?.user_id)
                                                            } // Pass the `clinic_doctor_id` here
                                                        />
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
                                count={specializationData.length}
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

export default HCFAllDoctors;
