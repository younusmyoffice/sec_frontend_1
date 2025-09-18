import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton/custom-button";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";

const DiagnosticPatientProfileInformation = () => {
    const [textFields, setTextFields] = useState({
        first_name: "",
        email: localStorage.getItem("diagnostic_Email"),
        mobile: "",
        role_id: "4",
    });
    const [errors, setErrors] = useState({});
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const staff_id = localStorage.getItem("diagnostic_suid");
    const isFormValid = Object.values(textFields).every((field) => field.trim() !== "");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        localStorage.setItem("activeComponent", "profile");
        localStorage.setItem("path", "diagnostcenterprofileinfo");
    }, []);
    useEffect(() => {
        // Define the function to fetch the profile data
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(
                    `sec/hcf/getDiagnosticStaffProfile/${staff_id}`,
                );
                const textFields = response.data.response[0];

                // Update the state with fetched data
                setTextFields((prevState) => ({
                    ...prevState,
                    first_name: textFields?.first_name || "",
                    last_name: textFields?.last_name || "",
                    middle_name: textFields?.middle_name || "",
                    mobile: textFields?.mobile || "",
                }));
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        // Call the function
        if (staff_id) fetchProfileData();
    }, [staff_id]);

    const fetchTestData = async () => {
        setSnackOpen(false);
        try {
            await axiosInstance.post(`/sec/hcf/updateStaff`, JSON.stringify(textFields), {
                headers: { Accept: "Application/json" },
            });
            setSnackType("success");
            setSnackMessage("Staff Updated Successfully");
            setSnackOpen(true);
            setTimeout(() => setOpenDialog(false), 3000);
        } catch (error) {
            setSnackType("error");
            setSnackMessage("Some error occurred!!!");
            setSnackOpen(true);
            console.error(error.response);
        }
    };

    const handleInputChange = (field, value) => {
        setTextFields((prevState) => ({ ...prevState, [field]: value }));
        if (value.trim() !== "") setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "90%" }}>
                <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to="/diagnostCenterDashboard/diagnostcenterprofile/diagnostcenterprofileinfo">
                        Personal Information
                    </NavLink>
                    {/* <Typography
                        sx={{
                            color: "#939094",
                            fontFamily: "Poppins",
                            fontSize: "0.625rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "0.9375rem",
                            marginLeft: "500px",
                            letterSpacing: "0.005rem",
                        }}
                    >
                        Profile ID: SRCH10001
                    </Typography> */}
                </nav>
                <Box
                    component="div"
                    sx={{ position: "relative", top: "4em", width: "100%", display: "flex" }}
                >
                    <Box sx={{ width: "100%" }}>
                        <div style={{ textAlign: "start", margin: "10px" }}>
                            <h5>Login info</h5>
                            <div className="edit-prof">
                                <CustomButton
                                    label={isEditing ? "Cancel Edit" : "Edit Profile"}
                                    buttonCss={{
                                        color: "#E72B4A",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        marginLeft: "5px",
                                    }}
                                    isTransaprent={true}
                                    handleClick={toggleEditMode}
                                />
                            </div>
                            <CustomTextField
                                label="Name"
                                isDisabled={!isEditing}
                                CustomValue={textFields?.first_name}
                                textcss={{ width: 280, margin: "10px" }}
                                defaultValue={textFields?.first_name}
                                helperText={""}
                                onChange={(e) => handleInputChange("first_name", e.target.value)}
                            />

                            <CustomTextField
                                label="Mobile No."
                                isDisabled={!isEditing}
                                CustomValue={textFields?.mobile}
                                textcss={{ width: 280, margin: "10px" }}
                                defaultValue={textFields?.mobile}
                                helperText={""}
                                onChange={(e) => handleInputChange("mobile", e.target.value)}
                            />

                            <CustomTextField
                                label="Email Address"
                                isDisabled={true}
                                textcss={{ width: 280, margin: "10px" }}
                                CustomValue={textFields?.email}
                                defaultValue={textFields?.email}
                                helperText={""}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                            />

                            {/* <CustomTextField
                                label="Password"
                                placeholder="********"
                                textcss={{ width: 280, margin: "10px" }}
                                defaultValue={textFields?.password}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                            /> */}
                        </div>
                        {isEditing && (
                            <CustomButton label="Save" handleClick={() => fetchTestData()} />
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DiagnosticPatientProfileInformation;
