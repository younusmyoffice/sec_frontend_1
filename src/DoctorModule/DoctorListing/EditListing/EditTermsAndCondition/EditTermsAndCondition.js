import React, { Fragment, useCallback, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DrImage from "../../../../static/images/DrImages/drProfileImage.png";
import CustomButton from "../../../../components/CustomButton";
import CustomList from "../../../../components/CustomList";
import "./termsandcondition.scss";

const TermsAndCondition = () => {
    const [listItems, setListItems] = useState([{ name: "item1", checked: false }]);
    const handleCheckList = useCallback((updatedItem) => {
        // eslint-disable-next-line no-confusing-arrow
        const updatedItems = listItems.map((item) =>
            item.name === updatedItem.name ? updatedItem : item,
        );
        setListItems(updatedItems);
    });
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
                            Terms and Conditions
                        </Typography>
                    </div>
                    <div className="Conditions">
                        <Box
                            sx={
                                {
                                    // border:'1px solid'
                                }
                            }
                        >
                            <Typography>&#8226;Note</Typography>
                            <Typography>&#8226;Commission</Typography>
                            <Typography>&#8226;etc</Typography>
                        </Box>
                    </div>
                    <div className="Custom-Click">
                        {/* <CustomList items={listItems} handleToggle={handleCheckList} /> */}
                        <CustomList
                            items={listItems}
                            handleToggle={handleCheckList}
                            showDescription
                            maxWidth={350}
                            // showAvatar
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsAndCondition;
