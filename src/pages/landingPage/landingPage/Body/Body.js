/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const Body = () => {
    return (
        <>
            <Box sx={{ marginBottom: 10, marginTop: 16 }}>
                <Typography variant="h4" align="center">
                    How it Works ?
                </Typography>
                <Typography
                    variant="h6"
                    color="#787579"
                    textAlign="centre"
                    marginLeft="28%"
                    width="50%"
                    padding="10px"
                    paddingTop="1%"
                    marginBottom={-9}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua .
                </Typography>
            </Box>

            <Card
                sx={{
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    width: "auto",

                    height: 450,
                    boxShadow: "0px 0px 2px 2px #C5C5C5",
                    // borderRadius:"16px",
                    // marginLeft: -8,
                    // borderRadius: 2,
                    // marginTop: -3,
                    // marginBottom: -5,
                    m: 10,
                }}
            >
                <Box>
                    <CardMedia
                        component="img"
                        sx={{
                            backgroundColor: "#FFFFFF",
                            display: "flex",
                            flexwrap: "nowrap",
                            width: 350,
                            height: 300,
                            borderRadius: 4,
                            marginTop: "5rem",
                            marginLeft: 20,
                            padding: 0.5,
                        }}
                        image="images/landingpage1.jpeg"
                        alt="Live from space album cover"
                    />
                </Box>
                <Box>
                    <CardContent sx={{ marginTop: 18, marginLeft: 8 }}>
                        <Typography component="div" variant="h6" fontWeight="bold">
                            Find Doctor Around the World
                        </Typography>
                        <Typography variant="h7" color="#787579" component="div" marginTop={1}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </CardContent>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
                {/* sx={{ display: 'flex', flexDirection: 'column' }} */}
            </Card>

            <Card
                sx={{
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    maxWidth: "100rem",
                    height: 450,
                    boxShadow: "0px 0px 2px 2px #C5C5C5",
                    // "1px 1px 8px 8px
                    borderRadius: "16px",
                    // marginLeft: -8,
                    // borderRadius: 2,
                    // marginTop: -3,
                    // marginBottom: -5,
                    m: 10,
                }}
            >
                {/* sx={{ display: 'flex', flexDirection: 'column' }} */}
                <Box>
                    <CardContent sx={{ marginTop: 18, marginLeft: 8 }}>
                        <Typography component="div" variant="h6" fontWeight="bold">
                            Instantly Book Appointments
                        </Typography>
                        <Typography variant="h7" color="#787579" component="div" marginTop={1}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </CardContent>
                </Box>
                <Box>
                    <CardMedia
                        component="img"
                        sx={{
                            backgroundColor: "#FFFFFF",
                            display: "flex",
                            flexwrap: "nowrap",
                            width: 350,
                            height: 300,
                            borderRadius: 4,
                            marginTop: "5rem",
                            marginLeft: 10,
                            padding: 0.5,
                        }}
                        image="images/landingpage2.jpeg"
                        alt="Live from space album cover"
                    />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
            </Card>

            <Card
                sx={{
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    maxWidth: "100rem",
                    height: 450,
                    boxShadow: "0px 0px 2px 2px #C5C5C5",
                    // " 2px 2px -2px -2px
                    borderRadius: "16px",
                    // marginLeft: -8,
                    // borderRadius: 2,
                    // marginTop: -3,
                    // marginBottom: -5,
                    m: 10,
                }}
            >
                {/* sx={{ display: 'flex', flexDirection: 'column' }} */}
                <Box>
                    <CardMedia
                        component="img"
                        sx={{
                            backgroundColor: "#FFFFFF",
                            display: "flex",
                            flexwrap: "nowrap",
                            width: 350,
                            height: 300,
                            borderRadius: 4,
                            marginTop: "5rem",
                            marginLeft: 20,
                            padding: 0.5,
                        }}
                        image="images/landingpage3.jpeg"
                        alt="Live from space album cover"
                    />
                </Box>
                <Box>
                    <CardContent sx={{ marginTop: 18, marginLeft: 8 }}>
                        <Typography component="div" variant="h6" fontWeight="bold">
                            Get Treated.
                        </Typography>
                        <Typography variant="h7" color="#787579" component="div" marginTop={1}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </CardContent>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
            </Card>

            <Box sx={{ marginBottom: 15, marginTop: 16 }}>
                <Typography variant="h4" align="center">
                    About Us
                </Typography>
                <Typography
                    variant="h6"
                    color="#787579"
                    textAlign="centre"
                    marginLeft="28%"
                    width="50%"
                    padding="10px"
                    paddingTop="1%"
                    marginBottom={-9}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua .
                </Typography>
            </Box>

            <Card
                sx={{
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    maxWidth: "100%",
                    height: 550,
                    boxShadow: "0px 0px 2px 2px #C5C5C5",
                    borderRadius: "16px",
                    // marginLeft: -8,
                    // borderRadius: 2,
                    // marginTop: -3,
                    // marginBottom: -5,
                }}
            >
                {/* sx={{ display: 'flex', flexDirection: 'column' }} */}
                <Box>
                    <CardMedia
                        component="img"
                        sx={{
                            backgroundColor: "#FFFFFF",
                            display: "flex",
                            flexwrap: "nowrap",
                            width: 350,
                            height: 300,
                            borderRadius: 4,
                            marginTop: "5rem",
                            marginLeft: 20,
                            padding: 0.5,
                        }}
                        image="images/landingpage1.jpeg"
                        alt="Live from space album cover"
                    />
                </Box>
                <Box>
                    <CardContent sx={{ marginTop: 18, marginLeft: 8 }}>
                        <Typography component="div" variant="h6" fontWeight="bold">
                            Find Doctor Around the World
                        </Typography>
                        <Typography variant="h7" color="#787579" component="div" marginTop={1}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </CardContent>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
            </Card>
        </>
    );
};
export default Body;
