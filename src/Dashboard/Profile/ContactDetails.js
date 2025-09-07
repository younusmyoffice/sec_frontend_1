import React, { useState } from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomDropdown from "../../components/CustomDropdown/custom-dropdown";
import CustomButton from "../../components/CustomButton/custom-button";
import "./profile.scss";

const ContactDetails = () => {
    const handleSubmit = (e) => {};
    const [activeDropdown, setActiveDropdown] = useState("");
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState();
    const [country, setCountry] = useState();
    const [zip, setZip] = useState();
    const [city, setCity] = useState();
    const [street1, setStreet1] = useState();
    const [street2, setStreet2] = useState();
    const [house, setHouse] = useState();

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                className="NavBar-Box-profile"
                sx={{ display: "flex", marginLeft: 0, marginBottom: 0 }}
            >
                <NavLink to={"/patientdashboard/dashboard/profile"}>Profile Information</NavLink>
                <NavLink to={"/patientdashboard/dashboard/contact"}>Contact Details</NavLink>
                <NavLink to={"/patientdashboard/dashboard/payment"}>Payment Details</NavLink>
            </Box>
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
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Mobile No"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setMobile(event.target.value)}
                                //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Email Address"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setEmail(event.target.value)}
                                //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Country"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setCountry(event.target.value)}
                                //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                    </Box>

                    {/* ---------------------------------------Middle Box Starts------------------------------------------------ */}
                    <Box sx={{ width: "100%", display: "flex" }}>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomDropdown
                                label={"State"}
                                dropdowncss={{ width: "100%" }}
                                items={[
                                    "Select state",
                                    "Andaman and Nicobar Islands",
                                    "Andhra Pradesh",
                                    "Arunachal Pradesh",
                                    "Assam",
                                    "Bihar",
                                    "Chandigarh",
                                    "Chhattisgarh",
                                    "Dadra and Nagar Haveli",
                                    "Daman and Diu",
                                    "Delhi",
                                    "Goa",
                                    "Gujarat",
                                    "Haryana",
                                    "Himachal Pradesh",
                                    "Jammu and Kashmir",
                                    "Jharkhand",
                                    "Karnataka",
                                    "Kerala",
                                    "Ladakh",
                                    "Lakshadweep",
                                    "Madhya Pradesh",
                                    "Maharashtra",
                                    "Manipur",
                                    "Meghalaya",
                                    "Mizoram",
                                    "Nagaland",
                                    "Odisha",
                                    "Puducherry",
                                    "Punjab",
                                    "Rajasthan",
                                    "Sikkim",
                                    "Tamil Nadu",
                                    "Telangana",
                                    "Tripura",
                                    "Uttar Pradesh",
                                    "Uttarakhand",
                                    "West Bengal",
                                ]}
                                minwidthDropDown="300px"
                                activeItem={activeDropdown}
                                handleChange={(listItems) => setActiveDropdown(listItems)}
                                // dropdowncss={{ width:"300px" }}
                            />
                        </Box>

                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Zip Code"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setZip(event.target.value)}
                                //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>

                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"City"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setCity(event.target.value)}
                                //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
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
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setStreet1(event.target.value)}
                                //                                 // onChange={(event) => setMobile(event.target.value) }
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
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setStreet2(event.target.value)}
                                //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"House No"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setHouse(event.target.value)}
                                //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Button */}
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
                                // justifyContent: "center",
                                // alignItems: "center",
                                // borderRadius: "22px",
                                // padding: "8px 16px",
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

export default ContactDetails;
