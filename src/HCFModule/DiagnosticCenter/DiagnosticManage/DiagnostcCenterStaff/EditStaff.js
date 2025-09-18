import React, { Fragment, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import pen from "../../../../static/images/DrImages/Pen.svg";

const EditStaff = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [age, setAge] = React.useState("");

    const handleChange = (event, SelectChangeEvent) => {
        setAge(event.target.value);
    };
    return (
        <div className="items">
            <CustomButton
                label={<img src={pen} />}
                isElevated
                isTransaprent
                handleClick={() => setOpenDialog(true)}
            />
            <CustomModal
                isOpen={openDialog}
                title={"dialog title"}
                footer={
                    <Fragment>
                        <CustomButton
                            label={"Save"}
                            handleClick={() => setOpenDialog(false)}
                            isTransaprent
                            isText
                        />
                    </Fragment>
                }
            >
                <div>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="standard-basic" label="Name" variant="standard" />
                        <TextField id="standard-basic" label="Email" variant="standard" />
                        <TextField id="standard-basic" label="Mobile No" variant="standard" />
                        <TextField id="standard-basic" label="Create Password" variant="standard" />
                        <TextField
                            id="standard-basic"
                            label="Confirm Password"
                            variant="standard"
                        />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">
                                Access Level
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                label="Age"
                            >
                                <MenuItem value={10}>Owner Access</MenuItem>
                                <MenuItem value={20}>Staff Access</MenuItem>
                                <MenuItem value={30}>View Access</MenuItem>
                                <MenuItem value={30}>Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </CustomModal>
        </div>
    );
};
export default EditStaff;
