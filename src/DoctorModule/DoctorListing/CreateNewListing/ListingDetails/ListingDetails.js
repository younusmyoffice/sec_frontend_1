import React, { useState } from "react";
import "./listingdetails.scss";
import { NavLink } from "react-router-dom";
import { Box, Typography, TextField, TextareaAutosize } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";

function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

const ListingDetails = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "listingdetails");
    }, []);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [value, setValue] = useState([null, null]);
    const [message , setMessage] = useState("");
    const [isopen , setIsopen] = useState(false)
    const [data, setData] = useState({
        doctor_id: localStorage.getItem('doctor_suid'),
        listing_name: null,
        working_days_start: null,
        working_days_end: null,
        working_time_start: null,
        working_time_end: null,
        about: null,
        is_active: 0
    });

    // For text Area function ---
    const handleChange = (event) => {
        setInputValue(event.target.value);
        console.log(event.target.value)
        setIsTyping(true); // Set isTyping to true when typing
        setData({...data , about : event?.target?.value})
    };

    const handleBlur = () => {
        setIsTyping(false); // Set isTyping to false when blur
    };

    //   For text area functions ends -----

    const fetchData = async () => {
        setIsopen(false);
        try {
            const response = await axiosInstance.post("/sec/createUpdatedoctorlisting/listing",JSON.stringify(data));
            // console.log("Listing ID : " , response?.data?.response?.docListingCreate?.doctor_list_id);
            localStorage.setItem("listing_id" , response?.data?.response?.docListingCreate?.doctor_list_id);
            setMessage(response?.data?.response?.message)
            if(response?.data?.response === "Listing Already Exists"){
                alert(response?.data?.response);
                setMessage(response?.data?.response)
                setIsopen(true)
            }else{
                setIsopen(true);
                setTimeout( () => {
                    navigate("/doctordashboard/doctorListing/addplans", { replace: true });
                } , 2500 )
            }
        } catch (error) {
            alert("Fill the details properly", error);
            console.log(error.response);
        }
    };

    const navigate = useNavigate();
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);

    const handleInputChange = (event) => {
        const copy = { ...data, listing_name: event.target.value };
        setData(copy);
        checkFields(copy);
    };

    const handleDateRangeChange = (newValue) => {
        console.log("Changing the data")
        setData({
            ...data,
            working_days_start: `${newValue[0]?.$y}-${newValue[0]?.$M + 1}-${newValue[0]?.$D}`,
            working_days_end: `${newValue[1]?.$y}-${newValue[1]?.$M + 1}-${newValue[1]?.$D}`
        });
        // checkFields(data);
    };

    const handleTimeRangeChange = (newValue) => {
        setData({
            ...data,
            working_time_start: `${newValue[0]?.$H}:${newValue[0]?.$m}`,
            working_time_end: `${newValue[1]?.$H}:${newValue[1]?.$m}`,
        });
        checkFields(data);
    };

    const checkFields = (formData) => {
        // Check if all required fields are filled
        const isFilled =
            formData.listing_name &&
            formData.working_days_start &&
            formData.working_days_end &&
            formData.working_time_start &&
            formData.working_time_end;

        // Update the state variable
        setIsFieldsFilled(isFilled);
    };

    return (
        <>
            <CustomSnackBar type={"success"} isOpen={isopen} message={message} />
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
                {/* <div className="Doctor-detail">
                    <div className="doc-profile">
                        <div className="image-container">
                            <Box
                                sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                                component={"img"}
                                src={DrImage}
                            ></Box>
                        </div>
                        <div
                            className="Detail-container"
                            sx={{
                                // border:'1px solid',
                                // height:'60%',
                                marginTop: "1%",
                            }}
                        >
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "14px",
                                    fontstyle: "normal",
                                    fontweight: "500",
                                    lineheight: "22px",
                                    letterSpacing: "0.07px",
                                }}
                            >
                                Dr.Maria Garcia
                            </Typography>
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "10px",
                                    fontstyle: "normal",
                                    fontweight: "400",
                                    lineheight: "15px",
                                    letterSpacing: "0.08px",
                                    color: "grey",
                                }}
                            >
                                Neurologist
                            </Typography>
                        </div>
                    </div>
                    <div className="Edit-btn">
                        <CustomButton
                            label="Edit Profile"
                            isTransaprent={"false"}
                            buttonCss={{
                                display: "flex",
                                borderBottom: "1px",
                                borderTop: "1px",
                                borderRight: "1px",
                                borderLeft: "1px",
                                width: "122px",
                                height: "48px",
                                padding: "8px 16px",
                                justifycontent: "flex-end",
                                alignItems: "center",
                                gap: "8px",
                                flexShrink: "0",
                                color: "red",
                            }}
                        ></CustomButton>
                    </div>
                </div> */}
                <Box
                    sx={{
                        position: "relative",
                        marginTop: "2rem",
                        width: "100%",
                        display: "flex",
                        alignItems: "start",
                        flexWrap: "wrap",
                        gap: "2.5rem",
                    }}
                >
                    <div
                        className="form-container"
                        style={{
                            width: "35%",
                            minWidth: "300px",
                        }}
                    >
                        <Typography
                            style={{
                                fontfamily: "Poppins",
                                fontsize: "16px",
                                fontstyle: "normal",
                                fontweight: "500",
                                lineheight: "30px",
                                width: "max-content",
                            }}
                        >
                            Add Details
                        </Typography>
                        <div>
                            <CustomTextField
                                helperText={""}
                                label="Listing Name"
                                defaultValue={data?.listing_name}
                                onInput={(event) => {
                                    handleInputChange(event);
                                    const Copy = { ...data, listing_name: event.target.value };
                                    setData(Copy);
                                }}
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                    flexShrink: "0",
                                }}
                            >
                                Listing name
                            </CustomTextField>
                        </div>
                    </div>

                    <div
                        className="form-container"
                        style={{
                            width: "50%",
                            minWidth: "300px",
                        }}
                    >
                        <Typography
                            style={{
                                fontfamily: "Poppins",
                                fontsize: "16px",
                                fontstyle: "normal",
                                fontweight: "500",
                                width: "max-content",
                                lineheight: "30px",
                            }}
                        >
                            Working Days
                        </Typography>
                        <div className="Date-range-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateRangePicker
                                    disablePast
                                    value={value}
                                    maxDate={getWeeksAfter(value[0], 4)}
                                    onChange={(newValue) => {
                                        handleDateRangeChange(newValue);
                                        // setData({
                                        //     ...data,
                                        //     working_days_start: `${newValue[0]?.$D}-${
                                        //         newValue[0]?.$M + 1
                                        //     }-${newValue[0]?.$y}`,
                                        //     working_days_end: `${newValue[1]?.$D}-${
                                        //         newValue[1]?.$M + 1
                                        //     }-${newValue[1]?.$y}`,
                                        // });
                                    }}
                                    renderInput={(FromProps, ToProps) => (
                                        <React.Fragment>
                                            <TextField {...FromProps} variant="standard" />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...ToProps} variant="standard" />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div
                        className="form-container"
                        style={{
                            width: "50%",
                            minWidth: "300px",
                        }}
                    >
                        <Typography
                            style={{
                                fontfamily: "Poppins",
                                fontsize: "16px",
                                fontstyle: "normal",
                                fontweight: "500",
                                width: "max-content",
                                lineheight: "30px",
                            }}
                        >
                            Working Time
                        </Typography>
                        <div className="Time-range-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                        "MultiInputTimeRangeField",
                                        "SingleInputTimeRangeField",
                                    ]}
                                >
                                    <MultiInputTimeRangeField
                                        onChange={(newValue) => {
                                            handleTimeRangeChange(newValue);
                                            console.log("this is time value : ", newValue);

                                            setData({
                                                ...data,
                                                working_time_start: `${newValue[0]?.$H}:${newValue[0]?.$m}`,
                                                working_time_end: `${newValue[1]?.$H}:${newValue[1]?.$m}`,
                                            });
                                        }}
                                        slotProps={{
                                            textField: ({ position }) => ({
                                                label: position === "start" ? "From" : "To",
                                            }),
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </Box>
                <div className="About">
                    <Typography
                        style={{
                            fontfamily: "Poppins",
                            fontsize: "16px",
                            fontstyle: "normal",
                            fontweight: "500",
                            lineheight: "30px",
                            width: "max-content",
                        }}
                    >
                        About
                    </Typography>
                </div>
                <div className="data-field">
                    <TextareaAutosize
                        minRows={5}
                        style={{ width: "100%",  border: isTyping ? '2px solid green' : 'none', padding: "1%" }}
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></TextareaAutosize>
                </div>
                <Box sx={{ marginTop: "1%" }}>
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Save As Draft"
                        isTransaprent={true}
                        isDisabled={!isFieldsFilled}
                        handleClick={() => fetchData()}
                    />
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Next"
                        isDisabled={!isFieldsFilled}
                        handleClick={() => fetchData()}
                    />
                </Box>
            </div>
        </>
    );
};

export default ListingDetails;
