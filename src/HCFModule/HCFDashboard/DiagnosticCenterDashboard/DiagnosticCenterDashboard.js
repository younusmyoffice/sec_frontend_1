import React, { useEffect, useState } from "react";
import { Drafts } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomMenuDrawer from "../../../components/CustomMenuDrawer/custom-menu-drawer";
import HCFDiagnosticCenterMainDashboard from "../../DiagnosticCenter/DiagnosticDashboard/HCFDiagnosticCenterMainDashboard/HCFDiagnosticCenterMainDashboard";
import DiagnosticCenterReports from "../../DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterReports";
import DiagnosticCenterProfile from "../../DiagnosticCenter/DiagnosticProfile/DiagnstCenterProfileDashboard";
import DiagnosticCenterManage from "../../DiagnosticCenter/DiagnosticManage/DiagnosticCenterManage";

function DiagnosticMainCenterDashboard() {
    // const [activeComponent, setActiveComponent] = useState();
    const drawerList1 = [
        { name: "Dashboard", icon: <Drafts /> },
        { name: "Reports", icon: <PersonIcon /> },
        { name: "Profile", icon: <ListAltIcon /> },
        { name: "Manage", icon: <SettingsIcon /> },
    ];
    const drawerComponentList = {
        // dashboard: <MainDashboard/>,
        dashboard: <HCFDiagnosticCenterMainDashboard />,
        reports: <DiagnosticCenterReports />,
        profile: <DiagnosticCenterProfile />,
        manage: <DiagnosticCenterManage />,
    };

    useEffect(() => {
        localStorage.getItem("activeComponent") === "reports"
            ? setActiveComponent(drawerComponentList.reports)
            : localStorage.getItem("activeComponent") === "profile"
            ? setActiveComponent(drawerComponentList.profile)
            : localStorage.getItem("activeComponent") === "manage"
            ? setActiveComponent(drawerComponentList.manage)
            : setActiveComponent(drawerComponentList.dashboard);
    }, []);

    const [activeComponent, setActiveComponent] = useState(drawerComponentList.dashboard);

    return (
        <>
            <div className="usage">
                <div className="component-library">
                    <div className="items">
                        <CustomMenuDrawer
                            headerLabel={"custom drawer"}
                            list1={drawerList1}
                            // list2={drawerList2}
                            profilepath={'diagnostic'}
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

export default DiagnosticMainCenterDashboard;
