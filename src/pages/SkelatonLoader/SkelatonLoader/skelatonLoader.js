// // base dashboard
// import React, { Fragment, useCallback, useState, useEffect } from "react";
// import { Home, AccountCircle, ManageAccounts, Margin, FormatBold } from "@mui/icons-material";

// import "./skelatonLoader.scss";

// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";

// import {
//     Box,
//     Toolbar,
//     List,
//     CssBaseline,
//     Typography,
//     Divider,
//     IconButton,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText,
//     Grid,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import Card from "../../../components/Card/card";

// import CustomMenuDrawer from "../../../components/CustomMenuDrawer/custom-menu-drawer";
// import Carousel from "../../../components/Carousel/Carousel/carousel";

// const skelatonLoader = () => {
//     const drawerList1 = [
//         { name: "Dashboard", icon: <Home /> },
//         { name: "Appointments", icon: <AccountCircle /> },
//         { name: "Manage", icon: <ManageAccounts /> },
//     ];

//     const useStyles = makeStyles({
//         gridContainer: {
//             paddingLeft: "-20px",
//             paddingRight: "-20px",
//         },
//     });

//     const DrawerChildComponents = () => {
//         useEffect(() => {
//             // const timer = setInterval(() => {
//             //     setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
//             // }, 800);
//             // return () => {
//             //     clearInterval(timer);
//             // };
//         }, []);

//         const classes = useStyles();
//         // from here
//         const [active, setActive] = useState(false);
//         const handleClick = () => {
//             setActive(!active);
//         };

//         return (
//             <Fragment>
//                 <div>
//                     <Carousel />
//                 </div>

//                 <Box
//                     sx={{
//                         width: "100%",
//                         maxWidth: 10,
//                         marginTop: 2,
//                         marginBottom: 5,
//                         marginLeft: -8,
//                         fontWeight: "bold",
//                     }}
//                 >
//                     <Typography variant="h7" gutterBottom>
//                         Popular
//                     </Typography>
//                 </Box>
//                 {/* <Grid container spacing={13} className={classes.gridContainer} justify="center" >
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card />
//                     </Grid>
//                 </Grid> */}
//                 <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//                     <Card sx={{ display: "flex" }} />
//                 </Box>

//                 <Box
//                     sx={{
//                         width: "100%",
//                         maxWidth: 10,
//                         marginTop: 8,
//                         marginBottom: 5,
//                         marginLeft: -8,
//                         fontWeight: "bold",
//                     }}
//                 >
//                     <Typography variant="h7" gutterBottom>
//                         Featured
//                     </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//                     <Card sx={{ display: "flex" }} />
//                 </Box>

//                 <Stack direction="row" spacing={2} paddingTop={10} marginLeft={-5}>
//                     <Button
//                         size="small"
//                         variant="outlined"
//                         style={{ borderRadius: 20, backgroundColor: active ? "#E72B4A" : "error" }}
//                         onClick={handleClick}
//                     >
//                         All
//                     </Button>
//                     <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         style={{ borderRadius: 20 }}
//                     >
//                         Dentist
//                     </Button>
//                     <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         style={{ borderRadius: 20 }}
//                     >
//                         Neurologist
//                     </Button>
//                     <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         style={{ borderRadius: 20 }}
//                     >
//                         Orthopedic
//                     </Button>
//                     <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         style={{ borderRadius: 20 }}
//                     >
//                         Nutritionist
//                     </Button>
//                     <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         style={{ borderRadius: 20 }}
//                     >
//                         Pediatric
//                     </Button>
//                     <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         style={{ borderRadius: 20 }}
//                     >
//                         More...
//                     </Button>
//                 </Stack>

//                 <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//                     <Card sx={{ display: "flex" }} />
//                 </Box>

//                 <Grid container direction="row">
//                     <Grid item>
//                         <Typography
//                             gutterBottom
//                             variant="h9"
//                             component="div"
//                             color="#313033"
//                             marginBottom={5}
//                             fontWeight={"bold"}
//                             marginTop={2}
//                             marginLeft={-8}
//                         >
//                             Near You
//                         </Typography>
//                     </Grid>

//                     <Grid item>
//                         <Button
//                             href="#text-buttons"
//                             style={{
//                                 color: "#E72B4A",
//                                 fontWeight: "bold",
//                                 marginBottom: "5px",
//                                 marginTop: "20px",
//                                 marginLeft: "750px",
//                             }}
//                         >
//                             View all
//                         </Button>
//                     </Grid>
//                 </Grid>

//                 {/* <Typography gutterBottom variant="h9" component="div" color="#313033" marginBottom={5} fontWeight={'bold'} marginTop={5} >
//                     <span style={{ alignSelf: "left" }}>Hi </span><span >Hllo</span>
//                 </Typography> */}

//                 <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//                     <Card sx={{ display: "flex" }} />
//                 </Box>
//             </Fragment>
//         );
//     };

//     const AppointmentComponent = () => {
//         return <div>Appointment component</div>;
//     };

//     const ManageComponent = () => {
//         return <div>Manage component</div>;
//     };

//     const drawerComponentList = {
//         dashboard: <DrawerChildComponents />,
//         appointments: <AppointmentComponent />,
//         manage: <ManageComponent />,
//     };

//     const [activeComponent, setActiveComponent] = useState(drawerComponentList.usage);

//     return (
//         <div className="usage">
//             <div className="component-library">
//                 <div className="items">
//                     <CustomMenuDrawer
//                         list1={drawerList1}
//                         handleOnMenuSelect={(item) =>
//                             setActiveComponent(drawerComponentList[item.toLowerCase()])
//                         }
//                     >
//                         {activeComponent}
//                     </CustomMenuDrawer>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default skelatonLoader;
