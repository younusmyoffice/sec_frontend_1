import React, { useEffect, useState } from "react";
// import CustomMenuDrawer from "../../components/CustomMenuDrawer/custom-menu-drawer";
import { Drafts } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomMenuDrawer from "../../../components/CustomMenuDrawer/custom-menu-drawer";
import ClinicDashboard from "../../Clinic/ClinicDashboard/ClinicDashboard";
import ClinicMyAppointments from "../../Clinic/ClinicMyAppointments/ClinicMyAppointments";
import ClinicProfile from "../../Clinic/ClinicProfile/ClinicProfile";
import ClinicManage from "../../Clinic/ClinicManage/ClinicManage";

function ClinicMainDashboard() {
    const drawerList1 = [
        { name: "Dashboard", icon: <Drafts /> },
        { name: "MyAppointment", icon: <PersonIcon /> },
        { name: "Profile", icon: <ListAltIcon /> },
        { name: "Manage", icon: <SettingsIcon /> },
    ];
    const drawerComponentList = {
        // dashboard: <MainDashboard/>,
        dashboard: <ClinicDashboard />,
        myappointment: <ClinicMyAppointments />,
        profile: <ClinicProfile />,
        manage: <ClinicManage />,
    };

    const [activeComponent, setActiveComponent] = useState();
    useEffect(() => {
        localStorage.getItem("activeComponent") === "myappointment"
            ? setActiveComponent(drawerComponentList.myappointment)
            : localStorage.getItem("activeComponent") === "profile"
            ? setActiveComponent(drawerComponentList.profile)
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

export default ClinicMainDashboard;
