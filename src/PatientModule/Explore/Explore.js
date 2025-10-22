import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "@mui/material";
import { data, CallCardData, baseURL } from "../../constants/const";
// import Drcard from "../../constants/drcard/drcard";
import PromotionalBanner from "../../components/PromotionalBanner";
import HorizontalScrollCards from "../../components/HorizontalScrollCards";
import CategoryFilter from "../../components/CategoryFilter";
import DoctorCard from "../../components/DoctorCard";
import HealthcareFacilityCard from "../../components/HealthcareFacilityCard";
import CustomButton from "../../components/CustomButton/custom-button";
import SingleLineGridList from "./Crousal";
import "./Explore.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NoAppointmentCard from "../PatientAppointment/NoAppointmentCard/NoAppointmentCard";

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

    const fetchDataNew = async () => {
        try {
            const response = await axiosInstance.get("/sec/patient/DashboardDoctordetail");
            setCardData(response?.data?.response);
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
            console.log("response setPopularDoc",response?.data?.response);
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
            const response = await axiosInstance.get("/sec/patient/DashboardHcfdetails");
            console.log("🔍 HCF Data structure:", response?.data?.response);
            setHCFData(response?.data?.response);
        } catch (error) {
            console.log(error.response);
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
            const resp = await axiosInstance(`/sec/patient/doctorDepartments`);
            setNav_spelization(resp?.data?.response);
        } catch (err) {
            console.log("Nav specialization error : ", err);
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
            const response = await axiosInstance(`/sec/patient/getdoctorsByDept/${specialist}/3`);
            setspecializationCardData(response?.data?.response[`${specializationDoc}`]);
        } catch (err) {
            console.log("specialization error : ", err);
        }
    };

    useEffect(() => {
        if (specializationDoc !== "") {
            DoctorSpecialization(specializationDoc);
        }
    }, [specializationDoc]);
console.log("🔍 HCF Data structure new:", hcfData);
    return (
        <Box sx={{ width: "90%" }}>
            <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                <NavLink to={"/patientDashboard/dashboard/explore"}>Explore</NavLink>
                <NavLink to={"/patientDashboard/dashboard/myactivity"}>My Activity</NavLink>
            </Box>
            <Box sx={{ width: "100%" }}>
                {/* Horizontal slider starts */}
                {/* <Box sx={{ width: "100%", height: "fit-content", overflow: "hidden" }}>
                <HorizontalScrollCards
                    title=""
                    subtitle="Most booked doctors in your area"
                    loading={loading}
                />
                </Box>
                <Box sx={{ width: "100%", height: "fit-content", overflow: "hidden" }}>
                    <SingleLineGridList
                        loading={loading} // Add this line to pass the loading prop
                    />
                </Box> */}
                {/* Popular Field starts */}

                <CallCardData
                    linkPath={`/patientDashboard/drDetailsCard/`}
                    sendCardData={populardoc}
                    CardData={data}
                    textField={"Popular"}
                    loading={loading} // Add this line to pass the loading prop
                />
                {/* Featured Fields starts */}

                <CallCardData
                    linkPath={`/patientDashboard/drDetailsCard/`}
                    sendCardData={cardData}
                    CardData={data}
                    textField={"Featured"}
                    loading={loading} // Add this line to pass the loading prop
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
                                            to={`/patientDashboard/${specialization?.department_name.toLowerCase()}`}
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
                            linkPath={`/patientDashboard/drDetailsCard/`}
                            sendCardData={specializationCardData}
                            loading={loading}
                        />
                    ) : (
                        <NoAppointmentCard style={{ height: "8rem" }} text_one="No Data found" />
                    )}
                </Box>
                {/* Near you component starts */}

                <CallCardData
                    linkPath={`/patientDashboard/drDetailsCard/`}
                    sendCardData={docnearme}
                    CardData={data}
                    textField={"Near You"}
                    loading={loading} // Add this line to pass the loading prop
                />
                {/* Hcf Cards component starts */}

                <CallCardData
                    linkPath={`/patientDashboard/hcfDetailCard/`}
                    sendCardData={hcfData}
                    CardData={data}
                    textField={"Healthcare Facility"}
                    loading={loading} // Add this line to pass the loading prop
                />
            </Box>
        </Box>
    );
};

export default Explore;
