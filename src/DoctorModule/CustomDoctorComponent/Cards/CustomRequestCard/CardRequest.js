import React, { Fragment, useEffect, useState } from 'react';
import profileImage from "../../../../constants/DrImages/profileImage.png";

import { Box, Typography } from '@mui/material';
import { TextField } from "@mui/material";
import "./cardRequest.scss";
import CustomButton from '../../../../components/CustomButton/custom-button';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import GroupIcon from "../../../../constants/DrImages/GroupIcon.svg";
// import CustomModal from '../../../custom-modal';
import CustomModal from "../../../../components/CustomModal";
import CustomRadioButton from "../../../../components/CustomRadioButton";
import axios from 'axios';
import { baseURL } from '../../../../constants/const';

const CustomRequestCard = ({ data = {} , label, onClickHandler }) => {


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

    const radioValues = [
        "I have a schedule clash",
        "I am not available at the schedule",
        "Reason3",
        "Reason4",
        "Reason5",
    ];
    const [radioVal, setRadioVal] = React.useState(radioValues[0]);
    const [acceptAppointment , setAcceptAppointment] = useState({    
        "appointment_id": null,
        "patient_id": null,
        "doctor_id": null,
        "status": null
    });
    const [clicked , setClicked] = useState(false);

    const [rejectAppointment , setRejectappointment] = useState({    
        "appointment_id": null,
        "patient_id": null,
        "doctor_id": null,
        "status": null,
        "option": null
    });
    const [rejectClicked , setRejectClicked] = useState(false);
    // console.log("data is the now oil : " , data);

    const AcceptAppointment = async () => {
        setClicked(!clicked);
        try {
            // const response = await axiosInstance.post("/sec/auth/login",JSON.stringify(data),{"Accept" : "Application/json"});
            const response = await axios.post(
                `${baseURL}/sec/doctor/UpdatedocAppbystatusId`,
                JSON.stringify(acceptAppointment),
                { Accept: "Application/json" },
            );
            alert(response?.data.response.status)
            console.log("RESPONSE : ", response?.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    // updating the variables for accept appointment 
    useEffect( () => {
        setAcceptAppointment({
            "appointment_id": data?.appointment_id,
            "patient_id": data?.patient_id,
            "doctor_id": data?.doctor_id,
            "status": "in_progress"
        })
    },[clicked] )

    // updating the variables for reject 
    useEffect( () => {
        setRejectappointment({
            "appointment_id": data?.appointment_id,
            "patient_id": data?.patient_id,
            "doctor_id": data?.doctor_id,
            "status": "in_progress",
            "option":"reject"
        })  
    } , [rejectClicked] )
    
    // console.log("Accept appointment : " , acceptAppointment)
    const RejectAppointment = async () => {
        setRejectClicked(!rejectClicked);
        try {
            // const response = await axiosInstance.post("/sec/auth/login",JSON.stringify(data),{"Accept" : "Application/json"});
            const response = await axios.post(
                `${baseURL}/sec/doctor/UpdatedocAppbystatusId`,
                JSON.stringify(rejectAppointment),
                { Accept: "Application/json" },
            );
            alert(response?.data.response.status)
            console.log("RESPONSE : ", response?.data);
        } catch (error) {
            console.log(error.response);
        }
    };


    return(
        <>
            <div className='Request-main-container'>
                <div className='Request-inner-container' >
                    {/* -----Image Container-------- */}
                    <div style={{width : "3.13981rem" , height : "height: 4.71831rem" }} >
                        <div className='RequestimageContainer' > 
                            <Box className='image-container' component={'img'} sx={{width : "100%" , height : "100%"}} src={profileImage} alt="Profile Image"></Box>
                        </div>
                    </div>
        
                    {/*--------- Details Container-------- */}
                    <div style={{marginLeft : "2%"}} >
                        <div style={{display : "flex" , justifyContent : "flex-start"}} >
                            <Typography sx={{   color: "#313033",
                                                fontFamily: "Poppins",
                                                fontSize: "1.125rem",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                lineHeight: "1.75rem",
                                                }} >{data?.name}</Typography>
                        </div>
                        <div className='card-details-container' >
                        
                            <Typography sx={{
                                    color: "#787579",
                                    fontFamily: "Poppins",
                                    fontSize: "0.75rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "1.125rem",
                                    letterSpacing: "0.006rem",
                                    width : "16rem"
                            }} >Schedule | Today 10:00 AM | Attachments </Typography>
                            <Box component={'a'} href='#' sx={{ color: "#E72B4A",
                                                                fontFamily: "Poppins",
                                                                fontSize: "0.75rem",
                                                                fontStyle: "normal",
                                                                fontWeight: "400",
                                                                lineHeight: "1.125rem", 
                                                                letterSpacing: "0.006rem"
                                                                }} 
                            >View</Box>
                        </div>
                    </div>
    
                </div>
                {/*------------ Button Container------------ */}
                <div className='request-button-container'>
                    <div style={{display : "flex" ,  alignItems : "center" , marginRight : "2%" }} >
                    <CustomButton buttonCss={{
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
                                            
                                            label={label} 
                                            isTransaprent={false}
                                            handleClick={AcceptAppointment}
                                             />
                    </div>
                    <div style={{display : "flex" ,  alignItems : "center" }} >
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
                                    >
                                    </Box>
                                </Fragment>
                            }
                        >
                            <Box sx={{textAlign : "center" }} >
                                <Typography>Are you sure. you want to cancel the appointment</Typography>
                            </Box>
                            <div style={{marginTop : "4%"}} >
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
                                        handleChange={({ target }) => setRadioVal(target.value)}
                                        value={radioVal}
                                        items={radioValues}
                                    />
                                    <Box sx={{ marginTop: "5%", width: "100%" }}>
                                    <Typography>Add Note</Typography>
                                        <TextField
                                        style={{width : "100%" , padding : "3%"}}
                                        placeholder=" Note: Lorem ipsum dolor sit amet. Qui dolor nostrum sit
                                            eius necessitatibus id quia expedita et molestiae
                                            laborum qui nihil excepturi qui tenetur blanditiis."
                                        multiline
                                        rows={3}
                                        maxRows={4}
                                    />
                                    </Box>
                                    <Box sx={{marginTop : "6%" , display : "flex" , justifyContent : "center"}}>
                                        <CustomButton
                                            handleClick={RejectAppointment}
                                            label='Donee'
                                         />
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

export default CustomRequestCard;