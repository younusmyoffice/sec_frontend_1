import React from "react";
import PropTypes from "prop-types";
import "./toggle-switch.scss";

const CustomToggleSwitch = ({
    id,
    name,
    checked,
    onChange,
    optionLabels,
    small,
    disabled,
    icon,
}) => {
    return (
        <div className={`toggle-switch${small ? " small-switch" : ""}`}>
            <input
                type="checkbox"
                name={name}
                className="toggle-switch-checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />
            {id ? (
                <label className="toggle-switch-label" htmlFor={id}>
                    <span
                        className={
                            disabled
                                ? "toggle-switch-inner toggle-switch-disabled"
                                : "toggle-switch-inner"
                        }
                        data-yes={optionLabels[0]}
                        data-no={optionLabels[1]}
                    />
                    <span
                        className={
                            disabled
                                ? "toggle-switch-switch toggle-switch-disabled"
                                : "toggle-switch-switch"
                        }
                    >
                        {icon && (
                            <span
                                className={`material-symbols-outlined${
                                    disabled ? " disabled" : ""
                                }`}
                            >
                                {icon}
                            </span>
                        )}
                    </span>
                </label>
            ) : null}
        </div>
    );
};

// Set optionLabels for rendering.
CustomToggleSwitch.defaultProps = {
    optionLabels: ["Yes", "No"],
    icon: "check",
};

CustomToggleSwitch.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    optionLabels: PropTypes.array,
    small: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
};

export default CustomToggleSwitch;
