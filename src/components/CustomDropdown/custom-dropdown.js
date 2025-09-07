import React, { useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";

const CustomDropdown = ({ label, items, activeItem, handleChange, isFabIcon, fabIcon }) => {
    const labelId = `dropdown-list-label-${label}`;
    const inputRef = useRef(null);

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
            {isFabIcon ? (
                <Select
                    className="fab-icon-class"
                    labelId={labelId}
                    id={labelId}
                    value={activeItem}
                    onChange={({ target }) => handleChange(target.value)}
                    inputRef={inputRef}
                    renderValue={() => (
                        <div
                            onClick={() => {
                                inputRef.current.parentNode.click();
                            }}
                        >
                            {fabIcon}
                        </div>
                    )}
                    sx={{
                        "& .MuiSelect-icon": {
                            display: "none",
                        },
                    }}
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
                        value={activeItem}
                        onChange={({ target }) => handleChange(target.value)}
                        label={label}
                    >
                        <MenuItem value="">all</MenuItem>
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
    label: "items",
    items: ["item1", "item2", "item3"],
    activeItem: "item1",
    isFabIcon: false,
    fabIcon: <Fragment></Fragment>,
    handleChange: () => {},
};

CustomDropdown.propTypes = {
    label: PropTypes.string,
    items: PropTypes.array,
    activeItem: PropTypes.string,
    isFabIcon: PropTypes.bool,
    fabIcon: PropTypes.node,
    handleChange: PropTypes.func,
};

export default CustomDropdown;
