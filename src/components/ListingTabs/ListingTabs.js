import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./ListingTabs.scss";

const ListingTabs = ({
    tabs = [],
    className = "",
    ...props
}) => {
    return (
        <nav className={`listing-tabs ${className}`} {...props}>
            {tabs.map((tab, index) => (
                <NavLink
                    key={index}
                    to={tab.path}
                    className={({ isActive }) => 
                        `tab-link ${isActive || tab.active ? 'active' : ''}`
                    }
                >
                    {tab.label}
                </NavLink>
            ))}
        </nav>
    );
};

ListingTabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        active: PropTypes.bool
    })).isRequired,
    className: PropTypes.string,
};

export default ListingTabs;
