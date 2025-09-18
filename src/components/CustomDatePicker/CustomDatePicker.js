import React from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";

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

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={dayjsValue}
                onChange={handleChange}
                disabled={disabled}
                slotProps={{
                    textField: {
                        variant: "standard",
                        fullWidth: true,
                        required: required,
                        error: error,
                        helperText: helperText,
                        placeholder: placeholder,
                        sx: {
                            width: "100%",
                            color: "#787579",
                            marginBottom: noSpacing ? 0 : "1.5rem", // Consistent spacing between fields
                            // Ensure calendar icon is visible and properly styled
                            "& .MuiInputAdornment-root": {
                                color: "#787579",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "#787579",
                            },
                            // Red error styling when error prop is true
                            "& .MuiFormHelperText-root": {
                                color: error ? "#d32f2f !important" : "inherit"
                            },
                            "& .MuiInput-root": {
                                "&:before": {
                                    borderBottom: error ? "2px solid #d32f2f !important" : "1px solid rgba(0, 0, 0, 0.42)"
                                },
                                "&:hover:not(.Mui-disabled):before": {
                                    borderBottom: error ? "2px solid #d32f2f !important" : "2px solid rgba(0, 0, 0, 0.87)"
                                },
                                "&.Mui-focused:after": {
                                    borderBottom: error ? "2px solid #d32f2f !important" : "2px solid #1976d2"
                                }
                            },
                            "& .MuiInputLabel-root": {
                                color: error ? "#d32f2f !important" : "inherit"
                            },
                            ...textcss, // Allow override of styling if needed
                        },
                    },
                }}
                {...props}
            />
        </LocalizationProvider>
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
};

export default CustomDatePicker;
