import React from "react";
import PropTypes from "prop-types";

export const CustomCircularProgress = ({
    size,
    progress,
    trackWidth,
    indicatorWidth,
    trackColor,
    indicatorColor,
    spinnerMode,
    spinnerSpeed,
    indicatorCap,
}) => {
    const center = size / 2;
    const radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray * ((100 - progress) / 100);

    return (
        <>
            <div className="svg-pi-wrapper" style={{ width: size, height: size }}>
                <svg className="svg-pi" style={{ width: size, height: size }}>
                    <circle
                        className="svg-pi-track"
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={trackColor}
                        strokeWidth={trackWidth}
                    />
                    <circle
                        className={`svg-pi-indicator ${
                            spinnerMode ? "svg-pi-indicator--spinner" : ""
                        }`}
                        style={{ animationDuration: spinnerSpeed * 1000 }}
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={indicatorColor}
                        strokeWidth={indicatorWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        strokeLinecap={indicatorCap}
                    />
                </svg>
            </div>
        </>
    );
};

CustomCircularProgress.defaultProps = {
    size: 50,
    progress: 0,
    trackWidth: 4,
    trackColor: `#C9C5CA`,
    indicatorWidth: 4,
    indicatorColor: `#E72B4A`,
    indicatorCap: `round`,
    spinnerMode: false,
    spinnerSpeed: 1,
};

CustomCircularProgress.propTypes = {
    size: PropTypes.number,
    progress: PropTypes.number,
    trackWidth: PropTypes.number,
    trackColor: PropTypes.string,
    indicatorWidth: PropTypes.number,
    indicatorColor: PropTypes.string,
    indicatorCap: PropTypes.string,
    spinnerMode: PropTypes.bool,
    spinnerSpeed: PropTypes.number,
};
