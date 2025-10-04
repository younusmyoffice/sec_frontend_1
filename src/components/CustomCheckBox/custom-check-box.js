import React from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

const CustomCheckBox = ({ 
    checked, 
    disabled, 
    onChange, 
    label,
    labelPlacement = "end",
    color = "primary",
    size = "medium",
    indeterminate = false
}) => {
    const checkboxElement = (
        <Checkbox 
            disabled={disabled} 
            checked={checked} 
            onChange={onChange}
            color={color}
            size={size}
            indeterminate={indeterminate}
            sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                    transform: "scale(1.1)",
                },
                "&.Mui-checked": {
                    animation: "pulse 0.3s ease-in-out",
                },
                "@keyframes pulse": {
                    "0%": {
                        transform: "scale(1)",
                    },
                    "50%": {
                        transform: "scale(1.1)",
                    },
                    "100%": {
                        transform: "scale(1)",
                    },
                }
            }}
        />
    );

    if (label) {
        return (
            <FormControlLabel
                control={checkboxElement}
                label={
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: disabled ? "#999" : "#333"
                        }}
                    >
                        {label}
                    </Typography>
                }
                labelPlacement={labelPlacement}
                sx={{
                    margin: 0,
                    "& .MuiFormControlLabel-label": {
                        marginLeft: "8px",
                    }
                }}
            />
        );
    }

    return checkboxElement;
};

CustomCheckBox.defaultProps = {
    checked: false,
    disabled: false,
    onChange: () => {},
    label: "",
    labelPlacement: "end",
    color: "primary",
    size: "medium",
    indeterminate: false,
};

CustomCheckBox.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    labelPlacement: PropTypes.oneOf(["end", "start", "top", "bottom"]),
    color: PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]),
    size: PropTypes.oneOf(["small", "medium"]),
    indeterminate: PropTypes.bool,
};

export default CustomCheckBox;