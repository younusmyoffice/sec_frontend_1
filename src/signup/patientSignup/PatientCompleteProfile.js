import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "./patientcompleteprofile.scss";
import ImageFrame from "../../constants/DrImages/Frame.png";
import ClassicFrame from "../../constants/DrImages/Undraw.png";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { TextField } from "@mui/material";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../components/CustomButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { baseURL } from "../../constants/const";
import axios from "axios";
import CustomSnackBar from "../../components/CustomSnackBar";
import { useNavigate } from "react-router-dom";

const steps = ["", "", ""];

const PatientCompleteProfile = () => {
    const dropdownItems = ["item1", "item2", "item3"];
    const [activeDropdown, setActiveDropdown] = useState("");
    const navigate = useNavigate();
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [value, setValue] = useState([null, null]);
    const radioValues = ["My self"];
    const [openSnackBar , setOpenSnackBar] = useState(false);
    const [data , setData] = useState({
        email: "younus@gmail.com",
        first_name: "younus",
        last_name: "geek",
        middle_name: "",
        added_by: "",
        gender: "male",
        DOB: "01-1980",
        country_id: "7",
        state_id: "17",
        city_id: "362",
        street_address1: "HSBR layout",
        street_address2: "Bengluru",
        zip_code: "560041"
    })

    const fetchData = async () => {
        console.log("submitting complete profile information")
        try {
            // const response = await axiosInstance.post("/sec/auth/login",JSON.stringify(data),{"Accept" : "Application/json"});
            const response = await axios.post(
                `${baseURL}/sec/auth/updateProfile`,
                JSON.stringify(data),
                { Accept: "Application/json" },
            );
            setOpenSnackBar(true)
            handleNext()
            console.log("Responase : ", response);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     localStorage.setItem("signUp", "patient");
    //     if (islogin === true) {
    //         fetchData();
    //     }
    // }, [islogin]);

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

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <CustomSnackBar
                    isOpen={openSnackBar}
                    type={'success'}
                    message={'Profile Completed Successfully'}
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
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {/* Put component here */}
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {/* Step {activeStep + 1} */}
                            {activeStep === 0 ? (
                                <>
                                    <Box>
                                        <div className="mainBox1">
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
                                                    style={{
                                                        width: "168px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                                <TextField
                                                    label="Middle Name"
                                                    variant="standard"
                                                    style={{
                                                        width: "168px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                            </div>
                                            <div className="other-fields1">
                                                <TextField
                                                    label="Last Name"
                                                    variant="standard"
                                                    style={{
                                                        width: "360px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                            </div>
                                            <div className="Date-of-birth1">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={["DatePicker"]}>
                                                        <DatePicker
                                                            label="Date of Birth"
                                                            style={{ width: "300px" }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </div>
                                            <div className="gender1">
                                                <CustomDropdown
                                                    label={"Gender"}
                                                    items={dropdownItems}
                                                    activeItem={activeDropdown}
                                                    handleChange={(item) => setActiveDropdown(item)}
                                                    dropdowncss={{
                                                        width: "360px",
                                                        color: "#787579",
                                                    }}
                                                />
                                            </div>
                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={handleNext}
                                                    label="Next"
                                                    buttonCss={{
                                                        width: "360px",
                                                    }}
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
                                                        width: "360px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                            </div>
                                            <div className="other-fields1">
                                                <TextField
                                                    label="Street Line 1"
                                                    variant="standard"
                                                    style={{
                                                        width: "360px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                            </div>
                                            <div className="other-fields1">
                                                <TextField
                                                    label="Street Line 2"
                                                    variant="standard"
                                                    style={{
                                                        width: "360px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                            </div>
                                            <div className="Degree">
                                                <TextField
                                                    label="Country"
                                                    variant="standard"
                                                    style={{
                                                        width: "360px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                            </div>
                                            <div className="Degree">
                                                <TextField
                                                    label="State"
                                                    variant="standard"
                                                    style={{
                                                        width: "360px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                            </div>
                                            <div className="Degree">
                                                <TextField
                                                    label="City"
                                                    variant="standard"
                                                    style={{
                                                        width: "360px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                            </div>

                                            <div className="Degree">
                                                <TextField
                                                    label="Zip Code"
                                                    variant="standard"
                                                    style={{
                                                        width: "360px",
                                                        color: "#787579",
                                                    }}
                                                ></TextField>
                                            </div>
                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={fetchData}
                                                    label="Save"
                                                    buttonCss={{
                                                        width: "360px",
                                                    }}
                                                >
                                                    {/* {activeStep === steps.length - 1
                                                        ? "Finish"
                                                        : "Next"} */}
                                                </CustomButton>
                                            </div>
                                        </div>
                                    </Box>
                                </>
                            ) : activeStep === 2 ? (
                                <Box sx={{ width: "100%" }}>
                                    <div className="imge-cont">
                                        <div className="card-cont1">
                                            <div className="card1">
                                                <div className="last-image">
                                                    <Box
                                                        sx={{ width: "222px", height: "252px" }}
                                                        component={"img"}
                                                        src={ClassicFrame}
                                                    ></Box>
                                                </div>
                                                <div className="greetings1">
                                                    <Typography
                                                        style={{
                                                            color: "#313033",
                                                            fontFamily: "poppins",
                                                            fontSize: "16px",
                                                            fontStyle: "normal",
                                                            fontWeight: "600",
                                                            lineHeight: "24px",
                                                        }}
                                                    >
                                                        Thank you for Choosing to rigister with us!
                                                    </Typography>
                                                </div>
                                                <div className="note1">
                                                    <Typography
                                                        style={{
                                                            color: "#939094",
                                                            fontFamily: "poppins",
                                                            fontSize: "14px",
                                                            fontStyle: "normal",
                                                            fontWeight: "400",
                                                            lineHeight: "21px",
                                                            letterSpacing: "0.07px",
                                                        }}
                                                    >
                                                        our team will get in touch with you shortly
                                                    </Typography>
                                                </div>
                                                <div className="done-btn1">
                                                    <CustomButton
                                                        label="Done"
                                                        handleClick={() => navigate('/patientlogin') }
                                                        buttonCss={{
                                                            width: "270px",
                                                            borderRadius: "20px",
                                                        }}
                                                    >
                                                        Done
                                                    </CustomButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            ) : (
                                <h1>Completed</h1>
                            )}
                            ;
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </>
    );
};

export default PatientCompleteProfile;
