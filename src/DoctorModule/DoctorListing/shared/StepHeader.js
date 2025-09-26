import React from 'react';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

// Unified step header + nav used across Listing Details, Plans, Questions, Terms
const linkStyle = ({ isActive }) => ({
  padding: '8px 14px',
  borderRadius: '20px',
  textDecoration: 'none',
  fontFamily: 'poppins',
  fontSize: 14,
  border: '1px solid',
  borderColor: isActive ? '#E72B4A' : '#E6E1E5',
  color: isActive ? '#fff' : '#313033',
  backgroundColor: isActive ? '#E72B4A' : 'transparent'
});

const StepHeader = () => {
  return (
    <Box className="NavBar-Box-one" sx={{ display: 'flex', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
      <NavLink to={"/doctordashboard/doctorListing/listingdetails"} style={linkStyle}>
        Listing Details
      </NavLink>
      <NavLink to={"/doctordashboard/doctorListing/addplans"} style={linkStyle}>Add Plans</NavLink>
      <NavLink to={"/doctordashboard/doctorListing/addquestioner"} style={linkStyle}>
        Add Questioner
      </NavLink>
      <NavLink to={"/doctordashboard/doctorListing/termandcondition"} style={linkStyle}>
        Term & Conditions
      </NavLink>
    </Box>
  );
};

export default StepHeader;
