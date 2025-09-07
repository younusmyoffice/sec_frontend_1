import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "@mui/material";

const CustomTab = ({ items }) => {
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleChange = (event, newValue) => {
        setCurrentIdx(newValue);
    };

    return (
        <Tabs
            value={currentIdx}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable tabs"
        >
            {items.map((item, idx) => (
                <Tab key={idx} label={item} />
            ))}
        </Tabs>
    );
};

CustomTab.defaultProps = {
    items: ["item 1", "item 2", "item 3"],
};

CustomTab.propTypes = {
    items: PropTypes.array,
};

export default CustomTab;
