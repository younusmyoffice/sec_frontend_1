import { Box, Typography } from '@mui/material';
import './cardNotification.scss';
import React from 'react';
import CustomButton from '../../../../components/CustomButton/custom-button';
// import CustomButton from '../../../components/CustomButton/custom-button';

const CustomNotificationCard = ({Schedule}) => {
    return(
        <>
            <Box sx={{
                        width : "100%" , 
                        display : "flex" , 
                        justifyContent : "space-between" , 
                        borderBottom : "1px solid #C9C5CA" , 
                        height : "8rem" , 
                        padding : "1%" 
                    }} >
                <Box sx={{
                            display : "flex",
                            flexDirection : "column",
                            alignItems : "flex-start"
                        }} 
                >
                    <Typography sx={{
                        color: "#313033",
                        fontFamily: "Poppins",
                        fontSize: "1.25rem",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "1.875rem",
                    }} >{Schedule}</Typography>
                    <Typography sx={{
                        color: "#939094",
                        fontFamily: "Poppins",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "1.125rem",
                        letterSpacing: "0.006rem",
                    }} >You have an appointment with Dr. Maria Garcia | Today |</Typography>
                    <Typography sx={{
                        color: "#939094",
                        fontFamily: "Poppins",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "1.125rem",
                        letterSpacing: "0.006rem",
                    }} >10:30 AM IST</Typography>
                </Box>

                <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        // padding: "2%",
                }} >
                    <Typography sx={{
                        color:  "#939094",
                        textAlign: "right",
                        fontFamily: "Poppins",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontweight: "400",
                        lineHeight: "1.125rem", /* 150% */
                        letterSpacing: "0.006rem",
                    }} >02-03-2023 10:30 AM</Typography>
                    <CustomButton 
                        buttonCss={{
                            display: "flex",
                            width: "10.625rem",
                            height: "3rem",
                            padding: "0.5rem 1rem",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                            flexShrink: "0",
                            borderRadius: "6.25rem"
                        }}      
                        label='View' />
                </Box>
            </Box>
        </>
    )
}

export default CustomNotificationCard;