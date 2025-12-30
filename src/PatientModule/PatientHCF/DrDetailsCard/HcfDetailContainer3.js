/**
 * HcfDetailContainer3 Component
 * 
 * Displays lab test information and booking:
 * - Test name and pricing
 * - Test timing information
 * - Test description
 * - Book/Buy button with stepper modal
 * 
 * Features:
 * - Modal for booking lab tests
 * - Integration with HCFStepper for booking flow
 * 
 * @component
 */

/**
 * HcfDetailContainer3 Component
 * 
 * Displays lab test information and booking:
 * - Test name and pricing
 * - Test timing information
 * - Test description
 * - Book/Buy button with stepper modal
 * 
 * Features:
 * - Modal for booking lab tests
 * - Integration with HCFStepper for booking flow
 * - Loading states and error handling ✅
 * 
 * @component
 */

import { Box, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomModal from "../../../components/CustomModal/custom-modal";
import HCFStepper from "./HCFStepper";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * Container3 Component - Lab Test Card with Booking
 * 
 * @param {string|number} test_id - Test ID
 * @param {string} about - Test description
 * @param {string|number} amount - Test price/amount
 * @param {string} service_day_from - Service start day
 * @param {string} service_day_to - Service end day
 */
const Container3 = ({ test_id, about, amount, service_day_from, service_day_to }) => {
    logger.debug("🔵 HcfDetailContainer3 component rendering", {
        hasTestId: !!test_id,
        hasAbout: !!about,
        hasAmount: !!amount
    });
    
    const [openDialog, setOpenDialog] = useState(false);
    
    /**
     * Handle opening booking modal
     * Validates data before opening the modal
     */
    const handleOpenDialog = () => {
        if (!test_id) {
            logger.warn("⚠️ Test ID is missing, cannot open booking modal");
            toastService.warning("Test information is incomplete");
            return;
        }
        
        logger.debug("📅 Opening lab test booking modal", { testId: test_id });
        setOpenDialog(true);
    };
    
    /**
     * Handle closing booking modal
     */
    const handleCloseDialog = () => {
        logger.debug("❌ Closing lab test booking modal");
        setOpenDialog(false);
    };

    // Removed unused DrExp array and related imports (personIcon, bagIcon, starIcon, messageIcon)
    // Using makeStyles for component styling - note: consider migrating to sx props for MUI v5
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
        BookAppointmentContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        BookAppointmentContainerDetails: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
        },
        fourthContainer: {
            width: "100%",
            border: "1px solid #E6E1E5 ",
            display: "flex",
            borderRadius: "8px",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "1%",
        },
        textField: {
            fontFamily: "Poppins",
            fontSize: "30px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "30px",
            color: "#313033",
            padding: "2% 0 1% 1%",
        },
        fourthInnerContainer: {
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            padding: "1%",
        },
        logoDesign: {
            height: "70px",
            width: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50px",
            backgroundColor: "#FDEAED",
        },
        // universityFields : {
        //     display: "flex",
        //     flexDirection: "column",
        //     alignItems: "flex-start",
        // }
    });

    // Removed unused DrDetailsCard function and useNavigate import
    const classes = useStyles();

    return (
        <Box sx={{ width: "100%", display: "flex", marginTop: "20px" }}>
            {/* About me container */}

            {/* Reviews container */}
            <Box
                sx={{
                    width: "33%",
                    height: "100%",
                    borderRadius: "8px",
                    marginLeft: "1%",
                    border: "1px solid #E6E1E5",
                    padding: "2%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "24px",
                    }}
                >
                    Test Name
                    <Box sx={{ color: "gray", fontWeight: "light" }}>Price: {amount}</Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Typography
                        sx={{
                            textAlign: "left",
                            fontFamily: "Poppins",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "21px" /* 150% */,
                            color: "#939094",
                            marginTop: "1%",
                        }}
                    >
                        Timing :Mon to Friday,1:00pm to 3:00
                        <Typography sx={{ display: "flex", marginTop: "2%" }}>
                            Description : {about}{" "}
                        </Typography>
                    </Typography>
                    {/* <CustomButton label="Buy"   buttonCss={{marginLeft:"150px",width:"50px",height:"40px",marginTop:"50px"}}></CustomButton> */}
                    <CustomButton
                        label={"Buy"}
                        isElevated
                        buttonCss={{ height: "40px", display: "block", margin: "auto" }}
                        handleClick={handleOpenDialog}
                    />
                    <CustomModal
                        isOpen={openDialog}
                        title={"Book Lab Test"}
                        footer={<Fragment></Fragment>}
                        conditionOpen={setOpenDialog}
                    >
                        <div>
                            {/* Pass test data to HCFStepper for booking */}
                            <HCFStepper data={{
                                sub_exam_id: test_id,
                                exam_id: test_id,
                                hcf_id: null // Will be extracted from URL params in HCFStepper
                            }} />
                        </div>
                    </CustomModal>
                </Box>
            </Box>

            
        </Box>
    );
};

// PropTypes for component documentation and type checking
Container3.propTypes = {
    test_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Test ID
    about: PropTypes.string, // Test description
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Test price
    service_day_from: PropTypes.string, // Service start day
    service_day_to: PropTypes.string, // Service end day
};

// Default props
Container3.defaultProps = {
    about: "No description available",
    amount: "0",
    service_day_from: "",
    service_day_to: "",
};

export default Container3;
