import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import HcfDetailContainer1 from "./HcfDetailContainer1";
import HcfDetailContainer2 from "./HcfDetailContainer2";
import HcfDetailContainer3 from "./HcfDetailContainer3";
import HcfDetailContainer4 from "./HcfDetailContainer4";
import messageIcon from "../../../static/images/DrImages/message.svg";
import bagIcon from "../../../static/images/DrImages/bag.svg";
import starIcon from "../../../static/images/DrImages/Group 92.svg";
import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDateDay } from "../../../constants/const";
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications
import Loading from "../../../components/Loading/Loading"; // Reusable loader component

/**
 * HCFDetailedCard Component
 * 
 * Displays detailed information about a Healthcare Facility (HCF)
 * Features:
 * - Fetch and display HCF details by ID
 * - Profile information display
 * - Service availability information
 * - About section
 * 
 * API Endpoints:
 * - GET /sec/patient/dashboardHcfdetailsbyId/{hcfID} (fetch HCF details)
 * 
 * Security:
 * - Uses axiosInstance (automatic JWT token injection) ✅
 * - Validates HCF ID before API calls
 * 
 * Error Handling:
 * - Loading states with reusable loader ✅
 * - Error states with user-friendly messages ✅
 * - Toast notifications for errors ✅
 * 
 * @component
 */
const HCFDetailedCard = () => {
    logger.debug("🔵 HCFDetailedCard component rendering");
    
    const params = useParams();
    const ID = params.hcfID;
    
    /**
     * Validate HCF ID from URL parameters
     * Ensures ID is present and valid before making API calls
     */
    const validateHcfId = () => {
        if (!ID) {
            logger.warn("⚠️ HCF ID not found in URL parameters");
            toastService.warning("HCF ID is missing. Redirecting...");
            return false;
        }
        
        // Validate ID is a number or valid string
        if (typeof ID !== 'string' && typeof ID !== 'number') {
            logger.error("❌ Invalid HCF ID type:", typeof ID);
            toastService.error("Invalid HCF ID format");
            return false;
        }
        
        logger.debug("✅ HCF ID validated:", ID);
        return true;
    };

    // State management
    const [hcfData, setHCFDataId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Track loading state
    const [isError, setIsError] = useState(false);    // Track error state

    /**
     * Fetch HCF details from API
     * Loads comprehensive HCF information including profile, services, and availability
     */
    const fetchDataHCFCardsId = async () => {
        // Validate HCF ID before fetching
        if (!validateHcfId()) {
            setIsError(true);
            setIsLoading(false);
            return;
        }
        
        logger.debug("📡 Fetching HCF details", { hcfID: ID });
        setIsLoading(true);
        setIsError(false);
        
        try {
            const response = await axiosInstance(`/sec/patient/dashboardHcfdetailsbyId/${ID}`);
            
            logger.debug("✅ HCF Details API response received", {
                hasResponse: !!response?.data?.response,
                dataLength: response?.data?.response?.length || 0,
            });
            
            // Validate response structure
            if (response?.data?.response && response.data.response.length > 0) {
                const hcfDetails = response.data.response[0];
                logger.debug("✅ HCF details extracted successfully", {
                    hasBusinessName: !!hcfDetails.first_name,
                    hasCompanyName: !!hcfDetails.company_name,
                    hasProfilePicture: !!hcfDetails.profile_picture,
                });
                
                setHCFDataId(hcfDetails);
                setIsError(false);
                toastService.success("HCF details loaded successfully");
            } else {
                logger.warn("⚠️ No HCF data found in response");
                setIsError(true);
                toastService.warning("No HCF details found");
            }
        } catch (error) {
            logger.error("❌ Failed to fetch HCF details:", error);
            
            // Extract error message from response
            const errorMessage = error?.response?.data?.message || 
                                error?.response?.data?.error || 
                                "Failed to load HCF details. Please try again later.";
            
            setIsError(true);
            toastService.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Fetch HCF data on component mount when ID is available
     */
    useEffect(() => {
        if (ID) {
            fetchDataHCFCardsId();
        } else {
            logger.warn("⚠️ HCF ID not available, skipping data fetch");
            setIsLoading(false);
            setIsError(true);
        }
    }, [ID]);

    /**
     * Fallback values for missing data
     * Provides default text when HCF data is not available
     */
    const fallbackText = "Not Available";
    const isDataEmpty = !hcfData;

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {/* Loading State - Shows reusable loader component */}
            {isLoading && !isError ? (
                <Loading
                    variant="overlay"
                    size="large"
                    message="Loading HCF Details"
                    subMessage="Please wait while we fetch the healthcare facility information..."
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
                        Unable to Load HCF Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        We encountered an error while fetching the healthcare facility information.
                        Please try again later or contact support if the problem persists.
                    </Typography>
                </Box>
            ) : (
                /* Main Content - HCF Details Display */
                <>
                    {/* Container 1: HCF Profile Information */}
                    <HcfDetailContainer1
                        business_name={`${hcfData?.first_name ?? fallbackText} ${hcfData?.middle_name ?? ""} ${hcfData?.last_name ?? ""}`.trim() || fallbackText}
                        company_name={hcfData?.company_name ?? fallbackText}
                        worktime={`${formatDateDay(hcfData?.service_day_from) ?? fallbackText} - ${formatDateDay(hcfData?.service_day_to) ?? fallbackText}`}
                        Qualification={hcfData?.hcf_name ?? fallbackText}
                        profile_picture={hcfData?.profile_picture ?? ""}
                        isLoading={isLoading} // Pass isLoading prop for skeleton loading
                    />
                    
                    {/* Container 4: About Section */}
                    <HcfDetailContainer4 
                        sx={{ marginTop: "-50px" }} 
                        ID={ID} 
                        isLoading={isLoading} 
                        description={hcfData?.about ?? fallbackText}
                    />
                </>
            )}
        </Box>
    );
};

// PropTypes for component documentation and type checking
HCFDetailedCard.propTypes = {
    // This component doesn't accept props, it uses URL parameters
};

export default HCFDetailedCard;
