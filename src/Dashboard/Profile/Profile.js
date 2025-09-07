/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import Avatar from "@mui/material/Avatar";
import CustomButton from "../../components/CustomButton/custom-button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./profile.scss";
import { NavLink } from "react-router-dom";

const Profile = () => {
    const [activeDropdown, setActiveDropdown] = useState("");

    const handleSubmit = (e) => {};

    // month and year picker
    // const [selectedDate, setSelectedDate] = useState(
    //     new Date('2014-08-18T21:11:54')
    //   );

    //   const handleDateChange = (date) => {
    //     setSelectedDate(date);
    //   };

    const [selectedDate, handleDateChange] = useState(null);

    return (
        <Box sx={{ width: "100%"}}>
            <Box className="NavBar-Box-profile" sx={{ display : "flex" , marginLeft: 0, marginBottom: 0}}>
                <NavLink to={"/patientdashboard/dashboard/profile"}>Profile Information</NavLink>
                <NavLink to={"/patientdashboard/dashboard/contact"}>Contact Details</NavLink>
                <NavLink to={"/patientdashboard/dashboard/payment"}>Payment Details</NavLink>
            </Box>

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
                            alt="Remy Sharp"
                            src="images/avatar.png"
                            sx={{ width: "100%", height: "100%" }}
                        />
                    </Box>
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
                                defaultValue={""}
                                helperText={""}
                                isValid
                                // eslint-disable-next-line no-undef
                                onChange={(event) => setMobile(event.target.value)}
                                // onChange={(event) => setMobile(event.target.value) }
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
                                defaultValue={""}
                                helperText={""}
                                isValid
                                // eslint-disable-next-line no-undef
                                onChange={(event) => setMobile(event.target.value)}
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
                                label={"Last Name"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                // eslint-disable-next-line no-undef
                                onChange={(event) => setMobile(event.target.value)}
                                // onChange={(event) => setMobile(event.target.value) }
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
                                        variant="dashed"
                                        openTo="year"
                                        views={["year", "month"]}
                                        label="Date of Birth"
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justifyContent="space-around">
                                    <DatePicker
                                        variant="inline"
                                        openTo="year"
                                        views={["year", "month"]}
                                        label="Year and Month"
                                        helperText="Start from year selection"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider> */}
                        </Box>
                    </Box>
                    {/* dropdown */}
                    <Box sx={{ display: "flex" }}>
                        <CustomDropdown
                            label={"Gender"}
                            items={["Male", "Female", "Rather Not Say"]}
                            activeItem={activeDropdown}
                            handleChange={(listItems) => setActiveDropdown(listItems)}
                            // dropdowncss={{ marginLeft: "-14%" }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", marginTop: "6%" }}>
                        <CustomButton
                            label={"Save Changes"}
                            isTransaprent={false}
                            isDisabled={false}
                            isElevated={false}
                            handleClick={handleSubmit}
                            buttonCss={{
                                width: "155px",
                                height: "41px",
                                // padding: "8px 16px",
                                // justifyContent: "center",
                                // alignItems: "center",

                                // borderRadius: "22px",
                                // marginLeft: "-70px",
                                // marginTop: "37px",
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;

// import React, { useState } from "react";

// const MyActivity = () => {
//     return (
//         <>
//             <h1>My Activity</h1>
//         </>
//     );
// };

// export default MyActivity;
