import React from "react";

import AdminDashboard from "./AdminDashboard";
import DashboardTable from "./DashboardTable";
import PatientDetailss from "./PatientDetailss";


const SuperAdminMainDashboard = () => {
    
    return(
        <>
            <AdminDashboard/>
            <DashboardTable/>
        </>
    )
}

export default SuperAdminMainDashboard;