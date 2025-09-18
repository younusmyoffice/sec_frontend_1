import { Box, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

const card = (ResData) => {
    const [id, image, name, hospital, specialist, rating, reviews] = [
        ResData.ResData.id,
        ResData.ResData.drimage,
        ResData.ResData.name,
        ResData.ResData.hospital,
        ResData.ResData.specialist,
        ResData.ResData.rating,
        ResData.ResData.reviews,
    ];

    return (
        <Box sx={{ width: "250px" }}>
            <Card
                key={id}
                sx={{
                    display: "flex",
                    width: "245px",
                    height: "100px",
                    marginTop: "5%",
                    // marginLeft:"1%",
                    fontFamily: "Poppins",
                    fontStyle: "12px",
                    backgroundColor: "#ffff",
                    borderRadius: 4,
                }}
            >
                <Box component={"div"}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: "100%",
                            height: "100%",
                            padding: 0.8,
                            borderRadius: 4,
                        }}
                        image={image}
                        alt="Live from space album cover"
                    />
                </Box>

                <CardContent sx={{}}>
                    <Typography
                        sx={{ fontSize: "12px" }}
                        component="h2"
                        variant="h9"
                        fontWeight="bold"
                    >
                        {name}
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle1" color="text.secondary" component="h3">
                        {hospital}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="h3">
                        {specialist}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="h4">
                        {reviews}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="h4">
                        {rating}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};
export default card;

// import React from 'react';
// import "./drcard.scss";

// export const Drcard = (ResData) => {
//     console.log(ResData.ResData);
//     const [ id, image , name ,hospital,specialist,rating ,reviews] = [
//                                                                             ResData.ResData.id ,
//                                                                             ResData.ResData.drimage ,
//                                                                             ResData.ResData.name ,
//                                                                             ResData.ResData.hospital ,
//                                                                             ResData.ResData.specialist,
//                                                                             ResData.ResData.rating,
//                                                                             ResData.ResData.reviews
//                                                                     ];

//     return (
//         <>
//             <div className='dr-card-container' key={id}>
//                 <div className='dr-card-container'>
//                     <img src={image}></img>
//                 </div>
//                 <div className='card-data-container'>
//                     <h2>{name}</h2>
//                     <h3>{specialist}  |  {hospital}</h3>
//                     <h4>{rating} {reviews}</h4>
//                 </div>
//             </div>
//         </>
//     );
// };

// import { Box, ButtonBase, Divider } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import React from "react";
// import { MenuList } from "./data";
// import { useNavigate } from 'react-router-dom';

// const card = () => {

//     const navigate = useNavigate();

//     const handleCardClick = () => {
//       // Replace "/newpage" with the actual URL of the page you want to redirect to
//       navigate('/newpage');

//     };
//     return (
//         <Box sx={{display: "flex", flexWrap: "wrap" }}>
//         {MenuList.map((card)=>(

//         <ButtonBase onClick={handleCardClick}>
//             <Card
//             sx={{
//                 display: "flex",
//                 maxWidth: 250,
//                 height: 100,
//                 m: 1
//             }}
//         >
//             <Box>
//                 <CardMedia
//                     component="img"
//                     sx={{
//                         width: 123,
//                         height: 123,
//                         borderRadius: 4,
//                         marginTop: 0.5,
//                         marginLeft: 0.5,
//                         padding: 0.5,
//                     }}
//                     image={card.image}
//                     alt="Live from space album cover"
//                 />
//             </Box>
//             <CardContent sx={{ flex: "1 0 auto" }}>
//                 <Typography component="div" variant="h9" fontWeight="bold">
//                     {card.name}
//                 </Typography>
//                 <Divider />
//                 <Typography variant="subtitle1" color="text.secondary" component="div">
//                     {card.description}
//                 </Typography>
//             </CardContent>

//             {/* <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box> */}
//         </Card>
//         </ButtonBase>

//         ))}
//         </Box>
//     );
// };

// export default card;
