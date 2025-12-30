import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./drdetailscard.scss";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ContainerOne from "./DoctorDetailContainerOne";
import ContainerTwo from "./DoctorDetailContainerTwo";
import ContainerThree from "./DoctorDetailContainerThree";
import ContainerFour from "./DoctorDetailContainerFour";
import DrImage from "../../static/images/DrImages/doctor_alter.jpeg";
import axiosInstance from "../../config/axiosInstance"; // Handles access token automatically
import { formatDateDay, formatTime } from "../../constants/const";
import logger from "../../utils/logger"; // Centralized logging
import toastService from "../../services/toastService"; // Toast notifications

/**
 * DrDetailsCard Component
 * 
 * Displays detailed information about a doctor
 * Features:
 * - Fetches doctor details by ID from API
 * - Shows doctor profile (name, image, qualification)
 * - Displays statistics (ratings, consultations, reviews)
 * - Shows reviews and description
 * - Displays education, license, awards, and experience
 * 
 * API Endpoints:
 * - POST /sec/patient/DashboardDoctordetailsbyId (with suid parameter)
 * 
 * @component
 */
const DrDetailsCard = () => {
    logger.debug("🔵 DrDetailsCard component rendering");
    
    const params = useParams();
    const doctorID = params.resID;
    
    logger.debug("👤 Doctor ID from params", { doctorID });

    // State for doctor details
    const [drCardData, setDrCardData] = useState(null);
    const [review, setReview] = useState([]);
    const [loading, setloading] = useState(false);
    const [doctorLicense, setDoctorLicense] = useState([]);
    const [doctorAward, setDoctorAward] = useState([]);
    const [doctorExperience, setDoctorExperience] = useState([]);
    const [doctorTotalconsultations, setDoctorTotalconsultations] = useState(0);
    const [doctorAverageRating, setDoctorAverageRating] = useState(0);
    const [doctorTotalReviews, setDoctorTotalReviews] = useState(0);
    const [doctorTotalExperience, setDoctorTotalExperience] = useState(0);

    /**
     * Fetch doctor details by ID from API
     * Retrieves comprehensive doctor information including:
     * - Profile details (name, image, qualification)
     * - Statistics (ratings, consultations, reviews)
     * - Reviews and descriptions
     * - Education, license, awards, experience
     */
    const fetchDataNew = async () => {
        logger.debug("📡 Fetching doctor details", { doctorID });
        setloading(true);
        
        try {
            // Validate doctor ID
            if (!doctorID) {
                logger.error("❌ Doctor ID is missing");
                toastService.error("Doctor ID is required");
                setloading(false);
                return;
            }
            
            const response = await axiosInstance.post(
                `/sec/patient/DashboardDoctordetailsbyId`,
                { suid: Number(doctorID) },
                { headers: { 'Content-Type': 'application/json' } }
            );
            
            logger.debug("✅ Doctor details fetched successfully", {
                hasData: !!response?.data?.response,
                hasLicenses: (response?.data?.doctorLicense || []).length > 0,
                hasAwards: (response?.data?.doctorAwards || []).length > 0,
                hasExperience: (response?.data?.doctorExperience || []).length > 0
            });
            
            // Set doctor card data
            setDrCardData(response.data.response);
            
            // Set licenses, awards, and experience
            setDoctorLicense(response?.data?.doctorLicense || []);
            setDoctorAward(response?.data?.doctorAwards || []);
            setDoctorExperience(response?.data?.doctorExperience || []);
            
            // Set review data
            setReview(response?.data?.doctorReviewData || []);
            
            // Set statistics
            setDoctorTotalconsultations(response?.data?.doctorTotalconsultations || 0);
            setDoctorAverageRating(response?.data?.doctorAverageRating || 0);
            setDoctorTotalReviews(response?.data?.doctorTotalReviews || 0);
            setDoctorTotalExperience(response?.data?.doctorTotalExperience || 0);
            
            toastService.success("Doctor details loaded successfully");
        } catch (error) {
            logger.error("❌ Failed to fetch doctor details:", error);
            toastService.error("Failed to load doctor details");
            
            // Set fallback values
            setDrCardData(null);
            setReview([]);
            setDoctorLicense([]);
            setDoctorAward([]);
            setDoctorExperience([]);
        } finally {
            setloading(false);
        }
    };
    /**
     * Fetch doctor details on mount or when doctorID changes
     */
    useEffect(() => {
        logger.debug("🔵 DrDetailsCard useEffect triggered", { doctorID });
        
        if (doctorID) {
            fetchDataNew();
        } else {
            logger.warn("⚠️ Doctor ID is not available");
            toastService.error("Invalid doctor ID");
            setloading(false);
        }
    }, [doctorID]);

    /**
     * Debug logging - only in development mode
     */
    if (process.env.NODE_ENV === 'development') {
        logger.debug("🔍 DrDetailsCard state:", {
            doctorID,
            hasCardData: !!drCardData,
            licensesCount: doctorLicense.length,
            awardsCount: doctorAward.length,
            experienceCount: doctorExperience.length,
            reviewsCount: review.length,
            loading
        });
    }

    const classes = useStyles();
    const navigate = useNavigate();
    
    /**
     * Handle dialog open/close state
     * 
     * @param {boolean} condition - Dialog open state
     */
    const handleOpen = (condition) => {
        logger.debug("🔔 Dialog state changed", { open: condition });
        setOpenDialog(condition);
    };
    
    const drimg = DrImage; // Default doctor image
    const [openDialog, setOpenDialog] = useState(false); // Dialog state
    return (
        <>
            <Box sx={{ width: "100%", height: "100%" }}>
                {/* Container 1: Doctor Profile */}
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
                />
                
                {/* Container 2: Doctor Statistics */}
                <ContainerTwo
                doctorAverageRating={doctorAverageRating}
                doctorTotalconsultations={doctorTotalconsultations}
                doctorTotalReviews={doctorTotalReviews}
                doctorTotalExperience={doctorTotalExperience}
                    isLoading={loading}
                />

                {/* Container 3: Reviews and Description */}
                <ContainerThree 
                    review={review}
                    description={drCardData?.[0]?.description || drCardData?.description}
                    isLoading={loading}
                />
                
                {/* Container 4: Education, License, Awards, Experience */}
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

export default DrDetailsCard;
