import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomTextField from "../CustomTextField";
import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import CustomDropdown from "../CustomDropdown";
import "./ClinicEditModal.scss";
import CustomRadioButton from "../CustomRadioButton";

const ClinicEditModal = () => {
    const [activeDropdown, setActiveDropdown] = useState("");
    const [openDialog1, setOpenDialog1] = useState(false);
    const [radioVal, setRadioVal] = useState(true);
    const radioValues = ["Staff", "Doctor"];
    const dropdownItems = ["item1", "item2", "item3"];
    return (
        <>
            <button
                isElevated
                onClick={() => setOpenDialog1(!openDialog1)}
                style={{
                    borderTop: "1px",
                    borderRight: "1px",
                    borderLeft: "1px",
                    borderBottom: "1px",
                    background: "white",
                    cursor: "pointer",
                }}
            >
                <EditIcon
                    style={{
                        color: "#E72B4A",
                    }}
                />
            </button>
            <CustomModal
                style={{
                    display: "flex",
                }}
                isOpen={openDialog1}
                title={
                    <Box
                        sx={{
                            border: "1px solid #E6E1E5",
                            borderTop: "1px",
                            borderRight: "1px",
                            borderLeft: "1px",
                            width: "570px",
                            height: "82px",
                            display: "flex",
                            justifycontent: "flexstart",
                        }}
                    >
                        <h2
                            style={{
                                textAlign: "left",
                                fontfamily: "poppins",
                                fontSize: "20px",
                                fontstyle: "normal",
                                fontweight: "500",
                                lineheight: "30px",
                                width: "100%",
                                height: "30px",
                            }}
                        >
                            Edit Staff
                        </h2>
                    </Box>
                }
            >
                <div
                    className="radio-container"
                    style={{
                        display: "flex",
                    }}
                >
                    <CustomRadioButton
                        label={""}
                        handleChange={({ target }) => setRadioVal(target.value)}
                        value={radioVal}
                        items={radioValues}
                        radioGroupCss={{ display: "flex", flexDirection: "row" }}
                    ></CustomRadioButton>
                </div>
                <div className="textfield-cont">
                    <div className="name-email">
                        <CustomTextField
                            label="Name"
                            helperText={""}
                            textcss={{
                                width: "349px",
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            label="E-mail"
                            helperText={""}
                            textcss={{
                                width: "349px",
                            }}
                        ></CustomTextField>
                    </div>

                    <div className="mobile-pass">
                        <CustomTextField
                            label="Mobile No"
                            helperText={""}
                            textcss={{
                                width: "349px",
                            }}
                        ></CustomTextField>
                        <CustomTextField
                            label="Create Password"
                            helperText={""}
                            textcss={{
                                width: "349px",
                            }}
                        ></CustomTextField>
                    </div>

                    <div className="confirm-pass">
                        <CustomTextField
                            label="Confirm Password"
                            helperText={""}
                            textcss={{
                                width: "349px",
                            }}
                        ></CustomTextField>
                        <CustomDropdown
                            label={"Access Level"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                            dropdowncss={{
                                width: "349px",
                            }}
                        />
                    </div>
                </div>
                <div className="btn-save">
                    <CustomButton
                        label="Save"
                        buttonCss={{
                            width: "170px",
                            height: "48px",
                            borderRadius: "25px",
                        }}
                    ></CustomButton>
                </div>
            </CustomModal>
        </>
    );
};

export default ClinicEditModal;
