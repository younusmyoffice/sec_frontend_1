/**
 * HcfDetailContainer1 Component
 * 
 * Displays HCF profile information including:
 * - HCF profile image
 * - Business/company name
 * - Working time information
 * - Back navigation button
 * 
 * Features:
 * - Loading skeleton states ✅
 * - Responsive layout
 * - Navigation to explore page
 * 
 * @component
 */

import { Box, Typography, Skeleton } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import "./hcfdetailscard.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import hcfpic from "../../../static/images/DrImages/doctor_alter.jpeg";
import CustomButton from "../../../components/CustomButton/custom-button";
import logger from "../../../utils/logger"; // Centralized logging

const useStyles = makeStyles({
    drname: {
        color: "#313033",
        fontFamily: "Poppins",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "900",
        lineHeight: "30px",
    },
    specialist: {
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "24px",
    },
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-between",
    },
});

/**
 * Container1 Component - HCF Profile Display
 * 
 * @param {string} Fname - First name (deprecated, use business_name instead)
 * @param {string} profile_picture - URL of HCF profile picture
 * @param {string} company_name - Company/organization name
 * @param {string} business_name - Business/facility name
 * @param {string} worktime - Working hours information
 * @param {boolean} isLoading - Loading state for skeleton display
 */
const Container1 = ({
    Fname,
    profile_picture,
    company_name,
    business_name,
    worktime,
    isLoading = false, // Default to false for better control
}) => {
    logger.debug("🔵 HcfDetailContainer1 component rendering", {
        hasProfilePicture: !!profile_picture,
        hasBusinessName: !!business_name,
        hasCompanyName: !!company_name,
        isLoading
    });
    
    const classes = useStyles();
    const navigate = useNavigate();
    
    /**
     * Handle back button click
     * Navigates back to the explore page
     */
    const handleBackClick = () => {
        logger.debug("⬅️ Navigating back to explore page");
        navigate("/patientDashboard/dashboard/explore");
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* Button Container */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <CustomButton
                    label="Back"
                    isTransaprent={true}
                    leftIcon={<ChevronLeftIcon />}
                    buttonCss={{ border: "none" }}
                    handleClick={handleBackClick}
                    />
                
            </Box>

            {/* Doctor Card */}
            <Box className={classes.cardContainer}>
                <Box sx={{ display: "flex", marginTop: "1%", width: "70%" }}>
                    {/* Doctor Image */}
                    <Box sx={{ width: "300px", height: "184px" }}>
                        {isLoading ? (
                            <Skeleton variant="rectangular" width="100%" height="100%" />
                        ) : (
                            <Box
                                component={"img"}
                                src={profile_picture || hcfpic}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                    padding: "2%",
                                }}
                            />
                        )}
                    </Box>
                    {/* Doctor Details */}
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            padding: "2%",
                        }}
                    >
                        <Box>
                            <Typography className={classes.drname}>
                                {isLoading ? <Skeleton width={100} /> : business_name}
                            </Typography>
                            <Typography className={classes.specialist}>
                                {isLoading ? <Skeleton width={80} /> : company_name}
                            </Typography>
                            
                        </Box>
                    </Box>
                </Box>

                {/* Working Time */}
                <Box sx={{ marginTop: "70px" }}>
                    <Typography className={classes.drname}>
                        {isLoading ? <Skeleton width={120} /> : "Working Time"}
                    </Typography>
                    <Typography className={classes.specialist}>
                        {isLoading ? 
                            <Skeleton width={150} />
                         : worktime}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

// PropTypes for component documentation and type checking
Container1.propTypes = {
    Fname: PropTypes.string, // Deprecated - use business_name instead
    profile_picture: PropTypes.string, // URL of HCF profile picture
    company_name: PropTypes.string, // Company/organization name
    business_name: PropTypes.string, // Business/facility name
    worktime: PropTypes.string, // Working hours information
    isLoading: PropTypes.bool, // Loading state for skeleton display
};

// Note: Using default parameters in function signature instead of defaultProps
// This avoids React 18.3+ deprecation warnings for defaultProps
// Default values are handled in function parameters above

export default Container1;
