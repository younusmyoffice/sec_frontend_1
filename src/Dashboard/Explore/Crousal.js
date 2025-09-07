/* eslint-disable prettier/prettier */
import React from "react";
import { makeStyles } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Box, Typography , ImageListItem , ImageList } from "@mui/material";
import image1 from "../../constants/DrImages/image1.png";
import image2 from "../../constants/DrImages/image2.png";
import image3 from "../../constants/DrImages/image3.png";
import CustomButton from "../../components/CustomButton/custom-button";
import "./Crousal.scss";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
    },
    gridList: {
        flexWrap: "nowrap",
        width: "100%",
        overflowX: "hidden",
    },
}));

const tileData = [
    {
        img: image1,
        title: "title",
    },
    {
        img: image2,
        title: "title",
    },
    {
        img: image3,
        title: "title",
    },
    {
        img: image1,
        title: "title",
    },
    {
        img: image2,
        title: "title",
    },
    {
        img: image3,
        title: "title",
    },
];

export default function SingleLineGridList() {
    const classes = useStyles();

    // const scrollable = document.querySelector("slider");
    // console.log(scrollable.addEventListener("wheel"));
    const slideLeft = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft -= 100;
    };

    const slideRight = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft += 100;
    };

    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ width: "fit-content", display: "flex", alignItems: "center" }}>
                <KeyboardArrowLeftIcon onClick={slideLeft} />
            </Box>

            <ImageList className={classes.gridList} id="slider" cols={2.5}>
                {tileData.map((index) => (
                    <ImageListItem key={index}>
                        <Box
                            sx={{
                                borderRadius: "8px",
                                border: "1px solid #E6E1E5",
                                height: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* content Box */}
                            <Box
                                sx={{
                                    width: "60%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "space-around",
                                }}
                            >
                                <Box sx={{ marginLeft: "5%" }}>
                                    <Typography sx={{ textAlign: "start" }}>
                                        Take control of your health with our user-friendly health
                                        care app.
                                    </Typography>
                                </Box>
                                <Box sx={{ marginLeft: "5%" }}>
                                    <CustomButton
                                        buttonCss={{ border: "none" }}
                                        label="Book Now"
                                        isTransaprent={true}
                                    />
                                </Box>
                            </Box>
                            {/* Image Box */}
                            <Box sx={{ width: "40%" }}>
                                {/* <Box component={'img'} src={tileData.image1} ></Box> */}
                                <img
                                    src={tileData[0].img}
                                    alt="/"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "14px",
                                        padding: "4px",
                                    }}
                                ></img>
                            </Box>
                        </Box>
                    </ImageListItem>
                ))}
            </ImageList>

            <Box sx={{ width: "fit-content", display: "flex", alignItems: "center" }}>
                <KeyboardArrowRightIcon onClick={slideRight} />
            </Box>
        </Box>
    );
}
