import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    box: {
        width: "100%",
        height: "250px",
        backgroundColor: "#E72B4A",
        marginTop: "0%",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        [theme.breakpoints.down("sm")]: {
            marginTop: "0%",
        },
    },
}));
const footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography color="black" variant="h5">
                            Share-E-Care
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                            {`${new Date().getFullYear()} | React | Material UI | React Router`}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Facebook />
                        <Instagram />
                        <Twitter />
                        <h6>Contact Details : *********</h6>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default footer;
