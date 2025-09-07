import React from "react";
import CustomButton from "../../../../components/CustomButton";
import { Box } from "@mui/material";

const Container5 = ({ lab_id }) => {
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
