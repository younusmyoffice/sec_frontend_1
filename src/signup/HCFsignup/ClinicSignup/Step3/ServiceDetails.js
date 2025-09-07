import React, { useState } from "react";
import "./servicedetails.scss"
import { Typography, Box } from "@mui/material";
import { TextField } from '@mui/material'
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';


function getWeeksAfter(date, amount) {  return date ? date.add(amount, "week") : undefined;
}

const ServiceDetails = () => {
  const dropdownItems = ["item1", "item2", "item3"];
  const [activeDropdown, setActiveDropdown] = useState("");

  const [value, setValue] = useState([null, null]);
  return (
   <>
    <div className="mui-date-time-pickers">
    <div className="days">
      <Typography>
        Days
      </Typography>
    </div>
    <div className="Date-range-picker1">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateRangePicker
                                    disablePast
                                    value={value}
                                    maxDate={getWeeksAfter(value[0], 4)}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(FromProps, ToProps) => (
                                        <React.Fragment>
                                            <TextField {...FromProps} variant="standard" />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...ToProps} variant="standard" />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                            </div>
                            <div className="time">
                              <Typography>
                                Time
                              </Typography>
                            </div>
                            <div className="time-picker">

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['MultiInputTimeRangeField', 'SingleInputTimeRangeField']}
      >
        <MultiInputTimeRangeField
          slotProps={{
            textField: ({ position }) => ({
              label: position === 'start' ? 'From' : 'To',
            }),
          }}
        />
        
      </DemoContainer>
    </LocalizationProvider>
                            </div>
    </div>
   </>
  )
}

export default ServiceDetails