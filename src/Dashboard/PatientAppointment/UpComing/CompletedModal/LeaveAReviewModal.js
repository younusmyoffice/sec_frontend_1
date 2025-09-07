import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CustomButton from "../../../../components/CustomButton/custom-button";
import { TextField, makeStyles } from "@mui/material";
import { ClassNames } from "@emotion/react";

const steps = ["Review"];

export const LeaveAReview  = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());


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

    const useStyles = makeStyles({
    })

    const classes = useStyles();

    return (
        <Box sx={{ width: "100%" , height : "100%" }}>
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
                    {/* <h1>Review The Doctor</h1>
                    <Stack spacing={1}>
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                    </Stack> */}
                </React.Fragment>
            ) : (
                <React.Fragment>

                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {/* Step {activeStep + 1} */}
                        {activeStep === 0 ? (
                            <>
                                <Box sx={{ width: "30vw" , display : "flex" , flexDirection : "column" }}>

                                    <Box sx={{ width: "100%" , display : "flex" , flexDirection : "column" , justifyContent : "center"}}>
                                        <Typography sx={{
                                                        color:  "#313033",
                                                        textAlign: "center",
                                                        fontFamily: "Poppins",
                                                        fontSize: "1.25rem",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        lineHeight: "1.875rem",
                                        }} >Review The Doctor</Typography>
                                        <Typography sx={{fontFamily: "Poppins",
                                                        fontSize: "0.875rem",
                                                        fontStyle: "normal",
                                                        fontWeight: "400",
                                                        lineHeight: "1.3125rem",
                                                        letterSpacing: "0.00438rem",
                                                        color  : "#484649",
                                                        textAlign: "center"}} 
                                        >Please provide review</Typography>
                                    </Box>
                                    <Box sx={{ width: "100%" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"  , marginTop : "6%"}}>
                                        <Stack spacing={1}>
                                            <Rating sx={{color  : "#E72B4A"}} name="half-rating" defaultValue={2.5} precision={0.5} />
                                        </Stack>
                                    </Box>
                                   <Box sx={{ width: "100%" , display : "flex" , flexDirection : "column" ,marginTop : "14%" }}>
                                   <Typography sx={{    fontFamily: "Poppins",
                                                        fontSize: "0.875rem",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        lineHeight: "1.375rem",
                                                        letterSpacing: "0.00438rem"}} >Comment</Typography>
                                    <Box sx={{marginTop : "3%" , width : "100%" , display : "flex" , justifyContent : "center" }} >
                                    <TextField
                                        style={{width  : "90%" , 
                                                    border : "1px solid #E6E1E5" , 
                                                    padding : "2%" ,
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.875rem",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    lineHeight: "1.3125rem", 
                                                    letterSpacing: "0.00438rem", }}
                                        placeholder="Write your problem here"
                                        multiline
                                        rows={3}
                                        maxRows={4}
                                        sx
                                    />
                                    
                                    </Box>
                                   </Box>
                                  <Box sx={{display : "flex" , justifyContent : "center"}} >
                                  <CustomButton buttonCss={{display: "flex",
                                                            width: "10.625rem",
                                                            height: "3rem",
                                                            borderRadius : "6.25rem",
                                                            justifyContent : "center",
                                                            padding: "0.5rem 1rem",
                                                            alignItems: "center",
                                                            gap: "0.5rem",
                                                            flexShrink: "0",}} label="Submit" ></CustomButton>
                                                            {/* label="Submit" handleClick={handleNext} >{activeStep === "Finish"}</CustomButton> */}
                                  </Box>
                                </Box>
                              
                            </>
                        )  : (
                            <h1>Completed</h1>
                        )}
                    </Typography>
                    {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                    </Box> */}
                </React.Fragment>
            )}
        </Box>
    );
};