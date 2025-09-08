import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    Button,
    Stack,
    IconButton,
    useTheme,
    useMediaQuery,
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Avatar,
    Rating,
    Fade,
    Slide,
    Zoom,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    LocalHospital,
    VideoCall,
    Assignment,
    People,
    ArrowForward,
    Phone,
    Email,
    LocationOn,
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    Search,
    CalendarToday,
    Person,
    HealthAndSafety,
    MedicalServices,
} from "@mui/icons-material";

import CustomButton from "../../components/CustomButton";
import "./HomePage.scss";

const HomePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Navigation items
    const navItems = [
        { label: "How It Works", href: "#how-it-works" },
        { label: "About Us", href: "#about" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
    ];

    // Features data
    const features = [
        {
            icon: <LocalHospital sx={{ fontSize: 40, color: "primary.main" }} />,
            title: "Find Specialist Doctors",
            description: "Connect with qualified healthcare professionals for your specific needs.",
            color: "#E3F2FD",
        },
        {
            icon: <VideoCall sx={{ fontSize: 40, color: "primary.main" }} />,
            title: "Virtual Consultations",
            description: "Get medical advice from the comfort of your home via secure video calls.",
            color: "#F3E5F5",
        },
        {
            icon: <Assignment sx={{ fontSize: 40, color: "primary.main" }} />,
            title: "Health Records",
            description: "Access and manage your medical records securely in one place.",
            color: "#E8F5E8",
        },
        {
            icon: <People sx={{ fontSize: 40, color: "primary.main" }} />,
            title: "Community Support",
            description: "Connect with others facing similar health challenges.",
            color: "#FFF3E0",
        },
    ];

    // Healthcare modules
    const modules = [
        {
            title: "Patient Module",
            icon: <Person sx={{ fontSize: 30 }} />,
            features: [
                "Access Personal Health Records",
                "Book Appointments Online",
                "Monitor Vital Signs",
                "Connect with Community",
            ],
            color: "#E3F2FD",
        },
        {
            title: "Doctor Module",
            icon: <MedicalServices sx={{ fontSize: 30 }} />,
            features: [
                "Virtual Consultations",
                "Access Patient Records",
                "Prescription Management",
                "Collaborate with Colleagues",
            ],
            color: "#F3E5F5",
        },
        {
            title: "HCF Module",
            icon: <HealthAndSafety sx={{ fontSize: 30 }} />,
            features: [
                "Appointment Management",
                "Diagnostic Reports",
                "Secure Data Storage",
                "Integration Capabilities",
            ],
            color: "#E8F5E8",
        },
    ];

    // Testimonials
    const testimonials = [
        {
            name: "Dr. Sarah Johnson",
            role: "Cardiologist",
            rating: 5,
            comment:
                "Share-e-Care has revolutionized how I connect with my patients. The platform is intuitive and secure.",
            avatar: "/api/placeholder/60/60",
        },
        {
            name: "Michael Chen",
            role: "Patient",
            rating: 5,
            comment:
                "I can now consult with specialists without leaving my home. The quality of care is exceptional.",
            avatar: "/api/placeholder/60/60",
        },
        {
            name: "Dr. Emily Rodriguez",
            role: "Pediatrician",
            rating: 5,
            comment:
                "The platform makes it easy to manage patient records and provide comprehensive care.",
            avatar: "/api/placeholder/60/60",
        },
    ];

    // Navigation Drawer
    const drawer = (
        <Box sx={{ width: 250 }}>
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img
                        src="/images/logo.png"
                        alt="Share-e-Care Logo"
                        className="logo"
                        style={{ height: "28px", width: "auto" }}
                    />
                    <Typography variant="h6" color="primary">
                        Share-e-Care
                    </Typography>
                </Box>
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} component="a" href={item.href}>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box className="homepage">
            {/* Navigation */}
            <AppBar
                position="fixed"
                elevation={scrolled ? 4 : 0}
                sx={{
                    backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
                    backdropFilter: scrolled ? "blur(10px)" : "none",
                    transition: "all 0.3s ease",
                }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <img
                            src="/images/logo.png"
                            alt="Share-e-Care Logo"
                            className="logo"
                            style={{
                                height: "32px",
                                width: "auto",
                                filter: scrolled ? "none" : "brightness(0) invert(1)",
                            }}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                color: scrolled ? "primary.main" : "white",
                                fontWeight: "bold",
                            }}
                        >
                            Share-e-Care
                        </Typography>
                    </Box>

                    {!isMobile && (
                        <Stack direction="row" spacing={3} sx={{ mr: 3 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    href={item.href}
                                    sx={{
                                        color: scrolled ? "text.primary" : "white",
                                        fontWeight: 500,
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Stack>
                    )}

                    <Stack direction="row" spacing={2}>
                        <CustomButton
                            label="Sign Up"
                            variant="outlined"
                            sx={{
                                color: scrolled ? "primary.main" : "white",
                                borderColor: scrolled ? "primary.main" : "white",
                            }}
                        />
                        <CustomButton
                            label="Log In"
                            variant="contained"
                            sx={{
                                backgroundColor: "primary.main",
                                "&:hover": {
                                    backgroundColor: "primary.dark",
                                },
                            }}
                        />
                    </Stack>

                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ ml: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>

            {/* Hero Section */}
            <Box
                className="hero-section"
                sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Fade in timeout={1000}>
                                <Box>
                                    <Typography
                                        variant="h2"
                                        component="h1"
                                        gutterBottom
                                        sx={{
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        Find Specialist Doctors For Your Every Need
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "rgba(255, 255, 255, 0.9)",
                                            mb: 4,
                                            fontSize: { xs: "1.1rem", md: "1.25rem" },
                                        }}
                                    >
                                        We can find the doctors for you and book your appointment
                                        with easy care click process.
                                    </Typography>
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                        <CustomButton
                                            label="Book Your Appointments"
                                            variant="contained"
                                            size="large"
                                            endIcon={<ArrowForward />}
                                            sx={{
                                                backgroundColor: "white",
                                                color: "primary.main",
                                                px: 4,
                                                py: 1.5,
                                                fontSize: "1.1rem",
                                                "&:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                },
                                            }}
                                        />
                                        <CustomButton
                                            label="Learn More"
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                color: "white",
                                                borderColor: "white",
                                                px: 4,
                                                py: 1.5,
                                                fontSize: "1.1rem",
                                                "&:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                },
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </Fade>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Zoom in timeout={1200}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: 300, md: 400 },
                                            height: { xs: 300, md: 400 },
                                            background: "rgba(255, 255, 255, 0.1)",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(255, 255, 255, 0.2)",
                                        }}
                                    >
                                        <img
                                            src="/images/logo.png"
                                            alt="Share-e-Care Logo"
                                            className="logo"
                                            style={{
                                                height: "120px",
                                                width: "auto",
                                                filter: "brightness(0) invert(1)",
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Zoom>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box
                id="how-it-works"
                className="how-it-works-section"
                sx={{ py: 8, backgroundColor: "#f8f9fa" }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        textAlign="center"
                        gutterBottom
                        sx={{ mb: 6, fontWeight: "bold" }}
                    >
                        Three Easy Steps To Find Your Doctor
                    </Typography>
                    <Grid container spacing={4}>
                        {[
                            {
                                step: "01",
                                title: "Search Doctor",
                                description:
                                    "Browse through our network of qualified healthcare professionals and find the right specialist for your needs.",
                                icon: <Search sx={{ fontSize: 40, color: "primary.main" }} />,
                            },
                            {
                                step: "02",
                                title: "Check Availability",
                                description:
                                    "View available time slots and select the most convenient appointment time for your consultation.",
                                icon: (
                                    <CalendarToday sx={{ fontSize: 40, color: "primary.main" }} />
                                ),
                            },
                            {
                                step: "03",
                                title: "Book Your Appointments",
                                description:
                                    "Complete your booking with just a few clicks and receive confirmation details instantly.",
                                icon: <Assignment sx={{ fontSize: 40, color: "primary.main" }} />,
                            },
                        ].map((item, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Slide direction="up" in timeout={800 + index * 200}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            textAlign: "center",
                                            p: 3,
                                            borderRadius: 3,
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                            transition: "transform 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: "50%",
                                                backgroundColor: "primary.main",
                                                color: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                mx: "auto",
                                                mb: 2,
                                                fontSize: "1.5rem",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {item.step}
                                        </Box>
                                        <Box sx={{ mb: 2 }}>{item.icon}</Box>
                                        <Typography
                                            variant="h5"
                                            component="h3"
                                            gutterBottom
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    </Card>
                                </Slide>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box className="features-section" sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        textAlign="center"
                        gutterBottom
                        sx={{ mb: 6, fontWeight: "bold" }}
                    >
                        Why Choose Share-e-Care?
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Fade in timeout={800 + index * 200}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            textAlign: "center",
                                            p: 3,
                                            borderRadius: 3,
                                            backgroundColor: feature.color,
                                            border: "none",
                                            boxShadow: "none",
                                            transition: "transform 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </Card>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Healthcare Modules Section */}
            <Box className="modules-section" sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        textAlign="center"
                        gutterBottom
                        sx={{ mb: 6, fontWeight: "bold" }}
                    >
                        Our Healthcare Modules
                    </Typography>
                    <Grid container spacing={4}>
                        {modules.map((module, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Slide direction="up" in timeout={800 + index * 200}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            p: 3,
                                            borderRadius: 3,
                                            backgroundColor: module.color,
                                            border: "none",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                            transition: "transform 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <Box sx={{ mr: 2, color: "primary.main" }}>
                                                {module.icon}
                                            </Box>
                                            <Typography
                                                variant="h5"
                                                component="h3"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {module.title}
                                            </Typography>
                                        </Box>
                                        <List dense>
                                            {module.features.map((feature, featureIndex) => (
                                                <ListItem key={featureIndex} sx={{ px: 0 }}>
                                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                                        <Box
                                                            sx={{
                                                                width: 6,
                                                                height: 6,
                                                                borderRadius: "50%",
                                                                backgroundColor: "primary.main",
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={feature}
                                                        primaryTypographyProps={{
                                                            fontSize: "0.9rem",
                                                        }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Card>
                                </Slide>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box className="testimonials-section" sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        textAlign="center"
                        gutterBottom
                        sx={{ mb: 6, fontWeight: "bold" }}
                    >
                        Hear From The Experts
                    </Typography>
                    <Typography
                        variant="h6"
                        textAlign="center"
                        color="text.secondary"
                        sx={{ mb: 6 }}
                    >
                        This is what the experts say about our platform
                    </Typography>
                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Fade in timeout={800 + index * 200}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            p: 3,
                                            borderRadius: 3,
                                            textAlign: "center",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        <Avatar
                                            src={testimonial.avatar}
                                            sx={{ width: 60, height: 60, mx: "auto", mb: 2 }}
                                        />
                                        <Rating
                                            value={testimonial.rating}
                                            readOnly
                                            sx={{ mb: 2 }}
                                        />
                                        <Typography
                                            variant="body1"
                                            sx={{ mb: 2, fontStyle: "italic" }}
                                        >
                                            &ldquo;{testimonial.comment}&rdquo;
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            {testimonial.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {testimonial.role}
                                        </Typography>
                                    </Card>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* About Section */}
            <Box id="about" className="about-section" sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h3"
                                component="h2"
                                gutterBottom
                                sx={{ fontWeight: "bold", mb: 3 }}
                            >
                                Welcome to our medical app, where your health is our priority!
                            </Typography>
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ mb: 4, lineHeight: 1.6 }}
                            >
                                We have an exceptional team behind our innovative healthcare app
                                that is revolutionizing the way you manage your health. Our team is
                                comprised of dedicated professionals united by a common goal: to
                                provide you with the best possible care and support on your wellness
                                journey.
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <CustomButton
                                    label="Learn More"
                                    variant="contained"
                                    endIcon={<ArrowForward />}
                                />
                                <CustomButton label="Contact Us" variant="outlined" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    justifyContent: "center",
                                }}
                            >
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <Avatar
                                        key={item}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            backgroundColor: "primary.main",
                                            fontSize: "1.5rem",
                                        }}
                                    >
                                        <Person />
                                    </Avatar>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    py: 6,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <img
                                    src="/images/logo.png"
                                    alt="Share-e-Care Logo"
                                    className="logo"
                                    style={{
                                        height: "40px",
                                        width: "auto",
                                        filter: "brightness(0) invert(1)",
                                        marginRight: "8px",
                                    }}
                                />
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                    Share-e-Care
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                                Revolutionizing healthcare through technology, making quality
                                medical care accessible to everyone, everywhere.
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <IconButton sx={{ color: "white" }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton sx={{ color: "white" }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton sx={{ color: "white" }}>
                                    <Instagram />
                                </IconButton>
                                <IconButton sx={{ color: "white" }}>
                                    <LinkedIn />
                                </IconButton>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                                Quick Links
                            </Typography>
                            <Stack spacing={1}>
                                {["How It Works", "About Us", "Pricing", "Contact"].map((item) => (
                                    <Button
                                        key={item}
                                        sx={{
                                            color: "white",
                                            justifyContent: "flex-start",
                                            textTransform: "none",
                                            "&:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                                Contact Info
                            </Typography>
                            <Stack spacing={1}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Phone sx={{ mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2">+1 (555) 123-4567</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Email sx={{ mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2">info@shareecare.com</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2">
                                        123 Healthcare St, Medical City
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 3, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            © 2024 Share-e-Care. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
