import {
    Box,
    ButtonBase,
    Stack,
    Typography,
    IconButton,
    TextField,
    InputAdornment,
    Grid,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme, alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import CustomDropdown from "../CustomDropdown/custom-dropdown";
import CustomButton from "../CustomButton/custom-button";
// import Card from "../Card/card";
import { data, CallCardData } from "../Card/const1";
import FilterListIcon from "../../static/images/Filterlist.png";

// import InputBase from "@mui/material/InputBase";

// const Search = styled("div")(({ theme }) => ({
//     position: "relative",
//     borderRadius: "16px",
//     backgroundColor: "#E6E1E5",
//     "&:hover": {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     // marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "1em",
//     [theme.breakpoints.up("sm")]: {
//         marginLeft: theme.spacing(3),
//         width: "auto",
//     },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
// }));
const StrawberyyIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, "0%"), //    margin: -3em 0% 0% 31%;
    margin: "-3em 0% 0% 39%",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

// const StyledInputBase1 = styled(InputBase)(({ theme }) => ({
//     color: "inherit",
//     "& .MuiInputBase-input": {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create("width"),
//         width: "100%",
//         [theme.breakpoints.up("md")]: {
//             width: "20ch",
//         },
//     },
// }));

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
        width: "600px",
        height: "450px",
        // backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
        background: "#ffff",

        padding: theme.spacing(2, 4, 3),
    },
    image: {
        marginRight: "2%",
        marginTop: "5px",
    },
}));

const searchBarModal = () => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [activeDropdown, setActiveDropdown] = useState("");
    const handleSubmit = (e) => {};

    return (
        <>
            <Box
                onClick={handleOpen}
                display={"flex"}
                flexWrap={"wrap"}
                border={1}
                borderColor="#AEAAAE"
                borderRadius={"25px"}
                width={"27em"}
                height="38px"
                backgroundColor="#E6E1E5"
            >
                <Stack direction="row" alignItems="center" gap={1}>
                    <SearchIcon sx={{ margin: "0 0 0 0%", color: "#AEAAAE" }} />
                    <Typography variant="body1" sx={{ textAlign: "left", color: "#AEAAAE" }}>
                        Search here…
                    </Typography>
                </Stack>
                <img
                    style={{ width: 18, height: 18, margin: "2.5% 0% 0% 54%" }}
                    src={FilterListIcon}
                    alt="Logo"
                    // width="18"
                    // height="18"
                    // color="#AEAAAE"
                />

                {/* <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                        //text-align: left;
    //margin-left: 3%;  
                        textAlign: "left",
                        marginLeft:"3%",
                        mr: 2,
                        flexGrow: 1,
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        fontSize: "12px",
                        letterSpacing: ".3rem",
                        color: "#AEAAAE",
                        textDecoration: "none",
                        lineHeight: "22px",
                    }}
                >
                    Search here…
                </Typography>
                {/* <StrawberyyIconWrapper> */}
                {/* <a className={classes.image}>
                    <img 
                        src="images/strawberryicon.jpg"
                        alt="Logo"
                        width="18"
                        height="18"
                        color="#AEAAAE"
                    />
                    </a>
                    
                {/* </StrawberyyIconWrapper> */}
            </Box>

            {/* <Box onClick={handleOpen}>
                <SearchIcon sx={{ top: "20px" }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        flexGrow: 1,
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        fontSize: "12px",
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                        lineHeight: "22px",
                    }}
                >
                    Search here…
                </Typography>
                <StrawberyyIconWrapper>
                    <img
                        src="images/strawberryicon.jpg"
                        alt="Logo"
                        width="18"
                        height="18"
                        color="#AEAAAE"
                    />
                </StrawberyyIconWrapper>
            </Box> */}
            {/* <ButtonBase
                className={classes.root}
                sx={{ border: "none", outline: "none" }}
                onClick={handleOpen}
            >
                <Search>
                    <StrawberyyIconWrapper>
                        <img
                            src="images/strawberry.png"
                            alt="Logo"
                            width="18"
                            height="18"
                            color="#AEAAAE"
                        />
                    </StrawberyyIconWrapper>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase1
                        sx={{ width: "26em" }}
                        placeholder="Search here…"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>
            </ButtonBase> */}
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
                    <Box>
                        <IconButton
                            onClick={handleClose}
                            sx={{ marginLeft: "96%", marginTop: "-2%" }}
                        >
                            <CloseIcon sx={{ width: "21px", height: "25px", color: "#313033" }} />
                        </IconButton>
                    </Box>

                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        sx={{ color: "#AEAAAE", width: "24px", height: "24px" }}
                                    ></SearchIcon>
                                </InputAdornment>
                            ),

                            disableUnderline: true,
                        }}
                        sx={{
                            background: "#EFEFEF",
                            borderRadius: "50px",
                            border: "none",
                            padding: "1% 2%",
                            width: "430px",
                            height: "38px",
                            marginTop: "-4%",
                        }}
                        placeholder="Search here"
                        id="outlined-basic"
                        variant="standard"
                    />

                    <Box sx={{ marginRight: "2%" }}>
                        <CustomDropdown
                            label={""}
                            items={[
                                "Select state",
                                "Andaman and Nicobar Islands",
                                "Andhra Pradesh",
                                "Arunachal Pradesh",
                                "Assam",
                                "Bihar",
                                "Chandigarh",
                                "Chhattisgarh",
                                "Dadra and Nagar Haveli",
                                "Daman and Diu",
                                "Delhi",
                                "Goa",
                                "Gujarat",
                                "Haryana",
                                "Himachal Pradesh",
                                "Jammu and Kashmir",
                                "Jharkhand",
                                "Karnataka",
                                "Kerala",
                                "Ladakh",
                                "Lakshadweep",
                                "Madhya Pradesh",
                                "Maharashtra",
                                "Manipur",
                                "Meghalaya",
                                "Mizoram",
                                "Nagaland",
                                "Odisha",
                                "Puducherry",
                                "Punjab",
                                "Rajasthan",
                                "Sikkim",
                                "Tamil Nadu",
                                "Telangana",
                                "Tripura",
                                "Uttar Pradesh",
                                "Uttarakhand",
                                "West Bengal",
                            ]}
                            minwidthDropDown="430px"
                            activeItem={activeDropdown}
                            handleChange={(listItems) => setActiveDropdown(listItems)}
                            // dropdowncss={{ width:"300px" }}
                        />
                    </Box>
                    <Box
                        sx={{
                            marginTop: "4%",
                            borderBottom: "1px solid",
                            borderColor: "#E6E1E5",
                            height: "49px",
                        }}
                    >
                        <Stack direction="row" alignItems="center" gap={1} sx={{}}>
                            <CustomButton
                                label={"All"}
                                // isTransaprent={false}
                                isTransaprent
                                isDisabled={false}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "66px",
                                    height: "32px",
                                    "&:hover": {
                                        color: "#ffff",
                                    },
                                }}
                            />
                            <CustomButton
                                label={"Dentist"}
                                // isTransaprent={false}
                                isTransaprent
                                isDisabled={false}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "99px",
                                    height: "32px",
                                }}
                            />
                            <CustomButton
                                label={"Neurologist"}
                                // isTransaprent={false}
                                isTransaprent
                                isDisabled={false}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "131px",
                                    height: "32px",
                                }}
                            />
                            <CustomButton
                                label={"Orthopedic"}
                                // isTransaprent={false}
                                isTransaprent
                                isDisabled={false}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "131px",
                                    height: "32px",
                                }}
                            />
                            <CustomButton
                                label={"Nutritionist"}
                                // isTransaprent={false}
                                isTransaprent
                                isDisabled={false}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "131px",
                                    height: "32px",
                                }}
                            />
                            <CustomButton
                                label={"Pediatric"}
                                // isTransaprent={false}
                                isTransaprent
                                isDisabled={false}
                                isElevated={false}
                                handleClick={handleSubmit}
                                buttonCss={{
                                    width: "112px",
                                    height: "32px",
                                }}
                            />
                        </Stack>
                    </Box>
                    {/* /////Static vector image in sear bar modal */}

                    {/* <img style={{width:"35%",marginLeft:"34%",marginTop:"6%"}}
                        src="images/searchDr.png"
                        alt="Search image"
                        
                        
                        // color="#AEAAAE"
                    /> */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        <CallCardData CardData={data} textField={"Popular"} />
                    </Box>
                    {/* <Grid container spacing={0} >
                        <Grid item xs={2} >
                            <Card />
                        </Grid>
                    </Grid> */}

                    {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                    
                    <InputLabel id="demo-simple-select-standard-label">Bangalore,Karnataka</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={age}
                        onChange={handleChange}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    </FormControl> */}
                </div>
            </Modal>
        </>
    );
};

export default searchBarModal;
