/**
 * Department Component
 * 
 * Displays HCF department information and doctors by specialization:
 * - Horizontal scrollable navigation buttons for specializations
 * - Doctor cards filtered by selected department
 * 
 * Features:
 * - Loading states with skeletons ✅
 * - Error handling with toast notifications ✅
 * - Horizontal scroll navigation
 * 
 * API Endpoints:
 * - GET /sec/patient/doctorDepartments (fetch available departments)
 * - GET /sec/patient/getHcfdocByDept/{specialist}/6/{hcfID} (fetch doctors by department)
 * 
 * Security:
 * - Uses axiosInstance (automatic JWT token injection) ✅
 * - Validates HCF ID before API calls ✅
 * 
 * Error Handling:
 * - Toast notifications for errors ✅
 * - Empty state component when no doctors found ✅
 * 
 * @component
 */

import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CallCardData } from "../../../../constants/const";
import { Box } from "@mui/material";
import axiosInstance from "../../../../config/axiosInstance"; // Handles access token automatically
import CustomButton from "../../../../components/CustomButton";
import HorizontalScrollCards from "../../../../components/HorizontalScrollCards/HorizontalScrollCards";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoAppointmentCard from "../../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications
import Loading from "../../../../components/Loading/Loading"; // Reusable loader component

const Department = () => {
    logger.debug("🔵 Department component rendering");
    
    const [nav_specialization, setNav_specialization] = useState([]);
    const [specializationCardData, setSpecializationCardData] = useState([]);
    const [specializationDoc, setSpecializationDoc] = useState("CARDIOLOGIST");
    const [isLoadingNav, setIsLoadingNav] = useState(false); // For navigation specialization
    const [isLoadingCard, setIsLoadingCard] = useState(false); // For specialization card data
    const [isError, setIsError] = useState(false); // Track error state

    const ID = useParams();
    logger.debug("🔍 Department component params", { params: ID });
    
    // Fallback: try to get hcfID from different param names
    const hcfID = ID.hcfID || ID.id || ID.ID || null;
    
    /**
     * Validate HCF ID before making API calls
     */
    const validateHcfId = () => {
        if (!hcfID) {
            logger.warn("⚠️ HCF ID not found in URL parameters");
            toastService.warning("HCF ID is missing");
            setIsError(true);
            return false;
        }
        return true;
    };

    /**
     * Fetch doctors for a specific specialization/department
     * Retrieves doctor list filtered by department and HCF
     * 
     * @param {string} specialist - Department/specialization name
     */
    const DoctorSpecialization = async (specialist) => {
        // Validate HCF ID before fetching
        if (!validateHcfId()) {
            setSpecializationCardData([]);
            return;
        }
        
        if (!specialist) {
            logger.warn("⚠️ Specialist name is missing");
            toastService.warning("Please select a department");
            setSpecializationCardData([]);
            return;
        }
        
        logger.debug("🏥 Fetching doctors for specialization", { specialist, hcfID });
        setIsLoadingCard(true);
        setIsError(false);
        
        try {
            const response = await axiosInstance.get(
                `/sec/patient/getHcfdocByDept/${specialist}/6/${hcfID}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Department API response received", {
                hasResponse: !!response?.data?.response,
                hasSpecialistData: !!response?.data?.response?.[specialist],
                doctorsCount: response?.data?.response?.[specialist]?.length || 0,
            });
            
            // Extract doctor data for the selected specialization
            const doctorData = response?.data?.response?.[specialist] || [];
            
            if (doctorData.length === 0) {
                logger.info("ℹ️ No doctors found for this specialization", { specialist });
                toastService.info("No doctors found in this department");
            } else {
                logger.debug("✅ Doctors loaded successfully", { count: doctorData.length });
            }
            
            setSpecializationCardData(doctorData);
            setIsError(false);
        } catch (err) {
            logger.error("❌ Failed to fetch doctors by department:", err);
            
            // Extract error message from response
            const errorMessage = err?.response?.data?.message || 
                                err?.response?.data?.error || 
                                "Failed to load doctors. Please try again.";
            
            toastService.error(errorMessage);
            setSpecializationCardData([]);
            setIsError(true);
        } finally {
            setIsLoadingCard(false);
        }
    };

    /**
     * useEffect: Fetch doctors when specialization changes
     * Automatically loads doctors when a new department is selected
     */
    useEffect(() => {
        if (specializationDoc && specializationDoc !== "") {
            DoctorSpecialization(specializationDoc);
        }
    }, [specializationDoc]);

    /**
     * Fetch available departments/specializations for navigation
     * Loads the list of departments to display in horizontal scroll
     */
    const navSpecialization = async () => {
        logger.debug("📋 Fetching navigation specializations...");
        setIsLoadingNav(true);
        setIsError(false);
        
        try {
            const resp = await axiosInstance.get(`/sec/patient/doctorDepartments`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            logger.debug("✅ Navigation API response received", {
                hasResponse: !!resp?.data?.response,
                departmentsCount: resp?.data?.response?.length || 0,
            });
            
            // Validate response structure
            if (!resp?.data?.response || !Array.isArray(resp.data.response)) {
                logger.warn("⚠️ Invalid navigation response structure");
                setNav_specialization([]);
                return;
            }
            
            setNav_specialization(resp.data.response || []);
            logger.debug("✅ Departments loaded successfully", { 
                count: resp.data.response.length 
            });
        } catch (err) {
            logger.error("❌ Failed to fetch departments:", err);
            
            // Extract error message from response
            const errorMessage = err?.response?.data?.message || 
                                err?.response?.data?.error || 
                                "Failed to load departments. Please try again.";
            
            toastService.error(errorMessage);
            setNav_specialization([]);
            setIsError(true);
        } finally {
            setIsLoadingNav(false);
        }
    };

    /**
     * useEffect: Fetch departments on component mount
     * Loads the list of available departments/specializations
     */
    useEffect(() => {
        navSpecialization();
    }, []);

    return (
        <div className="about-data" style={{ width: "100%", paddingBottom: "2rem" }}>
            {/* Note: Navigation tabs are rendered in parent HcfDetailContainer4 component */}
            {/* Main content area */}
                {/* Horizontal scroll container - Using reusable HorizontalScrollCards */}
                <HorizontalScrollCards
                    title=""
                    viewAllText=""
                    onViewAllClick={null}
                >
                    {isLoadingNav ? (
                        // Loading skeleton for department buttons
                        Array.from({ length: 7 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                width={220}
                                height={26}
                                style={{ margin: "0 5px", borderRadius: "20px" }}
                            />
                        ))
                    ) : (
                        // Department navigation buttons
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
                                    flexShrink: 0,
                                    minWidth: "fit-content",
                                }}
                                handleClick={() => {
                                    logger.debug("🏥 Department selected", {
                                        department: specialization?.department_name
                                    });
                                    setSpecializationDoc(specialization?.department_name);
                                }}
                            />
                        ))
                    )}
                </HorizontalScrollCards>

                {/* Doctor cards section */}
                <Box sx={{ width: "100%", marginTop: "2rem" }}>
                    {isLoadingCard ? (
                        // Loading skeleton for doctor cards
                        <Skeleton
                            width="100%"
                            height={200}
                            borderRadius="16px"
                            style={{ margin: "1% 0" }}
                        />
                    ) : isError ? (
                        // Error state
                        <NoAppointmentCard text_one={"Failed to load doctors. Please try again."} />
                    ) : specializationCardData && specializationCardData.length > 0 ? (
                        // Doctor cards display
                        <CallCardData
                            linkPath={`/patientDashboard/hcfDetailCard/hcfDoctor/`}
                            sendCardData={specializationCardData}
                            textField={`${specializationDoc} Doctors`}
                            hcfID={{hcfID: hcfID}}
                            loading={isLoadingCard}
                        />
                    ) : (
                        // Empty state
                        <NoAppointmentCard text_one={"No doctors found in this department"} />
                    )}
                </Box>
        </div>
    );
};

export default Department;
