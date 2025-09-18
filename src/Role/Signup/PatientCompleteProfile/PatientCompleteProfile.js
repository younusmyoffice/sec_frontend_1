import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "./patientcompleteprofile.scss";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import CustomDatePicker from "../../../components/CustomDatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../components/CustomButton";
import { baseURL } from "../../../constants/const";
import CustomSnackBar from "../../../components/CustomSnackBar";
import ClassicFrame from "../../../static/images/DrImages/Undraw.png";
import ImageFrame from "../../../static/images/DrImages/Frame1.png";
import axiosInstance from "../../../config/axiosInstance";
import { getCurrentUser, getCurrentUserId, getCurrentRoleId, getCurrentUserEmail } from "../../../utils/jwtUtils";

const steps = ["", ""];

const PatientCompleteProfile = () => {
    const dropdownItems = ["Male", "Female", "Others"];
    const [activeDropdown, setActiveDropdown] = useState("");
    const navigate = useNavigate();
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [value, setValue] = useState([null, null]);
    const radioValues = ["My self"];
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarType, setSnackBarType] = useState("success");
    const [countryValues, setCountryValue] = useState([]);
    const [countryNames, setCountryNames] = useState(["Please Wait"]);
    const [stateValue, setStateValue] = useState([]);
    const [stateName, setStateName] = useState("");
    const [stateNames, setStateNames] = useState(["Please Wait"]);
    const [cityValues, setCityValues] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [selectedCountryFromDropDown, setSelectedCountryFromDropDown] = useState([]);
    const [selectCityFromDropDown, setSelectCityFromDropDown] = useState([]);
    const [citySelected, setCitySelected] = useState("");
    // Get user information from JWT token
    const currentUser = getCurrentUser();
    const userId = getCurrentUserId();
    const roleId = getCurrentRoleId();
    const userEmail = getCurrentUserEmail();
    
    console.log("Current user from JWT:", currentUser);
    console.log("User ID:", userId, "Role ID:", roleId, "Email:", userEmail);
    console.log("=== LOCALSTORAGE DEBUG ===");
    console.log("localStorage login_Email:", localStorage.getItem("login_Email"));
    console.log("localStorage patient_Email:", localStorage.getItem("patient_Email"));
    console.log("localStorage mobile:", localStorage.getItem("mobile"));
    console.log("localStorage login_country_code:", localStorage.getItem("login_country_code"));
    console.log("localStorage patient_suid:", localStorage.getItem("patient_suid"));
    console.log("sessionStorage login_mobile:", sessionStorage.getItem("login_mobile"));
    console.log("sessionStorage login_country_code:", sessionStorage.getItem("login_country_code"));

    const [data, setData] = useState({
        email: userEmail || localStorage.getItem("patient_Email") || localStorage.getItem("login_Email") || "",
        mobile: localStorage.getItem("mobile") || sessionStorage.getItem("login_mobile") || "",
        dialing_code: localStorage.getItem("login_country_code") || sessionStorage.getItem("login_country_code") || "",
        user_id: userId,
        role_id: roleId || 5, // Default to patient role
        login_with_email: !localStorage.getItem("mobile") && !sessionStorage.getItem("login_mobile"), // true if no mobile data
        first_name: null,
        last_name: null,
        middle_name: null,
        added_by: "self",
        gender: null,
        DOB: null,
        country_id: null,
        state_id: null,
        city_id: null,
        street_address1: null,
        street_address2: null,
        zip_code: null,
    });

    const fetchData = async () => {
        try {
            // Ensure we have the required data for incomplete profiles
            const patientSuid = localStorage.getItem("patient_suid");
            const patientEmail = localStorage.getItem("login_Email") || localStorage.getItem("patient_Email");
            const patientMobile = localStorage.getItem("mobile") || sessionStorage.getItem("login_mobile");
            const patientDialingCode = localStorage.getItem("login_country_code") || sessionStorage.getItem("login_country_code");
            
            // Clean up undefined values and ensure we have proper data
            const cleanEmail = (data.email && data.email !== 'undefined') ? data.email : (patientEmail || "");
            const cleanMobile = (data.mobile && data.mobile !== 'null') ? data.mobile : (patientMobile || "");
            const cleanDialingCode = (data.dialing_code && data.dialing_code !== 'undefined') ? data.dialing_code : (patientDialingCode || "");
            const cleanSuid = data.user_id || patientSuid;
            
            // Format the data for API submission
            const formattedData = {
                ...data,
                suid: cleanSuid,
                email: cleanEmail,
                mobile: cleanMobile,
                dialing_code: cleanDialingCode,
                role_id: data.role_id || 5,
                login_with_email: cleanMobile ? false : true, // false if mobile data exists
                DOB: data.DOB ? new Date(data.DOB).toISOString().split('T')[0] : null, // Format date as YYYY-MM-DD
            };
            
            console.log("=== PATIENT PROFILE UPDATE DEBUG ===");
            console.log("Original data:", data);
            console.log("Cleaned data:");
            console.log("- cleanEmail:", cleanEmail);
            console.log("- cleanMobile:", cleanMobile);
            console.log("- cleanDialingCode:", cleanDialingCode);
            console.log("- cleanSuid:", cleanSuid);
            console.log("Formatted data for API:", formattedData);
            console.log("Mobile data sources:");
            console.log("- localStorage mobile:", localStorage.getItem("mobile"));
            console.log("- sessionStorage login_mobile:", sessionStorage.getItem("login_mobile"));
            console.log("- localStorage login_country_code:", localStorage.getItem("login_country_code"));
            console.log("- sessionStorage login_country_code:", sessionStorage.getItem("login_country_code"));
            console.log("API Endpoint:", `${baseURL}/sec/auth/updateProfile`);
            
            const response = await axiosInstance.post(
                "/sec/auth/updateProfile",
                formattedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            
            console.log("Profile update response:", response);
            setSnackBarMessage("Profile updated successfully!");
            setSnackBarType("success");
            setOpenSnackBar(true);
            handleNext();
        } catch (error) {
            console.error("Profile update error:", error);
            setSnackBarMessage("Profile update failed. Please try again.");
            setSnackBarType("error");
            setOpenSnackBar(true);
        }
    };

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    console.log("Current form data:", data);
    console.log("=== JWT DEBUG INFO ===");
    console.log("Current user from JWT:", currentUser);
    console.log("User ID from JWT:", userId);
    console.log("Role ID from JWT:", roleId);
    console.log("Email from JWT:", userEmail);
    console.log("Access token in localStorage:", localStorage.getItem("access_token"));

    useEffect(() => {
        FetchCountryNames();
        FetchStateNames();
        
        // Handle incomplete profile data from mobile login
        const patientSuid = localStorage.getItem("patient_suid");
        const patientEmail = localStorage.getItem("login_Email") || localStorage.getItem("patient_Email");
        const patientMobile = localStorage.getItem("mobile") || sessionStorage.getItem("login_mobile");
        const patientDialingCode = localStorage.getItem("login_country_code") || sessionStorage.getItem("login_country_code");
        
        console.log("=== PATIENT PROFILE DATA EXTRACTION ===");
        console.log("patientSuid:", patientSuid);
        console.log("patientEmail:", patientEmail);
        console.log("patientMobile:", patientMobile);
        console.log("patientDialingCode:", patientDialingCode);
        console.log("All localStorage keys:", Object.keys(localStorage));
        console.log("All sessionStorage keys:", Object.keys(sessionStorage));
        
        if (patientSuid || patientEmail || patientMobile) {
            console.log("Updating data with incomplete profile information");
            setData(prevData => ({
                ...prevData,
                email: patientEmail || prevData.email || "",
                mobile: patientMobile || prevData.mobile || "",
                dialing_code: patientDialingCode || prevData.dialing_code || "",
                role_id: 5, // Patient role
                login_with_email: !patientMobile, // false if mobile data exists
                user_id: patientSuid || prevData.user_id
            }));
        } else {
            console.log("No incomplete profile data found, using defaults");
        }
    }, []);

    const FetchCountryNames = async () => {
        let CountryValues = [];
        let CountryName = [];
        try {
            const response = await axiosInstance("/sec/countries");
            for (let key in response?.data?.response) {
                CountryValues.push(response?.data?.response[key]);
                CountryName.push(response?.data?.response[key].country_name);
            }
            setCountryNames(CountryName);
            setCountryValue(CountryValues);
        } catch (error) {
            console.log(error);
        }
    };

    const FetchStateNames = async (country_id) => {
        let StateValues = [];
        let StateName = [];
        try {
            const response = await axiosInstance(`/sec/states?country_id=${country_id}`);
            for (let key in response?.data?.response) {
                StateValues.push(response?.data?.response[key]);
                StateName.push(response?.data?.response[key].state_name);
            }
            setStateValue(StateValues);
            setStateNames(StateName);
        } catch (error) {
            console.log(error);
        }
    };
    // run the api call when there is change in country drop down
    useEffect(() => {
        FetchStateNames(selectedCountryFromDropDown[0]?.country_id);
    }, [selectedCountryFromDropDown]);

    const FetchCityNames = async (state_id) => {
        let CityValues = [];
        let cityName = [];
        try {
            const response = await axiosInstance(`/sec/cities?state_id=${state_id}`);
            console.log("response city id : ", response);
            for (let key in response?.data?.response) {
                CityValues.push(response?.data?.response[key]);
                cityName.push(response?.data?.response[key].city_name);
            }
            setCityValues(CityValues);
            setCityNames(cityName);
        } catch (error) {
            console.log(error);
        }
    };
    // run the api to fetch the city details
    useEffect(() => {
        FetchCityNames(selectCityFromDropDown[0]?.state_id);
    }, [selectCityFromDropDown]);

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <CustomSnackBar
                    isOpen={openSnackBar}
                    type={snackBarType}
                    message={snackBarMessage}
                />
                <div className="FrameBox1">
                    <Box
                        // sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                        component={"img"}
                        src={ImageFrame}
                    ></Box>
                </div>

                <div className="step-back">
                    <div className="back-btn">
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1, color: "red" }}
                        >
                            Back
                        </Button>
                    </div>
                    <div className="Stepper">
                        <Stepper
                            activeStep={activeStep}
                            style={{
                                width: "700px",
                            }}
                        >
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepOptional(index)) {
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                </div>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                {/* Put component here */}
                                <center>
                                    We express our gratitude for your diligence in completing the
                                    patient profile. Your attention to detail contributes
                                    significantly to our records
                                </center>
                            </Typography>
                            <CustomButton
                                label="Click here to login"
                                handleClick={() => navigate("/patientlogin")}
                                buttonCss={{ width: "fit-content" }}
                            />
                        </Box>
                        {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box> */}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {/* Step {activeStep + 1} */}
                            {activeStep === 0 ? (
                                <>
                                    <Box>
                                        <div className="mainBox1">
                                            <Box sx={{ width: "40%" }}>
                                                <div className="heading1">
                                                    <Typography
                                                        style={{
                                                            fontFamily: "poppins",
                                                            fontSize: "25px",
                                                            fontStyle: "normal",
                                                            fontWeight: "500",
                                                            lineHeight: "30px",
                                                        }}
                                                    >
                                                        Personal Information
                                                    </Typography>
                                                </div>
                                                <div className="Text-fields1">
                                                    <TextField
                                                        label="First Name"
                                                        variant="standard"
                                                        required={"required"}
                                                        style={{
                                                            width: "50%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) =>
                                                            setData({
                                                                ...data,
                                                                first_name: event?.target?.value,
                                                            })
                                                        }
                                                    ></TextField>
                                                    <TextField
                                                        label="Middle Name"
                                                        variant="standard"
                                                        required={"required"}
                                                        style={{
                                                            width: "50%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) =>
                                                            setData({
                                                                ...data,
                                                                middle_name: event?.target?.value,
                                                            })
                                                        }
                                                    ></TextField>
                                                </div>
                                                <div className="other-fields1">
                                                    <TextField
                                                        label="Last Name"
                                                        variant="standard"
                                                        required={"required"}
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) =>
                                                            setData({
                                                                ...data,
                                                                last_name: event?.target?.value,
                                                            })
                                                        }
                                                    ></TextField>
                                                </div>
                                                <div className="Date-of-birth1">
                                                    <CustomDatePicker
                                                        label="Date of Birth"
                                                        value={data.DOB}
                                                        onChange={(value) => {
                                                            console.log(value);
                                                            setData({
                                                                ...data,
                                                                DOB: value,
                                                            });
                                                        }}
                                                        required={true}
                                                    />
                                                </div>
                                                <div className="gender1">
                                                    <CustomDropdown
                                                        label={"Gender"}
                                                        items={dropdownItems}
                                                        activeItem={activeDropdown}
                                                        handleChange={(item) => {
                                                            setActiveDropdown(item);
                                                            console.log(item);
                                                            setData({ ...data, gender: item });
                                                        }}
                                                        dropdowncss={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                    />
                                                </div>
                                            </Box>
                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={handleNext}
                                                    label="Next"
                                                    buttonCss={{
                                                        width: "33%",
                                                    }}
                                                    isDisabled={
                                                        data?.first_name != null &&
                                                        data?.last_name != null &&
                                                        data?.gender != null &&
                                                        data?.DOB != null
                                                            ? false
                                                            : true
                                                    }
                                                >
                                                    {activeStep === steps.length - 1
                                                        ? "Finish"
                                                        : "Next"}
                                                </CustomButton>
                                            </div>
                                        </div>
                                    </Box>
                                </>
                            ) : activeStep === 1 ? (
                                <>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <div className="mainBox1">
                                            <Box sx={{ width: "40%" }}>
                                                <div className="heading1">
                                                    <Typography
                                                        style={{
                                                            fontFamily: "poppins",
                                                            fontSize: "25px",
                                                            fontStyle: "normal",
                                                            fontWeight: "500",
                                                            lineHeight: "30px",
                                                        }}
                                                    >
                                                        Contact Information
                                                    </Typography>
                                                </div>
                                                <div className="Text-fields1">
                                                    <TextField
                                                        label="House No"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {}}
                                                    ></TextField>
                                                </div>
                                                <div className="other-fields1">
                                                    <TextField
                                                        label="Street Line 1"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setData({
                                                                ...data,
                                                                street_address1: event.target.value,
                                                            });
                                                        }}
                                                    ></TextField>
                                                </div>
                                                <div className="other-fields1">
                                                    <TextField
                                                        label="Street Line 2"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setData({
                                                                ...data,
                                                                street_address2: event.target.value,
                                                            });
                                                        }}
                                                    ></TextField>
                                                </div>
                                                <div className="Degree">
                                                    <Box sx={{ width: "100%", padding: "1%" }}>
                                                        <CustomDropdown
                                                            label={"Country"}
                                                            dropdowncss={{ width: "100%" }}
                                                            items={countryNames}
                                                            minwidthDropDown="300px"
                                                            activeItem={activeDropdown}
                                                            handleChange={(listItems) => {
                                                                setActiveDropdown(listItems);
                                                                let response = countryValues.filter(
                                                                    (country) =>
                                                                        country?.country_name?.includes(
                                                                            listItems,
                                                                        ),
                                                                );
                                                                console.log(
                                                                    "Country response : ",
                                                                    response[0]?.country_id,
                                                                );
                                                                setData({
                                                                    ...data,
                                                                    country_id:
                                                                        response[0]?.country_id,
                                                                });
                                                                setSelectedCountryFromDropDown(
                                                                    response,
                                                                );
                                                            }}
                                                            // dropdowncss={{ width:"300px" }}
                                                        />
                                                    </Box>
                                                </div>
                                                <div className="Degree">
                                                    <Box sx={{ width: "100%", padding: "1%" }}>
                                                        <CustomDropdown
                                                            label={"State"}
                                                            dropdowncss={{ width: "100%" }}
                                                            items={stateNames}
                                                            minwidthDropDown="300px"
                                                            activeItem={stateName}
                                                            handleChange={(listItems) => {
                                                                let response = stateValue.filter(
                                                                    (state) =>
                                                                        state?.state_name?.includes(
                                                                            listItems,
                                                                        ),
                                                                );
                                                                // console.log("State ID : " , response[0].state_id)
                                                                setData({
                                                                    ...data,
                                                                    state_id: response[0]?.state_id,
                                                                });
                                                                setSelectCityFromDropDown(response);
                                                                setStateName(listItems);
                                                            }}
                                                            // dropdowncss={{ width:"300px" }}
                                                        />
                                                    </Box>
                                                </div>

                                                <div className="Degree">
                                                    <Box sx={{ width: "100%", padding: "1%" }}>
                                                        <CustomDropdown
                                                            label={"City"}
                                                            dropdowncss={{ width: "100%" }}
                                                            items={cityNames}
                                                            minwidthDropDown="300px"
                                                            activeItem={citySelected}
                                                            handleChange={(listItems) => {
                                                                setCitySelected(listItems);
                                                                let response = cityValues.filter(
                                                                    (city) =>
                                                                        city?.city_name?.includes(
                                                                            listItems,
                                                                        ),
                                                                );
                                                                setData({
                                                                    ...data,
                                                                    city_id: response[0]?.city_id,
                                                                });
                                                            }}
                                                            // dropdowncss={{ width:"300px" }}
                                                        />
                                                    </Box>
                                                </div>

                                                <div className="Degree">
                                                    <TextField
                                                        label="Zip Code"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setData({
                                                                ...data,
                                                                zip_code: event.target.value,
                                                            });
                                                        }}
                                                    ></TextField>
                                                </div>
                                            </Box>
                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={fetchData}
                                                    label="Save"
                                                    buttonCss={{
                                                        width: "33%",
                                                    }}
                                                    isDisabled={
                                                        data?.street_address1 != null &&
                                                        data?.country_id != null &&
                                                        data?.city_id != null &&
                                                        data?.state_id != null &&
                                                        data?.zip_code != null
                                                            ? false
                                                            : true
                                                    }
                                                >
                                                    {/* {activeStep === steps.length - 1
                                                        ? "Finish"
                                                        : "Next"} */}
                                                </CustomButton>
                                            </div>
                                        </div>
                                    </Box>
                                </>
                            ) : (
                                <h1>Completed</h1>
                            )}
                            ;
                        </Typography>
                        {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                        </Box> */}
                    </React.Fragment>
                )}
            </Box>
        </>
    );
};

export default PatientCompleteProfile;
