import {
    Box,
    Stack,
    Typography,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DoctorTable from "./DoctorTable";
import DiagnosticTable from "./DiagnosticTable";

const AdminManageSale = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "hcfadminsale");
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const [doctorSelected, setDoctorSelected] = useState(true);
    const [bgColorDoctor, setBgColorDoctor] = useState("#A9A9A9");
    const [bgColorDiagnostic, setBgColorDiagnostic] = useState("#E6E1E5");

    const navigate = useNavigate();

    
    const [doctor, setDoctor] = useState(true);

    
    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "90%", flexDirection: "row" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminsale"}>Sale Activities</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminoverview"}>Overview</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminbooking"}>Bookings</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminpayout"}>Payout</NavLink>
                    <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminauditlog"}>Audit Logs</NavLink>
                </nav>
                <Box component={"div"} sx={{ position: "relative", top: "4em", width: "100%", height: "100%" }}>
                    <div className="search-date">
                        {/* <Box
                            display={"flex"}
                            margin={"10px"}
                            border={1}
                            borderColor="#AEAAAE"
                            borderRadius={"25px"}
                            width={"56em"}
                            height="38px"
                            backgroundColor="#E6E1E5"
                        >
                            <Stack direction="row" alignItems="center" gap={1} padding={"10px"}>
                                <SearchIcon sx={{ margin: "0", color: "#AEAAAE" }} />
                                <Typography variant="body1" sx={{ textAlign: "left", color: "#AEAAAE" }}>
                                    Search Patient Name / ID
                                </Typography>
                            </Stack>
                        </Box> */}
                        <div
                            style={{
                                display: "flex",
                                margin: "10px",
                                border: "1px solid #AEAAAE",
                                borderRadius: "25px",
                                height: "38px",
                                backgroundColor: "#E6E1E5",
                                position: "relative",
                                overflow: "hidden", // Prevent border overflow on animation
                                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                width: "200px", // Adjust width for better alignment
                            }}
                        >
                            <button
                               style={{
                                flex: 1,
                                border: "none",
                                borderRadius: "25px",
                                height: "100%",
                                color: doctor ? "#F5F5F5" : "#28282B",
                                backgroundColor: doctor ? "#28282B" : "transparent",
                                transition: "background-color 0.3s ease, color 0.3s ease",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                            onClick={() => setDoctor(true)}
                            >
                                Doctor 
                            </button>
                            <button
                                style={{
                                    flex: 1,
                                    border: "none",
                                    borderRadius: "25px",
                                    height: "100%",
                                    color: doctor ? "#28282B" : "#F5F5F5",
                                    backgroundColor: doctor ? "transparent" : "#28282B",
                                    transition: "background-color 0.3s ease, color 0.3s ease",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                                onClick={() => setDoctor(false)}
                            >
                                Diagnostic 
                            </button>
                        </div>
                    </div>
                    {/* <div style={{ display: "flex", justifyContent: "center" }}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="All" />
                        <FormControlLabel control={<Checkbox />} label="Completed" />
                        <FormControlLabel control={<Checkbox />} label="Cancelled" />
                    </div> */}
                    {doctor ? <DoctorTable /> : <DiagnosticTable />}
                </Box>
            </Box>
        </>
    );
};

export default AdminManageSale;
