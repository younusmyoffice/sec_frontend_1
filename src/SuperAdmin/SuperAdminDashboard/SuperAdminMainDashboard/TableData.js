import { Box, Typography } from "@mui/material";
import React from "react";
export const TableData = ({image,name}) => {
    return(
        <>
            <Box sx={{display : "flex" }} >
                <Box component={'div'} sx={{height : "3.44331rem" , width  : "3.44331rem" , borderRadius : "0.5rem" }}>
                    <img src={image} style={{height : "100%"  , width : "100%" ,  borderRadius : "8px" }} />
                </Box>
                <Box sx={{marginLeft : "2%" , display : "flex" , flexDirection : "column" , justifyContent : "center" }} >
                    <Typography sx={{   color: "#313033",
                                        fontFamily: "Poppins",
                                        fontSize: "1 rem",
                                        fontStyle: "normal",
                                        fontWeight: "500",
                                        lineHeight: "1.375rem",
                                        letterSpacing: "0.00438rem"}} >{name}</Typography>
                                      
                </Box>
            </Box>
        </>
    )
}