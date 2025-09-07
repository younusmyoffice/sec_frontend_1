/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { Fragment } from "react";
import "./body.scss";



import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: theme.spacing("10%"),
        marginBottom: theme.spacing("-4%"),
        width: "80%",
        height: 400,
        boxShadow: "0px 0px 2px 2px #C5C5C5",
        borderRadius: "16px",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            marginTop: theme.spacing("1%"),
            marginLeft: theme.spacing("10%"),
            marginBottom: theme.spacing("-10%"),
            boxShadow: "0px 0px 2px 2px #C5C5C5",
        },
    },
    media4: {
        backgroundColor: "#FDEAED",
        height: "90%",
        marginTop: "2%",
        marginLeft: "3%",
        [theme.breakpoints.down("sm")]: {
            height: "40%",
            marginLeft: "31%",
        },
    },
    card4: {
        display: "flex",
        maxWidth: "100%",
        height: 550,
    },
    content4: {
        marginTop: "8%",
        marginLeft: "1%",
        [theme.breakpoints.down("sm")]: {
            marginTop: "47%",
            marginLeft: "-61%",
        },
    },
    card2: {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: theme.spacing("10%"),
        marginBottom: theme.spacing("2%"),
        marginTop: theme.spacing("6%"),
        width: "80%",
        height: 400,
        boxShadow: "0px 0px 2px 2px #C5C5C5",
        borderRadius: "16px",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            marginTop: theme.spacing("13%"),
            marginLeft: theme.spacing("10%"),
            marginBottom: theme.spacing("3%"),
            boxShadow: "0px 0px 2px 2px #C5C5C5",
        },
    },
    card3: {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: theme.spacing("10%"),
        marginBottom: theme.spacing("-4%"),
        width: "80%",
        height: 400,
        boxShadow: "0px 0px 2px 2px #C5C5C5",
        borderRadius: "16px",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            marginTop: theme.spacing("1%"),
            marginLeft: theme.spacing("10%"),
            marginBottom: theme.spacing("-10%"),
            boxShadow: "0px 0px 2px 2px #C5C5C5",
        },
    },
    media: {
        backgroundColor: "#FFFFFF",
        maxWidth: "20em",
        height: "70%",
        borderRadius: 4,
        marginTop: theme.spacing("7%"),
        marginLeft: theme.spacing("7%"),
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            maxWidth: "70%",
            height: "70%",
            borderRadius: 4,
            marginTop: theme.spacing("1%"),
            marginLeft: theme.spacing("16%"),
        },
    },
    media2: {
        maxWidth: "32%",
        height: "63%",
        borderRadius: 14,
        marginTop: theme.spacing("-24%"),
        marginLeft: theme.spacing("62%"),
        [theme.breakpoints.down("sm")]: {
            height: "60%",
            justifyContent: "center",
            maxWidth: "66%",
            marginTop: theme.spacing("-85%"),
            marginLeft: "13%",
            borderRadius: "14px",
        },
    },
    content2: {
        maxWidth: "70%",
        marginTop: theme.spacing("13%"),
        marginLeft: theme.spacing("1%"),
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
            maxWidth: "90%",
            marginTop: theme.spacing("59%"),
            marginLeft: theme.spacing("1%"),
        },
    },

    media3: {
        backgroundColor: "#FFFFFF",
        maxWidth: "20em",
        height: "70%",
        borderRadius: 4,
        marginTop: theme.spacing("15%"),
        marginLeft: theme.spacing("7%"),
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            maxWidth: "65%",
            height: "87%",
            borderRadius: 4,
            marginTop: theme.spacing("4%"),
            marginLeft: theme.spacing("15%"),
        },
    },
    content: {
        marginTop: theme.spacing("-27%"),
        marginLeft: theme.spacing("25em"),
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing("1px"),
            marginLeft: theme.spacing("-1%"),
        },
    },
    h1: {
        fontSize: "20px",
        marginLeft: "8%",
        marginTop: "2%",
    },
    p: {
        marginLeft: "0%",
        fontSize: "15px",
    },
    img56: {
        width: "54%",
        marginTop: "-22%",
        marginLeft: "41%",
        [theme.breakpoints.down("sm")]: {
            width: "36%",
            marginLeft: "55%",
            marginTop: "-12%",
        },
    },
    buttons: {
        marginLeft: "8%",
    },
    container: {
        marginTop: "10%",
    },
}));
const Body = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <Box className={classes.container}>
                <Box className={classes.h1} sx={{fontFamily: 'Poppins, sans-serif'}} >
                    <h1>
                        Take charge of your
                        <br></br>
                        Health care.
                    </h1>

                    <p className={classes.p}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        <br></br>
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        <br></br>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        <br></br>
                        ut aliquip ex ea commodo consequat. Duis aute irure dolor
                        <br></br>.
                    </p>
                </Box>
                <buttons className={classes.buttons}>
                    <Button variant="contained" sx={{ marginRight: "1%" }}>
                        Join Now
                    </Button>
                    <Button variant="outlined">View More</Button>
                </buttons>

                <Box>
                    <img className={classes.img56} alt="" src={"images/doctor6.jpg"}></img>
                </Box>
            </Box>

            <div class="section one" id="section1">
                <Box sx={{ marginBottom: 10, marginTop: 16 }}>
                    <Typography variant="h4" align="center">
                        How it Works ?
                    </Typography>
                    <Typography
                        sx={{
                            variant: "h6",
                            color: "#787579",
                            textAlign: "center",
                            marginLeft: "28%",
                            width: "50%",
                            padding: "10px",
                            paddingTop: "1%",
                            marginBottom: -9,
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua .
                    </Typography>
                </Box>
            </div>

            <Card className={classes.card} sx={{ backgroundColor: "#FFFFFF" }}>
                <CardMedia
                    className={classes.media}
                    component="img"
                    image="images/landingpage1.jpeg"
                    alt="Live from space album cover"
                />
                <CardContent className={classes.content}>
                    <Typography
                        component="div"
                        sx={{ varian: "h6", fontWeight: "bold", textAlign: "center" }}
                    >
                        Find Doctor Around the World
                    </Typography>
                    <Typography
                        component="div"
                        sx={{ marginTop: 1, variant: "h7", color: "#787579" }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                </CardContent>
            </Card>
            <Card
                className={classes.card2}
                sx={{
                    backgroundColor: "#FFFFFF",
                }}
            >
                <CardContent className={classes.content2}>
                    <Typography
                        component="div"
                        sx={{ varian: "h6", fontWeight: "bold", textAlign: "center" }}
                    >
                        Instantly Book Appointments
                    </Typography>
                    <Typography
                        variant="h7"
                        color="#787579"
                        component="div"
                        marginTop={1}
                        maxWidth={"80%"}
                        textAlign={"center"}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                </CardContent>
                <CardMedia
                    className={classes.media2}
                    image="images/landingpage2.jpeg"
                    component="img"
                    alt="Live from space album cover"
                />
            </Card>
            <Card
                className={classes.card3}
                sx={{
                    backgroundColor: "#FFFFFF",
                }}
            >
                <Box>
                    <CardMedia
                        className={classes.media3}
                        component="img"
                        image="images/landingpage3.jpeg"
                        alt="Live from space album cover"
                    />
                </Box>
                <Box>
                    <CardContent className={classes.content}>
                        <Typography
                            component="div"
                            sx={{ varian: "h6", fontWeight: "bold", textAlign: "center" }}
                        >
                            Get Treated.
                        </Typography>
                        <Typography variant="h7" color="#787579" component="div" marginTop={1}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            <div class="section two" id="section2">
                <Box sx={{ marginBottom: 15, marginTop: 16 }}>
                    <Typography variant="h4" align="center">
                        About Us
                    </Typography>
                    <Typography
                        sx={{
                            variant: "h6",
                            color: "#787579",
                            textAlign: "center",
                            marginLeft: "28%",
                            width: "50%",
                            padding: "10px",
                            paddingTop: "1%",
                            marginBottom: -9,
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua .
                    </Typography>
                </Box>
            </div>

            <Card
                className={classes.card4}
                sx={{
                    background: "#FDEAED",
                }}
            >
                <CardMedia
                    className={classes.media4}
                    component="img"
                    sx={{}}
                    image="images/landingpage4.jpg"
                    alt="Live from space album cover"
                />
                <CardContent className={classes.content4} sx={{}}>
                    <Typography component="div" variant="h6" fontWeight="bold">
                        Welcome to our medical app, where your health is our priority!
                    </Typography>
                    <Typography
                        component="div"
                        sx={{ marginTop: 1, color: "#787579", variant: "h7", textAlign: "center" }}
                    >
                        Meet our exceptional team behing the innovative healthcare app that is
                        revolutionizing the way you manage your health.Comprised of dedicated
                        professionals from various fields, we are united by a common goal to provide
                        you with the best possible care and support on your wellness journey.
                    </Typography>
                </CardContent>
            </Card>
        </Fragment>
    );
};
export default Body;
