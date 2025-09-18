import { Box, Typography, Button, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CustomButton from "../../../../components/CustomButton";
import CustomTextField from "../../../../components/CustomTextField";
import CustomDropdown from "../../../../components/CustomDropdown";
import "./clinicprofileinformation.scss";
import axiosInstance from "../../../../config/axiosInstance";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import DocProf from "../../../../static/images/DrImages/Image02.png";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { right } from "@popperjs/core";
function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

const ClinicProfileInformation = () => {
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
    const [profiledata, setProfileData] = useState({
        email: localStorage.getItem("clinic_Email"),
        suid: localStorage.getItem("clinic_suid"),
        role_id: 6,
        first_name: null,
        last_name: null,
        middle_name: null,
        gender: "",
        DOB: null,
        country_id: null,
        state_id: null,
        city_id: null,
        profile_picture: null,
        street_address1: null,
        street_address2: null,
        zip_code: null,
        location: null,
        home_no: null,
        business_name: null,
        reg_no: null,
        reg_date: null,
        service_time_from: null,
        service_time_to: null,
        service_day_from: null,
        service_day_to: null,
        service: null,
        council_name: null,
        company_name: null,
        description: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const doctor_id = localStorage.getItem("clinic_suid");

    useEffect(() => {
        // Define the function to fetch the profile data
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(`sec/hcf/getClinicProfile/${doctor_id}`);
                const profiledata = response.data.response[0];

                // Update the state with fetched data
                setProfileData((prevState) => ({
                    ...prevState,
                    first_name: profiledata?.first_name || "",
                    last_name: profiledata?.last_name || "",
                    middle_name: profiledata?.middle_name || "",
                    gender: profiledata?.gender || "",
                    DOB: profiledata?.DOB || "",
                    city_id: profiledata?.city_id || null, // Number or null
                    country_id: profiledata?.country_id || null, // Number or null
                    state_id: profiledata?.state_id || null, // Number or null
                    profile_picture: profiledata?.profile_picture || null, // String (URL) or null
                    street_address1: profiledata?.street_address1 || null, // String or null
                    street_address2: profiledata?.street_address2 || null, // String or null
                    zip_code: profiledata?.zip_code || null, // String or null
                    location: profiledata?.location || null, // String (coordinates or address) or null
                    home_no: profiledata?.home_no || null, // String or null
                    business_name: profiledata?.business_name || null, // String or null
                    reg_no: profiledata?.reg_no || null, // String or null
                    reg_date: profiledata?.reg_date || null, // Date string or null
                    service_time_from: profiledata?.service_time_from || null, // Time string or null
                    service_time_to: profiledata?.service_time_to || null, // Time string or null
                    service_day_from: profiledata?.service_day_from || null, // Day string or null
                    service_day_to: profiledata?.service_day_to || null, // Day string or null
                    service: profiledata?.service || null, // Array or null
                    company_name: profiledata?.company_name || null, // String or null
                    description: profiledata?.description || null, // String or null
                }));
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        // Call the function
        if (doctor_id) fetchProfileData();
    }, [doctor_id]);

    const fetchData = async () => {
        console.log("Entered the fetch data");
        try {
            const response = await axiosInstance.post(
                `/sec/hcf/updateClinicProfile`,
                JSON.stringify(profiledata),
                { Accept: "Application/json" },
            );
            console.log(response);
            setSnackMessage("Profile Updated Successfully");
            setSnackType("success");
            setSnackOpen(true);
            // localStorage.setItem("profile", profiledata.profile_picture);
        } catch (error) {
            setSnackMessage("error during updating profile");
            setSnackType("error");
            setSnackOpen(true);
            console.log(error.response);
        }
    };
    console.log("data is appear", profiledata);

    React.useEffect(() => {
        localStorage.setItem("activeComponent", "profile");
        localStorage.setItem("path", "profileinformation");
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(inputValue) || inputValue === "") {
            // If the input matches the email format or is empty, update the state
            let copy = { ...profiledata, email: inputValue };
            setProfileData(copy);
            // checkFields(copy);
        }
    };

    const handleDateChange = (newValue) => {
        setProfileData((prevData) => ({
            ...prevData,
            reg_date: newValue ? newValue.format("YYYY-MM-DD") : null, // Format date as "DD/MM/YYYY"
        }));
    };

    const handleInputChange3 = (event, fieldName) => {
        const inputValue = event.target.value;
        // Regular expression for validating alphabetic characters
        const alphabeticRegex = /^[a-zA-Z\s]*$/;

        // Determine which field is being updated
        let updatedField = {};
        if (fieldName === "company_name") {
            updatedField = { company_name: inputValue };
        } else if (fieldName === "business_name") {
            updatedField = { business_name: inputValue };
        }

        if (alphabeticRegex.test(inputValue) || inputValue === "") {
            // If the input consists of only alphabetic characters or is empty, update the state
            let copy = { ...profiledata, ...updatedField };
            setProfileData(copy);
            // checkFields(copy);
        }
    };

    const handleserviceChange = (event) => {
        const newCountryId = event.target.value;
        setProfileData((prevData) => ({
            ...prevData,
            service: newCountryId,
        }));
    };

    const handleAdd1Change = (event) => {
        const newaddress = event.target.value;
        setProfileData((prevData) => ({
            ...prevData,
            street_address1: newaddress,
        }));
    };

    const handleAdd2Change = (event) => {
        const newaddress = event.target.value;
        setProfileData((prevData) => ({
            ...prevData,
            street_address2: newaddress,
        }));
    };
    const zip_codeChange = (event) => {
        const newaddress = event.target.value;
        setProfileData((prevData) => ({
            ...prevData,
            zip_code: newaddress,
        }));
    };
    const locationChange = (event) => {
        const newaddress = event.target.value;
        setProfileData((prevData) => ({
            ...prevData,
            location: newaddress,
        }));
    };
    const handlehomenoChange = (event) => {
        const newaddress = event.target.value;
        setProfileData((prevData) => ({
            ...prevData,
            home_no: newaddress,
        }));
    };
    const handleRegChange = (event) => {
        const inputValue = event.target.value;
        // Check if the input value contains only numbers
        if (/^[0-9]*$/.test(inputValue)) {
            setProfileData((prevData) => ({
                ...prevData,
                reg_no: inputValue,
            }));
        }
    };

    // Fetching staff Designation
    const fetchDesignation = async () => {
        try {
            const response = await axiosInstance.get(`/sec/departments`);
            setStaffDesignation(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        }
    };

    useEffect(() => {
        fetchDesignation();
    }, []);

    // Transform the department data for the dropdown
    const designationItems = staffDesignation.map((designation) => ({
        id: designation.department_id,
        name: designation.department_name,
    }));

    // fetching country list
    const fetchCountries = async () => {
        try {
            const response = await axiosInstance.get(`/sec/countries`);
            setCountries(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching countries:", error.response);
        }
    };

    const fetchStates = async (countryId) => {
        try {
            const response = await axiosInstance.get(`/sec/states?country_id=${countryId}`);
            setStates(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching states:", error.response);
        }
    };

    const fetchCities = async (stateId) => {
        try {
            const response = await axiosInstance.get(`/sec/cities?state_id=${stateId}`);
            setCities(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching cities:", error.response);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    // Trigger state fetch when a country is selected
    const handleCountry = (selectedCountryName) => {
        const selectedCountryData = countries.find(
            (item) => item.country_name === selectedCountryName,
        );
        if (selectedCountryData) {
            const countryId = selectedCountryData.country_id;
            setSelectedCountry(selectedCountryName);
            fetchStates(countryId); // Fetch states for selected country

            setProfileData((prevState) => ({
                ...prevState,
                country_id: String(countryId),
            }));
        }
    };

    // Trigger city fetch when a state is selected
    const handleState = (selectedStateName) => {
        const selectedStateData = states.find((item) => item.state_name === selectedStateName);
        if (selectedStateData) {
            const stateId = selectedStateData.state_id;
            setSelectedState(selectedStateName);
            fetchCities(stateId); // Fetch cities for selected state

            setProfileData((prevState) => ({
                ...prevState,
                state_id: String(stateId),
            }));
        }
    };

    // Handle city selection and update profileData with city_id
    const handleCity = (selectedCityName) => {
        const selectedCityData = cities.find((item) => item.city_name === selectedCityName);
        if (selectedCityData) {
            const cityId = selectedCityData.city_id;
            setSelectedCity(selectedCityName);

            setProfileData((prevState) => ({
                ...prevState,
                city_id: String(cityId),
            }));
        }
    };

    const handleTimeRangeChange = (newRange) => {
        setTimeRange(newRange);

        setProfileData((prevData) => ({
            ...prevData,
            service_time_from: newRange[0] ? newRange[0].format("HH:mm:ss") : null,
            service_time_to: newRange[1] ? newRange[1].format("HH:mm:ss") : null,
        }));

        console.log(
            "Time range: ",
            newRange[0]?.format("HH:mm:ss"),
            newRange[1]?.format("HH:mm:ss"),
        );
    };
    const handleDateRangePicker = (newDateRange) => {
        setDateRange(newDateRange);

        setProfileData((prevData) => ({
            ...prevData,
            service_day_from: newDateRange[0] ? newDateRange[0].format("YYYY-MM-DD") : null,
            service_day_to: newDateRange[1] ? newDateRange[1].format("YYYY-MM-DD") : null,
        }));

        console.log(
            "Date range:",
            newDateRange[0]?.format("YYYY-MM-DD"),
            newDateRange[1]?.format("YYYY-MM-DD"),
        );
    };

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

    const dropdownItems = ["Male", "Female", "Others"];
    const [activeDropdown, setActiveDropdown] = useState(""); // Gender
    const handleGenderDropdownChange = (item) => {
        console.log("Selected item:", item);

        // Update the profiledata state with the selected gender
        setProfileData((prev) => ({
            ...prev,
            gender: item,
        }));
    };
    return (
        <>
            <div className="profile-container">
                <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />
                <div className="navlink-btn">
                    <div className="nav-link">
                        <nav className="NavBar-Container-Appoinement">
                            <NavLink to={"/clinicDashboard/clinicprofile/profileinformation"}>
                                Profile Information
                            </NavLink>

                            <NavLink
                                to={"/clinicDashboard/clinicprofile/clinicprofessionalinformation"}
                            >
                                Professional Information
                            </NavLink>
                        </nav>
                    </div>

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
                                Login Details
                            </Typography>
                            <Divider
                                sx={{
                                    flexGrow: 1, // Makes the divider take up remaining space
                                    marginLeft: 2, // Adds spacing between text and divider
                                    borderColor: "#E6E1E5",
                                }}
                            />
                        </Box>

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
                                label="E-Mail"
                                helperText=""
                                isDisabled={true}
                                defaultValue={profiledata?.email}
                                onInput={(event) => {
                                    handleInputChange(event);
                                    const copy = { ...profiledata, email: event.target.value };
                                    setProfileData(copy);
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
                                label="First Name"
                                helperText=""
                                isDisabled={!isEditing}
                                defaultValue={profiledata?.first_name}
                                CustomValue={profiledata?.first_name}
                                onInput={(event) => {
                                    handleInputChange(event);
                                    const copy = { ...profiledata, first_name: event.target.value };
                                    setProfileData(copy);
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
                                label="Middle Name"
                                helperText=""
                                isDisabled={!isEditing}
                                defaultValue={profiledata?.middle_name}
                                CustomValue={profiledata?.middle_name}
                                onInput={(event) => {
                                    handleInputChange(event);
                                    const copy = { ...profiledata, middle_name: event.target.value };
                                    setProfileData(copy);
                                }}
                                textcss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                }}
                            />
                            <CustomTextField
                                label="Last Name"
                                helperText=""
                                isDisabled={!isEditing}
                                defaultValue={profiledata?.last_name}
                                CustomValue={profiledata?.last_name}
                                onInput={(event) => {
                                    handleInputChange(event);
                                    const copy = { ...profiledata, last_name: event.target.value };
                                    setProfileData(copy);
                                }}
                                textcss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                }}
                            />
                        </div>
                        <div
                            className="mob-email-pass"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                padding: "20px",
                            }}
                        >
                            <CustomDropdown
                                label="Gender"
                                isDisabled={!isEditing}
                                items={dropdownItems}
                                activeItem={profiledata.gender || "Select Gender"} // Sync with profiledata.gender
                                handleChange={handleGenderDropdownChange} // Directly pass the function
                                dropdowncss={{
                                    width: "350px",
                                    color: isEditing ? "#000" : "#787579",
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]} isDisabled={!isEditing}>
                                    <DatePicker
                                        value={profiledata?.DOB ? dayjs(profiledata.DOB) : null} // Convert to Day.js object
                                        label="Date of Birth"
                                        disabled={!isEditing}
                                        style={{ width: "300px" }}
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                setProfileData({
                                                    ...profiledata,
                                                    DOB: newValue.format("YYYY-MM-DD"), // Use Day.js's format method
                                                });
                                            }
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div
                            className="mob-email-pass"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                padding: "20px",
                            }}
                        >
                            <CustomTextField
                                label="Bio"
                                isDisabled={!isEditing}
                                helperText={""}
                                defaultValue={profiledata?.description}
                                CustomValue={profiledata?.description}
                                onInput={(event) => {
                                    handleInputChange3(event);
                                    let Copy = { ...profiledata, description: event.target.value };
                                    setProfileData(Copy);
                                }}
                                textcss={{
                                    width: "750px",
                                    color: "#787579",
                                    fontFamily: "poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    // fontHeight:'30px'
                                }}
                            ></CustomTextField>
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
                                HCF Details
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
                                label="Company Name"
                                isDisabled={!isEditing}
                                helperText={""}
                                defaultValue={profiledata?.company_name}
                                CustomValue={profiledata?.company_name}
                                onInput={(event) => {
                                    handleInputChange3(event);
                                    let Copy = { ...profiledata, company_name: event.target.value };
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
                            ></CustomTextField>
                            <CustomTextField
                                label="Business Name"
                                isDisabled={!isEditing}
                                helperText={""}
                                defaultValue={profiledata?.business_name}
                                CustomValue={profiledata?.business_name}
                                onInput={(event) => {
                                    handleInputChange3(event);
                                    let Copy = {
                                        ...profiledata,
                                        business_name: event.target.value,
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
                            ></CustomTextField>
                        </div>
                        <div className="mob-email-pass">
                            <CustomTextField
                                label="Registration No"
                                isDisabled={!isEditing}
                                helperText={""}
                                onInput={handleRegChange}
                                defaultValue={profiledata?.reg_no}
                                CustomValue={profiledata?.reg_no}
                                type="number"
                                textcss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    marginRight: "20px", // Space after the text field
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        disabled={!isEditing}
                                        label="Registration Date"
                                        maxDate={dayjs().add(4, "week")} // Example max date restriction, adjust as needed
                                        onChange={handleDateChange}
                                        value={
                                            profiledata?.reg_date
                                                ? dayjs(profiledata.reg_date)
                                                : null
                                        }
                                        style={{ width: "290px" }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
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
                                Service Details
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
                                label="service"
                                isDisabled={!isEditing}
                                helperText={""}
                                defaultValue={profiledata?.service}
                                CustomValue={profiledata?.service}
                                onInput={(event) => {
                                    handleserviceChange(event);
                                    let Copy = {
                                        ...profiledata,
                                        service: event.target.value,
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
                            ></CustomTextField>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                        "MultiInputTimeRangeField",
                                        "SingleInputTimeRangeField",
                                    ]}
                                    sx={{ width: "50%" }}
                                >
                                    <MultiInputTimeRangeField
                                        disabled={!isEditing}
                                        value={timeRange}
                                        onChange={handleTimeRangeChange}
                                        slotProps={{
                                            textField: ({ position }) => ({
                                                label:
                                                    position === "start"
                                                        ? "Service time From"
                                                        : " Service time To",
                                            }),
                                        }}
                                    />
                                </DemoContainer>
                                <DemoContainer
                                    components={["DateRangePicker"]}
                                    sx={{ width: "50%" }}
                                >
                                    <DateRangePicker
                                        value={dateRange}
                                        disabled={!isEditing}
                                        onChange={handleDateRangePicker}
                                        slotProps={{
                                            textField: ({ position }) => ({
                                                label:
                                                    position === "start"
                                                        ? "Service Start Date"
                                                        : "Service End Date",
                                            }),
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
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
                                Contact Details
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
                                label="Street Line1"
                                isDisabled={!isEditing}
                                helperText={""}
                                defaultValue={profiledata?.street_address1}
                                CustomValue={profiledata?.street_address1}
                                onInput={(event) => {
                                    handleAdd1Change(event);
                                    let Copy = {
                                        ...profiledata,
                                        street_address1: event.target.value,
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
                            ></CustomTextField>
                            <CustomTextField
                                label="Street Line2"
                                isDisabled={!isEditing}
                                helperText={""}
                                defaultValue={profiledata?.street_address2}
                                CustomValue={profiledata?.street_address2}
                                onInput={(event) => {
                                    handleAdd2Change(event);
                                    let Copy = {
                                        ...profiledata,
                                        street_address2: event.target.value,
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
                            ></CustomTextField>
                            <CustomTextField
                                label="zip code"
                                isDisabled={!isEditing}
                                helperText={""}
                                defaultValue={profiledata?.zip_code}
                                CustomValue={profiledata?.zip_code}
                                onInput={(event) => {
                                    zip_codeChange(event);
                                    let Copy = {
                                        ...profiledata,
                                        zip_code: event.target.value,
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
                            ></CustomTextField>
                        </div>

                        <div className="mob-email-pass">
                            <CustomTextField
                                label="location"
                                isDisabled={!isEditing}
                                helperText={""}
                                defaultValue={profiledata?.location}
                                CustomValue={profiledata?.location}
                                onInput={(event) => {
                                    locationChange(event);
                                    let Copy = {
                                        ...profiledata,
                                        location: event.target.value,
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
                            ></CustomTextField>

                            <CustomTextField
                                label="Home No"
                                isDisabled={!isEditing}
                                helperText={""}
                                defaultValue={profiledata?.home_no}
                                CustomValue={profiledata?.home_no}
                                onInput={(event) => {
                                    handlehomenoChange(event);
                                    let Copy = {
                                        ...profiledata,
                                        home_no: event.target.value,
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
                            ></CustomTextField>
                        </div>
                        <div className="mob-email-pass">
                            <CustomDropdown
                                label="Country"
                                isDisabled={!isEditing}
                                menuItemValue="Choose Country"
                                items={countries.map((item) => item.country_name)}
                                activeItem={selectedCountry}
                                handleChange={handleCountry}
                                dropdowncss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "Poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                }}
                            />

                            <CustomDropdown
                                label="State"
                                isDisabled={!isEditing}
                                items={states.map((item) => item.state_name)}
                                activeItem={selectedState}
                                menuItemValue="Choose State"
                                handleChange={handleState}
                                dropdowncss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "Poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                }}
                            />

                            <CustomDropdown
                                label="City"
                                isDisabled={!isEditing}
                                items={cities.map((item) => item.city_name)}
                                activeItem={selectedCity}
                                menuItemValue="Choose City"
                                handleChange={handleCity} // Set `handleCity` as change handler
                                dropdowncss={{
                                    width: "349px",
                                    color: "#787579",
                                    fontFamily: "Poppins",
                                    fontSize: "10px",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                }}
                            />
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

export default ClinicProfileInformation;
