import { Box, Typography, Button, Divider, responsiveFontSizes } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import "./doctorprofileinfo.scss";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import CustomList from "../../../components/CustomList";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import CustomButton from "../../../components/CustomButton/custom-button";
import DocProf from "../../../static/images/DrImages/Image02.png";
import { baseURL } from "../../../constants/const";
import axiosInstance from "../../../config/axiosInstance";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import CustomSnackBar from "../../../components/CustomSnackBar";
import { Description } from "@mui/icons-material";

const DoctorPersonalInfo = () => {
    const [selectedCountryFromDropDown, setSelectedCountryFromDropDown] = useState([]);
    const [countryValues, setCountryValue] = useState([]);
    const [countryNames, setCountryNames] = useState(["Please Wait"]);
    const [stateNames, setStateNames] = useState(["Please Wait"]);
    const [stateName, setStateName] = useState("");
    const [stateValue, setStateValue] = useState([]);
    const [selectCityFromDropDown, setSelectCityFromDropDown] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [citySelected, setCitySelected] = useState("");
    const [cityValues, setCityValues] = useState([]);
    const [snackBar, setSnackBar] = useState({ open: false, message: "", severity: "success" });
    const [isEditing, setIsEditing] = useState(false);
    const doctor_id = localStorage.getItem("doctor_suid");
    const [data, setData] = useState({
        suid: localStorage.getItem("doctor_suid"),
        email: localStorage.getItem("email"),
        first_name: "",
        last_name: "",
        middle_name: "",
        gender: "",
        DOB: "",
        street_address1: "",
        street_address2: "",
        zip_code: "",
        country_id: "",
        city_id: "",
        state_id: "",
        profile_picture: "",
        hospital_org: "",
        council_name: "",
        description: "",
    });

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const fetchDataProfile = async () => {
        try {
            const response = await axiosInstance.get(
                `sec/Doctor/doctorProfileDetailsbyId?doctor_id=${doctor_id}`,
            );

            if (response?.data?.response && response.data.response.length > 0) {
                const profileData = response.data.response[0];

                // Log the entire response to verify the data
                console.log("Full Profile Response:", profileData);

                setData((prevData) => ({
                    ...prevData,
                    first_name: profileData.first_name || "",
                    last_name: profileData.last_name || "",
                    middle_name: profileData.middle_name || "",
                    gender: profileData.gender || "",
                    DOB: profileData.DOB || "",
                    street_address1: profileData.street_address1 || "",
                    street_address2: profileData.street_address2 || "",
                    zip_code: profileData.zip_code || "",
                    country_id: profileData.country_id || "",
                    city_id: profileData.city_id || "",
                    state_id: profileData.state_id || "",
                    profile_picture: profileData.profile_picture || "",
                    hospital_org: profileData.hospital_org || "",
                    council_name: profileData.council_name || "",
                    description: profileData.description || "",
                }));
            } else {
                console.error("No profile data found");
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        fetchDataProfile();
        FetchCountryNames();
    }, []);

    console.log(data);
    const fetchData = async () => {
        console.log("Entered the fetch data");
        try {
            const response = await axiosInstance.post(
                `/sec/Doctor/updatedoctorprofile`,
                JSON.stringify(data),
            );
            setSnackBar({
                open: true,
                message: "Profile updated successfully!",
                severity: "success",
            });
        } catch (error) {
            console.error(error.response);
            setSnackBar({
                open: true,
                message: "Failed to update profile. Please try again.",
                severity: "error",
            });
        }
    };

    const dropdownItems = ["Male", "Female", "Others"];
    const [activeDropdown, setActiveDropdown] = useState(""); // Gender

    const handleDropdownChange = (item, dropdownName) => {
        console.log("Selected item:", item);

        switch (dropdownName) {
            case "dropdown1": // Gender dropdown
                setActiveDropdown(item);
                break;

            default:
                break;
        }

        // Update the data object
        const updatedData = {
            ...data,
            gender: dropdownName === "dropdown1" ? item : data.gender,
            country_id: dropdownName === "dropdown2" ? item : data.country_id,
        };
        setData(updatedData);
    };

    // run the api call when there is change in country drop down
    useEffect(() => {
        FetchStateNames(selectedCountryFromDropDown[0]?.country_id);
    }, [selectedCountryFromDropDown]);

    // run the api to fetch the city details
    useEffect(() => {
        FetchCityNames(selectCityFromDropDown[0]?.state_id);
    }, [selectCityFromDropDown]);

    //API call to fetch the country names
    const FetchCountryNames = async () => {
        let CountryValues = [];
        let CountryName = [];
        try {
            const response = await axiosInstance("/sec/countries");
            for (let key in response?.data?.response) {
                CountryValues.push(response?.data?.response[key]);
                CountryName.push(response?.data?.response[key].country_name);
            }
            setCountryNames(CountryName);
            setCountryValue(CountryValues);
        } catch (error) {
            console.log(error);
        }
    };

    // to fetch the state names
    const FetchStateNames = async (country_id) => {
        let StateValues = [];
        let StateName = [];
        try {
            const response = await axiosInstance(`/sec/states?country_id=${country_id}`);
            for (let key in response?.data?.response) {
                StateValues.push(response?.data?.response[key]);
                StateName.push(response?.data?.response[key].state_name);
            }
            setStateValue(StateValues);
            setStateNames(StateName);
        } catch (error) {
            console.log(error);
        }
    };

    const FetchCityNames = async (state_id) => {
        let CityValues = [];
        let cityName = [];
        try {
            const response = await axiosInstance(`/sec/cities?state_id=${state_id}`);
            console.log("response city id : ", response);
            for (let key in response?.data?.response) {
                CityValues.push(response?.data?.response[key]);
                cityName.push(response?.data?.response[key].city_name);
            }
            setCityValues(CityValues);
            setCityNames(cityName);
        } catch (error) {
            console.log(error);
        }
    };
    const [profileImage, setProfileImage] = useState(DocProf);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(",")[1]; // Extract base64 without metadata
                setProfileImage(URL.createObjectURL(file)); // For preview
                setData((prevData) => ({
                    ...prevData,
                    profile_picture: base64Data, // Store the base64 representation
                }));
            };
            reader.readAsDataURL(file); // Trigger the file reading process
        }
    };

    return (
        <>
            <div className="profile-container" style={{ width: "100%" }}>
                <CustomSnackBar
                    isOpen={snackBar.open}
                    message={snackBar.message}
                    type={snackBar.severity}
                />
                <div className="Navbar-cont">
                    <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                        <NavLink to={"/doctordashboard/doctorpersonalinfo"}>
                            Profile Information
                        </NavLink>
                        <NavLink to={"/doctordashboard/doctorprofessionalinfo"}>
                            Professional Details
                        </NavLink>
                    </Box>
                </div>

                <div className="edit-prof">
                    <EditIcon
                        style={{
                            color: "#E72B4A",
                        }}
                    />
                    <CustomButton
                        label={isEditing ? "Cancel Edit" : "Edit Profile"}
                        isTransaprent={"true"}
                        buttonCss={{
                            borderBottom: "1px",
                            borderRight: "1px",
                            borderLeft: "1px",
                            borderTop: "1px",
                        }}
                        handleClick={toggleEditMode}
                    />
                </div>
                <div className="info-container">
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
                            src={data?.profile_picture||profileImage}
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
                    <div className="Textfield-container">
                        <div className="first-middle">
                            <CustomTextField
                                defaultValue={data?.first_name}
                                CustomValue={data?.first_name}
                                label="First Name"
                                helperText={""}
                                isDisabled={!isEditing}
                                textcss={{
                                    width: "350px",
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        first_name: event.target.value,
                                    };
                                    console.log("first name is entered :", event.target.value);
                                    setData(Copy);
                                }}
                            ></CustomTextField>
                            <CustomTextField
                                defaultValue={data?.middle_name}
                                CustomValue={data?.middle_name}
                                label="Middle Name"
                                isDisabled={!isEditing}
                                helperText={""}
                                textcss={{
                                    width: "350px",
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        middle_name: event.target.value,
                                    };
                                    console.log("first name is entered :", event.target.value);
                                    setData(Copy);
                                }}
                            ></CustomTextField>
                            <CustomTextField
                                defaultValue={data?.last_name}
                                CustomValue={data?.last_name}
                                label="Last Name"
                                isDisabled={!isEditing}
                                helperText={""}
                                textcss={{
                                    width: "350px",
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        last_name: event.target.value,
                                    };
                                    console.log("first name is entered :", event.target.value);
                                    setData(Copy);
                                }}
                            ></CustomTextField>
                        </div>
                        <div className="Last-Dob">
                            <CustomDropdown
                                label="Gender"
                                isDisabled={!isEditing}
                                items={dropdownItems}
                                // activeItem={activeDropdown}
                                activeItem={data?.gender || "Select Gender"} // Default to "Select Gender" if no value is present
                                handleChange={(item) => handleDropdownChange(item, "dropdown1")}
                                dropdowncss={{
                                    width: "350px",
                                    color: isEditing ? "#000" : "#787579",
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]} isDisabled={!isEditing}>
                                    <DatePicker
                                        value={data?.DOB ? dayjs(data.DOB) : null} // Convert to Day.js object
                                        label="Date of Birth"
                                        disabled={!isEditing}
                                        style={{ width: "300px" }}
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                setData({
                                                    ...data,
                                                    DOB: newValue.format("YYYY-MM-DD"), // Use Day.js's format method
                                                });
                                            }
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="Last-Dob">
                            <CustomTextField
                                multiline={true}
                                defaultValue={data?.description}
                                CustomValue={data?.description}
                                label="Bio"
                                isDisabled={!isEditing}
                                helperText={""}
                                textcss={{
                                    width: "750px",
                                }}
                                onInput={(event) => {
                                    const Copy = {
                                        ...data,
                                        description: event.target.value,
                                    };
                                    console.log("first name is entered :", event.target.value);
                                    setData(Copy);
                                }}
                            ></CustomTextField>
                        </div>
                    </div>
                </div>
                <div className="contact">
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
                </div>
                <div className="contact-textfields">
                    <div className="streetlines">
                        <CustomTextField
                            defaultValue={data?.street_address1}
                            CustomValue={data?.street_address1}
                            label="Street Line1"
                            isDisabled={!isEditing}
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                const Copy = {
                                    ...data,
                                    street_address1: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            defaultValue={data?.street_address2}
                            CustomValue={data?.street_address2}
                            label="Street Line2"
                            isDisabled={!isEditing}
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                const Copy = {
                                    ...data,
                                    street_address2: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>

                        <CustomDropdown
                            label={"Country"}
                            isDisabled={!isEditing}
                            dropdowncss={{
                                width: "360px",
                                color: "#787579",
                            }}
                            items={countryNames}
                            minwidthDropDown="300px"
                            activeItem={activeDropdown}
                            handleChange={(listItems) => {
                                setActiveDropdown(listItems);
                                let response = countryValues.filter((country) =>
                                    country?.country_name?.includes(listItems),
                                );
                                console.log("Country response : ", response[0]?.country_id);
                                setData({
                                    ...data,
                                    country_id: response[0]?.country_id,
                                });
                                setSelectedCountryFromDropDown(response);
                            }}
                        />
                    </div>
                    <div className="other-textfields">
                        <CustomDropdown
                            label={"State"}
                            isDisabled={!isEditing}
                            dropdowncss={{ width: "100%" }}
                            items={stateNames}
                            minwidthDropDown="300px"
                            activeItem={stateName}
                            handleChange={(listItems) => {
                                let response = stateValue.filter((state) =>
                                    state?.state_name?.includes(listItems),
                                );
                                // console.log("State ID : " , response[0].state_id)
                                setData({
                                    ...data,
                                    state_id: response[0]?.state_id,
                                });
                                setSelectCityFromDropDown(response);
                                setStateName(listItems);
                            }}
                        />

                        <CustomDropdown
                            label={"City"}
                            isDisabled={!isEditing}
                            dropdowncss={{ width: "100%" }}
                            items={cityNames}
                            minwidthDropDown="300px"
                            activeItem={citySelected}
                            handleChange={(listItems) => {
                                setCitySelected(listItems);
                                let response = cityValues.filter((city) =>
                                    city?.city_name?.includes(listItems),
                                );
                                setData({
                                    ...data,
                                    city_id: response[0]?.city_id,
                                });
                            }}
                        />
                        <CustomTextField
                            defaultValue={data?.hospital_org}
                            CustomValue={data?.hospital_org}
                            label="Clinic Name"
                            isDisabled={!isEditing}
                            helperText=""
                            textcss={{ width: "100%" }}
                            value={data.hospital_org || ""}
                            onInput={(event) => {
                                const Copy = { ...data, hospital_org: event.target.value };
                                setData(Copy);
                            }}
                        />
                        <CustomTextField
                            defaultValue={data?.council_name}
                            CustomValue={data?.council_name}
                            label="State Medical Council Name"
                            isDisabled={!isEditing}
                            helperText={""}
                            textcss={{
                                width: "100%",
                            }}
                            onInput={(event) => {
                                const Copy = {
                                    ...data,
                                    council_name: event.target.value,
                                };
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            defaultValue={data?.zip_code}
                            CustomValue={data?.zip_code}
                            label="Zip Code"
                            isDisabled={!isEditing}
                            helperText={""}
                            textcss={{
                                width: "100%",
                            }}
                            onInput={(event) => {
                                const Copy = {
                                    ...data,
                                    zip_code: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                    </div>
                </div>
                <div className="save-discard-button">
                    {isEditing && (
                        <CustomButton
                            label="Save Changes"
                            buttonCss={{
                                width: "160px",
                                borderRadius: "10px",
                            }}
                            handleClick={() => {
                                fetchData();
                                setIsEditing(false);
                            }}
                        />
                    )}
                    {/* <CustomButton
                        label="Discard Changes"
                        isTransaprent={"true"}
                        buttonCss={{
                            width: "200px",
                            borderRadius: "10px",
                        }}
                    /> */}
                </div>
            </div>
        </>
    );
};

export default DoctorPersonalInfo;
