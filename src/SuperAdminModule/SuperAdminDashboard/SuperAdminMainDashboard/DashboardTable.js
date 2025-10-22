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
    Skeleton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import dept from "../../../static/images/DrImages/Out Patient Department.png";
import { TableData } from "./TableData";
import name from "../../../static/images/DrImages/Name.png";
import exam from "../../../static/images/DrImages/Examination.png";
import axiosInstance from "../../../config/axiosInstance";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

// Dynamic data will be created based on API response

const DashboardTable = () => {
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenDialogCancle(false);
        setOpenDialogReschedule(false);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openDialogCancle, setOpenDialogCancle] = useState(false);
    const [openDialogReschedule, setOpenDialogReschedule] = useState(false);

    // Fetch dashboard data from API
    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/sec/superadmin/DashboardCount');
            console.log("Dashboard Table Data:", response?.data);
            setDashboardData(response?.data);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setError(err.message || "Failed to fetch dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Create dynamic rows based on API data
    const createRows = () => {
        if (!dashboardData) return [];
        
        return [
            createData(
                <TableData image={dept} name={"No of Doctor"} />,
                <></>,
                <Typography
                    sx={{
                        color: "#E72B4A",
                        fontFamily: "Poppins",
                        fontSize: "2rem",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "4.625rem",
                        marginTop: "30px",
                        marginLeft: "20px",
                    }}
                >
                    {dashboardData.DOCTORS || 0}
                </Typography>,
            ),
            createData(
                <TableData image={name} name={"No of Patient"} />,
                <></>,
                <Typography
                    sx={{
                        color: "#E72B4A",
                        fontFamily: "Poppins",
                        fontSize: "2rem",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "4.625rem",
                        marginTop: "30px",
                        marginLeft: "20px",
                    }}
                >
                    {dashboardData.PATIENT || 0}
                </Typography>,
            ),
            createData(
                <TableData image={exam} name={"No of HCF"} />,
                <></>,
                <Typography
                    sx={{
                        color: "#E72B4A",
                        fontFamily: "Poppins",
                        fontSize: "2rem",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "4.625rem",
                        marginTop: "30px",
                        marginLeft: "20px",
                    }}
                >
                    {dashboardData.HCF || 0}
                </Typography>,
            ),
        ];
    };

    return (
        <>
            <Box
                component={"div"}
                sx={{
                    position: "relative",
                    top: "4em",
                    width: "100%",
                    display: "block",
                    height: "100%",
                }}
            >
                <div className="">
                    <TableContainer component={Paper} style={{ background: "white" }}>
                        <Table sx={{ minWidth: 1 }} aria-label="simple table">
                            <TableBody>
                            {loading
                                ? [1, 2, 3].map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="right">
                                            <Skeleton variant="rectangular" width={120} height={40} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="text" width={60} height={40} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="text" width={60} height={40} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton variant="circular" width={40} height={40} />
                                        </TableCell>
                                    </TableRow>
                                  ))
                                : error ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <Typography color="error">
                                                Error loading data: {error}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : createRows().map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row" align="right">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <MoreHorizIcon
                                                    sx={{
                                                        cursor: "pointer",
                                                        color: "#E6E1E5",
                                                        border: "1px solid #E6E1E5",
                                                        borderRadius: "50px",
                                                    }}
                                                    onClick={handleClick}
                                                />
                                                <Menu
                                                    id="basic-menu"
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        "aria-labelledby": "basic-button",
                                                    }}
                                                >
                                                    {/* ---------------------- Appointments and Re-Schedule--------------------------------------------------- */}
                                                    <MenuItem
                                                        onClick={() =>
                                                            setOpenDialogCancle(!openDialogCancle)
                                                        }
                                                    >
                                                        Weekly
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() =>
                                                            setOpenDialogCancle(!openDialogCancle)
                                                        }
                                                    >
                                                        Monthly
                                                    </MenuItem>
                                                </Menu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
        </>
    );
};
export default DashboardTable;
