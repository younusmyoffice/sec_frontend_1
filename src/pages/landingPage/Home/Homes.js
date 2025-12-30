import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Container, Button, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LinkedIn, Twitter, Instagram, Facebook } from "@mui/icons-material";
import ImageLogo from "../../../static/images/logo.png";
import FirstImage from "../../../static/images/HomeImages/rectangle11.png";
import FirstStepImage from "../../../static/images/HomeImages/Step1.png";
import SecondStepImage from "../../../static/images/HomeImages/Step2.png";
import ThirdStepImage from "../../../static/images/HomeImages/Step3.png";
import SecondRowImage from "../../../static/images/HomeImages/manydoctors.png";
import ThirdImage from "../../../static/images/HomeImages/thirdcontent.png";
import LastImage from "../../../static/images/HomeImages/lastcontent.png";
import AllDoctors from "../../../static/images/HomeImages/Alldoctors.png";
import whiteframe from "../../../static/images/HomeImages/whiteFrame.png";
import CustomButton from "../../../components/CustomButton/custom-button";
import "./Home.scss";

const Homes = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSignUp = () => {
        navigate("/selectRoleSignup");
    };

    const handleLogin = () => {
        navigate("/selectRoleLogin");
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    const steps = [
        {
            icon: <SearchIcon sx={{ fontSize: 48, color: "#E72B4A" }} />,
            title: "Search Doctor",
            description: "Browse through our extensive network of qualified healthcare professionals. Filter by specialty, location, and availability to find the perfect match for your needs.",
        },
        {
            icon: <CheckCircleIcon sx={{ fontSize: 48, color: "#E72B4A" }} />,
            title: "Check Availability",
            description: "View real-time availability and schedule your appointment at your convenience. Choose from in-person visits or virtual consultations.",
        },
        {
            icon: <CalendarTodayIcon sx={{ fontSize: 48, color: "#E72B4A" }} />,
            title: "Book Your Appointment",
            description: "Complete your booking with just a few clicks. Receive instant confirmation and reminders to ensure you never miss an appointment.",
        },
    ];

    const features = [
        {
            title: "Quality Health Starts With Quality Doctors",
            description: "Our platform connects you with board-certified healthcare professionals who are committed to providing exceptional care. Every doctor in our network undergoes rigorous verification to ensure the highest standards.",
            image: SecondRowImage,
            reverse: false,
        },
        {
            title: "Find Your Desired Doctors Anytime, Anywhere!",
            description: "Access healthcare services 24/7 from the comfort of your home. Our telemedicine platform makes it easy to connect with doctors whenever you need them, regardless of your location.",
            image: ThirdImage,
            reverse: true,
        },
        {
            title: "Book Your Appointment With Just a Click",
            description: "Streamline your healthcare journey with our intuitive booking system. No more long waiting times or complicated processes. Get the care you need, when you need it.",
            image: LastImage,
            reverse: false,
        },
    ];

    return (
        <Box className="landing-page">
            {/* Header */}
            <Box className="landing-header">
                <Container maxWidth="xl">
                    <Box className="header-content">
                        <Link to="/" className="logo-link">
                            <Box component="img" src={ImageLogo} alt="Share e Care" className="logo-img" />
                        </Link>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <Box className="desktop-nav">
                                <Link to="/howItWorks" className="nav-link">
                                    <Typography variant="body1" className="nav-text">
                                        How it Works
                                    </Typography>
                                </Link>
                                <Link to="/aboutLanding" className="nav-link">
                                    <Typography variant="body1" className="nav-text">
                                        About Us
                                    </Typography>
                                </Link>
                                <Typography variant="body1" className="nav-text">
                                    Pricing
                                </Typography>
                                <Button
                                    variant="outlined"
                                    className="header-btn outlined-btn"
                                    onClick={handleSignUp}
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    variant="contained"
                                    className="header-btn contained-btn"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Box>
                        )}

                        {/* Mobile Menu Button */}
                        {isMobile && (
                            <IconButton
                                className="mobile-menu-btn"
                                onClick={toggleMobileMenu}
                                aria-label="menu"
                            >
                                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        )}
                    </Box>

                    {/* Mobile Menu */}
                    {isMobile && mobileMenuOpen && (
                        <Box className="mobile-menu">
                            <Link to="/howItWorks" className="mobile-nav-link" onClick={toggleMobileMenu}>
                                How it Works
                            </Link>
                            <Link to="/aboutLanding" className="mobile-nav-link" onClick={toggleMobileMenu}>
                                About Us
                            </Link>
                            <Typography className="mobile-nav-link">Pricing</Typography>
                            <Button
                                variant="outlined"
                                fullWidth
                                className="mobile-menu-btn-item"
                                onClick={() => {
                                    handleSignUp();
                                    toggleMobileMenu();
                                }}
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                className="mobile-menu-btn-item"
                                onClick={() => {
                                    handleLogin();
                                    toggleMobileMenu();
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    )}
                </Container>
            </Box>

            {/* Hero Section */}
            <Box className="hero-section">
                <Container maxWidth="xl">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box className="hero-content">
                                <Typography variant="h1" className="hero-title">
                                    Find Specialist Doctor
                                    <br />
                                    For Your Every Need At
                                    <br />
                                    <span className="hero-title-accent">Remote Doctors Online</span>
                                </Typography>
                                <Typography variant="body1" className="hero-description">
                                    We can find the doctors for you and book your appointment with easy care click process.
                                    Connect with healthcare professionals from anywhere, anytime.
                                </Typography>
                                <Box className="hero-cta">
                                    <CustomButton
                                        label="Book Your Appointments"
                                        className="hero-cta-btn"
                                        handleClick={() => navigate("/selectRoleSignup")}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box className="hero-image-container">
                                <Box component="img" src={FirstImage} alt="Healthcare" className="hero-image" />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Steps Section */}
            <Box className="steps-section">
                <Container maxWidth="lg">
                    <Typography variant="h2" className="section-title">
                        Three Easy Steps To
                        <br />
                        Find Your Doctor
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {steps.map((step, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box className="step-card">
                                    <Box className="step-icon">{step.icon}</Box>
                                    <Typography variant="h5" className="step-title">
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" className="step-description">
                                        {step.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            {features.map((feature, index) => (
                <Box
                    key={index}
                    className={`feature-section ${index % 2 === 1 ? "feature-reverse" : ""}`}
                >
                    <Container maxWidth="xl">
                        <Grid
                            container
                            spacing={4}
                            alignItems="center"
                            direction={feature.reverse ? "row-reverse" : "row"}
                        >
                            <Grid item xs={12} md={6}>
                                <Box className="feature-image-container">
                                    <Box
                                        component="img"
                                        src={feature.image}
                                        alt={feature.title}
                                        className="feature-image"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box className="feature-content">
                                    <Typography variant="h3" className="feature-title">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" className="feature-description">
                                        {feature.description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        endIcon={<ArrowForwardIcon />}
                                        className="feature-cta-btn"
                                        onClick={() => navigate("/selectRoleSignup")}
                                    >
                                        Get Started
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            ))}

            {/* About Section */}
            <Box className="about-section">
                <Container maxWidth="lg">
                    <Typography variant="h2" className="section-title">
                        About Us
                    </Typography>
                    <Typography variant="body1" className="about-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                    </Typography>
                </Container>
            </Box>

            {/* Team Section */}
            <Box className="team-section">
                <Container maxWidth="xl">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box className="team-image-container">
                                <Box component="img" src={AllDoctors} alt="Team" className="team-image" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box className="team-content">
                                <Typography variant="h3" className="team-title">
                                    Welcome to our medical app,
                                    <br />
                                    where your health is our priority!
                                </Typography>
                                <Typography variant="body1" className="team-description">
                                    Meet our exceptional team behind the innovative healthcare app that is revolutionizing
                                    the way you manage your health. Comprised of dedicated professionals from various
                                    fields, we are united by a common goal: to provide you with the best possible care
                                    and support on your wellness journey.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box className="landing-footer">
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box component="img" src={whiteframe} alt="Logo" className="footer-logo" />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={3}>
                                    <Typography className="footer-link">Doctor Registration</Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Link to="/howItWorks" className="footer-link">
                                        How it Works?
                                    </Link>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography className="footer-link">HCF Registration</Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography className="footer-link">Pricing</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Link to="/aboutLanding" className="footer-link">
                                        About Us
                                    </Link>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box className="social-icons">
                                        <IconButton className="social-icon" aria-label="LinkedIn">
                                            <LinkedIn />
                                        </IconButton>
                                        <IconButton className="social-icon" aria-label="Twitter">
                                            <Twitter />
                                        </IconButton>
                                        <IconButton className="social-icon" aria-label="Instagram">
                                            <Instagram />
                                        </IconButton>
                                        <IconButton className="social-icon" aria-label="Facebook">
                                            <Facebook />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Homes;
