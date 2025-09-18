import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CustomModal from "../../../components/CustomModal";
import CustomButton from "../../../components/CustomButton";
import CustomTextField from "../../../components/CustomTextField";
import axiosInstance from "../../../config/axiosInstance";

const Certifications = ({ lable, head, subhead, dates, doctorExperienceId }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Tracks whether modal is for editing or adding

    const [experienceData, setExperienceData] = useState({
        jobTitle: "",
        organization: "",
        startDate: null,
        endDate: null,
    });

    const handleAdd = () => {
        setExperienceData({
            jobTitle: "",
            organization: "",
            startDate: null,
            endDate: null,
        });
        setIsEditMode(false);
        setOpenDialog(true);
    };

    const handleEdit = () => {
        setExperienceData({
            jobTitle: head,
            organization: subhead,
            startDate: dates ? dayjs(dates.start) : null,
            endDate: dates && dates.end === "present" ? null : dayjs(dates.end),
        });
        setIsEditMode(true);
        setOpenDialog(true);
    };

    const handleSave = async () => {
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
            payload.doctor_experience_id = doctorExperienceId; // Add ID for editing
        }

        try {
            const response = await axiosInstance(`/sec/Doctor/updateDoctorExperience`, {
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Success:", result);
                alert(isEditMode ? "Work Experience Updated" : "Work Experience Added");
            } else {
                console.error("Error:", result);
                alert("Failed to save work experience.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while saving work experience.");
        }

        setOpenDialog(false);
    };

    const handleChange = (field, value) => {
        setExperienceData((prev) => ({
            ...prev,
            [field]: value ? dayjs(value) : null, // Ensure value is a dayjs object or null
        }));
    };

    const getModalTitle = () => {
        const action = isEditMode ? "Edit" : "Add";
        return `${action} ${lable}`;
    };

    return (
        <div>
            <div className="Education-cont1">
                <Typography
                    style={{
                        color: "#313033",
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontWeight: "500",
                    }}
                >
                    {lable}
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
            <div className="medical-card-container">
                <div className="medical-card">
                    <Box
                        sx={{
                            width: "150px",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#F0F0F0",
                        }}
                    >
                        <MilitaryTechIcon
                            style={{
                                fontSize: "30px",
                                width: "100px",
                                height: "100px",
                                color: "#E72B4A",
                            }}
                        />
                    </Box>
                    <div className="medical-details">
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    marginTop: "25px",
                                    marginLeft: "25px",
                                }}
                            >
                                {head}
                            </Typography>
                            <div className="edit-icon">
                                <EditIcon
                                    onClick={handleEdit}
                                    style={{ cursor: "pointer", color: "#E72B4A" }}
                                />
                                <Typography
                                    onClick={handleEdit}
                                    style={{
                                        color: "#E72B4A",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        marginLeft: "5px",
                                    }}
                                >
                                    Edit
                                </Typography>
                            </div>
                        </Box>
                        <Typography className="Hospital-name" style={{ marginLeft: "25px" }}>
                            {subhead}
                        </Typography>
                        <Typography className="date" style={{ marginLeft: "25px" }}>
                            {dates}
                        </Typography>
                    </div>
                </div>
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
                            label="Degree/Specialization"
                            helperText={""}
                            value={experienceData.jobTitle}
                            onChange={(e) => handleChange("jobTitle", e.target.value)}
                            textcss={{ width: "180px" }}
                        />
                        <CustomTextField
                            helperText={""}
                            label="College Name"
                            value={experienceData.organization}
                            onChange={(e) => handleChange("organization", e.target.value)}
                            textcss={{ width: "180px" }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={experienceData.startDate}
                                onChange={(newValue) => handleChange("startDate", newValue)}
                                sx={{ width: "180px" }}
                            />
                            <DatePicker
                                label="End Date"
                                value={experienceData.endDate}
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
                            onClick={handleSave}
                            buttonCss={{ width: "170px", height: "48px", borderRadius: "20px" }}
                        />
                    </div>
                </CustomModal>
            )}
        </div>
    );
};

export default Certifications;
