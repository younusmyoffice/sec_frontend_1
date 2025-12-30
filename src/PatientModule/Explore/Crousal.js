import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import CustomButton from '../../components/CustomButton/custom-button';
import Skeleton from '@mui/material/Skeleton';
import './Crousal.scss';
import imagea from "../../static/images/HomeImages/a.png";
import imageb from "../../static/images/HomeImages/b.jpg";
import imagec from "../../static/images/HomeImages/c.png";
import imaged from "../../static/images/HomeImages/d.png";
import imagee from "../../static/images/HomeImages/e.jpg";
// Advertisement card data
const advertisementData = [
  {
    id: 1,
    title: "Take control of your health",
    subtitle: "Experience seamless healthcare management with our app.",
    image: imagea, // Using imported image
    buttonText: "Learn More"
  },
  {
    id: 2,
    title: "24/7 Health Support",
    subtitle: "Get medical assistance whenever you need it.",
    image: imagee, // Using imported image
    buttonText: "Contact Us"
  },
  {
    id: 3,
    title: "Book appointments easily",
    subtitle: "Access top healthcare professionals with one click.",
    image: imagec, // Using imported image
    buttonText: "Book Now"
  },
  {
    id: 4,
    title: "Your health, our priority",
    subtitle: "Discover personalized healthcare solutions today.",
    image: imaged, // Using imported image
    buttonText: "Get Started"
  }

];

const AdvertisementCard = ({ data, isLoading }) => {
  const [imageError, setImageError] = useState(false);

  // Debug logging for image loading
  console.log("🖼️ AdvertisementCard rendering:", {
    title: data.title,
    imageSrc: data.image,
    imageType: typeof data.image,
    isLoading
  });

  if (isLoading) {
    return (
      <Box className="ad-card-skeleton">
        <Skeleton variant="rectangular" width="100%" height="140px" sx={{ borderRadius: "12px" }} />
      </Box>
    );
  }

  return (
    <Box className="advertisement-card">
      <Box className="ad-card-content">
        <Typography className="ad-card-title">
          {data.title}
        </Typography>
        <Typography className="ad-card-subtitle">
          {data.subtitle}
        </Typography>
        <CustomButton
          className="ad-card-button"
          label={data.buttonText}
          isTransaprent={true}
          buttonCss={{
            border: "1px solid #E72B4A",
            borderRadius: "20px",
            padding: "8px 20px",
            fontSize: "12px",
            fontWeight: "500",
            color: "#E72B4A",
            backgroundColor: "transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#E72B4A",
              color: "white"
            }
          }}
        />
      </Box>
      <Box className="ad-card-image">
        {imageError ? (
          <Box
            className="ad-image-fallback"
            sx={{
              width: "100%",
              height: "80px",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
              fontSize: "12px",
              fontFamily: "Poppins, sans-serif"
            }}
          >
            {data.title.split(' ')[0]}
          </Box>
        ) : (
          <img
            src={data.image}
            alt={data.title}
            onError={() => setImageError(true)}
            style={{
              width: "100%",
              height: "80px",
              borderRadius: "8px",
              objectFit: "cover"
            }}
          />
        )}
      </Box>
    </Box>
  );
};

const HorizontalCarousel = ({
  title = "Advertisment Services",
  isLoading = false,
  autoScroll = true,
  showControls = true,
  data = advertisementData
}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(autoScroll);

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  // Auto scroll effect
  useEffect(() => {
    if (!autoScroll || isLoading) return;

    const interval = setInterval(() => {
      if (scrollRef.current && isAutoScrolling) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          // Reset to beginning
          scrollRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Continue scrolling
          scrollRef.current.scrollBy({
            left: 1,
            behavior: 'auto'
          });
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [autoScroll, isLoading, isAutoScrolling]);

  // Handle mouse events for auto-scroll pause
  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  // Check scroll position on scroll
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check

      return () => {
        scrollElement.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [isLoading]);

  return (
    <Box className="horizontal-carousel-container">
      {title && (
        <Box className="carousel-header">
          <Typography className="carousel-title">
            {title}
          </Typography>
        </Box>
      )}

      <Box
        className="carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showControls && (
          <IconButton
            className={`scroll-button left ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeft />
          </IconButton>
        )}

        <Box
          ref={scrollRef}
          className="carousel-scroll-container"
        >
          <Box className="carousel-content">
            {isLoading ? (
              // Loading skeletons
              [...Array(4)].map((_, index) => (
                <Box key={index} className="carousel-item">
                  <AdvertisementCard data={{}} isLoading={true} />
                </Box>
              ))
            ) : (
              // Actual content
              data.map((item, index) => (
                <Box key={item.id || index} className="carousel-item">
                  <AdvertisementCard data={item} isLoading={false} />
                </Box>
              ))
            )}
          </Box>
        </Box>

        {showControls && (
          <IconButton
            className={`scroll-button right ${!canScrollRight ? 'disabled' : ''}`}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default HorizontalCarousel;