import React, { useEffect, useState } from "react";
import { Drafts } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomMenuDrawer from "../../components/CustomMenuDrawer/custom-menu-drawer";
import "./BodyDashboard.scss";
import MainDashboard from "../MainDashboard/MainDashboard";
import AppointmentDashboard from "../PatientAppointment/AppointmentDashboard";
import ManageDashboard from "../PatientManage/ManageDashboard";

const BodyDashboard = () => {
    // const [fetchActiveComponent , setFetchActiveComponent] = useState('dashboard');
    const [activeComponent, setActiveComponent] = useState();
    const [activeItem, setActiveItem] = useState();
    const [profile, setProfile] = useState(
        localStorage.getItem("activeComponent") === "dashboard"
            ? "/patientDashboard/dashboard/profile"
            : localStorage.getItem("activeComponent") === "appointment"
            ? "/patientDashboard/appointment/profile"
            : localStorage.getItem("activeComponent") === "manage"
            ? "/patientDashboard/manage/profile"
            : null,
    );

    console.log("Navigate to profile component : ",profile)

    const drawerList1 = [
        { name: "Dashboard", icon: <Drafts /> },
        { name: "Appointment", icon: <PersonIcon /> },
        { name: "Manage", icon: <SettingsIcon /> },
    ];
    const drawerComponentList = {
        // dashboard: <MainDashboard/>,
        dashboard: <MainDashboard />,
        appointment: <AppointmentDashboard />,
        manage: <ManageDashboard />,
    };

    useEffect(() => {

        localStorage.getItem("activeComponent") === "appointment"
            ? setActiveComponent(drawerComponentList.appointment)
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
                            selectedItems={activeItem}
                            profilepath={"patient"}
                            handleOnMenuSelect={(item) => {
                                setActiveComponent(drawerComponentList[item.toLowerCase()]);
                                setActiveItem(item);
                                console.log("handle on menu select", item);
                            }}
                        >
                            {activeComponent}
                        </CustomMenuDrawer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BodyDashboard;
