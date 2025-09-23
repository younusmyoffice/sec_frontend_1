import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import "./EditListingButton.scss";

const EditListingButton = ({
    onEditClick = () => {},
    disabled = false,
    size = "medium",
    variant = "contained",
    className = "",
    tooltip = "Edit Listing",
    ...props
}) => {
    const getSizeStyles = () => {
        switch (size) {
            case "small":
                return {
                    padding: "8px",
                    fontSize: "16px"
                };
            case "large":
                return {
                    padding: "16px",
                    fontSize: "24px"
                };
            default: // medium
                return {
                    padding: "12px",
                    fontSize: "20px"
                };
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case "outlined":
                return {
                    border: "2px solid #e72b49",
                    backgroundColor: "transparent",
                    color: "#e72b49",
                    "&:hover": {
                        backgroundColor: "#e72b49",
                        color: "white",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(231, 43, 73, 0.3)"
                    }
                };
            case "text":
                return {
                    backgroundColor: "transparent",
                    color: "#e72b49",
                    "&:hover": {
                        backgroundColor: "rgba(231, 43, 73, 0.1)",
                        transform: "translateY(-1px)"
                    }
                };
            default: // contained
                return {
                    backgroundColor: "#e72b49",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#d32f2f",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(231, 43, 73, 0.3)"
                    }
                };
        }
    };

    return (
        <Tooltip title={tooltip} arrow placement="top">
            <IconButton
                onClick={onEditClick}
                disabled={disabled}
                className={`edit-listing-button ${className}`}
                sx={{
                    ...getSizeStyles(),
                    ...getVariantStyles(),
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:disabled": {
                        opacity: 0.5,
                        cursor: "not-allowed",
                        transform: "none"
                    },
                    "&:active": {
                        transform: "translateY(0)"
                    }
                }}
                aria-label={tooltip}
                {...props}
            >
                <EditIcon />
            </IconButton>
        </Tooltip>
    );
};

EditListingButton.propTypes = {
    onEditClick: PropTypes.func,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    variant: PropTypes.oneOf(["contained", "outlined", "text"]),
    className: PropTypes.string,
    tooltip: PropTypes.string,
};

export default EditListingButton;
