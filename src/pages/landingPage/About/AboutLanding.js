import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Container, Button, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import { LinkedIn, Twitter, Instagram, Facebook } from "@mui/icons-material";
import ImageLogo from "../../../static/images/logo.png";
import VisualImage from "../../../static/images/AboutImages/Visual.png";
import SillyImage from "../../../static/images/AboutImages/sillyimages.png";
import Alldoctor from "../../../static/images/AboutImages/Alldoctors.png";
import Whitelogo from "../../../static/images/AboutImages/whiteFrame.png";
import CustomButton from "../../../components/CustomButton/custom-button";
import "./About.scss";

const AboutLanding = () => {
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

    const modules = [
        {
            title: "Patient Module",
            icon: <PersonIcon sx={{ fontSize: 40, color: "#E72B4A" }} />,
            features: [
                "Access Personal Health Records",
                "Book Appointments Online",
                "Monitor Vital Signs and Health Metrics",
                "Connect with a Community of Support",
            ],
        },
        {
            title: "Doctor Module",
            icon: <LocalHospitalIcon sx={{ fontSize: 40, color: "#E72B4A" }} />,
            features: [
                "Virtual Consultations",
                "Access Patient Records",
                "Prescriptions Management",
                "Collaborate with Colleagues",
            ],
        },
        {
            title: "HCF Module",
            icon: <BusinessIcon sx={{ fontSize: 40, color: "#E72B4A" }} />,
            features: [
                "Appointment Management",
                "Diagnostic Reports and Results",
                "Secure Data Storage",
                "Integration Capabilities",
            ],
        },
    ];

    return (
        <Box className="about-landing-page">
            {/* Header */}
            <Box className="landing-header">
                <Container maxWidth="xl">
                    <Box className="header-content">
                        <Link to="/" className="logo-link">
                            <Box component="img" src={ImageLogo} alt="Share e Care" className="logo-img" />
                        </Link>

                        {!isMobile && (
                            <Box className="desktop-nav">
                                <Link to="/howItWorks" className="nav-link">
                                    <Typography variant="body1" className="nav-text">
                                        How it Works
                                    </Typography>
                                </Link>
                                <Link to="/aboutLanding" className="nav-link active">
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
            <Box className="about-hero-section">
                <Container maxWidth="lg">
                    <Typography variant="h1" className="about-hero-title">
                        About Us
                    </Typography>
                    <Typography variant="h3" className="about-hero-subtitle">
                        Healing Humanity Through Science and Compassion,
                        <br />
                        One Patient at a Time
                    </Typography>
                </Container>
            </Box>

            {/* Introduction Section */}
            <Box className="about-intro-section">
                <Container maxWidth="lg">
                    <Typography variant="body1" className="about-intro-text">
                        "Share e Care" is a healthcare website that focuses on providing innovative and accessible
                        healthcare solutions to individuals and communities. Our mission is to bridge the gap between
                        patients and healthcare providers by leveraging technology to enhance the overall healthcare
                        experience. Our mission is to create a more connected, efficient, and accessible healthcare
                        ecosystem. Our platform is dedicated to enhancing patient-doctor relationships, streamlining
                        diagnostics and treatment, and ultimately improving health outcomes. We are committed to
                        prioritizing user privacy and data security. We adhere to the highest industry standards to
                        ensure that personal health information is protected and used only for legitimate healthcare
                        purposes.
                    </Typography>
                </Container>
            </Box>

            {/* Modules Section */}
            <Box className="about-modules-section">
                <Container maxWidth="xl">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                {modules.map((module, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box className="module-card">
                                            <Box className="module-header">
                                                <Box className="module-icon">{module.icon}</Box>
                                                <Typography variant="h4" className="module-title">
                                                    {module.title}
                                                </Typography>
                                            </Box>
                                            <Box className="module-features">
                                                {module.features.map((feature, idx) => (
                                                    <Typography key={idx} variant="body2" className="module-feature">
                                                        • {feature}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box className="about-visual-container">
                                <Box component="img" src={VisualImage} alt="Visual" className="about-visual-image" />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Mission Section */}
            <Box className="about-mission-section">
                <Container maxWidth="lg">
                    <Typography variant="h2" className="mission-title">
                        Our Mission
                    </Typography>
                    <Typography variant="body1" className="mission-text">
                        Our mission is to transform the healthcare landscape by breaking down traditional barriers and
                        making healthcare accessible, convenient, and efficient. We are committed to providing a
                        platform where individuals can access the care they need when they need it, promoting a
                        healthier and happier society.
                    </Typography>
                    <Box className="mission-image-container">
                        <Box component="img" src={SillyImage} alt="Mission" className="mission-image" />
                    </Box>
                </Container>
            </Box>

            {/* Team Section */}
            <Box className="about-team-section">
                <Container maxWidth="xl">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box className="team-image-container">
                                <Box component="img" src={Alldoctor} alt="Team" className="team-image" />
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
                                    Meet our exceptional team behind the innovative healthcare app that is
                                    revolutionizing the way you manage your health. Comprised of dedicated professionals
                                    from various fields, we are united by a common goal: to provide you with the best
                                    possible care and support on your wellness journey.
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
                            <Box component="img" src={Whitelogo} alt="Logo" className="footer-logo" />
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

export default AboutLanding;
