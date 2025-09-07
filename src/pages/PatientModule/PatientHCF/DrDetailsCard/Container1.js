import { Box, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "../drdetailscard.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton/custom-button";
import dotLogo from "../../../../constants/DrImages/dot.svg";
import image from "../../../../constants/DrImages/image 27.png"

const Container1 = ({ profile_picture, company_name, business_name, service_day_from, service_day_to }) => {
    console.log(Fname, Mname, Lname, Qualification);
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
        // BookAppointmentContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        // },
        // BookAppointmentContainerDetails: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
        // },
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
    const [openDialog, setOpenDialog] = useState(false);
    const [openPatientDetails, setPatientDetails] = useState(false);
    const dropdownItems = ["item1", "item2", "item3"];
    const [activeDropdown, setActiveDropdown] = useState("");
    const [ageDropDown, setAgeDropDown] = useState();
    const radioValues = ["My self"];
    const [radioVal, setRadioVal] = useState(radioValues[0]);
    const [activeFabDropdown, setActiveFabDropdown] = useState(dropdownItems[0]);

    const [DateValue, setDataValue] = useState(null);

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%" }}>
            {/* Button Container */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <CustomButton
                    label="Back"
                    isTransaprent={true}
                    leftIcon={<ChevronLeftIcon />}
                    buttonCss={{ border: "none" }}
                    handleClick={() => navigate("/patientdashboard/dashboard/explore")}
                ></CustomButton>
                <Box>
                    <Box component={"img"} src={dotLogo} alt="Dot logo..."></Box>
                </Box>
            </Box>

            {/* card and working time container  */}
            <Box className={classes.cardContainer}>
                {/* Doctor Card */}
                <Box sx={{ display: "flex", marginTop: "1%", width: "70%" }}>
                    {/* Dr image */}
                    <Box sx={{ width: "213px", height: "184px" }}>
                        <Box
                            component={"img"}
                            src={profile_picture}
                            sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px",
                                padding: "2%",
                            }}
                        />
                    </Box>
                    {/* Dr Details */}
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            padding: "2%",
                        }}
                    >
                        <Box>
                            <Typography
                                className={classes.drname}
                                component={"h2"}
                                sx={{
                                    color: "#313033",
                                    fontFamily: "Poppins",
                                    fontSize: "20px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "30px",
                                }}
                            >
                                {business_name}
                            </Typography>
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "24px",
                                    color: "#AEAAAE",
                                }}
                            >
                                {/* {data[0].specialist} */}
                                {company_name}
                            </Typography>
                            <Typography
                                component={"h3"}
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "24px",
                                    color: "#AEAAAE",
                                }}
                            >
                                {/* {data[0].hospital} */}
                                Hospital
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Working time container */}
                <Box className={classes.BookAppointmentContainer} sx={{marginTop:"70px"}}>
                    <Box className={classes.BookAppointmentContainerDetails}>
                        <Typography
                            component={"h2"}
                            sx={{
                                color: "#313033",
                                fontFamily: "Poppins",
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "30px",
                            }}
                        >
                            Working Time
                        </Typography>

                        <Typography
                            component={"h3"}
                            sx={{
                                fontFamily: "Poppins",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "24px",
                                color: "#AEAAAE",
                            }}
                        >
                            {service_day_from}-{service_day_to}
                        </Typography>
                        {/* <CustomButton
                                    component={"h3"}
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "24px",
                                        color: "#AEAAAE",
                                    }}
                                    label="Book Appointment"
                                ></CustomButton>
                        <Box sx={{width : "100%" , display : "flex" , justifyContent : "flex-end" , alignItems : "center"}} >
                                    <BookAppointmentModal/>
                                </Box> */}
                       
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

Container1.propTypes = {
    Fname: PropTypes.string.isRequired,
    Mname: PropTypes.string.isRequired,
    Lname: PropTypes.string.isRequired,
    Qualification: PropTypes.string.isRequired,
};

export default Container1;
