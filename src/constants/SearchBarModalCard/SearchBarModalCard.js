import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import DefaultDoctorImage from "../../static/images/DrImages/doctor_alter.jpeg";
// import StarIcon from "../static/images/DrImages/ShiningStar.png";
import StarIcon from "../../static/images/DrImages/ShiningStar.png"
import "./searchbarmodalcard.scss";

const SearchBarModalCard = ({ DrData }) => {
  const {
    first_name: name = "",
    middle_name = "",
    last_name = "",
    suid: id,
    qualification = "N/A",
    department_name: specialist = "N/A",
    average_review: rating = "No Reviews",
    hospital_org: hospital = "N/A",
    profile_picture: profilePicture,
  } = DrData || {};

  return (
    <Box key={id} sx={{ width: "100%", marginBottom: 2 }}>
      <Card
        sx={{
          display: "flex",
          height: 128,
          padding: 1,
          backgroundColor: "#fff",
          borderRadius: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 4px 10px #E72B4A",
          },
        }}
      >
        {/* Image Section */}
        <Box sx={{ width: "120px", height: "100%", flexShrink: 0 }}>
          <CardMedia
            component="img"
            src={profilePicture || DefaultDoctorImage}
            alt="Doctor Profile"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 2,
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Content Section */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
            padding: "8px 16px",
          }}
        >
          {/* Doctor Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "4px",
            }}
          >
            {`${name} ${middle_name} ${last_name}`.trim() || "N/A"}
          </Typography>
          <Divider sx={{ my: 1 }} />

          {/* Qualification and Hospital */}
          <Typography
            variant="body2"
            sx={{
              color: "#787579",
              fontSize: "12px",
              lineHeight: "18px",
            }}
          >
            {qualification} {hospital && `| ${hospital}`}
          </Typography>

          {/* Specialist */}
          <Typography
            variant="body2"
            sx={{
              color: "#787579",
              fontSize: "12px",
              lineHeight: "18px",
              marginBottom: "8px",
            }}
          >
            {specialist}
          </Typography>

          {/* Review Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "8px",
              }}
            >
              <img src={StarIcon} alt="Star" style={{ height: "16px" }} />
            </Box>
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: "#787579" }}
            >
              {`Reviews | ${rating}`}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

SearchBarModalCard.propTypes = {
  DrData: PropTypes.shape({
    first_name: PropTypes.string,
    middle_name: PropTypes.string,
    last_name: PropTypes.string,
    suid: PropTypes.string,
    qualification: PropTypes.string,
    department_name: PropTypes.string,
    average_review: PropTypes.string,
    hospital_org: PropTypes.string,
    profile_picture: PropTypes.string,
  }),
};

SearchBarModalCard.defaultProps = {
  DrData: {},
};

export default SearchBarModalCard;
