import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import image1 from "../../static/images/DrImages/image1.png";
import image2 from "../../static/images/DrImages/image2.png";
import image3 from "../../static/images/DrImages/image3.png";
import image4 from "../../static/images/DrImages/image4.jpg";

import Card from "./card";

export const data = [
    {
        id: 1,
        drimage: image1,
        name: "Dr. Elizabeth Davis",
        hospital: "Xyz Hostital",
        specialist: "Neurologist",
        rating: "4.5",
        reviews: "(200) Review",
    },
    {
        id: 2,
        drimage: image2,
        name: "Dr. William",
        hospital: "Gangaram Hostital",
        specialist: "Pediatric",
        rating: "4.3",
        reviews: "(400) Review",
    },
    {
        id: 3,
        drimage: image3,
        name: "Dr. Elizabeth Davis",
        hospital: "RML Hostital",
        specialist: "Nutritionist",
        rating: "3.9",
        reviews: "(900) Review",
    },
    {
        id: 4,
        drimage: image4,
        name: "Dr. Elizabeth Davis",
        hospital: "RML Hostital",
        specialist: "homeopathist",
        rating: "3.9",
        reviews: "(900) Review",
    },
];

export const CallCardData = ({ CardData, textField }) => {
    return (
        <Box sx={{ width: "100%", marginTop: "2%" }}>
            <Box sx={{ borderRadius: 1, width: "100%", display: "flex", flexWrap: "wrap" }}>
                {CardData.map((dataprop) => {
                    return (
                        <Link to style={{ width: "50%", textDecoration: "none" }}>
                            <Card ResData={dataprop} />
                        </Link>
                    );
                })}
            </Box>
        </Box>
    );
};
