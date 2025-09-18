import React, { useEffect, useState } from "react";
import { Drafts } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomMenuDrawer from "../../components/CustomMenuDrawer/custom-menu-drawer";
import DoctorMainDashboard from "../DoctorMainDashboard/DoctorMainDashboard";
import DoctorAppointmentDashboard from "../DoctorAppointmentDashboard/DoctorAppointmentDashboard";
import DoctorManage from "../DoctorManage/DoctorManage";
import DoctorListing from "../DoctorListing/DoctorListing";
import DoctorStatistics from "../DoctorStatistics/DoctorStatistics";
import "./doctordashboard.scss";

function DoctorDashboard() {
    const [activeComponent, setActiveComponent] = useState();
    const drawerList1 = [
        { name: "Dashboard", icon: <Drafts /> },
        { name: "Appointment", icon: <PersonIcon /> },
        { name: "Listing", icon: <ListAltIcon /> },
        { name: "Statistics", icon: <AnalyticsIcon /> },
        { name: "Manage", icon: <SettingsIcon /> },
    ];
    const drawerComponentList = {
        // dashboard: <MainDashboard/>,
        dashboard: <DoctorMainDashboard />,
        appointment: <DoctorAppointmentDashboard />,
        listing: <DoctorListing />,
        statistics: <DoctorStatistics />,
        manage: <DoctorManage />,
    };

    useEffect(() => {

        document.getElementById('location-search-container').style.display = "none"


        localStorage.getItem("activeComponent") === "appointment"
            ? setActiveComponent(drawerComponentList.appointment)
            : localStorage.getItem("activeComponent") === "listing"
            ? setActiveComponent(drawerComponentList.listing)
            : localStorage.getItem("activeComponent") === "statistics"
            ? setActiveComponent(drawerComponentList.statistics)
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
                            profilepath="doctor"
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

export default DoctorDashboard;
