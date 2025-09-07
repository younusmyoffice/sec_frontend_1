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
import CustomRadioButton from "../../components/CustomRadioButton/custom-radio-button";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import messageLogo from "../../constants/patientAppointmentLogo/messageLogo.png";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const steps = ["Date", "Details", "Symptoms", "Duration", "Payment"];

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
        TimeVale : dayjs.utc('2022-04-17T15:30'),
        FullName : null,
        writeYourProblem : null,
        questionone : null,
        questiontwo : null,
        questionthree : null,
        questionfour : null,
        questionfive : null,
        plan : null,
        selectDuration : null,
        attachments : null
    })
    const bookappointment = async () => {
        console.log("Booking appoointment on click")
        try {
            const response = await axios.post(
                "http://localhost:3000/sec/createAppointment/7",
                JSON.stringify({
                                appointment_date: "2023-11-02",
                                patient_id: parseInt(data?.patient_id),
                                doctor_id: parseInt(data?.doctor_id),
                                symptoms: data?.writeYourProblem,
                                attachments: data.attachments,
                                status: "in_progress",
                                reason: data?.writeYourProblem,
                                next_review_date:"2023-11-02" , 
                                action_done_by: 4,
                                patient_type:data?.radioVal,
                                name:data?.FullName ,  
                                gender:data?.activeDropdown,
                                age:parseInt(data?.ageDropDown),
                                reports:data?.attachments,  
                                patient_report:data?.attachments, 
                                answer_1:data?.questionone,  
                                answer_2:data?.questiontwo,  
                                answer_3:data?.questionthree,  
                                answer_4:data?.questionfour, 
                                answer_5:data?.questionfive, 
                                duration:data.selectDuration,
                                subscription_id:1, 
                                transaction_id:"Xsfhs23446sdkdhftiweh", 
                                problem:data.plan 
                }));
            console.log("RESPONSE : ", response);
            alert('Appointment Booked succesfully');
        } catch (error) {
            console.log(error);
            console.log("Final Data : ",data)
            alert(error);
        }
    };

console.log("Appointment Data : " , data);



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
    // console.log("plan" , data)
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
                                <Box>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar
                                            onChange={(newValue) => setData({...data , DateValue : `${newValue?.$D}/${newValue?.$M}/${newValue?.$y}`})}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Box>Select Time</Box>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                                components={[
                                                'TimePicker',
                                                'MobileTimePicker',
                                                'DesktopTimePicker',
                                                'StaticTimePicker',
                                                ]}
                                            >
                                        <DemoItem label="Responsive variant">
                                            <TimePicker timezone="Asia/Kolkata" onChange={(newValue) => setData({...data , TimeVale : newValue?.$m})} label="Select Time" />
                                        </DemoItem>
                                    </DemoContainer>
                                        {/* <DemoItem label="Responsive variant">
                                            <TimePicker timeSteps={(value) => console.log("Time step : ",value)} onChange={(newValue) => setData({...data , TimeVale : newValue})} label="Select Time" />
                                        </DemoItem> */}
                                        {/* <DemoContainer components={["TimePicker"]}>
                                            <TimePicker onChange={(newValue) => setData({...data , TimeVale : newValue})} label="Select Time" />
                                        </DemoContainer> */}
                                    </LocalizationProvider>
                                </Box>
                            </>
                        ) : activeStep === 1 ? (
                            <>
                                <Box sx={{ display: "flex", flexDirection: "column"}}>
                                    <CustomRadioButton
                                        label={"Patient Details"}
                                        handleChange={({ target }) => setData({...data , radioVal : target?.value})}
                                        // value={}
                                        value={data.radioVal}
                                        radioGroupCss={{flexDirection : "row"}}
                                        radiocss={{display : "flex"}}
                                        items={["My Self" , "Minor"]}
                                    />
                                    <CustomTextField
                                        placeholder={"Full Name"}
                                        onInput={ (event) => setData({...data , FullName : event?.target?.value}) }
                                        label=""
                                        helperText={""}
                                    />
                                    <CustomDropdown
                                        label={"Gender"}
                                        items={["Male", "Female", "Transgender"]}
                                        dropdowncss={{ m : 0  , minWidth : "100%", marginTop : "1%"}}
                                        activeItem={data?.activeDropdown}
                                        handleChange={(item) => setData({...data , activeDropdown : item})}
                                        menuItemValue=""
                                    />
                                    <CustomDropdown
                                        label={"Age"}
                                        items={[...Array(101).keys()]}
                                        dropdowncss={{ m : 0  , minWidth : "100%" , marginTop : "1%"}}
                                        activeItem={data?.ageDropDown}
                                        handleChange={(item) => setData({...data , ageDropDown : item})}
                                        menuItemValue=""
                                    />
                                    <CustomTextField
                                        placeholder={"Attach Reports"}
                                        onInput={(item) => setData({...data , attachments : item?.target?.value})}
                                        // isDisabled={true}
                                        // onInput={ event => setYourProblem(event.target.value)}
                                        label=""
                                        helperText={""}
                                        type={"file"}
                                    />
                                    
                                    <p>Write your problem here</p>
                                    <TextField
                                        placeholder="Write your problem here"
                                        onInput={ event => setData({...data , writeYourProblem : event?.target?.value})}
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
                                        <CustomDropdown
                                            label={"Are you suffering from fever"}
                                            items={["High Fever", "Medium fever", "Low Fever" , "No Fever"]}
                                            // dropdowncss={{ m : 0  , minWidth : "100%", marginTop : "1%"}}
                                            activeItem={data?.questionone}
                                            handleChange={(item) => setData({...data , questionone : item})}
                                            menuItemValue=""
                                         />
                                        <CustomDropdown
                                            label={"Are you suffering from Head Ache "}
                                            items={["High Head Ache", "Medium Head Ache", "Low Head Ache" , "No Head Ache"]}
                                            // dropdowncss={{ m : 0  , minWidth : "100%", marginTop : "1%"}}
                                            activeItem={data?.questiontwo}
                                            handleChange={(item) => setData({...data , questiontwo : item})}
                                            menuItemValue="" 
                                        />
                                        <CustomDropdown 
                                            label={"Are you dibetics patient"}
                                            items={["yes i am diabatic", "No i am not diabatic"]}
                                            // dropdowncss={{ m : 0  , minWidth : "100%", marginTop : "1%"}}
                                            activeItem={data?.questionthree}
                                            handleChange={(item) => setData({...data , questionthree : item})}
                                            menuItemValue=""
                                        />
                                        <CustomDropdown 
                                            label={"Are you suffering from fever"}
                                            items={["High Fever", "Medium fever", "Low Fever" , "No Fever"]}
                                            // dropdowncss={{ m : 0  , minWidth : "100%", marginTop : "1%"}}
                                            activeItem={data?.questionfour}
                                            handleChange={(item) => setData({...data , questionfour : item})}
                                            menuItemValue=""
                                        />
                                        <CustomDropdown 
                                            label={"Are you suffering from fever"}
                                            items={["High Fever", "Medium fever", "Low Fever" , "No Fever"]}
                                        // dropdowncss={{ m : 0  , minWidth : "100%", marginTop : "1%"}}
                                            activeItem={data?.questionfive}
                                            handleChange={(item) => setData({...data , questionfive : item})}
                                            menuItemValue=""
                                        />
                                    </Box>
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
