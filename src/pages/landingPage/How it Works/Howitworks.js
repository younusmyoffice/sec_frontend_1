import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Container, Button, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SavingsIcon from "@mui/icons-material/Savings";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { LinkedIn, Twitter, Instagram, Facebook } from "@mui/icons-material";
import ImageLogo from "../../../static/images/logo.png";
import Alldoctor from "../../../static/images/HowitworksImages/Alldoctors.png";
import Whitelogo from "../../../static/images/HowitworksImages/whiteFrame.png";
import ScrewDoctor from "../../../static/images/HowitworksImages/MonitorDoc.png";
import CustomButton from "../../../components/CustomButton/custom-button";
import "./Howitworks.scss";

function Howitworks() {
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

    const benefits = [
        {
            title: "Optimize Treatment & Avoid Unnecessary Risks",
            icon: <LocalHospitalIcon sx={{ fontSize: 48, color: "#E72B4A" }} />,
            description:
                "Beyond the diagnosis, a second opinion provides us with a chance to ask questions, understand the options, and help in deciding whether to proceed with a potentially risky therapy or not and thereby restore confidence that the treatment plan recommended is appropriate.",
        },
        {
            title: "Cost Saving From Avoiding Unnecessary Surgery",
            icon: <SavingsIcon sx={{ fontSize: 48, color: "#E72B4A" }} />,
            description:
                "Good medical services provide smart, proactive, and informed choices that patients can trust with confidence.",
        },
        {
            title: "From The Comfort Of Your Home",
            icon: <HomeIcon sx={{ fontSize: 48, color: "#E72B4A" }} />,
            description:
                "The advantages of second opinions are many: financial, physical and psychological. Providing these services remotely via our cutting-edge HIPAA-compliant technology, XperTeleConsult™ system, will improve patient access to medical care and no need for fixing appointments, waiting at the clinic, privacy, etc.",
        },
        {
            title: "Improve Healthcare Outcomes",
            icon: <TrendingUpIcon sx={{ fontSize: 48, color: "#E72B4A" }} />,
            description:
                "Second opinions have been found to bring down cost of healthcare and reduces misdiagnoses",
        },
    ];

    return (
        <Box className="howitworks-page">
            {/* Header */}
            <Box className="landing-header">
                <Container maxWidth="xl">
                    <Box className="header-content">
                        <Link to="/" className="logo-link">
                            <Box component="img" src={ImageLogo} alt="Share e Care" className="logo-img" />
                        </Link>

                        {!isMobile && (
                            <Box className="desktop-nav">
                                <Link to="/howItWorks" className="nav-link active">
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
            <Box className="howitworks-hero-section">
                <Container maxWidth="lg">
                    <Typography variant="h1" className="howitworks-hero-title">
                        How it Works
                    </Typography>
                    <Typography variant="body1" className="howitworks-hero-description">
                        We pay close attention to the user experience on our medical company website. User-friendly
                        navigation is key, ensuring that visitors can easily find the information they seek. We optimize
                        our content for search engines, making it discoverable to those searching for medical insights.
                        Regular updates and revisions are part of our commitment to keeping the information current, and
                        we actively engage with our audience to gather feedback and answer their questions. By
                        maintaining a dynamic, informative, and user-centric approach to content creation, our medical
                        company website aims to be a valuable resource for all those seeking reliable medical knowledge
                        and guidance.
                    </Typography>
                </Container>
            </Box>

            {/* Benefits Section */}
            <Box className="howitworks-benefits-section">
                <Container maxWidth="lg">
                    <Box className="benefits-header">
                        <Typography variant="h2" className="benefits-title">
                            Benefits
                        </Typography>
                        <Typography variant="h3" className="benefits-subtitle">
                            Improving Healthcare. Reducing Costs
                        </Typography>
                    </Box>

                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {benefits.map((benefit, index) => (
                            <Grid item xs={12} key={index}>
                                <Box className="benefit-card">
                                    <Box className="benefit-icon-container">
                                        {benefit.icon}
                                    </Box>
                                    <Box className="benefit-content">
                                        <Typography variant="h4" className="benefit-title">
                                            {benefit.title}
                                        </Typography>
                                        <Typography variant="body1" className="benefit-description">
                                            {benefit.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Experts Section */}
            <Box className="howitworks-experts-section">
                <Container maxWidth="lg">
                    <Typography variant="h2" className="experts-title">
                        Hear From The Experts
                    </Typography>
                    <Typography variant="body1" className="experts-subtitle">
                        This is what the experts say about our platform
                    </Typography>
                    <Box className="experts-image-container">
                        <Box component="img" src={ScrewDoctor} alt="Expert" className="experts-image" />
                    </Box>
                </Container>
            </Box>

            {/* Quote Section */}
            <Box className="howitworks-quote-section">
                <Container maxWidth="md">
                    <Box className="quote-card">
                        <FormatQuoteIcon sx={{ fontSize: 60, color: "#E72B4A", opacity: 0.3 }} />
                        <Typography variant="h5" className="quote-text">
                            "Time and health are two precious assets that we don't recognize and appreciate until they
                            have been depleted."
                        </Typography>
                        <Typography variant="body1" className="quote-author">
                            – Denis Waitley
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Team Section */}
            <Box className="howitworks-team-section">
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
}

export default Howitworks;
