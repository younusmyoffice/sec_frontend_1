import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";

const Container4 = ({ID, description}) => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/patientdashboard/hcfDetailCard/${ID}/about`, { state: { description } })
    },[description])
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
            <NavLink to={`/patientdashboard/hcfDetailCard/${ID}/about`} state={{ description }}>About</NavLink>
            <NavLink to={`/patientdashboard/hcfDetailCard/${ID}/department`}>
                    Department
                </NavLink>
                <NavLink to={`/patientdashboard/hcfDetailCard/${ID}/labs`}>Labs</NavLink>
            </nav>
            <Outlet />
        </Box>
    );
};

export default Container4;
