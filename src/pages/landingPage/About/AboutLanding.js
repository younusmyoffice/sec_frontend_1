import React,{useState} from "react";
import ImageLogo from "../../../../src/static/images/logo.png";
import { Box, Typography } from "@mui/material";
// import BurgerImage from "../../../static/images/DrImages/Glyph_ undefined.png";
import "./About.scss";
import VisualImage from "../../../static/images/AboutImages/Visual.png";
// import Vision from "../../../static/images/DrImages/vision.png";
// import Goal from "../../../static/images/DrImages/goal.png";
// import Inspiring from "../../../static/images/DrImages/inspiring.png";
import SillyImage from "../../../static/images/AboutImages/sillyimages.png";
import Alldoctor from "../../../static/images/AboutImages/Alldoctors.png";
import Whitelogo from "../../../static/images/AboutImages/whiteFrame.png";
import { LinkedIn } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import { Facebook } from "@mui/icons-material";
import CustomButton from "../../../components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../static/images/icon.png"


const AboutLanding = () => {
    const navigate = useNavigate();
    const [showBurger, setShowBurgerMenu] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/selectprofiletype");
    };

    function toggleMenu () {
        setShowBurgerMenu(!showBurger);
        const menu = document.querySelector(".other-header-content");
        menu.classList.toggle("show");
        showBurger ? (menu.display = "none") : (menu.display ="block");
    }

    return (
        <>
            <div className="screen-container1">
            <div className="header-container1">
            {/* <Box sx={{display:"flex" , flexDirection:"column",justifyContent:"center", alignItems:"center"}}> */}
            <Link to={"/"}>
            <Box component={"img"}  className="full-logo"  src={ImageLogo} alt="Full Logo"></Box>
            </Link>
                <div className="burger-menu" onClick={toggleMenu}
                style={{ cursor:"pointer" ,}}>
                    <img src={logo} alt="Burger Menu Icon"/>
                </div>
                    {/* <Link to={"/"}>
                        {" "}
                        <Box component={"img"} src={ImageLogo}></Box>
                    </Link> */}
                    <div className="other-header-content">
                        <Link to={"/howitworks"} style={{ textDecoration: "none" }}>
                            <Typography style={{ color: "black" }}><strong>How it works?</strong></Typography>
                        </Link>
                        <Typography><strong>About Us</strong></Typography>
                        <Typography><strong>Pricing</strong></Typography>
                        <CustomButton
                            label="Sign Up"
                            buttonCss={{ width: "170px", height: "38px", borderRadius: "20px" }}
                            isTransaprent={"True"}
                            handleClick={() => {
                                navigate("/selectsignup");
                            }}
                        ></CustomButton>
                        <CustomButton
                            label="Login"
                            buttonCss={{ width: "170px", height: "38px", borderRadius: "20px" }}
                            handleClick={handleSubmit}
                        ></CustomButton>
                    </div>
                </div>
                <div className="about-heading" >
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "Playfair Display",
                            fontSize: "3rem",
                            fontStyle: "normal", 
                        }}
                    >
                        About Us 
                    </Typography>
                </div>

                <div className="Heading-about">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "Playfair Display",
                            fontSize: "1.5rem",
                            fontStyle: "normal",
                            fontWeight: 200,
                        }}
                    >
                        HEALING HUMANITY THROUGH SCIENCE AND COMPASSION, ONE PATIENT AT A TIME
                    </Typography>
                </div>
                <div className="text9">
                    <Typography
                        style={{
                            color: "#525152",
                            fontFamily: "Red Hat Display",
                            fontSize: "1.2em",
                            fontStyle: "normal",
                            fontWeight: "400",
                        }}
                    >
                        "Share e Care" is a healthcare website that focuses on providing innovative
                        and accessible healthcare solutions to individuals and communities. Our
                        mission is to bridge the gap between patients and healthcare providers by
                        leveraging technology to enhance the overall healthcare experience. Our
                        mission is to create a more connected, efficient, and accessible healthcare
                        ecosystem. Our platform is dedicated to enhancing patient-doctor
                        relationships, streamlining diagnostics and treatment, and ultimately
                        improving health outcomes. we are committed to prioritizing user privacy and
                        data security. We adhere to the highest industry standards to ensure that
                        personal health information is protected and used only for legitimate
                        healthcare purposes.
                    </Typography>
                </div>
            
                <div className="left-right-content"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                    }}
                    >

                    {/* Left Content */}
                    <div className="left-content"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem", 
                        flex: 1,
                    }}
                    >
                        
                        <div className="patient-module">
                            <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Playfair Display",
                                fontSize: "2.2rem",
                                fontStyle: "normal",
                                fontWeight: "400",
                            }}
                            
                            >
                                Patient Module
                                </Typography>
                                <div className="About-Patient">
                                    <Typography
                                    style={{
                                        color: "#525152",
                                        fontFamily: "Red Hat Display",
                                        fontSize: "1.2rem",
                                        fontStyle: "normal",
                                        fontWeight: "200",
                                    }}
                                    
                                    >
                                        
                                        &#8226; Access Personal Health Records
                                        
                                        </Typography>
                                        <Typography
                                        
                                        style={{
                                            color: "#525152",
                                            fontFamily: "Red Hat Display",
                                            fontSize: "1.2rem",
                                            fontStyle: "normal",
                                            fontWeight: "200",
                                        }}
                                        
                                        >
                                            &#8226; Book Appointments Online.
                                            </Typography>
                                            
                                            <Typography
                                            
                                            style={{
                                                color: "#525152",
                                                fontFamily: "Red Hat Display",
                                                fontSize: "1.2rem",
                                                fontStyle: "normal",
                                                fontWeight: "200",
                                            }}
                                            
                                            >
                                                &#8226; Monitor Vital Signs and Health Metrics
                                                
                                                </Typography>
                                                
                                                <Typography
                                                
                                                style={{
                                                    color: "#525152",
                                                    fontFamily: "Red Hat Display",
                                                    fontSize: "1.2rem",
                                                    fontStyle: "normal",
                                                    fontWeight: "200",
                                                }}
                                                
                                                >
                                                    &#8226; Connect with a Community of Support
                                                    
                                                    </Typography>
                                                </div>
                                            </div>
                                            
                                        <div className="patient-module">
                                            <Typography
                                            style={{
                                                color: "#313033",
                                                fontFamily: "Playfair Display",
                                                fontSize: "2.2rem",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                            }}
                                            >
                                                Doctor Module
                                                
                                                </Typography>
                                                
                                         <div className="About-Patient">
                <Typography
                    style={{
                        color: "#525152",
                        fontFamily: "Red Hat Display",
                        fontSize: "1.2rem",
                        fontStyle: "normal",
                        fontWeight: "200",
                    }}
                >
                    &#8226; Virtual Consultations.
                </Typography>
                <Typography
                    style={{
                        color: "#525152",
                        fontFamily: "Red Hat Display",
                        fontSize: "1.2rem",
                        fontStyle: "normal",
                        fontWeight: "200",
                    }}
                >
                    &#8226; Access Patient Records
                </Typography>
                <Typography
                    style={{
                        color: "#525152",
                        fontFamily: "Red Hat Display",
                        fontSize: "1.2rem",
                        fontStyle: "normal",
                        fontWeight: "200",
                    }}
                >
                    &#8226; Prescriptions Management
                </Typography>
                <Typography
                    style={{
                        color: "#525152",
                        fontFamily: "Red Hat Display",
                        fontSize: "1.2rem",
                        fontStyle: "normal",
                        fontWeight: "200",
                    }}
                >
                    &#8226; Collaborate with Colleagues
                </Typography>
            </div>
        </div>

        <div className="patient-module">
            <Typography
                style={{
                    color: "#313033",
                    fontFamily: "Playfair Display",
                    fontSize: "2.2rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                }}
            >
                HCF Module
            </Typography>
            <div className="About-Patient">
                <Typography
                    style={{
                        color: "#525152",
                        fontFamily: "Red Hat Display",
                        fontSize: "1.2rem",
                        fontStyle: "normal",
                        fontWeight: "200",
                    }}
                >
                    &#8226; Appointment Management
                </Typography>
                <Typography
                    style={{
                        color: "#525152",
                        fontFamily: "Red Hat Display",
                        fontSize: "1.2rem",
                        fontStyle: "normal",
                        fontWeight: "200",
                    }}
                >
                    &#8226; Diagnostic Reports and Results
                </Typography>
                <Typography
                    style={{
                        color: "#525152",
                        fontFamily: "Red Hat Display",
                        fontSize: "1.2rem",
                        fontStyle: "normal",
                        fontWeight: "200",
                    }}
                >
                    &#8226; Secure Data Storage
                </Typography>
                <Typography
                    style={{
                        color: "#525152",
                        fontFamily: "Red Hat Display",
                        fontSize: "1.2rem",
                        fontStyle: "normal",
                        fontWeight: "200",
                    }}
                >
                    &#8226; Integration Capabilities
                </Typography>
            </div>
        </div>
    </div>

    {/* Right Content (Image) */}
    <div
        className="visualImage"
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
        }}
    >
        <Box
            component={"img"}
            src={VisualImage}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
    </div>
    </div>


                <div className="heading4">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "Playfair Display",
                            fontSize: "3rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                        }}
                    >
                        OUR MISSION
                    </Typography>
                </div>
                <div className="text9">
                    <Typography
                        style={{
                            color: "#525152",
                            fontFamily: "Red Hat Display",
                            fontSize: "1.2rem",
                            fontStyle: "normal",
                            fontWeight: "200",
                        }}
                    >
                        Our mission is to transform the healthcare landscape by breaking down
                        traditional barriers and making healthcare accessible, convenient, and
                        <br></br> efficient. We are committed to providing a platform where
                        individuals can access the care they need when they need it, promoting a
                        healthier and
                        <br></br>
                        happier society
                    </Typography>
                </div>
                <div className="Sillyimage">
                    <Box
                        component={"img"}
                        src={SillyImage}
                        style={{width: "100%", maxWidth: "600px", height: "auto", margin: "0 auto"}}
                    ></Box>
                </div>
                <div className="pink-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px" }}>
                    <div className="boximage" style={{ flex: 1, textAlign: "center" }}>
                        <Box
                            component={"img"}
                            src={Alldoctor}
                            style={{maxWidth: "100%", height: "auto"}}
                        ></Box>
                    </div>
                    <div className="welcome-heading" style={{ flex: 1, paddingLeft: "20px" }}>
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "playfair Display",
                                fontSize: "2em",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "1.2",
                            }}
                        >
                            Welcome to our medical app,<br></br>
                            where your health is our priority!
                        </Typography>
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "Red Hat Display",
                                fontSize: "1.2em",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "1.6",
                            }}
                        >
                            Meet our exceptional team behind the innovative healthcare app<br></br>
                            that is revolutionizing the way you manage your health. <br></br>
                            Comprised of dedicated professionals from various fields, we are
                            <br></br>
                            united by a common goal: to provide you with the best possible <br></br>
                            care and support on your wellness journey.
                        </Typography>
                    </div>
                </div>
                <div className="red-footer" style={{ display: "flex", flexDirection: "column", alignItems:"center", padding: "20px", backgroundColor: "#B22222" }}>
                    <div className="first-ali" style={{ width: "100%", display: "flex",flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap:"20px"}}>
                        <div className="first-half" style={{  flex: "0 0 auto", display: "flex",alignItems: "center", justifyContent: "flex-start"}}>
                            <Box
                                component={"img"}   
                                src={Whitelogo}
                                style={{width: "40%", maxWidth:"35%", margin: "0"}}
                            ></Box>
                        </div>
                        </div>
                        <div className="half-align" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", flex:"1",textAlign: "center"}}>
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
                    <div className="hcf-pr"  style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
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

                    <div className="about-us" style={{ marginTop: "20px" }}>
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
                    <div className="social-icons" style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px"}}>
                        <LinkedIn style={{ color: "white" }} />
                        <Twitter style={{ color: "white" }} />
                        <Instagram style={{ color: "white" }} />
                        <Facebook style={{ color: "white" }} />
                    </div>
                </div>
                {/* </Box> */}
            </div>
        </>
    );
};
export default AboutLanding;
