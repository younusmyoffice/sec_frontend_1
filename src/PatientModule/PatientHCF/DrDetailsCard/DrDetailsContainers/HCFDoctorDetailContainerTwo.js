import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import personIcon from "../../../../static/images/person.png";
import bagIcon from "../../../../static/images/bag.png";
import starIcon from "../../../../static/images/star.png";
import messageIcon from "../../../../static/images/message.png";

const ContainerTwo = ({ isLoading, doctorTotalconsultations, doctorTotalReviews, doctorTotalExperience, doctorAverageRating }) => {
  // Data structure for consistent rendering
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

export default ContainerTwo;
