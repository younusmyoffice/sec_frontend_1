import { Box, Typography } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CustomButton from "../../../../components/CustomButton";
import CustomTextField from "../../../../components/CustomTextField";
import "./clinicprofileinformation.scss";
const ClinicProfileInformation = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "profile");
        localStorage.setItem("path", "profileinformation");
    }, []);
    return (
        <>
            <div className="profile-container">
                <div className="navlink-btn">
                    <div className="nav-link">
                        <nav className="NavBar-Container-Appoinement">
                            <NavLink to={"/clinicDashboard/clinicprofile/profileinformation"}>
                                Profile Information
                            </NavLink>
                        </nav>
                    </div>
                    <div className="prof-id">
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
                        <div className="login-box">
                            <Typography>LoginInfo</Typography>
                            <div className="center-line"></div>
                            <div className="edit-btn">
                                <EditIcon
                                    style={{
                                        color: "#E72B4A",
                                    }}
                                />
                                <CustomButton
                                    label="EditProfile"
                                    isTransaprent={"True"}
                                    buttonCss={{
                                        borderTop: "1px",
                                        borderBottom: "1px",
                                        borderRight: "1px",
                                        borderLeft: "1px",
                                    }}
                                ></CustomButton>
                            </div>
                        </div>

                        <div className="mob-email-pass">
                            <CustomTextField
                                label="Mobile"
                                helperText={""}
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
                                label="E-Mail"
                                helperText={""}
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
                                label="Password"
                                helperText={""}
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
                        <div className="HCF-box">
                            <Typography>HCFInformation</Typography>
                            <div className="center-line1"></div>
                        </div>

                        <div className="mob-email-pass">
                            <CustomTextField
                                label="Company Name"
                                helperText={""}
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
                                helperText={""}
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
                                label="Registration No"
                                helperText={""}
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

                        <div className="Reg-date1">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        label="Registration Date"
                                        style={{ width: "290px" }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        <div className="HCF-box">
                            <Typography>ContactInformation</Typography>
                            <div className="center-line1"></div>
                        </div>

                        <div className="mob-email-pass">
                            <CustomTextField
                                label="Street Line1"
                                helperText={""}
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
                                helperText={""}
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
                                label="Country"
                                helperText={""}
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
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default ClinicProfileInformation;
