import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import img from "../../../../../static/images/DrImages/image 27.png";
import CustomButton from "../../../components/CustomButton";
import DropIn from "braintree-web-drop-in-react";
import { get_client_token, get_nonce } from "../../../const_payment/Const_Payment";
import CustomSnackBar from "../../../components/CustomSnackBar";
import NoAppointmentCard from "../../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../config/axiosInstance";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Using DateFns adapter for simplicity
import { formatDate } from "../../DrDetailsCard/bookappointmentapihelperfunction";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import isAfter from "date-fns/isAfter";
import startOfToday from "date-fns/startOfToday";
import { styled } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axios from "axios";
import { 
    generateClientToken, 
    isDevelopmentMode
} from "../../../services/paymentService";
const today = startOfToday();

const StyledPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "isAvailable",
})(({ theme, isAvailable }) => ({
    ...(isAvailable && {
        backgroundColor: "#E72B4A",
        color: "white",
        "&:hover": {
            backgroundColor: "darkgreen",
        },
    }),
}));

dayjs.extend(utc);
dayjs.extend(timezone);


const steps = ["Date", "Payment Method"];

export default function HCFStepper({ data }) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [showSnack, setShowSnack] = useState(false);
    const [showSnackError, setShowSnackError] = useState(false);
    const radioValues = ["My self"];
    const [radioVal, setRadioVal] = useState(radioValues[0]);
    const [availableDatesSnackError, setAvailableDatesSnackError] = useState(false);
    const [availableDatesSnackMessage, setAvailableDatesSnackMessage] = useState("");
    const [values, setValues] = useState({
        clientToken: null,
        success: "",
        error: "",
        instance: "",
    });
    const dropinInstanceRef = useRef(null);
    const [braintreeKey, setBraintreeKey] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [customAvailableDates, setCustomAvailableDates] = useState([]);
    const [appointmentData, setAppointmentData] = React.useState({
        book_date: null,
        patient_id: localStorage.getItem("patient_suid"),
        test_subexam_id: data?.sub_exam_id ? String(data.sub_exam_id) : "",
        status: "requested",
        payment_method_nonce: null,
    });

    const rangeStartDate = new Date(0, 0, 0);
    const rangeEndDate = new Date(0, 0, 0);


    const FetchDoctorAvailableDates = async () => {
        setAvailableDatesSnackError(false);
        try {
            const resp = await axiosInstance(`/sec/patient/availableLabTestDates/${data?.hcf_id}/${data?.exam_id}`);
            console.log("Lab Card Date : ",resp?.data)
            let date = resp?.data?.availableDates;
            let availableDates = date.map((dateString) => {
                const [year, month, day] = dateString.split("-").map(Number);
                return new Date(year, month - 1, day); // month -1 to get the correct month
            });
            setCustomAvailableDates(availableDates);
        } catch (err) {
            setAvailableDatesSnackError(true);
            setCustomAvailableDates([]);
            setAvailableDatesSnackMessage(err?.response?.data?.error);
        }
    };

    //   const [activeFabDropdown, setActiveFabDropdown] = React.useState(dropdownItems[0]);
    //   const [activeDropdown, setActiveDropdown] = useState("");
    // const [ageDropDown, setAgeDropDown] = React.useState();
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

    const bookappointment = async (nonce_value) => {
        setShowSnack(false);
        setShowSnackError(false);
        try {
            const response = await axiosInstance.post(
                `/sec/patient/createTest`,
                JSON.stringify({ ...appointmentData, payment_method_nonce: nonce_value }),
            );
            setShowSnack(true);
            setShowSnackError(false);
        } catch (error) {
            console.log(error);
            setShowSnack(false);
            setShowSnackError(true);
        }
    };

    // Force refresh of Braintree Drop-In instance
    const refreshBraintreeInstance = async () => {
        try {
            setIsRefreshing(true);
            console.log("Refreshing Braintree Drop-In instance...");
            
            // Get fresh client token
            const freshTokenResponse = await get_client_token("/sec/payment/generateToken");
            console.log("Generated fresh client token response:", freshTokenResponse);
            
            // Handle different response structures
            let freshToken;
            if (typeof freshTokenResponse === 'string') {
                freshToken = freshTokenResponse;
            } else if (freshTokenResponse?.clientToken) {
                freshToken = freshTokenResponse.clientToken;
            } else if (freshTokenResponse?.data?.clientToken) {
                freshToken = freshTokenResponse.data.clientToken;
            } else {
                throw new Error("Invalid token response structure");
            }
            
            if (!freshToken) {
                throw new Error("Failed to get valid client token");
            }
            
            // Update values with fresh token; clear stale instance reference
            setValues(prev => ({ ...prev, clientToken: freshToken, instance: null }));
            dropinInstanceRef.current = null;
            
            // Force re-render of Braintree component by incrementing key
            setBraintreeKey(prev => prev + 1);
            
            console.log("Braintree instance refreshed successfully with token:", freshToken);
        } catch (error) {
            console.error("Error refreshing Braintree instance:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    // api function to fetch purchase plan
    const Purchase_plan = async () => {
        try {
            // Check if Braintree instance is available and not torn down
            if (!dropinInstanceRef.current && !values?.instance) {
                console.log("No Braintree instance available, refreshing...");
                await refreshBraintreeInstance();
                // Wait a bit for the instance to initialize
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Check again after refresh
                if (!dropinInstanceRef.current && !values?.instance) {
                    throw new Error("Braintree payment form not ready. Please wait and try again.");
                }
            }
            
            // Use the most current instance (prefer dropinInstanceRef, fallback to values.instance)
            const currentInstance = dropinInstanceRef.current || values?.instance;
            
            // Check if instance is still valid (not torn down)
            try {
                // Test if instance is still valid by checking if it has the requestPaymentMethod function
                if (!currentInstance || typeof currentInstance.requestPaymentMethod !== 'function') {
                    console.log("Braintree instance is invalid, refreshing...");
                    await refreshBraintreeInstance();
                    // Wait a bit for the instance to initialize
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Get the refreshed instance
                    const refreshedInstance = dropinInstanceRef.current || values?.instance;
                    if (!refreshedInstance || typeof refreshedInstance.requestPaymentMethod !== 'function') {
                        throw new Error("Braintree payment form is no longer valid. Please refresh the payment form.");
                    }
                }
            } catch (error) {
                console.error("Braintree instance validation failed:", error);
                if (error.message.includes("refresh")) {
                    throw error; // Re-throw refresh errors
                }
                throw new Error("Braintree payment form is no longer valid. Please refresh the payment form.");
            }
            
            // Generate fresh nonce for each payment attempt with retry logic
            console.log("Requesting payment method from Braintree...");
            let nonce_value;
            let retryCount = 0;
            const maxRetries = 2;
            
            while (retryCount < maxRetries) {
                try {
                    const instanceToUse = dropinInstanceRef.current || values?.instance;
                    nonce_value = await get_nonce({ instance: instanceToUse });
                    console.log("Get nonce : ", nonce_value);
                    
                    if (nonce_value && typeof nonce_value === 'string') {
                        break; // Success, exit retry loop
                    }
                } catch (error) {
                    console.error(`Nonce generation attempt ${retryCount + 1} failed:`, error);
                    
                    if (error.message && error.message.includes('teardown')) {
                        console.log("Teardown error detected, refreshing Braintree instance...");
                        await refreshBraintreeInstance();
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for new instance
                        retryCount++;
                        continue;
                    } else {
                        throw error; // Re-throw non-teardown errors
                    }
                }
                
                retryCount++;
            }
            
            if (!nonce_value || typeof nonce_value !== 'string') {
                throw new Error("Failed to generate payment nonce after retries. Please refresh the payment form and try again.");
            }

            setAppointmentData({ ...appointmentData, payment_method_nonce: nonce_value });

            if (nonce_value) {
                await bookappointment(nonce_value);
            } else {
                throw new Error("Failed to receive valid nonce from payment form.");
            }
        } catch (error) {
            console.error("Error in payment processing:", error);
            setShowSnackError(true);
            
            // Handle specific teardown error
            if (error.message && error.message.includes('teardown')) {
                // Automatically refresh the Braintree instance for this specific error
                console.log("Automatically refreshing Braintree instance due to teardown error...");
                try {
                    await refreshBraintreeInstance();
                    setShowSnackError(false);
                    setShowSnack(true);
                } catch (refreshError) {
                    console.error("Failed to auto-refresh Braintree instance:", refreshError);
                    setShowSnackError(true);
                }
            } else if (error.message && error.message.includes('no longer valid')) {
                // Automatically refresh the Braintree instance for this specific error
                console.log("Automatically refreshing Braintree instance due to invalid instance error...");
                try {
                    await refreshBraintreeInstance();
                    setShowSnackError(false);
                    setShowSnack(true);
                } catch (refreshError) {
                    console.error("Failed to auto-refresh Braintree instance:", refreshError);
                    setShowSnackError(true);
                }
            } else {
                setShowSnackError(true);
            }
        }
    };

    const selectDate = (date) => {
        const formatDateResp = formatDate(date);
        setAppointmentData({ ...appointmentData, book_date: formatDateResp });
    };

    const isInRange = (date) =>
        isWithinInterval(date, { start: rangeStartDate, end: rangeEndDate });

    const isAvailable = (date) =>
        isInRange(date) ||
        customAvailableDates.some((availableDate) => isSameDay(availableDate, date));



    const shouldDisableDate = (date) => {
        // Disable all past dates
        if (date < today) {
            return true;
        }

        // Enable today's date if it's in range or custom available dates
        if (isSameDay(date, today)) {
            return !(
                isInRange(date) ||
                customAvailableDates.some((availableDate) => isSameDay(availableDate, date))
            );
        }

        // Disable future dates that are not in range or custom available dates
        return !(
            isInRange(date) ||
            customAvailableDates.some((availableDate) => isSameDay(availableDate, date))
        );
    };


    useEffect(() => {
        get_client_token("/sec/payment/generateToken").then((tokenResponse) => {
            console.log("Getting client token response", tokenResponse);
            
            // Handle different response structures
            let clientToken;
            if (typeof tokenResponse === 'string') {
                clientToken = tokenResponse;
            } else if (tokenResponse?.clientToken) {
                clientToken = tokenResponse.clientToken;
            } else if (tokenResponse?.data?.clientToken) {
                clientToken = tokenResponse.data.clientToken;
            }
            
            if (clientToken) {
                setValues({ ...values, clientToken: clientToken });
                console.log("Client token set successfully:", clientToken);
            } else {
                console.error("Failed to get valid client token");
            }
        });
        FetchDoctorAvailableDates();
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <CustomSnackBar
                isOpen={availableDatesSnackError}
                message={availableDatesSnackMessage}
                type="error"
            />
            <CustomSnackBar
                isOpen={showSnack}
                message={"Appointment Booked Successfully"}
                type="success"
            />
            <CustomSnackBar
                isOpen={showSnackError}
                message={"Can not book appointment try some other time "}
                type="error"
            />
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
                        <Button onClick={handleReset}>Done</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {/* Step {activeStep + 1} */}
                        {activeStep === 0 ? (
                            <>
                                {customAvailableDates.length === 0 ? (
                                    <NoAppointmentCard text_one={availableDatesSnackMessage} />
                                ) : (
                                    <Box>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateCalendar
                                                // value={selectedDate}
                                                onChange={selectDate}
                                                shouldDisableDate={shouldDisableDate}
                                                slots={{
                                                    day: (props) => (
                                                        <StyledPickersDay
                                                            {...props}
                                                            isAvailable={isAvailable(props.day)}
                                                        />
                                                    ),
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                )}
                                {/* <Box>
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
                                </Box> */}
                            </>
                        ) : activeStep === 1 ? (
                            <>
                                <Box>
                                    {/* Payment container starts */}
                                    <div className="payment">
                                        {values?.clientToken && !isRefreshing && (
                                            <div>
                                                <DropIn
                                                    key={braintreeKey}
                                                    options={{
                                                        authorization: values?.clientToken,
                                                    }}
                                                    onInstance={(instance) => {
                                                        console.log(
                                                            "Braintree Drop-In instance:",
                                                            instance,
                                                        );
                                                        setValues({
                                                            ...values,
                                                            instance: instance,
                                                        });
                                                        dropinInstanceRef.current = instance;
                                                    }}
                                                />
                                                <center>
                                                    <CustomButton
                                                        label="Payment"
                                                        handleClick={() => Purchase_plan()}
                                                    />
                                                </center>
                                            </div>
                                        )}
                                        {(!values?.clientToken || isRefreshing) && (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                                                <Typography>Loading payment form...</Typography>
                                            </Box>
                                        )}
                                    </div>
                                    {/* Payment container ends */}
                                </Box>
                            </>
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
