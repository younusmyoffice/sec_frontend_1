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
    // isDisabled,
}) => {
    const labelId = `dropdown-list-label-${label}`;
    const inputRef = useRef(null);

    return (
        <FormControl variant="standard" sx={dropdowncss}>
            {/* < variant="standard" sx={{ m: 1, minWidth: 150 }}> */}
            {isFabIcon ? (
                <Select
                    className="fab-icon-class"
                    labelId={labelId}
                    id={labelId}
                    value={activeItem}
                    onChange={({ target }) => handleChange(target.value)}
                    inputRef={inputRef}
                    disabled={isDisabled}
                    // sx={{width : "200px"}}
                    renderValue={() => (
                        <div
                            onClick={() => {
                                inputRef.current.parentNode.click();
                            }}
                        >
                            {fabIcon}
                        </div>
                    )}
                    // sx={{width : "100px"}}
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
    label: "items",
    items: ["item1", "item2", "item3"],
    activeItem: "item1",
    isFabIcon: false,
    fabIcon: <Fragment></Fragment>,
    handleChange: () => {},
    isDisabled: false,
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
};

export default CustomDropdown;
