/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { baseURL, data } from "../../constants/const";

// import SingleLineGridList from "./Crousal";
import "./drdetailscard.scss";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import personIcon from "../../static/images/person.png";
import messageIcon from "../../static/images/message.png";
import starIcon from "../../static/images/star.png";
import bagIcon from "../../static/images/bag.png";
import ContainerOne from "./ContainerOne";
import ContainerTwo from "./ContainerTwo";
import ContainerThree from "./ContainerThree";
import ContainerFour from "./ContainerFour";
import axios from "axios";

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

const DrDetailsCard = () => {
    const params = useParams();
    const ID = params.resID;
    console.log(ID);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get(
    //             "http://localhost:3000/sec/getDoctordetailscompleteall",
    //         );
    //         console.log( "Dr Details" , response);
    //         // setCardData(response?.data?.response);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // };

    const [drCardData, setDrCardData] = useState();

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get(
    //             `http://localhost:3000/sec/getDoctordetailscompleteall/${ID}`,
    //         );
    //         // console.log("Response Received : " , response.data.response[0]);
    //         // setDrCardData(response.data.response[0]);
    //         // console.log( "DrDetarisl" , drCardData);
    //         // setCardData(response?.data?.response);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // };

    const fetchDataNew = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/sec/patient/DashboardDoctordetailsbyId/${ID}`,
            );
            console.log("Response Received Doctor Details : ", response?.data?.response[0]);
            setDrCardData(response.data.response[0]);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        // fetchData();
        fetchDataNew();
    }, [ID]);

    const classes = useStyles();
    const navigate = useNavigate();
    // console.log(data);
    const handleOpen = (condition) => {
        setOpenDialog(condition);
    };

    const [openDialog, setOpenDialog] = useState(false);
    return (
        <>
            <Box sx={{ width: "100%", height: "100%" }}>
                {/* 1st Container */}
                <ContainerOne
                    Fname={drCardData?.first_name}
                    Mname={drCardData?.middle_name}
                    Lname={drCardData?.last_name}
                    Qualification={drCardData?.qualification}
                />

                {/* <CallCardData CardData={data} textField={"Near you"} /> */}
                {/* 2nd container  */}
                <ContainerTwo />

                {/* 3rd container */}
                <ContainerThree />

                {/* 4th container 1st card */}
                <ContainerFour
                    Qualification={drCardData?.qualification}
                    RegDate={drCardData?.reg_date}
                    Description={drCardData?.description}
                    StateReg={drCardData?.state_reg_number}
                    CountryReg={drCardData?.country_reg_number}
                    University={drCardData?.university_name}
                    DepartmentName={drCardData?.department_name}
                    Gender={drCardData?.gender}
                />
            </Box>
        </>
    );
};

export default DrDetailsCard;
