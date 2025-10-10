import React, { useEffect } from "react";

import AdminDashboard from "./AdminDashboard";
import DashboardTable from "./DashboardTable";
import PatientDetailss from "./PatientDetailss";

const SuperAdminMainDashboard = () => {
    // useEffect(() => {
    //     document.getElementById("search_bar_modal").style.display = "none";

    // },[])
    return (
        <>
            <AdminDashboard />
            <DashboardTable />
        </>
    );
};

export default SuperAdminMainDashboard;
