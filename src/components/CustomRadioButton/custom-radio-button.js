import React from "react";
import PropTypes from "prop-types";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";

const CustomRadioButton = ({ 
    label, 
    radiocss, 
    handleChange, 
    value, 
    items, 
    radioGroupCss,
    color = "primary",
    size = "medium",
    orientation = "vertical"
}) => {
    return (
        <FormControl sx={{ width: "100%" }}>
            {label && (
                <FormLabel 
                    id="custom-radio-buttons-group"
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#333",
                        marginBottom: "12px",
                        "&.Mui-focused": {
                            color: "#1976d2",
                        }
                    }}
                >
                    {label}
                </FormLabel>
            )}
            <RadioGroup
                aria-labelledby="custom-radio-buttons-group"
                name="custom-radio-buttons-group"
                value={value}
                sx={{
                    ...radioGroupCss,
                    fontFamily: "Poppins, sans-serif",
                }}
                onChange={handleChange}
                row={orientation === "horizontal"}
            >
                {items.map((item, idx) => (
                    <FormControlLabel
                        key={idx}
                        sx={{
                            margin: orientation === "horizontal" ? "0 16px 0 0" : "0 0 8px 0",
                            "& .MuiFormControlLabel-label": {
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#333",
                            },
                            ...radiocss
                        }}
                        value={item}
                        control={
                            <Radio 
                                color={color}
                                size={size}
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
                        }
                        label={item}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

CustomRadioButton.defaultProps = {
    label: "Select Option",
    handleChange: () => {},
    value: "",
    items: ["Option 1", "Option 2", "Option 3"],
    color: "primary",
    size: "medium",
    orientation: "vertical",
};

CustomRadioButton.propTypes = {
    items: PropTypes.array,
    label: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    radiocss: PropTypes.object,
    radioGroupCss: PropTypes.object,
    color: PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]),
    size: PropTypes.oneOf(["small", "medium"]),
    orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default CustomRadioButton;