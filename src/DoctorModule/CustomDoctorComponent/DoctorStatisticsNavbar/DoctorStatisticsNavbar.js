import React from "react";
import { NavLink } from "react-router-dom";

const DoctorStatisticsNavbar = () => {
    return (
        <nav className="NavBar-Container-Appoinement">
            <NavLink to={"/doctordashboard/doctorStatistics/doctorBookingHistory"}>
                Booking History
            </NavLink>
            <NavLink to={"/doctordashboard/doctorStatistics/doctorTransaction"}>
                Transactions
            </NavLink>
            <NavLink to={"/doctordashboard/doctorStatistics/doctorOverview"}>Overview</NavLink>
            <NavLink to={"/doctordashboard/doctorStatistics/doctorPayout"}>Payout</NavLink>
        </nav>
    );
};
export default DoctorStatisticsNavbar;
