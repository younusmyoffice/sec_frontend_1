import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "./HCFAdminCompleteProfile.scss";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import ClassicFrame from "../../../../static/images/DrImages/Undraw.png";
import ImageFrame from "../../../../static/images/logos/hcf_admin_logo.png";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import axiosInstance from "../../../../config/axiosInstance";
import CustomRadioButton from "../../../../components/CustomRadioButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CustomTimePicker from "../../../../components/CustomTimePicker";
import { Checkbox, FormControlLabel } from "@mui/material";
import { getCurrentUser, getCurrentUserId, getCurrentRoleId, getCurrentUserEmail } from "../../../../utils/jwtUtils";

const steps = ["", ""];

const HcfAdminSignUp = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [flagToSendDoctorData, setFlagToSendDoctorData] = useState(false);
    
    // Get user information from JWT token
    const currentUser = getCurrentUser();
    const userId = getCurrentUserId();
    const roleId = getCurrentRoleId();
    const userEmail = getCurrentUserEmail();
    
    console.log("HCF Admin - Current user from JWT:", currentUser);
    console.log("HCF Admin - User ID:", userId, "Role ID:", roleId, "Email:", userEmail);
    console.log("HCF Admin - localStorage hcfadmin_Email:", localStorage.getItem("hcfadmin_Email"));
    console.log("HCF Admin - localStorage jwt_email:", localStorage.getItem("jwt_email"));
    console.log("HCF Admin - localStorage access_token:", localStorage.getItem("access_token"));
    console.log("HCF Admin - All localStorage keys:", Object.keys(localStorage));
    
    const [updateUserData, setUpdateUserData] = useState({
        suid: localStorage.getItem("hcfadmin_suid"),
        email: userEmail || localStorage.getItem("jwt_email") || localStorage.getItem("hcfadmin_Email") || "",
        hcf_name: null,
        reg_no: null,
        category_id: null,
        service_time_from: null,
        service_time_to: null,
        service_day_from: null,
        service_day_to: null,
        lab_department_id: [],
        state_reg_date: null,
        diag_indian_reg_no: null,
    });
    const [updatedUserSuccesfully, setUpdatedUserSuccesfully] = useState("");
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [hcfCategory, setHcfCategory] = useState("Clinic");
    const [hcfItems] = useState(["Clinic", "Diagnostic Center", "Both"]);
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

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

    useEffect(() => {
        fetchDepartmentName();
        
        // Handle incomplete profile data
        const hcfAdminSuid = localStorage.getItem("hcfadmin_suid");
        const hcfAdminEmail = localStorage.getItem("hcfadmin_Email") || localStorage.getItem("jwt_email") || localStorage.getItem("login_Email");
        
        if (hcfAdminSuid && hcfAdminEmail) {
            setUpdateUserData(prevData => ({
                ...prevData,
                suid: hcfAdminSuid,
                email: hcfAdminEmail
            }));
        }
    }, []);

    console.log("user data : ", updateUserData);

    useEffect(() => {
        if (flagToSendDoctorData) {
            PostUserData();
        }
    }, [flagToSendDoctorData]);

    const PostUserData = async () => {
        setFlagToSendDoctorData(false);
        try {
            // Final email check before sending - comprehensive extraction
            const emailFromJWT = getCurrentUserEmail();
            const emailFromStorage = localStorage.getItem("hcfadmin_Email");
            const emailFromJWTStorage = localStorage.getItem("jwt_email");
            const emailFromLogin = localStorage.getItem("login_Email");
            const finalEmail = updateUserData.email || emailFromJWT || emailFromJWTStorage || emailFromStorage || emailFromLogin;
            
            // Ensure we have the required data for incomplete profiles
            const hcfAdminSuid = localStorage.getItem("hcfadmin_suid");
            
            const finalData = {
                ...updateUserData,
                suid: updateUserData.suid || hcfAdminSuid,
                email: finalEmail,
                // Format time values to HH:MM:SS format for database
                service_time_from: updateUserData.service_time_from ? 
                    new Date(updateUserData.service_time_from).toTimeString().split(' ')[0] : null,
                service_time_to: updateUserData.service_time_to ? 
                    new Date(updateUserData.service_time_to).toTimeString().split(' ')[0] : null
            };
            
            console.log("=== HCF ADMIN PROFILE UPDATE DEBUG ===");
            console.log("Original data:", updateUserData);
            console.log("Time formatting:");
            console.log("- service_time_from original:", updateUserData.service_time_from);
            console.log("- service_time_from formatted:", finalData.service_time_from);
            console.log("- service_time_to original:", updateUserData.service_time_to);
            console.log("- service_time_to formatted:", finalData.service_time_to);
            console.log("Final data being sent:", finalData);
            console.log("Email extraction sources:");
            console.log("- JWT email:", emailFromJWT);
            console.log("- Storage hcfadmin_Email:", emailFromStorage);
            console.log("- Storage jwt_email:", emailFromJWTStorage);
            console.log("- Final email used:", finalEmail);
            console.log("Access token:", localStorage.getItem("access_token"));
            
            const response = await axiosInstance.post(
                "/sec/auth/updateProfile",
                JSON.stringify(finalData),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            setUpdatedUserSuccesfully("Profile Completed 🙂");
            console.log("send data succesfully : ", response);
            setShowSnackBar(true);
            setFlagToSendDoctorData(false);
            handleNext();
        } catch (err) {
            console.log("Error sending data", err);
            setShowSnackBar(false);
            setFlagToSendDoctorData(false);
        }
    };
    // Removed handleDateRangeChange - now using individual CustomDatePicker components

    const fetchDepartmentName = async () => {
        try {
            const response = await axiosInstance.get("/sec/labDepartments");
            const departmentData = response?.data?.response || [];
            setDepartments(departmentData);
        } catch (err) {
            console.error("Error fetching department names:", err);
        }
    };

    useEffect(() => {
        fetchDepartmentName();
        
        // Ensure email is set on component mount
        const emailFromJWT = getCurrentUserEmail();
        const emailFromStorage = localStorage.getItem("hcfadmin_Email");
        const emailFromJWTStorage = localStorage.getItem("jwt_email");
        const email = emailFromJWT || emailFromJWTStorage || emailFromStorage;
        
        console.log("Component mount - Email extraction:");
        console.log("- JWT email:", emailFromJWT);
        console.log("- Storage hcfadmin_Email:", emailFromStorage);
        console.log("- Storage jwt_email:", emailFromJWTStorage);
        console.log("- Final email:", email);
        
        if (email && email !== updateUserData.email) {
            console.log("Setting email on component mount:", email);
            setUpdateUserData(prev => ({
                ...prev,
                email: email
            }));
        }
    }, []);

    // Ensure email is always available
    useEffect(() => {
        const emailFromJWT = getCurrentUserEmail();
        const emailFromStorage = localStorage.getItem("hcfadmin_Email");
        const emailFromJWTStorage = localStorage.getItem("jwt_email");
        const email = emailFromJWT || emailFromJWTStorage || emailFromStorage;
        
        console.log("Email extraction debug:");
        console.log("- JWT email:", emailFromJWT);
        console.log("- Storage hcfadmin_Email:", emailFromStorage);
        console.log("- Storage jwt_email:", emailFromJWTStorage);
        console.log("- Final email:", email);
        
        if (email && email !== updateUserData.email) {
            console.log("Updating email in state:", email);
            setUpdateUserData(prev => ({
                ...prev,
                email: email
            }));
        }
    }, [updateUserData.email]);

    // Handle department selection
    const handleCheckboxChange = (id) => {
        setUpdateUserData((prevData) => {
            const updatedLabIds = prevData.lab_department_id.includes(id)
                ? prevData.lab_department_id.filter((labId) => labId !== id)
                : [...prevData.lab_department_id, id];

            return { ...prevData, lab_department_id: updatedLabIds };
        });
    };

    const categoryMap = {
        Clinic: 1,
        "Diagnostic Center": 2,
        Both: 3,
    };
    return (
        <>
            <CustomSnackBar
                isOpen={showSnackBar}
                actionLabel={""}
                // handleAction={() => setShowSnack(false)}
                message={updatedUserSuccesfully}
                type="success"
            />
            <Box sx={{ width: "100%" }}>
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
                                                Your choice to register with us fills us with
                                                immense gratitude
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
                                                Proceed to the login page to embark upon thy journey
                                                henceforth
                                            </Typography>
                                        </div>
                                        <div className="done-btn1">
                                            <CustomButton
                                                label="Proceed to Login, where your adventure awaits"
                                                handleClick={() => navigate("/hcfadminlogin")}
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
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {/* Step {activeStep + 1} */}
                            {activeStep === 0 ? (
                                <>
                                    <Box>
                                        <div className="mainBox1">
                                            <Box sx={{ width: "40%" }}>
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
                                                        HCF Information
                                                    </Typography>
                                                </div>

                                                <CustomRadioButton
                                                    label={""}
                                                    handleChange={(event) => {
                                                        const selectedCategory = event.target.value;
                                                        console.log(
                                                            "Selected Category: ",
                                                            selectedCategory,
                                                        );

                                                        setHcfCategory(selectedCategory);
                                                        setUpdateUserData((prevData) => ({
                                                            ...prevData,
                                                            category_id:
                                                                categoryMap[selectedCategory], // Map category name to ID
                                                        }));
                                                    }}
                                                    radioGroupCss={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                    }}
                                                    value={hcfCategory}
                                                    items={["Clinic", "Diagnostic Center", "Both"]}
                                                />

                                                <div className="other-fields1">
                                                    <TextField
                                                        label="Business Name"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                hcf_name: event.target.value,
                                                            });
                                                        }}
                                                        value={updateUserData?.hcf_name}
                                                        required={true}
                                                    />
                                                </div>
                                                <div className="other-fields1">
                                                    <TextField
                                                        label="Registration No"
                                                        variant="standard"
                                                        style={{
                                                            width: "100%",
                                                            color: "#787579",
                                                        }}
                                                        onInput={(event) => {
                                                            setUpdateUserData({
                                                                ...updateUserData,
                                                                reg_no: event.target.value,
                                                            });
                                                        }}
                                                        value={updateUserData?.reg_no}
                                                        required={true}
                                                    ></TextField>
                                                </div>
                                                <div className="other-fields1">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Reg. Date"
                                                            value={updateUserData.state_reg_date ? dayjs(updateUserData.state_reg_date) : null}
                                                            onChange={(value) => {
                                                                if (value) {
                                                                    setUpdateUserData({
                                                                        ...updateUserData,
                                                                        state_reg_date: value.format('YYYY-MM-DD'),
                                                                    });
                                                                } else {
                                                                    setUpdateUserData({
                                                                        ...updateUserData,
                                                                        state_reg_date: null,
                                                                    });
                                                                }
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    required: true,
                                                                    variant: "standard",
                                                                    fullWidth: true,
                                                                },
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                {hcfCategory !== "Clinic" && (
                                                    <div className="other-fields1">
                                                        <TextField
                                                            label="Diagnostic License No"
                                                            variant="standard"
                                                            style={{
                                                                width: "100%",
                                                                color: "#787579",
                                                            }}
                                                            onInput={(event) => {
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    diag_indian_reg_no:
                                                                        event.target.value,
                                                                });
                                                            }}
                                                            value={
                                                                updateUserData?.diag_indian_reg_no
                                                            }
                                                            required={false}
                                                        />
                                                    </div>
                                                )}
                                            </Box>
                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={handleNext}
                                                    label="Next"
                                                    buttonCss={{
                                                        width: "30%",
                                                    }}
                                                    isDisabled={
                                                        updateUserData.hcf_name != null &&
                                                        updateUserData.reg_no != null &&
                                                        updateUserData.state_reg_date != null
                                                            ? false
                                                            : true
                                                    }
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
                                            <Box sx={{ width: "40%" }}>
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
                                                        Service Details
                                                    </Typography>
                                                </div>
                                                <div className="Text-fields1">
                                                    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                label="Service From Date"
                                                                value={updateUserData.service_day_from ? dayjs(updateUserData.service_day_from) : null}
                                                                onChange={(value) => {
                                                                    if (value) {
                                                                        setUpdateUserData({
                                                                            ...updateUserData,
                                                                            service_day_from: value.format('YYYY-MM-DD'),
                                                                        });
                                                                    } else {
                                                                        setUpdateUserData({
                                                                            ...updateUserData,
                                                                            service_day_from: null,
                                                                        });
                                                                    }
                                                                }}
                                                                slotProps={{
                                                                    textField: {
                                                                        required: true,
                                                                        variant: "standard",
                                                                        sx: { width: "48%" },
                                                                    },
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                        <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}> to </Box>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                label="Service To Date"
                                                                value={updateUserData.service_day_to ? dayjs(updateUserData.service_day_to) : null}
                                                                onChange={(value) => {
                                                                    if (value) {
                                                                        setUpdateUserData({
                                                                            ...updateUserData,
                                                                            service_day_to: value.format('YYYY-MM-DD'),
                                                                        });
                                                                    } else {
                                                                        setUpdateUserData({
                                                                            ...updateUserData,
                                                                            service_day_to: null,
                                                                        });
                                                                    }
                                                                }}
                                                                slotProps={{
                                                                    textField: {
                                                                        required: true,
                                                                        variant: "standard",
                                                                        sx: { width: "48%" },
                                                                    },
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                </div>

                                                <div className="Text-fields1">
                                                    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                                                        <CustomTimePicker
                                                            label="Start Time"
                                                            value={updateUserData?.service_time_from || null}
                                                            onChange={(value) => {
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    service_time_from: value,
                                                                });
                                                            }}
                                                            textcss={{ width: "48%" }}
                                                            noSpacing={true}
                                                        />
                                                        <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}> to </Box>
                                                        <CustomTimePicker
                                                            label="End Time"
                                                            value={updateUserData?.service_time_to || null}
                                                            onChange={(value) => {
                                                                setUpdateUserData({
                                                                    ...updateUserData,
                                                                    service_time_to: value,
                                                                });
                                                            }}
                                                            textcss={{ width: "48%" }}
                                                            noSpacing={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="gender1">
                                                    <Box>
                                                        <h3>Select Lab Departments</h3>
                                                        {departments.map((department) => (
                                                            <FormControlLabel
                                                                key={department.lab_department_id}
                                                                control={
                                                                    <Checkbox
                                                                        checked={updateUserData.lab_department_id.includes(
                                                                            department.lab_department_id,
                                                                        )}
                                                                        onChange={() =>
                                                                            handleCheckboxChange(
                                                                                department.lab_department_id,
                                                                            )
                                                                        }
                                                                    />
                                                                }
                                                                label={
                                                                    department.lab_department_name
                                                                }
                                                            />
                                                        ))}
                                                        
                                                    </Box>
                                                </div>
                                            </Box>

                                            <div className="sve-btn">
                                                <CustomButton
                                                    handleClick={PostUserData}
                                                    label="Submit"
                                                    buttonCss={{
                                                        width: "30%",
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
                            ) : (
                                <h1>Completed</h1>
                            )}
                            ;
                        </Typography>
                    </React.Fragment>
                )}
            </Box>
        </>
    );
};

export default HcfAdminSignUp;
