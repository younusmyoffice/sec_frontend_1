import { Box, Divider, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Imagestar from "../../static/images/DrImages/ShiningStar.png";
import DrImage from "../../static/images/DrImages/doctor_alter.jpeg";

const Drcard = ({ DrData }) => {
    const {
        first_name: name = "",
        middle_name = "",
        last_name = "",
        suid: id,
        qualification = "",
        department_name: specialist = "",
        average_review: rating = "",
        hospital_org: hospital = "",
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
                        boxShadow: "0px 4px 10px #E72B4A  ",
                    },
                }}
            >
                <Box sx={{ width: "120px", height: "100%", flexShrink: 0 }}>
                    <CardMedia
                        component="img"
                        src={DrData?.profile_picture || DrImage}
                        alt="Doctor Profile"
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,
                            objectFit: "cover",
                        }}
                    />
                </Box>

                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        flexGrow: 1,
                        padding: "8px 16px",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: (theme) => theme.typography.fontWeightBold,
                            fontSize: "13px",
                            mb: 0.5,
                            paddingTop: 2,
                        }}
                    >
                        {`${name || ""} ${middle_name || ""} ${last_name || ""}`}
                    </Typography>

                    <Divider sx={{ my: 1 }} />
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
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#787579",
                            fontSize: "12px",
                            lineHeight: "18px",
                            mb: 1,
                        }}
                    >
                        {specialist}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                            component="span"
                            sx={{ display: "flex", alignItems: "center", mr: 0.5 }}
                        >
                            <img src={Imagestar} alt="Star" style={{ height: "16px" }} />
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: "12px", color: "#787579" }}>
                            {`Reviews | ${rating}`}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

Drcard.propTypes = {
    DrData: PropTypes.shape({
        first_name: PropTypes.string,
        middle_name: PropTypes.string,
        last_name: PropTypes.string,
        suid: PropTypes.string,
        qualification: PropTypes.string,
        department_name: PropTypes.string,
        review_type: PropTypes.string,
        hospital_org: PropTypes.string,
    }),
};

export default Drcard;
