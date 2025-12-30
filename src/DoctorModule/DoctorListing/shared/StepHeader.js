/**
 * StepHeader Component
 * 
 * Unified navigation header used across listing creation/editing steps:
 * - Listing Details: Basic listing information
 * - Add Plans: Consultation plans (message/video)
 * - Add Questioner: Patient questionnaire
 * - Term & Conditions: Terms and conditions text
 * 
 * Features:
 * - Active state highlighting (red background when current step)
 * - Consistent styling across all listing steps
 * - Responsive design with flex wrap
 * 
 * @component
 */
import React from 'react';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

/**
 * Link style function for NavLink components
 * Provides active/inactive state styling based on current route
 * 
 * @param {Object} params - NavLink style params
 * @param {boolean} params.isActive - Whether the link is currently active
 * @returns {Object} Style object for the NavLink
 */
const linkStyle = ({ isActive }) => ({
  padding: '8px 14px',
  borderRadius: '20px',
  textDecoration: 'none',
  fontFamily: 'poppins',
  fontSize: 14,
  border: '1px solid',
  borderColor: isActive ? '#E72B4A' : '#E6E1E5', // Red border when active, gray when inactive
  color: isActive ? '#fff' : '#313033', // White text when active, dark when inactive
  backgroundColor: isActive ? '#E72B4A' : 'transparent' // Red background when active
});

const StepHeader = () => {
  return (
    <Box className="NavBar-Box-one" sx={{ display: 'flex', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
      {/* Step 1: Listing Details - Basic information (name, dates, times, description) */}
      <NavLink to={"/doctorDashboard/doctorListing/listingdetails"} style={linkStyle}>
        Listing Details
      </NavLink>
      
      {/* Step 2: Add Plans - Consultation plans with pricing and duration */}
      <NavLink to={"/doctorDashboard/doctorListing/addplans"} style={linkStyle}>
        Add Plans
      </NavLink>
      
      {/* Step 3: Add Questioner - Patient questionnaire with questions and answers */}
      <NavLink to={"/doctorDashboard/doctorListing/addquestioner"} style={linkStyle}>
        Add Questioner
      </NavLink>
      
      {/* Step 4: Terms & Conditions - Legal terms shown to patients */}
      <NavLink to={"/doctorDashboard/doctorListing/termandcondition"} style={linkStyle}>
        Term & Conditions
      </NavLink>
    </Box>
  );
};

export default StepHeader;
