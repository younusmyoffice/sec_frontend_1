import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DoctorCard from "../components/DoctorCard/DoctorCard";
import HealthcareFacilityCard from "../components/HealthcareFacilityCard/HealthcareFacilityCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Skeleton from "react-loading-skeleton";
import NoAppointmentCard from "../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import HCFDrCard from "../PatientModule/PatientHCF/DrDetailsCard/Labs/HCFDrCard";

// Re-export constants from apiConstants to maintain backward compatibility
export { baseURL, front_end_url, emailRegex, passwordRegex, numberRegex } from "./apiConstants";

export const CallCardData = React.memo(({ sendCardData, textField, linkPath, loading, hcfID=null }) => {
    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 200;
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 200;
        }
    };

    console.log("this is the hcf id : ",hcfID?.hcfID);

    return (
        <Box sx={{ width: "100%", marginTop: "2rem" }}>
            {textField && textField.trim() && ( // Only render if textField is not null or empty
                <Box sx={{ 
                    marginBottom: "1.5rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "2px solid #E72B4A",
                    width: "fit-content"
                }}>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            fontWeight: "bold", 
                            fontSize: "24px",
                            color: "#333",
                            margin: 0,
                            fontFamily: "Poppins, sans-serif"
                        }}
                    >
                        {textField}
                    </Typography>
                </Box>
            )}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    marginTop: "0.5rem", // Additional spacing after heading
                }}
            >
                <IconButton aria-label="Scroll left" onClick={scrollLeft}>
                    <ChevronLeftIcon />
                </IconButton>
                <div
                    ref={containerRef}
                    style={{
                        width: "calc(100% - 48px)",
                        overflowX: "auto",
                        display: "flex",
                        scrollbarWidth: "none",
                        scrollBehavior: "smooth",
                        padding: "8px 0",
                    }}
                >
                    <Box sx={{ 
                        borderRadius: 1, 
                        display: "flex",
                        gap: 2,
                        minWidth: "fit-content",
                        flexWrap: "nowrap", // Prevent wrapping
                        alignItems: "stretch" // Ensure consistent height
                    }}>
                        {loading ? (
                            [...Array(4)].map((_, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: "300px",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Skeleton
                                        height="130px"
                                        width="100%"
                                        sx={{ borderRadius: "12px" }}
                                    />
                                </Box>
                            ))
                        ) : sendCardData?.length === 0 ? (
                            <Box sx={{ 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center",
                                height: "200px",
                                width: "100%",
                                minWidth: "300px"
                            }}>
                                <NoAppointmentCard
                                    text_one="No Data found"
                                />
                            </Box>
                        ) : (
                            sendCardData?.slice(0, 10).map((dataprop, index) => {
                                const url = hcfID === null || undefined ? `${linkPath}${dataprop.suid}` : `${linkPath}${dataprop.suid}/${hcfID?.hcfID}`;
                                console.log("🔍 CallCardData URL construction:", {
                                    dataprop,
                                    dataprop_suid: dataprop.suid,
                                    hcfID,
                                    hcfID_hcfID: hcfID?.hcfID,
                                    linkPath,
                                    finalURL: url
                                });
                                console.log("🔍 DoctorCard DrData:", dataprop);
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: "300px",
                                            flexShrink: 0,
                                            textDecoration: "none",
                                        }}
                                    >
                                        <Link
                                            to={url}
                                            style={{
                                                textDecoration: "none",
                                                display: "block",
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        >
                                            {textField === "Healthcare Facility" ? (
                                                <HealthcareFacilityCard 
                                                    facility={{
                                                        name: `${dataprop?.first_name || ""} ${dataprop?.last_name || ""}`.trim(),
                                                        type: dataprop?.facility_type || "Healthcare Facility",
                                                        rating: dataprop?.average_review || "N/A",
                                                        review_count: dataprop?.review_count || 0,
                                                        location: dataprop?.address || dataprop?.location || "Location not specified",
                                                        logo: dataprop?.profile_picture
                                                    }}
                                                    onClick={() => {}}
                                                />
                                            ) : (
                                                <DoctorCard DrData={dataprop}/>
                                            )}
                                        </Link>
                                    </Box>
                                );
                            })
                        )}
                    </Box>
                </div>
                <IconButton aria-label="Scroll right" onClick={scrollRight}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
        </Box>
    );
});

// PropTypes for CallCardData
CallCardData.propTypes = {
    sendCardData: PropTypes.array.isRequired,
    textField: PropTypes.string,
    linkPath: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    hcfID: PropTypes.object,
};

CallCardData.defaultProps = {
    textField: "",
    loading: false,
    hcfID: null,
};

export const currencysign = "₹";
export const patient_suid = localStorage.getItem("patient_suid");

export const HCFCardsData = ({ sendCardData, textField, linkPath, loading }) => {
    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 200;
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 200;
        }
    };

    return (
        <Box sx={{ width: "100%", marginTop: "1%" }}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                }}
            >
                <IconButton aria-label="Scroll left" onClick={scrollLeft}>
                    <ChevronLeftIcon />
                </IconButton>
                <div
      ref={containerRef}
      style={{
        width: "calc(100% - 48px)",
        overflowX: "auto",
        display: "flex",
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
        padding: "8px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap", // Prevent wrapping to ensure horizontal scrolling
          gap: 2, // Consistent spacing between cards
          minWidth: "fit-content", // Ensure the container respects card widths
        }}
      >
        {loading ? (
          [...Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              height="240px" // Match HCFDrCard minHeight
              width="360px" // Match HCFDrCard width
              sx={{ marginRight: 2, borderRadius: "12px", flexShrink: 0 }}
            />
          ))
        ) : sendCardData?.length === 0 ? (
          <NoAppointmentCard
            style={{ height: "240px", width: "360px", flexShrink: 0 }}
            text_one="No Data Found"
          />
        ) : (
          sendCardData?.slice(0, 10).map((dataprop, index) => (
            <HCFDrCard
              key={index}
              data={dataprop}
              sx={{ flexShrink: 0 }} // Prevent card from shrinking
            />
          ))
        )}
      </Box>
    </div>
                <IconButton aria-label="Scroll right" onClick={scrollRight}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
        </Box>
    );
};

export const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

export const formatOnlyDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const formatDateDay = (isoDate) => {
    if (!isoDate) {
        return ""; // Return an empty string or any default message you prefer
    }

    try {
        const date = new Date(isoDate);
        if (isNaN(date)) {
            return ""; // Return empty string if the date is invalid
        }

        return date.toLocaleString("en-US", {
            weekday: "short", // Short form of the day, e.g., "Fri"
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch (error) {
        return ""; // Fallback for unexpected errors
    }
};

export const formatTime = (timeString) => {
    if (!timeString || typeof timeString !== 'string') {
        return 'Invalid Time'; // Fallback for undefined or invalid input
    }

    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convert 0 or 12 to 12 for 12-hour format
    return `${formattedHour}:${minutes}${isPM ? 'PM' : 'AM'}`;
};

