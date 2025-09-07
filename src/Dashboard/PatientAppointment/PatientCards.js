import { Box, Pagination, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomButton from "../../components/CustomButton/custom-button";
import "./NavBar-Appointment.scss";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CustomModal from "../../components/CustomModal/custom-modal";
import RescheduleAppointmentSlider from "./AppointmentSlider/RescheduleAppointmentSlider/RescheduleAppointmentSlider";
import CancelAppointmentSlider from "./AppointmentSlider/CancleAppointment/CancleAppointmentSlider";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { LeaveAReview } from "./UpComing/CompletedModal/LeaveAReviewModal";
import BookAppointmentModal from "../DrDetailsCard/BookingAppointmentModal";

export const AppointmentNavbar = () => {
    return (
        <nav className="NavBar-Container-Appoinement">
            <NavLink to={"/patientdashboard/appointment/upcoming"}>Upcoming</NavLink>
            <NavLink to={"/patientdashboard/appointment/completed"}>Completed</NavLink>
            <NavLink to={"/patientdashboard/appointment/cancelled"}>Cancelled</NavLink>
            <NavLink to={"/patientdashboard/appointment/chats"}>Chats</NavLink>
        </nav>
    );
};

export const CancelledCard = ({ data ,DrImage }) => {
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
                    src={DrImage}
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
                <Typography>{data?.name} </Typography>
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
                        Messaging
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
                        label="Cancelled"
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
                    Today | 10:00 AM | Attached Reports:01
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

export const CompletedCard = ({ data , DrImage }) => {

    const [openLeaveReview, setOpenLeaveReview] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    console.log("Complted card data :  :  = = " , data);
    return (
        <Box sx={{display : "flex"}} >
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
                        src={DrImage}
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
                    <Typography>{data?.name}</Typography>
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
                            Messaging
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
                        {data?.created_at} | Attached Reports:01
                    </Typography>
                </Box>
            </Box>
            <Box sx={{  display: "flex", 
                        flexDirection : "column" ,
                        padding: "2%",
                        flexDirection: "column",
                        justifyContent: "space-between", }}>
                <Box >
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
                                            >
                                            </Box>
                                        </Fragment>
                                    }
                                >
                                    <Box>
                                    <LeaveAReview/>
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
                            <BookAppointmentModal/>
                            </Box>
                        </CustomModal>
            </Box>
        </Box>
    );
};

export const UpcomingCard = ({data , DrImage, label, isDisabled }) => {
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
    const [openDialogReschedule  , setOpenDialogReschedule] = useState(false);
    // console.log("Card Data : : : " , data);
    return (
        <Box sx={{ width : "100%" ,  display: "flex" }}>
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
                        src={DrImage}
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
                    <Typography>{data?.name}</Typography>
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
                            Messaging
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
                        Today | 10:00 AM | Attached Reports:01
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between"  , alignItems : "flex-end"}}>
                <div style={{ width : "fit-content" }} >
                        <MoreHorizIcon sx={{cursor : "pointer" , color : "#E6E1E5" , border : "1px solid #E6E1E5" , borderRadius : "50px"}} onClick={handleClick} />
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
                        <MenuItem onClick={() => setOpenDialogCancle(!openDialogCancle) }  >
                               Cancle
                        </MenuItem>
                        <CustomModal
                            isOpen={openDialogCancle}
                            title={"Book Appointment"}
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
                                    </Box>
                                </Fragment>
                            }
                        >
                            <Box>
                            <CancelAppointmentSlider/>
                            </Box>
                        </CustomModal>
                        <MenuItem onClick={() => setOpenDialogReschedule(!openDialogReschedule)}>Re-Schedule</MenuItem>
                        <CustomModal
                            isOpen={openDialogReschedule}
                            title={"Book Appointment"}
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
                                    </Box>
                                </Fragment>
                            }
                        >
                            <Box>
                                <RescheduleAppointmentSlider/>
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
                        marginBottom : "8%"
                    }}
                    isDisabled={isDisabled}
                    isTransaprent={false}
                    label="Join"
                    // handleClick={}
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
