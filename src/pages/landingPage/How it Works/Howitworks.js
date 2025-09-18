import React,{useState} from "react";
import "./Howitworks.scss";
import { Box, Typography } from "@mui/material";
import ImageLogo from "../../../static/images/logo.png";
import Alldoctor from "../../../static/images/HowitworksImages/Alldoctors.png";
import Whitelogo from "../../../static/images/HowitworksImages/whiteFrame.png";
import { LinkedIn } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import { Facebook } from "@mui/icons-material";
import CustomButton from "../../../components/CustomButton";
import ScrewDoctor from "../../../static/images/HowitworksImages/MonitorDoc.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../static/images/icon.png"

function Howitworks() {
    const navigate = useNavigate();
    const [showBurger, setShowBurgerMenu] = useState(false);
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
            <div className="screen-container">
                <div className="header-container1">
                    <Link to={"/"}>
                <Box component={"img"}  className="full-logo"  src={ImageLogo} alt="Full Logo"></Box>
                </Link>
                <div className="burger-menu" onClick={toggleMenu}
                style={{ cursor:"pointer" ,}}>
                    <img src={logo} alt="Burger Menu Icon"/>
                </div>
                    {/* <Link to={"/"}>
                        <Box component={"img"} src={ImageLogo}></Box>
                    </Link> */}
                    <div className="other-header-content">
                        <Typography><strong>How it works?</strong></Typography>
                        <Link to={"/aboutlanding"} style={{ textDecoration: "none" }}>
                            <Typography style={{color: "black"}}>
                                <strong>About Us</strong>
                            </Typography>
                        </Link>
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
                <div className="howitworks-heading">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "Playfair Display",
                            fontSize: "2.5em",
                            fontStyle: "normal",
                        }}
                    >
                        How it Works
                    </Typography>
                </div>
                <div className="description">
                    <Typography
                        style={{
                            justifyContent:"center",
                            color: "#525152",
                            fontFamily: "Red Hat Display",
                            fontSize: "1.2rem",
                            fontStyle: "normal",
                        }}
                    >
                        we pay close attention to the user experience on our medical company
                        website. User-friendly navigation is key, ensuring that visitors can easily
                        find the information they seek. We optimize our content for search engines,
                        making it discoverable to those searching for medical insights. Regular
                        updates and revisions are part of our commitment to keeping the information
                        current, and we actively engage with our audience to gather feedback and
                        answer their questions. By maintaining a dynamic, informative, and
                        user-centric approach to content creation, our medical company website aims
                        to be a valuable resource for all those seeking reliable medical knowledge
                        and guidance
                    </Typography>
                </div>
                <div className="Benifits">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "playfair Display",
                            fontSize: "2em",
                            fontStyle: "normal",
                        }}
                    >
                        Benefits
                    </Typography>
                    <Typography
                        className="benefit-text"
                        style={{
                            color: "#313033",
                            fontFamily: "playfair Display",
                            fontSize: "1.2em",
                            fontStyle: "normal",
                        }}
                    >
                        Improving Healthcare. Reducing Costs
                    </Typography>
                </div>
                <div className="firstpole">
                    <div
                        className="side-pole"
                        style={{
                            border: "1px solid red",
                            height: "188px",
                            width: "7px",
                            color: "#E73A56",
                            background: "#E73A56",
                            borderRadius: "5px",
                            marginLeft: "2%",
                        }}
                    ></div>
                    <div className="text1">
                        <Typography
                            className="pole-text"
                            style={{
                                display:"flex",
                                flexWrap:"wrap",
                                color: "#313033",
                                fontFamily: "playfair Display",
                                fontSize: "2em",
                                fontStyle: "normal",
                            }}
                        >
                            OPTIMIZE TREATMENT & AVOID UNNECESSARY RISKS
                        </Typography>
                        <Typography
                            className="descr-pole"
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontSize: "1.2em",
                                fontStyle: "normal",
                                fontWeight: "400",
                            }}
                        >
                            Beyond the diagnosis, a second opinion provides us with a chance to ask
                            questions, understand the options, and help in deciding whether to
                            proceed with a potentially risky therapy or not and thereby restore
                            confidence that the treatment plan recommended is appropriate.
                        </Typography>
                    </div>
                </div>
                <div className="secondpole">
                    <div
                        className="second-side-pole"
                        style={{
                            border: "1px solid red",
                            height: "188px",
                            width: "7px",
                            color: "#E73A56",
                            background: "#E73A56",
                            borderRadius: "5px",
                            marginLeft: "2%",
                        }}
                    ></div>
                    <div className="text1">
                        <Typography
                            className="pole-text"
                            style={{
                                color: "#313033",
                                fontFamily: "playfair Display",
                                fontSize: "2em",
                                fontStyle: "normal",
                            }}
                        >
                            COST SAVING FROM AVOIDING UNNECESSARY SURGERY
                        </Typography>
                        <Typography
                            className="descr-pole"
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontSize: "1.2em",
                                fontStyle: "normal",
                            }}
                        >
                            Good medical services provide smart, proactive, and informed choices
                            that patients can trust with confidence
                        </Typography>
                    </div>
                </div>
                <div className="thirdpole">
                    <div
                        className="third-side-pole"
                        style={{
                            border: "1px solid red",
                            height: "188px",
                            width: "10px",
                            color: "#E73A56",
                            background: "#E73A56",
                            borderRadius: "5px",
                            marginLeft: "2%",
                        }}
                    ></div>
                    <div className="text1">
                        <Typography
                            className="pole-text"
                            style={{
                                color: "#313033",
                                fontFamily: "playfair Display",
                                fontSize: "2em",
                                fontStyle: "normal",
                            }}
                        >
                            FROM THE COMFORT OF YOUR HOME
                        </Typography>
                        <Typography
                            className="descr-pole"
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontSize: "1.2em",
                                fontStyle: "normal",
                                fontWeight: "400",
                            }}
                        >
                            The advantages of second opinions are many: financial, physical and
                            psychological. Providing these services remotely via our cutting-edge
                            HIPAA-compliant technology, XperTeleConsult™ system, will improve
                            patient access to medical care and no need for fixing appointments,
                            waiting at the clinic, privacy, etc.
                        </Typography>
                    </div>
                </div>
                <div className="fourthpole">
                    <div
                        className="fourth-side-pole"
                        style={{
                            border: "1px solid red",
                            height: "188px",
                            width: "7px",
                            color: "#E73A56",
                            background: "#E73A56",
                            borderRadius: "5px",
                            marginLeft: "2%",
                            // padding: "2rem",
                        }}
                    ></div>
                    <div className="text1">
                        <Typography
                            className="pole-text"
                            style={{
                                color: "#313033",
                                fontFamily: "playfair Display",
                                fontSize: "2em",
                                fontStyle: "normal",
                            }}
                        >
                            IMPROVE HEALTHCARE OUTCOMES
                        </Typography>
                        <Typography
                            className="descr-pole"
                            style={{
                                color: "#525152",
                                fontFamily: "Red Hat Display",
                                fontSize: "1.2em",
                                fontStyle: "normal",
                                fontWeight: "400",
                            }}
                        >
                            Second opinions have been found to bring down cost of healthcare and
                            reduces misdiagnoses
                        </Typography>
                    </div>
                </div>
                <div className="heading2">
                    <Typography
                        className="head2"
                        style={{
                            color: "#313033",
                            fontFamily: "playfair Display",
                            fontSize: "2em",
                            fontStyle: "normal",
                        }}
                    >
                        HEAR FROM THE EXPERTS
                    </Typography>
                    <Typography
                        className="expert-text"
                        style={{
                            color: "#313033",
                            fontFamily: "playfair Display",
                            fontSize: "1.2em",
                            fontStyle: "normal",
                        }}
                    >
                        This is what the experts say about our platform
                    </Typography>
                </div>

                <div className="monitor-doctor">
                    <Box
                        component={"img"}
                        src={ScrewDoctor}
                        style={{ width: "40%"}}
                    ></Box>
                </div>

                <Box
                    style={{
                        width: "100%",
                        display: "flex",
                        flexWrap:"wrap",
                        justifyContent: "center",
                    }}
                >
                    <div className="thought">
                        <Typography
                            className="thought-text"
                            style={{
                                color: "#313033",
                                fontFamily: "Red Hat Display",
                                fontSize: "1.2em",
                                fontStyle: "normal",
                            }}
                        >
                            “Time and health are two precious assets that we don’t recognize and
                            appreciate until they have been depleted.” <br></br>– Denis Waitley
                        </Typography>
                    </div>
                </Box>
                <Box className="pink-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px" }}>
                    <Box className="boximage" style={{ flex: 1, textAlign: "center" }}>
                        <Box
                            component={"img"}
                            src={Alldoctor}
                            style={{maxWidth: "100%", height: "auto" }}
                        ></Box>
                    </Box>
                    <Box className="welcome-heading" style={{ flex: 1, paddingLeft: "20px" }}>
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
                    </Box>
                </Box>

                {/*responsivev container starts  */}
                <div className="pink-container-responsive">
                    <div className="welcome-heading">
                        <Typography
                            style={{
                                color: "#313033",
                                fontFamily: "playfair Display",
                                fontSize: "34px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "36px",
                                textAlign: "center",
                            }}
                        >
                            Welcome to our medical <br />
                            app, where your health is <br />
                            our priority!
                        </Typography>
                        <div className="boximage">
                            <Box
                                component={"img"}
                                src={Alldoctor}
                                style={{ width: "500px", height: "450px" }}
                            ></Box>
                        </div>
                        <Typography
                            className="alldoc-text"
                            style={{
                                color: "#313033",
                                fontFamily: "Red Hat Display",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "27px",
                                textAlign: "center",
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
                {/* responsive container ends */}

                <div className="red-footer" style={{ display: "flex", flexDirection: "column", alignItems:"center", padding: "20px", backgroundColor: "#B22222" }}>
                    <div className="first-ali" style={{ width: "100%", display: "flex",flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap:"20px"}}>
                        <div className="first-half" style={{  flex: "0 0 auto", display: "flex",alignItems: "center", justifyContent: "flex-start"  }}>
                            <Box
                                component={"img"}
                                src={Whitelogo}
                                style={{width: "40%", maxWidth:"35%", margin: "0" }}
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
                    
                    <div className="hcf-pr" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
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
                    <div className="social-icons" style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}     >
                        <LinkedIn style={{ color: "white" }} />
                        <Twitter style={{ color: "white" }} />
                        <Instagram style={{ color: "white" }} />
                        <Facebook style={{ color: "white" }} />
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Howitworks;
