import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "@mui/material";
import { data, CallCardData, baseURL } from "../../constants/const";
import Drcard from "../../constants/drcard/drcard";
import PromotionalBanner from "../../components/PromotionalBanner";
import HorizontalScrollCards from "../../components/HorizontalScrollCards";
import CategoryFilter from "../../components/CategoryFilter";
import DoctorCard from "../../components/DoctorCard";
import HealthcareFacilityCard from "../../components/HealthcareFacilityCard";
import CustomButton from "../../components/CustomButton/custom-button";
import SingleLineGridList from "./Crousal"; // This is the Crousal component
import "./Explore.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NoAppointmentCard from "../PatientAppointment/NoAppointmentCard/NoAppointmentCard";

// Import centralized API services
import { PatientService } from "../../api/services";

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

    // Updated API calls using centralized services
    const fetchDataNew = async () => {
        try {
            const response = await PatientService.getDashboardDoctorDetails();
            setCardData(response?.response);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorNearme = async (zipcodes) => {
        if (!zipcodes || zipcodes.length === 0) {
            console.error("Zipcodes are required");
            return;
        }
    
        setLoading(true);
        try {
            const response = await PatientService.getDoctorsNearMe({
                zipcodes,
                type: "Good",
                page: 1,
                limit: 5,
            });
            setDocnearme(response?.response || []);
        } catch (error) {
            console.error("Error fetching doctors near me:", error.response);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchPopularDoctor = async (zipcodes) => {
        if (!zipcodes || zipcodes.length === 0) {
            console.error("Zipcodes are required");
            return;
        }
    
        setLoading(true);
        try {
            const response = await PatientService.getPopularDoctors({
                zipcodes,
                type: "Good",
                page: 1,
                limit: 5,
            });
            setPopularDoc(response?.response || []);
        } catch (error) {
            console.error("Error fetching popular doctors:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const fetchFeaturedDoctor = async (zipcodes) => {
        if (!zipcodes || zipcodes.length === 0) {
            console.error("Zipcodes are required");
            return;
        }
    
        setLoading(true);
        try {
            const response = await PatientService.getFeaturedDoctors({
                zipcodes,
                type: "Good",
                page: 1,
                limit: 5,
            });
            setFeturedDoc(response?.response || []);
        } catch (error) {
            console.error("Error fetching featured doctors:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const fetchHCFData = async () => {
        try {
            const response = await PatientService.getDashboardHCFDetails();
            setHCFData(response?.response);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    const fetchSpecializationData = async () => {
        try {
            const response = await PatientService.getDoctorDepartments();
            setNav_spelization(response?.response);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    const fetchSpecializationDoctor = async (specialist) => {
        try {
            const response = await PatientService.getDoctorsByDepartment(specialist, 3);
            setspecializationCardData(response?.response[`${specializationDoc}`]);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    // Rest of the component remains the same...
    const scrollContainerRef = useRef(null);

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 200;
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 200;
        }
    };

    useEffect(() => {
        fetchDataNew();
        fetchHCFData();
        fetchSpecializationData();
        
        // Get user's location for fetching nearby doctors
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        // Use Nominatim API for reverse geocoding
                        const geoResponse = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const zipcode = geoResponse.data?.address?.postcode;
                        if (zipcode) {
                            fetchDoctorNearme([zipcode]);
                            fetchPopularDoctor([zipcode]);
                            fetchFeaturedDoctor([zipcode]);
                        }
                    } catch (error) {
                        console.error("Error getting location:", error);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (specializationDoc) {
            fetchSpecializationDoctor(specializationDoc);
        }
    }, [specializationDoc]);

    return (
        <Box sx={{ width: "90%" }}>
            <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                <NavLink to={"/patientdashboard/dashboard/explore"}>Explore</NavLink>
                <NavLink to={"/patientdashboard/dashboard/myactivity"}>My Activity</NavLink>
            </Box>
            <Box sx={{ width: "100%" }}>
                {/* Horizontal slider starts */}
                <Box sx={{ width: "100%", height: "fit-content", overflow: "hidden" }}>
                <HorizontalScrollCards
                    title=""
                    subtitle="Most booked doctors in your area"
                    loading={loading}
                />
                </Box>
                <Box sx={{ width: "100%", height: "fit-content", overflow: "hidden" }}>
                    <SingleLineGridList
                        isLoading={loading}
                    />
                </Box>
                {/* Popular Field starts */}

                <CallCardData
                    linkPath={`/patientdashboard/drdetailscard/`}
                    sendCardData={populardoc}
                    CardData={data}
                    textField={"Popular"}
                    loading={loading}
                />
                {/* Featured Fields starts */}

                <CallCardData
                    linkPath={`/patientdashboard/drdetailscard/`}
                    sendCardData={cardData}
                    CardData={data}
                    textField={"Featured"}
                    loading={loading}
                />
                {/* Category component starts */}
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            position: "relative",
                            paddingBottom: "10px",
                        }}
                    >
                        <h4 sx={{ fontWeight: "bold", position: "absolute", top: 0, left: 0 }}>
                            Categories
                        </h4>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <div onClick={handleScrollLeft}>
                            <ChevronLeftIcon />
                        </div>
                        <Box
                            sx={{ display: "flex", position: "relative" }}
                            className={"horizontal-scroll-container NavBar-Container-one"}
                        >
                            <div
                                ref={scrollContainerRef}
                                style={{ overflowX: "auto", display: "flex" }}
                            >
                                {Array.isArray(nav_specialization) &&
                                    nav_specialization.map((specialization, index) => (
                                        <CustomButton
                                            key={index}
                                            to={`/patientdashboard/${specialization?.department_name.toLowerCase()}`}
                                            label={`${specialization?.department_name}`}
                                            isTransaprent={
                                                specialization.department_name.toLowerCase() ===
                                                specializationDoc.toLowerCase()
                                                    ? false
                                                    : true
                                            }
                                            buttonCss={{
                                                borderRadius: "50px",
                                                padding: "0 6.5%",
                                                marginRight: "1%",
                                                whiteSpace: "normal",
                                            }}
                                            handleClick={() => {
                                                setSpecializationDoc(
                                                    specialization?.department_name,
                                                );
                                            }}
                                        />
                                    ))}
                            </div>
                        </Box>
                        <div onClick={handleScrollRight}>
                            <ChevronRightIcon />
                        </div>
                    </Box>
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
                            linkPath={`/patientdashboard/drdetailscard/`}
                            sendCardData={specializationCardData}
                            loading={loading}
                        />
                    ) : (
                        <NoAppointmentCard style={{ height: "8rem" }} text_one="No Data found" />
                    )}
                </Box>
                {/* Near you component starts */}

                <CallCardData
                    linkPath={`/patientdashboard/drdetailscard/`}
                    sendCardData={docnearme}
                    CardData={data}
                    textField={"Near You"}
                    loading={loading}
                />
                {/* Hcf Cards component starts */}

                <CallCardData
                    linkPath={`/patientdashboard/hcfDetailCard/`}
                    sendCardData={hcfData}
                    CardData={data}
                    textField={"Healthcare Facility"}
                    loading={loading}
                />
            </Box>
        </Box>
    );
};

export default Explore;
