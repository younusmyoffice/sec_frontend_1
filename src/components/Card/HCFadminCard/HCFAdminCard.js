import React from "react";
import { Box, Typography } from "@mui/material";
import SuperHCFImage from "../../../constants/DrImages/rectangleH.png";
import CustomButton from "../../CustomButton";
import "./HCFAdminCard.scss";

const HCFAdminCard = () => {
    return (
        <>
            <div className="superadmindoctor-card">
                <Box
                    component={"img"}
                    src={SuperHCFImage}
                    sx={{
                        width: "128px",
                        height: "128px",
                    }}
                ></Box>
                <div className="buttons-texts">
                    <div className="name-approve">
                        <Typography
                            style={{
                                fontFamily: "poppins",
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "30px",
                            }}
                        >
                            Syed Imad
                        </Typography>
                        <CustomButton
                            label="Approve"
                            isTransaprent={"true"}
                            buttonCss={{
                                width: "149px",
                                height: "48px",
                            }}
                        ></CustomButton>
                    </div>
                    <div className="name-approve">
                        <Typography
                            style={{
                                fontFamily: "poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "18px",
                                letterSpacing: "0.096px",
                            }}
                        >
                            Today | 10:00AM
                        </Typography>
                        <CustomButton
                            label="Block"
                            buttonCss={{
                                width: "149px",
                                height: "48px",
                            }}
                        ></CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HCFAdminCard;
