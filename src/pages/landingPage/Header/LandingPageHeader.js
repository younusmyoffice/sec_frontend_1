/* eslint-disable prettier/prettier */
import React from "react";
import "./landingPage.scss";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../../components/CustomButton/custom-button";

const useStyles = makeStyles((theme) => ({
    landingPageContainer: {
        display: "flex",
        justifyContent: "space-between",
        background: "#FFFF",
        boxShadow: "0px 4px 4px 0px  #C5C5C5",
        height: "70px",
    },
    logoContainerLg: {
        width: "180px",
        [theme.breakpoints.up("sm")]: {
            width: "90px",
        },
    },

    logoImgLg: {
        width: "180px",
        position: "relative",
        top: "25%",
        left: "13%",
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    logoImgSm: {
        backgroundColor: "rgb(230,46,74)",
        borderRadius: "20px",
        marginLeft: "21%",
        width: "3em",
        height: "2.2em",
        marginTop: "21%",

        // width: "80px",
        // position: "relative",
        // top: "15%",
        // left: "-57%",
        // display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    navbarContainer: {
        float: "right",
        [theme.breakpoints.down("sm")]: {
            width: "580px",
        },
    },
    list: {
        display: "flex",
        listStyleType: "none",
        marginRight: "30px",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            listStyleType: "none",
            marginLeft: "-25px",
        },
    },
    line: {
        display: "inline-block",
        margin: "0px 2%",
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "24px",
        whiteSpace: "nowrap",
        width: "6em",
        [theme.breakpoints.down("sm")]: {
            display: "inline-block",
            margin: "0px 2%",
            fontFamily: "Poppins",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            width: "6em",
        },
    },
}));

const LandingPageHeader = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/selectprofiletype");
    };
    // eslint-disable-next-line prettier/prettier
    return (
        
        <>
            <div className={`${classes.landingPageContainer} landing-page-main-container`}>
                <div className={classes.logoContainerLg}>
                    <img className={classes.logoImgLg} src={"images/logo.png"} alt="Logo" />
                </div>
                <div className={classes.logoContainerSm}>
                    <img className={classes.logoImgSm} src={"images/icon.png"} alt="Logo" />
                </div>
                <div className={classes.navbarContainer}>
                    <ul className={classes.list}>
                        <li className={classes.line}>
                            <a
                                href="#section1"
                                variant="span"
                                style={{ color: "#313033", textDecoration: "none" }}
                                class="btn"
                            >
                                How it works?
                            </a>
                        </li>
                        <li className={classes.line}>
                            <a
                                href="#section2"
                                variant="span"
                                style={{ color: "#313033", textDecoration: "none" }}
                                class="btn"
                            >
                                About Us
                            </a>
                        </li>
                        <li className={classes.line}>
                            <Typography variant="span">Pricing</Typography>
                        </li>
                       <div style={{display:"flex"}} >
                       <CustomButton
                            label={"Sign Upp"}
                            isTransaprent={false}
                            isDisabled={false}
                            isElevated={false}
                            handleClick={() => {navigate("/selectsignup")}}
                            buttonCss={{
                                width: "8.8em",
                                height: "2.5em",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "100px",
                                // marginLeft: "-17px",
                                // marginTop: "-4px",
                                marginRight : "3%"
                            }}
                        />

                        <CustomButton
                            label={"Log In"}
                            isTransaprent={false}
                            isDisabled={false}
                            isElevated={false}
                            handleClick={handleSubmit}
                            buttonCss={{
                                width: "8.8em",
                                height: "2.5em",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "100px",
                                // marginLeft: "-17px",
                                // marginTop: "-4px",
                            }}
                        />
                       </div>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LandingPageHeader;
