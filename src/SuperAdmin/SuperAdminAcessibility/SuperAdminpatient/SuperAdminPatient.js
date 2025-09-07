import React from "react";
import { NavLink } from "react-router-dom";
import DateModal from "../../../components/DateModal/DateModal";
import FilterModal from "../../../components/FilterModal/FilterModal";
import { Box, Typography } from "@mui/material";
import PatientadminCard from "../../../components/Card/PatientCard/PatientadminCard";
import CustomButton from "../../../components/CustomButton";
import { PaginationCard } from "../../../Dashboard/PatientAppointment/PatientCards";
const SuperAdminPatient = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "acessibility");
        localStorage.setItem("path", "patient");
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
                <PatientadminCard />
                <PatientadminCard />
                <PatientadminCard />
                <div style={{ marginTop: "2rem" }}>
                    <PaginationCard />
                </div>
            </div>
        </>
    );
};

export default SuperAdminPatient;
