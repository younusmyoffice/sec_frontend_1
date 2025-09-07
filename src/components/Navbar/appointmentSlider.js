import React, { useState } from "react";
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
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack } from "@mui/material";
import CustomRadioButton from "../CustomRadioButton/custom-radio-button";
import CustomTextField from "../CustomTextField/custom-text-field";
import CustomDropdown from "../CustomDropdown/custom-dropdown";
import messageLogo from "../../static/images/logo.png";

// ['Reschedule Appointment', 'Details', 'Symptoms' , "Duration" , "Payment"
const steps = ["", "", "", "", ""];

const appointmentSlider = () => {
    // export default function appointmentSlider() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const radioValues = [
        "I have a schedule clash",
        "I am not available at the schedule",
        "Reason 3",
        "Reason 4",
        "Reason 5",
    ];
    const [radioVal, setRadioVal] = useState(radioValues[0]);
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "12%",
                                        }}
                                    >
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
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                                marginTop: "3%",
                                            }}
                                        >
                                            Reason for reschedule
                                        </Typography>
                                    </Box>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <Stack
                                            spacing={10}
                                            alignItems="center"
                                            flexDirection="column"
                                        >
                                            <CustomRadioButton
                                                label={""}
                                                radiocss={{
                                                    border: " 1px solid #E6E1E5",
                                                    padding: "0px 10px",
                                                    borderRadius: "16px",
                                                    width: "22.5em",
                                                    height: "6em",
                                                    margin: "10px",
                                                }}
                                                handleChange={({ target }) =>
                                                    setRadioVal(target.value)
                                                }
                                                value={radioVal}
                                                items={radioValues}
                                            />
                                        </Stack>
                                    </RadioGroup>
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
                            </>
                        ) : activeStep === 1 ? (
                            <>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <CustomRadioButton
                                        label={"Patient Details"}
                                        handleChange={({ target }) => setRadioVal(target.value)}
                                        // value={}
                                        items={["My Self"]}
                                    />
                                    <CustomTextField
                                        placeholder={"Full Name"}
                                        label=""
                                        helperText={""}
                                    />
                                    <CustomDropdown
                                        label={"Gender"}
                                        items={["Male", "Female", "Transgender"]}
                                        // activeItem={activeDropdown}
                                        // handleChange={(item) => setActiveDropdown(item)}
                                        menuItemValue=""
                                    />
                                    <CustomDropdown
                                        label={"Age"}
                                        items={[...Array(101).keys()]}
                                        // activeItem={ageDropDown}
                                        // handleChange={(item) => setAgeDropDown(item)}
                                        menuItemValue=""
                                    />
                                    <CustomTextField
                                        placeholder={"Attach Reports"}
                                        isDisabled={true}
                                        label=""
                                        helperText={""}
                                    />
                                    <p>Write your problem here</p>
                                    <TextField
                                        placeholder="Write your problem here"
                                        multiline
                                        rows={3}
                                        maxRows={4}
                                    />
                                </Box>
                            </>
                        ) : activeStep === 2 ? (
                            <>
                                <Box>
                                    <p>Please answer the question </p>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <CustomDropdown />
                                        <CustomDropdown />
                                        <CustomDropdown />
                                        <CustomDropdown />
                                        <CustomDropdown />
                                    </Box>
                                </Box>
                            </>
                        ) : activeStep === 3 ? (
                            <>
                                <Box>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <CustomDropdown label={"Select Duration"} />
                                    </Box>
                                    <p>Select Package</p>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box sx={{ width: "98%" }}>
                                            {/* Cards */}
                                            {/* Messagin card */}
                                            <Box
                                                sx={{
                                                    padding: "0% 2%",
                                                    width: "100%",
                                                    backgroundColor: "#ffff",
                                                    border: "1px solid #AEAAAE",
                                                    borderRadius: "8px",
                                                    marginTop: "1%",
                                                }}
                                                component={"button"}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{ width: "30px", height: "32px" }}
                                                            component={"img"}
                                                            src={messageLogo}
                                                            alt="message logo"
                                                        ></Box>
                                                        <Box
                                                            sx={{
                                                                paddingLeft: "6%",
                                                                width: "150px",
                                                            }}
                                                        >
                                                            <Box
                                                                component={"h3"}
                                                                sx={{
                                                                    fonFamily: "Poppins",
                                                                    fontSize: "16px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: "500",
                                                                    lineHeight: "1px",
                                                                }}
                                                            >
                                                                Messaging Plan
                                                            </Box>
                                                            <Box
                                                                component={"h4"}
                                                                sx={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: "400",
                                                                    lineHeight: "1px" /* 150% */,
                                                                    letterSpacing: "0.08px",
                                                                    color: "#AEAAAE",
                                                                }}
                                                            >
                                                                Chat and messages with doctor
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                        }}
                                                    >
                                                        <Box
                                                            component={"h3"}
                                                            sx={{
                                                                textAlign: "right",
                                                                fontFamily: "Poppins",
                                                                fontSize: "22px",
                                                                fontStyle: "normal",
                                                                fontWeight: "500",
                                                                color: "#313033",
                                                            }}
                                                        >
                                                            $12/
                                                        </Box>
                                                        <Box
                                                            component={"h4"}
                                                            sx={{
                                                                textAlign: "right",
                                                                fontFamily: "Poppins",
                                                                fontSize: "16px",
                                                                fontStyle: "normal",
                                                                fontWeight: "500",
                                                                lineHeight: "30px",
                                                                color: "#AEAAAE",
                                                            }}
                                                        >
                                                            30min
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            {/* Voice calling and messaging */}
                                            <Box
                                                sx={{
                                                    padding: "0% 2%",
                                                    width: "100%",
                                                    backgroundColor: "#ffff",
                                                    border: "1px solid #AEAAAE",
                                                    borderRadius: "8px",
                                                    marginTop: "1%",
                                                }}
                                                component={"button"}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{ width: "30px", height: "32px" }}
                                                            component={"img"}
                                                            src={messageLogo}
                                                            alt="message logo"
                                                        ></Box>
                                                        <Box
                                                            sx={{
                                                                paddingLeft: "6%",
                                                                width: "200px",
                                                            }}
                                                        >
                                                            <Box
                                                                component={"h3"}
                                                                sx={{
                                                                    fonFamily: "Poppins",
                                                                    fontSize: "16px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: "500",
                                                                    lineHeight: "1px",
                                                                }}
                                                            >
                                                                Voice Call & Messaging
                                                            </Box>
                                                            <Box
                                                                component={"h4"}
                                                                sx={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: "400",
                                                                    lineHeight: "1px" /* 150% */,
                                                                    letterSpacing: "0.08px",
                                                                    color: "#AEAAAE",
                                                                }}
                                                            >
                                                                Chat and messages with doctor
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                        }}
                                                    >
                                                        <Box
                                                            component={"h3"}
                                                            sx={{
                                                                textAlign: "right",
                                                                fontFamily: "Poppins",
                                                                fontSize: "22px",
                                                                fontStyle: "normal",
                                                                fontWeight: "500",
                                                                color: "#313033",
                                                            }}
                                                        >
                                                            $20/
                                                        </Box>
                                                        <Box
                                                            component={"h4"}
                                                            sx={{
                                                                textAlign: "right",
                                                                fontFamily: "Poppins",
                                                                fontSize: "16px",
                                                                fontStyle: "normal",
                                                                fontWeight: "500",
                                                                lineHeight: "30px",
                                                                color: "#AEAAAE",
                                                            }}
                                                        >
                                                            30min
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            {/* Video and messaging */}
                                            <Box
                                                sx={{
                                                    padding: "0% 2%",
                                                    width: "100%",
                                                    backgroundColor: "#ffff",
                                                    border: "1px solid #AEAAAE",
                                                    borderRadius: "8px",
                                                    marginTop: "1%",
                                                }}
                                                component={"button"}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{ width: "30px", height: "32px" }}
                                                            component={"img"}
                                                            src={messageLogo}
                                                            alt="message logo"
                                                        ></Box>
                                                        <Box
                                                            sx={{
                                                                paddingLeft: "6%",
                                                                width: "150px",
                                                            }}
                                                        >
                                                            <Box
                                                                component={"h3"}
                                                                sx={{
                                                                    fonFamily: "Poppins",
                                                                    fontSize: "16px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: "500",
                                                                    lineHeight: "1px",
                                                                }}
                                                            >
                                                                Video & Messaging
                                                            </Box>
                                                            <Box
                                                                component={"h4"}
                                                                sx={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: "400",
                                                                    lineHeight: "1px" /* 150% */,
                                                                    letterSpacing: "0.08px",
                                                                    color: "#AEAAAE",
                                                                }}
                                                            >
                                                                Chat and message with doctor
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                        }}
                                                    >
                                                        <Box
                                                            component={"h3"}
                                                            sx={{
                                                                textAlign: "right",
                                                                fontFamily: "Poppins",
                                                                fontSize: "22px",
                                                                fontStyle: "normal",
                                                                fontWeight: "500",
                                                                color: "#313033",
                                                            }}
                                                        >
                                                            $25/
                                                        </Box>
                                                        <Box
                                                            component={"h4"}
                                                            sx={{
                                                                textAlign: "right",
                                                                fontFamily: "Poppins",
                                                                fontSize: "16px",
                                                                fontStyle: "normal",
                                                                fontWeight: "500",
                                                                lineHeight: "30px",
                                                                color: "#AEAAAE",
                                                            }}
                                                        >
                                                            30min
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        ) : activeStep === 4 ? (
                            <Box></Box>
                        ) : (
                            <h1>Completed</h1>
                        )}
                        ;
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
                        <Box sx={{ flex: "1 1 auto" }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
};
export default appointmentSlider;
