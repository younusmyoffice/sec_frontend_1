import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const profile = () => {
    return (
        <Box>
            <Box sx={{ width: "fit-content" }} className="NavBar-Box">
                <NavLink to={"profileInfo"}>Profile Information</NavLink>
                <NavLink to={"contactDetails"}>Contact Details</NavLink>
                <NavLink to={"paymentDetails"}>Payment Details</NavLink>
            </Box>
        </Box>
    );
};

export default profile;
