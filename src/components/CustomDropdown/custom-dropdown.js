import React, { useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";

const CustomDropdown = ({
    label,
    dropdowncss = { m: 1, minWidth: 150 },
    items,
    activeItem,
    handleChange,
    isFabIcon,
    isDisabled,
    fabIcon,
    menuItemValue = "All",
    CustomSx,
    variant = "outlined",
    size = "medium"
}) => {
    const labelId = `dropdown-list-label-${label}`;
    const inputRef = useRef(null);

    const defaultStyles = {
        fontFamily: "Poppins, sans-serif",
        borderRadius: "8px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e0e0e0",
            transition: "border-color 0.3s ease",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e72b4a",
            borderWidth: "2px",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e72b4a",
            borderWidth: "2px",
        },
        "& .MuiSelect-select": {
            padding: size === "small" ? "8px 12px" : size === "large" ? "16px 20px" : "12px 16px",
            fontSize: "14px",
            color: "#333",
        },
        "& .MuiInputLabel-root": {
            fontSize: "14px",
            fontWeight: 500,
            color: "#666",
            "&.Mui-focused": {
                color: "#e72b4a",
            }
        },
        "& .MuiMenuItem-root": {
            fontSize: "14px",
            padding: "12px 16px",
            transition: "background-color 0.2s ease",
            "&:hover": {
                backgroundColor: "#f5f5f5",
            },
            "&.Mui-selected": {
                backgroundColor: "#e3f2fd",
                "&:hover": {
                    backgroundColor: "#bbdefb",
                }
            }
        }
    };

    return (
        <FormControl 
            variant={variant} 
            sx={{
                ...defaultStyles,
                ...dropdowncss
            }}
            size={size}
        >
            {isFabIcon ? (
                <Select
                    className="fab-icon-class"
                    labelId={labelId}
                    id={labelId}
                    value={activeItem}
                    onChange={({ target }) => handleChange(target.value)}
                    inputRef={inputRef}
                    disabled={isDisabled}
                    renderValue={() => (
                        <div
                            onClick={() => {
                                inputRef.current.parentNode.click();
                            }}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            {fabIcon}
                        </div>
                    )}
                >
                    {items.map((item, idx) => (
                        <MenuItem key={idx} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <Fragment>
                    <InputLabel id={labelId}>{label}</InputLabel>
                    <Select
                        labelId={label}
                        id={labelId}
                        sx={CustomSx}
                        disabled={isDisabled}
                        value={activeItem}
                        onChange={({ target }) => handleChange(target.value)}
                        label={label}
                    >
                        <MenuItem value="">{menuItemValue}</MenuItem>
                        {items.map((item, idx) => (
                            <MenuItem key={idx} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </Fragment>
            )}
        </FormControl>
    );
};

CustomDropdown.defaultProps = {
    label: "Select Option",
    items: ["Option 1", "Option 2", "Option 3"],
    activeItem: "",
    isFabIcon: false,
    fabIcon: <Fragment></Fragment>,
    handleChange: () => {},
    isDisabled: false,
    variant: "outlined",
    size: "medium",
};

CustomDropdown.propTypes = {
    dropdowncss: PropTypes.object,
    label: PropTypes.string,
    items: PropTypes.array,
    activeItem: PropTypes.string,
    isFabIcon: PropTypes.bool,
    fabIcon: PropTypes.node,
    handleChange: PropTypes.func,
    menuItemValue: PropTypes.string,
    isDisabled: PropTypes.bool,
    variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default CustomDropdown;
