import {
    Box,
    ButtonBase,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
// import { styled } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        position: "absolute",
        width: "400px",
        height: "450px",
        // backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[5],
        background: "#ffff",
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
        padding: theme.spacing(2, 4, 3),
    },
}));

const locationModal = () => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ diplay: "inline", width: "40%" }} onClick={handleOpen}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <LocationOnIcon sx={{ color: "#AEAAAE", width: "32px", height: "32px" }} />
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "#AEAAAE",
                            marginTop: "5%",
                            lineHeight: "22px",
                        }}
                    >
                        Set Location..
                    </Typography>
                </Stack>
            </Box>

            <Box>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate( -50% , -50% )",
                        }}
                        className={classes.paper}
                    >
                        {/* <h2>Add Location</h2> */}
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "20px",
                                    color: "#313033",
                                    marginTop: "2%",
                                    lineHeight: "20px",
                                    marginLeft: "-4%",
                                }}
                            >
                                Add your Location
                            </Typography>
                            <IconButton onClick={handleClose} sx={{ marginRight: "-1rem" }}>
                                <CloseIcon
                                    sx={{ width: "21px", height: "25px", color: "#313033" }}
                                />
                            </IconButton>
                        </Box>
                        {/* <Box
                            onClick={handleOpen}
                            display={"flex"}
                            flexWrap={"wrap"}
                            border={1}
                            borderColor="#AEAAAE"
                            borderRadius={"25px"}
                            width={"21em"}
                            height="38px"
                            backgroundColor="#E6E1E5"
                            marginTop="5%"
                        > */}
                        {/* <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                                sx={{ marginLeft: "3%" }}
                            >
                                <SearchIcon sx={{ margin: "0 0 0 0%", color: "#AEAAAE" }} />
                                {/* <TextField
                                type="search" id="search" label="Search" sx={{ textAlign: "left", color: "#AEAAAE" }} 
                                    // variant="body1"
                                >
                                    Search here…
                                </TextField> */}
                        {/* <input type="search" placeholder="Search..."></input> */}
                        {/* </Stack> */}
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            sx={{ color: "#AEAAAE", width: "24px", height: "24px" }}
                                        ></SearchIcon>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CloseIcon
                                            sx={{ width: "21px", height: "21px", color: "#AEAAAE" }}
                                        ></CloseIcon>
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                            sx={{
                                background: "#EFEFEF",
                                borderRadius: "50px",
                                border: "none",
                                padding: "2% 2%",
                                width: "342px",
                                height: "41px",
                                marginTop: "5%",
                            }}
                            placeholder="Search here"
                            id="outlined-basic"
                            variant="standard"
                        />
                        <Box onClick={handleOpen} sx={{ marginTop: "5%" }}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                                sx={{ marginLeft: "3%" }}
                            >
                                <GpsFixedIcon
                                    sx={{ color: "#E72B4A", width: "24px", height: "24px" }}
                                ></GpsFixedIcon>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        textAlign: "left",
                                        color: "#313033",
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                    }}
                                >
                                    Use Current Location
                                </Typography>
                                {/* <TextField
                                type="search"
                                id="search"
                                label="Search"
                                sx={{ textAlign: "left", color: "#AEAAAE" }}
                                // variant="body1"
                            >
                                Use Current Location
                            </TextField> */}
                                {/* <input type="search" placeholder="Search..."></input> */}
                            </Stack>
                        </Box>
                        <Box>
                            <img
                                style={{ width: "70%", marginLeft: "14%", marginTop: "14%" }}
                                src="images/addLocation.png"
                                alt=""

                                // color="#AEAAAE"
                            />
                        </Box>

                        {/* <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <GpsFixedIcon
                                            sx={{ color: "#AEAAAE", width: "24px", height: "24px" }}
                                        ></GpsFixedIcon>
                                    </InputAdornment>
                                ),
                                // endAdornment: (
                                //     <InputAdornment position="end">
                                //         <CloseIcon
                                //             sx={{ width: "21px", height: "21px", color: "#AEAAAE" }}
                                //         ></CloseIcon>
                                //     </InputAdornment>
                                // ),
                                disableUnderline: true,
                            }}
                            placeholder="Search here"
                            id="outlined-basic"
                            variant="standard"
                        ></TextField> */}
                        {/* <IconButton onClick={handleClose} sx={{ marginLeft: "44%" }}>
                                <CloseIcon
                                    sx={{ width: "21px", height: "25px", color: "#AEAAAE" }}
                                />
                            </IconButton> */}
                        {/* </Box> */}
                        {/* <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan
                            odio enim, non pharetra est ultrices et.
                        </p> */}
                    </div>
                </Modal>
            </Box>
        </>
    );
};

export default locationModal;
