import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import { Avatar, Button } from "@mui/material";
import CustomButton from "../../components/CustomButton/custom-button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./profile.scss";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close"; // Import Close Icon from Material-UI
import CustomSnackBar from "../../components/CustomSnackBar";

const Profile = () => {
    const [activeDropdown, setActiveDropdown] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [profileLink, setProfileLink] = useState("");
    const [isopen, setIsopen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackStatus, setSnackStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [contactLink, setContactLink] = useState("");
    const [profileUpdate, setProfileUpdate] = useState({
        email: localStorage.getItem("patient_Email"),
        first_name: null,
        last_name: null,
        middle_name: null,
        added_by: "self",
        gender: null,
        DOB: null,
        profile_picture: null,
    });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        fetchData();
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/sec/updatePateintProfile",
                JSON.stringify(profileUpdate),
            );
            setSnackMessage("Updated Successfully");
            setSnackStatus("success");
            setIsopen(true);
            const updatedProfilePic = response?.data?.response?.profile_picture;

            if (updatedProfilePic) {
                localStorage.setItem("profile", updatedProfilePic);
            }
            console.log("Success  : ", response);
        } catch (error) {
            console.log(error);
            setSnackMessage("Error");
            setSnackStatus("error");
            setIsopen(true);
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    console.log("Profile Update : ", profileUpdate);

    const fetchDataProfile = async () => {
        try {
            const response = await axiosInstance.post(
                "/sec/patientprofile",
                JSON.stringify({
                    suid: localStorage.getItem("patient_suid"),
                }),
            );
            console.log("Patient Profile Details : ", response?.data?.response[0]);
            setProfileUpdate({
                email: response?.data?.response[0]?.email,
                first_name: response?.data?.response[0]?.first_name,
                last_name: response?.data?.response[0]?.last_name,
                middle_name: response?.data?.response[0]?.middle_name,
                added_by: "self",
                gender: response?.data?.response[0]?.gender,
                DOB: response?.data?.response[0]?.DOB,
                profile_picture: response?.data?.response[0]?.profile_picture,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setProfileLink(
            localStorage.getItem("activeComponent") === "dashboard"
                ? "/patientdashboard/dashboard/profile"
                : localStorage.getItem("activeComponent") === "appointment"
                ? "/patientdashboard/appointment/profile"
                : localStorage.getItem("activeComponent") === "manage"
                ? "/patientdashboard/manage/profile"
                : null,
        );

        setContactLink(
            localStorage.getItem("activeComponent") === "dashboard"
                ? "/patientdashboard/dashboard/contact"
                : localStorage.getItem("activeComponent") === "appointment"
                ? "/patientdashboard/appointment/contact"
                : localStorage.getItem("activeComponent") === "manage"
                ? "/patientdashboard/manage/contact"
                : null,
        );
        fetchDataProfile();
    }, []);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Data = reader.result.split(",")[1]; // Extract base64 without metadata
                setProfileUpdate({
                    ...profileUpdate,
                    profile_picture: base64Data, // Store the base64 representation
                });
            };

            reader.readAsDataURL(file); // Read the file as Data URL
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <CustomSnackBar isOpen={isopen} message={snackMessage} type={snackStatus} />
            <Box
                className="NavBar-Box-profile"
                sx={{ display: "flex", marginLeft: 0, marginBottom: 0 }}
            >
                <NavLink to={profileLink}>Profile Information</NavLink>
                <NavLink to={contactLink}>Contact Details</NavLink>
                {/* <NavLink to={"/patientdashboard/dashboard/payment"}>Payment Details</NavLink> */}
            </Box>
            {/* <div className="prof-id">
                <Typography>ProfileID:</Typography>
                <Box
                    component={"a"}
                    href="#"
                    sx={{
                        color: "#E72B4A",
                        fontFamily: "poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontHeight: "30px",
                    }}
                >
                    SRCD0001
                </Box>
            </div> */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <CustomButton
                    label=""
                    isTransaprent={true}
                    leftIcon={<CloseIcon />} // Use X mark icon (CloseIcon)
                    buttonCss={{ border: "none" }}
                    handleClick={() => navigate("/patientdashboard/dashboard/explore")}
                />
            </Box>
            <div className="edit-prof">
                <EditIcon
                    style={{
                        color: "#E72B4A",
                    }}
                />
                <CustomButton
                    label={isEditing ? "Cancel Edit" : "Edit Profile"}
                    isTransaprent={"True"}
                    buttonCss={{
                        borderBottom: "1px",
                        borderRight: "1px",
                        borderLeft: "1px",
                        borderTop: "1px",
                    }}
                    handleClick={toggleEditMode}
                />
            </div>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    height: "100%",
                    marginTop: "4%",
                }}
            >
                {/* imageBox */}
                <Box sx={{ width: "18%", height: "100%" }}>
                    <Box sx={{ width: "170px", height: "170px" }}>
                        <Avatar
                            alt="Profile Picture"
                            src={
                                profileUpdate?.profile_picture
                                    ? profileUpdate?.profile_picture
                                    : "images/avatar.png"
                            }
                            sx={{ width: "100%", height: "100%" }}
                        />
                    </Box>
                    <Button
                        component="label"
                        variant="contained"
                        disabled={!isEditing}
                        sx={{ mt: 2, mr: 13 }}
                    >
                        Edit Profile
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleProfilePictureChange}
                        />
                    </Button>
                </Box>

                {/* content Box */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        height: "100%",
                        width: "82%",
                    }}
                >
                    {/* First line of inputs */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "70%",
                            height: "100%",
                        }}
                    >
                        <Box sx={{ marginRight: "2%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"First Name"}
                                isDisabled={!isEditing}
                                defaultValue={profileUpdate?.first_name}
                                CustomValue={profileUpdate?.first_name}
                                helperText={""}
                                isValid
                                // eslint-disable-next-line no-undef
                                onChange={(event) => {
                                    setProfileUpdate({
                                        ...profileUpdate,
                                        first_name: event?.target?.value,
                                    });
                                }}
                                textcss={{
                                    width: "350px",
                                    height: "56px",
                                }}
                            />
                        </Box>
                        <Box>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Middle Name"}
                                isDisabled={!isEditing}
                                defaultValue={profileUpdate?.middle_name}
                                CustomValue={profileUpdate?.middle_name}
                                helperText={""}
                                isValid
                                // eslint-disable-next-line no-undef
                                onChange={(event) => {
                                    setProfileUpdate({
                                        ...profileUpdate,
                                        middle_name: event?.target?.value,
                                    });
                                }}
                                // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "350px",
                                    height: "56px",
                                }}
                            />
                        </Box>
                    </Box>
                    {/* //second line  */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "70%",
                            height: "100%",
                        }}
                    >
                        <Box sx={{ marginRight: "2%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                isDisabled={!isEditing}
                                label={"Last Name"}
                                defaultValue={profileUpdate?.last_name}
                                CustomValue={profileUpdate?.last_name}
                                helperText={""}
                                isValid
                                // eslint-disable-next-line no-undef
                                onChange={(event) => {
                                    setProfileUpdate({
                                        ...profileUpdate,
                                        last_name: event?.target?.value,
                                    });
                                }}
                                textcss={{
                                    width: "350px",
                                    height: "56px",
                                }}
                            />
                        </Box>
                        <Box>
                            <Grid container justifyContent="space-around">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={profileUpdate?.DOB ? dayjs(profileUpdate.DOB) : null} // Convert to dayjs object
                                        disabled={!isEditing}
                                        label="Date Of Birth"
                                        onChange={(item) => {
                                            const formattedDate = item
                                                ? item.format("YYYY-MM-DD")
                                                : null; // Format selected date
                                            setProfileUpdate({
                                                ...profileUpdate,
                                                DOB: formattedDate,
                                            });
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Box>
                    </Box>
                    {/* dropdown */}
                    <Box sx={{ display: "flex" }}>
                        <CustomDropdown
                            label="Gender"
                            isDisabled={!isEditing} // Disable dropdown when not in edit mode
                            items={["Male", "Female", "Rather Not Say"]} // Dropdown options
                            activeItem={profileUpdate?.gender || "Select Gender"} // Default to "Select Gender" if no value is present
                            handleChange={(selectedValue) => {
                                setProfileUpdate({ ...profileUpdate, gender: selectedValue }); // Update gender in state
                            }}
                            dropdowncss={{
                                width: "360px",
                                color: isEditing ? "#000" : "#787579", // Adjust color based on edit mode
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", marginTop: "6%" }}>
                        {isEditing && (
                            <CustomButton
                                label={
                                    loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Save Changes"
                                    )
                                }
                                isTransaprent={false}
                                isDisabled={false}
                                isElevated={false}
                                handleClick={() => {
                                    handleSubmit();
                                }}
                                buttonCss={{
                                    width: "155px",
                                    height: "41px",
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
