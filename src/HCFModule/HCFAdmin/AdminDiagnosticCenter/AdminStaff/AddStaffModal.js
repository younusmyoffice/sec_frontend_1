import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


import CustomRadioButton from "../../../../components/CustomRadioButton/custom-radio-button";
import CustomTextField from "../../../../components/CustomTextField";
import CustomDropdown from "../../../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../../../components/CustomButton";
import { useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const steps = ["Edit staff", "Verify Mobile no", "User Registration Successfully"];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const radioValues = ["My self"];

    const [data , setData] = React.useState({
        patient_id: 7,
        doctor_id: 9,
        radioVal : radioValues[0],
        activeDropdown  : "",
        ageDropDown : "",
        DateValue : null,
        TimeVale : null,
        FullName : null,
        writeYourProblem : null,
        questionone : null,
        questiontwo : null,
        questionthree : null,
        questionfour : null,
        questionfive : null,
        plan : null,
        selectDuration : null
    })


    // const [radioVal, setRadioVal] = React.useState(radioValues[0]);
    //   const [activeFabDropdown, setActiveFabDropdown] = React.useState(dropdownItems[0]);
    //   const [activeDropdown, setActiveDropdown] = React.useState("");
    // const [ageDropDown, setAgeDropDown] = React.useState();
    // const [DateValue, setDataValue] = React.useState(null);
    // const [TimeVale , setTimeValue] = React.useState();
    // const [FullName , setFullName] = React.useState();
    // const [ writeYourProblem , setYourProblem ] = React.useState();

    // 3 Sympton Slider variables
    // const [ questionone , setQuestionOne ] = React.useState(null);
    // const [ questiontwo , setQuestionTwo ] = React.useState(null);
    // const [ questionthree , setQuestionThree ] = React.useState(null);
    // const [ questionfour , setQuestionFour ] = React.useState(null);
    // const [ questionfive , setQuestionFive ] = React.useState(null);
    // const [ plan , setPlan] = React.useState(null);
    const [ messagingPlan , setMessaginplanActive ] = React.useState(false);
    const [ voiceMessagingPlan , setVoiceMessaginplanActive ] = React.useState(false);
    const [ videoMessagingPlan , setVideoMessaginplanActive ] = React.useState(false);
    // const [selectDuration , setSelectDuration ] = React.useState(null)

    // console.log("select Duration ",selectDuration);

    // setPlan("₹12")
    //                                                 setMessaginplanActive(true)
    //                                                 setVoiceMessaginplanActive(true)
    //                                                     setVideoMessaginplanActive(false)
    console.log("plan" , data)
    // console.log("DateValue" , DateValue)
    // console.log("Full Name" , FullName)
    // console.log("TimeVale" , TimeVale)
    // console.log("Active DropDown" , activeDropdown);
    // console.log("Age " , ageDropDown);
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
    const [textField1, setTextField1] = useState("");
    const [textField2, setTextField2] = useState("");
    const [textField3, setTextField3] = useState("");
    const [textField4, setTextField4] = useState("");
    const [textField5, setTextField5] = useState("");
    const [textField6, setTextField6] = useState("");
    const [textField7, setTextField7] = useState("");
    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
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
                            <div style={{display:"flex"}}>
                            <CustomTextField
                            id={"standard-helperText1"}
                            label={"Rakesh Williams"}
                            defaultValue={textField1}
                            helperText={""}
                            textcss={{margin:"10px",width:'400px'}}
                            onChange={(value) => setTextField1(value)}
                        />
                        <CustomTextField
                            id={"standard-helperText2"}
                            label={"Technician"}
                            defaultValue={textField2}
                            helperText={""}
                            textcss={{margin:"10px",width:'400px'}}
                            onChange={(value) => setTextField2(value)}
                            />
                            </div>
                            <div style={{display:"flex"}}>
                            <CustomTextField
                            id={"standard-helperText1"}
                            label={"Radialogy"}
                            defaultValue={textField3}
                            helperText={""}
                            textcss={{margin:"10px",width:'400px'}}
                            onChange={(value) => setTextField3(value)}
                        />
                        <CustomTextField
                            id={"standard-helperText2"}
                            label={"rakesh@apollolabs.com"}
                            defaultValue={textField4}
                            helperText={""}
                            textcss={{margin:"10px",width:'400px'}}
                            onChange={(value) => setTextField4(value)}
                            />
                            </div>
                            <div style={{display:"flex"}}>
                            <CustomTextField
                            id={"standard-helperText1"}
                            label={"+91 0000 000 000"}
                            defaultValue={textField5}
                            helperText={""}
                            textcss={{margin:"10px",width:'400px'}}
                            onChange={(value) => setTextField5(value)}
                        />
                        <CustomTextField
                            id={"standard-helperText2"}
                            label={"Create Password"}
                            defaultValue={textField6}
                            helperText={""}
                            textcss={{margin:"10px",width:'400px'}}
                            onChange={(value) => setTextField6(value)}
                            />
                            </div>
                            <div style={{display:"flex"}}>
                            <CustomTextField
                            id={"standard-helperText1"}
                            label={"Confirm passwordS"}
                            defaultValue={textField7}
                            helperText={""}
                            textcss={{margin:"10px",width:'250px'}}
                            onChange={(value) => setTextField7(value)}
                        />
                            </div>
                            
                            </>
                        ) : activeStep === 1 ? (
                            <>
                             
                                <Box>
                                  <h5>Please enter OTP</h5>
                                  <h7>The OTP have been sent to -1221019287</h7>
                                  <div style={{display:"flex",marginTop:"50px"}}> 
                                <button style={{border:"none",borderBottom:"1px solid black",width:'50px',margin:"10px"}}></button> 
                                <button style={{border:"none",borderBottom:"1px solid black",width:'50px',margin:"10px"}}></button> 
                                <button style={{border:"none",borderBottom:"1px solid black",width:'50px',margin:"10px"}}></button> 
                                <button style={{border:"none",borderBottom:"1px solid black",width:'50px',margin:"10px"}}></button> 
                                <button style={{border:"none",borderBottom:"1px solid black",width:'50px',margin:"10px"}}></button> 
                                <button style={{border:"none",borderBottom:"1px solid black",width:'50px',margin:"10px"}}></button>
                                  </div>
                                </Box>
                            </>
                        ) : activeStep === 2 ? (
                            <>
                            <Box>
                            <CheckCircleOutlineIcon style={{width:"200px",height:"200px",margin:"auto",marginLeft:"170px",color:"#E72B4A"}}/>   
                            <h3 style={{marginLeft:"160px"}}>Registration Successful</h3>
                            <h7 style={{color:"gray",marginLeft:"199px"}}>Please login with</h7>
                            </Box>
                            
                            </>
                        ) : activeStep === 3 ? (
                            <>
                                <Box>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <CustomDropdown 
                                            label={"Select Duration"} 
                                            items={["30 Minutes", "60 Minutes"]}
                                        // dropdowncss={{ m : 0  , minWidth : "100%", marginTop : "1%"}}
                                            activeItem={data?.selectDuration}
                                            handleChange={(item) => setData({...data , selectDuration : item})}
                                            menuItemValue=""
                                        />
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
                                                    // border: "1px solid #AEAAAE",
                                                    borderRadius: "8px",
                                                    marginTop: "1%",
                                                    cursor : "pointer",
                                                    border : `0.5px solid ${messagingPlan === true ? "#E72B4A" : "#black" }` 
                                                }}
                                                component={"button"}
                                                onClick={ () => {
                                                    setData({...data , plan : "₹12"})
                                                    setMessaginplanActive(true)
                                                    setVoiceMessaginplanActive(false)
                                                    setVideoMessaginplanActive(false)

                                                }}
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
                                                        {/* <Box
                                                            sx={{ width: "30px", height: "32px" }}
                                                            component={"img"}
                                                            // src={messageLogo}
                                                            // alt="message logo"
                                                        ></Box> */}
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
                                                             ₹12/
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
                                                    cursor : "pointer",
                                                    border : `1px solid ${ voiceMessagingPlan === true ? "#E72B4A" : "black" }` 

                                                }}
                                                onClick={ () => {
                                                    setData({...data , plan : "₹20"})
                                                    setVoiceMessaginplanActive(true)
                                                    setMessaginplanActive(false)
                                                    setVideoMessaginplanActive(false)

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
                                                        {/* <Box
                                                            sx={{ width: "30px", height: "32px" }}
                                                            component={"img"}
                                                            src={messageLogo}
                                                            alt="message logo"
                                                        ></Box> */}
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
                                                             ₹20/
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
                                                    cursor : "pointer",
                                                    border : `1px solid ${ videoMessagingPlan === true ? "#E72B4A" : "black" }` 

                                                }}

                                                onClick={ () => {
                                                    setData({...data , plan : "₹25"})
                                                    setVideoMessaginplanActive(true)
                                                    setVoiceMessaginplanActive(false)
                                                    setMessaginplanActive(false)
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
                                                        {/* <Box
                                                            sx={{ width: "30px", height: "32px" }}
                                                            component={"img"}
                                                            src={messageLogo}
                                                            alt="message logo"
                                                        ></Box> */}
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
                                                             ₹25/
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
                            <Box sx={{ width: "100%" }}>
                                <Box component={"h3"}>Payment Method</Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                 
                                    <Box sx={{border : "1px solid red"}} >
                                        <Box component={'h3'} >Transaction Id : 9746884r5867587xxjsr890</Box>
                                    </Box>

                                    <CustomButton
                                        label="Payment"
                                        handleClick={() =>  {
                                                                console.log("Booking appointment")
                                                                bookappointment()
                                                            }}
                                     />
                            

                               
                                    

                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box component={"h3"}>Note</Box>
                                        <Box
                                            component={"ul"}
                                            sx={{ display: "flex", flexDirection: "column" }}
                                        >
                                            <Box component={"li"}>
                                                You have 48 hours of chat access
                                            </Box>
                                            <Box component={"li"}>
                                                You can cancel the appointment 2hrs before
                                            </Box>
                                            <Box component={"li"}>You can re-schedule 2 times</Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <h1>Completed</h1>
                        )}
                        
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
}

// <CustomModal
// isOpen={openPatientDetails}
// title={"Patient Details"}
// footer={
//     <Fragment>
//         <Box sx={{ width : "100%" , display : "flex" ,justifyContent : "center" , alignItems : "center" }}>
//             <CustomButton
//                 label="Continue"
//                 handleClick={() => setPatientDetails(false)}
//             />
//         </Box>

//         <CustomButton
//             label={"action 2"}
//             isTransaprent
//             handleClick={() => setOpenDialog(false)}
//             isText
//         />
//     </Fragment>
// }
// >
// {
//     /* <Box sx={{ display: "flex", flexDirection: "column" }}>
//     <CustomRadioButton
//         label={"Patient Details"}
//         handleChange={({ target }) => setRadioVal(target.value)}
//         value={radioVal}
//         items={["My Self"]}
//     />
//     <CustomTextField placeholder={"Full Name"} label="" helperText={""} />
//     <CustomDropdown
//         label={"Gender"}
//         items={["Male", "Female", "Transgender"]}
//         // activeItem={activeDropdown}
//         // handleChange={(item) => setActiveDropdown(item)}
//         menuItemValue=""
//     />
//     <CustomDropdown
//         label={"Age"}
//         items={[...Array(101).keys()]}
//         // activeItem={ageDropDown}
//         // handleChange={(item) => setAgeDropDown(item)}
//         menuItemValue=""
//     />
//     <CustomTextField placeholder={"Attach Reports"} isDisabled={true} label="" helperText={""} />
//     <p>Write your problem here</p>
//     <TextField placeholder="Write your problem here" multiline rows={3} maxRows={4} />
// </Box>; */
// }
// </CustomModal>
