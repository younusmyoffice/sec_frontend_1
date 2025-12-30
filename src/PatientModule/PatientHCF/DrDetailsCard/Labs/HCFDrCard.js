/**
 * HCFDrCard Component
 * 
 * Displays lab test card with booking functionality:
 * - Test name and pricing information
 * - Working days and time display
 * - Test description
 * - Buy button that opens booking modal
 * 
 * Features:
 * - Modal integration with HCFStepper for booking flow
 * - Responsive card layout with hover effects
 * - Validates data before opening booking modal
 * 
 * Security:
 * - Validates test data before allowing booking
 * 
 * Error Handling:
 * - Toast notifications via logger and toastService ✅
 * - Validation before opening modal ✅
 * 
 * @component
 */

import { Box, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomButton from "../../../../components/CustomButton/custom-button";
import CustomModal from "../../../../components/CustomModal/custom-modal";
import HCFStepper from "../HCFStepper";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications

/**
 * HCFDrCard Component - Lab Test Card
 * 
 * @param {Object} data - Lab test data object
 * @param {string|number} data.sub_exam_id - Sub exam ID
 * @param {string|number} data.exam_id - Exam ID
 * @param {string} data.sub_exam_name - Test name
 * @param {string|number} data.test_price - Test price
 * @param {string} data.lab_working_days_from - Working days start
 * @param {string} data.lab_working_days_to - Working days end
 * @param {string} data.lab_working_time_from - Working time start
 * @param {string} data.lab_working_time_to - Working time end
 * @param {string|number} test_id - Test ID (fallback)
 * @param {string} about - Test description (fallback)
 * @param {string|number} amount - Test price (fallback)
 * @param {string} service_day_from - Service day start (fallback)
 * @param {string} service_day_to - Service day end (fallback)
 * @param {Object} sx - Additional MUI sx props for styling
 */
const HCFDrCard = ({
  data = {},
  test_id = "",
  about = "",
  amount = "",
  service_day_from = "",
  service_day_to = "",
  sx,
}) => {
  logger.debug("🔵 HCFDrCard component rendering", {
    hasData: !!data,
    hasTestId: !!test_id,
    testName: data?.sub_exam_name,
    hasExamId: !!data?.exam_id,
    hasSubExamId: !!data?.sub_exam_id
  });
  
  const [openDialog, setOpenDialog] = useState(false);

  /**
   * Handle Buy button click
   * Validates test data before opening booking modal
   * Ensures all required fields are present for successful booking
   */
  const handleBuyClick = () => {
    // Validate that we have the necessary test ID to proceed with booking
    // Accepts either sub_exam_id, exam_id, or test_id (fallback prop)
    if (!data?.sub_exam_id && !data?.exam_id && !test_id) {
      logger.warn("⚠️ Test ID is missing, cannot proceed with booking", {
        hasSubExamId: !!data?.sub_exam_id,
        hasExamId: !!data?.exam_id,
        hasTestId: !!test_id
      });
      toastService.warning("Test information is incomplete. Please try again.");
      return;
    }
    
    // Additional validation: Check if test name is available for better UX
    if (!data?.sub_exam_name) {
      logger.warn("⚠️ Test name is missing, proceeding with default name");
    }
    
    logger.debug("🛒 Opening lab test booking modal", {
      testId: data?.sub_exam_id || data?.exam_id || test_id,
      testName: data?.sub_exam_name || "Unknown Test"
    });
    
    setOpenDialog(true);
  };

  /**
   * Handle modal close
   * Resets dialog state when booking modal is closed
   */
  const handleModalClose = () => {
    logger.debug("❌ Closing lab test booking modal");
    setOpenDialog(false);
  };

  return (
    <Box 
      sx={{
        width: "560px", // Fixed width for consistent card sizing
        minHeight: "240px", // Fixed minimum height for consistent layout
        borderRadius: "12px",
        // Note: Colors should ideally use SCSS variables or MUI theme
        // #E6E1E5 maps to $grey-background in _variables.scss
        border: "1px solid #E6E1E5", // Border color - should use theme/SCSS variable
        padding: 3,
        backgroundColor: "#FFFFFF", // White background - should use theme/SCSS variable
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)", // Lift effect on hover
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexShrink: 0, // Prevent shrinking in flex container to maintain card width
        ...sx
      }}
    >
      <Box>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}>
          {/* Test Name - Primary text color */}
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 600,
            // Note: #333 should use SCSS variable $primary-text-color or $heading-color
            color: "#333", // Primary text color - should use theme/SCSS variable
          }}>
            {data?.sub_exam_name || "Test Name"}
          </Typography>
          {/* Test Price - Success/green color for pricing */}
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: 500,
            // Note: #4CAF50 should use SCSS variable $valid-color or $green-color
            color: "#4CAF50", // Success/green color for price - should use theme/SCSS variable
          }}>
            Price: {data?.test_price || amount || "N/A"}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box>
          {/* Working Days Information */}
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            // Note: #666 should use SCSS variable $secondary-text-color or $light-grey-color
            color: "#666", // Secondary text color - should use theme/SCSS variable
            lineHeight: "1.6",
          }}>
            <strong>Working Days:</strong>{" "}
            {/* Use data object first, fallback to props if data is incomplete */}
            {data?.lab_working_days_from && data?.lab_working_days_to
              ? `${data.lab_working_days_from} to ${data.lab_working_days_to}`
              : service_day_from && service_day_to
              ? `${service_day_from} to ${service_day_to}`
              : "Not specified"}
          </Typography>
          {/* Working Time Information */}
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            // Note: #666 should use SCSS variable $secondary-text-color or $light-grey-color
            color: "#666", // Secondary text color - should use theme/SCSS variable
            lineHeight: "1.6",
          }}>
            <strong>Working Time:</strong>{" "}
            {data?.lab_working_time_from && data?.lab_working_time_to
              ? `${data.lab_working_time_from} to ${data.lab_working_time_to}`
              : "Not specified"}
          </Typography>
          {/* Test Description - Only shown if about prop is provided */}
          {about && (
            <Typography sx={{
              fontFamily: "Poppins",
              fontSize: "14px",
              // Note: #666 should use SCSS variable $secondary-text-color or $light-grey-color
              color: "#666", // Secondary text color - should use theme/SCSS variable
              lineHeight: "1.6",
            }}>
              <strong>Description:</strong> {about}
            </Typography>
          )}
        </Box>
      </Box>
      {/* Buy Now Button Container */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
        <CustomButton
          label="Buy Now"
          isElevated
          buttonCss={{
            height: "44px",
            width: "120px",
            fontSize: "14px",
            fontWeight: 500,
          }}
          handleClick={handleBuyClick}
        />
      </Box>
      
      {/* Booking Modal - Opens HCFStepper for lab test booking flow */}
      {/* CustomModal wraps the booking stepper and handles modal state */}
      <CustomModal
        isOpen={openDialog}
        title={data?.sub_exam_name || "Purchase Test"}
        // Pass the setter function to control modal open/close state
        conditionOpen={setOpenDialog}
        // Prevent accidental closing during booking process
        disableBackdropClick={true}
      >
        {/* 
          HCFStepper component handles the multi-step booking process:
          1. Date selection
          2. Payment processing via Braintree
          3. Test appointment creation
        */}
        <HCFStepper data={data} />
      </CustomModal>
    </Box>
  );
};

// PropTypes for component documentation and type checking
HCFDrCard.propTypes = {
  data: PropTypes.shape({
    sub_exam_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    exam_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sub_exam_name: PropTypes.string,
    test_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lab_working_days_from: PropTypes.string,
    lab_working_days_to: PropTypes.string,
    lab_working_time_from: PropTypes.string,
    lab_working_time_to: PropTypes.string,
    hcf_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  test_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Test ID fallback
  about: PropTypes.string, // Test description fallback
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Test price fallback
  service_day_from: PropTypes.string, // Service day start fallback
  service_day_to: PropTypes.string, // Service day end fallback
  sx: PropTypes.object, // Additional MUI sx props
};

// Default props
HCFDrCard.defaultProps = {
  data: {},
  test_id: "",
  about: "",
  amount: "",
  service_day_from: "",
  service_day_to: "",
  sx: {},
};

export default HCFDrCard;