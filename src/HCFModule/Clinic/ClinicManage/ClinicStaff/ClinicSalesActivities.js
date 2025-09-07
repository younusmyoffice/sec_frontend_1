import { Box, Typography, Stack, Card, CardContent, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PntImage from "../../../../constants/DrImages/image 8.png";
import DateModal from "../../../../components/DateModal/DateModal";
import FilterModal from "../../../../components/FilterModal/FilterModal";
import "./clinicstaff.scss";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import FromModal from "../../../../FromModal/FromModal";
import ToModal from "../../../../ToModal/ToModal";
import { baseURL } from "../../../../constants/const";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(
        <div className="staff-profile">
            <Box
                sx={{ borderRadius: "8px", width: "50px", height: "50px" }}
                component={"img"}
                src={PntImage}
            ></Box>
            <div className="name-id">
                <Typography>Jolie</Typography>
                <Typography
                    style={{
                        color: "#939094",
                        fontFamily: "poppins",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "15px",
                        letterSpacing: "0.08px",
                    }}
                >
                    User ID:001
                </Typography>
            </div>
        </div>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Active
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#E9405C",
                // background:'#FDEAED',
            }}
        >
            Xaqwkc12246
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            Profile Edit
        </Typography>,
        <Typography
            style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "0.096px",
                color: "#AEAAAE",
            }}
        >
            24 Jan 23,
            <br></br>
            20:01:09 AM
        </Typography>,
    ),

    createData(),
];

const ClinicSalesActivities = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "clinicsalesactivities");
    }, []);
    const [data1, setData1] = useState([]);

    const fetchData1 = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/hcf/ManageSaleActivity`);
            setData1(response?.data?.response);
            console.log("sales activities data :", response.data.response);
        } catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        // document.getElementById("location-search-container").style.display = "none";
        fetchData1();
    }, []);

    const [allChecked, setAllChecked] = useState(false);
    const [completedChecked, setCompletedChecked] = useState(false);
    const [cancelledChecked, setCancelledChecked] = useState(false);

    const handleCheckBoxChange = (checkboxType) => {
        switch (checkboxType) {
            case "all":
                setAllChecked(!allChecked);
                setCompletedChecked(false);
                setCancelledChecked(false);
                break;
            case "completed":
                setCompletedChecked(!completedChecked);
                setAllChecked(false);
                setCancelledChecked(false);
                break;
            case "cancelled":
                setCancelledChecked(!cancelledChecked);
                setAllChecked(false);
                setCompletedChecked(false);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <div className="sales-container">
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/clinicDashboard/clinicmanage/clinicsalesactivities"}>
                        Sales Activities
                    </NavLink>
                    <NavLink to={"/clinicDashboard/clinicmanage/clinicauditlog"}>
                        Audit Logs
                    </NavLink>
                </nav>
            </div>
            <div className="checkboxes-from-to">
                <div className="check-box">
                    <div className="check-all">
                        <CustomCheckBox
                            checked={allChecked}
                            onChange={() => handleCheckBoxChange("all")}
                        />
                        <Typography
                            style={{
                                fontFamily: "poppins",
                                fontsize: "14px",
                                fontstyle: "normal",
                                fontWeight: "500",
                                lineHeight: "22px",
                                letterSpacing: "0.07px",
                            }}
                        >
                            All
                        </Typography>
                    </div>
                    <div className="check-all">
                        <CustomCheckBox
                            checked={completedChecked}
                            onChange={() => handleCheckBoxChange("completed")}
                        />
                        <Typography
                            style={{
                                fontFamily: "poppins",
                                fontsize: "14px",
                                fontstyle: "normal",
                                fontWeight: "500",
                                lineHeight: "22px",
                                letterSpacing: "0.07px",
                            }}
                        >
                            Completed
                        </Typography>
                    </div>
                    <div className="check-all">
                        <CustomCheckBox
                            checked={cancelledChecked}
                            onChange={() => handleCheckBoxChange("cancelled")}
                        />
                        <Typography
                            style={{
                                fontFamily: "poppins",
                                fontsize: "14px",
                                fontstyle: "normal",
                                fontWeight: "500",
                                lineHeight: "22px",
                                letterSpacing: "0.07px",
                            }}
                        >
                            Cancelled
                        </Typography>
                    </div>
                </div>
                <div className="from-to">
                    <FromModal />
                    <ToModal />
                </div>
            </div>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid #E6E1E5",
                    marginTop: "1rem",
                }}
            >
                <TableContainer style={{ overflowX: "auto" }}>
                    <Table sx={{ minWidth: 650 }} size="large">
                        <TableHead>
                            <TableRow>
                                <TableCell>Doctor Name/ID</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Date & Time</TableCell>
                                <TableCell align="right">Package</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data1?.length === 0 ? (
                                <h1>Loading...</h1>
                            ) : (
                                data1?.map((data, el, index) => (
                                    <TableRow
                                        key={el.suid + "" + index}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Box
                                                sx={{
                                                    borderRadius: "8px",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                                component={"img"}
                                                src={data?.profile_picture}
                                            ></Box>
                                            <Typography>{data?.DoctorName}</Typography>
                                            <Typography
                                                style={{
                                                    color: "#939094",
                                                    fontFamily: "poppins",
                                                    fontSize: "10px",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    lineHeight: "15px",
                                                    letterSpacing: "0.08px",
                                                }}
                                            >
                                                User ID:{data?.user_id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{
                                                padding: "1rem",
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    fontFamily: "poppins",
                                                    fontSize: "12px",
                                                    fontStyle: "normal",
                                                    fontWeight: "500",
                                                    lineHeight: "18px",
                                                    letterSpacing: "0.096px",
                                                    color: "#AEAAAE",
                                                }}
                                            >
                                                {data?.status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                style={{
                                                    fontFamily: "poppins",
                                                    fontSize: "12px",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    lineHeight: "18px",
                                                    letterSpacing: "0.096px",
                                                    color: "#E9405C",
                                                    // background:'#FDEAED',
                                                }}
                                            >
                                                {data?.created_at}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {" "}
                                            <Typography
                                                style={{
                                                    fontFamily: "poppins",
                                                    fontSize: "12px",
                                                    fontStyle: "normal",
                                                    fontWeight: "500",
                                                    lineHeight: "18px",
                                                    letterSpacing: "0.096px",
                                                    color: "#AEAAAE",
                                                }}
                                            >
                                                {data?.package}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {" "}
                                            <Typography
                                                style={{
                                                    fontFamily: "poppins",
                                                    fontSize: "12px",
                                                    fontStyle: "normal",
                                                    fontWeight: "500",
                                                    lineHeight: "18px",
                                                    letterSpacing: "0.096px",
                                                    color: "#AEAAAE",
                                                }}
                                            >
                                                {data?.amount}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default ClinicSalesActivities;
