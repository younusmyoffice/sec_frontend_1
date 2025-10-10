import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomButton from "../../../../components/CustomButton";
import { DoctorInfo } from "./DoctorInfo";
import CustomTextField from "../../../../components/CustomTextField";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";
import CustomModal from "../../../../components/CustomModal";
import CustomOTPInput from "../../../../components/OTPInput";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import AddPlanCard from "../../../../DoctorModule/DoctorListing/CreateNewListing/AddPlan/AddPlanCard";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import ListingModal from "../../../../DoctorModule/DoctorListing/CreateNewListing/AddPlan/ListingModal";
import HCFAddQuestioner from "./HCFAddQuestioner";
import HCFAddTerms from "./HCFAddTerms";
import AddIcon from "@mui/icons-material/Add";
import { NavLink, useNavigate } from "react-router-dom";

function createData(name, action) {
    return { name, action };
}

const rows = [
    createData(
        <DoctorInfo name={"Dr. Maria Garcia"} specialist={"Neurologist"} />,
        <CustomButton label="Remove" isTransaprent />,
    ),
];

const HCFAddDoctors = () => {
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [snacksuccess, setSnacksuccess] = useState(false);
    const [snacksuccessMessage, setSnacksuccessMessage] = useState("");
    const [listing_name, setLiting_name] = useState("");

    const [snackerror, setSnackerror] = useState(false);
    const [snackerrorMessage, setSnackerrorMessage] = useState("");

    const [isFormValid, setIsFormValid] = useState(false); // Form validity tracker
    const [otp, setOtp] = useState([]);
    // listing variables
    const [listingName, setListingName] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [timeRange, setTimeRange] = useState([null, null]);
    const [enableLising, setEnableListing] = useState(false);
    const [doctorsuid, setDoctorsuid] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [doctorListId, setDoctorListId] = useState(null);
    // Modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [addPlanVisible , setAddPlanVisible] = useState(false);
    const [plandata, setplandata] = useState([]);
    const [renderthedataAfterDelete, setRenderTheApiAfterDelete] = useState(false);
    const [renderDataAfterAddPlan ,setRenderDataAfterAddPlan] = useState(false);
    const [snackmessage , setSnackmessage] = useState("")
    const navigate = useNavigate();
    const [createListing,setCreateListing] = useState({
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        doctor_id: null,
        listing_name: null,
        working_days_start: null,
        working_days_end: null,
        working_time_start: null,
        working_time_end: null,
        // plan: [{
        //     plan_fee: null,
        //     plan_name: null,
        //     plan_duration: null,
        //     plan_description: null,
        // }]
    })
    const [postcreatelisting, setPostcreatelisting] = useState(false);

    // Function to open the modal
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    console.log("OTP length : ", otp === null ? "null" : otp.length);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // Regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const handleEmailChange = (value) => {
        setEmail(value);
        if (!emailRegex.test(value)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };

    const handleMobileChange = (value) => {
        setMobile(value);
        if (!mobileRegex.test(value)) {
            setMobileError("Mobile number must be 10 digits");
        } else {
            setMobileError("");
        }
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        if (!passwordRegex.test(value)) {
            setPasswordError(
                "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character",
            );
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (value) => {
        if (value !== password) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
            setConfirmPassword(value);
        }
    };

    // Check if all fields are valid
    useEffect(() => {
        if (
            emailRegex.test(email) &&
            mobileRegex.test(mobile) &&
            passwordRegex.test(password) &&
            confirmPassword === password &&
            !emailError &&
            !mobileError &&
            !passwordError &&
            !confirmPasswordError
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [
        email,
        mobile,
        password,
        confirmPassword,
        emailError,
        mobileError,
        passwordError,
        confirmPasswordError,
    ]);

    function formatDate(inputDateStr) {
        // Create a Date object from the input string
        const date = new Date(inputDateStr);

        // Extract year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, "0");

        // Format as "YYYY-MM-DD"
        return `${year}-${month}-${day}`;
    }
// submitting the data of the listing -----------------------------------
    const postCreateListing = async () => {
        setSnacksuccess(false);
        setSnackerror(false);
        setSnacksuccess(false);
        try {
            const response = await axiosInstance.post("/sec/hcf/addDoctorWorkingDetailsAndPlan",createListing);
            console.log("post create listing : ", response);
            setSnacksuccessMessage("Listing created succesfully")
            setSnacksuccess(true);
            // Capture doctor_list_id if returned
            const listId = response?.data?.response?.docListingCreate?.doctor_list_id || response?.data?.response?.docListingUpdated?.[0]?.doctor_list_id;
            if (listId) setDoctorListId(listId);
            setCreateListing({
                hcf_id: null,
                doctor_id: null,
                listing_name: null,
                working_days_start: null,
                working_days_end: null,
                working_time_start: null,
                working_time_end: null,
            })
            // setEmail(null);
            // setPassword(null);
            // setConfirmPassword(null);
            // setMobile(null);
            resetForm();
            setIsFormValid(false);
            setEnableListing(false);
            setPostcreatelisting(false)
        } catch (error) {
            console.log("Error : ", error);
            setSnackerrorMessage("!Some error occured...")
            setSnackerror(true);
            setPostcreatelisting(false)
        }
    };

    useEffect( () => {
        if(postcreatelisting){
            postCreateListing();
        }
        
    },[postcreatelisting] )

    const registerHcfClinicDoctor = async () => {
        setSnackerror(false);
        setSnacksuccess(false);

        try {
            const response = await axiosInstance.post("/sec/hcf/addDoctor", {
                hcf_id: localStorage.getItem("hcfadmin_suid"), // pass the hcf suid
                email: email, // verify this first
                mobile: mobile,
                role_id: "6", // role id of the doctor
                password: confirmPassword,
            });
            console.log("register api response  : ",response);
            console.log("HCF doctor register: ", response.status);
            if (response.status === 202) {
                console.log("response v:V : ", response);
                setSnacksuccessMessage(response?.data?.error);
                setSnacksuccess(true);
                openModal();
            }
            setSnacksuccess(true);
            // Optionally reset form or navigate the user after success
            // resetForm();
            // navigate('/someRoute');
        } catch (error) {
            setSnacksuccess(false);
            console.log("Error: ", error);
            setSnackerrorMessage("Some error occured");
            setSnackerror(true);

            // Example of error handling - check for duplicate email
            if (error.response && error.response.status === 409) {
                setEmailError("Email already exists");
                console.log("error : ", error);
            } else if (error.response && error.response.status === 400) {
                // Handle bad request or other validation errors
                console.log("error : ", error);
                setMobileError(error.response.error);
            } else {
                // Handle other errors like network issues
                console.log("error : ", error);
                setSnackerrorMessage(error.response.error);
                setSnackerror(true);
            }
        }
    };

    const resetForm = () => {
        setEmail("");
        setMobile("");
        setPassword("");
        setConfirmPassword("");
        setOtp([]);
        // Clear any other state if necessary
    };

    const verifyDocOTP = async () => {
        setSnackerror(false);
        setSnacksuccess(false);
        setEnableListing(false);
        try {
            const response = await axiosInstance.post("/sec/auth/verifyEmail", {
                email,
                activation_code: otp,
            });
            console.log("OTP response ")
            if (response.status === 200) {
                setSnacksuccessMessage("OTP verified successfully!");
                setSnacksuccess(true);
                closeModal();
                setEnableListing(true);
                // console.log("doctor : ",response?.data?.response?.suid);
                // setDoctorsuid(response?.data?.response?.suid);
                setCreateListing({...createListing , doctor_id : response?.data?.response?.suid })
                // resetForm(); // Reset form after successful OTP verification
            } else {
                setSnackerrorMessage("Failed to verify OTP.");
                setSnackerror(true);
            }
        } catch (error) {
            setSnackerrorMessage("OTP verification failed. Please try again.");
            setSnackerror(true);
        }
    };

    // listing handloers
    const handleListingNameChange = (e) => {
        setListingName(e.target.value);
        setCreateListing({...createListing , listing_name : e.target.value});
    };

    const handleDateRangeChange = (newRange) => {
        setDateRange(newRange);
        const formatDateResp1 = formatDate(newRange[0]);
        const formatDateResp2 = formatDate(newRange[1]);
        setCreateListing({...createListing , working_days_start : dayjs(newRange[0]).format("YYYY-MM-DD") , working_days_end : dayjs(newRange[1]).format("YYYY-MM-DD") })
        console.log("date range : ", formatDateResp1, formatDateResp2);
    };

    const handleTimeRangeChange = (newRange) => {
        setTimeRange(newRange);
    
        // Use newRange directly to avoid referencing the stale timeRange state
        setCreateListing({
            ...createListing,
            working_time_start: newRange[0]?.isValid() ? newRange[0]?.format("HH:mm:ss") : null,
            working_time_end: newRange[1]?.isValid() ? newRange[1]?.format("HH:mm:ss") : null,
        });
    
        console.log(
            "Time range:",
            newRange[0]?.isValid() ? newRange[0]?.format("HH:mm:ss") : "Invalid date",
            newRange[1]?.isValid() ? newRange[1]?.format("HH:mm:ss") : "Invalid date"
        );
    };
    
    // for plans 
   

    const RendenDataAfterDelete = (value) => {
        setRenderTheApiAfterDelete(value);
    };

    const RenderDataAfterAddingPlan = (value) => {
        setRenderDataAfterAddPlan(value);
        setplandata(renderDataAfterAddPlan)
        setCreateListing({...createListing , renderDataAfterAddPlan })
        console.log('renderDataAfterAddPlan : ',value);
    }

    //  const handleModalClose = () => {
    //         setOpenDialog(false); // Function to close the modal
    // };  
    // setCreateListing

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", flexDirection: "row" }}>
                <CustomSnackBar
                    type={"success"}
                    isOpen={snacksuccess}
                    message={snacksuccessMessage}
                />
                <CustomSnackBar type={"error"} isOpen={snackerror} message={snackerrorMessage} />
                <CustomSnackBar type={"success"} />
                <nav className="NavBar-Container-Appoinement" style={{display : 'flex' , justifyContent : 'space-between' , alignItems : 'center'}} > 
                    <NavLink to={"/hcfadmin/doctor/adddoctor"}>Add Doctors</NavLink>
                    <CustomButton 
                        label="< back"
                        isTransaprent={true}
                        buttonCss={{padding : "0% 0%",borderRadius : "12px" , width : "fit-content" , height : "fit-content",padding : '0.4% 1%'}}
                        handleClick={() => navigate(-1)}
                    />
                    {/* <NavLink to={"/hcfadmin/doctor/addpackage"}>Add Package</NavLink> */}

                    {/* <Box sx={{ borderRadius: "50px", position: "absolute", left: "70%" }}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">
                                <MoreHorizIcon />
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Mark Inactive</MenuItem>
                                <MenuItem value={20}>Block Profile</MenuItem>
                                <MenuItem value={30}>View Stats</MenuItem>
                            </Select>
                        </FormControl>
                    </Box> */}
                </nav>

                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Box sx={{ width: "100%", height: "100%" }}>
                        {/* <TableContainer component={Paper} style={{ background: "white" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.name}</TableCell>
                                            <TableCell align="right">{row.action}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> */}

                        <h5 style={{ textAlign: "start", marginLeft: "20px" }}>Login Info</h5>

                        <div style={{ width: "75%" }}>
                            <div style={{ display: "flex", width: "100%" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Email"}
                                        type={"email"}
                                        textcss={{ width: "45%" }}
                                        placeholder={"example@xyz.com"}
                                        defaultValue={""}
                                        helperText={emailError}
                                        error={!!emailError}
                                        onChange={(e) => handleEmailChange(e.target.value)}
                                        // rightIcon={"verify"}
                                        // onRightIconClick={() => {
                                        //     openModal();
                                        //                         console.log("right icon clicked")
                                        //                     }}
                                    />
{/*----------------- modal for otp ------------------ */}
                                    <CustomModal
                                        isOpen={isOpen}
                                        conditionOpen={closeModal} // Pass setIsOpen as conditionOpen

                                        disableBackdropClick={true}
                                        title={<h2>Enter OTP send to E-mail</h2>}
                                    >
                                        <>
                                            <div id="otp-box-container">
                                                <CustomOTPInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    numInputs={6}
                                                    placeholder="*"
                                                />
                                                <br />
                                                <br />
                                                <CustomButton
                                                    isDisabled={otp.length === 6 ? false : true}
                                                    handleClick={() => verifyDocOTP()}
                                                    label="Verify"
                                                />
                                            </div>
                                        </>
                                    </CustomModal>

                                    <CustomTextField
                                        label={"Enter Mobile Number"}
                                        type={"number"}
                                        placeholder={"9876543210"}
                                        defaultValue={mobile}
                                        helperText={mobileError}
                                        textcss={{ width: "45%" }}
                                        onChange={(e) => handleMobileChange(e.target.value)}
                                        // rightIcon={"verify"}
                                        // onRightIconClick={() => {
                                        //     openModal();
                                        //                         console.log("right icon clicked")
                                        //                     }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex", marginTop: "3%" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Create Password"}
                                        textcss={{ width: "45%" }}
                                        placeholder={"*****"}
                                        defaultValue={password}
                                        helperText={passwordError}
                                        error={!!passwordError}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                    />
                                    <CustomTextField
                                        id={"standard-helperText1"}
                                        label={"Confirm Password"}
                                        textcss={{ width: "45%" }}
                                        placeholder={"*****"}
                                        defaultValue={confirmPassword}
                                        helperText={confirmPasswordError}
                                        error={!!confirmPasswordError}
                                        onChange={(e) =>
                                            handleConfirmPasswordChange(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <CustomButton
                                buttonCss={{ marginTop: "2rem" }}
                                isDisabled={!isFormValid} // Disable button if form is not valid
                                handleClick={() => registerHcfClinicDoctor()}
                                label="Register Doctor"
                            />
{/* -------------------create doctor listing -------------------------------------------------------- */}
                        <div
                            style={{ width: "100%", display: enableLising ? "block" : "none" }}
                        >
                            <h3>Create Doctor Listing</h3>
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <CustomTextField
                                    label={"Enter listing name"}
                                    textcss={{ width: "45%" }}
                                    defaultValue={listingName}
                                    helperText={""}
                                    onChange={handleListingNameChange}
                                />
                            </div>

                            <h5
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                    fontSize: "1em",
                                }}
                            >
                                Working days
                            </h5>
                            <div style={{ width: "100%" }}>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={["DateRangePicker"]}
                                            sx={{ width: "100%" }}
                                        >
                                            <DateRangePicker
                                                localeText={{
                                                    start: (
                                                        <div>
                                                            From{" "}
                                                            <CalendarTodayIcon
                                                                style={{
                                                                    marginLeft: "30px",
                                                                    color: "grey",
                                                                }}
                                                            />
                                                        </div>
                                                    ),
                                                    end: (
                                                        <div>
                                                            To{" "}
                                                            <CalendarTodayIcon
                                                                style={{
                                                                    marginLeft: "30px",
                                                                    color: "grey",
                                                                }}
                                                            />
                                                        </div>
                                                    ),
                                                }}
                                                minDate={dayjs()} // Disable past dates
                                                value={dateRange}
                                                onChange={handleDateRangeChange}
                                                // renderInput={(startProps, endProps) => (
                                                //     <React.Fragment>
                                                //         <CustomTextField {...startProps} label="From" />
                                                //         <CustomTextField {...endProps} label="To" />
                                                //     </React.Fragment>
                                                // )}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <h5
                                    style={{
                                        textAlign: "start",
                                        marginLeft: "20px",
                                        fontSize: "1em",
                                    }}
                                >
                                    Working Time
                                </h5>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={[
                                                "MultiInputTimeRangeField",
                                                "SingleInputTimeRangeField",
                                            ]}
                                            sx={{ width: "100%" }}
                                        >
                                            <MultiInputTimeRangeField
                                                value={timeRange}
                                                onChange={handleTimeRangeChange}
                                                slotProps={{
                                                    textField: ({ position }) => ({
                                                        label:
                                                            position === "start"
                                                                ? "From"
                                                                : "To",
                                                    }),
                                                }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>

                                {/* <CustomButton
                                    label="Continue"
                                    buttonCss={{ marginTop: "40px" }}
                                    // isDisabled={!isFormValid} // Disable button based on form validity
                                    handleClick={() => {
                                        console.log("asdfa");
                                        postCreateListing();
                                    }}
                                /> */}
                            </div>
                        </div>
                        </div>
{/*-----------------------Add plans--------------------- */}
                        <div style={{ width: "75%", display : enableLising  ?  'block' : 'none' }}>
                            <div className="main-container">
                                <div className="Add-container">
                                    <Typography>Add Plan</Typography>
                                    <div className="Add-addicon">
                                        <Box
                                            sx={{
                                                // border:'1px solid',
                                                marginTop: "0.5rem",
                                            }}

                                            onClick={() => setOpenDialog(!openDialog)}
                                        >
                                            <AddIcon />
                                        </Box>
                                        {/* Adding the plans --------------- */}
                                        <div className="Add-btn">
                                            {/* Modal for listing the plans of the doctor */}
                                            {/* <CustomModal/> */}
                                            <ListingModal
                                                RenderDataAfterAddingPlan={
                                                    RenderDataAfterAddingPlan
                                                }
                                                showSaveButton={false}
                                                enableAdditionalButton={true}
                                                additionalButtonName={"Add plan"}
                                                onAdditionalButtonClick={ (e) => {
                                                    console.log("data L ",e?.plan);
                                                    setCreateListing({...createListing,plan : e?.plan})
                                                    setplandata(e?.plan);
                                                }  }
                                                disableBackdropClick={false}
                                                saveButtonEnable={false}
                                                conditionOpen={setOpenDialog}
                                                openDialog={openDialog}
                                                // handleClose={() => true}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Mapping all the plans  */}

                                {plandata.length === 0 ? (
                                    <NoAppointmentCard text_one={"No listing found"} />
                                ) : (
                                    (plandata ||[]).map((plan, index) => (
                                        <AddPlanCard
                                            planCardData={plan}
                                            index={index}
                                            RendenDataAfterDelete={RendenDataAfterDelete}
                                            isDeleteVisible={false}
                                            isEditVisible={false}
                                        />
                                    ))
                                )}
                            </div>
                            <CustomButton
                                    label="Continue"
                                    buttonCss={{ marginTop: "40px" }}
                                    // isDisabled={!isFormValid} // Disable button based on form validity
                                    handleClick={() => {
                                        console.log("asdfa");
                                        setPostcreatelisting(true)
                                        // postCreateListing();
                                    }}
                                />
                            {/* Render Questions and Terms when we have a listing id */}
                            {postcreatelisting && doctorListId && (
                                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <HCFAddQuestioner doctor_id={createListing?.doctor_id} doctor_list_id={doctorListId} />
                                    <HCFAddTerms doctor_id={createListing?.doctor_id} doctor_list_id={doctorListId} />
                                </Box>
                            )}
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HCFAddDoctors;
