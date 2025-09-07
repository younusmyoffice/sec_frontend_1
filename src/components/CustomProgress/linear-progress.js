import React from "react";
import PropTypes from "prop-types";
import { Box, LinearProgress } from "@mui/material";

export const CustomLinearProgress = ({ progress }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

CustomLinearProgress.defaultProps = {
    progress: 0,
};

CustomLinearProgress.propTypes = {
    progress: PropTypes.number.isRequired,
};
