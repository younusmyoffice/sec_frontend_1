import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Skeleton,
} from "@mui/material";
import { Box, Paper } from "@mui/material";
import Dept from "../../../static/images/DrImages/Out Patient Department.png";
import Name from "../../../static/images/DrImages/Name.png";
import Examine from "../../../static/images/DrImages/Examination.png";
import DashboardTable from "./DashboardTable";
import axios from "axios"
import axiosInstance from "../../../config/axiosInstance"
import { useNavigate } from "react-router-dom";
import { data } from "../../../constants/const";


const AdminDashboard = () => {
    const [cardData, setCardData] = useState();
    const [error, setError] = useState(null);
    const [patientCount, setPatientCount] = useState();
    const [doctorCount, setDoctorCount] = useState();
    const [healthcareFacilityCount, setHealthcareFacilityCount] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try{
            const resp = await axiosInstance.get('/sec/superadmin/DashboardCount');
            console.log("Dashboard DAta reject cd: ",resp?.data);
            setCardData(resp?.data);
            setDoctorCount(resp?.data.DOCTORS);
            setPatientCount(resp?.data.PATIENT);
            setHealthcareFacilityCount(resp?.data.HCF);

        }catch (err) {
            console.error("Error fetching dashboard data: ", err);
            setError(err.message || "Failed to fetch dashboard data");
          }  finally {
            setLoading(false);
        }
      }
      
      useEffect( () => {
        fetchData();
      },[] );
      
      const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <div style={{ display: "flex" }}>
                <div className="DoctorDashboardCard" onClick={() => handleNavigate('/superadmin/history/doctor')}>
                    <div className="Number-Container">
                    {loading ? (
                            <Skeleton variant="text" width={100} height={80} />
                        ) : (
                        <Typography
                            sx={{
                                color: "#E72B4A",
                                fontFamily: "Poppins",
                                fontSize: "3rem",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "4.625rem",
                                marginTop: "30px",
                                marginLeft: "20px",
                            }}
                        >
                            {doctorCount}
                        </Typography>
                        )}
                    </div>
                    <div className="Number-Container">
                    {loading ? (
                            <Skeleton variant="rectangular" width={100} height={100} />
                        ) : (
                            <>
                        <Typography
                            sx={{
                                color: "#313033",
                                fontFamily: "Poppins",
                                fontSize: "1.5rem",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "1.5rem",
                                marginLeft: "10px",
                                marginTop: "10px",
                            }}
                        >
                            <strong>Doctor</strong>
                        </Typography>
                        <Box
                            component={"img"}
                            sx={{
                                width: "100px",
                                height: "100px",
                                marginLeft: "150px",
                                marginTop: "-90px",
                            }}
                            src={Dept}
                            alt="Our Patient Department"
                        ></Box>
                        </>
                        )}
                    </div>
                </div>

                <div className="DoctorDashboardCard" style={{ marginLeft: "20px" }} onClick={() => handleNavigate('/superadmin/history/patient')}>
                    <div className="Number-Container">
                    {loading ? (
                            <Skeleton variant="text" width={100} height={80} />
                        ) : (
                        <Typography
                            sx={{
                                color: "#E72B4A",
                                fontFamily: "Poppins",
                                fontSize: "3rem",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "4.625rem",
                                marginTop: "30px",
                                marginLeft: "20px",
                            }}
                        >
                           {patientCount}
                        </Typography>
                        )}
                    </div>
                    <div className="Number-Container">
                    {loading ? (
                            <Skeleton variant="rectangular" width={100} height={100} />
                        ) : (
                            <>
                        <Typography
                            sx={{
                                color: "#313033",
                                fontFamily: "Poppins",
                                fontSize: "1.5rem",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "1.5rem",
                                marginLeft: "10px",
                                marginTop: "10px",
                            }}
                        >
                            <strong>Patient</strong>
                        </Typography>
                        <Box
                            component={"img"}
                            sx={{
                                width: "100px",
                                height: "100px",
                                marginLeft: "150px",
                                marginTop: "-90px",
                            }}
                            src={Name}
                            alt="Name"
                        ></Box>
                        </>
                        )}
                    </div>
                </div>

                <div className="DoctorDashboardCard" style={{ marginLeft: "20px" }} onClick={() => handleNavigate('/superadmin/history/hcf')}>
                    <div className="Number-Container">
                    {loading ? (
                            <Skeleton variant="text" width={100} height={80} />
                        ) : (
                        <Typography
                            sx={{
                                color: "#E72B4A",
                                fontFamily: "Poppins",
                                fontSize: "3rem",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "4.625rem",
                                marginTop: "30px",
                                marginLeft: "20px",
                            }}
                        >
                            {healthcareFacilityCount}
                        </Typography>
                        )}
                    </div>
                    <div className="Number-Container">
                    {loading ? (
                            <Skeleton variant="rectangular" width={100} height={100} />
                        ) : (
                            <>
                        <Typography
                            sx={{
                                color: "#313033",
                                fontFamily: "Poppins",
                                fontSize: "1.5rem",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "1.5rem",
                                marginLeft: "10px",
                                marginTop: "10px",
                            }}
                        >
                            <strong>HCF</strong>
                        </Typography>
                        <Box
                            component={"img"}
                            sx={{
                                width: "100px",
                                height: "100px",
                                marginLeft: "150px",
                                marginTop: "-90px",
                            }}
                            src={Examine}
                            alt="Examination"
                        ></Box>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
