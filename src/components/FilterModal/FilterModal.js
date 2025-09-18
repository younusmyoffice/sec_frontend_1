import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomRadioButton from "../CustomRadioButton";
import CustomDropdown from "../CustomDropdown";
import CustomModalMUI from "../CustomModalMUI/CustomModalMUI";
import "./FilterModal.scss";
// import CustomTextField from "../CustomTextField";
import CustomButton from "../CustomButton";

const FilterModal = () => {
    const [activeDropdown, setActiveDropdown] = useState("");
    const [radioVal, setRadioVal] = useState(true);
    const dropdownItems = ["Staff", "Doctor", "View", "Owner"];
    const radioValues = ["Active", "In-Active"];
    return (
        <>
            <CustomModalMUI
                label="Filter"
                rightIcon={<KeyboardArrowDownIcon />}
                modalCss={{
                    position: "relative",
                    top: "35%",
                    left: "83%",
                    transform: "translate(-50%, -50%)",
                    width: 450,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    pt: 2,
                    px: 2,
                    pb: 1,
                }}
                modaltitle={
                    <>
                        <Box
                            sx={{
                                border: "1px solid #E6E1E5",
                                borderTop: "1px",
                                borderRight: "1px",
                                borderLeft: "1px",
                                width: "570px",
                                height: "50px",
                                display: "flex",
                                justifycontent: "flexstart",
                            }}
                        >
                            <h2
                                style={{
                                    textAlign: "left",
                                    fontfamily: "poppins",
                                    fontSize: "18px",
                                    fontstyle: "normal",
                                    fontweight: "500",
                                    lineheight: "30px",
                                    width: "100%",
                                    // height: "30px",
                                }}
                            >
                                Filter
                            </h2>
                        </Box>
                    </>
                }
                modalcontent={
                    <>
                        <CustomDropdown
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                            label={"Access Level"}
                            dropdowncss={{
                                width: "400px",
                            }}
                        ></CustomDropdown>
                        <div className="radio-select">
                            <CustomRadioButton
                                label={""}
                                handleChange={({ target }) => setRadioVal(target.value)}
                                value={radioVal}
                                items={radioValues}
                                radioGroupCss={{ display: "flex", flexDirection: "row" }}
                            ></CustomRadioButton>
                        </div>
                        <div className="apply-clear-bttns">
                            <CustomButton
                                label="Apply"
                                buttonCss={{
                                    width: "170px",
                                    borderRadius: "20px",
                                }}
                            ></CustomButton>

                            <CustomButton
                                label="Clear"
                                isTransaprent={"True"}
                                buttonCss={{
                                    width: "170px",
                                    borderTop: "1px",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    borderRight: "1px",
                                    borderRadius: "20px",
                                }}
                            ></CustomButton>
                        </div>
                    </>
                }
            ></CustomModalMUI>
        </>
    );
};

export default FilterModal;
