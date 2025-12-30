/**
 * HCFDoctorDetailContainerFour Component
 * 
 * Displays doctor qualifications and credentials:
 * - Education (University, Qualification, Year)
 * - Licenses & Certifications
 * - Honors & Awards
 * - Work Experience
 * 
 * Features:
 * - Multiple credential sections
 * - Icon-based visual representation
 * - Handles empty states gracefully
 * 
 * @component
 */

import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import "./drdetailscard.scss";
import SchoolIcon from "@mui/icons-material/School";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import logger from "../../../../utils/logger"; // Centralized logging

/**
 * ContainerFour Component - Doctor Credentials Display
 * 
 * Displays comprehensive doctor credentials including:
 * - Education (University, Qualification, Year)
 * - Licenses & Certifications
 * - Honors & Awards
 * - Work Experience
 * 
 * Security:
 * - No API calls, pure display component
 * - Validates array inputs before rendering
 * 
 * Error Handling:
 * - Handles empty arrays gracefully
 * - Shows empty state messages when no data available
 * - Uses fallback "NA" for missing text values
 * 
 * @param {string} Qualification - Doctor's qualification/degree
 * @param {string} University - University name
 * @param {string|number} YearOfQualification - Year of graduation
 * @param {string} RegDate - Registration date (currently unused, reserved for future use)
 * @param {string} StateReg - State registration number (currently unused, reserved for future use)
 * @param {string} CountryReg - Country registration number (currently unused, reserved for future use)
 * @param {Array} doctorLicense - Array of license objects
 * @param {string} doctorLicense[].lic_title - License title
 * @param {string} doctorLicense[].lic_issuedby - Issuing authority
 * @param {string} doctorLicense[].lic_date - Issue date
 * @param {string} doctorLicense[].lic_certificate_no - Certificate number
 * @param {string} doctorLicense[].lic_description - License description
 * @param {Array} doctorAward - Array of award objects
 * @param {string} doctorAward[].award_title - Award title
 * @param {string} doctorAward[].award_issuedby - Issuing authority
 * @param {string} doctorAward[].award_date - Issue date
 * @param {string} doctorAward[].award_description - Award description
 * @param {Array} doctorExperience - Array of experience objects
 * @param {string} doctorExperience[].job - Job title
 * @param {string} doctorExperience[].organisation - Organization name
 * @param {string} doctorExperience[].from_date - Start date
 * @param {string} doctorExperience[].to_date - End date (or "Present")
 */
const ContainerFour = ({
    Qualification = "",
    University = "",
    YearOfQualification = "",
    RegDate = "", // Registration date - currently unused, reserved for future use
    StateReg = "", // State registration number - currently unused, reserved for future use
    CountryReg = "", // Country registration number - currently unused, reserved for future use
    doctorLicense = [],
    doctorAward = [],
    doctorExperience = [],
}) => {
    logger.debug("🔵 HCFDoctorDetailContainerFour component rendering", {
        hasQualification: !!Qualification,
        hasUniversity: !!University,
        hasYearOfQualification: !!YearOfQualification,
        hasRegDate: !!RegDate,
        hasStateReg: !!StateReg,
        hasCountryReg: !!CountryReg,
        licensesCount: doctorLicense?.length || 0,
        awardsCount: doctorAward?.length || 0,
        experienceCount: doctorExperience?.length || 0
    });
    
    /**
     * Validate arrays to ensure they are actually arrays before mapping
     * Prevents runtime errors if invalid data is passed
     */
    const validatedLicenses = Array.isArray(doctorLicense) ? doctorLicense : [];
    const validatedAwards = Array.isArray(doctorAward) ? doctorAward : [];
    const validatedExperience = Array.isArray(doctorExperience) ? doctorExperience : [];
    
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

    return (
        <>
            {/* Education Section */}
            <Box className={classes.fourthContainer}>
                {/* Section Title */}
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
                    {/* Education Icon Container */}
                    <Box
                        sx={{
                            width: "150px",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#F0F0F0", // Background color - should use SCSS variable
                        }}
                    >
                        <SchoolIcon
                            style={{
                                fontSize: "30px",
                                width: "100px",
                                height: "100px",
                                color: "#E72B4A", // Primary brand color - should use SCSS variable
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

            {/* Licenses & Certifications Section */}
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
                {/* Display licenses if available, otherwise show empty state */}
                {validatedLicenses.length > 0 ? (
                    validatedLicenses.map((license, index) => (
                        <Box key={index} className={classes.fourthInnerContainer}>
                            {/* License Icon Container */}
                            <Box
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    backgroundColor: "#F0F0F0", // Background color - should use SCSS variable
                                }}
                            >
                                <CardMembershipIcon
                                    style={{
                                        fontSize: "30px",
                                        width: "100px",
                                        height: "100px",
                                        color: "#E72B4A", // Primary brand color - should use SCSS variable
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
                ))
                ) : (
                    <Typography sx={{ padding: "2%", color: "#939094" }}>
                        No licenses or certifications available.
                    </Typography>
                )}
            </Box>

            {/* Honors & Awards Section */}
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
                {/* Display awards if available, otherwise show empty state */}
                {validatedAwards.length > 0 ? (
                    validatedAwards.map((award, index) => (
                        <Box key={index} className={classes.fourthInnerContainer}>
                            {/* Award Icon Container */}
                            <Box
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    backgroundColor: "#F0F0F0", // Background color - should use SCSS variable
                                }}
                            >
                                <EmojiEventsIcon
                                    style={{
                                        fontSize: "30px",
                                        width: "100px",
                                        height: "100px",
                                        color: "#E72B4A", // Primary brand color - should use SCSS variable
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
                ))
                ) : (
                    <Typography sx={{ padding: "2%", color: "#939094" }}>
                        No honors or awards available.
                    </Typography>
                )}
            </Box>

            {/* Work Experience Section */}
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
                {/* Display work experience if available, otherwise show empty state */}
                {validatedExperience.length > 0 ? (
                    validatedExperience.map((experience, index) => (
                        <Box key={index} className={classes.fourthInnerContainer}>
                            {/* Experience Icon Container */}
                            <Box
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    backgroundColor: "#F0F0F0", // Background color - should use SCSS variable
                                }}
                            >
                                <BusinessCenterIcon
                                    style={{
                                        fontSize: "30px",
                                        width: "100px",
                                        height: "100px",
                                        color: "#E72B4A", // Primary brand color - should use SCSS variable
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
                    ))
                ) : (
                    <Typography sx={{ padding: "2%", color: "#939094" }}>
                        No work experience available.
                    </Typography>
                )}
            </Box>
        </>
    );
};

// PropTypes for component documentation and type checking
ContainerFour.propTypes = {
    Qualification: PropTypes.string, // Doctor's qualification/degree
    University: PropTypes.string, // University name
    YearOfQualification: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Year of graduation
    RegDate: PropTypes.string, // Registration date (currently unused, reserved for future use)
    StateReg: PropTypes.string, // State registration number (currently unused, reserved for future use)
    CountryReg: PropTypes.string, // Country registration number (currently unused, reserved for future use)
    doctorLicense: PropTypes.arrayOf(PropTypes.shape({
        lic_title: PropTypes.string,
        lic_issuedby: PropTypes.string,
        lic_date: PropTypes.string,
        lic_certificate_no: PropTypes.string,
        lic_description: PropTypes.string,
    })), // Array of license objects
    doctorAward: PropTypes.arrayOf(PropTypes.shape({
        award_title: PropTypes.string,
        award_issuedby: PropTypes.string,
        award_date: PropTypes.string,
        award_description: PropTypes.string,
    })), // Array of award objects
    doctorExperience: PropTypes.arrayOf(PropTypes.shape({
        job: PropTypes.string,
        organisation: PropTypes.string,
        from_date: PropTypes.string,
        to_date: PropTypes.string,
    })), // Array of experience objects
};

// Default props
ContainerFour.defaultProps = {
    Qualification: "",
    University: "",
    YearOfQualification: "",
    RegDate: "",
    StateReg: "",
    CountryReg: "",
    doctorLicense: [],
    doctorAward: [],
    doctorExperience: [],
};

export default ContainerFour;
