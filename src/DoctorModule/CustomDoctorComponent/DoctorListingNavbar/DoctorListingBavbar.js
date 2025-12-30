/**
 * DoctorListingNavbar Component
 * 
 * Navigation tabs for switching between Active Listings and Saved Drafts
 * - Active Listing: Shows all active/visible listings
 * - Saved in Draft: Shows all draft listings
 * 
 * @component
 */
import React from "react";
import { NavLink } from "react-router-dom";

const DoctorListingNavbar = () => {
    return (
        <nav className="NavBar-Container-Appoinement">
            {/* Tab 1: Active Listing - Shows all active listings visible to patients */}
            <NavLink to={"/doctorDashboard/doctorListing/doctoractiveListing"}>
                Active Listing
            </NavLink>
            
            {/* Tab 2: Saved in Draft - Shows all draft listings not yet activated */}
            <NavLink to={"/doctorDashboard/doctorListing/doctorsavedInDraft"}>
                Saved in Draft
            </NavLink>
        </nav>
    );
};
export default DoctorListingNavbar;
