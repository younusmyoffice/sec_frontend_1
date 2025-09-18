import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../components/CustomButton/custom-button";
import "./profile.scss";
import axiosInstance from "../../config/axiosInstance";
import "./contactDetails.scss";
import EditIcon from "@mui/icons-material/Edit";
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
            <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", height: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            // justifyContent: "space-between",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {/* <Box sx={{ width: "32%", padding: "1%" }}>
                            Just show don't edit the mobile
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Mobile No"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                onChange={(event) => setMobile(event.target.value)}
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box> */}
                        <Box sx={{ width: "32%", padding: "1%" }} className={"input-field-email"}>
                            {/* just show don't edit the data */}
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Email Address"}
                                defaultValue={updateUserData?.email}
                                isDisabled={true}
                                helperText={""}
                                isValid
                                // onChange={(event) => setEmail(event.target.value)}
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomDropdown
                                label={"Country"}
                                dropdowncss={{ width: "100%" }}
                                items={countryNames}
                                isDisabled={!isEditing}
                                minwidthDropDown="300px"
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
                                // dropdowncss={{ width:"300px" }}
                            />
                        </Box>
                    </Box>

                    {/* ---------------------------------------Middle Box Starts------------------------------------------------ */}
                    <Box sx={{ width: "100%", display: "flex" }}>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomDropdown
                                label={"State"}
                                dropdowncss={{ width: "100%" }}
                                items={stateNames}
                                isDisabled={!isEditing}

                                minwidthDropDown="300px"
                                activeItem={stateName}
                                handleChange={(listItems) => {
                                    let response = stateValue.filter((state) =>
                                        state?.state_name?.includes(listItems),
                                    );
                                    // console.log("State ID : " , response[0].state_id)
                                    setUpdateUserData({
                                        ...updateUserData,
                                        state_id: response[0]?.state_id,
                                    });
                                    setSelectCityFromDropDown(response);
                                    setStateName(listItems);
                                }}
                                // dropdowncss={{ width:"300px" }}
                            />
                        </Box>

                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomDropdown
                                label={"City"}
                                dropdowncss={{ width: "100%" }}
                                items={cityNames}
                                isDisabled={!isEditing}

                                minwidthDropDown="300px"
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
                                // dropdowncss={{ width:"300px" }}
                            />
                        </Box>

                        <Box sx={{ width: "32%", padding: "1%" }}></Box>
                    </Box>
                    {/* -----------------------------------------Middle Box Ends------------------------------------------ */}

                    {/* Third line inputs */}

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            // justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Street Line1"}
                                isDisabled={!isEditing}

                                defaultValue={updateUserData?.street_address1}
                                CustomValue={updateUserData?.street_address1}
                                helperText={""}
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
                            />
                        </Box>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Street Line2"}
                                isDisabled={!isEditing}

                                defaultValue={updateUserData?.street_address2}
                                CustomValue={updateUserData?.street_address2}
                                helperText={""}
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
                            />
                        </Box>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Zip Code"}
                                isDisabled={!isEditing}

                                defaultValue={updateUserData?.zip_code}
                                CustomValue={updateUserData?.zip_code}
                                helperText={""}
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
                            />
                        </Box>
                    </Box>

                    {/* Button */}
                    <Box sx={{ display: "flex", marginTop: "6%" }}>
                    {isEditing && (
                        <CustomButton
                            label={"Save Changes"}
                            isTransaprent={false}
                            isDisabled={false}
                            isElevated={false}
                            handleClick={() => {setSubmitDataFlag(true);
                                setIsEditing(false)}
                            }
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

export default ContactDetails;
