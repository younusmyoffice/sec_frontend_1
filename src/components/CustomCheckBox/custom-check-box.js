import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";

const CustomCheckBox = ({ checked, disabled, onChange }) => {
    return <Checkbox disabled={disabled} checked={checked} onChange={onChange} />;
};

CustomCheckBox.defaultProps = {
    checked: false,
    disabled: false,
    onChange: () => {},
};

CustomCheckBox.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

export default CustomCheckBox;
