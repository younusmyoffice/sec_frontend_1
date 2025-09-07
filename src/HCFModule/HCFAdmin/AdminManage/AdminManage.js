import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminManage = () => {
    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "hcfadminsale"
            ? "/hcfadmin/hcfadminmanage/hcfadminsale"
            : localStorage.getItem("path") == "hcfadminoverview"
            ? "/hcfadmin/hcfadminmanage/hcfadminoverview"
            : localStorage.getItem("path") == "hcfadminbooking"
            ? "/hcfadmin/hcfadminmanage/hcfadminbooking"
            : localStorage.getItem("path") == "hcfadminpayout"
            ? "/hcfadmin/hcfadminmanage/hcfadminpayout"
            : localStorage.getItem("path") == "hcfadminauditlog"
            ? "/hcfadmin/hcfadminmanage/hcfadminauditlog"
            : "/hcfadmin/hcfadminmanage/hcfadminsale",
    );
    useEffect(() => {
        navigate(String(navigateToRoute));
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/hcfadmin/hcfadminmanage/hcfadminsale");
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
export default AdminManage;
