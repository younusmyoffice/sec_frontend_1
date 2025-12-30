import React, { useState } from "react";
import "./servicedetails.scss";
import { Typography, Box } from "@mui/material";
import CustomDatePicker from "../../../../../components/CustomDatePicker";
import CustomTimePicker from "../../../../../components/CustomTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; 
import dayjs from "dayjs";
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                  
                    <DatePicker
                            label="From"
                            value={serviceDayFrom ? dayjs(serviceDayFrom) : null}
                            onChange={(value) => {
                                if (value) {
                                    setServiceDayFrom(value.format('YYYY-MM-DD'));
                                } else {
                                    setServiceDayFrom(null);
                                }
                                console.log("Service day from:", value);
                            }}
                            textcss={{ width: "48%" }}
                            noSpacing={true}
                                                            slotProps={{
                                                                textField: {
                                                                    required: true,
                                                                    variant: "standard",
                                                                    fullWidth: true,
                                                                },
                                                            }}
                            />
                                                
                                                </LocalizationProvider>
                        <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}> to </Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                  
                  <DatePicker
                            label="To"
                            value={serviceDayTo ? dayjs(serviceDayTo) : null}
                            onChange={(value) => {
                                if (value) {
                                    setServiceDayTo(value.format('YYYY-MM-DD'));
                                } else {
                                    setServiceDayTo(null);
                                }
                                console.log("Service day to:", value);
                            }}
                            textcss={{ width: "48%" }}
                            noSpacing={true}
                            slotProps={{
                                textField: {
                                    required: true,
                                    variant: "standard",
                                    fullWidth: true,
                                },
                            }}
                            />
                    </LocalizationProvider>
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
