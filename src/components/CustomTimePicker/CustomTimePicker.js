import React from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import dayjs from "dayjs";
import "./CustomTimePicker.scss";

const CustomTimePicker = ({
    label = "Time",
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
    variant = "standard",
    fullWidth = true,
    ...props
}) => {
    // Convert value to dayjs object if it's a Date, string, or number
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
                    padding: "8px 12px",
                    minHeight: "40px"
                };
            case "large":
                return {
                    fontSize: "18px",
                    padding: "16px 20px",
                    minHeight: "56px"
                };
            default:
                return {
                    fontSize: "16px",
                    padding: "12px 16px",
                    minHeight: "48px"
                };
        }
    };

    return (
        <Box className={`custom-time-picker ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
            {label && (
                <Typography 
                    variant="body2" 
                    className="time-picker-label"
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
                    <AccessTime sx={{ fontSize: size === "small" ? "16px" : size === "large" ? "20px" : "18px" }} />
                    {label}
                    {required && <span style={{ color: "#d32f2f" }}>*</span>}
                </Typography>
            )}
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    value={dayjsValue}
                    onChange={handleChange}
                    disabled={disabled}
                    slotProps={{
                        textField: {
                            variant: variant,
                            fullWidth: fullWidth,
                            required: required,
                            error: error,
                            helperText: helperText,
                            placeholder: placeholder,
                            size: size,
                            sx: {
                                fontFamily: "Poppins, sans-serif",
                                ...getSizeStyles(),
                                marginBottom: noSpacing ? 0 : "1.5rem",
                                
                                // Standard variant styling to match other form components
                                "& .MuiInputLabel-root": {
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 500,
                                    color: error ? "#d32f2f" : "#787579",
                                    
                                    "&.Mui-focused": {
                                        color: error ? "#d32f2f" : "#d32f2f",
                                    },
                                },
                                
                                "& .MuiInput-underline": {
                                    "&:before": {
                                        borderBottomColor: error ? "#d32f2f" : "#e0e0e0",
                                    },
                                    
                                    "&:hover:not(.Mui-disabled):before": {
                                        borderBottomColor: error ? "#d32f2f" : "#d32f2f",
                                    },
                                    
                                    "&:after": {
                                        borderBottomColor: error ? "#d32f2f" : "#d32f2f",
                                    },
                                },
                                
                                "& .MuiInputBase-input": {
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 500,
                                    color: "#2c3e50",
                                    padding: "8px 0",
                                    
                                    "&::placeholder": {
                                        color: "#adb5bd",
                                        opacity: 1,
                                    },
                                },
                                
                                "& .MuiFormHelperText-root": {
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    marginTop: "6px",
                                    color: error ? "#d32f2f" : "#6c757d",
                                },
                                
                                "& .MuiInputAdornment-root": {
                                    color: error ? "#d32f2f" : "#d32f2f",
                                    
                                    "&:hover": {
                                        color: error ? "#d32f2f" : "#1565c0",
                                    },
                                },
                                
                                "& .MuiSvgIcon-root": {
                                    color: error ? "#d32f2f" : "#d32f2f",
                                    transition: "color 0.3s ease",
                                    
                                    "&:hover": {
                                        color: error ? "#d32f2f" : "#1565c0",
                                    },
                                },
                                
                                // Outlined variant styling (when variant="outlined" is used)
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    backgroundColor: disabled ? "#f5f5f5" : "#ffffff",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    border: `1px solid ${error ? "#d32f2f" : "#e0e0e0"}`,
                                    
                                    "&:hover": {
                                        borderColor: error ? "#d32f2f" : "#d32f2f",
                                        boxShadow: `0 0 0 2px ${error ? "rgba(211, 47, 47, 0.1)" : "rgba(25, 118, 210, 0.1)"}`,
                                    },
                                    
                                    "&.Mui-focused": {
                                        borderColor: error ? "#d32f2f" : "#d32f2f",
                                        boxShadow: `0 0 0 2px ${error ? "rgba(211, 47, 47, 0.2)" : "rgba(25, 118, 210, 0.2)"}`,
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
                    }}
                    {...props}
                />
            </LocalizationProvider>
        </Box>
    );
};

CustomTimePicker.propTypes = {
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
};

CustomTimePicker.defaultProps = {
    label: "Time",
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
    variant: "standard",
    fullWidth: true,
};

export default CustomTimePicker;
