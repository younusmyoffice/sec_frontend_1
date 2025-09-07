import React from "react";
import "./SuperAdminDoctor.scss";
import { NavLink } from "react-router-dom";
import DateModal from "../../../components/DateModal/DateModal";
import FilterModal from "../../../components/FilterModal/FilterModal";
import { Box, Typography } from "@mui/material";
import AdminDoctorCard from "../../../components/Card/Superadmindoctorcard/AdminDoctorCard";
import { PaginationCard } from "../../../Dashboard/PatientAppointment/PatientCards";

const SuperAdminDoctor = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "acessibility");
        localStorage.setItem("path", "doctors");
    }, []);
    return (
        <>
            <div className="nav-d-f-container">
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/superadmin/accessibility/doctors"}>Doctor</NavLink>
                    <NavLink to={"/superadmin/accessibility/patient"}>Patient</NavLink>
                    <NavLink to={"/superadmin/accessibility/hcf"}>HCF</NavLink>
                </nav>
                <div className="date-filter1">
                    <DateModal />
                    <FilterModal />
                </div>
            </div>
            <div className="doctor-container">
                <AdminDoctorCard />
                <AdminDoctorCard />
                <AdminDoctorCard />
                <div style={{ marginTop: "2rem" }}>
                    <PaginationCard />
                </div>
            </div>
        </>
    );
};
export default SuperAdminDoctor;
