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
}) => {
    return (
        <Chip
            label={label}
            color="primary"
            className={isElevated ? "elevation" : ""}
            variant={isTransparent ? "outlined" : "filled"}
            disabled={isDisabled}
            onClick={onChipClick}
            onDelete={onRightIconClick}
            icon={leftIcon}
            deleteIcon={rightIcon}
        />
    );
};

CustomChip.defaultProps = {
    label: "enabled",
    leftIcon: <MyLocationOutlined />,
    rightIcon: <MyLocationOutlined />,
    isTransparent: false,
    isDisabled: false,
    isElevated: false,
    onChipClick: () => {},
    onRightIconClick: () => {},
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
};

export default CustomChip;
