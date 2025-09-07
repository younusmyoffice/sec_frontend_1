import React from 'react';
import { NavLink } from "react-router-dom";

const DoctorListingNavbar = () => {
    return (
        <nav className="NavBar-Container-Appoinement">
            <NavLink to={"/doctordashboard/doctorListing/doctoractiveListing"}>Active Listing</NavLink>
            <NavLink to={"/doctordashboard/doctorListing/doctorsavedInDraft"}>Saved in Draft</NavLink>
        </nav>
    );
};
export default DoctorListingNavbar;