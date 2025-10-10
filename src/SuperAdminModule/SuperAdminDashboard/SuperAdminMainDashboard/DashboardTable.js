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

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
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
            23
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
            16
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
            5
        </Typography>,
    ),
];

const DashboardTable = () => {
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
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

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

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
                                :rows.map((row) => (
                                    <TableRow
                                        key={row.name}
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
                                                        Mothly
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
