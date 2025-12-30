/**
 * DoctorListing Component
 * 
 * Main wrapper component for doctor listing functionality:
 * - Acts as a layout container for all listing sub-routes
 * - Handles initial navigation based on saved path preference
 * - Hides location search container
 * - Provides Outlet for nested routes (active listings, drafts, create/edit)
 * 
 * @component
 */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DoctorListing = () => {
    const navigate = useNavigate();
    
    // State to determine initial route based on saved preference
    // CRITICAL: Use /doctorDashboard (capital D) to match router configuration
    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "doctoractiveListing"
            ? "/doctorDashboard/doctorListing/doctoractiveListing"
            : localStorage.getItem("path") == "doctorsavedInDraft"
            ? "/doctorDashboard/doctorListing/doctorsavedInDraft"
            : "/doctorDashboard/doctorListing/doctoractiveListing", // Default to active listings
    );
    
    /**
     * Hide location search container on mount
     * This container is specific to patient views and should be hidden in doctor views
     */
    useEffect(() => {
        const containerElement = document.getElementById("location-search-container");
        if (containerElement) {
            containerElement.style.display = "none";
        }
        
        // Cleanup: restore container visibility on unmount
        return () => {
            if (containerElement) {
                containerElement.style.display = "";
            }
        };
    }, []);

    /**
     * Navigate to saved route preference on component mount
     * Only navigates if we're at the base route to avoid interfering with user navigation
     * Reads from localStorage to determine if user was viewing active listings or drafts
     */
    useEffect(() => {
        // Only navigate if we're at the base /doctorDashboard/doctorListing route
        // This prevents forcing navigation when user clicks on tabs
        const currentPath = window.location.pathname;
        const baseListingPath = "/doctorDashboard/doctorListing";
        
        if (currentPath === baseListingPath || currentPath === `${baseListingPath}/`) {
            navigate(String(navigateToRoute), { replace: true });
        }
    }, [navigateToRoute, navigate]);

    return (
        <>
            {/* Main container with fixed height for consistent layout */}
            <div style={{ width: "100%", height: "96vh" }}>
                {/* Outlet renders child routes: DoctorActiveListing, DoctorSavedDraft, CreateNewListing, etc. */}
                <Outlet />
            </div>
        </>
    );
};

export default DoctorListing;
