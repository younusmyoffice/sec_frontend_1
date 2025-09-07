/* eslint-disable space-in-parens */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import image1 from "./DrImages/image1.png";
import image2 from "./DrImages/image2.png";
import image3 from "./DrImages/image3.png";
import Drcard from "./drcard/drcard";

export const baseURL = "http://localhost:3000";

export const data = [
    {
        id: 1,
        drimage: image1,
        name: "Dr. Elizabeth Davis",
        hospital: "Xyz Hospital",
        specialist: "Neurologist",
        rating: "4.5",
        reviews: "(200) Review",
    },
    {
        id: 2,
        drimage: image2,
        name: "Dr. William",
        hospital: "Gangaram Hospital",
        specialist: "Pediatric",
        rating: "4.3",
        reviews: "(400) Review",
    },
    {
        id: 3,
        drimage: image3,
        name: "Dr. Arbaaz Khan",
        hospital: "RML Hospital",
        specialist: "Nutritionist",
        rating: "3.9",
        reviews: "(900) Review",
    },
];

export const CallCardData = ({ sendCardData, textField, linkPath }) => {
    // console.log(sendCardData);
    return (
        <Box sx={{ width: "100%", marginTop: "2%" }}>
            <Box>
                <Typography>{textField}</Typography>
            </Box>
            <Box sx={{ borderRadius: 1, width: "100%", display: "flex" }}>
                {sendCardData.map((dataprop, index) => {
                    if (index <= 2) {
                        return (
                            <Link
                                to={linkPath + dataprop.suid}
                                style={{ width: "33%", textDecoration: "none" }}
                            >
                                <Drcard DrData={dataprop} />
                            </Link>
                        );
                    }
                    return null;
                })}
            </Box>
        </Box>
    );
};

export const currencysign = "₹";
