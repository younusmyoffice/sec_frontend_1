import React from 'react';
import { Box, Chip, Badge } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './NavigationTabs.scss';

const NavigationTabs = ({ 
    tabs, 
    className = "",
    variant = "default",
    size = "medium",
    showBadges = false
}) => {
    const getTabSize = () => {
        switch (size) {
            case 'small':
                return { padding: '8px 16px', fontSize: '12px' };
            case 'large':
                return { padding: '16px 32px', fontSize: '16px' };
            default:
                return { padding: '12px 24px', fontSize: '14px' };
        }
    };

    return (
        <Box className={`navigation-tabs navigation-tabs--${variant} ${className}`}>
            {tabs.map((tab, index) => (
                <NavLink
                    key={index}
                    to={tab.path}
                    className={({ isActive }) => 
                        `nav-tab nav-tab--${size} ${isActive ? 'nav-tab--active' : ''}`
                    }
                    style={getTabSize()}
                >
                    <span className="nav-tab-content">
                        {tab.icon && (
                            <span className="nav-tab-icon">
                                {tab.icon}
                            </span>
                        )}
                        <span className="nav-tab-label">
                            {tab.label}
                        </span>
                        {showBadges && tab.badge && (
                            <Badge 
                                badgeContent={tab.badge} 
                                color="error"
                                sx={{ 
                                    marginLeft: '8px',
                                    '& .MuiBadge-badge': {
                                        fontSize: '10px',
                                        height: '16px',
                                        minWidth: '16px',
                                        borderRadius: '8px'
                                    }
                                }}
                            />
                        )}
                    </span>
                    <span className="nav-tab-indicator"></span>
                </NavLink>
            ))}
        </Box>
    );
};

export default NavigationTabs;