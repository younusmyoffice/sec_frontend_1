import { Box, Typography } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomButton from "../../../../components/CustomButton";
// import "./CustomDrActiveListing.scss";

const CustomDrActiveListingCard = ({ label, Idtype, Idnumber, onDelete }) => {
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
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box
                        sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
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
                    <div className="bttns">
                        <CustomButton
                            label="Delete"
                            isTransaprent={"True"}
                            buttonCss={{
                                width: "149px",
                                height: "48px",
                                borderRadius: "20px",
                            }}
                            handleClick={onDelete}
                        ></CustomButton>
                        <CustomButton
                            label="Edit"
                            buttonCss={{
                                width: "149px",
                                height: "48px",
                                borderRadius: "20px",
                            }}
                        ></CustomButton>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default CustomDrActiveListingCard;
