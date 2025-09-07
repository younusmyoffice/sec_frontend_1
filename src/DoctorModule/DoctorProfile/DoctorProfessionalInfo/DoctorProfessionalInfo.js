import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import "./doctorprofessionalinfo.scss";
import { NavLink, Outlet } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import CustomTextField from "../../../components/CustomTextField/custom-text-field";
import CustomButton from "../../../components/CustomButton/custom-button";
import CustomModal from "../../../components/CustomModal";
import CustomList from "../../../components/CustomList";
import MedicalImage from "../../../constants/DrImages/Medical.png";
import GovernImage from "../../../constants/DrImages/Govern.png";
import AdinImage from "../../../constants/DrImages/Adin.png";
import MainImage from "../../../constants/DrImages/main.png";

const ProfessionalDetails = () => {
    const [data, setData] = useState({
        qualification: "null",
        university_name: "null",
        start_date: "null",
        degree: "null",
        speciality_id: "null",
        state_reg_number: "null",
        country_reg_number: "null",
        reg_date: "null",
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

    console.log("Data for professional details:", data);
    const handleCheckList = useCallback((updatedItem) => {
        // eslint-disable-next-line no-confusing-arrow
        const updatedItems = listItems.map((item) =>
            item.name === updatedItem.name ? updatedItem : item,
        );
        setListItems(updatedItems);
    });

    const dropdownItems = ["department1", "department2", "department3"];
    const [activeDropdown, setActiveDropdown] = useState("");

    const handleDropdownChange = (item, dropdownName) => {
        console.log("selected specialization :", item);
        switch (dropdownName) {
            case "dropdown1":
                setActiveDropdown(item);
                break;
        }

        let updatedData = {
            ...data,
            speciality_id: item,
        };
        setData(updatedData);
    };

    const handleClick = () => {
        const [listItems, setListItems] = useState([{ name: "item1", checked: false }]);
        // Place your click event logic here
        alert("AddIcon clicked! You can perform your desired action here.");
    };
    const [openDialog1, setOpenDialog1] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [openDialog3, setOpenDialog3] = useState(false);
    const [openDialog4, setOpenDialog4] = useState(false);
    const [openDialog5, setOpenDialog5] = useState(false);
    const [openDialog6, setOpenDialog6] = useState(false);
    const [listItems, setListItems] = useState([{ name: "item1", checked: false }]);

    return (
        <>
            <Box sx={{ width: "98%", display: "flex", flexDirection: "column" }}>
                <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
                    <NavLink to={"/patientdashboard/dashboard/explore"}>
                        Profile Information
                    </NavLink>
                    <NavLink to={"/patientdashboard/dashboard/myactivity"}>
                        Professional Details
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
                        EducationDetails
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "60%",
                            borderBottom: "1px",
                        }}
                    ></Box>

                    <AddIcon
                        style={{
                            color: "#E72B4A",
                        }}
                    />
                    <div className="Edit-session">
                        <EditIcon
                            style={{
                                color: "#E72B4A",
                            }}
                        />
                        <CustomButton
                            label="Edit"
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
                    <div className="A-B-C">
                        <CustomTextField
                            label="Qualification"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    qualification: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            label="University"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
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
                                    label="Start Date"
                                    style={{ width: "300px" }}
                                    onChange={(newValue) => {
                                        setData({
                                            ...data,
                                            start_date: `${newValue[0]?.$D}/${
                                                newValue[0]?.$M + 1
                                            }/${newValue[0]?.$y}`,
                                        });
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className="deg-spe">
                        <CustomTextField
                            label="Degree"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    degree: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <CustomDropdown
                            label={"Specialization"}
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
                        ProfessionalCredentials
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "60%",
                            borderBottom: "1px",
                        }}
                    ></Box>

                    <AddIcon
                        style={{
                            color: "#E72B4A",
                        }}
                    />
                    <div className="Edit-session">
                        <EditIcon
                            style={{
                                color: "#E72B4A",
                            }}
                        />
                        <CustomButton
                            label="Edit"
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
                            label="State Registration No"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    state_reg_number: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            label="Indian Registration No"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    country_reg_number: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                    </div>
                    <div className="deg-spe">
                        <CustomTextField
                            label="Registration Date"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    reg_date: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            label="Registration Date"
                            helperText={""}
                            textcss={{
                                width: "350px",
                            }}
                            onInput={(event) => {
                                let Copy = {
                                    ...data,
                                    reg_date: event.target.value,
                                };
                                console.log("first name is entered :", event.target.value);
                                setData(Copy);
                            }}
                        ></CustomTextField>
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
                        Work Experience
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "60%",
                            borderBottom: "1px",
                        }}
                    ></Box>

                    <button
                        isElevated
                        onClick={() => setOpenDialog1(!openDialog1)}
                        style={{
                            borderBottom: "1px",
                            borderTop: "1px",
                            borderRight: "1px",
                            borderLeft: "1px",
                            cursor: "pointer",
                        }}
                    >
                        <AddIcon
                            style={{
                                color: "#E72B4A",
                            }}
                        />
                    </button>
                    <CustomModal
                        style={{
                            display: "flex",
                        }}
                        isOpen={openDialog1}
                        title={
                            <Box
                                sx={{
                                    border: "1px solid #E6E1E5",
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderLeft: "1px",
                                    width: "570px",
                                    height: "82px",
                                    display: "flex",
                                    justifycontent: "flexstart",
                                }}
                            >
                                <h2
                                    style={{
                                        textAlign: "left",
                                        fontfamily: "poppins",
                                        fontSize: "20px",
                                        fontstyle: "normal",
                                        fontweight: "500",
                                        lineheight: "30px",
                                        width: "100%",
                                        height: "30px",
                                    }}
                                >
                                    Add Experience
                                </h2>
                            </Box>
                        }
                    >
                        <div className="textfield-cont">
                            <div className="input-field">
                                <CustomTextField
                                    label="Job Title"
                                    helperText={""}
                                    textcss={{
                                        width: "250px",
                                    }}
                                ></CustomTextField>
                                <CustomTextField
                                    label="Hospital/Organization"
                                    helperText={""}
                                    textcss={{
                                        width: "250px",
                                    }}
                                ></CustomTextField>
                            </div>
                            <div className="date-picker">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker label="Start Date" style={{ width: "300px" }} />
                                    </DemoContainer>
                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker label="Start Date" style={{ width: "300px" }} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="save-btn">
                            <CustomButton
                                label="Save"
                                buttonCss={{
                                    width: "170px",
                                    height: "48px",
                                    borderRadius: "20px",
                                }}
                            ></CustomButton>
                        </div>
                    </CustomModal>
                </div>
                <div className="medical-card">
                    <Box
                        component={"img"}
                        src={MedicalImage}
                        sx={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "80px",
                        }}
                    ></Box>
                    <div className="medical-details">
                        <div className="job-title">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    // flexDirection:'column'
                                }}
                            >
                                <Typography>Job Title</Typography>

                                <div className="edit-icon">
                                    <EditIcon />
                                    <CustomButton
                                        label="Edit"
                                        isTransaprent={"True"}
                                        isElevated
                                        handleClick={() => setOpenDialog4(!openDialog4)}
                                        buttonCss={{
                                            borderBottom: "1px",
                                            borderTop: "1px",
                                            borderRight: "1px",
                                            borderLeft: "1px",
                                        }}
                                    ></CustomButton>
                                    <CustomModal
                                        style={{
                                            display: "flex",
                                        }}
                                        isOpen={openDialog4}
                                        title={
                                            <Box
                                                sx={{
                                                    border: "1px solid #E6E1E5",
                                                    borderTop: "1px",
                                                    borderRight: "1px",
                                                    borderLeft: "1px",
                                                    width: "570px",
                                                    height: "82px",
                                                    display: "flex",
                                                    justifycontent: "flexstart",
                                                }}
                                            >
                                                <h2
                                                    style={{
                                                        textAlign: "left",
                                                        fontfamily: "poppins",
                                                        fontSize: "20px",
                                                        fontstyle: "normal",
                                                        fontweight: "500",
                                                        lineheight: "30px",
                                                        width: "100%",
                                                        height: "30px",
                                                    }}
                                                >
                                                    Edit Experience
                                                </h2>
                                            </Box>
                                        }
                                    >
                                        <div className="textfield-cont">
                                            <div className="input-field">
                                                <CustomTextField
                                                    label="Job Title"
                                                    helperText={""}
                                                    textcss={{
                                                        width: "250px",
                                                    }}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    label="Hospital/Organization"
                                                    helperText={""}
                                                    textcss={{
                                                        width: "250px",
                                                    }}
                                                ></CustomTextField>
                                            </div>
                                            <div className="date-picker">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={["DatePicker"]}>
                                                        <DatePicker
                                                            label="Start Date"
                                                            style={{ width: "300px" }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>

                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={["DatePicker"]}>
                                                        <DatePicker
                                                            label="Start Date"
                                                            style={{ width: "300px" }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className="save-dlt-btn">
                                            <div className="dlt">
                                                <DeleteIcon
                                                    style={{
                                                        color: "#E72B4A",
                                                    }}
                                                />
                                                <CustomButton
                                                    label="Delete"
                                                    isTransaprent={"True"}
                                                    buttonCss={{
                                                        borderTop: "1px",
                                                        borderRight: "1px",
                                                        borderLeft: "1px",
                                                        border: "1px",
                                                    }}
                                                ></CustomButton>
                                            </div>

                                            <CustomButton
                                                label="Save"
                                                buttonCss={{
                                                    width: "170px",
                                                    height: "48px",
                                                    borderRadius: "20px",
                                                }}
                                            ></CustomButton>
                                        </div>
                                    </CustomModal>
                                </div>
                            </Box>

                            <div className="Hospital-name">
                                <Typography>Hospital/Organization name</Typography>
                            </div>
                        </div>

                        <div className="date">
                            <Typography>12-02-2019-Present</Typography>
                        </div>
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
                        Certifications
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "60%",
                            borderBottom: "1px",
                        }}
                    ></Box>

                    <AddIcon
                        style={{
                            color: "#E72B4A",
                        }}
                    />
                </div>
                <div className="medical-card">
                    <Box
                        component={"img"}
                        src={GovernImage}
                        sx={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "80px",
                        }}
                    ></Box>
                    <div className="medical-details">
                        <div className="job-title">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    // flexDirection:'column'
                                }}
                            >
                                <Typography>Degree/Specification</Typography>

                                <div className="edit-icon">
                                    <EditIcon />
                                    <CustomButton
                                        label="Edit"
                                        isTransaprent={"True"}
                                        buttonCss={{
                                            borderBottom: "1px",
                                            borderTop: "1px",
                                            borderRight: "1px",
                                            borderLeft: "1px",
                                        }}
                                    ></CustomButton>
                                </div>
                            </Box>

                            <div className="Hospital-name">
                                <Typography>Xyz Medical College</Typography>
                            </div>
                        </div>

                        <div className="date">
                            <Typography>12-02-2019-Present</Typography>
                        </div>
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
                        Award
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "60%",
                            borderBottom: "1px",
                        }}
                    ></Box>

                    <button
                        isElevated
                        onClick={() => setOpenDialog2(!openDialog2)}
                        style={{
                            borderBottom: "1px",
                            borderTop: "1px",
                            borderRight: "1px",
                            borderLeft: "1px",
                            cursor: "pointer",
                        }}
                    >
                        <AddIcon
                            style={{
                                color: "#E72B4A",
                            }}
                        />
                    </button>
                    <CustomModal
                        style={{
                            display: "flex",
                        }}
                        isOpen={openDialog2}
                        title={
                            <Box
                                sx={{
                                    border: "1px solid #E6E1E5",
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderLeft: "1px",
                                    width: "570px",
                                    height: "82px",
                                    display: "flex",
                                    justifycontent: "flexstart",
                                }}
                            >
                                <h2
                                    style={{
                                        textAlign: "left",
                                        fontfamily: "poppins",
                                        fontSize: "20px",
                                        fontstyle: "normal",
                                        fontweight: "500",
                                        lineheight: "30px",
                                        width: "100%",
                                        height: "30px",
                                    }}
                                >
                                    Add Award
                                </h2>
                            </Box>
                        }
                    >
                        <div className="textfield-cont">
                            <div className="input-field">
                                <CustomTextField
                                    label="Title"
                                    helperText={""}
                                    textcss={{
                                        width: "600px",
                                    }}
                                ></CustomTextField>
                            </div>
                            <div className="date-picker">
                                <CustomTextField
                                    label="Issuing Authority"
                                    helperText={""}
                                    textcss={{
                                        width: "250px",
                                    }}
                                ></CustomTextField>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker label="Issue Date" style={{ width: "300px" }} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="descrip">
                            <Typography>Description</Typography>
                        </div>

                        <div className="text">
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                                tellus quis sapien interdum commodo. Nunc tincidunt justo non dolor
                                bibendum, vitae elementum elit tincidunt. Pellentesque habitant
                                morbi tristique senectus et netus et malesuada fames ac turpis
                                egestas. Morbi maximus, nisl vel varius bibendum, libero metus
                                ultricies est,
                            </Typography>
                        </div>

                        <div className="save-btn1">
                            <CustomButton
                                label="Save"
                                buttonCss={{
                                    width: "170px",
                                    height: "48px",
                                    borderRadius: "20px",
                                }}
                            ></CustomButton>
                        </div>
                    </CustomModal>
                </div>
                <div className="medical-card">
                    <Box
                        component={"img"}
                        src={AdinImage}
                        sx={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "80px",
                        }}
                    ></Box>
                    <div className="medical-details">
                        <div className="job-title">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    // flexDirection:'column'
                                }}
                            >
                                <Typography>Award Title</Typography>

                                <div className="edit-icon">
                                    <EditIcon />
                                    <CustomButton
                                        label="Edit@"
                                        isTransaprent={"True"}
                                        isElevated
                                        onClick={() => setOpenDialog6(!openDialog6)}
                                        buttonCss={{
                                            borderBottom: "1px",
                                            borderTop: "1px",
                                            borderRight: "1px",
                                            borderLeft: "1px",
                                        }}
                                    ></CustomButton>
                                    <CustomModal
                                        style={{
                                            display: "flex",
                                        }}
                                        isOpen={openDialog6}
                                        title={
                                            <Box
                                                sx={{
                                                    border: "1px solid #E6E1E5",
                                                    borderTop: "1px",
                                                    borderRight: "1px",
                                                    borderLeft: "1px",
                                                    width: "570px",
                                                    height: "82px",
                                                    display: "flex",
                                                    justifycontent: "flexstart",
                                                }}
                                            >
                                                <h2
                                                    style={{
                                                        textAlign: "left",
                                                        fontfamily: "poppins",
                                                        fontSize: "20px",
                                                        fontstyle: "normal",
                                                        fontweight: "500",
                                                        lineheight: "30px",
                                                        width: "100%",
                                                        height: "30px",
                                                    }}
                                                >
                                                    Edit Award
                                                </h2>
                                            </Box>
                                        }
                                    >
                                        <div className="textfield-cont">
                                            <div className="input-field">
                                                <CustomTextField
                                                    label="Title"
                                                    helperText={""}
                                                    textcss={{
                                                        width: "600px",
                                                    }}
                                                ></CustomTextField>
                                            </div>
                                            <div className="date-picker">
                                                <CustomTextField
                                                    label="Issuing Authority"
                                                    helperText={""}
                                                    textcss={{
                                                        width: "250px",
                                                    }}
                                                ></CustomTextField>

                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={["DatePicker"]}>
                                                        <DatePicker
                                                            label="Issue Date"
                                                            style={{ width: "300px" }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className="descrip">
                                            <Typography>Description</Typography>
                                        </div>

                                        <div className="text">
                                            <Typography>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Sed ut tellus quis sapien interdum commodo.
                                                Nunc tincidunt justo non dolor bibendum, vitae
                                                elementum elit tincidunt. Pellentesque habitant
                                                morbi tristique senectus et netus et malesuada fames
                                                ac turpis egestas. Morbi maximus, nisl vel varius
                                                bibendum, libero metus ultricies est,
                                            </Typography>
                                        </div>

                                        <div className="save-dlt-btn1">
                                            <div className="dlt">
                                                <DeleteIcon
                                                    style={{
                                                        color: "#E72B4A",
                                                    }}
                                                />
                                                <CustomButton
                                                    label="Delete"
                                                    isTransaprent={"True"}
                                                    buttonCss={{
                                                        borderTop: "1px",
                                                        borderRight: "1px",
                                                        borderLeft: "1px",
                                                        border: "1px",
                                                    }}
                                                ></CustomButton>
                                            </div>

                                            <CustomButton
                                                label="Save"
                                                buttonCss={{
                                                    width: "170px",
                                                    height: "48px",
                                                    borderRadius: "20px",
                                                }}
                                            ></CustomButton>
                                        </div>
                                    </CustomModal>
                                </div>
                            </Box>

                            <div className="Hospital-name">
                                <Typography>Issuing Authority</Typography>
                            </div>
                        </div>

                        <div className="date">
                            <Typography>12-02-2019</Typography>
                        </div>

                        <div className="description">
                            <Typography>Description</Typography>
                        </div>
                        <div className="des-info">
                            <Typography>
                                The passage experienced a surge in popularity during the 1960s when
                                Letraset used it on their dry-transfer sheets, and again during the
                                90s as desktop publishers bundled the text with their software.
                                Today it's seen all around the web; on templates, websites, and
                                stock designs. Use our generator to get your own, or read on for the
                                authoritative history of lorem ipsum.
                            </Typography>
                        </div>
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
                        Licenses & Certifications
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid  #E6E1E5",
                            width: "60%",
                            borderBottom: "1px",
                        }}
                    ></Box>

                    <button
                        isElevated
                        onClick={() => setOpenDialog3(!openDialog3)}
                        style={{
                            borderBottom: "1px",
                            borderTop: "1px",
                            borderRight: "1px",
                            borderLeft: "1px",
                            cursor: "pointer",
                        }}
                    >
                        <AddIcon
                            style={{
                                color: "#E72B4A",
                            }}
                        />
                    </button>

                    <CustomModal
                        style={{
                            display: "flex",
                        }}
                        isOpen={openDialog3}
                        title={
                            <Box
                                sx={{
                                    border: "1px solid #E6E1E5",
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderLeft: "1px",
                                    width: "570px",
                                    height: "82px",
                                    display: "flex",
                                    justifycontent: "flexstart",
                                }}
                            >
                                <h2
                                    style={{
                                        textAlign: "left",
                                        fontfamily: "poppins",
                                        fontSize: "20px",
                                        fontstyle: "normal",
                                        fontweight: "500",
                                        lineheight: "30px",
                                        width: "100%",
                                        height: "30px",
                                    }}
                                >
                                    Add License or Certifications
                                </h2>
                            </Box>
                        }
                    >
                        <div className="custom-list">
                            <CustomList
                                items={listItems}
                                handleToggle={handleCheckList}
                                showDescription
                                maxWidth={350}
                                // showAvatar
                            />

                            <CustomList
                                items={listItems}
                                handleToggle={handleCheckList}
                                showDescription
                                maxWidth={350}
                                // showAvatar
                            />
                        </div>

                        <div className="textfield-cont">
                            <div className="input-field">
                                <CustomTextField
                                    label="Title"
                                    helperText={""}
                                    textcss={{
                                        width: "250px",
                                    }}
                                ></CustomTextField>
                                <CustomTextField
                                    label="Certificate No"
                                    helperText={""}
                                    textcss={{
                                        width: "250px",
                                    }}
                                ></CustomTextField>
                            </div>
                            <div className="date-picker">
                                <CustomTextField
                                    label="Issuing Authority"
                                    helperText={""}
                                    textcss={{
                                        width: "250px",
                                    }}
                                ></CustomTextField>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker label="Issue Date" style={{ width: "300px" }} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="descrip">
                            <Typography>Description</Typography>
                        </div>

                        <div className="text">
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                                tellus quis sapien interdum commodo. Nunc tincidunt justo non dolor
                                bibendum, vitae elementum elit tincidunt. Pellentesque habitant
                                morbi tristique senectus et netus et malesuada fames ac turpis
                                egestas. Morbi maximus, nisl vel varius bibendum, libero metus
                                ultricies est,
                            </Typography>
                        </div>

                        <div className="save-btn1">
                            <CustomButton
                                label="Save"
                                buttonCss={{
                                    width: "170px",
                                    height: "48px",
                                    borderRadius: "20px",
                                }}
                            ></CustomButton>
                        </div>
                    </CustomModal>
                </div>
                <div className="medical-card">
                    <Box
                        component={"img"}
                        src={MainImage}
                        sx={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "80px",
                        }}
                    ></Box>
                    <div className="medical-details">
                        <div className="job-title">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    // flexDirection:'column'
                                }}
                            >
                                <Typography>Certification/License name</Typography>

                                <div className="edit-icon">
                                    <EditIcon />
                                    <CustomButton
                                        label="Edit"
                                        isTransaprent={"True"}
                                        isElevated
                                        handleClick={() => setOpenDialog5(!openDialog5)}
                                        buttonCss={{
                                            borderBottom: "1px",
                                            borderTop: "1px",
                                            borderRight: "1px",
                                            borderLeft: "1px",
                                        }}
                                    ></CustomButton>

                                    <CustomModal
                                        style={{
                                            display: "flex",
                                        }}
                                        isOpen={openDialog5}
                                        title={
                                            <Box
                                                sx={{
                                                    border: "1px solid #E6E1E5",
                                                    borderTop: "1px",
                                                    borderRight: "1px",
                                                    borderLeft: "1px",
                                                    width: "570px",
                                                    height: "82px",
                                                    display: "flex",
                                                    justifycontent: "flexstart",
                                                }}
                                            >
                                                <h2
                                                    style={{
                                                        textAlign: "left",
                                                        fontfamily: "poppins",
                                                        fontSize: "20px",
                                                        fontstyle: "normal",
                                                        fontweight: "500",
                                                        lineheight: "30px",
                                                        width: "100%",
                                                        height: "30px",
                                                    }}
                                                >
                                                    Edit License or Certifications
                                                </h2>
                                            </Box>
                                        }
                                    >
                                        <div className="custom-list">
                                            <CustomList
                                                items={listItems}
                                                handleToggle={handleCheckList}
                                                showDescription
                                                maxWidth={350}
                                                // showAvatar
                                            />

                                            <CustomList
                                                items={listItems}
                                                handleToggle={handleCheckList}
                                                showDescription
                                                maxWidth={350}
                                                // showAvatar
                                            />
                                        </div>

                                        <div className="textfield-cont">
                                            <div className="input-field">
                                                <CustomTextField
                                                    label="Title"
                                                    helperText={""}
                                                    textcss={{
                                                        width: "250px",
                                                    }}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    label="Certificate No"
                                                    helperText={""}
                                                    textcss={{
                                                        width: "250px",
                                                    }}
                                                ></CustomTextField>
                                            </div>
                                            <div className="date-picker">
                                                <CustomTextField
                                                    label="Issuing Authority"
                                                    helperText={""}
                                                    textcss={{
                                                        width: "250px",
                                                    }}
                                                ></CustomTextField>

                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={["DatePicker"]}>
                                                        <DatePicker
                                                            label="Issue Date"
                                                            style={{ width: "300px" }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className="descrip">
                                            <Typography>Description</Typography>
                                        </div>

                                        <div className="text">
                                            <Typography>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Sed ut tellus quis sapien interdum commodo.
                                                Nunc tincidunt justo non dolor bibendum, vitae
                                                elementum elit tincidunt. Pellentesque habitant
                                                morbi tristique senectus et netus et malesuada fames
                                                ac turpis egestas. Morbi maximus, nisl vel varius
                                                bibendum, libero metus ultricies est,1234
                                            </Typography>
                                        </div>

                                        <div className="save-dlt-btn1">
                                            <div className="dlt">
                                                <DeleteIcon
                                                    style={{
                                                        color: "#E72B4A",
                                                    }}
                                                />
                                                <CustomButton
                                                    label="Delete"
                                                    isTransaprent={"True"}
                                                    buttonCss={{
                                                        borderTop: "1px",
                                                        borderRight: "1px",
                                                        borderLeft: "1px",
                                                        border: "1px",
                                                    }}
                                                ></CustomButton>
                                            </div>

                                            <CustomButton
                                                label="Save"
                                                buttonCss={{
                                                    width: "170px",
                                                    height: "48px",
                                                    borderRadius: "20px",
                                                }}
                                            ></CustomButton>
                                        </div>
                                    </CustomModal>
                                </div>
                            </Box>

                            <div className="Hospital-name">
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
                                    Issuing Authority
                                </Typography>
                                <Typography
                                    style={{
                                        color: "#787579",
                                        fontStyle: "normal",
                                        // fontSize:'15px'
                                    }}
                                >
                                    Certificate No.00123 00214
                                </Typography>
                            </div>
                        </div>

                        <div className="date1">
                            <Typography
                                style={{
                                    color: "#787579",
                                    fontStyle: "normal",
                                    // fontSize:'15px'
                                }}
                            >
                                12-02-2019
                            </Typography>
                        </div>

                        <div className="description">
                            <Typography
                                style={{
                                    color: "#787579",
                                    fontStyle: "normal",
                                    // fontSize:'15px'
                                }}
                            >
                                Description
                            </Typography>
                        </div>
                        <div className="des-info">
                            <Typography
                                style={{
                                    color: "grey",
                                    fontStyle: "normal",
                                    fontSize: "15px",
                                }}
                            >
                                The passage experienced a surge in popularity during the 1960s when
                                Letraset used it on their dry-transfer sheets, and again during the
                                90s as desktop publishers bundled the text with their software.
                                Today it's seen all around the web; on templates, websites, and
                                stock designs. Use our generator to get your own, or read on for the
                                authoritative history of lorem ipsum.
                            </Typography>
                        </div>
                    </div>
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

export default ProfessionalDetails;
