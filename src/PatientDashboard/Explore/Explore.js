import { Box, Typography, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "@mui/material";
import { data, CallCardData, baseURL } from "../../constants/const";
import Drcard from "../../constants/drcard/drcard";
import CustomButton from "../../components/CustomButton/custom-button";
import { AutoScrollCarousel } from "../../components/Carousel";
import SectionHeader from "../../components/SectionHeader";
import NavigationTabs from "../../components/NavigationTabs";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import EmptyState from "../../components/EmptyState";
import "./Explore.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutButton from "../../components/LogoutButton";
import { useAuth } from "../../hooks/useAuth";

const Explore = () => {
    const [cardData, setCardData] = useState([]);
    const [hcfData, setHCFData] = useState([]);
    const [docnearme, setDocnearme] = useState([]);
    const [populardoc, setPopularDoc] = useState([]);
    const [fetureddoc, setFeturedDoc] = useState([]);
    const [nav_specialization, setNav_spelization] = useState([]);
    const [specializationDoc, setSpecializationDoc] = useState("CARDIOLOGIST");
    const [specializationCardData, setspecializationCardData] = useState("");
    const [loading, setLoading] = useState(true);
    
    // Get authentication status
    const { isAuthenticated, user, logout, checkLoginStatus, checkForceLogoutStatus } = useAuth();

    const fetchDataNew = async () => {
        try {
            console.log("Fetching doctor details...");
            const response = await axiosInstance.get("/sec/patient/DashboardDoctordetail");
            console.log("Doctor details response:", response?.data);
            setCardData(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching doctor details:", error);
            console.error("Error response:", error.response?.data);
            setCardData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorNearme = async (zipcodes) => {
        if (!zipcodes || zipcodes.length === 0) {
            console.error("Zipcodes are required");
            return;
        }
    
        setLoading(true); // Set loading state to true
        try {
            const response = await axiosInstance.post(
                "/sec/patient/doctornearme",
                JSON.stringify({
                    zipcodes, // Pass array of zipcodes
                    type: "Good",
                    page: 1,
                    limit: 5,
                })
            );
            setDocnearme(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching doctors near me:", error.response);
        } finally {
            setLoading(false); // Always set loading to false after the request
        }
    };
    
    const fetchPopularDoctor = async (zipcodes) => {
        if (!zipcodes || zipcodes.length === 0) {
            console.error("Zipcodes are required");
            return;
        }
    
        setLoading(true); // Set loading state to true
        try {
            const response = await axiosInstance.post(
                "/sec/patient/doctor/populardoctors",
                JSON.stringify({
                    zipcodes, // Pass array of zipcodes
                    type: "Good",
                    page: 1,
                    limit: 5,
                })
            );
            setPopularDoc(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching doctors near me:", error.response);
        } finally {
            setLoading(false); // Always set loading to false after the request
        }
    };
    const fetchfeaturedoctors = async (zipcodes) => {
        if (!zipcodes || zipcodes.length === 0) {
            console.error("Zipcodes are required");
            return;
        }
    
        setLoading(true); // Set loading state to true
        try {
            const response = await axiosInstance.post(
                "/sec/patient/doctor/featureddoctors",
                JSON.stringify({
                    zipcodes, // Pass array of zipcodes
                    type: "Good",
                    page: 1,
                    limit: 5,
                })
            );
            setFeturedDoc(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching doctors near me:", error.response);
        } finally {
            setLoading(false); // Always set loading to false after the request
        }
    };

    const fetchZipcodeFromCurrentLocation = async () => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser");
            return;
        }
    
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
    
                try {
                    // Use Nominatim API for reverse geocoding
                    const geoResponse = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
    
                    // Extract zip code from the response
                    const zipCode = geoResponse?.data?.address?.postcode;
    
                    if (zipCode) {
                        // Call the fetchDoctorNearme function with the zip code in an array
                        await fetchDoctorNearme([zipCode]);
                        await fetchPopularDoctor([zipCode]);
                        await fetchfeaturedoctors([zipCode]);
                    } else {
                        console.error("Zipcode not found in the location data");
                    }
                } catch (error) {
                    console.error("Error fetching zip code:", error);
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error("Error getting location:", error.message);
                setLoading(false);
            }
        );
    };
    const fetchDataHCFCards = async () => {
        try {
            console.log("Fetching HCF details...");
            const response = await axiosInstance.get("/sec/patient/DashboardHcfdetails");
            console.log("HCF details response:", response?.data);
            setHCFData(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching HCF details:", error);
            console.error("Error response:", error.response?.data);
            setHCFData([]);
        }
    };

    useEffect(() => {
        localStorage.setItem("activeComponent", "dashboard");
        fetchDataNew();
        fetchDataHCFCards();
        fetchZipcodeFromCurrentLocation();
        fetchDoctorNearme();
    }, []);

    const navSpecializtion = async () => {
        try {
            console.log("Fetching doctor departments...");
            const resp = await axiosInstance(`/sec/patient/doctorDepartments`);
            console.log("Departments response:", resp?.data);
            setNav_spelization(resp?.data?.response || []);
        } catch (err) {
            console.error("Nav specialization error:", err);
            console.error("Error response:", err.response?.data);
            setNav_spelization([]);
        }
    };

    useEffect(() => {
        navSpecializtion();
    }, []);

    const scrollContainerRef = useRef(null);

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 100; // Adjust scroll distance as needed
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 100; // Adjust scroll distance as needed
        }
    };

    const DoctorSpecialization = async (specialist) => {
        try {
            console.log("Fetching doctors by specialization:", specialist);
            const response = await axiosInstance(`/sec/patient/getdoctorsByDept/${specialist}/3`);
            console.log("Specialization response:", response?.data);
            setspecializationCardData(response?.data?.response[`${specializationDoc}`] || []);
        } catch (err) {
            console.error("Specialization error:", err);
            console.error("Error response:", err.response?.data);
            setspecializationCardData([]);
        }
    };

    useEffect(() => {
        if (specializationDoc !== "") {
            DoctorSpecialization(specializationDoc);
        }
    }, [specializationDoc]);

    // Navigation tabs configuration
    const navigationTabs = [
        { label: "Explore", path: "/patientdashboard/dashboard/explore" },
        { label: "My Activity", path: "/patientdashboard/dashboard/myactivity" }
    ];

    return (
        <Box className="explore-page">
            <Box className="explore-container">
                {/* Navigation Tabs */}
                <NavigationTabs tabs={navigationTabs} />
                
                {/* Advertisement Carousel */}
                <Box className="carousel-section">
                    <AutoScrollCarousel
                        isLoading={loading}
                        speed={0.5}
                    />
                </Box>

            {/* Popular Doctors Section */}
            <Box className="section">
                <SectionHeader 
                    title="Popular Doctors" 
                    subtitle="Most booked doctors in your area"
                />
                {loading ? (
                    <LoadingSkeleton variant="card" count={4} className="skeleton-container--horizontal" />
                ) : populardoc.length > 0 ? (
                    <CallCardData
                        linkPath={`/patientdashboard/drdetailscard/`}
                        sendCardData={populardoc}
                        CardData={data}
                        textField={""}
                        loading={false}
                        hcfID={null}
                    />
                ) : (
                    <EmptyState 
                        title="No Popular Doctors"
                        description="Popular doctors will appear here once we have enough data."
                        onAction={() => window.location.reload()}
                    />
                )}
            </Box>

            {/* Featured Doctors Section */}
            <Box className="section">
                <SectionHeader 
                    title="Featured Doctors" 
                    subtitle="Handpicked doctors for you"
                />
                {loading ? (
                    <LoadingSkeleton variant="card" count={4} className="skeleton-container--horizontal" />
                ) : cardData.length > 0 ? (
                    <CallCardData
                        linkPath={`/patientdashboard/drdetailscard/`}
                        sendCardData={cardData}
                        CardData={data}
                        textField={""}
                        loading={false}
                        hcfID={null}
                    />
                ) : (
                    <EmptyState 
                        title="No Featured Doctors"
                        description="Featured doctors will appear here soon."
                        onAction={() => window.location.reload()}
                    />
                )}
            </Box>
            {/* Categories Section */}
            <Box className="section">
                <SectionHeader 
                    title="Browse by Specialization" 
                    subtitle="Find doctors by their area of expertise"
                />
                
                {/* Specialization Navigation */}
                <Box className="specialization-nav">
                    <Box className="nav-scroll-container">
                        <div 
                            ref={scrollContainerRef}
                            className="nav-scroll-content"
                        >
                            {loading ? (
                                <LoadingSkeleton variant="text" count={1} />
                            ) : Array.isArray(nav_specialization) && nav_specialization.length > 0 ? (
                                nav_specialization.map((specialization, index) => (
                                    <CustomButton
                                        key={index}
                                        to={`/patientdashboard/${specialization?.department_name.toLowerCase()}`}
                                        label={`${specialization?.department_name}`}
                                        isTransaprent={
                                            specialization.department_name.toLowerCase() !==
                                            specializationDoc.toLowerCase()
                                        }
                                        buttonCss={{
                                            borderRadius: "50px",
                                            padding: "0.5rem 1.5rem",
                                            marginRight: "0.75rem",
                                            whiteSpace: "nowrap",
                                            fontSize: "0.9rem",
                                            fontWeight: "500",
                                            minWidth: "auto",
                                        }}
                                        handleClick={() => {
                                            setSpecializationDoc(
                                                specialization?.department_name,
                                            );
                                        }}
                                    />
                                ))
                            ) : (
                                <EmptyState 
                                    title="No Specializations"
                                    description="Specializations will be available soon."
                                    variant="minimal"
                                />
                            )}
                        </div>
                    </Box>
                    
                    {/* Scroll Controls */}
                    <Box className="scroll-controls">
                        <CustomButton
                            label=""
                            handleClick={handleScrollLeft}
                            buttonCss={{
                                minWidth: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                padding: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ChevronLeftIcon />
                        </CustomButton>
                        <CustomButton
                            label=""
                            handleClick={handleScrollRight}
                            buttonCss={{
                                minWidth: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                padding: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ChevronRightIcon />
                        </CustomButton>
                    </Box>
                </Box>

                {/* Specialization Results */}
                {loading ? (
                    <LoadingSkeleton variant="card" count={4} className="skeleton-container--horizontal" />
                ) : (specializationCardData?.length || 0) > 0 ? (
                    <CallCardData
                        linkPath={`/patientdashboard/drdetailscard/`}
                        sendCardData={specializationCardData}
                        loading={false}
                        hcfID={null}
                    />
                ) : (
                    <EmptyState 
                        title="No Doctors Found"
                        description={`No doctors found for ${specializationDoc} specialization.`}
                        onAction={() => window.location.reload()}
                    />
                )}
            </Box>
            {/* Near You Section */}
            <Box className="section">
                <SectionHeader 
                    title="Doctors Near You" 
                    subtitle="Find doctors in your local area"
                />
                {loading ? (
                    <LoadingSkeleton variant="card" count={4} className="skeleton-container--horizontal" />
                ) : docnearme.length > 0 ? (
                    <CallCardData
                        linkPath={`/patientdashboard/drdetailscard/`}
                        sendCardData={docnearme}
                        CardData={data}
                        textField={""}
                        loading={false}
                        hcfID={null}
                    />
                ) : (
                    <EmptyState 
                        title="No Doctors Nearby"
                        description="No doctors found in your area. Try expanding your search radius."
                        onAction={() => window.location.reload()}
                    />
                )}
            </Box>

            {/* Healthcare Facilities Section */}
            <Box className="section">
                <SectionHeader 
                    title="Healthcare Facilities" 
                    subtitle="Browse hospitals and clinics"
                />
                {loading ? (
                    <LoadingSkeleton variant="card" count={4} className="skeleton-container--horizontal" />
                ) : hcfData.length > 0 ? (
                    <CallCardData
                        linkPath={`/patientdashboard/hcfDetailCard/`}
                        sendCardData={hcfData}
                        CardData={data}
                        textField={""}
                        loading={false}
                        hcfID={null}
                    />
                ) : (
                    <EmptyState 
                        title="No Healthcare Facilities"
                        description="Healthcare facilities will be available soon."
                        onAction={() => window.location.reload()}
                    />
                )}
            </Box>
            </Box>
        </Box>
    );
};

export default Explore;
