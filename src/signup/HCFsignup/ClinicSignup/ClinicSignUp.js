import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "./clinicsignup.scss"
import ImageFrame from "../../../constants/DrImages/Frame.png"
import ClassicFrame from "../../../constants/DrImages/Undraw.png"
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import CustomButton from '../../../components/CustomButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import ServiceDetails from "./Step3/ServiceDetails";
// import ServiceDetails from "./ServiceDetails";

const steps = ["", "", "", "", ""];

const HCFStepper = () => {
    const dropdownItems = ["item1", "item2", "item3"];
    const [activeDropdown, setActiveDropdown] = useState("");
  
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
      }
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [value, setValue] = useState([null, null]);
    const radioValues = ["My self"];
    // const [radioVal, setRadioVal] = React.useState(radioValues[0]);
    //   const [activeFabDropdown, setActiveFabDropdown] = React.useState(dropdownItems[0]);
    //   const [activeDropdown, setActiveDropdown] = useState("");
    // const [ageDropDown, setAgeDropDown] = React.useState();
    // const [DateValue, setDataValue] = React.useState(null);

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
    <div className="Stepper-Container" sx={{ width: "100%" }}>
    <div className="FrameBox">
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
                            sx={{ mr: 1 ,color:'red'}}
                      >
                            Back
                        </Button>
</div>
           <div className="Stepper">
           <Stepper activeStep={activeStep}
           style={{
            width:'700px'
           }}>
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
    
 
    <div className="hcftitle1">
      <Typography
      style={{
        color:'#313033',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'500',
        lineHeight:'30px',
        fontSize:'20px'
      }}>
        HCF CLINIC INFORMATION
      </Typography>
    </div>
    <div className="info-fields1">
      <CustomTextField
      label='Company name'
      helperText={""}
      textcss={{
        width:'360px',
        color:'#787579',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'24px',
        fontSize:'16px'
      }}>

      </CustomTextField>

      <CustomTextField
      label='Business name'
      helperText={""}
      textcss={{
        width:'360px',
        color:'#787579',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'24px',
        fontSize:'16px'
      }}>

      </CustomTextField>

      <CustomTextField
      label='Registration No'
      helperText={""}
      textcss={{
        width:'360px',
        color:'#787579',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'24px',
        fontSize:'16px'
      }}>

      </CustomTextField>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}
      >
        <DatePicker label="Reg.Date" style={{width:'360px'}}
        />
      </DemoContainer>
    </LocalizationProvider>

    </div>
    <div className="sve-btn">
    <CustomButton handleClick={handleNext}
                        label='Next'
                        buttonCss={{
                            width:'360px'
                        }}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                            
                        </CustomButton>
    </div>
   </div>
                                </Box>
                            </>
                        ) : activeStep === 1 ? (
                            <>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                         <div className="mainBox1">
                         <div className="servicetitle1">
      <Typography
      style={{
        color:'#313033',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'500',
        lineHeight:'30px',
        fontSize:'20px'
      }}>
        Service Details
      </Typography>
    </div>
  <div className="date-time-picker">
  <ServiceDetails/>
  </div>
    <div className="services">
                            <CustomDropdown
                            label={"Services Offered"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                            dropdowncss={{
                                width:'360px',
                                height:'56px',
                                color:'#E6E1E5'
                            }}
                        />
                            </div>
                             <div className="nxt-btn1">
                             <CustomButton handleClick={handleNext}
                        label='Next'
                        buttonCss={{
                            width:'360px'
                        }}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                            
                        </CustomButton>
   </div>
                         </div>
                                                     </Box>
                            </>
                        ) : activeStep === 2 ? (
                            <>
                          <div className="back-btn">
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                      >
                            Back
                        </Button>
                          </div>
                               <div className="contact-container">
                               <div className="title3">
      <Typography
      style={{
        color:'#313033',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'500',
        lineHeight:'30px',
        fontSize:'20px'
      }}>
        Contact Information
      </Typography>
    </div>
    <div className="info-fields1">
      <CustomTextField
      label='Street Line1'
      helperText={""}
      textcss={{
        width:'360px',
        color:'#787579',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'24px',
        fontSize:'16px'
      }}>

      </CustomTextField>

      <CustomTextField
      label='Street Line2'
      helperText={""}
      textcss={{
        width:'360px',
        color:'#787579',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'24px',
        fontSize:'16px'
      }}>

      </CustomTextField>

      <CustomTextField
      label='State'
      helperText={""}
      textcss={{
        width:'360px',
        color:'#787579',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'24px',
        fontSize:'16px'
      }}>

      </CustomTextField>

      <CustomTextField
      label='City'
      helperText={""}
      textcss={{
        width:'360px',
        color:'#787579',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'24px',
        fontSize:'16px'
      }}>

      </CustomTextField>

      <CustomTextField
      label='Zip Code'
      helperText={""}
      textcss={{
        width:'360px',
        color:'#787579',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'24px',
        fontSize:'16px'
      }}>

      </CustomTextField>

      <CustomTextField
      label='Fax No'
      helperText={""}
      textcss={{
        width:'360px',
        color:'#787579',
        fontFamily:'poppins',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'24px',
        fontSize:'16px'
      }}>

      </CustomTextField>

   

    </div>
    <div className="nxt-btn1">
    <CustomButton handleClick={handleNext}
                        label='Next'
                        buttonCss={{
                            width:'360px'
                        }}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                            
                        </CustomButton>
    </div>
                               </div>
                            </>
                        ) : activeStep === 3 ? (
                            <>
                               <div className="imge-cont">
    
    <div className="card-cont1">
      <div className="card1">
    <div className="undraw-img1">
    <Box
                                sx={{  width: "222px", height: "252px",  }}
                                component={"img"}
                                src={ClassicFrame}
                            ></Box>
    </div>
    <div className="greetings1">
      <Typography
      style={{
        color:'#313033',
        fontFamily:'poppins',
        fontSize:'16px',
        fontStyle:'normal',
        fontWeight:'600',
        lineHeight:'24px',
        
      }}>
        Thank you for Choosing to rigister with us!
      </Typography>
    </div>
    <div className="note1">
      <Typography
      style={{
        color:'#939094',
        fontFamily:'poppins',
        fontSize:'14px',
        fontStyle:'normal',
        fontWeight:'400',
        lineHeight:'21px',
        letterSpacing:'0.07px' 
      }}>
        our team will get in touch with you shortly
      </Typography>
    </div>
    <div className="done-btn1">
      <CustomButton
      label='Done'
      buttonCss={{
        width:'270px',
        borderRadius:'20px'
      }}>
        Done 
      </CustomButton>
    </div>
      </div>
    </div>
  </div>
                            </>
                        ) : activeStep === 4 ? (
                            <Box sx={{ width: "100%" }}>
                              
                             
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
        </div>
    </>
  )
}

export default HCFStepper