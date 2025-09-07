import React from "react";
import { NavLink } from "react-router-dom";
import Container5 from "../Container5";
import Container3 from "../Container3";

const Labs = () => {
    return (
        <>
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={"/patientdashboard/hcfDetailCard/:hcfID/about"}>About</NavLink>
                <NavLink to={"/patientdashboard/hcfDetailCard/:hcfID/department"}>
                    Department
                </NavLink>
                <NavLink to={"/patientdashboard/hcfDetailCard/:hcfID/labs"}>Labs</NavLink>
            </nav>
            <div className="about-data" style={{ marginTop: "4rem" }}>
                <Container5 />
                <Container3 />
            </div>
        </>
    );
};

export default Labs;
