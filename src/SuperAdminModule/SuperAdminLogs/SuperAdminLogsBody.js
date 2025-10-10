import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const SuperAdminLogsBody = () => {
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "auditlogs"
            ? "/superadmin/logs/auditlogs"
            : "/superadmin/logs/auditlogs",
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

export default SuperAdminLogsBody;
