import React, { Fragment, useCallback, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import DrImage from "../../../../constants/DrImages/drProfileImage.png";
import EditIcon from "@mui/icons-material/Edit";
import CustomButton from "../../../../components/CustomButton";
import CustomList from "../../../../components/CustomList";
import "./termsandcondition.scss";
import axios from "axios";
import { baseURL } from "../../../../constants/const";
import CustomTextField from "../../../../components/CustomTextField";

const TermsAndCondition = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "termandcondition");
    }, []);
    const [value, setValue] = useState([null, null]);
    const [data, setData] = useState({
        description: "some of these are my terms and conditions",
    });

    const fetchData = async () => {
        console.log("Entered the fetch data");
        try {
            const response = await axios.post(
                `${baseURL}/sec/createUpdatedoctorlisting/terms/9`,
                JSON.stringify(data),
                { Accept: "Application/json" },
            );
            console.log(response);
            // navigate("/doctordashboard/doctorListing/termandcondition", { replace: true });
        } catch (error) {
            alert("Fill the details properly", error);
            console.log(error.response);
        }
    };

    useEffect(() => {}, []);
    console.log("Data for Terms and Conditions:", data);

    const [listItems, setListItems] = useState([{ name: "item1", checked: false }]);
    const handleCheckList = useCallback((updatedItem) => {
        // eslint-disable-next-line no-confusing-arrow
        const updatedItems = listItems.map((item) =>
            item.name === updatedItem.name ? updatedItem : item,
        );
        setListItems(updatedItems);
    });

    const handleDescriptionChange = (event) => {
        // Update the description in the state
        setData({
            ...data,
            description: event.target.value,
        });
    };

    return (
        <>
            <nav className="NavBar-Box-one">
                <NavLink to={"/doctordashboard/doctorListing/listingdetails"}>
                    Listing Details
                </NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addplans"}>Add Plans</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addquestioner"}>
                    Add Questioner
                </NavLink>
                <NavLink to={"/doctordashboard/doctorListing/termandcondition"}>
                    Term & Conditions
                </NavLink>
            </nav>

            <div className="main-container">
                <div className="Doctor-detail-container">
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

                <div className="Terms-Conditions-Container">
                    <div className="terms-condition-title">
                        <Typography
                            style={{
                                color: "#313033",
                                fontfamily: "poppins",
                                fontsize: "16px",
                                fontweight: "600",
                                lineheight: "24px",
                            }}
                        >
                            Terms & Conditions
                        </Typography>
                    </div>
                    <div className="Conditions">
                        <Box
                            sx={{
                                display: "flex", // border:'1px solid'
                                flexWrap: "wrap",
                            }}
                        >
                            <div>
                                <CustomTextField helperText={""} label={""} />
                                <Typography>&#8226;{data.description}</Typography>
                                <Typography>&#8226;Note</Typography>
                                <Typography>&#8226;etc</Typography>
                            </div>
                        </Box>
                    </div>
                    <div className="Custom-Click">
                        {/* <CustomList items={listItems} handleToggle={handleCheckList} /> */}
                        <CustomList
                            edge="start"
                            items={listItems}
                            handleToggle={handleCheckList}
                            showDescription
                            maxWidth={350}
                        />
                    </div>
                </div>
                <Box sx={{ marginTop: "1%" }}>
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Save As Draft"
                        isTransaprent={true}
                    />
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Submit"
                        handleClick={() => fetchData()}
                    />
                </Box>
            </div>
        </>
    );
};

export default TermsAndCondition;
