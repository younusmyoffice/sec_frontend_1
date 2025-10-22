import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./drdetailscard.scss";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ContainerOne from "./HCFDoctorDetailContainerOne";
import ContainerTwo from "./HCFDoctorDetailContainerTwo";
import ContainerThree from "./HCFDoctorDetailContainerThree";
import ContainerFour from "./HCFDoctorDetailContainerFour";
import DrImage from "../../../../static/images/DrImages/doctor_alter.jpeg";
import axiosInstance from "../../../../config/axiosInstance";
import { formatDateDay, formatTime } from "../../../../constants/const";

const HcfDrDetailsCard = () => {
    const params = useParams();
    console.log("🔍 HCF Doctor Details Params:", params);
    const doctorID = params.hcddocid;
    const hcfID = params.reshcfID;
    console.log("🔍 HCF Doctor Details - Doctor ID:", doctorID, "HCF ID:", hcfID);

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
            console.log("doctorID in fetchDataNew", doctorID);
            const response = await axiosInstance.post(
                `/sec/patient/DashboardDoctordetailsbyId`,
                { suid: Number(doctorID) },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("✅ HCF Doctor Response:", response?.data?.response);
            console.log("✅ Full HCF Doctor API Response:", response?.data);
            
            // Handle both array and object response structures
            const responseData = response?.data?.response;
            if (Array.isArray(responseData)) {
                setDrCardData(responseData);
            } else {
                setDrCardData([responseData]); // Wrap single object in array
            }
            setDoctorLicense(response?.data?.doctorLicense || []);
            setDoctorAward(response?.data?.doctorAwards || []);
            setDoctorExperience(response?.data?.doctorExperience || []);
            setReview(response?.data?.doctorReviewData || []);
            setDoctorTotalconsultations(response?.data?.doctorTotalconsultations || 0);
            setDoctorAverageRating(response?.data?.doctorAverageRating || 0);
            setDoctorTotalReviews(response?.data?.doctorTotalReviews || 0);
            setDoctorTotalExperience(response?.data?.doctorTotalExperience || 0);

        } catch (error) {
            console.log("Dr detauils error", error.response);
        } finally {
            setloading(false);
        }
    };
console.log("doctorID in useEffect", doctorID);
    useEffect(() => {
        
        if (doctorID) {
            fetchDataNew();
        }
    }, [doctorID]);

    // Debug logging
    console.log("🔍 DrDetailsCard Debug:");
    console.log("  - doctorID:", doctorID);
    console.log("  - drCardData:", drCardData);
    console.log("  - doctorLicense:", doctorLicense);
    console.log("  - doctorAward:", doctorAward);
    console.log("  - doctorExperience:", doctorExperience);
    console.log("  - loading:", loading);

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
                    isLoading={loading}
                    Fname={drCardData?.[0]?.first_name || drCardData?.first_name}
                    Mname={drCardData?.[0]?.middle_name || drCardData?.middle_name}
                    Lname={drCardData?.[0]?.last_name || drCardData?.last_name}
                    Qualification={drCardData?.[0]?.department_name || drCardData?.department_name}
                    DrImage={drCardData?.[0]?.profile_picture || drCardData?.profile_picture || drimg}
                    DrId={drCardData?.[0]?.suid || drCardData?.suid}
                    hospital={drCardData?.[0]?.hospital_org || drCardData?.hospital_org}
                    worktime={`${formatDateDay(drCardData?.[0]?.working_days_start || drCardData?.working_days_start)} - ${formatDateDay(drCardData?.[0]?.working_days_end || drCardData?.working_days_end)} | ${formatTime(drCardData?.[0]?.working_time_start || drCardData?.working_time_start)} to ${formatTime(drCardData?.[0]?.working_time_end || drCardData?.working_time_end)}`}
                    hcfDoc={true} // ✅ Add hcfDoc prop for HCF doctor appointments
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
                    description={drCardData?.[0]?.description || drCardData?.description}
                    isLoading={loading}
                />
                {/* 4th container 1st card */}
                <ContainerFour
                    Qualification={drCardData?.[0]?.qualification || drCardData?.qualification}
                    YearOfQualification={drCardData?.[0]?.qualified_year || drCardData?.qualified_year}
                    RegDate={drCardData?.[0]?.reg_date || drCardData?.reg_date}
                    StateReg={drCardData?.[0]?.state_reg_number || drCardData?.state_reg_number}
                    CountryReg={drCardData?.[0]?.country_reg_number || drCardData?.country_reg_number}
                    University={drCardData?.[0]?.university_name || drCardData?.university_name}
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

export default HcfDrDetailsCard;
