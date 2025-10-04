import React, { useEffect, useState } from "react";
import { 
    Box, 
    Card, 
    CardContent, 
    Typography, 
    Grid, 
    Stack, 
    Chip,
    Paper,
    IconButton,
    Tooltip,
    Divider
} from "@mui/material";
import { NavLink } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../components/CustomButton/custom-button";
import "./profile.scss";
import axiosInstance from "../../config/axiosInstance";
import "./contactDetails.scss";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomSnackBar from "../../components/CustomSnackBar";

const ContactDetails = () => {
    const handleSubmit = (e) => {};
    const [activeDropdown, setActiveDropdown] = useState("");
    // const [mobile, setMobile] = useState();
    // const [email, setEmail] = useState();
    // const [zip, setZip] = useState();
    // const [city, setCity] = useState();
    // const [street1, setStreet1] = useState();
    // const [street2, setStreet2] = useState();
    // const [house, setHouse] = useState();
    const [profileLink, setProfileLink] = useState("");
    const [contactLink, setContactLink] = useState("");
    const [countryValues, setCountryValue] = useState([]);
    const [countryNames, setCountryNames] = useState(["Please Wait"]);
    const [isopen, setIsopen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackStatus, setSnackStatus] = useState("");    // selected country from drop down
    const [selectedCountryFromDropDown, setSelectedCountryFromDropDown] = useState([]);
    const [stateNames, setStateNames] = useState(["Please Wait"]);
    const [stateName, setStateName] = useState("");
    const [stateValue, setStateValue] = useState([]);
    const [selectCityFromDropDown, setSelectCityFromDropDown] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [citySelected, setCitySelected] = useState("");
    const [cityValues, setCityValues] = useState([]);
    const [submitDataFlag, setSubmitDataFlag] = useState(false);
    const [updateUserData, setUpdateUserData] = useState({
        email: localStorage.getItem("patient_Email"),
        country_id: null,
        state_id: null,
        city_id: null,
        street_address1: "",
        street_address2: "",
        zip_code: null,
    });
    const [isEditing, setIsEditing] = useState(false);


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
        FetchCountryNames();
        FetchStateNames();
        fetchDataProfile();
    }, []);

    const fetchDataProfile = async () => {
        try {
            const response = await axiosInstance.post(
                "/sec/patientprofile",
                JSON.stringify({
                    suid: localStorage.getItem("patient_suid"),
                }),
            );
            console.log("Patient Profile Details : ", response?.data?.response[0]);
            setUpdateUserData({
                email: localStorage.getItem("patient_Email"),
                country_id: response?.data?.response[0]?.country_id,
                state_id: response?.data?.response[0]?.state_id,
                city_id: response?.data?.response[0]?.city_id,
                street_address1: response?.data?.response[0]?.street_address1,
                street_address2: response?.data?.response[0]?.street_address2,
                zip_code: response?.data?.response[0]?.zip_code,
            });
        } catch (error) {
            console.log(error);
        }
    };

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
    // run the api call when there is change in country drop down
    useEffect(() => {
        FetchStateNames(selectedCountryFromDropDown[0]?.country_id);
    }, [selectedCountryFromDropDown]);

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
    // run the api to fetch the city details
    useEffect(() => {
        FetchCityNames(selectCityFromDropDown[0]?.state_id);
    }, [selectCityFromDropDown]);

    // -----------submit the updated data ----------------------

    const submitData = async () => {
        try {
            const response = await axiosInstance.post(
                "/sec/updatePateintProfile",
                JSON.stringify(updateUserData),
            );
            setSnackMessage("Updated Successfully");
            setSnackStatus("success");
            setIsopen(true);          
            setSubmitDataFlag(false);
        } catch (error) {
            setSnackMessage("Error");
            setSnackStatus("error");
            setIsopen(true);
            setSubmitDataFlag(false);
        }
    };

    useEffect(() => {
        if (submitDataFlag) {
            submitData();
        }
    }, [submitDataFlag]);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Box sx={{ width: "100%", padding: "24px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
            <CustomSnackBar isOpen={isopen} message={snackMessage} type={snackStatus} />
            
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
                        <LocationOnIcon sx={{ color: "#E72B4A" }} />
                        Contact Details
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Chip 
                            label={`Profile ID: SRC0001`}
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
                <Box className="NavBar-Box-profile" sx={{ display: "flex", gap: 1 }}>
                    <NavLink 
                        to={profileLink}
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
                        to={contactLink}
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
                        Contact Details
                    </NavLink>
                </Box>
            </Paper>

            {/* Edit Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
                <CustomButton
                    label={isEditing ? "Cancel Edit" : "Edit Contact Details"}
                    isTransaprent={!isEditing}
                    leftIcon={<EditIcon />}
                    buttonCss={{
                        borderRadius: "8px",
                        padding: "12px 24px",
                        fontWeight: 500,
                        border: isEditing ? "1px solid #d32f2f" : "1px solid #E72B4A",
                        color: isEditing ? "#d32f2f" : "#E72B4A"
                    }}
                    handleClick={toggleEditMode}
                />
            </Box>

            {/* Main Content Card */}
            <Card 
                elevation={0} 
                sx={{ 
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    overflow: "hidden",
                    backgroundColor: "white"
                }}
            >
                <CardContent sx={{ padding: "32px" }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        color: "#313033",
                        marginBottom: "24px"
                    }}>
                        Contact Information
                    </Typography>

                    <Stack spacing={3}>
                        {/* First Row - Email and Country */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    id="email-address"
                                    label="Email Address"
                                    defaultValue={updateUserData?.email}
                                    isDisabled={true}
                                    helperText="Email cannot be changed"
                                    isValid
                                    textcss={{
                                        width: "100%",
                                        height: "56px",
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
                            <Grid item xs={12} sm={6}>
                                <CustomDropdown
                                    label="Country"
                                    dropdowncss={{ 
                                        width: "100%",
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { border: "none" },
                                            "&:hover fieldset": { border: "none" },
                                            "&.Mui-focused fieldset": { border: "none" },
                                            borderBottom: "1px solid #e0e0e0",
                                            borderRadius: 0,
                                            height: "56px",
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
                                        "& .MuiSelect-select": {
                                            padding: "16px 14px",
                                            display: "flex",
                                            alignItems: "center",
                                        },
                                        "& .MuiSelect-icon": {
                                            color: "#666",
                                        },
                                    }}
                                    items={countryNames}
                                    isDisabled={!isEditing}
                                    activeItem={activeDropdown}
                                    handleChange={(listItems) => {
                                        setActiveDropdown(listItems);
                                        let response = countryValues.filter((country) =>
                                            country?.country_name?.includes(listItems),
                                        );
                                        console.log("Country response : ", response[0]?.country_id);
                                        setUpdateUserData({
                                            ...updateUserData,
                                            country_id: response[0]?.country_id,
                                        });
                                        setSelectedCountryFromDropDown(response);
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {/* Second Row - State and City */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <CustomDropdown
                                    label="State"
                                    dropdowncss={{ 
                                        width: "100%",
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { border: "none" },
                                            "&:hover fieldset": { border: "none" },
                                            "&.Mui-focused fieldset": { border: "none" },
                                            borderBottom: "1px solid #e0e0e0",
                                            borderRadius: 0,
                                            height: "56px",
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
                                        "& .MuiSelect-select": {
                                            padding: "16px 14px",
                                            display: "flex",
                                            alignItems: "center",
                                        },
                                        "& .MuiSelect-icon": {
                                            color: "#666",
                                        },
                                    }}
                                    items={stateNames}
                                    isDisabled={!isEditing}
                                    activeItem={stateName}
                                    handleChange={(listItems) => {
                                        let response = stateValue.filter((state) =>
                                            state?.state_name?.includes(listItems),
                                        );
                                        setUpdateUserData({
                                            ...updateUserData,
                                            state_id: response[0]?.state_id,
                                        });
                                        setSelectCityFromDropDown(response);
                                        setStateName(listItems);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomDropdown
                                    label="City"
                                    dropdowncss={{ 
                                        width: "100%",
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { border: "none" },
                                            "&:hover fieldset": { border: "none" },
                                            "&.Mui-focused fieldset": { border: "none" },
                                            borderBottom: "1px solid #e0e0e0",
                                            borderRadius: 0,
                                            height: "56px",
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
                                        "& .MuiSelect-select": {
                                            padding: "16px 14px",
                                            display: "flex",
                                            alignItems: "center",
                                        },
                                        "& .MuiSelect-icon": {
                                            color: "#666",
                                        },
                                    }}
                                    items={cityNames}
                                    isDisabled={!isEditing}
                                    activeItem={citySelected}
                                    handleChange={(listItems) => {
                                        setCitySelected(listItems);
                                        let response = cityValues.filter((city) =>
                                            city?.city_name?.includes(listItems),
                                        );
                                        setUpdateUserData({
                                            ...updateUserData,
                                            city_id: response[0]?.city_id,
                                        });
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Stack>

                    <Divider sx={{ margin: "32px 0" }} />

                    <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        color: "#313033",
                        marginBottom: "24px"
                    }}>
                        Address Information
                    </Typography>

                    <Stack spacing={3}>
                        {/* Third Row - Street Addresses and Zip Code */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <CustomTextField
                                    id="street-line1"
                                    label="Street Line 1"
                                    isDisabled={!isEditing}
                                    defaultValue={updateUserData?.street_address1}
                                    CustomValue={updateUserData?.street_address1}
                                    helperText=""
                                    isValid
                                    onChange={(event) => {
                                        setUpdateUserData({
                                            ...updateUserData,
                                            street_address1: event?.target?.value,
                                        });
                                    }}
                                    textcss={{
                                        width: "100%",
                                        height: "56px",
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
                            <Grid item xs={12} sm={4}>
                                <CustomTextField
                                    id="street-line2"
                                    label="Street Line 2"
                                    isDisabled={!isEditing}
                                    defaultValue={updateUserData?.street_address2}
                                    CustomValue={updateUserData?.street_address2}
                                    helperText=""
                                    isValid
                                    onChange={(event) => {
                                        setUpdateUserData({
                                            ...updateUserData,
                                            street_address2: event?.target?.value,
                                        });
                                    }}
                                    textcss={{
                                        width: "100%",
                                        height: "56px",
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
                            <Grid item xs={12} sm={4}>
                                <CustomTextField
                                    id="zip-code"
                                    label="Zip Code"
                                    isDisabled={!isEditing}
                                    defaultValue={updateUserData?.zip_code}
                                    CustomValue={updateUserData?.zip_code}
                                    helperText=""
                                    isValid
                                    onChange={(event) => {
                                        setUpdateUserData({
                                            ...updateUserData,
                                            zip_code: event?.target?.value,
                                        });
                                    }}
                                    textcss={{
                                        width: "100%",
                                        height: "56px",
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
                    </Stack>

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
                                label="Save Changes"
                                isTransaprent={false}
                                isDisabled={false}
                                isElevated={false}
                                handleClick={() => {
                                    setSubmitDataFlag(true);
                                    setIsEditing(false);
                                }}
                                buttonCss={{
                                    width: "180px",
                                    height: "48px",
                                    borderRadius: "8px",
                                    fontWeight: 600
                                }}
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default ContactDetails;
