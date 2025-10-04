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
    variant = "outlined",
    fullWidth = true,
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
        <Box className={`custom-date-picker ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
            {label && (
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
                                
                                // Modern input styling
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    backgroundColor: disabled ? "#f5f5f5" : "#ffffff",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    border: `2px solid ${error ? "#d32f2f" : "#e0e0e0"}`,
                                    
                                    "&:hover": {
                                        borderColor: error ? "#d32f2f" : "#ff6b9d",
                                        boxShadow: `0 0 0 3px ${error ? "rgba(211, 47, 47, 0.1)" : "rgba(255, 107, 157, 0.1)"}`,
                                    },
                                    
                                    "&.Mui-focused": {
                                        borderColor: error ? "#d32f2f" : "#ff6b9d",
                                        boxShadow: `0 0 0 3px ${error ? "rgba(211, 47, 47, 0.2)" : "rgba(255, 107, 157, 0.2)"}`,
                                    },
                                    
                                    "&.Mui-disabled": {
                                        backgroundColor: "#f5f5f5",
                                        borderColor: "#e0e0e0",
                                        cursor: "not-allowed",
                                    },
                                },
                                
                                "& .MuiInputBase-input": {
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 500,
                                    color: "#2c3e50",
                                    
                                    "&::placeholder": {
                                        color: "#adb5bd",
                                        opacity: 1,
                                    },
                                },
                                
                                "& .MuiInputLabel-root": {
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 500,
                                    color: error ? "#d32f2f" : "#6c757d",
                                    
                                    "&.Mui-focused": {
                                        color: error ? "#d32f2f" : "#ff6b9d",
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
                                    color: error ? "#d32f2f" : "#ff6b9d",
                                    
                                    "&:hover": {
                                        color: error ? "#d32f2f" : "#ff8fab",
                                    },
                                },
                                
                                "& .MuiSvgIcon-root": {
                                    color: error ? "#d32f2f" : "#ff6b9d",
                                    transition: "color 0.3s ease",
                                    
                                    "&:hover": {
                                        color: error ? "#d32f2f" : "#ff8fab",
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
    variant: "outlined",
    fullWidth: true,
};

export default CustomDatePicker;
