import React from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { Box, Typography } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import dayjs from "dayjs";
import "./CustomDatePicker.scss";

const CustomDatePicker = ({
    label = "Date",
    value = null,
    onChange = () => {},
    required = false,
    disabled = false,
    error = false,
    helperText = "",
    placeholder = "",
    textcss = {},
    noSpacing = false,
    size = "medium",
    variant = "standard", // Changed default to "standard" for underline style
    fullWidth = true,
    showLabel = true, // New prop to control label display
    ...props
}) => {
    // Convert value to dayjs object if it's a Date or string
    const dayjsValue = React.useMemo(() => {
        if (!value) return null;
        if (dayjs.isDayjs(value)) return value;
        return dayjs(value);
    }, [value]);

    // Handle onChange to convert back to Date object for compatibility
    const handleChange = (newValue) => {
        if (onChange) {
            // Convert dayjs object back to Date object for backward compatibility
            onChange(newValue ? newValue.toDate() : null);
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case "small":
                return {
                    fontSize: "14px",
                    padding: "8px 0",
                    minHeight: "40px"
                };
            case "large":
                return {
                    fontSize: "18px",
                    padding: "16px 0",
                    minHeight: "56px"
                };
            default:
                return {
                    fontSize: "16px",
                    padding: "12px 0",
                    minHeight: "48px"
                };
        }
    };

    // Use placeholder text - if no placeholder provided, use label text as placeholder
    const displayPlaceholder = placeholder || label || "";

    return (
        <Box className={`custom-date-picker ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
            {/* Label is optional and hidden by default for minimalist design */}
            {showLabel && label && (
                <Typography 
                    variant="body2" 
                    className="date-picker-label"
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: size === "small" ? "12px" : size === "large" ? "16px" : "14px",
                        color: error ? "#d32f2f" : "#495057",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}
                >
                    <CalendarToday sx={{ fontSize: size === "small" ? "16px" : size === "large" ? "20px" : "18px" }} />
                    {label}
                    {required && <span style={{ color: "#d32f2f" }}>*</span>}
                </Typography>
            )}
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={dayjsValue}
                    onChange={handleChange}
                    disabled={disabled}
                    openTo="day" // Open calendar when clicked
                    disableOpenPicker={false} // CRITICAL: Ensure calendar can open
                    slotProps={{
                        textField: {
                            variant: variant, // "standard" for underline style
                            fullWidth: fullWidth,
                            required: required,
                            error: error,
                            helperText: helperText,
                            placeholder: displayPlaceholder, // Placeholder text appears inside field
                            size: size,
                            InputLabelProps: {
                                shrink: false, // Don't show floating label - use placeholder instead
                            },
                            sx: {
                                fontFamily: "Poppins, sans-serif",
                                ...getSizeStyles(),
                                marginBottom: noSpacing ? 0 : "1.5rem",
                                position: "relative",
                                
                                // Standard/Underline variant styling (matches image design)
                                "& .MuiInput-underline": {
                                    "&:before": {
                                        borderBottomColor: error ? "#d32f2f" : "#e0e0e0",
                                        borderBottomWidth: "1px",
                                    },
                                    "&:hover:not(.Mui-disabled):before": {
                                        borderBottomColor: error ? "#d32f2f" : "#E53935", // Red underline on hover
                                        borderBottomWidth: "2px",
                                    },
                                    "&:after": {
                                        borderBottomColor: error ? "#d32f2f" : "#E53935", // Red underline when focused
                                        borderBottomWidth: "2px",
                                    },
                                },
                                
                                "& .MuiInputBase-input": {
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    color: value ? "#2c3e50" : "#808080", // Gray when empty, darker when has value
                                    textAlign: "left",
                                    padding: "8px 32px 8px 0", // Space for calendar icon on right
                                    fontSize: "16px",
                                    cursor: "pointer", // Show pointer cursor to indicate clickable
                                    
                                    "&::placeholder": {
                                        color: "#808080", // Light gray placeholder (matches image)
                                        opacity: 1,
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 400,
                                    },
                                },
                                
                                // Make entire input area clickable to open calendar
                                "& .MuiInputBase-root": {
                                    cursor: "pointer", // Show pointer cursor
                                },
                                
                                "& .MuiInputLabel-root": {
                                    display: "none", // Hide label - using placeholder instead
                                },
                                
                                "& .MuiFormHelperText-root": {
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    marginTop: "6px",
                                    color: error ? "#d32f2f" : "#6c757d",
                                },
                                
                                // Calendar icon styling - ensure it's clickable
                                "& .MuiInputAdornment-root": {
                                    color: "#808080", // Light gray icon color (matches image)
                                    paddingRight: "0",
                                    pointerEvents: "auto", // CRITICAL: Make adornment clickable
                                    
                                    "& .MuiIconButton-root": {
                                        color: "#808080", // Light gray calendar icon
                                        padding: "4px",
                                        pointerEvents: "auto", // Ensure button receives clicks
                                        cursor: "pointer",
                                        "&:hover": {
                                            color: "#E53935", // Red on hover
                                            backgroundColor: "transparent",
                                        },
                                        "& svg": {
                                            fontSize: "20px",
                                            pointerEvents: "none", // Icon doesn't need pointer events, button does
                                        },
                                    },
                                    
                                    "& .MuiSvgIcon-root": {
                                        color: "#808080", // Light gray calendar icon
                                        fontSize: "20px",
                                        transition: "color 0.2s ease",
                                    },
                                },
                                
                                // Outlined variant styling (fallback for outlined variant)
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    backgroundColor: disabled ? "#f5f5f5" : "#ffffff",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    border: `2px solid ${error ? "#d32f2f" : "#e0e0e0"}`,
                                    
                                    "&:hover": {
                                        borderColor: error ? "#d32f2f" : "#E53935",
                                        boxShadow: `0 0 0 3px ${error ? "rgba(211, 47, 47, 0.1)" : "rgba(229, 57, 53, 0.1)"}`,
                                    },
                                    
                                    "&.Mui-focused": {
                                        borderColor: error ? "#d32f2f" : "#E53935",
                                        boxShadow: `0 0 0 3px ${error ? "rgba(211, 47, 47, 0.2)" : "rgba(229, 57, 53, 0.2)"}`,
                                    },
                                    
                                    "&.Mui-disabled": {
                                        backgroundColor: "#f5f5f5",
                                        borderColor: "#e0e0e0",
                                        cursor: "not-allowed",
                                    },
                                },
                                
                                ...textcss,
                            },
                        },
                        openPickerButton: {
                            sx: {
                                color: "#808080", // Light gray icon color (matches image)
                                padding: "4px",
                                "&:hover": {
                                    color: "#E53935", // Red on hover
                                    backgroundColor: "transparent",
                                },
                                "& svg": {
                                    fontSize: "20px",
                                },
                                // Ensure button is clickable
                                pointerEvents: "auto",
                                cursor: "pointer",
                            },
                        },
                    }}
                    slots={{
                        openPickerIcon: CalendarToday, // Use CalendarToday icon
                    }}
                    {...props}
                />
            </LocalizationProvider>
        </Box>
    );
};

CustomDatePicker.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
        PropTypes.number,
        PropTypes.object, // dayjs object
    ]),
    onChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    placeholder: PropTypes.string,
    textcss: PropTypes.object,
    noSpacing: PropTypes.bool,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
    fullWidth: PropTypes.bool,
    showLabel: PropTypes.bool, // New prop to show/hide label above field
};

CustomDatePicker.defaultProps = {
    label: "Date",
    value: null,
    onChange: () => {},
    required: false,
    disabled: false,
    error: false,
    helperText: "",
    placeholder: "",
    textcss: {},
    noSpacing: false,
    size: "medium",
    variant: "standard", // Changed default to "standard" for underline style
    fullWidth: true,
    showLabel: true, // Show label by default
};

export default CustomDatePicker;
