import { Box, Typography } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomButton from "../../../../components/CustomButton";
import EditListingButton from "../../../../components/EditListingButton";
// import "./CustomDrActiveListing.scss";

const CustomDrActiveListingCard = ({ 
    label, 
    Idtype, 
    Idnumber, 
    onhandleClickButtonOne, 
    buttonOneLabel, 
    buttonTwoLabel, 
    onhandleClickButtonTwo,
    onEditClick,
    showEditButton = true
}) => {
    return (
        <>
            <Box
                sx={{
                    border: "1px solid #E6E1E5",
                    margin: "0.5%",
                    padding: "1%",
                    borderRadius: " 0.5rem",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box
                        sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}
                    >
                        <Typography
                            style={{
                                color: "black",
                                fontFamily: "poppins",
                                fontSize: "22px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "28px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {label}
                        </Typography>
                        <Typography
                            style={{
                                color: "#787579",
                                fontFamily: "poppins",
                                fontSize: "17px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "18px",
                                letterSpacing: "0.096px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {Idtype} : {Idnumber}
                        </Typography>
                    </Box>
                    
                    {/* Edit Button */}
                    {showEditButton && (
                        <Box sx={{ marginLeft: "16px", marginRight: "16px" }}>
                            <EditListingButton
                                onEditClick={onEditClick}
                                size="medium"
                                variant="outlined"
                                tooltip="Edit Listing"
                            />
                        </Box>
                    )}
                    
                    <div className="bttns">
                        <CustomButton
                            label={buttonOneLabel}
                            isTransaprent={"True"}
                            buttonCss={{
                                width: "120px",
                                height: "48px",
                                borderRadius: "20px",
                                fontSize: "14px",
                            }}
                            handleClick={onhandleClickButtonOne}
                        ></CustomButton>
                        <CustomButton
                            label={buttonTwoLabel}
                            buttonCss={{
                                width: "120px",
                                height: "48px",
                                borderRadius: "20px",
                                fontSize: "14px",
                            }}
                            handleClick={onhandleClickButtonTwo}
                        ></CustomButton>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default CustomDrActiveListingCard;
