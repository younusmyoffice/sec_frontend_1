import { Box } from "@mui/material";
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
import axiosInstance from "../../../config/axiosInstance";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDateDay } from "../../../constants/const";

const HCFDetailedCard = () => {
    const params = useParams();
    const ID = params.hcfID;
    console.log("🔍 HCF ID from params:", ID);

    const [hcfData, setHCFDataId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Track loading state
    const [isError, setIsError] = useState(false);    // Track error state

    const fetchDataHCFCardsId = async () => {
        try {
            setIsLoading(true); // Start loading
            console.log("📤 Fetching HCF details for ID:", ID);
            const response = await axiosInstance(`/sec/patient/dashboardHcfdetailsbyId/${ID}`);
            console.log("✅ HCF Details Response:", response?.data?.response[0]);
            setHCFDataId(response?.data?.response[0]);
            setIsLoading(false); // End loading
        } catch (error) {
            console.log("❌ HCF Details Error:", error.response);
            setIsLoading(false); // End loading
            setIsError(true);    // Set error state
        }
    };

    useEffect(() => {
        if (ID) {
            fetchDataHCFCardsId();
        }
    }, [ID]);

    const fallbackText = "Not Available";
    const isDataEmpty = !hcfData;

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {/* Loading Skeleton */}
            {isLoading && !isError ? (
                <Skeleton height={200} />
            ) : isError ? (
                <Box sx={{ padding: 2, color: "red" }}>Error fetching HCF data, please try again later.</Box>
            ) : (
                <>
                    {/* Main Content */}
                    <HcfDetailContainer1
                        business_name={`${hcfData?.first_name ?? fallbackText} ${hcfData?.middle_name ?? fallbackText} ${hcfData?.last_name ?? fallbackText}`}
                        company_name={hcfData?.company_name ?? fallbackText}
                        worktime={`${formatDateDay(hcfData?.service_day_from) ?? fallbackText} - ${formatDateDay(hcfData?.service_day_to) ?? fallbackText}`}
                        Qualification={hcfData?.hcf_name ?? fallbackText}
                        profile_picture={hcfData?.profile_picture ?? ""}
                        isLoading={isLoading} // Pass isLoading prop to Container1
                    />
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

export default HCFDetailedCard;
