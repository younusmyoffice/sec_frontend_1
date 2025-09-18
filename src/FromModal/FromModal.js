import React from "react";
// import "./DateModal.scss"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomModalMUI from "../components/CustomModalMUI/CustomModalMUI";

const FromModal = () => {
    return (
        <>
            <CustomModalMUI
                label="From"
                rightIcon={<KeyboardArrowDownIcon />}
                modalCss={{
                    position: "relative",
                    top: "35%",
                    left: "83%",
                    transform: "translate(-50%, -50%)",
                    width: 450,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    pt: 2,
                    px: 2,
                    pb: 1,
                }}
                modalcontent={
                    <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker label="From" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </>
                }
            ></CustomModalMUI>
        </>
    );
};

export default FromModal;
