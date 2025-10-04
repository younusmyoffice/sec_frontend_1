import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const CustomButton = ({
    label,
    leftIcon,
    rightIcon,
    isTransaprent,
    isDisabled,
    isElevated,
    handleClick,
    isText,
    buttonCss,
    className,
    size = "medium",
    fullWidth = false
}) => {
    const defaultStyles = {
        borderRadius: "12px",
        textTransform: "none",
        fontWeight: 600,
        fontSize: "14px",
        padding: size === "small" ? "8px 16px" : size === "large" ? "16px 32px" : "12px 24px",
        minHeight: size === "small" ? "36px" : size === "large" ? "56px" : "44px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "Poppins, sans-serif",
        boxShadow: isElevated ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: isElevated ? "0 8px 20px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        "&:active": {
            transform: "translateY(0px)",
        },
        "&:disabled": {
            opacity: 0.6,
            transform: "none",
            boxShadow: "none",
        }
    };

    return (
        <Button
            className={`custom-button ${className || ""}`}
            variant={isText ? "text" : isTransaprent ? "outlined" : "contained"}
            disableElevation={!isElevated}
            disabled={isDisabled}
            startIcon={leftIcon}
            endIcon={rightIcon}
            onClick={handleClick}
            size={size}
            fullWidth={fullWidth}
            sx={{
                ...defaultStyles,
                ...buttonCss
            }}
        >
            {label}
        </Button>
    );
};

CustomButton.defaultProps = {
    label: "Button",
    leftIcon: null,
    rightIcon: null,
    isTransaprent: false,
    isDisabled: false,
    isElevated: false,
    handleClick: () => {},
    isText: false,
    size: "medium",
    fullWidth: false,
};

CustomButton.propTypes = {
    label: PropTypes.string.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    isTransaprent: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isElevated: PropTypes.bool,
    handleClick: PropTypes.func,
    isText: PropTypes.bool,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    fullWidth: PropTypes.bool,
};

export default CustomButton;
