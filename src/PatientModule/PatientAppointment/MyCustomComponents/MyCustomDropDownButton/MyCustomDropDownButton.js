import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logger from "../../../../utils/logger"; // Centralized logging

/**
 * BasicMenu Component (MyCustomDropDownButton)
 * 
 * Custom dropdown menu button component
 * Features:
 * - Dropdown menu with customizable items
 * - Accessible ARIA attributes
 * - Material-UI Menu integration
 * 
 * @param {Object} props - Component props
 * @param {string} [props.buttonLabel="Dashboard"] - Button label text
 * @param {Array} [props.menuItems] - Array of menu items {label, onClick}
 * @param {Function} [props.onMenuItemClick] - Callback when menu item is clicked
 * 
 * @component
 */
export default function BasicMenu({ buttonLabel = "Dashboard", menuItems = [], onMenuItemClick }) {
    logger.debug("🔵 BasicMenu component rendering");
    
    // Menu anchor state
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    /**
     * Default menu items if none provided
     */
    const defaultMenuItems = [
        { label: "Profile", onClick: () => {} },
        { label: "My account", onClick: () => {} },
        { label: "Logout", onClick: () => {} },
    ];
    
    const itemsToRender = menuItems.length > 0 ? menuItems : defaultMenuItems;
    
    /**
     * Handle button click - open menu
     * @param {React.MouseEvent<HTMLElement>} event - Click event
     */
    const handleClick = (event) => {
        logger.debug("📋 Opening dropdown menu");
        setAnchorEl(event.currentTarget);
    };
    
    /**
     * Handle menu close
     */
    const handleClose = () => {
        logger.debug("📋 Closing dropdown menu");
        setAnchorEl(null);
    };
    
    /**
     * Handle menu item click
     * @param {Function} itemOnClick - Menu item's onClick handler
     * @param {string} itemLabel - Menu item label
     */
    const handleMenuItemClick = (itemOnClick, itemLabel) => {
        logger.debug("📋 Menu item clicked", { itemLabel });
        
        if (onMenuItemClick) {
            onMenuItemClick(itemLabel);
        }
        
        if (itemOnClick) {
            itemOnClick();
        }
        
        handleClose();
    };

    return (
        <div>
            {/* Dropdown button */}
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {buttonLabel}
            </Button>
            
            {/* Dropdown menu */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {itemsToRender.map((item, index) => (
                    <MenuItem 
                        key={index}
                        onClick={() => handleMenuItemClick(item.onClick, item.label)}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

// PropTypes for type checking
BasicMenu.propTypes = {
    buttonLabel: PropTypes.string,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func,
        })
    ),
    onMenuItemClick: PropTypes.func,
};

BasicMenu.defaultProps = {
    buttonLabel: "Dashboard",
    menuItems: [],
    onMenuItemClick: null,
};
