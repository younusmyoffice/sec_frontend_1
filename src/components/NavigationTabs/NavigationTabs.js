import React from 'react';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './NavigationTabs.scss';

const NavigationTabs = ({ tabs, className = "" }) => {
    return (
        <Box className={`navigation-tabs ${className}`}>
            {tabs.map((tab, index) => (
                <NavLink
                    key={index}
                    to={tab.path}
                    className={({ isActive }) => 
                        `nav-tab ${isActive ? 'nav-tab--active' : ''}`
                    }
                >
                    {tab.label}
                </NavLink>
            ))}
        </Box>
    );
};

export default NavigationTabs;
