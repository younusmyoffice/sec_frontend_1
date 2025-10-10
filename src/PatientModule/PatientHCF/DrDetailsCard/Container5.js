import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CustomButton from "../../../components/CustomButton";
import axiosInstance from "../../../config/axiosInstance";

const Container5 = ({ lab_id , lab_names }) => {



    return (
        <Box style={{ justifyContent: "flex-start", display: "flex" }}>
            <CustomButton
                buttonCss={{ marginLeft: "20px", fontWeight: "bold", height: "45px" }}
                label="Radiology"
            />
            <CustomButton
                buttonCss={{ marginLeft: "20px", height: "45px" }}
                label={lab_id}
                isTransaprent
            />
            <CustomButton
                buttonCss={{ marginLeft: "20px", height: "45px" }}
                label={lab_id}
                isTransaprent
            />
        </Box>
    );
};
export default Container5;
