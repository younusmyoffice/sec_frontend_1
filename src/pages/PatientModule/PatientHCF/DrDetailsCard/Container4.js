import { Box } from "@mui/material";
import React from "react";
import CustomButton from "../../../../components/CustomButton";
import { NavLink, Outlet } from "react-router-dom";

const Container4 = () => {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "20px",
                marginLeft: "20px",
            }}
        >
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={"/patientdashboard/hcfDetailCard/:hcfID/about"}>About</NavLink>
                <NavLink to={"/patientdashboard/hcfDetailCard/:hcfID/department"}>
                    Department
                </NavLink>
                <NavLink to={"/patientdashboard/hcfDetailCard/:hcfID/labs"}>Labs</NavLink>
            </nav>
            <Outlet />
        </Box>
    );
};

export default Container4;
