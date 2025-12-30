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
import axiosInstance from "../../config/axiosInstance"; // Handles access token automatically
import { getProfileImageSrc } from "../../utils/imageUtils";
import logger from "../../utils/logger"; // Centralized logging
import toastService from "../../services/toastService"; // Toast notifications

/**
 * AppointmentNavbar Component
 * 
 * Navigation bar for appointment tabs
 * Tabs: Upcoming, Completed, Cancelled, Chats
 * 
 * Uses NavLink for active state highlighting
 * 
 * @component
 */
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

/**
 * CancelledCard Component
 * 
 * Displays cancelled appointment card
 * Shows doctor info, plan name, status, date, and reports
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Appointment data (first_name, middle_name, last_name, plan_name, status, appointment_date, report_name)
 * @param {string} props.DrImage - Doctor's profile image URL
 * 
 * @component
 */
export const CancelledCard = ({ data, DrImage }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                borderBottom: "1px solid #E6E1E5", // Common border color
            }}
        >
            {/* Doctor profile image */}
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
                    alt={`${data?.first_name} ${data?.middle_name} ${data?.last_name}`}
                />
            </Box>
            
            {/* Card content */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "2%",
                }}
            >
                {/* Doctor name */}
                <Typography>
                    {`${data?.first_name || ""} ${data?.middle_name || ""} ${data?.last_name || ""}`}
                </Typography>
                
                {/* Plan name and status */}
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
                            color: "#313033", // Common color: #313033
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "18px",
                            letterSpacing: "0.096px",
                        }}
                    >
                        {data?.plan_name || "No Plan"}
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
                        label={data?.status || "Cancelled"}
                    />
                </Box>
                
                {/* Appointment date and reports */}
                <Typography
                    sx={{
                        color: "#313033", // Common color: #313033
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

/**
 * PaginationCard Component
 * 
 * Displays pagination controls for appointment lists
 * Shows current page and pagination buttons
 * 
 * Note: Currently shows hardcoded "Page 1 of 1"
 * Consider adding props for dynamic page numbers
 * 
 * @component
 */
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
                {/* Page info */}
                <Box>
                    <Typography sx={{ marginTop: "20%" }}>Page 1 of 1</Typography>
                </Box>
                
                {/* Pagination controls */}
                <Box>
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </Box>
            </Box>
        </Box>
    );
};

/**
 * CompletedCard Component
 * 
 * Displays completed appointment card with action buttons
 * Features:
 * - Doctor profile and appointment details
 * - Leave a Review button and modal
 * - Book Again button and modal
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Appointment data
 * @param {string} props.DrImage - Doctor's profile image URL
 * @param {string|number} props.pid - Patient ID
 * @param {string|number} props.did - Doctor ID
 * @param {string|number} props.aid - Appointment ID
 * 
 * @component
 */
export const CompletedCard = ({ data, DrImage, pid, did, aid }) => {
    logger.debug("🔵 CompletedCard component rendering", { 
        appointment_id: aid,
        doctor_id: did,
        patient_id: pid 
    });
    
    // Modal states
    const [openLeaveReview, setOpenLeaveReview] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <Box sx={{ display: "flex" }}>
            {/* Main card content */}
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    borderBottom: "1px solid #E6E1E5", // Common border color
                }}
            >
                {/* Doctor profile image */}
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
                        alt={`${data?.first_name} ${data?.middle_name} ${data?.last_name}`}
                    />
                </Box>
                
                {/* Card content */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "2%",
                    }}
                >
                    {/* Doctor name */}
                    <Typography>{`${data?.first_name || ""} ${data?.middle_name || ""} ${data?.last_name || ""}`}</Typography>
                    
                    {/* Plan name and status */}
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
                                color: "#313033", // Common color: #313033
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "18px",
                                letterSpacing: "0.096px",
                            }}
                        >
                            {data?.plan_name || "No Plan"}
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
                        />
                    </Box>
                    
                    {/* Appointment date and reports */}
                    <Typography
                        sx={{
                            color: "#313033", // Common color: #313033
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "18px",
                            letterSpacing: "0.096px",
                            marginTop: "15%",
                        }}
                    >
                        {data?.appointment_date || "No Date"} | Attached Reports: {data?.report_name || "None"}
                    </Typography>
                </Box>
            </Box>
            
            {/* Action buttons container */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "2%",
                    justifyContent: "space-between",
                }}
            >
                {/* Leave a Review button and modal */}
                <Box>
                    <CustomButton
                        buttonCss={{
                            marginLeft: "10%",
                            borderRadius: "50px",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            width: "149px",
                            height: "48px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "22px",
                        }}
                        handleClick={() => {
                            logger.debug("📝 Opening Leave Review modal", { aid });
                            setOpenLeaveReview(!openLeaveReview);
                        }}
                        isTransaprent={true}
                        label="Leave a Review"
                    />
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
                                />
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
                
                {/* Book Again button and modal */}
                <CustomButton
                    buttonCss={{
                        marginLeft: "10%",
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
                    handleClick={() => {
                        logger.debug("📅 Opening Book Again modal", { did, aid });
                        setOpenDialog(!openDialog);
                    }}
                />
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
                            />
                        </Fragment>
                    }
                >
                    <Box>
                        <BookAppointmentModal 
                            drID={did}
                            aid={aid} 
                        />
                    </Box>
                </CustomModal>
            </Box>
        </Box>
    );
};

/**
 * UpcomingCard Component
 * 
 * Displays upcoming appointment card with actions
 * Features:
 * - Doctor profile and appointment details
 * - More options menu (Cancel, Re-Schedule)
 * - Join appointment button
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Appointment data
 * @param {string} props.DrImage - Doctor's profile image URL
 * @param {string} props.label - Button label
 * @param {boolean} props.isDisabled - Whether join button is disabled
 * @param {Object} props.path - Path object with {join, reject, rescheduled}
 * @param {Function} props.changeFlagState - Callback to update parent state
 * 
 * @component
 */
export const UpcomingCard = ({ data, DrImage, label, isDisabled, path, changeFlagState }) => {
    logger.debug("🔵 UpcomingCard component rendering", { 
        appointment_id: data?.appointment_id,
        status: data?.status 
    });
    
    // Menu state
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    // Modal states
    const [openDialogCancle, setOpenDialogCancle] = useState(false);
    const [openDialogReschedule, setOpenDialogReschedule] = useState(false);
    
    const navigate = useNavigate();
    
    /**
     * Handle menu button click
     * Opens menu and closes any open modals
     */
    const handleClick = (event) => {
        logger.debug("📋 Opening appointment options menu");
        setAnchorEl(event.currentTarget);
        setOpenDialogCancle(false);
        setOpenDialogReschedule(false);
    };
    
    /**
     * Handle menu close
     */
    const handleClose = () => {
        logger.debug("📋 Closing appointment options menu");
        setAnchorEl(null);
    };

    /**
     * Navigate to join appointment page
     */
    const JoinAppointment = async () => {
        logger.debug("🚪 Joining appointment", { join_path: path?.join });
        
        if (!path?.join) {
            logger.error("❌ Join path is missing");
            toastService.error("Join path is not available");
            return;
        }
        
        try {
            navigate(path.join);
            logger.debug("✅ Navigated to join appointment");
        } catch (error) {
            logger.error("❌ Error navigating to join appointment:", error);
            toastService.error("Failed to join appointment");
        }
    };

    return (
        <Box sx={{ width: "100%", display: "flex" }}>
            {/* Main card content */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    borderBottom: "1px solid #E6E1E5", // Common border color
                }}
            >
                {/* Doctor profile image */}
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
                        alt={`${data?.first_name} ${data?.middle_name} ${data?.last_name}`}
                    />
                </Box>
                
                {/* Card content */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "2%",
                    }}
                >
                    {/* Doctor name */}
                    <Typography>{`${data?.first_name || ""} ${data?.middle_name || ""} ${data?.last_name || ""}`}</Typography>
                    
                    {/* Plan name and status */}
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
                                color: "#313033", // Common color: #313033
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "18px",
                                letterSpacing: "0.096px",
                            }}
                        >
                            {data?.plan_name || "No Plan"}
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
                            label={data?.status || "Upcoming"}
                            className={"upcomingButton"}
                        />
                    </Box>
                    
                    {/* Appointment date and reports */}
                    <Typography
                        sx={{
                            color: "#313033", // Common color: #313033
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
            
            {/* Action buttons container */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}
            >
                {/* More options menu */}
                <div style={{ width: "fit-content" }}>
                    <MoreHorizIcon
                        sx={{
                            cursor: "pointer",
                            color: "#3d403e",
                            border: "1px solid #3d403e",
                            borderRadius: "50px",
                        }}
                        onClick={handleClick}
                        aria-label="More options"
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
                        {/* Cancel appointment option */}
                        <MenuItem 
                            onClick={() => {
                                logger.debug("❌ Opening cancel appointment modal");
                                setOpenDialogCancle(!openDialogCancle);
                                handleClose();
                            }}
                        >
                            Cancel
                        </MenuItem>
                        <CustomModal
                            isOpen={openDialogCancle}
                            title={"Cancel Appointment"}
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
                                    />
                                </Fragment>
                            }
                        >
                            <Box>
                                <CancelAppointmentSlider
                                    path={path?.reject}
                                    data={data}
                                    changeFlagState={changeFlagState}
                                />
                            </Box>
                        </CustomModal>
                        
                        {/* Re-Schedule option - Only show if status is "booked" */}
                        {data?.status === "booked" && (
                            <MenuItem
                                onClick={() => {
                                    logger.debug("📅 Opening reschedule appointment modal");
                                    setOpenDialogReschedule(!openDialogReschedule);
                                    handleClose();
                                }}
                            >
                                Re-Schedule
                            </MenuItem>
                        )}

                        <CustomModal
                            isOpen={openDialogReschedule}
                            title={"Reschedule Appointment"}
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
                                    />
                                </Fragment>
                            }
                        >
                            <Box>
                                <RescheduleAppointmentSlider
                                    path={path?.rescheduled}
                                    data={data}
                                    changeFlagState={changeFlagState}
                                />
                            </Box>
                        </CustomModal>
                    </Menu>
                </div>

                {/* Join appointment button */}
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
                    label={label || "Join"}
                    handleClick={JoinAppointment}
                />
            </Box>
        </Box>
    );
};

// PropTypes for type checking
UpcomingCard.propTypes = {
    data: PropTypes.shape({
        first_name: PropTypes.string,
        middle_name: PropTypes.string,
        last_name: PropTypes.string,
        plan_name: PropTypes.string,
        status: PropTypes.string,
        appointment_date: PropTypes.string,
        report_name: PropTypes.string,
        appointment_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    DrImage: PropTypes.string.isRequired,
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    path: PropTypes.shape({
        join: PropTypes.string,
        reject: PropTypes.string,
        rescheduled: PropTypes.string,
    }),
    changeFlagState: PropTypes.func,
};

UpcomingCard.defaultProps = {
    label: "Join",
    isDisabled: false,
    path: {},
    changeFlagState: () => {},
};

CompletedCard.propTypes = {
    data: PropTypes.shape({
        first_name: PropTypes.string,
        middle_name: PropTypes.string,
        last_name: PropTypes.string,
        plan_name: PropTypes.string,
        appointment_date: PropTypes.string,
        report_name: PropTypes.string,
    }).isRequired,
    DrImage: PropTypes.string.isRequired,
    pid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    did: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    aid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CancelledCard.propTypes = {
    data: PropTypes.shape({
        first_name: PropTypes.string,
        middle_name: PropTypes.string,
        last_name: PropTypes.string,
        plan_name: PropTypes.string,
        status: PropTypes.string,
        appointment_date: PropTypes.string,
        report_name: PropTypes.string,
    }).isRequired,
    DrImage: PropTypes.string.isRequired,
};
