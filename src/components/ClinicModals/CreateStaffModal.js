import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomTextField from "../CustomTextField";
import EditIcon from '@mui/icons-material/Edit';
import CustomModal from '../CustomModal';
import CustomButton from "../CustomButton";
import CustomDropdown from "../CustomDropdown";


const CreateStaffModal = () => {
    const [activeDropdown, setActiveDropdown] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const dropdownItems = ["Owner Access", "Staff Access", "View Access","Inactive"];
  return (
    <>
      <div className="staff-btn">
                <CustomButton
                label="Create Staff"
                isTransaprent={"True"}
                isElevated
                handleClick={() => setOpenDialog(!openDialog)}
                buttonCss={{
                  width:'170px',
                  borderRadius:'20px'
                }}>

                </CustomButton>
                <CustomModal
                        style={{
                            display: "flex",
                        }}
                        isOpen={openDialog}
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
                                    Create Staff
                                </h2>
                            </Box>
                        }
                    >
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
                                width:'349px'
                            }}
                        />
                            </div>
                         
                        </div>
                        <div className="btn-save">
                            <CustomButton
                                label="Create"
                                buttonCss={{
                                    width: "170px",
                                    height: "48px",
                                    borderRadius: "25px",
                                }}
                            ></CustomButton>
                        </div>
                    </CustomModal>
              </div>
    </>
  )
}

export default CreateStaffModal