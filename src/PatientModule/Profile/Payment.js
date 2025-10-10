import React, { useState } from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField/custom-text-field";
import CustomButton from "../../components/CustomButton/custom-button";
import GoogleLogo from "../../static/images/googleLogo.png";
import PayPalLogo from "../../static/images/Paypal.png";
import PhonePay from "../../static/images/PhonePe.png";
import "./profile.scss";

const Payment = () => {
    const handleSubmit = (e) => {};
    const [paypal, setPaypal] = useState("");
    const [googlepay, setGooglepay] = useState("");
    const [phonepay, setPhonepay] = useState("");
    const [cardname, setCardname] = useState("");
    const [cardno, setCardno] = useState("");
    const [expirydate, setExpirydate] = useState("");
    const [cvv, setCvv] = useState("");

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                className="NavBar-Box-profile"
                sx={{ display: "flex", marginLeft: 0, marginBottom: 0 }}
            >
                <NavLink to={"/PatientModule/dashboard/profile"}>Profile Information</NavLink>
                <NavLink to={"/PatientModule/dashboard/contact"}>Contact Details</NavLink>
                <NavLink to={"/PatientModule/dashboard/payment"}>Payment Details</NavLink>
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
                        }}
                    >
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Name on Card"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                             //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setCardname(event.target.value)}
                                //                             //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Card No"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                             //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setCardno(event.target.value)}
                                //                             //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"Expiry Date"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                             //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setExpirydate(event.target.value)}
                                //                             //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                    </Box>
                    {/* second line */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Box sx={{ width: "32%", padding: "1%" }}>
                            <CustomTextField
                                id={"standard-helperText1"}
                                label={"CVV"}
                                defaultValue={""}
                                helperText={""}
                                isValid
                                //                             //                                 // eslint-disable-next-line no-undef
                                onChange={(event) => setCvv(event.target.value)}
                                //                             //                                 // onChange={(event) => setMobile(event.target.value) }
                                textcss={{
                                    width: "100%",
                                    height: "56px",
                                }}
                            />
                        </Box>
                        {/* Button,justifyContent:"space-between" */}
                        <Box
                            sx={{
                                // marginRight: "12%",
                                display: "flex",
                                alignItems: "flex-end",
                                width: "35%",
                                // marginRight : "9%",
                                // marginTop: "2%",
                            }}
                        >
                            <CustomButton
                                label={"Add New"}
                                isTransaprent={false}
                                isDisabled={false}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "155px",
                                    height: "41px",
                                    borderRadius: "50px",
                                    marginRight: "3%",
                                }}
                            />
                            <CustomButton
                                label={"Delete"}
                                // isTransaprent={false}
                                isTransaprent
                                isDisabled={false}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "155px",
                                    height: "41px",
                                    borderRadius: "50px",
                                }}
                            />
                        </Box>
                    </Box>

                    {/* ////////////////////////////Payment .///////////////////////////// */}
                    <Box sx={{ borderTop: 1, borderTopColor: "#E6E1E5", marginTop: "5%" }}>
                        {/* <h1>hello</h1> */}
                        {/* payment input */}
                        <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "4%" }}>
                            {/* line */}
                            <Box sx={{ marginTop: "1%", marginRight: "0%" }}>
                                <img
                                    style={{ width: "38px", height: "45px" }}
                                    src={PayPalLogo}
                                    alt="phonepay"
                                    loading="lazy"
                                />
                            </Box>
                            <Box sx={{ marginRight: "1%" }}>
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"PayPal"}
                                    defaultValue={""}
                                    helperText={""}
                                    isValid
                                    //                             //                                 // eslint-disable-next-line no-undef
                                    onChange={(event) => setPaypal(event.target.value)}
                                    //                             //                                 // onChange={(event) => setMobile(event.target.value) }
                                    textcss={{
                                        width: "250px",
                                        height: "56px",
                                    }}
                                />
                            </Box>

                            <Box sx={{ marginTop: "1%", marginRight: "1%" }}>
                                <img
                                    style={{ width: "35px", height: "37px" }}
                                    src={GoogleLogo}
                                    alt="phonepay"
                                    loading="lazy"
                                />
                            </Box>
                            <Box sx={{ marginRight: "1%" }}>
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"Google Pay"}
                                    defaultValue={""}
                                    helperText={""}
                                    isValid
                                    //                             //                                 // eslint-disable-next-line no-undef
                                    onChange={(event) => setGooglepay(event.target.value)}
                                    //                             //                                 // onChange={(event) => setMobile(event.target.value) }
                                    textcss={{
                                        width: "250px",
                                        height: "56px",
                                    }}
                                />
                            </Box>
                            <Box sx={{ marginTop: "1%", marginRight: "1%" }}>
                                <img
                                    style={{ width: "35px", height: "37px" }}
                                    src={PhonePay}
                                    alt="phonepay"
                                    loading="lazy"
                                />
                            </Box>
                            <Box>
                                <CustomTextField
                                    id={"standard-helperText1"}
                                    label={"PhonePay"}
                                    defaultValue={""}
                                    helperText={""}
                                    isValid
                                    //                             //                                 // eslint-disable-next-line no-undef
                                    onChange={(event) => setPhonepay(event.target.value)}
                                    //                             //                                 // onChange={(event) => setMobile(event.target.value) }
                                    textcss={{
                                        width: "250px",
                                        height: "56px",
                                    }}
                                />
                            </Box>

                            <Box sx={{ marginTop: "4%", marginLeft: "2%" }}>
                                <CustomButton
                                    label={"Save Changes"}
                                    isTransaprent={false}
                                    isDisabled={false}
                                    isElevated={false}
                                    handleClick={handleSubmit}
                                    buttonCss={{
                                        width: "155px",
                                        height: "41px",
                                        marginRight: "5%",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Payment;
