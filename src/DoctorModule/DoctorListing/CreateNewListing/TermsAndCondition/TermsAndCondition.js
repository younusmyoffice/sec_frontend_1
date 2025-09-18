import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, TextareaAutosize, Typography } from "@mui/material";
import CustomButton from "../../../../components/CustomButton";
import "./termsandcondition.scss";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";

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
    useEffect( () => {
        if(submitApiFlag){
            fetchData();
        }
    } , [submitApiFlag] )

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "termandcondition");
    }, []);
    const navigate = useNavigate();


    const fetchData = async () => {
        console.log("Entered the fetch data");
        setIsopen(false);
        try {
            let response = await axiosInstance.post('/sec/createUpdatedoctorlisting/terms' , JSON.stringify(data));
            console.log(response?.data?.response?.message)
            setMessage(response?.data?.response?.message)
            setSubmitApiFlag(false)
            setType("success")
            setIsopen(true);
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
            <nav className="NavBar-Box-one">
                <NavLink to={"/doctordashboard/doctorListing/listingdetails"}>
                    Listing Details
                </NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addplans"}>Add Plans</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addquestioner"}>
                    Add Questioner
                </NavLink>
                <NavLink to={"/doctordashboard/doctorListing/termandcondition"}>
                    Term & Conditions
                </NavLink>
            </nav>

            <div className="main-container">
                <div className="Terms-Conditions-Container">
                    <div className="terms-condition-title">
                        <Typography
                            style={{
                                color: "#313033",
                                fontfamily: "poppins",
                                fontsize: "16px",
                                fontweight: "600",
                                lineheight: "24px",
                            }}
                        >
                            Terms & Conditions
                        </Typography>
                    </div>
                    <div className="Conditions">
                        <Box
                            sx={{
                                display: "flex", // border:'1px solid'
                                flexWrap: "wrap",
                                width: "100%",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                {/* <CustomTextField helperText={""} label={""} maxRows={4} /> */}
                                <TextareaAutosize
                                    minRows={8}
                                    maxRows={8}
                                    style={{ width: "100%", padding: "1%", borderRadius: "12px"  , overflow : "auto" , maxHeight : "70%" }}
                                    onInput={event => setData({...data , description : event?.target?.value})}
                                />
                                <Typography>&#8226;{data?.description}</Typography>
                                <Typography>&#8226;Note</Typography>
                                <Typography>&#8226;etc</Typography>
                            </div>
                        </Box>
                    </div>
                </div>
                <Box sx={{ marginTop: "1%" }}>
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Save As Draft"
                        isTransaprent={true}
                    />
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Submit"
                        handleClick={() => setSubmitApiFlag(true)}
                    />
                </Box>
            </div>
        </>
    );
};

export default TermsAndCondition;
