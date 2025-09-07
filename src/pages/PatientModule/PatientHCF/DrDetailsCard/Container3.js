import { Box, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../../../components/CustomButton/custom-button";
import CustomModal from "../../../../components/CustomModal/custom-modal";
// import SingleLineGridList from "./Crousal";
import personIcon from "../../../../constants/DrImages/icon.svg";
import messageIcon from "../../../../constants/DrImages/message.svg";
import bagIcon from "../../../../constants/DrImages/bag.svg";
import HCFStepper from "./HCFStepper";
import starIcon from "../../../../constants/DrImages/Group 92.svg";

const Container3 = ({ test_id, about, amount, service_day_from, service_day_to }) => {
    const [openDialog, setOpenDialog] = useState(false);
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
        const classes = useStyles();
        const navigate = useNavigate();
        // console.log(data);
        const handleOpen = (condition) => {
            // setOpenDialog(condition);
        };
    };

    return (
        <Box sx={{ width: "100%", display: "flex", marginTop: "20px" }}>
            {/* About me container */}

            {/* Reviews container */}
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    marginLeft: "1%",
                    border: "1px solid #E6E1E5",
                    padding: "2%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "24px",
                    }}
                >
                    Test Name
                    <Box sx={{ color: "gray", fontWeight: "light" }}>Price: {amount}</Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Typography
                        sx={{
                            textAlign: "left",
                            fontFamily: "Poppins",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "21px" /* 150% */,
                            color: "#939094",
                            marginTop: "1%",
                        }}
                    >
                        Timing :Mon to Friday,1:00pm to 3:00
                        <Typography sx={{ display: "flex", marginTop: "2%" }}>
                            Description : {about}{" "}
                        </Typography>
                    </Typography>
                    {/* <CustomButton label="Buy"   buttonCss={{marginLeft:"150px",width:"50px",height:"40px",marginTop:"50px"}}></CustomButton> */}
                    <CustomButton
                        label={"Buy"}
                        isElevated
                        buttonCss={{ height: "40px", display: "block", margin: "auto" }}
                        handleClick={() => setOpenDialog(true)}
                    />
                    <CustomModal
                        isOpen={openDialog}
                        title={"dialog title"}
                        footer={<Fragment></Fragment>}
                    >
                        <div>
                            <HCFStepper />
                        </div>
                    </CustomModal>
                </Box>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    marginLeft: "1%",
                    border: "1px solid #E6E1E5",
                    padding: "2%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "24px",
                    }}
                >
                    {test_id}
                    <Box sx={{ color: "gray", fontWeight: "light" }}>Price: $200</Box>
                </Box>

                <Box sx={{ display: "flex" }}>
                    <Typography
                        sx={{
                            textAlign: "left",
                            fontFamily: "Poppins",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "21px" /* 150% */,
                            color: "#939094",
                            marginTop: "1%",
                        }}
                    >
                        Timing :{service_day_from}, {service_day_to}
                        <Typography sx={{ display: "flex", marginTop: "2%" }}>
                            Description : {about}{" "}
                        </Typography>
                    </Typography>

                    <CustomButton
                        label={"Buy"}
                        isElevated
                        buttonCss={{ height: "40px", display: "block", margin: "auto" }}
                        handleClick={() => setOpenDialog(true)}
                    />
                    {/* <CustomModal
                            isOpen={openDialog}
                            title={"dialog title"}
                            footer={
                                <Fragment>
                                
                                </Fragment>
                            }
                        >
                            <div>
                            <HCFStepper/>
                            </div>
                        </CustomModal> */}
                </Box>
            </Box>
        </Box>
    );
};

export default Container3;
