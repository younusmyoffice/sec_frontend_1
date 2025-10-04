import React, { useState } from "react";
import "./servicedetails.scss";
import { Typography, Box } from "@mui/material";
import CustomDatePicker from "../../../../../components/CustomDatePicker";
import CustomTimePicker from "../../../../../components/CustomTimePicker";

function getWeeksAfter(date, amount) {
    return date ? date.add(amount, "week") : undefined;
}

const ServiceDetails = () => {
    const [serviceDayFrom, setServiceDayFrom] = useState(null);
    const [serviceDayTo, setServiceDayTo] = useState(null);
    const [serviceTimeFrom, setServiceTimeFrom] = useState(null);
    const [serviceTimeTo, setServiceTimeTo] = useState(null);

    return (
        <>
            <div className="mui-date-time-pickers">
                <div className="days">
                    <Typography>Days</Typography>
                </div>
                <div className="Date-range-picker1">
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                        <CustomDatePicker
                            label="From"
                            value={serviceDayFrom}
                            onChange={(value) => {
                                setServiceDayFrom(value);
                                console.log("Service day from:", value);
                            }}
                            textcss={{ width: "48%" }}
                            noSpacing={true}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}> to </Box>
                        <CustomDatePicker
                            label="To"
                            value={serviceDayTo}
                            onChange={(value) => {
                                setServiceDayTo(value);
                                console.log("Service day to:", value);
                            }}
                            textcss={{ width: "48%" }}
                            noSpacing={true}
                        />
                    </div>
                </div>
                <div className="time">
                    <Typography>Time</Typography>
                </div>
                <div className="time-picker">
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                        <CustomTimePicker
                            label="From"
                            value={serviceTimeFrom}
                            onChange={(value) => {
                                setServiceTimeFrom(value);
                                console.log("Service time from:", value);
                            }}
                            textcss={{ width: "48%" }}
                            noSpacing={true}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}> to </Box>
                        <CustomTimePicker
                            label="To"
                            value={serviceTimeTo}
                            onChange={(value) => {
                                setServiceTimeTo(value);
                                console.log("Service time to:", value);
                            }}
                            textcss={{ width: "48%" }}
                            noSpacing={true}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetails;
