import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "@mui/material";
import { CallCardData, baseURL } from "../../constants/const";
import PromotionalBanner from "../../components/PromotionalBanner";
import HorizontalScrollCards from "../../components/HorizontalScrollCards";
import CategoryFilter from "../../components/CategoryFilter";
import DoctorCard from "../../components/DoctorCard";
import HealthcareFacilityCard from "../../components/HealthcareFacilityCard";
import CustomButton from "../../components/CustomButton/custom-button";
import HorizontalCarousel from "./Crousal";
import "./Explore.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../config/axiosInstance"; // Handles access token automatically
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoAppointmentCard from "../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { getProfileImageSrc } from "../../utils/imageUtils";
import logger from "../../utils/logger"; // Centralized logging
import toastService from "../../services/toastService"; // Toast notifications
import Loading from "../../components/Loading/Loading"; // Reusable loader

/**
 * Explore Component
 * 
 * Main dashboard page for exploring healthcare providers
 * Features:
 * - Featured healthcare services carousel
 * - Popular doctors section
 * - Featured doctors section
 * - Category-based filtering
 * - Nearby doctors based on zipcode
 * - Healthcare facilities listing
 * 
 * Image Handling:
 * Priority 1: Base64 → if not working → Static
 * Priority 2: S3 URLs → if denied → Static  
 * Priority 3: Static images (always fallback)
 * All images are validated and processed for consistent handling
 */
const Explore = () => {
    logger.debug("🔵 Explore component rendering...");
    
    // ============================================
    // State Management
    // ============================================
    
    const [cardData, setCardData] = useState([]);
    const [hcfData, setHCFData] = useState([]);
    const [docnearme, setDocnearme] = useState([]);
    const [populardoc, setPopularDoc] = useState([]);
    const [fetureddoc, setFeturedDoc] = useState([]);
    const [nav_specialization, setNav_spelization] = useState([]);
    const [specializationDoc, setSpecializationDoc] = useState("CARDIOLOGIST");
    const [specializationCardData, setspecializationCardData] = useState("");
    const [loading, setLoading] = useState(true);
    const [zipcodes, setZipcodes] = useState([560043,560045,560046,560047,560048]); // Default zipcode (Bangalore)
    
    // ============================================
    // API Fetch Functions
    // ============================================

    /**
     * Fetch featured doctors data
     * Retrieves doctors list from API endpoint
     * Uses axiosInstance which automatically handles authentication
     */
    const fetchDataNew = async () => {
        logger.debug("📡 Fetching featured doctors from API");
        try {
            const response = await axiosInstance.get("/sec/patient/DashboardDoctordetail");
            const doctors = response?.data?.response || [];
            
            logger.debug("✅ Featured doctors fetched successfully", { count: doctors.length });
            
            // Log image formats for debugging
            doctors.forEach((doctor, index) => {
                if (doctor?.profile_picture) {
                    logger.debug(`🖼️ Doctor ${index} image format:`, {
                        hasImage: !!doctor.profile_picture,
                        isBase64: doctor.profile_picture.startsWith('data:image/'),
                        isS3Url: doctor.profile_picture.startsWith('http'),
                        imageLength: doctor.profile_picture.length
                    });
                }
            });
            
            setCardData(doctors);
            toastService.success("Featured doctors loaded successfully");
        } catch (error) {
            logger.error("❌ Failed to fetch featured doctors:", error);
            toastService.error("Failed to load featured doctors");
            setCardData([]); // Fallback to empty array
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch doctors near user's location
     * Uses zipcodes array to query nearby doctors
     * Handles errors gracefully with fallback to empty array
     */
    const fetchDoctorNearme = async (zipcodes) => {
        logger.debug("📡 Fetching doctors near user location", { zipcodes });
        setLoading(true);
        
        try {
            const requestData = {
                zipcodes: [560043, 560045, 560046, 560047, 560048], // Default zipcodes
                type: "Good",
                page: 1,
                limit: 5,
            };
            
            const response = await axiosInstance.post(
                "/sec/patient/doctornearme",
                JSON.stringify(requestData)
            );
            
            const doctors = response?.data?.response || [];
            logger.info("✅ Doctors near me fetched successfully", { count: doctors.length });
            
            setDocnearme(doctors);
            if (doctors.length > 0) {
                toastService.success(`Found ${doctors.length} doctors near you`);
            }
        } catch (error) {
            logger.error("❌ Failed to fetch doctors near me:", error);
            toastService.error("Failed to load nearby doctors");
            setDocnearme([]); // Fallback to empty array
        } finally {
            setLoading(false);
        }
    };
    
    /**
     * Fetch popular doctors data
     * Retrieves popular doctors based on zipcodes
     * Uses axiosInstance for authenticated requests
     */
    const fetchPopularDoctor = async (zipcodes) => {
        logger.debug("📡 Fetching popular doctors", { zipcodes });
        setLoading(true);
        
        try {
            const response = await axiosInstance.post(
                "/sec/patient/doctor/populardoctors",
                JSON.stringify({
                    zipcodes: [560043, 560045, 560046, 560047, 560048], // Default zipcodes (Bangalore)
                    type: "Good",
                    page: 1,
                    limit: 5,
                })
            );
            
            const doctors = response?.data?.response || [];
            logger.debug("✅ Popular doctors fetched successfully", { count: doctors.length });
            
            // Log image formats for debugging
            doctors.forEach((doctor, index) => {
                if (doctor?.profile_picture) {
                    logger.debug(`🖼️ Popular Doctor ${index} image format:`, {
                        doctorName: `${doctor.first_name} ${doctor.last_name}`,
                        hasImage: !!doctor.profile_picture,
                        isBase64: doctor.profile_picture.startsWith('data:image/'),
                        isS3Url: doctor.profile_picture.startsWith('http'),
                        imageLength: doctor.profile_picture.length
                    });
                } else {
                    logger.debug(`❌ Popular Doctor ${index} has no profile picture:`, {
                        doctorName: `${doctor.first_name} ${doctor.last_name}`,
                        hasImage: false
                    });
                }
            });
            
            setPopularDoc(doctors);
            if (doctors.length > 0) {
                toastService.success(`Found ${doctors.length} popular doctors`);
            }
        } catch (error) {
            logger.error("❌ Failed to fetch popular doctors:", error);
            toastService.error("Failed to load popular doctors");
            setPopularDoc([]); // Fallback to empty array
        } finally {
            setLoading(false);
        }
    };
    /**
     * Fetch featured doctors data
     * Retrieves featured doctors based on zipcodes
     * Validates zipcodes before making API call
     */
    const fetchfeaturedoctors = async (zipcodes) => {
        logger.debug("📡 Fetching featured doctors", { zipcodes });
        
        if (!zipcodes || zipcodes.length === 0) {
            logger.error("❌ Featured doctors: Zipcodes are required");
            toastService.error("Location data is required");
            return;
        }
    
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/sec/patient/doctor/featureddoctors",
                JSON.stringify({
                    zipcodes,
                    type: "Good",
                    page: 1,
                    limit: 5,
                })
            );
            
            const doctors = response?.data?.response || [];
            logger.debug("✅ Featured doctors fetched successfully", { count: doctors.length });
            
            setFeturedDoc(doctors);
            if (doctors.length > 0) {
                toastService.success(`Found ${doctors.length} featured doctors`);
            }
        } catch (error) {
            logger.error("❌ Failed to fetch featured doctors:", error);
            toastService.error("Failed to load featured doctors");
            setFeturedDoc([]); // Fallback to empty array
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch zipcode from user's current location using geolocation API
     * Uses Nominatim OpenStreetMap API for reverse geocoding
     * Falls back to default zipcode if geolocation fails
     */
    const fetchZipcodeFromCurrentLocation = async () => {
        logger.debug("📍 Starting geolocation request");
        
        if (!navigator.geolocation) {
            logger.error("❌ Geolocation not supported in this browser");
            toastService.error("Location services not available");
            setLoading(false);
            return;
        }
    
        setLoading(true);
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                logger.debug("✅ Geolocation successful", { latitude, longitude });
    
                try {
                    logger.debug("📡 Fetching zipcode from Nominatim API");
                    // Use Nominatim API for reverse geocoding
                    const geoResponse = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
    
                    // Extract zip code from the response
                    const zipCode = geoResponse?.data?.address?.postcode;
                    logger.debug("📮 Zipcode found", { zipCode });
    
                    if (zipCode) {
                        logger.info("🚀 Starting location-based doctor fetches", { zipCode });
                        // Update zipcodes state with the geolocated zipcode
                        setZipcodes([zipCode]);
                        
                        // Fetch doctors based on current location
                        await fetchDoctorNearme([zipCode]);
                        await fetchPopularDoctor([zipCode]);
                        await fetchfeaturedoctors([zipCode]);
                        
                        logger.debug("✅ All location-based fetches completed");
                        toastService.success("Location-based doctors loaded");
                    } else {
                        logger.warn("❌ Zipcode not found in location data");
                        toastService.warning("Could not determine exact location");
                    }
                } catch (error) {
                    logger.error("❌ Error fetching zipcode:", error);
                    toastService.error("Failed to fetch location");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                logger.error("❌ Geolocation error:", error);
                
                // Provide specific error messages
                if (error.code === 1) {
                    toastService.error("Location access denied");
                } else if (error.code === 2) {
                    toastService.error("Location unavailable");
                } else if (error.code === 3) {
                    toastService.error("Location request timed out");
                } else {
                    toastService.error("Could not fetch your location");
                }
                
                setLoading(false);
            }
        );
    };
    /**
     * Fetch healthcare facility data
     * Retrieves HCF details from API
     * Logs image formats for debugging
     */
    const fetchDataHCFCards = async () => {
        logger.debug("📡 Fetching healthcare facilities");
        
        try {
            const response = await axiosInstance.get("/sec/patient/DashboardHcfdetails");
            const facilities = response?.data?.response || [];
            
            logger.debug("🔍 HCF Data structure", { count: facilities.length });
            
            // Log image formats for HCF debugging
            facilities.forEach((hcf, index) => {
                if (hcf?.profile_picture) {
                    logger.debug(`🏥 HCF ${index} image format:`, {
                        hasImage: !!hcf.profile_picture,
                        isBase64: hcf.profile_picture.startsWith('data:image/'),
                        isS3Url: hcf.profile_picture.startsWith('http'),
                        imageLength: hcf.profile_picture.length
                    });
                }
            });
            
            setHCFData(facilities);
            
            if (facilities.length > 0) {
                toastService.success(`${facilities.length} healthcare facilities loaded`);
            }
        } catch (error) {
            logger.error("❌ Failed to fetch healthcare facilities:", error);
            toastService.error("Failed to load healthcare facilities");
            setHCFData([]); // Fallback to empty array
        }
    };

    /**
     * Initial data fetching on component mount
     * Sets activeComponent in localStorage
     * Triggers all API fetches: featured doctors, HCF cards, location-based data
     */
    useEffect(() => {
        logger.debug("🔵 Component mounted, initializing data fetching");
        
        try {
            localStorage.setItem("activeComponent", "dashboard");
        } catch (error) {
            logger.error("Failed to set activeComponent in localStorage:", error);
        }
        
        logger.debug("🚀 Starting all API calls");
        
        // Fetch initial data
        fetchDataNew(); // Featured doctors
        fetchDataHCFCards(); // Healthcare facilities
        fetchZipcodeFromCurrentLocation(); // Location-based doctors
        
        logger.debug("✅ All API calls initiated");
    }, []);

    /**
     * Fetch specialization/navigation categories
     * Retrieves list of doctor departments for filtering
     */
    const navSpecializtion = async () => {
        logger.debug("📡 Fetching specializations");
        
        try {
            const response = await axiosInstance(`/sec/patient/doctorDepartments`);
            const specializations = response?.data?.response || [];
            
            logger.debug("✅ Specializations fetched", { count: specializations.length });
            setNav_spelization(specializations);
        } catch (err) {
            logger.error("❌ Failed to fetch specializations:", err);
            toastService.error("Failed to load specializations");
            setNav_spelization([]); // Fallback to empty array
        }
    };

    useEffect(() => {
        navSpecializtion();
    }, []);

    // Removed scroll functions - now using HorizontalScrollCards reusable component

    /**
     * Fetch doctors by specialization
     * Retrieves doctors filtered by department name
     */
    const DoctorSpecialization = async (specialist) => {
        logger.debug("📡 Fetching doctors by specialization", { specialist });
        
        try {
            const response = await axiosInstance(`/sec/patient/getdoctorsByDept/${specialist}/3`);
            const doctors = response?.data?.response[`${specializationDoc}`] || [];
            
            logger.debug("✅ Specialization doctors fetched", { count: doctors.length });
            setspecializationCardData(doctors);
            
            if (doctors.length === 0) {
                logger.warn("No doctors found for specialization:", specialist);
            }
        } catch (err) {
            logger.error("❌ Failed to fetch specialization doctors:", err);
            toastService.error("Failed to load doctors for this specialization");
            setspecializationCardData([]); // Fallback to empty array
        }
    };

    useEffect(() => {
        if (specializationDoc !== "") {
            DoctorSpecialization(specializationDoc);
        }
    }, [specializationDoc]);

    /**
     * Image rendering priority system:
     * Priority 1: Base64 → if not working → Static
     * Priority 2: S3 URLs → if denied → Static  
     * Priority 3: Static images (always fallback)
     * 
     * - DoctorCard and HealthcareFacilityCard components use priority-based validation
     * - Handles S3 "Access Denied" errors by falling back to static images
     * - Works seamlessly in both development and production environments
     * - All image formats are automatically detected and processed
     */
    
    // Log render data for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
        logger.debug("📊 Rendering Explore with:", {
            populardocCount: populardoc.length,
            cardDataCount: cardData.length,
            hcfDataCount: hcfData.length,
            docnearmeCount: docnearme.length,
            nav_specializationCount: nav_specialization.length,
            loading
        });
    }
    
    return (
        <Box sx={{ 
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginLeft: 0,
            marginRight: 0,
        }}>
            <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                <NavLink to={"/patientDashboard/dashboard/explore"}>Explore</NavLink>
                <NavLink to={"/patientDashboard/dashboard/myactivity"}>My Activity</NavLink>
            </Box>
            <Box sx={{ width: "100%" }}>
                {/* Advertisement Carousel - Shows featured healthcare services */}
                <HorizontalCarousel
                    title="Featured Healthcare Services"
                    isLoading={loading}
                    autoScroll={true}
                    showControls={true}
                />
                
                {/* Popular Doctors Section */}
                <Box sx={{ marginTop: "3rem" }}>
                    <CallCardData
                        linkPath={`/patientDashboard/drDetailsCard/`}
                        sendCardData={populardoc}
                        textField={"Popular"}
                        loading={loading}
                    />
                </Box>
                
                {/* Featured Doctors Section */}
                <Box sx={{ marginTop: "3rem" }}>
                    <CallCardData
                        linkPath={`/patientDashboard/drDetailsCard/`}
                        sendCardData={cardData}
                        textField={"Featured"}
                        loading={loading}
                    />
                </Box>
                
                {/* Category Filter - Using Reusable HorizontalScrollCards */}
                <HorizontalScrollCards
                    title="Categories"
                    viewAllText=""
                    onViewAllClick={null}
                >
                    {Array.isArray(nav_specialization) &&
                        nav_specialization.map((specialization, index) => {
                            const isSelected = specialization.department_name.toLowerCase() === specializationDoc.toLowerCase();
                            
                            return (
                                <CustomButton
                                    key={index}
                                    to={`/patientDashboard/${specialization?.department_name.toLowerCase()}`}
                                    label={`${specialization?.department_name}`}
                                    isTransaprent={!isSelected}
                                    buttonCss={{
                                        borderRadius: "50px",
                                        padding: "0 6.5%",
                                        marginRight: "1%",
                                        whiteSpace: "normal",
                                        flexShrink: 0,
                                        minWidth: "fit-content",
                                    }}
                                    handleClick={() => {
                                        logger.debug("Category clicked:", specialization?.department_name);
                                        setSpecializationDoc(specialization?.department_name);
                                    }}
                                />
                            );
                        })}
                </HorizontalScrollCards>
                
                {/* Category Results Section */}
                {loading ? (
                        <div style={{ display: "flex", flexWrap: "overflow", gap: "10px" }}>
                            {[...Array(4)].map((_, index) => (
                                <Skeleton
                                    key={index}
                                    height="8rem"
                                    width="20em"
                                    style={{ borderRadius: "8px" }}
                                />
                            ))}
                        </div>
                    ) : (specializationCardData?.length || 0) > 0 ? (
                        <CallCardData
                            linkPath={`/patientDashboard/drDetailsCard/`}
                            sendCardData={specializationCardData}
                            loading={loading}
                        />
                    ) : (
                        <NoAppointmentCard style={{ height: "8rem" }} text_one="No Data found" />
                    )}
                
                {/* Doctors Near You Section */}
                <Box sx={{ marginTop: "3rem" }}>
                    <CallCardData
                        linkPath={`/patientDashboard/drDetailsCard/`}
                        sendCardData={docnearme}
                        textField={"Near You"}
                        loading={loading}
                    />
                </Box>
                
                {/* Healthcare Facilities Section */}
                <Box sx={{ marginTop: "3rem" }}>
                    <CallCardData
                        linkPath={`/patientDashboard/hcfDetailCard/`}
                        sendCardData={hcfData}
                        textField={"Healthcare Facility"}
                        loading={loading}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Explore;
