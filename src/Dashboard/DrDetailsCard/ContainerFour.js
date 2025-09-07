import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
// import SingleLineGridList from "./Crousal";
import "./drdetailscard.scss";
import personIcon from "../../static/images/person.png";
import messageIcon from "../../static/images/message.png";
import starIcon from "../../static/images/star.png";
import bagIcon from "../../static/images/bag.png";

const ContainerFour = ({
    Qualification,
    RegDate,
    Description,
    StateReg,
    CountryReg,
    University,
    DepartmentName,
    Gender,
}) => {
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

    const classes = useStyles();
    // const navigate = useNavigate();
    // console.log(data);
    // const handleOpen = (condition) => {
    //     setOpenDialog(condition);
    // };

    return (
        <>
            <Box className={classes.fourthContainer}>
                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "30px",
                    }}
                    className={classes.textField}
                >
                    Education
                </Typography>
                <Box className={classes.fourthInnerContainer}>
                    {/* Image container */}
                    <Box sx={{ width: "fit-content" }}>
                        <Box className={classes.logoDesign}>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    color: "#E72B4A",
                                    borderRadius: "50px",
                                }}
                            >
                                M
                            </Typography>
                        </Box>
                    </Box>
                    {/* Details Fields */}
                    <Box sx={{ width: "100%" }}>
                        <Box
                            classes={classes.universityFields}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "1%",
                                width: "100%",
                            }}
                        >
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "28px",
                                }}
                            >
                                {University}
                                {/* University Name */}
                            </Typography>
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "21px" /* 150% */,
                                    letterSpacing: "0.07px",
                                    color: "#939094",
                                }}
                            >
                                Graduation in specialization-Degree : {Qualification}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                paddingLeft: "1%",
                                marginTop: "1.5%",
                            }}
                        >
                            <Typography></Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "18px" /* 150% */,
                                    letterSpacing: "0.096px",
                                }}
                            >
                                2020
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* 4th container 2nd card  */}
            <Box className={classes.fourthContainer}>
                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "30px",
                    }}
                    className={classes.textField}
                >
                    Licenses & Certifications
                </Typography>
                <Box className={classes.fourthInnerContainer}>
                    {/* Image container */}
                    <Box sx={{ width: "fit-content" }}>
                        <Box className={classes.logoDesign}>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    color: "#E72B4A",
                                    borderRadius: "50px",
                                }}
                            >
                                M
                            </Typography>
                        </Box>
                    </Box>
                    {/* Details Fields */}
                    <Box sx={{ width: "100%" }}>
                        <Box
                            classes={classes.universityFields}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "1%",
                                width: "100%",
                            }}
                        >
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "28px",
                                }}
                            >
                                Medical Practitioner Certificate
                            </Typography>
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "21px" /* 150% */,
                                    letterSpacing: "0.07px",
                                    color: "#939094",
                                }}
                            >
                                Issuing Authority
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "1%",
                                marginTop: "1.5%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "21px" /* 150% */,
                                    letterSpacing: "0.07px",
                                    color: "#939094",
                                }}
                            >
                                Issue Date : {RegDate}
                                {/* Issue Date : May 2016 */}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "21px" /* 150% */,
                                    letterSpacing: "0.07px",
                                    color: "#939094",
                                }}
                            >
                                {" "}
                                Certificate ID : {CountryReg}
                                {/* Certificate ID : UTEYBZ09 */}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* 4th container 3rd */}
            <Box className={classes.fourthContainer}>
                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "30px",
                    }}
                    className={classes.textField}
                >
                    Honors & Awards
                </Typography>
                <Box className={classes.fourthInnerContainer}>
                    {/* Image container */}
                    <Box sx={{ width: "fit-content" }}>
                        <Box className={classes.logoDesign}>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    color: "#E72B4A",
                                    borderRadius: "50px",
                                }}
                            >
                                M
                            </Typography>
                        </Box>
                    </Box>
                    {/* Details Fields */}
                    <Box sx={{ width: "100%" }}>
                        <Box
                            classes={classes.universityFields}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "1%",
                                width: "100%",
                            }}
                        >
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "28px",
                                }}
                            >
                                Issuing Authority
                            </Typography>
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "21px" /* 150% */,
                                    letterSpacing: "0.07px",
                                    color: "#939094",
                                }}
                            >
                                Issue Date : May 2016
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                paddingLeft: "1%",
                                marginTop: "1.5%",
                            }}
                        >
                            <Typography></Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "21px" /* 150% */,
                                    letterSpacing: "0.07px",
                                    color: "#939094",
                                }}
                            >
                                Description :{" "}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* 4th container 4th card */}
            <Box className={classes.fourthContainer}>
                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "30px",
                    }}
                    className={classes.textField}
                >
                    Associations
                </Typography>
                <Box className={classes.fourthInnerContainer}>
                    {/* Details Fields */}
                    <Box sx={{ width: "100%" }}>
                        <Box
                            classes={classes.universityFields}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "1%",
                                width: "100%",
                            }}
                        >
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "28px",
                                }}
                            >
                                Association Name
                            </Typography>
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "21px" /* 150% */,
                                    letterSpacing: "0.07px",
                                    color: "#939094",
                                }}
                            >
                                Rank
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                paddingLeft: "1%",
                                marginTop: "1.5%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "21px" /* 150% */,
                                    letterSpacing: "0.07px",
                                    color: "#939094",
                                    marginRight: "1%",
                                }}
                            >
                                Description :{" "}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "21px" /* 150% */,
                                    letterSpacing: "0.07px",
                                    color: "#939094",
                                    textAlign: "start",
                                }}
                            >
                                {" "}
                                sadf asdf asdf sadf asdf asd fasm fsajdfs dfasd f asdf as df
                                asdfasdf asd fas df asdf asdf as dfas dfas df as df asd fasd f asd f
                                asdf a sdf asd fas df asdf asdf asdf asdf as dfa sdf asdf as dfas df
                                sadf as dfasd f asdf asdf asdf as dfas df asdf asd fas dfma wer tgm
                                gk gke gka rgk akgf akjw gfkja gkaje gfkajw gfka wegfka wgkj akgj
                                akj gfakjg akjwe gfkjae efgkaj egfka gkj awekjg akjs gfkajw sgkjae
                                fkjea gkja gkja egkj aewskjg aewskjgaekw g
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

ContainerFour.propTypes = {
    RegDate: PropTypes.string.isRequired,
    Qualification: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    StateReg: PropTypes.string.isRequired,
    CountryReg: PropTypes.string.isRequired,
    University: PropTypes.string.isRequired,
    DepartmentName: PropTypes.string.isRequired,
    Gender: PropTypes.string.isRequired,
};

export default ContainerFour;
