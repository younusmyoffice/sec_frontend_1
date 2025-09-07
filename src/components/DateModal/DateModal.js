import React, { useState } from "react";
import "./DateModal.scss"
import CustomModalMUI from '../CustomModalMUI/CustomModalMUI'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const DateModal = () => {
    const [value, setValue] = useState([null, null]);
    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : undefined;
    }
  return (
    <>
    <CustomModalMUI
     label="Date"
     rightIcon={<KeyboardArrowDownIcon/>}
     modalCss={{
         position: 'relative',
         top: '35%',
         left: '83%',
         transform: 'translate(-50%, -50%)',
         width: 450,
         bgcolor: 'background.paper',
         borderRadius : "10px",
         boxShadow: 24,
         pt: 2,
         px: 2,
         pb: 1,
     }} 
     modalcontent={<>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateRangePicker
                                    disablePast
                                    value={value}
                                    maxDate={getWeeksAfter(value[0], 4)}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} variant="standard" />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} variant="standard" />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
     </>}>

    </CustomModalMUI>
    </>
  )
}

export default DateModal