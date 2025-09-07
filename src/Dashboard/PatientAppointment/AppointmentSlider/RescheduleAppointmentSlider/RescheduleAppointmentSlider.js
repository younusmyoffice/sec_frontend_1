import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import CustomRadioButton from "../../../../components/CustomRadioButton/custom-radio-button";
import CustomDropdown from "../../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../../components/CustomButton/custom-button";
import finish from '../../../../constants/DrImages/Finish.png';
// import messageLogo from "../../constants/patientAppointmentLogo/messageLogo.png"
const steps = ["Reason", "Date & Time"];

const RescheduleAppointmentSlider = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const radioValues = [
        "I have a schedule clash",
        "I am not available at the schedule",
        "Reason3",
        "Reason4",
        "Reason5",
    ];
    const [radioVal, setRadioVal] = React.useState(radioValues[0]);
    //   const [activeFabDropdown, setActiveFabDropdown] = React.useState(dropdownItems[0]);
    //   const [activeDropdown, setActiveDropdown] = useState("");
    const [ageDropDown, setAgeDropDown] = React.useState();
    const [DateValue, setDataValue] = React.useState(null);

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
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption"></Typography>;
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
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Box sx={{ width: "70%", marginTop: "5%", marginLeft: "15%" }}>
                        <img
                            style={{ width: "100%" }}
                            src={finish}
                            alt="finished"
                            loading="lazy"
                        />
                    </Box>
                    <Box sx={{displa : "flex" , justifyContent : "center" , textAlign : "center"}}>
                        <Typography sx={{
                            color : "#313033",
                            fontFamily: "Poppins",
                            fontSize: "1rem",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "1.5rem",
                        }} >Appointment Request Sent</Typography>
                        <Typography sx={{
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "1.3125rem",
                            letterSpacing: "0.00438rem",
                        }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus quis sapien interdum commodo. Nunc tincidunt justo non dolor bibendum,</Typography>
                    </Box>
                    <Box sx={{ marginTop: "5%" , display : "flex" , justifyContent : "center" }}>
                        <CustomButton
                            label={"View Appointment"}
                            isElevated
                            // handleClick={() => setOpenDialog(!openDialog)}
                        />
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {/* Step {activeStep + 1} */}
                        {activeStep === 0 ? (
                            <>
                                <Box sx={{ width: "77%", marginLeft: "26%", marginTop: "7%" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "20px",
                                            lineHeight: "30px",
                                        }}
                                    >
                                        Reschedule Appointment
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: "5%",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                        }}
                                    >
                                        Reason For Schedule
                                    </Typography>
                                    <CustomRadioButton
                                        label={""}
                                        handleChange={({ target }) => setRadioVal(target.value)}
                                        value={radioVal}
                                        items={radioValues}
                                    />
                                    <Box sx={{ marginTop: "8%", width: "75%" }}>
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "14px",
                                                lineHeight: "21px",
                                                letterSpacing: "0.5%",
                                                color: "#939094",
                                            }}
                                        >
                                            Note: Lorem ipsum dolor sit amet. Qui dolor nostrum sit
                                            eius necessitatibus id quia expedita et molestiae
                                            laborum qui nihil excepturi qui tenetur blanditiis.
                                        </Typography>
                                    </Box>
                                     <Box sx={{display : "flex" , justifyContent : "center"}} >
                                     <CustomButton 
                                            buttonCss={{
                                                    display: "flex",
                                                    width: "10.625rem",
                                                    height: "3rem",
                                                    padding: "0.5rem 1rem",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                    flexShrink: "0",
                                                    borderRadius : "6.25rem",
                                                    marginTop : "2%"
                                            }}
                                            handleClick={handleNext}
                                            label="Continue"
                                        > {activeStep === "Next"}</CustomButton>
                                     </Box>
                                </Box>
                            </>
                        ) : activeStep === 1 ? (
                            <>
                                <Box sx={{width : "100%"}} >
                                    <Box sx={{ marginTop: "4%" }}>Select Date</Box>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar
                                            onChange={(newValue) => setDataValue(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Box>Select Time</Box>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["TimePicker"]}>
                                            <TimePicker label="Select Time" />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                               <Box sx={{display : "flex" , justifyContent : "center"}} >
                               <CustomButton 
                                            buttonCss={{
                                                    display: "flex",
                                                    width: "10.625rem",
                                                    height: "3rem",
                                                    padding: "0.5rem 1rem",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                    flexShrink: "0",
                                                    borderRadius : "6.25rem",
                                                    marginTop : "2%"
                                            }}
                                            handleClick={handleNext}
                                            label="Next"
                                        > {activeStep === "Finish"}</CustomButton>
                               </Box>
                            </>
                        ) :  (
                            <>
                                <h1>Completed</h1>
                            </>
                        ) }
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>                        
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
};
export default RescheduleAppointmentSlider;
