import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import "./doctorprofileinfo.scss";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomList from "../../../components/CustomList";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import DocProf from "../../../constants/DrImages/Image02.png";
import { baseURL } from "../../../constants/const";

const DoctorPersonalInfo = () => {
    const [data, setData] = useState({
        first_name: "null",
        last_name: "null",
        middle_name: "null",
        gender: "null",
        DOB: "null",
        street_address1: "null",
        street_address2: "null",
        zip_code: "null",
        country_id: "null",
        city_id: "null",
        state_id: "null",
    });

    const fetchData = async () => {
        console.log("Entered the fetch data");
        try {
            const response = await axios.post(
                `${baseURL}/sec/Doctor/savedoctorprofile`,
                JSON.stringify(data),
            );
            console.log(response);
            // navigate("/doctordashboard/doctorListing/add", { replace: true });
        } catch (error) {
            alert("Fill the details properly", error);
            console.log(error.response);
        }
    };

    useEffect(() => {}, []);

    console.log("Data for profile details:", data);
    const [listItems, setListItems] = useState([{ name: "", checked: false }]);

    const handleCheckList = useCallback((updatedItem) => {
        // eslint-disable-next-line no-confusing-arrow
        const updatedItems = listItems.map((item) =>
            item.name === updatedItem.name ? updatedItem : item,
        );
        setListItems(updatedItems);
    });
    const dropdownItems = ["Male", "Female", "others"];
    const dropdownItems1 = ["india", "afghanistan", "pakistan", "bangladesh"];
    const [activeDropdown, setActiveDropdown] = useState("");
    const [activeDropdown1, setActiveDropdown1] = useState("");
    const [activeDropdown2, setActiveDropdown2] = useState("");
    const [cardData, setCardData] = useState([]);
    const handleDropdownChange = (item, item1, dropdownName) => {
        console.log("selected date of birth :", item, item1);
        switch (dropdownName) {
            case "dropdown1":
                setActiveDropdown(item);
                break;

            case "dropdown1":
                setActiveDropdown1(item1);
                break;

            case "dropdown2":
                setActiveDropdown2(item1);
                break;
        }

        let updatedData = {
            ...data,
            gender: item,
            country_id: item1,
        };
        setData(updatedData);
    };
    return (
        <>
            <div className="profile-container" style={{ width: "100%", height: "200vh" }}>
                <div className="Navbar-cont">
                    <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                        <NavLink to={"/patientdashboard/dashboard/explore"}>
                            Profile Information
                        </NavLink>
                        <NavLink to={"/patientdashboard/dashboard/myactivity"}>
                            Professional Details
                        </NavLink>
                    </Box>

                    <div className="prof-id">
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
                    </div>
                </div>

                <div className="edit-prof">
                    <EditIcon
                        style={{
                            color: "#E72B4A",
                        }}
                    />
                    <CustomButton
                        label="Edit Profile"
                        isTransaprent={"True"}
                        buttonCss={{
                            borderBottom: "1px ",
                            borderRight: "1px ",
                            borderLeft: "1px ",
                            borderTop: "1px",
                        }}
                    ></CustomButton>
                </div>
                <div className="info-container">
                    <div
                        className="photo-container"
                        style={{
                            marginTop: "-5rem",
                        }}
                    >
                        <Box
                            component={"img"}
                            src={DocProf}
                            sx={{
                                width: "167px",
                                height: "167px",
                                borderRadius: "80px",
                            }}
                        ></Box>
                    </div>
                    <div className="Textfield-container">
                        <div className="first-middle">
                            <CustomTextField
                                label="First Name"
                                helperText={""}
                                textcss={{
                                    width: "350px",
                                }}
                                onInput={(event) => {
                                    let Copy = {
                                        ...data,
                                        first_name: event.target.value,
                                    };
                                    console.log("first name is entered :", event.target.value);
                                    setData(Copy);
                                }}
                            ></CustomTextField>
                            <CustomTextField
                                label="Middle Name"
                                helperText={""}
                                textcss={{
                                    width: "350px",
                                }}
                                onInput={(event) => {
                                    let Copy = {
                                        ...data,
                                        middle_name: event.target.value,
                                    };
                                    console.log("first name is entered :", event.target.value);
                                    setData(Copy);
                                }}
                            ></CustomTextField>
                        </div>
                        <div className="Last-Dob">
                            <CustomTextField
                                label="Last Name"
                                helperText={""}
                                textcss={{
                                    width: "350px",
                                }}
                                onInput={(event) => {
                                    let Copy = {
                                        ...data,
                                        last_name: event.target.value,
                                    };
                                    console.log("first name is entered :", event.target.value);
                                    setData(Copy);
                                }}
                            ></CustomTextField>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        label="Date of Birth"
                                        style={{ width: "300px" }}
                                        onChange={(newValue) => {
                                            setData({
                                                ...data,
                                                DOB: `${newValue[0]?.$D}/${newValue[0]?.$M + 1}/${
                                                    newValue[0]?.$y
                                                }`,
                                            });
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="Gender">
                            <CustomDropdown
                                label={"Gender"}
                                items={dropdownItems}
                                activeItem={activeDropdown}
                                handleChange={(item) => handleDropdownChange(item, "dropdown1")}
                                dropdowncss={{
                                    width: "360px",
                                    color: "#787579",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="contact">
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
                        ContactDetails
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "100%",
                            borderBottom: "1px",
                        }}
                    ></Box>
                </div>
                <div className="contact-textfields">
                    <div className="streetlines">
                        <CustomTextField
                            label="Street Line1"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    street_address1: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            label="Street Line2"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    street_address2: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>

                        <CustomDropdown
                            label={"Country"}
                            items={dropdownItems1}
                            activeItem={activeDropdown1}
                            handleChange={(item1) => handleDropdownChange(item1, "dropdown1")}
                            dropdowncss={{
                                width: "360px",
                                color: "#787579",
                            }}
                        />
                    </div>
                    <div className="other-textfields">
                        <CustomTextField
                            label="State"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    state_id: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>

                        <CustomTextField
                            label="City"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    city_id: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            label="Zip Code"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    zip_code: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                    </div>
                </div>

                <div className="Clinic">
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
                        ClinicDetails
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "100%",
                            borderBottom: "1px",
                        }}
                    ></Box>
                </div>

                <div className="Custom-click">
                    {/* <CustomList items={listItems} handleToggle={handleCheckList} /> */}
                    <CustomList
                        items={listItems}
                        handleToggle={handleCheckList}
                        showDescription
                        maxWidth={350}
                        descriptionText="same as contact details"
                        // showAvatar
                    />
                </div>

                <div className="clinic-streets">
                    <CustomTextField
                        label="Clinic Name"
                        helperText={""}
                        textcss={{
                            width: "350px",
                        }}
                        onInput={(event) => {
                            let Copy = {
                                ...data,
                                clinic_name: event.target.value,
                            };
                            console.log("first name is entered :", event.target.value);
                            setData(Copy);
                        }}
                    ></CustomTextField>

                    <CustomTextField
                        label="Street Line1"
                        helperText={""}
                        textcss={{
                            width: "350px",
                        }}
                        onInput={(event) => {
                            let Copy = {
                                ...data,
                                street_address1: event.target.value,
                            };
                            console.log("first name is entered :", event.target.value);
                            setData(Copy);
                        }}
                    ></CustomTextField>
                    <CustomTextField
                        label="Street Line2"
                        helperText={""}
                        textcss={{
                            width: "350px",
                        }}
                        onInput={(event) => {
                            let Copy = {
                                ...data,
                                street_address2: event.target.value,
                            };
                            console.log("first name is entered :", event.target.value);
                            setData(Copy);
                        }}
                    ></CustomTextField>
                </div>

                <div className="country-state-city">
                    <CustomDropdown
                        label={"Country"}
                        items={dropdownItems1}
                        activeItem={activeDropdown2}
                        handleChange={(item1) => handleDropdownChange(item1, "dropdown2")}
                        dropdowncss={{
                            width: "360px",
                            color: "#787579",
                        }}
                    />
                    <CustomTextField
                        label="State"
                        helperText={""}
                        textcss={{
                            width: "350px",
                        }}
                        onInput={(event) => {
                            let Copy = {
                                ...data,
                                state_id: event.target.value,
                            };
                            console.log("first name is entered :", event.target.value);
                            setData(Copy);
                        }}
                    ></CustomTextField>
                    <CustomTextField
                        label="City"
                        helperText={""}
                        textcss={{
                            width: "350px",
                        }}
                        onInput={(event) => {
                            let Copy = {
                                ...data,
                                city_id: event.target.value,
                            };
                            console.log("first name is entered :", event.target.value);
                            setData(Copy);
                        }}
                    ></CustomTextField>
                </div>

                <div className="Zip">
                    <CustomTextField
                        label="Zip Code"
                        helperText={""}
                        textcss={{
                            width: "350px",
                        }}
                        onInput={(event) => {
                            let Copy = {
                                ...data,
                                zip_code: event.target.value,
                            };
                            console.log("first name is entered :", event.target.value);
                            setData(Copy);
                        }}
                    ></CustomTextField>
                </div>
                <div className="save-discard-button">
                    <CustomButton
                        label="Save changes"
                        buttonCss={{
                            width: "160px",
                            borderRadius: "10px",
                        }}
                        handleClick={() => fetchData()}
                    />
                    <CustomButton
                        label="Discard Changes"
                        isTransaprent={"true"}
                        buttonCss={{
                            width: "200px",
                            borderRadius: "10px",
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default DoctorPersonalInfo;
