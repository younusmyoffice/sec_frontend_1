import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
// import SingleLineGridList from "./Crousal";
import "./drdetailscard.scss";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ContainerOne from "./ContainerOne";
import ContainerTwo from "./ContainerTwo";
import ContainerThree from "./ContainerThree";
import ContainerFour from "./ContainerFour";
import DrImage from "../../static/images/DrImages/doctor_alter.jpeg";
import axiosInstance from "../../config/axiosInstance";
import { formatDateDay, formatTime } from "../../constants/const";

const DrDetailsCard = () => {
    const params = useParams();
    const ID = params.resID;
    console.log(ID);

    const [drCardData, setDrCardData] = useState();
    const [review, setReview] = useState();
    const [loading, setloading] = useState(false);
    const [doctorLicense, setDoctorLicense] = useState([]);
    const [doctorAward, setDoctorAward] = useState([]);
    const [doctorExperience, setDoctorExperience] = useState([]);
    const [doctorTotalconsultations, setDoctorTotalconsultations] = useState();
    const [doctorAverageRating, setDoctorAverageRating] = useState();
    const [doctorTotalReviews, setDoctorTotalReviews] = useState();
    const [doctorTotalExperience, setDoctorTotalExperience] = useState();

    const fetchDataNew = async () => {
        setloading(true);
        try {
            const response = await axiosInstance.post(
                `/sec/patient/DashboardDoctordetailsbyId`,
                JSON.stringify({
                    suid: ID,
                }),
            );
            console.log("Response Received Doctor Details : ", response?.data?.response[0]);
            setDrCardData(response.data.response);
            setDoctorLicense(response?.data?.doctorLicense),
            setDoctorAward(response?.data?.doctorAwards),
            setDoctorExperience(response?.data?.doctorExperience)
            setReview(response?.data?.doctorReviewData)
            setDoctorTotalconsultations(response?.data?.doctorTotalconsultations)
            setDoctorAverageRating(response?.data?.doctorAverageRating)
            setDoctorTotalReviews(response?.data?.doctorTotalReviews)
            setDoctorTotalExperience(response?.data?.doctorTotalExperience)

        } catch (error) {
            console.log("Dr detauils error", error.response);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        fetchDataNew();
    }, []);
console.log("doctorLicense",doctorLicense)
console.log("doctorAward",doctorAward)
console.log("doctorExperience",doctorExperience)

    const classes = useStyles();
    const navigate = useNavigate();
    const handleOpen = (condition) => {
        setOpenDialog(condition);
    };
    const drimg = DrImage;

    const [openDialog, setOpenDialog] = useState(false);
    return (
        <>
            <Box sx={{ width: "100%", height: "100%" }}>
                {/* 1st Container */}
                <ContainerOne
                    isLoading={loading} // Pass isLoading prop to Container1
                    Fname={drCardData?.first_name}
                    Mname={drCardData?.middle_name}
                    Lname={drCardData?.last_name}
                    Qualification={drCardData?.department_name}
                    DrImage={drCardData?.profile_picture || drimg}
                    DrId={drCardData?.suid}
                    hospital={drCardData?.hospital_org}
                    worktime={`${formatDateDay(drCardData?.working_days_start)} - ${formatDateDay(drCardData?.working_days_end)} | ${formatTime(drCardData?.working_time_start)} to ${formatTime(drCardData?.working_time_end)}`}
                />
                {/* 2nd container  */}
                <ContainerTwo
                doctorAverageRating={doctorAverageRating}
                doctorTotalconsultations={doctorTotalconsultations}
                doctorTotalReviews={doctorTotalReviews}
                doctorTotalExperience={doctorTotalExperience}
                    isLoading={loading} // Pass isLoading prop to Container1
                />

                {/* 3rd container */}
                <ContainerThree 
                review={review}
                description={drCardData?.description}
                isLoading={loading} // Pass isLoading prop to Container1
/>
                {/* 4th container 1st card */}
                <ContainerFour
                    Qualification={drCardData?.qualification}
                    YearOfQualification={drCardData?.qualified_year}
                    RegDate={drCardData?.reg_date}
                    StateReg={drCardData?.state_reg_number}
                    CountryReg={drCardData?.country_reg_number}
                    University={drCardData?.university_name}
                    doctorLicense={doctorLicense}
                    doctorAward={doctorAward}
                    doctorExperience={doctorExperience}
                />
            </Box>
        </>
    );
};

const useStyles = makeStyles({
    html: {
        background: "#ffff",
    },
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
});

export default DrDetailsCard;
