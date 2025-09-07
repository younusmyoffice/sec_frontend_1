import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const ClinicProfileInformation = () => {
    return(
        <>
            <Box sx={{ display: "flex", width: "98%" , height : "100%" , height : "90%" }} >
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/clinicDashboard/clinicprofile/profileinformation"}>Profile Information</NavLink>
                </nav>
                <Box
                    component={"div"}
                    sx={{ position: "relative", top: "4em", width: "100%", display: "flex" , height : "100%" }}
                >
                    <Box sx={{ width: "100%" ,  height : "100%"  , border  : "1px solid" }} >
                        <div className="" >
                            Enter your code Clinic Profile Information
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ClinicProfileInformation;