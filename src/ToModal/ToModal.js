import React from "react";
import CustomModalMUI from "../components/CustomModalMUI/CustomModalMUI";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ToModal = () => {
    return (
        <>
            <CustomModalMUI
                label="To"
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
                                <DatePicker label="To" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </>
                }
            ></CustomModalMUI>
        </>
    );
};

export default ToModal;
