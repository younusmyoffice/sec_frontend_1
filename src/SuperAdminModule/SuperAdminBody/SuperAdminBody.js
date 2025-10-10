import React, { useEffect, useState } from "react";
import { Drafts } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CustomMenuDrawer from "../../components/CustomMenuDrawer/custom-menu-drawer";
import SuperAdminDashboard from "../SuperAdminDashboard/SuperAdminDashboard";
import SuperAdminHistory from "../SuperAdminHistory/SuperAdminhistory";
import SuperAdminAccessibilty from "../SuperAdminAcessibility/SuperAdminAccessibility";
import SuperAdminLogsBody from "../SuperAdminLogs/SuperAdminLogsBody";
// import SuperAdminPackage from "../SuperAdminPackage/SuperAdminPackage";
import SuperAdminTransaction from "../SuperAdminTransaction/SperAdminTransaction";
import SuperAdminPackage from "../SuperAdminPackage/SuperAdminPackage";

function SuperAdminBody() {
    const drawerList1 = [
        { name: "Dashboard", icon: <Drafts /> },
        { name: "History", icon: <PersonIcon /> },
        { name: "Acessibility", icon: <ListAltIcon /> },
        { name: "Logs", icon: <SettingsIcon /> },
        { name: "Packages", icon: <MonetizationOnIcon /> },
        { name: "Transaction", icon: <ReceiptIcon /> },
    ];
    const drawerComponentList = {
        // dashboard: <MainDashboard/>,
        dashboard: <SuperAdminDashboard />,
        history: <SuperAdminHistory />,
        acessibility: <SuperAdminAccessibilty />,
        logs: <SuperAdminLogsBody />,
        packages: <SuperAdminPackage />,
        transaction: <SuperAdminTransaction />,
    };

    const [activeComponent, setActiveComponent] = useState();
    useEffect(() => {
        localStorage.getItem("activeComponent") === "history"
            ? setActiveComponent(drawerComponentList.history)
            : localStorage.getItem("activeComponent") === "acessibility"
            ? setActiveComponent(drawerComponentList.acessibility)
            : localStorage.getItem("activeComponent") === "logs"
            ? setActiveComponent(drawerComponentList.logs)
            : localStorage.getItem("activeComponent") === "package"
            ? setActiveComponent(drawerComponentList.package)
            : localStorage.getItem("activeComponent") === "transaction"
            ? setActiveComponent(drawerComponentList.transaction)
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
                            profilepath={"superadmin"}
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

export default SuperAdminBody;
