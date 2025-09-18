import { Box, Typography, Skeleton } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import "./ClinicProfessionalInformation.scss";
import { NavLink, Outlet } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomDropdown from "../../../../components/CustomDropdown";
import CustomTextField from "../../../../components/CustomTextField/custom-text-field";
import CustomButton from "../../../../components/CustomButton/custom-button";
import CustomModal from "../../../../components/CustomModal";
import axiosInstance from "../../../../config/axiosInstance";
import WorkExperience from "../../../../DoctorModule/DoctorProfile/DoctorProfessionalInfo/WorkExperience";
import Awards from "../../../../DoctorModule/DoctorProfile/DoctorProfessionalInfo/Awards";
import AddIcon from "@mui/icons-material/Add";
import License from "../../../../DoctorModule/DoctorProfile/DoctorProfessionalInfo/License";
import dayjs from "dayjs";
import CustomSnackBar from "../../../../components/CustomSnackBar";

const ClinicProfessionalInformation = () => {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditing1, setIsEditing1] = useState(false);
    const [data, setData] = useState({
        suid: localStorage.getItem("clinic_suid"),
        email: localStorage.getItem("clinic_Email"),
        qualification: null,
        qualified_year: null,
        university_name: null,
        degree: null,
        speciality_id: null,
    });
    const [professional, setProfessional] = useState({
        suid: localStorage.getItem("clinic_suid"),
        email: localStorage.getItem("clinic_Email"),
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
    const doctor_id = localStorage.getItem("clinic_suid");
    const [profileData, setProfileData] = useState([]);
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);

    const fetchProfileInfo = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`sec/hcf/getClinicProfile/${doctor_id}`);
            if (response?.data?.response && response.data.response.length > 0) {
                const profileData = response.data.response[0];

                // Log the entire response to verify the data
                console.log("Full Profile Response:", profileData);

                setData((prevData) => ({
                    ...prevData,
                    qualification: profileData?.qualification || "",
                    qualified_year: profileData?.qualified_year || "",
                    university_name: profileData?.university_name || "",
                    degree: profileData?.degree || "",
                    speciality_id: profileData?.speciality_id || "",
                    
                }));

                setProfessional((prevData) => ({
                    ...prevData,
                    state_reg_number: profileData?.state_reg_number || "", //unique
                    country_reg_number: profileData?.country_reg_number || "", //unique
                    state_reg_date: profileData?.state_reg_date || "",
                    country_reg_date: profileData?.country_reg_date || "",

                }));
            }
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.post(
                `/sec/hcf/updateDoctorEducation`,
                JSON.stringify(data),
            );
            console.log(response);
            setSnackMessage("Education Updated Successfully");
            setSnackType("success");
            setSnackOpen(true);
        } catch (error) {
            console.log(error.response);
            setSnackMessage("error during updating profile");
            setSnackType("error");
            setSnackOpen(true);
        }
    };
    const fetchProfessional = async () => {
        try {
            const response = await axiosInstance.post(
                `/sec/hcf/updateDoctorProfession`,
                JSON.stringify(professional),
            );
            setSnackMessage("Professional Details Updated Successfully");
            setSnackType("success");
            setSnackOpen(true);
            console.log(response);
        } catch (error) {
            setSnackMessage("error during updating profile");
            setSnackType("error");
            setSnackOpen(true);
            console.log(error.response);
        }
    };
    //specilization list fetch api
    const fetchLabs = async () => {
        try {
            const response = await axiosInstance.get(`/sec/departments`);
            setLabDepartments(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        }
    };

    useEffect(() => {
        fetchLabs();
    }, []);
    const departmentItems = labDepartments.map((department) => ({
        id: department.department_id,
        name: department.department_name,
    }));
    const handleDropdownChange = (selectedDepartment) => {
        const departmentId = departmentItems.find((item) => item.name === selectedDepartment)?.id;
        setSelectedDepartment(selectedDepartment);

        setData((prevState) => ({
            ...prevState,
            speciality_id: String(departmentId), // Ensure lab_dept_id is stored as a string
        }));
    };

    const getexprience = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `sec/hcf/getDoctorExperience?doctor_id=${doctor_id}`,
            );
            setExperience(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const getawards = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `sec/hcf/getDoctorAwards?doctor_id=${doctor_id}`,
            );
            setAward(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const getlicenses = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `sec/hcf/getDoctorLicense?doctor_id=${doctor_id}`,
            );
            setLicenses(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getawards();
        getexprience();
        getlicenses();
    }, []);
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
    const EditMode = () => {
        setIsEditing1(!isEditing1);
    };

    // add and update exprience start here
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Tracks whether modal is for editing or adding

    const [experienceData, setExperienceData] = useState({
        jobTitle: "",
        organization: "",
        startDate: null,
        endDate: null,
        exp_id: "",
    });

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
    const dates =
        experience.to_date === "present"
            ? `${dayjs(experience.from_date).format("DD/MM/YYYY")} - Present`
            : `${dayjs(experience.from_date).format("DD/MM/YYYY")} - ${dayjs(
                  experience.to_date,
              ).format("DD/MM/YYYY")}`;

    const handleEdit = (index) => {
        setExperienceData({
            jobTitle: experience[index]?.job,
            organization: experience[index]?.organisation,
            startDate: dates[index] ? dayjs(dates.from_date) : null,
            endDate: dates[index] && dates.to_date === "present" ? null : dayjs(dates.to_date),
            exp_id: experience[index]?.doctor_experience_id,
        });
        setIsEditMode(true);
        setOpenDialog(true);
    };

    const handleSave = async (exp_id) => {
        const payload = {
            suid: localStorage.getItem("clinic_suid"),
            email: localStorage.getItem("clinic_Email"),
            job: experienceData.jobTitle,
            organisation: experienceData.organization,
            from_date: dayjs(experienceData.startDate).format("YYYY-MM-DD"),
            to_date: experienceData.endDate
                ? dayjs(experienceData.endDate).format("YYYY-MM-DD")
                : "present",
        };

        if (isEditMode) {
            payload.doctor_experience_id = exp_id; // Add ID for editing
        }

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/updateDoctorExperience`,
                JSON.stringify(payload),
            );

            if (response.status === 200 || response.status === 201) {
                console.log("Success:", response.data);
                setSnackMessage(isEditMode ? "Work Experience Updated" : "Work Experience Added");
                setSnackType("success");
                setSnackOpen(true);
                setOpenDialog(false); // Close modal on success
            } else {
                setSnackMessage("Failed to save work experience.");
                setSnackType("error");
                setSnackOpen(true);
                console.error("Error:", response.data);
            }
        } catch (error) {
            console.error("Error:", error.response || error);
            alert("An error occurred while saving work experience.");
        }
    };

    const handleChange = (field, value) => {
        setExperienceData((prev) => ({
            ...prev,
            [field]: value ? dayjs(value) : null, // Ensure value is a dayjs object or null
        }));
    };

    const getModalTitle = () => {
        const action = isEditMode ? "Edit" : "Add";
        return `${action} ${"Work Exprience"}`;
    };
    // add and edit licence
    const [openDialog1, setOpenDialog1] = useState(false);
    const [isEditMode1, setIsEditMode1] = useState(false); // Tracks whether modal is for editing or adding

    const [licenseData, setLicenseData] = useState({
        lic_title: "",
        lic_certificate_no: "",
        lic_issuedby: "",
        lic_date: null,
        lic_description: "",
        license_id: "",
    });

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
            suid: localStorage.getItem("clinic_suid"),
            email: localStorage.getItem("clinic_Email"),
            lic_title: licenseData.lic_title,
            lic_certificate_no: licenseData.lic_certificate_no,
            lic_issuedby: licenseData.lic_issuedby,
            lic_date: dayjs(licenseData.lic_date).format("YYYY-MM-DD"),
            lic_description: licenseData.lic_description,
        };

        if (isEditMode1) {
            payload.doctor_license_id = lic_id; // Add ID for editing
        }

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/updateDoctorLicense`,
                JSON.stringify(payload),
            );

            if (response.status === 200 || response.status === 201) {
                console.log("Success:", response.data);
                alert();
                setOpenDialog1(false);
                setSnackMessage(isEditMode1 ? "License Details Updated" : "License Details Added");
                setSnackType("success");
                setSnackOpen(true);
            } else {
                console.error("Error:", response.data);
                setSnackMessage("error during updating License Details");
                setSnackType("error");
                setSnackOpen(true);            }
        } catch (error) {
            console.error("Error:", error.response || error);
            alert("An error occurred while saving License Details.");
        }
    };

    const handleChangeLic = (field, value) => {
        setLicenseData((prev) => ({
            ...prev,
            [field]: value ? dayjs(value) : null, // Ensure `value` is converted to `dayjs`
        }));
    };

    const getLicModalTitle = () => {
        const action = isEditMode1 ? "Edit" : "Add";
        return `${action} ${"License & Certificates"}`;
    };

    //add and edit awards
    const [openDialog2, setopenDialog22] = useState(false);
    const [isEditMode2, setisEditMode2] = useState(false); // Tracks whether modal is for editing or adding

    const [awardData, setAwardData] = useState({
        award_title: "",
        award_issuedby: "",
        award_date: null,
        award_description: "",
        award_id: "",
    });

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
            award_date: dayjs(award[index]?.award_date), // Example start date
            award_description: award[index]?.award_description, // Example end date
            award_id: award[index]?.doctor_awards_id,
        });
        setisEditMode2(true);
        setopenDialog22(true);
        console.log(index);
    };
    const handleSaveAwa = async (id) => {
        const payload = {
            suid: localStorage.getItem("clinic_suid"),
            email: localStorage.getItem("clinic_Email"),
            award_title: awardData.award_title,
            award_issuedby: awardData.award_issuedby,
            award_date: dayjs(awardData.award_date).format("YYYY-MM-DD"),
            award_description: awardData.award_description,
        };

        if (isEditMode2) {
            payload.doctor_awards_id = id; // Add ID for editing
        }

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/updateDoctorAwards`,
                JSON.stringify(payload),
            );

            if (response.status === 200 || response.status === 201) {
                console.log("Success:", response.data);
                setSnackMessage(isEditMode2 ? "Award Updated" : "Award Added");
            setSnackType("success");
            setSnackOpen(true);
                setopenDialog22(false); // Close modal on success
            } else {
                console.error("Error:", response.data);
                setSnackMessage("error during updating Award");
                setSnackType("error");
                setSnackOpen(true);            }
        } catch (error) {
            console.error("Error:", error.response || error);
            alert("An error occurred while saving award details.");
        }

        console.log("edit id", id);
    };

    const handleChangeAwa = (field, value) => {
        setAwardData((prev) => ({
            ...prev,
            [field]: value ? dayjs(value) : null, // Ensure value is a dayjs object or null
        }));
    };

    const getAwaModalTitle = () => {
        const action = isEditMode2 ? "Edit" : "Add";
        return `${action} ${"Awards"}`;
    };
    return (
        <>
            <Box sx={{ width: "98%", display: "flex", flexDirection: "column" }}>
                <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />
                <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                    <NavLink to={"/clinicDashboard/clinicprofile/profileinformation"}>
                        Profile Information
                    </NavLink>

                    <NavLink to={"/clinicDashboard/clinicprofile/clinicprofessionalinformation"}>
                        Professional Information
                    </NavLink>
                </Box>
            </Box>
            <div className="Main-cont">
                <div className="Education-cont">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "poppins",
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontHeight: "30px",
                        }}
                    >
                        Education Details
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "60%",
                            borderBottom: "1px",
                        }}
                    ></Box>
                    <div className="Edit-session">
                        <EditIcon
                            style={{
                                color: "#E72B4A",
                            }}
                        />
                        <CustomButton
                            label={isEditing ? "Cancel" : "Edit"}
                            isTransaprent={"True"}
                            handleClick={toggleEditMode}
                            buttonCss={{
                                color: "#E72B4A",
                                borderBottom: "1px",
                                borderTop: "1px",
                                borderRight: "1px",
                                borderLeft: "1px",
                            }}
                        ></CustomButton>
                    </div>
                </div>
                <div className="edu-textfields">
                    <div className="A-B-C">
                        <CustomTextField
                            defaultValue={data?.qualification}
                            CustomValue={data?.qualification}
                            label="Qualification"
                            isDisabled={!isEditing}
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                const Copy = {
                                    ...data,
                                    qualification: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            defaultValue={data?.university_name}
                            CustomValue={data?.university_name}
                            label="University"
                            isDisabled={!isEditing}
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                const Copy = {
                                    ...data,
                                    university_name: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                    value={
                                        data.qualified_year ? dayjs(`${data.qualified_year}`) : null
                                    }
                                    disabled={!isEditing}
                                    label="Year of Passing"
                                    views={["year"]} // Focus only on year selection
                                    style={{ width: "300px" }}
                                    onChange={(newValue) => {
                                        setData({
                                            ...data,
                                            qualified_year: newValue?.$y, // Extract only the year
                                        });
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className="deg-spe">
                        <CustomTextField
                            defaultValue={data?.degree}
                            CustomValue={data?.degree}
                            label="Degree"
                            helperText={""}
                            isDisabled={!isEditing}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                setData({
                                    ...data,
                                    degree: event.target.value,
                                });
                            }}
                        ></CustomTextField>

                        <CustomDropdown
                            label={"Specialization"}
                            isDisabled={!isEditing}
                            items={departmentItems.map((item) => item.name)} // Extract just names for display
                            // activeItem={selectedDepartment} // State to hold active selected value
                            activeItem={selectedDepartment} // State to hold active selected value
                            handleChange={handleDropdownChange} // Function to handle dropdown changes
                            dropdowncss={{
                                width: "360px",
                                color: "#787579",
                            }}
                        />
                        {isEditing && (
                            <CustomButton
                                label={"Save"}
                                isTransaprent={false}
                                isElevated={false}
                                handleClick={() => {
                                    fetchData();
                                }}
                                buttonCss={{
                                    MarginTop: "200px",
                                    width: "155px",
                                    height: "41px",
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="Education-cont1">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "poppins",
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontHeight: "30px",
                        }}
                    >
                        Professional Credentials
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "60%",
                            borderBottom: "1px",
                        }}
                    ></Box>
                    <div className="Edit-session">
                        <EditIcon
                            style={{
                                color: "#E72B4A",
                            }}
                        />
                        <CustomButton
                            label={isEditing1 ? "Cancel" : "Edit"}
                            handleClick={EditMode}
                            isTransaprent={"True"}
                            buttonCss={{
                                color: "#E72B4A",
                                borderBottom: "1px",
                                borderTop: "1px",
                                borderRight: "1px",
                                borderLeft: "1px",
                            }}
                        ></CustomButton>
                    </div>
                </div>
                <div className="edu-textfields">
                    <div className="A-B-C1">
                        <CustomTextField
                            defaultValue={professional?.state_reg_number}
                            CustomValue={professional?.state_reg_number}
                            label="State Registration No"
                            helperText={""}
                            isDisabled={!isEditing1}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                setProfessional({
                                    ...professional,
                                    state_reg_number: event.target.value,
                                });
                            }}
                        ></CustomTextField>
                        <CustomTextField
                        ty
                            defaultValue={professional?.country_reg_number}
                            CustomValue={professional?.country_reg_number}
                            label="Indian Registration No"
                            isDisabled={!isEditing1}
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                setProfessional({
                                    ...professional,
                                    country_reg_number: event.target.value,
                                });
                            }}
                        ></CustomTextField>
                    </div>

                    <div className="deg-spe">
                        <CustomTextField
                            defaultValue={professional?.state_reg_date}
                            CustomValue={professional?.state_reg_date}
                            label="Registration Date"
                            placeholder={"yyyy-mm-dd"}
                            isDisabled={!isEditing1}
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                setProfessional({
                                    ...professional,
                                    state_reg_date: event.target.value,
                                });
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            defaultValue={professional?.country_reg_date}
                            CustomValue={professional?.country_reg_date}
                            label="Registration Date"
                            placeholder={"yyyy-mm-dd"}
                            isDisabled={!isEditing1}
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                setProfessional({
                                    ...professional,
                                    country_reg_date: event.target.value,
                                });
                            }}
                        ></CustomTextField>
                        {isEditing1 && (
                            <CustomButton
                                label={"Save"}
                                isTransaprent={false}
                                isElevated={false}
                                handleClick={() => {
                                    setIsEditing1(false);
                                    fetchProfessional();
                                }}
                                buttonCss={{
                                    MarginTop: "200px",
                                    width: "155px",
                                    height: "41px",
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="Education-cont1">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "20px",
                            fontWeight: "500",
                        }}
                    >
                        Work Experience{" "}
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid #E6E1E5",
                            width: "60%",
                        }}
                    />
                    <button
                        onClick={handleAdd}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                    >
                        <AddIcon style={{ color: "#E72B4A" }} />
                    </button>
                </div>

                {loading ? (
                    // Skeleton loader for experience cards
                    Array.from({ length: 3 }).map((_, index) => (
                        <Box key={index} sx={{ marginBottom: "16px" }}>
                            <Skeleton variant="rectangular" width="100%" height={120} />
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="text" width="40%" />
                        </Box>
                    ))
                ) : Array.isArray(experience) && experience.length > 0 ? (
                    experience.map((exp, index) => (
                        <WorkExperience
                            key={index} // Unique key for each component
                            index={index} // Pass the index here
                            head={exp.job} // Pass the job title
                            subhead={exp.organisation} // Pass the organisation name
                            dates={
                                exp.to_date === "present"
                                    ? `${dayjs(exp.from_date).format("DD/MM/YYYY")} - Present`
                                    : `${dayjs(exp.from_date).format("DD/MM/YYYY")} - ${dayjs(
                                          exp.to_date,
                                      ).format("DD/MM/YYYY")}`
                            }
                            doctorExperienceId={exp.doctor_experience_id}
                            handleEdit={() => handleEdit(index)} // Pass the unique ID (if exists)
                        />
                    ))
                ) : (
                    // No awards found card
                    <Box
                        sx={{
                            padding: "16px",
                            textAlign: "center",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                            No Work Experience Found
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Add your first Experience to showcase your Work profile.
                        </Typography>
                    </Box>
                )}
                <div className="Education-cont1">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "20px",
                            fontWeight: "500",
                        }}
                    >
                        Awards
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid #E6E1E5",
                            width: "60%",
                        }}
                    />
                    <button
                        onClick={handleAddAwa}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                    >
                        <AddIcon style={{ color: "#E72B4A" }} />
                    </button>
                </div>
                {loading ? (
                    // Skeleton loader for awards cards
                    Array.from({ length: 3 }).map((_, index) => (
                        <Box key={index} sx={{ marginBottom: "16px" }}>
                            <Skeleton variant="rectangular" width="100%" height={120} />
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="text" width="40%" />
                        </Box>
                    ))
                ) : Array.isArray(award) && award.length > 0 ? (
                    award.map((awa, index) => (
                        <Awards
                            key={index}
                            index={index} // Pass the index here
                            head={awa.award_title}
                            subhead={awa.award_issuedby}
                            dates={awa.award_date}
                            description={awa.award_description}
                            doctorAwardsId={awa.doctor_awards_id}
                            handleEditAwa={() => handleEditAwa(index)}
                        />
                    ))
                ) : (
                    // No awards found card
                    <Box
                        sx={{
                            padding: "16px",
                            textAlign: "center",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                            No Awards Found
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Add your first award to showcase your achievements.
                        </Typography>
                    </Box>
                )}

                <div className="Education-cont1">
                    <Typography
                        style={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "20px",
                            fontWeight: "500",
                        }}
                    >
                        License & Certificates
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid #E6E1E5",
                            width: "60%",
                        }}
                    />
                    <button
                        onClick={handleAddLic}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                    >
                        <AddIcon style={{ color: "#E72B4A" }} />
                    </button>
                </div>
                {loading ? (
                    // Skeleton loader for licenses cards
                    Array.from({ length: 3 }).map((_, index) => (
                        <Box key={index} sx={{ marginBottom: "16px" }}>
                            <Skeleton variant="rectangular" width="100%" height={120} />
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="text" width="40%" />
                        </Box>
                    ))
                ) : Array.isArray(licenses) && licenses.length > 0 ? (
                    licenses.map((lic, index) => (
                        <License
                            key={index}
                            index={index}
                            head={lic.lic_title}
                            certific_num={lic.lic_certificate_no}
                            subhead={lic.lic_issuedby}
                            dates={lic.lic_date}
                            description={lic.lic_description}
                            doctorLicensesId={lic.doctor_license_id}
                            handleEditLic={() => handleEditLic(index)} // Pass the unique ID (if exists)
                        />
                    ))
                ) : (
                    // No awards found card
                    <Box
                        sx={{
                            padding: "16px",
                            textAlign: "center",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                            No License Found
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Add your first License to showcase your License.
                        </Typography>
                    </Box>
                )}
            </div>
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
                        width: "400px", // Set a constant width
                        height: "500px", // Increase the height to make it taller
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between", // Distribute space evenly
                        alignItems: "center",
                    }}
                >
                    <div
                        className="textfield-cont"
                        style={{
                            display: "flex",
                            flexWrap: "wrap", // Allows fields to wrap into rows
                            gap: "16px", // Spacing between fields
                            justifyContent: "space-around",
                            width: "100%", // Ensure it spans the modal's width
                            marginBottom: "20px", // Add spacing below the fields
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

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={experienceData?.startDate}
                                onChange={(newValue) => handleChange("startDate", newValue)}
                                sx={{ width: "180px" }}
                            />
                            <DatePicker
                                label="End Date"
                                value={experienceData?.endDate}
                                onChange={(newValue) => handleChange("endDate", newValue)}
                                sx={{ width: "180px" }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div
                        className="save-btn"
                        style={{
                            display: "flex",
                            justifyContent: "center", // Center the button horizontally
                            width: "100%", // Ensure it spans the width of the modal
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
                        width: "400px", // Set a constant width
                        height: "500px", // Increase the height to make it taller
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between", // Distribute space evenly
                        alignItems: "center",
                    }}
                >
                    <div
                        className="textfield-cont"
                        style={{
                            display: "flex",
                            flexWrap: "wrap", // Allows fields to wrap into rows
                            gap: "16px", // Spacing between fields
                            justifyContent: "space-around",
                            width: "100%", // Ensure it spans the modal's width
                            marginBottom: "20px", // Add spacing below the fields
                        }}
                    >
                        <CustomTextField
                            helperText={""}
                            label="License Title"
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
                            label="License Number"
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Issue Date"
                                value={licenseData?.lic_date}
                                onChange={(newValue) => handleChangeLic("lic_date", newValue)}
                                sx={{ width: "450px" }}
                            />
                        </LocalizationProvider>
                        <CustomTextField
                            rows={3}
                            multiline // Enable multiline input
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
                            justifyContent: "center", // Center the button horizontally
                            width: "100%", // Ensure it spans the width of the modal
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
                        width: "400px", // Set a constant width
                        height: "500px", // Increase the height to make it taller
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between", // Distribute space evenly
                        alignItems: "center",
                    }}
                >
                    <div
                        className="textfield-cont"
                        style={{
                            display: "flex",
                            flexWrap: "wrap", // Allows fields to wrap into rows
                            gap: "16px", // Spacing between fields
                            justifyContent: "space-around",
                            width: "100%", // Ensure it spans the modal's width
                            marginBottom: "20px", // Add spacing below the fields
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
                            label="Award IssuedBy"
                            defaultValue={awardData?.award_issuedby}
                            onInput={(event) => {
                                setAwardData({
                                    ...awardData,
                                    award_issuedby: event.target.value,
                                });
                            }}
                            textcss={{ width: "180px" }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Issue Date"
                                value={awardData.award_date}
                                onChange={(newValue) => handleChangeAwa("award_date", newValue)}
                                sx={{ width: "180px" }}
                            />
                        </LocalizationProvider>
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
                            justifyContent: "center", // Center the button horizontally
                            width: "100%", // Ensure it spans the width of the modal
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
        </>
    );
};

export default ClinicProfessionalInformation;
