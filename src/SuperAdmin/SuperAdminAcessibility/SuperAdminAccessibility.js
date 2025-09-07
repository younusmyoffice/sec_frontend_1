import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const SuperAdminAccessibilty = () => {
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "doctor"
            ? "/superadmin/accessibility/doctors"
            : localStorage.getItem("path") == "patient"
            ? "/superadmin/accessibility/patient"
            : localStorage.getItem("path") == "hcf"
            ? "/superadmin/accessibility/hcf"
            : "/superadmin/accessibility/doctor",
    );
    useEffect(() => {
        navigate(String(navigateToRoute));
    }, []);

    return (
        <>
            <Box sx={{ width: "100%", height: "95vh" }}>
                <Outlet />
            </Box>
        </>
    );
};

export default SuperAdminAccessibilty;
