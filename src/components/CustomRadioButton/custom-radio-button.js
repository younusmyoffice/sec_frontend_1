import React from "react";
import PropTypes from "prop-types";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";

const CustomRadioButton = ({ label, radiocss, handleChange, value, items, radioGroupCss }) => {
    return (
        <FormControl>
            {label && <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>}
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                sx={radioGroupCss}
                onChange={handleChange}
            >
                {items.map((item, idx) => (
                    <FormControlLabel
                        key={idx}
                        sx={radiocss}
                        value={item}
                        control={<Radio />}
                        label={item}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

CustomRadioButton.defaultProps = {
    label: "items",
    handleChange: () => {},
    value: "item 1",
    items: ["item 1", "item 2", "item 3"],
};

CustomRadioButton.propTypes = {
    items: PropTypes.array,
    label: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    radiocss: PropTypes.object,
};

export default CustomRadioButton;
