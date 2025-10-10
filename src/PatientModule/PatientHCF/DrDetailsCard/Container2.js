import { Box, Typography, Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import personIcon from "../../../static/images/DrImages/icon.svg";
import messageIcon from "../../../static/images/DrImages/message.svg";
import bagIcon from "../../../static/images/DrImages/bag.svg";
import starIcon from "../../../static/images/DrImages/Group 92.svg";

const DrExp = [
    {
        logo: personIcon,
        number: "4000+",
        type: "Patient",
    },
    {
        logo: bagIcon,
        number: "10+",
        type: "Experience",
    },
    {
        logo: starIcon,
        number: "4.8",
        type: "Rating",
    },
    {
        logo: messageIcon,
        number: "3027",
        type: "Reviews",
    },
];

const useStyles = makeStyles({
    logoDesign: {
        height: "70px",
        width: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50px",
        backgroundColor: "#FDEAED",
    },
});

const Container2 = ({ isLoading }) => {
    const classes = useStyles();
    const navigate = useNavigate();

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
                    {DrExp.map((_, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                            <Skeleton
                                variant="circular"
                                width={56}
                                height={56}
                                sx={{ backgroundColor: "#FDEAED", marginRight: "10%" }}
                            />
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Skeleton
                                    variant="text"
                                    width={40}
                                    height={30}
                                    sx={{ marginBottom: 1 }}
                                />
                                <Skeleton variant="text" width={60} height={20} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "5%" }}>
                    {DrExp.map((fieldsData, index) => (
                        <Box key={index} sx={{ display: "flex" }}>
                            {/* For image */}
                            <Box
                                sx={{
                                    height: "56px",
                                    width: "56px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#FDEAED",
                                    borderRadius: "50px",
                                }}
                            >
                                <Box component="img" src={fieldsData.logo} alt="Doctor Logo" />
                            </Box>
                            <Box
                                sx={{
                                    marginLeft: "10%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Typography
                                    component="h3"
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "20px",
                                        fontStyle: "normal",
                                        fontWeight: "500",
                                        lineHeight: "30px",
                                        color: "#E72B4A",
                                    }}
                                >
                                    {fieldsData.number}
                                </Typography>
                                <Typography component="h4">{fieldsData.type}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Container2;
