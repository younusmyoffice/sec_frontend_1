// // // // // // const SkeletonLoader = () => {
//     return (
//         <Box sx={{ width: "90%", marginLeft: "5.5%", marginTop: "2.5%" }}>
//             <Box className="NavBar-Box" sx={{ marginLeft: 0, marginBottom: 0 }}>
//                 <Link>Explore</Link>
//                 <Link>My Activity</Link>
//             </Box>
//             <Box sx={{ width: "100%" }}>
//                 {/* Horozontal slider starts */}
//                 <Box sx={{ width: "100%", height: "fit-content", overflow: "hidden" }}>
//                     <SingleLineGridList />
//                 </Box>
//                 {/* Popular Field starts */}
//                 <CallCardData
//                     linkPath={`/patientdashboard/drdetailscard/`}
//                     sendCardData={cardData}
//                     CardData={data}
//                     textField={"Popular"}
//                 />
//                 {/* Featured Fields starts */}
//                 <CallCardData
//                     linkPath={`/patientdashboard/drdetailscard/`}
//                     sendCardData={cardData}
//                     CardData={data}
//                     textField={"Featured"}
//                 />
//                 {/* Category component starts */}
//                 <Box>
//                     <Box sx={{ display: "flex" }} className={"NavBar-Container"}>
//                         {/* <CustomButton label="All"></CustomButton> */}
//                         <NavLink to={"/patientdashboard/explore"}></NavLink>
//                         <NavLink to={"/dentist"}></NavLink>
//                         <NavLink to={"/neurologist"}></NavLink>
//                         <NavLink to={"/orthopaedics"}></NavLink>
//                         <NavLink to={"/nutritionist"}></NavLink>
//                         <NavLink to={"/pediatric"}></NavLink>
//                         <NavLink to={"/more"}></NavLink>
//                     </Box>
//                     <CallCardData
//                         linkPath={`/patientdashboard/drdetailscard/`}
//                         sendCardData={cardData}
//                         CardData={data}
//                         textField={""}
//                     />
//                 </Box>
//                 {/* Near you component starts */}
//                 <CallCardData
//                     linkPath={`/patientdashboard/drdetailscard/`}
//                     sendCardData={cardData}
//                     CardData={data}
//                     textField={"Near You"}
//                 />
//                 {/* Near you component ends */}
//             </Box>
//         </Box>
//     );
// };

// export default SkeletonLoader;
