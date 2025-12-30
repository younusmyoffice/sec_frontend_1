import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import "./drdetailscard.scss";
import personIcon from "../../static/images/person.png";
import messageIcon from "../../static/images/message.png";
import SchoolIcon from "@mui/icons-material/School"
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";


/**
 * ContainerFour Component
 * 
 * Displays doctor's professional qualifications:
 * - Education details (University, Qualification, Year)
 * - Licenses & Certifications
 * - Honors & Awards
 * - Work Experience
 * 
 * Shows multiple cards for each category
 * 
 * @param {Object} props - Component props
 * @param {string} props.Qualification - Doctor's qualification degree
 * @param {string} props.University - University name
 * @param {string} props.YearOfQualification - Year of qualification
 * @param {Array} props.doctorLicense - Array of licenses
 * @param {Array} props.doctorAward - Array of awards
 * @param {Array} props.doctorExperience - Array of work experience
 * 
 * @component
 */
const ContainerFour = ({
    Qualification,
    University,
    YearOfQualification,
    doctorLicense,
    doctorAward,
    doctorExperience,
}) => {
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
                    <Box
                        sx={{
                            width: "150px",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#F0F0F0",
                        }}
                    >
                        <SchoolIcon
                            style={{
                                fontSize: "30px",
                                width: "100px",
                                height: "100px",
                                color: "#E72B4A",
                            }}
                        />
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
                                {University || "NA"}
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
                                Graduation in specialization-Degree : {Qualification || "NA"}
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
                                {YearOfQualification || "NA"}
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
                {(doctorLicense || []).map((license, index) => (
                    <Box key={index} className={classes.fourthInnerContainer}>
                        {/* Image container */}
                        <Box
                        sx={{
                            width: "150px",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#F0F0F0",
                        }}
                    >
                        <CardMembershipIcon
                            style={{
                                fontSize: "30px",
                                width: "100px",
                                height: "100px",
                                color: "#E72B4A",
                            }}
                        />
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
                                    {license.lic_title || "NA"}
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
                                    {license.lic_issuedby || "NA"}
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
                                    Issue Date: {license.lic_date || "NA"}
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
                                    Certificate ID: {license.lic_certificate_no || "NA"}
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
                                    Description: {license.lic_description || "NA"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
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
                {(doctorAward || []).map((award, index) => (
                    <Box key={index} className={classes.fourthInnerContainer}>
                        {/* Image container */}
                        <Box
                        sx={{
                            width: "150px",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#F0F0F0",
                        }}
                    >
                        <EmojiEventsIcon
                            style={{
                                fontSize: "30px",
                                width: "100px",
                                height: "100px",
                                color: "#E72B4A",
                            }}
                        />
                    </Box>
                        {/* Details Fields */}
                        <Box sx={{ width: "100%" }}>
                            <Box
                                className={classes.universityFields}
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
                                    {award.award_title || "NA"}
                                </Typography>
                                <Typography
                                    component={"h3"}
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "28px",
                                    }}
                                >
                                    Issuing Authority: {award.award_issuedby || "NA"}
                                </Typography>
                                <Typography
                                    component={"h3"}
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "21px",
                                        letterSpacing: "0.07px",
                                        color: "#939094",
                                    }}
                                >
                                    Issue Date: {award.award_date || "NA"}
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
                                        lineHeight: "21px",
                                        letterSpacing: "0.07px",
                                        color: "#939094",
                                    }}
                                >
                                    Description: {award.award_description || "NA"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
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
                    Work Experience
                </Typography>
                {(doctorExperience || []).map((experience, index) => (
                    <Box key={index} className={classes.fourthInnerContainer}>
                        
                            {/* Icon */}
                            <Box
                        sx={{
                            width: "150px",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#F0F0F0",
                        }}
                    >
                        <BusinessCenterIcon
                            style={{
                                fontSize: "30px",
                                width: "100px",
                                height: "100px",
                                color: "#E72B4A",
                            }}
                        />
                    </Box>
                            {/* Details Fields */}
                            <Box sx={{ width: "100%" }}>
                                <Box
                                    className={classes.universityFields}
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
                                        {experience.job || "NA"}
                                    </Typography>
                                    <Typography
                                        component={"h3"}
                                        sx={{
                                            fontFamily: "Poppins",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            lineHeight: "21px",
                                            letterSpacing: "0.07px",
                                            color: "#939094",
                                        }}
                                    >
                                        {experience.organisation || "NA"}
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
                                            lineHeight: "21px",
                                            letterSpacing: "0.07px",
                                            color: "#939094",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {experience.from_date || "NA"}/{experience.to_date || "Present"}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                ))}
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
