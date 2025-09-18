import React, { useEffect, useState } from "react";
// import CustomMenuDrawer from "../../components/CustomMenuDrawer/custom-menu-drawer";
import { Drafts } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomMenuDrawer from "../../../components/CustomMenuDrawer/custom-menu-drawer";
import HCFAdminDashboard from "../../HCFAdmin/AdminDashboard/AdminNotification";
import AdminDoctor from "../../HCFAdmin/AdminDoctor/AdminDoctor";
import AdminDiagnosticCenter from "../../HCFAdmin/AdminDiagnosticCenter/AdminDiagnosticCenter";
import AdminManage from "../../HCFAdmin/AdminManage/AdminManage";

function AdminMainDashboard() {
    const drawerList1 = [
        { name: "Dashboard", icon: <Drafts /> },
        { name: "Doctors", icon: <PersonIcon /> },
        { name: "DiagnosticCenter", icon: <ListAltIcon /> },
        { name: "Manage", icon: <SettingsIcon /> },
    ];
    const drawerComponentList = {
        // dashboard: <MainDashboard/>,
        dashboard: <HCFAdminDashboard />,
        doctors: <AdminDoctor />,
        diagnosticcenter: <AdminDiagnosticCenter />,
        manage: <AdminManage />,
    };

    const [activeComponent, setActiveComponent] = useState();
    useEffect(() => {
        localStorage.getItem("activeComponent") === "doctors"
            ? setActiveComponent(drawerComponentList.doctors)
            : localStorage.getItem("activeComponent") === "diagnosticcenter"
            ? setActiveComponent(drawerComponentList.diagnosticcenter)
            : localStorage.getItem("activeComponent") === "manage"
            ? setActiveComponent(drawerComponentList.manage)
            : setActiveComponent(drawerComponentList.dashboard);
    }, []);

    return (
        <>
            <div className="usage">
                <div className="component-library">
                    <div className="items">
                        <CustomMenuDrawer
                            headerLabel={"custom drawer"}
                            list1={drawerList1}
                            // list2={drawerList2}
                            profilepath={'hcfadmin'}
                            handleOnMenuSelect={(item) =>
                                setActiveComponent(drawerComponentList[item.toLowerCase()])
                            }
                        >
                            {/* <Box sx={{width : "100%"}}> */}
                            {activeComponent}
                            {/* </Box> */}
                        </CustomMenuDrawer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminMainDashboard;
