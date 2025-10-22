import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const ManageDashboard = () => {
    const navigate = useNavigate();
    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "bookinghistory"
            ? "/patientDashboard/manage/bookinghistory"
            : localStorage.getItem("path") == "transactions"
            ? "/patientDashboard/manage/transactions"
            : localStorage.getItem("path") == "reports"
            ? "/patientDashboard/manage/reports"
            : localStorage.getItem("path") == "subscriptions"
            ? "/patientDashboard/manage/subscriptions"
            : "/patientDashboard/manage/bookinghistory",
    );
    useEffect(() => {
        navigate(String(navigateToRoute));
    }, []);

    // console.log("Entered dashboard manage");

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {" "}
            {/* Explore and My activity navbar start */}
            <Box sx={{ width: "100%" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default ManageDashboard;
