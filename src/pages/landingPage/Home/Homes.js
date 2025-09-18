import React, { useState } from "react";
import ImageLogo from "../../../static/images/logo.png";
import { Box, Button, Typography, Grid } from "@mui/material";
// import BurgerImage from "../../static/images/DrImages/Glyph_ undefined.png";
import "./Home.scss";
import FirstImage from "../../../static/images/HomeImages/rectangle11.png";
import FirstStepImage from "../../../static/images/HomeImages/Step1.png";
import SecondStepImage from "../../../static/images/HomeImages/Step2.png";
import ThirdStepImage from "../../../static/images/HomeImages/Step3.png";
import SecondRowImage from "../../../static/images/HomeImages/manydoctors.png";
import LastImage from "../../../static/images/HomeImages/lastcontent.png";
import ThirdImage from "../../../static/images/HomeImages/thirdcontent.png";
import CustomButton from "../../../components/CustomButton/custom-button";
import whiteframe from "../../../static/images/HomeImages/whiteFrame.png";
import AllDoctors from "../../../static/images/HomeImages/Alldoctors.png";
import { LinkedIn } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import { Facebook } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../static/images/icon.png";
import { left } from "@popperjs/core";

const Homes = () => {
    const navigate = useNavigate();
    const [showBurger, setShowBurgerMenu] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/selectRoleLogin");
    };

    function toggleMenu() {
        setShowBurgerMenu(!showBurger);
        const menu = document.querySelector(".other-header-content");
        menu.classList.toggle("show");
        showBurger ? (menu.display = "none") : (menu.display = "block");
    }

    return (
        <>
            <div className="screen-cntr1">
                <div className="header-container1">
                    <Box component={"img"} src={ImageLogo}></Box>
                    <div className="burger-menu" onClick={toggleMenu}>
                        <img src={logo} alt="logo..." />
                    </div>

                    <div className="other-header-content">
                        <Link to={"/howitworks"} style={{ textDecoration: "none" }}>
                            <Typography
                                style={{
                                    color: "#373737",
                                    fontFamily: "Poppins",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "36px",
                                }}
                            >
                                How it works?
                            </Typography>
                        </Link>
                        <Link to={"/aboutlanding"} style={{ textDecoration: "none" }}>
                            <Typography
                                style={{
                                    color: "#373737",
                                    fontFamily: "Poppins",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "36px",
                                }}
                            >
                                About Us
                            </Typography>
                        </Link>
                        <Typography
                            style={{
                                color: "#373737",
                                fontFamily: "Poppins",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "36px",
                            }}
                        >
                            Pricing
                        </Typography>
                        <CustomButton
                            label="Sign Up"
                            buttonCss={{ width: "170px", height: "38px", borderRadius: "20px" }}
                            isTransaprent={"True"}
                            handleClick={() => {
                                navigate("/selectRoleSignup");
                            }}
                        ></CustomButton>
                        <CustomButton
                            label="Login"
                            buttonCss={{ width: "170px", height: "38px", borderRadius: "20px" }}
                            handleClick={handleSubmit}
                        ></CustomButton>

                        <div className="burger-menu" onClick={toggleMenu}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                </div>

                <Box className="first-row-content">
                    <Box className="title-heading">
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "playfair Display",
                                fontSize: "1.5em",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "62px",
                                textAlign: "center",
                                marginTop: "2%",
                            }}
                            className="EcareText"
                        >
                            Find Specialist Doctor<br></br>
                            For Your Every Need At<br></br>
                            Remote Doctors Online
                        </Typography>

                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                textAlign: "center",
                                width: "auto",
                                fontStyle: "normal",
                            }}
                        >
                            We can find the doctors for you and book your appointment with easy
                            <br />
                            care click process.
                        </Typography>
                        <Box className="MainEcareBtn">
                            <CustomButton
                                label="Book Your Appointments"
                                className={"EcareBtn"}
                                // buttonCss={{width: "100%", height: "0auto", margin:"10px"}}
                            ></CustomButton>
                        </Box>
                    </Box>

                    <Box
                        component={"img"}
                        className="imgEcare "
                        src={FirstImage}
                        sx={{ width: "50%" }}
                    ></Box>
                </Box>

                <Box className="steps-title">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "playfair Display",
                            textAlign: "center",
                            fontSize: "30px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "46px",
                        }}
                        className="stepstitle"
                    >
                        Three Easy Steps To<br></br>
                        Find Your doctor
                    </Typography>
                </Box>

                <Grid container spacing={3} style={{ padding: "20px" }}>
                    {/* Step 1 */}
                    <Grid item xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
                        <Box
                            component="img"
                            src={FirstStepImage}
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Playfair Display",
                                fontStyle: "normal",
                                marginTop: "10px",
                            }}
                        >
                            Search Doctor
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontStyle: "normal",
                                marginTop: "10px",
                            }}
                        >
                            Lorem ipsum dolor sit amet,
                            <br />
                            consectetur adipiscing elit, sed do
                            <br />
                            eiusmod tempor incididunt ut
                            <br />
                            labore.
                        </Typography>
                    </Grid>

                    {/* Step 2 */}
                    <Grid item xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
                        <Box
                            component="img"
                            src={SecondStepImage}
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Playfair Display",
                                fontStyle: "normal",
                                marginTop: "10px",
                            }}
                        >
                            Check Availability
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontStyle: "normal",
                                marginTop: "10px",
                            }}
                        >
                            Lorem ipsum dolor sit amet,
                            <br />
                            consectetur adipiscing elit, sed do
                            <br />
                            eiusmod tempor incididunt ut
                            <br />
                            labore.
                        </Typography>
                    </Grid>

                    {/* Step 3 */}
                    <Grid item xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
                        <Box
                            component="img"
                            src={ThirdStepImage}
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Playfair Display",
                                fontStyle: "normal",
                                marginTop: "10px",
                            }}
                        >
                            Book Your Appointments
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontStyle: "normal",
                                marginTop: "10px",
                            }}
                        >
                            Lorem ipsum dolor sit amet,
                            <br />
                            consectetur adipiscing elit, sed do
                            <br />
                            eiusmod tempor incididunt ut
                            <br />
                            labore.
                        </Typography>
                    </Grid>
                </Grid>
                {/* my grid end */}

                {/* <div className="second-row-content">
                    <Box component={"img"} className="secondrowimage" src={SecondRowImage}></Box>
                    <div className="second-side-content">
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "playfair Display",
                                textAlign: "center",
                                fontSize: "28px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "46px",
                            }}
                            className="text2"
                        >
                            Quality Health Starts<br></br>
                            With Quality Doctors
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                width: "auto",
                                fontStyle: "normal",
                                textAlign: "center",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing<br></br>
                            elit, sed do eiusmod tempor incididunt ut labore et<br></br>
                            dolore magna aliqua<br></br>
                            Ut enim ad minim veniam, quis nostrud exercitation
                        </Typography>
                        <CustomButton
                            label="Find Doctor "
                            buttonCss={{ width: "170px", height: "38px" }}
                        />
                    </div>
                </div> */}
                <Grid container spacing={2} alignItems="center" style={{ padding: "20px" }}>
                    <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                        <Box
                            component="img"
                            src={SecondRowImage}
                            alt="Second Row"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Playfair Display",
                                fontSize: "28px",
                                fontWeight: "500",
                                lineHeight: "46px",
                                textAlign: "center",
                            }}
                        >
                            Quality Health Starts
                            <br />
                            With Quality Doctors
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                marginTop: "16px",
                                textAlign: "center",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            <br />
                            elit, sed do eiusmod tempor incididunt ut labore et
                            <br />
                            dolore magna aliqua.
                            <br />
                            Ut enim ad minim veniam, quis nostrud exercitation.
                        </Typography>
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            <Button
                                variant="contained"
                                style={{
                                    width: "170px",
                                    height: "38px",
                                    backgroundColor: "",
                                    color: "#fff",
                                    textTransform: "none",
                                    fontFamily: "Red Hat Display",
                                }}
                            >
                                Find Doctor
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                {/* -------------------------------- */}
                {/* <div className="second-row-content">
                    <div className="second-side-content">
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "playfair Display",
                                textAlign: "center",
                                width: "auto",
                                fontStyle: "normal",
                            }}
                            className="text3"
                        >
                            Find your Desired Doctors <br></br>
                            Anytime,Anywhere!
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                width: "auto",
                                fontStyle: "normal",
                                textAlign: "center",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing<br></br>
                            elit, sed do eiusmod tempor incididunt ut labore et<br></br>
                            dolore magna aliqua<br></br>
                            Ut enim ad minim veniam, quis nostrud exercitation
                        </Typography>
                        <CustomButton
                            label="Find Doctor "
                            buttonCss={{ width: "170px", height: "38px" }}
                        />
                    </div>
                    <Box className="img3">
                        <Box
                            component={"img"}
                            style={{ width: "110%" }}
                            className="img3"
                            src={ThirdImage}
                        ></Box>
                    </Box>
                </div> */}
                {/* grid start */}
                <Grid container spacing={2} alignItems="center" style={{ padding: "20px" }}>
                    {/* Left Side - Content */}
                    <Grid item xs={12} md={6}>
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Playfair Display",
                                fontSize: "28px",
                                fontWeight: "500",
                                lineHeight: "46px",
                                textAlign: "center",
                            }}
                        >
                            Find your Desired Doctors <br />
                            Anytime, Anywhere!
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                marginTop: "16px",
                                textAlign: "center",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            <br />
                            elit, sed do eiusmod tempor incididunt ut labore et
                            <br />
                            dolore magna aliqua.
                            <br />
                            Ut enim ad minim veniam, quis nostrud exercitation.
                        </Typography>
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            <Button
                                variant="contained"
                                style={{
                                    width: "170px",
                                    height: "38px",
                                    backgroundColor: "",
                                    color: "#fff",
                                    textTransform: "none",
                                    fontFamily: "Red Hat Display",
                                }}
                            >
                                Find Doctor
                            </Button>
                        </div>
                    </Grid>

                    {/* Right Side - Image */}
                    <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                        <Box
                            component="img"
                            src={ThirdImage}
                            alt="Third Row"
                            style={{ width: "70%" }}
                        />
                    </Grid>
                </Grid>

                {/* grid end */}
                {/* --------------------------------------------- */}

                {/* <Box className="second-row-content">
                    <Box className="img4">
                        <Box
                            component={"img"}
                            style={{ width: "110%" }}
                            className="img4"
                            src={LastImage}
                        ></Box>
                    </Box>
                    <Box className="second-side-content">
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "playfair Display",
                                textAlign: "center",
                                width: "auto",
                                fontStyle: "normal",
                            }}
                            className="text4"
                        >
                            Book your Appointment<br></br>
                            With just click
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "27px",
                                textAlign: "center",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing<br></br>
                            elit, sed do eiusmod tempor incididunt ut labore et<br></br>
                            dolore magna aliqua<br></br>
                            Ut enim ad minim veniam, quis nostrud exercitation
                        </Typography>
                        <CustomButton
                            label="Book Appointment "
                            buttonCss={{
                                width: "200px",
                                height: "38px",
                                fontFamily: "poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "22px",
                            }}
                        />
                    </Box>
                </Box> */}
                {/* grid start */}
                {/* <Grid container spacing={3} alignItems="center">
                  

                    <Grid item xs={12} md={6} sm={6}>
                        <Box
                            component="img"
                            style={{ width: "80%" }}
                            className="img4"
                            src={LastImage}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} className="second-side-content">
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Playfair Display",
                                textAlign: "center",
                                fontStyle: "normal",
                            }}
                            className="text4"
                        >
                            Book your Appointment
                            <br />
                            With just a click
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "27px",
                                textAlign: "center",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            <br />
                            elit, sed do eiusmod tempor incididunt ut labore et
                            <br />
                            dolore magna aliqua
                            <br />
                            Ut enim ad minim veniam, quis nostrud exercitation
                        </Typography>
                        <CustomButton
                            label="Book Appointment"
                            buttonCss={{
                                width: "200px",
                                height: "38px",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "22px",
                            }}
                        />
                    </Grid>
                </Grid> */}
                {/* grid end */}
                {/* ----------------- */}

                <Box className="second-row-content">
                    <Grid container spacing={2} alignItems="center">
                        {/* Image Section */}
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                style={{ width: "70%", paddingLeft: "10%" }}
                                className="img4"
                                src={LastImage}
                            />
                        </Grid>
                        {/* Content Section */}
                        <Grid item xs={12} md={6}>
                            <Box className="second-side-content">
                                <Typography
                                    style={{
                                        color: "#313033",
                                        fontFamily: "Playfair Display",
                                        textAlign: "center",
                                        fontStyle: "normal",
                                    }}
                                    className="text4"
                                >
                                    Book your Appointment
                                    <br />
                                    With just a click
                                </Typography>
                                <Typography
                                    style={{
                                        color: "#525152",
                                        fontFamily: "Red Hat Display",
                                        fontSize: "18px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "27px",
                                        textAlign: "center",
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    <br />
                                    elit, sed do eiusmod tempor incididunt ut labore et
                                    <br />
                                    dolore magna aliqua
                                    <br />
                                    Ut enim ad minim veniam, quis nostrud exercitation
                                </Typography>
                                <CustomButton
                                    label="Book Appointment"
                                    buttonCss={{
                                        width: "200px",
                                        height: "38px",
                                        fontFamily: "Poppins",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        lineHeight: "22px",
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {/* <div className="About-content">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "playfair Display",
                            textAlign: "center",
                            width: "auto",
                            fontStyle: "normal",
                        }}
                        className="ac"
                    >
                        About Us
                    </Typography>
                </div>
                <div className="about-descript">
                    <Typography
                        style={{
                            color: "#525152",
                            fontFamily: "Red Hat Display",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "27px",
                            textAlign: "center",
                        }}
                        className="acdescr"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br></br>
                        eiusmod tempor incididunt ut labore .
                    </Typography>
                </div> */}

                <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                    className="About-content"
                >
                    {/* About Us Section */}
                    <Grid item xs={12} className="about-section">
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Playfair Display",
                                textAlign: "center",
                                fontStyle: "normal",
                                fontSize: "2em", // Adjusted for better prominence
                                fontWeight: "600",
                                marginTop: "10%",
                            }}
                            className="ac"
                        >
                            About Us
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "27px",
                                textAlign: "center",
                                marginTop: "16px", // Added spacing between the title and description
                            }}
                            className="acdescr"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            <br />
                            eiusmod tempor incididunt ut labore.
                        </Typography>
                    </Grid>
                </Grid>

                <div className="box-cont">
                    <Box
                        component={"img"}
                        src={AllDoctors}
                        style={{ width: "600px", height: "600px" }}
                    ></Box>
                    <div className="title-descr">
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Playfair Display",
                                width: "auto",
                                fontStyle: "normal",
                                textAlign: "center",
                            }}
                            className="td"
                        >
                            Welcome to our medical app,<br></br>
                            where your health is our priority!
                        </Typography>
                        <Typography
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                width: "auto",
                                fontStyle: "normal",
                                textAlign: "center",
                            }}
                            className="tdd"
                        >
                            Meet our exceptional team behind the innovative healthcare app <br></br>
                            that is revolutionizing the way you manage your health.<br></br>
                            Comprised of dedicated professionals from various fields, we are
                            <br></br>
                            united by a common goal: to provide you with the best possible<br></br>
                            care and support on your wellness journey.
                        </Typography>
                    </div>
                </div>


                <div className="red-footer">
                    <div className="first-ali">
                        <div className="first-half">
                            <Box
                                component={"img"}
                                src={whiteframe}
                                style={{ width: "245px", height: "42px" }}
                            ></Box>
                        </div>
                        <div className="half-align">
                            <Typography
                                style={{
                                    color: "#FFF",
                                    fontFamily: "Red Hat Display ",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "700",
                                    lineHeight: "24px",
                                    justifyContent: "center",
                                }}
                            >
                                Doctor Registration
                            </Typography>
                            <Typography
                                style={{
                                    color: "#FFF",
                                    fontFamily: "Red Hat Display ",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "700",
                                    lineHeight: "24px",
                                }}
                            >
                                How it Works?
                            </Typography>
                        </div>
                    </div>
                    <div className="hcf-pr">
                        <Typography
                            style={{
                                color: "#FFF",
                                fontFamily: "Red Hat Display ",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "24px",
                            }}
                        >
                            HCF Registration
                        </Typography>
                        <Typography
                            style={{
                                color: "#FFF",
                                fontFamily: "Red Hat Display ",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "24px",
                            }}
                        >
                            Pricing
                        </Typography>
                    </div>

                    <div className="about-us">
                        <Typography
                            style={{
                                color: "#FFF",
                                fontFamily: "Red Hat Display ",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "24px",
                            }}
                        >
                            About Us
                        </Typography>
                    </div>
                    <div className="social-icons">
                        <LinkedIn style={{ color: "white" }} />
                        <Twitter style={{ color: "white" }} />
                        <Instagram style={{ color: "white" }} />
                        <Facebook style={{ color: "white" }} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Homes;
