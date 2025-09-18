import { Box, Typography, Button, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CustomButton from "../../../components/CustomButton";
import CustomTextField from "../../../components/CustomTextField";
import CustomDropdown from "../../../components/CustomDropdown";
import axiosInstance from "../../../config/axiosInstance";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import CustomSnackBar from "../../../components/CustomSnackBar";
import DocProf from "../../../static/images/DrImages/doc3.png";
import "./AdminProfile.scss";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { right } from "@popperjs/core";
function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

const AdminProfile = () => {
    const [value, setValue] = useState([null, null]);
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(""); // State for Designation dropdown
    const [staffDesignation, setStaffDesignation] = useState([]);
    const [countries, setCountries] = useState([]); // Holds country list
    const [states, setStates] = useState([]); // Holds state list based on selected country
    const [cities, setCities] = useState([]); // Holds city list based on selected state
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [timeRange, setTimeRange] = useState([null, null]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [selectedCity, setSelectedCity] = useState(""); // Holds selected city
    const hcf_id = localStorage.getItem("hcfadmin_suid");
    const [profiledata, setProfileData] = useState({
        email: localStorage.getItem("hcfadmin_Email"),
        suid: hcf_id,
        role_id: 2,
        first_name: "",
        last_name: "",
        middle_name: "",
        country_id: "",
        state_id: "",
        city_id: "",
        profile_picture: "",
        category_id: "",
        hcf_name: "",
        reg_no: null,
        service_time_from: "",
        service_time_to: "",
        service_day_from: "",
        service_day_to: "",
        service_offer: "  ",
        state_reg_no: "",
        indian_reg_no: "",
        state_reg_date: "",
        indian_reg_date: "",
        diag_state_reg_no: "",
        diag_indian_reg_no: "",
        diag_state_reg_date: "",
        diag_indian_reg_date: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Define the function to fetch the profile data
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(`sec/hcf/getHcfprofile/${hcf_id}`);
                const profiledata = response.data.response[0];

                // Update the state with fetched data
                setProfileData((prevState) => ({
                    ...prevState,
                    first_name: profiledata.first_name || "",
                    last_name: profiledata.last_name || "",
                    middle_name: profiledata.middle_name || "",
                    country_id: profiledata.country_id || null, // Number or null
                    state_id: profiledata.state_id || null, // Number or null
                    city_id: profiledata.city_id || null, // Number or null
                    profile_picture: profiledata.profile_picture || "",
                    fileExtension: profiledata.fileExtension || "",
                    category_id: profiledata.category_id || null, // Assuming this is also numeric
                    hcf_name: profiledata.hcf_name || "",
                    reg_no: profiledata.reg_no || null, // Assuming this is numeric or null
                    service_time_from: profiledata.service_time_from || "",
                    service_time_to: profiledata.service_time_to || "",
                    service_day_from: profiledata.service_day_from || "",
                    service_day_to: profiledata.service_day_to || "",
                    service_offer: profiledata.service_offer || "",
                    state_reg_no: profiledata.state_reg_no || "",
                    indian_reg_no: profiledata.indian_reg_no || "",
                    state_reg_date: profiledata.state_reg_date || "",
                    indian_reg_date: profiledata.indian_reg_date || "",
                    diag_state_reg_no: profiledata.diag_state_reg_no || "",
                    diag_indian_reg_no: profiledata.diag_indian_reg_no || "",
                    diag_state_reg_date: profiledata.diag_state_reg_date || "",
                    diag_indian_reg_date: profiledata.diag_indian_reg_date || "",
                }));
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        // Call the function
        if (hcf_id) fetchProfileData();
    }, [hcf_id]);

    const fetchData = async () => {
        console.log("Entered the fetch data");
        try {
            const response = await axiosInstance.post(
                `sec/hcf/updateHcfprofile`,
                JSON.stringify(profiledata),
                { Accept: "Application/json" },
            );
            console.log(response);
            setSnackMessage("Profile Updated Successfully");
            setSnackType("success");
            setSnackOpen(true);
        } catch (error) {
            alert("Fill the details properly", error);
            setSnackMessage("error during updating profile");
            setSnackType("error");
            setSnackOpen(true);
            console.log(error.response);
        }
    };
    console.log("data is appear", profiledata);

    React.useEffect(() => {
        localStorage.setItem("activeComponent", "profile");
        localStorage.setItem("path", "adminprofile");
    }, []);
    console.log("i am here ", profiledata?.first_name);
    const [profileImage, setProfileImage] = useState(DocProf);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(",")[1]; // Extract base64 without metadata
                setProfileImage(URL.createObjectURL(file)); // For preview
                setProfileData((prevData) => ({
                    ...prevData,
                    profile_picture: base64Data, // Store file name in profile_picture
                }));
            };
            reader.readAsDataURL(file); // Trigger the file reading process
        }
    };
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
    return (
        <>
            <div className="profile-container">
                <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />
                <div className="navlink-btn">
                    <div className="nav-link">
                        <nav className="NavBar-Container-Appoinement">
                            <NavLink to={"/hcfadmin/adminprofile"}>
                                Profile Information
                            </NavLink>
                        </nav>
                    </div>
                    {/* <div className="prof-id">
                        <Typography
                            style={{
                                fontFamily: "poppins",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                fontHeight: "30px",
                                color: "#AEAAAE",
                            }}
                        >
                            ProfileID:
                        </Typography>
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
                    <div className="edit-prof">
                        <EditIcon
                            onClick={toggleEditMode}
                            style={{ cursor: "pointer", color: "#E72B4A" }}
                        />
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
                </div>
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
                    <Box sx={{ position: "relative", width: "100%" }}>
                        <div
                            className="mob-email-pass"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                padding: "20px",
                            }}
                        >
                            <div
                                className="photo-container"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={profiledata?.profile_picture || profileImage}
                                    alt="Profile"
                                    sx={{
                                        width: "167px",
                                        height: "167px",
                                        borderRadius: "50%", // Perfect circle for the image
                                        objectFit: "cover",
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    disabled={!isEditing}
                                    component="label"
                                    sx={{
                                        fontSize: "12px",
                                        padding: "8px 16px",
                                        marginTop: "10px",
                                    }}
                                >
                                    Choose Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImageChange}
                                    />
                                </Button>
                            </div>
                            <CustomTextField
                                label="HCF Name"
                                helperText=""
                                isDisabled={!isEditing}
                                CustomValue={
                                    `${profiledata?.first_name || ""} ${
                                        profiledata?.middle_name || ""
                                    } ${profiledata?.last_name || ""}`.trim() || " "
                                } 
                                defaultValue={
                                    `${profiledata?.first_name || ""} ${
                                        profiledata?.middle_name || ""
                                    } ${profiledata?.last_name || ""}`.trim() || " "
                                } // Concatenates first_name, middle_name, and last_name
                                onInput={(event) => {
                                    const [firstName, middleName, lastName] =
                                        event.target.value.split(" ");
                                    setProfileData((prevData) => ({
                                        ...prevData,
                                        first_name: firstName || "",
                                        middle_name: middleName || "",
                                        last_name: lastName || "",
                                    }));
                                }}
                                textcss={{
                                    width: "100%", // Full width for better responsiveness
                                    maxWidth: "349px",
                                    color: "#444d4f",
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                }}
                            />

                            <CustomTextField
                                label="E-Mail"
                                helperText=""
                                isDisabled={true}
                                defaultValue={profiledata?.email}
                                textcss={{
                                    width: "100%", // Full width for better responsiveness
                                    maxWidth: "349px",
                                    color: "#444d4f",
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                }}
                            />
                        </div>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%", // Ensure the container spans the full width
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#313033",
                                    fontFamily: "Poppins",
                                    fontSize: "20px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "30px",
                                    whiteSpace: "nowrap", // Prevent text from wrapping
                                }}
                            >
                                Registration Details
                            </Typography>
                            <Divider
                                sx={{
                                    flexGrow: 1, // Makes the divider take up remaining space
                                    marginLeft: 2, // Adds spacing between text and divider
                                    borderColor: "#E6E1E5",
                                }}
                            />
                        </Box>
                        <div className="mob-email-pass">
                            
                            <CustomTextField
                                label="State Registration No"
                                isDisabled={!isEditing}
                                helperText={""}
                                CustomValue={profiledata?.state_reg_no}
                                defaultValue={profiledata?.state_reg_no}
                                onInput={(event) => {
                                    let Copy = { ...profiledata, state_reg_no: event.target.value };
                                    setProfileData(Copy);
                                }}
                                textcss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    // fontHeight:'30px'
                                }}
                            />
                            <CustomTextField
                                label="Indian Registration No"
                                isDisabled={!isEditing}
                                helperText={""}
                                CustomValue={profiledata?.indian_reg_no}
                                defaultValue={profiledata?.indian_reg_no}
                                onInput={(event) => {
                                    let Copy = {
                                        ...profiledata,
                                        indian_reg_no: event.target.value,
                                    };
                                    setProfileData(Copy);
                                }}
                                textcss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    // fontHeight:'30px'
                                }}
                            />
                        </div>
                        <div className="mob-email-pass">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        disabled={!isEditing} // Disables the DatePicker if editing is not allowed
                                        label="State Registration Date"
                                        maxDate={dayjs().add(4, "week")} // Set a max date restriction
                                        value={
                                            profiledata.state_reg_date
                                                ? dayjs(profiledata.state_reg_date)
                                                : null // Parse the date directly if it exists, else null
                                        }
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                setProfileData((prevData) => ({
                                                    ...prevData,
                                                    state_reg_date: newValue.format("YYYY-MM-DD"), // Save date in ISO format
                                                }));
                                            }
                                        }}
                                        renderInput={(params) => <CustomTextField {...params} />}
                                        style={{ width: "290px" }} // Custom styling
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        disabled={!isEditing} // Disables the DatePicker if editing is not allowed
                                        label="Indian Registration Date"
                                        maxDate={dayjs().add(4, "week")} // Set a max date restriction
                                        value={
                                            profiledata.indian_reg_date
                                                ? dayjs(profiledata.indian_reg_date)
                                                : null // Parse the date directly if it exists, else null
                                        }
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                setProfileData((prevData) => ({
                                                    ...prevData,
                                                    indian_reg_date: newValue.format("YYYY-MM-DD"), // Save date in ISO format
                                                }));
                                            }
                                        }}
                                        renderInput={(params) => <CustomTextField {...params} />}
                                        style={{ width: "290px" }} // Custom styling
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%", 
                                paddingTop: "50px",// Ensure the container spans the full width
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#313033",
                                    fontFamily: "Poppins",
                                    fontSize: "20px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "30px",
                                    whiteSpace: "nowrap", // Prevent text from wrapping
                                }}
                            >
                                Diagnostic Center Details
                            </Typography>
                            <Divider
                                sx={{
                                    flexGrow: 1, // Makes the divider take up remaining space
                                    marginLeft: 2, // Adds spacing between text and divider
                                    borderColor: "#E6E1E5",
                                }}
                            />
                        </Box>
                        <div className="mob-email-pass">
                            <CustomTextField
                                label="State Registration No"
                                isDisabled={!isEditing}
                                helperText={""}
                                CustomValue={profiledata?.diag_state_reg_no}
                                defaultValue={profiledata?.diag_state_reg_no}

                                onInput={(event) => {
                                    let Copy = { ...profiledata, diag_state_reg_no: event.target.value };
                                    setProfileData(Copy);
                                }}
                                textcss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    // fontHeight:'30px'
                                }}
                            />
                            <CustomTextField
                                label="Indian Registration No"
                                isDisabled={!isEditing}
                                helperText={""}
                                CustomValue={profiledata?.diag_indian_reg_no}
                                defaultValue={profiledata?.diag_indian_reg_no}
                                onInput={(event) => {
                                    let Copy = {
                                        ...profiledata,
                                        diag_indian_reg_no: event.target.value,
                                    };
                                    setProfileData(Copy);
                                }}
                                textcss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    // fontHeight:'30px'
                                }}
                            />
                        </div>
                        <div className="mob-email-pass">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        disabled={!isEditing} // Disables the DatePicker if editing is not allowed
                                        label="State Registration Date"
                                        maxDate={dayjs().add(4, "week")} // Set a max date restriction
                                        value={
                                            profiledata.diag_state_reg_date
                                                ? dayjs(profiledata.diag_state_reg_date)
                                                : null // Parse the date directly if it exists, else null
                                        }
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                setProfileData((prevData) => ({
                                                    ...prevData,
                                                    diag_state_reg_date: newValue.format("YYYY-MM-DD"), // Save date in ISO format
                                                }));
                                            }
                                        }}
                                        renderInput={(params) => <CustomTextField {...params} />}
                                        style={{ width: "290px" }} // Custom styling
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        disabled={!isEditing} // Disables the DatePicker if editing is not allowed
                                        label="Indian Registration Date"
                                        maxDate={dayjs().add(4, "week")} // Set a max date restriction
                                        value={
                                            profiledata.diag_indian_reg_date
                                                ? dayjs(profiledata.diag_indian_reg_date)
                                                : null // Parse the date directly if it exists, else null
                                        }
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                setProfileData((prevData) => ({
                                                    ...prevData,
                                                    diag_indian_reg_date: newValue.format("YYYY-MM-DD"), // Save date in ISO format
                                                }));
                                            }
                                        }}
                                        renderInput={(params) => <CustomTextField {...params} />}
                                        style={{ width: "290px" }} // Custom styling
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="save-bttn">
                            {isEditing && (
                                <CustomButton
                                    buttonCss={{ width: "349px", fontFamily: "Poppins" }}
                                    label="save"
                                    handleClick={() => fetchData()}
                                ></CustomButton>
                            )}
                        </div>
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default AdminProfile;
