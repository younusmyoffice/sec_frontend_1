import React, { Fragment, useState } from "react";
import profileImage from "../../../static/images/DrImages/profileImage.png";

import { Box, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import "./CardRequest.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import CustomModal from '../../../custom-modal';
import DownloadIcon from "@mui/icons-material/Download";
import { makeStyles } from "@mui/styles";
import CustomRadioButton from "../../CustomRadioButton";
import CustomModal from "../../CustomModal";
import GroupIcon from "../../../static/images/DrImages/GroupIcon.svg";
import CustomButton from "../../CustomButton/custom-button";

const CardRequest = ({ options, name, appointment_date, profile_picture, onClickHandler }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenDialogCancle(false);
        setOpenDialogReschedule(false);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openDialogCancle, setOpenDialogCancle] = useState(false);
    const [openDialogCancle1, setOpenDialogCancle1] = useState(false);
    const [openDialogReschedule, setOpenDialogReschedule] = useState(false);

    const radioValues = [
        "I have a schedule clash",
        "I am not available at the schedule",
        "Reason3",
        "Reason4",
        "Reason5",
    ];
    const [radioVal, setRadioVal] = React.useState(radioValues[0]);
    return (
        <>
            <div className="Request-main-container1">
                <div className="Request-inner-container1">
                    {/* -----Image Container-------- */}
                    <div className="request-image-wrapper">
                        <div className="RequestimageContainer">
                            <Box
                                className="image-container"
                                component={"img"}
                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                src={profile_picture || profileImage}
                                alt="Profile Image"
                                onError={(e) => {
                                    e.target.src = profileImage;
                                }}
                            />
                        </div>
                    </div>

                    {/* --------- Details Container-------- */}
                    <div className="request-details-wrapper">
                        <Typography
                            className="request-patient-name"
                            sx={{
                                color: "#313033",
                                fontFamily: "Poppins",
                                fontSize: "1.125rem",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "1.75rem",
                                marginBottom: "0.5rem",
                            }}
                        >
                            {name || "Patient Name"}
                        </Typography>
                        <div className="card-details-container">
                            <Typography
                                sx={{
                                    color: "#787579",
                                    fontFamily: "Poppins",
                                    fontSize: "0.75rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "1.125rem",
                                    letterSpacing: "0.006rem",
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >
                                Schedule | {appointment_date || "N/A"} | Attachments
                            </Typography>
                            <Box
                                component={"a"}
                                href="#"
                                className="view-link"
                                sx={{
                                    color: "#E72B4A",
                                    fontFamily: "Poppins",
                                    fontSize: "0.75rem",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "1.125rem",
                                    letterSpacing: "0.006rem",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "color 0.2s ease",
                                    "&:hover": {
                                        color: "#c41d37",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                View
                            </Box>
                        </div>
                    </div>
                </div>
                {/* ------------ Button Container------------ */}
                <div className="request-button-container">
                    <div className="request-button-wrapper">
                        <CustomButton
                            buttonCss={{
                                display: "flex",
                                width: "9.3125rem",
                                height: "2.5rem",
                                padding: "0.5rem 1rem",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.5rem",
                                flexShrink: "0",
                                borderRadius: "6.25rem",
                                fontFamily: "Poppins",
                                fontWeight: "500",
                                transition: "all 0.2s ease",
                            }}
                            label={options}
                            isTransaprent={false}
                            handleClick={onClickHandler}
                        />
                    </div>
                    <div className="request-menu-wrapper">
                        <MoreHorizIcon
                            className="request-menu-icon"
                            sx={{
                                cursor: "pointer",
                                color: "#787579",
                                border: "1px solid #E6E1E5",
                                borderRadius: "50%",
                                padding: "0.5rem",
                                width: "2rem",
                                height: "2rem",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                    borderColor: "#E72B4A",
                                    color: "#E72B4A",
                                },
                            }}
                            onClick={handleClick}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {/* ---------------------- Appointments and Re-Schedule--------------------------------------------------- */}
                            <MenuItem onClick={() => setOpenDialogCancle1(!openDialogCancle1)}>
                                View Details
                            </MenuItem>
                            <CustomModal
                                isOpen={openDialogCancle1}
                                conditionOpen={setOpenDialogCancle1}
                                maxWidth="lg"
                                class_name="patient-details-modal-wrapper"
                                title={
                                    <Box
                                        className="modal-title-container"
                                        sx={{
                                            borderBottom: "1px solid #E6E1E5",
                                            width: "100%",
                                            padding: "1.5rem",
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            position: "relative",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "Poppins",
                                                fontSize: "1.25rem",
                                                fontStyle: "normal",
                                                fontWeight: "600",
                                                lineHeight: "1.875rem",
                                                color: "#313033",
                                            }}
                                        >
                                            Patient Details
                                        </Typography>
                                    </Box>
                                }
                            >
                                <Box 
                                    sx={{ 
                                        padding: "1.5rem",
                                        maxHeight: "calc(90vh - 140px)",
                                        overflowY: "auto",
                                        backgroundColor: "#ffffff",
                                    }}
                                >
                                    {/* Patient Details Section */}
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins",
                                            fontSize: "1rem",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            lineHeight: "1.5rem",
                                            color: "#313033",
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        Patient Details
                                    </Typography>
                                    <Box className="patient-details-grid">
                                        <Box className="patient-detail-item">
                                            <Typography
                                                sx={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.75rem",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    lineHeight: "1.125rem",
                                                    letterSpacing: "0.006rem",
                                                    color: "#787579",
                                                    marginBottom: "0.25rem",
                                                }}
                                            >
                                                Name
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "500",
                                                    color: "#313033",
                                                }}
                                            >
                                                sofia sindrella SHG
                                            </Typography>
                                        </Box>
                                        <Box className="patient-detail-item">
                                            <Typography
                                                sx={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.75rem",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    lineHeight: "1.125rem",
                                                    letterSpacing: "0.006rem",
                                                    color: "#787579",
                                                    marginBottom: "0.25rem",
                                                }}
                                            >
                                                Age
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "500",
                                                    color: "#313033",
                                                }}
                                            >
                                                8
                                            </Typography>
                                        </Box>
                                        <Box className="patient-detail-item">
                                            <Typography
                                                sx={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.75rem",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    lineHeight: "1.125rem",
                                                    letterSpacing: "0.006rem",
                                                    color: "#787579",
                                                    marginBottom: "0.25rem",
                                                }}
                                            >
                                                Gender
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "500",
                                                    color: "#313033",
                                                }}
                                            >
                                                female
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            borderTop: "1px solid #E6E1E5",
                                            margin: "1.5rem 0",
                                        }}
                                    />
                                    {/* Attached Files Section */}
                                    <Box className="file-section">
                                        <Typography
                                            sx={{
                                                fontFamily: "Poppins",
                                                fontSize: "1rem",
                                                fontStyle: "normal",
                                                fontWeight: "600",
                                                lineHeight: "1.5rem",
                                                color: "#313033",
                                                marginBottom: "1rem",
                                            }}
                                        >
                                            Attached files
                                        </Typography>
                                        <Box className="file-name-label">
                                            <Typography
                                                sx={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.75rem",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    lineHeight: "1.125rem",
                                                    letterSpacing: "0.006rem",
                                                    color: "#787579",
                                                    marginBottom: "0.5rem",
                                                }}
                                            >
                                                File name
                                            </Typography>
                                        </Box>
                                        <Box className="file-actions-row">
                                            <Typography
                                                sx={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "500",
                                                    color: "#313033",
                                                    flex: 1,
                                                }}
                                            >
                                                ChatGPT Image Oct 30, 2025, 05_06_02 PM.png
                                            </Typography>
                                            <Box className="file-actions">
                                                <Typography
                                                    component="a"
                                                    href="#"
                                                    sx={{
                                                        fontFamily: "Poppins",
                                                        fontSize: "0.75rem",
                                                        fontWeight: "500",
                                                        color: "#E72B4A",
                                                        textDecoration: "none",
                                                        marginRight: "1rem",
                                                        cursor: "pointer",
                                                        "&:hover": {
                                                            textDecoration: "underline",
                                                        },
                                                    }}
                                                >
                                                    view
                                                </Typography>
                                                <Box className="download-button-wrapper">
                                                    <DownloadIcon
                                                        sx={{
                                                            color: "#E72B4A",
                                                            fontSize: "1rem",
                                                            marginRight: "0.25rem",
                                                        }}
                                                    />
                                                    <Typography
                                                        component="button"
                                                        sx={{
                                                            fontFamily: "Poppins",
                                                            fontSize: "0.75rem",
                                                            fontWeight: "500",
                                                            color: "#E72B4A",
                                                            border: "none",
                                                            background: "transparent",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            padding: 0,
                                                            "&:hover": {
                                                                opacity: 0.8,
                                                            },
                                                        }}
                                                    >
                                                        Download
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            borderTop: "1px solid #E6E1E5",
                                            margin: "1.5rem 0",
                                        }}
                                    />
                                    {/* Questions Details Section */}
                                    <Box className="questions-section">
                                        <Typography
                                            sx={{
                                                fontFamily: "Poppins",
                                                fontSize: "1rem",
                                                fontStyle: "normal",
                                                fontWeight: "600",
                                                lineHeight: "1.5rem",
                                                color: "#313033",
                                                marginBottom: "1rem",
                                            }}
                                        >
                                            Questions Details
                                        </Typography>
                                        <Box className="questions-grid">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <Box key={num} className="question-item">
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Poppins",
                                                            fontSize: "0.75rem",
                                                            fontStyle: "normal",
                                                            fontWeight: "400",
                                                            lineHeight: "1.125rem",
                                                            letterSpacing: "0.006rem",
                                                            color: "#787579",
                                                            marginBottom: "0.25rem",
                                                        }}
                                                    >
                                                        Question {num}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Poppins",
                                                            fontSize: "0.875rem",
                                                            fontWeight: "500",
                                                            color: "#313033",
                                                        }}
                                                    >
                                                        {num <= 2 ? "Low" : "answer"}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </CustomModal>
                            <MenuItem onClick={() => setOpenDialogCancle(!openDialogCancle)}>
                                Reject
                            </MenuItem>
                            <CustomModal
                                isOpen={openDialogCancle}
                                title={"Reject Appointment Request"}
                                footer={
                                    <Fragment>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        ></Box>
                                    </Fragment>
                                }
                            >
                                <Box sx={{ textAlign: "center", padding: "1rem 0" }}>
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins",
                                            fontSize: "1rem",
                                            fontWeight: "400",
                                            color: "#313033",
                                            lineHeight: "1.5rem",
                                        }}
                                    >
                                        Are you sure you want to cancel the appointment?
                                    </Typography>
                                </Box>
                                <Box sx={{ marginTop: "2rem", padding: "0 1.5rem 1.5rem" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "Poppins",
                                                fontWeight: "600",
                                                fontSize: "1rem",
                                                lineHeight: "1.5rem",
                                                color: "#313033",
                                                marginBottom: "1rem",
                                            }}
                                        >
                                            Reason For Rejection
                                        </Typography>
                                        <CustomRadioButton
                                            label={""}
                                            handleChange={({ target }) =>
                                                setRadioVal(target.value)
                                            }
                                            value={radioVal}
                                            items={radioValues}
                                        />
                                        <Box sx={{ marginTop: "2rem", width: "100%" }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "500",
                                                    color: "#313033",
                                                    marginBottom: "0.5rem",
                                                }}
                                            >
                                                Add Note
                                            </Typography>
                                            <TextField
                                                sx={{ 
                                                    width: "100%",
                                                    "& .MuiOutlinedInput-root": {
                                                        fontFamily: "Poppins",
                                                    }
                                                }}
                                                placeholder="Note: Lorem ipsum dolor sit amet. Qui dolor nostrum sit eius necessitatibus id quia expedita et molestiae laborum qui nihil excepturi qui tenetur blanditiis."
                                                multiline
                                                rows={3}
                                                maxRows={4}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                marginTop: "2rem",
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: "1rem",
                                            }}
                                        >
                                            <CustomButton 
                                                label="Cancel"
                                                isTransaprent={true}
                                                buttonCss={{
                                                    fontFamily: "Poppins",
                                                    border: "1px solid #E6E1E5",
                                                    color: "#313033",
                                                }}
                                                handleClick={handleClose}
                                            />
                                            <CustomButton 
                                                label="Done"
                                                buttonCss={{
                                                    fontFamily: "Poppins",
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </CustomModal>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardRequest;
