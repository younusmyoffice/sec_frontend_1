import React, { useRef, useEffect, useCallback, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, ImageListItem, ImageList } from "@mui/material";
import image1 from "../../static/images/DrImages/CardDoctor1.png";
import image2 from "../../static/images/DrImages/CardDoctor2.png";
import CustomButton from "../../components/CustomButton/custom-button";
import "./Crousal.scss";
import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles(() => ({
  // CSS classes are now handled in Crousal.scss
}));

// Define card data to avoid repetition
const cardData = [
  {
    title: "Take control of your health Experience seamless healthcare management with our app.",
    image: image1,
  },
  {
    title: "Your health, our priority Discover personalized healthcare solutions today.",
    image: image2,
  },
  {
    title: "Book an appointment easily Access top healthcare professionals with one click.",
    image: image1,
  },
];

const Card = ({ title, image, isLoading }) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box className="carousel-skeleton">
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="rectangular" width="35%" height={100} />
      </Box>
    );
  }

  return (
    <Box className="carousel-card">
      <Box className="carousel-card-content">
        <Typography className="carousel-card-title">
          {title}
        </Typography>
        <CustomButton
          className="carousel-button"
          buttonCss={{ 
            border: "none", 
            mt: 1,
            fontSize: "12px",
            padding: "6px 16px"
          }}
          label="Book Now"
          isTransaprent={true}
        />
      </Box>
      <Box className="carousel-card-image">
        <img
          src={image}
          alt="Doctor"
        />
      </Box>
    </Box>
  );
};

export default function SingleLineGridList({ isLoading = false }) {
  const classes = useStyles();
  const sliderRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Smooth scrolling with requestAnimationFrame
  const scrollCarousel = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    // Check if we can scroll
    if (slider.scrollWidth <= slider.clientWidth) {
      return;
    }

    // Smooth scroll with better speed control
    slider.scrollLeft += 0.5; // Even slower for smoother effect
    
    // Reset to start when we reach the end (with some buffer)
    if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10) {
      slider.scrollLeft = 0; // Reset to start
    }
    
    animationFrameRef.current = requestAnimationFrame(scrollCarousel);
  }, []);

  // Pause animation on hover
  const handleMouseEnter = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      setIsScrolling(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isLoading && !isScrolling) {
      setIsScrolling(true);
      animationFrameRef.current = requestAnimationFrame(scrollCarousel);
    }
  }, [isLoading, scrollCarousel, isScrolling]);

  useEffect(() => {
    if (!isLoading && !isScrolling) {
      setIsScrolling(true);
      animationFrameRef.current = requestAnimationFrame(scrollCarousel);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        setIsScrolling(false);
      }
    };
  }, [isLoading, scrollCarousel, isScrolling]);

  // Duplicate cardData for seamless looping
  const extendedCardData = [...cardData, ...cardData, ...cardData];

  return (
    <Box 
      className="carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ImageList 
        className="carousel-slider" 
        id="slider" 
        cols={2.5} 
        ref={sliderRef}
        sx={{
          '& .MuiImageListItem-root': {
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            }
          },
          '@media (max-width: 600px)': {
            '&': {
              cols: 1.5,
            }
          },
          '@media (min-width: 900px)': {
            '&': {
              cols: 3,
            }
          },
        }}
      >
        {extendedCardData.map((card, index) => (
          <ImageListItem 
            key={`${card.title}-${index}`} 
            className="carousel-item"
            sx={{ 
              minWidth: { xs: '250px', sm: '300px', md: '350px' },
              maxWidth: { xs: '250px', sm: '300px', md: '350px' }
            }}
          >
            <Card title={card.title} image={card.image} isLoading={isLoading} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

// // import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import { Box, Typography , ImageListItem , ImageList } from "@mui/material";
// import image1 from "../../static/images/DrImages/image1.png";
// import image2 from "../../static/images/DrImages/image2.png";
// import image3 from "../../static/images/DrImages/image3.png";
// import CustomButton from "../../components/CustomButton/custom-button";
// import "./Crousal.scss";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "space-around",
//         overflow: "hidden",
//     },
//     gridList: {
//         flexWrap: "nowrap",
//         width: "100%",
//         overflowX: "hidden",
//     },
// }));

// const tileData = [
//     {
//         img: image1,
//         title: "title",
//     },
//     {
//         img: image2,
//         title: "title",
//     },
//     {
//         img: image3,
//         title: "title",
//     },
//     {
//         img: image1,
//         title: "title",
//     },
//     {
//         img: image2,
//         title: "title",
//     },
//     {
//         img: image3,
//         title: "title",
//     },
// ];

// export default function SingleLineGridList() {
//     const classes = useStyles();

//     // const scrollable = document.querySelector("slider");
//     // console.log(scrollable.addEventListener("wheel"));
//     const slideLeft = () => {
//         const slider = document.getElementById("slider");
//         slider.scrollLeft -= 100;
//     };

//     const slideRight = () => {
//         const slider = document.getElementById("slider");
//         slider.scrollLeft += 100;
//     };

//     return (
//         <Box sx={{ display: "flex", width: "100%" }}>
//             <Box sx={{ width: "fit-content", display: "flex", alignItems: "center" }}>
//                 <KeyboardArrowLeftIcon onClick={slideLeft} />
//             </Box>

//             <ImageList className={classes.gridList} id="slider" cols={2.5}>
//                 {tileData.map((index) => (
//                     <ImageListItem key={index}>
//                         <Box
//                             sx={{
//                                 borderRadius: "8px",
//                                 border: "1px solid #E6E1E5",
//                                 height: "100%",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                             }}
//                         >
//                             {/* content Box */}
//                             <Box
//                                 sx={{
//                                     width: "60%",
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     alignItems: "flex-start",
//                                     justifyContent: "space-around",
//                                 }}
//                             >
//                                 <Box sx={{ marginLeft: "5%" }}>
//                                     <Typography sx={{ textAlign: "start" }}>
//                                         Take control of your health with our user-friendly health
//                                         care app.
//                                     </Typography>
//                                 </Box>
//                                 <Box sx={{ marginLeft: "5%" }}>
//                                     <CustomButton
//                                         buttonCss={{ border: "none" }}
//                                         label="Book Now"
//                                         isTransaprent={true}
//                                     />
//                                 </Box>
//                             </Box>
//                             {/* Image Box */}
//                             <Box sx={{ width: "40%" }}>
//                                 {/* <Box component={'img'} src={tileData.image1} ></Box> */}
//                                 <img
//                                     src={tileData[0].img}
//                                     alt="/"
//                                     style={{
//                                         width: "100%",
//                                         height: "100%",
//                                         borderRadius: "14px",
//                                         padding: "4px",
//                                     }}
//                                 ></img>
//                             </Box>
//                         </Box>
//                     </ImageListItem>
//                 ))}
//             </ImageList>

//             <Box sx={{ width: "fit-content", display: "flex", alignItems: "center" }}>
//                 <KeyboardArrowRightIcon onClick={slideRight} />
//             </Box>
//         </Box>
//     );
// }
