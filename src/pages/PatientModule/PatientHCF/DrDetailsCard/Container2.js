import { Box,Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import personIcon from "../../../../constants/DrImages/icon.svg";
import messageIcon from "../../../../constants/DrImages/message.svg";
import bagIcon from "../../../../constants/DrImages/bag.svg";
import starIcon from "../../../../constants/DrImages/Group 92.svg"
// import SingleLineGridList from "./Crousal";
const DrExp = [
    {
        logo: personIcon,
        number: "4000+",
        type: "Patient",
    },
    {
        logo: bagIcon,
        number: "10+",
        type: "Experience",
    },
    {
        logo: starIcon,
        number: "4.8",
        type: "Rating",
    },
    {
        logo: messageIcon,
        number: "3027",
        type: "Reviews",
    },
];

const useStyles = makeStyles({
    drname: {
        color: "#313033",
        fontFamily: "Poppins",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "900",
        lineHeight: "30px",
    },
    specialist: {
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "24px",
    },
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-between",
    },
    BookAppointmentContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    BookAppointmentContainerDetails: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
    },
    fourthContainer: {
        width: "100%",
        border: "1px solid #E6E1E5 ",
        display: "flex",
        borderRadius: "8px",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "1%",
    },
    textField: {
        fontFamily: "Poppins",
        fontSize: "30px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "30px",
        color: "#313033",
        padding: "2% 0 1% 1%",
    },
    fourthInnerContainer: {
        display: "flex",
        width: "100%",
        alignItems: "flex-start",
        padding: "1%",
    },
    logoDesign: {
        height: "70px",
        width: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50px",
        backgroundColor: "#FDEAED",
    },
    // universityFields : {
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "flex-start",
    // }
});

const Container2 = () => {
    const DrDetailsCard = () => {
        const classes = useStyles();
        const navigate = useNavigate();
        console.log(data);
        const handleOpen = (condition) => {
            // setOpenDialog(condition);
        };
    };

    return (
        
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "5%" }}>
            {DrExp.map((fieldsData, index) => (
                <Box key={index} sx={{ display: "flex" }}>
                    {/* For image */}
                    <Box
                        sx={{
                            height: "56px",
                            width: "56px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#FDEAED",
                            borderRadius: "50px",
                        }}
                    >
                        <Box component={"img"} src={fieldsData.logo} />
                    </Box>
                    <Box
                        sx={{
                            marginLeft: "10%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography
                            component={"h3"}
                            sx={{
                                fontFamily: "Poppins",
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "30px",
                                color: "#E72B4A",
                            }}
                        >
                            {fieldsData.number}
                        </Typography>
                        <Typography component={"h4"}>{fieldsData.type}</Typography>
                    </Box>
               <Box style={{marginLeft:"40px"}}>
                </Box>
                  </Box>
             
            ))}
             
          </Box>

   
 );
};

export default Container2;
