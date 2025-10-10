import React, { useEffect, useState } from "react";
// import "./SuperAdminhistory.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const SuperAdminPackage = () => {
    console.log("Entered Super admin package")
    const navigate = useNavigate();

    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "packagepatient"
            ? "/superadmin/package/packagepatient"
            : localStorage.getItem("path") == "packagedoctor"
            ? "/superadmin/package/packagedoctor"
            : "/superadmin/package/packagepatient",
    );
    useEffect(() => {
        navigate(String(navigateToRoute));
    }, []);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    // console.log("params : " ,params);
    console.log("location : ", location.pathname);
    localStorage.setItem("path", location.pathname);
    return (
        <>
            <Box sx={{ width: "100%", height: "95vh" }}>
                <Outlet />
            </Box>
        </>
    );
};

export default SuperAdminPackage;
