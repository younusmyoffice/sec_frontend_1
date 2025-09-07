import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";

const CustomTextField = ({
    id,
    label,
    defaultValue,
    helperText,
    variant,
    isValid,
    isInvalid,
    isDisabled,
    leftIcon,
    rightIcon,
    onChange,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextField
            className={`${isValid ? "valid-class" : ""}${isInvalid ? "invalid-class" : ""}`}
            id={id}
            label={label}
            defaultValue={defaultValue}
            helperText={helperText}
            variant={variant}
            disabled={isDisabled}
            onChange={({ target }) => onChange(target.value)}
            InputLabelProps={{
                shrink: !!defaultValue || !!isFocused,
                style: leftIcon ? { paddingLeft: 30 } : {},
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...(leftIcon || rightIcon
                ? {
                      // only add InputProps if leftIcon or rightIcon is defined
                      InputProps: {
                          startAdornment: leftIcon ? (
                              <InputAdornment position="start">{leftIcon}</InputAdornment>
                          ) : null,
                          endAdornment: rightIcon ? (
                              <InputAdornment position="end">{rightIcon}</InputAdornment>
                          ) : null,
                      },
                  }
                : {})}
        />
    );
};

CustomTextField.defaultProps = {
    id: "text-field",
    label: "username",
    defaultValue: "",
    helperText: "valid username",
    variant: "standard",
    isValid: false,
    isInvalid: false,
    isDisabled: false,
    leftIcon: "",
    rightIcon: "",
    onChange: () => {},
};

CustomTextField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    helperText: PropTypes.string,
    variant: PropTypes.string,
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    isDisabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onChange: PropTypes.func,
};

export default CustomTextField;
