import React from "react";
import PropTypes from "prop-types";
import { Box, Skeleton, Typography } from "@mui/material";
import personIcon from "../../static/images/person.png";
import bagIcon from "../../static/images/bag.png";
import starIcon from "../../static/images/star.png";
import messageIcon from "../../static/images/message.png";

/**
 * ContainerTwo Component
 * 
 * Displays doctor statistics:
 * - Total consultations
 * - Total experience (years)
 * - Average rating
 * - Total reviews
 * 
 * Shows skeletons while loading
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isLoading - Loading state
 * @param {number} props.doctorTotalconsultations - Total consultations count
 * @param {number} props.doctorTotalExperience - Total years of experience
 * @param {number} props.doctorAverageRating - Average rating (1-5)
 * @param {number} props.doctorTotalReviews - Total number of reviews
 * 
 * @component
 */
const ContainerTwo = ({ isLoading, doctorTotalconsultations, doctorTotalReviews, doctorTotalExperience, doctorAverageRating }) => {
  
  /**
   * Statistics data array for consistent rendering
   * Each item contains: icon, value, label
   */
  const data = [
    {
      icon: personIcon,
      value: doctorTotalconsultations || "0",
      label: "Consultaions",
    },
    {
      icon: bagIcon,
      value: doctorTotalExperience || "0",
      label: "Experience",
    },
    {
      icon: starIcon,
      value: doctorAverageRating || "0",
      label: "Rating",
    },
    {
      icon: messageIcon,
      value: doctorTotalReviews || "0",
      label: "Reviews",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Loading State - Show skeletons while fetching data */}
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
              {/* Icon skeleton */}
              <Skeleton
                variant="circular"
                width={56}
                height={56}
                sx={{ backgroundColor: "#FDEAED", marginBottom: "10px" }}
              />
              {/* Value skeleton */}
              <Skeleton variant="text" width="50%" height={20} />
              {/* Label skeleton */}
              <Skeleton variant="text" width="70%" height={15} />
            </Box>
          ))}
        </Box>
      ) : (
        /* Statistics Display - Show actual data */
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
              {/* Statistic Icon */}
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
              
              {/* Statistic Value */}
              <Typography
                component="h3"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "30px",
                  color: "#E72B4A",
                }}
              >
                {item.value}
              </Typography>
              
              {/* Statistic Label */}
              <Typography
                component="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "24px",
                  color: "#313033",
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

// PropTypes for type checking
ContainerTwo.propTypes = {
    isLoading: PropTypes.bool,
    doctorTotalconsultations: PropTypes.number,
    doctorTotalReviews: PropTypes.number,
    doctorTotalExperience: PropTypes.number,
    doctorAverageRating: PropTypes.number,
};

ContainerTwo.defaultProps = {
    isLoading: false,
    doctorTotalconsultations: 0,
    doctorTotalReviews: 0,
    doctorTotalExperience: 0,
    doctorAverageRating: 0,
};

export default ContainerTwo;
