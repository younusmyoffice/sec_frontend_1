import {
    Box,
    Typography,
    Skeleton,
    Card,
    CardContent,
    Grid,
    Stack,
    Chip,
    Paper,
    IconButton,
    Tooltip,
    Divider,
    Avatar,
    Button
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import "./doctorprofessionalinfo.scss";
import { NavLink, Outlet } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomModal from "../../../components/CustomModal";
import CustomDatePicker from "../../../components/CustomDatePicker";
import axiosInstance from "../../../config/axiosInstance";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import WorkExperience from "./WorkExperience";
import Awards from "./Awards";
import License from "./License";

const ProfessionalDetails = () => {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditing1, setIsEditing1] = useState(false);
    const [data, setData] = useState({
        suid: localStorage.getItem("doctor_suid"),
        email: localStorage.getItem("email"),
        qualification: null,
        qualified_year: null,
        university_name: null,
        degree: null,
        speciality_id: null,
    });
    const [professional, setProfessional] = useState({
        suid: localStorage.getItem("doctor_suid"),
        email: localStorage.getItem("email"),
        state_reg_number: null, //unique
        country_reg_number: null, //unique
        state_reg_date: "null",
        country_reg_date: "null",
    });
    const [selectedDepartment, setSelectedDepartment] = useState(""); // State for Department dropdown
    const [labDepartments, setLabDepartments] = useState([]);
    const [experience, setExperience] = useState([]);
    const [award, setAward] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const doctor_id = localStorage.getItem("doctor_suid");
    const [profileData, setProfileData] = useState([]);

    // Work Experience Modal States
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [experienceData, setExperienceData] = useState({
        jobTitle: "",
        organization: "",
        startDate: null,
        endDate: null,
        exp_id: "",
    });

    // License Modal States
    const [openDialog1, setOpenDialog1] = useState(false);
    const [isEditMode1, setIsEditMode1] = useState(false);
    const [licenseData, setLicenseData] = useState({
        lic_title: "",
        lic_certificate_no: "",
        lic_issuedby: "",
        lic_date: null,
        lic_description: "",
        license_id: "",
    });

    // Awards Modal States
    const [openDialog2, setopenDialog22] = useState(false);
    const [isEditMode2, setisEditMode2] = useState(false);
    const [awardData, setAwardData] = useState({
        award_title: "",
        award_issuedby: "",
        award_date: null,
        award_description: "",
        award_id: "",
    });

    const fetchProfileInfo = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `sec/Doctor/doctorProfileDetailsbyId?doctor_id=${doctor_id}`,
            );
            const profileDataRaw = response?.data?.response[0];
            console.log("Profile Data Raw:", profileDataRaw);
            if (profileDataRaw) {
                const profileData = response.data.response[0];

                // Log the entire response to verify the data
                console.log("Full Profile Response:", profileData);

                setData((prevData) => ({
                    ...prevData,
                    qualification: profileData.qualification || "",
                    qualified_year: profileData.qualified_year || "",
                    university_name: profileData.university_name || "",
                    degree: profileData.degree || "",
                    DOB: profileData.DOB || "",
                    speciality_id: profileData.speciality_id || "",
                    state_reg_number: profileData.state_reg_number || "", //unique
                    country_reg_number: profileData.country_reg_number || "", //unique
                    state_reg_date: profileData.state_reg_date || "",
                    country_reg_date: profileData.country_reg_date || "",
                }));
            }
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    // Fetch Education Details
    const fetchEducationDetails = async () => {
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/getDoctorEducation/${doctor_id}`,
            );
            console.log("Education Details Response:", response?.data);
            const educationData = response?.data?.response?.[0];
            
            if (educationData) {
                setData((prevData) => ({
                    ...prevData,
                    qualification: educationData.qualification || "",
                    qualified_year: educationData.qualified_year || "",
                    university_name: educationData.university_name || "",
                    degree: educationData.degree || "",
                    speciality_id: educationData.speciality_id || "",
                }));
            }
        } catch (error) {
            console.error("Error fetching education details:", error.response);
        }
    };

    // Fetch Professional Registration Details
    const fetchProfessionalDetails = async () => {
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/getDoctorProfession/${doctor_id}`,
            );
            console.log("Professional Details Response:", response?.data);
            const professionalData = response?.data?.response?.[0];
            
            if (professionalData) {
                setProfessional((prevData) => ({
                    ...prevData,
                    state_reg_number: professionalData.state_reg_number || "",
                    country_reg_number: professionalData.country_reg_number || "",
                    state_reg_date: professionalData.state_reg_date || "",
                    country_reg_date: professionalData.country_reg_date || "",
                }));
            }
        } catch (error) {
            console.error("Error fetching professional details:", error.response);
        }
    };
    useEffect(() => {
        fetchProfileInfo();
        fetchEducationDetails();
        fetchProfessionalDetails();
    }, []);


    const fetchData = async () => {
        try {
            const response = await axiosInstance.post(
                `/sec/Doctor/updateDoctorEducation?doctor_id=${doctor_id}`,
                JSON.stringify(data),
            );
            console.log("Education Update Response:", response);
            // Refresh education data after update
            fetchEducationDetails();
        } catch (error) {
            alert("Fill the details properly", error);
            console.log(error.response);
        }
    };

    const fetchProfessional = async () => {
        try {
            const response = await axiosInstance.post(
                `/sec/Doctor/updateDoctorProfession?doctor_id=${doctor_id}`,
                JSON.stringify(professional),
            );
            console.log("Professional Update Response:", response);
            // Refresh professional data after update
            fetchProfessionalDetails();
        } catch (error) {
            alert("Fill the details properly", error);
            console.log(error.response);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axiosInstance.get("/sec/departments");
            const departments = response?.data?.response || [];
            setLabDepartments(departments);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Department dropdown handler
    const departmentItems = labDepartments.map((department) => ({
        id: department.department_id,
        name: department.department_name,
    }));

    const handleDropdownChange = (selectedDepartment) => {
        const departmentId = departmentItems.find((item) => item.name === selectedDepartment)?.id;
        setSelectedDepartment(selectedDepartment);

        setData((prevState) => ({
            ...prevState,
            speciality_id: String(departmentId),
        }));
    };

    const fetchExperience = async () => {
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/getDoctorExperience?doctor_id=${doctor_id}`,
            );
            setExperience(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching experience:", error);
        }
    };

    const fetchAwards = async () => {
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/getDoctorAwards?doctor_id=${doctor_id}`,
            );
            setAward(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching awards:", error);
        }
    };

    const fetchLicenses = async () => {
        try {
            const response = await axiosInstance.get(
                `/sec/Doctor/getDoctorLicense?doctor_id=${doctor_id}`,
            );
            setLicenses(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching licenses:", error);
        }
    };

    useEffect(() => {
        fetchExperience();
        fetchAwards();
        fetchLicenses();
    }, []);

    const handleDateChange = (field, value) => {
        setProfessional((prev) => ({
            ...prev,
            [field]: value ? dayjs(value) : null, // Ensure value is a dayjs object or null
        }));
    };

    // Work Experience Handlers
    const handleAdd = () => {
        setExperienceData({
            jobTitle: "",
            organization: "",
            startDate: null,
            endDate: null,
            exp_id: "",
        });
        setIsEditMode(false);
        setOpenDialog(true);
    };

    const handleEdit = (index) => {
        setExperienceData({
            jobTitle: experience[index]?.job,
            organization: experience[index]?.organisation,
            startDate: experience[index]?.from_date ? dayjs(experience[index].from_date) : null,
            endDate: experience[index]?.to_date && experience[index].to_date !== "present" ? dayjs(experience[index].to_date) : null,
            exp_id: experience[index]?.doctor_experience_id,
        });
        setIsEditMode(true);
        setOpenDialog(true);
    };

    const handleSave = async (exp_id) => {
        const payload = {
            suid: localStorage.getItem("doctor_suid"),
            email: localStorage.getItem("email"),
            job: experienceData.jobTitle,
            organisation: experienceData.organization,
            from_date: dayjs(experienceData.startDate).format("YYYY-MM-DD"),
            to_date: experienceData.endDate
                ? dayjs(experienceData.endDate).format("YYYY-MM-DD")
                : "present",
        };

        if (isEditMode) {
            payload.doctor_experience_id = exp_id;
        }

        try {
            const response = await axiosInstance.post(
                `/sec/Doctor/updateDoctorExperience`,
                JSON.stringify(payload),
            );

            if (response.status === 200 || response.status === 201) {
                console.log("Success:", response.data);
                alert(isEditMode ? "Work Experience Updated" : "Work Experience Added");
                setOpenDialog(false);
                fetchExperience(); // Refresh the list
            } else {
                console.error("Error:", response.data);
                alert("Failed to save work experience.");
            }
        } catch (error) {
            console.error("Error:", error.response || error);
            alert("An error occurred while saving work experience.");
        }
    };

    const handleChange = (field, value) => {
        setExperienceData((prev) => ({
            ...prev,
            [field]: value ? dayjs(value) : null,
        }));
    };

    const getModalTitle = () => {
        const action = isEditMode ? "Edit" : "Add";
        return `${action} Work Experience`;
    };

    // License Handlers
    const handleAddLic = () => {
        setLicenseData({
            lic_title: "",
            lic_certificate_no: "",
            lic_issuedby: "",
            lic_date: null,
            lic_description: "",
            license_id: "",
        });
        setIsEditMode1(false);
        setOpenDialog1(true);
    };

    const handleEditLic = (index) => {
        setLicenseData({
            lic_title: licenses[index]?.lic_title,
            lic_certificate_no: licenses[index]?.lic_certificate_no,
            lic_issuedby: licenses[index]?.lic_issuedby,
            lic_date: dayjs(licenses[index]?.lic_date),
            lic_description: licenses[index]?.lic_description,
            license_id: licenses[index]?.doctor_license_id,
        });
        setTimeout(() => {
            setIsEditMode1(true);
            setOpenDialog1(true);
        }, 0);
    };

    const handleSaveLic = async (lic_id) => {
        const payload = {
            suid: localStorage.getItem("doctor_suid"),
            email: localStorage.getItem("email"),
            lic_title: licenseData.lic_title,
            lic_certificate_no: licenseData.lic_certificate_no,
            lic_issuedby: licenseData.lic_issuedby,
            lic_date: dayjs(licenseData.lic_date).format("YYYY-MM-DD"),
            lic_description: licenseData.lic_description,
        };

        if (isEditMode1) {
            payload.doctor_license_id = lic_id;
        }

        try {
            const response = await axiosInstance.post(
                `/sec/Doctor/updateDoctorLicense`,
                JSON.stringify(payload),
            );

            if (response.status === 200 || response.status === 201) {
                console.log("Success:", response.data);
                alert(isEditMode1 ? "License Details Updated" : "License Details Added");
                setOpenDialog1(false);
                fetchLicenses(); // Refresh the list
            } else {
                console.error("Error:", response.data);
                alert("Failed to save License Details.");
            }
        } catch (error) {
            console.error("Error:", error.response || error);
            alert("An error occurred while saving License Details.");
        }
    };

    const handleChangeLic = (field, value) => {
        setLicenseData((prev) => ({
            ...prev,
            [field]: value ? dayjs(value) : null,
        }));
    };

    const getLicModalTitle = () => {
        const action = isEditMode1 ? "Edit" : "Add";
        return `${action} Certification`;
    };

    // Awards Handlers
    const handleAddAwa = () => {
        setAwardData({
            award_title: "",
            award_issuedby: "",
            award_date: null,
            award_description: "",
            award_id: "",
        });
        setisEditMode2(false);
        setopenDialog22(true);
    };

    const handleEditAwa = (index) => {
        setAwardData({
            award_title: award[index]?.award_title,
            award_issuedby: award[index]?.award_issuedby,
            award_date: dayjs(award[index]?.award_date),
            award_description: award[index]?.award_description,
            award_id: award[index]?.doctor_awards_id,
        });
        setisEditMode2(true);
        setopenDialog22(true);
    };

    const handleSaveAwa = async (id) => {
        const payload = {
            suid: localStorage.getItem("doctor_suid"),
            email: localStorage.getItem("email"),
            award_title: awardData.award_title,
            award_issuedby: awardData.award_issuedby,
            award_date: dayjs(awardData.award_date).format("YYYY-MM-DD"),
            award_description: awardData.award_description,
        };

        if (isEditMode2) {
            payload.doctor_awards_id = id;
        }

        try {
            const response = await axiosInstance.post(
                `/sec/Doctor/updateDoctorAwards`,
                JSON.stringify(payload),
            );

            if (response.status === 200 || response.status === 201) {
                console.log("Success:", response.data);
                alert(isEditMode2 ? "Award Updated" : "Award Added");
                setopenDialog22(false);
                fetchAwards(); // Refresh the list
            } else {
                console.error("Error:", response.data);
                alert("Failed to save award details.");
            }
        } catch (error) {
            console.error("Error:", error.response || error);
            alert("An error occurred while saving award details.");
        }
    };

    const handleChangeAwa = (field, value) => {
        setAwardData((prev) => ({
            ...prev,
            [field]: value ? dayjs(value) : null,
        }));
    };

    const getAwaModalTitle = () => {
        const action = isEditMode2 ? "Edit" : "Add";
        return `${action} Awards`;
    };

    return (
        <Box sx={{ width: "100%", padding: "24px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
            {/* Header Section */}
            <Paper
                elevation={0}
                sx={{
                    padding: "24px",
                    marginBottom: "24px",
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    backgroundColor: "white"
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <Typography variant="h4" sx={{
                        fontWeight: 600,
                        color: "#313033",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        <WorkIcon sx={{ color: "#E72B4A" }} />
                        Professional Details
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Chip
                            label={`Doctor ID: ${localStorage.getItem("doctor_suid") || "DOC001"}`}
                            sx={{
                                backgroundColor: "#E72B4A",
                                color: "white",
                                fontWeight: 500
                            }}
                        />
                        <Tooltip title="Close">
                            <IconButton
                                onClick={() => window.history.back()}
                                sx={{
                                    backgroundColor: "#f5f5f5",
                                    "&:hover": { backgroundColor: "#e0e0e0" }
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Navigation Tabs */}
                <Box sx={{ display: "flex", gap: 1 }}>
                    <NavLink
                        to="/doctordashboard/doctorpersonalinfo"
                        style={({ isActive }) => ({
                            textDecoration: "none",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            color: isActive ? "white" : "#313033",
                            backgroundColor: isActive ? "#E72B4A" : "transparent",
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                            border: isActive ? "none" : "1px solid #e0e0e0"
                        })}
                    >
                        Profile Information
                    </NavLink>
                    <NavLink
                        to="/doctordashboard/doctorprofessionalinfo"
                        style={({ isActive }) => ({
                            textDecoration: "none",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            color: isActive ? "white" : "#313033",
                            backgroundColor: isActive ? "#E72B4A" : "transparent",
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                            border: isActive ? "none" : "1px solid #e0e0e0"
                        })}
                    >
                        Professional Details
                    </NavLink>
                </Box>
            </Paper>

            {/* Education Details Section */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    marginBottom: "24px",
                    backgroundColor: "white"
                }}
            >
                <CardContent sx={{ padding: "32px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            color: "#313033",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <SchoolIcon sx={{ color: "#E72B4A" }} />
                            Education Details
                        </Typography>

                        <CustomButton
                            label={isEditing ? "Cancel Edit" : "Edit Education"}
                            isTransaprent={!isEditing}
                            leftIcon={<EditIcon />}
                            buttonCss={{
                                borderRadius: "8px",
                                padding: "8px 16px",
                                fontWeight: 500,
                                border: isEditing ? "1px solid #d32f2f" : "1px solid #E72B4A",
                                color: isEditing ? "#d32f2f" : "#E72B4A"
                            }}
                            handleClick={() => setIsEditing(!isEditing)}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                defaultValue={data?.qualification}
                                CustomValue={data?.qualification}
                                label="Qualification"
                                helperText=""
                                isDisabled={!isEditing}
                                textcss={{ width: "100%" }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },
                                        borderBottom: "1px solid #e0e0e0",
                                        borderRadius: 0,
                                        "&:hover": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                        "&.Mui-focused": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#E72B4A",
                                        },
                                    },
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        qualification: event.target.value,
                                    };
                                    setData(Copy);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                defaultValue={data?.qualified_year}
                                CustomValue={data?.qualified_year}
                                label="Qualified Year"
                                helperText=""
                                isDisabled={!isEditing}
                                textcss={{ width: "100%" }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },
                                        borderBottom: "1px solid #e0e0e0",
                                        borderRadius: 0,
                                        "&:hover": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                        "&.Mui-focused": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#E72B4A",
                                        },
                                    },
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        qualified_year: event.target.value,
                                    };
                                    setData(Copy);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                defaultValue={data?.university_name}
                                CustomValue={data?.university_name}
                                label="University Name"
                                helperText=""
                                isDisabled={!isEditing}
                                textcss={{ width: "100%" }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },
                                        borderBottom: "1px solid #e0e0e0",
                                        borderRadius: 0,
                                        "&:hover": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                        "&.Mui-focused": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#E72B4A",
                                        },
                                    },
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        university_name: event.target.value,
                                    };
                                    setData(Copy);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                defaultValue={data?.degree}
                                CustomValue={data?.degree}
                                label="Degree"
                                helperText=""
                                isDisabled={!isEditing}
                                textcss={{ width: "100%" }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },
                                        borderBottom: "1px solid #e0e0e0",
                                        borderRadius: 0,
                                        "&:hover": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                        "&.Mui-focused": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#E72B4A",
                                        },
                                    },
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        degree: event.target.value,
                                    };
                                    setData(Copy);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomDropdown
                                label="Specialization"
                                isDisabled={!isEditing}
                                items={departmentItems.map((item) => item.name)}
                                activeItem={selectedDepartment}
                                handleChange={handleDropdownChange}
                                dropdowncss={{
                                    width: "100%",
                                    color: "#787579",
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },
                                        borderBottom: "1px solid #e0e0e0",
                                        borderRadius: 0,
                                        "&:hover": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                        "&.Mui-focused": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#E72B4A",
                                        },
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    {isEditing && (
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "32px",
                            paddingTop: "24px",
                            borderTop: "1px solid #e0e0e0"
                        }}>
                            <CustomButton
                                label="Save Education Details"
                                isTransaprent={false}
                                isDisabled={false}
                                isElevated={false}
                                buttonCss={{
                                    width: "200px",
                                    height: "48px",
                                    borderRadius: "8px",
                                    fontWeight: 600
                                }}
                                handleClick={() => {
                                    fetchData();
                                    setIsEditing(false);
                                }}
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Professional Registration Section */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    marginBottom: "24px",
                    backgroundColor: "white"
                }}
            >
                <CardContent sx={{ padding: "32px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            color: "#313033",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <WorkIcon sx={{ color: "#E72B4A" }} />
                            Professional Registration
                        </Typography>

                        <CustomButton
                            label={isEditing1 ? "Cancel Edit" : "Edit Registration"}
                            isTransaprent={!isEditing1}
                            leftIcon={<EditIcon />}
                            buttonCss={{
                                borderRadius: "8px",
                                padding: "8px 16px",
                                fontWeight: 500,
                                border: isEditing1 ? "1px solid #d32f2f" : "1px solid #E72B4A",
                                color: isEditing1 ? "#d32f2f" : "#E72B4A"
                            }}
                            handleClick={() => setIsEditing1(!isEditing1)}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                defaultValue={professional?.state_reg_number}
                                CustomValue={professional?.state_reg_number}
                                label="State Registration Number"
                                helperText=""
                                isDisabled={!isEditing1}
                                textcss={{ width: "100%" }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },
                                        borderBottom: "1px solid #e0e0e0",
                                        borderRadius: 0,
                                        "&:hover": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                        "&.Mui-focused": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#E72B4A",
                                        },
                                    },
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...professional,
                                        state_reg_number: event.target.value,
                                    };
                                    setProfessional(Copy);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                defaultValue={professional?.country_reg_number}
                                CustomValue={professional?.country_reg_number}
                                label="Country Registration Number"
                                helperText=""
                                isDisabled={!isEditing1}
                                textcss={{ width: "100%" }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },
                                        borderBottom: "1px solid #e0e0e0",
                                        borderRadius: 0,
                                        "&:hover": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                        "&.Mui-focused": {
                                            borderBottom: "2px solid #E72B4A",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#E72B4A",
                                        },
                                    },
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...professional,
                                        country_reg_number: event.target.value,
                                    };
                                    setProfessional(Copy);
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={professional?.state_reg_date ? dayjs(professional.state_reg_date) : null}
                                    disabled={!isEditing1}
                                    label="State Registration Date"
                                    sx={{
                                        width: "100%",
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { border: "none" },
                                            "&:hover fieldset": { border: "none" },
                                            "&.Mui-focused fieldset": { border: "none" },
                                            borderBottom: "1px solid #e0e0e0",
                                            borderRadius: 0,
                                            "&:hover": {
                                                borderBottom: "2px solid #E72B4A",
                                            },
                                            "&.Mui-focused": {
                                                borderBottom: "2px solid #E72B4A",
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            "&.Mui-focused": {
                                                color: "#E72B4A",
                                            },
                                        },
                                    }}
                                    onChange={(item) => {
                                        const formattedDate = item
                                            ? item.format("YYYY-MM-DD")
                                            : null;
                                        setProfessional({
                                            ...professional,
                                            state_reg_date: formattedDate,
                                        });
                                    }}
                                />
                            </LocalizationProvider>




                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={professional?.country_reg_date ? dayjs(professional.country_reg_date) : null}
                                    disabled={!isEditing1}
                                    label="Country Registration Date"
                                    sx={{
                                        width: "100%",
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { border: "none" },
                                            "&:hover fieldset": { border: "none" },
                                            "&.Mui-focused fieldset": { border: "none" },
                                            borderBottom: "1px solid #e0e0e0",
                                            borderRadius: 0,
                                            "&:hover": {
                                                borderBottom: "2px solid #E72B4A",
                                            },
                                            "&.Mui-focused": {
                                                borderBottom: "2px solid #E72B4A",
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            "&.Mui-focused": {
                                                color: "#E72B4A",
                                            },
                                        },
                                    }}
                                    onChange={(item) => {
                                        const formattedDate = item
                                            ? item.format("YYYY-MM-DD")
                                            : null;
                                        setProfessional({
                                            ...professional,
                                            state_reg_date: formattedDate,
                                        });
                                    }}
                                />
                            </LocalizationProvider>



                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    {isEditing1 && (
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "32px",
                            paddingTop: "24px",
                            borderTop: "1px solid #e0e0e0"
                        }}>
                            <CustomButton
                                label="Save Registration Details"
                                isTransaprent={false}
                                isDisabled={false}
                                isElevated={false}
                                buttonCss={{
                                    width: "220px",
                                    height: "48px",
                                    borderRadius: "8px",
                                    fontWeight: 600
                                }}
                                handleClick={() => {
                                    fetchProfessional();
                                    setIsEditing1(false);
                                }}
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Work Experience Section */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    marginBottom: "24px",
                    backgroundColor: "white"
                }}
            >
                <CardContent sx={{ padding: "32px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            color: "#313033",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <WorkIcon sx={{ color: "#E72B4A" }} />
                            Work Experience
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton sx={{ color: "#E72B4A" }} onClick={handleAdd}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Work Experience Entries */}
                    {loading ? (
                        // Enhanced skeleton loader for experience cards
                        Array.from({ length: 3 }).map((_, index) => (
                            <Box key={index} sx={{ marginBottom: "20px" }}>
                                <Skeleton 
                                    variant="rectangular" 
                                    width="100%" 
                                    height={140} 
                                    sx={{ borderRadius: "12px" }}
                                />
                            </Box>
                        ))
                    ) : Array.isArray(experience) && experience.length > 0 ? (
                        <Box sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            gap: "20px",
                            maxHeight: "600px", // Maximum height before scrolling
                            overflowY: "auto", // Enable vertical scrolling when content exceeds maxHeight
                            overflowX: "hidden", // Prevent horizontal scrolling
                            paddingRight: "8px", // Add padding for scrollbar
                        }}>
                            {experience.map((exp, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 3,
                                        padding: "24px",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "16px",
                                        backgroundColor: "#ffffff",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                            borderColor: "#E72B4A",
                                            transform: "translateY(-2px)"
                                        }
                                    }}
                                >
                                    <Avatar sx={{
                                        backgroundColor: "#E3F2FD",
                                        color: "#e72b4a",
                                        width: 56,
                                        height: 56,
                                        fontSize: "24px"
                                    }}>
                                        <LocalHospitalIcon />
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 600, 
                                            color: "#313033",
                                            marginBottom: "4px"
                                        }}>
                                            {exp.job}
                                        </Typography>
                                        <Typography variant="body1" sx={{ 
                                            color: "#666",
                                            marginBottom: "8px",
                                            fontWeight: 500
                                        }}>
                                            {exp.organisation}
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Chip
                                                label={
                                                    exp.to_date === "present"
                                                        ? `${dayjs(exp.from_date).format("DD/MM/YYYY")} - Present`
                                                        : `${dayjs(exp.from_date).format("DD/MM/YYYY")} - ${dayjs(
                                                              exp.to_date,
                                                          ).format("DD/MM/YYYY")}`
                                                }
                                                sx={{
                                                    backgroundColor: "#E72B4A",
                                                    color: "white",
                                                    fontWeight: 500,
                                                    fontSize: "12px"
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <IconButton
                                        onClick={() => handleEdit(index)}
                                        sx={{
                                            backgroundColor: "#f5f5f5",
                                            color: "#E72B4A",
                                            "&:hover": {
                                                backgroundColor: "#E72B4A",
                                                color: "white"
                                            }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        // Enhanced empty state card
                        <Box
                            sx={{
                                padding: "40px 24px",
                                textAlign: "center",
                                border: "2px dashed #e0e0e0",
                                borderRadius: "16px",
                                backgroundColor: "#fafafa",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#E72B4A",
                                    backgroundColor: "#fff5f5"
                                }
                            }}
                        >
                            <LocalHospitalIcon sx={{ 
                                fontSize: 48, 
                                color: "#e0e0e0", 
                                marginBottom: "16px" 
                            }} />
                            <Typography variant="h6" sx={{ 
                                marginBottom: "8px",
                                color: "#666",
                                fontWeight: 500
                            }}>
                                No Work Experience Found
                            </Typography>
                            <Typography variant="body2" sx={{ 
                                color: "#999",
                                marginBottom: "16px"
                            }}>
                                Add your first experience to showcase your professional journey.
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>


            {/* Awards Section */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    marginBottom: "24px",
                    backgroundColor: "white"
                }}
            >
                <CardContent sx={{ padding: "32px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            color: "#313033",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <EmojiEventsIcon sx={{ color: "#E72B4A" }} />
                            Awards
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton sx={{ color: "#E72B4A" }} onClick={handleAddAwa}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Awards Entries */}
                    {loading ? (
                        // Enhanced skeleton loader for awards cards
                        Array.from({ length: 3 }).map((_, index) => (
                            <Box key={index} sx={{ marginBottom: "20px" }}>
                                <Skeleton 
                                    variant="rectangular" 
                                    width="100%" 
                                    height={160} 
                                    sx={{ borderRadius: "12px" }}
                                />
                            </Box>
                        ))
                    ) : Array.isArray(award) && award.length > 0 ? (
                        <Box sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            gap: "20px",
                            maxHeight: "600px", // Maximum height before scrolling
                            overflowY: "auto", // Enable vertical scrolling when content exceeds maxHeight
                            overflowX: "hidden", // Prevent horizontal scrolling
                            paddingRight: "8px", // Add padding for scrollbar
                        }}>
                            {award.map((awa, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 3,
                                        padding: "24px",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "16px",
                                        backgroundColor: "#ffffff",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                            borderColor: "#E72B4A",
                                            transform: "translateY(-2px)"
                                        }
                                    }}
                                >
                                    <Avatar sx={{
                                        backgroundColor: "#FCE4EC",
                                        color: "#E72B4A",
                                        width: 56,
                                        height: 56,
                                        fontSize: "20px",
                                        fontWeight: "bold"
                                    }}>
                                        A
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 600, 
                                            color: "#313033",
                                            marginBottom: "4px"
                                        }}>
                                            {awa.award_title}
                                        </Typography>
                                        <Typography variant="body1" sx={{ 
                                            color: "#666",
                                            marginBottom: "8px",
                                            fontWeight: 500
                                        }}>
                                            {awa.award_issuedby}
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: "8px" }}>
                                            <Chip
                                                label={dayjs(awa.award_date).format("DD/MM/YYYY")}
                                                sx={{
                                                    backgroundColor: "#E72B4A",
                                                    color: "white",
                                                    fontWeight: 500,
                                                    fontSize: "12px"
                                                }}
                                            />
                                        </Box>
                                        {awa.award_description && (
                                            <Typography variant="body2" sx={{ 
                                                color: "#999",
                                                fontStyle: "italic",
                                                lineHeight: 1.5
                                            }}>
                                                {awa.award_description}
                                            </Typography>
                                        )}
                                    </Box>
                                    <IconButton
                                        onClick={() => handleEditAwa(index)}
                                        sx={{
                                            backgroundColor: "#f5f5f5",
                                            color: "#E72B4A",
                                            "&:hover": {
                                                backgroundColor: "#E72B4A",
                                                color: "white"
                                            }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        // Enhanced empty state card
                        <Box
                            sx={{
                                padding: "40px 24px",
                                textAlign: "center",
                                border: "2px dashed #e0e0e0",
                                borderRadius: "16px",
                                backgroundColor: "#fafafa",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#E72B4A",
                                    backgroundColor: "#fff5f5"
                                }
                            }}
                        >
                            <EmojiEventsIcon sx={{ 
                                fontSize: 48, 
                                color: "#e0e0e0", 
                                marginBottom: "16px" 
                            }} />
                            <Typography variant="h6" sx={{ 
                                marginBottom: "8px",
                                color: "#666",
                                fontWeight: 500
                            }}>
                                No Awards Found
                            </Typography>
                            <Typography variant="body2" sx={{ 
                                color: "#999",
                                marginBottom: "16px"
                            }}>
                                Add your first award to showcase your achievements and recognition.
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Licenses & Certifications Section */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    marginBottom: "24px",
                    backgroundColor: "white"
                }}
            >
                <CardContent sx={{ padding: "32px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            color: "#313033",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <CardMembershipIcon sx={{ color: "#E72B4A" }} />
                            Certifications & Licenses
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton sx={{ color: "#E72B4A" }} onClick={handleAddLic}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Licenses Entries */}
                    {loading ? (
                        // Enhanced skeleton loader for licenses cards
                        Array.from({ length: 3 }).map((_, index) => (
                            <Box key={index} sx={{ marginBottom: "20px" }}>
                                <Skeleton 
                                    variant="rectangular" 
                                    width="100%" 
                                    height={180} 
                                    sx={{ borderRadius: "12px" }}
                                />
                            </Box>
                        ))
                    ) : Array.isArray(licenses) && licenses.length > 0 ? (
                        <Box sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            gap: "20px",
                            maxHeight: "600px", // Maximum height before scrolling
                            overflowY: "auto", // Enable vertical scrolling when content exceeds maxHeight
                            overflowX: "hidden", // Prevent horizontal scrolling
                            paddingRight: "8px", // Add padding for scrollbar
                        }}>
                            {licenses.map((lic, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 3,
                                        padding: "24px",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "16px",
                                        backgroundColor: "#ffffff",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                            borderColor: "#E72B4A",
                                            transform: "translateY(-2px)"
                                        }
                                    }}
                                >
                                    <Avatar sx={{
                                        backgroundColor: "#FFF3E0",
                                        color: "#F57C00",
                                        width: 56,
                                        height: 56,
                                        fontSize: "20px",
                                        fontWeight: "bold"
                                    }}>
                                        <CardMembershipIcon />
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 600, 
                                            color: "#313033",
                                            marginBottom: "4px"
                                        }}>
                                            {lic.lic_title}
                                        </Typography>
                                        <Typography variant="body1" sx={{ 
                                            color: "#666",
                                            marginBottom: "8px",
                                            fontWeight: 500
                                        }}>
                                            {lic.lic_issuedby}
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: "8px" }}>
                                            <Chip
                                                label={`Cert No: ${lic.lic_certificate_no}`}
                                                sx={{
                                                    backgroundColor: "#F57C00",
                                                    color: "white",
                                                    fontWeight: 500,
                                                    fontSize: "12px"
                                                }}
                                            />
                                            <Chip
                                                label={dayjs(lic.lic_date).format("DD/MM/YYYY")}
                                                sx={{
                                                    backgroundColor: "#E72B4A",
                                                    color: "white",
                                                    fontWeight: 500,
                                                    fontSize: "12px"
                                                }}
                                            />
                                        </Box>
                                        {lic.lic_description && (
                                            <Typography variant="body2" sx={{ 
                                                color: "#999",
                                                fontStyle: "italic",
                                                lineHeight: 1.5
                                            }}>
                                                {lic.lic_description}
                                            </Typography>
                                        )}
                                    </Box>
                                    <IconButton
                                        onClick={() => handleEditLic(index)}
                                        sx={{
                                            backgroundColor: "#f5f5f5",
                                            color: "#E72B4A",
                                            "&:hover": {
                                                backgroundColor: "#E72B4A",
                                                color: "white"
                                            }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        // Enhanced empty state card
                        <Box
                            sx={{
                                padding: "40px 24px",
                                textAlign: "center",
                                border: "2px dashed #e0e0e0",
                                borderRadius: "16px",
                                backgroundColor: "#fafafa",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#E72B4A",
                                    backgroundColor: "#fff5f5"
                                }
                            }}
                        >
                            <CardMembershipIcon sx={{ 
                                fontSize: 48, 
                                color: "#e0e0e0", 
                                marginBottom: "16px" 
                            }} />
                            <Typography variant="h6" sx={{ 
                                marginBottom: "8px",
                                color: "#666",
                                fontWeight: 500
                            }}>
                                No Certifications Found
                            </Typography>
                            <Typography variant="body2" sx={{ 
                                color: "#999",
                                marginBottom: "16px"
                            }}>
                                Add your first certification or license to showcase your credentials.
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Work Experience Modal */}
            {openDialog && (
                <CustomModal
                    isOpen={openDialog}
                    conditionOpen={setOpenDialog}
                    title={
                        <Typography variant="h6" className="modal-title">
                            {getModalTitle()}
                        </Typography>
                    }
                    modalCss={{
                        width: "400px",
                        height: "500px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div
                        className="textfield-cont"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                            justifyContent: "space-around",
                            width: "100%",
                            marginBottom: "20px",
                        }}
                    >
                        <CustomTextField
                            label="Job Title"
                            helperText=""
                            defaultValue={experienceData?.jobTitle}
                            textcss={{ width: "180px" }}
                            onInput={(event) => {
                                setExperienceData({
                                    ...experienceData,
                                    jobTitle: event.target.value,
                                });
                            }}
                        />

                        <CustomTextField
                            helperText=""
                            label="Hospital/Organization"
                            defaultValue={experienceData?.organization}
                            textcss={{ width: "180px" }}
                            onInput={(event) => {
                                setExperienceData({
                                    ...experienceData,
                                    organization: event.target.value,
                                });
                            }}
                        />

                        <CustomDatePicker
                            label="Start Date"
                            value={experienceData?.startDate}
                            onChange={(newValue) => handleChange("startDate", newValue)}
                            sx={{ width: "180px" }}
                        />
                        <CustomDatePicker
                            label="End Date"
                            value={experienceData?.endDate}
                            onChange={(newValue) => handleChange("endDate", newValue)}
                            sx={{ width: "180px" }}
                        />
                    </div>
                    <div
                        className="save-btn"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <CustomButton
                            label="Save"
                            handleClick={() => {
                                handleSave(experienceData.exp_id);
                            }}
                            buttonCss={{ width: "170px", height: "48px", borderRadius: "20px" }}
                        />
                    </div>
                </CustomModal>
            )}

            {/* License Modal */}
            {openDialog1 && (
                <CustomModal
                    isOpen={openDialog1}
                    conditionOpen={setOpenDialog1}
                    title={
                        <Typography variant="h6" className="modal-title">
                            {getLicModalTitle()}
                        </Typography>
                    }
                    modalCss={{
                        width: "400px",
                        height: "500px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div
                        className="textfield-cont"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                            justifyContent: "space-around",
                            width: "100%",
                            marginBottom: "20px",
                        }}
                    >
                        <CustomTextField
                            helperText={""}
                            label="Certification Title"
                            defaultValue={licenseData?.lic_title}
                            onInput={(event) => {
                                setLicenseData({
                                    ...licenseData,
                                    lic_title: event.target.value,
                                });
                            }}
                            textcss={{ width: "450px" }}
                        />
                        <CustomTextField
                            helperText={""}
                            label="Certificate Number"
                            defaultValue={licenseData?.lic_certificate_no}
                            value={licenseData?.lic_certificate_no}
                            onInput={(event) => {
                                setLicenseData({
                                    ...licenseData,
                                    lic_certificate_no: event.target.value,
                                });
                            }}
                            textcss={{ width: "180px" }}
                        />
                        <CustomTextField
                            helperText={""}
                            label="Issuing Authority"
                            defaultValue={licenseData?.lic_issuedby}
                            onInput={(event) => {
                                setLicenseData({
                                    ...licenseData,
                                    lic_issuedby: event.target.value,
                                });
                            }}
                            textcss={{ width: "180px" }}
                        />
                        <CustomDatePicker
                            label="Issue Date"
                            value={licenseData?.lic_date}
                            onChange={(newValue) => handleChangeLic("lic_date", newValue)}
                            sx={{ width: "450px" }}
                        />
                        <CustomTextField
                            rows={3}
                            multiline
                            helperText={""}
                            label="Description"
                            defaultValue={licenseData?.lic_description}
                            onInput={(event) => {
                                setLicenseData({
                                    ...licenseData,
                                    lic_description: event.target.value,
                                });
                            }}
                            textcss={{ width: "450px" }}
                        />
                    </div>
                    <div
                        className="save-btn"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <CustomButton
                            label="Save"
                            handleClick={() => {
                                handleSaveLic(licenseData.license_id);
                            }}
                            buttonCss={{ width: "170px", height: "48px", borderRadius: "20px" }}
                        />
                    </div>
                </CustomModal>
            )}

            {/* Awards Modal */}
            {openDialog2 && (
                <CustomModal
                    isOpen={openDialog2}
                    conditionOpen={setopenDialog22}
                    title={
                        <Typography variant="h6" className="modal-title">
                            {getAwaModalTitle()}
                        </Typography>
                    }
                    modalCss={{
                        width: "400px",
                        height: "500px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div
                        className="textfield-cont"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                            justifyContent: "space-around",
                            width: "100%",
                            marginBottom: "20px",
                        }}
                    >
                        <CustomTextField
                            helperText={""}
                            label="Award Title"
                            defaultValue={awardData?.award_title}
                            onInput={(event) => {
                                setAwardData({
                                    ...awardData,
                                    award_title: event.target.value,
                                });
                            }}
                            textcss={{ width: "450px" }}
                        />
                        <CustomTextField
                            helperText={""}
                            label="Issued By"
                            defaultValue={awardData?.award_issuedby}
                            onInput={(event) => {
                                setAwardData({
                                    ...awardData,
                                    award_issuedby: event.target.value,
                                });
                            }}
                            textcss={{ width: "180px" }}
                        />
                        <CustomDatePicker
                            label="Issue Date"
                            value={awardData.award_date}
                            onChange={(newValue) => handleChangeAwa("award_date", newValue)}
                            sx={{ width: "180px" }}
                        />
                        <CustomTextField
                            rows={3}
                            multiline
                            helperText={""}
                            label="Description"
                            defaultValue={awardData?.award_description}
                            onInput={(event) => {
                                setAwardData({
                                    ...awardData,
                                    award_description: event.target.value,
                                });
                            }}
                            textcss={{ width: "450px" }}
                        />
                    </div>
                    <div
                        className="save-btn"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <CustomButton
                            label="Save"
                            handleClick={() => {
                                handleSaveAwa(awardData.award_id);
                            }}
                            buttonCss={{ width: "170px", height: "48px", borderRadius: "20px" }}
                        />
                    </div>
                </CustomModal>
            )}
        </Box>
    );
};

export default ProfessionalDetails;