/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Box, Divider } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";
import Imagestar from "../DrImages/ShiningStar.png";
import DrImage from "../DrImages/image3.png";

const useStyles = makeStyles((theme) => ({
    textStyle: {
        fontFamily: "Poppins",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "18px",
        letterSpacing: "0.096px",
    },
}));

const Drcard = ({ DrData }) => {
    const classes = useStyles();
    // console.log(DrData);
    const [
        name,
        id,
        qualification,
        // image,
        // hospital,
        // specialist,
        // rating ,
        // reviews
    ] = [
        DrData.first_name,
        DrData.suid,
        DrData.qualification,
        // DrData.drimage ,
        // DrData.hospital ,
        // DrData.specialist,
        // DrData.rating,
        // DrData.reviews
    ];

    return (
        <Box key={id} sx={{ width: "100%", margin: "2px" }}>
            <Card
                key={id}
                sx={{
                    display: "flex",
                    height: 128,
                    m: 1,
                    fontFamily: "Poppins",
                    fontStyle: "12px",
                    backgroundColor: "#ffff",
                    borderRadius: 4,
                }}
            >
                <Box sx={{ height: "123px", width: "123px" }} component={"div"}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: "100%",
                            height: "100%",
                            padding: 0.8,
                            borderRadius: 4,
                        }}
                        // image={"image"}
                        image={DrImage}
                        alt="Live from space album cover"
                    />
                </Box>

                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                        sx={{ fontSize: "14px", textAlign: "start" }}
                        component="h2"
                        variant="h9"
                        fontWeight="bold"
                    >
                        {name}
                    </Typography>
                    <Divider />
                    <Typography
                        sx={{
                            fontSize: "12px",
                            textAlign: "start",
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "18px",
                            letterSpacing: "0.096px",
                            Color: "#787579",
                            // lineHeight: "40px",
                        }}
                        variant="subtitle1"
                        color="text.secondary"
                        component="h3"
                    >
                        {`${qualification} | XYZ hospital`}
                    </Typography>
                    {/* <Typography variant="subtitle1" color="text.secondary" component="h3">
                                {"specialist"}
                            </Typography> */}
                    <Box sx={{ display: "flex" }}>
                        <Box
                            component={"span"}
                            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <img style={{ height: "16px" }} src={Imagestar}></img>
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "18px",
                                letterSpacing: "0.096px",
                            }}
                            variant="subtitle1"
                            color="text.secondary"
                            component="h4"
                        >
                            &nbsp; reviews &nbsp; |&nbsp; Rating
                        </Typography>
                    </Box>
                    {/* <Typography variant="subtitle1" color="text.secondary" component="h4">
                                {"rating"}
                            </Typography> */}
                </CardContent>
            </Card>
        </Box>
    );
};

// Drcard.defaultProps = {
//     DrData : {},
// };

Drcard.propTypes = {
    DrData: PropTypes.object,
};

export default Drcard;

// import React from 'react';
// import "./drcard.scss";

// export const Drcard =    DrData) => {
//     console.log  DrData);
//     const [ id, image , name ,hospital,specialist,rating ,reviews] = [
//                                                                              DrData.id ,
//                                                                              DrData.drimage ,
//                                                                              DrData.name ,
//                                                                              DrData.hospital ,
//                                                                              DrData.specialist,
//                                                                              DrData.rating,
//                                                                              DrData.reviews
//                                                                     ];

//     return (
//         <>
//             <div className='dr-card-container' key={id}>
//                 <div className='dr-card-container'>
//                     <img src={image}></img>
//                 </div>
//                 <div className='card-data-container'>
//                     <h2>{name}</h2>
//                     <h3>{specialist}  |  {hospital}</h3>
//                     <h4>{rating} {reviews}</h4>
//                 </div>
//             </div>
//         </>
//     );
// };
