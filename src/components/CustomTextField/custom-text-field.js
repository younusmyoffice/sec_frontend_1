import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@mui/material";

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
    textcss,
    inputType,
    CustomValue,
    placeholder,
    onInput,
    type,
    multiline,
    rows,
    maxRows,
    onLeftIconClick,  // New prop for handling left icon click
    onRightIconClick, // New prop for handling right icon click
    error, // New prop for error state
    noSpacing = false, // New prop to disable default spacing
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextField
            type={type}
            className={`${isValid ? "valid-class" : ""}${isInvalid ? "invalid-class" : ""}`}
            typeof={type}
            id={id}
            multiline={multiline}
            rows={rows}
            maxRows={maxRows}
            label={label}
            placeholder={placeholder}
            value={CustomValue}
            defaultValue={defaultValue}
            helperText={helperText}
            variant={variant}
            disabled={isDisabled}
            error={error || isInvalid}
            sx={{
                marginBottom: noSpacing ? 0 : "1.5rem",
                fontFamily: "Poppins, sans-serif",
                "& .MuiFormHelperText-root": {
                    color: (error || isInvalid) ? "#d32f2f !important" : "#666",
                    fontSize: "12px",
                    marginTop: "4px",
                    fontWeight: 400,
                },
                "& .MuiInput-root": {
                    borderRadius: "8px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:before": {
                        borderBottom: (error || isInvalid) ? "2px solid #d32f2f !important" : "1px solid #e0e0e0",
                        transition: "border-color 0.3s ease",
                    },
                    "&:hover:not(.Mui-disabled):before": {
                        borderBottom: (error || isInvalid) ? "2px solid #d32f2f !important" : "2px solid #1976d2",
                    },
                    "&.Mui-focused:after": {
                        borderBottom: (error || isInvalid) ? "2px solid #d32f2f !important" : "2px solid #1976d2",
                        transform: "scaleX(1)",
                    },
                    "&:after": {
                        transform: "scaleX(0)",
                        transition: "transform 0.3s ease",
                    }
                },
                "& .MuiInputLabel-root": {
                    color: (error || isInvalid) ? "#d32f2f !important" : "#666",
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&.Mui-focused": {
                        color: (error || isInvalid) ? "#d32f2f !important" : "#1976d2",
                    }
                },
                "& .MuiInputBase-input": {
                    fontSize: "14px",
                    padding: "12px 0",
                    color: "#333",
                    "&::placeholder": {
                        color: "#999",
                        opacity: 1,
                    }
                },
                "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: (error || isInvalid) ? "#d32f2f" : "#1976d2",
                        borderWidth: "2px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: (error || isInvalid) ? "#d32f2f" : "#1976d2",
                        borderWidth: "2px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: (error || isInvalid) ? "#d32f2f" : "#e0e0e0",
                        transition: "border-color 0.3s ease",
                    }
                },
                ...textcss,
            }}
            onInput={onInput}
            onChange={onChange}
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
                              <InputAdornment position="start">
                                  <IconButton onClick={onLeftIconClick}>
                                      {leftIcon}
                                  </IconButton>
                              </InputAdornment>
                          ) : null,
                          endAdornment: rightIcon ? (
                              <InputAdornment position="end">
                                  <IconButton onClick={onRightIconClick}>
                                      {rightIcon}
                                  </IconButton>
                              </InputAdornment>
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
    leftIcon: null,  // Allow custom icon to be passed
    rightIcon: null,  // Allow custom icon to be passed
    onChange: () => {},
    onLeftIconClick: () => {},  // Default no-op for icon click
    onRightIconClick: () => {}, // Default no-op for icon click
    error: false, // Default no error state
    noSpacing: false, // Default spacing enabled
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
    onInput: PropTypes.string.isRequired,
    onLeftIconClick: PropTypes.func,  // Prop type for left icon click handler
    onRightIconClick: PropTypes.func, // Prop type for right icon click handler
    error: PropTypes.bool, // Prop type for error state
    noSpacing: PropTypes.bool, // Prop type for spacing control
};

export default CustomTextField;

// // import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { TextField, InputAdornment } from "@mui/material";

// const CustomTextField = ({
//     id,
//     label,
//     defaultValue,
//     helperText,
//     variant,
//     isValid,
//     isInvalid,
//     isDisabled,
//     leftIcon,
//     rightIcon,
//     onChange,
//     textcss,
//     inputType,
//     CustomValue,
//     placeholder,
//     onInput,
//     type,
//     multiline,
//     rows,
//     maxRows,
// }) => {
//     const [isFocused, setIsFocused] = useState(false);

//     return (
//         <TextField
//             type={type}
//             className={`${isValid ? "valid-class" : ""}${isInvalid ? "invalid-class" : ""}`}
//             typeof={type}
//             id={id}
//             multiline={multiline}
//             rows={rows}
//             maxRows={maxRows}
//             label={label}
//             placeholder={placeholder}
//             value={CustomValue}
//             defaultValue={defaultValue}
//             helperText={helperText}
//             variant={variant}
//             disabled={isDisabled}
//             sx={textcss}
//             onInput={onInput}
//             onChange={onChange}
//             InputLabelProps={{
//                 shrink: !!defaultValue || !!isFocused,
//                 style: leftIcon ? { paddingLeft: 30 } : {},
//             }}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             {...(leftIcon || rightIcon
//                 ? {
//                       // only add InputProps if leftIcon or rightIcon is defined
//                       InputProps: {
//                           startAdornment: leftIcon ? (
//                               <InputAdornment position="start">{leftIcon}</InputAdornment>
//                           ) : null,
//                           endAdornment: rightIcon ? (
//                               <InputAdornment position="end">{rightIcon}</InputAdornment>
//                           ) : null,
//                       },
//                   }
//                 : {})}
//         />
//     );
// };

// CustomTextField.defaultProps = {
//     id: "text-field",
//     label: "username",
//     defaultValue: "",
//     helperText: "valid username",
//     variant: "standard",
//     isValid: false,
//     isInvalid: false,
//     isDisabled: false,
//     leftIcon: null,  // Allow custom icon to be passed
//     // leftIcon: "",
//     rightIcon: "",
//     onChange: () => {},
// };

// CustomTextField.propTypes = {
//     id: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     defaultValue: PropTypes.string,
//     helperText: PropTypes.string,
//     variant: PropTypes.string,
//     isValid: PropTypes.bool,
//     isInvalid: PropTypes.bool,
//     isDisabled: PropTypes.bool,
//     leftIcon: PropTypes.node,
//     rightIcon: PropTypes.node,
//     onChange: PropTypes.func,
//     onInput: PropTypes.string.isRequired,
// };

// export default CustomTextField;
