/**
 * HCFDoctorDetailContainerTwo Component
 * 
 * Displays doctor statistics in a grid layout:
 * - Total consultations count
 * - Years of experience
 * - Average rating
 * - Total reviews count
 * 
 * Features:
 * - Loading skeleton states ✅
 * - Responsive icon grid layout
 * - Consistent data display with fallback values
 * 
 * @component
 */

import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import personIcon from "../../../../static/images/person.png";
import bagIcon from "../../../../static/images/bag.png";
import starIcon from "../../../../static/images/star.png";
import messageIcon from "../../../../static/images/message.png";
import logger from "../../../../utils/logger"; // Centralized logging

/**
 * ContainerTwo Component - Doctor Statistics Display
 * 
 * @param {boolean} isLoading - Loading state for skeleton display
 * @param {number} doctorTotalconsultations - Total number of consultations
 * @param {number} doctorTotalReviews - Total number of reviews
 * @param {number} doctorTotalExperience - Total years of experience
 * @param {number} doctorAverageRating - Average rating (0-5)
 */
const ContainerTwo = ({ 
    isLoading = false, 
    doctorTotalconsultations = 0, 
    doctorTotalReviews = 0, 
    doctorTotalExperience = 0, 
    doctorAverageRating = 0 
}) => {
    logger.debug("🔵 HCFDoctorDetailContainerTwo component rendering", {
        isLoading,
        consultations: doctorTotalconsultations,
        reviews: doctorTotalReviews,
        experience: doctorTotalExperience,
        rating: doctorAverageRating
    });
  /**
   * Doctor statistics data structure
   * Maps icons, values, and labels for consistent rendering
   */
  const data = [
    {
      icon: personIcon,
      value: doctorTotalconsultations || 0,
      label: "Consultations", // Fixed typo: "Consultaions" -> "Consultations"
    },
    {
      icon: bagIcon,
      value: `${doctorTotalExperience || 0}${doctorTotalExperience > 0 ? "+" : ""}`, // Add + for years
      label: "Experience",
    },
    {
      icon: starIcon,
      value: doctorAverageRating?.toFixed(1) || "0.0", // Format rating to 1 decimal place
      label: "Rating",
    },
    {
      icon: messageIcon,
      value: doctorTotalReviews || 0,
      label: "Reviews",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5%",
            width: "100%",
          }}
        >
          {data.map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "25%",
              }}
            >
              <Skeleton
                variant="circular"
                width={56}
                height={56}
                sx={{ backgroundColor: "#FDEAED", marginBottom: "10px" }}
              />
              <Skeleton variant="text" width="50%" height={20} />
              <Skeleton variant="text" width="70%" height={15} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5%",
            width: "100%",
          }}
        >
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "25%",
              }}
            >
              <Box
                sx={{
                  height: "56px",
                  width: "56px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FDEAED",
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
              >
                <Box component="img" src={item.icon} alt={item.label} />
              </Box>
              {/* Statistic Value - Displays the numeric value */}
              <Typography
                component="h3"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "30px",
                  color: "#E72B4A", // Primary brand color - should use theme or SCSS variable
                }}
              >
                {item.value}
              </Typography>
              {/* Statistic Label - Describes what the value represents */}
              <Typography
                component="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "24px",
                  color: "#313033", // Primary text color - should use theme or SCSS variable
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

// PropTypes for component documentation and type checking
ContainerTwo.propTypes = {
  isLoading: PropTypes.bool, // Loading state for skeleton display
  doctorTotalconsultations: PropTypes.number, // Total number of consultations
  doctorTotalReviews: PropTypes.number, // Total number of reviews
  doctorTotalExperience: PropTypes.number, // Total years of experience
  doctorAverageRating: PropTypes.number, // Average rating (0-5)
};

// Default props
ContainerTwo.defaultProps = {
  isLoading: false,
  doctorTotalconsultations: 0,
  doctorTotalReviews: 0,
  doctorTotalExperience: 0,
  doctorAverageRating: 0,
};

export default ContainerTwo;
