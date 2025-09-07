/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { data } from "../../constants/const";

// import SingleLineGridList from "./Crousal";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Container1 from "./Container1";
import Container2 from "./Container2";
import Container3 from "./Container3";
import Container4 from "./Container4";
import Container5 from "./Container5";
import messageIcon from "../../../../constants/DrImages/message.svg";
import bagIcon from "../../../../constants/DrImages/bag.svg";
import starIcon from "../../../../constants/DrImages/Group 92.svg";

const DrExp = [
    {
        // logo: personIcon,
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
    // BookAppointmentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // },
    // BookAppointmentContainerDetails: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-end",
    // },
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

const HCFDetailedCard = () => {
    const params = useParams();
    const ID = params.hcfID;
    console.log(ID);

    const [hcfData, setHCFDataId] = useState();

    const fetchDataHCFCardsId = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(
                `${baseURL}/sec/patient/DashboardHcfdetailsbyId/${ID}`,
            );
            console.log("Fetch the response : ", response?.data?.response);
            setHCFDataId(response?.data?.response);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        fetchDataHCFCardsId();
    }, [ID]);

    // const classes = useStyles();
    // const navigate = useNavigate();
    // // console.log(data);
    // const handleOpen = (condition) => {
    //     setOpenDialog(condition);
    // };
    return (
        <>
            <Box sx={{ width: "100%", height: "100%" }}>
                <Container1 Fname={"Apollo Hospital"} Qualification={"Pediatric"}></Container1>
                 <Container2 number={DrEx} />
                <Container4 sx={{ marginTop: "-50px" }} />
            </Box>
        </>
    );
};

export default HCFDetailedCard;
