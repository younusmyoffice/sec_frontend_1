import { Box } from "@mui/material";
import React, { Fragment, useState } from "react";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/custom-button";
// import { data } from "../../constants/const";
// import dotLogo from "../../static/images/avatar.png";
// import DrImage from "../../static/images/doctor.png";
import CustomModal from "../CustomModal/custom-modal";
import AppointmentSlider from "./appointmentSlider";

const bookAppointmentmodal = () => {
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

    // const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    // const [openPatientDetails, setPatientDetails] = useState(false);
    const dropdownItems = ["item1", "item2", "item3"];
    // const [activeDropdown, setActiveDropdown] = useState("");
    // const [ageDropDown, setAgeDropDown] = useState();
    const radioValues = ["My self"];
    // const [radioVal, setRadioVal] = useState(radioValues[0]);
    // const [activeFabDropdown, setActiveFabDropdown] = useState(dropdownItems[0]);

    // const [DateValue, setDataValue] = useState(null);

    // const [activeStep, setActiveStep] = React.useState(0);
    // const [skipped, setSkipped] = React.useState(new Set());

    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%" }}>
            {/* Button Container */}

            {/* <CustomButton
                                    component={"h3"}
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "24px",
                                        color: "#AEAAAE",
                                    }}
                                    label="Book Appointment"
                                ></CustomButton> */}
            {/* <Box sx={{width : "100%" , display : "flex" , justifyContent : "flex-end" , alignItems : "center"}} >
                                    <BookAppointmentModal/>
                                </Box> */}

            <CustomButton
                label={"Book Appointment"}
                isElevated
                handleClick={() => setOpenDialog(!openDialog)}
            />
            <CustomModal
                isOpen={openDialog}
                // title={"Book Appointment"}
                footer={
                    <Fragment>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* <CustomButton
                                            label="Next"
                                            handleClick={() =>
                                                setPatientDetails(!openPatientDetails)
                                            }
                                        /> */}
                        </Box>
                    </Fragment>
                }
            >
                <Box>
                    <AppointmentSlider />
                </Box>
            </CustomModal>
        </Box>
    );
};

export default bookAppointmentmodal;
