import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextareaAutosize, Typography } from "@mui/material";
import CustomButton from "../../../../components/CustomButton";
import "./termsandcondition.scss";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import { useListingMode } from "../../shared/useListingMode";
import SectionCard from "../../shared/SectionCard";
import StepHeader from "../../shared/StepHeader";

const TermsAndCondition = () => {
    const [data, setData] = useState({
        doctor_id: localStorage.getItem("doctor_suid"),
        doctor_list_id: localStorage.getItem("listing_id"),
        description: null,
    });
    const [submitApiFlag , setSubmitApiFlag] = useState(false);
    const [type , setType] = useState("success");
    const [isopen , setIsopen] = useState(false);
    const [message , setMessage] = useState("")
    const [showError, setShowError] = useState(false);
    useEffect( () => {
        if(submitApiFlag){
            fetchData();
        }
    } , [submitApiFlag] )

    const { mode, listingId, doctorId, setUnifiedListingId } = useListingMode();

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "termandcondition");
        
        // Ensure unified listing id in edit mode
        setUnifiedListingId();
        
        // Step guard: require listing_id to proceed
        if (!listingId) {
            console.warn("No listing_id found. Redirecting to listing details.");
            navigate("/doctordashboard/doctorListing/listingdetails", { replace: true });
        }
    }, []);
    const navigate = useNavigate();


    const fetchData = async () => {
        console.log("Entered the fetch data");
        setIsopen(false);
        try {
            if (!data?.description || String(data?.description).trim() === '') {
                setShowError(true);
                setSubmitApiFlag(false);
                return;
            }
            let response = await axiosInstance.post('/sec/createUpdatedoctorlisting/terms' , JSON.stringify({
                ...data,
                doctor_id: doctorId,
                doctor_list_id: listingId,
            }));
            console.log(response?.data?.response?.message)
            setMessage(response?.data?.response?.message)
            setSubmitApiFlag(false)
            setType("success")
            setIsopen(true);
            
            // Clean up editing state when completing the entire flow
            localStorage.removeItem("editing_listing_id");
            console.log("Completed listing flow, cleaned up editing state");
            
            setTimeout( () => {
                navigate("/doctordashboard/doctorListing/doctoractiveListing", { replace: true });
            } , 2000 )

        } catch (error) {
            alert("Fill the details properly", error);
            console.log(error.response);
            setSubmitApiFlag(false);
            setType("error");
            setIsopen(true);
            setMessage(error.response)
        }
    };


    return (
        <>
            <CustomSnackBar isOpen={isopen} message={message} type={type}  />
            <div className="main-container" style={{ width: '100%', maxWidth: 960, margin: '0 auto' }}>
                <StepHeader />
                <SectionCard title="Terms & Conditions" subtitle="These will be shown to patients before booking">
                    <Box sx={{ width: '100%' }}>
                        <TextareaAutosize
                            minRows={8}
                            maxRows={8}
                            style={{ width: "100%", padding: "1%", borderRadius: "12px"  , overflow : "auto" , maxHeight : "70%", border: showError && (!data?.description || String(data?.description).trim() === '') ? '2px solid #d32f2f' : '1px solid #E0E0E0' }}
                            onInput={event => setData({...data , description : event?.target?.value})}
                        />
                        {showError && (!data?.description || String(data?.description).trim() === '') && (
                            <Typography sx={{ color: '#d32f2f', fontSize: 12, mt: 0.5 }}>Description is required</Typography>
                        )}
                    </Box>
                </SectionCard>
                <Box sx={{ marginTop: "1%" }}>
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Save As Draft"
                        isTransaprent={true}
                    />
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Submit"
                        isDisabled={!data?.description || String(data?.description).trim() === ''}
                        handleClick={() => setSubmitApiFlag(true)}
                    />
                </Box>
            </div>
        </>
    );
};

export default TermsAndCondition;
