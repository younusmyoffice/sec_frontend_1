import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
// import { DateCalendar  } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CustomRadioButton from "../../components/CustomRadioButton/custom-radio-button";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import messageLogo from "../../static/images/patientAppointmentLogo/messageLogo.png";
import CustomButton from "../../components/CustomButton";
import { baseURL } from "../../constants/const";
import CustomSnackBar from "../../components/CustomSnackBar";
import { get_client_token, get_nonce } from "../../const_payment/Const_Payment";
import DropIn from "braintree-web-drop-in-react";
import "./patientBookappointment.scss";
import axiosInstance from "../../config/axiosInstance";
import NoAppointmentCard from "../PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import "./bookappointment.scss";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Using DateFns adapter for simplicity
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import isAfter from "date-fns/isAfter";
import startOfToday from "date-fns/startOfToday";
import { fetchDocDuration, fetchQuestions, formatDate } from "./bookappointmentapihelperfunction";
import { useParams } from "react-router-dom";

const today = startOfToday();

const StyledPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "isAvailable",
})(({ theme, isAvailable }) => ({
    ...(isAvailable && {
        backgroundColor: "green",
        color: "white",
        "&:hover": {
            backgroundColor: "darkgreen",
        },
    }),
}));

dayjs.extend(utc);
dayjs.extend(timezone);

const steps = ["Details", "Date & Time", "Duration", "Questions", "Payment"];

export default function HorizontalLinearStepper({ drID, hcfDoc }) {
    const params = useParams();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const radioValues = ["My self", "Minor"];
    const [showSnack, setShowSnack] = React.useState(false);
    const [showSnackError, setShowSnackError] = React.useState(false);
    const [availableDatesSnackError, setAvailableDatesSnackError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [time_slot, setTime_slot] = React.useState([]);
    const [question, setQuestion] = React.useState(null);
    const [customAvailableDates, setCustomAvailableDates] = useState([]);
    const [availableDatesSnackMessage, setAvailableDatesSnackMessage] = useState("");
    const [planfee, setPlanFee] = useState("");
    const [selectPackage, setSelectPackage] = React.useState([]);
    const [packageflag, setPackageFlag] = React.useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [values, setValues] = React.useState({
        clientToken: null,
        success: "",
        error: "",
        instance: "",
    });
    // Payment variables----
    const [nonce, setNonce] = React.useState(null);
    const [timeslotData, setTimeslotData] = React.useState({
        appointment_date: null,
        doctor_id: Number(drID),
        duration: null,
    });

    const [appointmentData, setAppointmentData] = React.useState({
        appointment_date: null,
        appointment_time: null,
        patient_id: Number(localStorage.getItem("patient_suid")),
        doctor_id: Number(drID),
        fileName: null,
        file: null,
        action_done_by: 5,
        patient_type: null,
        name: null,
        gender: null,
        age: null,
        patient_report: null,
        answer_1: null,
        answer_2: null,
        answer_3: null,
        answer_4: null,
        answer_5: null,
        duration: null,
        doctor_fee_plan_id: null, //important plan and listing should be active
        payment_method_nonce: null,
        problem: null,
    });
    console.log(hcfDoc);

    console.log(
        "this is the flag inside of the book appointment modal : ",
        hcfDoc +
        `this is the hcf id : ${params?.reshcfID} and this is the doc id : ${params?.hcddocid}`,
    );
    const [messagingPlan, setMessaginplanActive] = React.useState(false);
    const [voiceMessagingPlan, setVoiceMessaginplanActive] = React.useState(false);
    const [videoMessagingPlan, setVideoMessaginplanActive] = React.useState(false);
    const [duration, setDuration] = React.useState([]);

    // List of available dates range
    const rangeStartDate = new Date(0, 0, 0);
    const rangeEndDate = new Date(0, 0, 0);

    // Define custom available dates
    // const customAvailableDates = [new Date(2024, 6, 21), new Date(2024, 7, 2)];

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

    const fetch_Time_Slots = async () => {
        try {
            const response = await axiosInstance.post(
                "/sec/patient/getAppointmentSlots",
                timeslotData,
            );
            // return response?.data?.response?.availableSlots;
            setTime_slot(response?.data?.response?.availableSlots);
        } catch (err) {
            // return err;
            console.log("Erorr : ", err);
        }
    };

    const bookappointment = async (nonce_value) => {
        setShowSnack(false);
        setShowSnackError(false);
        try {
            const BookAppoinetmentApiPath = hcfDoc
                ? "/sec/patient/createAppointmentHcfDoctor"
                : "/sec/patient/createAppointment/";
            const response = await axiosInstance.post(
                BookAppoinetmentApiPath,
                hcfDoc
                    ? JSON.stringify({
                        ...appointmentData,
                        payment_method_nonce: nonce_value,
                        hcf_id: params?.hcddocid,
                    })
                    : JSON.stringify({ ...appointmentData, payment_method_nonce: nonce_value }),
            );
            setShowSnack(true);
            setShowSnackError(false);
        } catch (error) {
            console.log(error);
            setShowSnack(false);
            setShowSnackError(true);
        }
    };
    console.log("appointmentData : ", appointmentData);
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

    // api function to fetch purchase plan
    const Purchase_plan = async () => {
        // pass the values fetched by the DropIn
        const nonce_value = await get_nonce(values);
        console.log("Get nounce : ", nonce_value);
        setNonce(nonce);
        setAppointmentData({ ...appointmentData, payment_method_nonce: nonce_value });

        if (nonce_value) {
            bookappointment(nonce_value);
        } else {
            alert("did not received the nonce : ", nonce_value);
        }
    };

    // api function to fetch questions
    // const fetchQuestions = async () => {
    //     try {
    //         const response = await axiosInstance.post(
    //             "/sec/patient/createAppointmentPackageQuestion/",
    //             JSON.stringify({
    //                 doctor_id: drID,
    //                 is_active: 1,
    //             }),
    //         );
    //         setQuestion(response?.data?.response?.questions);
    //     } catch (err) {
    //         console.log("Questions Error : ", err);
    //     }
    // };

    //  api function to fetch the doctor duration slots
    // const fetchDocDuration = async () => {
    //     try {
    //         const response = await axiosInstance(`/sec/patient/getAppointmentPlanDuration/${drID}`);
    //         // console.log("Suration : ", response.data?.response?.durations);
    //         let duration = [];
    //         for (let key in response.data?.response?.durations) {
    //             // console.log("durations :   ==   ",response.data?.response?.durations[key]?.plan_duration);
    //             duration.push(response.data?.response?.durations[key]?.plan_duration);
    //         }
    //         console.log(duration);
    //         setDuration(duration);
    //     } catch (err) {
    //         console.log("Duration Error : ", err);
    //     }
    // };

    // api function to fetch the select package

    const [doctorListId, setDoctorListId] = useState(null);

    const fetchSelectPackage = async () => {
        // console.log("Appointnment data : ", drID, appointmentData?.duration);
        try {
            const response = await axiosInstance.post(
                "/sec/patient/createAppointmentPackageSelect/",
                JSON.stringify({
                    doctor_id: drID,
                    is_active: 1,
                    duration: appointmentData?.duration,
                }),
            );
            console.log("Package plan : ", response.data?.response.plan);
            console.log("Doctor list id : ", response.data?.response.plan[0]?.doctor_list_id);
            setDoctorListId(response.data?.response.plan[0]?.doctor_list_id);
            setSelectPackage(response?.data?.response.plan);
            // for (let key in response?.data?.response) {
            //     duration.push(key);
            //     // setDuration([...duration , key])
            // }
        } catch (err) {
            console.log("select Error : ", err);
        }
    };

    const fetchQuestions = async () => {
        try {
            const response = await axiosInstance.post(
                "/sec/patient/createAppointmentPackageQuestion/",
                JSON.stringify({
                    doctor_id: drID,
                    is_active: 1,
                    doctor_list_id: doctorListId,
                }),
            );
            setQuestion(response?.data?.response?.questions);
        } catch (err) {
            console.log("Questions Error : ", err);
        }
    };

    // function to take date as an input
    const selectDate = (date) => {
        const formatDateResp = formatDate(date);
        setAppointmentData({ ...appointmentData, appointment_date: formatDateResp });
        fetchDocDuration(drID, formatDateResp)
            .then((duration) => {
                console.log("Duration promise resolved : ", duration);
                setDuration(duration);
            })
            .catch((err) => console.log(err));
    };

    // to select the package
    React.useEffect(() => {
        fetchSelectPackage();
    }, [packageflag]);

    // for fetching time slots
    React.useEffect(() => {
        //  api function to fetch time slots
        fetch_Time_Slots();
        // fetch_Time_Slots(timeslotData)
        //     .then((data) => {
        //         console.log("Available slots : ",data)
        //         setTime_slot(data)})
        //     .catch((err) => console.log("fetch time slot err : ", err));
    }, [timeslotData]);

    // calling payment api --------

    const FetchDoctorAvailableDates = async () => {
        setAvailableDatesSnackError(false);
        try {
            const resp = await axiosInstance.post(
                "/sec/patient/getAvailableAppointmentDates",
                JSON.stringify({
                    doctor_id: Number(drID),
                }),
            );
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

    React.useEffect(() => {
        get_client_token("/sec/payment/generateToken").then((resp) =>
            setValues({ ...values, clientToken: resp }),
        );
        // clientToken("/sec/payment/generateToken").then((resp) =>
        //     setValues({ ...values, clientToken: resp }),
        // );
        // fetchQuestions();


        setAvailableDatesSnackError(false);
        FetchDoctorAvailableDates();
    }, []);

    React.useEffect(() => {
        fetchQuestions();
    }, [doctorListId]);

    console.log("Appointment Data : ", appointmentData);
    console.log("plan fee : ", planfee);

    const handleFileInput = (event) => {
        const file = event.target.files[0]; // Get the file object
        if (file) {
            const fileName = file.name;
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(",")[1]; // Extract base64 without metadata
                setAppointmentData({
                    ...appointmentData,
                    fileName,
                    file: base64Data, // Store the base64 representation
                });
            };

            reader.readAsDataURL(file); // Read the file as Data URL
        }
    };

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
                    {
                        /* if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    } */
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
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <CustomRadioButton
                                        label={"Patient Details"}
                                        handleChange={({ target }) =>
                                            // setData({ ...data, radioVal: target?.value })
                                            setAppointmentData({
                                                ...appointmentData,
                                                patient_type:
                                                    target?.value === "My Self"
                                                        ? "patient"
                                                        : target?.value === "Minor"
                                                            ? "minor"
                                                            : null,
                                            })
                                        }
                                        // value={}
                                        value={
                                            appointmentData.patient_type === "patient"
                                                ? "My Self"
                                                : appointmentData.patient_type === "minor"
                                                    ? "Minor"
                                                    : null
                                        }
                                        radioGroupCss={{ flexDirection: "row" }}
                                        radiocss={{ display: "flex" }}
                                        items={["My Self", "Minor"]}
                                    />
                                    <CustomTextField
                                        onInput={(event) =>
                                            // setData({ ...data, FullName: event?.target?.value })
                                            setAppointmentData({
                                                ...appointmentData,
                                                name: event?.target?.value,
                                            })
                                        }
                                        defaultValue={appointmentData?.name}
                                        CustomValue={appointmentData?.name}
                                        label={"Full Name"}
                                        helperText={""}
                                    />
                                    <CustomDropdown
                                        label={"Gender"}
                                        items={["Male", "Female", "I prefer not to say"]}
                                        dropdowncss={{ m: 0, minWidth: "100%", marginTop: "1%" }}
                                        activeItem={appointmentData?.gender}
                                        handleChange={(item) =>
                                            // setData({ ...data, activeDropdown: item })
                                            setAppointmentData({
                                                ...appointmentData,
                                                gender: item,
                                            })
                                        }
                                        menuItemValue=""
                                    />
                                    <CustomDropdown
                                        label={"Age"}
                                        items={[...Array(101).keys()]}
                                        dropdowncss={{ m: 0, minWidth: "100%", marginTop: "1%" }}
                                        activeItem={appointmentData?.age}
                                        handleChange={(item) =>
                                            // setData({ ...data, ageDropDown: item })
                                            setAppointmentData({
                                                ...appointmentData,
                                                age: Number(item),
                                            })
                                        }
                                        menuItemValue=""
                                    />

                                    <Box
                                        className="file-upload-container"
                                        sx={{ marginTop: "10px" }}
                                    >
                                        <input
                                            type="file"
                                            id="fileInput"
                                            onChange={handleFileInput}
                                            className="file-input"
                                            accept=".pdf,.docx" // Optional: Restrict file types
                                        />
                                        <label
                                            htmlFor="fileInput"
                                            style={{
                                                display: "flex",
                                                alignItems: "center", // Vertically align items
                                                gap: "10px", // Add spacing between items
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                component="span"
                                                style={{
                                                    textTransform: "none",
                                                    fontSize: "14px",
                                                    padding: "8px 16px",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Choose File
                                            </Button>
                                            <Typography
                                                variant="body2"
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#333",
                                                }}
                                            >
                                                Selected File:{" "}
                                                {appointmentData.fileName
                                                    ? appointmentData.fileName
                                                    : "None"}
                                            </Typography>
                                        </label>
                                    </Box>

                                    <p>Write your problem here</p>
                                    <TextField
                                        placeholder="Write your problem here"
                                        onInput={(event) =>
                                            // setData({
                                            //     ...data,
                                            //     writeYourProblem: event?.target?.value,
                                            // })
                                            setAppointmentData({
                                                ...appointmentData,
                                                problem: event?.target?.value,
                                            })
                                        }
                                        multiline
                                        rows={3}
                                        maxRows={4}
                                    />
                                </Box>
                            </>
                        ) : activeStep === 1 ? (
                            <>
                                {customAvailableDates.length === 0 ? (
                                    <NoAppointmentCard text_one={availableDatesSnackMessage} />
                                ) : (
                                    <Box>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateCalendar
                                                value={selectedDate}
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
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <CustomDropdown
                                        label={"Select Duration"}
                                        items={
                                            duration?.length === 0 ? ["Please wait..."] : duration
                                        }
                                        // dropdowncss={{ m : 0  , minWidth : "100%", marginTop : "1%"}}
                                        activeItem={appointmentData?.duration}
                                        handleChange={(item) =>
                                        // setData({ ...data, selectDuration: item })
                                        {
                                            setAppointmentData({
                                                ...appointmentData,
                                                duration: item,
                                            });
                                            setTimeslotData({
                                                ...timeslotData,
                                                appointment_date:
                                                    appointmentData?.appointment_date,
                                                duration: item,
                                            });
                                        }
                                        }
                                        CustomSx={{ width: "40%" }}
                                        menuItemValue=""
                                    />
                                </Box>
                            </>
                        ) : activeStep === 2 ? (
                            <>
                                <Box>
                                    <p>Select Package</p>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* select time slot */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "100%",
                                            }}
                                        >
                                            <CustomDropdown
                                                label={"Select Time Slot"}
                                                items={
                                                    time_slot?.length === 0
                                                        ? ["Please wait..."]
                                                        : time_slot
                                                }
                                                dropdowncss={{ width: "100%" }}
                                                activeItem={appointmentData?.appointment_time}
                                                handleChange={(item) => {
                                                    // setData({ ...data, selectDuration: item })
                                                    setAppointmentData({
                                                        ...appointmentData,
                                                        appointment_time: item,
                                                    });
                                                    setPackageFlag(!packageflag);
                                                }}
                                                CustomSx={{ width: "40%" }}
                                                menuItemValue=""
                                            />
                                        </Box>

                                        <Box sx={{ width: "98%" }}>
                                            {selectPackage?.length === 0 ? (
                                                <NoAppointmentCard
                                                    text_one={"No packages available"}
                                                />
                                            ) : (
                                                selectPackage?.map((data) => {
                                                    const plan =
                                                        data?.plan_name === "message"
                                                            ? messagingPlan
                                                            : data?.plan_name === "video"
                                                                ? videoMessagingPlan
                                                                : data?.plan_name === "call"
                                                                    ? voiceMessagingPlan
                                                                    : "No Plan";
                                                    return (
                                                        <Box
                                                            sx={{
                                                                padding: "0% 2%",
                                                                width: "100%",
                                                                backgroundColor: "#ffff",
                                                                // border: "1px solid #AEAAAE",
                                                                borderRadius: "8px",
                                                                marginTop: "1%",
                                                                cursor: "pointer",
                                                                border: `0.5px solid ${plan === true
                                                                        ? "#E72B4A"
                                                                        : "#black"
                                                                    }`,
                                                            }}
                                                            component={"button"}
                                                            onClick={() => {
                                                                // setData({ ...data, plan: "₹12" });
                                                                setAppointmentData({
                                                                    ...appointmentData,
                                                                    doctor_fee_plan_id:
                                                                        data?.doctor_fee_plan_id,
                                                                });

                                                                setPlanFee(data?.plan_fee);

                                                                if (data?.plan_name === "message") {
                                                                    setMessaginplanActive(true);
                                                                    setVoiceMessaginplanActive(
                                                                        false,
                                                                    );
                                                                    setVideoMessaginplanActive(
                                                                        false,
                                                                    );
                                                                } else if (
                                                                    data?.plan_name === "video"
                                                                ) {
                                                                    setVideoMessaginplanActive(
                                                                        true,
                                                                    );
                                                                    setMessaginplanActive(false);
                                                                    setVoiceMessaginplanActive(
                                                                        false,
                                                                    );
                                                                } else if (
                                                                    data?.plan_name === "call"
                                                                ) {
                                                                    setVoiceMessaginplanActive(
                                                                        true,
                                                                    );
                                                                    setMessaginplanActive(false);
                                                                    setVideoMessaginplanActive(
                                                                        false,
                                                                    );
                                                                } else {
                                                                    // Handle the case where no plan matches
                                                                    console.log("No Plan");
                                                                }
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    px: 2,
                                                                    py: 1.5,
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    alignItems: "center",
                                                                    mb: 2,
                                                                    width: "100%",
                                                                    maxWidth: 512,
                                                                }}
                                                            >
                                                                {/* Left section: Icon + Plan info */}
                                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                    <Box
                                                                        component="img"
                                                                        src={messageLogo}
                                                                        alt="plan icon"
                                                                        sx={{
                                                                            width: 28,
                                                                            height: 28,
                                                                            mr: 1.5,
                                                                        }}
                                                                    />
                                                                    <Box>
                                                                        <Typography
                                                                            sx={{
                                                                                fontFamily: "Poppins",
                                                                                fontSize: "14px",
                                                                                fontWeight: 600,
                                                                                color: "#313033",
                                                                                lineHeight: "20px",
                                                                            }}
                                                                        >
                                                                            {data?.plan_name === "call"
                                                                                ? "Call Plan"
                                                                                : data?.plan_name === "message"
                                                                                    ? "Messaging Plan"
                                                                                    : data?.plan_name === "video"
                                                                                        ? "Video Plan"
                                                                                        : "No Plan"}
                                                                        </Typography>
                                                                        <Typography
                                                                            sx={{
                                                                                fontFamily: "Poppins",
                                                                                fontSize: "10px",
                                                                                fontWeight: 400,
                                                                                color: "#AEAAAE",
                                                                                lineHeight: "16px",
                                                                                mt: "-2px",
                                                                            }}
                                                                        >
                                                                            {data?.plan_name === "call"
                                                                                ? "Call Plan"
                                                                                : data?.plan_name === "message"
                                                                                    ? "Chat and message with doctor"
                                                                                    : data?.plan_name === "video"
                                                                                        ? "Video & Messaging"
                                                                                        : "No Plan"}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>

                                                                {/* Right section: Price + Duration */}
                                                                <Box sx={{ textAlign: "right" }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontFamily: "Poppins",
                                                                            fontSize: "18px",
                                                                            fontWeight: 600,
                                                                            color: "#313033",
                                                                            lineHeight: "22px",
                                                                        }}
                                                                    >
                                                                        ₹{data?.plan_fee}/
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            fontFamily: "Poppins",
                                                                            fontSize: "12px",
                                                                            fontWeight: 500,
                                                                            color: "#AEAAAE",
                                                                            lineHeight: "18px",
                                                                        }}
                                                                    >
                                                                        {data?.plan_duration}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>

                                                        </Box>
                                                    );
                                                })
                                            )}

                                            {/* {selectPackage?.length === 0 ? (
                                            <NoAppointmentCard text_one={"No Package"} />
                                        ) :  Object?.keys(selectPackage)?.map(data => {
                                            for (let key in selectPackage) {
                                             if(key == data){
                                                selectPackage[key]?.map(data => (
                                                   console.log("Fetched Data based on data : ",data)
                                                )
                                                )
                                             }
                                            }
                                        }) 
                                                    
                                        } */}
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        ) : activeStep === 3 ? (
                            <>
                                <Box>
                                    <p>Please answer the question </p>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        {question == null ? (
                                            <NoAppointmentCard text_one={"Please wait"} />
                                        ) : (
                                            question?.map((data, index) => {
                                                const answeres = [];
                                                for (const key in data) {
                                                    if (
                                                        key !== "doctor_questions_id" &&
                                                        key !== "question"
                                                    ) {
                                                        answeres.push(data[key]);
                                                    }
                                                }

                                                return (
                                                    <CustomDropdown
                                                        label={data?.question}
                                                        items={answeres}
                                                        activeItem={
                                                            appointmentData?.[`answer_${index + 1}`]
                                                        }
                                                        handleChange={(item) =>
                                                            setAppointmentData({
                                                                ...appointmentData,
                                                                [`answer_${index + 1}`]: item,
                                                            })
                                                        }
                                                        menuItemValue=""
                                                    />
                                                );
                                            })
                                        )}
                                    </Box>
                                </Box>
                            </>
                        ) : activeStep === 4 ? (
                            <Box sx={{ width: "100%" }}>
                                <Box component={"h3"}>Payment Method</Box>
                                <Box component={"h4"}>Amount to be paid : ₹{planfee}</Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        {/* Payment container starts */}
                                        <div className="payment">
                                            {values?.clientToken && (
                                                <div>
                                                    <DropIn
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
                                                        }}
                                                    />
                                                    {/* <button onClick={Purchase_plan}>Buy</button> */}
                                                    <center>
                                                        <CustomButton
                                                            label="Payment"
                                                            handleClick={() => Purchase_plan()}
                                                        />
                                                    </center>
                                                </div>
                                            )}
                                            {!values?.clientToken && <h1>Loading ...</h1>}
                                        </div>
                                        {/* Payment container ends */}
                                    </Box>

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
                        {/* {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )} */}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
