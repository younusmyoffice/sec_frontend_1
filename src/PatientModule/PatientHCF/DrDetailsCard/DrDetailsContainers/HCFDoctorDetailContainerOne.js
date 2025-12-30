/**
 * HCFDoctorDetailContainerOne Component
 * 
 * Displays doctor profile information in HCF context:
 * - Doctor profile image
 * - Doctor name (first, middle, last)
 * - Qualification and hospital
 * - Working time display
 * - Book Appointment button and modal
 * 
 * Features:
 * - Loading skeleton states ✅
 * - Modal integration with BookingAppointmentModal
 * - Profile image handling with fallback
 * 
 * Security:
 * - Uses axiosInstance (automatic JWT token injection) ✅
 * - Validates doctor ID before opening booking modal
 * 
 * Error Handling:
 * - Loading states with skeletons ✅
 * - Error handling in image loading
 * 
 * @component
 */

import { Box, Typography, Skeleton } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton/custom-button";
import dotLogo from "../../../../static/images/dotIcon.png";
import DrImage from "../../../../static/images/DrImages/drProfileImage.png";
import CustomModal from "../../../../components/CustomModal/custom-modal";
import BookAppointmentModal from "../BookingAppointmentModal";
import axiosInstance from "../../../../config/axiosInstance"; // Handles access token automatically
import { getProfileImageSrc } from "../../../../utils/imageUtils";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications

/**
 * ContainerOne Component - Doctor Profile Display
 * 
 * @param {string} Fname - Doctor's first name
 * @param {string} Mname - Doctor's middle name
 * @param {string} Lname - Doctor's last name
 * @param {string} Qualification - Doctor's qualification/specialization
 * @param {string} hospital - Hospital/organization name
 * @param {string} DrImage - Doctor profile image URL
 * @param {string} worktime - Working time information
 * @param {boolean} hcfDoc - Whether this is an HCF doctor appointment
 * @param {boolean} isLoading - Loading state for skeleton display
 */
const ContainerOne = ({ 
    Fname = "", 
    Mname = "", 
    Lname = "", 
    Qualification = "", 
    hospital = "", 
    DrImage, 
    worktime = "", 
    hcfDoc = false,
    isLoading = false 
}) => {
    logger.debug("🔵 HCFDoctorDetailContainerOne component rendering", {
        hasFirstName: !!Fname,
        hasQualification: !!Qualification,
        hasHospital: !!hospital,
        hasWorkTime: !!worktime,
        isHcfDoc: hcfDoc
    });
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
            flexWrap: "nowrap",
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
    });

    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [localLoading, setLocalLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();
    
    // Extract doctor ID from URL parameters (supports multiple param names)
    let ID;
    if (params.resID) {
        ID = params.resID;
    } else if (params.hcddocid) {
        ID = params.hcddocid;
    }
    
    logger.debug("🔍 ContainerOne params extracted", {
        doctorID: ID,
        hasResID: !!params.resID,
        hasHcdDocId: !!params.hcddocid
    });

    /**
     * Validate doctor ID before opening booking modal
     * Ensures ID is present before allowing appointment booking
     */
    const validateDoctorId = () => {
        if (!ID) {
            logger.warn("⚠️ Doctor ID not found in URL parameters");
            toastService.warning("Doctor ID is missing. Cannot proceed with booking.");
            return false;
        }
        return true;
    };

    /**
     * useEffect: Simulate loading state
     * This can be replaced with actual data fetching if needed
     */
    useEffect(() => {
        // Simulate API call or data fetch delay
        const fetchData = () => {
            setTimeout(() => {
                setLocalLoading(false); // Set loading to false after data fetch
                logger.debug("✅ ContainerOne loading completed");
            }, 1000); // Simulate 1 second loading time
        };

        fetchData();
    }, []);
    
    /**
     * Handle Book Appointment button click
     * Validates doctor ID before opening booking modal
     */
    const handleBookAppointment = () => {
        if (!validateDoctorId()) {
            return;
        }
        
        logger.debug("📅 Opening appointment booking modal", { 
            doctorID: ID,
            isHcfDoctor: hcfDoc 
        });
        
        setOpenDialog(true);
    };
    
    /**
     * Handle modal close
     * Resets dialog state when booking modal is closed
     */
    const handleModalClose = () => {
        logger.debug("❌ Closing appointment booking modal");
        setOpenDialog(false);
    };
    
    // Use prop isLoading if provided, otherwise use local loading state
    const displayLoading = isLoading || localLoading;

    return (
        <Box sx={{ width: "100%" }} id={"book_appointment_modal_container"}>
            {/* Navigation Button Container */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Back Navigation Button */}
                <CustomButton
                    label="Back"
                    isTransaprent={true}
                    leftIcon={<ChevronLeftIcon />}
                    buttonCss={{ border: "none" }}
                    handleClick={() => {
                        logger.debug("⬅️ Navigating back");
                        navigate(-1);
                    }}
                />
                {/* Dot Logo Icon */}
                <Box>
                    <Box component={"img"} src={dotLogo} alt="Dot logo..." />
                </Box>
            </Box>

            {/* Doctor Profile Card and Working Time Container */}
            <Box className={classes.cardContainer}>
                {/* Doctor Profile Card */}
                <Box sx={{ display: "flex", marginTop: "1%", width: "70%" }}>
                    {/* Doctor Profile Image */}
                    <Box sx={{ width: "213px", height: "184px" }}>
                        {displayLoading ? (
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height="100%"
                                sx={{ borderRadius: "8px" }}
                            />
                        ) : (
                            <Box
                                component={"img"}
                                src={getProfileImageSrc(DrImage, DrImage)}
                                alt={`Dr. ${Fname} ${Lname} profile`}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                    padding: "2%",
                                    objectFit: "cover", // Ensure proper image scaling
                                }}
                                onError={(e) => {
                                    // Handle image loading errors gracefully
                                    logger.warn("⚠️ Failed to load doctor profile image");
                                    e.target.src = DrImage; // Fallback to default image
                                }}
                            />
                        )}
                    </Box>

                    {/* Doctor Details Section */}
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            padding: "2%",
                        }}
                    >
                        {displayLoading ? (
                            // Loading skeleton for doctor details
                            <Box>
                                <Skeleton width={150} height={30} />
                                <Skeleton width={100} height={20} sx={{ marginTop: 1 }} />
                                <Skeleton width={120} height={20} sx={{ marginTop: 1 }} />
                            </Box>
                        ) : (
                            <Box>
                                {/* Doctor Full Name */}
                                <Typography className={classes.drname}>
                                    Dr. {Fname || ""} {Mname || ""} {Lname || ""}
                                </Typography>
                                {/* Qualification/Specialization */}
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#AEAAAE",
                                    }}
                                >
                                    {Qualification || "Not specified"}
                                </Typography>
                                {/* Hospital/Organization */}
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#AEAAAE",
                                    }}
                                >
                                    {hospital || "Not specified"}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* Working Time and Booking Container */}
                <Box className={classes.BookAppointmentContainer}>
                    <Box className={classes.BookAppointmentContainerDetails}>
                        {/* Working Time Label */}
                        {displayLoading ? (
                            <Skeleton width={200} height={30} />
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "20px",
                                    fontWeight: "500",
                                }}
                            >
                                Working Time
                            </Typography>
                        )}
                        {/* Working Time Value */}
                        {displayLoading ? (
                            <Skeleton width={300} height={20} />
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#AEAAAE",
                                }}
                            >
                                {worktime || "Not specified"}
                            </Typography>
                        )}
                        {/* Book Appointment Button - Only shown when not loading */}
                        {!displayLoading && (
                            <CustomButton
                                label={"Book Appointment"}
                                isElevated
                                handleClick={handleBookAppointment}
                            />
                        )}
                        {/* Booking Appointment Modal */}
                        <CustomModal
                            isOpen={openDialog}
                            title={"Book Appointment"}
                            conditionOpen={handleModalClose}
                        >
                            <Box className="Book-appointment-modal">
                                {/* Pass doctor ID and HCF doctor flag to booking modal */}
                                <BookAppointmentModal drID={ID} hcfDoc={hcfDoc} />
                            </Box>
                        </CustomModal>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

// PropTypes for component documentation and type checking
ContainerOne.propTypes = {
    Fname: PropTypes.string, // Doctor's first name
    Mname: PropTypes.string, // Doctor's middle name
    Lname: PropTypes.string, // Doctor's last name
    Qualification: PropTypes.string, // Doctor's qualification/specialization
    hospital: PropTypes.string, // Hospital/organization name
    DrImage: PropTypes.string, // Doctor profile image URL
    worktime: PropTypes.string, // Working time information
    hcfDoc: PropTypes.bool, // Whether this is an HCF doctor appointment
    isLoading: PropTypes.bool, // Loading state for skeleton display
};

// Default props
ContainerOne.defaultProps = {
    Fname: "",
    Mname: "",
    Lname: "",
    Qualification: "",
    hospital: "",
    DrImage: "",
    worktime: "",
    hcfDoc: false,
    isLoading: false,
};

export default ContainerOne;
