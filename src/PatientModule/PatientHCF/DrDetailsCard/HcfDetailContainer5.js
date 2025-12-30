/**
 * HcfDetailContainer5 Component
 * 
 * Displays lab category navigation buttons:
 * - Radiology button (currently hardcoded)
 * - Additional lab category buttons (currently displaying lab_id)
 * 
 * Features:
 * - Horizontal button layout
 * - Navigation for lab categories
 * 
 * Note: This component appears to be incomplete/unused
 * - lab_id and lab_names props are currently unused
 * - Buttons display hardcoded values instead of prop data
 * 
 * @component
 */

import React from "react";
import { Box } from "@mui/material";
import CustomButton from "../../../components/CustomButton";
import PropTypes from "prop-types";
import logger from "../../../utils/logger"; // Centralized logging

const Container5 = ({ lab_id, lab_names }) => {
    logger.debug("🔵 HcfDetailContainer5 component rendering", {
        hasLabId: !!lab_id,
        hasLabNames: !!lab_names
    });



    return (
        <Box style={{ justifyContent: "flex-start", display: "flex" }}>
            <CustomButton
                buttonCss={{ marginLeft: "20px", fontWeight: "bold", height: "45px" }}
                label="Radiology"
            />
            <CustomButton
                buttonCss={{ marginLeft: "20px", height: "45px" }}
                label={lab_id}
                isTransaprent
            />
            <CustomButton
                buttonCss={{ marginLeft: "20px", height: "45px" }}
                label={lab_id}
                isTransaprent
            />
        </Box>
    );
};
// PropTypes for component documentation and type checking
Container5.propTypes = {
    lab_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Lab ID (currently unused)
    lab_names: PropTypes.string, // Lab name/category (currently unused)
};

// Default props
Container5.defaultProps = {
    lab_id: null,
    lab_names: "",
};

export default Container5;
