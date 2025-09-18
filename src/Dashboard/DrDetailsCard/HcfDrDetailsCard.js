import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ContainerOne from "./ContainerOne";
import ContainerTwo from "./ContainerTwo";
import ContainerThree from "./ContainerThree";
import ContainerFour from "./ContainerFour";
import axiosInstance from "../../config/axiosInstance";
import { formatDateDay, formatTime } from "../../constants/const";

const HcfDrDetailsCard = () => {
    const params = useParams();
    const ID = params.hcddocid;
    const [drCardData, setDrCardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [doctorLicense, setDoctorLicense] = useState([]);
    const [review, setReview] = useState();

    const [doctorAward, setDoctorAward] = useState([]);
    const [doctorExperience, setDoctorExperience] = useState([]);
    const [doctorTotalconsultations, setDoctorTotalconsultations] = useState();
    const [doctorAverageRating, setDoctorAverageRating] = useState();
    const [doctorTotalReviews, setDoctorTotalReviews] = useState();
    const [doctorTotalExperience, setDoctorTotalExperience] = useState(); // loading state for skeletons

    const fetchDataNew = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                `/sec/patient/DashboardDoctordetailsbyId`,
                JSON.stringify({ suid: ID }),
            );
            setDrCardData(response.data.response);
            setDoctorLicense(response?.data?.doctorLicense),
                setDoctorAward(response?.data?.doctorAwards),
                setDoctorExperience(response?.data?.doctorExperience);
            setReview(response?.data?.doctorReviewData);
            setDoctorTotalconsultations(response?.data?.doctorTotalconsultations);
            setDoctorAverageRating(response?.data?.doctorAverageRating);
            setDoctorTotalReviews(response?.data?.doctorTotalReviews);
            setDoctorTotalExperience(response?.data?.doctorTotalExperience);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataNew();
    }, []);
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {/* 1st Container */}
            {loading ? (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={128}
                    sx={{ borderRadius: 2, mb: 2 }}
                />
            ) : (
                <ContainerOne
                    Fname={drCardData?.first_name}
                    Mname={drCardData?.middle_name}
                    Lname={drCardData?.last_name}
                    Qualification={drCardData?.department_name}
                    DrImage={drCardData?.profile_picture}
                    DrId={drCardData?.suid}
                    hcfDoc={true}
                    hospital={drCardData?.hospital_org}
                    worktime={`${formatDateDay(drCardData?.working_days_start)} - ${formatDateDay(
                        drCardData?.working_days_end,
                    )} | ${formatTime(drCardData?.working_time_start)} to ${formatTime(
                        drCardData?.working_time_end,
                    )}`}
                />
            )}

            {/* 2nd Container */}
            {loading ? (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={128}
                    sx={{ borderRadius: 2, mb: 2 }}
                />
            ) : (
                <ContainerTwo
                    doctorAverageRating={doctorAverageRating}
                    doctorTotalconsultations={doctorTotalconsultations}
                    doctorTotalReviews={doctorTotalReviews}
                    doctorTotalExperience={doctorTotalExperience}
                    isLoading={loading} // Pass isLoading prop to Container1
                />
            )}

            {/* 3rd Container */}
            {loading ? (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={128}
                    sx={{ borderRadius: 2, mb: 2 }}
                />
            ) : (
                <ContainerThree
                    review={review}
                    description={drCardData?.description}
                    isLoading={loading}
                />
            )}

            {/* 4th Container */}
            {loading ? (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={200}
                    sx={{ borderRadius: 2, mb: 2 }}
                />
            ) : (
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
            )}
        </Box>
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
        border: "1px solid #E6E1E5",
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

export default HcfDrDetailsCard;
