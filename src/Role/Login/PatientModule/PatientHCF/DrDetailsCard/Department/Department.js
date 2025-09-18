import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Container5 from "../Container5";
import Container3 from "../Container3";
import { baseURL, CallCardData } from "../../../../../../constants/const";
import { Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axiosInstance from "../../../../../../config/axiosInstance";
import CustomButton from "../../../../../../components/CustomButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoAppointmentCard from "../../../../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const Department = () => {
    const [departData, setDepartData] = useState([]);
    const [nav_specialization, setNav_specialization] = useState([]);
    const [specializationCardData, setSpecializationCardData] = useState("");
    const [specializationDoc, setSpecializationDoc] = useState("CARDIOLOGIST");
    const [isLoadingNav, setIsLoadingNav] = useState(false); // For navigation specialization
    const [isLoadingCard, setIsLoadingCard] = useState(false); // For specialization card data

    const ID = useParams();

    const scrollContainerRef = useRef(null);

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 100;
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 100;
        }
    };

    const DoctorSpecialization = async (specialist) => {
        try {
            setIsLoadingCard(true);
            const response = await axiosInstance(`/sec/patient/getHcfdocByDept/${specialist}/6`);
            setSpecializationCardData(response?.data?.response[specialist] || []);
        } catch (err) {
            console.log("Specialization error:", err);
            setSpecializationCardData([]); // Ensure empty state on error
        } finally {
            setIsLoadingCard(false);
        }
    };

    useEffect(() => {
        if (specializationDoc !== "") {
            DoctorSpecialization(specializationDoc);
        }
    }, [specializationDoc]);

    const navSpecialization = async () => {
        try {
            setIsLoadingNav(true);
            const resp = await axios.get(`${baseURL}/sec/patient/doctorDepartments`);
            setNav_specialization(resp?.data?.response);
        } catch (err) {
            console.log("Nav specialization error:", err);
        } finally {
            setIsLoadingNav(false);
        }
    };

    useEffect(() => {
        navSpecialization();
    }, []);

    return (
        <>
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={`/patientdashboard/hcfDetailCard/${ID.hcfID}/about`}>About</NavLink>
                <NavLink to={`/patientdashboard/hcfDetailCard/${ID.hcfID}/department`}>Department</NavLink>
                <NavLink to={`/patientdashboard/hcfDetailCard/${ID.hcfID}/labs`}>Labs</NavLink>
            </nav>
            <div className="about-data" style={{ marginTop: "4rem", width: "100%" }}>
                {/* Horizontal scroll container */}
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
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
                                {isLoadingNav ? (
                                    Array.from({ length: 7 }).map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            width={220}
                                            height={26}
                                            style={{ margin: "0 5px", borderRadius: "20px" }}
                                        />
                                    ))
                                ) : (
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
                                                setSpecializationDoc(specialization?.department_name);
                                            }}
                                        />
                                    ))
                                )}
                            </div>
                        </Box>
                        <div onClick={handleScrollRight}>
                            <ChevronRightIcon />
                        </div>
                    </Box>

                    {/* Card data section */}
                    {isLoadingCard ? (
    <Skeleton
        width="100%"
        height={200}
        borderRadius="16px"
        style={{ margin: "1% 0" }}
    />
) : specializationCardData && specializationCardData.length > 0 ? (
    <CallCardData
        linkPath={`/patientdashboard/hcfDetailCard/hcfdoctor/`}
        sendCardData={specializationCardData}
        textField={""}
        hcfID={ID}
    />
) : (
    <NoAppointmentCard text_one={"NO Doctor found"}/>
)}
                </Box>
            </div>
        </>
    );
};

export default Department;
