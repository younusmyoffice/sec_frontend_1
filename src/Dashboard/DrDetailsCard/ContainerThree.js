import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { makeStyles } from "@mui/styles";
import PersonIcon from "@mui/icons-material/Person";
import { data, CallCardData } from "../../constants/const";
import Drcard from "../../constants/drcard/drcard";
import CustomButton from "../../components/CustomButton/custom-button";
import Content1 from "../../components/subcriptionContent/content1";
import Content2 from "../../components/subcriptionContent/content2";
import Content3 from "../../components/subcriptionContent/content3";
import CustomModal from "../../components/CustomModal/custom-modal";
// import SingleLineGridList from "./Crousal";
import "./drdetailscard.scss";
import dotLogo from "../../static/images/dotIcon.png";
import personIcon from "../../static/images/person.png";
import messageIcon from "../../static/images/message.png";
import starIcon from "../../static/images/star.png";
import bagIcon from "../../static/images/bag.png";
import DrImage from "../../constants/DrImages/drProfileImage.png";
import ContainerOne from "./ContainerOne";
import ContainerTwo from "./ContainerTwo";

const ContainerThree = () => {
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
        drname: {
            color: "#313033",
            fontFamily: "Poppins",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "900",
            lineHeight: "30px",
        },
        specialist: {
            fontFamily: "Poppins",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "24px",
        },
        cardContainer: {
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-between",
        },
        BookAppointmentContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        BookAppointmentContainerDetails: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
        },
        fourthContainer: {
            width: "100%",
            border: "1px solid #E6E1E5 ",
            display: "flex",
            borderRadius: "8px",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "1%",
        },
        textField: {
            fontFamily: "Poppins",
            fontSize: "30px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "30px",
            color: "#313033",
            padding: "2% 0 1% 1%",
        },
        fourthInnerContainer: {
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            padding: "1%",
        },
        logoDesign: {
            height: "70px",
            width: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50px",
            backgroundColor: "#FDEAED",
        },
        // universityFields : {
        //     display: "flex",
        //     flexDirection: "column",
        //     alignItems: "flex-start",
        // }
    });

    const DrDetailsCard = () => {
        const classes = useStyles();
        const navigate = useNavigate();
        console.log(data);
        const handleOpen = (condition) => {
            // setOpenDialog(condition);
        };
    };

    return (
        <Box sx={{ width: "100%", display: "flex", marginTop: "5%" }}>
            {/* About me container */}
            <Box
                sx={{
                    width: "50%",
                    height: "355px",
                    borderRadius: "8px",
                    marginRight: "1%",
                    border: "1px solid #E6E1E5",
                    textAlign: "left",
                    padding: "2%",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "25px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "30px",
                        padding: "1%",
                    }}
                    component={"h2"}
                >
                    About Me
                </Typography>
                <Typography component={"h3"}>
                    There are many variations of passages of Lorem Ipsum available, but the majority
                    have suffered alteration in some form, by injected humour, or randomised words
                    which dont look even slightly believable. If you are going to use a passage of
                    Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the
                    middle of text.{" "}
                </Typography>
            </Box>

            {/* Reviews container */}
            <Box
                sx={{
                    width: "50%",
                    height: "355px",
                    borderRadius: "8px",
                    marginLeft: "1%",
                    border: "1px solid #E6E1E5",
                    padding: "2%",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography component={"h2"} sx={{ padding: "1%" }}>
                        Reviews
                    </Typography>
                    <Link
                        style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "#E72B4A",
                            padding: "1%",
                        }}
                    >
                        View All
                    </Link>
                </Box>

                <Box
                    sx={{
                        margin: "2% 1% 1% 1%",
                        width: "98%",
                        borderBottom: "1px solid #E6E1E5",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex" }}>
                            <Box component={"img"} alt="image" src={DrExp[0].logo}></Box>
                            <Typography
                                sx={{
                                    marginLeft: "10%",
                                    fontFamily: "Poppins",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "24px",
                                }}
                            >
                                Emma
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>Rating</Typography>
                        </Box>
                    </Box>
                    <Typography
                        sx={{
                            textAlign: "left",
                            marginTop: "2%",
                            fontFamily: "Poppins",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "21px" /* 150% */,
                            letterSpacing: "0.07px",
                            color: "#939094",
                        }}
                    >
                        There are many variations of passages of Lorem Ipsum available, but the
                        majority have suffered alteration in some form,
                    </Typography>
                </Box>

                <Box
                    sx={{
                        margin: "2% 1% 1% 1%",
                        width: "98%",
                        borderBottom: "1px solid #E6E1E5",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex" }}>
                            <Box component={"img"} alt="image" src={DrExp[0].logo}></Box>
                            <Typography
                                sx={{
                                    marginLeft: "10%",
                                    fontFamily: "Poppins",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "24px",
                                }}
                            >
                                Emma
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>Rating</Typography>
                        </Box>
                    </Box>
                    <Typography
                        sx={{
                            textAlign: "left",
                            marginTop: "2%",
                            fontFamily: "Poppins",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "21px" /* 150% */,
                            letterSpacing: "0.07px",
                            color: "#939094",
                        }}
                    >
                        There are many variations of passages of Lorem Ipsum available, but the
                        majority have suffered alteration in some form,
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ContainerThree;
