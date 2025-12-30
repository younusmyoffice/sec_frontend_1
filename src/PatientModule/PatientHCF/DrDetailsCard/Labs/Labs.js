/**
 * Labs Component
 * 
 * Displays HCF lab test information by department:
 * - Horizontal scrollable navigation buttons for lab departments
 * - Lab test cards filtered by selected department
 * 
 * Features:
 * - Loading states with skeletons ✅
 * - Error handling with toast notifications ✅
 * - Horizontal scroll navigation with arrow buttons
 * 
 * API Endpoints:
 * - GET /sec/labDepartments (fetch available lab departments)
 * - GET /sec/patient/SingleLabFilters/{specializationHCF}/{hcfID} (fetch lab tests by department)
 * 
 * Security:
 * - Uses axiosInstance (automatic JWT token injection) ✅
 * - Validates HCF ID before API calls ✅
 * 
 * Error Handling:
 * - Toast notifications for errors ✅
 * - Empty state when no lab tests found ✅
 * 
 * @component
 */

import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Container5 from "../HcfDetailContainer5";
import Container3 from "../HcfDetailContainer3";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Skeleton, Typography } from "@mui/material";
import axiosInstance from "../../../../config/axiosInstance"; // Handles access token automatically
import CustomButton from "../../../../components/CustomButton";
import { HCFCardsData } from "../../../../constants/const";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications
import Loading from "../../../../components/Loading/Loading"; // Reusable loader component

const Labs = () => {
    logger.debug("🔵 Labs component rendering");
    
    const { hcfID } = useParams();
    const [nav_specialization, setNav_specialization] = useState([]);
    const scrollContainerRef = useRef(null);
    // Default to empty string - will be set to first available department after API fetch
    const [specializationHCF, setSpecializationHCF] = useState("");
    const [specializationCardData, setSpecializationCardData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state for departments
    const [loadingTests, setLoadingTests] = useState(false); // Loading state for lab tests
    const [isError, setIsError] = useState(false); // Track error state

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
     * Fetch available lab departments for navigation
     * Loads the list of lab departments to display in horizontal scroll
     */
    const navSpecialization = async () => {
        logger.debug("📋 Fetching lab departments...");
        setLoading(true);
        setIsError(false);
        
        try {
            const resp = await axiosInstance.get(`/sec/labDepartments`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            logger.debug("✅ Lab departments API response received", {
                hasResponse: !!resp?.data?.response,
                departmentsCount: resp?.data?.response?.length || 0,
            });
            
            // Validate response structure
            if (!resp?.data?.response || !Array.isArray(resp.data.response)) {
                logger.warn("⚠️ Invalid lab departments response structure");
                setNav_specialization([]);
                return;
            }
            
            setNav_specialization(resp.data.response);
            
            // Auto-select first department if available and no department is currently selected
            if (resp.data.response.length > 0 && !specializationHCF) {
                const firstDepartment = resp.data.response[0]?.lab_department_name || "";
                if (firstDepartment) {
                    logger.debug("✅ Auto-selecting first department", { department: firstDepartment });
                    setSpecializationHCF(firstDepartment);
                }
            }
            
            logger.debug("✅ Lab departments loaded successfully", { 
                count: resp.data.response.length 
            });
        } catch (err) {
            logger.error("❌ Failed to fetch lab departments:", err);
            
            // Extract error message from response
            const errorMessage = err?.response?.data?.message || 
                                err?.response?.data?.error || 
                                "Failed to load lab departments. Please try again.";
            
            toastService.error(errorMessage);
            setNav_specialization([]);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navSpecialization();
    }, []);

    /**
     * Handle horizontal scroll left
     * Scrolls the department buttons container to the left
     */
    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 100;
            logger.debug("⬅️ Scrolled left");
        }
    };

    /**
     * Handle horizontal scroll right
     * Scrolls the department buttons container to the right
     */
    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 100;
            logger.debug("➡️ Scrolled right");
        }
    };

    /**
     * Fetch lab tests for a specific department
     * Retrieves lab test list filtered by department and HCF
     * 
     * @param {string} specializationHCF - Lab department name
     */
    const HCFLabDoctor = async () => {
        // Validate HCF ID before fetching
        if (!validateHcfId()) {
            setSpecializationCardData([]);
            return;
        }
        
        if (!specializationHCF) {
            logger.warn("⚠️ Lab department name is missing");
            toastService.warning("Please select a lab department");
            setSpecializationCardData([]);
            return;
        }
        
        logger.debug("🧪 Fetching lab tests for department", { specializationHCF, hcfID });
        setLoadingTests(true);
        setIsError(false);
        
        try {
            const resp = await axiosInstance.get(
                `/sec/patient/SingleLabFilters/${specializationHCF}/${hcfID}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Lab tests API response received", {
                hasResponse: !!resp?.data?.response,
                hasDepartmentData: !!resp?.data?.response?.[specializationHCF],
                testsCount: resp?.data?.response?.[specializationHCF]?.length || 0,
            });
            
            // Extract lab test data for the selected department
            const labTestData = resp?.data?.response?.[specializationHCF] || [];
            
            if (labTestData.length === 0) {
                logger.info("ℹ️ No lab tests found for this department", { specializationHCF });
                toastService.info("No lab tests found in this department");
            } else {
                logger.debug("✅ Lab tests loaded successfully", { count: labTestData.length });
            }
            
            setSpecializationCardData(labTestData);
            setIsError(false);
        } catch (err) {
            logger.error("❌ Failed to fetch lab tests:", err);
            
            // Extract error message from response
            const errorMessage = err?.response?.data?.message || 
                                err?.response?.data?.error || 
                                "Failed to load lab tests. Please try again.";
            
            toastService.error(errorMessage);
            setSpecializationCardData([]);
            setIsError(true);
        } finally {
            setLoadingTests(false);
        }
    };

    /**
     * useEffect: Fetch lab tests when department changes
     * Automatically loads lab tests when a new department is selected
     * 
     * Note: eslint-disable-next-line is used because HCFLabDoctor uses validateHcfId
     * which depends on hcfID from useParams, and adding it would cause unnecessary re-renders
     */
    useEffect(() => {
        if (specializationHCF && specializationHCF !== "") {
            HCFLabDoctor();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [specializationHCF]);

    return (
        <div className="about-data" style={{ width: "100%", paddingBottom: "2rem" }}>
            {/* Note: Navigation tabs are rendered in parent HcfDetailContainer4 component */}
            {/* Main content area */}
                <Box sx={{ width: "100%" }}>
                    {/* Horizontal scroll container with arrow buttons */}
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        {/* Left arrow button */}
                        <div onClick={handleScrollLeft} style={{ cursor: "pointer" }}>
                            <ChevronLeftIcon />
                        </div>
                        
                        {/* Scrollable department buttons container */}
                        <Box 
                            sx={{ display: "flex", position: "relative", width: "100%" }} 
                            className="horizontal-scroll-container NavBar-Container-one"
                        >
                            <div ref={scrollContainerRef} style={{ overflowX: "auto", display: "flex" }}>
                                {loading ? (
                                    // Loading skeleton for department buttons
                                    Array.from({ length: 7 }).map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            width={120}
                                            height={36}
                                            style={{ margin: "0 5px", borderRadius: "20px" }}
                                        />
                                    ))
                                ) : (
                                    // Department navigation buttons
                                    nav_specialization.map((specialization, index) => (
                                        <CustomButton
                                            key={index}
                                            to={`/patientDashboard/${specialization?.lab_department_name.toLowerCase()}`}
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
                                                logger.debug("🧪 Lab department selected", {
                                                    department: specialization?.lab_department_name
                                                });
                                                setSpecializationHCF(specialization?.lab_department_name);
                                            }}
                                        />
                                    ))
                                )}
                            </div>
                        </Box>
                        
                        {/* Right arrow button */}
                        <div onClick={handleScrollRight} style={{ cursor: "pointer" }}>
                            <ChevronRightIcon />
                        </div>
                    </Box>

                    {/* Lab test cards section */}
                    {loadingTests ? (
                        // Loading skeleton for lab test cards
                        // Note: Using Skeleton instead of Loading component for inline loading states
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
                            {Array.from(new Array(5)).map((_, index) => (
                                <Skeleton key={index} variant="rectangular" width={250} height={150} />
                            ))}
                        </Box>
                    ) : isError ? (
                        // Error state - Display user-friendly error message
                        <Box sx={{ mt: 3, textAlign: "center" }}>
                            <Typography variant="body1" color="error">
                                Failed to load lab tests. Please try again.
                            </Typography>
                        </Box>
                    ) : specializationCardData && specializationCardData.length > 0 ? (
                        // Lab test cards display - Renders horizontal scrollable cards via HCFCardsData
                        <HCFCardsData sendCardData={specializationCardData} />
                    ) : (
                        // Empty state - HCFCardsData component handles empty state display
                        <HCFCardsData sendCardData={[]} />
                    )}
                </Box>
        </div>
    );
};

export default Labs;
