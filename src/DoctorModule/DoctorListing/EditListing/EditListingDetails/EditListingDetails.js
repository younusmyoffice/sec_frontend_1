import React, { useState } from "react";
import "./listingdetails.scss";
import { NavLink } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import DrImage from "../../../../constants/DrImages/drProfileImage.png";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import EditIcon from "@mui/icons-material/Edit";
import CustomButton from "../../../../components/CustomButton/custom-button";
import CustomTextField from "../../../../components/CustomTextField";
// import CustomTextField from "../../../components/CustomTextField/custom-text-field";

function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

const ListingDetails = () => {
    const [value, setValue] = useState([null, null]);

    return (
        <>
            <nav className="NavBar-Box-one">
                <NavLink to={"/doctordashboard/doctorListing/listingdetails"}>Listing Details</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addplans"}>Add Plans</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addquestioner"}>Add Questioner</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/termandcondition"}>Term & Conditions</NavLink>
            </nav>

            <div className="main-container">
                <div className="Doctor-detail">
                    <div className="doc-profile">
                        <div className="image-container">
                            <Box
                                sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                                component={"img"}
                                src={DrImage}
                            ></Box>
                        </div>
                        <div
                            className="Detail-container"
                            sx={{
                                // border:'1px solid',
                                // height:'60%',
                                marginTop: "1%",
                            }}
                        >
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "14px",
                                    fontstyle: "normal",
                                    fontweight: "500",
                                    lineheight: "22px",
                                    letterSpacing: "0.07px",
                                }}
                            >
                                Dr.Maria Garcia
                            </Typography>
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "10px",
                                    fontstyle: "normal",
                                    fontweight: "400",
                                    lineheight: "15px",
                                    letterSpacing: "0.08px",
                                    color: "grey",
                                }}
                            >
                                Neurologist
                            </Typography>
                        </div>
                    </div>
                    <div className="Edit-btn">
                        <CustomButton
                            label="Edit Profile"
                            isTransaprent={"false"}
                            buttonCss={{
                                display: "flex",
                                borderBottom: "1px",
                                borderTop: "1px",
                                borderRight: "1px",
                                borderLeft: "1px",
                                width: "122px",
                                height: "48px",
                                padding: "8px 16px",
                                justifycontent: "flex-end",
                                alignItems: "center",
                                gap: "8px",
                                flexShrink: "0",
                                color: "red",
                            }}
                        ></CustomButton>
                    </div>
                </div>
                <Box
                    sx={{
                        position: "relative",
                        marginTop: "2rem",
                        width: "100%",
                        display: "flex",
                        alignItems: "start",
                        flexWrap: "wrap",
                        gap: "2.5rem",
                    }}
                >
                    <div
                        className="form-container"
                        style={{
                            width: "35%",
                            minWidth: "300px",
                        }}
                    >
                        <Typography
                            style={{
                                fontfamily: "Poppins",
                                fontsize: "16px",
                                fontstyle: "normal",
                                fontweight: "500",
                                lineheight: "30px",
                                width: "max-content",
                            }}
                        >
                            Add Details
                        </Typography>
                        <div>
                            <CustomTextField
                                label="Listing Name"
                                helperText={""}
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                    flexShrink: "0",
                                }}
                            ></CustomTextField>
                        </div>
                    </div>

                    <div
                        className="form-container"
                        style={{
                            width: "50%",
                            minWidth: "300px",
                        }}
                    >
                        <Typography
                            style={{
                                fontfamily: "Poppins",
                                fontsize: "16px",
                                fontstyle: "normal",
                                fontweight: "500",
                                width: "max-content",
                                lineheight: "30px",
                            }}
                        >
                            Working Days
                        </Typography>
                        <div className="Date-range-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateRangePicker
                                    disablePast
                                    value={value}
                                    maxDate={getWeeksAfter(value[0], 4)}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} variant="standard" />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} variant="standard" />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div
                        className="form-container"
                        style={{
                            width: "50%",
                            minWidth: "300px",
                        }}
                    >
                        <Typography
                            style={{
                                fontfamily: "Poppins",
                                fontsize: "16px",
                                fontstyle: "normal",
                                fontweight: "500",
                                width: "max-content",
                                lineheight: "30px",
                            }}
                        >
                            Working Time
                        </Typography>
                        <div className="Text-fields">
                            <div className="From">
                                <CustomTextField
                                    label="From"
                                    helperText={""}
                                    textcss={{
                                        width: "100%",
                                        height: "56px",
                                        flexShrink: "0",
                                    }}
                                ></CustomTextField>
                            </div>
                            <div className="To">
                                <CustomTextField
                                    label="To"
                                    helperText={""}
                                    textcss={{
                                        width: "100%",
                                        height: "56px",
                                        flexShrink: "0",
                                    }}
                                ></CustomTextField>
                            </div>
                        </div>
                    </div>
                </Box>
                <div className="About">
                    <Typography
                        style={{
                            fontfamily: "Poppins",
                            fontsize: "16px",
                            fontstyle: "normal",
                            fontweight: "500",
                            lineheight: "30px",
                            width: "max-content",
                        }}
                    >
                        About
                    </Typography>
                </div>
                <div className="data-field">
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, expedita
                        vel minus necessitatibus beatae consectetur ex ratione iusto omnis pariatur
                        ea inventore saepe hic officiis amet ab, perspiciatis sed? Laborum
                        reiciendis hic, earum odit modi dolor iste repudiandae praesentium
                        cupiditate dignissimos debitis tempore officiis asperiores aperiam?
                    </p>
                </div>
            </div>
        </>
    );
};

export default ListingDetails;
