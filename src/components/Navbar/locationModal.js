import React, { useState } from "react";
import {
    Box,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
// import { makeStyles } from "@mui/styles"; // Using sx prop instead for MUI v5
import Modal from "@mui/material/Modal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../config/axiosInstance";
import NoAppointmentCard from "../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import Drcard from "../../constants/drcard/drcard";
import frontimg from "../../static/images/DrImages/locationIcon.png";
import { Link } from "react-router-dom";

// Removed makeStyles - using sx prop instead for MUI v5 compatibility

const LocationModal = () => {
    // Removed useStyles - using sx prop instead
    const [open, setOpen] = useState(false);
    const [postalCodes, setPostalCodes] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [loadingCurrentLocation, setLoadingCurrentLocation] = useState(false);
    const [searchLocation, setSearchLocation] = useState(""); // State for storing user search location
    const [centerCoordinates, setCenterCoordinates] = useState(null); // State for storing center coordinates
    const [doctors, setDoctors] = useState([]); // State for storing doctor list
    const [locname, setLocname] = useState("");
    const geofenceRadius = 2000; // Radius in meters (2 km)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchPostalCodesWithinGeofence = async (center, gridSize) => {
        const postalCodesSet = new Set();
        const latLngPoints = generateGridPoints(center, geofenceRadius, gridSize);

        for (let i = 0; i < latLngPoints.length; i++) {
            const point = latLngPoints[i];
            const postcode = await fetchPostalCode(point[0], point[1]);
            if (postcode) {
                postalCodesSet.add(postcode);
            }
        }

        return Array.from(postalCodesSet);
    };

    const fetchPostalCode = async (latitude, longitude) => {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
            const response = await fetch(url);
            const data = await response.json();
            return data?.address?.postcode || null;
        } catch (error) {
            console.error("Error fetching reverse geocoding data:", error);
            return null;
        }
    };

    const generateGridPoints = (center, radius, gridSize) => {
        const latLngPoints = [];
        const lat = center[0];
        const lng = center[1];

        for (let x = -radius; x <= radius; x += gridSize) {
            for (let y = -radius; y <= radius; y += gridSize) {
                if (Math.sqrt(x * x + y * y) <= radius) {
                    const latLng = [
                        lat + y * 0.0000089,
                        lng + (x * 0.0000089) / Math.cos(lat * 0.018),
                    ];
                    latLngPoints.push(latLng);
                }
            }
        }

        return latLngPoints;
    };

    const handleUseCurrentLocation = async () => {
        try {
            setIsButtonClicked(true);
            setLoadingCurrentLocation(true);

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const userCoordinates = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };

                        // Fetch location name using reverse geocoding
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${userCoordinates.latitude}&lon=${userCoordinates.longitude}&format=json`,
                        );
                        const locationData = await response.json();
                        const locationName = locationData.display_name || "Unknown Location";

                        // Update state with coordinates and location name
                        setCenterCoordinates([userCoordinates.latitude, userCoordinates.longitude]);
                        setLocname(locationName);

                        // Fetch postal codes within geofence
                        const postalCodes = await fetchPostalCodesWithinGeofence(
                            [userCoordinates.latitude, userCoordinates.longitude],
                            1000, // Radius in meters
                        );
                        setPostalCodes(postalCodes);

                        // Fetch doctors based on postal codes
                        await fetchDoctors(postalCodes);

                        setLoadingCurrentLocation(false);
                    },
                    (error) => {
                        console.error("Error getting geolocation:", error);
                        setLoadingCurrentLocation(false);
                    },
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                setLoadingCurrentLocation(false);
            }
        } catch (error) {
            console.error("Error fetching current location:", error);
            setLoadingCurrentLocation(false);
        }
    };

    const fetchDoctors = async (zipcode) => {
        try {
            const response = await axiosInstance.post(
                "/sec/patient/doctornearme",
                JSON.stringify({
                    zipcodes: zipcode,
                    type: "Good", // Or you can dynamically set this
                    page: 1,
                    limit: 5,
                }),
            );
            setDoctors(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching doctors:", error);
            setDoctors([]);
        }
    };
    console.log("this location doctors", doctors);
    const handleSearch = async () => {
        try {
            setLoadingCurrentLocation(true);

            const url = `https://nominatim.openstreetmap.org/search?q=${searchLocation}&format=json&limit=1`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0];
                setCenterCoordinates([parseFloat(lat), parseFloat(lon)]);
                setLocname(display_name);

                const postalCodes = await fetchPostalCodesWithinGeofence(
                    [parseFloat(lat), parseFloat(lon)],
                    1000,
                );
                setPostalCodes(postalCodes);

                // Fetch doctors based on the location
                await fetchDoctors(postalCodes); // Assuming you use the first postal code for the API
            } else {
                console.error("Location not found");
            }

            setLoadingCurrentLocation(false);
        } catch (error) {
            console.error("Error searching location:", error);
            setLoadingCurrentLocation(false);
        }
    };

    return (
        <>
            <Box sx={{ display: "inline", width: "40%" }} onClick={handleOpen}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <LocationOnIcon
                        sx={{
                            color: locname ? "#E72B4A" : "#AEAAAE",
                            width: "32px",
                            height: "32px",
                        }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: locname ? "#E72B4A" : "#AEAAAE", // Change color if location is set
                            marginTop: "5%",
                            lineHeight: "22px",
                        }}
                    >
                        {locname ? locname.split(",")[0] : "Set Location.."}
                    </Typography>
                </Stack>
            </Box>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: "40vw",
                        height: "85vh",
                        background: "#ffff",
                        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
                        padding: "16px 32px 24px", // Equivalent to theme.spacing(2, 4, 3)
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        overflow: "auto",
                        borderRadius: "5px",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 500,
                                fontSize: "20px",
                                color: "#313033",
                                marginTop: "2%",
                                lineHeight: "20px",
                            }}
                        >
                            Add Your Location
                        </Typography>
                        <IconButton onClick={handleClose} sx={{ marginRight: "-1rem" }}>
                            <CloseIcon sx={{ width: "21px", height: "25px", color: "#313033" }} />
                        </IconButton>
                    </Box>
                    {/* Search Location */}
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        sx={{ color: "#AEAAAE", width: "24px", height: "24px" }}
                                    />
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                        }}
                        sx={{
                            background: "#EFEFEF",
                            borderRadius: "50px",
                            border: "none",
                            padding: "2% 2%",
                            width: "100%",
                            marginTop: "10%",
                        }}
                        placeholder="Search location here"
                        id="outlined-basic"
                        variant="standard"
                        value={searchLocation}
                        onChange={(e) => {
                            setIsButtonClicked(false);
                            setSearchLocation(e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <Box onClick={handleUseCurrentLocation} sx={{ marginTop: "5%" }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}
                            sx={{
                                marginLeft: "3%",
                                color: isButtonClicked ? "#E72B4A" : "#313033",
                                transition: "color 0.3s ease",
                            }}
                        >
                            <GpsFixedIcon sx={{ width: "24px", height: "24px" }} />
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: "left",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    cursor: "pointer",
                                }}
                            >
                                Use Current Location
                            </Typography>
                        </Stack>
                    </Box>
                    

                    {loadingCurrentLocation ? (
                        // Show loader only when location is loading
                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : doctors.length > 0 ? (
                        // Render doctors only if they exist
                        doctors.map((doctor, index) => (
                            <Link
                                to={`/patientdashboard/drdetailscard/` + doctor.suid}
                                style={{
                                    width: "20em",
                                    textDecoration: "none",
                                    marginRight: "10px",
                                }}
                                key={index}
                            >
                                <Drcard DrData={doctor} />
                            </Link>
                        ))
                    ) : (
                        // Show "No Doctors Found" card only when doctors list is empty
                        <Box>
                        <img
                            style={{ width: "50%",height: "30%", marginLeft: "14%", marginTop: "14%" }}
                            src={frontimg}
                            alt=""
                        />
                        <Typography>No Doctors Found</Typography>
                    </Box>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default LocationModal;

// import {
//     Box,
//     ButtonBase,
//     IconButton,
//     InputAdornment,
//     Stack,
//     TextField,
//     Typography,
// } from "@mui/material";
// import React, { useCallback, useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import SearchIcon from "@mui/icons-material/Search";
// import GpsFixedIcon from "@mui/icons-material/GpsFixed";
// // import { styled } from "@mui/material/styles";
// // import InputBase from "@mui/material/InputBase";
// import CloseIcon from "@mui/icons-material/Close";
// import "./locationModal.scss";
// import axios from "axios";

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }
// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }
// const useStyles = makeStyles((theme) => ({
//     modal: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     paper: {
//         position: "absolute",
//         width: "400px",
//         height: "450px",
//         // backgroundColor: theme.palette.background.paper,
//         // boxShadow: theme.shadows[5],
//         background: "#ffff",
//         boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
//         padding: theme.spacing(2, 4, 3),
//     },
// }));

// const locationModal = () => {
//     const classes = useStyles();
//     const [modalStyle] = React.useState(getModalStyle);
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };

//     const [position, setPosition] = useState({
//         latitude: null,
//         longitude: null,
//     });
//     const [address, setAddress] = useState([]);
//     const [area, setArea] = useState("");
//     const [query, setQuery] = useState("");
//     const [results, setResults] = useState([]);
//     const [error, setError] = useState(null);

//     function getLocation() {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(showPosition);
//         } else {
//             alert("Geolocation is not supported by this browser.");
//         }
//     }

//     function showPosition(position) {
//         setPosition({
//             ...position,
//             latitude: position?.coords?.latitude,
//             longitude: position?.coords?.longitude,
//         });
//         getPincode(position?.coords?.latitude, position?.coords?.longitude);
//         // getPincode(28.636589, 77.274315);
//     }

//     // for fetching current location
//     const getPincode = async (lat, lon) => {
//         try {
//             const response = await axios.get(
//                 `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
//             );
//             localStorage.setItem("pincode", response?.data?.address?.postcode);
//             setAddress(response?.data?.address);
//         } catch (err) {
//             console.log("Location error : ", err);
//         }
//     };

//     // Debounce function
//     const debounce = (func, delay) => {
//         let timeoutId;
//         return function (...args) {
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => {
//                 func.apply(this, args);
//             }, delay);
//         };
//     };

//     // Function to search the area
//     const SearchTheArea = async (area) => {
//         try {
//             const response = await axios.get(
//                 `https://nominatim.openstreetmap.org/search.php?q=${area}&format=jsonv2`,
//             );
//             setResults(response?.data);
//             //   localStorage.setItem('pincode',response?.data[0]);
//         } catch (err) {
//             setError(err);
//         }
//     };

//     // Debounced search function
//     const debouncedSearch = useCallback(
//         debounce((searchQuery) => {
//             if (searchQuery) {
//                 SearchTheArea(searchQuery);
//             }
//         }, 500),
//         [],
//     );

//     // Effect to handle the debounced search
//     useEffect(() => {
//         debouncedSearch(query);
//         if (query === "" || query === " ") {
//             setResults([]);
//         }
//     }, [query, debouncedSearch]);

//     //   console.log("result : ", results);
//     //   console.log(query);

//     return (
//         <>
//             <Box sx={{ diplay: "inline", width: "50%" }} onClick={handleOpen}>
//                 <Stack direction="row" alignItems="center" gap={1}>
//                     <LocationOnIcon sx={{ color: "#AEAAAE", width: "32px", height: "32px" }} />
//                     <Typography
//                         variant="body1"
//                         sx={{
//                             fontWeight: 600,
//                             fontSize: "14px",
//                             color: "#AEAAAE",
//                             marginTop: "5%",
//                             lineHeight: "22px",
//                         }}
//                     >
//                         Set Location..
//                     </Typography>
//                 </Stack>
//             </Box>

//             <Box>
//                 <Modal
//                     aria-labelledby="simple-modal-title"
//                     aria-describedby="simple-modal-description"
//                     open={open}
//                     onClose={handleClose}
//                 >
//                     <div
//                         style={{
//                             position: "fixed",
//                             top: "50%",
//                             left: "50%",
//                             transform: "translate( -50% , -50% )",
//                         }}
//                         className={classes.paper}
//                     >
//                         {/* Add Location */}
//                         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                             <Typography
//                                 variant="h1"
//                                 sx={{
//                                     fontWeight: 500,
//                                     fontSize: "20px",
//                                     color: "#313033",
//                                     marginTop: "2%",
//                                     lineHeight: "20px",
//                                     marginLeft: "-4%",
//                                 }}
//                             >
//                                 Add your Location
//                             </Typography>
//                             <IconButton onClick={handleClose} sx={{ marginRight: "-1rem" }}>
//                                 <CloseIcon
//                                     sx={{ width: "21px", height: "25px", color: "#313033" }}
//                                 />
//                             </IconButton>
//                         </Box>
//                         {/* search box */}
//                         <TextField
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <SearchIcon
//                                             sx={{ color: "#AEAAAE", width: "24px", height: "24px" }}
//                                         ></SearchIcon>
//                                     </InputAdornment>
//                                 ),
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <CloseIcon
//                                             sx={{ width: "21px", height: "21px", color: "#AEAAAE" }}
//                                         ></CloseIcon>
//                                     </InputAdornment>
//                                 ),
//                                 disableUnderline: true,
//                             }}
//                             sx={{
//                                 background: "#EFEFEF",
//                                 borderRadius: "50px",
//                                 border: "none",
//                                 padding: "2% 2%",
//                                 width: "342px",
//                                 height: "41px",
//                                 marginTop: "5%",
//                             }}
//                             placeholder="Search here"
//                             id="outlined-basic"
//                             variant="standard"
//                             onChange={(e) => setQuery(e.target.value)}
//                         />
//                         <Box onClick={handleOpen} sx={{ marginTop: "2%", cursor: "pointer" }}>
//                             <Stack
//                                 direction="row"
//                                 alignItems="center"
//                                 gap={1}
//                                 sx={{ marginLeft: "3%" }}
//                             >
//                                 <GpsFixedIcon
//                                     sx={{ color: "#E72B4A", width: "24px", height: "24px" }}
//                                 ></GpsFixedIcon>
//                                 <Typography
//                                     variant="body1"
//                                     className={"location-btn"}
//                                     sx={{
//                                         textAlign: "left",
//                                         color: "#313033",
//                                         fontWeight: "500",
//                                         fontSize: "14px",
//                                         lineHeight: "22px",
//                                     }}
//                                     onClick={() => getLocation()}
//                                 >
//                                     Use Current Location
//                                 </Typography>
//                             </Stack>
//                         </Box>
//                     </div>
//                 </Modal>
//             </Box>
//         </>
//     );
// };

// export default locationModal;
