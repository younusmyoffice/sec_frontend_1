import React, { Fragment, useCallback, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import DrImage from "../../../../constants/DrImages/drProfileImage.png";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../../../../components/CustomButton";
import CustomRadioButton from "../../../../components/CustomRadioButton/custom-radio-button";
import "./addquestioner.scss";
import CustomTextField from "../../../../components/CustomTextField/custom-text-field";
// import { Settings } from "@mui/icons-material";
// import IconButton from "@mui/material";
import CustomDropdown from "../../../../components/CustomDropdown";

const AddQuestioner = () => {
    const radioValues = [""];
    const [radioVal, setRadioVal] = useState(radioValues[0]);
    // const dropdownItems = [""];
    const dropdownItems = ["Short Answer", "Long Answer", "Radio Button","Multiple Choice","Drop-down"];
    const [activeDropdown, setActiveDropdown] = useState("");
    // const [activeFabDropdown, setActiveFabDropdown] = useState(dropdownItems[0]);
    return (
        <>
            <nav className="NavBar-Box-one">
                <NavLink to={"/doctordashboard/doctorListing/listingdetails"}>Listing Details</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addplans"}>Add Plans</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addquestioner"}>Add Questioner</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/termandcondition"}>Term & Conditions</NavLink>
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
                <div className="Add-container">
                    <Typography>Add Questioner</Typography>
                    <div className="Add-addicon">
                        <Box
                            sx={{
                                // border:'1px solid',
                                marginTop: "0.5rem",
                            }}
                        >
                            <AddIcon />
                        </Box>
                        <div className="Add-btn">
                            <CustomButton
                                label="Add"
                                isTransaprent={"True"}
                                isElevated
                                handleClick={() => setOpenDialog(!openDialog)}
                                buttonCss={{
                                    display: "flex",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    borderRight: "1px",
                                    borderTop: "1px",
                                    fontfamily: "poppins",
                                    fontsize: "16px",
                                    fontstyle: "normal",
                                    fontweight: "500",
                                    lineheight: "30px",
                                    color: "#E72B4A",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </div>
                <div className="question-answer-container">
                    <div className="text-fields">
                        <CustomTextField
                            label="Question One"
                            helperText={""}
                            textcss={{
                                width: "591px",
                            }}
                        ></CustomTextField>

                        <CustomTextField
                            label="Answer"
                            helperText={""}
                            textcss={{
                                width: "591px",
                            }}
                        ></CustomTextField>
                    </div>
                    <div className="short-delete">
                        <div className="Dropdown">
                            <CustomDropdown
                                label={"Short Answer"}
                                items={dropdownItems}
                                activeItem={activeDropdown}
                                handleChange={(item) => setActiveDropdown(item)}
                                dropdowncss={{
                                    width: "230px",
                                    // height:'56px',
                                    color: "#E6E1E5",
                                }}
                            />
                        </div>
                        <div className="Dlete-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginLeft: "20%",
                                }}
                            >
                                <DeleteIcon />
                            </Box>

                            <CustomButton
                                label="Delete"
                                isTransaprent={"True"}
                                buttonCss={{
                                    width: "122px",
                                    height: "48px",
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    marginTop: "-7%",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </div>
                <div className="question-answer-container">
                    <div className="text-fields">
                        <CustomTextField
                            label="Question One"
                            helperText={""}
                            textcss={{
                                width: "591px",
                            }}
                        ></CustomTextField>

                        <CustomTextField
                            label="Answer"
                            helperText={""}
                            textcss={{
                                width: "591px",
                            }}
                        ></CustomTextField>

                         <CustomTextField
                            label=""
                            helperText={""}
                            textcss={{
                                width: "591px",
                                marginTop:'1rem'
                            }}
                        ></CustomTextField>

                    </div>
                    <div className="short-delete">
                        <div className="Dropdown">
                            <CustomDropdown
                                label={"Short Answer"}
                                items={dropdownItems}
                                activeItem={activeDropdown}
                                handleChange={(item) => setActiveDropdown(item)}
                                dropdowncss={{
                                    width: "230px",
                                    // height:'56px',
                                    color: "#E6E1E5",
                                }}
                            />
                        </div>
                        <div className="Dlete-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginLeft: "20%",
                                }}
                            >
                                <DeleteIcon />
                            </Box>

                            <CustomButton
                                label="Delete"
                                isTransaprent={"True"}
                                buttonCss={{
                                    width: "122px",
                                    height: "48px",
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    marginTop: "-7%",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </div>
                <div className="question-answer-container">
                <div className="text-fields">
                        <CustomTextField
                            label="Question One"
                            helperText={""}
                            textcss={{
                                width: "591px",
                            }}
                        ></CustomTextField>

                        <div className="option-radio">
                            <CustomRadioButton
                                label={""}
                                handleChange={({ target }) => setRadioVal(target.value)}
                                value={radioVal}
                                items={radioValues}
                                radiocss={{
                                    marginTop:'0.8rem'
                                }}
                            />
                            <CustomTextField
                                label="options1"
                                helperText={""}
                                textcss={{
                                    width: "591px",
                                }}
                            ></CustomTextField>
                        </div>
                        <div className="add-option">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginTop: "0.5rem",
                                }}
                            >
                                <AddIcon
                                    style={{
                                        color: "red",
                                    }}
                                />
                            </Box>
                            <CustomButton
                                label="Add Option"
                                isTransaprent={"True"}
                                buttonCss={{
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                }}
                            ></CustomButton>
                        </div>
                        </div>
                    <div className="short-delete3">
                        <div className="Dropdown">
                            <CustomDropdown
                                label={"Short Answer"}
                                items={dropdownItems}
                                activeItem={activeDropdown}
                                handleChange={(item) => setActiveDropdown(item)}
                                dropdowncss={{
                                    width: "230px",
                                    // height:'56px',
                                    color: "#E6E1E5",
                                }}
                            />
                        </div>
                        <div className="Dlete-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginLeft: "20%",
                                }}
                            >
                                <DeleteIcon />
                            </Box>

                            <CustomButton
                                label="Delete"
                                isTransaprent={"True"}
                                buttonCss={{
                                    width: "122px",
                                    height: "48px",
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    marginTop: "-7%",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </div>
                <div className="question-answer-container">
                    <div className="text-fields">
                        <CustomTextField
                            label="Question One"
                            helperText={""}
                            textcss={{
                                width: "591px",
                            }}
                        ></CustomTextField>

                        <div className="option-radio">
                            <CustomRadioButton
                                label={""}
                                handleChange={({ target }) => setRadioVal(target.value)}
                                value={radioVal}
                                items={radioValues}
                                radiocss={{
                                    marginTop:'0.8rem'
                                }}
                            />
                            <CustomTextField
                                label="options1"
                                helperText={""}
                                textcss={{
                                    width: "591px",
                                }}
                            ></CustomTextField>
                        </div>

                        <div className="add-option">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginTop: "0.5rem",
                                }}
                            >
                                <AddIcon
                                    style={{
                                        color: "red",
                                    }}
                                />
                            </Box>
                            <CustomButton
                                label="Add Option"
                                isTransaprent={"True"}
                                buttonCss={{
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                    <div className="short-delete4">
                        <div className="Dropdown">
                            <CustomDropdown
                                label={"Short Answer"}
                                items={dropdownItems}
                                activeItem={activeDropdown}
                                handleChange={(item) => setActiveDropdown(item)}
                                dropdowncss={{
                                    width: "230px",
                                    // height:'56px',
                                    color: "#E6E1E5",
                                }}
                            />
                        </div>
                        <div className="Dlete-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginLeft: "20%",
                                }}
                            >
                                <DeleteIcon />
                            </Box>

                            <CustomButton
                                label="Delete"
                                isTransaprent={"True"}
                                buttonCss={{
                                    width: "122px",
                                    height: "48px",
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    marginTop: "-7%",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </div>
                <div className="question-answer-container">
                    <div className="text-fields">
                        <CustomTextField
                            label="Question One"
                            helperText={""}
                            textcss={{
                                width: "591px",
                            }}
                        ></CustomTextField>
                        <CustomDropdown
                            label={"Short Answer"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                            dropdowncss={{
                                width: "300px",
                                // height:'56px',
                                color: "#E6E1E5",
                            }}
                        />
                        <div className="add-option">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginTop: "0.5rem",
                                }}
                            >
                                <AddIcon
                                    style={{
                                        color: "red",
                                    }}
                                />
                            </Box>
                            <CustomButton
                                label="Add Option"
                                isTransaprent={"True"}
                                buttonCss={{
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                    <div className="short-delete">
                        <div className="Dropdown">
                            <CustomDropdown
                                label={"Short Answer"}
                                items={dropdownItems}
                                activeItem={activeDropdown}
                                handleChange={(item) => setActiveDropdown(item)}
                                dropdowncss={{
                                    width: "230px",
                                    // height:'56px',
                                    color: "#E6E1E5",
                                }}
                            />
                        </div>
                        <div className="Dlete-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginLeft: "20%",
                                }}
                            >
                                <DeleteIcon />
                            </Box>

                            <CustomButton
                                label="Delete"
                                isTransaprent={"True"}
                                buttonCss={{
                                    width: "122px",
                                    height: "48px",
                                    borderTop: "1px",
                                    borderRight: "1px",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    marginTop: "-7%",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddQuestioner;
