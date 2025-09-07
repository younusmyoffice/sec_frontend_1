import React, { Fragment, useState } from "react";
import profileImage from "../../../constants/DrImages/profileImage.png";
import { Box, Typography } from "@mui/material";
import { TextField } from "@mui/material";
// import "./customUpcomingCard.scss";
// import CustomButton from '../../../components/CustomButton/custom-button';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CustomModal from "../../CustomModal";
import CustomRadioButton from "../../CustomRadioButton";
import CustomButton from "../../CustomButton/custom-button";

const UpcomingCard = ({
    options,
    name,
    appointment_date,
    Package,
    onClickJoinHandler,
    profile_picture,
}) => {
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
                    <div style={{ width: "3.13981rem", height: "height: 4.71831rem" }}>
                        <div className="RequestimageContainer">
                            <Box
                                className="image-container"
                                component={"img"}
                                sx={{ width: "100%", height: "100%" }}
                                src={profile_picture}
                                alt="Profile Image"
                            ></Box>
                        </div>
                    </div>

                    {/*--------- Details Container-------- */}
                    <div style={{ marginLeft: "2%" }}>
                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                            <Typography
                                sx={{
                                    color: "#313033",
                                    fontFamily: "Poppins",
                                    fontSize: "1.125rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "1.75rem",
                                }}
                            >
                                {name}
                            </Typography>

                            <CustomButton
                                sx={{
                                    display: "inline-flex",
                                    // height: "1rem",
                                    padding: "0.5rem 1rem",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    flexShrink: "0",
                                    borderRadius: "16rem",
                                    marginLeft: "12%",
                                    height: "2.5em",
                                    marginBottom: "2%",
                                }}
                                label={Package}
                                isTransaprent={true}
                            />
                        </div>
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
                                    width: "16rem",
                                }}
                            >
                                Schedule | {appointment_date} | Attachments{" "}
                            </Typography>
                            <Box
                                component={"a"}
                                href="#"
                                sx={{
                                    color: "#E72B4A",
                                    fontFamily: "Poppins",
                                    fontSize: "0.75rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "1.125rem",
                                    letterSpacing: "0.006rem",
                                }}
                            >
                                View
                            </Box>
                        </div>
                    </div>
                </div>
                {/*------------ Button Container------------ */}
                <div className="request-button-container">
                    <div style={{ display: "flex", alignItems: "center", marginRight: "2%" }}>
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
                            }}
                            label={options}
                            isTransaprent={false}
                            handleClick={onClickJoinHandler}
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {/*---------------------- Appointments and Re-Schedule--------------------------------------------------- */}
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
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography>
                                        Are you sure. you want to cancel the appointment
                                    </Typography>
                                </Box>
                                <div style={{ marginTop: "4%" }}>
                                    <>
                                        <Box
                                            sx={{
                                                marginTop: "5%",
                                                display: "flex",
                                                flexWrap: "wrap",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
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
                                            <Box sx={{ marginTop: "5%", width: "100%" }}>
                                                <Typography>Add Note</Typography>
                                                <TextField
                                                    style={{ width: "100%", padding: "3%" }}
                                                    placeholder=" Note: Lorem ipsum dolor sit amet. Qui dolor nostrum sit
                                            eius necessitatibus id quia expedita et molestiae
                                            laborum qui nihil excepturi qui tenetur blanditiis."
                                                    multiline
                                                    rows={3}
                                                    maxRows={4}
                                                />
                                            </Box>
                                            <Box
                                                sx={{
                                                    marginTop: "6%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <CustomButton label="Done" />
                                            </Box>
                                        </Box>
                                    </>
                                </div>
                            </CustomModal>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpcomingCard;
