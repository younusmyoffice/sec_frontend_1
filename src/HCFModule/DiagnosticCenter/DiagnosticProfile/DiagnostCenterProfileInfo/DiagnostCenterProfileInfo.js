import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CustomTextField from "../../../../components/CustomTextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DiagnosticPatientProfileInformation = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "profile");
        localStorage.setItem("path", "diagnostcenterprofileinfo");
    }, []);
    const [textField1, setTextField1] = useState("");
    const [textField2, setTextField2] = useState("");
    const [textField3, setTextField3] = useState("");
    const [value, setValue] = React.useState(null);
    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "100%", height: "90%" }}>
                <nav className="NavBar-Container-Appoinement">
                    <NavLink
                        to={
                            "/diagnostCenterDashboard/diagnostcenterprofile/diagnostcenterprofileinfo"
                        }
                    >
                        Personal Information
                    </NavLink>
                    <Typography
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
                    </Typography>
                </nav>
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
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <div className="" style={{ textAlign: "start", margin: "10px" }}>
                            <h5>Login info</h5>

                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Mobile No."}
                                placeholder={"00 0000 0000"}
                                defaultValue={textField1}
                                textcss={{ width: 280, margin: "10px" }}
                                helperText={""}
                                onChange={(value) => setTextField1(value)}
                            />
                            <CustomTextField
                                id={"standard-helperText2"}
                                label={"Email Address"}
                                placeholder={"center@domain.com"}
                                defaultValue={textField2}
                                textcss={{ width: 280, margin: "10px" }}
                                helperText={""}
                                onChange={(value) => setTextField2(value)}
                                isValid
                            />
                            <CustomTextField
                                id={"standard-helperText3"}
                                label={"Password"}
                                placeholder={"********"}
                                defaultValue={textField3}
                                textcss={{ width: 280, margin: "10px" }}
                                helperText={""}
                                onChange={(value) => setTextField3(value)}
                                isInvalid
                            />

                            <h5>HCF Information</h5>

                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Company Name"}
                                placeholder={"Xyz Center"}
                                textcss={{ width: 280, margin: "10px" }}
                                defaultValue={textField1}
                                helperText={""}
                                onChange={(value) => setTextField1(value)}
                            />
                            <CustomTextField
                                id={"standard-helperText2"}
                                label={"Bussiness Name"}
                                placeholder={"000"}
                                defaultValue={textField2}
                                helperText={""}
                                textcss={{ width: 280, margin: "10px" }}
                                onChange={(value) => setTextField2(value)}
                                isValid
                            />
                            <CustomTextField
                                id={"standard-helperText3"}
                                label={"Registration No"}
                                placeholder={"000"}
                                defaultValue={textField3}
                                helperText={""}
                                textcss={{ width: 280, margin: "10px" }}
                                onChange={(value) => setTextField3(value)}
                                isInvalid
                            />

                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <h5>Contact Information</h5>

                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Select Lane1"}
                                placeholder={"Lane1"}
                                defaultValue={textField1}
                                textcss={{ width: 280, margin: "10px" }}
                                helperText={""}
                                onChange={(value) => setTextField1(value)}
                            />
                            <CustomTextField
                                id={"standard-helperText2"}
                                label={"Select Lane2"}
                                placeholder={"Lane2"}
                                defaultValue={textField2}
                                helperText={""}
                                textcss={{ width: 280, margin: "10px" }}
                                onChange={(value) => setTextField2(value)}
                                isValid
                            />
                            <CustomTextField
                                id={"standard-helperText3"}
                                label={"Country"}
                                placeholder={"India"}
                                defaultValue={textField3}
                                textcss={{ width: 280, margin: "10px" }}
                                helperText={""}
                                onChange={(value) => setTextField3(value)}
                                isInvalid
                            />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DiagnosticPatientProfileInformation;
