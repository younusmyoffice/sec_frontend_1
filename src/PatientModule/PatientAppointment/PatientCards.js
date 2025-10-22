import { Box, Pagination, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./NavBar-Appointment.scss";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import CustomModal from "../../components/CustomModal/custom-modal";
import RescheduleAppointmentSlider from "./AppointmentSlider/RescheduleAppointmentSlider/RescheduleAppointmentSlider";
import CancelAppointmentSlider from "./AppointmentSlider/CancleAppointment/CancleAppointmentSlider";
import CustomButton from "../../components/CustomButton/custom-button";
import { LeaveAReview } from "./UpComing/CompletedModal/LeaveAReviewModal";
import BookAppointmentModal from "../DrDetailsCard/BookingAppointmentModal";
import axiosInstance from "../../config/axiosInstance";
import { getProfileImageSrc } from "../../utils/imageUtils";

export const AppointmentNavbar = () => {
    return (
        <nav className="NavBar-Container-Appoinement">
            <NavLink to={"/patientDashboard/appointment/upcoming"}>Upcoming</NavLink>
            <NavLink to={"/patientDashboard/appointment/completed"}>Completed</NavLink>
            <NavLink to={"/patientDashboard/appointment/cancelled"}>Cancelled</NavLink>
            <NavLink to={"/patientDashboard/appointment/chats"}>Chats</NavLink>
        </nav>
    );
};

export const CancelledCard = ({ data, DrImage }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                borderBottom: "1px solid #E6E1E5",
            }}
        >
            {/* Image tag */}
            <Box
                sx={{
                    width: "143px",
                    height: "143px",
                    padding: "1%",
                    borderRadius: "8px",
                }}
            >
                <Box
                    sx={{
                        borderRadius: "8px",
                        width: "100%",
                        height: "100%",
                    }}
                    component={"img"}
                    src={getProfileImageSrc(DrImage, DrImage)}
                ></Box>
            </Box>
            {/* card content */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "2%",
                }}
            >
                <Typography>
                    {`${data?.first_name} ${data?.middle_name} ${data?.last_name}`}{" "}
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "5%",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "18px",
                            letterSpacing: "0.096px",
                        }}
                    >
                        {data?.plan_name}
                    </Typography>
                    <CustomButton
                        buttonCss={{
                            marginLeft: "10%",
                            borderRadius: "50px",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            height: "32px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "22px",
                        }}
                        isTransaprent={true}
                        label={data?.status}
                    ></CustomButton>
                </Box>
                <Typography
                    sx={{
                        color: "#313033",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "18px",
                        letterSpacing: "0.096px",
                        marginTop: "15%",
                    }}
                >
                    {data?.appointment_date
                        ? `${data.appointment_date.split("T")[0]}`
                        : "No Date Available"}
                    | Attached Reports: {data?.report_name || "None"}
                </Typography>
            </Box>
        </Box>
    );
};

export const PaginationCard = () => {
    return (
        <Box
            sx={{
                position: "relative",
                bottom: 0,
                marginBottom: "2%",
                width: "95%",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography sx={{ marginTop: "20%" }}>Page 1 of 1</Typography>
                </Box>
                <Box
                    sx={{
                        marginLeft: "0%",
                        // marginTop: "1%",
                    }}
                >
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </Box>
            </Box>
        </Box>
    );
};

export const CompletedCard = ({ data, DrImage, pid ,did,aid}) => {
    console.log(data)
    const [openLeaveReview, setOpenLeaveReview] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    console.log("Complted card data :  :  = = ", data);
    return (
        <Box sx={{ display: "flex" }}>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    borderBottom: "1px solid #E6E1E5",
                }}
            >
                {/* Image tag */}
                <Box
                    sx={{
                        width: "143px",
                        height: "143px",
                        padding: "1%",
                        borderRadius: "8px",
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: "8px",
                            width: "100%",
                            height: "100%",
                        }}
                        component={"img"}
                        src={getProfileImageSrc(DrImage, DrImage)}
                    ></Box>
                </Box>
                {/* card content */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "2%",
                    }}
                >
                    <Typography>{`${data?.first_name} ${data?.middle_name} ${data?.last_name}`}</Typography>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "5%",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#313033",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "18px",
                                letterSpacing: "0.096px",
                            }}
                        >
                            {data?.plan_name}
                        </Typography>
                        <CustomButton
                            buttonCss={{
                                marginLeft: "10%",
                                borderRadius: "50px",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                height: "32px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "22px",
                            }}
                            isTransaprent={true}
                            label="Completed"
                        ></CustomButton>
                    </Box>
                    <Typography
                        sx={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "18px",
                            letterSpacing: "0.096px",
                            marginTop: "15%",
                        }}
                    >
                        {data?.appointment_date} | Attached Reports:{data?.report_name}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "2%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <CustomButton
                        buttonCss={{
                            marginLeft: "10%",
                            // marginTop: "-6%",
                            borderRadius: "50px",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            width: "149px",
                            height: "48px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "22px",
                        }}
                        handleClick={() => setOpenLeaveReview(!openLeaveReview)}
                        isTransaprent={true}
                        label="Leave a Review"
                    ></CustomButton>
                    <CustomModal
                        isOpen={openLeaveReview}
                        conditionOpen={setOpenLeaveReview}
                        title={"Review"}
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
                        <Box>
                            <LeaveAReview
                                pid={pid}
                                did={did}
                                aid={aid}
                            />
                        </Box>
                    </CustomModal>
                </Box>
                <CustomButton
                    buttonCss={{
                        marginLeft: "10%",
                        // marginTop: "-6%",
                        borderRadius: "50px",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        width: "149px",
                        height: "48px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "22px",
                    }}
                    isTransaprent={false}
                    label="Book Again"
                    handleClick={() => setOpenDialog(!openDialog)}
                ></CustomButton>
                <CustomModal
                    isOpen={openDialog}
                    title={"Book Appointment"}
                    conditionOpen={setOpenDialog}
                    footer={
                        <Fragment>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {/* <CustomButton
                                            label="Next"
                                            handleClick={() =>
                                                setPatientDetails(!openPatientDetails)
                                            }
                                        /> */}
                            </Box>
                        </Fragment>
                    }
                >
                    <Box>
                        <BookAppointmentModal drID={did}
                                aid={aid} />
                    </Box>
                </CustomModal>
            </Box>
        </Box>
    );
};

export const UpcomingCard = ({ data, DrImage, label, isDisabled, path, changeFlagState }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenDialogCancle(false);
        setOpenDialogReschedule(false);
    };
    const navigate = useNavigate();
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openDialogCancle, setOpenDialogCancle] = useState(false);
    const [openDialogReschedule, setOpenDialogReschedule] = useState(false);

    const JoinAppointment = async () => {
        navigate(path.join)
    };

    return (
        <Box sx={{ width: "100%", display: "flex" }}>
            <Box
                sx={{
                    width: "100%",
                    // height: "100%",
                    display: "flex",
                    borderBottom: "1px solid #E6E1E5",
                }}
            >
                {/* Image tag */}
                <Box
                    sx={{
                        width: "143px",
                        height: "143px",
                        padding: "1%",
                        borderRadius: "8px",
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: "8px",
                            width: "100%",
                            height: "100%",
                        }}
                        component={"img"}
                        src={getProfileImageSrc(DrImage, DrImage)}
                    ></Box>
                </Box>
                {/* card content */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "2%",
                    }}
                >
                    <Typography>{`${data?.first_name} ${data?.middle_name} ${data?.last_name}`}</Typography>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "5%",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#313033",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "18px",
                                letterSpacing: "0.096px",
                            }}
                        >
                            {data?.plan_name}
                        </Typography>
                        <CustomButton
                            buttonCss={{
                                marginLeft: "10%",
                                borderRadius: "50px",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                height: "32px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "22px",
                            }}
                            isTransaprent={true}
                            label={data?.status}
                            className={"upcomingButton"}
                        ></CustomButton>
                    </Box>
                    <Typography
                        sx={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "18px",
                            letterSpacing: "0.096px",
                            marginTop: "15%",
                        }}
                    >
                        {data?.appointment_date
                            ? `${data.appointment_date.split("T")[0]} | Attached Reports: ${
                                  data?.report_name || "No Reports"
                              }`
                            : `No Appointment Date | Attached Reports: ${
                                  data?.report_name || "No Reports"
                              }`}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}
            >
                <div style={{ width: "fit-content" }}>
                    <MoreHorizIcon
                        sx={{
                            cursor: "pointer",
                            color: "#3d403e",
                            border: "1px solid #3d403e",
                            borderRadius: "50px",
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
                        <MenuItem onClick={() => setOpenDialogCancle(!openDialogCancle)}>
                            Cancle
                        </MenuItem>
                        <CustomModal
                            isOpen={openDialogCancle}
                            title={"Book Appointment"}
                            conditionOpen={setOpenDialogCancle}
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
                            <Box>
                                <CancelAppointmentSlider
                                    path={path.reject}
                                    data={data}
                                    changeFlagState={changeFlagState}
                                />
                            </Box>
                        </CustomModal>
                        {data?.status === "booked" && (
                            <MenuItem
                                onClick={() => setOpenDialogReschedule(!openDialogReschedule)}
                            >
                                Re-Schedule
                            </MenuItem>
                        )}

                        <CustomModal
                            isOpen={openDialogReschedule}
                            title={"Book Appointment"}
                            conditionOpen={setOpenDialogReschedule}
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
                            <Box>
                                <RescheduleAppointmentSlider
                                    path={path.rescheduled}
                                    data={data}
                                    changeFlagState={changeFlagState}
                                />
                            </Box>
                        </CustomModal>
                    </Menu>
                </div>

                <CustomButton
                    buttonCss={{
                        borderRadius: "50px",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        width: "149px",
                        height: "48px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "22px",
                        marginBottom: "8%",
                    }}
                    isDisabled={isDisabled}
                    isTransaprent={false}
                    label="Join"
                    handleClick={JoinAppointment}
                ></CustomButton>
            </Box>
        </Box>
    );
};

UpcomingCard.propTypes = {
    label: PropTypes.string.isRequired,
    DrImage: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};

CompletedCard.propTypes = {
    DrImage: PropTypes.string.isRequired,
};

CancelledCard.propTypes = {
    DrImage: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};
