import { Box, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../../../components/CustomButton/custom-button";
import CustomModal from "../../../../../../components/CustomModal/custom-modal";
import HCFStepper from "../HCFStepper";

const HCFDrCard = ({
  data,
  test_id = "",
  about = "",
  amount = "",
  service_day_from = "",
  service_day_to = "",
  sx,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleBuyClick = () => {
    setOpenDialog(true);
  };

  const handleModalClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box 
      sx={{
        width: "560px", // Fixed width
        minHeight: "240px", // Fixed minimum height
        borderRadius: "12px",
        border: "1px solid #E6E1E5",
        padding: 3,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexShrink: 0, // Prevent shrinking in flex container
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
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 600,
            color: "#333",
          }}>
            {data?.sub_exam_name || "Test Name"}
          </Typography>
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: 500,
            color: "#4CAF50",
          }}>
            Price: {data?.test_price || amount || "N/A"}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box>
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            color: "#666",
            lineHeight: "1.6",
          }}>
            <strong>Working Days:</strong>{" "}
            {data?.lab_working_days_from && data?.lab_working_days_to
              ? `${data.lab_working_days_from} to ${data.lab_working_days_to}`
              : service_day_from && service_day_to
              ? `${service_day_from} to ${service_day_to}`
              : "Not specified"}
          </Typography>
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            color: "#666",
            lineHeight: "1.6",
          }}>
            <strong>Working Time:</strong>{" "}
            {data?.lab_working_time_from && data?.lab_working_time_to
              ? `${data.lab_working_time_from} to ${data.lab_working_time_to}`
              : "Not specified"}
          </Typography>
          {about && (
            <Typography sx={{
              fontFamily: "Poppins",
              fontSize: "14px",
              color: "#666",
              lineHeight: "1.6",
            }}>
              <strong>Description:</strong> {about}
            </Typography>
          )}
        </Box>
      </Box>
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
      <CustomModal
        isOpen={openDialog}
        title={data?.sub_exam_name || "Purchase Test"}
        conditionOpen={setOpenDialog}  // ✅ Pass the setter function as expected
        disableBackdropClick={true}
      >
        <HCFStepper data={data} />
      </CustomModal>
    </Box>
  );
};

export default HCFDrCard;