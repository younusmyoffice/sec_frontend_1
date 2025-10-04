import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import { MyLocationOutlined } from "@mui/icons-material";

const CustomChip = ({
    label,
    isTransparent,
    isDisabled,
    isElevated,
    leftIcon,
    rightIcon,
    onChipClick,
    onRightIconClick,
    color = "primary",
    size = "medium",
    variant = "filled"
}) => {
    const chipVariant = isTransparent ? "outlined" : variant;
    
    return (
        <Chip
            label={label}
            color={color}
            variant={chipVariant}
            size={size}
            disabled={isDisabled}
            onClick={onChipClick}
            onDelete={onRightIconClick}
            icon={leftIcon}
            deleteIcon={rightIcon}
            sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: size === "small" ? "12px" : "14px",
                borderRadius: "20px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isElevated ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: isElevated ? "0 8px 20px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
                "&:active": {
                    transform: "translateY(0px)",
                },
                "&.MuiChip-outlined": {
                    borderWidth: "2px",
                    "&:hover": {
                        borderWidth: "2px",
                    }
                },
                "& .MuiChip-icon": {
                    fontSize: size === "small" ? "16px" : "18px",
                },
                "& .MuiChip-deleteIcon": {
                    fontSize: size === "small" ? "16px" : "18px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        transform: "scale(1.1)",
                    }
                }
            }}
        />
    );
};

CustomChip.defaultProps = {
    label: "Chip",
    leftIcon: <MyLocationOutlined />,
    rightIcon: <MyLocationOutlined />,
    isTransparent: false,
    isDisabled: false,
    isElevated: false,
    onChipClick: () => {},
    onRightIconClick: () => {},
    color: "primary",
    size: "medium",
    variant: "filled",
};

CustomChip.propTypes = {
    label: PropTypes.string.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    isTransparent: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isElevated: PropTypes.bool,
    onChipClick: PropTypes.func,
    onRightIconClick: PropTypes.func,
    color: PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]),
    size: PropTypes.oneOf(["small", "medium"]),
    variant: PropTypes.oneOf(["filled", "outlined"]),
};

export default CustomChip;