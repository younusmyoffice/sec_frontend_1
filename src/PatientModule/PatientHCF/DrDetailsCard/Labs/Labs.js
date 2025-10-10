import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Container5 from "../Container5";
import Container3 from "../Container3";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Skeleton } from "@mui/material";
import axiosInstance from "../../../../config/axiosInstance";
import CustomButton from "../../../../components/CustomButton";
import { HCFCardsData } from "../../../../constants/const";

const Labs = () => {
    const { hcfID } = useParams();
    const [nav_specialization, setNav_specialization] = useState([]);
    const scrollContainerRef = useRef(null);
    const [specializationHCF, setSpecializationHCF] = useState("Microbiology");
    const [specializationCardData, setSpecializationCardData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state added

    const navSpecialization = async () => {
        setLoading(true); // Start loading
        try {
            const resp = await axiosInstance(`/sec/labDepartments`);
            setNav_specialization(resp?.data?.response);
        } catch (err) {
            console.log("Nav specialization error : ", err);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        navSpecialization();
    }, []);

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

    const HCFLabDoctor = async () => {
        setLoading(true); // Start loading for specialization data
        try {
            const resp = await axiosInstance(`/sec/patient/SingleLabFilters/${specializationHCF}/${hcfID}`);
            console.log("🔍 SingleLabFilters API Response:", resp?.data);
            console.log("🔍 Specialization data:", resp?.data?.response[specializationHCF]);
            setSpecializationCardData(resp?.data?.response[specializationHCF] || []);
        } catch (err) {
            setSpecializationCardData([]);
            console.log("Nav specialization error : ", err);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        HCFLabDoctor();
    }, [specializationHCF]);

    return (
        <>
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={`/patientdashboard/hcfDetailCard/${hcfID}/about`}>About</NavLink>
                <NavLink to={`/patientdashboard/hcfDetailCard/${hcfID}/department`}>Department</NavLink>
                <NavLink to={`/patientdashboard/hcfDetailCard/${hcfID}/labs`}>Labs</NavLink>
            </nav>
            <div className="about-data" style={{ marginTop: "4rem", width: "100%" }}>
                {/* Skeleton loader for the buttons */}
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <div onClick={handleScrollLeft}>
                            <ChevronLeftIcon />
                        </div>
                        <Box sx={{ display: "flex", position: "relative", width: "100%" }} className="horizontal-scroll-container NavBar-Container-one">
                            <div ref={scrollContainerRef} style={{ overflowX: "auto", display: "flex" }}>
                                {
                                    nav_specialization.map((specialization, index) => (
                                        <CustomButton
                                            key={index}
                                            to={`/patientdashboard/${specialization?.lab_department_name.toLowerCase()}`}
                                            label={`${specialization?.lab_department_name.toLowerCase()}`}
                                            isTransaprent={
                                                specialization.lab_department_name.toLowerCase() ===
                                                specializationHCF.toLowerCase()
                                                    ? false
                                                    : true
                                            }
                                            buttonCss={{
                                                borderRadius: "50px",
                                                padding: "0 6.5%",
                                                marginRight: "1%",
                                                whiteSpace: "normal",
                                                textWrap: "nowrap",
                                            }}
                                            handleClick={() => {
                                                setSpecializationHCF(specialization?.lab_department_name);
                                            }}
                                        />
                                    ))
                                }
                            </div>
                        </Box>
                        <div onClick={handleScrollRight}>
                            <ChevronRightIcon />
                        </div>
                    </Box>

                    {/* Skeleton loader for HCFCardsData content */}
                    {loading ? (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
                            {Array.from(new Array(5)).map((_, index) => (
                                <Skeleton key={index} variant="rectangular" width={250} height={150} />
                            ))}
                        </Box>
                    ) : (
                        <HCFCardsData
                            sendCardData={specializationCardData}
                        />
                    )}
                </Box>
            </div>
        </>
    );
};

export default Labs;
