import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./drdetailscard.scss";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ContainerOne from "./HCFDoctorDetailContainerOne";
import ContainerTwo from "./HCFDoctorDetailContainerTwo";
import ContainerThree from "./HCFDoctorDetailContainerThree";
import ContainerFour from "./HCFDoctorDetailContainerFour";
import DrImage from "../../../../static/images/DrImages/doctor_alter.jpeg";
import axiosInstance from "../../../../config/axiosInstance"; // Handles access token automatically
import { formatDateDay, formatTime } from "../../../../constants/const";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications
import Loading from "../../../../components/Loading/Loading"; // Reusable loader component

/**
 * HcfDrDetailsCard Component
 * 
 * Displays detailed information about a doctor within an HCF context
 * Features:
 * - Fetch and display doctor details by ID
 * - Doctor profile information
 * - Ratings and reviews
 * - Qualifications and experience
 * - Licenses and awards
 * 
 * API Endpoints:
 * - POST /sec/patient/DashboardDoctordetailsbyId (fetch doctor details)
 * 
 * Security:
 * - Uses axiosInstance (automatic JWT token injection) ✅
 * - Validates doctor ID and HCF ID before API calls
 * 
 * Error Handling:
 * - Loading states with reusable loader ✅
 * - Error states with user-friendly messages ✅
 * - Toast notifications for errors ✅
 * 
 * @component
 */
const HcfDrDetailsCard = () => {
    logger.debug("🔵 HcfDrDetailsCard component rendering");
    
    const params = useParams();
    const doctorID = params.hcddocid;
    const hcfID = params.reshcfID;
    
    logger.debug("🔍 HCF Doctor Details Params extracted", {
        doctorID,
        hcfID,
        allParams: params
    });
    
    /**
     * Validate doctor ID and HCF ID from URL parameters
     * Ensures IDs are present and valid before making API calls
     */
    const validateIds = () => {
        if (!doctorID) {
            logger.warn("⚠️ Doctor ID not found in URL parameters");
            toastService.warning("Doctor ID is missing");
            return false;
        }
        
        if (!hcfID) {
            logger.warn("⚠️ HCF ID not found in URL parameters");
            toastService.warning("HCF ID is missing");
            return false;
        }
        
        // Validate ID types
        if (typeof doctorID !== 'string' && typeof doctorID !== 'number') {
            logger.error("❌ Invalid doctor ID type:", typeof doctorID);
            return false;
        }
        
        logger.debug("✅ IDs validated successfully", { doctorID, hcfID });
        return true;
    };

    // State management
    const [drCardData, setDrCardData] = useState(null);
    const [review, setReview] = useState([]);
    const [loading, setloading] = useState(false);
    const [isError, setIsError] = useState(false); // Track error state
    const [doctorLicense, setDoctorLicense] = useState([]);
    const [doctorAward, setDoctorAward] = useState([]);
    const [doctorExperience, setDoctorExperience] = useState([]);
    const [doctorTotalconsultations, setDoctorTotalconsultations] = useState(0);
    const [doctorAverageRating, setDoctorAverageRating] = useState(0);
    const [doctorTotalReviews, setDoctorTotalReviews] = useState(0);
    const [doctorTotalExperience, setDoctorTotalExperience] = useState(0);

    /**
     * Fetch doctor details from API
     * Loads comprehensive doctor information including profile, ratings, licenses, etc.
     */
    const fetchDataNew = async () => {
        // Validate IDs before fetching
        if (!validateIds()) {
            setIsError(true);
            setloading(false);
            return;
        }
        
        logger.debug("📡 Fetching HCF doctor details", { doctorID, hcfID });
        setloading(true);
        setIsError(false);
        
        try {
            const response = await axiosInstance.post(
                `/sec/patient/DashboardDoctordetailsbyId`,
                { suid: Number(doctorID) },
                { 
                    headers: { 
                        'Content-Type': 'application/json' 
                    } 
                }
            );
            
            logger.debug("✅ Doctor details API response received", {
                hasResponse: !!response?.data?.response,
                hasLicense: !!response?.data?.doctorLicense,
                hasAwards: !!response?.data?.doctorAwards,
                hasExperience: !!response?.data?.doctorExperience,
            });
            
            // Handle both array and object response structures
            const responseData = response?.data?.response;
            if (Array.isArray(responseData) && responseData.length > 0) {
                setDrCardData(responseData);
                logger.debug("✅ Doctor data set as array", { length: responseData.length });
            } else if (responseData && typeof responseData === 'object') {
                setDrCardData([responseData]); // Wrap single object in array
                logger.debug("✅ Doctor data set as object (wrapped in array)");
            } else {
                logger.warn("⚠️ Invalid doctor data structure");
                setIsError(true);
                toastService.warning("Invalid doctor data received");
                return;
            }
            
            // Set additional doctor information
            setDoctorLicense(response?.data?.doctorLicense || []);
            setDoctorAward(response?.data?.doctorAwards || []);
            setDoctorExperience(response?.data?.doctorExperience || []);
            setReview(response?.data?.doctorReviewData || []);
            setDoctorTotalconsultations(response?.data?.doctorTotalconsultations || 0);
            setDoctorAverageRating(response?.data?.doctorAverageRating || 0);
            setDoctorTotalReviews(response?.data?.doctorTotalReviews || 0);
            setDoctorTotalExperience(response?.data?.doctorTotalExperience || 0);
            
            logger.debug("✅ Doctor details extracted successfully", {
                hasLicense: doctorLicense.length > 0,
                hasAwards: doctorAward.length > 0,
                hasExperience: doctorExperience.length > 0,
                reviewsCount: review.length,
                consultations: doctorTotalconsultations,
                rating: doctorAverageRating
            });
            
            toastService.success("Doctor details loaded successfully");
        } catch (error) {
            logger.error("❌ Failed to fetch doctor details:", error);
            
            // Extract error message from response
            const errorMessage = error?.response?.data?.message || 
                                error?.response?.data?.error || 
                                "Failed to load doctor details. Please try again later.";
            
            setIsError(true);
            toastService.error(errorMessage);
        } finally {
            setloading(false);
        }
    };
    
    /**
     * Fetch doctor data on component mount when doctorID is available
     */
    useEffect(() => {
        if (doctorID) {
            fetchDataNew();
        } else {
            logger.warn("⚠️ Doctor ID not available, skipping data fetch");
            setIsError(true);
            setloading(false);
        }
    }, [doctorID]);

    const classes = useStyles();
    const navigate = useNavigate();
    const drimg = DrImage;

    // Extract doctor data with fallback handling
    const doctorData = drCardData?.[0] || drCardData || {};
    
    logger.debug("🔍 Doctor data extracted for rendering", {
        hasFirstName: !!doctorData.first_name,
        hasProfilePicture: !!doctorData.profile_picture,
        licensesCount: doctorLicense.length,
        awardsCount: doctorAward.length,
    });

    return (
        <>
            <Box sx={{ width: "100%", height: "100%" }}>
                {/* Loading State - Shows reusable loader component */}
                {loading && !isError ? (
                    <Loading
                        variant="overlay"
                        size="large"
                        message="Loading Doctor Details"
                        subMessage="Please wait while we fetch the doctor information..."
                        fullScreen={false}
                    />
                ) : isError ? (
                    /* Error State - User-friendly error message */
                    <Box sx={{ 
                        padding: 4, 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "300px"
                    }}>
                        <Typography variant="h6" color="error.main" gutterBottom>
                            Unable to Load Doctor Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            We encountered an error while fetching the doctor information.
                            Please try again later or contact support if the problem persists.
                        </Typography>
                    </Box>
                ) : (
                    /* Main Content - Doctor Details Display */
                    <>
                        {/* Container 1: Doctor Profile Information */}
                        <ContainerOne
                            isLoading={loading}
                            Fname={doctorData.first_name}
                            Mname={doctorData.middle_name}
                            Lname={doctorData.last_name}
                            Qualification={doctorData.department_name}
                            DrImage={doctorData.profile_picture || drimg}
                            DrId={doctorData.suid}
                            hospital={doctorData.hospital_org}
                            worktime={`${formatDateDay(doctorData.working_days_start)} - ${formatDateDay(doctorData.working_days_end)} | ${formatTime(doctorData.working_time_start)} to ${formatTime(doctorData.working_time_end)}`}
                            hcfDoc={true} // ✅ Add hcfDoc prop for HCF doctor appointments
                        />
                        
                        {/* Container 2: Doctor Statistics (Ratings, Consultations, etc.) */}
                        <ContainerTwo
                            doctorAverageRating={doctorAverageRating}
                            doctorTotalconsultations={doctorTotalconsultations}
                            doctorTotalReviews={doctorTotalReviews}
                            doctorTotalExperience={doctorTotalExperience}
                            isLoading={loading}
                        />

                        {/* Container 3: Doctor Reviews and Description */}
                        <ContainerThree 
                            review={review}
                            description={doctorData.description}
                            isLoading={loading}
                        />
                        
                        {/* Container 4: Doctor Qualifications, Licenses, Awards, and Experience */}
                        <ContainerFour
                            Qualification={doctorData.qualification}
                            YearOfQualification={doctorData.qualified_year}
                            RegDate={doctorData.reg_date}
                            StateReg={doctorData.state_reg_number}
                            CountryReg={doctorData.country_reg_number}
                            University={doctorData.university_name}
                            doctorLicense={doctorLicense}
                            doctorAward={doctorAward}
                            doctorExperience={doctorExperience}
                        />
                    </>
                )}
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
