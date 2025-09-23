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
    Typography,
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import pen from "../../../../static/images/DrImages/Pen.svg";
import axiosInstance from "../../../../config/axiosInstance";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { Testlist } from "../AdminLabs/AdminLabDetails/Testlist";

const AdminBlocked = () => {
    const [data1, setData1] = useState([]); // Data for the table
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [loading, setLoading] = useState(true); // Loading state
    const hcf_id = localStorage.getItem("hcfadmin_suid");

    // Fetching blocked staff list
    const fetchData1 = async (hcf_id) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(`/sec/hcf/getHcfStaff/${hcf_id}/blocked`);
            setData1(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching staff data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    useEffect(() => {
        fetchData1(hcf_id);
    }, [hcf_id]);

    const navigate = useNavigate();

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
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
                    <NavLink to={"/hcfadmin/diagnosticcenter/labs"}>Labs</NavLink>
                    <NavLink to={"/hcfadmin/diagnosticcenter/staff"}>Staff</NavLink>
                    <NavLink to={"/hcfadmin/diagnosticcenter/blocked"}>Blocked</NavLink>
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
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {loading ? (
                                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell colSpan={5} align="center">
                                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        ) : data1.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">
                                                    <NoAppointmentCard text_one={"No Data Found"} />
                                                    {/* If NoAppointmentCard doesn't exist, replace with this */}
                                                    {/* <Typography>No Data Found</Typography> */}
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            data1
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage + rowsPerPage,
                                                )
                                                .map((row) => (
                                                    <TableRow
                                                        key={row.first_name}
                                                        sx={{
                                                            "&:last-child td, &:last-child th": {
                                                                border: 0,
                                                            },
                                                        }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <Testlist
                                                                name={`${row.first_name}`}
                                                                staff_id={`${row.staff_id}`}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography
                                                                style={{
                                                                    color: "#939094",
                                                                    fontFamily: "Poppins",
                                                                }}
                                                            >
                                                                {row.hcf_diag_name}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography
                                                                style={{
                                                                    color: "#939094",
                                                                    fontFamily: "Poppins",
                                                                }}
                                                            >
                                                                {row.lab_department_name}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <CustomButton
                                                                buttonCss={{
                                                                    borderRadius: "6.25rem",
                                                                }}
                                                                isDisabled={row.diag_status !== 1} // Disable the button if lab_status is not 1 (Inactive)
                                                                label={
                                                                    row.diag_status === 1
                                                                        ? "Active"
                                                                        : "Blocked"
                                                                }
                                                                isTransaprent
                                                            />{" "}
                                                        </TableCell>{" "}
                                                        <TableCell align="right">
                                                            <CustomButton
                                                                buttonCss={{
                                                                    borderRadius: "6.25rem",
                                                                }}
                                                                label={<img src={pen} alt="Edit" />}
                                                                isTransaprent
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={data1.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Rows per page"
                            />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdminBlocked;
