/**
 * About Component
 * 
 * Displays HCF about/description information:
 * - Navigation tabs for About, Department, Labs
 * - About section content from route state
 * 
 * Features:
 * - Simple display component
 * - Route-based navigation
 * 
 * @component
 */

/**
 * About Component
 * 
 * Displays HCF about/description information:
 * - Navigation tabs for About, Department, Labs
 * - About section content from route state
 * 
 * Features:
 * - Simple display component
 * - Route-based navigation
 * - Validates HCF ID from URL params
 * 
 * Error Handling:
 * - Logs warnings for missing HCF ID
 * - Handles missing description gracefully
 * 
 * @component
 */

import React from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import ContainerThree from "../../../DrDetailsCard/DoctorDetailContainerThree";
import logger from "../../../../utils/logger"; // Centralized logging

const About = () => {
    logger.debug("🔵 About component rendering");
    
    const ID = useParams();
    const location = useLocation();
    
    // Extract HCF ID and description from route params/state
    const hcfID = ID.hcfID;
    const { description } = location.state || {}; // Fall back to empty object if no state is passed
    
    logger.debug("🔍 About component params and state", {
        hcfID,
        hasDescription: !!description,
        descriptionLength: description?.length || 0
    });
    
    /**
     * Validate HCF ID from URL parameters
     * Logs warning if ID is missing (non-blocking for display)
     */
    if (!hcfID) {
        logger.warn("⚠️ HCF ID not found in URL parameters", { params: ID });
    }
    
    return (
        <div className="about-data" style={{ width: "100%", paddingBottom: "2rem" }}>
            {/* ContainerThree displays the about description */}
            {/* Note: Navigation tabs are rendered in parent HcfDetailContainer4 component */}
            <ContainerThree description={description || "No description available"} />
        </div>
    );
};

export default About;
