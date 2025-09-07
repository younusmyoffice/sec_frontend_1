/* eslint-disable prettier/prettier */
import React from "react";
import "./landingPage.scss";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import { Link } from '@mui/icons-material';

const LandingPageHeader = () => {
    // eslint-disable-next-line prettier/prettier
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            <div className="LandingPage-Container">
                <div className="logo-container">
                    <img className="logo-img" src={"images/logo.png"} alt="Logo" />
                </div>
                <div className="NavBar-Container">
                    <ul>
                        <li>
                            <Typography variant="span">How it works?</Typography>
                        </li>
                        <li>
                            <Typography variant="span">About us</Typography>
                        </li>
                        <li>
                            <Typography variant="span">Pricing</Typography>
                        </li>
                        {/* <li>
                            <Link to={"/patientselectprofiletype"}>
                                <CustomButton
                                    label={"Sign Up"}
                                    isTransaprent
                                />
                            </Link>
                        </li> */}
                        <li id="Login-button">
                            <Link to="/patientselectprofiletype">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LandingPageHeader;
